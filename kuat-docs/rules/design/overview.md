# Design System Overview

High-level principles and architecture for the Kuat Design System. This document provides context for all other design rules.

---

## What is the Kuat Design System?

The Kuat Design System is a collection of design tokens, component patterns, and guidelines that ensure consistent, accessible, and brand-compliant user interfaces across all Equal Experts digital products.

**Core package:** `@equal-experts/kuat-core`

---

## Design Principles

### 1. Consistency

Use design tokens everywhere. Never hardcode colors, spacing, or typography values.

### 2. Accessibility

WCAG AA compliance minimum. All color combinations, interactive elements, and content must be accessible.

### 3. Simplicity

Minimal borders, clear hierarchy through spacing. Prefer simple solutions over complex ones.

### 4. Flexibility

Support light and dark modes. Work across React, Vue, and any framework using CSS variables.

---

## Token Architecture

The design system uses a layered token approach:

### Layer 1: Brand Colors

Core brand palette values:
- EE Blue (primary)
- Transform Teal (secondary)
- Tech Blue (supporting)
- Equal Ember (accent)

### Layer 2: Semantic Tokens

Purpose-based tokens that reference brand colors:
- `--primary`, `--secondary`, `--accent`
- `--background`, `--foreground`
- `--muted`, `--destructive`
- `--border`, `--input`, `--ring`

### Layer 3: Component Tokens

Context-specific tokens for components:
- `--card`, `--card-foreground`
- `--sidebar`, `--sidebar-foreground`
- `--popover`, `--popover-foreground`

---

## Theming

### Light Mode

Default mode. Clean, professional appearance with light backgrounds.

### Dark Mode

Enabled by adding `.dark` class to root element. All semantic tokens automatically switch values.

**Key changes in dark mode:**
- Backgrounds: Light → Dark (slate-900)
- Foregrounds: Dark → Light (white)
- Brand colors remain consistent
- Supporting colors adapt for contrast

---

## Design Token Categories

| Category | What It Defines | Documentation |
|----------|-----------------|---------------|
| Colors | Brand colors, semantic tokens, component colors | [colours.md](./colours.md) |
| Typography | Fonts, sizes, weights, line heights | [typography.md](./typography.md) |
| Spacing | Padding, margin, gap, 8-point grid | [spacing.md](./spacing.md) |
| Borders | Widths, styles, radius, colors | [borders.md](./borders.md) |
| Logo | Usage, sizing, variants, placement | [logo.md](./logo.md) |
| Layouts | Page structures, navigation patterns | [layouts.md](./layouts.md) |

---

## Accessibility Standards

The design system adheres to **WCAG 2.1 Level AA**:

| Requirement | Standard |
|-------------|----------|
| Text contrast | 4.5:1 minimum |
| Large text contrast | 3:1 minimum |
| Graphical object contrast | 3:1 minimum |
| Keyboard navigation | Full support |
| Screen reader support | ARIA where needed |
| Heading hierarchy | Logical structure |

---

## Best Practices Summary

### Do's

1. **Use semantic tokens** - `bg-primary`, not `#0066CC`
2. **Follow the scale** - Use defined spacing values
3. **Test accessibility** - Verify contrast, keyboard nav
4. **Support both modes** - Light and dark work correctly
5. **Use official assets** - Logo files from brand repository

### Don'ts

1. **Don't hardcode values** - Always use tokens
2. **Don't skip heading levels** - h1 → h2 → h3
3. **Don't ignore contrast** - Verify all combinations
4. **Don't create custom tokens** - Extend through proper channels
5. **Don't modify brand assets** - Use as provided

---

## Package Structure

```
@equal-experts/kuat-core/
├── src/variables.css     # CSS custom properties
└── tailwind.config.ts    # Tailwind preset

@equal-experts/kuat-react/
└── src/components/       # React components

@equal-experts/kuat-vue/
└── src/components/       # Vue components
```

---

## Integration

For detailed integration instructions:

- [Setup Guide](../../setup/integration.md) - How to integrate into your project
- [kuat-core Integration](../../setup/kuat-core-integration.md) - Framework-specific setup

---

## Related Documentation

- [Colours](./colours.md) - Brand colors and semantic tokens
- [Typography](./typography.md) - Fonts and text styling
- [Spacing](./spacing.md) - 8-point grid and spacing patterns
- [Borders](./borders.md) - Border philosophy and specifications
- [Logo](./logo.md) - Logo usage guidelines
- [Layouts](./layouts.md) - Page layout templates
- [Component Patterns](../components/patterns.md) - Component development rules
- [Content Rules](../content/) - Content writing guidelines
