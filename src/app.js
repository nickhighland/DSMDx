import { loadDataset, indexDataset, getEntriesForChapter } from "./lib/dataset.js";
import {
  buildSelectionState,
  getCodingGroupRequirements,
  getComputedSpecifierGroupKeys,
  resolveEntryCoding
} from "./lib/coding.js";
import { buildReport } from "./lib/report.js";
import { slugify } from "./lib/utils.js";

const THEME_STORAGE_KEY = "dsmdx-theme";

const elements = {
  categoriesSelect: document.getElementById("categories"),
  diagnosesSelect: document.getElementById("diagnoses"),
  criteriaContainer: document.getElementById("criteria-container"),
  specifiersContainer: document.getElementById("specifiers-container"),
  codingInputsContainer: document.getElementById("coding-inputs-container"),
  recordingFieldsContainer: document.getElementById("recording-fields-container"),
  icdCodeContainer: document.getElementById("icd-code-container"),
  reportOutput: document.getElementById("report-output"),
  copyButton: document.getElementById("copy-button"),
  copyFeedback: document.getElementById("copy-feedback"),
  rightPanelContent: document.getElementById("right-panel-content"),
  themeToggle: document.getElementById("theme-toggle")
};

const appState = {
  dataset: null,
  chapterById: new Map(),
  entryById: new Map()
};

function loadStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function detectSystemTheme() {
  if (typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(themePreference) {
  const activeTheme = themePreference || detectSystemTheme();
  document.documentElement.dataset.theme = activeTheme;
  elements.themeToggle.setAttribute("aria-pressed", String(activeTheme === "dark"));
  elements.themeToggle.textContent =
    activeTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

function initializeTheme() {
  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  applyTheme(loadStoredTheme());

  const handleThemeChange = () => {
    if (!loadStoredTheme()) {
      applyTheme(null);
    }
  };

  if (typeof mediaQuery?.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleThemeChange);
  } else if (typeof mediaQuery?.addListener === "function") {
    mediaQuery.addListener(handleThemeChange);
  }

  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      // Ignore storage failures and still update the local page theme.
    }
    applyTheme(nextTheme);
  });
}

function entryKindLabel(kind) {
  const labels = {
    diagnosis: "Diagnosis",
    "additional-code": "Additional code",
    group: "Group overview",
    "clinical-focus-condition": "Clinical attention code",
    "general-criteria": "General criteria",
    "reference-entry": "Reference entry"
  };

  return labels[kind] || "Entry";
}

function auditLabel(status) {
  const labels = {
    reviewed: "Reviewed",
    unchecked: "Unchecked",
    corrected: "Corrected",
    "needs-manual-verification": "Needs verification"
  };

  return labels[status] || status;
}

function formatPages(source) {
  const chapterPages = source.chapterPages?.every(Boolean)
    ? `${source.chapterPages[0]}-${source.chapterPages[1]}`
    : "N/A";
  const titlePages = source.titlePages?.length ? source.titlePages.join(", ") : chapterPages;

  return { chapterPages, titlePages };
}

