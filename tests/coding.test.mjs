import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  buildSelectionState,
  getComputedSpecifierGroupKeys,
  resolveEntryCoding
} from "../src/lib/coding.js";
import { slugify } from "../src/lib/utils.js";

const dataset = JSON.parse(
  fs.readFileSync(new URL("../data/dsm-dataset.json", import.meta.url), "utf8")
);

function getEntry(id) {
  const entry = dataset.entries.find((item) => item.id === id);
  assert.ok(entry, `missing entry ${id}`);
  return entry;
}

function selectedOption(entry, specifierName, optionName) {
  const specifier = entry.specifiers.find((item) => item.name === specifierName);
  assert.ok(specifier, `missing specifier ${specifierName}`);

  const option = specifier.options.find((item) => item.name === optionName);
  assert.ok(option, `missing option ${optionName}`);

  return {
    groupId: specifier.id,
    groupKey: slugify(specifier.name),
    groupName: specifier.name,
    optionId: option.id,
    optionKey: slugify(option.name),
    optionName: option.name
  };
}

function selectedCodingOption(entry, groupName, optionName) {
  const group = entry.coding.inputs.find((item) => item.name === groupName);
  assert.ok(group, `missing coding input group ${groupName}`);

  const option = group.options.find((item) => item.name === optionName);
  assert.ok(option, `missing coding option ${optionName}`);

  return {
    groupId: group.id,
    groupKey: slugify(group.name),
    groupName: group.name,
    optionId: option.id,
    optionKey: slugify(option.name),
    optionName: option.name
  };
}

test("ASD keeps F84.0 and adds F06.1 when catatonia is selected", () => {
  const entry = getEntry("neurodevelopmental-disorders-autism-spectrum-disorder");
  const state = buildSelectionState(
    entry,
    [],
    [selectedOption(entry, "Catatonia", "With catatonia")],
    []
  );

  const result = resolveEntryCoding(entry, state);

  assert.equal(result.displayCode, "F84.0 + F06.1");
});

test("Alcohol Use Disorder resolves moderate severity to F10.20 with four criteria", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-use-disorder");
  const state = buildSelectionState(
    entry,
    [{}, {}, {}, {}],
    [],
    []
  );

  const result = resolveEntryCoding(entry, state);

  assert.equal(result.displayCode, "F10.20");
  assert.equal(result.derivedSelections[0].label, "Moderate");
});

test("Alcohol Use Disorder early remission changes moderate coding to F10.21", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-use-disorder");
  const state = buildSelectionState(
    entry,
    [{}, {}, {}, {}],
    [selectedOption(entry, "Remission Specifiers", "In early remission")],
    []
  );

  const result = resolveEntryCoding(entry, state);

  assert.equal(result.displayCode, "F10.21");
});

test("Breathing-Related Sleep Disorders stays not directly coded", () => {
  const entry = getEntry("sleep-wake-disorders-breathing-related-sleep-disorders");
  const state = buildSelectionState(entry, [], [], []);
  const result = resolveEntryCoding(entry, state);

  assert.equal(result.status, "not-directly-coded");
  assert.equal(result.displayCode, "Not directly coded");
});

test("Alcohol computes only the severity group in the UI", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-use-disorder");
  const computed = getComputedSpecifierGroupKeys(entry);

  assert.deepEqual(Array.from(computed), ["severity"]);
});

test("Alcohol dataset marks remission as optional and severity as computed", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-use-disorder");
  const remission = entry.specifiers.find((specifier) => specifier.name === "Remission Specifiers");
  const severity = entry.specifiers.find((specifier) => specifier.name === "Severity");

  assert.ok(remission);
  assert.equal(remission.selectionType, "single");
  assert.equal(remission.allowsEmpty, true);
  assert.equal(remission.isComputed, false);

  assert.ok(severity);
  assert.equal(severity.isComputed, true);
});

