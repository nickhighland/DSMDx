import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import browserDataset from "../data/dsm-dataset.js";

const dataset = JSON.parse(
  fs.readFileSync(new URL("../data/dsm-dataset.json", import.meta.url), "utf8")
);
const manualOverrideAudit = JSON.parse(
  fs.readFileSync(new URL("../data/manual-override-audit.json", import.meta.url), "utf8")
);
const indexHtml = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("browser module and inspection JSON contain the same generated dataset", () => {
  assert.deepEqual(browserDataset, dataset);
});

test("dataset declares static GitHub Pages hosting with no third-party runtime requests", () => {
  assert.equal(dataset.meta.hosting.target, "GitHub Pages");
  assert.equal(dataset.meta.hosting.staticAssetOnly, true);
  assert.equal(dataset.meta.hosting.thirdPartyRuntimeRequestsAllowed, false);
  assert.equal(dataset.meta.source.criteriaPrimarySource, "DSM-5-TR full manual PDF");
  assert.equal(dataset.meta.source.narrativePrimarySource, "DSM-5-TR full manual PDF");
  assert.equal(dataset.meta.source.legacyNarrativeBlueprintsEnabled, false);
  assert.equal(dataset.meta.source.legacyNarrativeFallbackEnabled, false);
  assert.equal(
    dataset.meta.stats.auditedEntries,
    dataset.meta.stats.reviewedEntries + dataset.meta.stats.correctedEntries
  );
});

test("index.html locks runtime assets to local self-hosted sources", () => {
  assert.match(indexHtml, /Content-Security-Policy/);
  assert.match(indexHtml, /default-src 'self'/);
  assert.match(indexHtml, /connect-src 'self'/);
  assert.match(indexHtml, /name="referrer" content="no-referrer"/);
});

test("chapter ids and entry ids are unique", () => {
  const chapterIds = new Set(dataset.chapters.map((chapter) => chapter.id));
  const entryIds = new Set(dataset.entries.map((entry) => entry.id));

  assert.equal(chapterIds.size, dataset.chapters.length);
  assert.equal(entryIds.size, dataset.entries.length);
});

test("audited pilot entries are marked reviewed", () => {
  const pilotIds = [
    "neurodevelopmental-disorders-autism-spectrum-disorder",
    "disruptive-impulse-control-and-conduct-disorders-oppositional-defiant-disorder",
    "substance-related-and-addictive-disorders-alcohol-use-disorder",
    "sleep-wake-disorders-breathing-related-sleep-disorders"
  ];

  pilotIds.forEach((id) => {
    const entry = dataset.entries.find((item) => item.id === id);
    assert.ok(entry, `expected pilot entry ${id}`);
    assert.equal(entry.audit.status, "reviewed");
  });
});

test("all entries use a concrete coding strategy or explicit recording inputs", () => {
  const unresolved = dataset.entries.filter((entry) => entry.coding.strategy === "needs-review");
  assert.equal(unresolved.length, 0);
});

test("coding rules use canonical ids and every output is represented in the code catalog", () => {
  dataset.entries.forEach((entry) => {
    const groups = [...entry.specifiers, ...(entry.coding.inputs || [])];
    const rules = [
      ...(entry.coding.rules || []),
      ...(entry.coding.additionalCodeRules || [])
    ];

    rules.forEach((rule) => {
      (rule.conditions || []).forEach((condition) => {
        if (!["selection", "no-selection-in-group"].includes(condition.type)) return;
        const group = groups.find((candidate) => candidate.id === condition.group);
        assert.ok(group, `${entry.id} should use a stored group id for ${condition.group}`);
        if (condition.type === "selection") {
          assert.ok(
            group.options.some((option) => option.id === condition.option),
            `${entry.id} should use a stored option id for ${condition.option}`
          );
        }
      });
    });

    const catalog = new Set(entry.codes.map((candidate) => candidate.code));
    const outputCodes = [
      entry.coding.code,
      entry.coding.defaultCode,
      ...(entry.coding.rules || []).map((rule) => rule.code),
      ...(entry.coding.additionalCodeRules || []).map((rule) => rule.code)
    ].filter(Boolean);
    outputCodes.forEach((code) => {
      assert.ok(catalog.has(code), `${entry.id} should list coding output ${code}`);
    });
  });
});

test("every reviewed or corrected entry now carries sourced narrative sections", () => {
  const missingNarrative = dataset.entries.filter(
    (entry) =>
      ["reviewed", "corrected"].includes(entry.audit.status) &&
      entry.kind !== "clinical-focus-condition" &&
      !(entry.sections || []).length
  );

  assert.equal(missingNarrative.length, 0);
});

test("manual override audit artifact tracks remaining dead narrative override prose", () => {
  assert.equal(
    manualOverrideAudit.meta.entriesWithNarrativeOverrideFields,
    manualOverrideAudit.entries.length
  );
  assert.equal(manualOverrideAudit.meta.entriesWithNarrativeOverrideFields, 0);
  assert.equal(
    manualOverrideAudit.meta.entriesWithSectionContent,
    manualOverrideAudit.entries.filter((entry) => entry.sectionTitlesWithContent.length > 0).length
  );
  assert.equal(
    manualOverrideAudit.meta.entriesWithDifferentialDiagnosis,
    manualOverrideAudit.entries.filter((entry) => entry.hasDifferentialDiagnosis).length
  );
  assert.equal(
    manualOverrideAudit.meta.entriesWithComorbidity,
    manualOverrideAudit.entries.filter((entry) => entry.hasComorbidity).length
  );
  assert.equal(
    manualOverrideAudit.meta.affectedChapterCount,
    manualOverrideAudit.chapters.length
  );
});

test("Pica now uses a DSM-backed age-group selector instead of a generic recording-option picker", () => {
  const pica = dataset.entries.find((entry) => entry.name === "Pica");
  assert.ok(pica);
  assert.equal(pica.coding.strategy, "option-map");
  assert.equal(pica.coding.inputs.length, 1);
  assert.equal(pica.coding.inputs[0].name, "Age Group");
  assert.equal(pica.coding.inputs[0].includeInDiagnosisLabel, false);
  assert.equal(pica.coding.inputs[0].options.some((option) => option.name === "in children"), true);
  assert.equal(pica.coding.inputs[0].options.some((option) => option.name === "in adults"), true);
  assert.equal(pica.coding.inputs.some((group) => group.name === "Recording Option"), false);
});

test("NREM sleep arousal disorders now use the DSM subtype specifier instead of a generic recording-option picker", () => {
  const entry = dataset.entries.find(
    (item) => item.name === "Non-Rapid Eye Movement Sleep Arousal Disorders"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.equal(entry.coding.inputs.length, 0);
  assert.equal(entry.coding.inputs.some((group) => group.name === "Recording Option"), false);
  assert.equal(entry.specifiers.some((specifier) => specifier.name === "Subtype"), true);
  assert.equal(
    entry.specifiers.some((specifier) => specifier.name === "Sleepwalking Type Specifiers"),
    true
  );
  assert.equal(
    entry.sections.some(
      (section) => section.title === "Relationship To International Classification Of Sleep Disorders"
    ),
    false
  );
  assert.equal(entry.comorbidity, "");
  assert.deepEqual(entry.source.titlePages, [640]);
});

test("Mild Neurocognitive Disorder now derives coding from etiology rather than a generic recording option", () => {
  const entry = dataset.entries.find((item) => item.name === "Mild Neurocognitive Disorder");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.equal(entry.coding.inputs.some((group) => group.name === "Recording Option"), false);
  assert.deepEqual(
    entry.coding.inputs.map((group) => group.name),
    ["Substance Type", "Use Disorder Status"]
  );
  assert.equal(entry.recording.mode, "neurocognitive-etiology");
  assert.ok(entry.sections.some((section) => section.title === "Recording Procedures"));
  assert.ok(entry.codes.some((item) => item.code === "G31.84"));
  assert.ok(entry.codes.some((item) => item.code === "R41.9"));
  assert.ok(entry.codes.some((item) => item.code === "F10.288"));
});

test("intellectual developmental disorder and adjacent developmental-delay entries now hydrate from the audited DSM pages", () => {
  const intellectualDevelopmentalDisorder = dataset.entries.find(
    (entry) => entry.name === "Intellectual Developmental Disorder (Intellectual Disability)"
  );
  const globalDevelopmentalDelay = dataset.entries.find(
    (entry) => entry.name === "Global Developmental Delay"
  );
  const unspecifiedIntellectualDevelopmentalDisorder = dataset.entries.find(
    (entry) =>
      entry.name === "Unspecified Intellectual Developmental Disorder (Intellectual Disability)"
  );

  assert.ok(intellectualDevelopmentalDisorder);
  assert.ok(globalDevelopmentalDelay);
  assert.ok(unspecifiedIntellectualDevelopmentalDisorder);

  assert.equal(intellectualDevelopmentalDisorder.audit.status, "corrected");
  assert.deepEqual(intellectualDevelopmentalDisorder.source.titlePages, [133, 134]);
  assert.equal(
    intellectualDevelopmentalDisorder.sections.some(
      (section) => section.title === "Relationship to Other Classifications"
    ),
    true
  );
  assert.match(
    intellectualDevelopmentalDisorder.sections.find(
      (section) => section.title === "Diagnostic Features"
    )?.content || "",
    /The essential features of intellectual developmental disorder/
  );
  assert.doesNotMatch(
    intellectualDevelopmentalDisorder.sections.find(
      (section) => section.title === "Diagnostic Features"
    )?.content || "",
    /The essential features of language disorder/i
  );
  assert.match(
    intellectualDevelopmentalDisorder.differentialDiagnosis,
    /The diagnosis of intellectual developmental disorder should be made whenever Criteria A, B, and C are met\./
  );

  assert.equal(globalDevelopmentalDelay.audit.status, "corrected");
  assert.deepEqual(globalDevelopmentalDelay.source.titlePages, [142]);
  assert.deepEqual(globalDevelopmentalDelay.source.sectionPages.description, [142]);
  assert.match(
    globalDevelopmentalDelay.sections[0]?.content || "",
    /^This diagnosis is reserved for individuals under the age of 5 years/
  );

  assert.equal(unspecifiedIntellectualDevelopmentalDisorder.audit.status, "corrected");
  assert.deepEqual(unspecifiedIntellectualDevelopmentalDisorder.source.titlePages, [142]);
  assert.deepEqual(unspecifiedIntellectualDevelopmentalDisorder.source.sectionPages.description, [142]);
  assert.match(
    unspecifiedIntellectualDevelopmentalDisorder.sections[0]?.content || "",
    /^This category is reserved for individuals over the age of 5 years/
  );
});

test("core communication-disorder entries now use corrected DSM wording and isolated page maps", () => {
  const languageDisorder = dataset.entries.find((entry) => entry.name === "Language Disorder");
  const speechSoundDisorder = dataset.entries.find((entry) => entry.name === "Speech Sound Disorder");
  const childhoodOnsetFluencyDisorder = dataset.entries.find(
    (entry) => entry.name === "Childhood-Onset Fluency Disorder (Stuttering)"
  );
  const socialPragmaticCommunicationDisorder = dataset.entries.find(
    (entry) => entry.name === "Social (Pragmatic) Communication Disorder"
  );
  const unspecifiedCommunicationDisorder = dataset.entries.find(
    (entry) => entry.name === "Unspecified Communication Disorder"
  );

  assert.ok(languageDisorder);
  assert.ok(speechSoundDisorder);
  assert.ok(childhoodOnsetFluencyDisorder);
  assert.ok(socialPragmaticCommunicationDisorder);
  assert.ok(unspecifiedCommunicationDisorder);

  assert.equal(languageDisorder.audit.status, "corrected");
  assert.deepEqual(languageDisorder.source.titlePages, [143, 144]);
  assert.match(
    languageDisorder.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /individually or in any combination\.$/
  );
  assert.match(
    languageDisorder.criteria.find((criterion) => criterion.code === "D")?.text || "",
    /intellectual disability\) or global developmental delay\.$/
  );
  assert.match(
    languageDisorder.sections.find((section) => section.title === "Associated Features")?.content || "",
    /^Individuals, even children, can be adept at accommodating to their limited language\./
  );
  assert.doesNotMatch(languageDisorder.comorbidity, /Speech Sound Disorder Diagnostic Criteria/i);

  assert.equal(speechSoundDisorder.audit.status, "corrected");
  assert.deepEqual(speechSoundDisorder.source.titlePages, [146, 147]);
  assert.match(
    speechSoundDisorder.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /individually or in any combination\.$/
  );
  assert.match(speechSoundDisorder.differentialDiagnosis, /^Normal variations in speech\./i);
  assert.equal(
    speechSoundDisorder.sections.find((section) => section.title === "Associated Features")?.content
      ?.includes("Persistent difficulty with speech sound production"),
    false
  );

  assert.equal(childhoodOnsetFluencyDisorder.audit.status, "corrected");
  assert.deepEqual(childhoodOnsetFluencyDisorder.source.titlePages, [149]);
  assert.match(
    childhoodOnsetFluencyDisorder.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /individually or in any combination\.$/
  );
  assert.equal(
    childhoodOnsetFluencyDisorder.criteria.find((criterion) => criterion.code === "C")?.note,
    "Later-onset cases are diagnosed as F98.5 adult-onset fluency disorder."
  );
  assert.ok(
    childhoodOnsetFluencyDisorder.sections.some(
      (section) =>
        section.title === "Functional Consequences of Childhood-Onset Fluency Disorder (Stuttering)"
    )
  );
  assert.match(
    childhoodOnsetFluencyDisorder.sections.find((section) =>
      section.title === "Functional Consequences of Childhood-Onset Fluency Disorder (Stuttering)"
    )?.content || "",
    /^In addition to being features of the condition, stress and anxiety can exacerbate dysfluency\./
  );
  assert.doesNotMatch(
    childhoodOnsetFluencyDisorder.comorbidity,
    /Social \(Pragmatic\) Communication Disorder Diagnostic Criteria/i
  );

  assert.equal(socialPragmaticCommunicationDisorder.audit.status, "corrected");
  assert.deepEqual(socialPragmaticCommunicationDisorder.source.titlePages, [151, 152]);
  assert.match(
    socialPragmaticCommunicationDisorder.criteria.find((criterion) => criterion.code === "C")?.text || "",
    /social communication demands exceed limited capacities\)\.$/
  );
  assert.match(
    socialPragmaticCommunicationDisorder.criteria.find((criterion) => criterion.code === "D")?.text || "",
    /intellectual developmental disorder \(intellectual disability\), global developmental delay, or another mental disorder\.$/
  );
  assert.match(
    socialPragmaticCommunicationDisorder.sections.find(
      (section) => section.title === "Associated Features"
    )?.content || "",
    /^The most common associated feature of social \(pragmatic\) communication disorder is language impairment/
  );
  assert.equal(socialPragmaticCommunicationDisorder.comorbidity, "");

  assert.equal(unspecifiedCommunicationDisorder.audit.status, "corrected");
  assert.deepEqual(unspecifiedCommunicationDisorder.source.titlePages, [154]);
  assert.deepEqual(unspecifiedCommunicationDisorder.source.sectionPages.description, [154]);
  assert.match(
    unspecifiedCommunicationDisorder.sections[0]?.content || "",
    /^This category applies to presentations in which symptoms characteristic of communication disorder/
  );
  assert.doesNotMatch(
    unspecifiedCommunicationDisorder.sections[0]?.content || "",
    /autism spectrum disorder is characterized/i
  );
});

