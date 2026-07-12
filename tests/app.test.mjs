import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { JSDOM } from "jsdom";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const dataset = JSON.parse(
  fs.readFileSync(new URL("../data/dsm-dataset.json", import.meta.url), "utf8")
);

function createMemoryStorage() {
  const values = new Map();

  return {
    clear() {
      values.clear();
    },
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    key(index) {
      return Array.from(values.keys())[index] ?? null;
    },
    removeItem(key) {
      values.delete(key);
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    get length() {
      return values.size;
    }
  };
}

function installGlobals(window, prefersDark = false) {
  const keys = [
    "window",
    "document",
    "navigator",
    "localStorage",
    "HTMLElement",
    "Event",
    "CustomEvent",
    "Node",
    "fetch"
  ];
  const previous = new Map(
    keys.map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key) || { value: globalThis[key], configurable: true }
    ])
  );

  const clipboardState = { text: "" };
  let safeLocalStorage;
  try {
    safeLocalStorage = window.localStorage;
  } catch (error) {
    safeLocalStorage = createMemoryStorage();
  }

  window.matchMedia = () => ({
    matches: prefersDark,
    addEventListener() {},
    removeEventListener() {}
  });
  window.navigator.clipboard = {
    async writeText(text) {
      clipboardState.text = text;
    }
  };
  window.document.execCommand = () => true;

  const replacements = {
    window,
    document: window.document,
    navigator: window.navigator,
    localStorage: safeLocalStorage,
    HTMLElement: window.HTMLElement,
    Event: window.Event,
    CustomEvent: window.CustomEvent,
    Node: window.Node,
    fetch: async () =>
      new Response(JSON.stringify(dataset), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
  };

  Object.entries(replacements).forEach(([key, value]) => {
    Object.defineProperty(globalThis, key, {
      configurable: true,
      writable: true,
      value
    });
  });

  return {
    clipboardState,
    restore() {
      previous.forEach((descriptor, key) => {
        Object.defineProperty(globalThis, key, descriptor);
      });
    }
  };
}

async function setupApp(options = {}) {
  const dom = new JSDOM(html, {
    url: options.url || "http://localhost/DSMDx/",
    pretendToBeVisual: true
  });

  dom.window.__DSMDX_DISABLE_AUTO_INIT__ = true;
  const globals = installGlobals(dom.window, options.prefersDark);
  const moduleUrl = new URL(`../src/app.js?test=${Date.now()}-${Math.random()}`, import.meta.url);
  const appModule = await import(moduleUrl.href);
  await appModule.initializeApp();

  return {
    dom,
    document: dom.window.document,
    window: dom.window,
    clipboardState: globals.clipboardState,
    cleanup() {
      globals.restore();
      dom.window.close();
    }
  };
}

function setSelectValue(select, value, window) {
  select.value = value;
  select.dispatchEvent(new window.Event("change", { bubbles: true }));
}

test("app startup populates categories and diagnoses", async () => {
  const app = await setupApp();

  try {
    assert.equal(app.document.querySelectorAll("#categories option").length, 22);
    assert.ok(app.document.querySelectorAll("#diagnoses option").length > 0);
    assert.equal(
      app.document.querySelector("#right-panel-content h2")?.textContent?.trim(),
      "Intellectual Developmental Disorder (Intellectual Disability)"
    );
    assert.match(
      app.document.getElementById("right-panel-content").textContent,
      /The essential features of intellectual developmental disorder/
    );
    assert.doesNotMatch(
      app.document.getElementById("right-panel-content").textContent,
      /The essential features of language disorder/i
    );
  } finally {
    app.cleanup();
  }
});

test("app can initialize from a file URL when the generated dataset module is present", async () => {
  const app = await setupApp({
    url: "file:///Users/nickhighland/Documents/DSMDx/index.html"
  });

  try {
    assert.equal(app.document.querySelectorAll("#categories option").length, 22);
    assert.match(
      app.document.getElementById("right-panel-content").textContent,
      /Intellectual Developmental Disorder/
    );
  } finally {
    app.cleanup();
  }
});

