# Spacing Rules

Spacing specifications for Equal Experts. This document defines the spacing scale, patterns, and usage guidelines.

---

## Overview

The design system uses a **4px base unit** for consistent, predictable spacing.

**Key Principle:** Use spacing as the primary tool for visual hierarchy and separation. Prefer spacing over borders when possible.

---

## Spacing Scale

Each unit = 4px:

| Unit | Pixels | Usage |
|------|--------|-------|
| 0 | 0px | No spacing |
| 0.5 | 2px | Tight spacing, fine adjustments |
| 1 | 4px | Minimal spacing, tight groups |
| 1.5 | 6px | Small spacing |
| 2 | 8px | Small spacing, compact layouts |
| 3 | 12px | Medium spacing |
| 4 | 16px | Standard spacing (default) |
| 5 | 20px | Medium-large spacing |
| 6 | 24px | Large spacing, section separation |
| 8 | 32px | Extra large, major sections |
| 10 | 40px | Very large spacing |
| 12 | 48px | Maximum spacing, page sections |
| 16 | 64px | Hero spacing, large sections |
| 20 | 80px | Maximum hero spacing |
| 24 | 96px | Ultra large spacing |

---

## Common Spacing Patterns

### Content Padding

| Context | Spacing | Pixels |
|---------|---------|--------|
| Tight padding | 4 | 16px |
| Standard padding | 6 | 24px |
| Large padding | 8 | 32px |
| Hero/feature areas | 12-16 | 48-64px |

### Section Spacing

| Type | Spacing | Pixels |
|------|---------|--------|
| Tight (related content) | 4 | 16px |
| Standard sections | 6 | 24px |
| Large sections | 8 | 32px |
| Major page sections | 12 | 48px |

### Element Spacing

| Relationship | Spacing | Pixels |
|--------------|---------|--------|
| Tightly related elements | 2-4 | 8-16px |
| Related groups | 6-8 | 24-32px |
| Distinct sections | 12-16 | 48-64px |

---

## Spacing Relationships

Use consistent spacing relationships:

| Relationship | Spacing |
|--------------|---------|
| Tightly related elements | 8-16px |
| Component groups | 24-32px |
| Major sections | 48-64px |

**Rule of thumb:** Related items have smaller spacing; distinct sections have larger spacing.

---

## Usage Guidelines

### Do's

1. **Use the spacing scale** - Stick to defined values (4, 8, 12, 16, 24, 32, 48)
2. **Prefer spacing over borders** - Create separation with space first
3. **Maintain relationships** - Smaller spacing for related items, larger for sections
4. **Be consistent** - Same spacing patterns for similar content
5. **Use white space intentionally** - It creates visual breathing room

### Don'ts

1. **Don't use arbitrary values** - Never use random pixel values
2. **Don't mix spacing systems** - Use only the defined scale
3. **Don't overuse spacing** - Excessive spacing breaks visual flow
4. **Don't ignore hierarchy** - Spacing communicates relationships
5. **Don't be afraid of white space** - It improves readability

---

## Spacing vs Borders

**Prefer spacing when:**
- Creating separation between related content
- Establishing visual hierarchy
- Adding breathing room

**Use borders when:**
- Spacing alone is insufficient
- Defining interactive element boundaries
- Indicating state changes

---

## Platform-Specific Spacing

For platform-specific spacing guidance:

- **Web** - See [types/web/](../types/web/)
- **Slides** - See [types/slides/](../types/slides/)
- **Graphics** - See [types/graphics/](../types/graphics/)

---

## Related Documentation

- [Borders](./borders.md) - Border philosophy and specifications
- [Typography](./typography.md) - Text spacing
