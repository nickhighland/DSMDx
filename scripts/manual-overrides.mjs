export const CHAPTER_METADATA = [
  { title: "Neurodevelopmental Disorders", startPage: 130, endPage: 206 },
  { title: "Schizophrenia Spectrum and Other Psychotic Disorders", startPage: 207, endPage: 253 },
  { title: "Bipolar and Related Disorders", startPage: 254, endPage: 300 },
  { title: "Depressive Disorders", startPage: 301, endPage: 348 },
  { title: "Anxiety Disorders", startPage: 349, endPage: 406 },
  { title: "Obsessive-Compulsive and Related Disorders", startPage: 407, endPage: 446 },
  { title: "Trauma- and Stressor-Related Disorders", startPage: 447, endPage: 489 },
  { title: "Dissociative Disorders", startPage: 490, endPage: 514 },
  { title: "Somatic Symptom and Related Disorders", startPage: 515, endPage: 542 },
  { title: "Feeding and Eating Disorders", startPage: 543, endPage: 575 },
  { title: "Elimination Disorders", startPage: 576, endPage: 585 },
  { title: "Sleep-Wake Disorders", startPage: 586, endPage: 670 },
  { title: "Sexual Dysfunctions", startPage: 671, endPage: 711 },
  { title: "Gender Dysphoria", startPage: 712, endPage: 725 },
  { title: "Disruptive, Impulse-Control, and Conduct Disorders", startPage: 726, endPage: 752 },
  { title: "Substance-Related and Addictive Disorders", startPage: 753, endPage: 902 },
  { title: "Neurocognitive Disorders", startPage: 903, endPage: 978 },
  { title: "Personality Disorders", startPage: 979, endPage: 1034 },
  { title: "Paraphilic Disorders", startPage: 1035, endPage: 1063 },
  { title: "Other Mental Disorders and Additional Codes", startPage: 1064, endPage: 1067 },
  {
    title: "Medication-Induced Movement Disorders and Other Adverse Effects of Medication",
    startPage: 1068,
    endPage: 1083
  },
  { title: "Other Conditions That May Be a Focus of Clinical Attention", startPage: 1084, endPage: 1103 }
];

const BIPOLAR_SUBSTANCE_TYPE_GROUP_ID =
  "bipolar-and-related-disorders-substance-medication-induced-bipolar-and-related-disorder-coding-input-substance-type";
const BIPOLAR_USE_DISORDER_STATUS_GROUP_ID =
  "bipolar-and-related-disorders-substance-medication-induced-bipolar-and-related-disorder-coding-input-use-disorder-status";

const BIPOLAR_SUBSTANCE_TYPE_OPTIONS = [
  "Alcohol",
  "Phencyclidine",
  "Other hallucinogen",
  "Sedative, hypnotic, or anxiolytic",
  "Amphetamine-type substance (or other stimulant)",
  "Cocaine",
  "Other (or unknown) substance"
];

const BIPOLAR_USE_DISORDER_STATUS_OPTIONS = [
  "With mild use disorder",
  "With moderate or severe use disorder",
  "Without use disorder"
];
const SUBSTANCE_USE_DISORDER_STATUS_DESCRIPTIONS = [
  "With mild use disorder",
  "With moderate or severe use disorder",
  "Without use disorder"
];

const BIPOLAR_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.14", "F10.24", "F10.94"]],
  ["Phencyclidine", ["F16.14", "F16.24", "F16.94"]],
  ["Other hallucinogen", ["F16.14", "F16.24", "F16.94"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.14", "F13.24", "F13.94"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.14", "F15.24", "F15.94"]],
  ["Cocaine", ["F14.14", "F14.24", "F14.94"]],
  ["Other (or unknown) substance", ["F19.14", "F19.24", "F19.94"]]
];

const DEPRESSIVE_SUBSTANCE_TYPE_GROUP_ID =
  "depressive-disorders-substance-medication-induced-depressive-disorder-coding-input-substance-type";
const DEPRESSIVE_USE_DISORDER_STATUS_GROUP_ID =
  "depressive-disorders-substance-medication-induced-depressive-disorder-coding-input-use-disorder-status";

const DEPRESSIVE_SUBSTANCE_TYPE_OPTIONS = [
  "Alcohol",
  "Phencyclidine",
  "Other hallucinogen",
  "Inhalant",
  "Opioid",
  "Sedative, hypnotic, or anxiolytic",
  "Amphetamine-type substance (or other stimulant)",
  "Cocaine",
  "Other (or unknown) substance"
];

const DEPRESSIVE_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.14", "F10.24", "F10.94"]],
  ["Phencyclidine", ["F16.14", "F16.24", "F16.94"]],
  ["Other hallucinogen", ["F16.14", "F16.24", "F16.94"]],
  ["Inhalant", ["F18.14", "F18.24", "F18.94"]],
  ["Opioid", ["F11.14", "F11.24", "F11.94"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.14", "F13.24", "F13.94"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.14", "F15.24", "F15.94"]],
  ["Cocaine", ["F14.14", "F14.24", "F14.94"]],
  ["Other (or unknown) substance", ["F19.14", "F19.24", "F19.94"]]
];

const PSYCHOTIC_SUBSTANCE_TYPE_GROUP_ID =
  "schizophrenia-spectrum-and-other-psychotic-disorders-substance-medication-induced-psychotic-disorder-coding-input-substance-type";
const PSYCHOTIC_USE_DISORDER_STATUS_GROUP_ID =
  "schizophrenia-spectrum-and-other-psychotic-disorders-substance-medication-induced-psychotic-disorder-coding-input-use-disorder-status";

const PSYCHOTIC_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.159", "F10.259", "F10.959"]],
  ["Cannabis", ["F12.159", "F12.259", "F12.959"]],
  ["Phencyclidine", ["F16.159", "F16.259", "F16.959"]],
  ["Other hallucinogen", ["F16.159", "F16.259", "F16.959"]],
  ["Inhalant", ["F18.159", "F18.259", "F18.959"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.159", "F13.259", "F13.959"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.159", "F15.259", "F15.959"]],
  ["Cocaine", ["F14.159", "F14.259", "F14.959"]],
  ["Other (or unknown) substance", ["F19.159", "F19.259", "F19.959"]]
];

const ANXIETY_SUBSTANCE_TYPE_GROUP_ID =
  "anxiety-disorders-substance-medication-induced-anxiety-disorder-coding-input-substance-type";
const ANXIETY_USE_DISORDER_STATUS_GROUP_ID =
  "anxiety-disorders-substance-medication-induced-anxiety-disorder-coding-input-use-disorder-status";

const ANXIETY_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.180", "F10.280", "F10.980"]],
  ["Caffeine", [null, null, "F15.980"]],
  ["Cannabis", ["F12.180", "F12.280", "F12.980"]],
  ["Phencyclidine", ["F16.180", "F16.280", "F16.980"]],
  ["Other hallucinogen", ["F16.180", "F16.280", "F16.980"]],
  ["Inhalant", ["F18.180", "F18.280", "F18.980"]],
  ["Opioid", ["F11.188", "F11.288", "F11.988"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.180", "F13.280", "F13.980"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.180", "F15.280", "F15.980"]],
  ["Cocaine", ["F14.180", "F14.280", "F14.980"]],
  ["Other (or unknown) substance", ["F19.180", "F19.280", "F19.980"]]
];

const SLEEP_SUBSTANCE_TYPE_GROUP_ID =
  "sleep-wake-disorders-substance-medication-induced-sleep-disorder-coding-input-substance-type";
const SLEEP_USE_DISORDER_STATUS_GROUP_ID =
  "sleep-wake-disorders-substance-medication-induced-sleep-disorder-coding-input-use-disorder-status";

const SLEEP_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.182", "F10.282", "F10.982"]],
  ["Caffeine", [null, null, "F15.982"]],
  ["Cannabis", ["F12.188", "F12.288", "F12.988"]],
  ["Opioid", ["F11.182", "F11.282", "F11.982"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.182", "F13.282", "F13.982"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.182", "F15.282", "F15.982"]],
  ["Cocaine", ["F14.182", "F14.282", "F14.982"]],
  ["Tobacco", [null, "F17.208", null]],
  ["Other (or unknown) substance", ["F19.182", "F19.282", "F19.982"]]
];

const SEXUAL_DYSFUNCTION_SUBSTANCE_TYPE_GROUP_ID =
  "sexual-dysfunctions-substance-medication-induced-sexual-dysfunction-coding-input-substance-type";
const SEXUAL_DYSFUNCTION_USE_DISORDER_STATUS_GROUP_ID =
  "sexual-dysfunctions-substance-medication-induced-sexual-dysfunction-coding-input-use-disorder-status";

const SEXUAL_DYSFUNCTION_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.181", "F10.281", "F10.981"]],
  ["Opioid", ["F11.181", "F11.281", "F11.981"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.181", "F13.281", "F13.981"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.181", "F15.281", "F15.981"]],
  ["Cocaine", ["F14.181", "F14.281", "F14.981"]],
  ["Other (or unknown) substance", ["F19.181", "F19.281", "F19.981"]]
];

const OCD_SUBSTANCE_TYPE_GROUP_ID =
  "obsessive-compulsive-and-related-disorders-substance-medication-induced-obsessive-compulsive-and-related-disorder-coding-input-substance-type";
const OCD_USE_DISORDER_STATUS_GROUP_ID =
  "obsessive-compulsive-and-related-disorders-substance-medication-induced-obsessive-compulsive-and-related-disorder-coding-input-use-disorder-status";

const OCD_SUBSTANCE_CODE_ROWS = [
  ["Amphetamine-type substance (or other stimulant)", ["F15.188", "F15.288", "F15.988"]],
  ["Cocaine", ["F14.188", "F14.288", "F14.988"]],
  ["Other (or unknown) substance", ["F19.188", "F19.288", "F19.988"]]
];

const MILD_NEUROCOGNITIVE_SUBSTANCE_TYPE_GROUP_ID =
  "neurocognitive-disorders-mild-neurocognitive-disorder-coding-input-substance-type";
const MILD_NEUROCOGNITIVE_USE_DISORDER_STATUS_GROUP_ID =
  "neurocognitive-disorders-mild-neurocognitive-disorder-coding-input-use-disorder-status";

const MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS = [
  ["Alcohol", ["F10.188", "F10.288", "F10.988"]],
  ["Sedative, hypnotic, or anxiolytic", ["F13.188", "F13.288", "F13.988"]],
  ["Cocaine", ["F14.188", "F14.288", "F14.988"]],
  ["Amphetamine-type substance (or other stimulant)", ["F15.188", "F15.288", "F15.988"]],
  ["Inhalant", ["F18.188", "F18.288", "F18.988"]],
  ["Other (or unknown) substance", ["F19.188", "F19.288", "F19.988"]]
];

const MILD_NEUROCOGNITIVE_G31_84_ETIOLOGIES = [
  "Alzheimer's disease",
  "Frontotemporal degeneration",
  "Lewy body disease",
  "Vascular disease",
  "Traumatic brain injury",
  "HIV infection",
  "Prion disease",
  "Parkinson's disease",
  "Huntington's disease",
  "Another medical condition",
  "Multiple etiologies"
];

function slugifyOption(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function makeCodingInputOption(groupId, index, name, description = "") {
  return {
    id: `${groupId}-option-${index}-${slugifyOption(name)}`,
    name,
    description,
    details: [],
    criteria: []
  };
}

function buildSubstanceCodeDisplayRows(codeRows) {
  return codeRows.flatMap(([substanceName, codes]) =>
    codes
      .map((code, index) =>
        code
          ? {
              code,
              description: `${substanceName}, ${SUBSTANCE_USE_DISORDER_STATUS_DESCRIPTIONS[index]}`
            }
          : null
      )
      .filter(Boolean)
  );
}

function buildStructuredSubstanceInducedCoding({
  substanceGroupId,
  useStatusGroupId,
  substanceTypeOptions,
  codeRows,
  notes = []
}) {
  const substanceOptions = substanceTypeOptions.map((name, index) =>
    makeCodingInputOption(substanceGroupId, index, name)
  );
  const useStatusOptions = BIPOLAR_USE_DISORDER_STATUS_OPTIONS.map((name, index) =>
    makeCodingInputOption(useStatusGroupId, index, name)
  );

  const rules = [];

  codeRows.forEach(([substanceName, codes]) => {
    const substanceOption = substanceOptions.find((option) => option.name === substanceName);
    if (!substanceOption) {
      return;
    }

    useStatusOptions.forEach((statusOption, index) => {
      if (!codes[index]) {
        return;
      }

      rules.push({
        conditions: [
          {
            type: "selection",
            group: substanceGroupId,
            option: substanceOption.id
          },
          {
            type: "selection",
            group: useStatusGroupId,
            option: statusOption.id
          }
        ],
        code: codes[index]
      });
    });

    const validCodes = codes.filter(Boolean);
    if (validCodes.length === 1) {
      rules.push({
        conditions: [
          {
            type: "selection",
            group: substanceGroupId,
            option: substanceOption.id
          }
        ],
        code: validCodes[0]
      });
    }
  });

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: substanceGroupId,
        name: "Substance Type",
        description: "Select the substance or medication class named in the DSM coding table.",
        allowsEmpty: true,
        selectionType: "single",
        options: substanceOptions
      },
      {
        id: useStatusGroupId,
        name: "Use Disorder Status",
        description:
          "Select whether the same substance class has a comorbid mild use disorder, a moderate or severe use disorder, or no use disorder.",
        allowsEmpty: true,
        selectionType: "single",
        options: useStatusOptions
      }
    ],
    rules,
    notes: [
      "The DSM-5-TR coding table varies by substance class and whether a same-class substance use disorder is mild, moderate or severe, or absent.",
      ...notes
    ],
    additionalCodeRules: []
  };
}

function buildSubstanceInducedBipolarCoding() {
  const substanceOptions = BIPOLAR_SUBSTANCE_TYPE_OPTIONS.map((name, index) =>
    makeCodingInputOption(BIPOLAR_SUBSTANCE_TYPE_GROUP_ID, index, name)
  );
  const useStatusOptions = BIPOLAR_USE_DISORDER_STATUS_OPTIONS.map((name, index) =>
    makeCodingInputOption(BIPOLAR_USE_DISORDER_STATUS_GROUP_ID, index, name)
  );

  const rules = [];

  BIPOLAR_SUBSTANCE_CODE_ROWS.forEach(([substanceName, codes]) => {
    const substanceOption = substanceOptions.find((option) => option.name === substanceName);

    useStatusOptions.forEach((statusOption, index) => {
      rules.push({
        conditions: [
          {
            type: "selection",
            group: BIPOLAR_SUBSTANCE_TYPE_GROUP_ID,
            option: substanceOption.id
          },
          {
            type: "selection",
            group: BIPOLAR_USE_DISORDER_STATUS_GROUP_ID,
            option: statusOption.id
          }
        ],
        code: codes[index]
      });
    });
  });

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: BIPOLAR_SUBSTANCE_TYPE_GROUP_ID,
        name: "Substance Type",
        description: "Select the substance or medication class named in the DSM coding table.",
        allowsEmpty: true,
        selectionType: "single",
        options: substanceOptions
      },
      {
        id: BIPOLAR_USE_DISORDER_STATUS_GROUP_ID,
        name: "Use Disorder Status",
        description:
          "Select whether the same substance class has a comorbid mild use disorder, a moderate or severe use disorder, or no use disorder.",
        allowsEmpty: true,
        selectionType: "single",
        options: useStatusOptions
      }
    ],
    rules,
    notes: [
      "The DSM-5-TR coding table varies by substance class and whether a same-class substance use disorder is mild, moderate or severe, or absent."
    ],
    additionalCodeRules: []
  };
}

function buildSubstanceInducedDepressiveCoding() {
  const substanceOptions = DEPRESSIVE_SUBSTANCE_TYPE_OPTIONS.map((name, index) =>
    makeCodingInputOption(DEPRESSIVE_SUBSTANCE_TYPE_GROUP_ID, index, name)
  );
  const useStatusOptions = BIPOLAR_USE_DISORDER_STATUS_OPTIONS.map((name, index) =>
    makeCodingInputOption(DEPRESSIVE_USE_DISORDER_STATUS_GROUP_ID, index, name)
  );

  const rules = [];

  DEPRESSIVE_SUBSTANCE_CODE_ROWS.forEach(([substanceName, codes]) => {
    const substanceOption = substanceOptions.find((option) => option.name === substanceName);

    useStatusOptions.forEach((statusOption, index) => {
      rules.push({
        conditions: [
          {
            type: "selection",
            group: DEPRESSIVE_SUBSTANCE_TYPE_GROUP_ID,
            option: substanceOption.id
          },
          {
            type: "selection",
            group: DEPRESSIVE_USE_DISORDER_STATUS_GROUP_ID,
            option: statusOption.id
          }
        ],
        code: codes[index]
      });
    });
  });

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: DEPRESSIVE_SUBSTANCE_TYPE_GROUP_ID,
        name: "Substance Type",
        description: "Select the substance or medication class named in the DSM coding table.",
        allowsEmpty: true,
        selectionType: "single",
        options: substanceOptions
      },
      {
        id: DEPRESSIVE_USE_DISORDER_STATUS_GROUP_ID,
        name: "Use Disorder Status",
        description:
          "Select whether the same substance class has a comorbid mild use disorder, a moderate or severe use disorder, or no use disorder.",
        allowsEmpty: true,
        selectionType: "single",
        options: useStatusOptions
      }
    ],
    rules,
    notes: [
      "The DSM-5-TR coding table varies by substance class and whether a same-class substance use disorder is mild, moderate or severe, or absent."
    ],
    additionalCodeRules: []
  };
}

function buildMildNeurocognitiveCoding() {
  const substanceOptions = MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS.map(([name], index) =>
    makeCodingInputOption(MILD_NEUROCOGNITIVE_SUBSTANCE_TYPE_GROUP_ID, index, name)
  );
  const useStatusOptions = BIPOLAR_USE_DISORDER_STATUS_OPTIONS.map((name, index) =>
    makeCodingInputOption(MILD_NEUROCOGNITIVE_USE_DISORDER_STATUS_GROUP_ID, index, name)
  );

  const rules = [];

  MILD_NEUROCOGNITIVE_G31_84_ETIOLOGIES.forEach((etiology) => {
    rules.push({
      conditions: [makeSelectionCondition("etiological-subtypes", slugifyOption(etiology))],
      code: "G31.84"
    });
  });

  rules.push({
    conditions: [makeSelectionCondition("etiological-subtypes", "unspecified-etiology")],
    code: "R41.9"
  });

  MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS.forEach(([substanceName, codes]) => {
    const substanceOption = substanceOptions.find((option) => option.name === substanceName);
    if (!substanceOption) {
      return;
    }

    useStatusOptions.forEach((statusOption, index) => {
      rules.push({
        conditions: [
          makeSelectionCondition("etiological-subtypes", "substance-medication-use"),
          makeSelectionCondition(MILD_NEUROCOGNITIVE_SUBSTANCE_TYPE_GROUP_ID, substanceOption.id),
          makeSelectionCondition(MILD_NEUROCOGNITIVE_USE_DISORDER_STATUS_GROUP_ID, statusOption.id)
        ],
        code: codes[index]
      });
    });
  });

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: MILD_NEUROCOGNITIVE_SUBSTANCE_TYPE_GROUP_ID,
        name: "Substance Type",
        description:
          "Use only when Etiological Subtypes is Substance/medication use. Select the substance class named in the DSM substance-induced mild neurocognitive coding table.",
        includeInDiagnosisLabel: false,
        allowsEmpty: true,
        selectionType: "single",
        options: substanceOptions
      },
      {
        id: MILD_NEUROCOGNITIVE_USE_DISORDER_STATUS_GROUP_ID,
        name: "Use Disorder Status",
        description:
          "Use only when Etiological Subtypes is Substance/medication use. Select whether the same-class substance use disorder is mild, moderate or severe, or absent.",
        includeInDiagnosisLabel: false,
        allowsEmpty: true,
        selectionType: "single",
        options: useStatusOptions
      }
    ],
    rules,
    notes: [
      "The DSM-5-TR coding note uses G31.84 for specified non-substance mild neurocognitive etiologies and R41.9 for unspecified etiology.",
      "When the etiology is substance/medication use, the DSM routes coding to the substance-specific mild neurocognitive table rather than G31.84."
    ],
    additionalCodeRules: []
  };
}

function buildMajorNeurocognitiveCoding() {
  const substanceTypeGroupId =
    "neurocognitive-disorders-major-neurocognitive-disorder-coding-input-substance-type";
  const useStatusGroupId =
    "neurocognitive-disorders-major-neurocognitive-disorder-coding-input-use-disorder-status";
  const substanceOptions = MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS.map(([name], index) =>
    makeCodingInputOption(substanceTypeGroupId, index, name)
  );
  const useStatusOptions = BIPOLAR_USE_DISORDER_STATUS_OPTIONS.map((name, index) =>
    makeCodingInputOption(useStatusGroupId, index, name)
  );
  const f02Etiologies = [
    "Alzheimer's disease",
    "Frontotemporal degeneration",
    "Lewy body disease",
    "Traumatic brain injury",
    "HIV infection",
    "Prion disease",
    "Parkinson's disease",
    "Huntington's disease",
    "Another medical condition",
    "Multiple etiologies"
  ];
  const behaviorRows = [
    ["Without behavioral disturbance", "F02.80", "F01.50"],
    ["With behavioral disturbance (specify disturbance)", "F02.81", "F01.51"]
  ];
  const rules = [];

  f02Etiologies.forEach((etiology) => {
    behaviorRows.forEach(([behavior, f02Code]) => {
      rules.push({
        conditions: [
          makeSelectionCondition("etiological-subtypes", slugifyOption(etiology)),
          makeSelectionCondition("behavioral-disturbance", slugifyOption(behavior))
        ],
        code: f02Code
      });
    });
  });

  behaviorRows.forEach(([behavior, _f02Code, vascularCode]) => {
    rules.push({
      conditions: [
        makeSelectionCondition("etiological-subtypes", "vascular-disease"),
        makeSelectionCondition("behavioral-disturbance", slugifyOption(behavior))
      ],
      code: vascularCode
    });
    rules.push({
      conditions: [
        makeSelectionCondition("etiological-subtypes", "unspecified-etiology"),
        makeSelectionCondition("behavioral-disturbance", slugifyOption(behavior))
      ],
      code: "R41.9"
    });
  });

  MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS.forEach(([substanceName, codes]) => {
    const substanceOption = substanceOptions.find((option) => option.name === substanceName);
    useStatusOptions.forEach((statusOption, statusIndex) => {
      behaviorRows.forEach(([behavior]) => {
        rules.push({
          conditions: [
            makeSelectionCondition("etiological-subtypes", "substance-medication-use"),
            makeSelectionCondition("behavioral-disturbance", slugifyOption(behavior)),
            makeSelectionCondition(substanceTypeGroupId, substanceOption.id),
            makeSelectionCondition(useStatusGroupId, statusOption.id)
          ],
          code: codes[statusIndex]
        });
      });
    });
  });

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: substanceTypeGroupId,
        name: "Substance Type",
        includeInDiagnosisLabel: false,
        allowsEmpty: true,
        selectionType: "single",
        options: substanceOptions
      },
      {
        id: useStatusGroupId,
        name: "Use Disorder Status",
        includeInDiagnosisLabel: false,
        allowsEmpty: true,
        selectionType: "single",
        options: useStatusOptions
      }
    ],
    rules,
    notes: [
      "Code based on medical or substance etiology. In most cases of major neurocognitive disorder, there is need for an additional code for the etiological medical condition, which must immediately precede the diagnostic code for major neurocognitive disorder, as noted in the coding table on pp. 682–683."
    ],
    additionalCodeRules: []
  };
}

function makeSpecifierGroupId(entryId, specifierIndex, specifierName) {
  return `${entryId}-specifier-${specifierIndex}-${slugifyOption(specifierName)}`;
}

function makeSpecifierOptionId(groupId, optionIndex, optionName) {
  return `${groupId}-option-${optionIndex}-${slugifyOption(optionName)}`;
}

function makeSelectionCondition(groupId, optionId) {
  return {
    type: "selection",
    group: groupId,
    option: optionId
  };
}

function buildSpecificUseDisorderStatusNames(substanceLabel) {
  return [
    `With mild ${substanceLabel} use disorder`,
    `With moderate or severe ${substanceLabel} use disorder`,
    `Without comorbid ${substanceLabel} use disorder`
  ];
}

function buildSpecificUseDisorderStatusOptions(statusGroupId, substanceLabel) {
  return buildSpecificUseDisorderStatusNames(substanceLabel).map((name, index) =>
    makeCodingInputOption(statusGroupId, index, name)
  );
}

function buildSpecificUseDisorderStatusCoding({
  statusGroupId,
  substanceLabel,
  codes,
  description,
  notes = []
}) {
  const statusOptions = buildSpecificUseDisorderStatusOptions(statusGroupId, substanceLabel);

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: statusGroupId,
        name: "Use Disorder Status",
        description,
        allowsEmpty: true,
        selectionType: "single",
        options: statusOptions
      }
    ],
    rules: statusOptions.map((option, index) => ({
      conditions: [makeSelectionCondition(statusGroupId, option.id)],
      code: codes[index]
    })),
    notes,
    additionalCodeRules: []
  };
}

function buildSpecificUseDisorderStatusCodingWithOptionalSpecifier({
  entryId,
  specifierName,
  specifierOptionName,
  statusGroupId,
  substanceLabel,
  codesWithoutSpecifier,
  codesWithSpecifier,
  description,
  notes = []
}) {
  const statusOptions = buildSpecificUseDisorderStatusOptions(statusGroupId, substanceLabel);
  const specifierGroupId = makeSpecifierGroupId(entryId, 0, specifierName);
  const specifierOptionId = makeSpecifierOptionId(specifierGroupId, 0, specifierOptionName);

  return {
    strategy: "option-map",
    requireSelection: true,
    inputs: [
      {
        id: statusGroupId,
        name: "Use Disorder Status",
        description,
        allowsEmpty: true,
        selectionType: "single",
        options: statusOptions
      }
    ],
    rules: [
      ...statusOptions.map((option, index) => ({
        conditions: [
          makeSelectionCondition(specifierGroupId, specifierOptionId),
          makeSelectionCondition(statusGroupId, option.id)
        ],
        code: codesWithSpecifier[index]
      })),
      ...statusOptions.map((option, index) => ({
        conditions: [makeSelectionCondition(statusGroupId, option.id)],
        code: codesWithoutSpecifier[index]
      }))
    ],
    notes,
    additionalCodeRules: []
  };
}

const CIRCADIAN_SHARED_CRITERIA = [
  {
    code: "A",
    text:
      "A persistent or recurrent pattern of sleep disruption that is primarily due to an alteration of the circadian system or to a misalignment between the endogenous circadian rhythm and the sleep-wake schedule required by an individual’s physical environment or social or professional schedule."
  },
  {
    code: "B",
    text: "The sleep disruption leads to excessive sleepiness or insomnia, or both."
  },
  {
    code: "C",
    text:
      "The sleep disturbance causes clinically significant distress or impairment in social, occupational, and other important areas of functioning."
  }
];

const CIRCADIAN_SUBTYPE_OPTIONS = [
  {
    name: "Delayed sleep phase type",
    description:
      "A pattern of delayed sleep onset and awakening times, with an inability to fall asleep and awaken at a desired or conventionally acceptable earlier time."
  },
  {
    name: "Advanced sleep phase type",
    description:
      "A pattern of advanced sleep onset and awakening times, with an inability to remain awake or asleep until the desired or conventionally acceptable later sleep or wake times."
  },
  {
    name: "Irregular sleep-wake type",
    description:
      "A temporally disorganized sleep-wake pattern, such that the timing of sleep and wake periods is variable throughout the 24-hour period."
  },
  {
    name: "Non-24-hour sleep-wake type",
    description:
      "A pattern of sleep-wake cycles that is not synchronized to the 24-hour environment, with a consistent daily drift (usually to later and later times) of sleep onset and wake times."
  },
  {
    name: "Shift work type",
    description:
      "Insomnia during the major sleep period and/or excessive sleepiness (including inadvertent sleep) during the major awake period associated with a shift work schedule (i.e., requiring unconventional work hours)."
  },
  { name: "Unspecified type" }
];

function buildCircadianCriteria(subtypeDescription = "") {
  return subtypeDescription
    ? [...CIRCADIAN_SHARED_CRITERIA, { code: "", text: subtypeDescription }]
    : [...CIRCADIAN_SHARED_CRITERIA];
}

function buildCircadianCourseSpecifier() {
  return {
    name: "Course",
    selectionType: "single",
    allowsEmpty: true,
    options: [
      { name: "Episodic", description: "Symptoms last at least 1 month but less than 3 months." },
      { name: "Persistent", description: "Symptoms last 3 months or longer." },
      {
        name: "Recurrent",
        description: "Two or more episodes occur within the space of 1 year."
      }
    ]
  };
}

function buildCircadianSubtypeOverride({
  subtypeIndex,
  titlePages,
  sectionPages,
  specifiers = [],
  sections,
  kind
}) {
  const subtype = CIRCADIAN_SUBTYPE_OPTIONS[subtypeIndex];

  return {
    ...(kind ? { kind } : {}),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Restored the shared DSM circadian rhythm sleep-wake disorder criteria alongside this subtype definition.",
        "Corrected the subtype-specific page map so right-panel sections stop at the next circadian subtype heading."
      ]
    },
    source: {
      titlePages,
      sectionPages: {
        criteria: [630, 631],
        ...sectionPages
      }
    },
    criteria: buildCircadianCriteria(subtype.description || subtype.name),
    specifiers: [...specifiers, buildCircadianCourseSpecifier()],
    sections
  };
}

function buildResidualSleepOverride({ titlePages, descriptionPages, recording }) {
  return {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Confirmed the residual diagnosis code and category wording against the DSM-5-TR full manual.",
        "Added a dedicated verbatim Description panel from the exact residual-disorder page."
      ]
    },
    source: {
      titlePages,
      sectionPages: {
        description: descriptionPages
      }
    },
    ...(recording ? { recording } : {}),
    sections: [{ title: "Description" }]
  };
}

