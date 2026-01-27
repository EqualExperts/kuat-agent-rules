# Documentation Scenarios

Patterns for documentation sites, knowledge bases, API references, and content-heavy pages.

---

## Principles

### User Goals

- **Find information quickly** - Search and navigate efficiently
- **Understand content** - Clear, well-structured explanations
- **Complete tasks** - Step-by-step guidance that works
- **Stay oriented** - Know where they are and where to go next

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| Clear structure | Logical hierarchy, consistent organisation |
| Scannable content | Headings, lists, code blocks |
| Multiple paths | Search, navigation, breadcrumbs |
| Progressive detail | Overview first, details on demand |

### Success Metrics

- Search effectiveness (found what they needed)
- Time to find information
- Page bounce rate
- Task completion rate (for tutorials)

---

## Layout

**Base Layout:** Sidebar Navigation + Split Layout

Documentation uses a three-column layout on desktop:

### Docs Landing Page

Use Horizontal Navigation:

```
┌─────────────────────────────────────┐
│ Header: Logo + Main Nav             │
├─────────────────────────────────────┤
│ Hero: Docs title + Search           │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │Cat 1│ │Cat 2│ │Cat 3│ │Cat 4│    │
│ └─────┘ └─────┘ └─────┘ └─────┘    │
├─────────────────────────────────────┤
│ Popular Articles                    │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Docs Content Page

Use Sidebar + Split (three-column):

```
┌──────┬──────────────────────────────────┐
│ Nav  │ Breadcrumbs          [Search]    │
│ Side ├──────────────────────────────────┤
│ bar  │                    ┌───────────┐ │
│      │ # Page Title       │ On This   │ │
│      │                    │ Page      │ │
│ [Doc │ Content...         │ - Section │ │
│ tree]│                    │ - Section │ │
│      │ ## Section         │ - Section │ │
│      │ Content...         └───────────┘ │
│      │                                  │
│      │ [Previous]           [Next →]    │
└──────┴──────────────────────────────────┘
```

### Specifications

| Element | Value |
|---------|-------|
| Left sidebar width | 240-280px |
| Right sidebar (TOC) | 200-240px |
| Content max-width | 800px (prose) |
| Content padding | 32-48px |

---

## Design

### Color Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` |
| Left sidebar | `bg-sidebar` (dark) or `bg-muted` (light) |
| Right sidebar | `bg-background` (transparent) |
| Code blocks | `bg-muted` |
| Inline code | `bg-muted` |
| Links | `text-primary` |

### Typography

| Element | Style |
|---------|-------|
| Page title (H1) | `text-3xl font-bold` |
| Section heading (H2) | `text-2xl font-semibold` |
| Subsection (H3) | `text-xl font-semibold` |
| Body text | `text-base` with `leading-7` |
| Code | `font-mono text-sm` |
| Sidebar nav | `text-sm` |

### Navigation Sidebar

| Element | Specification |
|---------|---------------|
| Background | `bg-sidebar` (dark) or `bg-muted` (light) |
| Active item | Left border or background highlight |
| Section headers | Bold, no link |
| Page links | Normal weight |
| Sub-pages | Indented, smaller text |
| Scroll | Independent from content |

### Table of Contents (Right)

| Element | Specification |
|---------|---------------|
| Position | Sticky, offset for header |
| Content | H2 and H3 headings from page |
| Active tracking | Highlight current section on scroll |
| Visibility | Hide below 1280px |

---

## Content

### Page Structure

```markdown
# Page Title           ← H1, one per page

Intro paragraph        ← No heading, describes page purpose

## Major Section       ← H2, main divisions

### Subsection         ← H3, within sections

#### Detail            ← H4, use sparingly
```

### Navigation Hierarchy

```
Getting Started        ← Category (bold, not clickable)
  Introduction         ← Page link
  Installation         ← Page link (active)
  Quick Start          ← Page link
Components             ← Category
  Button               ← Page link
    Variants           ← Sub-page (indented)
    Examples           ← Sub-page
```

### Breadcrumbs

```
Docs / Components / Button / Variants
```

- Show full path to current page
- All items clickable except current
- Truncate middle items on mobile if needed

### Previous/Next Navigation

```
┌─────────────────────────────────────────┐
│ ← Previous              Next →          │
│ Installation         Quick Start        │
└─────────────────────────────────────────┘
```

