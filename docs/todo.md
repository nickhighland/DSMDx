# DSMDx DSM-Only To-Do

This is the working execution guide for finishing DSMDx against the DSM-5-TR full manual only.

## Source Rules

- [x] The DSM-5-TR full manual PDF is the only authoritative source for criteria wording, coding notes, recording procedures, specifiers, and right-panel prose.
- [x] The Desk Reference is no longer part of the active build, audit, or validation pipeline.
- [x] The app must stay plain-static for GitHub Pages.
- [x] The runtime must stay self-hosted only: no remote APIs, no analytics, no remote fonts, no third-party embeds.
- [x] Local `file://` loading must keep working.
- [x] Narrative text in the right panel must be verbatim DSM wording or be omitted until extracted cleanly.

## Current Snapshot (2026-07-12)

- [x] 295 entries across 22 chapters.
- [x] 295 audited entries total.
- [x] 144 entries marked `reviewed`.
- [x] 151 entries marked `corrected`.
- [x] 0 entries remain `unchecked`.
- [x] 0 entries still using `coding.strategy = "needs-review"`.
- [x] 0 entries rely on legacy manual `Recording Option` pickers.

## Completed Foundation Work

- [x] Runtime split out of the original monolithic HTML into maintainable source files.
- [x] Generated browser dataset module added so Safari and `file://` loads no longer hang on JSON fetch.
- [x] JSON inspection artifact retained for tests, audits, and offline review.
- [x] CSP and `no-referrer` policy added.
- [x] Runtime assets locked to self-hosted sources only.
- [x] Dark mode added with local-only implementation.
- [x] DSM-facing `specifiers`, code-resolution `coding`, and report-focused `recording` guidance separated in the schema.
- [x] Optional single-choice groups and coding inputs now expose explicit clear/reset behavior with `allowsEmpty`.
- [x] Computed specifier groups are explicit with `isComputed`.
- [x] Verbatim DSM extraction layer added for narrative sections, differential diagnosis, comorbidity, and recording-procedure prose.
- [x] Legacy narrative override prose removed from `scripts/manual-overrides.mjs`.
- [x] Source-status callouts added to the UI.
- [x] Validation and regression tests added for dataset integrity, static-hosting constraints, and core code-resolution flows.

## Verified And Complete With No Known Remaining Structured-Coding Debt

- [x] Dissociative Disorders
- [x] Somatic Symptom and Related Disorders
- [x] Elimination Disorders
- [x] Gender Dysphoria
- [x] Disruptive, Impulse-Control, and Conduct Disorders
- [x] Other Mental Disorders and Additional Codes
- [x] Medication-Induced Movement Disorders and Other Adverse Effects of Medication

## Audited But Not Fully Rebuilt Yet

- [x] No audited chapters remain blocked by legacy diagnosis-level structured-coding debt.

## High-Risk Modeling Fixes Already Verified

