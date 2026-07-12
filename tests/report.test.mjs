import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildSelectionState, resolveEntryCoding } from "../src/lib/coding.js";
import { buildReport } from "../src/lib/report.js";
import { slugify } from "../src/lib/utils.js";

const dataset = JSON.parse(
  fs.readFileSync(new URL("../data/dsm-dataset.json", import.meta.url), "utf8")
);

function getEntry(name) {
  const entry = dataset.entries.find((item) => item.name === name);
  assert.ok(entry, `missing entry ${name}`);
  return entry;
}

function selectedCodingOption(entry, optionName) {
  const inputGroup = entry.coding.inputs?.[0];
  assert.ok(inputGroup, `missing coding input for ${entry.name}`);

  const option = inputGroup.options.find((item) => item.name === optionName);
  assert.ok(option, `missing coding option ${optionName}`);

  return {
    groupId: inputGroup.id,
    groupKey: slugify(inputGroup.name),
    groupName: inputGroup.name,
    optionId: option.id,
    optionKey: slugify(option.name),
    optionName: option.name
  };
}

function selectedCodingOptionForGroup(entry, groupName, optionName) {
  const inputGroup = entry.coding.inputs?.find((group) => group.name === groupName);
  assert.ok(inputGroup, `missing coding input group ${groupName} for ${entry.name}`);

  const option = inputGroup.options.find((item) => item.name === optionName);
  assert.ok(option, `missing coding option ${optionName} in ${groupName}`);

  return {
    groupId: inputGroup.id,
    groupKey: slugify(inputGroup.name),
    groupName: inputGroup.name,
    optionId: option.id,
    optionKey: slugify(option.name),
    optionName: option.name
  };
}

function selectedSpecifierOption(entry, specifierName, optionName) {
  const specifier = entry.specifiers.find((item) => item.name === specifierName);
  assert.ok(specifier, `missing specifier ${specifierName}`);

  const option = specifier.options.find((item) => item.name === optionName);
  assert.ok(option, `missing specifier option ${optionName}`);

  return {
    groupId: specifier.id,
    groupKey: slugify(specifier.name),
    groupName: specifier.name,
    optionId: option.id,
    optionKey: slugify(option.name),
    optionName: option.name
  };
}

test("report formats other specified diagnoses with a specific reason", () => {
  const entry = getEntry("Other Specified Insomnia Disorder");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "specific-reason",
      label: "Specific reason",
      value: "short-term insomnia disorder"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /Recorded As: G47\.09 Other Specified Insomnia Disorder, short-term insomnia disorder/);
});

test("report formats other specified anxiety diagnoses with a specific reason", () => {
  const entry = getEntry("Other Specified Anxiety Disorder");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "specific-reason",
      label: "Specific reason",
      value: "limited-symptom attacks"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /Recorded As: F41\.8 Other Specified Anxiety Disorder, limited-symptom attacks/);
});

test("report formats code-first medical-condition diagnoses with the etiological condition first", () => {
  const entry = getEntry("Other Specified Mental Disorder Due to Another Medical Condition");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "etiological-medical-condition",
      label: "Etiological medical condition",
      value: "complex partial seizures"
    },
    {
      fieldKey: "etiological-medical-condition-code",
      label: "Etiological medical condition code",
      value: "G40.209"
    },
    {
      fieldKey: "specific-symptomatic-manifestation",
      label: "Specific symptomatic manifestation",
      value: "dissociative symptoms"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: G40\.209 complex partial seizures; F06\.8 Other Specified Mental Disorder Due to complex partial seizures, dissociative symptoms/
  );
});

