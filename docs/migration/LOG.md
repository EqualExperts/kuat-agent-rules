# Migration Decision Log

Dated record of checkpoint decisions and non-obvious deviations, per phase. Newest entries first within a phase.

---

## Phase 1 — Reference Refactor

**Branch:** `migration/phase-1-reference-refactor` · **Started:** 2026-06-12

### Checkpoint decisions (resolved at start)

1. **`reference/` at repo root** — chosen over keeping it under `kuat-docs/`. Plan default, per architecture §6. Cleaner top-level home for the passive library; changes the path `kuat-mono` consumes (`kuat-docs/rules/` → `reference/`), which is why this phase merges lockstep with the kuat-mono 1b sync PR.
2. **`types/web/product/examples/` (react/vue/css snippets)** — kept under `reference/media-types/web-product/examples/`. Plan default. Borderline reference; flagged in the report as a candidate to relocate to `kuat-mono` in a later review.
3. **`LOADING.md` global task→files taxonomy** — retired as a global reference file. Loading becomes per-skill in Phase 2. The retired file is preserved verbatim in `_to-skills/LOADING.md` for Phase 2 to mine. A thin human index lives at `reference/README.md` (structure + passive/skill boundary; no loading taxonomy).
4. **Legacy resolver continuity → thin redirect shim** (decided with Ed). `skills/scripts/ensure-rules.sh` detects the rules root via the existence of `kuat-docs/rules/LOADING.md`. Rather than a clean break, leave a minimal **tombstone** at `kuat-docs/rules/LOADING.md` (and `kuat-docs/rules/README.md`) that carries no taxonomy — only a redirect to `/reference` and `reference/MIGRATION-MAP.md`. This keeps `ensure-rules.sh` root detection alive so legacy skills don't hard-crash. The legacy `kuat-create`/`kuat-review` skills still cannot read moved content (their `{RULES_DIR}/foundations`, `/types` subpaths no longer exist) — that rewiring, plus `ensure-rules.sh` / `resolve-rules.md` / `bundle-skills.mjs` path updates, is **logged for Phase 2** (see Deviations). Shim removed in Phase 2.
5. **`kuat-docs/rules/types/web/product/technical.md`** (drift — not in the plan's move map) → routed to `_to-skills/web-product/technical.md`. It is setup/integration procedure (install commands, Tailwind/shadcn config, framework integration) and implementation detail the ownership matrix assigns to the consumer repo; the file itself says to prefer the package README. **Flagged in the report as a kuat-mono relocation candidate.** Decided with Ed.

### Deviations & non-obvious decisions (appended as they occur)

- **2026-06-12 — Moves complete.** 87 files `git mv`'d (renames detected → history preserved); 9 superseded pure-orientation folder READMEs removed (`foundations/README.md`, `foundations/design/README.md`, `foundations/content/README.md`, `types/README.md`, `types/web/README.md`, `types/web/product/README.md`, and the three `scenarios/README.md`). They are replaced by fresh passive scope READMEs in the new tree; recorded in MIGRATION-MAP as "removed (superseded)".
- **Imagery structure interpretation.** Per the plan note "group photography- vs graphics- patterns under `imagery/patterns/`", photography and graphics files live at `media-types/imagery/patterns/photography/` and `.../graphics/` respectively, with a scope README at `media-types/imagery/`. Stated to Ed in the approved plan; no objection.
- **`web/` parent removed.** The old `types/web/` parent index (`web/README.md`) had shared web content (nav patterns, colour tokens) that duplicated `design-language/` and the per-medium `design.md`/`website.md`. Dropped rather than relocated; web-product and web-marketing are now siblings under `media-types/`. Noted as a follow-up if any unique content is later found missing.
- **`_to-skills/` location.** Placed at repo root (matches the plan's literal name `_to-skills/`). Transitional; consumed and removed in Phase 2.
- **Passive-test + link rewrite** executed across the 45 moved files carrying procedure markers / cross-links (178 broken relative links inventoried by a link-checker). Links to retired/holding targets (LOADING.md, skills, roles, checklists, DEPRECATIONS, technical.md, quality-validation.md) were **removed with their procedure framing** rather than repointed into `_to-skills/`. `setup/*` architecture links were kept with corrected relative paths.