- [x] Autism Spectrum Disorder severity split and catatonia additional-code handling.
- [x] Alcohol Use Disorder severity/remission composite coding.
- [x] Persistent Depressive Disorder onset and 2-year course normalization.
- [x] Enuresis and Encopresis subtype normalization.
- [x] OCD / Body Dysmorphic Disorder / Hoarding Disorder insight specifier normalization.
- [x] Adjustment Disorders subtype and duration modeling.
- [x] Specific Phobia blood-injection-injury ICD split.
- [x] Conduct Disorder threshold-aware `With limited prosocial emotions`.
- [x] Sleep-wake comorbidity multi-select review.
- [x] Verified true multi-select preservation where DSM allows combinations.
- [x] Substance/Medication-Induced Bipolar and Related Disorder rebuilt to explicit DSM table.
- [x] Bipolar I Disorder rebuilt to current-or-most-recent-episode plus status code logic.
- [x] Substance/Medication-Induced Depressive Disorder rebuilt to explicit DSM table.
- [x] Major Depressive Disorder rebuilt to episode plus status code logic.
- [x] Substance/Medication-Induced Psychotic Disorder rebuilt to explicit DSM table.
- [x] Substance/Medication-Induced Anxiety Disorder rebuilt to explicit DSM table.
- [x] Substance/Medication-Induced Obsessive-Compulsive and Related Disorder rebuilt to explicit DSM table.
- [x] Substance/Medication-Induced Sleep Disorder rebuilt to explicit DSM table, including caffeine and tobacco exceptions.
- [x] Substance/Medication-Induced Sexual Dysfunction rebuilt to explicit DSM table.
- [x] Pica rebuilt to DSM age-based coding-note logic without a generic picker.
- [x] Non-Rapid Eye Movement Sleep Arousal Disorders rebuilt to DSM subtype-based coding logic.
- [x] Alcohol Intoxication rebuilt to DSM coding-note status logic.
- [x] Alcohol Withdrawal rebuilt to DSM coding-note status logic plus the optional `With perceptual disturbances` specifier.
- [x] Cannabis Intoxication rebuilt to DSM coding-note status logic plus the optional `With perceptual disturbances` specifier.
- [x] Cannabis Withdrawal rebuilt to DSM coding-note status logic.
- [x] Mild Neurocognitive Disorder rebuilt to etiological coding logic, including the DSM substance-specific branch.

## Remaining Structured-Coding Rebuilds

The legacy diagnosis-level “manual recording option” debt is cleared.

- [x] No remaining diagnosis entries depend on the generic `Recording Option` picker.

## Completed DSM Extraction And Rebuild Queue

Every entry in the former extraction queue has now completed DSM-only title-page, criteria, specifier, coding, recording, and available narrative-section review.

### Neurodevelopmental Disorders

- [x] `Intellectual Developmental Disorder (Intellectual Disability)`
- [x] `Global Developmental Delay`
- [x] `Unspecified Intellectual Developmental Disorder (Intellectual Disability)`
- [x] `Language Disorder`
- [x] `Speech Sound Disorder`
- [x] `Childhood-Onset Fluency Disorder (Stuttering)`
- [x] `Social (Pragmatic) Communication Disorder`
- [x] `Unspecified Communication Disorder`
- [x] `Attention-Deficit/Hyperactivity Disorder`
- [x] `Other Specified Attention-Deficit/Hyperactivity Disorder`
- [x] `Unspecified Attention-Deficit/Hyperactivity Disorder`
- [x] `Specific Learning Disorder`
- [x] `Developmental Coordination Disorder`
- [x] `Stereotypic Movement Disorder`
- [x] `Other Specified Neurodevelopmental Disorder`
- [x] `Unspecified Neurodevelopmental Disorder`

### Schizophrenia Spectrum And Other Psychotic Disorders

- [x] `Schizotypal (Personality) Disorder`
- [x] `Delusional Disorder`
- [x] `Brief Psychotic Disorder`
- [x] `Schizophreniform Disorder`
- [x] `Schizophrenia`
- [x] `Schizoaffective Disorder`
- [x] `Psychotic Disorder Due to Another Medical Condition`
- [x] `Catatonia Associated With Another Mental Disorder (Catatonia Specifier)`
- [x] `Catatonic Disorder Due to Another Medical Condition`
- [x] `Unspecified Catatonia`

### Anxiety Disorders

- [x] `Separation Anxiety Disorder`
- [x] `Selective Mutism`
- [x] `Social Anxiety Disorder (Social Phobia)`
- [x] `Panic Disorder`
- [x] `Agoraphobia`
- [x] `Generalized Anxiety Disorder`
- [x] `Anxiety Disorder Due to Another Medical Condition`

### Obsessive-Compulsive And Related Disorders

- [x] `Obsessive-Compulsive Disorder`
- [x] `Body Dysmorphic Disorder`
- [x] `Hoarding Disorder`
- [x] `Trichotillomania (Hair-Pulling Disorder)`
- [x] `Excoriation (Skin-Picking) Disorder`
- [x] `Obsessive-Compulsive and Related Disorder Due to Another Medical Condition`