function formatPageList(pages = []) {
  if (!pages.length) {
    return "";
  }

  const sortedPages = [...pages].sort((left, right) => left - right);
  const ranges = [];
  let rangeStart = sortedPages[0];
  let rangeEnd = sortedPages[0];

  sortedPages.slice(1).forEach((page) => {
    if (page === rangeEnd + 1) {
      rangeEnd = page;
      return;
    }

    ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
    rangeStart = page;
    rangeEnd = page;
  });

  ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
  return ranges.join(", ");
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

function createInfoSection(title, content, pages = []) {
  const section = document.createElement("section");
  section.className = "mb-6 prose max-w-none";

  const headingRow = document.createElement("div");
  headingRow.className = "section-heading-row";

  const heading = document.createElement("h3");
  heading.className = "text-xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2";
  heading.textContent = title;
  headingRow.appendChild(heading);

  if (pages.length > 0) {
    const sourcePages = document.createElement("span");
    sourcePages.className = "section-source-pages";
    sourcePages.textContent = `DSM pp. ${formatPageList(pages)}`;
    headingRow.appendChild(sourcePages);
  }

  const body = document.createElement("div");
  body.className = "text-gray-700 section-body";
  body.textContent = content;

  section.appendChild(headingRow);
  section.appendChild(body);
  return section;
}

function renderEntryMetadata(entry) {
  const metaStrip = document.createElement("div");
  metaStrip.className = "meta-strip mb-4";

  const kindPill = document.createElement("span");
  kindPill.className = "meta-pill";
  kindPill.textContent = entryKindLabel(entry.kind);
  metaStrip.appendChild(kindPill);

  const auditPill = document.createElement("span");
  auditPill.className = "meta-pill";
  auditPill.textContent = auditLabel(entry.audit.status);
  metaStrip.appendChild(auditPill);

  const pages = formatPages(entry.source);
  const sourcePill = document.createElement("span");
  sourcePill.className = "meta-pill";
  sourcePill.textContent = `Title pages: ${pages.titlePages}`;
  metaStrip.appendChild(sourcePill);

  return metaStrip;
}

function sourceStatusMessage(entry) {
  const messages = {
    reviewed:
      "Reviewed against the local DSM-5-TR PDF. Narrative sections shown here are copied from cited DSM pages.",
    corrected:
      "Corrected against the local DSM-5-TR PDF. This entry received manual DSM-aligned fixes for wording, page mapping, or coding details.",
    unchecked:
      "This entry has not yet been chapter-audited. Verify subtle criteria, specifier, and coding details against the cited DSM pages before relying on it.",
    "needs-manual-verification":
      "This entry still needs manual verification against the local DSM-5-TR PDF before its criteria, specifier, and coding details should be treated as authoritative."
  };

  return messages[entry.audit.status] || messages.unchecked;
}

function createSourceStatusCallout(entry) {
  const status = entry.audit.status || "unchecked";
  const callout = document.createElement("section");
  callout.className = `audit-status-callout audit-status-${status}`;

  const heading = document.createElement("h3");
  heading.className = "audit-status-heading";
  heading.textContent = `Source Status: ${auditLabel(status)}`;
  callout.appendChild(heading);

  const body = document.createElement("p");
  body.className = "audit-status-body";
  body.textContent = sourceStatusMessage(entry);
  callout.appendChild(body);

  return callout;
}

function displayFullDiagnosisInfo(entry) {
  elements.rightPanelContent.innerHTML = "";
  elements.rightPanelContent.scrollTop = 0;

  if (!entry) {
    const emptyState = document.createElement("p");
    emptyState.className = "text-gray-500";
    emptyState.textContent = "Select an entry to see details.";
    elements.rightPanelContent.appendChild(emptyState);
    return;
  }

  const title = document.createElement("h2");
  title.className = "text-3xl font-bold mb-2 text-indigo-700";
  title.textContent = entry.name;
  elements.rightPanelContent.appendChild(title);
  elements.rightPanelContent.appendChild(renderEntryMetadata(entry));
  elements.rightPanelContent.appendChild(createSourceStatusCallout(entry));

  if (entry.audit.notes?.length) {
    elements.rightPanelContent.appendChild(
      createInfoSection("Audit Notes", entry.audit.notes.map((note) => `- ${note}`).join("\n"))
    );
  }

  if (entry.sections.length > 0) {
    entry.sections.forEach((section) => {
      if (section.content) {
        elements.rightPanelContent.appendChild(
          createInfoSection(
            section.title,
            section.content,
            entry.source.sectionPages?.[makeSectionSourceKey(section.title)] || []
          )
        );
      }
    });
  } else if (entry.criteria.length > 0 && entry.criteria[0].text) {
    elements.rightPanelContent.appendChild(
      createInfoSection("Description", entry.criteria[0].text, entry.source.sectionPages?.description || [])
    );
  } else {
    elements.rightPanelContent.appendChild(
      createInfoSection(
        "Description",
        "This entry currently needs a fuller chapter summary audit against the DSM-5-TR source text.",
        entry.source.sectionPages?.description || []
      )
    );
  }

  if (entry.differentialDiagnosis) {
    elements.rightPanelContent.appendChild(
      createInfoSection(
        "Differential Diagnosis",
        entry.differentialDiagnosis,
        entry.source.sectionPages?.differentialDiagnosis || []
      )
    );
  }

  if (entry.comorbidity) {
    elements.rightPanelContent.appendChild(
      createInfoSection("Comorbidity", entry.comorbidity, entry.source.sectionPages?.comorbidity || [])
    );
  }

  if (entry.coding.notes?.length) {
    elements.rightPanelContent.appendChild(
      createInfoSection(
        "Coding Guidance",
        entry.coding.notes.map((note) => `- ${note}`).join("\n"),
        entry.source.sectionPages?.coding || []
      )
    );
  }
}

function renderEmptyState(container, headingText, message) {
  container.innerHTML = `<h3 class="section-heading">${headingText}</h3>`;
  const messageNode = document.createElement("p");
  messageNode.className = "text-sm text-gray-500 mt-2";
  messageNode.textContent = message;
  container.appendChild(messageNode);
}

function createSubstantiationField(onChange) {
  const container = document.createElement("div");
  container.className = "Substantiation-div";
  container.hidden = true;

  const textarea = document.createElement("textarea");
  textarea.className = "Substantiation-box w-full p-2 border border-gray-300 rounded-md mt-1";
  textarea.placeholder = "Substantiation...";
  textarea.addEventListener("input", onChange);

  container.appendChild(textarea);
  return container;
}

function renderCriterionNote(text, container) {
  const note = document.createElement("div");
  note.className = "criteria-note text-sm text-gray-600 mt-1";
  note.textContent = `Note: ${text}`;
  container.appendChild(note);
}

function renderCriteria(criteria, container, options = {}) {
  if (!criteria.length) {
    return;
  }

  const {
    indent = 0,
    idPrefix = "criterion",
    allowSubstantiation = true,
    selectionRole = "criteria"
  } = options;

  const list = document.createElement("ul");
  list.className = `criteria-list ml-${indent * 4}`;

  criteria.forEach((criterion, index) => {
    const item = document.createElement("li");
    item.className = "mb-2";

    const criterionId = `${idPrefix}-${index}-${criterion.id}`;
    const codePrefix = criterion.code ? `${criterion.code}. ` : "";

    if (criterion.isHeader) {
      const header = document.createElement("span");
      header.className = "criterion-header";
      header.textContent = `${codePrefix}${criterion.text}`;
      item.appendChild(header);
    } else {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = criterionId;
      checkbox.className = "mr-2 leading-tight";
      checkbox.dataset.selectionRole = selectionRole;
      checkbox.dataset.label = `${codePrefix}${criterion.text}`;
      checkbox.addEventListener("change", () => {
        const substantiation = item.querySelector(".Substantiation-div");
        if (substantiation) {
          substantiation.hidden = !checkbox.checked;
          if (!checkbox.checked) {
            substantiation.querySelector("textarea").value = "";
          }
        }
        syncOptionDetails(elements.specifiersContainer, "specifier-option");
        updateReport();
      });

      const label = document.createElement("label");
      label.htmlFor = criterionId;
      label.textContent = `${codePrefix}${criterion.text}`;

      item.appendChild(checkbox);
      item.appendChild(label);

      if (allowSubstantiation) {
        item.appendChild(createSubstantiationField(updateReport));
      }
    }

    if (criterion.note) {
      renderCriterionNote(criterion.note, item);
    }

    if (criterion.items.length > 0) {
      renderCriteria(criterion.items, item, {
        indent: indent + 1,
        idPrefix: `${criterionId}-item`,
        allowSubstantiation,
        selectionRole
      });
    }

    criterion.groups.forEach((group, groupIndex) => {
      const groupBlock = document.createElement("div");
      groupBlock.className = `ml-${(indent + 1) * 4} criteria-subcategory`;

      const groupHeading = document.createElement("strong");
      groupHeading.textContent = group.name;
      groupBlock.appendChild(groupHeading);

      renderCriteria(group.items, groupBlock, {
        indent: indent + 1,
        idPrefix: `${criterionId}-group-${groupIndex}`,
        allowSubstantiation,
        selectionRole
      });

      item.appendChild(groupBlock);
    });

    list.appendChild(item);
  });

  container.appendChild(list);
}

function createOptionDetails(option, inputId, selectionRole = "specifier-criteria") {
  const details = document.createElement("div");
  details.className = "specifier-option-details ml-8 mt-1";
  details.hidden = true;

  if (option.description) {
    const description = document.createElement("p");
    description.className = "text-sm text-gray-600";
    description.textContent = option.description;
    details.appendChild(description);
  }

  option.details.forEach((detail) => {
    const detailLine = document.createElement("p");
    detailLine.className = "text-sm text-gray-600 mt-1";
    detailLine.textContent = `${detail.label}: ${detail.value}`;
    details.appendChild(detailLine);
  });

  if (option.criteria.length > 0) {
    const criteriaWrapper = document.createElement("div");
    criteriaWrapper.className = "mt-2";
    renderCriteria(option.criteria, criteriaWrapper, {
      idPrefix: `${inputId}-criterion`,
      allowSubstantiation: false,
      selectionRole
    });
    details.appendChild(criteriaWrapper);
  }

  return details;
}

function syncOptionDetails(container, selectionRole) {
  container.querySelectorAll(".specifier-option").forEach((optionNode) => {
    const input = optionNode.querySelector(`input[data-selection-role='${selectionRole}']`);
    const details = optionNode.querySelector(".specifier-option-details");
    if (input && details) {
      details.hidden = !input.checked;
    }
  });
}

function createComputedSpecifierBlock(specifier) {
  const block = document.createElement("div");
  block.className = "mb-4";

  const heading = document.createElement("strong");
  heading.className = "text-gray-800";
  heading.textContent = specifier.name;
  block.appendChild(heading);

  if (specifier.description) {
    const description = document.createElement("p");
    description.className = "text-sm text-gray-500 specifier-description";
    description.textContent = specifier.description;
    block.appendChild(description);
  }

  const computed = document.createElement("div");
  computed.className = "computed-specifier mt-1 text-gray-600";
  computed.dataset.computedGroup = slugify(specifier.name);
  computed.textContent = "Calculated from selected criteria.";
  block.appendChild(computed);

  return block;
}

function createGroupBadge(label, variant) {
  const badge = document.createElement("span");
  badge.className = `selection-group-badge ${variant}`;
  badge.textContent = label;
  return badge;
}

function clearSelectionGroup(container, groupId, selectionRole) {
  container
    .querySelectorAll(
      `input[data-selection-role='${selectionRole}'][data-group-id='${groupId}']`
    )
    .forEach((input) => {
      input.checked = false;
    });
}

function renderSpecifiers(entry) {
  elements.specifiersContainer.innerHTML = '<h3 class="section-heading">Specifiers</h3>';

  if (!entry.specifiers.length) {
    renderEmptyState(
      elements.specifiersContainer,
      "Specifiers",
      "No specifiers are stored for this entry yet."
    );
    return;
  }

  const computedGroups = getComputedSpecifierGroupKeys(entry);
  const codingGroupRequirements = getCodingGroupRequirements(entry);

  entry.specifiers.forEach((specifier) => {
    const specifierKey = slugify(specifier.name);
    const codingRequirement = codingGroupRequirements.get(specifier.id) || null;

    if (specifier.isComputed || computedGroups.has(specifierKey)) {
      elements.specifiersContainer.appendChild(createComputedSpecifierBlock(specifier));
      return;
    }

    const block = document.createElement("div");
    block.className = "mb-4";
    block.dataset.groupId = specifier.id;

    const headingRow = document.createElement("div");
    headingRow.className = "selection-group-heading";

    const heading = document.createElement("strong");
    heading.className = "text-gray-800";
    heading.textContent = specifier.name;
    headingRow.appendChild(heading);

    if (codingRequirement === "required") {
      headingRow.appendChild(createGroupBadge("Required for code", "required"));
    } else if (codingRequirement === "conditional") {
      headingRow.appendChild(createGroupBadge("Required in some cases", "conditional"));
    } else if (specifier.allowsEmpty !== false) {
      headingRow.appendChild(createGroupBadge("Optional", "optional"));
    }

    if (specifier.minSelections > 1) {
      headingRow.appendChild(createGroupBadge(`Select ${specifier.minSelections}+`, "minimum"));
    }

    if (specifier.selectionType === "single" && specifier.allowsEmpty !== false) {
      const clearButton = document.createElement("button");
      clearButton.type = "button";
      clearButton.className = "clear-selection-button";
      clearButton.textContent = "Clear";
      clearButton.dataset.groupId = specifier.id;
      clearButton.dataset.selectionRole = "specifier-option";
      clearButton.addEventListener("click", () => {
        clearSelectionGroup(elements.specifiersContainer, specifier.id, "specifier-option");
        syncOptionDetails(elements.specifiersContainer, "specifier-option");
        updateReport();
      });
      headingRow.appendChild(clearButton);
    }

    block.appendChild(headingRow);

    if (specifier.description) {
      const description = document.createElement("p");
      description.className = "text-sm text-gray-500 specifier-description";
      description.textContent = specifier.description;
      block.appendChild(description);
    }

    specifier.options.forEach((option) => {
      const optionBlock = document.createElement("div");
      optionBlock.className = "specifier-option mt-1";

      const line = document.createElement("div");
      const input = document.createElement("input");
      input.type = specifier.selectionType === "single" ? "radio" : "checkbox";
      if (input.type === "radio") {
        input.name = `specifier-${specifier.id}`;
      }
      input.id = option.id;
      input.className = "mr-2";
      input.dataset.selectionRole = "specifier-option";
      input.dataset.groupId = specifier.id;
      input.dataset.groupKey = specifierKey;
      input.dataset.groupName = specifier.name;
      input.dataset.optionId = option.id;
      input.dataset.optionKey = slugify(option.name);
      input.dataset.optionName = option.name;
      input.addEventListener("change", () => {
        syncOptionDetails(elements.specifiersContainer, "specifier-option");
        updateReport();
      });

      const label = document.createElement("label");
      label.htmlFor = option.id;
      label.textContent = option.name;

      line.appendChild(input);
      line.appendChild(label);
      optionBlock.appendChild(line);

      if (option.description || option.details.length > 0 || option.criteria.length > 0) {
        optionBlock.appendChild(createOptionDetails(option, option.id));
      }

      block.appendChild(optionBlock);
    });

    elements.specifiersContainer.appendChild(block);
  });

  syncOptionDetails(elements.specifiersContainer, "specifier-option");
}

function renderCodingInputs(entry) {
  elements.codingInputsContainer.innerHTML = '<h3 class="section-heading">Coding Inputs</h3>';

  const inputGroups = entry.coding.inputs || [];
  const codingGroupRequirements = getCodingGroupRequirements(entry);
  if (!inputGroups.length) {
    renderEmptyState(
      elements.codingInputsContainer,
      "Coding Inputs",
      "No additional coding inputs are required for this entry."
    );
    return;
  }

  inputGroups.forEach((group) => {
    const groupKey = slugify(group.name);
    const codingRequirement = codingGroupRequirements.get(group.id) || null;
    const block = document.createElement("div");
    block.className = "mb-4";

    const headingRow = document.createElement("div");
    headingRow.className = "selection-group-heading";

    const heading = document.createElement("strong");
    heading.className = "text-gray-800";
    heading.textContent = group.name;
    headingRow.appendChild(heading);

    if (codingRequirement === "required") {
      headingRow.appendChild(createGroupBadge("Required for code", "required"));
    } else if (codingRequirement === "conditional") {
      headingRow.appendChild(createGroupBadge("Required in some cases", "conditional"));
    } else if (group.allowsEmpty !== false) {
      headingRow.appendChild(createGroupBadge("Optional", "optional"));
    }

    if (group.selectionType === "single" && group.allowsEmpty !== false) {
      const clearButton = document.createElement("button");
      clearButton.type = "button";
      clearButton.className = "clear-selection-button";
      clearButton.textContent = "Clear";
      clearButton.dataset.groupId = group.id;
      clearButton.dataset.selectionRole = "coding-option";
      clearButton.addEventListener("click", () => {
        clearSelectionGroup(elements.codingInputsContainer, group.id, "coding-option");
        syncOptionDetails(elements.codingInputsContainer, "coding-option");
        updateReport();
      });
      headingRow.appendChild(clearButton);
    }

    block.appendChild(headingRow);

    if (group.description) {
      const description = document.createElement("p");
      description.className = "text-sm text-gray-500 specifier-description";
      description.textContent = group.description;
      block.appendChild(description);
    }

    group.options.forEach((option) => {
      const optionBlock = document.createElement("div");
      optionBlock.className = "specifier-option mt-1";

      const line = document.createElement("div");
      const input = document.createElement("input");
      input.type = group.selectionType === "single" ? "radio" : "checkbox";
      if (input.type === "radio") {
        input.name = `coding-input-${group.id}`;
      }
      input.id = option.id;
      input.className = "mr-2";
      input.dataset.selectionRole = "coding-option";
      input.dataset.groupId = group.id;
      input.dataset.groupKey = groupKey;
      input.dataset.groupName = group.name;
      input.dataset.optionId = option.id;
      input.dataset.optionKey = slugify(option.name);
      input.dataset.optionName = option.name;
      input.addEventListener("change", () => {
        syncOptionDetails(elements.codingInputsContainer, "coding-option");
        updateReport();
      });

      const label = document.createElement("label");
      label.htmlFor = option.id;
      label.textContent = option.name;

      line.appendChild(input);
      line.appendChild(label);
      optionBlock.appendChild(line);

      if (option.description || option.details.length > 0 || option.criteria.length > 0) {
        optionBlock.appendChild(createOptionDetails(option, option.id, "coding-criteria"));
      }

      block.appendChild(optionBlock);
    });

    elements.codingInputsContainer.appendChild(block);
  });

  syncOptionDetails(elements.codingInputsContainer, "coding-option");
}

function renderRecordingFields(entry) {
  elements.recordingFieldsContainer.innerHTML = '<h3 class="section-heading">Recording Details</h3>';

  if (!entry.recording?.instructions?.length && !entry.recording?.fields?.length) {
    renderEmptyState(
      elements.recordingFieldsContainer,
      "Recording Details",
      "No extra recording details are needed for this entry."
    );
    return;
  }

  if (entry.recording.instructions.length > 0) {
    const guidanceList = document.createElement("ul");
    guidanceList.className = "guidance-list text-sm";

    entry.recording.instructions.forEach((instruction) => {
      const item = document.createElement("li");
      item.textContent = instruction;
      guidanceList.appendChild(item);
    });

    elements.recordingFieldsContainer.appendChild(guidanceList);
  }

  if (!entry.recording.fields.length) {
    const note = document.createElement("p");
    note.className = "text-sm text-gray-500 mt-2";
    note.textContent = "This entry has recording guidance notes but no additional report fields.";
    elements.recordingFieldsContainer.appendChild(note);
    return;
  }

  entry.recording.fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group recording-field-group";

    const label = document.createElement("label");
    label.className = "field-label";
    label.htmlFor = field.id;
    label.textContent = field.label;
    wrapper.appendChild(label);

    if (field.description) {
      const description = document.createElement("p");
      description.className = "text-sm text-gray-500 mb-2";
      description.textContent = field.description;
      wrapper.appendChild(description);
    }

    const input = field.multiline ? document.createElement("textarea") : document.createElement("input");
    if (!field.multiline) {
      input.type = "text";
    }
    input.id = field.id;
    input.className = "recording-field";
    input.placeholder = field.placeholder;
    input.dataset.recordingField = "true";
    input.dataset.fieldId = field.id;
    input.dataset.fieldKey = field.key;
    input.dataset.label = field.label;
    input.addEventListener("input", updateReport);
    wrapper.appendChild(input);

    elements.recordingFieldsContainer.appendChild(wrapper);
  });
}