test("report formats bipolar diagnoses due to another medical condition with the etiological condition first", () => {
  const entry = getEntry("Bipolar and Related Disorder Due to Another Medical Condition");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Symptom Features", "With mixed features")],
    [],
    [],
    [
      {
        fieldKey: "etiological-medical-condition",
        label: "Etiological medical condition",
        value: "hyperthyroidism"
      },
      {
        fieldKey: "etiological-medical-condition-code",
        label: "Etiological medical condition code",
        value: "E05.90"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: E05\.90 hyperthyroidism; F06\.34 Bipolar and Related Disorder Due to hyperthyroidism, With mixed features/
  );
});

test("report formats depressive diagnoses due to another medical condition with the etiological condition first", () => {
  const entry = getEntry("Depressive Disorder Due to Another Medical Condition");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Symptom Features", "With major depressive-like episode")],
    [],
    [],
    [
      {
        fieldKey: "etiological-medical-condition",
        label: "Etiological medical condition",
        value: "hypothyroidism"
      },
      {
        fieldKey: "etiological-medical-condition-code",
        label: "Etiological medical condition code",
        value: "E03.9"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: E03\.9 hypothyroidism; F06\.32 Depressive Disorder Due to hypothyroidism, With major depressive-like episode/
  );
});

test("report formats anxiety disorder due to another medical condition with the etiological condition first", () => {
  const entry = getEntry("Anxiety Disorder Due to Another Medical Condition");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "etiological-medical-condition",
      label: "Etiological medical condition",
      value: "pheochromocytoma"
    },
    {
      fieldKey: "etiological-medical-condition-code",
      label: "Etiological medical condition code",
      value: "D35.00"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: D35\.00 pheochromocytoma; F06\.4 Anxiety Disorder Due to pheochromocytoma/
  );
});

test("report formats obsessive-compulsive and related disorder due to another medical condition with the etiological condition first", () => {
  const entry = getEntry("Obsessive-Compulsive and Related Disorder Due to Another Medical Condition");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Symptom Type", "With skin-picking symptoms")],
    [],
    [],
    [
      {
        fieldKey: "etiological-medical-condition",
        label: "Etiological medical condition",
        value: "cerebral infarction"
      },
      {
        fieldKey: "etiological-medical-condition-code",
        label: "Etiological medical condition code",
        value: "I69.398"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: I69\.398 cerebral infarction; F06\.8 Obsessive-Compulsive and Related Disorder Due to cerebral infarction, With skin-picking symptoms/
  );
});

test("report formats narcolepsy due to a medical condition with the etiological condition first", () => {
  const entry = getEntry("Narcolepsy");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(
        entry,
        "Subtype",
        "Without cataplexy and without hypocretin deficiency due to a medical condition"
      )
    ],
    [],
    [],
    [
      {
        fieldKey: "etiological-medical-condition",
        label: "Etiological medical condition (if due-to-medical-condition subtype)",
        value: "myotonic dystrophy"
      },
      {
        fieldKey: "etiological-medical-condition-code",
        label: "Etiological medical condition code (if known)",
        value: "G71.11"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: G71\.11 myotonic dystrophy; G47\.429 Narcolepsy, Without cataplexy and without hypocretin deficiency due to myotonic dystrophy/
  );
});

test("report codes opioid use disorder before central sleep apnea when required", () => {
  const entry = getEntry("Central Sleep Apnea");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Subtype", "Central sleep apnea comorbid with opioid use")],
    [],
    [selectedCodingOptionForGroup(entry, "Opioid Use Disorder", "Mild opioid use disorder")],
    []
  );
  const coding = resolveEntryCoding(entry, state);
  const report = buildReport(entry, state, coding);

  assert.equal(coding.displayCode, "F11.10 + G47.37");
  assert.match(report, /Code First: F11\.10/);
  assert.match(report, /Then Code: G47\.37/);
  assert.match(
    report,
    /Recorded As: F11\.10 mild opioid use disorder; G47\.37 Central Sleep Apnea, Central sleep apnea comorbid with opioid use/
  );
});

test("report uses only G47.37 when central sleep apnea has no opioid use disorder", () => {
  const entry = getEntry("Central Sleep Apnea");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Subtype", "Central sleep apnea comorbid with opioid use")],
    [],
    [
      selectedCodingOptionForGroup(
        entry,
        "Opioid Use Disorder",
        "Opioid use disorder is not present"
      )
    ],
    []
  );
  const coding = resolveEntryCoding(entry, state);
  const report = buildReport(entry, state, coding);

  assert.equal(coding.displayCode, "G47.37");
  assert.match(
    report,
    /Recorded As: G47\.37 Central Sleep Apnea, Central sleep apnea comorbid with opioid use/
  );
  assert.doesNotMatch(report, /Code First:/);
});

