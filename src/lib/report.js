import { slugify, uniqueBy } from "./utils.js";

function sortSelections(selections) {
  return [...selections].sort((left, right) => left.groupName.localeCompare(right.groupName));
}

function normalizeDerivedSelections(derivedSelections = []) {
  return derivedSelections.map((selection) => ({
    groupId: selection.group,
    groupKey: selection.group,
    groupName: selection.label && selection.group === "severity" ? "Severity" : selection.group,
    optionId: selection.option,
    optionKey: selection.option,
    optionName: selection.label || selection.option
  }));
}

function groupSelections(selections) {
  const grouped = new Map();

  sortSelections(selections).forEach((selection) => {
    if (!grouped.has(selection.groupName)) {
      grouped.set(selection.groupName, []);
    }
    grouped.get(selection.groupName).push(selection.optionName);
  });

  return grouped;
}

function dedupeSelections(explicitSelections, derivedSelections) {
  const normalizedDerived = normalizeDerivedSelections(derivedSelections);

  return uniqueBy([...explicitSelections, ...normalizedDerived], (selection) => {
    const groupKey = selection.groupId || selection.groupKey || slugify(selection.groupName);
    const optionKey = selection.optionId || selection.optionKey || slugify(selection.optionName);
    return `${groupKey}:${optionKey}`;
  });
}

function findSpecifierMetadata(entry, selection) {
  const groupCandidates = new Set(
    [selection.groupId, selection.groupKey, slugify(selection.groupName)].filter(Boolean)
  );

  return (
    entry.specifiers.find(
      (specifier) => groupCandidates.has(specifier.id) || groupCandidates.has(slugify(specifier.name))
    ) || null
  );
}

function groupSpecifierSelectionsByMetadata(entry, selections = []) {
  const grouped = new Map();

  selections.forEach((selection) => {
    const specifier = findSpecifierMetadata(entry, selection);
    const groupKey = specifier?.id || selection.groupId || selection.groupKey || slugify(selection.groupName);

    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        specifier,
        selections: []
      });
    }

    grouped.get(groupKey).selections.push(selection);
  });

  return Array.from(grouped.values());
}

function assessExplicitSpecifierSelections(entry, explicitSelections = []) {
  const validSelections = [];
  const warnings = [];

  groupSpecifierSelectionsByMetadata(entry, explicitSelections).forEach(({ specifier, selections }) => {
    const minSelections = specifier?.minSelections || 1;

    if (selections.length > 0 && selections.length < minSelections) {
      if (specifier) {
        warnings.push(`${specifier.name} requires at least ${minSelections} selections to apply.`);
      }
      return;
    }

    validSelections.push(...selections);
  });

  return {
    validSelections,
    warnings
  };
}

function appendCriteria(lines, label, criteriaSelections) {
  if (!criteriaSelections.length) {
    return;
  }

  lines.push(`${label}:`);

  criteriaSelections.forEach((selection) => {
    lines.push(`  - ${selection.label}`);
    if (selection.substantiation) {
      lines.push(`    Substantiation: ${selection.substantiation}`);
    }
  });

  lines.push("");
}

function entryLineLabel(entry) {
  switch (entry.kind) {
    case "additional-code":
      return "Additional Code";
    case "group":
    case "reference-entry":
    case "general-criteria":
      return "Entry";
    case "clinical-focus-condition":
      return "Clinical Code";
    case "diagnosis":
    default:
      return "Diagnosis";
  }
}

function buildExplicitSpecifierLabels(entry, validExplicitSelections = []) {
  const labels = [];

  groupSpecifierSelectionsByMetadata(entry, validExplicitSelections).forEach(({ specifier, selections }) => {
    if (specifier?.reportLabelMode === "group") {
      labels.push(specifier.name);
      return;
    }

    selections.forEach((selection) => labels.push(selection.optionName));
  });

  return uniqueBy(
    labels.map((name) => ({ name })).filter((item) => item.name),
    (item) => item.name
  ).map((item) => item.name);
}

function buildSpecifierNames(entry, validExplicitSelections, codingResult) {
  const explicitLabels = buildExplicitSpecifierLabels(entry, validExplicitSelections);
  const derivedLabels = uniqueBy(
    normalizeDerivedSelections(codingResult.derivedSelections)
      .map((selection) => ({ name: selection.optionName }))
      .filter((item) => item.name),
    (item) => item.name
  ).map((item) => item.name);

  return uniqueBy(
    [...explicitLabels, ...derivedLabels].map((name) => ({ name })),
    (item) => item.name
  ).map((item) => item.name);
}