export const MANUAL_ENTRY_OVERRIDES = {
  "Neurodevelopmental Disorders::Intellectual Developmental Disorder (Intellectual Disability)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Verified the diagnostic criteria and severity table against DSM-5-TR pages 133-136.",
        "Corrected the diagnosis title page and rebuilt the right-panel section map so the entry now extracts its own DSM text rather than inherited communication-disorders prose."
      ]
    },
    source: {
      titlePages: [133, 134],
      sectionPages: {
        criteria: [134],
        specifiers: [134, 135, 136],
        diagnosticFeatures: [136, 137, 138],
        associatedFeatures: [138],
        prevalence: [138],
        developmentAndCourse: [139],
        riskAndPrognosticFactors: [139, 140],
        cultureRelatedDiagnosticIssues: [140],
        sexAndGenderRelatedDiagnosticIssues: [140],
        associationWithSuicidalThoughtsOrBehavior: [140],
        differentialDiagnosis: [140, 141],
        comorbidity: [141, 142],
        relationshipToOtherClassifications: [142]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Relationship to Other Classifications" }
    ]
  },
  "Neurodevelopmental Disorders::Global Developmental Delay": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F88 code and the DSM age restriction to individuals under 5 years when severity cannot yet be reliably assessed.",
        "Replaced the inherited neighboring page map with the dedicated page 142 description block so the right panel now hydrates from verbatim DSM text."
      ]
    },
    source: {
      titlePages: [142],
      sectionPages: {
        criteria: [142],
        description: [142]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Unspecified Intellectual Developmental Disorder (Intellectual Disability)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F79 code and the DSM restriction to exceptional circumstances in which severity assessment is difficult or impossible despite the individual being over age 5 years.",
        "Replaced the inherited neighboring page map with the dedicated page 142 description block so the right panel now hydrates from verbatim DSM text."
      ]
    },
    source: {
      titlePages: [142],
      sectionPages: {
        criteria: [142],
        description: [142]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Language Disorder": {
    criteria: [
      {
        code: "A",
        text: "Persistent difficulties in the acquisition and use of language across modalities (i.e., spoken, written, sign language, or other) due to deficits in comprehension or production that include the following:",
        sub_criteria: [
          { code: "1", text: "Reduced vocabulary (word knowledge and use)." },
          {
            code: "2",
            text: "Limited sentence structure (ability to put words and word endings together to form sentences based on the rules of grammar and morphology)."
          },
          {
            code: "3",
            text: "Impairments in discourse (ability to use vocabulary and connect sentences to explain or describe a topic or series of events or have a conversation)."
          }
        ]
      },
      {
        code: "B",
        text: "Language abilities are substantially and quantifiably below those expected for age, resulting in functional limitations in effective communication, social participation, academic achievement, or occupational performance, individually or in any combination."
      },
      { code: "C", text: "Onset of symptoms is in the early developmental period." },
      {
        code: "D",
        text: "The difficulties are not attributable to hearing or other sensory impairment, motor dysfunction, or another medical or neurological condition and are not better explained by intellectual developmental disorder (intellectual disability) or global developmental delay."
      }
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the exact DSM-5-TR Criterion B and Criterion D wording, including the omitted functional-limitation phrase and the parenthetical reference to intellectual developmental disorder.",
        "Corrected the section-page map so the right panel now extracts only the dedicated language-disorder pages rather than spilling into adjacent communication-disorder entries."
      ]
    },
    source: {
      titlePages: [143, 144],
      sectionPages: {
        criteria: [143, 144],
        diagnosticFeatures: [144],
        associatedFeatures: [144, 145],
        developmentAndCourse: [145],
        riskAndPrognosticFactors: [145],
        differentialDiagnosis: [145, 146],
        comorbidity: [146]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" }
    ]
  },
  "Neurodevelopmental Disorders::Speech Sound Disorder": {
    criteria: [
      {
        code: "A",
        text: "Persistent difficulty with speech sound production that interferes with speech intelligibility or prevents verbal communication of messages."
      },
      {
        code: "B",
        text: "The disturbance causes limitations in effective communication that interfere with social participation, academic achievement, or occupational performance, individually or in any combination."
      },
      { code: "C", text: "Onset of symptoms is in the early developmental period." },
      {
        code: "D",
        text: "The difficulties are not attributable to congenital or acquired conditions, such as cerebral palsy, cleft palate, deafness or hearing loss, traumatic brain injury, or other medical or neurological conditions."
      }
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the exact DSM-5-TR Criterion B wording, including the omitted functional-limitation phrase.",
        "Corrected the section-page map so the right panel now extracts only the dedicated speech-sound-disorder pages rather than inherited language- or fluency-disorder text."
      ]
    },
    source: {
      titlePages: [146, 147],
      sectionPages: {
        criteria: [146, 147],
        diagnosticFeatures: [147],
        associatedFeatures: [147],
        developmentAndCourse: [147, 148],
        differentialDiagnosis: [148],
        comorbidity: [148]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" }
    ]
  },
  "Neurodevelopmental Disorders::Childhood-Onset Fluency Disorder (Stuttering)": {
    criteria: [
      {
        code: "A",
        text: "Disturbances in the normal fluency and time patterning of speech that are inappropriate for the individual’s age and language skills, persist over time, and are characterized by frequent and marked occurrences of one (or more) of the following:",
        sub_criteria: [
          { code: "1", text: "Sound and syllable repetitions." },
          { code: "2", text: "Sound prolongations of consonants as well as vowels." },
          { code: "3", text: "Broken words (e.g., pauses within a word)." },
          { code: "4", text: "Audible or silent blocking (filled or unfilled pauses in speech)." },
          { code: "5", text: "Circumlocutions (word substitutions to avoid problematic words)." },
          { code: "6", text: "Words produced with an excess of physical tension." },
          { code: "7", text: "Monosyllabic whole-word repetitions (e.g., “I-I-I-I see him”)." }
        ]
      },
      {
        code: "B",
        text: "The disturbance causes anxiety about speaking or limitations in effective communication, social participation, or academic or occupational performance, individually or in any combination."
      },
      {
        code: "C",
        text: "The onset of symptoms is in the early developmental period.",
        note: "Later-onset cases are diagnosed as F98.5 adult-onset fluency disorder."
      },
      {
        code: "D",
        text: "The disturbance is not attributable to a speech-motor or sensory deficit, dysfluency associated with neurological insult (e.g., stroke, tumor, trauma), or another medical condition and is not better explained by another mental disorder."
      }
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the exact DSM-5-TR Criterion B through Criterion D wording, including the later-onset note and the neurological-insult examples.",
        "Corrected the section-page map so the right panel now extracts only the dedicated stuttering pages, including the functional-consequences section."
      ]
    },
    source: {
      titlePages: [149],
      sectionPages: {
        criteria: [149],
        diagnosticFeatures: [149],
        associatedFeatures: [150],
        developmentAndCourse: [150],
        riskAndPrognosticFactors: [150],
        functionalConsequencesOfChildhoodOnsetFluencyDisorderStuttering: [150],
        differentialDiagnosis: [150, 151],
        comorbidity: [151]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Functional Consequences of Childhood-Onset Fluency Disorder (Stuttering)" }
    ]
  },
  "Neurodevelopmental Disorders::Social (Pragmatic) Communication Disorder": {
    criteria: [
      {
        code: "A",
        text: "Persistent difficulties in the social use of verbal and nonverbal communication as manifested by all of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Deficits in using communication for social purposes, such as greeting and sharing information, in a manner that is appropriate for the social context."
          },
          {
            code: "2",
            text: "Impairment of the ability to change communication to match context or the needs of the listener, such as speaking differently in a classroom than on a playground, talking differently to a child than to an adult, and avoiding use of overly formal language."
          },
          {
            code: "3",
            text: "Difficulties following rules for conversation and storytelling, such as taking turns in conversation, rephrasing when misunderstood, and knowing how to use verbal and nonverbal signals to regulate interaction."
          },
          {
            code: "4",
            text: "Difficulties understanding what is not explicitly stated (e.g., making inferences) and nonliteral or ambiguous meanings of language (e.g., idioms, humor, metaphors, multiple meanings that depend on the context for interpretation)."
          }
        ]
      },
      {
        code: "B",
        text: "The deficits result in functional limitations in effective communication, social participation, social relationships, academic achievement, or occupational performance, individually or in combination."
      },
      {
        code: "C",
        text: "The onset of the symptoms is in the early developmental period (but deficits may not become fully manifest until social communication demands exceed limited capacities)."
      },
      {
        code: "D",
        text: "The symptoms are not attributable to another medical or neurological condition or to low abilities in the domains of word structure and grammar, and are not better explained by autism spectrum disorder, intellectual developmental disorder (intellectual disability), global developmental delay, or another mental disorder."
      }
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the exact DSM-5-TR Criterion C and Criterion D wording, including the developmental-demand parenthetical and the parenthetical reference to intellectual disability.",
        "Corrected the section-page map so the right panel now extracts the dedicated social-pragmatic pages instead of inheriting fluency-disorder comorbidity text."
      ]
    },
    source: {
      titlePages: [151, 152],
      sectionPages: {
        criteria: [151, 152],
        diagnosticFeatures: [152],
        associatedFeatures: [152, 153],
        developmentAndCourse: [153],
        riskAndPrognosticFactors: [153],
        differentialDiagnosis: [153, 154]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" }
    ]
  },
  "Neurodevelopmental Disorders::Unspecified Communication Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F80.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why full criteria are not met or when information is insufficient.",
        "Replaced the inherited autism-spectrum page map with the dedicated page 154 description block so the right panel now hydrates from verbatim DSM text."
      ]
    },
    source: {
      titlePages: [154],
      sectionPages: {
        criteria: [154],
        description: [154]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Attention-Deficit/Hyperactivity Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the exact DSM-5-TR criteria wording that was previously compressed or missing examples, especially the Criterion A notes, Criterion C setting examples, and Criterion E differential examples.",
        "Corrected the ADHD narrative page map to the dedicated DSM pages and expanded the right panel to include prevalence, culture, sex/gender, diagnostic markers, and functional-consequences coverage."
      ]
    },
    source: {
      titlePages: [168],
      sectionPages: {
        criteria: [168, 169, 170],
        specifiers: [170],
        diagnosticFeatures: [170, 171],
        associatedFeatures: [171],
        prevalence: [171, 172],
        developmentAndCourse: [172],
        riskAndPrognosticFactors: [172, 173],
        cultureRelatedDiagnosticIssues: [172, 173],
        sexAndGenderRelatedDiagnosticIssues: [173],
        diagnosticMarkers: [173],
        associationWithSuicidalThoughtsOrBehavior: [173],
        functionalConsequencesOfAttentionDeficitHyperactivityDisorder: [173, 174],
        differentialDiagnosis: [174, 175, 176],
        comorbidity: [176, 177]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Attention-Deficit/Hyperactivity Disorder" }
    ],
    transforms: ["normalizeAdhdCriteria"]
  },
  "Neurodevelopmental Disorders::Other Specified Attention-Deficit/Hyperactivity Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F90.8 code and the DSM instruction to record the diagnosis followed by the specific reason the presentation does not meet full ADHD criteria.",
        "Replaced the inherited specific-learning page map with the dedicated DSM description block on page 177."
      ]
    },
    source: {
      titlePages: [177],
      sectionPages: {
        criteria: [177],
        description: [177]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Unspecified Attention-Deficit/Hyperactivity Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F90.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why full criteria are not met or when information is insufficient.",
        "Replaced the inherited specific-learning page map with the dedicated DSM description span across pages 177-178."
      ]
    },
    source: {
      titlePages: [177],
      sectionPages: {
        criteria: [177, 178],
        description: [177, 178]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Specific Learning Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the full DSM-5-TR criteria wording, including Criterion B's standardized-assessment sentence, Criterion C's example clause, and the note that the diagnosis rests on clinical synthesis.",
        "Rebuilt the coding and recording structure so multiple impaired academic domains can be selected and coded separately, with explicit DSM-backed subskill selectors and the dedicated narrative pages through comorbidity."
      ]
    },
    source: {
      titlePages: [178],
      sectionPages: {
        criteria: [178, 179],
        specifiers: [179, 180],
        recordingProcedures: [180],
        diagnosticFeatures: [180, 181, 182, 183],
        associatedFeatures: [183, 184],
        prevalence: [184],
        developmentAndCourse: [184, 185, 186],
        riskAndPrognosticFactors: [186],
        cultureRelatedDiagnosticIssues: [186, 187],
        sexAndGenderRelatedDiagnosticIssues: [187],
        associationWithSuicidalThoughtsOrBehavior: [187, 188],
        functionalConsequencesOfSpecificLearningDisorder: [188],
        differentialDiagnosis: [188, 189],
        comorbidity: [189]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Difficulties learning and using academic skills, as indicated by the presence of at least one of the following symptoms that have persisted for at least 6 months, despite the provision of interventions that target those difficulties:",
        items: [
          {
            code: "1",
            text:
              "Inaccurate or slow and effortful word reading (e.g., reads single words aloud incorrectly or slowly and hesitantly, frequently guesses words, has difficulty sounding out words)."
          },
          {
            code: "2",
            text:
              "Difficulty understanding the meaning of what is read (e.g., may read text accurately but not understand the sequence, relationships, inferences, or deeper meanings of what is read)."
          },
          {
            code: "3",
            text:
              "Difficulties with spelling (e.g., may add, omit, or substitute vowels or consonants)."
          },
          {
            code: "4",
            text:
              "Difficulties with written expression (e.g., makes multiple grammatical or punctuation errors within sentences; employs poor paragraph organization; written expression of ideas lacks clarity)."
          },
          {
            code: "5",
            text:
              "Difficulties mastering number sense, number facts, or calculation (e.g., has poor understanding of numbers, their magnitude, and relationships; counts on fingers to add single-digit numbers instead of recalling the math fact as peers do; gets lost in the midst of arithmetic computation and may switch procedures)."
          },
          {
            code: "6",
            text:
              "Difficulties with mathematical reasoning (e.g., has severe difficulty applying mathematical concepts, facts, or procedures to solve quantitative problems)."
          }
        ]
      },
      {
        code: "B",
        text:
          "The affected academic skills are substantially and quantifiably below those expected for the individual's chronological age, and cause significant interference with academic or occupational performance, or with activities of daily living, as confirmed by individually administered standardized achievement measures and comprehensive clinical assessment. For individuals age 17 years and older, a documented history of impairing learning difficulties may be substituted for the standardized assessment."
      },
      {
        code: "C",
        text:
          "The learning difficulties begin during school-age years but may not become fully manifest until the demands for those affected academic skills exceed the individual's limited capacities (e.g., as in timed tests, reading or writing lengthy complex reports for a tight deadline, excessively heavy academic loads)."
      },
      {
        code: "D",
        text:
          "The learning difficulties are not better accounted for by intellectual disabilities, uncorrected visual or auditory acuity, other mental or neurological disorders, psychosocial adversity, lack of proficiency in the language of academic instruction, or inadequate educational instruction.",
        note:
          "The four diagnostic criteria are to be met based on a clinical synthesis of the individual's history (developmental, medical, family, educational), school reports, and psychoeducational assessment."
      }
    ],
    specifiers: [
      {
        name: "With impairment in reading",
        description:
          "Note: Dyslexia is an alternative term used to refer to a pattern of learning difficulties characterized by problems with accurate or fluent word recognition, poor decoding, and poor spelling abilities. If dyslexia is used to specify this particular pattern of difficulties, it is important also to specify any additional difficulties that are present, such as difficulties with reading comprehension or math reasoning.",
        selectionType: "multiple",
        options: [
          {
            name: "Word reading accuracy"
          },
          {
            name: "Reading rate or fluency"
          },
          {
            name: "Reading comprehension"
          }
        ]
      },
      {
        name: "With impairment in written expression",
        selectionType: "multiple",
        options: [
          {
            name: "Spelling accuracy"
          },
          {
            name: "Grammar and punctuation accuracy"
          },
          {
            name: "Clarity or organization of written expression"
          }
        ]
      },
      {
        name: "With impairment in mathematics",
        description:
          "Note: Dyscalculia is an alternative term used to refer to a pattern of difficulties characterized by problems processing numerical information, learning arithmetic facts, and performing accurate or fluent calculations. If dyscalculia is used to specify this particular pattern of mathematic difficulties, it is important also to specify any additional difficulties that are present, such as difficulties with math reasoning or word reasoning accuracy.",
        selectionType: "multiple",
        options: [
          {
            name: "Number sense"
          },
          {
            name: "Memorization of arithmetic facts"
          },
          {
            name: "Accurate or fluent calculation"
          },
          {
            name: "Accurate math reasoning"
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "single",
        options: [
          {
            name: "Mild",
            description:
              "Some difficulties learning skills in one or two academic domains, but of mild enough severity that the individual may be able to compensate or function well when provided with appropriate accommodations or support services, especially during the school years."
          },
          {
            name: "Moderate",
            description:
              "Marked difficulties learning skills in one or more academic domains, so that the individual is unlikely to become proficient without some intervals of intensive and specialized teaching during the school years. Some accommodations or supportive services at least part of the day at school, in the workplace, or at home may be needed to complete activities accurately and efficiently."
          },
          {
            name: "Severe",
            description:
              "Severe difficulties learning skills, affecting several academic domains, so that the individual is unlikely to learn those skills without ongoing intensive individualized and specialized teaching for most of the school years. Even with an array of appropriate accommodations or services at home, at school, or in the workplace, the individual may not be able to complete all activities efficiently."
          }
        ]
      }
    ],
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Specific Learning Disorder" }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      codeJoiner: "; ",
      inputs: [
        {
          id: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
          name: "Academic Domains",
          description:
            "Specify all academic domains that are impaired. When more than one domain is impaired, each one should be coded individually according to the DSM-5-TR specifiers.",
          selectionType: "multiple",
          allowsEmpty: true,
          options: [
            {
              id: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-0-with-impairment-in-reading",
              name: "With impairment in reading",
              description: "ICD-10-CM: F81.0",
              details: [],
              criteria: []
            },
            {
              id: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-1-with-impairment-in-written-expression",
              name: "With impairment in written expression",
              description: "ICD-10-CM: F81.81",
              details: [],
              criteria: []
            },
            {
              id: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-2-with-impairment-in-mathematics",
              name: "With impairment in mathematics",
              description: "ICD-10-CM: F81.2",
              details: [],
              criteria: []
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
              option:
                "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-0-with-impairment-in-reading"
            }
          ],
          code: "F81.0"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
              option:
                "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-1-with-impairment-in-written-expression"
            }
          ],
          code: "F81.81"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
              option:
                "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-2-with-impairment-in-mathematics"
            }
          ],
          code: "F81.2"
        }
      ],
      notes: [
        "Specify all academic domains and subskills that are impaired. When more than one domain is impaired, each one should be coded individually according to the following specifiers."
      ],
      additionalCodeRules: [
        {
          conditions: [
            {
              type: "selection",
              group: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
              option:
                "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-1-with-impairment-in-written-expression"
            }
          ],
          code: "F81.81"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains",
              option:
                "neurodevelopmental-disorders-specific-learning-disorder-coding-input-academic-domains-option-2-with-impairment-in-mathematics"
            }
          ],
          code: "F81.2"
        }
      ]
    },
    recording: {
      mode: "specific-learning-multiple-domains",
      instructions: [
        "Each impaired academic domain and subskill of specific learning disorder should be recorded.",
        "Because of ICD coding requirements, impairments in reading, impairments in written expression, and impairments in mathematics, with their corresponding impairments in subskills, must be coded and recorded separately."
      ],
      fields: []
    }
  },
  "Neurodevelopmental Disorders::Developmental Coordination Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the full DSM-5-TR criteria wording, including Criterion A's motor-skill examples across the page break and Criterion D's intellectual-developmental and neurological-condition examples.",
        "Replaced the inherited section-page map so the right panel now hydrates from the dedicated developmental-coordination pages, including associated features, culture-related issues, functional consequences, differential diagnosis, and comorbidity."
      ]
    },
    source: {
      titlePages: [189],
      sectionPages: {
        criteria: [189, 190],
        diagnosticFeatures: [190, 191],
        associatedFeatures: [191],
        prevalence: [191],
        developmentAndCourse: [191],
        riskAndPrognosticFactors: [191, 192],
        cultureRelatedDiagnosticIssues: [192],
        functionalConsequencesOfDevelopmentalCoordinationDisorder: [192],
        differentialDiagnosis: [192, 193],
        comorbidity: [193]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "The acquisition and execution of coordinated motor skills is substantially below that expected given the individual's chronological age and opportunity for skill learning and use. Difficulties are manifested as clumsiness (e.g., dropping or bumping into objects) as well as slowness and inaccuracy of performance of motor skills (e.g., catching an object, using scissors or cutlery, handwriting, riding a bike, or participating in sports)."
      },
      {
        code: "B",
        text:
          "The motor skills deficit in Criterion A significantly and persistently interferes with activities of daily living appropriate to chronological age (e.g., self-care and self-maintenance) and impacts academic/school productivity, prevocational and vocational activities, leisure, and play."
      },
      {
        code: "C",
        text: "Onset of symptoms is in the early developmental period."
      },
      {
        code: "D",
        text:
          "The motor skills deficits are not better explained by intellectual developmental disorder (intellectual disability) or visual impairment and are not attributable to a neurological condition affecting movement (e.g., cerebral palsy, muscular dystrophy, degenerative disorder)."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences of Developmental Coordination Disorder" }
    ]
  },
  "Neurodevelopmental Disorders::Stereotypic Movement Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Restored the dedicated stereotypic-movement page map so the right panel no longer inherits developmental-coordination comorbidity text or neighboring tic-disorder pages.",
        "Added DSM-backed recording guidance for presentations associated with a known genetic or other medical condition, neurodevelopmental disorder, or environmental factor, including the instruction to additionally code the associated condition when applicable."
      ]
    },
    source: {
      titlePages: [193],
      sectionPages: {
        criteria: [193],
        specifiers: [194],
        recordingProcedures: [194],
        diagnosticFeatures: [194, 195],
        prevalence: [195],
        developmentAndCourse: [195, 196],
        riskAndPrognosticFactors: [196],
        cultureRelatedDiagnosticIssues: [196],
        differentialDiagnosis: [196, 197, 198],
        comorbidity: [198]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Repetitive, seemingly driven, and apparently purposeless motor behavior (e.g., hand shaking or waving, body rocking, head banging, self-biting, hitting own body)."
      },
      {
        code: "B",
        text:
          "The repetitive motor behavior interferes with social, academic, or other activities and may result in self-injury."
      },
      {
        code: "C",
        text: "Onset is in the early developmental period."
      },
      {
        code: "D",
        text:
          "The repetitive motor behavior is not attributable to the physiological effects of a substance or neurological condition and is not better explained by another neurodevelopmental or mental disorder (e.g., trichotillomania [hair-pulling disorder], obsessive-compulsive disorder)."
      }
    ],
    specifiers: [
      {
        name: "Self-Injurious Behavior",
        selectionType: "single",
        options: [
          {
            name: "With self-injurious behavior",
            description:
              "Use when the behavior includes self-injury or behavior that would result in an injury if preventive measures were not used."
          },
          {
            name: "Without self-injurious behavior"
          }
        ]
      },
      {
        name: "Association",
        selectionType: "boolean",
        options: [
          {
            name:
              "Associated with a known genetic or other medical condition, neurodevelopmental disorder, or environmental factor",
            description:
              "Examples given by DSM-5-TR include Lesch-Nyhan syndrome, intellectual developmental disorder (intellectual disability), and intrauterine alcohol exposure."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "single",
        options: [
          {
            name: "Mild",
            description: "Symptoms are easily suppressed by sensory stimulus or distraction."
          },
          {
            name: "Moderate",
            description:
              "Symptoms require explicit protective measures and behavioral modification."
          },
          {
            name: "Severe",
            description:
              "Continuous monitoring and protective measures are required to prevent serious injury."
          }
        ]
      }
    ],
    sections: [
      { title: "Recording Procedures" },
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" }
    ],
    recording: {
      mode: "stereotypic-associated-condition",
      instructions: [
        "For stereotypic movement disorder that is associated with a known genetic or other medical condition, neurodevelopmental disorder, or environmental factor, record stereotypic movement disorder associated with the named condition, disorder, or factor.",
        "Use additional code to identify the associated genetic or other medical condition, neurodevelopmental disorder, or environmental factor."
      ],
      fields: [
        {
          key: "associated-condition-disorder-or-factor",
          label: "Associated condition, disorder, or factor",
          placeholder: "e.g., Lesch-Nyhan syndrome"
        },
        {
          key: "associated-condition-disorder-or-factor-codes",
          label: "Associated condition, disorder, or factor code(s)",
          placeholder: "e.g., E79.1"
        }
      ]
    }
  },
  "Neurodevelopmental Disorders::Other Specified Neurodevelopmental Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F88 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Pointed the entry to the dedicated residual-neurodevelopmental pages, including the prenatal-alcohol-exposure example that continues onto the next page."
      ]
    },
    source: {
      titlePages: [205],
      sectionPages: {
        criteria: [205, 206],
        description: [205, 206]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Unspecified Neurodevelopmental Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Confirmed the fixed F89 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria are not met or when information is insufficient.",
        "Pointed the entry to its dedicated page-206 description block so the right panel hydrates from the verbatim DSM wording."
      ]
    },
    source: {
      titlePages: [206],
      sectionPages: {
        criteria: [206],
        description: [206]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Autism Spectrum Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Severity recording is split into separate support levels for social communication and restricted/repetitive behaviors.",
        "Catatonia is modeled as an additional code rather than replacing the base autism spectrum disorder code."
      ]
    },
    source: {
      titlePages: [156, 157, 158, 161],
      sectionPages: {
        criteria: [156],
        specifiers: [156, 157, 158],
        diagnosticFeatures: [158, 161],
        coding: [156, 157]
      }
    },
    transforms: ["splitAutismSeverity"],
    coding: {
      strategy: "fixed-with-additional",
      code: "F84.0",
      notes: [
        "Use F84.0 as the base diagnosis code.",
        "If catatonia is selected, add F06.1 rather than replacing the autism spectrum disorder code."
      ],
      additionalCodeRules: [
        {
          conditions: [
            {
              type: "selection",
              group: "catatonia",
              option: "with-catatonia"
            }
          ],
          code: "F06.1"
        }
      ]
    }
  },
  "Neurodevelopmental Disorders::Tourette's Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F95.2 code and the DSM hierarchy in which Tourette's disorder outranks persistent and provisional tic disorder diagnoses.",
        "Expanded the right-panel summaries with DSM-grounded epidemiology, culture, sex/gender, and functional-impact details."
      ]
    },
    source: {
      sectionPages: {
        criteria: [198, 199],
        diagnosticFeatures: [199, 200, 201],
        prevalence: [201],
        developmentAndCourse: [201],
        riskAndPrognosticFactors: [202],
        cultureRelatedDiagnosticIssues: [202],
        sexAndGenderRelatedDiagnosticIssues: [202],
        associationWithSuicidalThoughtsOrBehavior: [203],
        functionalConsequencesOfTicDisorders: [203],
        differentialDiagnosis: [203, 204],
        comorbidity: [204]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Tic Disorders" }
    ]
  },
  "Neurodevelopmental Disorders::Persistent (Chronic) Motor or Vocal Tic Disorder": {
    codes: [{ code: "F95.0", description: "" }],
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F95.0 code and the required DSM specifier distinction between motor tics only versus vocal tics only.",
        "Replaced the placeholder panel text with DSM-grounded summary wording tied back to the shared tic-disorders section."
      ]
    },
    source: {
      titlePages: [198, 199],
      sectionPages: {
        criteria: [198, 199],
        specifiers: [199],
        diagnosticFeatures: [199, 200, 201],
        differentialDiagnosis: [203, 204],
        comorbidity: [204]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Provisional Tic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F95.0 code and the DSM rule that provisional tic disorder requires symptom duration of less than 1 year since first onset.",
        "Replaced the placeholder panel text with DSM-grounded summary wording tied back to the shared tic-disorders section."
      ]
    },
    source: {
      titlePages: [199],
      sectionPages: {
        criteria: [199],
        diagnosticFeatures: [199, 200, 201],
        differentialDiagnosis: [203, 204],
        comorbidity: [204]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Other Specified Tic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F95.8 code and the DSM instruction to record the diagnosis followed by the specific reason the presentation does not meet criteria for a more specific tic disorder.",
        "Replaced the placeholder panel text with DSM-grounded summary wording and verified the recording-field example."
      ]
    },
    source: {
      titlePages: [204, 205],
      sectionPages: {
        description: [204, 205],
        comorbidity: [204]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurodevelopmental Disorders::Unspecified Tic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F95.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for a more specific tic disorder are not met or when information is insufficient.",
        "Replaced the placeholder panel text with DSM-grounded summary wording."
      ]
    },
    source: {
      titlePages: [205],
      sectionPages: {
        description: [205]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Bipolar and Related Disorders::Bipolar I Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with DSM-5-TR code resolution based on the type of current or most recent episode plus the applicable status code row.",
        "Corrected the diagnosis title page and section-page map to the dedicated Bipolar I pages, while preserving the psychotic-feature type chooser and the F06.1 catatonia add-on code."
      ]
    },
    source: {
      titlePages: [259],
      sectionPages: {
        criteria: [255, 256, 257, 258, 259],
        specifiers: [259, 260],
        diagnosticFeatures: [260, 261, 262, 263],
        associatedFeatures: [263],
        prevalence: [263],
        developmentAndCourse: [263, 264],
        riskAndPrognosticFactors: [264],
        cultureRelatedDiagnosticIssues: [265],
        sexAndGenderRelatedDiagnosticIssues: [265],
        associationWithSuicidalThoughtsOrBehavior: [265, 266],
        functionalConsequences: [266],
        differentialDiagnosis: [266, 267],
        comorbidity: [268]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ],
    transforms: [
      "insertBipolarICurrentOrMostRecentEpisodeSpecifier",
      "normalizeBipolarStatusSpecifier",
      "consolidateBipolarPsychoticFeatureType"
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      rules: [
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "mild")
          ],
          code: "F31.11"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "moderate")
          ],
          code: "F31.12"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "severe")
          ],
          code: "F31.13"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "with-psychotic-features")
          ],
          code: "F31.2"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-partial-remission")
          ],
          code: "F31.73"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-full-remission")
          ],
          code: "F31.74"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-manic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "unspecified")
          ],
          code: "F31.9"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-hypomanic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-partial-remission")
          ],
          code: "F31.71"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-hypomanic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-full-remission")
          ],
          code: "F31.72"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-hypomanic"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "unspecified")
          ],
          code: "F31.9"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-hypomanic"
            ),
            { type: "no-selection-in-group", group: "severity-psychotic-remission-status" }
          ],
          code: "F31.0"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "mild")
          ],
          code: "F31.31"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "moderate")
          ],
          code: "F31.32"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "severe")
          ],
          code: "F31.4"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "with-psychotic-features")
          ],
          code: "F31.5"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-partial-remission")
          ],
          code: "F31.75"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "in-full-remission")
          ],
          code: "F31.76"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-depressed"
            ),
            makeSelectionCondition("severity-psychotic-remission-status", "unspecified")
          ],
          code: "F31.9"
        },
        {
          conditions: [
            makeSelectionCondition(
              "current-or-most-recent-episode",
              "current-or-most-recent-episode-unspecified"
            ),
            { type: "no-selection-in-group", group: "severity-psychotic-remission-status" }
          ],
          code: "F31.9"
        }
      ],
      notes: [
        "The DSM-5-TR coding table is based on type of current or most recent episode plus current severity, psychotic-features status, or remission status.",
        "For hypomanic episodes not in remission, use F31.0 without a severity or psychotic-features status.",
        "If psychotic features are present, use the psychotic-features status irrespective of episode severity."
      ],
      additionalCodeRules: [
        {
          conditions: [makeSelectionCondition("catatonia", "with-catatonia")],
          code: "F06.1"
        }
      ]
    }
  },
  "Bipolar and Related Disorders::Bipolar II Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR pages 153-154 that bipolar II disorder records current or most recent episode separately from one applicable severity or remission status.",
        "Corrected the displayed severity/psychotic/remission block to a single-choice group while leaving code resolution conservative.",
        "Collapsed mood-congruent versus mood-incongruent psychotic features into one psychotic-feature-type chooser so the UI no longer permits both at once."
      ]
    },
    source: {
      titlePages: [268],
      sectionPages: {
        criteria: [268, 269, 270],
        specifiers: [271, 272],
        diagnosticFeatures: [272, 273],
        associatedFeatures: [273, 274],
        prevalence: [274],
        developmentAndCourse: [274, 275],
        riskAndPrognosticFactors: [275],
        sexAndGenderRelatedDiagnosticIssues: [275, 276],
        associationWithSuicidalThoughtsOrBehavior: [276],
        functionalConsequences: [276],
        differentialDiagnosis: [276, 277, 278],
        comorbidity: [278, 279]
      }
    },
    transforms: ["normalizeBipolarStatusSpecifier", "consolidateBipolarPsychoticFeatureType"]
  },
  "Bipolar and Related Disorders::Cyclothymic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F34.0 code and the DSM requirement that full manic, hypomanic, and major depressive episode criteria must never previously have been met.",
        "Replaced the empty panel with DSM-grounded chronic-course, conversion-risk, and differential-diagnosis summaries."
      ]
    },
    source: {
      titlePages: [279],
      sectionPages: {
        criteria: [279],
        specifiers: [279],
        diagnosticFeatures: [279, 280],
        prevalence: [280],
        developmentAndCourse: [280, 281],
        riskAndPrognosticFactors: [281],
        differentialDiagnosis: [281],
        comorbidity: [282]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" }
    ]
  },
  "Bipolar and Related Disorders::Substance/Medication-Induced Bipolar and Related Disorder": {
    codes: buildSubstanceCodeDisplayRows(BIPOLAR_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Corrected the placeholder F1x.x4 code to an explicit DSM table-driven selector keyed to substance class and same-class use-disorder status.",
        "Replaced the empty panel with DSM-grounded recording, onset, differential-diagnosis, and comorbidity guidance."
      ]
    },
    source: {
      titlePages: [282],
      sectionPages: {
        criteria: [282, 283],
        specifiers: [283],
        recordingProcedures: [284],
        diagnosticFeatures: [284, 285],
        associatedFeatures: [285],
        prevalence: [285],
        developmentAndCourse: [286],
        diagnosticMarkers: [286],
        differentialDiagnosis: [286],
        comorbidity: [286]
      }
    },
    coding: buildSubstanceInducedBipolarCoding(),
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Diagnostic Markers" }
    ]
  },
  "Bipolar and Related Disorders::Bipolar and Related Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Corrected the source-page drift to the dedicated DSM section and exposed the code-first medical-condition recording note in the normalized entry.",
        "Replaced the empty panel with DSM-grounded feature, course, and differential-diagnosis summaries."
      ]
    },
    source: {
      titlePages: [287],
      sectionPages: {
        criteria: [287],
        specifiers: [287],
        recordingProcedures: [287],
        diagnosticFeatures: [287, 288],
        associatedFeatures: [288],
        developmentAndCourse: [288],
        cultureRelatedDiagnosticIssues: [288],
        sexAndGenderRelatedDiagnosticIssues: [288],
        diagnosticMarkers: [288, 289],
        functionalConsequences: [289],
        differentialDiagnosis: [289],
        comorbidity: [289]
      }
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences" }
    ]
  },
  "Bipolar and Related Disorders::Other Specified Bipolar and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F31.89 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for short-duration hypomania, insufficient-symptom hypomania, hypomania without prior major depression, and short-duration cyclothymia."
      ]
    },
    source: {
      titlePages: [289, 290],
      sectionPages: {
        description: [289, 290]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Bipolar and Related Disorders::Unspecified Bipolar and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F31.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why full bipolar-spectrum criteria are not met or when information is insufficient."
      ]
    },
    source: {
      sectionPages: {
        description: [291]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Oppositional Defiant Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "The DSM-5-TR frequency and persistence note under Criterion A is explicitly preserved in the normalized criteria model.",
        "Right-panel reference sections were added because the legacy dataset lacked full_text content for this diagnosis."
      ]
    },
    source: {
      titlePages: [728, 729, 730],
      sectionPages: {
        criteria: [728, 729],
        specifiers: [729],
        diagnosticFeatures: [729, 730],
        associatedFeatures: [730]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Specifiers" },
      { title: "Associated Features" }
    ]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Intermittent Explosive Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F63.81 code and that DSM-5-TR allows an additional intermittent explosive disorder diagnosis alongside ADHD, conduct disorder, oppositional defiant disorder, or autism spectrum disorder when the aggressive outbursts are excessive enough to warrant independent clinical attention.",
        "Added source-grounded right-panel summary sections because the legacy dataset did not include usable narrative text for this diagnosis."
      ]
    },
    source: {
      titlePages: [734, 735],
      sectionPages: {
        criteria: [734, 735],
        diagnosticFeatures: [735],
        associatedFeatures: [735],
        prevalence: [736],
        developmentAndCourse: [736],
        riskAndPrognosticFactors: [736],
        cultureRelatedDiagnosticIssues: [737],
        associationWithSuicidalThoughtsOrBehavior: [737],
        functionalConsequencesOfIntermittentExplosiveDisorder: [737],
        differentialDiagnosis: [737, 738],
        comorbidity: [738]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Intermittent Explosive Disorder" }
    ]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Conduct Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR page 741 that the 'with limited prosocial emotions' specifier requires at least two characteristics over at least 12 months and across multiple relationships and settings.",
        "Corrected the specifier model so selecting only one trait no longer gets reported as if the full DSM specifier were met.",
        "Added source-grounded right-panel summary sections because the legacy dataset did not include usable narrative text for this diagnosis."
      ]
    },
    source: {
      sectionPages: {
        specifiers: [740, 741],
        diagnosticFeatures: [742],
        associatedFeatures: [743],
        prevalence: [743],
        developmentAndCourse: [743, 744],
        riskAndPrognosticFactors: [744],
        cultureRelatedDiagnosticIssues: [745],
        sexAndGenderRelatedDiagnosticIssues: [745],
        associationWithSuicidalThoughtsOrBehavior: [745],
        functionalConsequencesOfConductDisorder: [745]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Conduct Disorder" }
    ],
    transforms: ["applyConductProsocialThreshold"]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Pyromania": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F63.1 code and the DSM distinction between pyromania and deliberate fire setting for profit, revenge, political motives, concealment, or psychotic/manic causes.",
        "Added source-grounded right-panel summary sections because the legacy dataset did not include usable narrative text for this diagnosis."
      ]
    },
    source: {
      titlePages: [747, 748, 749],
      sectionPages: {
        criteria: [747],
        diagnosticFeatures: [747, 748],
        associatedFeatures: [748],
        prevalence: [748],
        developmentAndCourse: [748],
        sexAndGenderRelatedDiagnosticIssues: [749],
        associationWithSuicidalThoughtsOrBehavior: [749],
        differentialDiagnosis: [749],
        comorbidity: [749]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" }
    ]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Kleptomania": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F63.2 code and the DSM distinction between kleptomania and ordinary theft motivated by usefulness, monetary value, dare behavior, or malingering.",
        "Added source-grounded right-panel summary sections because the legacy dataset did not include usable narrative text for this diagnosis."
      ]
    },
    source: {
      titlePages: [749, 750, 751],
      sectionPages: {
        criteria: [749, 750],
        diagnosticFeatures: [750],
        associatedFeatures: [750],
        prevalence: [750],
        developmentAndCourse: [750, 751],
        riskAndPrognosticFactors: [751],
        associationWithSuicidalThoughtsOrBehavior: [751],
        functionalConsequencesOfKleptomania: [751],
        differentialDiagnosis: [751],
        comorbidity: [751]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Kleptomania" }
    ]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Other Specified Disruptive, Impulse-Control, and Conduct Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F91.8 code and the DSM instruction to record the diagnosis followed by the specific reason the presentation does not meet a more specific disruptive, impulse-control, and conduct disorder.",
        "Added a sourced description section because the legacy dataset did not include usable narrative text for this residual diagnosis."
      ]
    },
    source: {
      titlePages: [751, 752],
      sectionPages: {
        description: [752]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Disruptive, Impulse-Control, and Conduct Disorders::Unspecified Disruptive, Impulse-Control, and Conduct Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F91.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why the presentation falls short of a more specific disruptive, impulse-control, and conduct disorder or when information is insufficient.",
        "Added a sourced description section because the legacy dataset did not include usable narrative text for this residual diagnosis."
      ]
    },
    source: {
      titlePages: [752],
      sectionPages: {
        description: [752]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Paraphilic Disorders::Fetishistic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR pages 1057-1058 that combinations of fetishistic sexual interests are explicitly described as non-mutually exclusive.",
        "Retained the focus-of-arousal specifier group as multi-select so the UI can represent combined fetishistic interests without forcing an artificial single choice."
      ]
    }
  },
  "Substance-Related and Addictive Disorders::Alcohol Use Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Moderate and severe alcohol use disorder share the same base code F10.20.",
        "Remission changes the code to F10.11 for mild cases and F10.21 for moderate or severe cases."
      ]
    },
    source: {
      titlePages: [765, 766, 1201, 1230],
      sectionPages: {
        criteria: [766],
        specifiers: [766, 767],
        diagnosticFeatures: [767, 768],
        associatedFeatures: [768, 769],
        prevalence: [769],
        developmentAndCourse: [769, 770],
        riskAndPrognosticFactors: [770, 771],
        cultureRelatedDiagnosticIssues: [771],
        sexAndGenderRelatedDiagnosticIssues: [771, 772],
        diagnosticMarkers: [772, 773],
        associationWithSuicidalThoughtsOrBehavior: [773],
        functionalConsequences: [773, 774],
        differentialDiagnosis: [774],
        comorbidity: [774, 775],
        coding: [1201, 1230]
      }
    },
    coding: {
      strategy: "composite",
      computedGroups: ["severity"],
      notes: [
        "Severity is derived from the number of criteria endorsed within the criteria checklist.",
        "Moderate and severe share F10.20 unless remission specifiers are applied."
      ],
      rules: [
        {
          conditions: [{ type: "criteria-count-between", min: 2, max: 3 }],
          code: "F10.10",
          derivedSelections: [{ group: "severity", option: "mild", label: "Mild" }]
        },
        {
          conditions: [{ type: "criteria-count-between", min: 4, max: 5 }],
          code: "F10.20",
          derivedSelections: [{ group: "severity", option: "moderate", label: "Moderate" }]
        },
        {
          conditions: [{ type: "criteria-count-at-least", min: 6 }],
          code: "F10.20",
          derivedSelections: [{ group: "severity", option: "severe", label: "Severe" }]
        },
        {
          conditions: [
            { type: "criteria-count-between", min: 2, max: 3 },
            { type: "selection", group: "remission-specifiers", option: "in-early-remission" }
          ],
          code: "F10.11",
          derivedSelections: [
            { group: "severity", option: "mild", label: "Mild" },
            { group: "remission-specifiers", option: "in-early-remission", label: "In early remission" }
          ]
        },
        {
          conditions: [
            { type: "criteria-count-between", min: 2, max: 3 },
            { type: "selection", group: "remission-specifiers", option: "in-sustained-remission" }
          ],
          code: "F10.11",
          derivedSelections: [
            { group: "severity", option: "mild", label: "Mild" },
            {
              group: "remission-specifiers",
              option: "in-sustained-remission",
              label: "In sustained remission"
            }
          ]
        },
        {
          conditions: [
            { type: "criteria-count-between", min: 4, max: 99 },
            { type: "selection", group: "remission-specifiers", option: "in-early-remission" }
          ],
          code: "F10.21",
          derivedSelections: [
            { group: "remission-specifiers", option: "in-early-remission", label: "In early remission" }
          ]
        },
        {
          conditions: [
            { type: "criteria-count-between", min: 4, max: 99 },
            { type: "selection", group: "remission-specifiers", option: "in-sustained-remission" }
          ],
          code: "F10.21",
          derivedSelections: [
            {
              group: "remission-specifiers",
              option: "in-sustained-remission",
              label: "In sustained remission"
            }
          ]
        }
      ]
    }
  },
  "Substance-Related and Addictive Disorders::Alcohol Intoxication": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with the DSM-5-TR alcohol intoxication coding note that varies only by comorbid alcohol use disorder severity or absence.",
        "Corrected the source map to the actual alcohol intoxication criteria and narrative pages in the full manual so the right panel now hydrates from verbatim DSM text."
      ]
    },
    source: {
      titlePages: [775],
      sectionPages: {
        criteria: [775],
        diagnosticFeatures: [775, 776],
        associatedFeatures: [776],
        prevalence: [776, 777],
        developmentAndCourse: [777],
        riskAndPrognosticFactors: [777],
        cultureRelatedDiagnosticIssues: [777],
        sexAndGenderRelatedDiagnosticIssues: [777],
        diagnosticMarkers: [777],
        associationWithSuicidalThoughtsOrBehavior: [778],
        functionalConsequences: [778],
        differentialDiagnosis: [778],
        comorbidity: [778]
      }
    },
    coding: buildSpecificUseDisorderStatusCoding({
      statusGroupId:
        "substance-related-and-addictive-disorders-alcohol-intoxication-coding-input-use-disorder-status",
      substanceLabel: "alcohol",
      codes: ["F10.120", "F10.220", "F10.920"],
      description:
        "Select whether alcohol intoxication is coded with mild alcohol use disorder, with moderate or severe alcohol use disorder, or without a comorbid alcohol use disorder.",
      notes: [
        "The DSM-5-TR coding note varies only by whether a comorbid alcohol use disorder is mild, moderate or severe, or absent."
      ]
    }),
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Substance-Related and Addictive Disorders::Alcohol Withdrawal": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the manual recording-option picker with DSM-5-TR coding rules that combine comorbid alcohol use disorder status with the optional 'With perceptual disturbances' specifier.",
        "Corrected the source map to the actual alcohol withdrawal pages so the right panel now reflects the verbatim criteria, specifier note, and withdrawal narrative text from the full manual."
      ]
    },
    source: {
      titlePages: [779],
      sectionPages: {
        criteria: [779],
        specifiers: [779, 780],
        diagnosticFeatures: [780],
        associatedFeatures: [780],
        prevalence: [780, 781],
        developmentAndCourse: [781],
        riskAndPrognosticFactors: [781],
        diagnosticMarkers: [781],
        functionalConsequences: [781],
        differentialDiagnosis: [781, 782],
        comorbidity: [782]
      }
    },
    coding: buildSpecificUseDisorderStatusCodingWithOptionalSpecifier({
      entryId: "substance-related-and-addictive-disorders-alcohol-withdrawal",
      specifierName: "With perceptual disturbances",
      specifierOptionName: "With perceptual disturbances",
      statusGroupId:
        "substance-related-and-addictive-disorders-alcohol-withdrawal-coding-input-use-disorder-status",
      substanceLabel: "alcohol",
      codesWithoutSpecifier: ["F10.130", "F10.230", "F10.930"],
      codesWithSpecifier: ["F10.132", "F10.232", "F10.932"],
      description:
        "Select whether alcohol withdrawal is coded with mild alcohol use disorder, with moderate or severe alcohol use disorder, or without a comorbid alcohol use disorder.",
      notes: [
        "The DSM-5-TR coding note varies by comorbid alcohol use disorder status and whether the 'With perceptual disturbances' specifier applies."
      ]
    }),
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences" }
    ]
  },
  "Substance-Related and Addictive Disorders::Cannabis Intoxication": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the manual recording-option picker with DSM-5-TR coding rules that combine comorbid cannabis use disorder status with the optional 'With perceptual disturbances' specifier.",
        "Corrected the source map to the actual cannabis intoxication pages so the right panel now hydrates from verbatim DSM text rather than the legacy summary block."
      ]
    },
    source: {
      titlePages: [800],
      sectionPages: {
        criteria: [800, 801],
        specifiers: [801],
        diagnosticFeatures: [801, 802],
        prevalence: [802],
        functionalConsequences: [802],
        differentialDiagnosis: [802],
        comorbidity: [802]
      }
    },
    coding: buildSpecificUseDisorderStatusCodingWithOptionalSpecifier({
      entryId: "substance-related-and-addictive-disorders-cannabis-intoxication",
      specifierName: "With perceptual disturbances",
      specifierOptionName: "With perceptual disturbances",
      statusGroupId:
        "substance-related-and-addictive-disorders-cannabis-intoxication-coding-input-use-disorder-status",
      substanceLabel: "cannabis",
      codesWithoutSpecifier: ["F12.120", "F12.220", "F12.920"],
      codesWithSpecifier: ["F12.122", "F12.222", "F12.922"],
      description:
        "Select whether cannabis intoxication is coded with mild cannabis use disorder, with moderate or severe cannabis use disorder, or without a comorbid cannabis use disorder.",
      notes: [
        "The DSM-5-TR coding note varies by comorbid cannabis use disorder status and whether the 'With perceptual disturbances' specifier applies."
      ]
    }),
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Functional Consequences" }
    ]
  },
  "Substance-Related and Addictive Disorders::Cannabis Withdrawal": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with the DSM-5-TR cannabis withdrawal coding note that varies by comorbid cannabis use disorder severity or absence.",
        "Corrected the source map to the actual cannabis withdrawal pages so the right panel now reflects the verbatim DSM withdrawal criteria and narrative sections."
      ]
    },
    source: {
      titlePages: [802],
      sectionPages: {
        criteria: [803],
        diagnosticFeatures: [803, 804],
        associatedFeatures: [804],
        prevalence: [804],
        developmentAndCourse: [804],
        riskAndPrognosticFactors: [804],
        functionalConsequences: [804],
        differentialDiagnosis: [805],
        comorbidity: [805]
      }
    },
    coding: buildSpecificUseDisorderStatusCoding({
      statusGroupId:
        "substance-related-and-addictive-disorders-cannabis-withdrawal-coding-input-use-disorder-status",
      substanceLabel: "cannabis",
      codes: ["F12.13", "F12.23", "F12.93"],
      description:
        "Select whether cannabis withdrawal is coded with mild cannabis use disorder, with moderate or severe cannabis use disorder, or without a comorbid cannabis use disorder.",
      notes: [
        "The DSM-5-TR coding note varies by whether a comorbid cannabis use disorder is mild, moderate or severe, or absent."
      ]
    }),
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Functional Consequences" }
    ]
  },
  "Substance-Related and Addictive Disorders::Caffeine Intoxication": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Corrected the fixed ICD-10-CM code to F15.920 to match the DSM-5-TR coding note."
      ]
    },
    codes: [{ code: "F15.920", description: "" }]
  },
  "Depressive Disorders::Disruptive Mood Dysregulation Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F34.81 code and the DSM rule that this diagnosis captures chronic nonepisodic irritability rather than manic or hypomanic episodes.",
        "Expanded the summary set to include the DSM culture, sex/gender, functional, differential-diagnosis, and comorbidity discussion."
      ]
    },
    source: {
      titlePages: [303],
      sectionPages: {
        criteria: [303, 304],
        diagnosticFeatures: [304],
        prevalence: [304, 305],
        developmentAndCourse: [305],
        riskAndPrognosticFactors: [305, 306],
        cultureRelatedDiagnosticIssues: [306],
        sexAndGenderRelatedDiagnosticIssues: [306],
        functionalConsequences: [306],
        differentialDiagnosis: [306, 307, 308],
        comorbidity: [308, 309]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Functional Consequences" }
    ]
  },
  "Depressive Disorders::Major Depressive Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with DSM-5-TR code resolution based on whether the disorder is a single or recurrent episode plus current severity, psychotic-features status, or remission status.",
        "Preserved the additional F06.1 catatonia code while keeping the right-panel section map grounded to the full-manual pages."
      ]
    },
    source: {
      titlePages: [309],
      sectionPages: {
        criteria: [309, 310, 311],
        specifiers: [310, 311],
        diagnosticFeatures: [311, 312, 313, 314],
        associatedFeatures: [314],
        prevalence: [314, 315],
        developmentAndCourse: [315, 316],
        riskAndPrognosticFactors: [316, 317],
        cultureRelatedDiagnosticIssues: [317],
        sexAndGenderRelatedDiagnosticIssues: [317],
        associationWithSuicidalThoughtsOrBehavior: [317, 318],
        functionalConsequences: [318],
        differentialDiagnosis: [318, 319, 320],
        comorbidity: [320]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ],
    transforms: ["insertMajorDepressionEpisodeStatusSpecifiers"],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      rules: [
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "mild")
          ],
          code: "F32.0"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "moderate")
          ],
          code: "F32.1"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "severe")
          ],
          code: "F32.2"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "with-psychotic-features")
          ],
          code: "F32.3"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "in-partial-remission")
          ],
          code: "F32.4"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "in-full-remission")
          ],
          code: "F32.5"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "single-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "unspecified")
          ],
          code: "F32.9"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "mild")
          ],
          code: "F33.0"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "moderate")
          ],
          code: "F33.1"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "severe")
          ],
          code: "F33.2"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "with-psychotic-features")
          ],
          code: "F33.3"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "in-partial-remission")
          ],
          code: "F33.41"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "in-full-remission")
          ],
          code: "F33.42"
        },
        {
          conditions: [
            makeSelectionCondition("episode", "recurrent-episode"),
            makeSelectionCondition("severity-psychotic-remission-status", "unspecified")
          ],
          code: "F33.9"
        }
      ],
      notes: [
        "The DSM-5-TR coding note is based on whether major depressive disorder is a single or recurrent episode plus current severity, psychotic-features status, or remission status.",
        "If psychotic features are present, use the psychotic-features status irrespective of episode severity."
      ],
      additionalCodeRules: [
        {
          conditions: [makeSelectionCondition("catatonia", "with-catatonia")],
          code: "F06.1"
        }
      ]
    }
  },
  "Depressive Disorders::Premenstrual Dysphoric Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F32.81 code and the DSM requirement to note 'provisional' when the diagnosis has not yet been confirmed with prospective daily ratings over two symptomatic cycles.",
        "Expanded the right-panel coverage to include the recording note, associated features, culture, functioning, and differential-diagnosis details."
      ]
    },
    source: {
      titlePages: [325, 326],
      sectionPages: {
        criteria: [325, 326],
        recordingProcedures: [326],
        diagnosticFeatures: [326, 327],
        associatedFeatures: [327],
        prevalence: [327],
        developmentAndCourse: [327],
        riskAndPrognosticFactors: [328],
        cultureRelatedDiagnosticIssues: [328],
        associationWithSuicidalThoughtsOrBehavior: [328],
        functionalConsequences: [328],
        differentialDiagnosis: [328, 329],
        comorbidity: [329]
      }
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Depressive Disorders::Substance/Medication-Induced Depressive Disorder": {
    codes: buildSubstanceCodeDisplayRows(DEPRESSIVE_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Corrected the placeholder F1x.x4 code to an explicit DSM table-driven selector keyed to substance class and same-class use-disorder status.",
        "Added DSM-grounded recording guidance so the report can place a comorbid substance use disorder first and carry the onset specifier forward."
      ]
    },
    source: {
      titlePages: [330],
      sectionPages: {
        criteria: [330, 331],
        specifiers: [331],
        recordingProcedures: [332],
        diagnosticFeatures: [332, 333],
        prevalence: [334],
        developmentAndCourse: [334],
        riskAndPrognosticFactors: [334],
        sexAndGenderRelatedDiagnosticIssues: [335],
        diagnosticMarkers: [335],
        associationWithSuicidalThoughtsOrBehavior: [335],
        differentialDiagnosis: [335, 336],
        comorbidity: [336]
      }
    },
    coding: buildSubstanceInducedDepressiveCoding(),
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Association With Suicidal Thoughts or Behavior" }
    ]
  },
  "Depressive Disorders::Depressive Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Exposed the DSM code-first medical-condition recording note so the etiological condition can be listed before the depressive diagnosis in reports.",
        "Expanded the summary set to include etiological examples, diagnostic markers, suicidality, and the demoralization differential."
      ]
    },
    source: {
      titlePages: [336, 337],
      sectionPages: {
        criteria: [336, 337],
        specifiers: [336],
        recordingProcedures: [337],
        diagnosticFeatures: [337],
        associatedFeatures: [337, 338],
        prevalence: [338],
        developmentAndCourse: [338],
        riskAndPrognosticFactors: [338],
        sexAndGenderRelatedDiagnosticIssues: [338],
        diagnosticMarkers: [339],
        associationWithSuicidalThoughtsOrBehavior: [339],
        differentialDiagnosis: [339, 340],
        comorbidity: [340]
      }
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Association With Suicidal Thoughts or Behavior" }
    ]
  },
  "Depressive Disorders::Persistent Depressive Disorder (Dysthymia)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR pages 194-196 that remission status, onset, and the 2-year course specifier are presented as mutually exclusive specifier choices.",
        "Corrected the onset and course specifier groups so the UI no longer allows impossible multi-select combinations."
      ]
    },
    specifiers: [
      {
        name: "Anxious Distress",
        selectionType: "boolean",
        options: [{ name: "With anxious distress" }]
      },
      {
        name: "Atypical Features",
        selectionType: "boolean",
        options: [{ name: "With atypical features" }]
      },
      {
        name: "Remission Status",
        selectionType: "single",
        options: [{ name: "In partial remission" }, { name: "In full remission" }]
      },
      {
        name: "Onset",
        selectionType: "single",
        options: [
          { name: "Early onset (before age 21)", description: "If onset is before age 21 years." },
          { name: "Late onset (age 21 or older)", description: "If onset is at age 21 years or older." }
        ]
      },
      {
        name: "Course Specifier (for most recent 2 years)",
        selectionType: "single",
        options: [
          {
            name: "With pure dysthymic syndrome",
            description:
              "Full criteria for a major depressive episode have not been met in at least the preceding 2 years."
          },
          {
            name: "With persistent major depressive episode",
            description:
              "Full criteria for a major depressive episode have been met throughout the preceding 2-year period."
          },
          {
            name: "With intermittent major depressive episodes, with current episode",
            description:
              "Major depressive episodes have occurred in at least the preceding 2 years and full criteria are currently met."
          },
          {
            name: "With intermittent major depressive episodes, without current episode",
            description:
              "One or more major depressive episodes occurred in at least the preceding 2 years, but full criteria are not currently met."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "single",
        options: [{ name: "Mild" }, { name: "Moderate" }, { name: "Severe" }]
      }
    ]
  },
  "Depressive Disorders::Other Specified Depressive Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F32.89 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for recurrent brief depression, short-duration depressive episode, and depressive episode with insufficient symptoms."
      ]
    },
    source: {
      titlePages: [340, 341],
      sectionPages: {
        description: [340, 341]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Depressive Disorders::Unspecified Depressive Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F32.A code and the DSM use of the unspecified diagnosis when the clinician does not specify why full depressive-disorder criteria are not met or when information is insufficient."
      ]
    },
    source: {
      sectionPages: {
        description: [341]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Sleep-Wake Disorders::Breathing-Related Sleep Disorders": {
    kind: "group",
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "This is a disorder-group overview, not a single billable diagnosis code.",
        "The live UI should present it as a chapter/group reference entry rather than a directly coded diagnosis."
      ]
    },
    source: {
      titlePages: [613],
      sectionPages: {
        description: [613]
      }
    },
    sections: [{ title: "Description" }, { title: "Coding Guidance" }],
    coding: {
      strategy: "none",
      displayLabel: "Not directly coded",
      notes: [
        "This entry is an overview group. Select a specific breathing-related sleep disorder for a billable diagnosis code."
      ]
    }
  },
  "Sleep-Wake Disorders::Insomnia Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR pages 590-591 that the comorbidity specifiers 'with mental disorder,' 'with medical condition,' and 'with another sleep disorder' can be recorded together rather than forced into one exclusive choice.",
        "Retained the comorbidity specifier group as multi-select and verified the recording procedures refer to plural comorbid condition(s) or disorder(s)."
      ]
    }
  },
  "Sleep-Wake Disorders::Hypersomnolence Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR page 600 that the comorbidity specifiers can be combined when multiple relevant conditions or disorders are present.",
        "Retained the comorbidity specifier group as multi-select and verified the recording procedures refer to plural comorbid condition(s) or disorder(s)."
      ]
    }
  },
  "Sleep-Wake Disorders::Narcolepsy": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the narcolepsy page map so the criteria, subtype prose, diagnostic features, functional consequences, differential diagnosis, comorbidity, and ICSD relationship section come from the dedicated narcolepsy pages rather than neighboring hypersomnolence pages.",
        "Filled the DSM current-severity descriptions, cleaned the subtype labels so report output no longer repeats raw ICD codes inside the diagnosis text, and added code-first recording guidance for the due-to-medical-condition subtype pair."
      ]
    },
    source: {
      titlePages: [604],
      sectionPages: {
        criteria: [604, 605],
        subtypes: [606],
        diagnosticFeatures: [606, 607, 608],
        associatedFeatures: [608],
        prevalence: [608, 609],
        developmentAndCourse: [608, 609],
        riskAndPrognosticFactors: [609],
        cultureRelatedDiagnosticIssues: [609, 610],
        diagnosticMarkers: [610, 611],
        functionalConsequencesOfNarcolepsy: [611],
        differentialDiagnosis: [611, 612],
        comorbidity: [613],
        relationshipToInternationalClassificationOfSleepDisorders: [613]
      }
    },
    specifiers: [
      {
        name: "Subtype",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          {
            name: "With cataplexy or hypocretin deficiency (type 1)",
            description:
              "Criterion B1 (episodes of cataplexy) or Criterion B2 (low CSF hypocretin-1 levels) is met."
          },
          {
            name: "Without cataplexy and either without hypocretin deficiency or hypocretin unmeasured (type 2)",
            description:
              "Criterion B3 (positive polysomnography/multiple sleep latency test) is met, but Criterion B1 is not met (i.e., no cataplexy is present) and Criterion B2 is not met (i.e., CSF hypocretin-1 levels are not low or have not been measured)."
          },
          { name: "With cataplexy or hypocretin deficiency due to a medical condition" },
          { name: "Without cataplexy and without hypocretin deficiency due to a medical condition" }
        ]
      },
      {
        name: "Current Severity",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          {
            name: "Mild",
            description:
              "Need for naps only once or twice per day. Sleep disturbance, if present, is mild. Cataplexy, when present, is infrequent (occurring less than once per week)."
          },
          {
            name: "Moderate",
            description:
              "Need for multiple naps daily. Sleep may be moderately disturbed. Cataplexy, when present, occurs daily or every few days."
          },
          {
            name: "Severe",
            description:
              "Nearly constant sleepiness and, often, highly disturbed nocturnal sleep (which may include excessive body movement and vivid dreams). Cataplexy, when present, is drug-resistant, with multiple attacks daily."
          }
        ]
      }
    ],
    recording: {
      mode: "medical-condition-first",
      instructions: [
        "For the subtype narcolepsy with cataplexy or hypocretin deficiency due to a medical condition and the subtype narcolepsy without cataplexy and without hypocretin deficiency due to a medical condition, code first the underlying medical condition."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition (if due-to-medical-condition subtype)",
          placeholder: "e.g., myotonic dystrophy"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code (if known)",
          placeholder: "e.g., G71.11"
        }
      ]
    },
    sections: [
      { title: "Subtypes" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Narcolepsy" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Obstructive Sleep Apnea Hypopnea": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the obstructive sleep apnea hypopnea page map so the criteria, specifier prose, diagnostic markers, differential diagnosis, comorbidity, and ICSD relationship section no longer inherit narcolepsy text.",
        "Filled the DSM current-severity descriptions and restored the dedicated functional-consequences section title for the right panel."
      ]
    },
    source: {
      titlePages: [613],
      sectionPages: {
        criteria: [613],
        specifiers: [614],
        diagnosticFeatures: [614, 615],
        associatedFeatures: [615],
        prevalence: [615, 616],
        developmentAndCourse: [616, 617],
        riskAndPrognosticFactors: [617],
        cultureRelatedDiagnosticIssues: [617],
        sexAndGenderRelatedDiagnosticIssues: [617],
        diagnosticMarkers: [617, 618],
        functionalConsequencesOfObstructiveSleepApneaHypopnea: [618],
        differentialDiagnosis: [618, 619],
        comorbidity: [619, 620],
        relationshipToInternationalClassificationOfSleepDisorders: [620]
      }
    },
    specifiers: [
      {
        name: "Current Severity",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          { name: "Mild", description: "Apnea hypopnea index is less than 15." },
          { name: "Moderate", description: "Apnea hypopnea index is 15–30." },
          { name: "Severe", description: "Apnea hypopnea index is greater than 30." }
        ]
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Obstructive Sleep Apnea Hypopnea" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Central Sleep Apnea": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Corrected the central sleep apnea page map so subtype, specifier, diagnostic-marker, comorbidity, and ICSD text no longer inherit obstructive-apnea or sleep-related-hypoventilation prose.",
        "Removed the non-DSM severity checkbox, preserved the narrative current-severity instruction as an open recording field, and implemented the G47.37 opioid-use-disorder-first coding note without a generic picker."
      ]
    },
    source: {
      titlePages: [620],
      sectionPages: {
        criteria: [620, 621],
        subtypes: [621],
        specifiers: [621, 622],
        diagnosticFeatures: [622],
        associatedFeatures: [622],
        prevalence: [622, 623],
        developmentAndCourse: [623],
        riskAndPrognosticFactors: [623],
        diagnosticMarkers: [623, 624],
        functionalConsequencesOfCentralSleepApnea: [624],
        differentialDiagnosis: [624],
        comorbidity: [624, 625],
        relationshipToInternationalClassificationOfSleepDisorders: [625]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Evidence by polysomnography of five or more central apneas per hour of sleep."
      },
      {
        code: "B",
        text: "The disorder is not better explained by another current sleep disorder."
      }
    ],
    specifiers: [
      {
        name: "Subtype",
        selectionType: "single",
        allowsEmpty: false,
        options: [
          {
            name: "Idiopathic central sleep apnea",
            description:
              "Characterized by repeated episodes of apneas and hypopneas during sleep caused by variability in respiratory effort but without evidence of airway obstruction."
          },
          {
            name: "Cheyne-Stokes breathing",
            description:
              "A pattern of periodic crescendo-decrescendo variation in tidal volume that results in central apneas and hypopneas at a frequency of at least five events per hour, accompanied by frequent arousal."
          },
          {
            name: "Central sleep apnea comorbid with opioid use",
            description:
              "The pathogenesis of this subtype is attributed to the effects of opioids on the respiratory rhythm generators in the medulla as well as the differential effects on hypoxic versus hypercapnic respiratory drive."
          }
        ]
      }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      codeOrder: "additional-first",
      inputs: [
        {
          id: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder",
          name: "Opioid Use Disorder",
          selectionType: "single",
          allowsEmpty: true,
          includeInDiagnosisLabel: false,
          options: [
            {
              id: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-0-not-present",
              name: "Opioid use disorder is not present"
            },
            {
              id: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-1-mild",
              name: "Mild opioid use disorder"
            },
            {
              id: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-2-moderate-or-severe",
              name: "Moderate or severe opioid use disorder"
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype",
              option: "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype-option-0-idiopathic-central-sleep-apnea"
            }
          ],
          code: "G47.31"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype",
              option: "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype-option-1-cheyne-stokes-breathing"
            }
          ],
          code: "R06.3"
        },
        ...[
          "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-0-not-present",
          "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-1-mild",
          "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-2-moderate-or-severe"
        ].map((opioidUseDisorderOption) => ({
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype",
              option:
                "sleep-wake-disorders-central-sleep-apnea-specifier-0-subtype-option-2-central-sleep-apnea-comorbid-with-opioid-use"
            },
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder",
              option: opioidUseDisorderOption
            }
          ],
          code: "G47.37"
        }))
      ],
      notes: [
        "When an opioid use disorder is present, first code the opioid use disorder: F11.10 mild opioid use disorder or F11.20 moderate or severe opioid use disorder; then code G47.37 central sleep apnea comorbid with opioid use. When an opioid use disorder is not present (e.g., after a one-time heavy use of the substance), code only G47.37 central sleep apnea comorbid with opioid use."
      ],
      additionalCodeRules: [
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder",
              option: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-1-mild"
            }
          ],
          code: "F11.10"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder",
              option:
                "sleep-wake-disorders-central-sleep-apnea-coding-input-opioid-use-disorder-option-2-moderate-or-severe"
            }
          ],
          code: "F11.20"
        }
      ]
    },
    recording: {
      mode: "central-sleep-apnea-opioid-first",
      instructions: [
        "Severity of central sleep apnea is graded according to the frequency of the breathing disturbances as well as the extent of associated oxygen desaturation and sleep fragmentation that occur as a consequence of repetitive respiratory disturbances."
      ],
      fields: [
        {
          key: "current-severity",
          label: "Current severity",
          multiline: true
        }
      ]
    },
    sections: [
      { title: "Subtypes" },
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Central Sleep Apnea" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Sleep-Related Hypoventilation": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Corrected the sleep-related hypoventilation page map so associated features, risk factors, functional consequences, and the ICSD relationship section no longer inherit circadian-rhythm or central-apnea prose.",
        "Restored the full DSM comorbid-subtype definition, removed the non-DSM severity checkbox, and retained the open-ended current-severity instruction as a recording field."
      ]
    },
    source: {
      titlePages: [625],
      sectionPages: {
        criteria: [625, 626],
        subtypes: [626],
        diagnosticFeatures: [626],
        associatedFeatures: [626, 627],
        prevalence: [627],
        developmentAndCourse: [627],
        riskAndPrognosticFactors: [627, 628],
        sexAndGenderRelatedDiagnosticIssues: [628],
        diagnosticMarkers: [628],
        functionalConsequencesOfSleepRelatedHypoventilation: [628, 629],
        differentialDiagnosis: [629],
        comorbidity: [629],
        relationshipToInternationalClassificationOfSleepDisorders: [629, 630]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Polysomnograpy demonstrates episodes of decreased respiration associated with elevated CO2 levels.",
        note:
          "Note: In the absence of objective measurement of CO2, persistent low levels of hemoglobin oxygen saturation unassociated with apneic/hypopneic events may indicate hypoventilation."
      },
      {
        code: "B",
        text: "The disturbance is not better explained by another current sleep disorder."
      }
    ],
    specifiers: [
      {
        name: "Subtype",
        selectionType: "single",
        allowsEmpty: false,
        options: [
          {
            name: "Idiopathic hypoventilation",
            description: "This subtype is not attributable to any readily identified condition."
          },
          {
            name: "Congenital central alveolar hypoventilation",
            description:
              "This subtype is a rare congenital disorder in which the individual typically presents in the perinatal period with shallow breathing, or cyanosis and apnea during sleep."
          },
          {
            name: "Comorbid sleep-related hypoventilation",
            description:
              "This subtype occurs as a consequence of a medical condition, such as a pulmonary disorder (e.g., interstitial lung disease, chronic obstructive pulmonary disease) or a neuromuscular or chest wall disorder (e.g., muscular dystrophies, postpolio syndrome, cervical spinal cord injury, kyphoscoliosis), or medications (e.g., benzodiazepines, opiates). It also occurs with obesity (obesity hypoventilation disorder), where it reflects a combination of increased work of breathing due to reduced chest wall compliance and ventilation-perfusion mismatch and variably reduced ventilatory drive. Such individuals usually are characterized by body mass index of greater than 30 and hypercapnia during wakefulness (with a pCO2 of greater than 45), without other evidence of hypoventilation."
          }
        ]
      }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype",
              option:
                "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype-option-0-idiopathic-hypoventilation"
            }
          ],
          code: "G47.34"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype",
              option:
                "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype-option-1-congenital-central-alveolar-hypoventilation"
            }
          ],
          code: "G47.35"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype",
              option:
                "sleep-wake-disorders-sleep-related-hypoventilation-specifier-0-subtype-option-2-comorbid-sleep-related-hypoventilation"
            }
          ],
          code: "G47.36"
        }
      ],
      notes: [],
      additionalCodeRules: []
    },
    recording: {
      mode: "standard",
      instructions: [
        "Severity is graded according to the degree of hypoxemia and hypercarbia present during sleep and evidence of end organ impairment due to these abnormalities (e.g., right-sided heart failure). The presence of blood gas abnormalities during wakefulness is an indicator of greater severity."
      ],
      fields: [
        {
          key: "current-severity",
          label: "Current severity",
          multiline: true
        }
      ]
    },
    sections: [
      { title: "Subtypes" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Sleep-Related Hypoventilation" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Circadian Rhythm Sleep-Wake Disorders": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Restored the full DSM criteria box across pages 630-631, including every subtype definition and the shared course specifier.",
        "Removed ICD codes from report-facing subtype labels and modeled the delayed- and advanced-phase-only specifiers separately from the required subtype choice."
      ]
    },
    source: {
      titlePages: [630],
      sectionPages: {
        criteria: [630, 631],
        diagnosticCriteria: [630, 631]
      }
    },
    criteria: buildCircadianCriteria(),
    specifiers: [
      {
        name: "Subtype",
        selectionType: "single",
        allowsEmpty: false,
        options: CIRCADIAN_SUBTYPE_OPTIONS
      },
      {
        name: "Delayed Sleep Phase Type Specifiers",
        description: "Specify if delayed sleep phase type is selected.",
        selectionType: "multiple",
        allowsEmpty: true,
        options: [
          { name: "Familial", description: "A family history of delayed sleep phase is present." },
          {
            name: "Overlapping with non-24-hour sleep-wake type",
            description:
              "Delayed sleep phase type may overlap with another circadian rhythm sleep-wake disorder, non-24-hour sleep-wake type."
          }
        ]
      },
      {
        name: "Advanced Sleep Phase Type Specifier",
        description: "Specify if advanced sleep phase type is selected.",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          { name: "Familial", description: "A family history of advanced sleep phase is present." }
        ]
      },
      { ...buildCircadianCourseSpecifier(), name: "Course Specifiers" }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      rules: ["G47.21", "G47.22", "G47.23", "G47.24", "G47.26", "G47.20"].map(
        (code, index) => {
          const groupId = makeSpecifierGroupId(
            "sleep-wake-disorders-circadian-rhythm-sleep-wake-disorders",
            0,
            "Subtype"
          );
          return {
            conditions: [
              makeSelectionCondition(
                groupId,
                makeSpecifierOptionId(groupId, index, CIRCADIAN_SUBTYPE_OPTIONS[index].name)
              )
            ],
            code
          };
        }
      ),
      notes: [],
      additionalCodeRules: []
    },
    sections: [{ title: "Diagnostic Criteria" }]
  },
  "Sleep-Wake Disorders::Delayed Sleep Phase Type": buildCircadianSubtypeOverride({
    subtypeIndex: 0,
    titlePages: [631],
    sectionPages: {
      diagnosticFeatures: [631],
      associatedFeatures: [631],
      prevalence: [631],
      developmentAndCourse: [631, 632],
      riskAndPrognosticFactors: [632],
      diagnosticMarkers: [632],
      functionalConsequencesOfDelayedSleepPhaseType: [632, 633],
      differentialDiagnosis: [633],
      comorbidity: [633]
    },
    specifiers: [
      {
        name: "Familial",
        selectionType: "boolean",
        allowsEmpty: true,
        description: "A family history of delayed sleep phase is present."
      },
      {
        name: "Overlapping with non-24-hour sleep-wake type",
        selectionType: "boolean",
        allowsEmpty: true,
        description:
          "Delayed sleep phase type may overlap with another circadian rhythm sleep-wake disorder, non-24-hour sleep-wake type."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Delayed Sleep Phase Type" }
    ]
  }),
  "Sleep-Wake Disorders::Advanced Sleep Phase Type": buildCircadianSubtypeOverride({
    subtypeIndex: 1,
    titlePages: [633],
    sectionPages: {
      specifiers: [633],
      diagnosticFeatures: [633],
      associatedFeatures: [634],
      prevalence: [634],
      developmentAndCourse: [634],
      riskAndPrognosticFactors: [634],
      diagnosticMarkers: [635],
      functionalConsequencesOfAdvancedSleepPhaseType: [635],
      differentialDiagnosis: [635],
      comorbidity: [635]
    },
    specifiers: [
      {
        name: "Familial",
        selectionType: "boolean",
        allowsEmpty: true,
        description: "A family history of advanced sleep phase is present."
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Advanced Sleep Phase Type" }
    ]
  }),
  "Sleep-Wake Disorders::Irregular Sleep-Wake Type": buildCircadianSubtypeOverride({
    subtypeIndex: 2,
    titlePages: [635],
    sectionPages: {
      diagnosticFeatures: [635],
      associatedFeatures: [635],
      prevalence: [636],
      developmentAndCourse: [636],
      riskAndPrognosticFactors: [636],
      diagnosticMarkers: [636],
      functionalConsequencesOfIrregularSleepWakeType: [636],
      differentialDiagnosis: [636],
      comorbidity: [636]
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Irregular Sleep-Wake Type" }
    ]
  }),
  "Sleep-Wake Disorders::Non-24-Hour Sleep-Wake Type": buildCircadianSubtypeOverride({
    subtypeIndex: 3,
    titlePages: [636],
    sectionPages: {
      diagnosticFeatures: [637],
      associatedFeatures: [637],
      prevalence: [637],
      developmentAndCourse: [637],
      riskAndPrognosticFactors: [637, 638],
      diagnosticMarkers: [638],
      functionalConsequencesOfNon24HourSleepWakeType: [638],
      differentialDiagnosis: [638],
      comorbidity: [638]
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Non-24-Hour Sleep-Wake Type" }
    ]
  }),
  "Sleep-Wake Disorders::Shift Work Type": buildCircadianSubtypeOverride({
    subtypeIndex: 4,
    titlePages: [638],
    sectionPages: {
      diagnosticFeatures: [638, 639],
      prevalence: [639],
      developmentAndCourse: [639],
      riskAndPrognosticFactors: [639],
      diagnosticMarkers: [639],
      functionalConsequencesOfShiftWorkType: [639],
      differentialDiagnosis: [639, 640],
      comorbidity: [640],
      relationshipToInternationalClassificationOfSleepDisorders: [640]
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Shift Work Type" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  }),
  "Sleep-Wake Disorders::Unspecified Circadian Rhythm Sleep-Wake Disorder":
    buildCircadianSubtypeOverride({
      subtypeIndex: 5,
      titlePages: [631],
      sectionPages: {
        diagnosticCriteria: [630, 631]
      },
      sections: [{ title: "Diagnostic Criteria" }],
      kind: "diagnosis"
    }),
  "Sleep-Wake Disorders::Parasomnias": {
    kind: "group",
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Restored the DSM parasomnias overview from page 640 and retained this entry as a non-billable disorder group."
      ]
    },
    source: {
      titlePages: [640],
      sectionPages: {
        description: [640]
      }
    },
    coding: {
      strategy: "none",
      displayLabel: "Not directly coded",
      notes: [
        "This entry is an overview group. Select a specific parasomnia for a billable diagnosis code."
      ]
    },
    sections: [{ title: "Description" }]
  },
  "Sleep-Wake Disorders::Non-Rapid Eye Movement Sleep Arousal Disorders": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with the DSM-5-TR subtype split between Sleepwalking type (F51.3) and Sleep terror type (F51.4).",
        "Rebuilt the specifier structure so the sleepwalking-only 'Specify if' options are modeled separately from the required subtype choice, and corrected the source map to remove inherited circadian and relationship-section bleed."
      ]
    },
    source: {
      titlePages: [640],
      sectionPages: {
        criteria: [640, 641],
        specifiers: [641],
        diagnosticFeatures: [641, 642],
        associatedFeatures: [642],
        prevalence: [643],
        developmentAndCourse: [643],
        riskAndPrognosticFactors: [643, 644],
        sexAndGenderRelatedDiagnosticIssues: [644],
        diagnosticMarkers: [644],
        functionalConsequences: [644, 645],
        differentialDiagnosis: [645, 646]
      }
    },
    specifiers: [
      {
        name: "Subtype",
        description: "Specify whether the presentation is sleepwalking type or sleep terror type.",
        selectionType: "single",
        options: [{ name: "Sleepwalking type" }, { name: "Sleep terror type" }]
      },
      {
        name: "Sleepwalking Type Specifiers",
        description:
          "If Sleepwalking type is selected, specify whether the episodes include sleep-related eating or sleep-related sexual behavior (sexsomnia).",
        selectionType: "multiple",
        options: [
          { name: "With sleep-related eating" },
          { name: "With sleep-related sexual behavior (sexsomnia)" }
        ]
      }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: makeSpecifierGroupId(
                "sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders",
                0,
                "Subtype"
              ),
              option: makeSpecifierOptionId(
                makeSpecifierGroupId(
                  "sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders",
                  0,
                  "Subtype"
                ),
                0,
                "Sleepwalking type"
              )
            }
          ],
          code: "F51.3"
        },
        {
          conditions: [
            {
              type: "selection",
              group: makeSpecifierGroupId(
                "sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders",
                0,
                "Subtype"
              ),
              option: makeSpecifierOptionId(
                makeSpecifierGroupId(
                  "sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders",
                  0,
                  "Subtype"
                ),
                1,
                "Sleep terror type"
              )
            }
          ],
          code: "F51.4"
        }
      ],
      notes: [
        "The DSM-5-TR coding note assigns F51.3 to Sleepwalking type and F51.4 to Sleep terror type."
      ],
      additionalCodeRules: []
    }
  },
  "Sleep-Wake Disorders::Nightmare Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed on DSM-5-TR page 647 that the nightmare disorder comorbidity specifiers can be combined across mental, medical, and other sleep disorders when clinically applicable.",
        "Retained the comorbidity specifier group as a true multi-select set and verified the recording procedures refer to multiple comorbid condition(s) or disorder(s)."
      ]
    }
  },
  "Sleep-Wake Disorders::Rapid Eye Movement Sleep Behavior Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Corrected the REM sleep behavior disorder page map so diagnostic features, sex- and gender-related issues, functional consequences, differential diagnosis, and comorbidity no longer inherit restless-legs text.",
        "Confirmed the fixed G47.52 code and all seven DSM diagnostic criteria against the dedicated criteria box."
      ]
    },
    source: {
      titlePages: [652],
      sectionPages: {
        criteria: [652],
        diagnosticFeatures: [652, 653],
        prevalence: [653],
        developmentAndCourse: [653],
        cultureRelatedDiagnosticIssues: [653],
        sexAndGenderRelatedDiagnosticIssues: [653, 654],
        diagnosticMarkers: [654],
        functionalConsequencesOfRapidEyeMovementSleepBehaviorDisorder: [654],
        differentialDiagnosis: [654, 655],
        comorbidity: [655, 656],
        relationshipToInternationalClassificationOfSleepDisorders: [656]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Rapid Eye Movement Sleep Behavior Disorder" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Restless Legs Syndrome": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-12",
      notes: [
        "Corrected the restless legs syndrome page map so diagnostic features, development, sex- and gender-related issues, comorbidity, and the ICSD relationship section hydrate completely from pages 656-660.",
        "Confirmed the fixed G25.81 code and the full DSM A-E criteria, including all three required Criterion A features."
      ]
    },
    source: {
      titlePages: [656],
      sectionPages: {
        criteria: [656],
        diagnosticFeatures: [656, 657],
        associatedFeatures: [657],
        prevalence: [657],
        developmentAndCourse: [657, 658],
        riskAndPrognosticFactors: [658],
        cultureRelatedDiagnosticIssues: [658],
        sexAndGenderRelatedDiagnosticIssues: [658, 659],
        diagnosticMarkers: [659],
        functionalConsequencesOfRestlessLegsSyndrome: [659],
        differentialDiagnosis: [659],
        comorbidity: [659, 660],
        relationshipToInternationalClassificationOfSleepDisorders: [660]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Restless Legs Syndrome" },
      { title: "Relationship To International Classification Of Sleep Disorders" }
    ]
  },
  "Sleep-Wake Disorders::Other Specified Insomnia Disorder": buildResidualSleepOverride({
    titlePages: [668],
    descriptionPages: [668],
    recording: {
      mode: "other-specified-with-reason",
      instructions: [
        "This is done by recording “other specified insomnia disorder” followed by the specific reason (e.g., “short-term insomnia disorder”)."
      ],
      fields: [
        {
          key: "specific-reason",
          label: "Specific reason",
          placeholder: "e.g., short-term insomnia disorder"
        }
      ]
    }
  }),
  "Sleep-Wake Disorders::Unspecified Insomnia Disorder": buildResidualSleepOverride({
    titlePages: [669],
    descriptionPages: [669]
  }),
  "Sleep-Wake Disorders::Other Specified Hypersomnolence Disorder":
    buildResidualSleepOverride({
      titlePages: [669],
      descriptionPages: [669],
      recording: {
        mode: "other-specified-with-reason",
        instructions: [
          "This is done by recording “other specified hypersomnolence disorder” followed by the specific reason (e.g., “brief-duration hypersomnolence,” as in Kleine-Levin syndrome)."
        ],
        fields: [
          {
            key: "specific-reason",
            label: "Specific reason",
            placeholder: "e.g., brief-duration hypersomnolence"
          }
        ]
      }
    }),
  "Sleep-Wake Disorders::Unspecified Hypersomnolence Disorder": buildResidualSleepOverride({
    titlePages: [669, 670],
    descriptionPages: [669, 670]
  }),
  "Sleep-Wake Disorders::Other Specified Sleep-Wake Disorder": buildResidualSleepOverride({
    titlePages: [670],
    descriptionPages: [670],
    recording: {
      mode: "other-specified-with-reason",
      instructions: [
        "This is done by recording “other specified sleep-wake disorder” followed by the specific reason (e.g., “repeated arousals during rapid eye movement sleep without polysomnography or history of Parkinson’s disease or other synucleinopathy”)."
      ],
      fields: [
        {
          key: "specific-reason",
          label: "Specific reason",
          placeholder:
            "e.g., repeated arousals during rapid eye movement sleep without polysomnography or history of Parkinson’s disease or other synucleinopathy"
        }
      ]
    }
  }),
  "Sleep-Wake Disorders::Unspecified Sleep-Wake Disorder": buildResidualSleepOverride({
    titlePages: [670],
    descriptionPages: [670]
  }),
  "Sleep-Wake Disorders::Substance/Medication-Induced Sleep Disorder": {
    codes: buildSubstanceCodeDisplayRows(SLEEP_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Replaced the slash-combined recording-option codes with the DSM-5-TR substance-by-substance sleep-disorder table.",
        "Encoded the DSM caffeine and tobacco coding exceptions so the live app no longer collapses them into a generic manual picker."
      ]
    },
    coding: buildStructuredSubstanceInducedCoding({
      substanceGroupId: SLEEP_SUBSTANCE_TYPE_GROUP_ID,
      useStatusGroupId: SLEEP_USE_DISORDER_STATUS_GROUP_ID,
      substanceTypeOptions: SLEEP_SUBSTANCE_CODE_ROWS.map(([name]) => name),
      codeRows: SLEEP_SUBSTANCE_CODE_ROWS,
      notes: [
        "Caffeine uses only the DSM without-use-disorder code F15.982 because caffeine use disorder is not an official DSM diagnosis.",
        "Tobacco uses only the DSM moderate-or-severe tobacco-use-disorder code F17.208 in ICD-10-CM."
      ]
    })
  },
  "Anxiety Disorders::Substance/Medication-Induced Anxiety Disorder": {
    codes: buildSubstanceCodeDisplayRows(ANXIETY_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Replaced the placeholder F1x.x80 code with the DSM-5-TR substance-by-substance coding table from the full manual.",
        "Added the missing DSM recording-procedure section so substance-first diagnosis wording and onset recording are visible in the right panel."
      ]
    },
    source: {
      titlePages: [398],
      sectionPages: {
        criteria: [398, 399],
        specifiers: [399, 400],
        recordingProcedures: [400],
        diagnosticFeatures: [400, 401],
        associatedFeatures: [401],
        prevalence: [401],
        diagnosticMarkers: [401],
        differentialDiagnosis: [401, 402]
      }
    },
    coding: buildStructuredSubstanceInducedCoding({
      substanceGroupId: ANXIETY_SUBSTANCE_TYPE_GROUP_ID,
      useStatusGroupId: ANXIETY_USE_DISORDER_STATUS_GROUP_ID,
      substanceTypeOptions: ANXIETY_SUBSTANCE_CODE_ROWS.map(([name]) => name),
      codeRows: ANXIETY_SUBSTANCE_CODE_ROWS,
      notes: [
        "Caffeine uses only the DSM without-use-disorder code F15.980; there are no mild or moderate/severe same-class use-disorder variants in the table."
      ]
    }),
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Diagnostic Markers" }
    ]
  },
  "Anxiety Disorders::Separation Anxiety Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Verified the full DSM-5-TR criteria and rebuilt the diagnosis-level page map so the entry no longer inherits Selective Mutism or other neighboring anxiety-chapter text.",
        "Expanded the sourced section blueprint to include the DSM associated-features, culture-related, suicidality, functional-consequences, differential-diagnosis, and comorbidity sections."
      ]
    },
    source: {
      titlePages: [352],
      sectionPages: {
        criteria: [352, 353],
        diagnosticFeatures: [353, 354],
        associatedFeatures: [354],
        prevalence: [354],
        developmentAndCourse: [354, 355],
        riskAndPrognosticFactors: [355],
        cultureRelatedDiagnosticIssues: [355, 356],
        associationWithSuicidalThoughtsOrBehavior: [356],
        functionalConsequencesOfSeparationAnxietyDisorder: [356],
        differentialDiagnosis: [356, 357],
        comorbidity: [357, 358]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Developmentally inappropriate and excessive fear or anxiety concerning separation from those to whom the individual is attached, as evidenced by at least three of the following:",
        items: [
          {
            code: "1",
            text:
              "Recurrent excessive distress when anticipating or experiencing separation from home or from major attachment figures."
          },
          {
            code: "2",
            text:
              "Persistent and excessive worry about losing major attachment figures or about possible harm to them, such as illness, injury, disasters, or death."
          },
          {
            code: "3",
            text:
              "Persistent and excessive worry about experiencing an untoward event (e.g., getting lost, being kidnapped, having an accident, becoming ill) that causes separation from a major attachment figure."
          },
          {
            code: "4",
            text:
              "Persistent reluctance or refusal to go out, away from home, to school, to work, or elsewhere because of fear of separation."
          },
          {
            code: "5",
            text:
              "Persistent and excessive fear of or reluctance about being alone or without major attachment figures at home or in other settings."
          },
          {
            code: "6",
            text:
              "Persistent reluctance or refusal to sleep away from home or to go to sleep without being near a major attachment figure."
          },
          {
            code: "7",
            text: "Repeated nightmares involving the theme of separation."
          },
          {
            code: "8",
            text:
              "Repeated complaints of physical symptoms (e.g., headaches, stomachaches, nausea, vomiting) when separation from major attachment figures occurs or is anticipated."
          }
        ]
      },
      {
        code: "B",
        text:
          "The fear, anxiety, or avoidance is persistent, lasting at least 4 weeks in children and adolescents and typically 6 months or more in adults."
      },
      {
        code: "C",
        text:
          "The disturbance causes clinically significant distress or impairment in social, academic, occupational, or other important areas of functioning."
      },
      {
        code: "D",
        text:
          "The disturbance is not better explained by another mental disorder, such as refusing to leave home because of excessive resistance to change in autism spectrum disorder; delusions or hallucinations concerning separation in psychotic disorders; refusal to go outside without a trusted companion in agoraphobia; worries about ill health or other harm befalling significant others in generalized anxiety disorder; or concerns about having an illness in illness anxiety disorder."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Separation Anxiety Disorder" }
    ]
  },
  "Anxiety Disorders::Selective Mutism": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Verified the full DSM-5-TR criteria and rebuilt the diagnosis-level page map so the entry no longer inherits Specific Phobia narrative text.",
        "Expanded the sourced section blueprint to include the DSM risk-and-prognostic, culture-related, functional-consequences, differential-diagnosis, and comorbidity sections."
      ]
    },
    source: {
      titlePages: [358],
      sectionPages: {
        criteria: [358],
        diagnosticFeatures: [358],
        associatedFeatures: [358, 359],
        prevalence: [359],
        developmentAndCourse: [359],
        riskAndPrognosticFactors: [359, 360],
        cultureRelatedDiagnosticIssues: [360],
        functionalConsequencesOfSelectiveMutism: [360],
        differentialDiagnosis: [360, 361],
        comorbidity: [360, 361]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Consistent failure to speak in specific social situations in which there is an expectation for speaking (e.g., at school) despite speaking in other situations."
      },
      {
        code: "B",
        text:
          "The disturbance interferes with educational or occupational achievement or with social communication."
      },
      {
        code: "C",
        text:
          "The duration of the disturbance is at least 1 month (not limited to the first month of school)."
      },
      {
        code: "D",
        text:
          "The failure to speak is not attributable to a lack of knowledge of, or comfort with, the spoken language required in the social situation."
      },
      {
        code: "E",
        text:
          "The disturbance is not better explained by a communication disorder (e.g., childhood-onset fluency disorder) and does not occur exclusively during the course of autism spectrum disorder, schizophrenia, or another psychotic disorder."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences of Selective Mutism" }
    ]
  },
  "Anxiety Disorders::Social Anxiety Disorder (Social Phobia)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the DSM criteria wording, including the child-specific notes and the performance-only specifier prose.",
        "Rebuilt the diagnosis-level page map so the right panel uses the dedicated social-anxiety sections instead of inherited or missing neighboring content."
      ]
    },
    source: {
      titlePages: [367],
      sectionPages: {
        criteria: [367, 368],
        specifiers: [368],
        diagnosticFeatures: [368, 369],
        associatedFeatures: [369],
        prevalence: [370],
        developmentAndCourse: [370],
        riskAndPrognosticFactors: [371],
        cultureRelatedDiagnosticIssues: [371],
        sexAndGenderRelatedDiagnosticIssues: [371, 372],
        associationWithSuicidalThoughtsOrBehavior: [372],
        functionalConsequencesOfSocialAnxietyDisorder: [372],
        differentialDiagnosis: [372, 373, 374],
        comorbidity: [374]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Marked fear or anxiety about one or more social situations in which the individual is exposed to possible scrutiny by others. Examples include social interactions (e.g., having a conversation, meeting unfamiliar people), being observed (e.g., eating or drinking), and performing in front of others (e.g., giving a speech).",
        note: "Note: In children, the anxiety must occur in peer settings and not just during interactions with adults."
      },
      {
        code: "B",
        text:
          "The individual fears that he or she will act in a way or show anxiety symptoms that will be negatively evaluated (i.e., will be humiliating or embarrassing; will lead to rejection or offend others)."
      },
      {
        code: "C",
        text: "The social situations almost always provoke fear or anxiety.",
        note:
          "Note: In children, the fear or anxiety may be expressed by crying, tantrums, freezing, clinging, shrinking, or failing to speak in social situations."
      },
      {
        code: "D",
        text: "The social situations are avoided or endured with intense fear or anxiety."
      },
      {
        code: "E",
        text:
          "The fear or anxiety is out of proportion to the actual threat posed by the social situation and to the sociocultural context."
      },
      {
        code: "F",
        text: "The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more."
      },
      {
        code: "G",
        text:
          "The fear, anxiety, or avoidance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "H",
        text:
          "The fear, anxiety, or avoidance is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      },
      {
        code: "I",
        text:
          "The fear, anxiety, or avoidance is not better explained by the symptoms of another mental disorder, such as panic disorder, body dysmorphic disorder, or autism spectrum disorder."
      },
      {
        code: "J",
        text:
          "If another medical condition (e.g., Parkinson's disease, obesity, disfigurement from burns or injury) is present, the fear, anxiety, or avoidance is clearly unrelated or is excessive."
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Social Anxiety Disorder" }
    ]
  },
  "Anxiety Disorders::Panic Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM panic-disorder criteria wording, including the criterion notes and the expanded differential examples.",
        "Corrected the section map and added a boundary guard so panic-disorder comorbidity stops before the standalone Panic Attack Specifier."
      ]
    },
    source: {
      titlePages: [374],
      sectionPages: {
        criteria: [374, 375],
        diagnosticFeatures: [375, 376, 377],
        associatedFeatures: [377],
        prevalence: [377, 378],
        developmentAndCourse: [377, 378],
        riskAndPrognosticFactors: [378, 379],
        cultureRelatedDiagnosticIssues: [379, 380],
        sexAndGenderRelatedDiagnosticIssues: [380],
        diagnosticMarkers: [380],
        associationWithSuicidalThoughtsOrBehavior: [380],
        functionalConsequencesOfPanicDisorder: [380, 381],
        differentialDiagnosis: [381, 382],
        comorbidity: [382, 383]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Recurrent unexpected panic attacks. A panic attack is an abrupt surge of intense fear or intense discomfort that reaches a peak within minutes, and during which time four (or more) of the following symptoms occur:",
        note: "Note: The abrupt surge can occur from a calm state or an anxious state.",
        sub_criteria: [
          { code: "1", text: "Palpitations, pounding heart, or accelerated heart rate." },
          { code: "2", text: "Sweating." },
          { code: "3", text: "Trembling or shaking." },
          { code: "4", text: "Sensations of shortness of breath or smothering." },
          { code: "5", text: "Feelings of choking." },
          { code: "6", text: "Chest pain or discomfort." },
          { code: "7", text: "Nausea or abdominal distress." },
          { code: "8", text: "Feeling dizzy, unsteady, light-headed, or faint." },
          { code: "9", text: "Chills or heat sensations." },
          { code: "10", text: "Paresthesias (numbness or tingling sensations)." },
          {
            code: "11",
            text: "Derealization (feelings of unreality) or depersonalization (being detached from oneself)."
          },
          { code: "12", text: 'Fear of losing control or "going crazy."' },
          {
            code: "13",
            text: "Fear of dying.",
            note:
              "Note: Culture-specific symptoms (e.g., tinnitus, neck soreness, headache, uncontrollable screaming or crying) may be seen. Such symptoms should not count as one of the four required symptoms."
          }
        ]
      },
      {
        code: "B",
        text:
          "At least one of the attacks has been followed by 1 month (or more) of one or both of the following:",
        sub_criteria: [
          {
            code: "1",
            text:
              'Persistent concern or worry about additional panic attacks or their consequences (e.g., losing control, having a heart attack, "going crazy").'
          },
          {
            code: "2",
            text:
              "A significant maladaptive change in behavior related to the attacks (e.g., behaviors designed to avoid having panic attacks, such as avoidance of exercise or unfamiliar situations)."
          }
        ]
      },
      {
        code: "C",
        text:
          "The disturbance is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition (e.g., hyperthyroidism, cardiopulmonary disorders)."
      },
      {
        code: "D",
        text:
          "The disturbance is not better explained by another mental disorder (e.g., the panic attacks do not occur only in response to feared social situations, as in social anxiety disorder; in response to circumscribed phobic objects or situations, as in specific phobia; in response to obsessions, as in obsessive-compulsive disorder; in response to reminders of traumatic events, as in posttraumatic stress disorder; or in response to separation from attachment figures, as in separation anxiety disorder)."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Panic Disorder" }
    ]
  },
  "Anxiety Disorders::Agoraphobia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM agoraphobia criteria wording, including the diagnostic note about assigning agoraphobia regardless of panic disorder.",
        "Corrected the source-page map so the agoraphobia narrative, differential, and comorbidity sections no longer inherit panic-disorder material."
      ]
    },
    source: {
      titlePages: [387],
      sectionPages: {
        criteria: [387, 388],
        diagnosticFeatures: [388, 389],
        associatedFeatures: [389],
        prevalence: [389, 390],
        developmentAndCourse: [390],
        riskAndPrognosticFactors: [390, 391],
        sexAndGenderRelatedDiagnosticIssues: [391],
        associationWithSuicidalThoughtsOrBehavior: [391],
        functionalConsequencesOfAgoraphobia: [391],
        differentialDiagnosis: [391, 392],
        comorbidity: [392]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Marked fear or anxiety about two (or more) of the following five situations:",
        sub_criteria: [
          { code: "1", text: "Using public transportation (e.g., automobiles, buses, trains, ships, planes)." },
          { code: "2", text: "Being in open spaces (e.g., parking lots, marketplaces, bridges)." },
          { code: "3", text: "Being in enclosed places (e.g., shops, theaters, cinemas)." },
          { code: "4", text: "Standing in line or being in a crowd." },
          { code: "5", text: "Being outside of the home alone." }
        ]
      },
      {
        code: "B",
        text:
          "The individual fears or avoids these situations because of thoughts that escape might be difficult or help might not be available in the event of developing panic-like symptoms or other incapacitating or embarrassing symptoms (e.g., fear of falling in the elderly; fear of incontinence)."
      },
      { code: "C", text: "The agoraphobic situations almost always provoke fear or anxiety." },
      {
        code: "D",
        text:
          "The agoraphobic situations are actively avoided, require the presence of a companion, or are endured with intense fear or anxiety."
      },
      {
        code: "E",
        text:
          "The fear or anxiety is out of proportion to the actual danger posed by the agoraphobic situations and to the sociocultural context."
      },
      { code: "F", text: "The fear, anxiety, or avoidance is persistent, typically lasting for 6 months or more." },
      {
        code: "G",
        text:
          "The fear, anxiety, or avoidance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "H",
        text:
          "If another medical condition (e.g., inflammatory bowel disease, Parkinson's disease) is present, the fear, anxiety, or avoidance is clearly excessive."
      },
      {
        code: "I",
        text:
          "The fear, anxiety, or avoidance is not better explained by the symptoms of another mental disorder-for example, the symptoms are not confined to specific phobia, situational type; do not involve only social situations (as in social anxiety disorder); and are not related exclusively to obsessions (as in obsessive-compulsive disorder), perceived defects or flaws in physical appearance (as in body dysmorphic disorder), reminders of traumatic events (as in posttraumatic stress disorder), or fear of separation (as in separation anxiety disorder).",
        note:
          "Note: Agoraphobia is diagnosed irrespective of the presence of panic disorder. If an individual's presentation meets criteria for panic disorder and agoraphobia, both diagnoses should be assigned."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Agoraphobia" }
    ]
  },
  "Anxiety Disorders::Generalized Anxiety Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the DSM criteria wording, including the child-specific Criterion C note and the full differential examples.",
        "Expanded the page map so the right panel now uses the dedicated GAD associated-features, culture, sex-and-gender, functional-consequences, and comorbidity sections."
      ]
    },
    source: {
      titlePages: [393],
      sectionPages: {
        criteria: [393],
        diagnosticFeatures: [393, 394],
        associatedFeatures: [394],
        prevalence: [394, 395],
        developmentAndCourse: [395],
        riskAndPrognosticFactors: [395, 396],
        cultureRelatedDiagnosticIssues: [396],
        sexAndGenderRelatedDiagnosticIssues: [396],
        associationWithSuicidalThoughtsOrBehavior: [396],
        functionalConsequencesOfGeneralizedAnxietyDisorder: [396, 397],
        differentialDiagnosis: [397, 398],
        comorbidity: [398]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Excessive anxiety and worry (apprehensive expectation), occurring more days than not for at least 6 months, about a number of events or activities (such as work or school performance)."
      },
      {
        code: "B",
        text: "The individual finds it difficult to control the worry."
      },
      {
        code: "C",
        text:
          "The anxiety and worry are associated with three (or more) of the following six symptoms (with at least some symptoms having been present for more days than not for the past 6 months):",
        note: "Note: Only one item is required in children.",
        sub_criteria: [
          { code: "1", text: "Restlessness or feeling keyed up or on edge." },
          { code: "2", text: "Being easily fatigued." },
          { code: "3", text: "Difficulty concentrating or mind going blank." },
          { code: "4", text: "Irritability." },
          { code: "5", text: "Muscle tension." },
          {
            code: "6",
            text: "Sleep disturbance (difficulty falling or staying asleep, or restless, unsatisfying sleep)."
          }
        ]
      },
      {
        code: "D",
        text:
          "The anxiety, worry, or physical symptoms cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "E",
        text:
          "The disturbance is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition (e.g., hyperthyroidism)."
      },
      {
        code: "F",
        text:
          "The disturbance is not better explained by another mental disorder (e.g., anxiety or worry about having panic attacks in panic disorder, negative evaluation in social anxiety disorder, contamination or other obsessions in obsessive-compulsive disorder, separation from attachment figures in separation anxiety disorder, reminders of traumatic events in posttraumatic stress disorder, gaining weight in anorexia nervosa, physical complaints in somatic symptom disorder, perceived appearance flaws in body dysmorphic disorder, having a serious illness in illness anxiety disorder, or the content of delusional beliefs in schizophrenia or delusional disorder)."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Generalized Anxiety Disorder" }
    ]
  },
  "Anxiety Disorders::Anxiety Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the DSM criteria wording and added the missing diagnostic-markers section from the dedicated medical-condition pages.",
        "Added the DSM code-first recording behavior so the etiological medical condition is listed immediately before F06.4 anxiety disorder due to that condition."
      ]
    },
    source: {
      titlePages: [402],
      sectionPages: {
        criteria: [402],
        diagnosticFeatures: [403],
        prevalence: [404],
        developmentAndCourse: [404],
        diagnosticMarkers: [404],
        differentialDiagnosis: [404, 405]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Panic attacks or anxiety is predominant in the clinical picture."
      },
      {
        code: "B",
        text:
          "There is evidence from the history, physical examination, or laboratory findings that the disturbance is the direct pathophysiological consequence of another medical condition."
      },
      {
        code: "C",
        text: "The disturbance is not better explained by another mental disorder."
      },
      {
        code: "D",
        text: "The disturbance does not occur exclusively during the course of a delirium."
      },
      {
        code: "E",
        text:
          "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Diagnostic Markers" }
    ],
    recording: {
      mode: "medical-condition-first",
      instructions: [
        "Include the name of the other medical condition within the name of the mental disorder.",
        "The other medical condition should be coded and listed separately immediately before the anxiety disorder due to the medical condition."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition",
          placeholder: "e.g., pheochromocytoma"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code",
          placeholder: "e.g., D35.00"
        }
      ]
    }
  },
  "Anxiety Disorders::Specific Phobia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Confirmed from the DSM-5-TR coding note that blood-injection-injury uses the F40.23x family label but must be resolved to a specific ICD-10-CM code for blood, injections/transfusions, other medical care, or injury.",
        "Replaced the placeholder blood-injection-injury live coding path with explicit DSM-aligned ICD-10-CM selections while preserving the higher-level phobic-stimulus specifier."
      ]
    },
    codes: [
      { code: "F40.218", description: "Animal" },
      { code: "F40.228", description: "Natural environment" },
      { code: "F40.230", description: "Fear of blood" },
      { code: "F40.231", description: "Fear of injections and transfusions" },
      { code: "F40.232", description: "Fear of other medical care" },
      { code: "F40.233", description: "Fear of injury" },
      { code: "F40.248", description: "Situational" },
      { code: "F40.298", description: "Other" }
    ],
    coding: {
      strategy: "option-map",
      requireSelection: true,
      inputs: [
        {
          id: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype",
          name: "Blood-Injection-Injury ICD-10-CM Code",
          description:
            "Only select one of these when the phobic stimulus is Blood-injection-injury.",
          allowsEmpty: true,
          selectionType: "single",
          options: [
            {
              id: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-0-fear-of-blood",
              name: "Fear of blood",
              description: "ICD-10-CM: F40.230",
              details: [],
              criteria: []
            },
            {
              id: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-1-fear-of-injections-and-transfusions",
              name: "Fear of injections and transfusions",
              description: "ICD-10-CM: F40.231",
              details: [],
              criteria: []
            },
            {
              id: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-2-fear-of-other-medical-care",
              name: "Fear of other medical care",
              description: "ICD-10-CM: F40.232",
              details: [],
              criteria: []
            },
            {
              id: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-3-fear-of-injury",
              name: "Fear of injury",
              description: "ICD-10-CM: F40.233",
              details: [],
              criteria: []
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-0-animal"
            }
          ],
          code: "F40.218"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option:
                "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-1-natural-environment"
            }
          ],
          code: "F40.228"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option:
                "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-2-blood-injection-injury"
            },
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype",
              option:
                "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-0-fear-of-blood"
            }
          ],
          code: "F40.230"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option:
                "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-2-blood-injection-injury"
            },
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype",
              option:
                "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-1-fear-of-injections-and-transfusions"
            }
          ],
          code: "F40.231"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option:
                "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-2-blood-injection-injury"
            },
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype",
              option:
                "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-2-fear-of-other-medical-care"
            }
          ],
          code: "F40.232"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option:
                "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-2-blood-injection-injury"
            },
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype",
              option:
                "anxiety-disorders-specific-phobia-coding-input-blood-injection-injury-subtype-option-3-fear-of-injury"
            }
          ],
          code: "F40.233"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-3-situational"
            }
          ],
          code: "F40.248"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus",
              option: "anxiety-disorders-specific-phobia-specifier-0-phobic-stimulus-option-4-other"
            }
          ],
          code: "F40.298"
        }
      ],
      notes: [
        "When Blood-injection-injury is selected, choose the exact ICD-10-CM subtype listed in the DSM coding note."
      ],
      additionalCodeRules: []
    }
  },
  "Anxiety Disorders::Other Specified Anxiety Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F41.8 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for limited-symptom attacks, generalized anxiety occurring less often than 'more days than not,' and culture-related examples such as khyal cap and ataque de nervios."
      ]
    },
    source: {
      titlePages: [405, 406],
      sectionPages: {
        description: [405, 406]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Anxiety Disorders::Unspecified Anxiety Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F41.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why full anxiety-disorder criteria are not met or when information is insufficient."
      ]
    },
    source: {
      sectionPages: {
        description: [406]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Schizotypal (Personality) Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Replaced the placeholder cross-reference text and contaminated differential diagnosis with the verbatim DSM-5-TR cross-reference paragraph on page 212 plus the full schizotypal personality disorder criteria and narrative from the personality-disorders chapter.",
        "Corrected the title and section page maps so this schizophrenia-spectrum listing now points to the actual personality-chapter pages instead of inheriting neighboring delusional-disorder content."
      ]
    },
    source: {
      titlePages: [212, 993],
      sectionPages: {
        description: [212],
        criteria: [993, 994],
        diagnosticFeatures: [994, 995],
        associatedFeatures: [995],
        prevalence: [995],
        developmentAndCourse: [996],
        riskAndPrognosticFactors: [996],
        cultureRelatedDiagnosticIssues: [996],
        sexAndGenderRelatedDiagnosticIssues: [996],
        differentialDiagnosis: [996, 997],
        comorbidity: [998]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "A pervasive pattern of social and interpersonal deficits marked by acute discomfort with, and reduced capacity for, close relationships as well as by cognitive or perceptual distortions and eccentricities of behavior, beginning by early adulthood and present in a variety of contexts, as indicated by five (or more) of the following:",
        items: [
          {
            code: "1",
            text: "Ideas of reference (excluding delusions of reference)."
          },
          {
            code: "2",
            text:
              "Odd beliefs or magical thinking that influences behavior and is inconsistent with subcultural norms (e.g., superstitiousness, belief in clairvoyance, telepathy, or “sixth sense”; in children and adolescents, bizarre fantasies or preoccupations)."
          },
          {
            code: "3",
            text: "Unusual perceptual experiences, including bodily illusions."
          },
          {
            code: "4",
            text:
              "Odd thinking and speech (e.g., vague, circumstantial, metaphorical, overelaborate, or stereotyped)."
          },
          {
            code: "5",
            text: "Suspiciousness or paranoid ideation."
          },
          {
            code: "6",
            text: "Inappropriate or constricted affect."
          },
          {
            code: "7",
            text: "Behavior or appearance that is odd, eccentric, or peculiar."
          },
          {
            code: "8",
            text: "Lack of close friends or confidants other than first-degree relatives."
          },
          {
            code: "9",
            text:
              "Excessive social anxiety that does not diminish with familiarity and tends to be associated with paranoid fears rather than negative judgments about self."
          }
        ]
      },
      {
        code: "B",
        text:
          "Does not occur exclusively during the course of schizophrenia, a bipolar disorder or depressive disorder with psychotic features, another psychotic disorder, or autism spectrum disorder."
      }
    ],
    specifiers: [
      {
        name: "premorbid",
        description:
          "If criteria are met prior to the onset of schizophrenia, add “premorbid,” e.g., “schizotypal personality disorder (premorbid).”",
        selectionType: "boolean",
        options: [
          {
            name: "premorbid",
            description:
              "If criteria are met prior to the onset of schizophrenia, add “premorbid,” e.g., “schizotypal personality disorder (premorbid).”"
          }
        ]
      }
    ],
    sections: [
      { title: "Description" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Delusional Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the criteria, subtype/specifier block, narrative sections, and differential diagnosis all point to the dedicated delusional-disorder pages rather than a mix of neighboring psychotic-disorder entries.",
        "Restored the Criterion B note example and added the missing culture-related and functional-consequences sections from the sanctioned DSM-5-TR pages."
      ]
    },
    source: {
      titlePages: [212],
      sectionPages: {
        criteria: [212],
        specifiers: [212, 213, 214],
        subtypes: [214],
        diagnosticFeatures: [214, 215],
        associatedFeatures: [215],
        prevalence: [215],
        developmentAndCourse: [215],
        riskAndPrognosticFactors: [215],
        cultureRelatedDiagnosticIssues: [216],
        functionalConsequencesOfDelusionalDisorder: [216],
        differentialDiagnosis: [216, 217]
      }
    },
    criteria: [
      {
        code: "A",
        text: "The presence of one (or more) delusions with a duration of 1 month or longer."
      },
      {
        code: "B",
        text: "Criterion A for schizophrenia has never been met.",
        note:
          "Hallucinations, if present, are not prominent and are related to the delusional theme (e.g., the sensation of being infested with insects associated with delusions of infestation)."
      },
      {
        code: "C",
        text:
          "Apart from the impact of the delusion(s) or its ramifications, functioning is not markedly impaired, and behavior is not obviously bizarre or odd."
      },
      {
        code: "D",
        text:
          "If manic or major depressive episodes have occurred, these have been brief relative to the duration of the delusional periods."
      },
      {
        code: "E",
        text:
          "The disturbance is not attributable to the physiological effects of a substance or another medical condition and is not better explained by another mental disorder, such as body dysmorphic disorder or obsessive-compulsive disorder."
      }
    ],
    specifiers: [
      {
        name: "Type",
        selectionType: "single",
        options: [
          {
            name: "Erotomanic type",
            description:
              "This subtype applies when the central theme of the delusion is that another person is in love with the individual."
          },
          {
            name: "Grandiose type",
            description:
              "This subtype applies when the central theme of the delusion is the conviction of having some great (but unrecognized) talent or insight or having made some important discovery."
          },
          {
            name: "Jealous type",
            description:
              "This subtype applies when the central theme of the individual’s delusion is that his or her spouse or lover is unfaithful."
          },
          {
            name: "Persecutory type",
            description:
              "This subtype applies when the central theme of the delusion involves the individual’s belief that he or she is being conspired against, cheated, spied on, followed, poisoned or drugged, maliciously maligned, harassed, or obstructed in the pursuit of long-term goals."
          },
          {
            name: "Somatic type",
            description:
              "This subtype applies when the central theme of the delusion involves bodily functions or sensations."
          },
          {
            name: "Mixed type",
            description: "This subtype applies when no one delusional theme predominates."
          },
          {
            name: "Unspecified type",
            description:
              "This subtype applies when the dominant delusional belief cannot be clearly determined or is not described in the specific types (e.g., referential delusions without a prominent persecutory or grandiose component)."
          }
        ]
      },
      {
        name: "Content",
        selectionType: "boolean",
        options: [
          {
            name: "With bizarre content",
            description:
              "Delusions are deemed bizarre if they are clearly implausible, not understandable, and not derived from ordinary life experiences (e.g., an individual’s belief that a stranger has removed his or her internal organs and replaced them with someone else’s organs without leaving any wounds or scars)."
          }
        ]
      },
      {
        name: "Course (after 1 year)",
        description:
          "The following course specifiers are only to be used after a 1-year duration of the disorder:",
        selectionType: "single",
        options: [
          {
            name: "First episode, currently in acute episode",
            description:
              "First manifestation of the disorder meeting the defining diagnostic symptom and time criteria. An acute episode is a time period in which the symptom criteria are fulfilled."
          },
          {
            name: "First episode, currently in partial remission",
            description:
              "Partial remission is a time period during which an improvement after a previous episode is maintained and in which the defining criteria of the disorder are only partially fulfilled."
          },
          {
            name: "First episode, currently in full remission",
            description:
              "Full remission is a period of time after a previous episode during which no disorder-specific symptoms are present."
          },
          {
            name: "Multiple episodes, currently in acute episode"
          },
          {
            name: "Multiple episodes, currently in partial remission"
          },
          {
            name: "Multiple episodes, currently in full remission"
          },
          {
            name: "Continuous",
            description:
              "Symptoms fulfilling the diagnostic symptom criteria of the disorder are remaining for the majority of the illness course, with subthreshold symptom periods being very brief relative to the overall course."
          },
          {
            name: "Unspecified"
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, disorganized speech, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of delusional disorder can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Subtypes" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences of Delusional Disorder" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Brief Psychotic Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the brief-psychotic criteria, specifier block, narrative sections, and differential diagnosis no longer inherit schizophreniform pages.",
        "Restored Criterion A's culturally sanctioned-response note and the verbatim DSM specifier descriptions, including the catatonia coding note."
      ]
    },
    source: {
      titlePages: [217],
      sectionPages: {
        criteria: [217],
        specifiers: [217, 218],
        diagnosticFeatures: [218],
        associatedFeatures: [218],
        prevalence: [218, 219],
        developmentAndCourse: [219],
        cultureRelatedDiagnosticIssues: [219],
        differentialDiagnosis: [219, 220]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Presence of one (or more) of the following symptoms. At least one of these must be (1), (2), or (3):",
        note: "Do not include a symptom if it is a culturally sanctioned response.",
        items: [
          {
            code: "1",
            text: "Delusions."
          },
          {
            code: "2",
            text: "Hallucinations."
          },
          {
            code: "3",
            text: "Disorganized speech (e.g., frequent derailment or incoherence)."
          },
          {
            code: "4",
            text: "Grossly disorganized or catatonic behavior."
          }
        ]
      },
      {
        code: "B",
        text:
          "Duration of an episode of the disturbance is at least 1 day but less than 1 month, with eventual full return to premorbid level of functioning."
      },
      {
        code: "C",
        text:
          "The disturbance is not better explained by major depressive or bipolar disorder with psychotic features or another psychotic disorder such as schizophrenia or catatonia, and is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      }
    ],
    specifiers: [
      {
        name: "Stressor",
        selectionType: "single",
        options: [
          {
            name: "With marked stressor(s) (brief reactive psychosis)",
            description:
              "If symptoms occur in response to events that, singly or together, would be markedly stressful to almost anyone in similar circumstances in the individual’s culture."
          },
          {
            name: "Without marked stressor(s)",
            description:
              "If symptoms do not occur in response to events that, singly or together, would be markedly stressful to almost anyone in similar circumstances in the individual’s culture."
          }
        ]
      },
      {
        name: "Onset",
        selectionType: "boolean",
        options: [
          {
            name: "With peripartum onset",
            description: "If onset is during pregnancy or within 4 weeks postpartum."
          }
        ]
      },
      {
        name: "Catatonia",
        selectionType: "boolean",
        options: [
          {
            name: "With catatonia",
            description:
              "Refer to the criteria for catatonia associated with another mental disorder, p. 135, for definition. Coding note: Use additional code F06.1 catatonia associated with brief psychotic disorder to indicate the presence of the comorbid catatonia."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, disorganized speech, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of brief psychotic disorder can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Culture-Related Diagnostic Issues" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Schizophreniform Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the criteria, specifier block, functional-consequences section, and differential diagnosis come from the dedicated schizophreniform pages rather than a blend of brief-psychotic and schizophrenia pages.",
        "Restored Criterion A's '(or less if successfully treated)' clause, the full Criterion C mood-rule sentence, and the verbatim prognostic-features, catatonia, and severity specifier wording."
      ]
    },
    source: {
      titlePages: [220],
      sectionPages: {
        criteria: [220, 221],
        specifiers: [221],
        diagnosticFeatures: [221, 222],
        associatedFeatures: [222],
        prevalence: [222],
        developmentAndCourse: [222],
        riskAndPrognosticFactors: [222],
        functionalConsequencesOfSchizophreniformDisorder: [222, 223],
        differentialDiagnosis: [223]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Two (or more) of the following, each present for a significant portion of time during a 1-month period (or less if successfully treated). At least one of these must be (1), (2), or (3):",
        items: [
          {
            code: "1",
            text: "Delusions."
          },
          {
            code: "2",
            text: "Hallucinations."
          },
          {
            code: "3",
            text: "Disorganized speech (e.g., frequent derailment or incoherence)."
          },
          {
            code: "4",
            text: "Grossly disorganized or catatonic behavior."
          },
          {
            code: "5",
            text: "Negative symptoms (i.e., diminished emotional expression or avolition)."
          }
        ]
      },
      {
        code: "B",
        text:
          "An episode of the disorder lasts at least 1 month but less than 6 months. When the diagnosis must be made without waiting for recovery, it should be qualified as “provisional.”"
      },
      {
        code: "C",
        text:
          "Schizoaffective disorder and depressive or bipolar disorder with psychotic features have been ruled out because either 1) no major depressive or manic episodes have occurred concurrently with the active-phase symptoms, or 2) if mood episodes have occurred during active-phase symptoms, they have been present for a minority of the total duration of the active and residual periods of the illness."
      },
      {
        code: "D",
        text:
          "The disturbance is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      }
    ],
    specifiers: [
      {
        name: "Prognostic Features",
        selectionType: "single",
        options: [
          {
            name: "With good prognostic features",
            description:
              "This specifier requires the presence of at least two of the following features: onset of prominent psychotic symptoms within 4 weeks of the first noticeable change in usual behavior or functioning; confusion or perplexity; good premorbid social and occupational functioning; and absence of blunted or flat affect."
          },
          {
            name: "Without good prognostic features",
            description:
              "This specifier is applied if two or more of the above features have not been present."
          }
        ]
      },
      {
        name: "Catatonia",
        selectionType: "boolean",
        options: [
          {
            name: "With catatonia",
            description:
              "Refer to the criteria for catatonia associated with another mental disorder, p. 135, for definition. Coding note: Use additional code F06.1 catatonia associated with schizophreniform disorder to indicate the presence of the comorbid catatonia."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, disorganized speech, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of schizophreniform disorder can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Functional Consequences of Schizophreniform Disorder" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Schizophrenia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the criteria, course/catatonia/severity specifier block, and the full schizophrenia narrative sections come from the dedicated pages 223-232 rather than inheriting schizophreniform differential text or truncated criteria.",
        "Restored the full verbatim Criteria A-F wording, including the functional-impairment clause, the 6-month active/prodromal/residual explanation, the full mood-rule sentence, and the autism-spectrum/communication-disorder condition."
      ]
    },
    source: {
      titlePages: [223],
      sectionPages: {
        criteria: [223, 224],
        specifiers: [224, 225],
        diagnosticFeatures: [225, 226],
        associatedFeatures: [226, 227],
        prevalence: [227],
        developmentAndCourse: [227, 228],
        riskAndPrognosticFactors: [228, 229],
        cultureRelatedDiagnosticIssues: [229, 230],
        sexAndGenderRelatedDiagnosticIssues: [230],
        associationWithSuicidalThoughtsOrBehavior: [230],
        functionalConsequencesOfSchizophrenia: [230, 231],
        differentialDiagnosis: [231, 232],
        comorbidity: [232]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "Two (or more) of the following, each present for a significant portion of time during a 1-month period (or less if successfully treated). At least one of these must be (1), (2), or (3):",
        items: [
          {
            code: "1",
            text: "Delusions."
          },
          {
            code: "2",
            text: "Hallucinations."
          },
          {
            code: "3",
            text: "Disorganized speech (e.g., frequent derailment or incoherence)."
          },
          {
            code: "4",
            text: "Grossly disorganized or catatonic behavior."
          },
          {
            code: "5",
            text: "Negative symptoms (i.e., diminished emotional expression or avolition)."
          }
        ]
      },
      {
        code: "B",
        text:
          "For a significant portion of the time since the onset of the disturbance, level of functioning in one or more major areas, such as work, interpersonal relations, or self-care, is markedly below the level achieved prior to the onset (or when the onset is in childhood or adolescence, there is failure to achieve expected level of interpersonal, academic, or occupational functioning)."
      },
      {
        code: "C",
        text:
          "Continuous signs of the disturbance persist for at least 6 months. This 6-month period must include at least 1 month of symptoms (or less if successfully treated) that meet Criterion A (i.e., active-phase symptoms) and may include periods of prodromal or residual symptoms. During these prodromal or residual periods, the signs of the disturbance may be manifested by only negative symptoms or by two or more symptoms listed in Criterion A present in an attenuated form (e.g., odd beliefs, unusual perceptual experiences)."
      },
      {
        code: "D",
        text:
          "Schizoaffective disorder and depressive or bipolar disorder with psychotic features have been ruled out because either 1) no major depressive or manic episodes have occurred concurrently with the active-phase symptoms, or 2) if mood episodes have occurred during active-phase symptoms, they have been present for a minority of the total duration of the active and residual periods of the illness."
      },
      {
        code: "E",
        text:
          "The disturbance is not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      },
      {
        code: "F",
        text:
          "If there is a history of autism spectrum disorder or a communication disorder of childhood onset, the additional diagnosis of schizophrenia is made only if prominent delusions or hallucinations, in addition to the other required symptoms of schizophrenia, are also present for at least 1 month (or less if successfully treated)."
      }
    ],
    specifiers: [
      {
        name: "Course (after 1 year)",
        description:
          "The following course specifiers are only to be used after a 1-year duration of the disorder and if they are not in contradiction to the diagnostic course criteria.",
        selectionType: "single",
        options: [
          {
            name: "First episode, currently in acute episode",
            description:
              "First manifestation of the disorder meeting the defining diagnostic symptom and time criteria. An acute episode is a time period in which the symptom criteria are fulfilled."
          },
          {
            name: "First episode, currently in partial remission",
            description:
              "Partial remission is a period of time during which an improvement after a previous episode is maintained and in which the defining criteria of the disorder are only partially fulfilled."
          },
          {
            name: "First episode, currently in full remission",
            description:
              "Full remission is a period of time after a previous episode during which no disorder-specific symptoms are present."
          },
          {
            name: "Multiple episodes, currently in acute episode",
            description:
              "Multiple episodes may be determined after a minimum of two episodes (i.e., after a first episode, a remission and a minimum of one relapse)."
          },
          {
            name: "Multiple episodes, currently in partial remission"
          },
          {
            name: "Multiple episodes, currently in full remission"
          },
          {
            name: "Continuous",
            description:
              "Symptoms fulfilling the diagnostic symptom criteria of the disorder are remaining for the majority of the illness course, with subthreshold symptom periods being very brief relative to the overall course."
          },
          {
            name: "Unspecified"
          }
        ]
      },
      {
        name: "Catatonia",
        selectionType: "boolean",
        options: [
          {
            name: "With catatonia",
            description:
              "Refer to the criteria for catatonia associated with another mental disorder, p. 135, for definition. Coding note: Use additional code F06.1 catatonia associated with schizophrenia to indicate the presence of the comorbid catatonia."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, disorganized speech, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of schizophrenia can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Schizophrenia" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Schizoaffective Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the schizoaffective criteria, specifier block, culture-risk-function sections, and comorbidity panel come from the dedicated schizoaffective pages rather than inherited schizophrenia pages.",
        "Restored the Criterion A note requiring depressed mood for the major depressive episode and updated the type, catatonia, course, and severity specifier descriptions to the verbatim DSM-5-TR wording."
      ]
    },
    source: {
      titlePages: [232],
      sectionPages: {
        criteria: [232, 233],
        specifiers: [233, 234],
        diagnosticFeatures: [234, 235],
        associatedFeatures: [235],
        prevalence: [235],
        developmentAndCourse: [235, 236],
        riskAndPrognosticFactors: [236],
        cultureRelatedDiagnosticIssues: [236, 237],
        associationWithSuicidalThoughtsOrBehavior: [237],
        functionalConsequencesOfSchizoaffectiveDisorder: [237],
        differentialDiagnosis: [237, 238],
        comorbidity: [238]
      }
    },
    criteria: [
      {
        code: "A",
        text:
          "An uninterrupted period of illness during which there is a major mood episode (major depressive or manic) concurrent with Criterion A of schizophrenia.",
        note: "The major depressive episode must include Criterion A1: Depressed mood."
      },
      {
        code: "B",
        text:
          "Delusions or hallucinations for 2 or more weeks in the absence of a major mood episode (depressive or manic) during the lifetime duration of the illness."
      },
      {
        code: "C",
        text:
          "Symptoms that meet criteria for a major mood episode are present for the majority of the total duration of the active and residual portions of the illness."
      },
      {
        code: "D",
        text:
          "The disturbance is not attributable to the effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      }
    ],
    specifiers: [
      {
        name: "Type",
        selectionType: "single",
        options: [
          {
            name: "Bipolar type",
            description:
              "This subtype applies if a manic episode is part of the presentation. Major depressive episodes may also occur."
          },
          {
            name: "Depressive type",
            description:
              "This subtype applies if only major depressive episodes are part of the presentation."
          }
        ]
      },
      {
        name: "Catatonia",
        selectionType: "boolean",
        options: [
          {
            name: "With catatonia",
            description:
              "Refer to the criteria for catatonia associated with another mental disorder, p. 135, for definition. Coding note: Use additional code F06.1 catatonia associated with schizoaffective disorder to indicate the presence of the comorbid catatonia."
          }
        ]
      },
      {
        name: "Course (after 1 year)",
        description:
          "The following course specifiers are only to be used after a 1-year duration of the disorder and if they are not in contradiction to the diagnostic course criteria.",
        selectionType: "single",
        options: [
          {
            name: "First episode, currently in acute episode",
            description:
              "First manifestation of the disorder meeting the defining diagnostic symptom and time criteria. An acute episode is a time period in which the symptom criteria are fulfilled."
          },
          {
            name: "First episode, currently in partial remission",
            description:
              "Partial remission is a time period during which an improvement after a previous episode is maintained and in which the defining criteria of the disorder are only partially fulfilled."
          },
          {
            name: "First episode, currently in full remission",
            description:
              "Full remission is a period of time after a previous episode during which no disorder-specific symptoms are present."
          },
          {
            name: "Multiple episodes, currently in acute episode",
            description:
              "Multiple episodes may be determined after a minimum of two episodes (i.e., after a first episode, a remission and a minimum of one relapse)."
          },
          {
            name: "Multiple episodes, currently in partial remission"
          },
          {
            name: "Multiple episodes, currently in full remission"
          },
          {
            name: "Continuous",
            description:
              "Symptoms fulfilling the diagnostic symptom criteria of the disorder are remaining for the majority of the illness course, with subthreshold symptom periods being very brief relative to the overall course."
          },
          {
            name: "Unspecified"
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, disorganized speech, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of schizoaffective disorder can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Schizoaffective Disorder" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Psychotic Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the DSM page map so the criteria, Specifiers note, prevalence/course/risk sections, differential diagnosis, and comorbidity panel come from the dedicated pages 244-248 rather than inherited catatonia pages.",
        "Restored the full recording note requiring the medical condition to be coded first, and aligned the predominant-symptom and severity specifier wording to the verbatim DSM-5-TR text."
      ]
    },
    source: {
      titlePages: [244],
      sectionPages: {
        criteria: [244],
        specifiers: [244],
        diagnosticFeatures: [245, 246],
        prevalence: [246],
        developmentAndCourse: [246, 247],
        riskAndPrognosticFactors: [247],
        associationWithSuicidalThoughtsOrBehavior: [247],
        functionalConsequencesOfPsychoticDisorderDueToAnotherMedicalCondition: [247],
        differentialDiagnosis: [247, 248],
        comorbidity: [248]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Prominent hallucinations or delusions."
      },
      {
        code: "B",
        text:
          "There is evidence from the history, physical examination, or laboratory findings that the disturbance is the direct pathophysiological consequence of another medical condition."
      },
      {
        code: "C",
        text: "The disturbance is not better explained by another mental disorder."
      },
      {
        code: "D",
        text: "The disturbance does not occur exclusively during the course of a delirium."
      },
      {
        code: "E",
        text:
          "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      }
    ],
    specifiers: [
      {
        name: "Predominant Symptom",
        selectionType: "single",
        options: [
          {
            name: "With delusions",
            description: "If delusions are the predominant symptom."
          },
          {
            name: "With hallucinations",
            description: "If hallucinations are the predominant symptom."
          }
        ]
      },
      {
        name: "Severity",
        selectionType: "boolean",
        options: [
          {
            name: "Severity rating can be applied",
            description:
              "Severity is rated by a quantitative assessment of the primary symptoms of psychosis, including delusions, hallucinations, abnormal psychomotor behavior, and negative symptoms. Each of these symptoms may be rated for its current severity (most severe in the last 7 days) on a 5-point scale ranging from 0 (not present) to 4 (present and severe). (See Clinician-Rated Dimensions of Psychosis Symptom Severity in the chapter “Assessment Measures.”) Note: Diagnosis of psychotic disorder due to another medical condition can be made without using this severity specifier."
          }
        ]
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Psychotic Disorder Due to Another Medical Condition" }
    ],
    recording: {
      mode: "medical-condition-first",
      instructions: [
        "Include the name of the other medical condition in the name of the mental disorder.",
        "The other medical condition should be coded and listed separately immediately before the psychotic disorder due to the medical condition."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition",
          placeholder: "e.g., malignant lung neoplasm"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code",
          placeholder: "e.g., C34.90"
        }
      ]
    }
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Catatonia Associated With Another Mental Disorder (Catatonia Specifier)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the catatonia-specifier page map so the criteria, coding note, diagnostic-features section, and culture-related note come from the dedicated catatonia pages rather than inherited neighboring differential text.",
        "Added DSM-backed code-first recording guidance so the associated mental disorder is listed before F06.1 catatonia associated with that disorder."
      ]
    },
    source: {
      titlePages: [249],
      sectionPages: {
        criteria: [249],
        diagnosticFeatures: [249, 250],
        cultureRelatedDiagnosticIssues: [250]
      }
    },
    criteria: [
      {
        code: "A",
        text: "The clinical picture is dominated by three (or more) of the following symptoms:",
        items: [
          {
            code: "1",
            text: "Stupor (i.e., no psychomotor activity; not actively relating to environment)."
          },
          {
            code: "2",
            text: "Catalepsy (i.e., passive induction of a posture held against gravity)."
          },
          {
            code: "3",
            text: "Waxy flexibility (i.e., slight, even resistance to positioning by examiner)."
          },
          {
            code: "4",
            text: "Mutism (i.e., no, or very little, verbal response [exclude if known aphasia])."
          },
          {
            code: "5",
            text: "Negativism (i.e., opposition or no response to instructions or external stimuli)."
          },
          {
            code: "6",
            text: "Posturing (i.e., spontaneous and active maintenance of a posture against gravity)."
          },
          {
            code: "7",
            text: "Mannerism (i.e., odd, circumstantial caricature of normal actions)."
          },
          {
            code: "8",
            text: "Stereotypy (i.e., repetitive, abnormally frequent, non-goal-directed movements)."
          },
          {
            code: "9",
            text: "Agitation, not influenced by external stimuli."
          },
          {
            code: "10",
            text: "Grimacing."
          },
          {
            code: "11",
            text: "Echolalia (i.e., mimicking another’s speech)."
          },
          {
            code: "12",
            text: "Echopraxia (i.e., mimicking another’s movements)."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Culture-Related Diagnostic Issues" }
    ],
    recording: {
      mode: "associated-mental-disorder-first",
      instructions: [
        "Indicate the name of the associated mental disorder when recording the name of the condition.",
        "Code first the associated mental disorder."
      ],
      fields: [
        {
          key: "associated-mental-disorder",
          label: "Associated mental disorder",
          placeholder: "e.g., schizoaffective disorder, depressive type"
        },
        {
          key: "associated-mental-disorder-code",
          label: "Associated mental disorder code",
          placeholder: "e.g., F25.1"
        }
      ]
    }
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Catatonic Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the catatonic-disorder page map so the full criteria, coding note, diagnostic-features section, associated-features section, and differential diagnosis are sourced from the dedicated DSM pages.",
        "Rebuilt the criteria to the full 12-item verbatim catatonia list and added the DSM code-first recording behavior for the etiological medical condition."
      ]
    },
    source: {
      titlePages: [250],
      sectionPages: {
        criteria: [250, 251],
        diagnosticFeatures: [251],
        associatedFeatures: [251],
        differentialDiagnosis: [251]
      }
    },
    criteria: [
      {
        code: "A",
        text: "The clinical picture is dominated by three (or more) of the following symptoms:",
        items: [
          {
            code: "1",
            text: "Stupor (i.e., no psychomotor activity; not actively relating to environment)."
          },
          {
            code: "2",
            text: "Catalepsy (i.e., passive induction of a posture held against gravity)."
          },
          {
            code: "3",
            text: "Waxy flexibility (i.e., slight, even resistance to positioning by examiner)."
          },
          {
            code: "4",
            text: "Mutism (i.e., no, or very little, verbal response [Note: not applicable if there is an established aphasia])."
          },
          {
            code: "5",
            text: "Negativism (i.e., opposition or no response to instructions or external stimuli)."
          },
          {
            code: "6",
            text: "Posturing (i.e., spontaneous and active maintenance of a posture against gravity)."
          },
          {
            code: "7",
            text: "Mannerism (i.e., odd, circumstantial caricature of normal actions)."
          },
          {
            code: "8",
            text: "Stereotypy (i.e., repetitive, abnormally frequent, non-goal-directed movements)."
          },
          {
            code: "9",
            text: "Agitation, not influenced by external stimuli."
          },
          {
            code: "10",
            text: "Grimacing."
          },
          {
            code: "11",
            text: "Echolalia (i.e., mimicking another’s speech)."
          },
          {
            code: "12",
            text: "Echopraxia (i.e., mimicking another’s movements)."
          }
        ]
      },
      {
        code: "B",
        text:
          "There is evidence from the history, physical examination, or laboratory findings that the disturbance is the direct pathophysiological consequence of another medical condition."
      },
      {
        code: "C",
        text: "The disturbance is not better explained by another mental disorder (e.g., a manic episode)."
      },
      {
        code: "D",
        text: "The disturbance does not occur exclusively during the course of a delirium."
      },
      {
        code: "E",
        text:
          "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" }
    ],
    recording: {
      mode: "medical-condition-first",
      instructions: [
        "Include the name of the medical condition in the name of the mental disorder.",
        "The other medical condition should be coded and listed separately immediately before the catatonic disorder due to the medical condition."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition",
          placeholder: "e.g., hepatic encephalopathy"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code",
          placeholder: "e.g., K72.90"
        }
      ]
    }
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Unspecified Catatonia": {
    codes: [
      {
        code: "R29.818",
        description: "Other symptoms involving nervous and musculoskeletal systems"
      },
      {
        code: "F06.1",
        description: "Unspecified catatonia"
      }
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the title page and added the DSM verbatim category description from the dedicated unspecified-catatonia page.",
        "Rebuilt the coding and recording behavior to reflect the DSM note that R29.818 must be coded first, followed by F06.1 unspecified catatonia."
      ]
    },
    source: {
      titlePages: [252],
      sectionPages: {
        description: [252]
      }
    },
    criteria: [
      {
        text:
          "This category applies to presentations in which symptoms characteristic of catatonia cause clinically significant distress or impairment in social, occupational, or other important areas of functioning but either the nature of the underlying mental disorder or other medical condition is unclear, full criteria for catatonia are not met, or there is insufficient information to make a more specific diagnosis (e.g., in emergency room settings)."
      }
    ],
    sections: [{ title: "Description" }],
    coding: {
      strategy: "fixed-with-additional",
      code: "R29.818",
      codeJoiner: "; ",
      notes: [
        "Code first R29.818 other symptoms involving nervous and musculoskeletal systems, followed by F06.1 unspecified catatonia."
      ],
      additionalCodeRules: [
        {
          conditions: [],
          code: "F06.1"
        }
      ],
      inputs: []
    },
    recording: {
      mode: "unspecified-catatonia-code-first",
      instructions: [
        "Code first R29.818 other symptoms involving nervous and musculoskeletal systems, followed by F06.1 unspecified catatonia."
      ],
      fields: []
    }
  },
  "Personality Disorders::Schizotypal Personality Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-06",
      notes: [
        "Corrected the title and section page map to the actual schizotypal personality disorder pages in the DSM-5-TR personality-disorders chapter.",
        "Added the missing associated-features, prevalence, risk-and-prognostic-factors, differential-diagnosis, and comorbidity source pages so the right panel hydrates from the dedicated schizotypal pages instead of generic neighboring personality-disorder pages."
      ]
    },
    source: {
      titlePages: [993],
      sectionPages: {
        criteria: [993, 994],
        diagnosticFeatures: [994, 995],
        associatedFeatures: [995],
        prevalence: [995],
        developmentAndCourse: [996],
        riskAndPrognosticFactors: [996],
        cultureRelatedDiagnosticIssues: [996],
        sexAndGenderRelatedDiagnosticIssues: [996],
        differentialDiagnosis: [996, 997],
        comorbidity: [998]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Substance/Medication-Induced Psychotic Disorder": {
    codes: buildSubstanceCodeDisplayRows(PSYCHOTIC_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Replaced the placeholder F1x.x59 code with the DSM-5-TR substance-by-substance coding table from the full manual.",
        "Added the missing DSM recording-procedure and associated-feature sections so the live entry now reflects the manual's substance-first naming rules."
      ]
    },
    source: {
      titlePages: [238],
      sectionPages: {
        criteria: [238, 239],
        specifiers: [239, 240],
        recordingProcedures: [240],
        diagnosticFeatures: [240, 241],
        associatedFeatures: [241, 242],
        prevalence: [242],
        developmentAndCourse: [242],
        diagnosticMarkers: [242],
        functionalConsequences: [243],
        differentialDiagnosis: [243, 244]
      }
    },
    coding: buildStructuredSubstanceInducedCoding({
      substanceGroupId: PSYCHOTIC_SUBSTANCE_TYPE_GROUP_ID,
      useStatusGroupId: PSYCHOTIC_USE_DISORDER_STATUS_GROUP_ID,
      substanceTypeOptions: PSYCHOTIC_SUBSTANCE_CODE_ROWS.map(([name]) => name),
      codeRows: PSYCHOTIC_SUBSTANCE_CODE_ROWS
    }),
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences" }
    ]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Other Specified Schizophrenia Spectrum and Other Psychotic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F28 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for persistent auditory hallucinations, delusions with overlapping mood episodes, attenuated psychosis syndrome, and shared delusional symptoms in close relationships."
      ]
    },
    source: {
      titlePages: [252, 253],
      sectionPages: {
        description: [252, 253]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Schizophrenia Spectrum and Other Psychotic Disorders::Unspecified Schizophrenia Spectrum and Other Psychotic Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F29 code and corrected the source map from an unrelated early-chapter page to the actual DSM residual psychotic-disorder pages.",
        "Confirmed the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for a more specific schizophrenia-spectrum disorder are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [253],
      sectionPages: {
        description: [253]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Obsessive-Compulsive and Related Disorders::Obsessive-Compulsive Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM-5-TR obsessive-compulsive disorder criteria wording, including the nested obsessions/compulsions structure, the child note, and the full differential-criterion examples.",
        "Expanded the section-page map so the right panel now uses the dedicated OCD specifiers, associated-features, culture, sex-and-gender, suicidality, functional-consequences, differential, and comorbidity pages."
      ]
    },
    source: {
      titlePages: [410],
      sectionPages: {
        criteria: [410, 411],
        specifiers: [411, 412],
        diagnosticFeatures: [412, 413],
        associatedFeatures: [413],
        prevalence: [413],
        developmentAndCourse: [413, 414],
        riskAndPrognosticFactors: [414],
        cultureRelatedDiagnosticIssues: [414, 415],
        sexAndGenderRelatedDiagnosticIssues: [415],
        associationWithSuicidalThoughtsOrBehavior: [415],
        functionalConsequencesOfObsessiveCompulsiveDisorder: [415, 416],
        differentialDiagnosis: [416, 417],
        comorbidity: [417, 418]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Presence of obsessions, compulsions, or both:",
        sub_categories: [
          {
            name: "Obsessions are defined by (1) and (2):",
            items: [
              {
                code: "1",
                text: "Recurrent and persistent thoughts, urges, or images that are experienced, at some time during the disturbance, as intrusive and unwanted, and that in most individuals cause marked anxiety or distress."
              },
              {
                code: "2",
                text: "The individual attempts to ignore or suppress such thoughts, urges, or images, or to neutralize them with some other thought or action (i.e., by performing a compulsion)."
              }
            ]
          },
          {
            name: "Compulsions are defined by (1) and (2):",
            items: [
              {
                code: "1",
                text: "Repetitive behaviors (e.g., hand washing, ordering, checking) or mental acts (e.g., praying, counting, repeating words silently) that the individual feels driven to perform in response to an obsession or according to rules that must be applied rigidly."
              },
              {
                code: "2",
                text: "The behaviors or mental acts are aimed at preventing or reducing anxiety or distress, or preventing some dreaded event or situation; however, these behaviors or mental acts are not connected in a realistic way with what they are designed to neutralize or prevent, or are clearly excessive.",
                note: "Note: Young children may not be able to articulate the aims of these behaviors or mental acts."
              }
            ]
          }
        ]
      },
      {
        code: "B",
        text: "The obsessions or compulsions are time-consuming (e.g., take more than 1 hour per day) or cause clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "C",
        text: "The obsessive-compulsive symptoms are not attributable to the physiological effects of a substance (e.g., a drug of abuse, a medication) or another medical condition."
      },
      {
        code: "D",
        text: "The disturbance is not better explained by the symptoms of another mental disorder (e.g., excessive worries, as in generalized anxiety disorder; preoccupation with appearance, as in body dysmorphic disorder; difficulty discarding or parting with possessions, as in hoarding disorder; hair pulling, as in trichotillomania [hair-pulling disorder]; skin picking, as in excoriation [skin-picking] disorder; stereotypies, as in stereotypic movement disorder; ritualized eating behavior, as in eating disorders; preoccupation with substances or gambling, as in substance-related and addictive disorders; preoccupation with having an illness, as in illness anxiety disorder; sexual urges or fantasies, as in paraphilic disorders; impulses, as in disruptive, impulse-control, and conduct disorders; guilty ruminations, as in major depressive disorder; thought insertion or delusional preoccupations, as in schizophrenia spectrum and other psychotic disorders; or repetitive patterns of behavior, as in autism spectrum disorder)."
      }
    ],
    specifiers: [
      {
        name: "Insight",
        description: "",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          {
            name: "With good or fair insight",
            description:
              "The individual recognizes that obsessive-compulsive disorder beliefs are definitely or probably not true or that they may or may not be true."
          },
          {
            name: "With poor insight",
            description:
              "The individual thinks obsessive-compulsive disorder beliefs are probably true."
          },
          {
            name: "With absent insight/delusional beliefs",
            description:
              "The individual is completely convinced that obsessive-compulsive disorder beliefs are true."
          }
        ]
      },
      {
        name: "Tic-related",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "Tic-related",
            description: "The individual has a current or past history of a tic disorder."
          }
        ]
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Obsessive-Compulsive Disorder" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Body Dysmorphic Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the section-page map so body dysmorphic disorder no longer inherits OCD and hoarding pages in the right panel.",
        "Restored the verbatim DSM-5-TR specifier wording for muscle dysmorphia and the insight prompt while adding the missing sex-and-gender, suicidality, functional-consequences, differential, and comorbidity coverage."
      ]
    },
    source: {
      titlePages: [418],
      sectionPages: {
        criteria: [418],
        specifiers: [419],
        diagnosticFeatures: [419, 420],
        associatedFeatures: [420, 421],
        prevalence: [421],
        developmentAndCourse: [421, 422],
        riskAndPrognosticFactors: [421, 422],
        cultureRelatedDiagnosticIssues: [421, 422],
        sexAndGenderRelatedDiagnosticIssues: [422],
        associationWithSuicidalThoughtsOrBehavior: [422, 423],
        functionalConsequencesOfBodyDysmorphicDisorder: [422, 423],
        differentialDiagnosis: [423, 424],
        comorbidity: [424, 425]
      }
    },
    specifiers: [
      {
        name: "Subtype",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With muscle dysmorphia",
            description:
              "The individual is preoccupied with the idea that his or her body build is too small or insufficiently muscular. This specifier is used even if the individual is preoccupied with other body areas, which is often the case."
          }
        ]
      },
      {
        name: "Insight",
        description:
          "Indicate degree of insight regarding body dysmorphic disorder beliefs (e.g., “I look ugly” or “I look deformed”).",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          {
            name: "With good or fair insight",
            description:
              "The individual recognizes that the body dysmorphic disorder beliefs are definitely or probably not true or that they may or may not be true."
          },
          {
            name: "With poor insight",
            description:
              "The individual thinks that the body dysmorphic disorder beliefs are probably true."
          },
          {
            name: "With absent insight/delusional beliefs",
            description:
              "The individual is completely convinced that the body dysmorphic disorder beliefs are true."
          }
        ]
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Body Dysmorphic Disorder" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Hoarding Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM-5-TR Criterion F wording and the verbatim excessive-acquisition specifier text for hoarding disorder.",
        "Corrected the section-page map so the right panel now uses the dedicated hoarding narrative, functional-consequences, differential, and comorbidity pages rather than neighboring OCRD entries."
      ]
    },
    source: {
      titlePages: [425],
      sectionPages: {
        criteria: [425],
        specifiers: [426],
        diagnosticFeatures: [426, 427],
        associatedFeatures: [427],
        prevalence: [427],
        developmentAndCourse: [427, 428],
        riskAndPrognosticFactors: [428],
        cultureRelatedDiagnosticIssues: [428],
        sexAndGenderRelatedDiagnosticIssues: [428],
        functionalConsequencesOfHoardingDisorder: [428],
        differentialDiagnosis: [428, 429, 430],
        comorbidity: [430]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Persistent difficulty discarding or parting with possessions, regardless of their actual value."
      },
      {
        code: "B",
        text: "This difficulty is due to a perceived need to save the items and to distress associated with discarding them."
      },
      {
        code: "C",
        text: "The difficulty discarding possessions results in the accumulation of possessions that congest and clutter active living areas and substantially compromises their intended use. If living areas are uncluttered, it is only because of the interventions of third parties (e.g., family members, cleaners, authorities)."
      },
      {
        code: "D",
        text: "The hoarding causes clinically significant distress or impairment in social, occupational, or other important areas of functioning (including maintaining a safe environment for self and others)."
      },
      {
        code: "E",
        text: "The hoarding is not attributable to another medical condition (e.g., brain injury, cerebrovascular disease, Prader-Willi syndrome)."
      },
      {
        code: "F",
        text: "The hoarding is not better explained by the symptoms of another mental disorder (e.g., obsessions in obsessive-compulsive disorder, decreased energy in major depressive disorder, delusions in schizophrenia or another psychotic disorder, cognitive deficits in major neurocognitive disorder, restricted interests in autism spectrum disorder)."
      }
    ],
    specifiers: [
      {
        name: "Acquisition",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With excessive acquisition",
            description:
              "If difficulty discarding possessions is accompanied by excessive acquisition of items that are not needed or for which there is no available space."
          }
        ]
      },
      {
        name: "Insight",
        description: "",
        selectionType: "single",
        allowsEmpty: true,
        options: [
          {
            name: "With good or fair insight",
            description:
              "The individual recognizes that hoarding-related beliefs and behaviors (pertaining to difficulty discarding items, clutter, or excessive acquisition) are problematic."
          },
          {
            name: "With poor insight",
            description:
              "The individual is mostly convinced that hoarding-related beliefs and behaviors (pertaining to difficulty discarding items, clutter, or excessive acquisition) are not problematic despite evidence to the contrary."
          },
          {
            name: "With absent insight/delusional beliefs",
            description:
              "The individual is completely convinced that hoarding-related beliefs and behaviors (pertaining to difficulty discarding items, clutter, or excessive acquisition) are not problematic despite evidence to the contrary."
          }
        ]
      }
    ],
    sections: [
      { title: "Specifiers" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Functional Consequences of Hoarding Disorder" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Trichotillomania (Hair-Pulling Disorder)": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the within-chapter page map so trichotillomania no longer pulls excoriation text into its right panel.",
        "Added the missing DSM-5-TR culture, diagnostic-marker, functional-consequences, differential, and comorbidity sections from the dedicated hair-pulling pages."
      ]
    },
    source: {
      titlePages: [430],
      sectionPages: {
        criteria: [430],
        diagnosticFeatures: [430, 431],
        associatedFeatures: [431],
        prevalence: [431, 432],
        developmentAndCourse: [432],
        riskAndPrognosticFactors: [432],
        cultureRelatedDiagnosticIssues: [432],
        diagnosticMarkers: [432],
        functionalConsequencesOfTrichotillomaniaHairPullingDisorder: [432],
        differentialDiagnosis: [432, 433],
        comorbidity: [433]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Trichotillomania (Hair-Pulling Disorder)" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Excoriation (Skin-Picking) Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Removed the inherited substance-induced recording behavior from excoriation disorder and restored the standard standalone diagnosis flow.",
        "Corrected the page map so excoriation disorder now uses its own diagnostic features, culture, diagnostic markers, functional consequences, differential, and comorbidity pages."
      ]
    },
    source: {
      titlePages: [433],
      sectionPages: {
        criteria: [434],
        diagnosticFeatures: [434, 435],
        associatedFeatures: [434, 435],
        prevalence: [435],
        developmentAndCourse: [435],
        riskAndPrognosticFactors: [435],
        cultureRelatedDiagnosticIssues: [435],
        diagnosticMarkers: [435],
        functionalConsequencesOfExcoriationSkinPickingDisorder: [435, 436],
        differentialDiagnosis: [436, 437],
        comorbidity: [437]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Recurrent skin picking resulting in skin lesions."
      },
      {
        code: "B",
        text: "Repeated attempts to decrease or stop skin picking."
      },
      {
        code: "C",
        text: "The skin picking causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "D",
        text: "The skin picking is not attributable to the physiological effects of a substance (e.g., cocaine) or another medical condition (e.g., scabies)."
      },
      {
        code: "E",
        text: "The skin picking is not better explained by symptoms of another mental disorder (e.g., delusions or tactile hallucinations in a psychotic disorder, attempts to improve a perceived defect or flaw in appearance in body dysmorphic disorder, stereotypies in stereotypic movement disorder, or intention to harm oneself in nonsuicidal self-injury)."
      }
    ],
    recording: {
      mode: "standard",
      instructions: [],
      fields: []
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Diagnostic Markers" },
      { title: "Functional Consequences of Excoriation (Skin-Picking) Disorder" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Obsessive-Compulsive and Related Disorder Due to Another Medical Condition": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the DSM-5-TR Criterion E wording and added the code-first medical-condition recording rule from the coding note.",
        "Expanded the source-page map so the right panel now uses the dedicated specifier, recording, associated-features, development-and-course, diagnostic-marker, and differential pages."
      ]
    },
    source: {
      titlePages: [441],
      sectionPages: {
        criteria: [441],
        specifiers: [442],
        recordingProcedures: [442],
        diagnosticFeatures: [442, 443],
        associatedFeatures: [443],
        developmentAndCourse: [443],
        diagnosticMarkers: [443],
        differentialDiagnosis: [443, 444]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Obsessions, compulsions, preoccupations with appearance, hoarding, skin picking, hair pulling, other body-focused repetitive behaviors, or other symptoms characteristic of obsessive-compulsive and related disorder predominate in the clinical picture."
      },
      {
        code: "B",
        text: "There is evidence from the history, physical examination, or laboratory findings that the disturbance is the direct pathophysiological consequence of another medical condition."
      },
      {
        code: "C",
        text: "The disturbance is not better explained by another mental disorder."
      },
      {
        code: "D",
        text: "The disturbance does not occur exclusively during the course of a delirium."
      },
      {
        code: "E",
        text: "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      }
    ],
    recording: {
      mode: "medical-condition-first",
      instructions: [
        "Include the name of the other medical condition in the name of the mental disorder.",
        "The other medical condition should be coded and listed separately immediately before the obsessive-compulsive and related disorder due to the medical condition."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition",
          placeholder: "e.g., cerebral infarction"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code",
          placeholder: "e.g., I69.398"
        }
      ]
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Development and Course" },
      { title: "Diagnostic Markers" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Other Specified Obsessive-Compulsive and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F42.8 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for body-dysmorphic-like presentations, other body-focused repetitive behaviors, obsessional jealousy, olfactory reference disorder, shubo-kyofu, and koro."
      ]
    },
    source: {
      titlePages: [445, 446],
      sectionPages: {
        description: [445, 446]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Obsessive-Compulsive and Related Disorders::Substance/Medication-Induced Obsessive-Compulsive and Related Disorder": {
    codes: buildSubstanceCodeDisplayRows(OCD_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with the DSM-5-TR substance-by-substance coding table for substance/medication-induced obsessive-compulsive and related disorder.",
        "Added the missing DSM recording-procedure and associated-feature sections so the live entry now reflects the manual's substance-first naming rule and onset recording guidance."
      ]
    },
    source: {
      titlePages: [438],
      sectionPages: {
        criteria: [438],
        specifiers: [438, 439],
        recordingProcedures: [439],
        diagnosticFeatures: [439, 440],
        associatedFeatures: [440],
        prevalence: [440],
        differentialDiagnosis: [440, 441]
      }
    },
    coding: buildStructuredSubstanceInducedCoding({
      substanceGroupId: OCD_SUBSTANCE_TYPE_GROUP_ID,
      useStatusGroupId: OCD_USE_DISORDER_STATUS_GROUP_ID,
      substanceTypeOptions: OCD_SUBSTANCE_CODE_ROWS.map(([name]) => name),
      codeRows: OCD_SUBSTANCE_CODE_ROWS
    }),
    recording: {
      mode: "substance-induced-first",
      instructions: [
        "If a comorbid substance use disorder is present, record it first and then the substance-induced disorder.",
        "If there is no comorbid substance use disorder, record only the substance-induced disorder."
      ],
      fields: [
        {
          key: "comorbid-substance-use-disorder",
          label: "Comorbid substance use disorder (if present)",
          placeholder: "e.g., severe cocaine use disorder"
        }
      ]
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" }
    ]
  },
  "Obsessive-Compulsive and Related Disorders::Unspecified Obsessive-Compulsive and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F42.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for a more specific obsessive-compulsive and related disorder are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [446],
      sectionPages: {
        description: [446]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Trauma- and Stressor-Related Disorders::Posttraumatic Stress Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full adult/adolescent PTSD criteria wording, including the older-than-6 note, child-specific Criterion B notes, Criterion A4 media note, D2 examples, D7 examples, and the substance/medical-condition examples in Criterion H.",
        "Replaced the inherited disinhibited-social-engagement narrative spill with the dedicated PTSD diagnostic-features, prevalence, development, risk, culture, sex-and-gender, suicidality, functional-consequences, differential, and comorbidity pages."
      ]
    },
    source: {
      titlePages: [455],
      sectionPages: {
        criteria: [455, 456, 457],
        diagnosticFeatures: [460, 461, 462, 463, 464],
        associatedFeatures: [464],
        prevalence: [464, 465],
        developmentAndCourse: [464, 465],
        riskAndPrognosticFactors: [466, 467],
        cultureRelatedDiagnosticIssues: [467, 468],
        sexAndGenderRelatedDiagnosticIssues: [468],
        associationWithSuicidalThoughtsOrBehavior: [468],
        functionalConsequencesOfPosttraumaticStressDisorder: [468],
        differentialDiagnosis: [468, 469, 470],
        comorbidity: [470, 471]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Exposure to actual or threatened death, serious injury, or sexual violence in one (or more) of the following ways:",
        note:
          "Note: The following criteria apply to adults, adolescents, and children older than 6 years. For children 6 years and younger, see corresponding criteria below.",
        sub_criteria: [
          { code: "1", text: "Directly experiencing the traumatic event(s)." },
          { code: "2", text: "Witnessing, in person, the event(s) as it occurred to others." },
          {
            code: "3",
            text: "Learning that the traumatic event(s) occurred to a close family member or close friend. In cases of actual or threatened death of a family member or friend, the event(s) must have been violent or accidental."
          },
          {
            code: "4",
            text: "Experiencing repeated or extreme exposure to aversive details of the traumatic event(s) (e.g., first responders collecting human remains; police officers repeatedly exposed to details of child abuse).",
            note:
              "Note: Criterion A4 does not apply to exposure through electronic media, television, movies, or pictures, unless this exposure is work related."
          }
        ]
      },
      {
        code: "B",
        text: "Presence of one (or more) of the following intrusion symptoms associated with the traumatic event(s), beginning after the traumatic event(s) occurred:",
        sub_criteria: [
          {
            code: "1",
            text: "Recurrent, involuntary, and intrusive distressing memories of the traumatic event(s).",
            note:
              "Note: In children older than 6 years, repetitive play may occur in which themes or aspects of the traumatic event(s) are expressed."
          },
          {
            code: "2",
            text: "Recurrent distressing dreams in which the content and/or affect of the dream are related to the traumatic event(s).",
            note:
              "Note: In children, there may be frightening dreams without recognizable content."
          },
          {
            code: "3",
            text: "Dissociative reactions (e.g., flashbacks) in which the individual feels or acts as if the traumatic event(s) were recurring. (Such reactions may occur on a continuum, with the most extreme expression being a complete loss of awareness of present surroundings.)",
            note: "Note: In children, trauma-specific reenactment may occur in play."
          },
          {
            code: "4",
            text: "Intense or prolonged psychological distress at exposure to internal or external cues that symbolize or resemble an aspect of the traumatic event(s)."
          },
          {
            code: "5",
            text: "Marked physiological reactions to internal or external cues that symbolize or resemble an aspect of the traumatic event(s)."
          }
        ]
      },
      {
        code: "C",
        text: "Persistent avoidance of stimuli associated with the traumatic event(s), beginning after the traumatic event(s) occurred, as evidenced by one or both of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Avoidance of or efforts to avoid distressing memories, thoughts, or feelings about or closely associated with the traumatic event(s)."
          },
          {
            code: "2",
            text: "Avoidance of or efforts to avoid external reminders (people, places, conversations, activities, objects, situations) that arouse distressing memories, thoughts, or feelings about or closely associated with the traumatic event(s)."
          }
        ]
      },
      {
        code: "D",
        text: "Negative alterations in cognitions and mood associated with the traumatic event(s), beginning or worsening after the traumatic event(s) occurred, as evidenced by two (or more) of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Inability to remember an important aspect of the traumatic event(s) (typically due to dissociative amnesia and not to other factors such as head injury, alcohol, or drugs)."
          },
          {
            code: "2",
            text: "Persistent and exaggerated negative beliefs or expectations about oneself, others, or the world (e.g., “I am bad,” “No one can be trusted,” “The world is completely dangerous,” “My whole nervous system is permanently ruined”)."
          },
          {
            code: "3",
            text: "Persistent, distorted cognitions about the cause or consequences of the traumatic event(s) that lead the individual to blame himself/herself or others."
          },
          {
            code: "4",
            text: "Persistent negative emotional state (e.g., fear, horror, anger, guilt, or shame)."
          },
          { code: "5", text: "Markedly diminished interest or participation in significant activities." },
          { code: "6", text: "Feelings of detachment or estrangement from others." },
          {
            code: "7",
            text: "Persistent inability to experience positive emotions (e.g., inability to experience happiness, satisfaction, or loving feelings)."
          }
        ]
      },
      {
        code: "E",
        text: "Marked alterations in arousal and reactivity associated with the traumatic event(s), beginning or worsening after the traumatic event(s) occurred, as evidenced by two (or more) of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Irritable behavior and angry outbursts (with little or no provocation) typically expressed as verbal or physical aggression toward people or objects."
          },
          { code: "2", text: "Reckless or self-destructive behavior." },
          { code: "3", text: "Hypervigilance." },
          { code: "4", text: "Exaggerated startle response." },
          { code: "5", text: "Problems with concentration." },
          {
            code: "6",
            text: "Sleep disturbance (e.g., difficulty falling or staying asleep or restless sleep)."
          }
        ]
      },
      { code: "F", text: "Duration of the disturbance (Criteria B, C, D, and E) is more than 1 month." },
      {
        code: "G",
        text: "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "H",
        text: "The disturbance is not attributable to the physiological effects of a substance (e.g., medication, alcohol) or another medical condition."
      }
    ],
    specifiers: [
      {
        name: "Subtype",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With dissociative symptoms",
            description:
              "The individual’s symptoms meet the criteria for posttraumatic stress disorder, and in addition, in response to the stressor, the individual experiences persistent or recurrent symptoms of either of the following:",
            details: {
              Depersonalization:
                "Persistent or recurrent experiences of feeling detached from, and as if one were an outside observer of, one’s mental processes or body (e.g., feeling as though one were in a dream; feeling a sense of unreality of self or body or of time moving slowly).",
              Derealization:
                "Persistent or recurrent experiences of unreality of surroundings (e.g., the world around the individual is experienced as unreal, dreamlike, distant, or distorted).",
              Note:
                "To use this subtype, the dissociative symptoms must not be attributable to the physiological effects of a substance (e.g., blackouts, behavior during alcohol intoxication) or another medical condition (e.g., complex partial seizures)."
            }
          }
        ]
      },
      {
        name: "Expression",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With delayed expression",
            description:
              "If the full diagnostic criteria are not met until at least 6 months after the event (although the onset and expression of some symptoms may be immediate)."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Posttraumatic Stress Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Posttraumatic Stress Disorder in Children 6 Years and Younger": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full preschool PTSD criteria wording, including the spontaneous-play note, the dream-content note, the full dissociative-reaction sentence, the two-part Criterion C structure, and the substance/medical-condition examples.",
        "Pointed the child entry at its dedicated criteria pages while sharing the DSM’s common PTSD narrative, differential, and comorbidity sections that explicitly discuss the younger-than-6 presentation."
      ]
    },
    source: {
      titlePages: [458],
      sectionPages: {
        criteria: [458, 459, 460],
        diagnosticFeatures: [460, 461, 462, 463, 464],
        associatedFeatures: [464],
        prevalence: [464, 465],
        developmentAndCourse: [464, 465],
        riskAndPrognosticFactors: [466, 467],
        cultureRelatedDiagnosticIssues: [467, 468],
        sexAndGenderRelatedDiagnosticIssues: [468],
        associationWithSuicidalThoughtsOrBehavior: [468],
        functionalConsequencesOfPosttraumaticStressDisorder: [468],
        differentialDiagnosis: [468, 469, 470],
        comorbidity: [470, 471]
      }
    },
    criteria: [
      {
        code: "A",
        text: "In children 6 years and younger, exposure to actual or threatened death, serious injury, or sexual violence in one (or more) of the following ways:",
        sub_criteria: [
          { code: "1", text: "Directly experiencing the traumatic event(s)." },
          {
            code: "2",
            text: "Witnessing, in person, the event(s) as it occurred to others, especially primary caregivers."
          },
          {
            code: "3",
            text: "Learning that the traumatic event(s) occurred to a parent or caregiving figure."
          }
        ]
      },
      {
        code: "B",
        text: "Presence of one (or more) of the following intrusion symptoms associated with the traumatic event(s), beginning after the traumatic event(s) occurred:",
        sub_criteria: [
          {
            code: "1",
            text: "Recurrent, involuntary, and intrusive distressing memories of the traumatic event(s).",
            note:
              "Note: Spontaneous and intrusive memories may not necessarily appear distressing and may be expressed as play reenactment."
          },
          {
            code: "2",
            text: "Recurrent distressing dreams in which the content and/or affect of the dream are related to the traumatic event(s).",
            note:
              "Note: It may not be possible to ascertain that the frightening content is related to the traumatic event."
          },
          {
            code: "3",
            text: "Dissociative reactions (e.g., flashbacks) in which the child feels or acts as if the traumatic event(s) were recurring. (Such reactions may occur on a continuum, with the most extreme expression being a complete loss of awareness of present surroundings.) Such trauma-specific reenactment may occur in play."
          },
          {
            code: "4",
            text: "Intense or prolonged psychological distress at exposure to internal or external cues that symbolize or resemble an aspect of the traumatic event(s)."
          },
          { code: "5", text: "Marked physiological reactions to reminders of the traumatic event(s)." }
        ]
      },
      {
        code: "C",
        text: "One (or more) of the following symptoms, representing either persistent avoidance of stimuli associated with the traumatic event(s) or negative alterations in cognitions and mood associated with the traumatic event(s), must be present, beginning after the event(s) or worsening after the event(s):",
        sub_categories: [
          {
            name: "Persistent Avoidance of Stimuli",
            items: [
              {
                code: "1",
                text: "Avoidance of or efforts to avoid activities, places, or physical reminders that arouse recollections of the traumatic event(s)."
              },
              {
                code: "2",
                text: "Avoidance of or efforts to avoid people, conversations, or interpersonal situations that arouse recollections of the traumatic event(s)."
              }
            ]
          },
          {
            name: "Negative Alterations in Cognitions and Mood",
            items: [
              {
                code: "3",
                text: "Substantially increased frequency of negative emotional states (e.g., fear, guilt, sadness, shame, confusion)."
              },
              {
                code: "4",
                text: "Markedly diminished interest or participation in significant activities, including constriction of play."
              },
              { code: "5", text: "Socially withdrawn behavior." },
              { code: "6", text: "Persistent reduction in expression of positive emotions." }
            ]
          }
        ]
      },
      {
        code: "D",
        text: "Alterations in arousal and reactivity associated with the traumatic event(s), beginning or worsening after the traumatic event(s) occurred, as evidenced by two (or more) of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Irritable behavior and angry outbursts (with little or no provocation) typically expressed as verbal or physical aggression toward people or objects (including extreme temper tantrums)."
          },
          { code: "2", text: "Hypervigilance." },
          { code: "3", text: "Exaggerated startle response." },
          { code: "4", text: "Problems with concentration." },
          {
            code: "5",
            text: "Sleep disturbance (e.g., difficulty falling or staying asleep or restless sleep)."
          }
        ]
      },
      { code: "E", text: "The duration of the disturbance is more than 1 month." },
      {
        code: "F",
        text: "The disturbance causes clinically significant distress or impairment in relationships with parents, siblings, peers, or other caregivers or with school behavior."
      },
      {
        code: "G",
        text: "The disturbance is not attributable to the physiological effects of a substance (e.g., medication or alcohol) or another medical condition."
      }
    ],
    specifiers: [
      {
        name: "Subtype",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With dissociative symptoms",
            description:
              "The individual’s symptoms meet the criteria for posttraumatic stress disorder, and the individual experiences persistent or recurrent symptoms of either of the following:",
            details: {
              Depersonalization:
                "Persistent or recurrent experiences of feeling detached from, and as if one were an outside observer of, one’s mental processes or body (e.g., feeling as though one were in a dream; feeling a sense of unreality of self or body or of time moving slowly).",
              Derealization:
                "Persistent or recurrent experiences of unreality of surroundings (e.g., the world around the individual is experienced as unreal, dreamlike, distant, or distorted).",
              Note:
                "To use this subtype, the dissociative symptoms must not be attributable to the physiological effects of a substance (e.g., blackouts) or another medical condition (e.g., complex partial seizures)."
            }
          }
        ]
      },
      {
        name: "Expression",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "With delayed expression",
            description:
              "If the full diagnostic criteria are not met until at least 6 months after the event (although the onset and expression of some symptoms may be immediate)."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Posttraumatic Stress Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Reactive Attachment Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the criterion wording for the caregiving-causation clause and restored the dedicated associated-features, culture, functional-consequences, differential, and comorbidity pages.",
        "Expanded the page map so reactive attachment disorder no longer inherits disinhibited social engagement disorder narrative in the right panel."
      ]
    },
    source: {
      titlePages: [448],
      sectionPages: {
        criteria: [448, 449],
        diagnosticFeatures: [449, 450],
        associatedFeatures: [450],
        prevalence: [450],
        developmentAndCourse: [450],
        riskAndPrognosticFactors: [450],
        cultureRelatedDiagnosticIssues: [451],
        functionalConsequencesOfReactiveAttachmentDisorder: [451],
        differentialDiagnosis: [451, 452],
        comorbidity: [452]
      }
    },
    criteria: [
      {
        code: "A",
        text: "A consistent pattern of inhibited, emotionally withdrawn behavior toward adult caregivers, manifested by both of the following:",
        sub_criteria: [
          { code: "1", text: "The child rarely or minimally seeks comfort when distressed." },
          { code: "2", text: "The child rarely or minimally responds to comfort when distressed." }
        ]
      },
      {
        code: "B",
        text: "A persistent social and emotional disturbance characterized by at least two of the following:",
        sub_criteria: [
          { code: "1", text: "Minimal social and emotional responsiveness to others." },
          { code: "2", text: "Limited positive affect." },
          {
            code: "3",
            text: "Episodes of unexplained irritability, sadness, or fearfulness that are evident even during nonthreatening interactions with adult caregivers."
          }
        ]
      },
      {
        code: "C",
        text: "The child has experienced a pattern of extremes of insufficient care as evidenced by at least one of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Social neglect or deprivation in the form of persistent lack of having basic emotional needs for comfort, stimulation, and affection met by caregiving adults."
          },
          {
            code: "2",
            text: "Repeated changes of primary caregivers that limit opportunities to form stable attachments (e.g., frequent changes in foster care)."
          },
          {
            code: "3",
            text: "Rearing in unusual settings that severely limit opportunities to form selective attachments (e.g., institutions with high child-to-caregiver ratios)."
          }
        ]
      },
      {
        code: "D",
        text: "The care in Criterion C is presumed to be responsible for the disturbed behavior in Criterion A (e.g., the disturbances in Criterion A began following the lack of adequate care in Criterion C)."
      },
      { code: "E", text: "The criteria are not met for autism spectrum disorder." },
      { code: "F", text: "The disturbance is evident before age 5 years." },
      { code: "G", text: "The child has a developmental age of at least 9 months." }
    ],
    specifiers: [
      {
        name: "Persistence",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [{ name: "Persistent", description: "The disorder has been present for more than 12 months." }]
      },
      {
        name: "Severity",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "Severe",
            description:
              "Reactive attachment disorder is specified as severe when a child exhibits all symptoms of the disorder, with each symptom manifesting at relatively high levels."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences of Reactive Attachment Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Disinhibited Social Engagement Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Corrected the caregiving-causation criterion wording and restored the dedicated associated-features, culture, functional-consequences, differential, and comorbidity sections.",
        "Expanded the source-page map so disinhibited social engagement disorder no longer inherits neighboring PTSD material in the right panel."
      ]
    },
    source: {
      titlePages: [452],
      sectionPages: {
        criteria: [452, 453],
        diagnosticFeatures: [453],
        associatedFeatures: [453, 454],
        prevalence: [453, 454],
        developmentAndCourse: [454, 455],
        riskAndPrognosticFactors: [454, 455],
        cultureRelatedDiagnosticIssues: [455],
        functionalConsequencesOfDisinhibitedSocialEngagementDisorder: [455],
        differentialDiagnosis: [455],
        comorbidity: [455]
      }
    },
    criteria: [
      {
        code: "A",
        text: "A pattern of behavior in which a child actively approaches and interacts with unfamiliar adults and exhibits at least two of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Reduced or absent reticence in approaching and interacting with unfamiliar adults."
          },
          {
            code: "2",
            text: "Overly familiar verbal or physical behavior (that is not consistent with culturally sanctioned and with age-appropriate social boundaries)."
          },
          {
            code: "3",
            text: "Diminished or absent checking back with adult caregiver after venturing away, even in unfamiliar settings."
          },
          { code: "4", text: "Willingness to go off with an unfamiliar adult with minimal or no hesitation." }
        ]
      },
      {
        code: "B",
        text: "The behaviors in Criterion A are not limited to impulsivity (as in ADHD) but include socially disinhibited behavior."
      },
      {
        code: "C",
        text: "The child has experienced a pattern of extremes of insufficient care as evidenced by at least one of the following:",
        sub_criteria: [
          {
            code: "1",
            text: "Social neglect or deprivation in the form of persistent lack of having basic emotional needs for comfort, stimulation, and affection met by caregiving adults."
          },
          {
            code: "2",
            text: "Repeated changes of primary caregivers that limit opportunities to form stable attachments (e.g., frequent changes in foster care)."
          },
          {
            code: "3",
            text: "Rearing in unusual settings that severely limit opportunities to form selective attachments (e.g., institutions with high child-to-caregiver ratios)."
          }
        ]
      },
      {
        code: "D",
        text: "The care in Criterion C is presumed to be responsible for the disturbed behavior in Criterion A (e.g., the disturbances in Criterion A began following the pathogenic care in Criterion C)."
      },
      { code: "E", text: "The child has a developmental age of at least 9 months." }
    ],
    specifiers: [
      {
        name: "Persistence",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [{ name: "Persistent", description: "The disorder has been present for more than 12 months." }]
      },
      {
        name: "Severity",
        description: "",
        selectionType: "boolean",
        allowsEmpty: true,
        options: [
          {
            name: "Severe",
            description:
              "Disinhibited social engagement disorder is specified as severe when the child exhibits all symptoms of the disorder, with each symptom manifesting at relatively high levels."
          }
        ]
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences of Disinhibited Social Engagement Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Acute Stress Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM-5-TR acute stress disorder criteria wording, including the PTSD-linked exposure clause, the five symptom-category structure, the child notes, and the full duration/exclusion language.",
        "Expanded the source-page map to the dedicated associated-features, risk, culture, sex-and-gender, functional-consequences, and differential pages while clearing the inherited PTSD comorbidity spill."
      ]
    },
    source: {
      titlePages: [470],
      sectionPages: {
        criteria: [470, 471, 472],
        diagnosticFeatures: [472, 473],
        associatedFeatures: [473, 474],
        prevalence: [474],
        developmentAndCourse: [474, 475],
        riskAndPrognosticFactors: [475],
        cultureRelatedDiagnosticIssues: [475],
        sexAndGenderRelatedDiagnosticIssues: [475, 476],
        functionalConsequencesOfAcuteStressDisorder: [476],
        differentialDiagnosis: [476, 477]
      }
    },
    criteria: [
      {
        code: "A",
        text: "Exposure to actual or threatened death, serious injury, or sexual violence in one (or more) of the following ways:",
        sub_criteria: [
          { code: "1", text: "Directly experiencing the traumatic event(s)." },
          { code: "2", text: "Witnessing, in person, the event(s) as it occurred to others." },
          {
            code: "3",
            text: "Learning that the event(s) occurred to a close family member or close friend.",
            note:
              "Note: In cases of actual or threatened death of a family member or friend, the event(s) must have been violent or accidental."
          },
          {
            code: "4",
            text: "Experiencing repeated or extreme exposure to aversive details of the traumatic event(s) (e.g., first responders collecting human remains, police officers repeatedly exposed to details of child abuse).",
            note:
              "Note: This does not apply to exposure through electronic media, television, movies, or pictures, unless this exposure is work related."
          }
        ]
      },
      {
        code: "B",
        text: "Presence of nine (or more) of the following symptoms from any of the five categories of intrusion, negative mood, dissociation, avoidance, and arousal, beginning or worsening after the traumatic event(s) occurred:",
        sub_categories: [
          {
            name: "Intrusion Symptoms",
            items: [
              {
                code: "1",
                text: "Recurrent, involuntary, and intrusive distressing memories of the traumatic event(s).",
                note:
                  "Note: In children, repetitive play may occur in which themes or aspects of the traumatic event(s) are expressed."
              },
              {
                code: "2",
                text: "Recurrent distressing dreams in which the content and/or affect of the dream are related to the event(s).",
                note:
                  "Note: In children, there may be frightening dreams without recognizable content."
              },
              {
                code: "3",
                text: "Dissociative reactions (e.g., flashbacks) in which the individual feels or acts as if the traumatic event(s) were recurring. (Such reactions may occur on a continuum, with the most extreme expression being a complete loss of awareness of present surroundings.)",
                note: "Note: In children, trauma-specific reenactment may occur in play."
              },
              {
                code: "4",
                text: "Intense or prolonged psychological distress or marked physiological reactions in response to internal or external cues that symbolize or resemble an aspect of the traumatic event(s)."
              }
            ]
          },
          {
            name: "Negative Mood",
            items: [
              {
                code: "5",
                text: "Persistent inability to experience positive emotions (e.g., inability to experience happiness, satisfaction, or loving feelings)."
              }
            ]
          },
          {
            name: "Dissociative Symptoms",
            items: [
              {
                code: "6",
                text: "An altered sense of the reality of one’s surroundings or oneself (e.g., seeing oneself from another’s perspective, being in a daze, time slowing)."
              },
              {
                code: "7",
                text: "Inability to remember an important aspect of the traumatic event(s) (typically due to dissociative amnesia and not to other factors such as head injury, alcohol, or drugs)."
              }
            ]
          },
          {
            name: "Avoidance Symptoms",
            items: [
              {
                code: "8",
                text: "Efforts to avoid distressing memories, thoughts, or feelings about or closely associated with the traumatic event(s)."
              },
              {
                code: "9",
                text: "Efforts to avoid external reminders (people, places, conversations, activities, objects, situations) that arouse distressing memories, thoughts, or feelings about or closely associated with the traumatic event(s)."
              }
            ]
          },
          {
            name: "Arousal Symptoms",
            items: [
              {
                code: "10",
                text: "Sleep disturbance (e.g., difficulty falling or staying asleep, restless sleep)."
              },
              {
                code: "11",
                text: "Irritable behavior and angry outbursts (with little or no provocation), typically expressed as verbal or physical aggression toward people or objects."
              },
              { code: "12", text: "Hypervigilance." },
              { code: "13", text: "Problems with concentration." },
              { code: "14", text: "Exaggerated startle response." }
            ]
          }
        ]
      },
      {
        code: "C",
        text: "Duration of the disturbance (symptoms in Criterion B) is 3 days to 1 month after trauma exposure.",
        note:
          "Note: Symptoms typically begin immediately after the trauma, but persistence for at least 3 days and up to a month is needed to meet disorder criteria."
      },
      {
        code: "D",
        text: "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "E",
        text: "The disturbance is not attributable to the physiological effects of a substance (e.g., medication or alcohol) or another medical condition (e.g., mild traumatic brain injury) and is not better explained by brief psychotic disorder."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Functional Consequences of Acute Stress Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Prolonged Grief Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-07",
      notes: [
        "Restored the full DSM-5-TR prolonged grief disorder criteria wording, including the child/adolescent parentheticals, the full reintegration and numbness language, and the full exclusion criterion.",
        "Expanded the source-page map to the dedicated associated-features, risk, culture, sex-and-gender, suicidality, functional-consequences, differential, and comorbidity pages."
      ]
    },
    source: {
      titlePages: [481],
      sectionPages: {
        criteria: [481, 482],
        diagnosticFeatures: [482, 483],
        associatedFeatures: [483, 484],
        prevalence: [484],
        developmentAndCourse: [484, 485],
        riskAndPrognosticFactors: [485],
        cultureRelatedDiagnosticIssues: [485, 486],
        sexAndGenderRelatedDiagnosticIssues: [486],
        associationWithSuicidalThoughtsOrBehavior: [486],
        functionalConsequencesOfProlongedGriefDisorder: [486],
        differentialDiagnosis: [486, 487],
        comorbidity: [487, 488]
      }
    },
    criteria: [
      {
        code: "A",
        text: "The death, at least 12 months ago, of a person who was close to the bereaved individual (for children and adolescents, at least 6 months ago)."
      },
      {
        code: "B",
        text: "Since the death, the development of a persistent grief response characterized by one or both of the following symptoms, which have been present most days to a clinically significant degree. In addition, the symptom(s) has occurred nearly every day for at least the last month:",
        sub_criteria: [
          { code: "1", text: "Intense yearning/longing for the deceased person." },
          {
            code: "2",
            text: "Preoccupation with thoughts or memories of the deceased person (in children and adolescents, preoccupation may focus on the circumstances of the death)."
          }
        ]
      },
      {
        code: "C",
        text: "Since the death, at least three of the following symptoms have been present most days to a clinically significant degree. In addition, the symptoms have occurred nearly every day for at least the last month:",
        sub_criteria: [
          {
            code: "1",
            text: "Identity disruption (e.g., feeling as though part of oneself has died) since the death."
          },
          { code: "2", text: "Marked sense of disbelief about the death." },
          {
            code: "3",
            text: "Avoidance of reminders that the person is dead (in children and adolescents, may be characterized by efforts to avoid reminders)."
          },
          {
            code: "4",
            text: "Intense emotional pain (e.g., anger, bitterness, sorrow) related to the death."
          },
          {
            code: "5",
            text: "Difficulty reintegrating into one’s relationships and activities after the death (e.g., problems engaging with friends, pursuing interests, or planning for the future)."
          },
          {
            code: "6",
            text: "Emotional numbness (absence or marked reduction of emotional experience) as a result of the death."
          },
          { code: "7", text: "Feeling that life is meaningless as a result of the death." },
          { code: "8", text: "Intense loneliness as a result of the death." }
        ]
      },
      {
        code: "D",
        text: "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
      },
      {
        code: "E",
        text: "The duration and severity of the bereavement reaction clearly exceed expected social, cultural, or religious norms for the individual’s culture and context."
      },
      {
        code: "F",
        text: "The symptoms are not better explained by another mental disorder, such as major depressive disorder or posttraumatic stress disorder, and are not attributable to the physiological effects of a substance (e.g., medication, alcohol) or another medical condition."
      }
    ],
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences of Prolonged Grief Disorder" }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Adjustment Disorders": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Moved the DSM subtype choice into an explicit single-choice specifier group instead of a generic fallback recording-option input.",
        "Retained the acute versus persistent duration specifier as an independent optional DSM specifier while letting the subtype drive ICD-10-CM resolution directly."
      ]
    },
    specifiers: [
      {
        name: "Subtype",
        selectionType: "single",
        options: [
          { name: "With depressed mood" },
          { name: "With anxiety" },
          { name: "With mixed anxiety and depressed mood" },
          { name: "With disturbance of conduct" },
          { name: "With mixed disturbance of emotions and conduct" },
          { name: "Unspecified" }
        ]
      },
      {
        name: "Duration",
        selectionType: "single",
        allowsEmpty: true,
        options: [{ name: "Acute" }, { name: "Persistent (chronic)" }]
      }
    ]
  },
  "Trauma- and Stressor-Related Disorders::Other Specified Trauma- and Stressor-Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F43.8 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Expanded the placeholder summary with the DSM example set for delayed-onset adjustment-like presentations, prolonged adjustment-like presentations, persistent subthreshold PTSD-like responses, and culture-related syndromes."
      ]
    },
    source: {
      titlePages: [487, 488],
      sectionPages: {
        description: [488],
        comorbidity: [487]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Trauma- and Stressor-Related Disorders::Unspecified Trauma- and Stressor-Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F43.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for a more specific trauma- and stressor-related disorder are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [488, 489],
      sectionPages: {
        description: [488, 489]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Somatic Symptom and Related Disorders::Somatic Symptom Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F45.1 code, the with predominant pain and persistent-course specifiers, and the current-severity gradations.",
        "Replaced contaminated within-chapter page maps and heading-only differential text with DSM-grounded summaries, including the comorbidity page that sits immediately before the illness-anxiety entry."
      ]
    },
    source: {
      titlePages: [518],
      sectionPages: {
        criteria: [518, 519],
        specifiers: [518, 519],
        diagnosticFeatures: [519, 520],
        associatedFeatures: [520],
        prevalence: [520, 521],
        developmentAndCourse: [521],
        riskAndPrognosticFactors: [521, 522],
        cultureRelatedDiagnosticIssues: [522],
        sexAndGenderRelatedDiagnosticIssues: [522, 523],
        associationWithSuicidalThoughtsOrBehavior: [523],
        functionalConsequences: [523],
        differentialDiagnosis: [523, 524],
        comorbidity: [525]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Somatic Symptom and Related Disorders::Illness Anxiety Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F45.21 code and the care-seeking versus care-avoidant subtype structure.",
        "Corrected the inherited page drift into later diagnoses and replaced heading-only differential text with a DSM-grounded summary."
      ]
    },
    source: {
      titlePages: [525],
      sectionPages: {
        criteria: [525, 526],
        specifiers: [525, 526],
        diagnosticFeatures: [526],
        associatedFeatures: [527],
        prevalence: [527],
        developmentAndCourse: [527],
        riskAndPrognosticFactors: [527, 528],
        cultureRelatedDiagnosticIssues: [528],
        functionalConsequences: [528],
        differentialDiagnosis: [528, 529],
        comorbidity: [529]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences" }
    ]
  },
  "Somatic Symptom and Related Disorders::Functional Neurological Symptom Disorder (Conversion Disorder)": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the symptom-type code selector and preserved the optional duration and stressor specifier groups while keeping the DSM-required symptom-type choice explicit.",
        "Corrected the source map so the entry no longer inherits illness-anxiety pages and replaced heading-only differential text with DSM-grounded clinical distinctions."
      ]
    },
    source: {
      titlePages: [529],
      sectionPages: {
        criteria: [529, 530],
        specifiers: [530],
        diagnosticFeatures: [530, 531],
        associatedFeatures: [531, 532],
        prevalence: [532],
        developmentAndCourse: [532],
        riskAndPrognosticFactors: [532, 533],
        cultureRelatedDiagnosticIssues: [533],
        sexAndGenderRelatedDiagnosticIssues: [533],
        associationWithSuicidalThoughtsOrBehavior: [533],
        functionalConsequences: [533],
        differentialDiagnosis: [533, 534],
        comorbidity: [534]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Somatic Symptom and Related Disorders::Psychological Factors Affecting Other Medical Conditions": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F54 code and the mild, moderate, severe, and extreme current-severity structure.",
        "Corrected the title and section pages from inherited neighboring diagnoses and added DSM-grounded differential and comorbidity guidance."
      ]
    },
    source: {
      titlePages: [534],
      sectionPages: {
        criteria: [534, 535],
        specifiers: [535],
        diagnosticFeatures: [535, 536],
        prevalence: [536],
        developmentAndCourse: [536],
        cultureRelatedDiagnosticIssues: [536],
        functionalConsequences: [536],
        differentialDiagnosis: [536, 537],
        comorbidity: [537]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Functional Consequences" }
    ]
  },
  "Somatic Symptom and Related Disorders::Factitious Disorder Imposed on Self": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F68.10 code and the single-episode versus recurrent-episodes specifier structure.",
        "Corrected the misleading shared recording-procedures panel text so the imposed-on-self entry no longer reads as if it were only about victim presentations."
      ]
    },
    source: {
      titlePages: [538],
      sectionPages: {
        criteria: [538],
        specifiers: [538],
        recordingProcedures: [538, 539],
        diagnosticFeatures: [539],
        associatedFeatures: [539],
        prevalence: [540],
        developmentAndCourse: [540],
        sexAndGenderRelatedDiagnosticIssues: [540],
        differentialDiagnosis: [540]
      }
    },
    recording: {
      mode: "dual-diagnosis-note",
      instructions: ["If deceptive presentation involves both self and another, both factitious disorder diagnoses may be recorded."],
      fields: []
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Sex- and Gender-Related Diagnostic Issues" }
    ]
  },
  "Somatic Symptom and Related Disorders::Factitious Disorder Imposed on Another (Previously Factitious Disorder by Proxy)": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F68.A code and the single-episode versus recurrent-episodes specifier structure.",
        "Corrected the shared source map so the right panel reflects the perpetrator-focused recording rule, the victim note, and the actual prevalence and differential pages."
      ]
    },
    source: {
      titlePages: [538],
      sectionPages: {
        criteria: [538],
        specifiers: [538],
        recordingProcedures: [538, 539],
        diagnosticFeatures: [539],
        associatedFeatures: [539],
        prevalence: [540],
        developmentAndCourse: [540],
        sexAndGenderRelatedDiagnosticIssues: [540],
        differentialDiagnosis: [540]
      }
    },
    recording: {
      mode: "dual-diagnosis-note",
      instructions: [
        "For factitious disorder imposed on another, the diagnosis applies to the perpetrator, not the victim.",
        "If deceptive presentation involves both self and another, both factitious disorder diagnoses may be recorded."
      ],
      fields: []
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Sex- and Gender-Related Diagnostic Issues" }
    ]
  },
  "Somatic Symptom and Related Disorders::Other Specified Somatic Symptom and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F45.8 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Refined the description to the DSM example set for brief somatic symptom disorder, brief illness anxiety disorder, illness anxiety disorder without excessive health-related behaviors or maladaptive avoidance, and pseudocyesis."
      ]
    },
    source: {
      titlePages: [541],
      sectionPages: {
        description: [541]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Somatic Symptom and Related Disorders::Unspecified Somatic Symptom and Related Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F45.9 code and the DSM caution that the unspecified diagnosis should be used only in decidedly unusual situations where there is insufficient information to make a more specific diagnosis."
      ]
    },
    source: {
      titlePages: [541, 542],
      sectionPages: {
        description: [541, 542]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Feeding and Eating Disorders::Pica": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with the DSM-5-TR age-based coding note that splits Pica between F98.3 in children and F50.89 in adults.",
        "Retained an explicit age-group selector because the DSM code cannot be derived deterministically without guessing age from unrelated fields, and corrected the source map so the right panel stays on the Pica pages."
      ]
    },
    source: {
      titlePages: [544],
      sectionPages: {
        criteria: [544, 545],
        specifiers: [545],
        diagnosticFeatures: [545],
        associatedFeatures: [545],
        prevalence: [545],
        developmentAndCourse: [546],
        riskAndPrognosticFactors: [546],
        cultureRelatedDiagnosticIssues: [546],
        sexAndGenderRelatedDiagnosticIssues: [546],
        diagnosticMarkers: [546],
        functionalConsequencesOfPica: [546],
        differentialDiagnosis: [546, 547],
        comorbidity: [547]
      }
    },
    coding: {
      strategy: "option-map",
      requireSelection: true,
      inputs: [
        {
          id: "feeding-and-eating-disorders-pica-coding-input-age-group",
          name: "Age Group",
          description: "Select the DSM coding age group because pica uses different ICD-10-CM codes in children and in adults.",
          includeInDiagnosisLabel: false,
          allowsEmpty: true,
          selectionType: "single",
          options: [
            {
              id: "feeding-and-eating-disorders-pica-coding-input-age-group-option-0-in-children",
              name: "in children",
              description: "ICD-10-CM: F98.3",
              details: [],
              criteria: []
            },
            {
              id: "feeding-and-eating-disorders-pica-coding-input-age-group-option-1-in-adults",
              name: "in adults",
              description: "ICD-10-CM: F50.89",
              details: [],
              criteria: []
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "feeding-and-eating-disorders-pica-coding-input-age-group",
              option: "feeding-and-eating-disorders-pica-coding-input-age-group-option-0-in-children"
            }
          ],
          code: "F98.3"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "feeding-and-eating-disorders-pica-coding-input-age-group",
              option: "feeding-and-eating-disorders-pica-coding-input-age-group-option-1-in-adults"
            }
          ],
          code: "F50.89"
        }
      ],
      notes: [
        "The DSM-5-TR coding note splits pica between F98.3 in children and F50.89 in adults."
      ],
      additionalCodeRules: []
    }
  },
  "Feeding and Eating Disorders::Rumination Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F98.21 code and the requirement that recurrent regurgitation not be attributable to a gastrointestinal condition or another feeding and eating disorder.",
        "Corrected the section-page map so the rumination entry points to its own DSM pages instead of inherited neighboring headings."
      ]
    },
    source: {
      titlePages: [547],
      sectionPages: {
        criteria: [547, 548],
        specifiers: [548],
        diagnosticFeatures: [548],
        associatedFeatures: [548],
        prevalence: [548],
        developmentAndCourse: [549],
        riskAndPrognosticFactors: [549],
        functionalConsequencesOfRuminationDisorder: [549],
        differentialDiagnosis: [549],
        comorbidity: [549]
      }
    }
  },
  "Feeding and Eating Disorders::Avoidant/Restrictive Food Intake Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F50.82 code and the DSM requirement that restriction cause weight, nutritional, supplement-dependence, or psychosocial consequences without body-image disturbance.",
        "Corrected the page map so the entry's chapter references stay within the ARFID section rather than borrowing later feeding-disorder pages."
      ]
    },
    source: {
      titlePages: [550],
      sectionPages: {
        criteria: [550],
        specifiers: [550],
        diagnosticFeatures: [550, 551],
        associatedFeatures: [551],
        prevalence: [552],
        developmentAndCourse: [552],
        riskAndPrognosticFactors: [552],
        cultureRelatedDiagnosticIssues: [553],
        sexAndGenderRelatedDiagnosticIssues: [553],
        functionalConsequencesOfAvoidantRestrictiveFoodIntakeDisorder: [553],
        differentialDiagnosis: [553, 554, 555],
        comorbidity: [556]
      }
    }
  },
  "Feeding and Eating Disorders::Anorexia Nervosa": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the DSM subtype split between F50.01 restricting type and F50.02 binge-eating/purging type.",
        "Corrected the source-page map so the anorexia entry traces the intended diagnostic, risk, and suicidality sections without leaking into later chapter entries."
      ]
    },
    source: {
      titlePages: [556],
      sectionPages: {
        criteria: [556],
        specifiers: [556, 557],
        subtypes: [557],
        diagnosticFeatures: [557, 558],
        associatedFeatures: [559],
        prevalence: [560],
        developmentAndCourse: [560],
        riskAndPrognosticFactors: [560, 561],
        cultureRelatedDiagnosticIssues: [561],
        diagnosticMarkers: [561],
        associationWithSuicidalThoughtsOrBehavior: [562],
        functionalConsequencesOfAnorexiaNervosa: [562],
        differentialDiagnosis: [562, 563],
        comorbidity: [563, 564]
      }
    }
  },
  "Feeding and Eating Disorders::Bulimia Nervosa": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F50.2 code and preserved the DSM remission and severity specifiers.",
        "Corrected the chapter source map so the bulimia entry no longer inherits anorexia or binge-eating page references."
      ]
    },
    source: {
      titlePages: [564],
      sectionPages: {
        criteria: [564],
        specifiers: [564],
        diagnosticFeatures: [565],
        associatedFeatures: [566],
        prevalence: [567],
        developmentAndCourse: [567],
        riskAndPrognosticFactors: [567],
        cultureRelatedDiagnosticIssues: [568],
        sexAndGenderRelatedDiagnosticIssues: [568],
        diagnosticMarkers: [568],
        associationWithSuicidalThoughtsOrBehavior: [569],
        functionalConsequencesOfBulimiaNervosa: [569],
        differentialDiagnosis: [569],
        comorbidity: [569, 570]
      }
    }
  },
  "Feeding and Eating Disorders::Binge-Eating Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F50.81 code and preserved the DSM remission and severity specifiers for binge-eating disorder.",
        "Corrected the source-page map so the entry's differential and comorbidity references stay within the binge-eating section and its immediate continuation."
      ]
    },
    source: {
      titlePages: [570],
      sectionPages: {
        criteria: [570],
        specifiers: [570, 571],
        diagnosticFeatures: [571],
        associatedFeatures: [572],
        prevalence: [572],
        developmentAndCourse: [572],
        riskAndPrognosticFactors: [573],
        cultureRelatedDiagnosticIssues: [573],
        associationWithSuicidalThoughtsOrBehavior: [573],
        functionalConsequencesOfBingeEatingDisorder: [573],
        differentialDiagnosis: [573, 574],
        comorbidity: [574]
      }
    }
  },
  "Feeding and Eating Disorders::Other Specified Feeding or Eating Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F50.89 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Confirmed the DSM example set for atypical anorexia nervosa, low-frequency or limited-duration bulimia nervosa and binge-eating disorder, purging disorder, and night eating syndrome."
      ]
    },
    source: {
      titlePages: [574, 575],
      sectionPages: {
        description: [574, 575]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Feeding and Eating Disorders::Unspecified Feeding or Eating Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F50.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for a more specific feeding and eating disorder are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [575],
      sectionPages: {
        description: [575]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Sexual Dysfunctions::Substance/Medication-Induced Sexual Dysfunction": {
    codes: buildSubstanceCodeDisplayRows(SEXUAL_DYSFUNCTION_SUBSTANCE_CODE_ROWS),
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-03",
      notes: [
        "Replaced the slash-combined recording-option codes with the DSM-5-TR substance-by-substance sexual-dysfunction table.",
        "Retained the existing onset and severity specifiers while moving code selection onto the audited substance/use-disorder grid."
      ]
    },
    coding: buildStructuredSubstanceInducedCoding({
      substanceGroupId: SEXUAL_DYSFUNCTION_SUBSTANCE_TYPE_GROUP_ID,
      useStatusGroupId: SEXUAL_DYSFUNCTION_USE_DISORDER_STATUS_GROUP_ID,
      substanceTypeOptions: SEXUAL_DYSFUNCTION_SUBSTANCE_CODE_ROWS.map(([name]) => name),
      codeRows: SEXUAL_DYSFUNCTION_SUBSTANCE_CODE_ROWS
    })
  },
  "Gender Dysphoria::Gender Dysphoria in Children": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F64.2 code and the child-specific threshold of at least six Criterion A features, one of which must be the strong desire or insistence criterion.",
        "Reviewed the shared chapter pages so the child entry now points to the correct diagnostic-feature, course, suicidality, and differential-diagnosis sections."
      ]
    },
    source: {
      titlePages: [714],
      sectionPages: {
        criteria: [714, 715],
        specifiers: [715, 716],
        diagnosticFeatures: [716, 717],
        associatedFeatures: [717, 718],
        prevalence: [718],
        developmentAndCourse: [718, 719, 720],
        riskAndPrognosticFactors: [720, 721],
        cultureRelatedDiagnosticIssues: [721, 722],
        sexAndGenderRelatedDiagnosticIssues: [722],
        associationWithSuicidalThoughtsOrBehavior: [722],
        functionalConsequences: [722, 723],
        differentialDiagnosis: [723, 724],
        comorbidity: [724]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Gender Dysphoria::Gender Dysphoria in Adolescents and Adults": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F64.0 code and preserved the DSM distinction between the disorder/difference-of-sex-development specifier and the posttransition specifier.",
        "Reviewed the shared chapter pages so the adolescent/adult entry now points to the correct diagnostic-feature, course, suicidality, and differential-diagnosis sections."
      ]
    },
    source: {
      titlePages: [715],
      sectionPages: {
        criteria: [715],
        specifiers: [715, 716],
        diagnosticFeatures: [716, 717, 718],
        associatedFeatures: [717, 718],
        prevalence: [718],
        developmentAndCourse: [718, 719, 720],
        riskAndPrognosticFactors: [720, 721],
        cultureRelatedDiagnosticIssues: [721, 722],
        sexAndGenderRelatedDiagnosticIssues: [722],
        associationWithSuicidalThoughtsOrBehavior: [722],
        functionalConsequences: [722, 723],
        differentialDiagnosis: [723, 724],
        comorbidity: [724]
      }
    },
    sections: [
      { title: "Diagnostic Features" },
      { title: "Associated Features" },
      { title: "Prevalence" },
      { title: "Development and Course" },
      { title: "Risk and Prognostic Factors" },
      { title: "Culture-Related Diagnostic Issues" },
      { title: "Sex- and Gender-Related Diagnostic Issues" },
      { title: "Association With Suicidal Thoughts or Behavior" },
      { title: "Functional Consequences" }
    ]
  },
  "Gender Dysphoria::Other Specified Gender Dysphoria": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F64.8 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Confirmed the DSM example of brief gender dysphoria when the presentation otherwise meets full criteria but duration is less than 6 months."
      ]
    },
    source: {
      titlePages: [724],
      sectionPages: {
        description: [724]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Gender Dysphoria::Unspecified Gender Dysphoria": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F64.9 code and the DSM use of the unspecified diagnosis when the clinician does not specify why criteria for gender dysphoria are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [724, 725],
      sectionPages: {
        description: [724, 725]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurocognitive Disorders::Major Neurocognitive Disorder": {
    codes: [
      { code: "F02.80", description: "Without behavioral disturbance" },
      { code: "F02.81", description: "With behavioral disturbance" },
      { code: "F01.50", description: "Major vascular neurocognitive disorder without behavioral disturbance" },
      { code: "F01.51", description: "Major vascular neurocognitive disorder with behavioral disturbance" },
      { code: "R41.9", description: "Unspecified neurocognitive disorder" },
      ...buildSubstanceCodeDisplayRows(MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS)
    ],
    coding: buildMajorNeurocognitiveCoding(),
    recording: {
      mode: "major-neurocognitive-etiology",
      instructions: [
        "Code based on medical or substance etiology. In most cases of major neurocognitive disorder, there is need for an additional code for the etiological medical condition, which must immediately precede the diagnostic code for major neurocognitive disorder, as noted in the coding table on pp. 682–683."
      ],
      fields: [
        {
          key: "etiological-medical-condition",
          label: "Etiological medical condition"
        },
        {
          key: "etiological-medical-condition-code",
          label: "Etiological medical condition code"
        },
        {
          key: "additional-etiology-codes",
          label: "Additional etiology code(s) for multiple etiologies"
        },
        {
          key: "comorbid-substance-use-disorder",
          label: "Comorbid substance use disorder (if present)"
        }
      ]
    }
  },
  "Neurocognitive Disorders::Mild Neurocognitive Disorder": {
    codes: [
      {
        code: "G31.84",
        description: "Specified non-substance etiology or multiple etiologies"
      },
      {
        code: "R41.9",
        description: "Unspecified etiology"
      },
      ...buildSubstanceCodeDisplayRows(MILD_NEUROCOGNITIVE_SUBSTANCE_CODE_ROWS)
    ],
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-05",
      notes: [
        "Replaced the generic recording-option picker with DSM-5-TR coding logic keyed first to etiological subtype, including the G31.84 versus R41.9 split and the substance-specific mild neurocognitive codes.",
        "Added DSM-grounded recording guidance so the diagnosis is recorded as due to the selected etiology or, for substance etiologies, in the substance-induced wording shown in the manual examples."
      ]
    },
    source: {
      titlePages: [917],
      sectionPages: {
        criteria: [918, 919],
        specifiers: [918, 919, 920, 921],
        recordingProcedures: [919, 920],
        diagnosticFeatures: [922, 923],
        prevalence: [923]
      }
    },
    coding: buildMildNeurocognitiveCoding(),
    recording: {
      mode: "neurocognitive-etiology",
      instructions: [
        "Record mild neurocognitive disorder due to the selected etiology, and record behavioral disturbance even though it is not coded.",
        "If the etiology is substance/medication use and a comorbid substance use disorder is present, record the substance use disorder first and then the substance-induced mild neurocognitive disorder."
      ],
      fields: [
        {
          key: "comorbid-substance-use-disorder",
          label: "Comorbid substance use disorder (if present)",
          placeholder: "e.g., mild alcohol use disorder"
        }
      ]
    },
    sections: [
      { title: "Recording Procedures" },
      { title: "Diagnostic Features" },
      { title: "Prevalence" }
    ]
  },
  "Neurocognitive Disorders::Other Specified Delirium": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual R41.0 code and the DSM instruction to record the diagnosis followed by the specific reason.",
        "Confirmed the DSM example of subsyndromal delirium for delirium-like presentations that fall short of full threshold."
      ]
    },
    source: {
      titlePages: [915],
      sectionPages: {
        description: [915]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurocognitive Disorders::Unspecified Delirium": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual R41.0 code and the DSM use of the unspecified diagnosis when the clinician does not specify why full delirium criteria are not met or when information is insufficient."
      ]
    },
    source: {
      titlePages: [915],
      sectionPages: {
        description: [915]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Neurocognitive Disorders::Unspecified Neurocognitive Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual R41.9 code and the DSM use of the unspecified diagnosis when a neurocognitive disorder presentation is clear but the precise etiology cannot yet be determined with sufficient certainty.",
        "Retained the coding note that presumed etiological medical-condition codes should not be added to the unspecified diagnosis."
      ]
    },
    source: {
      titlePages: [978],
      sectionPages: {
        description: [978]
      }
    },
    sections: [{ title: "Description" }]
  },
  "Elimination Disorders::Enuresis": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F98.0 code and the DSM subtype structure of nocturnal only, diurnal only, or nocturnal and diurnal.",
        "Corrected the subtype model so those DSM 'Specify whether' choices are captured as one mutually exclusive group."
      ]
    },
    specifiers: [
      {
        name: "Subtype",
        description: "Specify whether the enuresis presentation is nocturnal only, diurnal only, or both.",
        selectionType: "single",
        options: [
          {
            name: "Nocturnal only",
            description: "Passage of urine only during nighttime sleep."
          },
          {
            name: "Diurnal only",
            description: "Passage of urine during waking hours."
          },
          {
            name: "Nocturnal and diurnal",
            description: "A combination of the two subtypes above."
          }
        ]
      }
    ]
  },
  "Elimination Disorders::Encopresis": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F98.1 code and the DSM subtype split between with constipation and overflow incontinence versus without constipation and overflow incontinence.",
        "Corrected the subtype model so the DSM 'Specify whether' choice is represented as one mutually exclusive group instead of two independent booleans."
      ]
    },
    specifiers: [
      {
        name: "Subtype",
        description:
          "Specify whether the encopresis presentation includes constipation and overflow incontinence.",
        selectionType: "single",
        options: [
          {
            name: "With constipation and overflow incontinence",
            description: "There is evidence of constipation on physical examination or by history."
          },
          {
            name: "Without constipation and overflow incontinence",
            description: "There is no evidence of constipation on physical examination or by history."
          }
        ]
      }
    ]
  },
  "Elimination Disorders::Other Specified Elimination Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual coding note: use N39.498 for urinary symptoms and R15.9 for fecal symptoms.",
        "Confirmed that DSM-5-TR instructs recording the diagnosis with a specific reason appended."
      ]
    },
    source: {
      titlePages: [584],
      sectionPages: {
        description: [584]
      }
    },
    coding: {
      strategy: "option-map",
      requireSelection: true,
      inputs: [
        {
          id: "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option",
          name: "Symptom Type",
          description:
            "Select the exact DSM/ICD recording option when the residual elimination presentation is recorded with urinary or fecal symptoms.",
          selectionType: "single",
          options: [
            {
              id: "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option-option-0-with-urinary-symptoms",
              name: "with urinary symptoms",
              description: "ICD-10-CM: N39.498",
              details: [],
              criteria: []
            },
            {
              id: "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option-option-1-with-fecal-symptoms",
              name: "with fecal symptoms",
              description: "ICD-10-CM: R15.9",
              details: [],
              criteria: []
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option",
              option:
                "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option-option-0-with-urinary-symptoms"
            }
          ],
          code: "N39.498"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option",
              option:
                "elimination-disorders-other-specified-elimination-disorder-coding-input-recording-option-option-1-with-fecal-symptoms"
            }
          ],
          code: "R15.9"
        }
      ],
      notes: [
        "DSM-5-TR gives separate residual codes depending on whether the presentation is recorded with urinary or fecal symptoms."
      ],
      additionalCodeRules: []
    }
  },
  "Elimination Disorders::Unspecified Elimination Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual coding note: use R32 for urinary symptoms and R15.9 for fecal symptoms.",
        "Corrected the title and description page references so the unspecified entry points to the actual DSM text."
      ]
    },
    source: {
      titlePages: [584, 585],
      sectionPages: {
        description: [585]
      }
    },
    coding: {
      strategy: "option-map",
      requireSelection: true,
      inputs: [
        {
          id: "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option",
          name: "Symptom Type",
          description:
            "Select the exact DSM/ICD recording option when the residual elimination presentation is recorded with urinary or fecal symptoms.",
          selectionType: "single",
          options: [
            {
              id: "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option-option-0-with-urinary-symptoms",
              name: "with urinary symptoms",
              description: "ICD-10-CM: R32",
              details: [],
              criteria: []
            },
            {
              id: "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option-option-1-with-fecal-symptoms",
              name: "with fecal symptoms",
              description: "ICD-10-CM: R15.9",
              details: [],
              criteria: []
            }
          ]
        }
      ],
      rules: [
        {
          conditions: [
            {
              type: "selection",
              group: "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option",
              option:
                "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option-option-0-with-urinary-symptoms"
            }
          ],
          code: "R32"
        },
        {
          conditions: [
            {
              type: "selection",
              group: "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option",
              option:
                "elimination-disorders-unspecified-elimination-disorder-coding-input-recording-option-option-1-with-fecal-symptoms"
            }
          ],
          code: "R15.9"
        }
      ],
      notes: [
        "DSM-5-TR gives separate residual codes depending on whether the presentation is recorded with urinary or fecal symptoms."
      ],
      additionalCodeRules: []
    }
  },
  "Dissociative Disorders::Dissociative Identity Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the F44.81 code and corrected the chapter source map to the actual DSM dissociative identity disorder pages.",
        "The criteria pages and right-panel section page references were updated from a drifted index so the live app points back to the correct portions of the PDF."
      ]
    },
    source: {
      titlePages: [492],
      sectionPages: {
        criteria: [492, 493],
        diagnosticFeatures: [492, 494],
        associatedFeatures: [495],
        prevalence: [495],
        developmentAndCourse: [495, 496],
        riskAndPrognosticFactors: [496],
        cultureRelatedDiagnosticIssues: [497],
        sexAndGenderRelatedDiagnosticIssues: [497],
        associationWithSuicidalThoughtsOrBehavior: [497],
        functionalConsequencesOfDissociativeIdentityDisorder: [497, 498],
        differentialDiagnosis: [498, 499, 500]
      }
    }
  },
  "Dissociative Disorders::Dissociative Amnesia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the DSM coding note: F44.0 without dissociative fugue and F44.1 when the dissociative fugue specifier is present.",
        "Corrected the entry source pages from the wrong early-chapter location to the actual dissociative amnesia pages."
      ]
    },
    source: {
      titlePages: [501],
      sectionPages: {
        criteria: [501],
        specifiers: [501],
        diagnosticFeatures: [501, 502],
        associatedFeatures: [502],
        prevalence: [502, 503],
        developmentAndCourse: [503],
        riskAndPrognosticFactors: [503, 504],
        cultureRelatedDiagnosticIssues: [504],
        associationWithSuicidalThoughtsOrBehavior: [504],
        functionalConsequencesOfDissociativeAmnesia: [504, 505],
        differentialDiagnosis: [505, 506, 507],
        comorbidity: [507]
      }
    }
  },
  "Dissociative Disorders::Depersonalization/Derealization Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the fixed F48.1 code and corrected the source map to the actual depersonalization/derealization disorder pages.",
        "Added audited page refs for the functional consequences, differential diagnosis, and comorbidity sections that were previously missing or mispointed."
      ]
    },
    source: {
      titlePages: [508],
      sectionPages: {
        criteria: [508],
        diagnosticFeatures: [508, 509],
        associatedFeatures: [509],
        prevalence: [509],
        developmentAndCourse: [509, 510],
        riskAndPrognosticFactors: [510],
        cultureRelatedDiagnosticIssues: [510],
        functionalConsequencesOfDepersonalizationDerealizationDisorder: [511],
        differentialDiagnosis: [511, 512],
        comorbidity: [512]
      }
    }
  },
  "Dissociative Disorders::Other Specified Dissociative Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F44.89 code and that DSM-5-TR instructs recording the diagnosis with a specific reason appended.",
        "Corrected the title and description pages to the actual residual dissociative category pages."
      ]
    },
    source: {
      titlePages: [512, 513],
      sectionPages: {
        criteria: [],
        description: [513]
      }
    }
  },
  "Dissociative Disorders::Unspecified Dissociative Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed the residual F44.9 code and that this category is used when the clinician does not specify the reason.",
        "Corrected the source pages so the live app points to the actual unspecified dissociative disorder text."
      ]
    },
    source: {
      titlePages: [513, 514],
      sectionPages: {
        description: [514]
      }
    }
  },
  "Other Mental Disorders and Additional Codes::Other Specified Mental Disorder Due to Another Medical Condition": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "DSM-5-TR explicitly instructs that the etiological medical condition must be coded and listed first.",
        "The recorded diagnosis should also append the specific symptomatic manifestation."
      ]
    },
    source: {
      titlePages: [1065, 1066],
      sectionPages: {
        description: [1065, 1066],
        criteria: [1065, 1066]
      }
    }
  },
  "Other Mental Disorders and Additional Codes::Unspecified Mental Disorder Due to Another Medical Condition": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "DSM-5-TR explicitly instructs that the etiological medical condition must be coded and listed first.",
        "Unlike the other specified variant, this recording path does not append a specific symptomatic manifestation."
      ]
    },
    source: {
      titlePages: [1066, 1067],
      sectionPages: {
        description: [1066, 1067],
        criteria: [1066, 1067]
      }
    }
  },
  "Other Mental Disorders and Additional Codes::Other Specified Mental Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed as a residual F99 category that should be recorded with a specific reason appended."
      ]
    },
    source: {
      titlePages: [1067],
      sectionPages: {
        description: [1067],
        criteria: [1067]
      }
    }
  },
  "Other Mental Disorders and Additional Codes::Unspecified Mental Disorder": {
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed as the residual unspecified F99 category used when the clinician does not state the specific reason."
      ]
    },
    source: {
      titlePages: [1067],
      sectionPages: {
        description: [1067],
        criteria: [1067]
      }
    }
  },
  "Other Mental Disorders and Additional Codes::No Diagnosis or Condition": {
    kind: "additional-code",
    audit: {
      status: "reviewed",
      lastReviewed: "2026-07-02",
      notes: [
        "Confirmed as an additional Z code rather than a mental disorder diagnosis."
      ]
    },
    source: {
      titlePages: [1067],
      sectionPages: {
        description: [1067],
        criteria: [1067]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Medication-Induced Parkinsonism": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "DSM-5-TR explicitly states that the conditions in this chapter are not mental disorders, so this entry is modeled as a clinical-focus-condition rather than a diagnosis.",
        "The title block was confirmed to split coding between G21.11 for antipsychotic or other dopamine receptor blocking agents and G21.19 for other medications."
      ]
    },
    source: {
      titlePages: [1069],
      sectionPages: {
        diagnosticFeatures: [1069, 1070, 1071],
        associatedFeatures: [1070],
        prevalence: [1071],
        riskAndPrognosticFactors: [1071],
        differentialDiagnosis: [1071, 1072]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Neuroleptic Malignant Syndrome": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "DSM-5-TR places neuroleptic malignant syndrome in the medication-induced movement disorders chapter and states that chapter entries are not mental disorders.",
        "The single G21.0 code and the descriptive sections spanning pages 1072-1074 were reviewed against the PDF."
      ]
    },
    source: {
      titlePages: [1072],
      sectionPages: {
        diagnosticFeatures: [1072, 1073],
        prevalence: [1073],
        developmentAndCourse: [1073, 1074],
        riskAndPrognosticFactors: [1074],
        diagnosticMarkers: [1073],
        differentialDiagnosis: [1074]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Medication-Induced Acute Dystonia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition because DSM-5-TR identifies the chapter as a non-mental-disorder coding section.",
        "The G24.02 code and the acute dystonia narrative spanning pages 1074-1076 were confirmed."
      ]
    },
    source: {
      titlePages: [1074],
      sectionPages: {
        diagnosticFeatures: [1074, 1075],
        associatedFeatures: [1075],
        riskAndPrognosticFactors: [1075],
        differentialDiagnosis: [1075, 1076]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Medication-Induced Acute Akathisia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition because the DSM chapter explicitly states these entries are not mental disorders.",
        "The fixed G25.71 code and the prevalence/differential material on pages 1077-1078 were checked against the source."
      ]
    },
    source: {
      titlePages: [1076],
      sectionPages: {
        diagnosticFeatures: [1076, 1077],
        associatedFeatures: [1077],
        prevalence: [1077],
        developmentAndCourse: [1077],
        differentialDiagnosis: [1077, 1078]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Tardive Dyskinesia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition in line with the chapter-wide DSM framing.",
        "The G24.01 code and the prevalence/risk discussion on pages 1079-1080 were confirmed."
      ]
    },
    source: {
      titlePages: [1078],
      sectionPages: {
        diagnosticFeatures: [1078],
        associatedFeatures: [1078],
        prevalence: [1079],
        developmentAndCourse: [1079],
        riskAndPrognosticFactors: [1079],
        differentialDiagnosis: [1079, 1080]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Tardive Dystonia and Tardive Akathisia": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "DSM-5-TR presents this entry as a non-mental-disorder clinical coding entry within the medication-induced movement disorders chapter.",
        "The title block was confirmed to offer two recording options: G24.09 for tardive dystonia and G25.71 for tardive akathisia."
      ]
    },
    source: {
      titlePages: [1080],
      sectionPages: {
        diagnosticFeatures: [1080]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Medication-Induced Postural Tremor": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition because the DSM chapter explicitly distinguishes these entries from mental disorders.",
        "The G25.1 code and the associated-feature and differential material on pages 1080-1081 were verified."
      ]
    },
    source: {
      titlePages: [1080],
      sectionPages: {
        diagnosticFeatures: [1080, 1081],
        associatedFeatures: [1081],
        differentialDiagnosis: [1081]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Other Medication-Induced Movement Disorder": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition consistent with the DSM framing of the chapter.",
        "The G25.79 code and the brief residual-category description on page 1081 were confirmed."
      ]
    },
    source: {
      titlePages: [1081],
      sectionPages: {
        diagnosticFeatures: [1081]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Antidepressant Discontinuation Syndrome": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition rather than a mental-disorder diagnosis.",
        "The encounter-specific code set T43.205A/T43.205D/T43.205S was confirmed from the DSM title block."
      ]
    },
    source: {
      titlePages: [1082],
      sectionPages: {
        diagnosticFeatures: [1082],
        prevalence: [1082],
        developmentAndCourse: [1083],
        differentialDiagnosis: [1083]
      }
    }
  },
  "Medication-Induced Movement Disorders and Other Adverse Effects of Medication::Other Adverse Effect of Medication": {
    audit: {
      status: "corrected",
      lastReviewed: "2026-07-02",
      notes: [
        "Reviewed as a clinical-focus-condition because this chapter is explicitly outside the DSM mental-disorder diagnoses.",
        "The encounter-specific code set T50.905A/T50.905D/T50.905S and the optional-use wording were confirmed on page 1083."
      ]
    },
    source: {
      titlePages: [1083],
      sectionPages: {
        diagnosticFeatures: [1083]
      }
    }
  }
};