test("report resolves circadian subtype coding while leaving course optional", () => {
  const entry = getEntry("Circadian Rhythm Sleep-Wake Disorders");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Subtype", "Delayed sleep phase type")],
    [],
    [],
    []
  );
  const coding = resolveEntryCoding(entry, state);
  const report = buildReport(entry, state, coding);

  assert.equal(coding.displayCode, "G47.21");
  assert.match(
    report,
    /Recorded As: G47\.21 Circadian Rhythm Sleep-Wake Disorders, Delayed sleep phase type/
  );
  assert.doesNotMatch(report, /Course:/);
});

test("report formats catatonia associated with another mental disorder with the associated disorder first", () => {
  const entry = getEntry("Catatonia Associated With Another Mental Disorder (Catatonia Specifier)");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "associated-mental-disorder",
      label: "Associated mental disorder",
      value: "schizoaffective disorder, depressive type"
    },
    {
      fieldKey: "associated-mental-disorder-code",
      label: "Associated mental disorder code",
      value: "F25.1"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F25\.1 schizoaffective disorder, depressive type; F06\.1 Catatonia Associated With schizoaffective disorder, depressive type/
  );
});

test("report formats catatonic disorder due to another medical condition with the etiological condition first", () => {
  const entry = getEntry("Catatonic Disorder Due to Another Medical Condition");
  const state = buildSelectionState(entry, [], [], [], [], [
    {
      fieldKey: "etiological-medical-condition",
      label: "Etiological medical condition",
      value: "hepatic encephalopathy"
    },
    {
      fieldKey: "etiological-medical-condition-code",
      label: "Etiological medical condition code",
      value: "K72.90"
    }
  ]);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: K72\.90 hepatic encephalopathy; F06\.1 Catatonic Disorder Due to hepatic encephalopathy/
  );
});

test("report formats unspecified catatonia with R29.818 before F06.1", () => {
  const entry = getEntry("Unspecified Catatonia");
  const state = buildSelectionState(entry, [], [], [], [], []);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: R29\.818 other symptoms involving nervous and musculoskeletal systems; F06\.1 Unspecified Catatonia/
  );
});

test("report formats substance-induced diagnoses with an optional comorbid use disorder first", () => {
  const entry = getEntry("Substance/Medication-Induced Sexual Dysfunction");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Onset Specifiers", "With onset during intoxication"),
      selectedSpecifierOption(entry, "Severity Specifiers", "Moderate")
    ],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Alcohol"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With moderate or severe use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "severe alcohol use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F10\.281 severe alcohol use disorder with alcohol-induced sexual dysfunction, With onset during intoxication, Moderate/
  );
});

test("report formats bipolar substance-induced diagnoses with the audited code table and onset specifier", () => {
  const entry = getEntry("Substance/Medication-Induced Bipolar and Related Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Onset", "With onset during intoxication")],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Cocaine"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With moderate or severe use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "severe cocaine use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F14\.24 severe cocaine use disorder with cocaine-induced bipolar and related disorder, With onset during intoxication/
  );
});

test("report formats depressive substance-induced diagnoses with the audited code table and onset specifier", () => {
  const entry = getEntry("Substance/Medication-Induced Depressive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Onset", "With onset during withdrawal")],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Opioid"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With mild use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "mild opioid use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F11\.14 mild opioid use disorder with opioid-induced depressive disorder, With onset during withdrawal/
  );
});

