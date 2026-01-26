# Component Rules

Component development patterns for the Kuat Design System. These rules define how to structure, name, and build accessible components - independent of framework.

---

## Files

| File | Description |
|------|-------------|
| [patterns.md](./patterns.md) | Naming conventions, variant architecture, accessibility, testing |

---

## Key Principles

1. **Consistency** - Follow established patterns across all components
2. **Accessibility** - Built-in a11y, not bolted on
3. **Type safety** - Full TypeScript support
4. **Flexibility** - Variant-based customization

---

## For Implementation Examples

See framework-specific component guides:
- [React Components](../../examples/react/components.md)
- [Vue Components](../../examples/vue/components.md)

---

## Quick Reference

**Naming**:
- Components: PascalCase (`Button`, `Card`, `AlertDialog`)
- Props/Variants: camelCase (`variant`, `size`, `isDisabled`)
- Files: Match component name (`Button.tsx`, `Button.vue`)

**Variants**:
- Use `class-variance-authority` for variant logic
- Required variants: `variant`, `size`
- Always specify `defaultVariants`

**Accessibility**:
- Semantic HTML elements
- Keyboard navigation support
- ARIA attributes where needed
- WCAG 2.1 AA compliance