test("ADHD and residual ADHD entries now use corrected DSM wording and dedicated DSM pages", () => {
  const attentionDeficitHyperactivityDisorder = dataset.entries.find(
    (entry) => entry.name === "Attention-Deficit/Hyperactivity Disorder"
  );
  const otherSpecifiedAttentionDeficitHyperactivityDisorder = dataset.entries.find(
    (entry) => entry.name === "Other Specified Attention-Deficit/Hyperactivity Disorder"
  );
  const unspecifiedAttentionDeficitHyperactivityDisorder = dataset.entries.find(
    (entry) => entry.name === "Unspecified Attention-Deficit/Hyperactivity Disorder"
  );

  assert.ok(attentionDeficitHyperactivityDisorder);
  assert.ok(otherSpecifiedAttentionDeficitHyperactivityDisorder);
  assert.ok(unspecifiedAttentionDeficitHyperactivityDisorder);

  assert.equal(attentionDeficitHyperactivityDisorder.audit.status, "corrected");
  assert.deepEqual(attentionDeficitHyperactivityDisorder.source.titlePages, [168]);
  assert.match(
    attentionDeficitHyperactivityDisorder.criteria[0]?.items?.[0]?.note || "",
    /For older adolescents and adults \(age 17 and older\), at least five symptoms are required\.$/
  );
  assert.match(
    attentionDeficitHyperactivityDisorder.criteria.find((criterion) => criterion.code === "C")?.text || "",
    /in two or more settings \(e\.g\., at home, school, or work; with friends or relatives; in other activities\)\.$/
  );
  assert.ok(
    attentionDeficitHyperactivityDisorder.sections.some(
      (section) => section.title === "Diagnostic Markers"
    )
  );
  assert.ok(
    attentionDeficitHyperactivityDisorder.sections.some(
      (section) =>
        section.title === "Functional Consequences of Attention-Deficit/Hyperactivity Disorder"
    )
  );

  assert.equal(otherSpecifiedAttentionDeficitHyperactivityDisorder.audit.status, "corrected");
  assert.deepEqual(
    otherSpecifiedAttentionDeficitHyperactivityDisorder.source.sectionPages.description,
    [177]
  );
  assert.match(
    otherSpecifiedAttentionDeficitHyperactivityDisorder.sections[0]?.content || "",
    /followed by the specific reason .*with insufficient inattention symptoms/
  );

  assert.equal(unspecifiedAttentionDeficitHyperactivityDisorder.audit.status, "corrected");
  assert.deepEqual(
    unspecifiedAttentionDeficitHyperactivityDisorder.source.sectionPages.description,
    [177, 178]
  );
  assert.match(
    unspecifiedAttentionDeficitHyperactivityDisorder.sections[0]?.content || "",
    /includes presentations in which there is insufficient information to make a more specific diagnosis\.$/
  );
});

test("Specific Learning Disorder now uses explicit multi-domain coding, subskill selectors, and full DSM narrative pages", () => {
  const entry = dataset.entries.find((item) => item.name === "Specific Learning Disorder");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [178]);
  assert.deepEqual(entry.source.sectionPages.recordingProcedures, [180]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /For individuals age 17 years and older, a documented history of impairing learning difficulties may be substituted for the standardized assessment\.$/
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "C")?.text || "",
    /timed tests, reading or writing lengthy complex reports for a tight deadline, excessively heavy academic loads/
  );
  assert.equal(
    entry.criteria.find((criterion) => criterion.code === "D")?.note,
    "The four diagnostic criteria are to be met based on a clinical synthesis of the individual's history (developmental, medical, family, educational), school reports, and psychoeducational assessment."
  );
  assert.equal(entry.coding.strategy, "option-map");
  assert.equal(entry.coding.codeJoiner, "; ");
  assert.deepEqual(entry.coding.inputs.map((group) => group.name), ["Academic Domains"]);
  assert.equal(entry.coding.inputs[0].selectionType, "multiple");
  assert.deepEqual(
    entry.coding.inputs[0].options.map((option) => option.name),
    [
      "With impairment in reading",
      "With impairment in written expression",
      "With impairment in mathematics"
    ]
  );
  assert.equal(
    entry.specifiers.find((specifier) => specifier.name === "With impairment in reading")?.selectionType,
    "multiple"
  );
  assert.equal(
    entry.specifiers.find((specifier) => specifier.name === "With impairment in mathematics")?.selectionType,
    "multiple"
  );
  assert.equal(entry.recording.mode, "specific-learning-multiple-domains");
  assert.ok(entry.sections.some((section) => section.title === "Recording Procedures"));
  assert.ok(
    entry.sections.some(
      (section) => section.title === "Functional Consequences of Specific Learning Disorder"
    )
  );
  assert.match(entry.differentialDiagnosis, /^Normal variations in academic attainment\./);
  assert.match(entry.comorbidity, /^The different types of specific learning disorder commonly co-occur/);
});

test("Developmental Coordination Disorder now uses its dedicated DSM criteria and narrative pages", () => {
  const entry = dataset.entries.find((item) => item.name === "Developmental Coordination Disorder");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [189]);
  assert.deepEqual(entry.source.sectionPages.associatedFeatures, [191]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "A")?.text || "",
    /dropping or bumping into objects.*catching an object, using scissors or cutlery, handwriting, riding a bike, or participating in sports/
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /self-care and self-maintenance/
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "D")?.text || "",
    /intellectual developmental disorder \(intellectual disability\).*cerebral palsy, muscular dystrophy, degenerative disorder/
  );
  assert.ok(entry.sections.some((section) => section.title === "Associated Features"));
  assert.ok(
    entry.sections.some(
      (section) => section.title === "Functional Consequences of Developmental Coordination Disorder"
    )
  );
  assert.match(
    entry.sections.find((section) => section.title === "Associated Features")?.content || "",
    /^Some children with developmental coordination disorder show additional/
  );
  assert.match(entry.differentialDiagnosis, /^Motor impairments due to another medical condition\./);
  assert.match(
    entry.comorbidity,
    /^Disorders that commonly co-occur with developmental coordination disorder include/
  );
  assert.doesNotMatch(entry.comorbidity, /^The different types of specific learning disorder commonly co-occur/);
});

test("Stereotypic Movement Disorder and the residual neurodevelopmental entries now use dedicated DSM pages", () => {
  const stereotypicMovementDisorder = dataset.entries.find(
    (entry) => entry.name === "Stereotypic Movement Disorder"
  );
  const otherSpecifiedNeurodevelopmentalDisorder = dataset.entries.find(
    (entry) => entry.name === "Other Specified Neurodevelopmental Disorder"
  );
  const unspecifiedNeurodevelopmentalDisorder = dataset.entries.find(
    (entry) => entry.name === "Unspecified Neurodevelopmental Disorder"
  );

  assert.ok(stereotypicMovementDisorder);
  assert.ok(otherSpecifiedNeurodevelopmentalDisorder);
  assert.ok(unspecifiedNeurodevelopmentalDisorder);

  assert.equal(stereotypicMovementDisorder.audit.status, "corrected");
  assert.deepEqual(stereotypicMovementDisorder.source.titlePages, [193]);
  assert.deepEqual(stereotypicMovementDisorder.source.sectionPages.recordingProcedures, [194]);
  assert.match(
    stereotypicMovementDisorder.criteria.find((criterion) => criterion.code === "D")?.text || "",
    /trichotillomania \[hair-pulling disorder\], obsessive-compulsive disorder/
  );
  assert.equal(stereotypicMovementDisorder.recording.mode, "stereotypic-associated-condition");
  assert.deepEqual(
    stereotypicMovementDisorder.recording.fields.map((field) => field.key),
    [
      "associated-condition-disorder-or-factor",
      "associated-condition-disorder-or-factor-codes"
    ]
  );
  assert.ok(
    stereotypicMovementDisorder.sections.some((section) => section.title === "Recording Procedures")
  );
  assert.ok(stereotypicMovementDisorder.sections.some((section) => section.title === "Specifiers"));
  assert.match(
    stereotypicMovementDisorder.differentialDiagnosis,
    /^Normal development\./
  );
  assert.match(
    stereotypicMovementDisorder.comorbidity,
    /^Common comorbidities in children with chronic motor stereotypies include attention-deficit/
  );
  assert.doesNotMatch(
    stereotypicMovementDisorder.comorbidity,
    /^Disorders that commonly co-occur with developmental coordination disorder include/
  );
  assert.doesNotMatch(stereotypicMovementDisorder.comorbidity, /Tic Disorders Diagnostic Criteria/i);

  assert.equal(otherSpecifiedNeurodevelopmentalDisorder.audit.status, "corrected");
  assert.deepEqual(otherSpecifiedNeurodevelopmentalDisorder.source.titlePages, [205]);
  assert.deepEqual(
    otherSpecifiedNeurodevelopmentalDisorder.source.sectionPages.description,
    [205, 206]
  );
  assert.match(
    otherSpecifiedNeurodevelopmentalDisorder.sections[0]?.content || "",
    /neurodevelopmental disorder associated with prenatal alcohol exposure/i
  );
  assert.match(
    otherSpecifiedNeurodevelopmentalDisorder.sections[0]?.content || "",
    /characterized by a range of developmental disabilities following exposure to alcohol in utero\./
  );

  assert.equal(unspecifiedNeurodevelopmentalDisorder.audit.status, "corrected");
  assert.deepEqual(unspecifiedNeurodevelopmentalDisorder.source.titlePages, [206]);
  assert.deepEqual(
    unspecifiedNeurodevelopmentalDisorder.source.sectionPages.description,
    [206]
  );
  assert.match(
    unspecifiedNeurodevelopmentalDisorder.sections[0]?.content || "",
    /insufficient information to make a more specific diagnosis \(e\.g\., in emergency room settings\)\./
  );
});

