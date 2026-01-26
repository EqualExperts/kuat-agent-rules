# Kuat Design System Rules

Pure design language documentation - technology-agnostic rules for building consistent user interfaces and content.

---

## Quick Navigation

| Category | Description | Key Files |
|----------|-------------|-----------|
| [Design](./design/) | Visual design rules | colours, typography, spacing, borders, layouts, logo |
| [Content](./content/) | Content writing rules | voice, tone, marketing, UX writing |
| [Components](./components/) | Component pattern rules | naming, variants, accessibility |

---

## How to Use These Rules

**These files contain design principles and specifications only - no code examples.**

For implementation code, see:
- [examples/react/](../examples/react/) - React/JSX examples
- [examples/vue/](../examples/vue/) - Vue SFC examples
- [examples/css/](../examples/css/) - Vanilla CSS examples

---

## Design Rules

Visual design specifications for the Kuat Design System:

- **[colours.md](./design/colours.md)** - Brand colors, semantic tokens, accessibility
- **[typography.md](./design/typography.md)** - Fonts, type scale, hierarchy
- **[spacing.md](./design/spacing.md)** - 8-point grid, spacing scale, patterns
- **[borders.md](./design/borders.md)** - Border philosophy, radius, colors
- **[logo.md](./design/logo.md)** - Logo usage, sizing, variants
- **[layouts.md](./design/layouts.md)** - Page layouts, navigation patterns
- **[overview.md](./design/overview.md)** - Design system principles

---

## Content Rules

Content writing guidelines for consistent voice and messaging:

- **[foundations.md](./content/foundations.md)** - Universal voice and tone principles
- **[marketing-sales.md](./content/marketing-sales.md)** - Marketing and sales content
- **[product-ux.md](./content/product-ux.md)** - Product interface content

---

## Component Rules

Component development patterns (framework-agnostic):

- **[patterns.md](./components/patterns.md)** - Naming, variants, accessibility, testing

---

## For AI Agents

**Recommended context loading:**

1. **Minimum context**: Load only the specific rule file needed for the task
2. **Design tasks**: Load `rules/design/` directory
3. **Content tasks**: Load `rules/content/` directory  
4. **Component tasks**: Load `rules/components/` + relevant `examples/` directory

**File size targets**: Each file is optimized to be under 200-400 lines for efficient context usage.
