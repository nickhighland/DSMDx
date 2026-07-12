import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import {
  CHAPTER_METADATA,
  FINAL_AUDIT_CONFIG,
  MANUAL_ENTRY_OVERRIDES
} from "./manual-overrides.mjs";
import { hydrateEntriesWithVerbatimText } from "./lib/verbatim-text.mjs";

const ROOT_DIR = new URL("../", import.meta.url);
const LEGACY_DATA_PATH = new URL("../data/dsm-data.js", import.meta.url);
const OUTPUT_DATA_PATH = new URL("../data/dsm-dataset.json", import.meta.url);
const OUTPUT_MODULE_PATH = new URL("../data/dsm-dataset.js", import.meta.url);
const PAGE_INDEX_PATH = new URL("../data/dsm-page-index.json", import.meta.url);

const SINGLE_SELECT_GROUP_NAMES = new Set([
  "Severity",
  "Presentation",
  "Impairment Area",
  "Tic Type",
  "Type",
  "Subtype",
  "Subtypes",
  "Course",
  "Course (after 1 year)",
  "Course Specifiers",
  "Episode",
  "Current or Most Recent Episode",
  "Insight",
  "Onset",
  "Onset Specifier",
  "Onset Specifiers",
  "Onset Type",
  "Duration",
  "Duration Specifiers",
  "Context",
  "Activity Level Specifiers",
  "Target of Arousal",
  "Sexual Attraction",
  "Predominant Symptom",
  "Phobic Stimulus",
  "Symptom Features",
  "Symptom Type",
  "Substance Type",
  "Type Specifiers",
  "Severity Specifiers",
  "Remission Specifiers",
  "Remission",
  "Remission Status",
  "Intellectual Impairment",
  "Language Impairment",
  "Etiological Subtypes"
]);

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function loadLegacyData() {
  const source = fs.readFileSync(LEGACY_DATA_PATH, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox);
  return sandbox.window.DSM_DATA || {};
}

function loadPageIndex() {
  if (!fs.existsSync(PAGE_INDEX_PATH)) {
    return { entries: {} };
  }

  return JSON.parse(fs.readFileSync(PAGE_INDEX_PATH, "utf8"));
}

function normalizeDetails(details) {
  if (!details || typeof details !== "object") {
    return [];
  }

  return Object.entries(details).map(([label, value]) => ({
    id: slugify(label),
    label,
    value: normalizeText(value)
  }));
}

function normalizeCriteria(criteria = [], prefix = "criterion") {
  return criteria.map((criterion, index) => {
    const itemId = `${prefix}-${index}-${slugify(criterion.code || criterion.text || "item")}`;

    return {
      id: itemId,
      code: normalizeText(criterion.code),
      text: normalizeText(criterion.text),
      isHeader: Boolean(criterion.is_header),
      note: normalizeText(criterion.note),
      items: normalizeCriteria(criterion.sub_criteria || [], `${itemId}-item`),
      groups: (criterion.sub_categories || []).map((group, groupIndex) => ({
        id: `${itemId}-group-${groupIndex}-${slugify(group.name || "group")}`,
        name: normalizeText(group.name),
        items: normalizeCriteria(group.items || [], `${itemId}-group-${groupIndex}`)
      }))
    };
  });
}

function normalizeSpecifierOptions(specifier, specifierId) {
  const rawOptions =
    Array.isArray(specifier.options) && specifier.options.length > 0
      ? specifier.options
      : [
          {
            name: specifier.name,
            description: specifier.description || ""
          }
        ];

  return rawOptions.map((option, index) => {
    const optionName = typeof option === "string" ? option : option.name;
    const optionId = `${specifierId}-option-${index}-${slugify(optionName || "option")}`;

    return {
      id: optionId,
      name: normalizeText(optionName),
      description: normalizeText(typeof option === "string" ? "" : option.description),
      details: normalizeDetails(typeof option === "string" ? null : option.details),
      criteria: normalizeCriteria(typeof option === "string" ? [] : option.sub_criteria || [], `${optionId}-criterion`)
    };
  });
}

function inferAllowsEmpty(specifier) {
  if (typeof specifier.allowsEmpty === "boolean") {
    return specifier.allowsEmpty;
  }

  if (specifier.required === true) {
    return false;
  }

  return true;
}

function inferSelectionType(specifier, options) {
  if (specifier.selectionType) {
    return specifier.selectionType;
  }

  const withWithoutPair =
    options.length === 2 &&
    options.every((option) => /^(With|Without)\b/i.test(option.name || ""));

  if (!specifier.options || specifier.options.length === 0) {
    return "boolean";
  }

  if (options.length === 1) {
    return "boolean";
  }

  if (withWithoutPair || SINGLE_SELECT_GROUP_NAMES.has(specifier.name)) {
    return "single";
  }

  return "multiple";
}

function inferMinimumSelections(specifier, selectionType) {
  if (Number.isInteger(specifier.minSelections) && specifier.minSelections >= 1) {
    return specifier.minSelections;
  }

  return selectionType === "multiple" ? 1 : 1;
}

function inferReportLabelMode(specifier) {
  return specifier.reportLabelMode === "group" ? "group" : "options";
}

function normalizeSpecifiers(specifiers = [], entryId) {
  return specifiers.map((specifier, index) => {
    const specifierId = `${entryId}-specifier-${index}-${slugify(specifier.name || "specifier")}`;
    const options = normalizeSpecifierOptions(specifier, specifierId);
    const selectionType = inferSelectionType(specifier, options);

    return {
      id: specifierId,
      name: normalizeText(specifier.name),
      description: normalizeText(specifier.description),
      allowsEmpty: inferAllowsEmpty(specifier),
      selectionType,
      minSelections: inferMinimumSelections(specifier, selectionType),
      reportLabelMode: inferReportLabelMode(specifier),
      options
    };
  });
}

function normalizeSections(sectionSource) {
  if (!sectionSource) {
    return [];
  }

  if (Array.isArray(sectionSource)) {
    return sectionSource.map((section, index) => ({
      id: section.id || `${slugify(section.title || "section")}-${index}`,
      title: normalizeText(section.title),
      content: normalizeText(section.content)
    }));
  }

  return Object.entries(sectionSource).map(([title, content], index) => ({
    id: `${slugify(title)}-${index}`,
    title: normalizeText(title),
    content: normalizeText(content)
  }));
}

function normalizeSectionBlueprints(sectionSource) {
  return normalizeSections(sectionSource).map((section) => ({
    ...section,
    content: ""
  }));
}

function flattenCriteriaText(criteria = []) {
  const lines = [];

  function visit(items = []) {
    items.forEach((item) => {
      if (item.text) {
        lines.push(item.text);
      }

      if (item.note) {
        lines.push(item.note);
      }

      visit(item.items || []);

      (item.groups || []).forEach((group) => {
        if (group.name) {
          lines.push(group.name);
        }
        visit(group.items || []);
      });
    });
  }

  visit(criteria);
  return lines.join("\n");
}