test("schizotypal personality disorder is now sourced from the correct personality-disorder pages in both chapter locations", () => {
  const psychoticChapterEntry = dataset.entries.find(
    (entry) =>
      entry.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      entry.name === "Schizotypal (Personality) Disorder"
  );
  const personalityChapterEntry = dataset.entries.find(
    (entry) =>
      entry.chapterTitle === "Personality Disorders" &&
      entry.name === "Schizotypal Personality Disorder"
  );

  assert.ok(psychoticChapterEntry);
  assert.ok(personalityChapterEntry);

  assert.equal(psychoticChapterEntry.audit.status, "corrected");
  assert.deepEqual(psychoticChapterEntry.source.titlePages, [212, 993]);
  assert.deepEqual(psychoticChapterEntry.source.sectionPages.description, [212]);
  assert.match(
    psychoticChapterEntry.sections.find((section) => section.title === "Description")?.content || "",
    /^Criteria and text for schizotypal personality disorder can be found in the chapter/
  );
  assert.match(
    psychoticChapterEntry.criteria.find((criterion) => criterion.code === "A")?.text || "",
    /^A pervasive pattern of social and interpersonal deficits marked by acute discomfort with/
  );
  assert.match(
    psychoticChapterEntry.differentialDiagnosis,
    /^Other mental disorders with psychotic symptoms\./
  );
  assert.doesNotMatch(
    psychoticChapterEntry.differentialDiagnosis,
    /^Obsessive-compulsive and related disorders\./
  );

  assert.equal(personalityChapterEntry.audit.status, "corrected");
  assert.deepEqual(personalityChapterEntry.source.titlePages, [993]);
  assert.deepEqual(personalityChapterEntry.source.sectionPages.associatedFeatures, [995]);
  assert.match(
    personalityChapterEntry.sections.find((section) => section.title === "Associated Features")
      ?.content || "",
    /^Individuals with schizotypal personality disorder often seek treatment/
  );
  assert.match(
    personalityChapterEntry.comorbidity,
    /^Particularly in response to stress, individuals with this disorder may experience transient/
  );
});

test("delusional disorder now uses its dedicated DSM criteria, subtype pages, and full differential", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Delusional Disorder"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [212]);
  assert.deepEqual(entry.source.sectionPages.specifiers, [212, 213, 214]);
  assert.deepEqual(entry.source.sectionPages.differentialDiagnosis, [216, 217]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "B")?.note || "",
    /the sensation of being infested with insects associated with delusions of infestation/
  );
  assert.ok(entry.sections.some((section) => section.title === "Subtypes"));
  assert.ok(
    entry.sections.some(
      (section) => section.title === "Functional Consequences of Delusional Disorder"
    )
  );
  assert.match(
    entry.sections.find((section) => section.title === "Culture-Related Diagnostic Issues")
      ?.content || "",
    /^An individual’s cultural and religious background must be taken into account/
  );
  assert.match(
    entry.differentialDiagnosis,
    /Depressive and bipolar disorders and schizoaffective disorder\./
  );
  assert.doesNotMatch(entry.differentialDiagnosis, /^Other mental disorders with psychotic symptoms\./);
  assert.equal(entry.comorbidity, "");
});

test("brief psychotic disorder now uses its dedicated DSM note, section pages, and full differential", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Brief Psychotic Disorder"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [217]);
  assert.deepEqual(entry.source.sectionPages.specifiers, [217, 218]);
  assert.deepEqual(entry.source.sectionPages.differentialDiagnosis, [219, 220]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "A")?.note || "",
    /^Do not include a symptom if it is a culturally sanctioned response\./
  );
  assert.match(
    entry.sections.find((section) => section.title === "Prevalence")?.content || "",
    /^Brief psychotic disorder may account for 2%–7% of cases of first-onset psychosis/
  );
  assert.match(
    entry.sections.find((section) => section.title === "Culture-Related Diagnostic Issues")
      ?.content || "",
    /^It is important to distinguish symptoms of brief psychotic disorder from culturally sanctioned/
  );
  assert.match(entry.differentialDiagnosis, /Other psychotic disorders\./);
  assert.doesNotMatch(entry.differentialDiagnosis, /^Other mental disorders with psychotic symptoms\./);
  assert.equal(entry.comorbidity, "");
});

test("schizophreniform disorder now uses its dedicated DSM criteria, note pages, and split functional consequences", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Schizophreniform Disorder"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [220]);
  assert.deepEqual(entry.source.sectionPages.criteria, [220, 221]);
  assert.deepEqual(
    entry.source.sectionPages.functionalConsequencesOfSchizophreniformDisorder,
    [222, 223]
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "A")?.text || "",
    /\(or less if successfully treated\)/
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "C")?.text || "",
    /present for a minority of the total duration of the active and residual periods of the illness/
  );
  assert.match(
    entry.sections.find((section) => section.title === "Risk and Prognostic Factors")?.content || "",
    /^Genetic and physiological\./
  );
  assert.match(
    entry.sections.find(
      (section) => section.title === "Functional Consequences of Schizophreniform Disorder"
    )?.content || "",
    /^For the majority of individuals with schizophreniform disorder/
  );
  assert.match(entry.differentialDiagnosis, /^Other mental disorders and medical conditions\./);
  assert.match(entry.differentialDiagnosis, /Brief psychotic disorder\./);
  assert.equal(entry.comorbidity, "");
});

test("schizophrenia now uses the full DSM criteria and dedicated schizophrenia narrative pages", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Schizophrenia"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [223]);
  assert.deepEqual(entry.source.sectionPages.criteria, [223, 224]);
  assert.deepEqual(entry.source.sectionPages.comorbidity, [232]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "B")?.text || "",
    /level of functioning in one or more major areas, such as work, interpersonal relations, or self-care/
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "F")?.text || "",
    /communication disorder of childhood onset/
  );
  assert.match(
    entry.sections.find((section) => section.title === "Association With Suicidal Thoughts or Behavior")
      ?.content || "",
    /^Approximately 5%–6% of individuals with schizophrenia die by suicide/
  );
  assert.match(
    entry.sections.find((section) => section.title === "Functional Consequences of Schizophrenia")
      ?.content || "",
    /^Schizophrenia is associated with significant social and occupational dysfunction\./
  );
  assert.match(
    entry.differentialDiagnosis,
    /^Major depressive or bipolar disorder with psychotic or catatonic features\./
  );
  assert.match(
    entry.comorbidity,
    /^Rates of comorbidity with substance-related disorders are high in schizophrenia\./
  );
});

test("schizoaffective disorder now uses its dedicated DSM type pages and corrected comorbidity panel", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Schizoaffective Disorder"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [232]);
  assert.deepEqual(entry.source.sectionPages.criteria, [232, 233]);
  assert.deepEqual(entry.source.sectionPages.comorbidity, [238]);
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "A")?.note || "",
    /^The major depressive episode must include Criterion A1: Depressed mood\./
  );
  assert.match(
    entry.sections.find((section) => section.title === "Risk and Prognostic Factors")?.content || "",
    /^Genetic and physiological\./
  );
  assert.match(
    entry.sections.find((section) => section.title === "Functional Consequences of Schizoaffective Disorder")
      ?.content || "",
    /^Schizoaffective disorder is associated with global dysfunction/
  );
  assert.match(
    entry.differentialDiagnosis,
    /^Other mental disorders and medical conditions\./
  );
  assert.match(
    entry.comorbidity,
    /^Many individuals diagnosed with schizoaffective disorder are also diagnosed with other mental disorders/
  );
  assert.doesNotMatch(
    entry.comorbidity,
    /^Rates of comorbidity with substance-related disorders are high in schizophrenia\./
  );
});

test("psychotic disorder due to another medical condition now uses dedicated DSM pages and medical-condition-first recording", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Psychotic Disorder Due to Another Medical Condition"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [244]);
  assert.equal(entry.recording.mode, "medical-condition-first");
  assert.deepEqual(
    entry.recording.fields.map((field) => field.key),
    ["etiological-medical-condition", "etiological-medical-condition-code"]
  );
  assert.match(
    entry.criteria.find((criterion) => criterion.code === "E")?.text || "",
    /social, occupational, or other important areas of functioning/
  );
  assert.ok(entry.sections.some((section) => section.title === "Specifiers"));
  assert.ok(
    entry.sections.some(
      (section) =>
        section.title === "Functional Consequences of Psychotic Disorder Due to Another Medical Condition"
    )
  );
  assert.match(
    entry.differentialDiagnosis,
    /^Delirium and major or mild neurocognitive disorder\./
  );
  assert.match(
    entry.comorbidity,
    /^Psychotic disorder due to another medical condition in individuals older than 80 years/
  );
});

test("catatonia entries now use dedicated DSM pages and code-first recording rules", () => {
  const catatoniaAssociated = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Catatonia Associated With Another Mental Disorder (Catatonia Specifier)"
  );
  const catatonicDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Catatonic Disorder Due to Another Medical Condition"
  );
  const unspecifiedCatatonia = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Schizophrenia Spectrum and Other Psychotic Disorders" &&
      item.name === "Unspecified Catatonia"
  );

  assert.ok(catatoniaAssociated);
  assert.ok(catatonicDisorder);
  assert.ok(unspecifiedCatatonia);

  assert.equal(catatoniaAssociated.audit.status, "corrected");
  assert.deepEqual(catatoniaAssociated.source.titlePages, [249]);
  assert.equal(catatoniaAssociated.recording.mode, "associated-mental-disorder-first");
  assert.deepEqual(
    catatoniaAssociated.recording.fields.map((field) => field.key),
    ["associated-mental-disorder", "associated-mental-disorder-code"]
  );
  assert.ok(
    catatoniaAssociated.sections.some(
      (section) => section.title === "Culture-Related Diagnostic Issues"
    )
  );
  assert.equal(catatoniaAssociated.differentialDiagnosis, "");

  assert.equal(catatonicDisorder.audit.status, "corrected");
  assert.deepEqual(catatonicDisorder.source.titlePages, [250]);
  assert.equal(catatonicDisorder.recording.mode, "medical-condition-first");
  assert.deepEqual(catatonicDisorder.source.sectionPages.associatedFeatures, [251]);
  assert.match(
    catatonicDisorder.criteria.find((criterion) => criterion.code === "E")?.text || "",
    /social, occupational, or other important areas of functioning/
  );
  assert.match(
    catatonicDisorder.differentialDiagnosis,
    /^A separate diagnosis of catatonic disorder due to another medical condition is not given/
  );

  assert.equal(unspecifiedCatatonia.audit.status, "corrected");
  assert.deepEqual(unspecifiedCatatonia.source.titlePages, [252]);
  assert.deepEqual(unspecifiedCatatonia.source.sectionPages.description, [252]);
  assert.equal(unspecifiedCatatonia.coding.code, "R29.818");
  assert.equal(unspecifiedCatatonia.coding.additionalCodeRules[0]?.code, "F06.1");
  assert.match(
    unspecifiedCatatonia.sections.find((section) => section.title === "Description")?.content || "",
    /^This category applies to presentations in which symptoms characteristic of catatonia/
  );
});

test("separation anxiety disorder and selective mutism now use isolated DSM narrative pages", () => {
  const separationAnxietyDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Anxiety Disorders" && item.name === "Separation Anxiety Disorder"
  );
  const selectiveMutism = dataset.entries.find(
    (item) => item.chapterTitle === "Anxiety Disorders" && item.name === "Selective Mutism"
  );

  assert.ok(separationAnxietyDisorder);
  assert.ok(selectiveMutism);

  assert.equal(separationAnxietyDisorder.audit.status, "corrected");
  assert.deepEqual(separationAnxietyDisorder.source.titlePages, [352]);
  assert.deepEqual(separationAnxietyDisorder.source.sectionPages.criteria, [352, 353]);
  assert.deepEqual(separationAnxietyDisorder.source.sectionPages.associatedFeatures, [354]);
  assert.ok(
    separationAnxietyDisorder.sections.some(
      (section) => section.title === "Association With Suicidal Thoughts or Behavior"
    )
  );
  assert.ok(
    separationAnxietyDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Separation Anxiety Disorder"
    )
  );
  assert.match(
    separationAnxietyDisorder.sections.find((section) => section.title === "Diagnostic Features")
      ?.content || "",
    /^The essential feature of separation anxiety disorder/
  );
  assert.doesNotMatch(
    separationAnxietyDisorder.sections.find((section) => section.title === "Diagnostic Features")
      ?.content || "",
    /In adults, common comorbidities include specific phobia/
  );
  assert.match(
    separationAnxietyDisorder.comorbidity,
    /^In children, separation anxiety disorder is highly comorbid/
  );

  assert.equal(selectiveMutism.audit.status, "corrected");
  assert.deepEqual(selectiveMutism.source.titlePages, [358]);
  assert.deepEqual(selectiveMutism.source.sectionPages.associatedFeatures, [358, 359]);
  assert.deepEqual(selectiveMutism.source.sectionPages.riskAndPrognosticFactors, [359, 360]);
  assert.ok(
    selectiveMutism.sections.some(
      (section) => section.title === "Functional Consequences of Selective Mutism"
    )
  );
  assert.ok(
    selectiveMutism.sections.some(
      (section) => section.title === "Culture-Related Diagnostic Issues"
    )
  );
  assert.match(
    selectiveMutism.sections.find((section) => section.title === "Associated Features")?.content || "",
    /^Associated features of selective mutism may include excessive shyness/
  );
  assert.doesNotMatch(
    selectiveMutism.sections.find((section) => section.title === "Associated Features")?.content || "",
    /Many individuals with specific phobias have suffered over many years/
  );
  assert.match(
    selectiveMutism.differentialDiagnosis,
    /^Silent period in immigrant children learning a second language\./
  );
  assert.match(
    selectiveMutism.comorbidity,
    /^The most common comorbid conditions are other anxiety disorders/
  );
});

