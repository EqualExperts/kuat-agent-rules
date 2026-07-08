# Section hub

**User goal:** Get an overview of what's available in a section, and choose the right sub-page to go
into next — without a table or a task, just clear options.

> **Pattern:** *Pages* · single-medium (web-product) — concept and implementation together.
> Covers category landing pages, navigation hubs, and index pages that fan out to detail or sub-pages.

## Context

A section hub exists when there is no single task to complete — the user is orienting themselves inside
a part of the product and choosing where to go. They want to see what's inside the section at a glance,
understand what each option leads to before clicking, and reach the right sub-page in as few clicks as
possible.

## Principles

| Principle | Implementation |
|-----------|-----------------|
| Scannable options | Consistent card layout, one glance per option |
| Descriptive, not decorative | Card copy states what's inside, not just a label |
| Flat where possible | Avoid hubs that just lead to more hubs — reach real content in 1-2 clicks |
| Recency/relevance surfaced | Highlight recently used or most relevant sub-pages, if the data exists |

Success shows up as: time to reach a sub-page, click-through rate per card, and bounce rate on the hub
itself (users leaving without picking anything).

## Solution in web-product

### Layout

**Base Layout:** Sidebar Navigation

#### Structure

```
┌──────┬──────────────────────────────────┐
│      │ Header: Section Title + Actions  │
│ Side ├──────────────────────────────────┤
│ bar  │ Optional: intro text / search    │
│      ├──────────────────────────────────┤
│      │ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│      │ │Card│ │Card│ │Card│ │Card│     │
│      │ └────┘ └────┘ └────┘ └────┘     │
│      │ ┌────┐ ┌────┐ ┌────┐             │
│      │ │Card│ │Card│ │Card│             │
│      │ └────┘ └────┘ └────┘             │
└──────┴──────────────────────────────────┘
```

#### Specifications

| Element | Value |
|---------|-------|
| Sidebar width | 240-280px (collapsible to 64px) |
| Card grid | 3-4 columns desktop, 2 tablet, 1 mobile |
| Grid gap | 16-24px |
| Content padding | 24-32px |

### Design

#### Colour Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` |
| Card background | `bg-card` |
| Card border | `border` |
| Card hover | `bg-accent` or subtle elevation, not colour alone |

#### Card Pattern

| Element | Specification |
|---------|-----------------|
| Container | `bg-card`, `border`, 6px radius, whole card is the click target |
| Icon or thumbnail | Top or left, optional |
| Title | `text-base font-semibold` |
| Description | `text-sm text-muted-foreground`, 1-2 lines |
| Metadata | Optional: item count, last updated |

#### Typography Hierarchy

| Element | Style |
|---------|-------|
| Page title | `text-2xl font-bold` |
| Card title | `text-base font-semibold` |
| Card description | `text-sm text-muted-foreground` |

### Content

#### Card Copy

**Structure:**

1. Title (the sub-page name)
2. Description (what the user will find there, not a repeat of the title)
3. Optional metadata (count, last updated)

**Example Content:**

| Title | Description |
|-------|--------------|
| "Client Accounts" | "128 active accounts across 6 regions" |
| "Engagement Reports" | "Weekly status reports by engagement" |

#### Empty States

| Scenario | Message |
|----------|---------|
| Section has no sub-pages yet | "Nothing here yet" + guidance or a create action, if the user can add one |
| Access-restricted sub-pages | Show the card, disabled, with a short reason ("Ask an admin for access") rather than hiding it |

### Accessibility

**Base requirements:** See [accessibility foundations](../../../accessibility/accessibility.md) and
[web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|--------------|------------------|
| Card as link | Whole card is a single `<a>`/link element, not a div with a click handler |
| Focus order | Cards in reading order (left to right, top to bottom), matching the visual grid |
| Disabled cards | `aria-disabled`, with the reason available to screen readers, not just a visual dim |

### Implementation

#### Responsive Behaviour

| Breakpoint | Card grid |
|------------|------------|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3-4 columns |

## Best Practices

### Do's

1. **Make the whole card clickable** - Not just the title
2. **Write descriptions that inform the choice** - Not filler text
3. **Keep the grid flat** - Don't nest another hub behind a hub card unless unavoidable

### Don'ts

1. **Don't mix hub cards with task actions** - A hub orients; a dashboard KPI row asks for a decision. Keep them on separate pages
2. **Don't hide restricted sections** - Show them disabled with a reason, so users understand the section exists

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Cards with no description | Add a one-line description of what's inside |
| Inconsistent card heights | Fix a minimum height or truncate description consistently |
| Hub leads to another hub leads to another hub | Flatten navigation; link deep sections directly from the sidebar instead |

### Edge Cases

| Case | Handling |
|------|----------|
| Single sub-page in a section | Consider skipping the hub and linking directly to it |
| Very long list of sub-pages (20+) | Add search/filter above the grid, or group under sub-headings |

## Examples

A section hub is a card grid inside the same sidebar-navigation shell as [dashboard](./dashboard.md) and
[browse and filter](./browse-and-filter.md) — only the main-content body differs: cards instead of KPIs
or a table.

## Related

- [Product Design](../design.md) - Sidebar Navigation layout
- [Detail page](./detail-page.md) - Where a hub card usually leads
- [Accessibility foundations](../../../accessibility/accessibility.md) - Colour and contrast
