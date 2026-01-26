# Layout Rules

Pure layout specifications for the Kuat Design System. This document defines layout types, navigation patterns, and structural guidelines - independent of framework.

---

## Overview

All Equal Experts applications should follow consistent layout patterns for brand recognition and cohesive user experience.

**Two primary layout categories:**
1. **Marketing Layouts** - Public-facing websites, landing pages, marketing content
2. **Product/App Layouts** - Internal tools, dashboards, application interfaces

---

## Layout Decision Tree

### Choose Marketing Layout When:

- Public-facing website or landing page
- Marketing content or promotional materials
- External audience (customers, prospects, public)
- Content-focused (blog, documentation, marketing)
- No complex navigation or application features

### Choose Product/App Layout When:

- Internal tools or dashboards
- Application interfaces with complex navigation
- Data-heavy or interactive interfaces
- Requires persistent navigation
- User workflows and task completion

---

## Marketing Layouts

### Structure

```
┌─────────────────────────────────────────┐
│ Header (Light background)               │
│ [Logo]              [Navigation Links]  │
├─────────────────────────────────────────┤
│                                         │
│         Main Content Area               │
│         (Full width, spacious)          │
│                                         │
├─────────────────────────────────────────┤
│ Footer (Light background)               │
│ [Logo]              [Links/Info]        │
└─────────────────────────────────────────┘
```

### Header Specifications

| Property | Value |
|----------|-------|
| Background | Light (`bg-background` or white) |
| Logo | Full-color, left-aligned |
| Logo size | 120-150px (min 100px) |
| Navigation | Horizontal, right-aligned or centered |
| Height | 64-80px |
| Padding | 16-24px horizontal, 16px vertical |

### Footer Specifications

| Property | Value |
|----------|-------|
| Background | Light (`bg-muted` or light gray) |
| Logo | Full-color, 100-120px |
| Padding | 32-48px vertical, 24px horizontal |

---

## Product/App Layouts

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
| Logo | White monochrome, left-aligned |
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

### Marketing Layouts

| Location | Logo Variant | Size |
|----------|--------------|------|
| Header | Full-color | 120-150px |
| Footer | Full-color | 100-120px |

### Product/App Layouts

| Location | Logo Variant | Size |
|----------|--------------|------|
| Horizontal nav | White monochrome | 120-150px |
| Sidebar (top) | White monochrome | 120-150px |

**Never use full-color logo on dark backgrounds.**

---

## Spacing Guidelines

Follow the 8-point grid system:

| Element | Spacing |
|---------|---------|
| Navigation height | 64-80px (multiples of 8) |
| Sidebar width | 240-280px (multiples of 8) |
| Padding | 16px, 24px, 32px (multiples of 8) |
| Content padding | 24-32px |

---

## Responsive Behavior

### Marketing Layouts

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Stack logo/nav vertically, or hamburger menu |
| Tablet | Horizontal with adjusted spacing |
| Desktop | Full horizontal layout |

### Product/App Layouts

**Horizontal Navigation:**

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Collapse to hamburger menu |
| Tablet | Show primary nav, hide secondary |
| Desktop | Full navigation visible |

**Sidebar Navigation:**

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Overlay/drawer, hidden by default |
| Tablet | Collapsible (default collapsed) |
| Desktop | Full sidebar visible (240-280px) |

---

## Usage Guidelines

### Do's

1. **Always include the logo** - Prominently placed, appropriate variant
2. **Choose right layout type** - Marketing vs Product based on purpose
3. **Use color tokens** - `bg-sidebar` for dark nav, `bg-background` for content
4. **Ensure responsive design** - Test all breakpoints
5. **Follow spacing** - 8-point grid, consistent padding

### Don'ts

1. **Don't mix layout types** - Marketing for marketing, product for apps
2. **Don't compromise logo** - Wrong variant, wrong size, wrong placement
3. **Don't hardcode colors** - Use design tokens
4. **Don't ignore mobile** - All layouts must work on small screens
5. **Don't combine nav patterns** - Choose horizontal OR sidebar, not both

---

## Implementation Examples

For code examples implementing these rules:

| Framework | Guide |
|-----------|-------|
| React | [examples/react/layouts.md](../../examples/react/layouts.md) |
| Vue | [examples/vue/layouts.md](../../examples/vue/layouts.md) |
| Other | [setup/kuat-core-integration.md](../../setup/kuat-core-integration.md) |

**Framework-agnostic usage:**
- Use semantic color tokens for backgrounds
- Apply consistent spacing with Tailwind utilities
- Follow responsive patterns with breakpoint modifiers