function getCurrentEntry() {
  return appState.entryById.get(elements.diagnosesSelect.value) || null;
}

function setCodeDisplay(text) {
  elements.icdCodeContainer.innerHTML = `
    <h3 class="text-lg font-semibold text-gray-800 code-display">
      ICD-10-CM:
      <span class="font-bold text-indigo-600">${text}</span>
    </h3>
  `;
}

function collectCriteriaSelections(containerSelector) {
  return Array.from(document.querySelectorAll(containerSelector)).map((input) => ({
    id: input.id,
    label: input.dataset.label,
    substantiation: input.parentElement.querySelector(".Substantiation-div textarea")?.value?.trim() || ""
  }));
}

function collectSpecifierSelections() {
  return Array.from(
    document.querySelectorAll("#specifiers-container input[data-selection-role='specifier-option']:checked")
  ).map((input) => ({
    groupId: input.dataset.groupId,
    groupKey: input.dataset.groupKey,
    groupName: input.dataset.groupName,
    optionId: input.dataset.optionId,
    optionKey: input.dataset.optionKey,
    optionName: input.dataset.optionName
  }));
}

function collectCodingSelections() {
  return Array.from(
    document.querySelectorAll("#coding-inputs-container input[data-selection-role='coding-option']:checked")
  ).map((input) => ({
    groupId: input.dataset.groupId,
    groupKey: input.dataset.groupKey,
    groupName: input.dataset.groupName,
    optionId: input.dataset.optionId,
    optionKey: input.dataset.optionKey,
    optionName: input.dataset.optionName
  }));
}

