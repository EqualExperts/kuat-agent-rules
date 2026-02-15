# Equal Experts Brand Guidelines - Agent Instructions

This repository contains brand guidelines and design system rules for creating Equal Experts branded content.

## Load Order and Task → Files

**For load order and task → rules mapping, see the canonical index:** [kuat-docs/rules/LOADING.md](./kuat-docs/rules/LOADING.md)

That index defines:
- Which general rule files to load (or "all general")
- Which type-specific paths to load per task (slides, web_product, web_marketing, icons, etc.)
- Optional paths (scenarios, framework examples) and when to include them

### Platform isolation

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

For context size (minimal, standard, full, full+examples), see [LOADING.md](./kuat-docs/rules/LOADING.md#context-size-reference).

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