function extractExampleSnippet(text) {
  const match = String(text || "").match(/e\.g\.,?\s*[“"'`]?([^)"'”`]+)[)"'”`]?/i);
  return normalizeText((match?.[1] || "").replace(/[,:;.]$/, ""));
}

function normalizeCodes(codeEntries = []) {
  return codeEntries.map((entry) => ({
    code: normalizeText(entry.code),
    label: normalizeText(entry.description)
  }));
}

function makeRecordingField(entryId, key, label, placeholder, description = "", multiline = false) {
  return {
    id: `${entryId}-recording-${slugify(key || label || "field")}`,
    key: normalizeText(key) || slugify(label || "field"),
    label: normalizeText(label),
    description: normalizeText(description),
    placeholder: normalizeText(placeholder),
    multiline: Boolean(multiline)
  };
}

function normalizeRecordingGuidance(recording = {}, entryId) {
  return {
    mode: normalizeText(recording.mode) || "standard",
    instructions: (recording.instructions || []).map(normalizeText).filter(Boolean),
    fields: (recording.fields || []).map((field, index) => ({
      id: field.id || `${entryId}-recording-${index}-${slugify(field.key || field.label || "field")}`,
      key: normalizeText(field.key) || slugify(field.label || `field-${index}`),
      label: normalizeText(field.label),
      description: normalizeText(field.description),
      placeholder: normalizeText(field.placeholder),
      multiline: Boolean(field.multiline)
    }))
  };
}

function inferRecordingGuidance(entryName, criteria, sections, entryId) {
  const criteriaText = flattenCriteriaText(criteria);
  const sectionText = sections
    .map((section) => normalizeText(section.content))
    .filter(Boolean)
    .join("\n");
  const recordingSection =
    sections.find((section) => normalizeLabel(section.title) === "recording procedures")?.content || "";
  const combinedText = [criteriaText, recordingSection, sectionText].filter(Boolean).join("\n");

  if (
    /must be listed immediately before the code for this disorder/i.test(combinedText) ||
    /should also be coded and listed separately immediately before/i.test(combinedText)
  ) {
    const fields = [
      makeRecordingField(
        entryId,
        "etiological-medical-condition",
        "Etiological medical condition",
        "e.g., complex partial seizures"
      ),
      makeRecordingField(
        entryId,
        "etiological-medical-condition-code",
        "Etiological medical condition code",
        "e.g., G40.209"
      )
    ];

    if (/followed by the specific symptomatic manifestation/i.test(combinedText)) {
      fields.push(
        makeRecordingField(
          entryId,
          "specific-symptomatic-manifestation",
          "Specific symptomatic manifestation",
          "e.g., dissociative symptoms"
        )
      );
    }

    return {
      mode: "medical-condition-first",
      instructions: [
        "List the etiological medical condition immediately before this diagnosis code.",
        "Replace 'another medical condition' in the diagnosis label with the specific condition name."
      ],
      fields
    };
  }

  if (/^Other Specified\b/i.test(entryName)) {
    const example = extractExampleSnippet(combinedText);

    return {
      mode: "other-specified-with-reason",
      instructions: ["Record the diagnosis label followed by the specific reason."],
      fields: [
        makeRecordingField(
          entryId,
          "specific-reason",
          "Specific reason",
          example ? `e.g., ${example}` : "Enter the specific reason"
        )
      ]
    };
  }

  if (
    /followed by the diagnostic code\(s\) for those conditions/i.test(recordingSection) ||
    /followed by the diagnostic code\(s\) for the comorbid conditions or disorders/i.test(recordingSection)
  ) {
    return {
      mode: "comorbid-conditions-after",
      instructions: [
        "When clinically relevant, record the diagnosis followed by the comorbid condition name or names.",
        "After the diagnosis statement, list the diagnostic code lines for those additional conditions."
      ],
      fields: [
        makeRecordingField(
          entryId,
          "comorbid-conditions",
          "Comorbid condition(s)",
          "e.g., moderate cocaine use disorder and trigeminal neuralgia"
        ),
        makeRecordingField(
          entryId,
          "related-diagnosis-codes",
          "Related diagnosis code line(s)",
          "e.g., F14.20 moderate cocaine use disorder; G50.0 trigeminal neuralgia"
        )
      ]
    };
  }

  if (
    /recorded first, followed by the induced sleep disorder/i.test(recordingSection) ||
    /listed first.*induced sexual dysfunction/i.test(recordingSection) ||
    /a separate diagnosis (?:for|of) the comorbid use disorder is not given/i.test(recordingSection) ||
    /a separate diagnosis (?:for|of) the comorbid use disorder is not given/i.test(combinedText) ||
    /an additional separate diagnosis of the comorbid substance use disorder is not given/i.test(combinedText) ||
    /listed first, followed by the word ["“”']with/i.test(combinedText) ||
    /listed first, followed by ["“”']with/i.test(combinedText) ||
    /it is recorded first, followed by the word ['"]with/i.test(combinedText)
  ) {
    return {
      mode: "substance-induced-first",
      instructions: [
        "If a comorbid substance use disorder is present, record it first and then the substance-induced disorder.",
        "If there is no comorbid substance use disorder, record only the substance-induced disorder."
      ],
      fields: [
        makeRecordingField(
          entryId,
          "comorbid-substance-use-disorder",
          "Comorbid substance use disorder (if present)",
          "e.g., severe alcohol use disorder"
        )
      ]
    };
  }

  if (/both factitious disorder imposed on self and on another can be diagnosed/i.test(recordingSection)) {
    return {
      mode: "dual-diagnosis-note",
      instructions: [
        "If deceptive presentation involves both self and another, both factitious disorder diagnoses may be recorded."
      ],
      fields: []
    };
  }

  return {
    mode: "standard",
    instructions: [],
    fields: []
  };
}

function buildCodingInputGroup(entryId, name, description, codeEntries) {
  const groupId = `${entryId}-coding-input-${slugify(name || "recording-option")}`;

  return {
    id: groupId,
    name: normalizeText(name),
    description: normalizeText(description),
    allowsEmpty: true,
    selectionType: "single",
    options: codeEntries.map((codeEntry, index) => ({
      id: `${groupId}-option-${index}-${slugify(codeEntry.label || codeEntry.code || `code-${index}`)}`,
      name: codeEntry.label || codeEntry.code,
      description: codeEntry.code ? `ICD-10-CM: ${codeEntry.code}` : "",
      details: [],
      criteria: []
    }))
  };
}

function inferKind(chapterTitle, legacyEntry, override = {}) {
  if (override.kind) {
    return override.kind;
  }

  if (chapterTitle === "Other Conditions That May Be a Focus of Clinical Attention") {
    return "clinical-focus-condition";
  }

  if (
    chapterTitle ===
    "Medication-Induced Movement Disorders and Other Adverse Effects of Medication"
  ) {
    return "clinical-focus-condition";
  }

  if (legacyEntry.name === "General Personality Disorder") {
    return "general-criteria";
  }

  if (!legacyEntry.icd_codes || legacyEntry.icd_codes.length === 0) {
    return "group";
  }

  if (
    (!legacyEntry.diagnostic_criteria || legacyEntry.diagnostic_criteria.length === 0) &&
    legacyEntry.full_text &&
    Object.keys(legacyEntry.full_text).length === 1 &&
    legacyEntry.full_text.Description
  ) {
    return "reference-entry";
  }

  return "diagnosis";
}

function normalizeLabel(value) {
  return normalizeText(value).toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function comparableLabel(value) {
  return normalizeLabel(String(value || "").replace(/^[A-Z]\d[\w.]*\s+/i, ""));
}

function hasVariablePlaceholderCode(codeValue) {
  return /x\.x|codes vary|varies by/i.test(codeValue);
}

function deriveRemissionCodes(entryName, mildCode, moderateSevereCode) {
  if (entryName === "Tobacco Use Disorder") {
    return {
      mild: null,
      moderateSevere: "F17.201"
    };
  }

  const mildRemission = mildCode?.code?.replace(/\.10$/, ".11") || null;
  const moderateSevereRemission = moderateSevereCode?.code?.replace(/\.20$/, ".21") || null;

  return {
    mild: mildRemission !== mildCode?.code ? mildRemission : null,
    moderateSevere:
      moderateSevereRemission !== moderateSevereCode?.code ? moderateSevereRemission : null
  };
}

function inferOptionMapRules(codes, specifiers) {
  const rules = [];

  for (const codeEntry of codes) {
    if (!codeEntry.label) {
      continue;
    }

    const normalizedCodeLabel = comparableLabel(codeEntry.label);

    for (const specifier of specifiers) {
      for (const option of specifier.options) {
        const normalizedOptionLabel = comparableLabel(option.name);

        if (
          normalizedCodeLabel === normalizedOptionLabel ||
          normalizedCodeLabel.includes(normalizedOptionLabel) ||
          normalizedOptionLabel.includes(normalizedCodeLabel)
        ) {
          rules.push({
            conditions: [{ type: "selection", group: specifier.id, option: option.id }],
            code: codeEntry.code
          });
        }
      }
    }
  }

  const uniqueRules = new Map();
  rules.forEach((rule) => {
    const key = `${rule.code}:${rule.conditions[0].group}:${rule.conditions[0].option}`;
    uniqueRules.set(key, rule);
  });

  return Array.from(uniqueRules.values());
}

function inferBooleanOptionMap(codes, specifiers) {
  if (codes.length !== 2) {
    return null;
  }

  for (const specifier of specifiers) {
    if (specifier.selectionType !== "boolean" || specifier.options.length !== 1) {
      continue;
    }

    const option = specifier.options[0];
    const normalizedOptionLabel = comparableLabel(option.name).replace(/^with\s+/, "");
    const withCode = codes.find((codeEntry) =>
      comparableLabel(codeEntry.label).includes(`with ${normalizedOptionLabel}`)
    );
    const withoutCode = codes.find((codeEntry) =>
      comparableLabel(codeEntry.label).includes(`without ${normalizedOptionLabel}`)
    );

    if (withCode && withoutCode) {
      return {
        strategy: "option-map",
        requireSelection: false,
        defaultCode: withoutCode.code,
        rules: [
          {
            conditions: [{ type: "selection", group: specifier.id, option: option.id }],
            code: withCode.code
          }
        ],
        notes: [],
        additionalCodeRules: inferAdditionalCodeRules(specifiers)
      };
    }
  }

  return null;
}

function inferUseDisorderCoding(entryName, codes, specifiers) {
  if (!entryName.endsWith("Use Disorder")) {
    return null;
  }

  const mildCodes = codes.filter((entry) => comparableLabel(entry.label).includes("mild"));
  const moderateSevereCodes = codes.filter(
    (entry) =>
      comparableLabel(entry.label).includes("moderate or severe") ||
      comparableLabel(entry.label).includes("moderate severe")
  );

  if (mildCodes.length === 0 || moderateSevereCodes.length === 0) {
    return null;
  }

  const severitySpec = specifiers.find((specifier) => slugify(specifier.name) === "severity");
  const substanceTypeSpec = specifiers.find((specifier) => slugify(specifier.name) === "substance-type");

  const computedGroups = severitySpec ? ["severity"] : [];
  const rules = [];
  const notes = ["Severity is derived from the number of criteria endorsed within the criteria checklist."];
  const remissionSpec = specifiers.find(
    (specifier) => slugify(specifier.name) === "remission-specifiers"
  );
  const remissionCodes = deriveRemissionCodes(entryName, mildCodes[0], moderateSevereCodes[0]);

  if (substanceTypeSpec) {
    substanceTypeSpec.options.forEach((option) => {
      const optionLabel = comparableLabel(option.name);
      const mildCode = mildCodes.find((entry) => comparableLabel(entry.label).includes(optionLabel));
      const moderateSevereCode = moderateSevereCodes.find((entry) =>
        comparableLabel(entry.label).includes(optionLabel)
      );
      const substanceSpecificRemissionCodes = deriveRemissionCodes(entryName, mildCode, moderateSevereCode);

      if (mildCode) {
        rules.push({
          conditions: [
            { type: "criteria-count-between", min: 2, max: 3 },
            { type: "selection", group: substanceTypeSpec.id, option: option.id }
          ],
          code: mildCode.code,
          derivedSelections: [{ group: "severity", option: "mild", label: "Mild" }]
        });
      }

      if (moderateSevereCode) {
        rules.push({
          conditions: [
            { type: "criteria-count-between", min: 4, max: 5 },
            { type: "selection", group: substanceTypeSpec.id, option: option.id }
          ],
          code: moderateSevereCode.code,
          derivedSelections: [{ group: "severity", option: "moderate", label: "Moderate" }]
        });

        rules.push({
          conditions: [
            { type: "criteria-count-at-least", min: 6 },
            { type: "selection", group: substanceTypeSpec.id, option: option.id }
          ],
          code: moderateSevereCode.code,
          derivedSelections: [{ group: "severity", option: "severe", label: "Severe" }]
        });
      }

      if (remissionSpec && remissionSpec.options.length > 0) {
        remissionSpec.options.forEach((remissionOption) => {
          const remissionKey = slugify(remissionOption.name);

          if (substanceSpecificRemissionCodes.mild) {
            rules.push({
              conditions: [
                { type: "criteria-count-between", min: 2, max: 3 },
                { type: "selection", group: substanceTypeSpec.id, option: option.id },
                { type: "selection", group: remissionSpec.id, option: remissionOption.id }
              ],
              code: substanceSpecificRemissionCodes.mild,
              derivedSelections: [
                { group: "severity", option: "mild", label: "Mild" },
                { group: "remission-specifiers", option: remissionKey, label: remissionOption.name }
              ]
            });
          }

          if (substanceSpecificRemissionCodes.moderateSevere) {
            rules.push({
              conditions: [
                { type: "criteria-count-between", min: 4, max: 5 },
                { type: "selection", group: substanceTypeSpec.id, option: option.id },
                { type: "selection", group: remissionSpec.id, option: remissionOption.id }
              ],
              code: substanceSpecificRemissionCodes.moderateSevere,
              derivedSelections: [
                { group: "severity", option: "moderate", label: "Moderate" },
                { group: "remission-specifiers", option: remissionKey, label: remissionOption.name }
              ]
            });

            rules.push({
              conditions: [
                { type: "criteria-count-at-least", min: 6 },
                { type: "selection", group: substanceTypeSpec.id, option: option.id },
                { type: "selection", group: remissionSpec.id, option: remissionOption.id }
              ],
              code: substanceSpecificRemissionCodes.moderateSevere,
              derivedSelections: [
                { group: "severity", option: "severe", label: "Severe" },
                { group: "remission-specifiers", option: remissionKey, label: remissionOption.name }
              ]
            });
          }
        });
      }
    });
  } else {
    const mildCode = mildCodes[0];
    const moderateSevereCode = moderateSevereCodes[0];

    rules.push({
      conditions: [{ type: "criteria-count-between", min: 2, max: 3 }],
      code: mildCode.code,
      derivedSelections: [{ group: "severity", option: "mild", label: "Mild" }]
    });
    rules.push({
      conditions: [{ type: "criteria-count-between", min: 4, max: 5 }],
      code: moderateSevereCode.code,
      derivedSelections: [{ group: "severity", option: "moderate", label: "Moderate" }]
    });
    rules.push({
      conditions: [{ type: "criteria-count-at-least", min: 6 }],
      code: moderateSevereCode.code,
      derivedSelections: [{ group: "severity", option: "severe", label: "Severe" }]
    });
  }

  if (!substanceTypeSpec && remissionSpec && remissionSpec.options.length > 0) {
    remissionSpec.options.forEach((option) => {
      const optionKey = slugify(option.name);

      if (remissionCodes.mild) {
        rules.push({
          conditions: [
            { type: "criteria-count-between", min: 2, max: 3 },
            { type: "selection", group: remissionSpec.id, option: option.id }
          ],
          code: remissionCodes.mild,
          derivedSelections: [
            { group: "severity", option: "mild", label: "Mild" },
            { group: "remission-specifiers", option: optionKey, label: option.name }
          ]
        });
      }

      if (remissionCodes.moderateSevere) {
        rules.push({
          conditions: [
            { type: "criteria-count-between", min: 4, max: 5 },
            { type: "selection", group: remissionSpec.id, option: option.id }
          ],
          code: remissionCodes.moderateSevere,
          derivedSelections: [
            { group: "severity", option: "moderate", label: "Moderate" },
            { group: "remission-specifiers", option: optionKey, label: option.name }
          ]
        });

        rules.push({
          conditions: [
            { type: "criteria-count-at-least", min: 6 },
            { type: "selection", group: remissionSpec.id, option: option.id }
          ],
          code: remissionCodes.moderateSevere,
          derivedSelections: [
            { group: "severity", option: "severe", label: "Severe" },
            { group: "remission-specifiers", option: optionKey, label: option.name }
          ]
        });
      }
    });
  }

  if (rules.length === 0) {
    return null;
  }

  if (moderateSevereCodes.length > 0) {
    notes.push("Moderate and severe share the same base code in the current dataset.");
  }

  if (remissionCodes.mild || remissionCodes.moderateSevere) {
    notes.push("Remission codes are derived from the DSM-5-TR coding appendix where available.");
  }

  if (entryName === "Tobacco Use Disorder") {
    notes.push("Tobacco use disorder has no separate mild remission code in DSM-5-TR; remission coding applies only to moderate or severe cases.");
  }

  return {
    strategy: "composite",
    computedGroups,
    notes,
    rules,
    additionalCodeRules: inferAdditionalCodeRules(specifiers)
  };
}

function inferAdditionalCodeRules(specifiers) {
  const catatoniaSpecifier = specifiers.find((specifier) => normalizeLabel(specifier.name) === "catatonia");
  if (!catatoniaSpecifier) {
    return [];
  }

  const catatoniaOption = catatoniaSpecifier.options.find(
    (option) => normalizeLabel(option.name) === "with catatonia"
  );

  if (!catatoniaOption) {
    return [];
  }

  return [
    {
      conditions: [{ type: "selection", group: catatoniaSpecifier.id, option: catatoniaOption.id }],
      code: "F06.1"
    }
  ];
}

function inferManualCodingSelection(entryId, codes, specifiers) {
  if (codes.length < 2 || codes.some((codeEntry) => hasVariablePlaceholderCode(codeEntry.code))) {
    return null;
  }

  const inputGroup = buildCodingInputGroup(
    entryId,
    "Recording Option",
    "Select the exact DSM/ICD recording option when the current dataset does not yet derive the code automatically.",
    codes
  );

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [inputGroup],
    rules: inputGroup.options.map((option, index) => ({
      conditions: [{ type: "selection", group: inputGroup.id, option: option.id }],
      code: codes[index].code
    })),
    notes: [
      "This diagnosis still needs a more structured audited rule set, so code selection is explicit rather than inferred."
    ],
    additionalCodeRules: inferAdditionalCodeRules(specifiers)
  };
}

function inferClinicalFocusCoding(entryName, entryId, codes) {
  if (codes.length < 2) {
    return null;
  }

  let inputName = "Status";
  if (/Abuse|Neglect|Violence/i.test(entryName)) {
    inputName = "Encounter and Status";
  } else if (/Parent-Child Relational Problem/i.test(entryName)) {
    inputName = "Relationship";
  }

  const inputGroup = buildCodingInputGroup(
    entryId,
    inputName,
    "Select the applicable DSM-5-TR code.",
    codes
  );

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [inputGroup],
    rules: inputGroup.options.map((option, index) => ({
      conditions: [{ type: "selection", group: inputGroup.id, option: option.id }],
      code: codes[index].code
    })),
    notes: [],
    additionalCodeRules: []
  };
}

function inferCoding(entryName, codes, specifiers, kind, entryId) {
  if (kind === "group" || codes.length === 0) {
    return {
      strategy: "none",
      displayLabel: "Not directly coded",
      notes: []
    };
  }

  if (codes.length === 1) {
    return {
      strategy: "fixed",
      code: codes[0].code,
      notes: [],
      additionalCodeRules: inferAdditionalCodeRules(specifiers)
    };
  }

  if (kind === "clinical-focus-condition") {
    const clinicalFocusCoding = inferClinicalFocusCoding(entryName, entryId, codes);
    if (clinicalFocusCoding) {
      return clinicalFocusCoding;
    }
  }

  const inferredUseDisorderCoding = inferUseDisorderCoding(entryName, codes, specifiers);
  if (inferredUseDisorderCoding) {
    return inferredUseDisorderCoding;
  }

  const optionMapRules = inferOptionMapRules(codes, specifiers);

  if (optionMapRules.length === codes.filter((code) => code.label).length && optionMapRules.length > 0) {
    return {
      strategy: "option-map",
      requireSelection: true,
      rules: optionMapRules,
      notes: [],
      additionalCodeRules: inferAdditionalCodeRules(specifiers)
    };
  }

  const booleanOptionMap = inferBooleanOptionMap(codes, specifiers);
  if (booleanOptionMap) {
    return booleanOptionMap;
  }

  const manualCodingSelection = inferManualCodingSelection(entryId, codes, specifiers);
  if (manualCodingSelection) {
    return manualCodingSelection;
  }

  return {
    strategy: "needs-review",
    displayLabel: "Code selection under review",
    notes: [
      "This entry has multiple possible codes and does not yet have a sufficiently audited rule set."
    ],
    candidateCodes: codes,
    additionalCodeRules: inferAdditionalCodeRules(specifiers)
  };
}

function applyAutismSeveritySplit(entry) {
  const severitySpecifier = entry.specifiers.find((specifier) => specifier.name === "Severity");
  if (!severitySpecifier) {
    return entry;
  }

  const socialCommunication = {
    id: `${entry.id}-specifier-social-communication-support-level`,
    name: "Social Communication Support Level",
    description:
      "Record the current support level for social communication difficulties as its own severity dimension.",
    selectionType: "single",
    options: severitySpecifier.options.map((option, index) => ({
      id: `${entry.id}-specifier-social-communication-support-level-option-${index}-${slugify(option.name)}`,
      name: option.name,
      description: "",
      details: option.details.filter((detail) => detail.label === "Social Communication"),
      criteria: []
    }))
  };

  const repetitiveBehavior = {
    id: `${entry.id}-specifier-restricted-repetitive-behavior-support-level`,
    name: "Restricted/Repetitive Behavior Support Level",
    description:
      "Record the current support level for restricted, repetitive behavior as a separate severity dimension.",
    selectionType: "single",
    options: severitySpecifier.options.map((option, index) => ({
      id: `${entry.id}-specifier-restricted-repetitive-behavior-support-level-option-${index}-${slugify(option.name)}`,
      name: option.name,
      description: "",
      details: option.details.filter((detail) => detail.label === "Restricted, Repetitive Behaviors"),
      criteria: []
    }))
  };

  entry.specifiers = entry.specifiers.flatMap((specifier) => {
    if (specifier.id !== severitySpecifier.id) {
      return [specifier];
    }

    return [socialCommunication, repetitiveBehavior];
  });
}

function normalizeBipolarStatusSpecifier(entry) {
  const statusSpecifier = entry.specifiers.find(
    (specifier) => specifier.name === "Severity/Psychotic/Remission Status"
  );

  if (statusSpecifier) {
    statusSpecifier.selectionType = "single";
  }

  if (entry.name === "Bipolar I Disorder" && statusSpecifier) {
    if (!statusSpecifier.options.some((option) => option.name === "Unspecified")) {
      statusSpecifier.options.push({
        id: `${statusSpecifier.id}-option-${statusSpecifier.options.length}-unspecified`,
        name: "Unspecified",
        description: "",
        details: [],
        criteria: []
      });
    }

    statusSpecifier.description =
      "Select one current-status label for the current or most recent episode. Use Mild, Moderate, Severe, or With psychotic features only when full manic or major depressive episode criteria are currently met. Use remission only when full episode criteria are not currently met.";
    return;
  }

  if (entry.name === "Bipolar II Disorder" && statusSpecifier) {
    statusSpecifier.description =
      "Select one current-status label. For depressed episodes, use Mild, Moderate, Severe, With psychotic features, or remission status as applicable. For hypomanic episodes, use remission status only when full criteria are not currently met.";
  }
}

function consolidateBipolarPsychoticFeatureType(entry) {
  const congruentIndex = entry.specifiers.findIndex(
    (specifier) => specifier.name === "Mood-Congruent Psychotic Features"
  );
  const incongruentIndex = entry.specifiers.findIndex(
    (specifier) => specifier.name === "Mood-Incongruent Psychotic Features"
  );

  if (congruentIndex === -1 || incongruentIndex === -1) {
    return;
  }

  const congruentSpecifier = entry.specifiers[congruentIndex];
  const incongruentSpecifier = entry.specifiers[incongruentIndex];
  const mergedSpecifier = {
    id: congruentSpecifier.id,
    name: "Psychotic Feature Type",
    description:
      "If psychotic features are present, specify whether they are mood-congruent or mood-incongruent.",
    allowsEmpty: true,
    selectionType: "single",
    options: [congruentSpecifier.options[0], incongruentSpecifier.options[0]].filter(Boolean),
    isComputed: false
  };

  entry.specifiers = entry.specifiers.filter(
    (_, index) => index !== congruentIndex && index !== incongruentIndex
  );
  entry.specifiers.splice(Math.min(congruentIndex, incongruentIndex), 0, mergedSpecifier);
}

function insertBipolarICurrentOrMostRecentEpisodeSpecifier(entry) {
  if (entry.specifiers.some((specifier) => specifier.name === "Current or Most Recent Episode")) {
    return;
  }

  entry.specifiers = [
    {
      id: `${entry.id}-specifier-current-or-most-recent-episode`,
      name: "Current or Most Recent Episode",
      description:
        "Specify whether the current or most recent episode is manic, hypomanic, depressed, or unspecified.",
      allowsEmpty: true,
      selectionType: "single",
      minSelections: 1,
      reportLabelMode: "options",
      options: [
        {
          id: `${entry.id}-specifier-current-or-most-recent-episode-option-0-current-or-most-recent-episode-manic`,
          name: "Current or most recent episode manic",
          description: "",
          details: [],
          criteria: []
        },
        {
          id: `${entry.id}-specifier-current-or-most-recent-episode-option-1-current-or-most-recent-episode-hypomanic`,
          name: "Current or most recent episode hypomanic",
          description: "",
          details: [],
          criteria: []
        },
        {
          id: `${entry.id}-specifier-current-or-most-recent-episode-option-2-current-or-most-recent-episode-depressed`,
          name: "Current or most recent episode depressed",
          description: "",
          details: [],
          criteria: []
        },
        {
          id: `${entry.id}-specifier-current-or-most-recent-episode-option-3-current-or-most-recent-episode-unspecified`,
          name: "Current or most recent episode unspecified",
          description: "",
          details: [],
          criteria: []
        }
      ],
      isComputed: false
    },
    ...entry.specifiers
  ];
}

function insertMajorDepressionEpisodeStatusSpecifiers(entry) {
  if (entry.specifiers.some((specifier) => specifier.name === "Episode")) {
    return;
  }

  const episodeSpecifier = {
    id: `${entry.id}-specifier-episode`,
    name: "Episode",
    description: "Specify whether this is a single episode or a recurrent episode.",
    allowsEmpty: true,
    selectionType: "single",
    minSelections: 1,
    reportLabelMode: "options",
    options: [
      {
        id: `${entry.id}-specifier-episode-option-0-single-episode`,
        name: "Single episode",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-episode-option-1-recurrent-episode`,
        name: "Recurrent episode",
        description: "",
        details: [],
        criteria: []
      }
    ],
    isComputed: false
  };

  const statusSpecifier = {
    id: `${entry.id}-specifier-severity-psychotic-remission-status`,
    name: "Severity/Psychotic/Remission Status",
    description:
      "Select one current-status label for the episode. Current severity and psychotic features apply only when full criteria are currently met; remission applies only when full criteria are not currently met.",
    allowsEmpty: true,
    selectionType: "single",
    minSelections: 1,
    reportLabelMode: "options",
    options: [
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-0-mild`,
        name: "Mild",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-1-moderate`,
        name: "Moderate",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-2-severe`,
        name: "Severe",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-3-with-psychotic-features`,
        name: "With psychotic features",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-4-in-partial-remission`,
        name: "In partial remission",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-5-in-full-remission`,
        name: "In full remission",
        description: "",
        details: [],
        criteria: []
      },
      {
        id: `${entry.id}-specifier-severity-psychotic-remission-status-option-6-unspecified`,
        name: "Unspecified",
        description: "",
        details: [],
        criteria: []
      }
    ],
    isComputed: false
  };

  entry.specifiers = [episodeSpecifier, statusSpecifier, ...entry.specifiers];
}

