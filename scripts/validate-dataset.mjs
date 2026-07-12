import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = new URL("../", import.meta.url);
const DATASET_PATH = new URL("../data/dsm-dataset.json", import.meta.url);
const DATASET_MODULE_PATH = new URL("../data/dsm-dataset.js", import.meta.url);
const MANUAL_OVERRIDE_AUDIT_PATH = new URL("../data/manual-override-audit.json", import.meta.url);

const ALLOWED_CODING_STRATEGIES = new Set([
  "fixed",
  "fixed-with-additional",
  "option-map",
  "composite",
  "needs-review",
  "none"
]);
const ALLOWED_CODING_CONDITIONS = new Set([
  "selection",
  "no-selection-in-group",
  "criteria-count-between",
  "criteria-count-at-least"
]);

function listRuntimeAssetFiles() {
  const runtimeRoot = new URL("../src/", import.meta.url);
  const files = [new URL("../index.html", import.meta.url)];

  fs.readdirSync(runtimeRoot, { recursive: true, withFileTypes: true }).forEach((entry) => {
    if (!entry.isFile()) {
      return;
    }

    const relativePath = entry.parentPath
      ? path.relative(runtimeRoot.pathname, path.join(entry.parentPath, entry.name))
      : entry.name;

    if (!/\.(css|js|html)$/i.test(relativePath)) {
      return;
    }

    files.push(new URL(`../src/${relativePath}`, import.meta.url));
  });

  return files;
}