function collectRecordingFields() {
  return Array.from(
    document.querySelectorAll("#recording-fields-container [data-recording-field='true']")
  ).map((input) => ({
    fieldId: input.dataset.fieldId,
    fieldKey: input.dataset.fieldKey,
    label: input.dataset.label,
    value: input.value.trim()
  }));
}

function updateComputedSpecifierDisplays(codingResult) {
  const derivedByGroup = new Map(
    (codingResult.derivedSelections || []).map((selection) => [selection.group, selection.label || selection.option])
  );

  document.querySelectorAll(".computed-specifier").forEach((node) => {
    const derivedLabel = derivedByGroup.get(node.dataset.computedGroup);
    node.textContent = derivedLabel
      ? `Calculated from selected criteria: ${derivedLabel}`
      : "Calculated from selected criteria.";
  });
}

function updateReport() {
  const entry = getCurrentEntry();
  if (!entry) {
    elements.reportOutput.value = "";
    setCodeDisplay("N/A");
    return;
  }

  const selectedCriteria = collectCriteriaSelections(
    "#criteria-container input[data-selection-role='criteria']:checked"
  );
  const selectedSpecifierOptions = collectSpecifierSelections();
  const selectedCodingOptions = collectCodingSelections();
  const recordingFields = collectRecordingFields();
  const selectedSpecifierCriteria = collectCriteriaSelections(
    "#specifiers-container input[data-selection-role='specifier-criteria']:checked"
  );

  const selectionState = buildSelectionState(
    entry,
    selectedCriteria,
    selectedSpecifierOptions,
    selectedSpecifierCriteria,
    selectedCodingOptions,
    recordingFields
  );
  const codingResult = resolveEntryCoding(entry, selectionState);

  setCodeDisplay(codingResult.displayCode);
  updateComputedSpecifierDisplays(codingResult);

  elements.reportOutput.value = buildReport(entry, selectionState, codingResult);
  elements.reportOutput.style.height = "auto";
  elements.reportOutput.style.height = `${elements.reportOutput.scrollHeight}px`;
}