function applyConductProsocialThreshold(entry) {
  const prosocialSpecifier = entry.specifiers.find(
    (specifier) => specifier.name === "With limited prosocial emotions"
  );

  if (!prosocialSpecifier) {
    return;
  }

  prosocialSpecifier.minSelections = 2;
  prosocialSpecifier.reportLabelMode = "group";
}

function normalizeAdhdCriteria(entry) {
  const criterionA = entry.criteria.find((criterion) => criterion.code === "A");
  const inattention = criterionA?.items?.find((item) => item.code === "1");
  const hyperactivityImpulsivity = criterionA?.items?.find((item) => item.code === "2");
  const criterionC = entry.criteria.find((criterion) => criterion.code === "C");
  const criterionE = entry.criteria.find((criterion) => criterion.code === "E");

  if (inattention) {
    inattention.text =
      "Inattention: Six (or more) of the following symptoms have persisted for at least 6 months to a degree that is inconsistent with developmental level and that negatively impacts directly on social and academic/occupational activities:";
    inattention.note =
      "The symptoms are not solely a manifestation of oppositional behavior, defiance, hostility, or failure to understand tasks or instructions. For older adolescents and adults (age 17 and older), at least five symptoms are required.";
  }

  if (hyperactivityImpulsivity) {
    hyperactivityImpulsivity.text =
      "Hyperactivity and impulsivity: Six (or more) of the following symptoms have persisted for at least 6 months to a degree that is inconsistent with developmental level and that negatively impacts directly on social and academic/occupational activities:";
    hyperactivityImpulsivity.note =
      "The symptoms are not solely a manifestation of oppositional behavior, defiance, hostility, or a failure to understand tasks or instructions. For older adolescents and adults (age 17 and older), at least five symptoms are required.";
  }

  if (criterionC) {
    criterionC.text =
      "Several inattentive or hyperactive-impulsive symptoms are present in two or more settings (e.g., at home, school, or work; with friends or relatives; in other activities).";
  }

  if (criterionE) {
    criterionE.text =
      "The symptoms do not occur exclusively during the course of schizophrenia or another psychotic disorder and are not better explained by another mental disorder (e.g., mood disorder, anxiety disorder, dissociative disorder, personality disorder, substance intoxication or withdrawal).";
  }
}

