# Equal Experts Brand Guidelines - Agent Instructions

This repository contains brand guidelines and design system rules for creating Equal Experts branded content.

## How to Use This Repository

### 1. Always Load General Rules First

The `kuat-docs/rules/general/` directory contains universal brand and design language that applies to ALL platforms:

| File | Description |
|------|-------------|
| `brand.md` | Brand principles and identity |
| `logo.md` | Logo variants, sizing, placement |
| `content.md` | Writing style, tone, guidelines |
| `colours.md` | Brand color palette |
| `typography.md` | Fonts and type scale |
| `spacing.md` | Spacing system |
| `borders.md` | Border philosophy |
| `design-language.md` | General design principles |
| `accessibility.md` | Accessibility principles and guidelines |

### 2. Then Load Platform-Specific Rules

Based on what you're creating, load the appropriate type-specific rules:

| Task | Load From |
|------|-----------|
| Slides/Presentations | `kuat-docs/rules/types/slides/` |
| Photography | `kuat-docs/rules/types/photography/` |
| Icons | `kuat-docs/rules/types/graphics/icons.md` |
| Illustrations | `kuat-docs/rules/types/graphics/illustrations.md` |
| Infographics | `kuat-docs/rules/types/graphics/infographics.md` |
| Charts/Data Viz | `kuat-docs/rules/types/charts-data/` |
| Marketing Website | `kuat-docs/rules/types/web/marketing/` |
| Marketing Page Scenarios | `kuat-docs/rules/types/web/marketing/scenarios/` |
| Web Application | `kuat-docs/rules/types/web/product/` |
| Product Page Scenarios | `kuat-docs/rules/types/web/product/scenarios/` |

### 3. Platform Isolation Rules

**Important:** Type-specific rules should NOT reference each other.

- ✅ Slides can reference general rules
- ✅ Web/product can reference general rules
- ❌ Slides should NOT need web/product rules
- ❌ Graphics should NOT need web examples

This ensures each platform gets only relevant guidance.

---

## Quick Reference (When Full Docs Unavailable)

### Brand Colors
- **EE Blue:** `#0066CC` - Primary actions, brand
- **Transform Teal:** `oklch(0.645 0.120 185.0)` - Secondary actions
- **Tech Blue:** `oklch(0.435 0.090 240.0)` - Navigation, structure
- **Equal Ember:** `oklch(0.625 0.200 65.0)` - Warnings, highlights

### Typography
- **Sans:** Lexend
- **Mono:** JetBrains Mono
- **Serif:** Lora

### Spacing
4px base unit. Scale: 4, 8, 12, 16, 24, 32, 48px.

### Border Radius
- Static content: 0px
- Interactive (buttons): 6px
- Form inputs: 4px

### Accessibility
WCAG AA minimum contrast (4.5:1 for text, 3:1 for large text/graphics).

---

## Context Loading Examples

**Minimal (~100 lines):**
Load only the specific general rule file needed.

**Standard (~800 lines):**
Load entire `kuat-docs/rules/general/` directory.

**Full Web Product (~2000 lines):**
Load `kuat-docs/rules/general/` + `kuat-docs/rules/types/web/product/`.

**Full with Examples (~3500 lines):**
Above + `kuat-docs/rules/types/web/product/examples/`.

---

## Behavior Guidelines

When working on Equal Experts content:

1. **Check documentation first** before making design decisions
2. **Follow existing patterns** - do not invent new ones
3. **Use semantic tokens** - `bg-primary` not `#0066CC`
4. **Ask if unclear** - request clarification rather than guessing

---

## Full Documentation

See [kuat-docs/README.md](./kuat-docs/README.md) for complete documentation index.
