import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const DEFAULT_PDF_PATH = "/Users/nickhighland/Downloads/DSM 5 TR-APA (2022).pdf";
const BUNDLED_PYTHON_PATH = path.join(
  process.env.HOME || "",
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
);
const DEFAULT_PYTHON = fs.existsSync(BUNDLED_PYTHON_PATH) ? BUNDLED_PYTHON_PATH : "python3";

const PDF_TEXT_SOURCE = String.raw`
import json
import sys

try:
    from pypdf import PdfReader
except Exception as exc:
    print(f"Unable to import pypdf: {exc}", file=sys.stderr)
    sys.exit(2)

pdf_path = sys.argv[1]
payload = json.load(sys.stdin)
pages = payload.get("pages", [])
reader = PdfReader(pdf_path)

result = {}
for page_number in pages:
    text = reader.pages[page_number - 1].extract_text(extraction_mode="layout") or ""
    result[str(page_number)] = text

json.dump(result, sys.stdout)
`;

const SECTION_TITLE_BY_KEY = {
  criteria: "Diagnostic Criteria",
  specifiers: "Specifiers",
  subtypes: "Subtypes",
  recordingProcedures: "Recording Procedures",
  diagnosticFeatures: "Diagnostic Features",
  associatedFeatures: "Associated Features",
  prevalence: "Prevalence",
  developmentAndCourse: "Development and Course",
  riskAndPrognosticFactors: "Risk and Prognostic Factors",
  cultureRelatedDiagnosticIssues: "Culture-Related Diagnostic Issues",
  sexAndGenderRelatedDiagnosticIssues: "Sex- and Gender-Related Diagnostic Issues",
  associationWithSuicidalThoughtsOrBehavior: "Association With Suicidal Thoughts or Behavior",
  diagnosticMarkers: "Diagnostic Markers",
  relationshipToInternationalClassificationOfSleepDisorders:
    "Relationship to International Classification of Sleep Disorders",
  differentialDiagnosis: "Differential Diagnosis",
  comorbidity: "Comorbidity"
};

const OMIT_SECTION_KEYS = new Set(["criteria", "specifiers", "coding"]);
const INTERNAL_BOUNDARY_TITLES = new Set(["panic attack specifier"]);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeForMatch(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function makeSectionSourceKey(title) {
  const parts = String(title || "")
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.toLowerCase());

  if (!parts.length) {
    return "section";
  }

  return parts[0] + parts.slice(1).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
}

function formatTitleFromKey(key) {
  if (SECTION_TITLE_BY_KEY[key]) {
    return SECTION_TITLE_BY_KEY[key];
  }

  if (key.startsWith("functionalConsequences")) {
    return "Functional Consequences";
  }

  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

function titleCandidates(name) {
  const candidates = [name];
  const withoutParenthetical = name.replace(/\s*\([^)]*\)/g, "").trim();
  if (withoutParenthetical && !candidates.includes(withoutParenthetical)) {
    candidates.push(withoutParenthetical);
  }

  if (name.includes(":")) {
    const afterColon = name.split(":").slice(1).join(":").trim();
    if (afterColon && !candidates.includes(afterColon)) {
      candidates.push(afterColon);
    }
  }

  return candidates
    .map((candidate) => normalizeForMatch(candidate))
    .filter(Boolean);
}

function isStandalonePageNumber(line) {
  return /^\d{1,4}$/.test(line);
}

function isLikelyCodeLine(line) {
  return /^[A-Z]?\d[A-Z0-9.]{1,8}$/.test(line) || /^[A-Z]\d{1,2}\.\d{1,4}$/.test(line);
}

function cleanPageLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line && !isStandalonePageNumber(line));
}

function compactExtractedText(lines) {
  return lines
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\b([A-Za-z0-9]+)-\s+([a-z]+)/g, (_match, left, right) => {
      if (["and", "or"].includes(String(right).toLowerCase())) {
        return `${left}- ${right}`;
      }

      return `${left}-${right}`;
    })
    .trim();
}

function buildLineWindow(lines, start, windowSize) {
  return lines
    .slice(start, Math.min(start + windowSize, lines.length))
    .map((line) => line.text)
    .join(" ");
}