function applyTransforms(entry, transforms = []) {
  transforms.forEach((transform) => {
    if (transform === "splitAutismSeverity") {
      applyAutismSeveritySplit(entry);
      return;
    }

    if (transform === "normalizeBipolarStatusSpecifier") {
      normalizeBipolarStatusSpecifier(entry);
      return;
    }

    if (transform === "consolidateBipolarPsychoticFeatureType") {
      consolidateBipolarPsychoticFeatureType(entry);
      return;
    }

    if (transform === "insertBipolarICurrentOrMostRecentEpisodeSpecifier") {
      insertBipolarICurrentOrMostRecentEpisodeSpecifier(entry);
      return;
    }

    if (transform === "insertMajorDepressionEpisodeStatusSpecifiers") {
      insertMajorDepressionEpisodeStatusSpecifiers(entry);
      return;
    }

    if (transform === "applyConductProsocialThreshold") {
      applyConductProsocialThreshold(entry);
      return;
    }

    if (transform === "normalizeAdhdCriteria") {
      normalizeAdhdCriteria(entry);
    }
  });
}

function getComputedGroupKeys(coding) {
  if (Array.isArray(coding?.computedGroups) && coding.computedGroups.length > 0) {
    return new Set(coding.computedGroups);
  }

  if (coding?.strategy !== "composite") {
    return new Set();
  }

  const keys = new Set();
  for (const rule of coding.rules || []) {
    for (const derivedSelection of rule.derivedSelections || []) {
      if (derivedSelection.group) {
        keys.add(derivedSelection.group);
      }
    }
  }

  return keys;
}

