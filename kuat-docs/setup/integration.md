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
- `rules/foundations/brand.md` - Brand principles
- `rules/foundations/logo.md` - Logo usage
- `rules/foundations/design/colours.md` - Color palette
- `rules/foundations/design/typography.md` - Fonts and type scale
- `rules/foundations/content/` - Writing and style guidelines
- `rules/types/web/product/` - Web application rules
- `rules/types/web/marketing/` - Marketing website rules
- `rules/types/slides/` - Presentation guidelines
- `rules/types/graphics/` - Graphics guidelines

**Quick reference (when docs unavailable):**
EE Blue (#0066CC), Lexend font, 4px spacing unit, 6px radius for buttons, WCAG AA contrast.
```

---

## Rules and loading

**Canonical loading index:** [kuat-docs/rules/LOADING.md](../kuat-docs/rules/LOADING.md)

Use the loading index for:
- Task → required general and type-specific paths
- Optional paths (scenarios, examples) and when to include them
- Context size reference (minimal, standard, full)

Directory layout: `rules/foundations/` (universal) and `rules/types/` (platform-specific). See [rules/README.md](../kuat-docs/rules/README.md) for structure.

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

- Foundations: `kuat-docs/rules/foundations/`
- Platform-specific: `kuat-docs/rules/types/{platform}/`
```

---

## Verification

Test your setup with these prompts:

- "Create a slide deck" → Agent should reference general rules + slides rules
- "What color for the primary button?" → Agent should check foundations/design/colours.md
- "Build a web application header" → Agent should check types/web/product/design.md
- "Write marketing copy" → Agent should check foundations/content/ + types/web/marketing/content/

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