test("Conduct Disorder uses a thresholded multi-select specifier for limited prosocial emotions", () => {
  const entry = getEntry("disruptive-impulse-control-and-conduct-disorders-conduct-disorder");
  const prosocial = entry.specifiers.find(
    (specifier) => specifier.name === "With limited prosocial emotions"
  );

  assert.ok(prosocial);
  assert.equal(prosocial.selectionType, "multiple");
  assert.equal(prosocial.minSelections, 2);
  assert.equal(prosocial.reportLabelMode, "group");
});

test("Dissociative Amnesia defaults to F44.0 unless fugue is selected", () => {
  const entry = getEntry("dissociative-disorders-dissociative-amnesia");

  const defaultResult = resolveEntryCoding(entry, buildSelectionState(entry, [], [], []));
  assert.equal(defaultResult.displayCode, "F44.0");

  const fugueResult = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [selectedOption(entry, "With dissociative fugue", "With dissociative fugue")], [])
  );
  assert.equal(fugueResult.displayCode, "F44.1");
});

test("Stimulant Use Disorder uses cocaine remission codes when cocaine is selected", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-stimulant-use-disorder");
  const state = buildSelectionState(
    entry,
    [{}, {}, {}, {}],
    [
      selectedOption(entry, "Substance Type", "Cocaine"),
      selectedOption(entry, "Remission Specifiers", "In early remission")
    ],
    []
  );

  const result = resolveEntryCoding(entry, state);
  assert.equal(result.displayCode, "F14.21");
});

test("Adjustment Disorders resolve through the DSM subtype specifier", () => {
  const entry = getEntry("trauma-and-stressor-related-disorders-adjustment-disorders");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [selectedOption(entry, "Subtype", "With anxiety")], [])
  );

  assert.equal(result.displayCode, "F43.22");
});

test("Specific Learning Disorder resolves multiple academic domains to separately coded DSM outputs", () => {
  const entry = getEntry("neurodevelopmental-disorders-specific-learning-disorder");
  const state = buildSelectionState(
    entry,
    [],
    [],
    [],
    [
      selectedCodingOption(entry, "Academic Domains", "With impairment in reading"),
      selectedCodingOption(entry, "Academic Domains", "With impairment in mathematics")
    ]
  );

  const result = resolveEntryCoding(entry, state);

  assert.equal(result.primaryCode, "F81.0");
  assert.deepEqual(result.additionalCodes, ["F81.2"]);
  assert.equal(result.displayCode, "F81.0; F81.2");
});

test("Specific Phobia requires an extra ICD selection only for blood-injection-injury", () => {
  const entry = getEntry("anxiety-disorders-specific-phobia");

  const animalResult = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [selectedOption(entry, "Phobic Stimulus", "Animal")], [])
  );
  assert.equal(animalResult.displayCode, "F40.218");

  const unresolvedBloodInjectionInjury = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Phobic Stimulus", "Blood-injection-injury")],
      []
    )
  );
  assert.equal(unresolvedBloodInjectionInjury.status, "needs-selection");
  assert.match(
    unresolvedBloodInjectionInjury.displayCode,
    /Blood-Injection-Injury ICD-10-CM Code/
  );

  const resolvedBloodInjectionInjury = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Phobic Stimulus", "Blood-injection-injury")],
      [],
      [
        selectedCodingOption(
          entry,
          "Blood-Injection-Injury ICD-10-CM Code",
          "Fear of injections and transfusions"
        )
      ]
    )
  );
  assert.equal(resolvedBloodInjectionInjury.displayCode, "F40.231");
});

test("substance-induced psychotic disorder resolves through the audited DSM substance table", () => {
  const entry = getEntry(
    "schizophrenia-spectrum-and-other-psychotic-disorders-substance-medication-induced-psychotic-disorder"
  );
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Onset", "With onset during intoxication")],
      [],
      [
        selectedCodingOption(entry, "Substance Type", "Cocaine"),
        selectedCodingOption(entry, "Use Disorder Status", "With moderate or severe use disorder")
      ]
    )
  );

  assert.equal(result.displayCode, "F14.259");
});