- Full width bar at bottom of content
- Based on sidebar navigation order
- Show page titles, not just "Previous/Next"

---

## Accessibility

**Base requirements:** See [general accessibility](../../../../general/accessibility.md) and [web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|-------------|----------------|
| Heading hierarchy | Proper H1 → H2 → H3 sequence |
| Skip links | Skip to main content, skip navigation |
| Landmark regions | nav, main, complementary (TOC) |
| Search keyboard | Cmd/Ctrl+K shortcut, accessible modal |
| Code blocks | Scrollable with keyboard, screen reader context |
| Multiple nav labels | `aria-label` to distinguish left vs right sidebars |

### Code Blocks

- Ensure code blocks are keyboard scrollable
- Provide language context for screen readers
- Copy button must be keyboard accessible
- Don't rely on syntax highlighting alone for meaning

---

## Implementation

### Code Block Patterns

**Inline Code:**

- Use for: function names, file paths, short values
- Style: `bg-muted`, `font-mono`, `text-sm`, `rounded`

**Code Blocks:**

| Element | Specification |
|---------|---------------|
| Background | `bg-muted` or syntax theme |
| Border radius | 6px |
| Padding | 16px |
| Font | JetBrains Mono or system mono |
| Line numbers | Optional, for reference |
| Copy button | Top-right corner |
| Language label | Top-left or top-right |

**Multi-file Examples (Tabs):**

```
┌─────────────────────────────────────┐
│ [React] [Vue] [HTML]                │
├─────────────────────────────────────┤
│ // Code for selected tab            │
│ ...                                 │
└─────────────────────────────────────┘
```

- Tabs for framework variants
- Preserve selection across page navigation
- Accessible tab panel pattern

### Search Patterns

**Search Bar:**

- Prominent on landing page (hero area)
- Persistent in header on content pages
- Keyboard shortcut indicator (Cmd+K or Ctrl+K)

**Search Results:**

- Show in modal/overlay
- Group by section/category
- Highlight matching text
- Keyboard navigation (arrows + enter)
- Recent searches

### Table of Contents Behavior

| Behavior | Implementation |
|----------|----------------|
| Active tracking | Highlight section in viewport |
| Click to scroll | Smooth scroll to section |
| Sticky position | Stay visible while scrolling |
| Hide on small screens | Below 1280px |
| Collapse | Optionally collapsible |

### Responsive Behavior

| Breakpoint | Left Sidebar | Content | Right Sidebar |
|------------|--------------|---------|---------------|
| Mobile | Drawer (hidden) | Full width | Hidden |
| Tablet | Collapsible | Full width | Hidden |
| Desktop | Visible (240px) | Centered (max 800px) | Visible (200px) |

---

## Best Practices

### Do's

1. **Use descriptive headings** - Enable scanning and navigation
2. **Keep pages focused** - One topic per page
3. **Show code examples** - Demonstrate, don't just describe
4. **Maintain consistency** - Same structure across all pages
5. **Update with product** - Keep docs in sync with code
6. **Provide multiple paths** - Search, nav, links, breadcrumbs

### Don'ts

1. **Don't write walls of text** - Break into sections
2. **Don't assume knowledge** - Define terms, link to prereqs
3. **Don't hide important info** - Key points should be scannable
4. **Don't let docs go stale** - Regular review and updates
5. **Don't break links** - Use redirects when restructuring

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| No search | Add prominent search functionality |
| Deep nesting | Flatten hierarchy, max 3 levels |
| Missing navigation | Add prev/next, breadcrumbs |
| Inconsistent structure | Template for all pages |
| No code examples | Add runnable examples |
| Outdated content | Version docs, review process |

### Edge Cases

| Case | Handling |
|------|----------|
| Very long pages | Add TOC, consider splitting |
| Multi-version docs | Version switcher, clear indicators |
| API reference | Auto-generate from code, consistent format |
| External links | Mark with icon, open in new tab |
| Deprecated content | Clear warnings, link to current |

---

## Related Documentation

- [Product Design](../design.md) - Sidebar and Split layouts
- [General Accessibility](../../../../general/accessibility.md) - Structure and headings
- [General Typography](../../../../general/typography.md) - Type scale and hierarchy