function annotateSpecifiers(entry) {
  const computedGroupKeys = getComputedGroupKeys(entry.coding);

  entry.specifiers = entry.specifiers.map((specifier) => ({
    ...specifier,
    allowsEmpty: specifier.allowsEmpty !== false,
    minSelections: Number.isInteger(specifier.minSelections) && specifier.minSelections >= 1 ? specifier.minSelections : 1,
    reportLabelMode: specifier.reportLabelMode === "group" ? "group" : "options",
    isComputed: computedGroupKeys.has(slugify(specifier.name))
  }));
}

function annotateCodingInputs(entry) {
  entry.coding.inputs = (entry.coding.inputs || []).map((inputGroup) => ({
    ...inputGroup,
    allowsEmpty: inputGroup.allowsEmpty !== false
  }));
}

function findCodingGroup(entry, reference) {
  return [...entry.specifiers, ...(entry.coding.inputs || [])].find(
    (group) => group.id === reference || slugify(group.name) === reference
  );
}

function findCodingOption(group, reference) {
  return group.options.find(
    (option) => option.id === reference || slugify(option.name) === reference
  );
}

function canonicalizeCodingRuleReferences(entry) {
  const rules = [
    ...(entry.coding.rules || []),
    ...(entry.coding.additionalCodeRules || [])
  ];

  rules.forEach((rule, ruleIndex) => {
    (rule.conditions || []).forEach((condition) => {
      if (!["selection", "no-selection-in-group"].includes(condition.type)) {
        return;
      }

      const group = findCodingGroup(entry, condition.group);
      if (!group) {
        throw new Error(
          `Unknown coding group reference: ${entry.id} :: rule ${ruleIndex} :: ${condition.group}`
        );
      }
      condition.group = group.id;

      if (condition.type === "selection") {
        const option = findCodingOption(group, condition.option);
        if (!option) {
          throw new Error(
            `Unknown coding option reference: ${entry.id} :: ${group.name} :: ${condition.option}`
          );
        }
        condition.option = option.id;
      }
    });
  });
}