test("substance-induced anxiety disorder resolves caffeine without a comorbid use-disorder variant", () => {
  const entry = getEntry("anxiety-disorders-substance-medication-induced-anxiety-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Onset", "With onset during intoxication")],
      [],
      [selectedCodingOption(entry, "Substance Type", "Caffeine")]
    )
  );

  assert.equal(result.displayCode, "F15.980");
});

test("substance-induced sleep disorder resolves the tobacco coding exception", () => {
  const entry = getEntry("sleep-wake-disorders-substance-medication-induced-sleep-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [
        selectedOption(entry, "Type Specifiers", "Insomnia type"),
        selectedOption(entry, "Onset Specifiers", "With onset during intoxication")
      ],
      [],
      [selectedCodingOption(entry, "Substance Type", "Tobacco")]
    )
  );

  assert.equal(result.displayCode, "F17.208");
});

test("substance-induced sexual dysfunction resolves through the audited DSM substance table", () => {
  const entry = getEntry("sexual-dysfunctions-substance-medication-induced-sexual-dysfunction");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [
        selectedOption(entry, "Onset Specifiers", "With onset during intoxication"),
        selectedOption(entry, "Severity Specifiers", "Moderate")
      ],
      [],
      [
        selectedCodingOption(entry, "Substance Type", "Alcohol"),
        selectedCodingOption(entry, "Use Disorder Status", "With moderate or severe use disorder")
      ]
    )
  );

  assert.equal(result.displayCode, "F10.281");
});

test("Alcohol Intoxication resolves through the DSM alcohol-use-disorder coding note", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-intoxication");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [], [], [
      selectedCodingOption(entry, "Use Disorder Status", "With moderate or severe alcohol use disorder")
    ])
  );

  assert.equal(result.displayCode, "F10.220");
});

test("Alcohol Withdrawal combines perceptual disturbances with alcohol use disorder status", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-alcohol-withdrawal");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "With perceptual disturbances", "With perceptual disturbances")],
      [],
      [selectedCodingOption(entry, "Use Disorder Status", "With mild alcohol use disorder")]
    )
  );

  assert.equal(result.displayCode, "F10.132");
});

test("Cannabis Intoxication combines perceptual disturbances with cannabis use disorder status", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-cannabis-intoxication");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "With perceptual disturbances", "With perceptual disturbances")],
      [],
      [selectedCodingOption(entry, "Use Disorder Status", "Without comorbid cannabis use disorder")]
    )
  );

  assert.equal(result.displayCode, "F12.922");
});

test("Cannabis Withdrawal resolves through the DSM cannabis-use-disorder coding note", () => {
  const entry = getEntry("substance-related-and-addictive-disorders-cannabis-withdrawal");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [], [], [
      selectedCodingOption(entry, "Use Disorder Status", "Without comorbid cannabis use disorder")
    ])
  );

  assert.equal(result.displayCode, "F12.93");
});

test("substance-induced obsessive-compulsive disorder resolves through the audited DSM substance table", () => {
  const entry = getEntry(
    "obsessive-compulsive-and-related-disorders-substance-medication-induced-obsessive-compulsive-and-related-disorder"
  );
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Onset", "With onset during intoxication")],
      [],
      [
        selectedCodingOption(entry, "Substance Type", "Cocaine"),
        selectedCodingOption(entry, "Use Disorder Status", "With moderate or severe use disorder")
      ]
    )
  );

  assert.equal(result.displayCode, "F14.288");
});

test("Pica resolves through the DSM age-based coding note", () => {
  const entry = getEntry("feeding-and-eating-disorders-pica");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [], [], [selectedCodingOption(entry, "Age Group", "in adults")])
  );

  assert.equal(result.displayCode, "F50.89");
});

