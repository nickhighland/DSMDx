import { slugify, uniqueBy } from "./utils.js";

function selectionMatches(selection, expectedGroup, expectedOption) {
  const groupCandidates = [selection.groupId, selection.groupKey, slugify(selection.groupName)];
  const optionCandidates = [selection.optionId, selection.optionKey, slugify(selection.optionName)];

  return groupCandidates.includes(expectedGroup) && optionCandidates.includes(expectedOption);
}

function selectionMatchesGroup(selection, expectedGroup) {
  const groupCandidates = [selection.groupId, selection.groupKey, slugify(selection.groupName)];
  return groupCandidates.includes(expectedGroup);
}

function hasConflictingSelection(selectionState, expectedGroup, expectedOption) {
  const groupSelections = selectionState.selectedOptions.filter((selection) =>
    selectionMatchesGroup(selection, expectedGroup)
  );

  return (
    groupSelections.length > 0 &&
    !groupSelections.some((selection) => selectionMatches(selection, expectedGroup, expectedOption))
  );
}

function getRuleSelectionGroups(rule) {
  return uniqueBy(
    (rule.conditions || [])
      .filter((condition) => condition.type === "selection")
      .map((condition) => condition.group),
    (groupId) => groupId
  );
}

function findSelectionGroup(entry, expectedGroup) {
  return (
    entry.specifiers.find(
      (specifier) => specifier.id === expectedGroup || slugify(specifier.name) === expectedGroup
    ) ||
    (entry.coding.inputs || []).find(
      (inputGroup) => inputGroup.id === expectedGroup || slugify(inputGroup.name) === expectedGroup
    ) ||
    null
  );
}

function describeMissingSelectionGroups(entry, selectionState) {
  const allRules = (entry.coding.rules || []).filter((rule) => Array.isArray(rule.conditions));
  const viableRules = allRules.filter((rule) =>
    rule.conditions.every((condition) => {
      if (condition.type !== "selection") {
        return true;
      }

      return !hasConflictingSelection(selectionState, condition.group, condition.option);
    })
  );
  const candidateRules = viableRules.length ? viableRules : allRules;

  const groupIds = uniqueBy(candidateRules.flatMap((rule) => getRuleSelectionGroups(rule)), (groupId) => groupId).filter(
    (groupId) => candidateRules.every((rule) => getRuleSelectionGroups(rule).includes(groupId))
  );

  return groupIds
    .filter(
      (groupId) =>
        !selectionState.selectedOptions.some((selection) => selectionMatchesGroup(selection, groupId))
    )
    .map((groupId) => findSelectionGroup(entry, groupId)?.name || groupId);
}

function matchesCondition(condition, selectionState) {
  switch (condition.type) {
    case "selection":
      return selectionState.selectedOptions.some((selection) =>
        selectionMatches(selection, condition.group, condition.option)
      );
    case "no-selection-in-group":
      return !selectionState.selectedOptions.some((selection) =>
        selectionMatchesGroup(selection, condition.group)
      );
    case "criteria-count-between":
      return (
        selectionState.criteriaCount >= condition.min && selectionState.criteriaCount <= condition.max
      );
    case "criteria-count-at-least":
      return selectionState.criteriaCount >= condition.min;
    default:
      return false;
  }
}

function resolveAdditionalCodes(entry, selectionState) {
  const rules = entry.coding.additionalCodeRules || [];

  return uniqueBy(
    rules
      .filter((rule) => rule.conditions.every((condition) => matchesCondition(condition, selectionState)))
      .map((rule) => rule.code),
    (code) => code
  );
}

function resolveOptionMap(entry, selectionState) {
  const matchedRule = (entry.coding.rules || []).find((rule) =>
    rule.conditions.every((condition) => matchesCondition(condition, selectionState))
  );

  if (!matchedRule) {
    if (entry.coding.defaultCode) {
      return {
        status: "resolved",
        primaryCode: entry.coding.defaultCode,
        derivedSelections: entry.coding.defaultDerivedSelections || [],
        codeOrder: entry.coding.codeOrder || "primary-first",
        notes: entry.coding.notes || []
      };
    }

    return {
      status: entry.coding.requireSelection ? "needs-selection" : "unresolved",
      primaryCode: null,
      derivedSelections: [],
      missingSelectionGroups: entry.coding.requireSelection
        ? describeMissingSelectionGroups(entry, selectionState)
        : [],
      notes: entry.coding.notes || []
    };
  }

  return {
    status: "resolved",
    primaryCode: matchedRule.code,
    derivedSelections: matchedRule.derivedSelections || [],
    codeOrder: matchedRule.codeOrder || entry.coding.codeOrder || "primary-first",
    missingSelectionGroups: [],
    notes: entry.coding.notes || []
  };
}