function describeCodingRule(entry, rule, prefix = "") {
  const labels = [];

  (rule.conditions || []).forEach((condition) => {
    if (condition.type !== "selection") {
      return;
    }
    const group = findCodingGroup(entry, condition.group);
    const option = group ? findCodingOption(group, condition.option) : null;
    if (option?.name && !labels.includes(option.name)) {
      labels.push(option.name);
    }
  });

  (rule.derivedSelections || []).forEach((selection) => {
    const label = selection.label || selection.option;
    if (label && !labels.includes(label)) {
      labels.push(label);
    }
  });

  return `${prefix}${labels.join(", ") || "Resolved coding output"}`;
}

function synchronizeCodeCatalog(entry) {
  const catalogCodes = new Set(entry.codes.map((candidate) => candidate.code));
  const outputs = [];

  if (entry.coding.code) {
    outputs.push({ code: entry.coding.code, label: "Primary code" });
  }
  if (entry.coding.defaultCode) {
    outputs.push({ code: entry.coding.defaultCode, label: "Default coding output" });
  }
  (entry.coding.rules || []).forEach((rule) => {
    outputs.push({ code: rule.code, label: describeCodingRule(entry, rule) });
  });
  (entry.coding.additionalCodeRules || []).forEach((rule) => {
    outputs.push({
      code: rule.code,
      label: describeCodingRule(entry, rule, "Additional code: ")
    });
  });

  outputs.forEach((output) => {
    if (!output.code || catalogCodes.has(output.code)) {
      return;
    }
    entry.codes.push(output);
    catalogCodes.add(output.code);
  });
}

