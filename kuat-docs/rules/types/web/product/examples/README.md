# Framework Examples

Code examples for implementing the Kuat Design System in web applications.

---

## Directories

| Directory | Description |
|-----------|-------------|
| [react/](./react/) | React/JSX/TSX examples |
| [vue/](./vue/) | Vue SFC examples |
| [css/](./css/) | Vanilla CSS examples |

---

## When to Use

**Load these examples when:**
- You need code to implement design rules (tokens, layout, spacing)
- You need syntax reference for a framework

**Canonical component API and usage:** package `agent-docs/components/` or overlay — see [component-registry.md](../component-registry.md). [components.md](./react/components.md) files are [deprecated](../DEPRECATIONS.md).

**Don't load when:**
- You only need design decisions (use foundations and product design rules instead)
- **Intent is review** — use [kuat-review](../../../../skills/kuat-review/SKILL.md) and [review-checklist.md](../review-checklist.md)
- Context is limited

---

## File Structure

Each framework directory contains:

```
examples/{framework}/
├── colours.md      # Color usage examples
├── typography.md   # Typography examples
├── spacing.md      # Spacing examples
├── borders.md      # Border examples
├── logo.md         # Logo implementation
├── layouts.md      # Layout examples
└── components.md   # Component patterns
```

---

## Design Rules

For the design specifications these examples implement:

- [Foundations](../../../../foundations/) - Brand and design language
- [Product Design](../design.md) - Product layout rules
- [Component Decision Tree](../component-decision-tree.md) - Component patterns
- [Technical Guidelines](../technical.md) - Setup and integration
