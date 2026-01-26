# Type-Specific Rules

Platform-specific guidelines that extend the general rules for specific output types.

---

## Overview

These rules provide platform-specific guidance. **Always load [general rules](../general/) first**, then load the appropriate type-specific rules.

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

### For AI Agents

1. **First:** Load relevant files from [general/](../general/)
2. **Then:** Load the type-specific rules for your platform

**Example contexts:**

| Task | Load General | Load Type-Specific |
|------|--------------|-------------------|
| Creating a slide deck | brand, logo, colours, typography, content | types/slides/ |
| Designing an infographic | brand, logo, colours, typography, spacing | types/graphics/infographics.md |
| Building a web app | brand, logo, colours, typography, spacing, borders, content | types/web/product/ |
| Creating marketing website | brand, logo, colours, typography, spacing, content | types/web/marketing/ |
| Editing photography | brand | types/photography/ |
| Creating a chart | colours, typography | types/charts-data/ |

### Isolation Rules

Type-specific rules should **not reference each other**:

- ✅ Slides can reference general rules
- ✅ Web/product can reference general rules
- ❌ Slides should NOT reference web/product rules
- ❌ Graphics should NOT reference web/product examples

This ensures clean separation - slides don't need to understand Kuat-react, and infographics don't need web component patterns.

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

- [General Rules](../general/) - Universal brand and design language
