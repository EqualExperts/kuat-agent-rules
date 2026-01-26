# Border Rules

Border specifications for Equal Experts. This document defines border philosophy, widths, radius, and usage guidelines.

---

## Overview

The design system follows a **minimal border philosophy** - borders should only be used when necessary. Prefer spacing and visual hierarchy over borders.

**Key Principle:** Use borders sparingly and purposefully. Spacing and visual hierarchy should be the primary tools for creating separation.

---

## When to Use Borders

### Use Borders For:

1. **Creating separation** between distinct sections needing clear boundaries
2. **Distinguishing interactive elements** from static content
3. **Defining component boundaries** where spacing alone is insufficient
4. **Indicating state changes** (focus states, error states, selection)

### Avoid Borders When:

- Spacing alone can create sufficient separation
- Visual hierarchy (size, color, weight) can distinguish elements
- The border would create visual clutter
- Separation is already clear through other design elements

---

## Border Width

Borders should be **1-4px** in width:

| Width | Usage |
|-------|-------|
| 1px | Default for most elements (cards, dividers) |
| 2px | Emphasized borders, active states |
| 3-4px | Focus indicators, high-contrast separations |

---

## Border Style

**Always use solid lines.**

The design system does not use:
- Dashed borders
- Dotted borders
- Other border styles

---

## Border Color

Use brand-appropriate colors:

| Usage | Color |
|-------|-------|
| Default borders | Light gray (slate-200 light, slate-700 dark) |
| Focus indicators | EE Blue or appropriate focus color |
| Error states | Red/destructive color |
| Success states | Transform Teal |

---

## Border Radius

The design system uses a **minimal radius approach**:

### Default: 0px (No Radius)

Most elements have **no border radius** by default for a clean, modern, geometric aesthetic.

**Elements with no radius:**
- Static containers
- Sections
- Dividers
- Content blocks

### Interactive Elements: 6px

**Interactive elements** use **6px border radius**:

- Buttons
- Clickable cards
- Interactive tiles
- Tabs

### Form Inputs: 4px

**Form input elements** use **4px border radius**:

- Text inputs
- Textareas
- Select dropdowns
- Search inputs

### Summary

| Element Type | Border Radius |
|--------------|---------------|
| Static content | 0px |
| Interactive elements | 6px |
| Form inputs | 4px |

---

## Accessibility

### Contrast Requirements

Borders must meet WCAG 2.1 Level AA for graphical objects:

- **Minimum contrast ratio:** 3:1 against adjacent colors

### Testing

- Test borders against background colors
- Verify visibility in both light and dark contexts
- Ensure sufficient contrast for all users

---

## Usage Guidelines

### Do's

1. **Use borders purposefully** - Only when spacing is insufficient
2. **Follow width guidelines** - 1px default, 2px emphasized, 3-4px focus
3. **Apply radius correctly** - 0px static, 6px interactive, 4px inputs
4. **Ensure accessibility** - 3:1 minimum contrast ratio
5. **Be consistent** - Same border treatment for same element types

### Don'ts

1. **Don't overuse borders** - Spacing should be the first option
2. **Don't use non-solid borders** - No dashed or dotted
3. **Don't use arbitrary radius** - Only 0px, 4px, or 6px
4. **Don't break accessibility** - Always verify contrast
5. **Don't use decorative borders** - Keep them functional

---

## Platform-Specific Borders

For platform-specific border guidance:

- **Web** - See [types/web/](../types/web/)
- **Graphics** - See [types/graphics/](../types/graphics/)

---

## Related Documentation

- [Spacing](./spacing.md) - Spacing as alternative to borders
- [Colours](./colours.md) - Border colors
