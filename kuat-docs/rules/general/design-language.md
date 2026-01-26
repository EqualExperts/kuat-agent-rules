# Design Language

High-level design principles for Equal Experts. This document provides the foundation for all visual design decisions.

---

## Overview

The Equal Experts design language ensures consistent, accessible, and brand-compliant outputs across all media types - web, slides, graphics, photography, and more.

---

## Design Principles

### 1. Consistency

Use design tokens everywhere. Never use arbitrary values for colors, spacing, or typography.

**Why:** Consistency builds brand recognition and reduces cognitive load.

### 2. Accessibility

WCAG AA compliance minimum. All color combinations, interactive elements, and content must be accessible.

**Why:** Everyone should be able to access and use Equal Experts materials.

### 3. Simplicity

Minimal borders, clear hierarchy through spacing. Prefer simple solutions over complex ones.

**Why:** Simplicity communicates confidence and professionalism.

### 4. Clarity

Content-first design. Design serves content; never decorate at the expense of clarity.

**Why:** Clear communication is more valuable than visual flourish.

### 5. Flexibility

Support different contexts - light/dark, print/digital, large/small formats.

**Why:** Brand materials must work across many platforms and use cases.

---

## Design Token Categories

| Category | What It Defines | Documentation |
|----------|-----------------|---------------|
| Colors | Brand colors, palette scales, usage | [colours.md](./colours.md) |
| Typography | Fonts, sizes, weights, hierarchy | [typography.md](./typography.md) |
| Spacing | Padding, margin, gaps, relationships | [spacing.md](./spacing.md) |
| Borders | Widths, styles, radius, colors | [borders.md](./borders.md) |
| Logo | Usage, sizing, variants, placement | [logo.md](./logo.md) |

---

## Accessibility Standards

The design language adheres to **WCAG 2.1 Level AA**:

| Requirement | Standard |
|-------------|----------|
| Text contrast | 4.5:1 minimum |
| Large text contrast | 3:1 minimum |
| Graphical object contrast | 3:1 minimum |
| Color alone | Never convey meaning through color alone |

---

## Best Practices Summary

### Do's

1. **Use brand colors** - EE Blue, Transform Teal, Tech Blue, Equal Ember
2. **Follow the spacing scale** - Use defined values (4, 8, 16, 24, 32, 48px)
3. **Use Lexend font** - It's the brand sans-serif
4. **Test accessibility** - Verify contrast and readability
5. **Use official assets** - Logo files from brand repository
6. **Maintain hierarchy** - Clear visual structure

### Don'ts

1. **Don't use arbitrary values** - Always use tokens
2. **Don't skip heading levels** - H1 → H2 → H3
3. **Don't ignore contrast** - Verify all combinations
4. **Don't modify brand assets** - Use as provided
5. **Don't overcomplicate** - Simple is better
6. **Don't prioritize decoration over clarity** - Content first

---

## Platform-Specific Rules

After understanding these general principles, load the appropriate type-specific rules:

| Platform | Directory | Description |
|----------|-----------|-------------|
| Web | [types/web/](../types/web/) | Websites and web applications |
| Slides | [types/slides/](../types/slides/) | Presentations |
| Photography | [types/photography/](../types/photography/) | Photo guidelines |
| Graphics | [types/graphics/](../types/graphics/) | Icons, illustrations, infographics |
| Charts/Data | [types/charts-data/](../types/charts-data/) | Data visualization |

---

## Related Documentation

- [Brand Guidelines](./brand.md) - Brand principles and identity
- [Logo](./logo.md) - Logo usage guidelines
- [Colours](./colours.md) - Brand colors
- [Typography](./typography.md) - Fonts and type scale
- [Spacing](./spacing.md) - Spacing system
- [Borders](./borders.md) - Border philosophy
- [Content Guidelines](./content.md) - Writing style