function matchesDiagnosisTitle(normalizedWindow, normalizedCandidate) {
  if (!normalizedWindow || !normalizedCandidate) {
    return false;
  }

  if (normalizedWindow === normalizedCandidate) {
    return true;
  }

  const windowParts = normalizedWindow.split(" ");
  const candidateParts = normalizedCandidate.split(" ");
  const trailingParts = windowParts.slice(candidateParts.length);
  const trailingText = trailingParts.join(" ");

  if (
    windowParts.length >= candidateParts.length &&
    windowParts.slice(0, candidateParts.length).join(" ") === normalizedCandidate &&
    (/^(diagnostic criteria|specifiers|recording procedures)( [a-z0-9. ]+)?$/.test(trailingText) ||
      /^[a-z]?\d[a-z0-9. ]*$/.test(trailingText))
  ) {
    return true;
  }

  return false;
}

function matchesSectionHeading(normalizedWindow, key, title) {
  if (!normalizedWindow) {
    return false;
  }

  if (key.startsWith("functionalConsequences")) {
    return normalizedWindow.startsWith("functional consequences");
  }

  if (key === "description") {
    return false;
  }

  if (
    key === "recordingProcedures" &&
    normalizedWindow === "coding and recording procedures"
  ) {
    return true;
  }

  return normalizedWindow === normalizeForMatch(title);
}

function findWindowMatch(lines, matcher, startIndex = 0) {
  for (let index = startIndex; index < lines.length; index += 1) {
    for (let windowSize = 1; windowSize <= 3; windowSize += 1) {
      const normalizedWindow = normalizeForMatch(buildLineWindow(lines, index, windowSize));
      if (matcher(normalizedWindow)) {
        return {
          start: index,
          end: Math.min(index + windowSize - 1, lines.length - 1)
        };
      }
    }
  }

  return null;
}

function findNextRecognizedHeadingBoundary(lines, startIndex, excludedKeys = []) {
  const excluded = new Set(excludedKeys);
  const headingDefinitions = Object.entries(SECTION_TITLE_BY_KEY)
    .filter(([key]) => !OMIT_SECTION_KEYS.has(key))
    .filter(([key]) => key !== "description")
    .filter(([key]) => !excluded.has(key))
    .map(([key, title]) => ({ key, title }));

  for (let index = startIndex; index < lines.length; index += 1) {
    for (let windowSize = 1; windowSize <= 3; windowSize += 1) {
      const normalizedWindow = normalizeForMatch(buildLineWindow(lines, index, windowSize));
      if (!normalizedWindow) {
        continue;
      }

      if (headingDefinitions.some((definition) => matchesSectionHeading(normalizedWindow, definition.key, definition.title))) {
        return index;
      }
    }
  }

  return lines.length;
}

function buildEntryTitleMatchers(entries) {
  return entries.map((entry) => ({
    entryId: entry.id,
    candidates: titleCandidates(entry.name)
  }));
}

function buildSectionDefinitions(entry) {
  const explicitSections = (entry.sections || []).map((section, index) => ({
    kind: "section",
    key: makeSectionSourceKey(section.title),
    title: section.title,
    order: index
  }));

  const explicitKeys = new Set(explicitSections.map((section) => section.key));
  const inferredSections = Object.keys(entry.source.sectionPages || {})
    .filter((key) => !OMIT_SECTION_KEYS.has(key))
    .filter((key) => key !== "differentialDiagnosis" && key !== "comorbidity")
    .filter((key) => !explicitKeys.has(key))
    .map((key, index) => ({
      kind: "section",
      key,
      title: formatTitleFromKey(key),
      order: explicitSections.length + index
    }));

  return [...explicitSections, ...inferredSections];
}

function buildBoundaryDefinitions(entry, startOrder = 0) {
  const definitions = [];
  const differentialPages = entry.source.sectionPages?.differentialDiagnosis || [];
  const comorbidityPages = entry.source.sectionPages?.comorbidity || [];

  if (differentialPages.length) {
    definitions.push({
      kind: "boundary",
      key: "differentialDiagnosis",
      title: SECTION_TITLE_BY_KEY.differentialDiagnosis,
      order: startOrder
    });
  }

  if (comorbidityPages.length) {
    definitions.push({
      kind: "boundary",
      key: "comorbidity",
      title: SECTION_TITLE_BY_KEY.comorbidity,
      order: startOrder + definitions.length
    });
  }

  return definitions;
}

function attachPageOrder(entry, definitions) {
  return definitions
    .map((definition) => ({
      ...definition,
      pages: entry.source.sectionPages?.[definition.key] || [],
      firstPage: (entry.source.sectionPages?.[definition.key] || [Number.MAX_SAFE_INTEGER])[0]
    }))
    .filter((definition) => definition.pages.length > 0)
    .sort((left, right) => left.firstPage - right.firstPage || left.order - right.order);
}