function findCodingInputMetadata(entry, selection) {
  const groupCandidates = new Set(
    [selection.groupId, selection.groupKey, slugify(selection.groupName)].filter(Boolean)
  );

  return (
    entry.coding.inputs.find(
      (inputGroup) => groupCandidates.has(inputGroup.id) || groupCandidates.has(slugify(inputGroup.name))
    ) || null
  );
}

function buildCodingInputNames(entry, selectionState) {
  return uniqueBy(
    (selectionState.selectedCodingOptions || [])
      .filter((selection) => findCodingInputMetadata(entry, selection)?.includeInDiagnosisLabel !== false)
      .map((selection) => ({ name: selection.optionName }))
      .filter((item) => item.name),
    (item) => item.name
  ).map((item) => item.name);
}

function buildBaseDiagnosisLabel(entry, selectionState, codingResult, validExplicitSelections) {
  const codingInputNames = buildCodingInputNames(entry, selectionState);
  const specifierNames = buildSpecifierNames(entry, validExplicitSelections, codingResult);
  const qualifierNames = uniqueBy(
    [...codingInputNames, ...specifierNames].map((name) => ({ name })),
    (item) => item.name
  ).map((item) => item.name);

  return qualifierNames.length ? `${entry.name}, ${qualifierNames.join(", ")}` : entry.name;
}

function buildRecordingFieldMap(recordingFields = []) {
  const map = new Map();

  recordingFields.forEach((field) => {
    const value = field.value?.trim();
    if (value) {
      map.set(field.fieldKey, value);
    }
  });

  return map;
}

function formatSubstanceInducedLabel(entry, selectionState, codingResult, validExplicitSelections) {
  const selectedSubstance =
    selectionState.selectedCodingOptions.find((selection) => selection.groupName === "Substance Type")
      ?.optionName ||
    selectionState.selectedCodingOptions[0]?.optionName ||
    selectionState.selectedSpecifierOptions.find((selection) => selection.groupName === "Substance Type")
      ?.optionName;

  if (!selectedSubstance) {
    return entry.name;
  }

  const tail = entry.name.replace(/^Substance\/Medication-Induced\s+/i, "").toLowerCase();
  const baseLabel = `${selectedSubstance.toLowerCase()}-induced ${tail}`;
  const specifierNames = buildSpecifierNames(entry, validExplicitSelections, codingResult);
  return specifierNames.length ? `${baseLabel}, ${specifierNames.join(", ")}` : baseLabel;
}

function findSelectedOptionName(selections = [], groupName) {
  return selections.find((selection) => selection.groupName === groupName)?.optionName || null;
}

function buildNeurocognitiveEtiologyDiagnosis(
  entry,
  selectionState,
  codingResult,
  validExplicitSelections,
  fieldValues
) {
  const etiology = findSelectedOptionName(validExplicitSelections, "Etiological Subtypes");
  const behavioralDisturbance = findSelectedOptionName(
    validExplicitSelections,
    "Behavioral Disturbance"
  );

  if (etiology === "Substance/medication use") {
    const selectedSubstance = findSelectedOptionName(selectionState.selectedCodingOptions, "Substance Type");
    const inducedBase = selectedSubstance
      ? `${selectedSubstance.toLowerCase()}-induced ${entry.name.toLowerCase()}`
      : `substance/medication-induced ${entry.name.toLowerCase()}`;
    const diagnosisLabel = behavioralDisturbance
      ? `${inducedBase}, ${behavioralDisturbance}`
      : inducedBase;
    const comorbidUseDisorder = fieldValues.get("comorbid-substance-use-disorder");
    return prefixPrimaryCode(
      comorbidUseDisorder ? `${comorbidUseDisorder} with ${diagnosisLabel}` : diagnosisLabel,
      codingResult
    );
  }

  if (etiology && etiology !== "Unspecified etiology") {
    const diagnosisBase = `${entry.name} due to ${etiology}`;
    const diagnosisLabel = behavioralDisturbance
      ? `${diagnosisBase}, ${behavioralDisturbance}`
      : diagnosisBase;
    return prefixPrimaryCode(diagnosisLabel, codingResult);
  }

  const diagnosisBase = etiology ? `${entry.name}, ${etiology}` : entry.name;
  const diagnosisLabel = behavioralDisturbance
    ? `${diagnosisBase}, ${behavioralDisturbance}`
    : diagnosisBase;
  return prefixPrimaryCode(diagnosisLabel, codingResult);
}

