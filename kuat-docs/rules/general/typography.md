# Typography Rules

Typography specifications for Equal Experts. This document defines font families, type scale, and usage guidelines.

---

## Font Families

### Sans Serif (Default)

**Font:** Lexend  
**Fallback:** `Lexend, ui-sans-serif, sans-serif, system-ui`

**Use for:** All primary content - body text, headings, interface copy, presentations

### Serif

**Font:** Lora  
**Fallback:** `Lora, ui-serif, Georgia, serif`

**Use for:** Decorative text, special emphasis, editorial content (use sparingly)

### Monospace

**Font:** JetBrains Mono  
**Fallback:** `JetBrains Mono, ui-monospace, monospace`

**Use for:** Code blocks, technical content, data display

---

## Type Scale

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 12px | 16px | Labels, captions, metadata |
| sm | 14px | 20px | Secondary text, small body |
| base | 16px | 24px | Body text (default) |
| lg | 18px | 28px | Large body, subheadings |
| xl | 20px | 28px | Section headings |
| 2xl | 24px | 32px | Page headings |
| 3xl | 30px | 36px | Large headings |
| 4xl | 36px | 40px | Display text |
| 5xl | 48px | 1 | Hero headings |
| 6xl | 60px | 1 | Large hero text |
| 7xl | 72px | 1 | Extra large display |
| 8xl | 96px | 1 | Maximum display |

---

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| light | 300 | Large display text, subtle emphasis |
| normal | 400 | Default body text |
| medium | 500 | Form inputs, UI labels, subtle emphasis |
| semibold | 600 | Headings, important labels |
| bold | 700 | Strong emphasis, primary headings |
| extrabold | 800 | Maximum emphasis (use sparingly) |

### Recommended Weight Usage

- **Body Text:** 400 (normal)
- **Headings:** 600 (semibold) or 700 (bold)
- **Labels:** 500 (medium)
- **Display Text:** 300 (light) for large sizes, 700 (bold) for impact

---

## Typography Hierarchy

Establish clear visual hierarchy:

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| H1 | 4xl-5xl | bold | Main page/slide title |
| H2 | 2xl-3xl | semibold/bold | Section heading |
| H3 | xl-2xl | semibold | Subsection heading |
| Body | base | normal | Primary content |
| Supporting | sm | normal/medium | Secondary information |
| Labels/Captions | xs-sm | medium | Metadata, captions |

---

## Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| tighter | -0.05em | Tighter spacing |
| tight | -0.025em | Slightly tighter |
| normal | 0.01em | Default spacing |
| wide | +0.025em | Slightly wider |
| wider | +0.05em | Wider spacing |
| widest | +0.1em | Maximum spacing (all caps) |

---

## Line Height

| Name | Value | Usage |
|------|-------|-------|
| none | 1 | Tight spacing (large headings) |
| tight | 1.25 | Compact text |
| snug | 1.375 | Slightly tight |
| normal | 1.5 | Default body text |
| relaxed | 1.625 | Comfortable reading |
| loose | 2 | Generous spacing |

---

## Accessibility Requirements

- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** Minimum 3:1 contrast ratio
- **Proper heading hierarchy:** H1 → H2 → H3 (no skipping levels)
- **Minimum body text size:** 12px

---

## Usage Guidelines

### Do's

1. **Use Lexend for primary content** - It's the brand font
2. **Maintain hierarchy** - Visual styling matches content structure
3. **Stick to the scale** - Use defined sizes, not arbitrary values
4. **Ensure readability** - Sufficient contrast and line height
5. **Be consistent** - Same styles for same content types

### Don'ts

1. **Don't use arbitrary sizes** - Stick to the type scale
2. **Don't skip heading levels** - H1 → H3 is invalid
3. **Don't use low-contrast colors** - Verify accessibility
4. **Don't mix too many weights** - Keep it simple
5. **Don't use sizes smaller than 12px** - Maintain readability

---

## Platform-Specific Typography

For platform-specific typography guidance:

- **Web** - See [types/web/](../types/web/)
- **Slides** - See [types/slides/](../types/slides/)
- **Graphics** - See [types/graphics/](../types/graphics/)

---

## Related Documentation

- [Brand Guidelines](./brand.md) - Brand principles
- [Colours](./colours.md) - Text colors
- [Spacing](./spacing.md) - Text spacing patterns
