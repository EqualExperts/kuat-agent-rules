# Reference Migration Map

Phase 1 of the design-system migration repositioned the rules tree as a passive `reference/` library and moved all procedure into a Phase-2 holding area `_to-skills/`. This table maps every old path under `kuat-docs/rules/` to its new home.

**Consumers (e.g. `kuat-mono` 1b, IDE configs, skills) use this map to update their references.** Old paths no longer exist.

> The legacy `kuat-docs/rules/LOADING.md` and `kuat-docs/rules/README.md` remain as **redirect tombstones** only (no taxonomy), so `skills/scripts/ensure-rules.sh` still resolves the repo root during the migration window. They are removed in Phase 2.

---

## Foundations → top-level reference

| Old (`kuat-docs/rules/`) | New |
|---------------------------|-----|
| `foundations/brand.md` | `reference/brand/brand.md` |
| `foundations/logo.md` | `reference/brand/logo.md` |
| `foundations/content/voice-and-tone.md` | `reference/brand/voice-and-tone.md` |
| `foundations/design/design-language.md` | `reference/design-language/design-language.md` |
| `foundations/design/colours.md` | `reference/design-language/colours.md` |
| `foundations/design/typography.md` | `reference/design-language/typography.md` |
| `foundations/design/spacing.md` | `reference/design-language/spacing.md` |
| `foundations/design/borders.md` | `reference/design-language/borders.md` |
| `foundations/content/writing-style.md` | `reference/content/writing-style.md` |
| `foundations/content/formatting.md` | `reference/content/formatting.md` |
| `foundations/content/numbers.md` | `reference/content/numbers.md` |
| `foundations/content/punctuation.md` | `reference/content/punctuation.md` |
| `foundations/accessibility.md` | `reference/accessibility/accessibility.md` |

## Types → media-types (scenarios → patterns)

| Old (`kuat-docs/rules/types/`) | New (`reference/media-types/`) |
|--------------------------------|--------------------------------|
| `slides/{styling,layouts,content,data,imagery-and-diagrams}.md` | `slides/` |
| `slides/scenarios/{case-studies,knowledge-sharing,reporting,sales-marketing}.md` | `slides/patterns/` |
| `web/product/{design,accessibility,emails,component-registry,component-decision-tree}.md` | `web-product/` |
| `web/product/content/*` | `web-product/content/` |
| `web/product/scenarios/{authentication,dashboards,documentation,forms}.md` | `web-product/patterns/` |
| `web/product/examples/**` (css, react, vue) | `web-product/examples/` |
| `web/marketing/{website,emails}.md` | `web-marketing/` |
| `web/marketing/content/*` | `web-marketing/content/` |
| `web/marketing/scenarios/marketing-pages.md` | `web-marketing/patterns/` |
| `photography/{principles,style-and-sources,diversity-inclusion}.md` | `imagery/patterns/photography/` |
| `graphics/{icons,illustrations,infographics}.md` | `imagery/patterns/graphics/` |
| `charts-data/README.md` | `charts-data/README.md` |

## Procedure → `_to-skills/` (Phase-2 holding area, NOT shipped as reference)

| Old (`kuat-docs/rules/`) | New (`_to-skills/`) | Phase-2 destination |
|---------------------------|---------------------|---------------------|
| `roles/brand-reviewer.md` | `roles/brand-reviewer.md` | `review-*` skills |
| `roles/technical-illustrator.md` | `roles/technical-illustrator.md` | `create-imagery` |
| `roles/icon-designer.md` | `roles/icon-designer.md` | `create-imagery` |
| `roles/README.md` | `roles/README.md` | (dispatcher → skill routing) |
| `types/slides/checklist.md` | `slides/checklist.md` | presentation skills |
| `types/slides/brand-compliance.md` | `slides/brand-compliance.md` | presentation skills |
| `types/slides/README.md` (procedure parts) | `slides/README-procedure.md` | presentation skills |
| `types/web/product/review-context.md` | `web-product/review-context.md` | `review-web-app` |
| `types/web/product/review-checklist.md` | `web-product/review-checklist.md` | `review-web-app` |
| `types/web/product/DEPRECATIONS.md` | `web-product/DEPRECATIONS.md` | `review-web-app` / backlog |
| `types/web/product/technical.md` | `web-product/technical.md` | **candidate for relocation to `kuat-mono`** (setup/impl) |
| `types/photography/quality-validation.md` | `photography/quality-validation.md` | imagery skill |
| `LOADING.md` | `LOADING.md` | per-skill loading |
| `workflows/README.md` | `workflows/README.md` | per-skill loading |

## Removed (superseded by fresh passive scope READMEs)

These pure-orientation / loading-index READMEs were deleted; their navigational role is replaced by the new `reference/**/README.md` scope files and this map.

- `foundations/README.md`, `foundations/design/README.md`, `foundations/content/README.md`
- `types/README.md`, `types/web/README.md`, `types/web/product/README.md`
- `types/slides/scenarios/README.md`, `types/web/product/scenarios/README.md`, `types/web/marketing/scenarios/README.md`

## Known follow-ups for Phase 2

- Legacy skills (`skills/kuat-create`, `skills/kuat-review`), `skills/shared/resolve-rules.md`, `skills/scripts/ensure-rules.sh`, and `skills/scripts/bundle-skills.mjs` still reference the old `kuat-docs/rules/...` paths and the retired `LOADING.md`. They resolve the repo root via the tombstone but cannot read moved content. Phase 2 rewires them to `reference/` with per-skill loading.
- `web-product/examples/` and `web-product/technical.md` are flagged for a later review to relocate to `kuat-mono` (implementation ownership).
