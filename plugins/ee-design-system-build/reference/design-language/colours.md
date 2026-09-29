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
| `--destructive` | Runtime Red 600 | `#a3152b` |

Support scales (slate, red, indigo) back these aliases but are **not brand colours** — never use them directly as a brand colour.

---

## Extended Palette (exception-only)

Added in the June 2026 colours lockdown. **Core is primary; extended is exception-only** — see
[colour-usage.md](./colour-usage.md) for the tier model (data viz, keyed diagrams, small pull-outs).
Each is a flat peer scale (50–950), anchored at its measured lightness step, not forced to 500.

| Colour | Role | Value | Text on it |
|--------|------|-------|------------|
| Index Indigo | Info / call-out | `#352361` (step 800) | White |
| Packet Plum | Expressive accent / dark surface | `#853d7b` (step 600) | White |
| Runtime Red | Error / danger | `#a3152b` (step 600) | White |
| Uptime Green | Success | `#11821b` (step 500) | White |
| Server Slate | Near-neutral brand grey (distinct from the EE neutral scale) | `#4c5659` (step 600) | White |
| Logic Lime | Bright pull-out accent · display alias "Lime" | `#b1d923` (step 300) | Dark Data |
| Edge Blue | Hover/active state — light end of the 3-stage blue | `#a1c8e2` (step 200) | Dark Data |
| Signal Yellow | Bright pull-out accent · display alias "Sunflower" | `#ffd930` (step 300) | Dark Data |
| Cursor Coral | Decorative pull-out (not error) | `#ff5c5c` (step 400) | Dark Data |
| Patch Peach | Light warm pull-out accent | `#fca84e` (step 300) | Dark Data |

---

## EE Neutral Scale

Monotonic Byte White → Dark Data, distinct from Server Slate (a brand grey, not a UI neutral):

| Step | Value | Alias |
|------|-------|-------|
| 50 | `#ffffff` | **Byte White** |
| 100 | `#f5f5f5` | **The Cloud** |
| 200 | `#dbdbdb` |  |
| 300 | `#c1c2c2` |  |
| 400 | `#a7a9a9` |  |
| 500 | `#8f9192` |  |
| 600 | `#777a7a` | **Overcast** |
| 700 | `#606364` |  |
| 800 | `#4a4d4e` |  |
| 900 | `#35393a` |  |
| 950 | `#212526` | **Dark Data** |

---

## Semantic / RAG Colours

Cross-cutting roles that mean a *specific thing* and may appear in any scenario — reserved for
meaning, never reused decoratively. Always pair with an icon/shape/label (WCAG 1.4.1 — never
colour alone).

| Role | Value | Required text | Notes |
|------|-------|----------------|-------|
| Error / danger | `#a3152b` | White | 7.8:1 AAA · replaces support #dc2626 |
| Warning | `#f07c00` | Dark Data | 5.6:1 AA · white text FAILS (2.8:1) |
| Success | `#11821b` | White | 5.0:1 AA |
| Info / call-out | `#352361` | White | 13.4:1 AAA |
| Text link / small text | `#0080be` | is the text | WIP — ~97% of AA on white (4.34:1), deliberately close to EE Blue; strict-AA fallback #007cb9 |
| Interaction state (hover/active) | `#a1c8e2` | Dark Data | 8.8:1 AAA |
| Error, on dark surfaces | `#d98786` | — | lighter step for on-dark text |
| Success, on dark surfaces | `#72b070` | — | lighter step for on-dark text |
| Info, on dark surfaces | `#a49ec1` | — | lighter step for on-dark text |

---

## Data Visualisation — Categorical Order

Tier 3 sequence for charts/data viz only. Use in order; stop when there are enough categories.
CVD-checked, lightness-separated. Never place EE Blue and Transform Teal adjacent.

1. **EE Blue** `#1795d4`
2. **Equal Ember** `#f07c00`
3. **Tech Blue** `#22567c`
4. **Logic Lime** `#b1d923`
5. **Packet Plum** `#853d7b`
6. **Edge Blue** `#a1c8e2`
7. **Runtime Red** `#a3152b`
8. **Signal Yellow** `#ffd930`

---

## Pairing Summary

**Dark surfaces (white text):** Index Indigo, Packet Plum, Runtime Red, Uptime Green, Server Slate, Dark Data.

**Bright surfaces (Dark Data text):** Logic Lime, Edge Blue, Signal Yellow, Cursor Coral, Patch Peach, EE Blue, Transform Teal, Equal Ember.

**Do not pair:**
- EE Blue `#1795d4` and Transform Teal `#269c9e` adjacent in a categorical sequence — 1.01:1 luminance, indistinguishable in greyscale/CVD.
- The Fruity combination (Runtime Red, Cursor Coral, Uptime Green, Logic Lime, Signal Yellow, Patch Peach) for any data encoding — collapses under protanopia. Decoration only.
- White text on Equal Ember `#f07c00` — fails at 2.8:1; use Dark Data.

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
