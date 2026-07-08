# Detail page

**User goal:** See everything about one record — a profile, a business unit, a case — understand its
current state, and act on it, without leaving the page to piece together context from elsewhere.

> **Pattern:** *Pages* · single-medium (web-product) — concept and implementation together.
> Covers profile pages, business-unit pages, and single-record views reached from a list, search, or hub.

## Context

A detail page exists once a user has found the record they want (from
[browse and filter](./browse-and-filter.md) or a [section hub](./section-hub.md)) and needs the full
picture: identity, current status, related data, and the actions available on this specific record.

## Principles

| Principle | Implementation |
|-----------|-----------------|
| Identity first | Name, status, and key identifiers visible without scrolling |
| Related data is one click away | Group related content into tabs or sections, not one long scroll |
| Actions stay attached to context | Primary actions live near the identity block, not in a footer |
| A way back | Breadcrumb or back link to the list/hub the user came from |

Success shows up as: time to find a specific fact about the record, task completion rate for the actions
offered on the page, and navigation-back rate (whether users needed to bounce back to search again).

## Solution in web-product

### Layout

**Base Layout:** Sidebar Navigation

#### Structure

```
┌──────┬──────────────────────────────────┐
│      │ Breadcrumb: List > Record Name   │
│ Side ├──────────────────────────────────┤
│ bar  │ ┌────┐ Record Name        [Edit] │
│      │ │Avat│ Status badge · Metadata   │
│      │ │ar  │                           │
│      │ └────┘                           │
│      ├──────────────────────────────────┤
│      │ [Overview] [Activity] [Related]  │  ← tabs
│      ├──────────────────────────────────┤
│      │                                  │
│      │   Tab content                    │
│      │   (fields, chart, table, list)   │
│      │                                  │
└──────┴──────────────────────────────────┘
```

#### Specifications

| Element | Value |
|---------|-------|
| Sidebar width | 240-280px (collapsible to 64px) |
| Identity block height | Auto, generous padding (24-32px) |
| Content padding | 24-32px |
| Tabs | Underline style, horizontal, below the identity block |

### Design

#### Colour Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` |
| Identity block | `bg-card` or transparent with a bottom `border` |
| Status badge | Semantic colour per state (e.g. `bg-green-*` active, `bg-muted` inactive) — never colour alone |
| Tab active indicator | `border-primary` |

#### Identity Block Pattern

| Element | Specification |
|---------|-----------------|
| Avatar/logo | Left, fixed size (e.g. 64-96px) |
| Title | `text-2xl font-bold` — record name |
| Status/metadata row | `text-sm text-muted-foreground`, badges + key facts inline |
| Primary actions | Right-aligned, at the same height as the title |

#### Typography Hierarchy

| Element | Style |
|---------|-------|
| Record name | `text-2xl font-bold` |
| Section headers (within tabs) | `text-lg font-semibold` |
| Field labels | `text-sm text-muted-foreground` |
| Field values | `text-base` |

Charts within a detail page (e.g. a trend for this record) reuse
[dashboard](./dashboard.md)'s Chart Container Pattern rather than a separate spec.

### Content

#### Identity Block Copy

**Structure:**

1. Record name (title)
2. Status badge (current state, in plain language — "Active", "On hold", not a raw enum)
3. Key metadata inline ("Joined Mar 2023", "12 direct reports")

#### Tab Labels

- Name tabs for what's inside, not generic labels ("Engagements", not "Tab 2")
- Default to the tab most users need first (usually "Overview")

#### Empty States

| Scenario | Message |
|----------|---------|
| No activity/history yet | "No activity yet" |
| A related list is empty | "No [related items] yet" + a create/add action, if applicable |
| Field has no value | Show "—" or "Not set", never a blank space |

#### Loading States

- Identity block: skeleton for avatar + title + badge
- Tab content: skeleton matching the eventual layout (fields, table, or chart)

### Accessibility

**Base requirements:** See [accessibility foundations](../../../accessibility/accessibility.md) and
[web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|--------------|------------------|
| Status conveyed beyond colour | Badge carries a text label, not colour alone |
| Tabs | Use the native tab pattern (`role="tablist"`, arrow-key navigation), not styled links |
| Heading structure | Record name is the page's single H1; tab section headers are H2 |
| Back navigation | Breadcrumb is a real link, keyboard-reachable before the identity block |

### Implementation

#### State Management

| State | Handling |
|-------|----------|
| Loading | Skeleton identity block + tab content |
| Not found | Explain the record doesn't exist or was removed; link back to the list |
| No permission | Explain access is restricted; do not reveal partial data |
| Error | Show error message with retry |

#### Responsive Behaviour

| Breakpoint | Identity block | Tabs |
|------------|------------------|------|
| Mobile | Stacks: avatar, then name, then actions | Horizontal scroll |
| Tablet | Inline, actions may wrap below | Horizontal, all visible if they fit |
| Desktop | Fully inline | Horizontal |

## Best Practices

### Do's

1. **Put identity above the fold** - Name and status visible without scrolling
2. **Keep actions near identity** - Not buried in a tab
3. **Provide a way back** - Breadcrumb to the list/hub the user came from

### Don'ts

1. **Don't split identity across tabs** - Name, status, and primary actions stay in the identity block
2. **Don't use colour alone for status** - Pair with a text label
3. **Don't nest another full page inside a tab** - Tabs hold sections of this record, not separate pages

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| No way back to the list | Add a breadcrumb or back link above the identity block |
| Status shown only as a colour dot | Add a text label alongside |
| Everything crammed onto one scrolling page | Split into tabs once there are 3+ distinct sections |

### Edge Cases

| Case | Handling |
|------|----------|
| Record has no name/title | Fall back to a stable identifier (ID, email) |
| Record was deleted after being linked to | Show a "not found" state, not a blank page |
| User lacks permission for one tab only | Disable that tab with a reason, rather than hiding the whole page |

## Examples

The sidebar-navigation frame above is the canonical detail page: identity block, tabs, and tab content
reached from [browse and filter](./browse-and-filter.md) or a [section hub](./section-hub.md). Charts
inside a tab reuse [dashboard](./dashboard.md)'s chart container pattern rather than a separate spec.

## Related

- [Product Design](../design.md) - Sidebar Navigation layout
- [Browse and filter](./browse-and-filter.md) - Where a detail page is usually reached from
- [Dashboard](./dashboard.md) - Chart container pattern, reused here
- [Accessibility foundations](../../../accessibility/accessibility.md) - Colour and contrast