function collectLinesForPages(pageTexts, pages) {
  const orderedPages = [...new Set((pages || []).filter(Boolean))].sort((left, right) => left - right);
  const lines = [];

  orderedPages.forEach((pageNumber) => {
    const pageText = pageTexts.get(pageNumber) || "";
    cleanPageLines(pageText).forEach((text) => {
      lines.push({
        page: pageNumber,
        text
      });
    });
  });

  return lines;
}

function findDescriptionStart(lines, entryName) {
  const candidates = titleCandidates(entryName);
  const titleMatch = findWindowMatch(lines, (normalizedWindow) =>
    candidates.some((candidate) => matchesDiagnosisTitle(normalizedWindow, candidate))
  );

  let startIndex = titleMatch ? titleMatch.end + 1 : 0;

  while (
    startIndex < lines.length &&
    /^\([^)]*\)$/.test(lines[startIndex].text) &&
    normalizeForMatch(entryName).includes(normalizeForMatch(lines[startIndex].text))
  ) {
    startIndex += 1;
  }

  while (startIndex < lines.length && isLikelyCodeLine(lines[startIndex].text)) {
    startIndex += 1;
  }

  return startIndex;
}

function hasEntryBoundaryContext(lines, headingEndIndex) {
  const boundaryIndicators = [
    "diagnostic criteria",
    "specifiers",
    "recording procedures",
    "description",
    "diagnostic features"
  ];

  return lines.slice(headingEndIndex + 1, headingEndIndex + 5).some((line) => {
    const normalizedLine = normalizeForMatch(line.text);
    return (
      isLikelyCodeLine(line.text) ||
      boundaryIndicators.some((indicator) => normalizedLine === indicator || normalizedLine.startsWith(`${indicator} `))
    );
  });
}

function hasDiagnosticCriteriaAhead(lines, headingEndIndex) {
  return lines
    .slice(headingEndIndex + 1, headingEndIndex + 5)
    .some((line) => normalizeForMatch(line.text) === "diagnostic criteria");
}

function isLikelyChapterBoundary(normalizedWindow, lines, headingEndIndex) {
  if (!normalizedWindow || normalizedWindow === "diagnostic criteria") {
    return false;
  }

  const rawLine = lines[headingEndIndex]?.text || "";
  if (/[.!?:;)]$/.test(rawLine)) {
    return false;
  }

  if (!hasDiagnosticCriteriaAhead(lines, headingEndIndex)) {
    return false;
  }

  return normalizedWindow.split(" ").length <= 5 && /^[a-z ]+$/.test(normalizedWindow);
}

function findNextBoundary(lines, startIndex, currentEntryId, nextDefinitions, entryTitleMatchers) {
  const nextMatchers = nextDefinitions.map((definition) => ({
    type: "section",
    definition,
    matcher: (normalizedWindow) => matchesSectionHeading(normalizedWindow, definition.key, definition.title)
  }));

  const titleMatchers = entryTitleMatchers
    .filter((matcher) => matcher.entryId !== currentEntryId)
    .map((matcher) => ({
      type: "entry",
      matcher: (normalizedWindow) =>
        matcher.candidates.some((candidate) => matchesDiagnosisTitle(normalizedWindow, candidate))
    }));

  const matchers = [...nextMatchers, ...titleMatchers];

  for (let index = startIndex; index < lines.length; index += 1) {
    for (let windowSize = 1; windowSize <= 3; windowSize += 1) {
      const normalizedWindow = normalizeForMatch(buildLineWindow(lines, index, windowSize));
      if (!normalizedWindow) {
        continue;
      }

      const headingEndIndex = Math.min(index + windowSize - 1, lines.length - 1);

      if (nextMatchers.some((candidate) => candidate.matcher(normalizedWindow))) {
        return index;
      }

      if (windowSize === 1 && isLikelyChapterBoundary(normalizedWindow, lines, headingEndIndex)) {
        return index;
      }

      if (normalizedWindow === "diagnostic criteria") {
        return index;
      }

      if (windowSize === 1 && INTERNAL_BOUNDARY_TITLES.has(normalizedWindow)) {
        return index;
      }

      const isEntryBoundary = titleMatchers.some((candidate) => candidate.matcher(normalizedWindow));
      const previousLineEndsParagraph =
        index === 0 || /[.!?)]$/.test(lines[index - 1]?.text || "");
      if (
        isEntryBoundary &&
        ((windowSize === 1 && previousLineEndsParagraph) ||
          hasEntryBoundaryContext(lines, headingEndIndex))
      ) {
        return index;
      }
    }
  }

  return lines.length;
}

