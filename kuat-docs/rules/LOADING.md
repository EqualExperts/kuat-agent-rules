# Agent Rules Loading Index

**Canonical reference** for which rule files to load for each task type. Use this index to resolve "task X" → exact list of files. All paths are relative to `kuat-docs/rules/`.

---

## Intent (review | create)

Determine intent before loading type rules. If unclear, ask: *Are you reviewing existing work or creating something new?*

| Intent | Load first | Then |
|--------|------------|------|
| **review** | Skill [kuat-review](../../skills/kuat-review/SKILL.md) — run [ensure-rules](../../skills/scripts/ensure-rules.sh) | foundations → [roles/brand-reviewer.md](./roles/brand-reviewer.md) → type rules (see [Review load notes](#review-load-notes)) |
| **create** | Skill [kuat-create](../../skills/kuat-create/SKILL.md) — run [ensure-rules](../../skills/scripts/ensure-rules.sh) | foundations → create role card if any → type rules → scenarios/examples as needed |

---

## Load order

1. **Determine intent** (review | create) and load the matching [skill](../../skills/) (`kuat-review` or `kuat-create`); resolve rules via [skills/shared/resolve-rules.md](../../skills/shared/resolve-rules.md).
2. **Always load foundations** (see [Foundations](#foundations) below).
3. **Load the role card** for the intent: [brand-reviewer](./roles/brand-reviewer.md) for review; task-specific role for create when listed in [Role cards](#role-cards).
4. **Then load type-specific rules** for the task (see [Task → rules](#task--rules)).
5. **Optionally** add scenarios or examples when relevant (see [Optional paths](#optional-paths)).

**Platform isolation:** Type-specific rules must not reference other types. Foundations are shared; types only reference foundations.

## Entry points

| Entry | Audience | Start | Index file |
|-------|----------|-------|------------|
| **Org** | Brand, slides, all platforms | [AGENTS.md](../../AGENTS.md) | This file (`LOADING.md`) |
| **Library** | `kuat-mono` contributors | Mono `AGENTS.md` | This file + mono `kuat-docs/LOADING.md` overlay |
| **App** | npm consumers | `node_modules/@equal-experts/kuat-react/agent-docs/AGENTS.md` | `agent-docs/rules/LOADING-consumer.md` (generated on publish) |

Full architecture: [setup/consumption-architecture.md](../setup/consumption-architecture.md).

Run [ensure-rules.sh](../../skills/scripts/ensure-rules.sh) — emits `RULES_SOURCE=git|package` and optional `OVERLAY_DIR`.

## Cross-repo consumption contract

When these rules are used from a consumer implementation repo (for example `kuat-mono`) or via npm packages:

1. Resolve rules: git `kuat-agent-docs` or bundled `agent-docs` in `@equal-experts/kuat-react` / `kuat-vue`.
2. Load local implementation overlay second when `KUAT_RULES_OVERLAY_PATH` is set.

Conflict policy:
- Design/structure/content guidance -> upstream rules or bundled snapshot at package version.
- Implementation/API/testing/build -> local implementation repo or package component docs.
- If implementation behavior remains ambiguous, trust runtime evidence in this order: tests, Storybook, package exports, source code.

Ownership: [setup/ownership-matrix.md](../setup/ownership-matrix.md).

---

## Foundations

**Path:** `foundations/`

**Shared (top level):**
| File | Description |
|------|-------------|
| `foundations/brand.md` | Brand principles and identity |
| `foundations/logo.md` | Logo variants, sizing, placement |
| `foundations/accessibility.md` | Accessibility principles and guidelines |

**Design** (`foundations/design/`):
| File | Description |
|------|-------------|
| `foundations/design/design-language.md` | Design principles |
| `foundations/design/colours.md` | Brand color palette |
| `foundations/design/typography.md` | Fonts and type scale |
| `foundations/design/spacing.md` | Spacing system |
| `foundations/design/borders.md` | Border philosophy |

**Content** (`foundations/content/`):
| File | Description |
|------|-------------|
| `foundations/content/voice-and-tone.md` | Voice, tone, audience, quality checklist |
| `foundations/content/writing-style.md` | Active voice, plain language, conciseness |
| `foundations/content/formatting.md` | Capitalisation, headings, links, lists |
| `foundations/content/numbers.md` | Dates, times, currency, units |
| `foundations/content/punctuation.md` | Punctuation conventions |

**When to load:** For minimal context, load only the foundation file(s) relevant to the task. For standard or full context, load all of `foundations/` (shared + design + content as needed, ~800+ lines).

---

## Role cards

**Path:** `roles/`

Load after foundations (or inject as the first instruction block). Task → role mapping: [roles/README.md](./roles/README.md).

| Intent | Role card |
|--------|-----------|
| **review** (all task types) | [roles/brand-reviewer.md](./roles/brand-reviewer.md) |

| Task type (create) | Role card |
|--------------------|-----------|
| infographics | [roles/technical-illustrator.md](./roles/technical-illustrator.md) |
| icons | [roles/icon-designer.md](./roles/icon-designer.md) |

---

## Task → rules

| Task type | Required foundations | Required type-specific | Notes |
|-----------|----------------------|------------------------|--------|
| **slides** | All foundations (or: brand, logo, design, content) | `types/slides/` | Full rule set: brand-compliance, styling, layouts, content, imagery-and-diagrams, data, checklist; scenarios when deck type is known. |
| **photography** | brand (or all foundations) | `types/photography/` | Full rule set: principles, diversity-inclusion, style-and-sources, quality-validation. |
| **icons** | brand, design/colours (or all foundations) | `types/graphics/icons.md` | Single file. |
| **illustrations** | brand, design/colours, design/typography (or all foundations) | `types/graphics/illustrations.md` | Single file. |
| **infographics** | brand, design/colours, design/typography, design/spacing (or all foundations) | `types/graphics/infographics.md` | Single file. |
| **charts_data** | design/colours, design/typography (or all foundations) | `types/charts-data/` | Placeholder/skeleton; has minimal chart-type guidance. |
| **web_marketing** | All foundations | `types/web/marketing/` | Include scenarios when designing specific marketing page types; content in `types/web/marketing/content/`. |
| **web_product** | All foundations | `types/web/product/` | Include scenarios for docs, forms, dashboards, auth; content in `types/web/product/content/`; include examples when implementing in React/Vue/CSS. |

---

## Review load notes

When intent is **review**, use these load deltas (in addition to skill [kuat-review](../../skills/kuat-review/SKILL.md)):

| Task type | Load | Skip |
|-----------|------|------|
| **slides** | All `types/slides/` core files + [checklist.md](./types/slides/checklist.md); scenario if deck type known | — |
| **web_product** | [design.md](./types/web/product/design.md), [accessibility.md](./types/web/product/accessibility.md), [component-decision-tree.md](./types/web/product/component-decision-tree.md), [review-context.md](./types/web/product/review-context.md), [review-checklist.md](./types/web/product/review-checklist.md); relevant scenario if flow type known | `types/web/product/examples/` |
| **Others** | Foundations + type README + any validation checklist (e.g. photography `quality-validation.md`) | Implementation examples unless reviewing code |

---

## Optional paths

| Path | When to include |
|------|------------------|
| `types/slides/scenarios/` | Deck type known (sales, knowledge sharing, case study, reporting). |
| `types/photography/` | Selecting or reviewing slide photography beyond placement rules. |
| `types/charts-data/` | Building or restyling complex charts for slides. |
| `types/web/marketing/scenarios/` | Task involves specific marketing page types (see scenarios README). |
| `types/web/marketing/content/` | Task involves marketing copy, blog, or SEO. |
| `types/web/product/scenarios/` | Task involves documentation pages, forms, dashboards, or authentication flows. |
| `types/web/product/content/` | Task involves product UX writing (actions, errors, forms, etc.). |
| `types/web/product/examples/` | **Create only:** implementing web product UI in React, Vue, or vanilla CSS. **Do not load for review.** Prefer component IDs + package/overlay docs (see [DEPRECATIONS.md](./types/web/product/DEPRECATIONS.md)). |
| Component guides (`components/{slug}.md`) | Artifact or scenario cites a component ID ([component-registry.md](./types/web/product/component-registry.md)). Resolve via `COMPONENT_MANIFEST` from package `agent-docs/` or `KUAT_RULES_OVERLAY_PATH`. Load on demand, not the full catalog. |

---

## Context size reference

| Level | What to load | Approx. size |
|-------|----------------|--------------|
| Minimal | Single foundation file (e.g. `foundations/design/colours.md`) | ~100 lines |
| Standard | All `foundations/` | ~800 lines |
| Full (web product) | `foundations/` + `types/web/product/` | ~2000 lines |
| Full (web product + examples) | Above + `types/web/product/examples/` | ~3500 lines |

---

## Related

- [skills/](../../skills/) – Review and create skills (orchestration)
- [workflows/](./workflows/) – Pointer to skills (legacy path)
- [rules/README.md](./README.md) – Structure and overview
- [AGENTS.md](../../AGENTS.md) – Agent entry point and behaviour guidelines
- [setup/integration.md](../../setup/integration.md) – IDE integration
