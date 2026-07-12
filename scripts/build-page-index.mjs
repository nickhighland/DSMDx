import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT_DIR = new URL("../", import.meta.url);
const DATASET_PATH = new URL("../data/dsm-dataset.json", import.meta.url);
const OUTPUT_PATH = new URL("../data/dsm-page-index.json", import.meta.url);

const DEFAULT_PDF_PATH = "/Users/nickhighland/Downloads/DSM 5 TR-APA (2022).pdf";
const BUNDLED_PYTHON_PATH = path.join(
  process.env.HOME || "",
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"
);
const DEFAULT_PYTHON = fs.existsSync(BUNDLED_PYTHON_PATH) ? BUNDLED_PYTHON_PATH : "python3";

const PAGE_INDEX_OVERRIDES = {
  "Schizophrenia Spectrum and Other Psychotic Disorders::Other Specified Schizophrenia Spectrum and Other Psychotic Disorder": {
    titlePages: [252]
  },
  "Depressive Disorders::Persistent Depressive Disorder (Dysthymia)": {
    titlePages: [320],
    sectionPages: {
      criteria: [320],
      specifiers: [321, 322],
      diagnosticFeatures: [322],
      riskAndPrognosticFactors: [323],
      differentialDiagnosis: [324, 325],
      comorbidity: [325]
    }
  },
  "Anxiety Disorders::Social Anxiety Disorder (Social Phobia)": {
    titlePages: [367],
    sectionPages: {
      criteria: [367],
      specifiers: [368],
      diagnosticFeatures: [368],
      prevalence: [370],
      riskAndPrognosticFactors: [371],
      associationWithSuicidalThoughtsOrBehavior: [372],
      comorbidity: [374]
    }
  },
  "Somatic Symptom and Related Disorders::Factitious Disorder Imposed on Another (Previously Factitious Disorder by Proxy)": {
    titlePages: [538],
    sectionPages: {
      criteria: [538],
      recordingProcedures: [538],
      diagnosticFeatures: [538, 539],
      associatedFeatures: [539],
      prevalence: [539],
      developmentAndCourse: [539],
      sexAndGenderRelatedDiagnosticIssues: [540]
    }
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Other Specified Disruptive, Impulse-Control, and Conduct Disorder": {
    titlePages: [751]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Unspecified Disruptive, Impulse-Control, and Conduct Disorder": {
    titlePages: [752]
  },
  "Neurodevelopmental Disorders::Unspecified Intellectual Developmental Disorder (Intellectual Disability)": {
    titlePages: [142],
    sectionPages: {
      criteria: [142]
    }
  },
  "Sleep-Wake Disorders::Unspecified Circadian Rhythm Sleep-Wake Disorder": {
    titlePages: [631]
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Tardive Dystonia and Tardive Akathisia": {
    titlePages: [1080],
    sectionPages: {
      diagnosticFeatures: [1080]
    }
  }
};

