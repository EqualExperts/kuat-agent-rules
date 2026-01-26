# Setup & Integration

Guides for integrating Equal Experts brand guidelines into your tools, IDEs, and agent pipelines.

---

## Files

| File | Description |
|------|-------------|
| [integration.md](./integration.md) | How to integrate docs into IDEs and agents |
| [verification.md](./verification.md) | Testing your setup works correctly |

---

## Quick Start

1. **Read general rules:** Start with `rules/general/` for brand and design language
2. **Choose your platform:** Load relevant `rules/types/{platform}/` for platform-specific rules
3. **Integrate:** Follow [integration.md](./integration.md) for your environment
4. **Verify:** Test with [verification.md](./verification.md)

---

## What to Load

**For any Equal Experts content:**
- Load relevant files from `rules/general/`
- ~800 lines total for all general rules

**For web applications:**
- Load `rules/general/` + `rules/types/web/product/`
- ~2000 lines total

**For web applications with examples:**
- Load `rules/general/` + `rules/types/web/product/` (including `examples/`)
- ~3500 lines total

**For slides, graphics, or other platforms:**
- Load `rules/general/` + `rules/types/{platform}/`
- Size varies by platform

---

## Platform-Specific Technical Setup

For web application development with Kuat-react or Kuat-vue, see:
- [rules/types/web/product/technical.md](../rules/types/web/product/technical.md)