export const FINAL_AUDIT_CONFIG = {
  "Sexual Dysfunctions::Delayed Ejaculation": { titlePages: [673] },
  "Sexual Dysfunctions::Erectile Disorder": { titlePages: [677] },
  "Sexual Dysfunctions::Female Orgasmic Disorder": { titlePages: [682] },
  "Sexual Dysfunctions::Female Sexual Interest/Arousal Disorder": { titlePages: [686] },
  "Sexual Dysfunctions::Genito-Pelvic Pain/Penetration Disorder": { titlePages: [691] },
  "Sexual Dysfunctions::Male Hypoactive Sexual Desire Disorder": { titlePages: [697] },
  "Sexual Dysfunctions::Premature (Early) Ejaculation": { titlePages: [701] },
  "Sexual Dysfunctions::Other Specified Sexual Dysfunction": { titlePages: [710] },
  "Sexual Dysfunctions::Unspecified Sexual Dysfunction": { titlePages: [710] },
  "Substance-Related and Addictive Disorders::Caffeine Withdrawal": { titlePages: [784] },
  "Substance-Related and Addictive Disorders::Cannabis Use Disorder": { titlePages: [791] },
  "Substance-Related and Addictive Disorders::Phencyclidine Use Disorder": { titlePages: [806] },
  "Substance-Related and Addictive Disorders::Other Hallucinogen Use Disorder": { titlePages: [810] },
  "Substance-Related and Addictive Disorders::Inhalant Use Disorder": { titlePages: [823] },
  "Substance-Related and Addictive Disorders::Opioid Use Disorder": { titlePages: [832] },
  "Substance-Related and Addictive Disorders::Sedative, Hypnotic, or Anxiolytic Use Disorder": {
    titlePages: [846]
  },
  "Substance-Related and Addictive Disorders::Stimulant Use Disorder": { titlePages: [861] },
  "Substance-Related and Addictive Disorders::Tobacco Use Disorder": { titlePages: [877] },
  "Substance-Related and Addictive Disorders::Other (or Unknown) Substance Use Disorder": {
    titlePages: [885]
  },
  "Substance-Related and Addictive Disorders::Gambling Disorder": { titlePages: [896] },
  "Neurocognitive Disorders::Delirium": { titlePages: [907] },
  "Neurocognitive Disorders::Major Neurocognitive Disorder": {
    titlePages: [916],
    autoMapEndPage: 925
  },
  "Personality Disorders::General Personality Disorder": { titlePages: [981] },
  "Personality Disorders::Paranoid Personality Disorder": { titlePages: [985] },
  "Personality Disorders::Schizoid Personality Disorder": { titlePages: [990] },
  "Personality Disorders::Antisocial Personality Disorder": { titlePages: [998] },
  "Personality Disorders::Borderline Personality Disorder": { titlePages: [1003] },
  "Personality Disorders::Histrionic Personality Disorder": { titlePages: [1009] },
  "Personality Disorders::Narcissistic Personality Disorder": { titlePages: [1012] },
  "Personality Disorders::Avoidant Personality Disorder": { titlePages: [1017] },
  "Personality Disorders::Dependent Personality Disorder": { titlePages: [1021] },
  "Personality Disorders::Obsessive-Compulsive Personality Disorder": { titlePages: [1025] },
  "Personality Disorders::Personality Change Due to Another Medical Condition": {
    titlePages: [1030]
  },
  "Personality Disorders::Other Specified Personality Disorder": { titlePages: [1033] },
  "Personality Disorders::Unspecified Personality Disorder": { titlePages: [1034] },
  "Paraphilic Disorders::Voyeuristic Disorder": { titlePages: [1037] },
  "Paraphilic Disorders::Exhibitionistic Disorder": { titlePages: [1040] },
  "Paraphilic Disorders::Frotteuristic Disorder": { titlePages: [1044] },
  "Paraphilic Disorders::Sexual Masochism Disorder": { titlePages: [1047] },
  "Paraphilic Disorders::Sexual Sadism Disorder": { titlePages: [1049] },
  "Paraphilic Disorders::Pedophilic Disorder": { titlePages: [1052] },
  "Paraphilic Disorders::Transvestic Disorder": { titlePages: [1059] },
  "Paraphilic Disorders::Other Specified Paraphilic Disorder": { titlePages: [1062] },
  "Paraphilic Disorders::Unspecified Paraphilic Disorder": { titlePages: [1063] },
  "Other Conditions That May Be a Focus of Clinical Attention::Suicidal Behavior and Nonsuicidal Self-Injury: Suicidal Behavior": {
    titlePages: [1086],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Suicidal Behavior and Nonsuicidal Self-Injury: Nonsuicidal Self-Injury": {
    titlePages: [1086],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Child Physical Abuse": {
    titlePages: [1087],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Child Sexual Abuse": {
    titlePages: [1088],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Child Neglect": {
    titlePages: [1089],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Child Psychological Abuse": {
    titlePages: [1089],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Spouse or Partner Violence, Physical": {
    titlePages: [1090],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Spouse or Partner Violence, Sexual": {
    titlePages: [1091],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Spouse or Partner Neglect": {
    titlePages: [1091],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Spouse or Partner Abuse, Psychological": {
    titlePages: [1092],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Abuse and Neglect: Adult Abuse by Nonspouse or Nonpartner": {
    titlePages: [1093],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Relational Problems: Parent-Child Relational Problem": {
    titlePages: [1094],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Relational Problems: Sibling Relational Problem": {
    titlePages: [1094],
    autoDescription: true
  },
  "Other Conditions That May Be a Focus of Clinical Attention::Relational Problems: Relationship Distress With Spouse or Intimate Partner": {
    titlePages: [1095],
    autoDescription: true
  }
};