test("report formats psychotic substance-induced diagnoses with the audited code table and onset specifier", () => {
  const entry = getEntry("Substance/Medication-Induced Psychotic Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Onset", "With onset during intoxication")],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Cocaine"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With moderate or severe use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "severe cocaine use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F14\.259 severe cocaine use disorder with cocaine-induced psychotic disorder, With onset during intoxication/
  );
});

test("report formats anxiety substance-induced diagnoses for caffeine without a comorbid use disorder", () => {
  const entry = getEntry("Substance/Medication-Induced Anxiety Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Onset", "With onset during intoxication")],
    [],
    [selectedCodingOptionForGroup(entry, "Substance Type", "Caffeine")],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F15\.980 caffeine-induced anxiety disorder, With onset during intoxication/
  );
});

test("report formats sleep substance-induced diagnoses for tobacco with subtype wording", () => {
  const entry = getEntry("Substance/Medication-Induced Sleep Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Type Specifiers", "Insomnia type"),
      selectedSpecifierOption(entry, "Onset Specifiers", "With onset during intoxication")
    ],
    [],
    [selectedCodingOptionForGroup(entry, "Substance Type", "Tobacco")],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "severe tobacco use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F17\.208 severe tobacco use disorder with tobacco-induced sleep disorder, Insomnia type, With onset during intoxication/
  );
});

test("report formats obsessive-compulsive substance-induced diagnoses with the audited code table and onset specifier", () => {
  const entry = getEntry("Substance/Medication-Induced Obsessive-Compulsive and Related Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Onset", "With onset during intoxication")],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Cocaine"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With moderate or severe use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "severe cocaine use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F14\.288 severe cocaine use disorder with cocaine-induced obsessive-compulsive and related disorder, With onset during intoxication/
  );
});

test("report keeps Pica age-group coding input out of the diagnosis label", () => {
  const entry = getEntry("Pica");
  const state = buildSelectionState(
    entry,
    [],
    [],
    [],
    [selectedCodingOption(entry, "in adults")],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /Recorded As: F50\.89 Pica/);
  assert.doesNotMatch(report, /Recorded As: F50\.89 Pica, in adults/);
  assert.match(report, /Coding Inputs:[\s\S]*Age Group: in adults/);
});

test("report records Specific Learning Disorder as separate DSM-coded academic domains", () => {
  const entry = getEntry("Specific Learning Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "With impairment in reading", "Reading comprehension"),
      selectedSpecifierOption(entry, "With impairment in mathematics", "Accurate math reasoning"),
      selectedSpecifierOption(entry, "Severity", "Moderate")
    ],
    [],
    [
      selectedCodingOption(entry, "With impairment in reading"),
      selectedCodingOption(entry, "With impairment in mathematics")
    ],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F81\.0 Specific Learning Disorder, With impairment in reading, Reading comprehension, Moderate; F81\.2 Specific Learning Disorder, With impairment in mathematics, Accurate math reasoning, Moderate/
  );
  assert.match(report, /ICD-10-CM: F81\.0; F81\.2/);
});

test("report formats Stereotypic Movement Disorder with the named associated condition when selected", () => {
  const entry = getEntry("Stereotypic Movement Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Self-Injurious Behavior", "With self-injurious behavior"),
      selectedSpecifierOption(
        entry,
        "Association",
        "Associated with a known genetic or other medical condition, neurodevelopmental disorder, or environmental factor"
      ),
      selectedSpecifierOption(entry, "Severity", "Severe")
    ],
    [],
    [],
    [
      {
        fieldKey: "associated-condition-disorder-or-factor",
        label: "Associated condition, disorder, or factor",
        value: "Lesch-Nyhan syndrome"
      },
      {
        fieldKey: "associated-condition-disorder-or-factor-codes",
        label: "Associated condition, disorder, or factor code(s)",
        value: "E79.1"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F98\.4 Stereotypic Movement Disorder associated with Lesch-Nyhan syndrome, With self-injurious behavior, Severe; E79\.1/
  );
});

