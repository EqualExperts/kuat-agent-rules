# Equal Experts Agent Rules

Brand guidelines and design system documentation for AI agents and content creators.

## Overview

This repository provides comprehensive rules for creating Equal Experts branded content across all platforms - from slides and graphics to web applications.

**Architecture:**
- **General Rules** - Universal brand and design language for ALL platforms
- **Type-Specific Rules** - Platform-specific guidelines (web, slides, graphics, etc.)

---

## Quick Start

### For AI Agents

**Minimum context:** Load relevant files from [rules/general/](./rules/general/)

**For specific platforms:**
1. Load general rules first
2. Then load type-specific rules

| Task | Load General | Load Type-Specific |
|------|--------------|-------------------|
| Creating slides | brand, logo, colours, typography | [types/slides/](./rules/types/slides/) |
| Marketing website | brand, logo, colours, typography, content | [types/web/marketing/](./rules/types/web/marketing/) |
| Web application | all general rules | [types/web/product/](./rules/types/web/product/) |
| Infographic | brand, logo, colours, typography | [types/graphics/infographics.md](./rules/types/graphics/infographics.md) |
| Photography | brand | [types/photography/](./rules/types/photography/) |

---

## Documentation Structure

### General Rules (All Platforms)

Universal brand and design language:

| File | Description |
|------|-------------|
| [rules/general/brand.md](./rules/general/brand.md) | Equal Experts brand principles |
| [rules/general/logo.md](./rules/general/logo.md) | Logo variants, sizing, placement |
| [rules/general/content.md](./rules/general/content.md) | Writing style, tone, guidelines |
| [rules/general/design-language.md](./rules/general/design-language.md) | Design principles |
| [rules/general/colours.md](./rules/general/colours.md) | Brand color palette |
| [rules/general/typography.md](./rules/general/typography.md) | Fonts and type scale |
| [rules/general/spacing.md](./rules/general/spacing.md) | Spacing system |
| [rules/general/borders.md](./rules/general/borders.md) | Border philosophy |

### Type-Specific Rules

Platform-specific guidelines:

| Platform | Directory | Description |
|----------|-----------|-------------|
| Slides | [rules/types/slides/](./rules/types/slides/) | Presentation decks |
| Photography | [rules/types/photography/](./rules/types/photography/) | Photo guidelines |
| Graphics | [rules/types/graphics/](./rules/types/graphics/) | Icons, illustrations, infographics |
| Charts & Data | [rules/types/charts-data/](./rules/types/charts-data/) | Data visualization |
| Web Marketing | [rules/types/web/marketing/](./rules/types/web/marketing/) | Marketing websites and emails |
| Web Product | [rules/types/web/product/](./rules/types/web/product/) | Web applications |

### Setup (Web Applications)

Integration guides for web development:

| File | Description |
|------|-------------|
| [setup/integration.md](./setup/integration.md) | Integration patterns for IDEs and agents |
| [setup/verification.md](./setup/verification.md) | Testing your setup |

---

## For AI Agents

### Quick Setup: Add to Your Existing Rules

Copy this snippet into your `.cursorrules`, `CLAUDE.md`, or similar agent configuration:

```markdown
## Equal Experts Brand Guidelines

This project follows Equal Experts brand guidelines.

**What it provides:**
Brand identity, design language, and platform-specific rules for creating consistent, branded content.

**When to use it:**
You MUST reference these guidelines when:
- Creating any Equal Experts branded content
- Making design decisions (colors, typography, spacing)
- Writing content (marketing or product)
- Building web applications

**How to use it:**
1. Check general rules first for brand and design language
2. Load platform-specific rules for your output type
3. Follow existing patterns; do not invent new ones

**Documentation index:**
- `rules/general/` - Universal brand and design rules
- `rules/types/slides/` - Presentation guidelines
- `rules/types/photography/` - Photo guidelines
- `rules/types/graphics/` - Icons, illustrations, infographics
- `rules/types/web/marketing/` - Marketing websites
- `rules/types/web/product/` - Web applications

**Quick reference:**
- Brand colors: EE Blue (#0066CC), Transform Teal, Tech Blue, Equal Ember
- Font: Lexend (sans), JetBrains Mono (code), Lora (editorial)
- Spacing: 4px base unit (8, 16, 24, 32, 48px scale)
- Border radius: 0px static, 6px interactive, 4px inputs
```

### Context Loading Strategies

| Level | What | Size |
|-------|------|------|
| Minimal | Single general rule file | ~100 lines |
| Standard | `rules/general/` directory | ~800 lines |
| Full (web) | `rules/general/` + `rules/types/web/product/` | ~2000 lines |

---

## Quick Reference

### Brand Colors

| Color | Value | Usage |
|-------|-------|-------|
| EE Blue | `#0066CC` | Primary actions, brand |
| Transform Teal | `oklch(0.645 0.120 185.0)` | Secondary actions |
| Tech Blue | `oklch(0.435 0.090 240.0)` | Navigation, structure |
| Equal Ember | `oklch(0.625 0.200 65.0)` | Warnings, highlights |

### Typography

| Element | Specification |
|---------|---------------|
| Sans | Lexend (`font-sans`) |
| Mono | JetBrains Mono (`font-mono`) |
| Serif | Lora (`font-serif`) |

### Spacing

4px base unit. Use scale: 4, 8, 12, 16, 24, 32, 48px.

### Border Radius

| Element | Radius |
|---------|--------|
| Static content | 0px |
| Interactive (buttons) | 6px |
| Form inputs | 4px |

---

## Platform Isolation

Type-specific rules are isolated from each other:

- ✅ Slides reference general rules
- ✅ Web/product references general rules
- ❌ Slides do NOT reference web/product rules
- ❌ Graphics do NOT reference web examples

This ensures:
- Slides don't need to understand Kuat-react
- Infographics don't need web component patterns
- Each platform gets only relevant guidance

---

## Related Documentation

- [Rules Directory](./rules/) - All rules documentation
- [Setup Guide](./setup/integration.md) - Integration instructions
- [Verification Guide](./setup/verification.md) - Test your setup