test("NREM sleep arousal disorders resolve directly from the DSM subtype specifier", () => {
  const entry = getEntry("sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(entry, [], [selectedOption(entry, "Subtype", "Sleep terror type")], [])
  );

  assert.equal(result.displayCode, "F51.4");
});

test("NREM sleepwalking specialized forms stay optional DSM specifiers", () => {
  const entry = getEntry("sleep-wake-disorders-non-rapid-eye-movement-sleep-arousal-disorders");
  const specifier = entry.specifiers.find(
    (item) => item.name === "Sleepwalking Type Specifiers"
  );

  assert.ok(specifier);
  assert.equal(specifier.selectionType, "multiple");
  assert.equal(specifier.allowsEmpty, true);
});

test("Major Depressive Disorder resolves from episode and status specifiers", () => {
  const entry = getEntry("depressive-disorders-major-depressive-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [
        selectedOption(entry, "Episode", "Recurrent episode"),
        selectedOption(entry, "Severity/Psychotic/Remission Status", "In partial remission")
      ],
      []
    )
  );

  assert.equal(result.displayCode, "F33.41");
});

test("Major Depressive Disorder preserves the catatonia additional code", () => {
  const entry = getEntry("depressive-disorders-major-depressive-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [
        selectedOption(entry, "Episode", "Single episode"),
        selectedOption(entry, "Severity/Psychotic/Remission Status", "Severe"),
        selectedOption(entry, "Catatonia", "With catatonia")
      ],
      []
    )
  );

  assert.equal(result.displayCode, "F32.2 + F06.1");
});

test("Bipolar I Disorder resolves a current hypomanic episode without a status selector", () => {
  const entry = getEntry("bipolar-and-related-disorders-bipolar-i-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Current or Most Recent Episode", "Current or most recent episode hypomanic")],
      []
    )
  );

  assert.equal(result.displayCode, "F31.0");
});

test("Bipolar I Disorder resolves from episode and status specifiers", () => {
  const entry = getEntry("bipolar-and-related-disorders-bipolar-i-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [
        selectedOption(entry, "Current or Most Recent Episode", "Current or most recent episode manic"),
        selectedOption(entry, "Severity/Psychotic/Remission Status", "Moderate")
      ],
      []
    )
  );

  assert.equal(result.displayCode, "F31.12");
});

test("Mild Neurocognitive Disorder resolves specified non-substance etiologies to G31.84", () => {
  const entry = getEntry("neurocognitive-disorders-mild-neurocognitive-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Etiological Subtypes", "Alzheimer's disease")],
      []
    )
  );

  assert.equal(result.displayCode, "G31.84");
});

test("Mild Neurocognitive Disorder resolves unspecified etiology to R41.9", () => {
  const entry = getEntry("neurocognitive-disorders-mild-neurocognitive-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Etiological Subtypes", "Unspecified etiology")],
      []
    )
  );

  assert.equal(result.displayCode, "R41.9");
});

test("Mild Neurocognitive Disorder resolves the substance-induced branch through the DSM substance table", () => {
  const entry = getEntry("neurocognitive-disorders-mild-neurocognitive-disorder");
  const result = resolveEntryCoding(
    entry,
    buildSelectionState(
      entry,
      [],
      [selectedOption(entry, "Etiological Subtypes", "Substance/medication use")],
      [],
      [
        selectedCodingOption(entry, "Substance Type", "Alcohol"),
        selectedCodingOption(entry, "Use Disorder Status", "With moderate or severe use disorder")
      ]
    )
  );

  assert.equal(result.displayCode, "F10.288");
});

