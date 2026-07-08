# Product Design Rules

Design guidelines for Equal Experts web applications and product interfaces.

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

#### Region Breakdown

Dark Sidebar Navigation is the default template for internal business tools: three persistent
regions — sidebar, top bar, main content — host different content per screen without changing
the shell.

| Region | Purpose | Composition (top to bottom / left to right) |
|--------|---------|-----------------------------------------------|
| Sidebar | Wayfinding and workspace context | Workspace/brand switcher → primary navigation → secondary/utility links → account footer |
| Top bar | Page context and utility actions | Collapse toggle + breadcrumb or page title (left) → site-wide utilities such as search, notifications, theme toggle, external link (right) |
| Main content | Task surface | Primary content block(s) — a single block, or bento-style blocks for a dashboard-type layout |

**Sidebar composition:**

| Element | Notes |
|---------|-------|
| Workspace/brand switcher | Icon + name, optional subtitle (plan, member count), expand chevron |
| Primary navigation | Icon + label per item; items with children expand in place (chevron rotates, sub-items indent) |
| Section labels | Muted, small-caps-style text grouping related nav items (e.g. "Platform", "Projects") |
| Secondary navigation | Utility links (Help Center, Settings) below primary nav, visually separated |
| Account footer | Avatar + name + email/identifier, pinned to the sidebar's bottom edge |

**Top bar composition:**

| Element | Notes |
|---------|-------|
| Collapse toggle | Icon button, always leftmost |
| Wayfinding | Breadcrumb trail, or a single page title |
| Search | Optional; may show a keyboard-shortcut hint |
| Notifications / messages | Icon buttons with an unread badge or dot |
| Theme toggle | Optional icon button |
| External link | Optional labelled button (e.g. link to a repo or docs) |

**Main content composition:**

| Row | Purpose | Notes |
|-----|---------|-------|
| Page header | Title + primary actions | Omit if the top bar already carries the page title |
| Metric/summary row | At-a-glance KPIs | Card grid, 3-4 columns desktop — see [dashboard pattern](./patterns/dashboard.md) |
| Visualization row | Trends over time | One or two chart cards side by side |
| Primary work surface | The task itself | Table/list ([browse and filter](./patterns/browse-and-filter.md)), cards ([section hub](./patterns/section-hub.md)), identity + tabs ([detail page](./patterns/detail-page.md)), kanban board, or form — see the relevant [pattern](./patterns/) |

Not every row applies to every screen — a settings page may use only "Page header" plus a form,
while a metrics dashboard uses all four.

---

## Content-Only Layouts

Some screens carry no persistent app navigation — the page itself is the task. Two shapes cover
this in web-product.

### Option 3: Single Column

Use when: no persistent app navigation is needed — self-contained flows (auth, forms, wizards) or
structured documents (reports, briefs).

#### Narrow / Centred (Auth, Forms, Wizards)

```
┌─────────────────────────────────────────┐
│            [Logo] (centered)            │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────┐         │
│     │      Auth/Form Card      │        │
│     │      (max 400-480px)     │        │
│     │      [Form fields]       │        │
│     │      [Primary action]    │        │
│     └─────────────────────────┘         │
│                                         │
├─────────────────────────────────────────┤
│     Footer (minimal: legal links)       │
└─────────────────────────────────────────┘
```

See [sign-in pattern](./patterns/sign-in.md) and [form pattern](./patterns/complete-a-form.md).

#### Full-Width / Long-Form (Reports, Briefs, Structured Documents)

```
┌───────────────────────────────────────────┐
│ [Logo]        Breadcrumb           Status │
├───────────────────────────────────────────┤
│ EYEBROW LABEL                              │
│ # Document Title                           │
│ Dek / summary paragraph                    │
│ Owner · Sponsor · Date · Status            │
├───────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐   │
│ │ Callout: at-a-glance summary         │   │
│ └─────────────────────────────────────┘   │
├───────────────────────────────────────────┤
│ 01  Section heading                        │
│     Cards / lists / tables                 │
├───────────────────────────────────────────┤
│ 02  Section heading                        │
│     ...                                    │
├───────────────────────────────────────────┤
│ Footer: document title · page N/M          │
└───────────────────────────────────────────┘
```

