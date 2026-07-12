import fs from "node:fs";

import { MANUAL_ENTRY_OVERRIDES } from "./manual-overrides.mjs";

const JSON_OUTPUT_PATH = new URL("../data/manual-override-audit.json", import.meta.url);
const MARKDOWN_OUTPUT_PATH = new URL("../docs/manual-override-audit.md", import.meta.url);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function collectEntryAuditRows() {
  return Object.entries(MANUAL_ENTRY_OVERRIDES)
    .map(([key, override]) => {
      const [chapterTitle, ...entryNameParts] = key.split("::");
      const entryName = entryNameParts.join("::");
      const sectionsWithContent = (override.sections || [])
        .filter((section) => normalizeText(section.content))
        .map((section) => section.title);
      const hasDifferentialDiagnosis = Boolean(normalizeText(override.differentialDiagnosis));
      const hasComorbidity = Boolean(normalizeText(override.comorbidity));

      if (!sectionsWithContent.length && !hasDifferentialDiagnosis && !hasComorbidity) {
        return null;
      }

      return {
        key,
        chapterTitle,
        entryName,
        sectionTitlesWithContent: sectionsWithContent,
        hasDifferentialDiagnosis,
        hasComorbidity
      };
    })
    .filter(Boolean)
    .sort(
      (left, right) =>
        left.chapterTitle.localeCompare(right.chapterTitle) ||
        left.entryName.localeCompare(right.entryName)
    );
}

function summarizeByChapter(entries) {
  const chapterMap = new Map();

  entries.forEach((entry) => {
    const summary = chapterMap.get(entry.chapterTitle) || {
      chapterTitle: entry.chapterTitle,
      affectedEntries: 0,
      entriesWithSectionContent: 0,
      entriesWithDifferentialDiagnosis: 0,
      entriesWithComorbidity: 0
    };

    summary.affectedEntries += 1;

    if (entry.sectionTitlesWithContent.length) {
      summary.entriesWithSectionContent += 1;
    }

    if (entry.hasDifferentialDiagnosis) {
      summary.entriesWithDifferentialDiagnosis += 1;
    }

    if (entry.hasComorbidity) {
      summary.entriesWithComorbidity += 1;
    }

    chapterMap.set(entry.chapterTitle, summary);
  });

  return [...chapterMap.values()].sort(
    (left, right) =>
      right.affectedEntries - left.affectedEntries ||
      left.chapterTitle.localeCompare(right.chapterTitle)
  );
}

function buildAuditPayload() {
  const entries = collectEntryAuditRows();
  const chapters = summarizeByChapter(entries);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      totalOverrideEntries: Object.keys(MANUAL_ENTRY_OVERRIDES).length,
      entriesWithNarrativeOverrideFields: entries.length,
      entriesWithSectionContent: entries.filter((entry) => entry.sectionTitlesWithContent.length).length,
      entriesWithDifferentialDiagnosis: entries.filter((entry) => entry.hasDifferentialDiagnosis).length,
      entriesWithComorbidity: entries.filter((entry) => entry.hasComorbidity).length,
      totalSectionBlocksWithContent: entries.reduce(
        (count, entry) => count + entry.sectionTitlesWithContent.length,
        0
      ),
      affectedChapterCount: chapters.length
    },
    chapters,
    entries
  };
}

function buildMarkdownReport(payload) {
  const lines = [
    "# DSMDx Manual Override Narrative Audit",
    "",
    `Generated on ${payload.meta.generatedAt}.`,
    "",
    "These fields are no longer used as authoritative runtime narrative content.",
    "They remain in `scripts/manual-overrides.mjs` as source-level migration debt and should be removed or converted to page-only scaffolding.",
    "",
    "## Overall",
    "",
    `- Total manual override entries: ${payload.meta.totalOverrideEntries}`,
    `- Entries still carrying narrative override fields: ${payload.meta.entriesWithNarrativeOverrideFields}`,
    `- Entries with section body content: ${payload.meta.entriesWithSectionContent}`,
    `- Entries with differential diagnosis prose: ${payload.meta.entriesWithDifferentialDiagnosis}`,
    `- Entries with comorbidity prose: ${payload.meta.entriesWithComorbidity}`,
    `- Total section blocks with content: ${payload.meta.totalSectionBlocksWithContent}`,
    `- Affected chapters: ${payload.meta.affectedChapterCount}`,
    "",
    "## Chapters",
    ""
  ];

  payload.chapters.forEach((chapter) => {
    lines.push(`### ${chapter.chapterTitle}`);
    lines.push("");
    lines.push(`- Affected entries: ${chapter.affectedEntries}`);
    lines.push(`- Entries with section body content: ${chapter.entriesWithSectionContent}`);
    lines.push(
      `- Entries with differential diagnosis prose: ${chapter.entriesWithDifferentialDiagnosis}`
    );
    lines.push(`- Entries with comorbidity prose: ${chapter.entriesWithComorbidity}`);
    lines.push("");
  });

  lines.push("## Entries");
  lines.push("");

  payload.entries.forEach((entry) => {
    const flags = [];

    if (entry.sectionTitlesWithContent.length) {
      flags.push(`section content (${entry.sectionTitlesWithContent.join(", ")})`);
    }

    if (entry.hasDifferentialDiagnosis) {
      flags.push("differential diagnosis");
    }

    if (entry.hasComorbidity) {
      flags.push("comorbidity");
    }

    lines.push(`- ${entry.chapterTitle} :: ${entry.entryName} -> ${flags.join("; ")}`);
  });

  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main() {
  const payload = buildAuditPayload();
  fs.mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
  fs.mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
  fs.writeFileSync(JSON_OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  fs.writeFileSync(MARKDOWN_OUTPUT_PATH, buildMarkdownReport(payload));
  console.log(`Wrote manual override audit -> ${JSON_OUTPUT_PATH.pathname}`);
  console.log(`Wrote manual override audit report -> ${MARKDOWN_OUTPUT_PATH.pathname}`);
}

main();