const FINAL_SUBSTANCE_USE_CRITERIA_ENTRIES = new Set([
  "Cannabis Use Disorder",
  "Phencyclidine Use Disorder",
  "Other Hallucinogen Use Disorder",
  "Inhalant Use Disorder",
  "Opioid Use Disorder",
  "Sedative, Hypnotic, or Anxiolytic Use Disorder",
  "Stimulant Use Disorder",
  "Tobacco Use Disorder",
  "Other (or Unknown) Substance Use Disorder"
]);

function normalizeEmbeddedLetteredCriteria(criteria = []) {
  criteria.forEach((criterion) => {
    let text = criterion.text || "";
    const standaloneNoteIndex = text.indexOf("\n\nNote:");
    if (standaloneNoteIndex >= 0) {
      criterion.note = text.slice(standaloneNoteIndex + 2).trim();
      text = text.slice(0, standaloneNoteIndex).trim();
    }

    const parentheticalNoteMatch = text.match(/\s*\(Note:\s*([\s\S]*?)\)\.?\s*$/i);
    if (parentheticalNoteMatch) {
      criterion.note = `Note: ${parentheticalNoteMatch[1].trim().replace(/\.$/, "")}.`;
      text = text.slice(0, parentheticalNoteMatch.index).trim();
    }

    const letteredMatch = text.match(
      /^([\s\S]*?following:)\s*a\.\s*([\s\S]*?)\s+(?:,?\s*or\s+)?b\.\s*([\s\S]*)$/i
    );
    if (letteredMatch) {
      const itemPrefix = `${criterion.id}-item`;
      criterion.text = letteredMatch[1].trim();
      criterion.items = [
        {
          id: `${itemPrefix}-0-a`,
          code: "a",
          text: letteredMatch[2].trim().replace(/,?\s+or$/i, "").trim(),
          isHeader: false,
          note: "",
          items: [],
          groups: []
        },
        {
          id: `${itemPrefix}-1-b`,
          code: "b",
          text: letteredMatch[3].trim(),
          isHeader: false,
          note: "",
          items: [],
          groups: []
        }
      ];
    } else {
      criterion.text = text;
    }

    normalizeEmbeddedLetteredCriteria(criterion.items || []);
    (criterion.groups || []).forEach((group) =>
      normalizeEmbeddedLetteredCriteria(group.items || [])
    );
  });
}

function applyFinalCriteriaCorrections(entry) {
  if (FINAL_SUBSTANCE_USE_CRITERIA_ENTRIES.has(entry.name)) {
    normalizeEmbeddedLetteredCriteria(entry.criteria);
  }

  if (entry.name === "Other (or Unknown) Substance Use Disorder" && entry.criteria[0]) {
    entry.criteria[0].text =
      "A problematic pattern of use of an intoxicating substance not able to be classified within the alcohol; caffeine; cannabis; hallucinogen (phencyclidine and others); inhalant; opioid; sedative, hypnotic, or anxiolytic; stimulant; or tobacco categories and leading to clinically significant impairment or distress, as manifested by at least two of the following, occurring within a 12-month period:";
  }

  if (entry.name === "Paranoid Personality Disorder") {
    const fidelityCriterion = entry.criteria
      .flatMap((criterion) => criterion.items || [])
      .find((criterion) => /fidelity of spouse or sexual partner/i.test(criterion.text));
    if (fidelityCriterion) {
      fidelityCriterion.text =
        "Has recurrent suspicions, without justification, regarding fidelity of spouse or sexual partner.";
    }
  }

  if (entry.name === "Major Neurocognitive Disorder") {
    const declineCriterion = entry.criteria.find((criterion) => criterion.code === "A");
    const match = declineCriterion?.text.match(
      /^([\s\S]*?based on:)\s*1\.\s*([\s\S]*?);\s*and\s*2\.\s*([\s\S]*)$/i
    );
    if (declineCriterion && match) {
      declineCriterion.text = match[1].trim();
      declineCriterion.items = [
        {
          id: `${declineCriterion.id}-item-0-1`,
          code: "1",
          text: `${match[2].trim()}; and`,
          isHeader: false,
          note: "",
          items: [],
          groups: []
        },
        {
          id: `${declineCriterion.id}-item-1-2`,
          code: "2",
          text: match[3].trim(),
          isHeader: false,
          note: "",
          items: [],
          groups: []
        }
      ];
    }

    entry.specifiers.slice(0, 2).forEach((specifier) => {
      specifier.allowsEmpty = false;
    });
  }

  if (FINAL_SUBSTANCE_USE_CRITERIA_ENTRIES.has(entry.name)) {
    entry.specifiers.forEach((specifier) => {
      if (
        [
          "Remission Specifiers",
          "In a controlled environment",
          "On maintenance therapy",
          "Stimulant Type"
        ].includes(specifier.name)
      ) {
        specifier.description = "";
        specifier.options.forEach((option) => {
          option.description = "";
        });
      }
    });
  }

  if (entry.name === "Delirium") {
    entry.specifiers.forEach((specifier) => {
      if (["Etiological Subtypes", "Activity Level Specifiers"].includes(specifier.name)) {
        specifier.description = "";
        specifier.options.forEach((option) => {
          option.description = "";
        });
      }
    });
  }
}

