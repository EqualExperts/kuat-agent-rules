# `_to-skills/` — Phase-2 holding area

**Transitional. Not part of the reference library and not shipped.**

These files are *procedure* that was extracted from the old rules tree in Phase 1 (the reference refactor) because they fail the passive test — they tell an agent *how to do a job* (verbs, role cards, checklists, "before you create/review", loading taxonomy).

Phase 2 ("activity skills") folds each of these into the appropriate skill, then this directory is deleted. Until then, nothing in `reference/` links here.

| Holding path | Was | Phase-2 destination |
|--------------|-----|---------------------|
| `roles/brand-reviewer.md` | reviewer persona | `review-*` skills |
| `roles/technical-illustrator.md`, `roles/icon-designer.md` | creator personas | `create-imagery` |
| `roles/README.md` | intent→role dispatcher | skill routing |
| `slides/checklist.md`, `slides/brand-compliance.md`, `slides/README-procedure.md` | checklists / pre-flight | presentation skills |
| `web-product/review-context.md`, `web-product/review-checklist.md`, `web-product/DEPRECATIONS.md` | review procedure | `review-web-app` |
| `web-product/technical.md` | setup/integration how-to | **candidate for `kuat-mono`** (implementation ownership) |
| `photography/quality-validation.md` | review checklist | imagery skill |
| `LOADING.md` | global task→files taxonomy | per-skill loading |
| `workflows/README.md` | skills pointer | per-skill loading |

See [reference/MIGRATION-MAP.md](../reference/MIGRATION-MAP.md) for the full old→new map.