test("report formats NREM sleep arousal disorders from the subtype specifier without a coding input", () => {
  const entry = getEntry("Non-Rapid Eye Movement Sleep Arousal Disorders");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Subtype", "Sleepwalking type"),
      selectedSpecifierOption(entry, "Sleepwalking Type Specifiers", "With sleep-related eating")
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F51\.3 Non-Rapid Eye Movement Sleep Arousal Disorders, Sleepwalking type, With sleep-related eating/
  );
});

test("report formats Major Depressive Disorder from episode and status specifiers", () => {
  const entry = getEntry("Major Depressive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Episode", "Recurrent episode"),
      selectedSpecifierOption(entry, "Severity/Psychotic/Remission Status", "Moderate"),
      selectedSpecifierOption(entry, "Seasonal Pattern", "With seasonal pattern")
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F33\.1 Major Depressive Disorder, Recurrent episode, Moderate, With seasonal pattern/
  );
});

test("report formats Mild Neurocognitive Disorder due to a selected etiology", () => {
  const entry = getEntry("Mild Neurocognitive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Etiological Subtypes", "Alzheimer's disease"),
      selectedSpecifierOption(entry, "Behavioral Disturbance", "Without behavioral disturbance")
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: G31\.84 Mild Neurocognitive Disorder due to Alzheimer's disease, Without behavioral disturbance/
  );
});

test("report formats substance-induced Mild Neurocognitive Disorder with substance-first wording", () => {
  const entry = getEntry("Mild Neurocognitive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Etiological Subtypes", "Substance/medication use"),
      selectedSpecifierOption(
        entry,
        "Behavioral Disturbance",
        "With behavioral disturbance (specify disturbance)"
      )
    ],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Alcohol"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With mild use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "mild alcohol use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F10\.188 mild alcohol use disorder with alcohol-induced mild neurocognitive disorder, With behavioral disturbance \(specify disturbance\)/
  );
});

test("report formats Major Neurocognitive Disorder with the etiological medical condition first", () => {
  const entry = getEntry("Major Neurocognitive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Etiological Subtypes", "Alzheimer's disease"),
      selectedSpecifierOption(
        entry,
        "Behavioral Disturbance",
        "With behavioral disturbance (specify disturbance)"
      )
    ],
    [],
    [],
    [
      {
        fieldKey: "etiological-medical-condition",
        label: "Etiological medical condition",
        value: "Alzheimer's disease"
      },
      {
        fieldKey: "etiological-medical-condition-code",
        label: "Etiological medical condition code",
        value: "G30.9"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: G30\.9 Alzheimer's disease; F02\.81 Major Neurocognitive Disorder due to Alzheimer's disease, With behavioral disturbance \(specify disturbance\)/
  );
});

test("report formats substance-induced Major Neurocognitive Disorder with substance-first wording", () => {
  const entry = getEntry("Major Neurocognitive Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Etiological Subtypes", "Substance/medication use"),
      selectedSpecifierOption(entry, "Behavioral Disturbance", "Without behavioral disturbance")
    ],
    [],
    [
      selectedCodingOptionForGroup(entry, "Substance Type", "Alcohol"),
      selectedCodingOptionForGroup(entry, "Use Disorder Status", "With mild use disorder")
    ],
    [
      {
        fieldKey: "comorbid-substance-use-disorder",
        label: "Comorbid substance use disorder (if present)",
        value: "mild alcohol use disorder"
      }
    ]
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F10\.188 mild alcohol use disorder with alcohol-induced major neurocognitive disorder, Without behavioral disturbance/
  );
});

test("report includes selected DSM subtype wording for adjustment disorders", () => {
  const entry = getEntry("Adjustment Disorders");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Subtype", "With anxiety")],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /Recorded As: F43\.22 Adjustment Disorders, With anxiety/);
});

