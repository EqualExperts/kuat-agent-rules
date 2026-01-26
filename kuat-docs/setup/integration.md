# Integration Guide

How to integrate the Kuat Design System documentation into your AI agent or IDE.

> **Note for npm consumers:** These docs are not bundled in npm packages. Clone from the [kuat-mono repository](https://github.com/equalexperts/kuat-mono) or copy the snippet below.

---

## Quick Start: Add to Your Existing Rules

Most developers already have `.cursorrules`, `CLAUDE.md`, or similar agent configuration. **Copy this snippet** into your existing file:

```markdown
## Kuat Design System

This project uses the Kuat Design System for all UI work.

**What it provides:**
Design tokens, component patterns, layout guidance, and content guidelines for building consistent, accessible interfaces.

**When to use it:**
You MUST reference the Kuat documentation when:
- Creating or modifying UI components
- Making color, typography, spacing, or layout decisions
- Writing user-facing content

**How to use it:**
1. Check the documentation before making design decisions
2. Follow existing patterns; do not invent new ones
3. If the documentation doesn't cover your case, ask before proceeding

**Documentation index:**
- `rules/design/colours.md` - Brand colors, semantic tokens, color usage
- `rules/design/typography.md` - Fonts, type scale, text styles
- `rules/design/spacing.md` - 8-point grid, margins, padding
- `rules/design/borders.md` - Border radius, border styles
- `rules/design/layouts.md` - Page layouts, navigation patterns
- `rules/design/logo.md` - Logo usage and placement
- `rules/components/patterns.md` - Component naming, variants, accessibility
- `rules/content/foundations.md` - Voice, tone, universal writing principles
- `rules/content/product-ux.md` - Product and UX writing guidelines
- `rules/content/marketing-sales.md` - Marketing content guidelines
- `examples/react/` - React implementation examples
- `examples/vue/` - Vue implementation examples

**Quick reference (when docs unavailable):**
Semantic tokens only (`bg-primary` not `bg-blue-500`), 8-point spacing grid, 6px radius for interactive elements, WCAG AA contrast.

**Documentation:** https://github.com/equalexperts/kuat-mono/tree/master/kuat-docs
```

This tells your agent **when** to use the design system and **how** to behave when making UI decisions.

---

## Alternative: Generation Prompt

If you prefer your agent to customize the integration, use this prompt:

```
I'm using the Kuat Design System. Add a section to my agent rules that:
- Defines when the agent must reference Kuat documentation
- Specifies behavioral expectations (check docs first, follow patterns)
- Includes a fallback reference for when docs are unavailable
- Links to the full documentation

Reference: https://github.com/equalexperts/kuat-mono/tree/master/kuat-docs

**Documentation index:**
- `rules/design/overview.md` - Design system principles and philosophy
- `rules/design/colours.md` - Brand colors, semantic tokens, color usage
- `rules/design/typography.md` - Fonts, type scale, text styles
- `rules/design/spacing.md` - 8-point grid, margins, padding
- `rules/design/borders.md` - Border radius, border styles
- `rules/design/layouts.md` - Page layouts, navigation patterns
- `rules/design/logo.md` - Logo usage and placement guidelines
- `rules/components/patterns.md` - Component naming, variants, accessibility
- `rules/content/foundations.md` - Voice, tone, writing principles
- `rules/content/product-ux.md` - Product and UX writing guidelines
- `rules/content/marketing-sales.md` - Marketing content guidelines
- `examples/react/` - React implementation examples
- `examples/vue/` - Vue implementation examples
- `examples/css/` - Vanilla CSS examples
```

---

## For Deeper Integration

If you need the agent to reference full documentation (component patterns, layouts, content guidelines), clone the docs locally:

```bash
# Clone only the docs (sparse checkout)
git clone --filter=blob:none --sparse https://github.com/equalexperts/kuat-mono.git
cd kuat-mono
git sparse-checkout set kuat-docs

# Copy to your project
cp -r kuat-docs /path/to/your-project/
```

Then update your rules snippet to reference local files:

```markdown
## Kuat Design System

When working on UI, reference the design rules in `kuat-docs/rules/`.

For implementation examples, see `kuat-docs/examples/{react|vue|css}/`.
```

---

## Directory Structure

```
kuat-docs/
├── rules/                 # Pure design language (no code)
│   ├── design/            # Colors, typography, spacing, borders, layouts
│   ├── content/           # Voice, tone, marketing, UX writing
│   └── components/        # Naming, variants, accessibility patterns
├── examples/              # Framework-specific code
│   ├── react/             # React/JSX examples
│   ├── vue/               # Vue SFC examples
│   └── css/               # Vanilla CSS examples
└── setup/                 # Integration guides (this directory)
```

---

## Context Loading Strategies

### Minimal (Snippet Only)

**Best for:** Most projects

Use the snippet above. Your agent has the key values and can reference the GitHub docs when needed.

### Standard (Local Rules)

**Best for:** Heavy design system usage

Clone `kuat-docs/rules/` locally (~1500 lines, ~12K tokens).

### Full (Rules + Examples)

**Best for:** Component development

Clone `kuat-docs/` and load `rules/` + `examples/{framework}/` (~2500 lines).

### Task-Specific Loading

| Task | Load |
|------|------|
| Color decisions | `rules/design/colours.md` |
| Typography | `rules/design/typography.md` |
| Layout design | `rules/design/layouts.md` |
| Content writing | `rules/content/` |
| Component creation | `rules/components/patterns.md` + `examples/{framework}/components.md` |

---

## IDE-Specific Instructions

### Cursor IDE

Add the snippet to your `.cursorrules` file in the project root.

### Claude Code / CLAUDE.md

Add the snippet to your `CLAUDE.md` file in the project root.

### GitHub Copilot

Add the snippet to `.github/copilot-instructions.md`.

### Claude Projects

Upload the snippet as a knowledge file, or upload specific rule files from `kuat-docs/rules/`.

### Windsurf / Other IDEs

Add the snippet to your IDE's agent configuration file.

---

## Advanced: Custom Agents / API

For programmatic access:

```python
def get_kuat_context(task: str, framework: str = None) -> str:
    """Load Kuat design context for a task."""
    base = "kuat-docs/"
    files = {
        "design": ["rules/design/colours.md", "rules/design/spacing.md"],
        "content": ["rules/content/foundations.md"],
        "component": ["rules/components/patterns.md"],
    }
    result = [load(f"{base}{f}") for f in files.get(task, [])]
    if framework:
        result.append(load(f"{base}examples/{framework}/"))
    return "\n".join(result)
```

---

## Context Size Reference

| What | Lines | Tokens (~) |
|------|-------|------------|
| Snippet only | 15 | 150 |
| `rules/design/` | 900 | 7,000 |
| `rules/content/` | 500 | 4,000 |
| `rules/components/` | 200 | 1,500 |
| `examples/{framework}/` | 800 | 6,000 |

**Tip:** Start with the snippet. Only clone full docs if your agent needs detailed component patterns or content guidelines.

---

## Verification

Test your setup with these prompts:

- "Create a card component" → Agent should reference Kuat docs
- "What color for the primary button?" → Agent should check docs or use semantic tokens
- "Add spacing between form fields" → Agent should reference spacing rules
- "Fix this JavaScript bug" → Agent should NOT invoke Kuat rules (not UI work)

See [verification.md](./verification.md) for comprehensive tests.

---

## Troubleshooting

**Agent not following rules?**
1. Verify snippet is in the correct config file for your IDE
2. Test with verification prompts above
3. For detailed rules, clone docs locally

**Need more detail?**
Clone `kuat-docs/rules/` for full specifications.

---

## Related

- [Verification Guide](./verification.md) - Full test suite
- [Rules](../rules/) - Design specifications
- [Examples](../examples/) - Code examples
