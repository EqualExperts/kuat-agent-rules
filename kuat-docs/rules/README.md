# Equal Experts Agent Rules

Design system rules and guidelines for AI agents and content creators.

---

## Structure

```
rules/
├── general/                    # Universal rules for ALL platforms
│   ├── brand.md                # Brand principles and identity
│   ├── logo.md                 # Logo usage guidelines
│   ├── content.md              # Writing style and tone
│   ├── design-language.md      # General design principles
│   ├── colours.md              # Color palette
│   ├── typography.md           # Typography specifications
│   ├── spacing.md              # Spacing system
│   └── borders.md              # Border philosophy
│
└── types/                      # Platform-specific rules
    ├── slides/                 # Presentation decks
    ├── photography/            # Photography guidelines
    ├── graphics/               # Icons, illustrations, infographics
    ├── charts-data/            # Data visualization
    └── web/                    # Web (marketing and product)
        ├── marketing/          # Marketing websites and emails
        └── product/            # Web applications
            └── examples/       # Framework-specific code
```

---

## Quick Navigation

| Category | Description | Directory |
|----------|-------------|-----------|
| General Rules | Universal brand and design language | [general/](./general/) |
| Type-Specific Rules | Platform-specific guidelines | [types/](./types/) |

---

## How to Use These Rules

### For AI Agents

1. **Always load general rules first** - They apply to all platforms
2. **Then load type-specific rules** - Based on what you're creating

**Example context loading:**

| Task | Load |
|------|------|
| Creating slides | `general/` + `types/slides/` |
| Building web app | `general/` + `types/web/product/` |
| Marketing website | `general/` + `types/web/marketing/` |
| Designing icons | `general/` + `types/graphics/icons.md` |

### Platform Isolation

Type-specific rules should NOT reference each other:

- ✅ Slides can reference general rules
- ✅ Web/product can reference general rules
- ❌ Slides should NOT reference web/product rules
- ❌ Graphics should NOT reference web examples

This ensures slides don't need to understand Kuat-react, and infographics don't need web component patterns.

---

## General Rules

Universal design language applicable to ALL platforms:

- **[brand.md](./general/brand.md)** - Equal Experts brand principles
- **[logo.md](./general/logo.md)** - Logo variants, sizing, placement
- **[content.md](./general/content.md)** - Writing style, tone, guidelines
- **[design-language.md](./general/design-language.md)** - Design principles
- **[colours.md](./general/colours.md)** - Brand color palette
- **[typography.md](./general/typography.md)** - Fonts and type scale
- **[spacing.md](./general/spacing.md)** - Spacing system
- **[borders.md](./general/borders.md)** - Border philosophy

---

## Type-Specific Rules

Platform-specific guidelines that extend general rules:

### Slides
- **[types/slides/](./types/slides/)** - Presentation guidelines

### Photography
- **[types/photography/](./types/photography/)** - Photo style guidelines

### Graphics
- **[types/graphics/](./types/graphics/)** - Icons, illustrations, infographics

### Charts & Data
- **[types/charts-data/](./types/charts-data/)** - Data visualization

### Web
- **[types/web/marketing/](./types/web/marketing/)** - Marketing websites and emails
- **[types/web/product/](./types/web/product/)** - Web applications
  - [design.md](./types/web/product/design.md) - Product layouts
  - [component-decision-tree.md](./types/web/product/component-decision-tree.md) - Component selection
  - [technical.md](./types/web/product/technical.md) - Setup and integration
  - [examples/](./types/web/product/examples/) - React, Vue, CSS examples
