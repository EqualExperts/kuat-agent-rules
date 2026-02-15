# Equal Experts Agent Rules

Design system rules and guidelines for AI agents and content creators.

---

## Loading index (canonical)

**Task → files and load order:** [LOADING.md](./LOADING.md)

The loading index is the single source of truth for:
- Which general rule files to load
- Which type-specific paths to load per task (slides, web_product, web_marketing, icons, etc.)
- Optional paths (scenarios, examples) and when to include them

---

## Structure

```
rules/
├── LOADING.md                 # Canonical task → rules index (start here for agents)
├── general/                   # Universal rules for ALL platforms
│   ├── brand.md
│   ├── logo.md
│   ├── content.md
│   ├── design-language.md
│   ├── colours.md
│   ├── typography.md
│   ├── spacing.md
│   ├── borders.md
│   └── accessibility.md
│
└── types/                     # Platform-specific rules
    ├── slides/
    ├── photography/
    ├── graphics/               # icons.md, illustrations.md, infographics.md
    ├── charts-data/
    └── web/
        ├── marketing/
        └── product/            # design, component-decision-tree, technical, examples
```

---

## Quick reference

| Category | Directory |
|----------|-----------|
| General rules | [general/](./general/) |
| Type-specific rules | [types/](./types/) |

**Platform isolation:** Types do not reference each other; all types may reference general rules.

---

## General rules

- [general/brand.md](./general/brand.md) - Brand principles
- [general/logo.md](./general/logo.md) - Logo usage
- [general/content.md](./general/content.md) - Writing style
- [general/design-language.md](./general/design-language.md) - Design principles
- [general/colours.md](./general/colours.md) - Color palette
- [general/typography.md](./general/typography.md) - Typography
- [general/spacing.md](./general/spacing.md) - Spacing
- [general/borders.md](./general/borders.md) - Borders
- [general/accessibility.md](./general/accessibility.md) - Accessibility

---

## Type-specific rules

- [types/slides/](./types/slides/) - Presentations
- [types/photography/](./types/photography/) - Photography
- [types/graphics/](./types/graphics/) - Icons, illustrations, infographics
- [types/charts-data/](./types/charts-data/) - Data visualization
- [types/web/marketing/](./types/web/marketing/) - Marketing websites and emails
- [types/web/product/](./types/web/product/) - Web applications (design, component-decision-tree, technical, examples)