test("remaining anxiety chapter diagnoses now use dedicated DSM wording, section maps, and recording guidance", () => {
  const socialAnxietyDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Anxiety Disorders" &&
      item.name === "Social Anxiety Disorder (Social Phobia)"
  );
  const panicDisorder = dataset.entries.find(
    (item) => item.chapterTitle === "Anxiety Disorders" && item.name === "Panic Disorder"
  );
  const agoraphobia = dataset.entries.find(
    (item) => item.chapterTitle === "Anxiety Disorders" && item.name === "Agoraphobia"
  );
  const generalizedAnxietyDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Anxiety Disorders" && item.name === "Generalized Anxiety Disorder"
  );
  const anxietyDueToAnotherMedicalCondition = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Anxiety Disorders" &&
      item.name === "Anxiety Disorder Due to Another Medical Condition"
  );

  assert.ok(socialAnxietyDisorder);
  assert.ok(panicDisorder);
  assert.ok(agoraphobia);
  assert.ok(generalizedAnxietyDisorder);
  assert.ok(anxietyDueToAnotherMedicalCondition);

  assert.equal(socialAnxietyDisorder.audit.status, "corrected");
  assert.deepEqual(socialAnxietyDisorder.source.titlePages, [367]);
  assert.deepEqual(socialAnxietyDisorder.source.sectionPages.differentialDiagnosis, [372, 373, 374]);
  assert.equal(
    socialAnxietyDisorder.criteria.find((criterion) => criterion.code === "A")?.note,
    "Note: In children, the anxiety must occur in peer settings and not just during interactions with adults."
  );
  assert.equal(
    socialAnxietyDisorder.criteria.find((criterion) => criterion.code === "C")?.note,
    "Note: In children, the fear or anxiety may be expressed by crying, tantrums, freezing, clinging, shrinking, or failing to speak in social situations."
  );
  assert.ok(socialAnxietyDisorder.sections.some((section) => section.title === "Specifiers"));
  assert.match(socialAnxietyDisorder.differentialDiagnosis, /^Normative shyness\./);
  assert.match(
    socialAnxietyDisorder.comorbidity,
    /^Social anxiety disorder is often comorbid with other anxiety disorders/
  );

  assert.equal(panicDisorder.audit.status, "corrected");
  assert.deepEqual(panicDisorder.source.titlePages, [374]);
  assert.deepEqual(panicDisorder.source.sectionPages.comorbidity, [382, 383]);
  assert.equal(
    panicDisorder.criteria.find((criterion) => criterion.code === "A")?.note,
    "Note: The abrupt surge can occur from a calm state or an anxious state."
  );
  assert.equal(
    panicDisorder.criteria.find((criterion) => criterion.code === "A")?.items?.[12]?.note,
    "Note: Culture-specific symptoms (e.g., tinnitus, neck soreness, headache, uncontrollable screaming or crying) may be seen. Such symptoms should not count as one of the four required symptoms."
  );
  assert.ok(
    panicDisorder.sections.some((section) => section.title === "Diagnostic Markers")
  );
  assert.ok(
    panicDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Panic Disorder"
    )
  );
  assert.match(panicDisorder.differentialDiagnosis, /^Only limited-symptom panic attacks\./);
  assert.match(
    panicDisorder.comorbidity,
    /^Panic disorder infrequently occurs in clinical settings in the absence of other psychopathology\./
  );
  assert.doesNotMatch(panicDisorder.comorbidity, /Panic Attack Specifier/i);

  assert.equal(agoraphobia.audit.status, "corrected");
  assert.deepEqual(agoraphobia.source.titlePages, [387]);
  assert.deepEqual(agoraphobia.source.sectionPages.comorbidity, [392]);
  assert.match(
    agoraphobia.criteria.find((criterion) => criterion.code === "I")?.note || "",
    /^Note: Agoraphobia is diagnosed irrespective of the presence of panic disorder\./
  );
  assert.match(agoraphobia.differentialDiagnosis, /^Specific phobia, situational type\./);
  assert.match(
    agoraphobia.comorbidity,
    /^About 90% of individuals with agoraphobia also have other mental disorders\./
  );

  assert.equal(generalizedAnxietyDisorder.audit.status, "corrected");
  assert.deepEqual(generalizedAnxietyDisorder.source.titlePages, [393]);
  assert.equal(
    generalizedAnxietyDisorder.criteria.find((criterion) => criterion.code === "C")?.note,
    "Note: Only one item is required in children."
  );
  assert.ok(
    generalizedAnxietyDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Generalized Anxiety Disorder"
    )
  );
  assert.match(
    generalizedAnxietyDisorder.differentialDiagnosis,
    /^Anxiety disorder due to another medical condition\./
  );
  assert.match(
    generalizedAnxietyDisorder.comorbidity,
    /^Individuals whose presentation meets criteria for generalized anxiety disorder/
  );

  assert.equal(anxietyDueToAnotherMedicalCondition.audit.status, "corrected");
  assert.deepEqual(anxietyDueToAnotherMedicalCondition.source.titlePages, [402]);
  assert.deepEqual(
    anxietyDueToAnotherMedicalCondition.source.sectionPages.diagnosticMarkers,
    [404]
  );
  assert.equal(anxietyDueToAnotherMedicalCondition.recording.mode, "medical-condition-first");
  assert.deepEqual(
    anxietyDueToAnotherMedicalCondition.recording.fields.map((field) => field.key),
    ["etiological-medical-condition", "etiological-medical-condition-code"]
  );
  assert.match(
    anxietyDueToAnotherMedicalCondition.criteria.find((criterion) => criterion.code === "E")?.text ||
      "",
    /social, occupational, or other important areas of functioning/
  );
  assert.doesNotMatch(
    anxietyDueToAnotherMedicalCondition.sections.find(
      (section) => section.title === "Development and Course"
    )?.content || "",
    /Diagnostic Markers/
  );
  assert.match(
    anxietyDueToAnotherMedicalCondition.sections.find(
      (section) => section.title === "Diagnostic Markers"
    )?.content || "",
    /^Laboratory assessments and\/or medical examinations are necessary/
  );
  assert.match(
    anxietyDueToAnotherMedicalCondition.differentialDiagnosis,
    /^Delirium and major or mild neurocognitive disorder\./
  );
});

test("remaining obsessive-compulsive chapter diagnoses now use dedicated DSM wording, corrected page maps, and recording guidance", () => {
  const obsessiveCompulsiveDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Obsessive-Compulsive Disorder"
  );
  const bodyDysmorphicDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Body Dysmorphic Disorder"
  );
  const hoardingDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Hoarding Disorder"
  );
  const trichotillomania = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Trichotillomania (Hair-Pulling Disorder)"
  );
  const excoriationDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Excoriation (Skin-Picking) Disorder"
  );
  const ocrdDueToMedicalCondition = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Obsessive-Compulsive and Related Disorders" &&
      item.name === "Obsessive-Compulsive and Related Disorder Due to Another Medical Condition"
  );

  assert.ok(obsessiveCompulsiveDisorder);
  assert.ok(bodyDysmorphicDisorder);
  assert.ok(hoardingDisorder);
  assert.ok(trichotillomania);
  assert.ok(excoriationDisorder);
  assert.ok(ocrdDueToMedicalCondition);

  assert.equal(obsessiveCompulsiveDisorder.audit.status, "corrected");
  assert.deepEqual(obsessiveCompulsiveDisorder.source.titlePages, [410]);
  assert.deepEqual(obsessiveCompulsiveDisorder.source.sectionPages.comorbidity, [417, 418]);
  assert.equal(
    obsessiveCompulsiveDisorder.criteria.find((criterion) => criterion.code === "A")?.groups?.[1]
      ?.items?.[1]?.note,
    "Note: Young children may not be able to articulate the aims of these behaviors or mental acts."
  );
  assert.ok(
    obsessiveCompulsiveDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Obsessive-Compulsive Disorder"
    )
  );
  assert.match(obsessiveCompulsiveDisorder.differentialDiagnosis, /^Anxiety disorders\./);
  assert.match(
    obsessiveCompulsiveDisorder.comorbidity,
    /^Individuals with OCD often have other psychopathology\./
  );

  assert.equal(bodyDysmorphicDisorder.audit.status, "corrected");
  assert.deepEqual(bodyDysmorphicDisorder.source.titlePages, [418]);
  assert.deepEqual(bodyDysmorphicDisorder.source.sectionPages.riskAndPrognosticFactors, [421, 422]);
  assert.match(
    bodyDysmorphicDisorder.specifiers.find((specifier) => specifier.name === "Subtype")?.options?.[0]
      ?.description || "",
    /This specifier is used even if the individual is preoccupied with other body areas/
  );
  assert.ok(
    bodyDysmorphicDisorder.sections.some(
      (section) => section.title === "Risk and Prognostic Factors"
    )
  );
  assert.match(
    bodyDysmorphicDisorder.differentialDiagnosis,
    /^Normal appearance concerns and clearly noticeable physical defects\./
  );
  assert.match(
    bodyDysmorphicDisorder.comorbidity,
    /^Major depressive disorder is the most common comorbid disorder/
  );

  assert.equal(hoardingDisorder.audit.status, "corrected");
  assert.deepEqual(hoardingDisorder.source.titlePages, [425]);
  assert.deepEqual(hoardingDisorder.source.sectionPages.differentialDiagnosis, [428, 429, 430]);
  assert.match(
    hoardingDisorder.criteria.find((criterion) => criterion.code === "F")?.text || "",
    /decreased energy in major depressive disorder/
  );
  assert.match(
    hoardingDisorder.criteria.find((criterion) => criterion.code === "F")?.text || "",
    /restricted interests in autism spectrum disorder/
  );
  assert.ok(
    hoardingDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Hoarding Disorder"
    )
  );
  assert.match(
    hoardingDisorder.comorbidity,
    /^Approximately 75% of individuals with hoarding disorder have a comorbid mood or anxiety disorder\./
  );

  assert.equal(trichotillomania.audit.status, "corrected");
  assert.deepEqual(trichotillomania.source.titlePages, [430]);
  assert.ok(
    trichotillomania.sections.some((section) => section.title === "Diagnostic Markers")
  );
  assert.ok(
    trichotillomania.sections.some(
      (section) => section.title === "Functional Consequences of Trichotillomania (Hair-Pulling Disorder)"
    )
  );
  assert.match(trichotillomania.differentialDiagnosis, /^Normative hair removal\/manipulation\./);
  assert.match(
    trichotillomania.comorbidity,
    /^Trichotillomania is often accompanied by other mental disorders/
  );

  assert.equal(excoriationDisorder.audit.status, "corrected");
  assert.equal(excoriationDisorder.recording.mode, "standard");
  assert.equal(excoriationDisorder.recording.fields.length, 0);
  assert.match(
    excoriationDisorder.criteria.find((criterion) => criterion.code === "E")?.text || "",
    /stereotypies in stereotypic movement disorder/
  );
  assert.match(
    excoriationDisorder.criteria.find((criterion) => criterion.code === "E")?.text || "",
    /nonsuicidal self-injury/
  );
  assert.ok(
    excoriationDisorder.sections.some(
      (section) => section.title === "Culture-Related Diagnostic Issues"
    )
  );
  assert.ok(
    excoriationDisorder.sections.some((section) => section.title === "Diagnostic Markers")
  );
  assert.match(
    excoriationDisorder.comorbidity,
    /^Excoriation disorder is often accompanied by other mental disorders\./
  );

  assert.equal(ocrdDueToMedicalCondition.audit.status, "corrected");
  assert.deepEqual(ocrdDueToMedicalCondition.source.titlePages, [441]);
  assert.deepEqual(ocrdDueToMedicalCondition.source.sectionPages.recordingProcedures, [442]);
  assert.equal(ocrdDueToMedicalCondition.recording.mode, "medical-condition-first");
  assert.equal(
    ocrdDueToMedicalCondition.criteria.find((criterion) => criterion.code === "E")?.text,
    "The disturbance causes clinically significant distress or impairment in social, occupational, or other important areas of functioning."
  );
  assert.ok(
    ocrdDueToMedicalCondition.sections.some(
      (section) => section.title === "Recording Procedures"
    )
  );
  assert.ok(
    ocrdDueToMedicalCondition.sections.some(
      (section) => section.title === "Diagnostic Markers"
    )
  );
  assert.match(ocrdDueToMedicalCondition.differentialDiagnosis, /^Delirium\./);
});