test("Persistent Depressive Disorder uses exclusive single-choice onset and course specifiers", () => {
  const entry = getEntry("depressive-disorders-persistent-depressive-disorder-dysthymia");
  const onset = entry.specifiers.find((specifier) => specifier.name === "Onset");
  const course = entry.specifiers.find(
    (specifier) => specifier.name === "Course Specifier (for most recent 2 years)"
  );

  assert.ok(onset);
  assert.equal(onset.selectionType, "single");
  assert.deepEqual(
    onset.options.map((option) => option.name),
    ["Early onset (before age 21)", "Late onset (age 21 or older)"]
  );

  assert.ok(course);
  assert.equal(course.selectionType, "single");
  assert.deepEqual(
    course.options.map((option) => option.name),
    [
      "With pure dysthymic syndrome",
      "With persistent major depressive episode",
      "With intermittent major depressive episodes, with current episode",
      "With intermittent major depressive episodes, without current episode"
    ]
  );
});

test("Enuresis and Encopresis subtype specifiers are modeled as exclusive groups", () => {
  const enuresis = getEntry("elimination-disorders-enuresis");
  assert.equal(enuresis.specifiers.length, 1);
  assert.equal(enuresis.specifiers[0].name, "Subtype");
  assert.equal(enuresis.specifiers[0].selectionType, "single");
  assert.deepEqual(
    enuresis.specifiers[0].options.map((option) => option.name),
    ["Nocturnal only", "Diurnal only", "Nocturnal and diurnal"]
  );

  const encopresis = getEntry("elimination-disorders-encopresis");
  assert.equal(encopresis.specifiers.length, 1);
  assert.equal(encopresis.specifiers[0].name, "Subtype");
  assert.equal(encopresis.specifiers[0].selectionType, "single");
  assert.deepEqual(
    encopresis.specifiers[0].options.map((option) => option.name),
    [
      "With constipation and overflow incontinence",
      "Without constipation and overflow incontinence"
    ]
  );
});

test("Insight specifiers normalize as single-choice groups for OCD-spectrum disorders", () => {
  const entryIds = [
    "obsessive-compulsive-and-related-disorders-obsessive-compulsive-disorder",
    "obsessive-compulsive-and-related-disorders-body-dysmorphic-disorder",
    "obsessive-compulsive-and-related-disorders-hoarding-disorder"
  ];

  entryIds.forEach((entryId) => {
    const entry = getEntry(entryId);
    const insight = entry.specifiers.find((specifier) => specifier.name === "Insight");

    assert.ok(insight, `missing Insight group for ${entry.name}`);
    assert.equal(insight.selectionType, "single");
    assert.deepEqual(
      insight.options.map((option) => option.name),
      [
        "With good or fair insight",
        "With poor insight",
        "With absent insight/delusional beliefs"
      ]
    );
  });
});

test("Substance and medication onset specifiers normalize as single-choice groups", () => {
  const entryIds = [
    "schizophrenia-spectrum-and-other-psychotic-disorders-substance-medication-induced-psychotic-disorder",
    "bipolar-and-related-disorders-substance-medication-induced-bipolar-and-related-disorder",
    "depressive-disorders-substance-medication-induced-depressive-disorder",
    "anxiety-disorders-substance-medication-induced-anxiety-disorder",
    "obsessive-compulsive-and-related-disorders-substance-medication-induced-obsessive-compulsive-and-related-disorder",
    "sleep-wake-disorders-substance-medication-induced-sleep-disorder",
    "sexual-dysfunctions-substance-medication-induced-sexual-dysfunction"
  ];

  entryIds.forEach((entryId) => {
    const entry = getEntry(entryId);
    const onset = entry.specifiers.find((specifier) => /^Onset/.test(specifier.name));

    assert.ok(onset, `missing onset group for ${entry.name}`);
    assert.equal(onset.selectionType, "single");
    assert.deepEqual(
      onset.options.map((option) => option.name),
      [
        "With onset during intoxication",
        "With onset during withdrawal",
        "With onset after medication use"
      ]
    );
  });
});