function buildEntry(chapter, legacyEntry, pageIndex) {
  const overrideKey = `${chapter.title}::${legacyEntry.name}`;
  const override = MANUAL_ENTRY_OVERRIDES[overrideKey] || {};
  const finalAuditConfig = FINAL_AUDIT_CONFIG[overrideKey] || null;
  const isFinalClinicalFocusAudit =
    chapter.title === "Other Conditions That May Be a Focus of Clinical Attention";
  const indexedSource = pageIndex.entries?.[overrideKey] || {};
  const entryId = slugify(`${chapter.id}-${legacyEntry.name}`);
  const kind = inferKind(chapter.title, legacyEntry, override);
  const codes = normalizeCodes(override.codes || legacyEntry.icd_codes || []);
  const criteria = normalizeCriteria(override.criteria || legacyEntry.diagnostic_criteria || [], `${entryId}-criterion`);
  const specifiers = normalizeSpecifiers(override.specifiers || legacyEntry.specifiers || [], entryId);
  const sections = normalizeSectionBlueprints(
    override.sections || (finalAuditConfig?.autoDescription ? [{ title: "Description" }] : null)
  );
  const recording = normalizeRecordingGuidance(
    override.recording || inferRecordingGuidance(legacyEntry.name, criteria, sections, entryId),
    entryId
  );

  const entry = {
    id: entryId,
    name: legacyEntry.name,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    kind,
    audit: {
      status: "unchecked",
      lastReviewed: null,
      notes: [],
      ...(finalAuditConfig
        ? {
            status: "corrected",
            lastReviewed: "2026-07-12",
            notes: [
              "Verified against the DSM-5-TR full manual and remapped to the dedicated entry pages."
            ]
          }
        : {}),
      ...(isFinalClinicalFocusAudit
        ? {
            status: "reviewed",
            lastReviewed: "2026-07-12",
            notes: [
              "Verified against the DSM-5-TR clinical-focus chapter and its applicable code table or entry text."
            ]
          }
        : {}),
      ...(override.audit || {})
    },
    source: {
      chapterPages: [chapter.startPage, chapter.endPage],
      titlePages: indexedSource.titlePages || [],
      sectionPages: indexedSource.sectionPages || {},
      ...(finalAuditConfig
        ? {
            titlePages: finalAuditConfig.titlePages,
            autoMapSections: !isFinalClinicalFocusAudit,
            autoDescription: Boolean(finalAuditConfig.autoDescription),
            autoMapEndPage: finalAuditConfig.autoMapEndPage || null
          }
        : {}),
      ...(override.source || {})
    },
    codes,
    coding: override.coding || inferCoding(legacyEntry.name, codes, specifiers, kind, entryId),
    recording,
    criteria,
    specifiers,
    sections,
    differentialDiagnosis: "",
    comorbidity: "",
    _recordingOverride: Boolean(override.recording)
  };

  applyFinalCriteriaCorrections(entry);
  applyTransforms(entry, override.transforms || []);
  annotateCodingInputs(entry);
  annotateSpecifiers(entry);
  canonicalizeCodingRuleReferences(entry);
  synchronizeCodeCatalog(entry);
  return entry;
}

function buildDataset() {
  const legacyData = loadLegacyData();
  const pageIndex = loadPageIndex();
  const chapterMap = new Map(
    CHAPTER_METADATA.map((chapter) => [chapter.title, { ...chapter, id: slugify(chapter.title) }])
  );

  const chapters = [];
  const entries = [];

  for (const [chapterTitle, legacyEntries] of Object.entries(legacyData)) {
    const chapter = chapterMap.get(chapterTitle) || {
      id: slugify(chapterTitle),
      title: chapterTitle,
      startPage: null,
      endPage: null
    };

    const chapterEntries = legacyEntries.map((legacyEntry) => buildEntry(chapter, legacyEntry, pageIndex));

    chapters.push({
      id: chapter.id,
      title: chapter.title,
      startPage: chapter.startPage,
      endPage: chapter.endPage,
      entryIds: chapterEntries.map((entry) => entry.id)
    });

    entries.push(...chapterEntries);
  }

  hydrateEntriesWithVerbatimText(entries);

  entries.forEach((entry) => {
    if (!entry._recordingOverride) {
      entry.recording = normalizeRecordingGuidance(
        inferRecordingGuidance(entry.name, entry.criteria, entry.sections, entry.id),
        entry.id
      );
    }

    delete entry._recordingOverride;
  });

  const stats = {
    chapterCount: chapters.length,
    entryCount: entries.length,
    reviewedEntries: entries.filter((entry) => entry.audit.status === "reviewed").length,
    correctedEntries: entries.filter((entry) => entry.audit.status === "corrected").length,
    auditedEntries: entries.filter((entry) =>
      ["reviewed", "corrected"].includes(entry.audit.status)
    ).length,
    entriesWithNoDirectCode: entries.filter((entry) => entry.coding.strategy === "none").length,
    entriesNeedingCodeReview: entries.filter((entry) => entry.coding.strategy === "needs-review").length
  };

  return {
    meta: {
      formatVersion: 1,
      generatedAt: new Date().toISOString(),
      source: {
        legacyDataFile: path.relative(new URL("../", import.meta.url).pathname, LEGACY_DATA_PATH.pathname),
        criteriaPrimarySource: "DSM-5-TR full manual PDF",
        narrativePrimarySource: "DSM-5-TR full manual PDF",
        legacyNarrativeBlueprintsEnabled: false,
        legacyNarrativeFallbackEnabled: false,
        narrativePolicy: "verbatim-full-dsm-only"
      },
      hosting: {
        target: "GitHub Pages",
        staticAssetOnly: true,
        thirdPartyRuntimeRequestsAllowed: false
      },
      stats
    },
    chapters,
    entries
  };
}

function main() {
  const dataset = buildDataset();
  fs.writeFileSync(OUTPUT_DATA_PATH, `${JSON.stringify(dataset, null, 2)}\n`);
  fs.writeFileSync(
    OUTPUT_MODULE_PATH,
    `const dataset = ${JSON.stringify(dataset, null, 2)};\n\nexport default dataset;\n`
  );
  console.log(
    `Built ${dataset.meta.stats.entryCount} entries across ${dataset.meta.stats.chapterCount} chapters -> ${OUTPUT_DATA_PATH.pathname}`
  );
}

main();
