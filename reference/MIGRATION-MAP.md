# Reference Migration Map

Phase 1 of the design-system migration repositioned the rules tree as a passive `reference/` library and parked all procedure in a `_to-skills/` holding area. **Phase 2** folded that procedure into the **activity skills** and removed `_to-skills/`. This table maps every old path under `kuat-docs/rules/` to its new home.

**Consumers (e.g. `kuat-mono` 1b, IDE configs, skills) use this map to update their references.** Old paths no longer exist.

> The legacy `kuat-docs/rules/LOADING.md` / `README.md` redirect tombstones (and the `kuat-docs/rules/` directory) were **removed in Phase 2**. `skills/scripts/ensure-rules.sh` now resolves the repo root via `reference/README.md` and sets `RULES_DIR=…/reference`.

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

## Procedure → activity skills (Phase 2 — `_to-skills/` consumed and removed)

Procedure failed the passive test, so it never shipped as reference. Phase 1 staged it in `_to-skills/`; Phase 2 folded each item into an activity skill (or dropped it) and deleted `_to-skills/`.

| Old (`kuat-docs/rules/`) | Final home (Phase 2) |
|---------------------------|----------------------|
| `roles/brand-reviewer.md` | Inline Brand-Reviewer framing in `review-web-app` / `review-presentation` / `kuat-review` |
| `roles/technical-illustrator.md` | `create-imagery` (role framing) |
| `roles/icon-designer.md` | `create-imagery` (role framing) |
| `roles/README.md` | Dropped — skill routing now lives in `skills/AGENTS.md` |
| `types/slides/checklist.md` | `create-presentation` (delivery gate) + `review-presentation` (evidence table) |
| `types/slides/brand-compliance.md` | `create-presentation` / `review-presentation` |
| `types/slides/README.md` (procedure parts) | `create-presentation` ("before you create") |
| `types/web/product/review-context.md` | `review-web-app` |
| `types/web/product/review-checklist.md` | `review-web-app` + `skills/_shared/review-common.md` |
| `types/web/product/DEPRECATIONS.md` | Dropped — superseded by component-registry + consumption contract |
| `types/web/product/technical.md` | **Dropped in Phase 2** (recover from git `f0338ff`); relocate to `kuat-mono` `agent-docs/setup/` |
| `types/photography/quality-validation.md` | `create-imagery` (light quality/accessibility check) |
| `LOADING.md` | Dropped — mined for per-skill loading; each skill names its `reference/` slices |
| `workflows/README.md` | Dropped — superseded by the skills themselves |

## Removed (superseded by fresh passive scope READMEs)

These pure-orientation / loading-index READMEs were deleted; their navigational role is replaced by the new `reference/**/README.md` scope files and this map.

- `foundations/README.md`, `foundations/design/README.md`, `foundations/content/README.md`
- `types/README.md`, `types/web/README.md`, `types/web/product/README.md`
- `types/slides/scenarios/README.md`, `types/web/product/scenarios/README.md`, `types/web/marketing/scenarios/README.md`

## Follow-ups

- ✅ **Done in Phase 2:** legacy skills (`kuat-create`, `kuat-review`), `skills/shared/resolve-rules.md`, `skills/shared/consumption-contract.md`, `skills/scripts/ensure-rules.sh`, and `skills/scripts/bundle-skills.mjs` rewired from `kuat-docs/rules/…` + `LOADING.md` to `reference/` with per-skill loading; tombstones removed.
- ⏳ **kuat-mono:** receive `technical.md` (recover from git `f0338ff`) into `agent-docs/setup/`; evaluate relocating `web-product/examples/` (implementation ownership).
- ⏳ **Doc-sweep (deferred):** `skills/INSTALL.md`, `skills/install/*`, `kuat-docs/setup/*`, and `kuat-docs/README.md` still cite old `kuat-docs/rules/…` paths in setup prose. Sweep with the mappings in this file (note `foundations/` splits into `brand/` + `design-language/` + `content/` + `accessibility/`).
