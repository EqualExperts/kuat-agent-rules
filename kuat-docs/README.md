# Equal Experts Agent Rules

Brand guidelines and design system documentation for AI agents and content creators.

## Overview

This repository provides comprehensive rules for **creating and reviewing** Equal Experts branded content across all platforms - from slides and graphics to web applications.

**Architecture:**
- **Foundations** - Universal brand, design, and content rules for ALL platforms
- **Type-Specific Rules** - Platform-specific guidelines (web, slides, graphics, etc.)

---

## Quick Start

### For AI Agents

**Minimum context:** Load relevant files from [rules/foundations/](./rules/foundations/)

**For specific platforms:**
1. Determine **intent** (review | create) — load [skills/](./skills/) (`kuat-review` or `kuat-create`); run [ensure-rules.sh](./skills/scripts/ensure-rules.sh)
2. Load foundations from resolved `RULES_DIR`
3. Load role card: [brand-reviewer](./rules/roles/brand-reviewer.md) for review; task role for create — see [rules/roles/README.md](./rules/roles/README.md)
4. Load type-specific rules — see [rules/LOADING.md](./rules/LOADING.md)

| Intent | Skill | Role (typical) |
|--------|-------|----------------|
| Review | [kuat-review](./skills/kuat-review/SKILL.md) | [brand-reviewer](./rules/roles/brand-reviewer.md) |
| Create | [kuat-create](./skills/kuat-create/SKILL.md) | Task-specific (e.g. icon, infographic) |

| Task | Load Foundations | Load Type-Specific |
|------|------------------|-------------------|
| Slides | brand, logo, design, content | [types/slides/](./rules/types/slides/) |
| Marketing website | brand, logo, design, content | [types/web/marketing/](./rules/types/web/marketing/) |
| Web application | all foundations | [types/web/product/](./rules/types/web/product/) |
| Infographic | brand, design | [types/graphics/infographics.md](./rules/types/graphics/infographics.md) |
| Photography | brand | [types/photography/](./rules/types/photography/) |

---

## Documentation Structure

### Skills (repo root)

Review and create procedures (tool-agnostic; load by intent):

| Path | Description |
|------|-------------|
| [skills/](./skills/) | [INSTALL.md](./skills/INSTALL.md) (setup + tests), [kuat-review](./skills/kuat-review/SKILL.md), [kuat-create](./skills/kuat-create/SKILL.md) |

### Role Cards

Reusable role personas and task → role mapping:

| Path | Description |
|------|-------------|
| [rules/roles/](./rules/roles/) | Brand Reviewer (review), Technical Illustrator, Icon Designer; see [roles/README.md](./rules/roles/README.md) |

### Foundations (All Platforms)

Universal brand, design, and content:

| Path | Description |
|------|-------------|
| [rules/foundations/](./rules/foundations/) | Brand, logo, accessibility; design/ and content/ subdirs |
| [rules/foundations/design/](./rules/foundations/design/) | Design language, colours, typography, spacing, borders |
| [rules/foundations/content/](./rules/foundations/content/) | Voice and tone, writing style, formatting, numbers, punctuation |

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
Brand identity, design language, and platform-specific rules for creating and reviewing consistent, branded content.

**When to use it:**
You MUST reference these guidelines when:
- Creating or reviewing Equal Experts branded content
- Making design decisions (colors, typography, spacing)
- Writing content (marketing or product)
- Building web applications

**How to use it:**
1. Determine intent (review | create); load skills/kuat-review or kuat-create
2. Run skills/scripts/ensure-rules.sh; load foundations from RULES_DIR
3. Load platform-specific rules for your output type
4. On review: run skill intake before findings
5. Follow existing patterns; do not invent new ones

**Documentation index:**
- `rules/foundations/` - Universal brand, design, and content rules
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
| Minimal | Single foundation rule file | ~100 lines |
| Standard | `rules/foundations/` directory | ~800 lines |
| Full (web) | `rules/foundations/` + `rules/types/web/product/` | ~2000 lines |

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
