# DSMDx

DSMDx is a static, GitHub Pages-hosted interactive DSM-5-TR reference. It lets a user browse chapters, inspect criteria and specifiers, resolve ICD-10-CM codes, and generate a working documentation note without sending runtime data to third-party services.

## Project Goals

- Keep the live app deployable as plain static files on GitHub Pages.
- Keep runtime assets self-hosted only: no remote APIs, no analytics, no embeds, no CDN assets, and no remote font requests.
- Normalize the legacy DSM dataset into a schema that supports clinical content, audit metadata, and explicit coding logic.
- Keep complex coding paths explicit and DSM-backed instead of guessing or silently returning `N/A`.

## Structure

- `index.html`: static app shell plus browser-side security headers.
- `src/app.js`: UI wiring, rendering, theming, and report generation.
- `src/lib/`: dataset loading, coding resolution, utilities, and report formatting.
- `src/styles.css`: local-only styling and dark mode tokens.
- `data/dsm-data.js`: legacy source dataset retained as the local migration source.
- `data/dsm-dataset.js`: generated browser-side dataset module used by the live app runtime.
- `data/dsm-page-index.json`: generated DSM PDF page index used to merge title/section references into the live dataset.
- `data/dsm-dataset.json`: generated normalized dataset used by audits, tests, and offline inspection.
- `scripts/build-page-index.mjs`: scans the local DSM PDF and writes title/section page references.
- `scripts/build-dataset.mjs`: converts the legacy dataset plus manual overrides into the normalized artifact.
- `scripts/manual-overrides.mjs`: audited manual corrections and targeted content/code overrides.
- `scripts/validate-dataset.mjs`: validates schema integrity and no-third-party runtime constraints.
- `scripts/build-audit-report.mjs`: generates chapter-level audit status reporting.
- `tests/`: node tests for dataset integrity and coding behavior.
- `docs/`: schema, audit workflow, and generated audit status documentation.

## Local Use

Install nothing beyond a current Node runtime unless you want to extend the PDF-audit tooling yourself.

```bash
npm run build:pages
npm run build:data
npm run build:audit
npm run validate:data
npm test
```

`npm run build:pages` reads the local DSM PDF and refreshes [dsm-page-index.json](/Users/nickhighland/Documents/DSMDx/data/dsm-page-index.json). In this workspace it automatically falls back to the bundled Codex Python runtime when available, and you can still override the PDF or Python path with `DSMDX_PDF_PATH` and `DSMDX_PYTHON`.

`npm run build:data` now writes both [dsm-dataset.json](/Users/nickhighland/Documents/DSMDx/data/dsm-dataset.json) for audits/tests and [dsm-dataset.js](/Users/nickhighland/Documents/DSMDx/data/dsm-dataset.js) for the browser runtime. That module-based runtime loader is what keeps the app compatible with GitHub Pages while also improving direct local preview behavior in browsers like Safari.

For a normal local preview from the repo root:

```bash
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

Opening [index.html](/Users/nickhighland/Documents/DSMDx/index.html) directly from Finder is better supported now because the app runtime no longer depends on fetching the JSON dataset first, but a small local server is still the most reliable preview mode across browsers.

To simulate the GitHub Pages repository path (`/DSMDx/`), serve the parent directory instead:

```bash
cd ..
python3 -m http.server 4174
```

Then open [http://127.0.0.1:4174/DSMDx/](http://127.0.0.1:4174/DSMDx/).

## Privacy Posture

- Runtime assets are restricted to `self` by a Content Security Policy in [index.html](/Users/nickhighland/Documents/DSMDx/index.html).
- The live app loads only local files committed to the repo.
- Typography uses a local system font stack, so the page does not call Google Fonts or any other font CDN.
- No analytics, trackers, embeds, or remote APIs are used by the runtime app.
- A `no-referrer` policy is declared so navigation does not leak page URLs to third parties.

This does not make browser input magically “medical-record compliant,” but it does keep the static page from transmitting user-entered content to third-party runtime dependencies.

## Coding Model

The normalized dataset separates:

- `specifiers`: DSM-facing clinical specifiers shown to the user.
- `coding`: code resolution strategy, notes, and optional coding-only input groups.
- `recording`: report-oriented DSM recording guidance plus optional recording detail fields.
- `audit`: review status, review notes, and date tracking.
- `source`: page references back to the DSM PDF where they have been audited.

Current coding strategies include:

- `fixed`: one direct code.
- `fixed-with-additional`: one base code plus additional-code rules.
- `option-map`: code determined by a specifier or an explicit recording input.
- `composite`: code derived from criteria thresholds plus specifier logic.
- `none`: group or reference entry with no direct billable code.

Where a code depends on a clinician-selected DSM condition that the app cannot infer, the app presents an explicit `Coding Input` rather than pretending the code is unknown or guessing.

Specifier metadata is now more explicit as well. The generated dataset marks whether a specifier can be left blank (`allowsEmpty`) and whether it is derived from coding logic rather than user-entered directly (`isComputed`). That keeps optional single-choice groups clearable in the UI and prevents computed DSM labels like substance-use severity from behaving like editable radio groups.

When a diagnosis depends on an explicit coding choice, the generated note incorporates that selected wording into the `Recorded As` line rather than dropping it from the final diagnosis text.

When DSM recording procedures need more than a code alone, the app also renders `Recording Details` fields and uses them in the generated note. Current structured recording modes include:

- `other-specified-with-reason`
- `medical-condition-first`
- `comorbid-conditions-after`
- `substance-induced-first`

The dataset now also distinguishes true diagnoses from non-diagnosis entries more explicitly. For example, `No Diagnosis or Condition` is modeled as an `additional-code` entry so the UI and generated report do not mislabel it as a diagnosis.

The same modeling rule now applies to the medication-induced movement chapter: DSM-5-TR explicitly says those chapter entries are not mental disorders, so the app treats them as `clinical-focus-condition` entries instead of ordinary diagnoses.

Single-choice coding-input groups can now also be cleared back to an unresolved state, which is helpful for static in-browser use where a user may want to back out of a code-selection helper without reloading the page.

## Documentation

- [Schema Notes](/Users/nickhighland/Documents/DSMDx/docs/schema.md)
- [Audit Workflow](/Users/nickhighland/Documents/DSMDx/docs/audit-workflow.md)
- [Audit Status](/Users/nickhighland/Documents/DSMDx/docs/audit-status.md)
- [Detailed To-Do](/Users/nickhighland/Documents/DSMDx/docs/todo.md)

## Verification Status

- All 295 entries across 22 chapters are marked `reviewed` or `corrected` against the sanctioned DSM-5-TR full manual.
- Every entry has an audited DSM title-page reference; diagnosis narrative sections are extracted from audited page ranges where the manual provides them.
- All entries use a concrete coding strategy or an explicit DSM-backed coding input, with no legacy generic `Recording Option` pickers.
- The 82 clinical-attention chapter entries preserve the DSM's distinction between narrative entries and code-table-only rows rather than fabricating prose.
- Generated artifacts are checked for schema integrity, static-hosting safety, code resolution, report formatting, and direct `file://` startup behavior.

DSMDx remains a reference and authoring aid, not a substitute for clinical judgment or the official DSM text. Future DSM or ICD revisions will require a new source audit and regenerated dataset.
