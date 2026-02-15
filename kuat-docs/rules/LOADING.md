# Agent Rules Loading Index

**Canonical reference** for which rule files to load for each task type. Use this index to resolve "task X" → exact list of files. All paths are relative to `kuat-docs/rules/`.

---

## Load order

1. **Always load general rules first** (see [General](#general-rules) below).
2. **Then load type-specific rules** for the task (see [Task → rules](#task--rules)).
3. **Optionally** add scenarios or examples when relevant (see [Optional paths](#optional-paths)).

**Platform isolation:** Type-specific rules must not reference other types. General rules are shared; types only reference general.

---

## General rules

**Path:** `general/`

| File | Description |
|------|-------------|
| `general/brand.md` | Brand principles and identity |
| `general/logo.md` | Logo variants, sizing, placement |
| `general/content.md` | Writing style, tone, guidelines |
| `general/colours.md` | Brand color palette |
| `general/typography.md` | Fonts and type scale |
| `general/spacing.md` | Spacing system |
| `general/borders.md` | Border philosophy |
| `general/design-language.md` | General design principles |
| `general/accessibility.md` | Accessibility principles and guidelines |

**When to load:** For minimal context, load only the general file(s) relevant to the task. For standard or full context, load all files in `general/` (~800 lines).

---

## Task → rules

| Task type | Required general | Required type-specific | Notes |
|-----------|------------------|------------------------|--------|
| **slides** | All general (or: brand, logo, colours, typography, content) | `types/slides/` | Placeholder/skeleton; prefer general if slides content is minimal. |
| **photography** | brand (or all general) | `types/photography/` | Placeholder/skeleton; prefer general if photography content is minimal. |
| **icons** | brand, colours (or all general) | `types/graphics/icons.md` | Single file. |
| **illustrations** | brand, colours, typography (or all general) | `types/graphics/illustrations.md` | Single file. |
| **infographics** | brand, colours, typography, spacing (or all general) | `types/graphics/infographics.md` | Single file. |
| **charts_data** | colours, typography (or all general) | `types/charts-data/` | Placeholder/skeleton; has minimal chart-type guidance. |
| **web_marketing** | All general | `types/web/marketing/` | Include scenarios when designing specific marketing page types. |
| **web_product** | All general | `types/web/product/` | Include scenarios for docs, forms, dashboards, auth; include examples when implementing in React/Vue/CSS. |

---

## Optional paths

| Path | When to include |
|------|------------------|
| `types/web/marketing/scenarios/` | Task involves specific marketing page types (see scenarios README). |
| `types/web/product/scenarios/` | Task involves documentation pages, forms, dashboards, or authentication flows. |
| `types/web/product/examples/` | Implementing web product UI in React, Vue, or vanilla CSS; use the relevant framework subfolder. |

---

## Context size reference

| Level | What to load | Approx. size |
|-------|----------------|--------------|
| Minimal | Single general file (e.g. `general/colours.md`) | ~100 lines |
| Standard | All `general/` | ~800 lines |
| Full (web product) | `general/` + `types/web/product/` | ~2000 lines |
| Full (web product + examples) | Above + `types/web/product/examples/` | ~3500 lines |

---

## Related

- [rules/README.md](./README.md) – Structure and overview
- [AGENTS.md](../../AGENTS.md) – Agent entry point and behaviour guidelines
- [setup/integration.md](../../setup/integration.md) – IDE integration