test("attachment disorders now use corrected DSM wording and dedicated trauma-chapter pages", () => {
  const reactiveAttachmentDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Reactive Attachment Disorder"
  );
  const disinhibitedSocialEngagementDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Disinhibited Social Engagement Disorder"
  );

  assert.ok(reactiveAttachmentDisorder);
  assert.ok(disinhibitedSocialEngagementDisorder);

  assert.equal(reactiveAttachmentDisorder.audit.status, "corrected");
  assert.deepEqual(reactiveAttachmentDisorder.source.titlePages, [448]);
  assert.deepEqual(
    reactiveAttachmentDisorder.source.sectionPages.differentialDiagnosis,
    [451, 452]
  );
  assert.match(
    reactiveAttachmentDisorder.criteria.find((criterion) => criterion.code === "D")?.text || "",
    /lack of adequate care in Criterion C/
  );
  assert.ok(
    reactiveAttachmentDisorder.sections.some(
      (section) => section.title === "Associated Features"
    )
  );
  assert.ok(
    reactiveAttachmentDisorder.sections.some(
      (section) => section.title === "Culture-Related Diagnostic Issues"
    )
  );
  assert.ok(
    reactiveAttachmentDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Reactive Attachment Disorder"
    )
  );
  assert.match(
    reactiveAttachmentDisorder.comorbidity,
    /^Conditions associated with neglect, including cognitive delays, language delays, and stereotypies/
  );

  assert.equal(disinhibitedSocialEngagementDisorder.audit.status, "corrected");
  assert.deepEqual(disinhibitedSocialEngagementDisorder.source.titlePages, [452]);
  assert.deepEqual(disinhibitedSocialEngagementDisorder.source.sectionPages.prevalence, [453, 454]);
  assert.match(
    disinhibitedSocialEngagementDisorder.criteria.find((criterion) => criterion.code === "D")
      ?.text || "",
    /pathogenic care in Criterion C/
  );
  assert.ok(
    disinhibitedSocialEngagementDisorder.sections.some(
      (section) => section.title === "Prevalence"
    )
  );
  assert.ok(
    disinhibitedSocialEngagementDisorder.sections.some(
      (section) => section.title === "Culture-Related Diagnostic Issues"
    )
  );
  assert.ok(
    disinhibitedSocialEngagementDisorder.sections.some(
      (section) =>
        section.title === "Functional Consequences of Disinhibited Social Engagement Disorder"
    )
  );
  assert.match(
    disinhibitedSocialEngagementDisorder.differentialDiagnosis,
    /^Attention-deficit\/hyperactivity disorder\./
  );
  assert.match(
    disinhibitedSocialEngagementDisorder.comorbidity,
    /^Conditions associated with neglect, including cognitive delays, language delays, and stereotypies/
  );
});

test("acute stress disorder and prolonged grief disorder now use corrected trauma-chapter wording and isolated page maps", () => {
  const acuteStressDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Acute Stress Disorder"
  );
  const prolongedGriefDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Prolonged Grief Disorder"
  );

  assert.ok(acuteStressDisorder);
  assert.ok(prolongedGriefDisorder);

  assert.equal(acuteStressDisorder.audit.status, "corrected");
  assert.deepEqual(acuteStressDisorder.source.titlePages, [470]);
  assert.deepEqual(acuteStressDisorder.source.sectionPages.criteria, [470, 471, 472]);
  assert.equal(acuteStressDisorder.source.sectionPages.comorbidity, undefined);
  assert.equal(acuteStressDisorder.criteria.find((criterion) => criterion.code === "B")?.groups.length, 5);
  assert.match(
    acuteStressDisorder.criteria.find((criterion) => criterion.code === "E")?.text || "",
    /physiological effects of a substance/
  );
  assert.match(
    acuteStressDisorder.criteria.find((criterion) => criterion.code === "C")?.note || "",
    /persistence for at least 3 days and up to a month/
  );
  assert.ok(
    acuteStressDisorder.sections.some(
      (section) => section.title === "Associated Features"
    )
  );
  assert.ok(
    acuteStressDisorder.sections.some(
      (section) => section.title === "Sex- and Gender-Related Diagnostic Issues"
    )
  );
  assert.ok(
    acuteStressDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Acute Stress Disorder"
    )
  );
  assert.match(acuteStressDisorder.differentialDiagnosis, /^Adjustment disorders\./);
  assert.equal(acuteStressDisorder.comorbidity, "");

  assert.equal(prolongedGriefDisorder.audit.status, "corrected");
  assert.deepEqual(prolongedGriefDisorder.source.titlePages, [481]);
  assert.deepEqual(
    prolongedGriefDisorder.source.sectionPages.differentialDiagnosis,
    [486, 487]
  );
  assert.match(
    prolongedGriefDisorder.criteria.find((criterion) => criterion.code === "F")?.text || "",
    /physiological effects of a substance/
  );
  assert.match(
    prolongedGriefDisorder.criteria.find((criterion) => criterion.code === "B")?.items[1]?.text || "",
    /preoccupation may focus on the circumstances of the death/
  );
  assert.ok(
    prolongedGriefDisorder.sections.some(
      (section) => section.title === "Associated Features"
    )
  );
  assert.ok(
    prolongedGriefDisorder.sections.some(
      (section) => section.title === "Sex- and Gender-Related Diagnostic Issues"
    )
  );
  assert.ok(
    prolongedGriefDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Prolonged Grief Disorder"
    )
  );
  assert.match(
    prolongedGriefDisorder.comorbidity,
    /^The most common comorbid disorders with symptoms of prolonged grief disorder are major depressive disorder, PTSD, and substance use disorders\./
  );
  assert.doesNotMatch(
    prolongedGriefDisorder.comorbidity,
    /Other Specified Trauma- and Stressor-Related Disorder/
  );
});

test("posttraumatic stress disorder entries now use corrected trauma-chapter wording and shared PTSD narrative pages", () => {
  const posttraumaticStressDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Posttraumatic Stress Disorder"
  );
  const preschoolPosttraumaticStressDisorder = dataset.entries.find(
    (item) =>
      item.chapterTitle === "Trauma- and Stressor-Related Disorders" &&
      item.name === "Posttraumatic Stress Disorder in Children 6 Years and Younger"
  );

  assert.ok(posttraumaticStressDisorder);
  assert.ok(preschoolPosttraumaticStressDisorder);

  assert.equal(posttraumaticStressDisorder.audit.status, "corrected");
  assert.deepEqual(posttraumaticStressDisorder.source.titlePages, [455]);
  assert.deepEqual(
    posttraumaticStressDisorder.source.sectionPages.differentialDiagnosis,
    [468, 469, 470]
  );
  assert.deepEqual(posttraumaticStressDisorder.source.sectionPages.comorbidity, [470, 471]);
  assert.match(
    posttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "A")?.note || "",
    /adults, adolescents, and children older than 6 years/
  );
  assert.match(
    posttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "B")?.items[0]?.note || "",
    /In children older than 6 years/
  );
  assert.match(
    posttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "D")?.items[1]?.text || "",
    /My whole nervous system is permanently ruined/
  );
  assert.ok(
    posttraumaticStressDisorder.sections.some(
      (section) => section.title === "Association With Suicidal Thoughts or Behavior"
    )
  );
  assert.ok(
    posttraumaticStressDisorder.sections.some(
      (section) => section.title === "Functional Consequences of Posttraumatic Stress Disorder"
    )
  );
  assert.match(posttraumaticStressDisorder.differentialDiagnosis, /^Adjustment disorders\./);
  assert.match(
    posttraumaticStressDisorder.comorbidity,
    /^Individuals with PTSD are more likely than those without PTSD to have symptoms that meet diagnostic criteria for at least one other mental disorder/
  );
  assert.doesNotMatch(
    posttraumaticStressDisorder.comorbidity,
    /Acute Stress Disorder Diagnostic Criteria/
  );

  assert.equal(preschoolPosttraumaticStressDisorder.audit.status, "corrected");
  assert.deepEqual(preschoolPosttraumaticStressDisorder.source.titlePages, [458]);
  assert.deepEqual(
    preschoolPosttraumaticStressDisorder.source.sectionPages.diagnosticFeatures,
    [460, 461, 462, 463, 464]
  );
  assert.deepEqual(
    preschoolPosttraumaticStressDisorder.source.sectionPages.comorbidity,
    [470, 471]
  );
  assert.match(
    preschoolPosttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "B")?.items[0]?.note || "",
    /Spontaneous and intrusive memories may not necessarily appear distressing/
  );
  assert.equal(
    preschoolPosttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "C")?.groups
      .length,
    2
  );
  assert.match(
    preschoolPosttraumaticStressDisorder.criteria.find((criterion) => criterion.code === "G")?.text || "",
    /medication or alcohol/
  );
  assert.ok(
    preschoolPosttraumaticStressDisorder.sections.some(
      (section) => section.title === "Prevalence"
    )
  );
  assert.ok(
    preschoolPosttraumaticStressDisorder.sections.some(
      (section) => section.title === "Association With Suicidal Thoughts or Behavior"
    )
  );
  assert.match(
    preschoolPosttraumaticStressDisorder.comorbidity,
    /^Individuals with PTSD are more likely than those without PTSD to have symptoms that meet diagnostic criteria for at least one other mental disorder/
  );
});

test("narcolepsy now uses dedicated sleep-chapter pages and DSM severity text without hypersomnolence spill", () => {
  const narcolepsy = dataset.entries.find((item) => item.name === "Narcolepsy");

  assert.ok(narcolepsy);
  assert.equal(narcolepsy.audit.status, "corrected");
  assert.deepEqual(narcolepsy.source.titlePages, [604]);
  assert.deepEqual(narcolepsy.source.sectionPages.criteria, [604, 605]);
  assert.deepEqual(narcolepsy.source.sectionPages.comorbidity, [613]);
  assert.equal(narcolepsy.specifiers.some((specifier) => specifier.name === "Subtype"), true);
  assert.equal(
    narcolepsy.specifiers.some((specifier) => specifier.name === "Current Severity"),
    true
  );
  assert.match(
    narcolepsy.specifiers.find((specifier) => specifier.name === "Current Severity")?.options[2]
      ?.description || "",
    /drug-resistant, with multiple attacks daily/
  );
  assert.ok(
    narcolepsy.sections.some(
      (section) => section.title === "Functional Consequences of Narcolepsy"
    )
  );
  assert.ok(
    narcolepsy.sections.some(
      (section) =>
        section.title === "Relationship To International Classification Of Sleep Disorders"
    )
  );
  assert.match(narcolepsy.differentialDiagnosis, /^Other hypersomnias\./);
  assert.match(
    narcolepsy.comorbidity,
    /^Medical and psychiatric comorbidities are common among individuals with narcolepsy/
  );
  assert.doesNotMatch(narcolepsy.comorbidity, /^Many individuals with hypersomnolence disorder/);
});

test("obstructive sleep apnea hypopnea now uses dedicated sleep-chapter pages and corrected severity text", () => {
  const entry = dataset.entries.find((item) => item.name === "Obstructive Sleep Apnea Hypopnea");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [613]);
  assert.deepEqual(entry.source.sectionPages.comorbidity, [619, 620]);
  assert.deepEqual(entry.source.sectionPages.relationshipToInternationalClassificationOfSleepDisorders, [620]);
  assert.equal(
    entry.specifiers.find((specifier) => specifier.name === "Current Severity")?.options[0]
      ?.description,
    "Apnea hypopnea index is less than 15."
  );
  assert.ok(entry.sections.some((section) => section.title === "Specifiers"));
  assert.ok(
    entry.sections.some(
      (section) =>
        section.title === "Functional Consequences of Obstructive Sleep Apnea Hypopnea"
    )
  );
  assert.ok(
    entry.sections.some(
      (section) =>
        section.title === "Relationship To International Classification Of Sleep Disorders"
    )
  );
  assert.match(entry.differentialDiagnosis, /^Primary snoring and other sleep disorders\./);
  assert.match(
    entry.comorbidity,
    /^Systemic hypertension, coronary artery disease, heart failure, stroke, diabetes, and increased mortality are consistently associated with obstructive sleep apnea hypopnea\./
  );
  assert.doesNotMatch(entry.comorbidity, /^Medical and psychiatric comorbidities are common among individuals with narcolepsy/);
});

test("central sleep apnea now uses isolated pages and explicit opioid coding-note logic", () => {
  const entry = dataset.entries.find((item) => item.name === "Central Sleep Apnea");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [620]);
  assert.deepEqual(entry.source.sectionPages.criteria, [620, 621]);
  assert.deepEqual(entry.source.sectionPages.comorbidity, [624, 625]);
  assert.deepEqual(entry.source.sectionPages.relationshipToInternationalClassificationOfSleepDisorders, [625]);
  assert.deepEqual(entry.specifiers.map((specifier) => specifier.name), ["Subtype"]);
  assert.equal(entry.specifiers[0].allowsEmpty, false);
  assert.deepEqual(entry.specifiers[0].options.map((option) => option.name), [
    "Idiopathic central sleep apnea",
    "Cheyne-Stokes breathing",
    "Central sleep apnea comorbid with opioid use"
  ]);
  assert.equal(entry.coding.inputs[0]?.name, "Opioid Use Disorder");
  assert.equal(entry.coding.codeOrder, "additional-first");
  assert.equal(entry.recording.fields[0]?.key, "current-severity");
  assert.ok(entry.sections.some((section) => section.title === "Specifiers"));
  assert.match(entry.sections.find((section) => section.title === "Diagnostic Markers")?.content || "", /The cycle length of Cheyne-/);
  assert.match(entry.comorbidity, /^Central sleep apnea disorders are frequently present in users of long-acting opioids/);
  assert.doesNotMatch(entry.comorbidity, /Idiopathic hypoventilation/);
});

