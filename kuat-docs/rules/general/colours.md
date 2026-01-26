# Colour Rules

Brand color specifications for Equal Experts. This document defines the brand colors, palette scales, and usage guidelines.

---

## Brand Colors

Equal Experts uses four core brand color palettes:

### EE Blue (Primary)

**Purpose:** Trust, professionalism, technology  
**Value:** `oklch(0.645 0.163 237.5)` / `#0066CC`

**Use for:**
- Primary actions and CTAs
- Brand identity elements
- Key highlights and focus states
- Links and interactive elements

### Transform Teal (Secondary)

**Purpose:** Transformation, growth, innovation  
**Value:** `oklch(0.645 0.120 185.0)`

**Use for:**
- Secondary actions
- Accent elements and badges
- Success indicators
- Data visualization (secondary)

### Tech Blue (Supporting)

**Purpose:** Technical, professional, structural  
**Value:** `oklch(0.435 0.090 240.0)`

**Use for:**
- Dark backgrounds
- Navigation areas
- Technical interfaces
- Depth and structure

### Equal Ember (Accent)

**Purpose:** Energy, warmth, attention  
**Value:** `oklch(0.625 0.200 65.0)`

**Use for:**
- Special highlights (use sparingly)
- Warning states
- Attention-grabbing elements
- Call-to-action emphasis

---

## Brand Color Palette Scale

Each brand color has a scale from 50 (lightest) to 950 (darkest):

| Range | Usage |
|-------|-------|
| 50-200 | Light backgrounds, subtle accents, hover states |
| 300-500 | Primary brand colors, main actions |
| 600-800 | Darker variants for depth and contrast |
| 900-950 | Maximum depth, dark mode, high contrast |

---

## Neutral Colors

For text, backgrounds, and UI elements:

| Color | Usage |
|-------|-------|
| White | Light backgrounds, text on dark |
| Slate-50 to Slate-200 | Light backgrounds, subtle borders |
| Slate-300 to Slate-500 | Secondary text, dividers |
| Slate-600 to Slate-800 | Primary text (light mode) |
| Slate-900 to Slate-950 | Headings, dark backgrounds |
| Black | Maximum contrast, specific uses |

---

## Color Format

All colors use **OKLCH** color space:

```
oklch(lightness chroma hue)
```

**Benefits:**
- Perceptual uniformity (equal changes = equal perception)
- Better color manipulation for consistent scales
- Modern format with excellent support

**Hex values** are provided for tools that don't support OKLCH.

---

## Light and Dark Mode

Colors should adapt for light and dark contexts:

**Light Mode (default):**
- Light backgrounds (white, light gray)
- Dark text (slate-900, slate-950)
- Brand colors at standard values

**Dark Mode:**
- Dark backgrounds (slate-900, slate-950)
- Light text (white, slate-100)
- Brand colors remain consistent
- Supporting colors adapt for contrast

---

## Accessibility Requirements

All color combinations must meet **WCAG AA** standards:

| Content Type | Minimum Contrast |
|--------------|------------------|
| Normal text (14px and below) | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| Graphical objects/borders | 3:1 |

**Approved Combinations:**
- Dark text on light backgrounds ✓
- White text on EE Blue ✓
- White text on Tech Blue ✓
- White text on Transform Teal ✓
- Dark text on Equal Ember (check contrast) ✓

---

## Usage Guidelines

### Do's

1. **Use brand colors consistently** - EE Blue for primary, Transform Teal for secondary
2. **Pair colors correctly** - Ensure sufficient contrast for text
3. **Support light and dark contexts** - Colors work in both modes
4. **Respect brand hierarchy** - Primary for main actions, secondary for alternatives
5. **Verify accessibility** - Always check contrast ratios

### Don'ts

1. **Don't use non-brand colors** - Stick to the defined palette
2. **Don't mix brand colors inappropriately** - Each has a specific purpose
3. **Don't break accessibility** - Always verify contrast ratios
4. **Don't create custom variations** - Use only defined palette values
5. **Don't use color alone to convey meaning** - Combine with text, icons, patterns

---

## Platform-Specific Implementation

For platform-specific color usage:

- **Web** - See [types/web/](../types/web/) for CSS variables and tokens
- **Slides** - See [types/slides/](../types/slides/)
- **Graphics** - See [types/graphics/](../types/graphics/)
- **Charts** - See [types/charts-data/](../types/charts-data/)

---

## Related Documentation

- [Brand Guidelines](./brand.md) - Brand principles
- [Typography](./typography.md) - Font colors and text styling
- [Logo](./logo.md) - Logo color variants
