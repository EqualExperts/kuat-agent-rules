# Phase 1 — Reference Refactor

**Repo / Claude Code project:** `kuat-agent-rules`
**Branch:** `migration/phase-1-reference-refactor`
**Depends on:** nothing · **Lockstep with:** [kuat-mono-sync-update.md](kuat-mono-sync-update.md)

> Run in plan mode first. The move tables below are the intended end-state; resolve exact paths against the current tree (it may have drifted since 12 Jun 2026). Do not delete the legacy `skills/` directory in this phase.

---

## Objective

Reposition the rules tree as a strictly **passive reference library**. Establish `reference/` at the repo root with the agreed shape — `brand/`, `design-language/`, `content/`, `accessibility/`, and `media-types/<medium>/` where each medium owns a `patterns/` subfolder. Move all *procedure* (verbs, role cards, checklists, "before you create/review", loading taxonomy) out of reference into a holding area for Phase 2.

This is the §4 decision made concrete: **reference is the WHAT; skills are the HOW.**

---

## Checkpoint decisions (resolve at start, log in `docs/migration/LOG.md`)

1. **`reference/` at repo root** (recommended, per architecture §6) **vs** keeping it under `kuat-docs/`. Root is cleaner but changes the path `kuat-mono` consumes — which is why 1b runs lockstep. **Default: root.**
2. **Fate of `types/web/product/examples/`** (react/vue/css code snippets, currently marked deprecated). These are borderline reference. **Default:** keep under `reference/media-types/web-product/examples/` and let the web skills cite them; flag for a later "move to kuat-mono" review.
3. **`LOADING.md`** (global task→files taxonomy) is retired as a global file; loading becomes per-skill in Phase 2. Keep a thin human index at `reference/README.md`.

---

## Move map (source → target)

### Foundations → top-level reference

| From `kuat-docs/rules/` | To `reference/` |
|--------------------------|-----------------|
| `foundations/brand.md`, `foundations/logo.md`, `foundations/content/voice-and-tone.md` | `brand/` |
| `foundations/design/*` (design-language, colours, typography, spacing, borders) | `design-language/` |
| `foundations/content/{writing-style,formatting,numbers,punctuation}.md` | `content/` |
| `foundations/accessibility.md` | `accessibility/` |

### Types → media-types (scenarios become patterns)

| From `kuat-docs/rules/types/` | To `reference/media-types/` |
|-------------------------------|------------------------------|
| `slides/{styling,layouts,data,imagery-and-diagrams,content}.md` | `slides/` |
| `slides/scenarios/{case-studies,reporting,knowledge-sharing,sales-marketing}.md` | `slides/patterns/` |
| `web/product/{design,accessibility,emails,component-registry,component-decision-tree}.md` + `content/*` | `web-product/` |
| `web/product/scenarios/{authentication,forms,dashboards,documentation}.md` | `web-product/patterns/` |
| `web/marketing/{website,emails}.md` + `content/*` | `web-marketing/` |
| `web/marketing/scenarios/marketing-pages.md` | `web-marketing/patterns/` |
| `photography/{principles,style-and-sources,diversity-inclusion}.md` + `graphics/{icons,illustrations,infographics}.md` | `imagery/` (group photography- vs graphics- patterns under `imagery/patterns/`) |
| `charts-data/*` | `charts-data/` |

### Procedure → holding area `_to-skills/` (consumed in Phase 2, not shipped in reference)

| From | Why it's procedure | Phase 2 destination |
|------|--------------------|---------------------|
| `roles/brand-reviewer.md` | reviewer persona | `review-*` skills |
| `roles/{technical-illustrator,icon-designer}.md` | creator personas | `create-imagery` |
| `slides/checklist.md`, `slides/brand-compliance.md`, "before you create/review" in slides README | checklists/steps | presentation skills |
| `web/product/{review-context,review-checklist,DEPRECATIONS}.md` | review procedure | `review-web-app` |
| `photography/quality-validation.md` | review checklist | imagery skill |
| `LOADING.md`, `workflows/` | loading mechanics | per-skill loading |

---

## Tasks

1. Create branch and `docs/migration/LOG.md`; record the checkpoint decisions.
2. Build the `reference/` skeleton (empty dirs + a one-line `README.md` per folder describing scope).
3. Execute the move map with `git mv` (preserve history). For each moved file, **apply the passive test**: strip imperative procedure, role framing, and load tables; if a file is wholly procedural, route it to `_to-skills/` instead.
4. Rewrite intra-reference links to the new paths. Add `reference/MIGRATION-MAP.md` listing every old→new path (this is what 1b and any external consumers use to update references).
5. Replace the global `rules/README.md` / `AGENTS.md` orientation with a concise `reference/README.md` (structure + the passive/skill boundary; no loading taxonomy).
6. Move borderline procedure into `_to-skills/` (do **not** integrate into skills yet — that's Phase 2).
7. Leave legacy `skills/kuat-create` and `skills/kuat-review` in place and working (they may temporarily point at old paths via a shim or the MIGRATION-MAP; note any breakage in the log for Phase 2 to resolve).
8. Run repo checks (markdown lint / link check if present); fix broken links within reference.

---

## Acceptance criteria

- `reference/` exists at the agreed location with the full `brand / design-language / content / accessibility / media-types{slides,web-product,web-marketing,imagery,charts-data}` shape, each media type containing a `patterns/` folder.
- **Zero verbs, role cards, checklists, or loading tables** remain in `reference/` (spot-check: grep for "review", "create", "checklist", "before you", "load these").
- `reference/MIGRATION-MAP.md` covers every moved path.
- All intra-reference links resolve; no orphaned files.
- Git history preserved on moves (`git log --follow` works on a sample).
- Legacy skills still resolve rules (or breakage is logged for Phase 2).

---

## Report back

Fill `docs/migration/report-phase-1.md` from the template. Capture especially: the root-vs-kuat-docs decision and its rationale, the `examples/` decision, anything that resisted the passive test (and where it went), the MIGRATION-MAP, and any link breakage left for Phase 2. **Coordinate merge timing with the 1b PR.**
