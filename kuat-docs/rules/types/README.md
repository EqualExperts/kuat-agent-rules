# Type-Specific Rules

Platform-specific guidelines that extend the general rules for specific output types.

---

## Overview

These rules provide platform-specific guidance. **Always load [foundations](../foundations/) first**, then load the appropriate type-specific rules.

---

## Available Types

| Type | Directory | Description |
|------|-----------|-------------|
| Slides | [slides/](./slides/) | Presentation decks and slides |
| Photography | [photography/](./photography/) | Photo guidelines, B&W style |
| Graphics | [graphics/](./graphics/) | Icons, illustrations, infographics |
| Charts & Data | [charts-data/](./charts-data/) | Data visualization |
| Web | [web/](./web/) | Websites and web applications |

---

## How to Use

**Load order and task → files:** See the canonical index [../LOADING.md](../LOADING.md). Load general rules first, then the type-specific path for your task.

**Isolation:** Type-specific rules do not reference each other; they may reference general rules only.

---

## Structure

```
types/
├── slides/
│   └── README.md           # Slide deck guidelines
│
├── photography/
│   └── README.md           # Photography guidelines
│
├── graphics/
│   ├── README.md           # Graphics overview
│   ├── icons.md            # Icon guidelines
│   ├── illustrations.md    # Illustration guidelines
│   └── infographics.md     # Infographic guidelines
│
├── charts-data/
│   └── README.md           # Charts and data visualization
│
└── web/
    ├── README.md           # Web foundations
    ├── marketing/          # Marketing websites and emails
    │   ├── website.md
    │   └── emails.md
    └── product/            # Web applications
        ├── design.md
        ├── component-decision-tree.md
        ├── technical.md
        ├── emails.md
        └── examples/       # Framework-specific examples
            ├── react/
            ├── vue/
            └── css/
```

---

## Related Documentation

- [Foundations](../foundations/) - Universal brand and design language
