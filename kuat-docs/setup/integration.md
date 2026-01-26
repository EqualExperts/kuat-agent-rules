# Integration Guide

How to integrate the Equal Experts brand guidelines into your AI agent or IDE.

---

## Quick Start: Add to Your Existing Rules

Most developers already have `.cursorrules`, `CLAUDE.md`, or similar agent configuration. **Copy this snippet** into your existing file:

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
- `rules/general/brand.md` - Brand principles
- `rules/general/logo.md` - Logo usage
- `rules/general/colours.md` - Color palette
- `rules/general/typography.md` - Fonts and type scale
- `rules/general/content.md` - Writing guidelines
- `rules/types/web/product/` - Web application rules
- `rules/types/web/marketing/` - Marketing website rules
- `rules/types/slides/` - Presentation guidelines
- `rules/types/graphics/` - Graphics guidelines

**Quick reference (when docs unavailable):**
EE Blue (#0066CC), Lexend font, 4px spacing unit, 6px radius for buttons, WCAG AA contrast.
```

---

## Directory Structure

```
rules/
├── general/                    # Universal rules for ALL platforms
│   ├── brand.md                # Brand principles
│   ├── logo.md                 # Logo guidelines
│   ├── content.md              # Writing style
│   ├── design-language.md      # Design principles
│   ├── colours.md              # Color palette
│   ├── typography.md           # Typography
│   ├── spacing.md              # Spacing system
│   └── borders.md              # Border philosophy
│
└── types/                      # Platform-specific rules
    ├── slides/                 # Presentations
    ├── photography/            # Photography
    ├── graphics/               # Icons, illustrations, infographics
    ├── charts-data/            # Data visualization
    └── web/                    # Websites and applications
        ├── marketing/          # Marketing websites
        └── product/            # Web applications
            ├── design.md
            ├── component-decision-tree.md
            ├── technical.md
            └── examples/       # React, Vue, CSS examples
```

---

## Context Loading Strategies

### By Platform Type

| Task | Load General | Load Type-Specific |
|------|--------------|-------------------|
| Slides | brand, logo, colours, typography, content | types/slides/ |
| Photography | brand | types/photography/ |
| Icons | brand, colours | types/graphics/icons.md |
| Infographics | brand, colours, typography | types/graphics/infographics.md |
| Charts | colours, typography | types/charts-data/ |
| Marketing website | brand, logo, colours, typography, content | types/web/marketing/ |
| Web application | all general rules | types/web/product/ |

### By Context Size

| Level | What | Size |
|-------|------|------|
| Minimal | Single general rule file | ~100 lines |
| Standard | `rules/general/` directory | ~800 lines |
| Full (web product) | `rules/general/` + `rules/types/web/product/` | ~2000 lines |
| Full (web product + examples) | Above + `rules/types/web/product/examples/` | ~3500 lines |

---

## IDE-Specific Instructions

### Cursor IDE

Add the snippet to your `.cursorrules` file in the project root.

### Claude Code / CLAUDE.md

Add the snippet to your `CLAUDE.md` file in the project root.

### GitHub Copilot

Add the snippet to `.github/copilot-instructions.md`.

### Claude Projects

Upload the snippet as a knowledge file, or upload specific rule files from `rules/`.

### Windsurf / Other IDEs

Add the snippet to your IDE's agent configuration file.

---

## For Local Documentation

Clone the docs locally for full access:

```bash
git clone https://github.com/equalexperts/kuat-agent-docs.git
cd kuat-agent-docs
```

Then update your rules to reference local files:

```markdown
## Equal Experts Brand Guidelines

When creating Equal Experts content, reference the rules in `kuat-docs/rules/`.

- General rules: `kuat-docs/rules/general/`
- Platform-specific: `kuat-docs/rules/types/{platform}/`
```

---

## Verification

Test your setup with these prompts:

- "Create a slide deck" → Agent should reference general rules + slides rules
- "What color for the primary button?" → Agent should check general/colours.md
- "Build a web application header" → Agent should check types/web/product/design.md
- "Write marketing copy" → Agent should check general/content.md + types/web/marketing/

See [verification.md](./verification.md) for comprehensive tests.

---

## Platform Isolation

Type-specific rules are isolated from each other:

- ✅ Slides reference general rules
- ✅ Web/product references general rules  
- ❌ Slides do NOT reference web/product rules
- ❌ Graphics do NOT reference web examples

This ensures each platform gets only relevant guidance.

---

## Related Documentation

- [Verification Guide](./verification.md) - Test your setup
- [Rules](../rules/) - All rules documentation