test("diagnosis selection renders required subtype specifiers and resolves the code", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "trauma-and-stressor-related-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "trauma-and-stressor-related-disorders-adjustment-disorders",
      app.window
    );

    const subtypeOptions = app.document.querySelectorAll(
      "#specifiers-container input[data-selection-role='specifier-option'][data-group-name='Subtype']"
    );
    assert.equal(subtypeOptions.length, 6);

    subtypeOptions[1].checked = true;
    subtypeOptions[1].dispatchEvent(new app.window.Event("change", { bubbles: true }));

    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "F43.22"
    );
  } finally {
    app.cleanup();
  }
});

test("required single-choice specifiers can be cleared back to unresolved", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "trauma-and-stressor-related-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "trauma-and-stressor-related-disorders-adjustment-disorders",
      app.window
    );

    const subtypeInput = app.document.querySelector(
      "#specifiers-container input[data-selection-role='specifier-option'][data-group-name='Subtype'][data-option-name='With anxiety']"
    );
    assert.ok(subtypeInput);

    subtypeInput.checked = true;
    subtypeInput.dispatchEvent(new app.window.Event("change", { bubbles: true }));

    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "F43.22"
    );

    const clearButton = app.document.querySelector(
      `#specifiers-container button[data-group-id='${subtypeInput.dataset.groupId}']`
    );
    assert.ok(clearButton);
    clearButton.click();

    assert.equal(subtypeInput.checked, false);
    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "Select Subtype to resolve code"
    );
  } finally {
    app.cleanup();
  }
});

test("unresolved code messaging names the required specifier group when a diagnosis depends on it", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-conduct-disorder",
      app.window
    );

    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "Select Onset Type to resolve code"
    );
  } finally {
    app.cleanup();
  }
});

test("ui labels optional, thresholded, and required selection groups", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "substance-related-and-addictive-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "substance-related-and-addictive-disorders-alcohol-use-disorder",
      app.window
    );

    const optionalBadge = app.document.querySelector(
      "#specifiers-container .selection-group-badge.optional"
    );
    assert.ok(optionalBadge);
    assert.equal(optionalBadge.textContent?.trim(), "Optional");

    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-conduct-disorder",
      app.window
    );

    const minimumBadge = app.document.querySelector(
      "#specifiers-container .selection-group-badge.minimum"
    );
    assert.ok(minimumBadge);
    assert.equal(minimumBadge.textContent?.trim(), "Select 2+");

    setSelectValue(
      app.document.getElementById("categories"),
      "trauma-and-stressor-related-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "trauma-and-stressor-related-disorders-adjustment-disorders",
      app.window
    );

    const requiredBadge = app.document.querySelector(
      "#specifiers-container [data-group-id='trauma-and-stressor-related-disorders-adjustment-disorders-specifier-0-subtype'] .selection-group-badge.required"
    );
    assert.ok(requiredBadge);
    assert.equal(requiredBadge.textContent?.trim(), "Required for code");
  } finally {
    app.cleanup();
  }
});

test("optional single-choice specifiers can be cleared back to no selection", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "substance-related-and-addictive-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "substance-related-and-addictive-disorders-alcohol-use-disorder",
      app.window
    );

    const criteriaInputs = app.document.querySelectorAll(
      "#criteria-container input[data-selection-role='criteria']"
    );
    assert.ok(criteriaInputs.length >= 2);

    criteriaInputs[0].checked = true;
    criteriaInputs[0].dispatchEvent(new app.window.Event("change", { bubbles: true }));
    criteriaInputs[1].checked = true;
    criteriaInputs[1].dispatchEvent(new app.window.Event("change", { bubbles: true }));

    const remissionInput = app.document.querySelector(
      "#specifiers-container input[data-option-name='In early remission']"
    );
    assert.ok(remissionInput);

    remissionInput.checked = true;
    remissionInput.dispatchEvent(new app.window.Event("change", { bubbles: true }));

    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "F10.11"
    );

    const clearButton = app.document.querySelector(
      `#specifiers-container button[data-group-id='${remissionInput.dataset.groupId}']`
    );
    assert.ok(clearButton);
    clearButton.click();

    assert.equal(remissionInput.checked, false);
    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "F10.10"
    );
  } finally {
    app.cleanup();
  }
});

