# DSMDx Dataset Schema

The normalized DSM artifact is generated from the legacy export plus targeted manual overrides and verbatim DSM-5-TR extraction.

- `data/dsm-dataset.js` is the browser runtime artifact loaded by the live app.
- `data/dsm-dataset.json` is the parallel inspection artifact used by tests, audits, and tooling.

## Top-Level Shape

```json
{
  "meta": {},
  "chapters": [],
  "entries": []
}
```

## `meta`

- `formatVersion`: schema version for future migrations.
- `generatedAt`: ISO timestamp for the generated artifact.
- `source`: source artifact metadata.
- `hosting`: deployment assumptions for GitHub Pages and self-hosted-only runtime assets.
- `stats`: generated counts for chapters, entries, reviewed items, corrected items, combined audited items, and coding summaries.

## `chapters[]`

Each chapter stores:

- `id`: stable slug.
- `title`: DSM chapter title.
- `startPage` and `endPage`: DSM page range.
- `entryIds`: stable ids for entries in DSM order.

## `entries[]`

Each entry stores:

- `id`: stable slug used by the UI and tests.
- `name`: DSM display label.
- `chapterId` and `chapterTitle`.
- `kind`: `diagnosis`, `group`, `clinical-focus-condition`, `general-criteria`, `reference-entry`, or `additional-code`.
- `audit`: status, review date, and audit notes.
- `source`: audited DSM chapter/title/section page references.
- `codes`: candidate ICD-10-CM code list from source data or overrides.
- `coding`: normalized code-resolution model.
- `recording`: normalized DSM recording guidance and optional report fields.
- `criteria`: normalized criteria tree.
- `specifiers`: DSM-facing specifier groups.
- `sections`: right-panel narrative sections.
- `differentialDiagnosis` and `comorbidity`.

## `criteria[]`

Each criterion item can include:

- `id`
- `code`
- `text`
- `isHeader`
- `note`
- `items`: nested criteria
- `groups`: named subcategory groupings

This structure lets the UI render headers, numbered criteria, criterion notes, nested items, and grouped subcriteria without string parsing at render time.

## `specifiers[]`

Each specifier group includes:

- `id`
- `name`
- `description`
- `allowsEmpty`: whether the group can be left unselected or cleared after selection
- `isComputed`: whether the group is display-only and derived from coding logic
- `selectionType`: `single`, `multiple`, or `boolean`
- `minSelections`: minimum number of selected options required before the group should count as an applied specifier
- `reportLabelMode`: whether the recorded diagnosis should use selected option labels or the group label itself
- `options[]`

Each option includes:

- `id`
- `name`
- `description`
- `details[]`
- `criteria[]`

This allows the UI to render specifier descriptions and specifier-linked criteria such as catatonia.

`allowsEmpty` matters most for `single` groups because the browser's native radio behavior does not provide a built-in "none" state once a choice has been made. The app uses this field to decide when to expose an explicit clear/reset control.

`isComputed` is used for read-only groups such as substance-use severity, where the displayed specifier is derived from criteria counts rather than directly selected by the user.

`minSelections` matters for thresholded groups such as Conduct Disorder `With limited prosocial emotions`, where selecting one supporting trait is not enough to claim the full DSM specifier.

`reportLabelMode` lets the report distinguish between two patterns:

- `options`: use each selected option label directly in the recorded diagnosis text.
- `group`: use the group label once in the recorded diagnosis text while still preserving the selected supporting options in the detailed `Specifiers` section.

## `coding`

The `coding` block separates recording logic from display specifiers.

Common fields:

- `strategy`
- `notes`
- `additionalCodeRules`
- `inputs` for coding-only user choices where needed

### `strategy: "fixed"`

Use when one direct code always applies.

Fields:

- `code`

### `strategy: "fixed-with-additional"`

Use when one base code applies and extra codes may be appended.

Fields:

- `code`
- `additionalCodeRules[]`

### `strategy: "option-map"`

Use when a code depends on:

- a DSM specifier selection, or
- a generated coding-only input group such as `Recording Option`

Fields:

- `requireSelection`
- `defaultCode` when the absence of a boolean selection implies a base code
- `rules[]`
- `inputs[]` when the selection is coding-only rather than a DSM specifier

### `strategy: "composite"`

Use when the code depends on criteria thresholds plus other selections.

Fields:

- `computedGroups`: UI hint for derived specifier groups like severity
- `rules[]`

Supported condition types currently include:

- `selection`
- `criteria-count-between`
- `criteria-count-at-least`

Generated rule conditions always store canonical `group` and `option` IDs from the final
`specifiers` or `coding.inputs` arrays. Authoring overrides may use semantic slugs for readability,
but the dataset build resolves them to IDs and fails if a reference is ambiguous or missing.

Every code that can be emitted by `code`, `defaultCode`, `rules`, or `additionalCodeRules` is also
present in the entry's `codes` catalog. Multiple catalog rows may legitimately share a code when
the DSM assigns that code to more than one labeled presentation.

### `strategy: "none"`

Use for overview/group entries that are not directly billable diagnoses.

Fields:

- `displayLabel`

## `coding.inputs[]`

`coding.inputs` is intentionally separate from `specifiers`.

Use it when:

- the DSM entry has multiple legitimate recording options,
- the current dataset does not yet have a fully audited deterministic rule set,
- and surfacing the exact recording choice is safer than guessing or returning `N/A`.

Each input group uses the same shape as a specifier group:

- `id`
- `name`
- `description`
- `allowsEmpty`
- `selectionType`
- `options[]`

The UI renders these under a dedicated `Coding Inputs` section so users can tell the difference between clinical specifiers and code-selection helpers.

`allowsEmpty` is explicit here for the same reason it is on `specifiers`: once a single-choice coding input has been selected, the app needs to know whether it should expose a clear/reset action that returns the code to an unresolved state.

## Entry Kinds

The `kind` field is important because not every DSM entry is a diagnosis.

- `diagnosis`: a standard diagnosable condition.
- `group`: an overview or grouping entry.
- `clinical-focus-condition`: a condition that may be a clinical focus without being framed like a standard disorder entry.
- `general-criteria`: chapter-level or shared criteria content.
- `reference-entry`: a supporting entry retained for completeness.
- `additional-code`: a codeable status or outcome that should not be mislabeled as a diagnosis in the UI or generated report.

`No Diagnosis or Condition` is currently the clearest example of an `additional-code` entry.

## `recording`

The `recording` block captures DSM note-writing guidance that is more specific than code selection alone.

Common fields:

- `mode`
- `instructions[]`
- `fields[]`

Current normalized modes include:

- `standard`: no extra structured recording help is needed.
- `other-specified-with-reason`: the diagnosis should be recorded with a specific reason appended.
- `medical-condition-first`: an etiological medical condition and its code should be listed before the mental disorder code.
- `comorbid-conditions-after`: the diagnosis can be followed by named comorbid conditions and their code lines.
- `substance-induced-first`: a comorbid substance use disorder may be listed first before the induced disorder wording.
- `dual-diagnosis-note`: the entry carries a structured recording note but no additional fields.

### `recording.fields[]`

Each field includes:

- `id`
- `key`
- `label`
- `description`
- `placeholder`
- `multiline`

These fields are rendered in the UI under `Recording Details` and fed directly into the generated report.