### Trauma- And Stressor-Related Disorders

- [x] `Reactive Attachment Disorder`
- [x] `Disinhibited Social Engagement Disorder`
- [x] `Posttraumatic Stress Disorder`
- [x] `Posttraumatic Stress Disorder in Children 6 Years and Younger`
- [x] `Acute Stress Disorder`
- [x] `Prolonged Grief Disorder`

### Sleep-Wake Disorders

- [x] `Narcolepsy`
- [x] `Obstructive Sleep Apnea Hypopnea`
- [x] `Central Sleep Apnea`
- [x] `Sleep-Related Hypoventilation`
- [x] `Circadian Rhythm Sleep-Wake Disorders`
- [x] `Delayed Sleep Phase Type`
- [x] `Advanced Sleep Phase Type`
- [x] `Irregular Sleep-Wake Type`
- [x] `Non-24-Hour Sleep-Wake Type`
- [x] `Shift Work Type`
- [x] `Unspecified Circadian Rhythm Sleep-Wake Disorder`
- [x] `Parasomnias`
- [x] `Rapid Eye Movement Sleep Behavior Disorder`
- [x] `Restless Legs Syndrome`
- [x] `Other Specified Insomnia Disorder`
- [x] `Unspecified Insomnia Disorder`
- [x] `Other Specified Hypersomnolence Disorder`
- [x] `Unspecified Hypersomnolence Disorder`
- [x] `Other Specified Sleep-Wake Disorder`
- [x] `Unspecified Sleep-Wake Disorder`

### Sexual Dysfunctions

- [x] `Delayed Ejaculation`
- [x] `Erectile Disorder`
- [x] `Female Orgasmic Disorder`
- [x] `Female Sexual Interest/Arousal Disorder`
- [x] `Genito-Pelvic Pain/Penetration Disorder`
- [x] `Male Hypoactive Sexual Desire Disorder`
- [x] `Premature (Early) Ejaculation`
- [x] `Other Specified Sexual Dysfunction`
- [x] `Unspecified Sexual Dysfunction`

### Substance-Related And Addictive Disorders

- [x] `Caffeine Withdrawal`
- [x] `Cannabis Use Disorder`
- [x] `Phencyclidine Use Disorder`
- [x] `Other Hallucinogen Use Disorder`
- [x] `Inhalant Use Disorder`
- [x] `Opioid Use Disorder`
- [x] `Sedative, Hypnotic, or Anxiolytic Use Disorder`
- [x] `Stimulant Use Disorder`
- [x] `Tobacco Use Disorder`
- [x] `Other (or Unknown) Substance Use Disorder`
- [x] `Gambling Disorder`

### Neurocognitive Disorders

- [x] `Delirium`
- [x] `Major Neurocognitive Disorder`

### Personality Disorders

- [x] `General Personality Disorder`
- [x] `Paranoid Personality Disorder`
- [x] `Schizoid Personality Disorder`
- [x] `Schizotypal Personality Disorder`
- [x] `Antisocial Personality Disorder`
- [x] `Borderline Personality Disorder`
- [x] `Histrionic Personality Disorder`
- [x] `Narcissistic Personality Disorder`
- [x] `Avoidant Personality Disorder`
- [x] `Dependent Personality Disorder`
- [x] `Obsessive-Compulsive Personality Disorder`
- [x] `Personality Change Due to Another Medical Condition`
- [x] `Other Specified Personality Disorder`
- [x] `Unspecified Personality Disorder`

### Paraphilic Disorders

- [x] `Voyeuristic Disorder`
- [x] `Exhibitionistic Disorder`
- [x] `Frotteuristic Disorder`
- [x] `Sexual Masochism Disorder`
- [x] `Sexual Sadism Disorder`
- [x] `Pedophilic Disorder`
- [x] `Transvestic Disorder`
- [x] `Other Specified Paraphilic Disorder`
- [x] `Unspecified Paraphilic Disorder`