function readJson(url) {
  return JSON.parse(fs.readFileSync(url, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateNoExternalRuntimeUrls() {
  const disallowedMatches = [];
  const pattern = /https?:\/\/[^\s"'()<>]+/g;

  for (const fileUrl of listRuntimeAssetFiles()) {
    const content = fs.readFileSync(fileUrl, "utf8");
    const matches = content.match(pattern) || [];

    matches.forEach((match) => {
      disallowedMatches.push({
        file: path.relative(new URL("../", import.meta.url).pathname, fileUrl.pathname),
        url: match
      });
    });
  }

  assert(disallowedMatches.length === 0, `Disallowed runtime URL(s) found: ${JSON.stringify(disallowedMatches)}`);
}

function validateRuntimeGuards() {
  const indexHtml = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert(indexHtml.includes("Content-Security-Policy"), "index.html should declare a Content-Security-Policy");
  assert(indexHtml.includes("default-src 'self'"), "CSP should restrict runtime assets to self");
  assert(indexHtml.includes('name="referrer" content="no-referrer"'), "index.html should disable referrers");
}

function validateDataset() {
  const dataset = readJson(DATASET_PATH);
  const chapterIds = new Set();
  const entryIds = new Set();
  const chapterLookup = new Map();

  assert(dataset.meta?.hosting?.target === "GitHub Pages", "Hosting target should be GitHub Pages");
  assert(fs.existsSync(DATASET_MODULE_PATH), "Generated dataset JS module should exist");
  assert(dataset.meta?.hosting?.staticAssetOnly === true, "Dataset should declare staticAssetOnly hosting");
  assert(
    dataset.meta?.hosting?.thirdPartyRuntimeRequestsAllowed === false,
    "Dataset should declare third-party runtime requests disabled"
  );
  assert(
    dataset.meta?.source?.narrativePrimarySource === "DSM-5-TR full manual PDF",
    "Narrative primary source should be the DSM-5-TR full manual PDF"
  );
  assert(
    dataset.meta?.source?.criteriaPrimarySource === "DSM-5-TR full manual PDF",
    "Criteria primary source should be the DSM-5-TR full manual PDF"
  );
  assert(
    dataset.meta?.source?.legacyNarrativeBlueprintsEnabled === false,
    "Legacy narrative blueprints should be disabled in generated data"
  );
  assert(
    dataset.meta?.source?.legacyNarrativeFallbackEnabled === false,
    "Legacy narrative fallback should be disabled in generated data"
  );
  assert(fs.existsSync(MANUAL_OVERRIDE_AUDIT_PATH), "Manual override audit JSON should exist");

  dataset.chapters.forEach((chapter) => {
    assert(!chapterIds.has(chapter.id), `Duplicate chapter id: ${chapter.id}`);
    chapterIds.add(chapter.id);
    chapterLookup.set(chapter.id, chapter);
  });

  dataset.entries.forEach((entry) => {
    assert(!entryIds.has(entry.id), `Duplicate entry id: ${entry.id}`);
    entryIds.add(entry.id);
    assert(chapterLookup.has(entry.chapterId), `Missing chapter for entry: ${entry.id}`);
    assert(ALLOWED_CODING_STRATEGIES.has(entry.coding.strategy), `Unknown coding strategy: ${entry.id}`);
    assert(entry.source?.titlePages?.length > 0, `Missing title-page reference: ${entry.id}`);
    assert(typeof entry.recording?.mode === "string", `Missing recording mode: ${entry.id}`);

    entry.specifiers.forEach((specifier) => {
      assert(specifier.options.length > 0, `Specifier has no options: ${entry.id} :: ${specifier.name}`);
      assert(
        typeof specifier.allowsEmpty === "boolean",
        `Specifier allowsEmpty must be boolean: ${entry.id} :: ${specifier.name}`
      );
      assert(
        typeof specifier.isComputed === "boolean",
        `Specifier isComputed must be boolean: ${entry.id} :: ${specifier.name}`
      );
      assert(
        Number.isInteger(specifier.minSelections) && specifier.minSelections >= 1,
        `Specifier minSelections must be an integer >= 1: ${entry.id} :: ${specifier.name}`
      );
      assert(
        specifier.reportLabelMode === "options" || specifier.reportLabelMode === "group",
        `Specifier reportLabelMode must be options or group: ${entry.id} :: ${specifier.name}`
      );
    });

    (entry.coding.inputs || []).forEach((inputGroup) => {
      assert(inputGroup.options.length > 0, `Coding input has no options: ${entry.id} :: ${inputGroup.name}`);
      assert(
        typeof inputGroup.allowsEmpty === "boolean",
        `Coding input allowsEmpty must be boolean: ${entry.id} :: ${inputGroup.name}`
      );
    });

    (entry.recording.fields || []).forEach((field) => {
      assert(field.key, `Recording field missing key: ${entry.id}`);
      assert(field.label, `Recording field missing label: ${entry.id}`);
    });

    const codingGroups = [...entry.specifiers, ...(entry.coding.inputs || [])];
    const codingRules = [
      ...(entry.coding.rules || []),
      ...(entry.coding.additionalCodeRules || [])
    ];

    codingRules.forEach((rule, ruleIndex) => {
      assert(rule.code, `Coding rule missing code: ${entry.id} :: rule ${ruleIndex}`);
      (rule.conditions || []).forEach((condition) => {
        assert(
          ALLOWED_CODING_CONDITIONS.has(condition.type),
          `Unknown coding condition: ${entry.id} :: ${condition.type}`
        );
        if (!["selection", "no-selection-in-group"].includes(condition.type)) {
          return;
        }

        const group = codingGroups.find((candidate) => candidate.id === condition.group);
        assert(
          group,
          `Coding condition must use a canonical group id: ${entry.id} :: ${condition.group}`
        );
        if (condition.type === "selection") {
          assert(
            group.options.some((option) => option.id === condition.option),
            `Coding condition must use a canonical option id: ${entry.id} :: ${condition.option}`
          );
        }
      });
    });

    const catalogCodes = new Set(entry.codes.map((candidate) => candidate.code));
    const codingOutputCodes = [
      entry.coding.code,
      entry.coding.defaultCode,
      ...(entry.coding.rules || []).map((rule) => rule.code),
      ...(entry.coding.additionalCodeRules || []).map((rule) => rule.code)
    ].filter(Boolean);
    codingOutputCodes.forEach((code) => {
      assert(
        catalogCodes.has(code),
        `Coding output is absent from the entry code catalog: ${entry.id} :: ${code}`
      );
    });
  });

  assert(
    dataset.entries.every((entry) => entry.coding.strategy !== "needs-review"),
    "All entries should resolve to a concrete coding strategy or explicit recording input"
  );

  const auditedWithoutSections = dataset.entries.filter(
    (entry) =>
      ["reviewed", "corrected"].includes(entry.audit.status) &&
      entry.kind !== "clinical-focus-condition" &&
      !(entry.sections || []).length
  );
  assert(
    auditedWithoutSections.length === 0,
    `Audited entries should have sourced narrative sections: ${auditedWithoutSections.map((entry) => entry.id).join(", ")}`
  );

  const pilotEntries = [
    "neurodevelopmental-disorders-autism-spectrum-disorder",
    "disruptive-impulse-control-and-conduct-disorders-oppositional-defiant-disorder",
    "substance-related-and-addictive-disorders-alcohol-use-disorder",
    "sleep-wake-disorders-breathing-related-sleep-disorders"
  ];

  pilotEntries.forEach((entryId) => {
    const entry = dataset.entries.find((item) => item.id === entryId);
    assert(entry, `Missing pilot entry: ${entryId}`);
    assert(entry.audit.status === "reviewed", `Pilot entry should be reviewed: ${entryId}`);
  });

  const manualOverrideAudit = readJson(MANUAL_OVERRIDE_AUDIT_PATH);
  assert(
    manualOverrideAudit.meta?.entriesWithNarrativeOverrideFields === manualOverrideAudit.entries?.length,
    "Manual override audit entry count should match the listed entries"
  );
  assert(
    manualOverrideAudit.meta?.entriesWithSectionContent ===
      manualOverrideAudit.entries.filter((entry) => (entry.sectionTitlesWithContent || []).length > 0).length,
    "Manual override audit section-content count should be internally consistent"
  );
  assert(
    manualOverrideAudit.meta?.entriesWithDifferentialDiagnosis ===
      manualOverrideAudit.entries.filter((entry) => entry.hasDifferentialDiagnosis).length,
    "Manual override audit differential count should be internally consistent"
  );
  assert(
    manualOverrideAudit.meta?.entriesWithComorbidity ===
      manualOverrideAudit.entries.filter((entry) => entry.hasComorbidity).length,
    "Manual override audit comorbidity count should be internally consistent"
  );
  assert(
    manualOverrideAudit.meta?.entriesWithNarrativeOverrideFields === 0,
    "Manual override narrative debt should be fully cleared"
  );
}

function main() {
  validateDataset();
  validateNoExternalRuntimeUrls();
  validateRuntimeGuards();
  console.log("Dataset and runtime asset validation passed.");
}

main();