test("Bipolar status specifiers normalize as single-choice groups", () => {
  const bipolarI = getEntry("bipolar-and-related-disorders-bipolar-i-disorder");
  const bipolarIStatus = bipolarI.specifiers.find(
    (specifier) => specifier.name === "Severity/Psychotic/Remission Status"
  );
  assert.ok(bipolarIStatus);
  assert.equal(bipolarIStatus.selectionType, "single");

  const bipolarII = getEntry("bipolar-and-related-disorders-bipolar-ii-disorder");
  const bipolarIIStatus = bipolarII.specifiers.find(
    (specifier) => specifier.name === "Severity/Psychotic/Remission Status"
  );
  assert.ok(bipolarIIStatus);
  assert.equal(bipolarIIStatus.selectionType, "single");
});

test("Bipolar psychotic feature subtype is consolidated into one single-choice group", () => {
  const entryIds = [
    "bipolar-and-related-disorders-bipolar-i-disorder",
    "bipolar-and-related-disorders-bipolar-ii-disorder"
  ];

  entryIds.forEach((entryId) => {
    const entry = getEntry(entryId);
    const psychoticType = entry.specifiers.find(
      (specifier) => specifier.name === "Psychotic Feature Type"
    );

    assert.ok(psychoticType, `missing psychotic feature type for ${entry.name}`);
    assert.equal(psychoticType.selectionType, "single");
    assert.deepEqual(
      psychoticType.options.map((option) => option.name),
      ["With mood-congruent psychotic features", "With mood-incongruent psychotic features"]
    );
    assert.equal(
      entry.specifiers.some((specifier) => specifier.name === "Mood-Congruent Psychotic Features"),
      false
    );
    assert.equal(
      entry.specifiers.some((specifier) => specifier.name === "Mood-Incongruent Psychotic Features"),
      false
    );
  });
});

test("remaining DSM pick-one groups normalize as single-choice specifiers", () => {
  const checks = [
    [
      "schizophrenia-spectrum-and-other-psychotic-disorders-delusional-disorder",
      "Course (after 1 year)"
    ],
    [
      "schizophrenia-spectrum-and-other-psychotic-disorders-schizophrenia",
      "Course (after 1 year)"
    ],
    [
      "schizophrenia-spectrum-and-other-psychotic-disorders-schizoaffective-disorder",
      "Course (after 1 year)"
    ],
    ["trauma-and-stressor-related-disorders-adjustment-disorders", "Duration"],
    [
      "somatic-symptom-and-related-disorders-functional-neurological-symptom-disorder-conversion-disorder",
      "Duration"
    ],
    ["sleep-wake-disorders-insomnia-disorder", "Course Specifiers"],
    ["sleep-wake-disorders-hypersomnolence-disorder", "Duration Specifiers"],
    ["sleep-wake-disorders-circadian-rhythm-sleep-wake-disorders", "Course Specifiers"],
    ["sleep-wake-disorders-nightmare-disorder", "Duration Specifiers"],
    ["neurocognitive-disorders-delirium", "Course Specifiers"],
    ["neurocognitive-disorders-delirium", "Activity Level Specifiers"],
    ["sexual-dysfunctions-delayed-ejaculation", "Context"],
    ["sexual-dysfunctions-erectile-disorder", "Context"],
    ["sexual-dysfunctions-female-orgasmic-disorder", "Context"],
    ["sexual-dysfunctions-female-sexual-interest-arousal-disorder", "Context"],
    ["sexual-dysfunctions-male-hypoactive-sexual-desire-disorder", "Context"],
    ["sexual-dysfunctions-premature-early-ejaculation", "Context"],
    ["paraphilic-disorders-exhibitionistic-disorder", "Target of Arousal"],
    ["paraphilic-disorders-pedophilic-disorder", "Sexual Attraction"]
  ];

  checks.forEach(([entryId, specifierName]) => {
    const entry = getEntry(entryId);
    const specifier = entry.specifiers.find((item) => item.name === specifierName);

    assert.ok(specifier, `missing ${specifierName} for ${entry.name}`);
    assert.equal(specifier.selectionType, "single");
  });
});