test("sleep-related hypoventilation now uses isolated pages and complete DSM subtype text", () => {
  const entry = dataset.entries.find((item) => item.name === "Sleep-Related Hypoventilation");

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [625]);
  assert.deepEqual(entry.source.sectionPages.criteria, [625, 626]);
  assert.deepEqual(entry.source.sectionPages.relationshipToInternationalClassificationOfSleepDisorders, [629, 630]);
  assert.equal(entry.criteria[0].text, "Polysomnograpy demonstrates episodes of decreased respiration associated with elevated CO2 levels.");
  assert.match(entry.criteria[0].note, /^Note: In the absence of objective measurement of CO2/);
  assert.deepEqual(entry.specifiers.map((specifier) => specifier.name), ["Subtype"]);
  assert.equal(entry.specifiers[0].allowsEmpty, false);
  assert.match(
    entry.specifiers[0].options[2]?.description || "",
    /Such individuals usually are characterized by body mass index of greater than 30/
  );
  assert.equal(entry.recording.fields[0]?.key, "current-severity");
  assert.match(
    entry.sections.find((section) => section.title === "Functional Consequences of Sleep-Related Hypoventilation")?.content || "",
    /progressive respiratory failure\.$/
  );
  assert.match(entry.comorbidity, /^Sleep-related hypoventilation often occurs in association with a pulmonary disorder/);
  assert.doesNotMatch(entry.sections.map((section) => section.content).join(" "), /G47\.24 Non-24-hour sleep-wake type/);
});

test("circadian rhythm parent and subtype entries now share complete criteria and isolated narrative pages", () => {
  const names = [
    "Circadian Rhythm Sleep-Wake Disorders",
    "Delayed Sleep Phase Type",
    "Advanced Sleep Phase Type",
    "Irregular Sleep-Wake Type",
    "Non-24-Hour Sleep-Wake Type",
    "Shift Work Type",
    "Unspecified Circadian Rhythm Sleep-Wake Disorder"
  ];
  const entries = names.map((name) => dataset.entries.find((item) => item.name === name));

  entries.forEach((entry, index) => {
    assert.ok(entry, `missing ${names[index]}`);
    assert.equal(entry.audit.status, "corrected");
    assert.match(entry.criteria[0]?.text || "", /^A persistent or recurrent pattern of sleep disruption/);
    assert.match(entry.criteria[2]?.text || "", /clinically significant distress or impairment/);
  });

  const [parent, delayed, advanced, irregular, non24Hour, shiftWork, unspecified] = entries;
  assert.equal(parent.criteria.length, 3);
  assert.equal(parent.specifiers[0].name, "Subtype");
  assert.equal(parent.specifiers[0].allowsEmpty, false);
  assert.match(parent.specifiers[0].options[0]?.description || "", /conventionally acceptable earlier time/);
  assert.equal(
    parent.specifiers.find((specifier) => specifier.name === "Course Specifiers")?.allowsEmpty,
    true
  );
  assert.equal(parent.coding.rules.length, 6);

  [delayed, advanced, irregular, non24Hour, shiftWork, unspecified].forEach((entry) => {
    assert.equal(entry.criteria.length, 4);
    assert.equal(entry.specifiers.at(-1)?.name, "Course");
    assert.equal(entry.specifiers.at(-1)?.allowsEmpty, true);
  });

  assert.deepEqual(delayed.source.sectionPages.functionalConsequencesOfDelayedSleepPhaseType, [632, 633]);
  assert.match(
    delayed.sections.find((section) => section.title === "Functional Consequences of Delayed Sleep Phase Type")?.content || "",
    /occupational and social demands on the individual\.$/
  );
  assert.match(advanced.differentialDiagnosis, /^Normal variations in sleep\./);
  assert.doesNotMatch(advanced.differentialDiagnosis, /^Normative variations in sleep\. Delayed sleep phase type/);
  assert.doesNotMatch(irregular.comorbidity, /Non-24-Hour Sleep-Wake Type/);
  assert.match(non24Hour.comorbidity, /social isolation\.$/);
  assert.match(
    shiftWork.sections.find(
      (section) => section.title === "Relationship To International Classification Of Sleep Disorders"
    )?.content || "",
    /also include jet lag type\.$/
  );
  assert.doesNotMatch(shiftWork.sections.map((section) => section.content).join(" "), /Parasomnias are disorders/);
  assert.equal(unspecified.kind, "diagnosis");
  assert.equal(unspecified.coding.code, "G47.20");
});

test("parasomnias REM behavior disorder and restless legs syndrome now use isolated DSM pages", () => {
  const parasomnias = dataset.entries.find((item) => item.name === "Parasomnias");
  const remBehavior = dataset.entries.find(
    (item) => item.name === "Rapid Eye Movement Sleep Behavior Disorder"
  );
  const restlessLegs = dataset.entries.find((item) => item.name === "Restless Legs Syndrome");

  assert.ok(parasomnias);
  assert.ok(remBehavior);
  assert.ok(restlessLegs);
  assert.equal(parasomnias.audit.status, "corrected");
  assert.equal(parasomnias.kind, "group");
  assert.equal(parasomnias.coding.strategy, "none");
  assert.match(parasomnias.sections[0]?.content || "", /^Parasomnias are disorders characterized by abnormal behavioral/);
  assert.doesNotMatch(parasomnias.sections[0]?.content || "", /Diagnostic Criteria/);

  assert.equal(remBehavior.audit.status, "corrected");
  assert.deepEqual(remBehavior.source.sectionPages.criteria, [652]);
  assert.equal(remBehavior.criteria.length, 7);
  assert.match(
    remBehavior.sections.find(
      (section) => section.title === "Functional Consequences of Rapid Eye Movement Sleep Behavior Disorder"
    )?.content || "",
    /requiring medical attention\.$/
  );
  assert.match(remBehavior.comorbidity, /often more than a decade\)\.$/);
  assert.doesNotMatch(remBehavior.sections.map((section) => section.content).join(" "), /urge to move the legs/);

  assert.equal(restlessLegs.audit.status, "corrected");
  assert.deepEqual(restlessLegs.source.sectionPages.criteria, [656]);
  assert.equal(restlessLegs.criteria[0]?.items.length, 3);
  assert.match(
    restlessLegs.sections.find((section) => section.title === "Sex- and Gender-Related Diagnostic Issues")?.content || "",
    /nulliparous females being at the same risk for RLS as age-matched males\.$/
  );
  assert.match(restlessLegs.comorbidity, /these conditions resolve\.$/);
  assert.match(
    restlessLegs.sections.find(
      (section) => section.title === "Relationship To International Classification Of Sleep Disorders"
    )?.content || "",
    /frequency or duration of symptoms\.$/
  );
  assert.doesNotMatch(restlessLegs.sections.map((section) => section.content).join(" "), /Substance\/Medication-Induced Sleep Disorder/);
});

test("residual sleep diagnoses now expose exact-page DSM descriptions and verbatim recording guidance", () => {
  const expectations = [
    ["Other Specified Insomnia Disorder", [668], "G47.09"],
    ["Unspecified Insomnia Disorder", [669], "G47.00"],
    ["Other Specified Hypersomnolence Disorder", [669], "G47.19"],
    ["Unspecified Hypersomnolence Disorder", [669, 670], "G47.10"],
    ["Other Specified Sleep-Wake Disorder", [670], "G47.8"],
    ["Unspecified Sleep-Wake Disorder", [670], "G47.9"]
  ];

  expectations.forEach(([name, titlePages, code]) => {
    const entry = dataset.entries.find((item) => item.name === name);
    assert.ok(entry, `missing ${name}`);
    assert.equal(entry.audit.status, "corrected");
    assert.deepEqual(entry.source.titlePages, titlePages);
    assert.equal(entry.coding.code, code);
    assert.equal(entry.sections.length, 1);
    assert.equal(entry.sections[0].title, "Description");
    assert.match(entry.sections[0].content, /^This category applies to presentations/);
  });

  const otherSpecifiedEntries = expectations
    .map(([name]) => dataset.entries.find((item) => item.name === name))
    .filter((entry) => entry.name.startsWith("Other Specified"));

  otherSpecifiedEntries.forEach((entry) => {
    assert.equal(entry.recording.mode, "other-specified-with-reason");
    assert.match(entry.recording.instructions[0], /^This is done by recording “other specified/);
    assert.equal(entry.recording.fields[0]?.key, "specific-reason");
  });

  const unspecifiedHypersomnolence = dataset.entries.find(
    (item) => item.name === "Unspecified Hypersomnolence Disorder"
  );
  assert.match(unspecifiedHypersomnolence.sections[0].content, /insufficient information to make a more specific diagnosis\.$/);
  assert.doesNotMatch(unspecifiedHypersomnolence.sections[0].content, /Other Specified Sleep-Wake Disorder/);
});

test("Adjustment Disorders now models the DSM subtype as a real specifier group", () => {
  const adjustmentDisorders = dataset.entries.find((entry) => entry.name === "Adjustment Disorders");
  assert.ok(adjustmentDisorders);
  assert.equal(adjustmentDisorders.coding.strategy, "option-map");
  assert.equal(adjustmentDisorders.coding.inputs.length, 0);

  const subtype = adjustmentDisorders.specifiers.find((specifier) => specifier.name === "Subtype");
  const duration = adjustmentDisorders.specifiers.find((specifier) => specifier.name === "Duration");

  assert.ok(subtype);
  assert.equal(subtype.selectionType, "single");
  assert.deepEqual(subtype.options.map((option) => option.name), [
    "With depressed mood",
    "With anxiety",
    "With mixed anxiety and depressed mood",
    "With disturbance of conduct",
    "With mixed disturbance of emotions and conduct",
    "Unspecified"
  ]);

  assert.ok(duration);
  assert.equal(duration.selectionType, "single");
  assert.equal(duration.allowsEmpty, true);
});

test("Specific Phobia exposes the explicit blood-injection-injury ICD-10-CM split", () => {
  const entry = dataset.entries.find((item) => item.name === "Specific Phobia");
  assert.ok(entry);
  assert.ok(entry.codes.some((code) => code.code === "F40.230"));
  assert.ok(entry.codes.some((code) => code.code === "F40.231"));
  assert.ok(entry.codes.some((code) => code.code === "F40.232"));
  assert.ok(entry.codes.some((code) => code.code === "F40.233"));

  const codingGroup = entry.coding.inputs?.find(
    (group) => group.name === "Blood-Injection-Injury ICD-10-CM Code"
  );
  assert.ok(codingGroup);
  assert.equal(codingGroup.selectionType, "single");
  assert.deepEqual(codingGroup.options.map((option) => option.name), [
    "Fear of blood",
    "Fear of injections and transfusions",
    "Fear of other medical care",
    "Fear of injury"
  ]);
});

test("Caffeine Intoxication now carries the corrected DSM code", () => {
  const entry = dataset.entries.find((item) => item.name === "Caffeine Intoxication");
  assert.ok(entry);
  assert.deepEqual(entry.codes.map((code) => code.code), ["F15.920"]);
  assert.equal(entry.coding.code, "F15.920");
});

test("substance-induced bipolar and depressive entries no longer expose placeholder F1x.x4 codes", () => {
  [
    "Substance/Medication-Induced Bipolar and Related Disorder",
    "Substance/Medication-Induced Depressive Disorder"
  ].forEach((entryName) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.ok(entry.codes.length > 0, `expected explicit code display rows for ${entryName}`);
    assert.equal(entry.codes.some((item) => item.code === "F1x.x4" || item.code === "F1X.X4"), false);
  });
});

test("substance-induced psychotic and anxiety entries no longer expose placeholder variable codes", () => {
  const psychotic = dataset.entries.find(
    (entry) => entry.name === "Substance/Medication-Induced Psychotic Disorder"
  );
  const anxiety = dataset.entries.find(
    (entry) => entry.name === "Substance/Medication-Induced Anxiety Disorder"
  );

  assert.ok(psychotic);
  assert.ok(anxiety);
  assert.equal(psychotic.audit.status, "corrected");
  assert.equal(anxiety.audit.status, "corrected");
  assert.equal(psychotic.recording.mode, "substance-induced-first");
  assert.equal(anxiety.recording.mode, "substance-induced-first");
  assert.ok(psychotic.sections.some((section) => section.title === "Recording Procedures"));
  assert.ok(anxiety.sections.some((section) => section.title === "Recording Procedures"));
  assert.equal(psychotic.codes.some((item) => item.code === "F1x.x59" || item.code === "F1X.X59"), false);
  assert.equal(anxiety.codes.some((item) => item.code === "F1x.x80" || item.code === "F1X.X80"), false);
  assert.ok(psychotic.codes.some((item) => item.code === "F14.259"));
  assert.ok(anxiety.codes.some((item) => item.code === "F15.980"));

  const anxietyCodesForCaffeine = anxiety.codes.filter((item) => item.label.startsWith("Caffeine"));
  assert.deepEqual(anxietyCodesForCaffeine.map((item) => item.code), ["F15.980"]);
});

