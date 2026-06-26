# Equal Experts Reference

The passive **reference library** for the Equal Experts design system: what is true about the EE brand, design language, content style, accessibility standards, and how each medium is done. It states the **WHAT**, not the how.

## The passive/skill boundary

- **Reference (this tree) is passive — the WHAT.** A file belongs here only if it states what is true about EE: principles, specs, token values, fact tables, patterns. No verbs.
- **Skills are the HOW.** Anything that tells an agent *how to do a job* — verbs, role cards, checklists, "before you create/review", loading order — lives in a **skill**, not here. Skills link into this reference for the slices they need (progressive disclosure); reference never tells you what to load.

## Structure

| Area | Scope |
|------|-------|
| [brand/](./brand/) | Brand principles, logo, voice and tone |
| [design-language/](./design-language/) | Design principles, colours, typography, spacing, borders |
| [content/](./content/) | Writing style, formatting, numbers, punctuation |
| [accessibility/](./accessibility/) | WCAG-aligned accessibility standards |
| [patterns/](./patterns/) | Shared, cross-medium pattern **concepts** (outcome-framed); see [overview](./patterns/overview.md) |
| [media-types/](./media-types/) | Per-medium reference — `slides`, `web-product`, `web-marketing`, `imagery`, `charts-data` |

Each media type under `media-types/<medium>/` owns a `patterns/` subfolder describing how specific things are done in that medium (deck types, page types, photography vs graphics). A pattern that is genuinely shared across media has its medium-agnostic **concept** factored up to the top-level [patterns/](./patterns/) layer, with per-medium implementations linking back to it — see the [patterns overview](./patterns/overview.md). Foundations are shared; media types reference foundations but **not each other**.

## Migration

This tree was established in Phase 1 of the design-system migration (see `docs/migration/`). Every old `kuat-docs/rules/...` path maps to its new home in MIGRATION-MAP.md. In Phase 2 the procedure extracted from the old tree was folded into the **activity skills** under `skills/` (loading is now per-skill — each skill names the `reference/` slices it needs).
