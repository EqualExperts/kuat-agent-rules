# Border Rules

Pure border specifications for the Kuat Design System. This document defines border philosophy, widths, radius, and usage guidelines - independent of framework.

---

## Overview

The design system follows a **minimal border philosophy** - borders should only be used when necessary. Prefer spacing and visual hierarchy over borders.

**Key Principle:** Use borders sparingly and purposefully. Spacing and visual hierarchy should be the primary tools for creating separation.

---

## When to Use Borders

### Use Borders For:

1. **Creating separation** between distinct sections needing clear boundaries
2. **Distinguishing interactive elements** from static content (inputs, clickable cards)
3. **Defining component boundaries** where spacing alone is insufficient
4. **Indicating state changes** (focus states, error states)

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
| 1px | Default for most UI elements (cards, inputs, dividers) |
| 2px | Emphasized borders, active states |
| 3-4px | Focus rings, high-contrast separations |

---

## Border Style

**Always use solid lines.**

The design system does not use:
- Dashed borders
- Dotted borders
- Other border styles

---

## Border Color

Use semantic color tokens:

| Token | CSS Variable | Usage |
|-------|--------------|-------|
| border | `--border` | Default borders (slate-200 light, slate-700 dark) |
| input | `--input` | Form input borders |
| ring | `--ring` | Focus rings |
| destructive | `--destructive` | Error state borders |

---

## Border Radius

The design system uses a **minimal radius approach**:

### Default: 0px (No Radius)

Most elements have **no border radius** by default for a clean, modern, geometric aesthetic.

**Elements with no radius:**
- Cards (static)
- Containers
- Sections
- Dividers
- Static content blocks

### Interactive Elements: 6px

**Interactive elements** that users can click use **6px border radius**:

- Buttons (all types)
- Clickable cards
- Interactive tiles
- Tabs
- Navigation items

### Form Inputs: 4px

**Form input elements** use **4px border radius**:

- Text inputs
- Textareas
- Select dropdowns
- Search inputs
- Number inputs
- Date pickers

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

The default `border` token meets these requirements against both light and dark backgrounds.

### Testing

- Test borders against background colors
- Verify visibility in both light and dark modes
- Use DevTools accessibility features to verify contrast

---

## Usage Guidelines

### Do's

1. **Use borders purposefully** - Only when spacing is insufficient
2. **Follow width guidelines** - 1px default, 2px emphasized, 3-4px focus rings
3. **Apply radius correctly** - 0px static, 6px interactive, 4px inputs
4. **Use semantic tokens** - `border-border`, `border-input`, `border-destructive`
5. **Ensure accessibility** - 3:1 minimum contrast ratio

### Don'ts

1. **Don't overuse borders** - Spacing should be the first option
2. **Don't use non-solid borders** - No dashed or dotted
3. **Don't use arbitrary radius** - Only 0px, 4px, or 6px
4. **Don't break accessibility** - Always verify contrast
5. **Don't hardcode values** - Use semantic tokens

---

## Common Patterns

### Card Borders

**Static card:** 1px border, no radius
**Clickable card:** 1px border, 6px radius

### Form Input Borders

**Default:** 1px border, 4px radius  
**Focus:** Add 2-4px ring with `ring` token  
**Error:** 2px border with `destructive` token

### Dividers

**Horizontal:** 1px border-top, no radius  
**Vertical:** 1px border-left, no radius

### Focus Rings

Use 2-4px ring with `ring` token for keyboard focus indication.

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/borders.md](../../examples/react/borders.md) |
| Vue | [examples/vue/borders.md](../../examples/vue/borders.md) |
| CSS | [examples/css/borders.md](../../examples/css/borders.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Tailwind classes: `border`, `border-border`, `rounded-[6px]`, `focus:ring-2`
- CSS variables: `var(--border)`, `var(--radius)`