function buildMajorNeurocognitiveEtiologyDiagnosis(
  entry,
  selectionState,
  codingResult,
  validExplicitSelections,
  fieldValues
) {
  const recordedDiagnosis = buildNeurocognitiveEtiologyDiagnosis(
    entry,
    selectionState,
    codingResult,
    validExplicitSelections,
    fieldValues
  );
  const etiology = findSelectedOptionName(validExplicitSelections, "Etiological Subtypes");
  const additionalEtiologyCodes = fieldValues.get("additional-etiology-codes");
  const usesMedicalCodePrefix =
    etiology &&
    !["Vascular disease", "Substance/medication use", "Unspecified etiology"].includes(etiology);
  const medicalCondition = fieldValues.get("etiological-medical-condition");
  const medicalConditionCode = fieldValues.get("etiological-medical-condition-code");
  const medicalPrefix = usesMedicalCodePrefix
    ? [medicalConditionCode, medicalCondition].filter(Boolean).join(" ")
    : "";
  const prefixedDiagnosis = medicalPrefix
    ? `${medicalPrefix}; ${recordedDiagnosis}`
    : recordedDiagnosis;

  return additionalEtiologyCodes
    ? `${prefixedDiagnosis}; ${additionalEtiologyCodes}`
    : prefixedDiagnosis;
}

function prefixPrimaryCode(text, codingResult) {
  if (codingResult.status === "resolved" && codingResult.primaryCode) {
    return `${codingResult.primaryCode} ${text}`;
  }

  return text;
}

const SPECIFIC_LEARNING_DOMAIN_ORDER = [
  "With impairment in reading",
  "With impairment in written expression",
  "With impairment in mathematics"
];

const SPECIFIC_LEARNING_CODE_BY_DOMAIN = new Map([
  ["With impairment in reading", "F81.0"],
  ["With impairment in written expression", "F81.81"],
  ["With impairment in mathematics", "F81.2"]
]);

function buildSpecificLearningDiagnosis(
  entry,
  selectionState,
  codingResult,
  validExplicitSelections
) {
  const selectedDomains = SPECIFIC_LEARNING_DOMAIN_ORDER.filter((domainName) =>
    (selectionState.selectedCodingOptions || []).some(
      (selection) => selection.groupName === "Academic Domains" && selection.optionName === domainName
    )
  );

  if (!selectedDomains.length) {
    return prefixPrimaryCode(
      buildBaseDiagnosisLabel(entry, selectionState, codingResult, validExplicitSelections),
      codingResult
    );
  }

  const severityLabel =
    validExplicitSelections.find((selection) => selection.groupName === "Severity")?.optionName || null;

  return selectedDomains
    .map((domainName) => {
      const qualifiers = [
        domainName,
        ...validExplicitSelections
          .filter((selection) => selection.groupName === domainName)
          .map((selection) => selection.optionName)
      ];

      if (severityLabel) {
        qualifiers.push(severityLabel);
      }

      const label = qualifiers.length ? `${entry.name}, ${qualifiers.join(", ")}` : entry.name;
      const code = SPECIFIC_LEARNING_CODE_BY_DOMAIN.get(domainName);
      return code ? `${code} ${label}` : label;
    })
    .join("; ");
}

function buildStereotypicMovementDiagnosis(
  entry,
  selectionState,
  codingResult,
  validExplicitSelections,
  fieldValues
) {
  const associatedSelection = validExplicitSelections.some(
    (selection) => selection.groupName === "Association"
  );
  const associatedName = fieldValues.get("associated-condition-disorder-or-factor");
  const associatedCodes = fieldValues.get("associated-condition-disorder-or-factor-codes");

  const filteredSelections = validExplicitSelections.filter(
    (selection) => selection.groupName !== "Association"
  );
  const baseQualifierNames = buildSpecifierNames(entry, filteredSelections, codingResult);
  const diagnosisBase =
    associatedSelection && associatedName
      ? `${entry.name} associated with ${associatedName}`
      : associatedSelection
        ? `${entry.name}, Associated with a known genetic or other medical condition, neurodevelopmental disorder, or environmental factor`
        : entry.name;
  const diagnosisLabel = baseQualifierNames.length
    ? `${diagnosisBase}, ${baseQualifierNames.join(", ")}`
    : diagnosisBase;
  const recordedDiagnosis = prefixPrimaryCode(diagnosisLabel, codingResult);

  return associatedCodes ? `${recordedDiagnosis}; ${associatedCodes}` : recordedDiagnosis;
}