const PYTHON_SOURCE = String.raw`
import json
import re
import sys
import unicodedata

try:
    from pypdf import PdfReader
except Exception as exc:
    print(f"Unable to import pypdf: {exc}", file=sys.stderr)
    sys.exit(2)


def normalize(value):
    text = unicodedata.normalize("NFKD", str(value or ""))
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = text.replace("'", "").replace("’", "")
    text = text.replace("—", " ").replace("–", " ")
    text = text.replace("-", " ")
    text = text.replace("&", " and ")
    text = text.replace("/", " ")
    text = re.sub(r"[\\(\\)\\[\\]\\{\\}:;,.'’\"“”!?]", " ", text)
    text = re.sub(r"\\s+", " ", text).strip()
    return text


def strip_parenthetical(value):
    return re.sub(r"\\s*\\([^)]*\\)", "", value).strip()


def candidate_names(name):
    candidates = [name]
    without_parenthetical = strip_parenthetical(name)
    if without_parenthetical and without_parenthetical not in candidates:
        candidates.append(without_parenthetical)
    if ":" in name:
        after_colon = name.split(":", 1)[1].strip()
        if after_colon and after_colon not in candidates:
            candidates.append(after_colon)
        before_colon = name.split(":", 1)[0].strip()
        if before_colon and before_colon not in candidates:
            candidates.append(before_colon)
    if " and " in name.lower():
        parts = [part.strip() for part in re.split(r"\\band\\b", name, flags=re.IGNORECASE) if part.strip()]
        for part in parts:
            if part not in candidates:
                candidates.append(part)
    return [candidate for candidate in candidates if candidate]


def make_section_key(title):
    parts = [part for part in normalize(title).split(" ") if part]
    if not parts:
        return "section"
    return parts[0] + "".join(part.capitalize() for part in parts[1:])


def scan_pages(reader, entry):
    start_page = max((entry.get("chapterPages") or [1])[0], 1)
    end_page = min((entry.get("chapterPages") or [len(reader.pages), len(reader.pages)])[1], len(reader.pages))
    candidates = [normalize(candidate) for candidate in candidate_names(entry["name"]) if normalize(candidate)]
    title_hits = []

    for page_number in range(start_page, end_page + 1):
        cached_page = PAGE_CACHE.get(page_number)
        if not cached_page:
            continue

        score = 0
        for candidate in candidates:
            if candidate in cached_page["lines"]:
                score = max(score, 100)
            if any(candidate == line for line in cached_page["lines"][:25]):
                score = max(score, 95)
            if any(
                candidate in line and len(line) <= len(candidate) + 24
                for line in cached_page["lines"][:40]
            ):
                score = max(score, 90)
            if candidate in cached_page["text"]:
                score = max(score, 70)

        if score > 0:
            title_hits.append({"page": page_number, "score": score})

    title_hits.sort(key=lambda item: (-item["score"], item["page"]))
    title_pages = [title_hits[0]["page"]] if title_hits else []

    section_pages = {}
    if title_pages:
      scan_end = min(end_page, title_pages[0] + 6)
      section_targets = []

      if entry.get("hasCriteria"):
          section_targets.append(("criteria", "Diagnostic Criteria"))
      if entry.get("hasSpecifiers"):
          section_targets.append(("specifiers", "Specifiers"))
      if entry.get("hasDifferentialDiagnosis"):
          section_targets.append(("differentialDiagnosis", "Differential Diagnosis"))
      if entry.get("hasComorbidity"):
          section_targets.append(("comorbidity", "Comorbidity"))

      for title in entry.get("sectionTitles", []):
          section_targets.append((make_section_key(title), title))

      seen_keys = set()
      for key, label in section_targets:
          if key in seen_keys:
              continue
          seen_keys.add(key)

          target = normalize(label)
          matches = []
          for page_number in range(title_pages[0], scan_end + 1):
              cached = PAGE_CACHE.get(page_number)
              if not cached:
                  continue
              if target in cached["lines"] or target in cached["text"]:
                  matches.append(page_number)

          if matches:
              section_pages[key] = matches

    return {
        "titlePages": title_pages,
        "sectionPages": section_pages
    }


def main():
    dataset = json.load(sys.stdin)
    pdf_path = sys.argv[1]
    reader = PdfReader(pdf_path)
    relevant_pages = set()
    for entry in dataset["entries"]:
        chapter_pages = entry.get("chapterPages") or [1, len(reader.pages)]
        for page_number in range(max(chapter_pages[0], 1), min(chapter_pages[1], len(reader.pages)) + 1):
            relevant_pages.add(page_number)

    global PAGE_CACHE
    PAGE_CACHE = {}
    for page_number in sorted(relevant_pages):
        text = reader.pages[page_number - 1].extract_text() or ""
        PAGE_CACHE[page_number] = {
            "text": normalize(text),
            "lines": [normalize(line) for line in text.splitlines() if normalize(line)]
        }

    result = {
        "generatedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "pdfPath": pdf_path,
        "entryCount": len(dataset["entries"]),
        "entries": {}
    }

    for entry in dataset["entries"]:
        result["entries"][entry["key"]] = scan_pages(reader, entry)

    json.dump(result, sys.stdout)


main()
`;

function readDataset() {
  return JSON.parse(fs.readFileSync(DATASET_PATH, "utf8"));
}

function buildEntryPayload(dataset) {
  return {
    entries: dataset.entries.map((entry) => ({
      key: `${entry.chapterTitle}::${entry.name}`,
      name: entry.name,
      chapterPages: entry.source.chapterPages,
      hasCriteria: entry.criteria.length > 0,
      hasSpecifiers: entry.specifiers.length > 0,
      hasDifferentialDiagnosis: Boolean(entry.differentialDiagnosis),
      hasComorbidity: Boolean(entry.comorbidity),
      sectionTitles: entry.sections.map((section) => section.title).filter(Boolean)
    }))
  };
}

function main() {
  const dataset = readDataset();
  const pdfPath = process.env.DSMDX_PDF_PATH || DEFAULT_PDF_PATH;
  const pythonBin = process.env.DSMDX_PYTHON || DEFAULT_PYTHON;

  if (!fs.existsSync(pdfPath)) {
    throw new Error(
      `DSM PDF not found at ${pdfPath}. Set DSMDX_PDF_PATH to the local DSM-5-TR PDF path before running build:pages.`
    );
  }

  const payload = JSON.stringify(buildEntryPayload(dataset));
  const result = spawnSync(pythonBin, ["-c", PYTHON_SOURCE, pdfPath], {
    cwd: ROOT_DIR.pathname,
    encoding: "utf8",
    input: payload,
    maxBuffer: 32 * 1024 * 1024
  });

  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || "Failed to generate DSM page index.");
  }

  const pageIndex = JSON.parse(result.stdout);
  Object.entries(PAGE_INDEX_OVERRIDES).forEach(([key, override]) => {
    const baseEntry = pageIndex.entries[key] || { titlePages: [], sectionPages: {} };
    pageIndex.entries[key] = {
      ...baseEntry,
      ...override,
      sectionPages: {
        ...(baseEntry.sectionPages || {}),
        ...(override.sectionPages || {})
      }
    };
  });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(pageIndex, null, 2)}\n`);

  const withTitlePages = Object.values(pageIndex.entries).filter(
    (entry) => Array.isArray(entry.titlePages) && entry.titlePages.length > 0
  ).length;

  console.log(
    `Wrote DSM page index for ${withTitlePages}/${dataset.entries.length} entries -> ${path.relative(ROOT_DIR.pathname, OUTPUT_PATH.pathname)}`
  );
}

main();