test("criterion notes remain visible for Oppositional Defiant Disorder", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-oppositional-defiant-disorder",
      app.window
    );

    const criteriaText = app.document.getElementById("criteria-container").textContent;
    assert.match(criteriaText, /Note: The persistence and frequency of these behaviors should be used/);
  } finally {
    app.cleanup();
  }
});

test("specifier-linked catatonia subcriteria render for Autism Spectrum Disorder", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "neurodevelopmental-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "neurodevelopmental-disorders-autism-spectrum-disorder",
      app.window
    );

    const catatoniaInput = app.document.querySelector(
      "#specifiers-container input[data-option-name='With catatonia']"
    );
    assert.ok(catatoniaInput);

    catatoniaInput.checked = true;
    catatoniaInput.dispatchEvent(new app.window.Event("change", { bubbles: true }));

    const details = catatoniaInput.closest(".specifier-option").querySelector(".specifier-option-details");
    assert.equal(details.hidden, false);
    assert.match(details.textContent, /Stupor/);
  } finally {
    app.cleanup();
  }
});

test("theme initialization follows system preference and the toggle persists the next theme", async () => {
  const app = await setupApp({ prefersDark: true });

  try {
    const root = app.document.documentElement;
    assert.equal(root.dataset.theme, "dark");

    const toggle = app.document.getElementById("theme-toggle");
    toggle.click();

    assert.equal(root.dataset.theme, "light");
    assert.equal(app.window.localStorage.getItem("dsmdx-theme"), "light");
  } finally {
    app.cleanup();
  }
});

test("right panel shows the corrected source status for audited entries", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "sexual-dysfunctions",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "sexual-dysfunctions-delayed-ejaculation",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Source Status: Corrected/);
    assert.doesNotMatch(rightPanelText, /has not yet been chapter-audited/i);
  } finally {
    app.cleanup();
  }
});

test("Specific Learning Disorder resolves multiple selected academic-domain codes in the UI", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "neurodevelopmental-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "neurodevelopmental-disorders-specific-learning-disorder",
      app.window
    );

    const academicDomainInputs = Array.from(
      app.document.querySelectorAll(
        "#coding-inputs-container input[data-selection-role='coding-option'][data-group-name='Academic Domains']"
      )
    );

    assert.equal(academicDomainInputs.length, 3);

    const reading = academicDomainInputs.find(
      (input) => input.dataset.optionName === "With impairment in reading"
    );
    const mathematics = academicDomainInputs.find(
      (input) => input.dataset.optionName === "With impairment in mathematics"
    );

    assert.ok(reading);
    assert.ok(mathematics);

    reading.checked = true;
    reading.dispatchEvent(new app.window.Event("change", { bubbles: true }));
    mathematics.checked = true;
    mathematics.dispatchEvent(new app.window.Event("change", { bubbles: true }));

    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "F81.0; F81.2"
    );
  } finally {
    app.cleanup();
  }
});

test("right panel shows positive source-status callouts for reviewed and corrected entries", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "neurodevelopmental-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "neurodevelopmental-disorders-autism-spectrum-disorder",
      app.window
    );

    let rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Source Status: Reviewed/);
    assert.match(rightPanelText, /copied from cited DSM pages/i);

    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-conduct-disorder",
      app.window
    );

    rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Source Status: Corrected/);
    assert.match(rightPanelText, /manual DSM-aligned fixes/i);
  } finally {
    app.cleanup();
  }
});

