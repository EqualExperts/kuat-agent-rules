# Equal Experts Agent Rules

Design system rules and guidelines for AI agents and content creators.

---

## Loading index (canonical)

**Task → files and load order:** [LOADING.md](./LOADING.md)

**Skills** for review/create sessions live at [../../skills/](../../skills/). This directory holds compliance standards only.

The loading index is the single source of truth for:
- Which foundation rule files to load
- Which type-specific paths to load per task (slides, web_product, web_marketing, icons, etc.)
- Optional paths (scenarios, content subdirs, examples) and when to include them

---

## Structure

```
rules/
├── LOADING.md                 # Canonical task → rules index (start here for agents)
├── roles/                     # Reusable role cards and task → role mapping
│   ├── README.md              # Role cards list and dispatcher
│   ├── brand-reviewer.md
│   ├── technical-illustrator.md
│   └── icon-designer.md
├── foundations/                # Universal rules for ALL platforms
│   ├── brand.md
│   ├── logo.md
│   ├── accessibility.md
│   ├── README.md
│   ├── design/                 # Design language, colours, typography, spacing, borders
│   │   ├── README.md
│   │   ├── design-language.md
│   │   ├── colours.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   └── borders.md
│   └── content/                # Voice, tone, writing style, formatting, numbers, punctuation
│       ├── README.md
│       ├── voice-and-tone.md
│       ├── writing-style.md
│       ├── formatting.md
│       ├── numbers.md
│       └── punctuation.md
│
├── workflows/                  # Pointer to skills/ (legacy path)
│   └── README.md
└── types/                      # Platform-specific rules
    ├── slides/
    ├── photography/
    ├── graphics/               # icons.md, illustrations.md, infographics.md
    ├── charts-data/
    └── web/
        ├── marketing/          # website, emails, scenarios, content/
        └── product/            # design, content/, scenarios, examples
```

---

## Quick reference

| Category | Directory |
|----------|-----------|
| Skills (repo root) | [../../skills/](../../skills/) — review vs create orchestration |
| Role cards | [roles/](./roles/) |
| Foundations | [foundations/](./foundations/) |
| Type-specific rules | [types/](./types/) |

**Platform isolation:** Types do not reference each other; all types may reference foundations.

---

## Foundations

- [foundations/brand.md](./foundations/brand.md) - Brand principles
- [foundations/logo.md](./foundations/logo.md) - Logo usage
- [foundations/accessibility.md](./foundations/accessibility.md) - Accessibility
- [foundations/design/](./foundations/design/README.md) - Design language, colours, typography, spacing, borders
- [foundations/content/](./foundations/content/README.md) - Voice, tone, writing style, formatting, numbers, punctuation

---

## Type-specific rules

- [types/slides/](./types/slides/) - Presentations
- [types/photography/](./types/photography/) - Photography
- [types/graphics/](./types/graphics/) - Icons, illustrations, infographics
- [types/charts-data/](./types/charts-data/) - Data visualization
- [types/web/marketing/](./types/web/marketing/) - Marketing websites and emails
- [types/web/product/](./types/web/product/) - Web applications (design, content, scenarios, examples)