test("substance-induced sleep and sexual dysfunction entries no longer collapse multiple DSM codes into one slash-coded picker", () => {
  const sleep = dataset.entries.find(
    (entry) => entry.name === "Substance/Medication-Induced Sleep Disorder"
  );
  const sexual = dataset.entries.find(
    (entry) => entry.name === "Substance/Medication-Induced Sexual Dysfunction"
  );

  assert.ok(sleep);
  assert.ok(sexual);
  assert.equal(sleep.audit.status, "corrected");
  assert.equal(sexual.audit.status, "corrected");
  assert.ok(sleep.codes.some((item) => item.code === "F17.208"));
  assert.ok(sexual.codes.some((item) => item.code === "F10.281"));
  assert.equal(sleep.codes.some((item) => item.code.includes("/")), false);
  assert.equal(sexual.codes.some((item) => item.code.includes("/")), false);
  assert.equal(sleep.coding.inputs.some((group) => group.name === "Substance Type"), true);
  assert.equal(sleep.coding.inputs.some((group) => group.name === "Use Disorder Status"), true);
  assert.equal(sexual.coding.inputs.some((group) => group.name === "Substance Type"), true);
  assert.equal(sexual.coding.inputs.some((group) => group.name === "Use Disorder Status"), true);
});

test("alcohol and cannabis intoxication-withdrawal entries now use DSM status selectors instead of a generic recording-option picker", () => {
  const expectations = [
    {
      entryName: "Alcohol Intoxication",
      titlePages: [775],
      codingGroups: ["Use Disorder Status"]
    },
    {
      entryName: "Alcohol Withdrawal",
      titlePages: [779],
      codingGroups: ["Use Disorder Status"]
    },
    {
      entryName: "Cannabis Intoxication",
      titlePages: [800],
      codingGroups: ["Use Disorder Status"]
    },
    {
      entryName: "Cannabis Withdrawal",
      titlePages: [802],
      codingGroups: ["Use Disorder Status"]
    }
  ];

  expectations.forEach(({ entryName, titlePages, codingGroups }) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "corrected");
    assert.deepEqual(entry.source.titlePages, titlePages);
    assert.equal(entry.coding.inputs.some((group) => group.name === "Recording Option"), false);
    assert.deepEqual(
      entry.coding.inputs.map((group) => group.name),
      codingGroups
    );
  });
});

test("substance-induced obsessive-compulsive entry now uses the DSM coding table and recording procedures", () => {
  const entry = dataset.entries.find(
    (item) =>
      item.name === "Substance/Medication-Induced Obsessive-Compulsive and Related Disorder"
  );

  assert.ok(entry);
  assert.equal(entry.audit.status, "corrected");
  assert.deepEqual(entry.source.titlePages, [438]);
  assert.equal(entry.coding.inputs.some((group) => group.name === "Recording Option"), false);
  assert.deepEqual(
    entry.coding.inputs.map((group) => group.name),
    ["Substance Type", "Use Disorder Status"]
  );
  assert.equal(entry.recording.mode, "substance-induced-first");
  assert.ok(entry.sections.some((section) => section.title === "Recording Procedures"));
  assert.ok(entry.codes.some((item) => item.code === "F14.288"));
});

test("every entry now carries at least one audited DSM title-page reference", () => {
  const missingTitlePages = dataset.entries.filter((entry) => !entry.source?.titlePages?.length);
  assert.equal(missingTitlePages.length, 0);
});

test("recording guidance is normalized for DSM entries that need structured recording help", () => {
  const entriesByName = new Map(dataset.entries.map((entry) => [entry.name, entry]));

  assert.equal(entriesByName.get("Other Specified Insomnia Disorder")?.recording?.mode, "other-specified-with-reason");
  assert.equal(entriesByName.get("Insomnia Disorder")?.recording?.mode, "comorbid-conditions-after");
  assert.equal(
    entriesByName.get("Substance/Medication-Induced Sleep Disorder")?.recording?.mode,
    "substance-induced-first"
  );
  assert.equal(
    entriesByName.get("Other Specified Mental Disorder Due to Another Medical Condition")?.recording?.mode,
    "medical-condition-first"
  );
});

test("Other Mental Disorders and Additional Codes chapter audit is now marked reviewed", () => {
  const chapterEntries = dataset.entries.filter(
    (entry) => entry.chapterTitle === "Other Mental Disorders and Additional Codes"
  );

  assert.equal(chapterEntries.length, 5);
  chapterEntries.forEach((entry) => {
    assert.equal(entry.audit.status, "reviewed");
  });
});

test("No Diagnosis or Condition is modeled as an additional code rather than a diagnosis", () => {
  const entry = dataset.entries.find((item) => item.name === "No Diagnosis or Condition");
  assert.ok(entry);
  assert.equal(entry.kind, "additional-code");
  assert.equal(entry.coding.code, "Z03.89");
});

test("medication-induced movement chapter entries are classified as clinical-focus conditions", () => {
  const chapterEntries = dataset.entries.filter(
    (entry) =>
      entry.chapterTitle ===
      "Medication-Induced Movement Disorders and Other Adverse Effects of Medication"
  );

  assert.equal(chapterEntries.length, 10);
  chapterEntries.forEach((entry) => {
    assert.equal(entry.kind, "clinical-focus-condition");
    assert.equal(entry.audit.status, "corrected");
  });
});

test("dissociative disorders chapter now points to the correct DSM source pages", () => {
  const chapterEntries = dataset.entries.filter((entry) => entry.chapterTitle === "Dissociative Disorders");
  assert.equal(chapterEntries.length, 5);

  const amnesia = chapterEntries.find((entry) => entry.name === "Dissociative Amnesia");
  const depersonalization = chapterEntries.find(
    (entry) => entry.name === "Depersonalization/Derealization Disorder"
  );
  const otherSpecified = chapterEntries.find(
    (entry) => entry.name === "Other Specified Dissociative Disorder"
  );

  assert.deepEqual(amnesia.source.titlePages, [501]);
  assert.deepEqual(depersonalization.source.titlePages, [508]);
  assert.deepEqual(otherSpecified.source.titlePages, [512, 513]);

  chapterEntries.forEach((entry) => {
    assert.equal(entry.audit.status, "corrected");
  });
});

test("elimination disorders residual coding is audited to urinary-vs-fecal DSM options", () => {
  const otherSpecified = dataset.entries.find(
    (entry) => entry.name === "Other Specified Elimination Disorder"
  );
  const unspecified = dataset.entries.find((entry) => entry.name === "Unspecified Elimination Disorder");

  assert.deepEqual(otherSpecified.source.titlePages, [584]);
  assert.deepEqual(unspecified.source.titlePages, [584, 585]);
  assert.equal(otherSpecified.audit.status, "corrected");
  assert.equal(unspecified.audit.status, "corrected");
  assert.match(otherSpecified.coding.notes[0], /urinary or fecal symptoms/);
  assert.match(unspecified.coding.notes[0], /urinary or fecal symptoms/);
});

test("verified DSM multi-select groups remain multi-select where the manual allows combinations", () => {
  const expectations = [
    {
      entryName: "Autism Spectrum Disorder",
      specifierName: "Associated Condition",
      auditStatus: "reviewed"
    },
    {
      entryName: "Insomnia Disorder",
      specifierName: "Comorbidity Specifiers",
      auditStatus: "reviewed"
    },
    {
      entryName: "Hypersomnolence Disorder",
      specifierName: "Comorbidity Specifiers",
      auditStatus: "reviewed"
    },
    {
      entryName: "Nightmare Disorder",
      specifierName: "Comorbidity Specifiers",
      auditStatus: "reviewed"
    },
    {
      entryName: "Fetishistic Disorder",
      specifierName: "Focus of Arousal",
      auditStatus: "reviewed"
    }
  ];

  expectations.forEach(({ entryName, specifierName, auditStatus }) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, auditStatus);

    const specifier = entry.specifiers.find((item) => item.name === specifierName);
    assert.ok(specifier, `missing specifier ${specifierName} on ${entryName}`);
    assert.equal(specifier.selectionType, "multiple");
    assert.equal(specifier.minSelections, 1);
  });
});

test("disruptive-impulse-control chapter entries with empty legacy panels now carry reviewed source-grounded summaries", () => {
  const expectations = [
    "Intermittent Explosive Disorder",
    "Pyromania",
    "Kleptomania",
    "Other Specified Disruptive, Impulse-Control, and Conduct Disorder",
    "Unspecified Disruptive, Impulse-Control, and Conduct Disorder"
  ];

  expectations.forEach((entryName) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.ok(entry.sections.length > 0, `expected sourced sections for ${entryName}`);
    assert.ok(entry.source.sectionPages, `expected source section pages for ${entryName}`);
  });
});

test("tic-disorder cluster now carries reviewed DSM-grounded summaries", () => {
  const expectations = [
    "Tourette's Disorder",
    "Persistent (Chronic) Motor or Vocal Tic Disorder",
    "Provisional Tic Disorder",
    "Other Specified Tic Disorder",
    "Unspecified Tic Disorder"
  ];

  expectations.forEach((entryName) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.ok(entry.sections.length > 0, `expected reviewed sections for ${entryName}`);
  });

  const persistentTicDisorder = dataset.entries.find(
    (entry) => entry.name === "Persistent (Chronic) Motor or Vocal Tic Disorder"
  );
  assert.deepEqual(persistentTicDisorder.codes.map((item) => item.code), ["F95.0"]);
  assert.equal(persistentTicDisorder.coding.code, "F95.0");
});

test("mood and anxiety residual entries are reviewed and other specified entries require a stated reason", () => {
  const reviewedEntries = [
    "Other Specified Bipolar and Related Disorder",
    "Unspecified Bipolar and Related Disorder",
    "Other Specified Depressive Disorder",
    "Unspecified Depressive Disorder",
    "Other Specified Anxiety Disorder",
    "Unspecified Anxiety Disorder"
  ];

  reviewedEntries.forEach((entryName) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.ok(entry.sections.length > 0, `expected reviewed section text for ${entryName}`);
  });

  ["Other Specified Bipolar and Related Disorder", "Other Specified Depressive Disorder", "Other Specified Anxiety Disorder"].forEach(
    (entryName) => {
      const entry = dataset.entries.find((item) => item.name === entryName);
      assert.equal(entry.recording.mode, "other-specified-with-reason");
      assert.equal(entry.recording.fields[0]?.key, "specific-reason");
    }
  );
});

test("other specified residual diagnoses consistently expose a specific-reason recording field", () => {
  dataset.entries
    .filter(
      (entry) =>
        /^Other Specified\b/.test(entry.name) &&
        entry.name !== "Other Specified Mental Disorder Due to Another Medical Condition"
    )
    .forEach((entry) => {
      assert.equal(
        entry.recording.mode,
        "other-specified-with-reason",
        `expected specific-reason recording mode for ${entry.name}`
      );
      assert.equal(entry.recording.fields[0]?.key, "specific-reason", `expected specific-reason field for ${entry.name}`);
    });
});

test("psychotic ocrd trauma and somatic residual entries are now reviewed with corrected DSM residual-page coverage", () => {
  const expectations = [
    ["Other Specified Schizophrenia Spectrum and Other Psychotic Disorder", "reviewed"],
    ["Unspecified Schizophrenia Spectrum and Other Psychotic Disorder", "reviewed"],
    ["Other Specified Obsessive-Compulsive and Related Disorder", "reviewed"],
    ["Unspecified Obsessive-Compulsive and Related Disorder", "reviewed"],
    ["Other Specified Trauma- and Stressor-Related Disorder", "reviewed"],
    ["Unspecified Trauma- and Stressor-Related Disorder", "reviewed"],
    ["Other Specified Somatic Symptom and Related Disorder", "reviewed"],
    ["Unspecified Somatic Symptom and Related Disorder", "reviewed"]
  ];

  expectations.forEach(([entryName, auditStatus]) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, auditStatus);
    assert.ok(entry.sections.length > 0, `expected reviewed description for ${entryName}`);
  });

  const unspecifiedPsychotic = dataset.entries.find(
    (item) => item.name === "Unspecified Schizophrenia Spectrum and Other Psychotic Disorder"
  );
  assert.deepEqual(unspecifiedPsychotic.source.titlePages, [253]);

  const unspecifiedSomatic = dataset.entries.find(
    (item) => item.name === "Unspecified Somatic Symptom and Related Disorder"
  );
  assert.deepEqual(unspecifiedSomatic.source.titlePages, [541, 542]);
});

test("feeding gender and neurocognitive residual entries are reviewed and cleaned up", () => {
  const expectations = [
    "Other Specified Feeding or Eating Disorder",
    "Unspecified Feeding or Eating Disorder",
    "Other Specified Gender Dysphoria",
    "Unspecified Gender Dysphoria",
    "Other Specified Delirium",
    "Unspecified Delirium",
    "Unspecified Neurocognitive Disorder"
  ];

  expectations.forEach((entryName) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.ok(entry.sections.length > 0, `expected reviewed description for ${entryName}`);
  });

  const genderOtherSpecified = dataset.entries.find((item) => item.name === "Other Specified Gender Dysphoria");
  assert.equal(
    genderOtherSpecified.recording.fields[0]?.placeholder,
    "e.g., brief gender dysphoria"
  );

  const hypersomnolenceOtherSpecified = dataset.entries.find(
    (item) => item.name === "Other Specified Hypersomnolence Disorder"
  );
  assert.equal(
    hypersomnolenceOtherSpecified.recording.fields[0]?.placeholder,
    "e.g., brief-duration hypersomnolence"
  );
});

