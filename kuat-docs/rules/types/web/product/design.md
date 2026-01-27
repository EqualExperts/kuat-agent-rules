# Product Design Rules

Design guidelines for Equal Experts web applications and product interfaces.

---

**Prerequisites:** Load [general rules](../../../general/) first

---

## Overview

Product layouts are for web applications, dashboards, and internal tools. They use **dark navigation** for clear visual hierarchy, distinguishing them from marketing layouts.

---

## When to Use Product Layout

Use product layout when:
- Building web applications
- Creating dashboards or internal tools
- Data-heavy or interactive interfaces
- Requires persistent navigation
- User workflows and task completion

---

## Navigation Patterns

Product layouts use **dark navigation** for clear visual hierarchy. Choose one of two patterns:

### Option 1: Dark Horizontal Navigation

Use when: Limited navigation items (5-7 items)

```
┌─────────────────────────────────────────┐
│ Dark Navigation Bar (Tech Blue)         │
│ [Logo]    [Nav Items]    [User Menu]    │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area               │
│         (Light background)              │
│                                         │
└─────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Background | `bg-sidebar` (Tech Blue) |
| Logo | White monochrome (`logo-monochrome-white.svg`), left-aligned |
| Logo size | 120-150px (min 100px) |
| Height | 64-72px fixed |
| Nav items | Horizontal, left-aligned after logo |
| User menu | Right-aligned |

### Option 2: Dark Sidebar Navigation

Use when: Complex navigation, hierarchical structure, 8+ items

```
┌──────┬──────────────────────────────────┐
│      │ Top Bar (Light)                  │
│ Dark │ [Breadcrumbs]    [User Menu]     │
│ Side │──────────────────────────────────┤
│ bar  │                                  │
│      │   Main Content Area              │
│ [Logo│   (Light background)             │
│ Nav] │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Sidebar background | `bg-sidebar` (Tech Blue) |
| Sidebar width | 240-280px (collapsible to 64px) |
| Logo | White monochrome, top of sidebar |
| Logo size | 120-150px (min 100px) |
| Top bar background | `bg-background` (light) |
| Content area | Light background, full remaining width |

---

## Navigation Color Tokens

For dark navigation (horizontal or sidebar):

| Token | Purpose |
|-------|---------|
| `--sidebar` | Navigation background (Tech Blue) |
| `--sidebar-foreground` | Text color (White) |
| `--sidebar-primary` | Primary accent (EE Blue) |
| `--sidebar-primary-foreground` | Text on primary |
| `--sidebar-accent` | Hover/active background |
| `--sidebar-accent-foreground` | Text on accent |
| `--sidebar-border` | Border color |
| `--sidebar-ring` | Focus ring color |

---

## Logo Placement

| Location | Logo Variant | Size |
|----------|--------------|------|
| Horizontal nav | White monochrome | 120-150px |
| Sidebar (top) | White monochrome | 120-150px |

**Never use full-color logo on dark backgrounds.**

See [general/logo.md](../../../general/logo.md) for logo guidelines.

---

## Responsive Behavior

### Horizontal Navigation

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Collapse to hamburger menu |
| Tablet | Show primary nav, hide secondary |
| Desktop | Full navigation visible |

### Sidebar Navigation

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Overlay/drawer, hidden by default |
| Tablet | Collapsible (default collapsed) |
| Desktop | Full sidebar visible (240-280px) |

---

## Content Areas

### Main Content

- Light background (`bg-background`)
- Adequate padding (24-32px)
- Responsive width

### Cards and Panels

- Use `bg-card` token for card backgrounds
- Follow [general/borders.md](../../../general/borders.md) for border styling
- Follow [general/spacing.md](../../../general/spacing.md) for padding

---

## Usage Guidelines

### Do's

1. **Use dark navigation** - Distinguishes product from marketing
2. **Use white/monochrome logo** - Appropriate for dark backgrounds
3. **Choose appropriate nav pattern** - Horizontal for simple, sidebar for complex
4. **Maintain light content areas** - Good contrast for readability
5. **Follow spacing guidelines** - 8-point grid, consistent padding

### Don'ts

1. **Don't use light navigation** - That's for marketing layouts
2. **Don't use full-color logo on dark** - Use white monochrome
3. **Don't combine nav patterns** - Choose horizontal OR sidebar, not both
4. **Don't ignore mobile** - All layouts must work on small screens
5. **Don't hardcode colors** - Use design tokens

---

## Related Documentation

- [General Rules](../../../general/) - Brand and design language
- [Accessibility](./accessibility.md) - Technical accessibility implementation
- [Component Decision Tree](./component-decision-tree.md) - Component selection
- [Technical Guidelines](./technical.md) - Implementation details
- [Product Content](./content.md) - UX writing guidelines
- [Scenarios](./scenarios/) - Applied patterns for specific page types
