# DSMDx Completion Status

The original repair and DSM-5-TR extraction plan is complete. The detailed chapter-by-chapter execution ledger is maintained in [`docs/todo.md`](docs/todo.md).

## Completed Scope

- [x] Static GitHub Pages architecture with relative, self-hosted runtime assets only.
- [x] Direct `file://` startup support through the generated browser dataset module.
- [x] Persistent light/dark theme support.
- [x] Normalized criteria, specifier, coding, recording, audit, and source-page schema.
- [x] DSM-5-TR full manual established as the only content authority; the Desk Reference is excluded.
- [x] All 295 entries across 22 chapters audited against the sanctioned full manual.
- [x] 144 entries marked `reviewed` and 151 entries marked `corrected`.
- [x] Zero `unchecked` entries, zero `needs-review` coding strategies, and zero generic `Recording Option` pickers.
- [x] All 82 entries in `Other Conditions That May Be a Focus of Clinical Attention` reviewed, including explicit multi-code selection where required.
- [x] Verbatim right-panel extraction from audited DSM page ranges, with code-table-only rows intentionally left without fabricated narrative.
- [x] Full build, audit, validation, automated test, and live browser smoke-test cycle passed on 2026-07-12.

## Required Future Maintenance

When the DSM or ICD source changes, follow the source-review workflow in [`docs/audit-workflow.md`](docs/audit-workflow.md), update [`docs/todo.md`](docs/todo.md), and run:

```bash
npm run build:data
npm run build:audit
npm run validate:data
npm test
```

The current full suite contains 162 passing tests.