function updateAllPanels() {
  const entry = getCurrentEntry();
  displayFullDiagnosisInfo(entry);

  if (!entry) {
    renderEmptyState(elements.criteriaContainer, "Diagnostic Criteria", "Select an entry to see details.");
    renderEmptyState(elements.specifiersContainer, "Specifiers", "Select an entry to see details.");
    renderEmptyState(elements.codingInputsContainer, "Coding Inputs", "Select an entry to see details.");
    renderEmptyState(
      elements.recordingFieldsContainer,
      "Recording Details",
      "Select an entry to see details."
    );
    setCodeDisplay("N/A");
    elements.reportOutput.value = "";
    return;
  }

  if (entry.criteria.length > 0) {
    elements.criteriaContainer.innerHTML = '<h3 class="section-heading">Diagnostic Criteria</h3>';
    renderCriteria(entry.criteria, elements.criteriaContainer, { selectionRole: "criteria" });
  } else {
    renderEmptyState(
      elements.criteriaContainer,
      "Diagnostic Criteria",
      "No checklist-style criteria are stored for this entry."
    );
  }

  renderSpecifiers(entry);
  renderCodingInputs(entry);
  renderRecordingFields(entry);
  updateReport();
}

function populateDiagnoses() {
  const chapterId = elements.categoriesSelect.value;
  const entries = getEntriesForChapter(appState.dataset, chapterId);

  elements.diagnosesSelect.innerHTML = "";
  entries.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = entry.name;
    elements.diagnosesSelect.appendChild(option);
  });

  updateAllPanels();
}

