# Kuat Design System

Equal Experts' design system for building consistent, accessible, and brand-aligned digital experiences.

## What is Kuat?

Kuat is a **design decision layer** that provides:

- **Design Tokens** (`kuat-core`) - CSS variables, Tailwind preset, brand colors, typography
- **Custom Components** (`kuat-react`, `kuat-vue`) - Components not in shadcn (ButtonGroup, etc.)
- **Blocks** - Pre-built compositions for common patterns (headers, footers, search)
- **Documentation** - Design rules, content guidelines, and patterns

**Architecture:**

```
┌─────────────────────────────────────────────────────┐
│  Your Application                                   │
├─────────────────────────────────────────────────────┤
│  Kuat Blocks (Header, Footer, etc.)                 │  ← From kuat-react/vue
├─────────────────────────────────────────────────────┤
│  Kuat Components (ButtonGroup)                      │  ← From kuat-react/vue
├─────────────────────────────────────────────────────┤
│  shadcn Components (Button, Dialog)                 │  ← Installed directly via CLI
├─────────────────────────────────────────────────────┤
│  kuat-core (Design Tokens, Theme)                   │  ← Foundation
└─────────────────────────────────────────────────────┘
```

## Design Principles

When making decisions, apply these principles in order:

1. **Accessibility first** - WCAG AA minimum, keyboard navigable, screen reader compatible
2. **Consistency over creativity** - Use existing tokens and patterns before creating new ones
3. **Semantic over literal** - Use `bg-primary` not `bg-blue-500`; meaning over appearance
4. **Progressive enhancement** - Core functionality works without JS; enhance with interactivity
5. **Content-driven** - Design serves content; never decorate at the expense of clarity

## Component Decision Framework

When building UI, follow this priority:

| Priority | Source | When to Use |
|----------|--------|-------------|
| 1 | **Kuat Blocks** | Pre-built compositions (header, footer, search) |
| 2 | **Kuat Components** | Custom components not in shadcn (ButtonGroup) |
| 3 | **shadcn** | Standard UI components, themed via kuat-core |
| 4 | **Custom** | Only when none of the above fit |

## Design Decision Framework

| Question | Answer |
|----------|--------|
| Should I create a custom color? | No. Use semantic tokens (`primary`, `secondary`, `accent`) |
| Which border radius? | 0px static, 6px interactive, 4px inputs |
| How much spacing? | Use 8-point grid (multiples of 4px) |
| Which font? | Lexend (UI), JetBrains Mono (code), Lora (editorial) |
| Which component library? | shadcn + kuat-core theming (see setup guide) |

---

## Quick Start

**For design rules only (recommended):**
Load `rules/` directory

**For framework examples:**
Also load `examples/react/` or `examples/vue/`

**For setup/integration:**
See `setup/integration.md`

---

## Documentation Structure

### Rules (Pure Design Language - No Code)

Technology-agnostic design specifications:

| Directory | Description |
|-----------|-------------|
| [rules/design/](./rules/design/) | Colors, typography, spacing, borders, layouts, logo |
| [rules/content/](./rules/content/) | Voice, tone, marketing, UX writing |
| [rules/components/](./rules/components/) | Naming, variants, accessibility patterns |

**Key files:**
- `rules/design/colours.md` - Brand colors and semantic tokens
- `rules/design/typography.md` - Fonts and type scale
- `rules/design/spacing.md` - 8-point grid system
- `rules/design/borders.md` - Border philosophy and radius
- `rules/design/layouts.md` - Page layouts and navigation
- `rules/design/logo.md` - Logo usage guidelines
- `rules/content/foundations.md` - Universal content principles
- `rules/components/patterns.md` - Component development rules

### Examples (Framework-Specific Code)

Implementation code for specific frameworks:

| Directory | Description |
|-----------|-------------|
| [examples/react/](./examples/react/) | React/JSX implementation examples |
| [examples/vue/](./examples/vue/) | Vue SFC implementation examples |
| [examples/css/](./examples/css/) | Vanilla CSS examples |

### Setup (Integration Guides)

How to integrate into your environment:

| File | Description |
|------|-------------|
| [setup/consumer-setup.md](./setup/consumer-setup.md) | **Recommended**: kuat-core + shadcn setup |
| [setup/integration.md](./setup/integration.md) | Integration patterns for IDEs and agents |
| [setup/verification.md](./setup/verification.md) | Testing your setup |
| [setup/kuat-core-integration.md](./setup/kuat-core-integration.md) | Framework-agnostic token usage |

---

## For AI Agents

### Quick Setup: Add to Your Existing Rules

Most developers already have `.cursorrules`, `CLAUDE.md`, or similar agent configuration. **Copy this snippet** into your existing file:

```markdown
## Kuat Design System

This project uses the Kuat Design System for all UI work.

**What it provides:**
Design tokens, component patterns, layout guidance, and content guidelines for building consistent, accessible interfaces.

**When to use it:**
You MUST reference the Kuat documentation when:
- Creating or modifying UI components
- Making color, typography, spacing, or layout decisions
- Writing user-facing content

**How to use it:**
1. Check the documentation before making design decisions
2. Follow existing patterns; do not invent new ones
3. If the documentation doesn't cover your case, ask before proceeding

**Documentation index:**
- `rules/design/colours.md` - Brand colors, semantic tokens, color usage
- `rules/design/typography.md` - Fonts, type scale, text styles
- `rules/design/spacing.md` - 8-point grid, margins, padding
- `rules/design/borders.md` - Border radius, border styles
- `rules/design/layouts.md` - Page layouts, navigation patterns
- `rules/design/logo.md` - Logo usage and placement
- `rules/components/patterns.md` - Component naming, variants, accessibility
- `rules/content/foundations.md` - Voice, tone, universal writing principles
- `rules/content/product-ux.md` - Product and UX writing guidelines
- `rules/content/marketing-sales.md` - Marketing content guidelines
- `examples/react/` - React implementation examples
- `examples/vue/` - Vue implementation examples

**Quick reference (when docs unavailable):**
Semantic tokens only (`bg-primary` not `bg-blue-500`), 8-point spacing grid, 6px radius for interactive elements, WCAG AA contrast.

**Documentation:** https://github.com/equalexperts/kuat-mono/tree/master/kuat-docs
```

### Need Full Documentation Locally?

For component patterns, layouts, or content guidelines, clone the docs:

```bash
git clone --filter=blob:none --sparse https://github.com/equalexperts/kuat-mono.git
cd kuat-mono && git sparse-checkout set kuat-docs
cp -r kuat-docs /path/to/your-project/
```

Then update your snippet: `Check the documentation in kuat-docs/rules/ before making design decisions`

### Context Loading Strategies

| Level | What | Size |
|-------|------|------|
| Minimal | Snippet above | ~20 lines |
| Standard | `rules/` directory | ~1500 lines |
| Full | `rules/` + `examples/{framework}/` | ~2500 lines |

### Verification

Test your setup with these prompts:
- "Create a card component" → Agent should reference Kuat docs
- "What color for the primary button?" → Agent should check docs or use semantic tokens
- "Add spacing between form fields" → Agent should reference spacing rules

---

## Quick Reference

### Brand Colors

| Color | Value | Usage |
|-------|-------|-------|
| EE Blue | `#0066CC` | Primary actions, brand |
| Transform Teal | `oklch(0.645 0.120 185.0)` | Secondary actions |
| Tech Blue | `oklch(0.435 0.090 240.0)` | Sidebar, navigation |
| Equal Ember | `oklch(0.625 0.200 65.0)` | Warnings, highlights |

### Typography

| Element | Specification |
|---------|---------------|
| Sans | Lexend (`font-sans`) |
| Mono | JetBrains Mono (`font-mono`) |
| Serif | Lora (`font-serif`) |

### Spacing

4px base unit (0.25rem). Use scale: 4, 8, 12, 16, 24, 32, 48px.

### Border Radius

| Element | Radius |
|---------|--------|
| Static content | 0px |
| Interactive (buttons) | 6px |
| Form inputs | 4px |

---

## Package Reference

| Package | Description |
|---------|-------------|
| `@equal-experts/kuat-core` | Design tokens, CSS variables, Tailwind preset (foundation) |
| `@equal-experts/kuat-react` | Custom React components and blocks (ButtonGroup, etc.) |
| `@equal-experts/kuat-vue` | Custom Vue components and blocks (ButtonGroup, etc.) |

**Note:** For standard UI components (Button, Dialog, etc.), install them directly via shadcn CLI. They will be automatically themed when using kuat-core.

---

## For Application Developers

**Recommended Setup:** Use `kuat-core` for theming + shadcn components installed directly.

- **Quick Start**: See [Consumer Setup Guide](./setup/consumer-setup.md)
- **React Applications**: See [@equal-experts/kuat-react README](../packages/kuat-react/README.md)
- **Vue Applications**: See [@equal-experts/kuat-vue README](../packages/kuat-vue/README.md)
- **Any Framework**: See [kuat-core-integration.md](./setup/kuat-core-integration.md)

---

## For Contributors

See [CONTRIBUTING.md](../CONTRIBUTING.md) for high-level process and decision framework.

| Guide | Description |
|-------|-------------|
| [CONTRIBUTING.md](../CONTRIBUTING.md) | High-level process and component decisions |
| [ARCHITECTURE.md](../ARCHITECTURE.md) | Monorepo architecture |
| [contribution-docs/react.md](../contribution-docs/react.md) | React implementation guide |
| [contribution-docs/vue.md](../contribution-docs/vue.md) | Vue implementation guide |

---

## For Maintainers

- **[PUBLISHING.md](../PUBLISHING.md)** - npm publishing guide

---

## Related Documentation

- [Setup Guide](./setup/integration.md) - Integration instructions
- [Verification Guide](./setup/verification.md) - Test your setup
- [Rules](./rules/) - Design language documentation
- [Examples](./examples/) - Framework-specific code
