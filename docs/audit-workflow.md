# DSMDx Audit Workflow

This project treats the uploaded DSM-5-TR PDF as the source of truth and the legacy `data/dsm-data.js` export as a migration source that can be corrected.

## Source Materials

- DSM PDF: `/Users/nickhighland/Downloads/DSM 5 TR-APA (2022).pdf`
- Legacy source: `data/dsm-data.js`
- Generated page index: `data/dsm-page-index.json`
- Generated app dataset: `data/dsm-dataset.json`
- Manual overrides: `scripts/manual-overrides.mjs`

## Review Status Model

Each entry carries:

- `unchecked`
- `reviewed`
- `corrected`
- `needs-manual-verification`

Use `reviewed` when the entry matches the PDF after verification.

Use `corrected` when the legacy data was wrong and the normalized dataset was deliberately changed.

Use `needs-manual-verification` when the entry is known to be risky or incomplete and should be flagged before relying on it.

## Current Pilot Pass

The first detailed PDF-backed review covered:

- Autism Spectrum Disorder
- Oppositional Defiant Disorder
- Alcohol Use Disorder
- Breathing-Related Sleep Disorders

These entries now carry explicit source references and review notes in `scripts/manual-overrides.mjs`.

## Substance Coding Appendix Notes

The PDF’s code appendix is especially useful for substance-related coding cleanup. During this refactor, the appendix pages around the early front matter were used to confirm remission and comorbid-use-disorder coding patterns, including:

- page 55 for alcohol-related disorder coding
- pages 58-74 for cannabis, hallucinogen, inhalant, opioid, stimulant, tobacco, and other/unknown substance-related coding

That appendix confirmation is what allowed the dataset builder to derive remission codes for many use disorders instead of leaving them as unresolved placeholders.

## Review Loop

For each diagnosis:

1. Open the DSM PDF and locate the diagnosis within its chapter pages.
2. Compare the title, criteria wording, notes, exclusions, specifiers, and coding language against the current generated dataset.
3. If the legacy export is wrong or incomplete, add a targeted override in `scripts/manual-overrides.mjs`.
4. Rebuild and validate:

```bash
npm run build:pages
npm run build:data
npm run build:audit
npm run validate:data
npm test
```

Use `npm run build:pages` whenever you want to refresh DSM title or section page references from the local PDF before rebuilding the main dataset.

5. Update the entry audit metadata:
   - review date
   - audit notes
   - source page references
   - status

## When To Use Manual Overrides

Use manual overrides when:

- the criteria wording is incorrect or incomplete
- the right-panel narrative needs replacement or supplementation
- the coding logic is more specific than what can safely be inferred from the legacy export
- the entry is a group/reference item rather than a billable diagnosis
- appendix-derived remission or recording rules need to be represented explicitly

## When To Use Explicit Recording Inputs

Use `coding.inputs` when:

- a diagnosis has multiple valid recorded codes,
- a deterministic audited rule set is not ready yet,
- and it is safer to let the user choose the exact recording path than to guess.

This keeps the live app usable while still being transparent about what has and has not been fully audited.

## When To Use Recording Details

Use `recording.fields` when:

- the DSM gives structured recording instructions beyond the diagnosis code,
- the generated note needs an etiological condition, specific reason, or comorbid condition text,
- and capturing that text in the report is safer than burying it in prose-only reference sections.

## Audit Reporting

Run:

```bash
npm run build:audit
```

This regenerates [audit-status.md](/Users/nickhighland/Documents/DSMDx/docs/audit-status.md) so chapter-level review progress stays visible in the repo.