function populateCategories() {
  elements.categoriesSelect.innerHTML = "";

  appState.dataset.chapters.forEach((chapter) => {
    const option = document.createElement("option");
    option.value = chapter.id;
    option.textContent = chapter.title;
    elements.categoriesSelect.appendChild(option);
  });

  populateDiagnoses();
}

async function copyReportToClipboard() {
  if (!elements.reportOutput.value) {
    return;
  }

  try {
    await navigator.clipboard.writeText(elements.reportOutput.value);
  } catch (error) {
    elements.reportOutput.select();
    document.execCommand("copy");
  }

  elements.copyFeedback.classList.add("is-visible");
  window.setTimeout(() => {
    elements.copyFeedback.classList.remove("is-visible");
  }, 2000);
}

export async function initializeApp() {
  elements.rightPanelContent.innerHTML =
    '<p class="text-gray-500">Loading DSM dataset. If this stalls, use a local web server or refresh the static data files.</p>';

  initializeTheme();

  elements.categoriesSelect.addEventListener("change", populateDiagnoses);
  elements.diagnosesSelect.addEventListener("change", updateAllPanels);
  elements.copyButton.addEventListener("click", copyReportToClipboard);

  appState.dataset = await loadDataset();
  const indexes = indexDataset(appState.dataset);
  appState.chapterById = indexes.chapterById;
  appState.entryById = indexes.entryById;

  populateCategories();
}