function buildAssociatedMentalDisorderFirstDiagnosis(entry, codingResult, fieldValues) {
  const associatedMentalDisorder = fieldValues.get("associated-mental-disorder");
  const associatedMentalDisorderCode = fieldValues.get("associated-mental-disorder-code");
  const bareEntryName = entry.name.replace(/\s*\(Catatonia Specifier\)\s*$/i, "");
  const diagnosisLabel = associatedMentalDisorder
    ? bareEntryName.replace(/another mental disorder/i, associatedMentalDisorder)
    : bareEntryName;
  const recordedDiagnosis = prefixPrimaryCode(diagnosisLabel, codingResult);
  const disorderPrefix = [associatedMentalDisorderCode, associatedMentalDisorder]
    .filter(Boolean)
    .join(" ");

  return disorderPrefix ? `${disorderPrefix}; ${recordedDiagnosis}` : recordedDiagnosis;
}

function buildUnspecifiedCatatoniaDiagnosis(codingResult) {
  const symptomCode = codingResult.primaryCode || "R29.818";
  const catatoniaCode = codingResult.additionalCodes[0] || "F06.1";
  return `${symptomCode} other symptoms involving nervous and musculoskeletal systems; ${catatoniaCode} Unspecified Catatonia`;
}

function buildRecordedDiagnosis(entry, selectionState, codingResult, validExplicitSelections) {
  const fieldValues = buildRecordingFieldMap(selectionState.recordingFields);
  const baseDiagnosisLabel = buildBaseDiagnosisLabel(
    entry,
    selectionState,
    codingResult,
    validExplicitSelections
  );

  switch (entry.recording?.mode) {
    case "other-specified-with-reason": {
      const specificReason = fieldValues.get("specific-reason");
      const diagnosisLabel = specificReason ? `${baseDiagnosisLabel}, ${specificReason}` : baseDiagnosisLabel;
      return prefixPrimaryCode(diagnosisLabel, codingResult);
    }
    case "medical-condition-first": {
      const medicalCondition = fieldValues.get("etiological-medical-condition");
      const medicalConditionCode = fieldValues.get("etiological-medical-condition-code");
      const manifestation = fieldValues.get("specific-symptomatic-manifestation");

      let diagnosisLabel = medicalCondition
        ? baseDiagnosisLabel.replace(/another medical condition|a medical condition/i, medicalCondition)
        : baseDiagnosisLabel;

      if (manifestation) {
        diagnosisLabel = `${diagnosisLabel}, ${manifestation}`;
      }

      const diagnosisWithCode = prefixPrimaryCode(diagnosisLabel, codingResult);
      const conditionPrefix = [medicalConditionCode, medicalCondition].filter(Boolean).join(" ");
      return conditionPrefix ? `${conditionPrefix}; ${diagnosisWithCode}` : diagnosisWithCode;
    }
    case "associated-mental-disorder-first":
      return buildAssociatedMentalDisorderFirstDiagnosis(entry, codingResult, fieldValues);
    case "unspecified-catatonia-code-first":
      return buildUnspecifiedCatatoniaDiagnosis(codingResult);
    case "coded-after-prefix": {
      const prefixCode = fieldValues.get("code-first-prefix-code");
      const prefixLabel = fieldValues.get("code-first-prefix-label");
      const diagnosisWithCode = prefixPrimaryCode(baseDiagnosisLabel, codingResult);
      const prefix = [prefixCode, prefixLabel].filter(Boolean).join(" ");
      return prefix ? `${prefix}; ${diagnosisWithCode}` : diagnosisWithCode;
    }
    case "central-sleep-apnea-opioid-first": {
      const diagnosisWithCode = prefixPrimaryCode(baseDiagnosisLabel, codingResult);
      const opioidUseDisorder = findSelectedOptionName(
        selectionState.selectedCodingOptions,
        "Opioid Use Disorder"
      );
      const opioidUseDisorderCode = codingResult.additionalCodes[0];

      if (!opioidUseDisorderCode || !opioidUseDisorder || /not present/i.test(opioidUseDisorder)) {
        return diagnosisWithCode;
      }

      return `${opioidUseDisorderCode} ${opioidUseDisorder.toLowerCase()}; ${diagnosisWithCode}`;
    }
    case "comorbid-conditions-after": {
      const comorbidConditions = fieldValues.get("comorbid-conditions");
      const relatedCodes = fieldValues.get("related-diagnosis-codes");
      let diagnosisLabel = baseDiagnosisLabel;

      if (comorbidConditions) {
        diagnosisLabel = `${diagnosisLabel}, with ${comorbidConditions}`;
      }

      let recordedDiagnosis = prefixPrimaryCode(diagnosisLabel, codingResult);
      if (relatedCodes) {
        recordedDiagnosis = `${recordedDiagnosis}; ${relatedCodes}`;
      }

      return recordedDiagnosis;
    }
    case "substance-induced-first": {
      const comorbidUseDisorder = fieldValues.get("comorbid-substance-use-disorder");
      const inducedLabel = formatSubstanceInducedLabel(
        entry,
        selectionState,
        codingResult,
        validExplicitSelections
      );
      const diagnosisLabel = comorbidUseDisorder
        ? `${comorbidUseDisorder} with ${inducedLabel}`
        : inducedLabel;

      return prefixPrimaryCode(diagnosisLabel, codingResult);
    }
    case "neurocognitive-etiology":
      return buildNeurocognitiveEtiologyDiagnosis(
        entry,
        selectionState,
        codingResult,
        validExplicitSelections,
        fieldValues
      );
    case "major-neurocognitive-etiology":
      return buildMajorNeurocognitiveEtiologyDiagnosis(
        entry,
        selectionState,
        codingResult,
        validExplicitSelections,
        fieldValues
      );
    case "specific-learning-multiple-domains":
      return buildSpecificLearningDiagnosis(
        entry,
        selectionState,
        codingResult,
        validExplicitSelections
      );
    case "stereotypic-associated-condition":
      return buildStereotypicMovementDiagnosis(
        entry,
        selectionState,
        codingResult,
        validExplicitSelections,
        fieldValues
      );
    case "dual-diagnosis-note":
    case "standard":
    default:
      return prefixPrimaryCode(baseDiagnosisLabel, codingResult);
  }
}