function resolveComposite(entry, selectionState) {
  const sortedRules = [...(entry.coding.rules || [])].sort(
    (left, right) => (right.conditions?.length || 0) - (left.conditions?.length || 0)
  );

  const matchedRule = sortedRules.find((rule) =>
    rule.conditions.every((condition) => matchesCondition(condition, selectionState))
  );

  if (!matchedRule) {
    return {
      status: selectionState.criteriaCount > 0 ? "needs-review" : "criteria-not-met",
      primaryCode: null,
      derivedSelections: [],
      notes: entry.coding.notes || []
    };
  }

  return {
    status: "resolved",
    primaryCode: matchedRule.code,
    derivedSelections: matchedRule.derivedSelections || [],
    notes: entry.coding.notes || []
  };
}

export function resolveEntryCoding(entry, selectionState) {
  let resolution;

  switch (entry.coding.strategy) {
    case "fixed":
    case "fixed-with-additional":
      resolution = {
        status: "resolved",
        primaryCode: entry.coding.code,
        derivedSelections: [],
        missingSelectionGroups: [],
        notes: entry.coding.notes || []
      };
      break;
    case "option-map":
      resolution = resolveOptionMap(entry, selectionState);
      break;
    case "composite":
      resolution = resolveComposite(entry, selectionState);
      break;
    case "none":
      resolution = {
        status: "not-directly-coded",
        primaryCode: null,
        derivedSelections: [],
        missingSelectionGroups: [],
        notes: entry.coding.notes || []
      };
      break;
    case "needs-review":
    default:
      resolution = {
        status: "needs-review",
        primaryCode: null,
        derivedSelections: [],
        missingSelectionGroups: [],
        notes: entry.coding.notes || []
      };
      break;
  }

  const additionalCodes = resolveAdditionalCodes(entry, selectionState);
  const allCodes =
    resolution.codeOrder === "additional-first"
      ? [...additionalCodes, resolution.primaryCode].filter(Boolean)
      : [resolution.primaryCode, ...additionalCodes].filter(Boolean);
  const codeJoiner = entry.coding.codeJoiner || " + ";

  let displayCode = "N/A";
  if (resolution.status === "not-directly-coded") {
    displayCode = entry.coding.displayLabel || "Not directly coded";
  } else if (resolution.status === "needs-review") {
    displayCode = entry.coding.displayLabel || "Code selection under review";
  } else if (resolution.status === "needs-selection") {
    displayCode = resolution.missingSelectionGroups?.length
      ? `Select ${resolution.missingSelectionGroups.join(" and ")} to resolve code`
      : "Select specifiers to resolve code";
  } else if (resolution.status === "criteria-not-met") {
    displayCode = "Criteria threshold not met";
  } else if (allCodes.length > 0) {
    displayCode = allCodes.join(codeJoiner);
  }

  return {
    ...resolution,
    additionalCodes,
    allCodes,
    displayCode
  };
}

export function getComputedSpecifierGroupKeys(entry) {
  if (Array.isArray(entry.coding.computedGroups) && entry.coding.computedGroups.length > 0) {
    return new Set(entry.coding.computedGroups);
  }

  if (entry.coding.strategy !== "composite") {
    return new Set();
  }

  const keys = new Set();
  for (const rule of entry.coding.rules || []) {
    for (const derivedSelection of rule.derivedSelections || []) {
      if (derivedSelection.group) {
        keys.add(derivedSelection.group);
      }
    }
  }
  return keys;
}

export function getCodingGroupRequirements(entry) {
  const requirementMap = new Map();
  const rules = (entry?.coding?.rules || []).filter((rule) => Array.isArray(rule.conditions));

  if (!rules.length) {
    return requirementMap;
  }

  const allGroupIds = uniqueBy(
    rules.flatMap((rule) => getRuleSelectionGroups(rule)),
    (groupId) => groupId
  );

  allGroupIds.forEach((groupId) => {
    const universalAcrossRules =
      !entry.coding.defaultCode &&
      rules.every((rule) => getRuleSelectionGroups(rule).includes(groupId));

    requirementMap.set(groupId, universalAcrossRules ? "required" : "conditional");
  });

  return requirementMap;
}

export function buildSelectionState(
  entry,
  selectedCriteria,
  selectedSpecifierOptions,
  selectedSpecifierCriteria,
  selectedCodingOptions = [],
  recordingFields = []
) {
  return {
    entryId: entry.id,
    criteriaCount: selectedCriteria.length,
    selectedCriteria,
    selectedSpecifierOptions,
    selectedSpecifierCriteria,
    selectedCodingOptions,
    recordingFields,
    selectedOptions: [...selectedSpecifierOptions, ...selectedCodingOptions]
  };
}