test("right panel displays audited DSM page references for chapter sections", async () => {
  const app = await setupApp();

  try {
    setSelectValue(app.document.getElementById("categories"), "depressive-disorders", app.window);
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "depressive-disorders-persistent-depressive-disorder-dysthymia",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Title pages: 320/);
    assert.match(rightPanelText, /DSM pp\. 322/);
    assert.match(rightPanelText, /DSM pp\. 324-325/);
  } finally {
    app.cleanup();
  }
});

test("Conduct Disorder now includes sourced narrative sections in the right panel", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-conduct-disorder",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Diagnostic Features/);
    assert.match(rightPanelText, /repetitive and persistent pattern of behavior/i);
    assert.match(rightPanelText, /DSM pp\. 742/);
  } finally {
    app.cleanup();
  }
});

test("Intermittent Explosive Disorder now includes sourced narrative sections in the right panel", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-intermittent-explosive-disorder",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Diagnostic Features/);
    assert.match(rightPanelText, /The impulsive \(or anger-based\) aggressive outbursts/i);
    assert.match(rightPanelText, /DSM pp\. 735/);
  } finally {
    app.cleanup();
  }
});

test("legacy manual summary phrasing no longer appears in the rendered intermittent explosive panel", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "disruptive-impulse-control-and-conduct-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "disruptive-impulse-control-and-conduct-disorders-intermittent-explosive-disorder",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.doesNotMatch(rightPanelText, /grossly out of proportion to the provocation/i);
    assert.match(rightPanelText, /response to a minor provocation by a close intimate or associate/i);
  } finally {
    app.cleanup();
  }
});

test("Tourette's Disorder now shows expanded reviewed section coverage", async () => {
  const app = await setupApp();

  try {
    setSelectValue(
      app.document.getElementById("categories"),
      "neurodevelopmental-disorders",
      app.window
    );
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "neurodevelopmental-disorders-tourettes-disorder",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Functional Consequences of Tic Disorders/);
    assert.match(rightPanelText, /DSM pp\. 203/);
  } finally {
    app.cleanup();
  }
});

test("Bipolar II Disorder now shows sourced narrative sections in the right panel", async () => {
  const app = await setupApp();

  try {
    setSelectValue(app.document.getElementById("categories"), "bipolar-and-related-disorders", app.window);
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "bipolar-and-related-disorders-bipolar-ii-disorder",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /Diagnostic Features/);
    assert.match(rightPanelText, /clinical course of recurring mood episodes/i);
    assert.match(rightPanelText, /DSM pp\. 272-273/);
  } finally {
    app.cleanup();
  }
});

test("Breathing-Related Sleep Disorders shows a sourced overview and remains not directly coded", async () => {
  const app = await setupApp();

  try {
    setSelectValue(app.document.getElementById("categories"), "sleep-wake-disorders", app.window);
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "sleep-wake-disorders-breathing-related-sleep-disorders",
      app.window
    );

    const rightPanelText = app.document.getElementById("right-panel-content").textContent;
    assert.match(rightPanelText, /The breathing-related sleep disorders category encompasses/i);
    assert.match(rightPanelText, /DSM pp\. 613/);
    assert.equal(
      app.document.querySelector("#icd-code-container span")?.textContent?.trim(),
      "Not directly coded"
    );
  } finally {
    app.cleanup();
  }
});

test("recording detail fields feed into the generated report", async () => {
  const app = await setupApp();

  try {
    setSelectValue(app.document.getElementById("categories"), "sleep-wake-disorders", app.window);
    setSelectValue(
      app.document.getElementById("diagnoses"),
      "sleep-wake-disorders-other-specified-insomnia-disorder",
      app.window
    );

    const reasonField = app.document.querySelector(
      "#recording-fields-container input[data-field-key='specific-reason']"
    );
    assert.ok(reasonField);

    reasonField.value = "short-term insomnia disorder";
    reasonField.dispatchEvent(new app.window.Event("input", { bubbles: true }));

    const reportText = app.document.getElementById("report-output").value;
    assert.match(
      reportText,
      /Recorded As: G47\.09 Other Specified Insomnia Disorder, short-term insomnia disorder/
    );
  } finally {
    app.cleanup();
  }
});
