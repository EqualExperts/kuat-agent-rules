# Colour Rules

<!-- GENERATED FILE — DO NOT EDIT BY HAND.
     Produced by skills/scripts/generate-tokens.mjs from
     reference/design-language/tokens/colors.tokens.json (the source of truth).
     Change colours in the token file, then run `npm run tokens:generate`.
     CI runs `npm run tokens:check` and fails if this file drifts from the tokens. -->

Brand color specifications for Equal Experts. This document defines the brand colors, palette scales, and usage guidelines.

> **Source of truth:** the canonical colour tokens live **upstream in this repo** at [`tokens/colors.tokens.json`](./tokens/colors.tokens.json) (W3C design-tokens; brand palettes + aliases). **This document is generated from it** by `skills/scripts/generate-tokens.mjs`, and the downstream `@equal-experts/kuat-core` `variables.css` is generated from the same tokens — don't hand-edit either; change colours in the token file and regenerate. (kuat-core is downstream; never the reverse.) Support scales (slate/red/indigo) are *not* brand colours. Hex values below are the authoritative `…-500` brand values; full 50–950 scales + aliases live in the token file.

---

## Brand Colors

Equal Experts uses four core brand color palettes:

### EE Blue (Primary)

**Purpose:** Trust, professionalism, technology  
**Value:** `oklch(0.645 0.163 237.5)` / `#1795d4` (kuat-core `--ee-blue-500`)

**Use for:**
- Primary actions and CTAs
- Brand identity elements
- Key highlights and focus states
- Links and interactive elements

### Transform Teal (Secondary)

**Purpose:** Transformation, growth, innovation  
**Value:** `oklch(0.645 0.120 185.0)` / `#269c9e` (kuat-core `--transform-teal-500`)

**Use for:**
- Secondary actions
- Accent elements and badges
- Success indicators
- Data visualization (secondary)

### Tech Blue (Supporting)

**Purpose:** Technical, professional, structural  
**Value:** `oklch(0.435 0.090 240.0)` / `#22567c` (kuat-core `--tech-blue-500`)

**Use for:**
- Dark backgrounds
- Navigation areas
- Technical interfaces
- Depth and structure

### Equal Ember (Accent)

**Purpose:** Energy, warmth, attention  
**Value:** `oklch(0.625 0.200 65.0)` / `#f07c00` (kuat-core `--equal-ember-500`)

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

## Brand Aliases (semantic roles)

How the brand palettes map to semantic roles in kuat-core `variables.css`. **Use these aliases, not raw scale values.**

| Alias | Maps to | Hex |
|-------|---------|-----|
| `--primary` | EE Blue 500 | `#1795d4` |
| `--secondary` | Transform Teal 500 | `#269c9e` |
| `--sidebar` (dark nav) | Tech Blue 500 | `#22567c` |
| `--accent` (`--brand-ee-blue-accent`) | EE Blue 50 | `#e6f5fc` |
| `--foreground` (`--brand-dark-data`) | text dark | `#212526` |
| `--background` (`--brand-byte-white`) | white | `#ffffff` |
| `--muted` (`--brand-the-cloud`) | Slate 100 | `#f5f5f5` |
| `--destructive` | Red 600 | `#dc2626` |

Support scales (slate, red, indigo) back these aliases but are **not brand colours** — never use them directly as a brand colour.

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

- **Web product** - See [media-types/web-product/](../media-types/web-product/) for CSS variables and tokens
- **Web marketing** - See [media-types/web-marketing/](../media-types/web-marketing/)
- **Slides** - See [media-types/slides/](../media-types/slides/)
- **Graphics** - See [media-types/imagery/patterns/graphics/](../media-types/imagery/patterns/graphics/)
- **Charts** - See [media-types/charts-data/](../media-types/charts-data/)

---

## Related Documentation

- [Brand Guidelines](../brand/brand.md) - Brand principles
- [Typography](./typography.md) - Font colors and text styling
- [Logo](../brand/logo.md) - Logo color variants
