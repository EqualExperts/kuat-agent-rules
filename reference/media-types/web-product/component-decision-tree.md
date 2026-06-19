# Component Decision Tree

Component selection and development patterns for Equal Experts web applications.

---

## Overview

When building UI for web applications, follow this priority order to ensure consistency and reduce maintenance burden.

---

## Component Decision Framework

| Priority | Source | When to Use |
|----------|--------|-------------|
| 1 | **Kuat Blocks** | Pre-built compositions (header, footer, search patterns) |
| 2 | **Kuat Components** | Custom components not in shadcn (ButtonGroup) |
| 3 | **shadcn Components** | Standard UI components, themed via kuat-core |
| 4 | **Custom Build** | Only when none of the above fit your needs |

---

## When to Use Each Source

### Kuat Blocks

Pre-built compositions that combine multiple components:
- `KuatHeader` - Application header with logo and navigation
- `KuatFooter` - Application footer
- `KuatSearchPattern` - Search with filters and results

**Use when:** You need a complete, pre-built pattern that follows brand guidelines.

### Kuat Components

Custom components unique to the design system:
- `ButtonGroup` - Group of related buttons
- Other components not available in shadcn

**Use when:** The component doesn't exist in shadcn but is needed across multiple applications.

### shadcn Components

Standard UI components installed via CLI:
- Button, Dialog, Dropdown, Card, etc.
- Themed automatically via kuat-core CSS variables

**Use when:**
- The component exists in shadcn
- You only need theming changes (handled by kuat-core)
- You need to customize the component code for your specific app

### Custom Build

Build from scratch only when:
- None of the above fit your needs
- The pattern is unique to your application
- You've confirmed no existing component can be adapted

---

## Per-component guides

Usage, variants, API, and accessibility for each primitive are **not** duplicated in this upstream file. They live as `components/{slug}.md` in the consumer package `agent-docs/` or overlay, resolved by stable ID via [component-registry.md](./component-registry.md):

| ID | Guide location |
|----|----------------|
| `shadcn:button` | Package or overlay `components/button.md` |
| `kuat:button-group` | `components/button-group.md` |
| `kuat:kuat-header` | `components/kuat-header.md` |

See [consumption-architecture.md](../../../kuat-docs/setup/consumption-architecture.md) for the resolution architecture.

---

## Component Naming Conventions

### Components

| Element | Convention | Example |
|---------|------------|---------|
| Component names | PascalCase | `Button`, `AlertDialog`, `Card` |
| File names | Match component | `Button.tsx`, `Button.vue` |
| Compound components | Parent.Child | `Card.Header`, `Dialog.Content` |

### Props and Variants

| Element | Convention | Example |
|---------|------------|---------|
| Prop names | camelCase | `variant`, `size`, `isDisabled` |
| Variant values | camelCase | `default`, `destructive`, `outline` |
| Boolean props | is/has prefix | `isOpen`, `hasError`, `isLoading` |

### Kuat Namespace

| Type | Naming | Example |
|------|--------|---------|
| Custom components | No prefix needed | `ButtonGroup`, `Separator` |
| Blocks (compositions) | `Kuat` prefix | `KuatHeader`, `KuatFooter` |
| Kuat-specific variants | `kuat-` prefix | `variant="kuat-cta"` |

---

## Variant Architecture

### Using class-variance-authority (CVA)

All components with visual variants should use CVA:

```typescript
cva(baseClasses, {
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... }
})
```

### Standard Variants

Most interactive components should support:

| Variant | Purpose | Common Values |
|---------|---------|---------------|
| `variant` | Visual style | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| `size` | Dimension | `default`, `sm`, `lg`, `icon` |

### Default Variants

Always specify `defaultVariants`:

| Variant | Default Value |
|---------|---------------|
| `variant` | `default` |
| `size` | `default` |

---

## Accessibility Requirements

### Semantic HTML

- Use appropriate HTML elements (`<button>`, `<a>`, `<input>`)
- Don't use `<div>` for interactive elements
- Use proper heading hierarchy (`h1` → `h2` → `h3`)

### Keyboard Navigation

- All interactive elements must be focusable
- Focus order should be logical
- Escape key closes modals/dialogs
- Enter/Space activates buttons
- Arrow keys navigate within groups

### ARIA Attributes

| Scenario | Required Attributes |
|----------|---------------------|
| Loading state | `aria-busy="true"` |
| Disabled state | `aria-disabled="true"` or `disabled` |
| Expanded state | `aria-expanded="true/false"` |
| Modal dialogs | `role="dialog"`, `aria-modal="true"` |
| Error states | `aria-invalid="true"`, `aria-describedby` |

### Focus Management

- Visible focus indicators (use `ring` tokens)
- Focus trapped in modals
- Focus returned when modals close
- Skip links for complex layouts

---

## Styling Rules

### Design Tokens

- Use semantic color tokens (`bg-primary`, not a raw hex)
- Use spacing scale (`p-4`, not `padding: 17px`)
- Use border radius rules (0px/4px/6px)

### The cn() Utility

Always use `cn()` for className merging:

```tsx
import { cn } from "@/lib/utils"

<button className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className
)} />
```

### State Styling

| State | Pattern |
|-------|---------|
| Hover | `hover:bg-{color}/90` |
| Focus | `focus:ring-2 focus:ring-ring` |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Active | `active:bg-{color}/80` |

---

## Component testing

Component test strategy and per-component verification (functionality, types, accessibility, styling, edge cases) are **owned by the implementation repo** — `kuat-mono` and the published package — per the upstream/local ownership split (see the repo's `AGENTS.md`). This reference covers component **selection and structure**, not test procedure.

---

## Related Documentation

- [Accessibility](./accessibility.md) - Technical accessibility implementation
- [Design Rules](./design.md) - Layout and visual design
- [Examples](./examples/) - Framework-specific code examples