**Specifications:**

| Property | Narrow (auth/forms) | Full-width (reports/briefs) |
|----------|----------------------|-------------------------------|
| Max content width | 400-480px | 720-960px (readable column) |
| Top bar | Logo only, minimal | Slim brand bar + breadcrumb + status |
| Body | Single card | Numbered sections (01, 02…), each self-contained |
| Section content | Form fields | Callouts, card grids, comparison lists, status/severity tables, timeline/Gantt tables |
| Footer | Minimal (legal links) | Document metadata (title, page N/M) |

##### Document Header (Full-Width Variant)

| Element | Notes |
|---------|-------|
| Eyebrow label | Muted, classifies the document (e.g. "Internal brief — steering group") |
| Title (H1) | One per page |
| Dek | One- to two-line summary paragraph |
| Metadata strip | Label/value pairs (Owner, Sponsor, Date, Status) in a horizontal row |

##### Section Anatomy (Full-Width Variant)

| Element | Notes |
|---------|-------|
| Section number | "01", "02"… prefix, muted, left of heading |
| Section heading | `text-lg` / `text-xl font-semibold` |
| Section body | Free composition — card grid, two-column comparison, matrix table with legend, or a timeline/Gantt table |
| Status/severity tags | Colour-coded chips (e.g. severity High/Medium/Low; status Resolved/Deferred/New) — pair colour with text, never colour alone |

### Split Layout (Add-on, Not Standalone)

Split Layout adds a third region — a right-hand rail — to [Sidebar Navigation](#option-2-dark-sidebar-navigation).
It's an addition, not an alternative: pair it with Option 2 rather than using it alone.

| Property | Value |
|----------|-------|
| Right rail width | 200-240px |
| Visibility | Hidden below 1280px |
| Content | Contextual to main content (table of contents, inspector, metadata) |
| Scroll | Independent from main content |

See [documentation pattern](./patterns/documentation.md) for the canonical use.

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

See [logo guidelines](../../brand/logo.md).

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

### Single Column

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Full width, reduced side padding |
| Tablet | Narrow variant stays card-width; full-width variant keeps its readable column |
| Desktop | Narrow variant centred; full-width variant keeps max content width with side margins |

---

## Content Areas

### Main Content

- Light background (`bg-background`)
- Adequate padding (24-32px)
- Responsive width

### Cards and Panels

- Use `bg-card` token for card backgrounds
- Follow [borders](../../design-language/borders.md) for border styling
- Follow [spacing](../../design-language/spacing.md) for padding

---

## Usage Guidelines

### Do's

1. **Use dark navigation** - Distinguishes product from marketing
2. **Use white/monochrome logo** - Appropriate for dark backgrounds
3. **Choose the layout that matches the task** - Horizontal nav for simple apps, sidebar for complex ones, single column when no persistent navigation is needed
4. **Maintain light content areas** - Good contrast for readability
5. **Follow spacing guidelines** - 8-point grid, consistent padding

### Don'ts

1. **Don't use light navigation** - That's for marketing layouts
2. **Don't use full-color logo on dark** - Use white monochrome
3. **Don't combine nav patterns** - Choose horizontal OR sidebar, not both (Split Layout is the one sanctioned addition, and only with Sidebar Navigation)
4. **Don't ignore mobile** - All layouts must work on small screens
5. **Don't hardcode colors** - Use design tokens

---

## Related Documentation

- [Reference home](../../README.md) - Brand and design language
- [Accessibility](./accessibility.md) - Technical accessibility implementation
- [Component Decision Tree](./component-decision-tree.md) - Component selection
- [Product Content](./content/product-content.md) - UX writing guidelines
- [Patterns](./patterns/) - Applied patterns for specific page types
- [Figma Build Checklist](./figma-build-checklist.md) - Verification steps for Figma builds, including the EE/Kuat vs. other-client context gate