function extractSectionContent(lines, entry, definition, nextDefinitions, entryTitleMatchers) {
  if (!lines.length) {
    return "";
  }

  let startIndex;
  let endIndexOverride = null;

  if (definition.key === "description") {
    startIndex = findDescriptionStart(lines, entry.name);
  } else {
    const headingMatch = findWindowMatch(lines, (normalizedWindow) =>
      matchesSectionHeading(normalizedWindow, definition.key, definition.title)
    );

    if (headingMatch) {
      startIndex = headingMatch.end + 1;
      while (
        startIndex < lines.length &&
        /^\([^)]*\)$/.test(lines[startIndex].text) &&
        normalizeForMatch(definition.title).includes(normalizeForMatch(lines[startIndex].text))
      ) {
        startIndex += 1;
      }
    } else if (definition.key === "recordingProcedures") {
      const codingNoteMatch = findWindowMatch(
        lines,
        (normalizedWindow) => normalizedWindow === "coding note" || normalizedWindow.startsWith("coding note")
      );
      startIndex = codingNoteMatch ? codingNoteMatch.start : lines.length;
    } else if (definition.key === "diagnosticFeatures") {
      startIndex = findDescriptionStart(lines, entry.name);
      endIndexOverride = findNextRecognizedHeadingBoundary(lines, startIndex, [definition.key]);
    } else {
      startIndex = lines.length;
    }
  }

  if (startIndex < 0 || startIndex >= lines.length) {
    return "";
  }

  const endIndex = Math.min(
    findNextBoundary(lines, startIndex, entry.id, nextDefinitions, entryTitleMatchers),
    findNextRecognizedHeadingBoundary(lines, startIndex, [definition.key]),
    endIndexOverride ?? lines.length
  );
  return compactExtractedText(lines.slice(startIndex, endIndex).map((line) => line.text));
}

function loadPdfTextByPage(requiredPages) {
  const pdfPath = process.env.DSM_PDF_PATH || DEFAULT_PDF_PATH;

  if (!fs.existsSync(pdfPath)) {
    throw new Error(
      `DSM PDF not found at ${pdfPath}. Set DSM_PDF_PATH to the local sanctioned DSM-5-TR PDF before running build:data.`
    );
  }

  const pages = [...new Set(requiredPages.filter(Boolean))].sort((left, right) => left - right);
  if (!pages.length) {
    return new Map();
  }

  const result = spawnSync(DEFAULT_PYTHON, ["-c", PDF_TEXT_SOURCE, pdfPath], {
    encoding: "utf8",
    input: JSON.stringify({ pages }),
    maxBuffer: 64 * 1024 * 1024
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.error?.message || "Failed to extract DSM PDF text.");
  }

  const payload = JSON.parse(result.stdout || "{}");
  return new Map(
    Object.entries(payload).map(([page, text]) => [Number(page), normalizeText(text)])
  );
}

function findAutoMapEndPage(entries, entry) {
  const startPage = entry.source.titlePages?.[0];
  if (!startPage) {
    return null;
  }

  if (entry.source.autoMapEndPage) {
    return entry.source.autoMapEndPage;
  }

  const nextTitlePage = entries
    .filter((candidate) => candidate.chapterId === entry.chapterId && candidate.id !== entry.id)
    .flatMap((candidate) => candidate.source.titlePages || [])
    .filter((page) => page > startPage)
    .sort((left, right) => left - right)[0];

  return Math.min(
    nextTitlePage || startPage + 12,
    entry.source.chapterPages?.[1] || startPage + 12
  );
}

function collectRequiredPages(entries) {
  const pages = new Set();

  entries.forEach((entry) => {
    (entry.source.titlePages || []).forEach((page) => pages.add(page));
    Object.values(entry.source.sectionPages || {}).forEach((sectionPages) => {
      (sectionPages || []).forEach((page) => pages.add(page));
    });

    if (entry.source.autoMapSections || entry.source.autoDescription) {
      const startPage = entry.source.titlePages?.[0];
      const endPage = findAutoMapEndPage(entries, entry);
      if (startPage && endPage) {
        for (let page = startPage; page <= endPage; page += 1) {
          pages.add(page);
        }
      }
    }
  });

  return [...pages];
}