function showInitializationError(error) {
  console.error(error);

  const isFilePreviewError =
    /DSMDX_DATASET_MODULE_LOAD_FAILED|DSMDX_FILE_PROTOCOL_UNSUPPORTED/i.test(error?.message || "");
  const isTimeoutError = /DSMDX_DATASET_LOAD_TIMEOUT/i.test(error?.message || "");

  if (isFilePreviewError) {
    elements.rightPanelContent.innerHTML = `
      <div class="init-message">
        <p class="text-gray-800 font-semibold">Unable to load the DSM dataset from the local file preview.</p>
        <p class="text-gray-500">Safari can be strict about loading linked data files from local file previews. Use a local server such as \`python3 -m http.server 4173\` from the project folder, then open the local server address in Safari.</p>
      </div>
    `;
    return;
  }

  if (isTimeoutError) {
    elements.rightPanelContent.innerHTML = `
      <div class="init-message">
        <p class="text-gray-800 font-semibold">The DSM dataset took too long to load.</p>
        <p class="text-gray-500">Refresh the page once. If it keeps happening, rebuild the static artifacts and verify the local data files are present.</p>
      </div>
    `;
    return;
  }

  elements.rightPanelContent.innerHTML = `
    <div class="init-message">
      <p class="text-gray-800 font-semibold">Unable to load the DSM dataset.</p>
      <p class="text-gray-500">Check that the generated data files exist and that the page is being served from the project folder or GitHub Pages.</p>
    </div>
  `;
}

if (typeof window !== "undefined" && !window.__DSMDX_DISABLE_AUTO_INIT__) {
  initializeApp().catch(showInitializationError);
}
