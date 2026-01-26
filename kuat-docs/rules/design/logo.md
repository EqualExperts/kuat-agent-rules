# Logo Rules

Pure logo usage specifications for the Kuat Design System. This document defines logo composition, sizing, variants, and placement guidelines - independent of framework.

---

## Overview

The Equal Experts logo is a core brand asset that must be used consistently and correctly.

**Key Principle:** Always use official logo assets. Never recreate, modify, or distort the logo.

---

## Logo Composition

The logo consists of two elements:

1. **Brand mark:** Square brackets containing an equals sign `[=]` in blue
2. **Wordmark:** "EQUAL EXPERTS" text in dark gray/charcoal

**Rule:** These elements should always be used together unless space constraints require the brand mark only.

---

## Size Requirements

### Minimum Sizes

| Medium | Minimum Width |
|--------|---------------|
| Digital | 100px |
| Print | 26.5mm |

**Never scale below minimums.** If space is constrained, use brand mark only.

### Recommended Sizes

| Context | Width |
|---------|-------|
| Desktop headers | 120-150px |
| Mobile headers | 100-120px |
| Footers | 100-120px |
| Favicons/Icons | Brand mark only |

---

## Clear Space

The logo requires breathing room equal to the width of **one bracket and the equals sign** on all sides.

This ensures visual prominence and brand recognition.

---

## Color Variants

### Primary Logos (Default)

Always prefer primary logos for maximum brand recognition:

| Variant | File | Background | Brand Mark | Wordmark |
|---------|------|------------|------------|----------|
| Full color | `logo-colour.svg` | Light | Blue | Dark gray |
| White text | `logo-white-text.svg` | Dark | Blue | White |

### Monochrome Logos (Secondary)

Use only when primary logos cannot be used:

| Variant | File | Background | Usage |
|---------|------|------------|-------|
| White | `logo-monochrome-white.svg` | Dark | When primary contrast is insufficient |
| Black | `logo-monochrome-black.svg` | Light | When monochrome is specifically required |

### Selection Guide

| Background | First Choice | Second Choice |
|------------|--------------|---------------|
| Light (white, light gray) | `logo-colour.svg` | `logo-monochrome-black.svg` |
| Dark (Tech Blue, slate-900) | `logo-white-text.svg` | `logo-monochrome-white.svg` |
| Brand (EE Blue) | `logo-white-text.svg` | `logo-monochrome-white.svg` |

---

## Brand Mark Only

The brand mark (without wordmark) should only be used when:

1. **Space is severely limited** (favicons, small icons)
2. **Shape requirements** (must fit square/circular shape)
3. **Decorative use** (design element in presentations)
4. **Context is clear** (obviously represents Equal Experts)

---

## Usage Guidelines

### Do's

1. **Use official assets** from the brand-assets repository
2. **Maintain size requirements** - minimum 100px digital
3. **Provide adequate clear space** - bracket+equals width on all sides
4. **Choose appropriate variant** based on background color
5. **Ensure accessibility** - sufficient contrast, test in both modes

### Don'ts

1. **Don't transform** - No rotation, distortion, skewing
2. **Don't modify colors** - Use only official variants
3. **Don't alter composition** - Don't add text, separate elements
4. **Don't compromise visibility** - No busy backgrounds, no undersizing
5. **Don't create variations** - No custom colors or effects

---

## Layout Placement

### Marketing Layouts

- **Header:** Full-color logo, left-aligned, 120-150px
- **Footer:** Full-color logo, 100-120px, centered or left-aligned
- **Background:** Light (white, light gray)

### Product/App Layouts

- **Horizontal nav:** White monochrome, left-aligned, 120-150px
- **Sidebar:** White monochrome, top of sidebar, 120-150px
- **Background:** Dark (Tech Blue)

---

## Responsive Considerations

| Screen Size | Logo Treatment |
|-------------|----------------|
| Desktop | Full logo, 120-150px |
| Tablet | Full logo, 100-120px |
| Mobile | Full logo if space allows, brand mark if constrained |

**Never sacrifice minimum size** - use brand mark only if needed.

---

## Official Logo Assets

All logos are available in the [Equal Experts brand-assets repository](https://github.com/EqualExperts/brand-assets/tree/master/logo).

### Primary Logos
- `logo-colour.svg` - Full color (light backgrounds)
- `logo-white-text.svg` - Blue mark, white text (dark backgrounds)

### Monochrome Logos
- `logo-monochrome-white.svg` - All white (dark backgrounds)
- `logo-monochrome-black.svg` - All black (light backgrounds)

### Brand Marks
- `brand-mark-blue.svg` - Blue mark without text
- `brand-mark-monochrome-white.svg` - White mark without text

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/logo.md](../../examples/react/logo.md) |
| Vue | [examples/vue/logo.md](../../examples/vue/logo.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Use `<img>` element with proper `alt` text
- Reference SVG files from brand-assets repository or local assets
- Apply size constraints with CSS/classes