function appendSelectionWarnings(lines, warnings = []) {
  if (!warnings.length) {
    return;
  }

  lines.push("Selection Warnings:");
  warnings.forEach((warning) => lines.push(`- ${warning}`));
  lines.push("");
}

function appendGroupedSelections(lines, label, groupedSelections) {
  if (groupedSelections.size === 0) {
    return;
  }

  lines.push(`${label}:`);
  for (const [groupName, values] of groupedSelections.entries()) {
    const displayGroup = groupName === "severity" ? "Severity" : groupName;
    lines.push(`${displayGroup}: ${values.join(", ")}`);
  }
  lines.push("");
}

function appendRecordingDetails(lines, recordingFields = []) {
  const populatedFields = recordingFields.filter((field) => field.value?.trim());
  if (!populatedFields.length) {
    return;
  }

  lines.push("Recording Details:");
  populatedFields.forEach((field) => {
    lines.push(`${field.label}: ${field.value.trim()}`);
  });
  lines.push("");
}

function appendRecordingGuidance(lines, entry) {
  if (!entry.recording?.instructions?.length) {
    return;
  }

  lines.push("Recording Guidance:");
  entry.recording.instructions.forEach((instruction) => lines.push(`- ${instruction}`));
  lines.push("");
}

export function buildReport(entry, selectionState, codingResult) {
  const specifierAssessment = assessExplicitSpecifierSelections(
    entry,
    selectionState.selectedSpecifierOptions || []
  );
  const lines = [];

  lines.push(`${entryLineLabel(entry)}: ${entry.name}`);
  lines.push(`ICD-10-CM: ${codingResult.displayCode}`);

  if (codingResult.status === "resolved" && codingResult.additionalCodes.length > 0) {
    if (codingResult.codeOrder === "additional-first") {
      lines.push(`Code First: ${codingResult.additionalCodes.join(", ")}`);
      lines.push(`Then Code: ${codingResult.primaryCode}`);
    } else {
      lines.push(`Primary Code: ${codingResult.primaryCode}`);
      lines.push(`Additional Code(s): ${codingResult.additionalCodes.join(", ")}`);
    }
  }

  lines.push(
    `Recorded As: ${buildRecordedDiagnosis(
      entry,
      selectionState,
      codingResult,
      specifierAssessment.validSelections
    )}`
  );
  lines.push("");
  appendSelectionWarnings(lines, specifierAssessment.warnings);

  appendCriteria(lines, "Criteria Met", selectionState.selectedCriteria);
  appendCriteria(lines, "Specifier Criteria Met", selectionState.selectedSpecifierCriteria);

  const groupedSelections = groupSelections(
    dedupeSelections(specifierAssessment.validSelections, codingResult.derivedSelections)
  );
  appendGroupedSelections(lines, "Specifiers", groupedSelections);

  const codingSelections = groupSelections(selectionState.selectedCodingOptions || []);
  appendGroupedSelections(lines, "Coding Inputs", codingSelections);
  appendRecordingDetails(lines, selectionState.recordingFields);
  appendRecordingGuidance(lines, entry);

  if (codingResult.notes.length > 0) {
    lines.push("Coding Notes:");
    codingResult.notes.forEach((note) => lines.push(`- ${note}`));
  }

  return lines.join("\n").trim();
}