test("gender dysphoria core entries and remaining bipolar entries now carry audited DSM summaries and corrected recording guidance", () => {
  const genderChildren = dataset.entries.find((item) => item.name === "Gender Dysphoria in Children");
  const genderAdolescentsAdults = dataset.entries.find(
    (item) => item.name === "Gender Dysphoria in Adolescents and Adults"
  );
  const bipolarI = dataset.entries.find((item) => item.name === "Bipolar I Disorder");
  const cyclothymic = dataset.entries.find((item) => item.name === "Cyclothymic Disorder");
  const substanceInducedBipolar = dataset.entries.find(
    (item) => item.name === "Substance/Medication-Induced Bipolar and Related Disorder"
  );
  const dueToMedicalCondition = dataset.entries.find(
    (item) => item.name === "Bipolar and Related Disorder Due to Another Medical Condition"
  );

  [genderChildren, genderAdolescentsAdults, cyclothymic].forEach((entry) => {
    assert.ok(entry, `missing entry ${entry?.name || "unknown"}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.ok(entry.sections.length > 0, `expected reviewed sections for ${entry.name}`);
  });

  assert.deepEqual(genderChildren.source.titlePages, [714]);
  assert.deepEqual(genderAdolescentsAdults.source.titlePages, [715]);
  assert.ok(
    genderAdolescentsAdults.specifiers.some((specifier) => specifier.name === "Posttransition"),
    "expected the posttransition specifier to remain available"
  );

  assert.ok(bipolarI);
  assert.equal(bipolarI.audit.status, "corrected");
  assert.deepEqual(bipolarI.source.titlePages, [259]);
  assert.equal(bipolarI.coding.inputs.length, 0);
  assert.equal(bipolarI.coding.inputs.some((input) => input.name === "Recording Option"), false);
  assert.equal(
    bipolarI.specifiers.some((specifier) => specifier.name === "Current or Most Recent Episode"),
    true
  );
  assert.ok(
    bipolarI.sections.some((section) => section.title === "Association With Suicidal Thoughts or Behavior"),
    "expected sourced suicidality coverage for Bipolar I Disorder"
  );

  assert.deepEqual(cyclothymic.source.titlePages, [279]);

  assert.equal(substanceInducedBipolar.audit.status, "corrected");
  assert.deepEqual(substanceInducedBipolar.source.titlePages, [282]);
  assert.equal(substanceInducedBipolar.coding.strategy, "option-map");
  assert.equal(substanceInducedBipolar.coding.inputs.length, 2);
  assert.deepEqual(
    substanceInducedBipolar.coding.inputs.map((input) => input.name),
    ["Substance Type", "Use Disorder Status"]
  );
  assert.equal(substanceInducedBipolar.recording.mode, "substance-induced-first");

  assert.equal(dueToMedicalCondition.audit.status, "corrected");
  assert.deepEqual(dueToMedicalCondition.source.titlePages, [287]);
  assert.equal(dueToMedicalCondition.recording.mode, "medical-condition-first");
  assert.ok(
    dueToMedicalCondition.sections.some((section) => section.title === "Recording Procedures"),
    "expected code-first recording guidance for bipolar disorder due to another medical condition"
  );
});

test("remaining depressive chapter entries are now audited with corrected recording guidance and DSM-grounded summaries", () => {
  const dmdd = dataset.entries.find((item) => item.name === "Disruptive Mood Dysregulation Disorder");
  const majorDepression = dataset.entries.find((item) => item.name === "Major Depressive Disorder");
  const pmdd = dataset.entries.find((item) => item.name === "Premenstrual Dysphoric Disorder");
  const substanceInducedDepression = dataset.entries.find(
    (item) => item.name === "Substance/Medication-Induced Depressive Disorder"
  );
  const depressionDueToMedicalCondition = dataset.entries.find(
    (item) => item.name === "Depressive Disorder Due to Another Medical Condition"
  );

  [dmdd, majorDepression, pmdd].forEach((entry) => {
    assert.ok(entry, `missing entry ${entry?.name || "unknown"}`);
    assert.ok(entry.sections.length >= 7, `expected expanded reviewed sections for ${entry.name}`);
  });

  assert.equal(dmdd.audit.status, "reviewed");
  assert.equal(majorDepression.audit.status, "corrected");
  assert.equal(pmdd.audit.status, "reviewed");
  assert.equal(majorDepression.coding.inputs.length, 0);
  assert.equal(majorDepression.coding.inputs.some((input) => input.name === "Recording Option"), false);
  assert.equal(majorDepression.specifiers.some((specifier) => specifier.name === "Episode"), true);
  assert.equal(
    majorDepression.specifiers.some(
      (specifier) => specifier.name === "Severity/Psychotic/Remission Status"
    ),
    true
  );

  assert.equal(substanceInducedDepression.audit.status, "corrected");
  assert.equal(substanceInducedDepression.coding.strategy, "option-map");
  assert.deepEqual(
    substanceInducedDepression.coding.inputs.map((input) => input.name),
    ["Substance Type", "Use Disorder Status"]
  );
  assert.equal(substanceInducedDepression.recording.mode, "substance-induced-first");

  assert.equal(depressionDueToMedicalCondition.audit.status, "corrected");
  assert.equal(depressionDueToMedicalCondition.recording.mode, "medical-condition-first");
  assert.ok(
    depressionDueToMedicalCondition.sections.some((section) => section.title === "Recording Procedures"),
    "expected recording procedures for depressive disorder due to another medical condition"
  );
});

test("core feeding and eating diagnoses are now reviewed with corrected within-chapter DSM page maps", () => {
  const expectations = [
    ["Pica", [544], "corrected"],
    ["Rumination Disorder", [547], "reviewed"],
    ["Avoidant/Restrictive Food Intake Disorder", [550], "reviewed"],
    ["Anorexia Nervosa", [556], "reviewed"],
    ["Bulimia Nervosa", [564], "reviewed"],
    ["Binge-Eating Disorder", [570], "reviewed"]
  ];

  expectations.forEach(([entryName, titlePages, auditStatus]) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, auditStatus);
    assert.deepEqual(entry.source.titlePages, titlePages);
  });

  const pica = dataset.entries.find((item) => item.name === "Pica");
  assert.deepEqual(pica.source.sectionPages.prevalence, [545]);

  const arfid = dataset.entries.find((item) => item.name === "Avoidant/Restrictive Food Intake Disorder");
  assert.deepEqual(arfid.source.sectionPages.differentialDiagnosis, [553, 554, 555]);

  const bingeEating = dataset.entries.find((item) => item.name === "Binge-Eating Disorder");
  assert.deepEqual(bingeEating.source.sectionPages.comorbidity, [574]);
});

test("core somatic symptom and related diagnoses are now reviewed with corrected DSM page maps and verbatim narrative guidance", () => {
  const expectations = [
    ["Somatic Symptom Disorder", [518]],
    ["Illness Anxiety Disorder", [525]],
    ["Functional Neurological Symptom Disorder (Conversion Disorder)", [529]],
    ["Psychological Factors Affecting Other Medical Conditions", [534]],
    ["Factitious Disorder Imposed on Self", [538]],
    ["Factitious Disorder Imposed on Another (Previously Factitious Disorder by Proxy)", [538]]
  ];

  expectations.forEach(([entryName, titlePages]) => {
    const entry = dataset.entries.find((item) => item.name === entryName);
    assert.ok(entry, `missing entry ${entryName}`);
    assert.equal(entry.audit.status, "reviewed");
    assert.deepEqual(entry.source.titlePages, titlePages);
  });

  const somaticSymptom = dataset.entries.find((item) => item.name === "Somatic Symptom Disorder");
  assert.deepEqual(somaticSymptom.source.sectionPages.comorbidity, [525]);
  assert.match(
    somaticSymptom.differentialDiagnosis,
    /^If the somatic symptoms are consistent with another mental disorder/i
  );

  const illnessAnxiety = dataset.entries.find((item) => item.name === "Illness Anxiety Disorder");
  assert.deepEqual(illnessAnxiety.source.sectionPages.comorbidity, [529]);
  assert.match(
    illnessAnxiety.differentialDiagnosis,
    /^Other medical conditions\.\s+The first differential diagnostic consideration is an underlying medical condition/i
  );

  const functionalNeurological = dataset.entries.find(
    (item) => item.name === "Functional Neurological Symptom Disorder (Conversion Disorder)"
  );
  assert.deepEqual(functionalNeurological.source.sectionPages.specifiers, [530]);
  assert.equal(functionalNeurological.coding.strategy, "option-map");
  assert.match(
    functionalNeurological.differentialDiagnosis,
    /^Recognized neurological disease\.\s+The main differential diagnosis is recognized neurological disease/i
  );

  const psychologicalFactors = dataset.entries.find(
    (item) => item.name === "Psychological Factors Affecting Other Medical Conditions"
  );
  assert.deepEqual(psychologicalFactors.source.sectionPages.comorbidity, [537]);
  assert.match(
    psychologicalFactors.comorbidity,
    /^By definition, the diagnosis of psychological factors affecting other medical conditions/i
  );

  const factitiousSelf = dataset.entries.find((item) => item.name === "Factitious Disorder Imposed on Self");
  assert.ok(
    factitiousSelf.sections.some((section) => section.title === "Recording Procedures"),
    "expected a self-specific recording-procedures section for factitious disorder imposed on self"
  );
  assert.equal(factitiousSelf.recording.mode, "dual-diagnosis-note");

  const factitiousAnother = dataset.entries.find(
    (item) => item.name === "Factitious Disorder Imposed on Another (Previously Factitious Disorder by Proxy)"
  );
  assert.ok(
    factitiousAnother.recording.instructions.some((instruction) => instruction.includes("perpetrator")),
    "expected perpetrator-focused recording guidance for factitious disorder imposed on another"
  );
});

test("the DSM-only audit queue is complete without legacy generic coding pickers", () => {
  assert.equal(dataset.entries.length, 295);
  assert.equal(dataset.entries.filter((entry) => entry.audit.status === "unchecked").length, 0);
  assert.equal(dataset.entries.filter((entry) => entry.coding.strategy === "needs-review").length, 0);
  assert.equal(
    dataset.entries.filter((entry) =>
      (entry.coding.inputs || []).some((input) => input.name === "Recording Option")
    ).length,
    0
  );
});

test("final diagnosis title anchors and corrected criteria structures remain DSM-grounded", () => {
  const titlePages = new Map([
    ["Delayed Ejaculation", [673]],
    ["Other Hallucinogen Use Disorder", [810]],
    ["Major Neurocognitive Disorder", [916]],
    ["Paranoid Personality Disorder", [985]],
    ["Unspecified Personality Disorder", [1034]],
    ["Voyeuristic Disorder", [1037]],
    ["Unspecified Paraphilic Disorder", [1063]]
  ]);

  titlePages.forEach((pages, name) => {
    const entry = dataset.entries.find((item) => item.name === name);
    assert.ok(entry, `missing entry ${name}`);
    assert.deepEqual(entry.source.titlePages, pages);
    assert.notEqual(entry.audit.status, "unchecked");
  });

  const cannabis = dataset.entries.find((entry) => entry.name === "Cannabis Use Disorder");
  const cannabisCriteria = cannabis.criteria[0].items;
  assert.deepEqual(cannabisCriteria.find((criterion) => criterion.code === "10").items.map((item) => item.code), ["a", "b"]);
  assert.deepEqual(cannabisCriteria.find((criterion) => criterion.code === "11").items.map((item) => item.code), ["a", "b"]);

  const paranoid = dataset.entries.find((entry) => entry.name === "Paranoid Personality Disorder");
  const jealousyCriterion = paranoid.criteria[0].items.find((criterion) => criterion.code === "7");
  assert.match(jealousyCriterion.text, /without justification/);
  assert.doesNotMatch(jealousyCriterion.text, /Substantiation/);
});

test("clinical-focus entries use explicit DSM code choices without fabricated narrative", () => {
  const entries = dataset.entries.filter(
    (entry) =>
      entry.chapterId === "other-conditions-that-may-be-a-focus-of-clinical-attention"
  );
  assert.equal(entries.length, 82);
  assert.equal(entries.every((entry) => entry.audit.status === "reviewed"), true);
  assert.equal(
    entries.some((entry) =>
      (entry.coding.inputs || []).some((input) => input.name === "Recording Option")
    ),
    false
  );

  const childPhysicalAbuse = entries.find((entry) => entry.name.endsWith(": Child Physical Abuse"));
  assert.ok(childPhysicalAbuse);
  assert.equal(childPhysicalAbuse.coding.inputs[0].name, "Encounter and Status");
  assert.equal(childPhysicalAbuse.coding.rules.length, 9);

  const unemployment = entries.find((entry) => entry.name.endsWith(": Unemployment"));
  assert.ok(unemployment);
  assert.equal(unemployment.coding.strategy, "fixed");
  assert.equal(unemployment.coding.code, "Z56.0");
  assert.equal(unemployment.sections.length, 0);
});
