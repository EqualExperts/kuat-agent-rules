# Agent Rules Loading Index

**Canonical reference** for which rule files to load for each task type. Use this index to resolve "task X" → exact list of files. All paths are relative to `kuat-docs/rules/`.

---

## Load order

1. **Always load foundations first** (see [Foundations](#foundations) below).
2. **Then load type-specific rules** for the task (see [Task → rules](#task--rules)).
3. **Optionally** add scenarios or examples when relevant (see [Optional paths](#optional-paths)).

**Platform isolation:** Type-specific rules must not reference other types. Foundations are shared; types only reference foundations.

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

## Task → rules

| Task type | Required foundations | Required type-specific | Notes |
|-----------|----------------------|------------------------|--------|
| **slides** | All foundations (or: brand, logo, design, content) | `types/slides/` | Placeholder/skeleton; prefer foundations if slides content is minimal. |
| **photography** | brand (or all foundations) | `types/photography/` | Full rule set: principles, diversity-inclusion, style-and-sources, quality-validation. |
| **icons** | brand, design/colours (or all foundations) | `types/graphics/icons.md` | Single file. |
| **illustrations** | brand, design/colours, design/typography (or all foundations) | `types/graphics/illustrations.md` | Single file. |
| **infographics** | brand, design/colours, design/typography, design/spacing (or all foundations) | `types/graphics/infographics.md` | Single file. |
| **charts_data** | design/colours, design/typography (or all foundations) | `types/charts-data/` | Placeholder/skeleton; has minimal chart-type guidance. |
| **web_marketing** | All foundations | `types/web/marketing/` | Include scenarios when designing specific marketing page types; content in `types/web/marketing/content/`. |
| **web_product** | All foundations | `types/web/product/` | Include scenarios for docs, forms, dashboards, auth; content in `types/web/product/content/`; include examples when implementing in React/Vue/CSS. |

---

## Optional paths

| Path | When to include |
|------|------------------|
| `types/web/marketing/scenarios/` | Task involves specific marketing page types (see scenarios README). |
| `types/web/marketing/content/` | Task involves marketing copy, blog, or SEO. |
| `types/web/product/scenarios/` | Task involves documentation pages, forms, dashboards, or authentication flows. |
| `types/web/product/content/` | Task involves product UX writing (actions, errors, forms, etc.). |
| `types/web/product/examples/` | Implementing web product UI in React, Vue, or vanilla CSS; use the relevant framework subfolder. |

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

- [rules/README.md](./README.md) – Structure and overview
- [AGENTS.md](../../AGENTS.md) – Agent entry point and behaviour guidelines
- [setup/integration.md](../../setup/integration.md) – IDE integration
