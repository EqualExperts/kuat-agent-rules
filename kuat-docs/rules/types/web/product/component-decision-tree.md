---
scope: type
platform: web_product
prerequisites: general
---

# Component Decision Tree

Component selection and development patterns for Equal Experts web applications.

---

**Prerequisites:** Load [general rules](../../../general/) first.

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

- Use semantic color tokens (`bg-primary`, not `#0066CC`)
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

## Testing Checklist

Before shipping a component, verify:

### Functionality
- [ ] All variants render correctly
- [ ] Default props work
- [ ] Custom className can be passed
- [ ] Component ref is forwarded (React)

### Types
- [ ] Props are properly typed
- [ ] Types are exported
- [ ] No TypeScript errors

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus visible and logical
- [ ] ARIA attributes present

### Styling
- [ ] Uses design tokens
- [ ] Works in light and dark mode
- [ ] Responsive if applicable
- [ ] Matches design specifications

### Edge Cases
- [ ] Long text handled
- [ ] Empty states handled
- [ ] Loading states (if applicable)
- [ ] Error states (if applicable)

---

## Related Documentation

- [Accessibility](./accessibility.md) - Technical accessibility implementation
- [Technical Guidelines](./technical.md) - Setup and integration
- [Design Rules](./design.md) - Layout and visual design
- [Examples](./examples/) - Framework-specific code examples