### Other Conditions That May Be A Focus Of Clinical Attention

- [x] All 82 entries are reviewed against the DSM-5-TR full manual.
- [x] Completed clusters: `Suicidal Behavior and Nonsuicidal Self-Injury`, `Abuse and Neglect`, `Relational Problems`, `Problems Related to Family Environment`, `Educational and Occupational Problems`, `Housing and Economic Problems`, and `Other Problems`.
- [x] Multi-code rows use explicit DSM code choices; single-code rows remain fixed; code-table-only entries intentionally omit narrative that the DSM does not provide.

## Per-Entry DSM Extraction Checklist

This is the completed sequence used for every diagnosis or clinical-focus entry and the required workflow for future source revisions.

1. [x] Confirm the diagnosis title page in the DSM-5-TR full manual.
2. [x] Confirm the section-page map for criteria, specifiers, recording procedures, diagnostic features, associated features, prevalence, development and course, risk factors, culture, sex/gender, diagnostic markers, functional consequences, differential diagnosis, and comorbidity where those headings actually exist.
3. [x] Replace the criteria tree with verbatim DSM wording and the correct hierarchy.
4. [x] Rebuild specifier groups from the DSM wording exactly, including exclusivity, multi-select behavior, thresholds, and whether an empty selection is allowed.
5. [x] Replace any legacy `Recording Option` picker with structured DSM-only coding logic whenever the code can be resolved from the manual's coding note or table.
6. [x] Where coding cannot be made deterministic without guessing, retain an explicit DSM-backed coding input rather than guessing.
7. [x] Add or verify `recording` guidance from DSM recording procedures or coding notes.
8. [x] Extract verbatim right-panel section content from the DSM full manual only.
9. [x] Verify differential-diagnosis and comorbidity text against the DSM full manual only.
10. [x] Mark each entry `reviewed` or `corrected` only after its DSM structure, code behavior, and right-panel text match.
11. [x] Add or update regression tests for changed code resolution, report text, specifier behavior, and recording guidance.
12. [x] Rebuild artifacts and re-run validation for the complete dataset.

## Fastest Accurate Completion Order

The audit was completed in this order to minimize duplicate extraction work while preserving accuracy:

1. [x] Eliminate legacy diagnosis-level `Recording Option` coding debt.
2. [x] Finish Neurodevelopmental, Psychotic, Anxiety, Obsessive-Compulsive, Trauma, and Sleep-Wake Disorders.
3. [x] Finish Sexual Dysfunctions (`9` entries), including duration, onset/context, and severity structures.
4. [x] Finish Substance-Related and Addictive Disorders (`11` entries), including nested tolerance/withdrawal criteria and severity/remission coding.
5. [x] Finish Neurocognitive Disorders (`2` entries), including Delirium and Major Neurocognitive Disorder etiology coding.
6. [x] Finish Personality Disorders (`13` entries) and Paraphilic Disorders (`9` entries).
7. [x] Finish all `82` entries in `Other Conditions That May Be a Focus of Clinical Attention`, grouped by DSM subsection and recording-code pattern.

## Definition Of Done

An entry is only complete when all of the following are true:

- [x] Criteria wording is verbatim from the DSM-5-TR full manual.
- [x] Specifiers and coding logic match the DSM-5-TR exactly.
- [x] Recording guidance matches the DSM-5-TR exactly.
- [x] Right-panel prose is verbatim DSM text or intentionally omitted because the DSM does not provide that section for the entry.
- [x] Source title pages and section pages are audited.
- [x] No legacy paraphrase is still being treated as authoritative.
- [x] Tests cover nontrivial code-resolution and recording behavior.
- [x] `npm run build:data`
- [x] `npm run build:audit`
- [x] `npm run validate:data`
- [x] `npm test` (`162` passing)