function deriveAutomaticSectionPages(entries, pageTexts) {
  entries.forEach((entry) => {
    if (!entry.source.autoMapSections && !entry.source.autoDescription) {
      return;
    }

    const startPage = entry.source.titlePages?.[0];
    const endPage = findAutoMapEndPage(entries, entry);
    if (!startPage || !endPage) {
      return;
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    const lines = collectLinesForPages(pageTexts, pages);
    const entryCandidates = titleCandidates(entry.name);
    const titleMatch = findWindowMatch(lines, (normalizedWindow) =>
      entryCandidates.some((candidate) => matchesDiagnosisTitle(normalizedWindow, candidate))
    );
    const scanStart = titleMatch ? titleMatch.end + 1 : 0;
    const existingFunctionalKey = Object.keys(entry.source.sectionPages || {}).find((key) =>
      key.startsWith("functionalConsequences")
    );
    const definitions = Object.entries(SECTION_TITLE_BY_KEY)
      .filter(([key]) => key !== "description")
      .map(([key, title]) => ({ key, title }));

    if (existingFunctionalKey) {
      definitions.push({
        key: existingFunctionalKey,
        title: formatTitleFromKey(existingFunctionalKey)
      });
    } else {
      definitions.push({ key: "functionalConsequences", title: "Functional Consequences" });
    }

    const foundDefinitions = [];
    const seenKeys = new Set();
    definitions.forEach((definition) => {
      if (seenKeys.has(definition.key)) {
        return;
      }
      seenKeys.add(definition.key);

      const match = findWindowMatch(
        lines,
        (normalizedWindow) =>
          matchesSectionHeading(normalizedWindow, definition.key, definition.title),
        scanStart
      );
      if (match) {
        foundDefinitions.push({
          ...definition,
          lineIndex: match.start,
          page: lines[match.start]?.page || startPage
        });
      }
    });

    foundDefinitions.sort((left, right) => left.lineIndex - right.lineIndex);
    const sectionPages = {};
    foundDefinitions.forEach((definition, index) => {
      const nextPage = foundDefinitions[index + 1]?.page || endPage;
      sectionPages[definition.key] = Array.from(
        { length: nextPage - definition.page + 1 },
        (_, offset) => definition.page + offset
      );
    });

    if (
      entry.source.autoDescription ||
      (foundDefinitions.length === 0 && entry.criteria.length <= 1)
    ) {
      sectionPages.description = pages;
    }

    entry.source.sectionPages = sectionPages;
  });
}

export function hydrateEntriesWithVerbatimText(entries) {
  const requiredPages = collectRequiredPages(entries);
  const pageTexts = loadPdfTextByPage(requiredPages);
  deriveAutomaticSectionPages(entries, pageTexts);
  const entryTitleMatchers = buildEntryTitleMatchers(entries);

  entries.forEach((entry) => {
    const sectionDefinitions = attachPageOrder(entry, buildSectionDefinitions(entry));
    const boundaryDefinitions = attachPageOrder(
      entry,
      buildBoundaryDefinitions(entry, sectionDefinitions.length)
    );
    const orderedDefinitions = [...sectionDefinitions, ...boundaryDefinitions].sort(
      (left, right) => left.firstPage - right.firstPage || left.order - right.order
    );
    const extractedSections = [];

    sectionDefinitions.forEach((definition, index) => {
      const lines = collectLinesForPages(pageTexts, definition.pages);
      const nextDefinitions = orderedDefinitions.slice(orderedDefinitions.indexOf(definition) + 1);
      const content = extractSectionContent(lines, entry, definition, nextDefinitions, entryTitleMatchers);

      if (content) {
        extractedSections.push({
          id: `${definition.key}-${index}`,
          title: definition.title,
          content
        });
      }
    });

    const differentialDefinition = boundaryDefinitions.find(
      (definition) => definition.key === "differentialDiagnosis"
    );
    const differentialLines = collectLinesForPages(pageTexts, differentialDefinition?.pages || []);
    const differentialContent = differentialDefinition
      ? extractSectionContent(
          differentialLines,
          entry,
          differentialDefinition,
          orderedDefinitions.slice(orderedDefinitions.indexOf(differentialDefinition) + 1),
          entryTitleMatchers
        )
      : "";

    const comorbidityDefinition = boundaryDefinitions.find(
      (definition) => definition.key === "comorbidity"
    );
    const comorbidityLines = collectLinesForPages(pageTexts, comorbidityDefinition?.pages || []);
    const comorbidityContent = comorbidityDefinition
      ? extractSectionContent(
          comorbidityLines,
          entry,
          comorbidityDefinition,
          orderedDefinitions.slice(orderedDefinitions.indexOf(comorbidityDefinition) + 1),
          entryTitleMatchers
        )
      : "";

    entry.sections = extractedSections;
    entry.differentialDiagnosis = differentialContent;
    entry.comorbidity = comorbidityContent;
  });

  return entries;
}