test("report includes the explicit blood-injection-injury ICD subtype for Specific Phobia", () => {
  const entry = getEntry("Specific Phobia");
  const state = buildSelectionState(
    entry,
    [],
    [selectedSpecifierOption(entry, "Phobic Stimulus", "Blood-injection-injury")],
    [],
    [
      selectedCodingOptionForGroup(
        entry,
        "Blood-Injection-Injury ICD-10-CM Code",
        "Fear of injections and transfusions"
      )
    ],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F40\.231 Specific Phobia, Fear of injections and transfusions, Blood-injection-injury/
  );
});

test("report includes bipolar DSM episode and status wording before additional specifiers", () => {
  const entry = getEntry("Bipolar I Disorder");
  const rapidCycling = {
    groupId: entry.specifiers.find((specifier) => specifier.name === "Rapid Cycling").id,
    groupKey: "rapid-cycling",
    groupName: "Rapid Cycling",
    optionId: entry.specifiers.find((specifier) => specifier.name === "Rapid Cycling").options[0].id,
    optionKey: "with-rapid-cycling",
    optionName: "With rapid cycling"
  };
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(
        entry,
        "Current or Most Recent Episode",
        "Current or most recent episode manic"
      ),
      selectedSpecifierOption(entry, "Severity/Psychotic/Remission Status", "Moderate"),
      rapidCycling
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F31\.12 Bipolar I Disorder, Current or most recent episode manic, Moderate, With rapid cycling/
  );
});

test("report labels additional code entries honestly", () => {
  const entry = getEntry("No Diagnosis or Condition");
  const state = buildSelectionState(entry, [], [], [], [], []);
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /^Additional Code: No Diagnosis or Condition/m);
  assert.match(report, /ICD-10-CM: Z03\.89/);
});

test("report labels medication chapter entries as clinical codes instead of diagnoses", () => {
  const entry = getEntry("Antidepressant Discontinuation Syndrome");
  const state = buildSelectionState(
    entry,
    [],
    [],
    [],
    [selectedCodingOption(entry, "Initial encounter")],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /^Clinical Code: Antidepressant Discontinuation Syndrome/m);
  assert.match(report, /ICD-10-CM: T43\.205A/);
});

test("report warns when Conduct Disorder limited prosocial emotions has too few selected traits", () => {
  const entry = getEntry("Conduct Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Onset Type", "Unspecified onset"),
      selectedSpecifierOption(
        entry,
        "With limited prosocial emotions",
        "Lack of remorse or guilt"
      )
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(report, /Selection Warnings:/);
  assert.match(
    report,
    /With limited prosocial emotions requires at least 2 selections to apply\./
  );
  assert.doesNotMatch(report, /Recorded As: F91\.9 Conduct Disorder, [^\n]*With limited prosocial emotions/);
  assert.doesNotMatch(report, /Recorded As: F91\.9 Conduct Disorder, [^\n]*Lack of remorse or guilt/);
});

test("report records Conduct Disorder limited prosocial emotions as one DSM specifier once threshold is met", () => {
  const entry = getEntry("Conduct Disorder");
  const state = buildSelectionState(
    entry,
    [],
    [
      selectedSpecifierOption(entry, "Onset Type", "Unspecified onset"),
      selectedSpecifierOption(
        entry,
        "With limited prosocial emotions",
        "Lack of remorse or guilt"
      ),
      selectedSpecifierOption(
        entry,
        "With limited prosocial emotions",
        "Shallow or deficient affect"
      )
    ],
    [],
    [],
    []
  );
  const report = buildReport(entry, state, resolveEntryCoding(entry, state));

  assert.match(
    report,
    /Recorded As: F91\.9 Conduct Disorder, Unspecified onset, With limited prosocial emotions/
  );
  assert.match(
    report,
    /With limited prosocial emotions: Lack of remorse or guilt, Shallow or deficient affect/
  );
});
