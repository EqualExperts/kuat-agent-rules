# Dashboard Scenarios

Patterns for data dashboards, analytics views, metrics displays, and reporting interfaces.

---

## Principles

### User Goals

- **Get insights quickly** - Key metrics visible at a glance
- **Understand trends** - Patterns and changes over time
- **Take action** - Clear paths from data to decisions
- **Explore deeper** - Drill down into details when needed

### UX Principles

| Principle | Implementation |
|-----------|----------------|
| Information hierarchy | Most important metrics first and largest |
| Progressive disclosure | Overview first, details on demand |
| Consistent data | Same time periods, units, formats |
| Actionable context | Explain what numbers mean |

### Success Metrics

- Time to find key information
- Decision confidence
- Filter usage patterns
- Drill-down completion rates

---

## Layout

**Base Layout:** Sidebar Navigation

Dashboards benefit from persistent navigation and maximum content width.

### Metrics Dashboard Structure

```
┌──────┬──────────────────────────────────┐
│      │ Header: Page Title + Filters     │
│ Side ├──────────────────────────────────┤
│ bar  │ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│      │ │KPI │ │KPI │ │KPI │ │KPI │     │
│      │ └────┘ └────┘ └────┘ └────┘     │
│      ├──────────────────────────────────┤
│      │ ┌─────────────────────────────┐  │
│      │ │      Primary Chart          │  │
│      │ └─────────────────────────────┘  │
│      ├──────────────────────────────────┤
│      │ ┌────────────┐ ┌────────────┐    │
│      │ │ Secondary  │ │ Secondary  │    │
│      │ └────────────┘ └────────────┘    │
└──────┴──────────────────────────────────┘
```

### Data Table Dashboard Structure

```
┌──────┬──────────────────────────────────┐
│      │ Header: Title + Actions          │
│ Side ├──────────────────────────────────┤
│ bar  │ Filters Bar                      │
│      ├──────────────────────────────────┤
│      │ ┌─────────────────────────────┐  │
│      │ │                             │  │
│      │ │      Data Table             │  │
│      │ │      (scrollable)           │  │
│      │ │                             │  │
│      │ └─────────────────────────────┘  │
│      ├──────────────────────────────────┤
│      │ Pagination                       │
└──────┴──────────────────────────────────┘
```

### Specifications

| Element | Value |
|---------|-------|
| Sidebar width | 240-280px (collapsible to 64px) |
| Content padding | 24-32px |
| KPI card grid | 4 columns desktop, 2 tablet, 1 mobile |
| Grid gap | 16-24px |

---

## Design

### Color Tokens

| Element | Token |
|---------|-------|
| Page background | `bg-background` |
| Card background | `bg-card` |
| Card border | `border` |
| Sidebar | `bg-sidebar` |
| Positive trend | `text-green-600` / `text-green-500` (dark) |
| Negative trend | `text-destructive` |
| Neutral | `text-muted-foreground` |

### KPI Card Pattern

| Element | Specification |
|---------|---------------|
| Container | `bg-card`, `border`, 6px radius |
| Padding | 24px (`p-6`) |
| Label | `text-sm text-muted-foreground` |
| Value | `text-2xl font-bold` or `text-3xl font-bold` |
| Trend | Small text with arrow icon |

### Chart Container Pattern

| Element | Specification |
|---------|---------------|
| Container | `bg-card`, `border`, 6px radius |
| Padding | 24px (`p-6`) |
| Header | Title left, controls right |
| Min height | 300px primary, 200px secondary |

### Typography Hierarchy

| Element | Style |
|---------|-------|
| Page title | `text-2xl font-bold` |
| Section headers | `text-lg font-semibold` |
| KPI labels | `text-sm text-muted-foreground` |
| KPI values | `text-2xl font-bold` |
| Chart titles | `text-base font-medium` |
| Table headers | `text-sm font-medium` |

---

## Content

### KPI Cards

**Structure:**

1. Label (what the metric is)
2. Value (the number)
3. Trend indicator (optional)
4. Sparkline (optional)

**Example Content:**

| Label | Value | Trend |
|-------|-------|-------|
| "Total Revenue" | "$124,500" | "+12% vs last month" |
| "Active Users" | "2,847" | "-3% vs last week" |
| "Conversion Rate" | "4.2%" | "No change" |

### Chart Headers

```
┌─────────────────────────────────────┐
│ Chart Title          [Period ▼] [⋮]│
├─────────────────────────────────────┤
│                                     │
│           Chart Area                │
│                                     │
└─────────────────────────────────────┘
```

- Title describes what data shows
- Period selector for time range
- Overflow menu for export, settings

### Empty States

| Scenario | Message |
|----------|---------|
| No data available | "No data available for this time period" |
| Filtered with no results | "No results match your filters" + "Clear filters" button |
| Loading error | "Unable to load data" + "Retry" button |
| New user | "No activity yet" + guidance to get started |

### Loading States

- KPI cards: Skeleton with pulse animation
- Charts: Skeleton rectangle with centered spinner
- Tables: 5-10 skeleton rows
- Show loading indicator, never stale data without indicator

---

## Accessibility

**Base requirements:** See [accessibility foundations](../../../accessibility/accessibility.md) and [web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|-------------|----------------|
| Chart alternatives | Provide data tables as alternatives to visual charts |
| Color meaning | Never use color alone for status (add icons, labels) |
| Screen reader | KPI values announced with context ("Revenue: $124,500, up 12%") |
| Focus order | KPIs first, then filters, then main content |
| Live regions | Use `aria-live` for updating data |

### Data Visualisation

- Provide text summaries of chart insights
- Link to accessible data table from each chart
- Use patterns/textures in addition to colors
- Ensure legends are keyboard navigable

---

## Implementation

### Filter Patterns

**Filter Bar (above content):**

```
┌─────────────────────────────────────────────────────┐
│ [Date Range ▼] [Category ▼] [Status ▼]    [Search] │
└─────────────────────────────────────────────────────┘
```

- Horizontal layout
- Date range picker left
- Category filters middle
- Search right
- Background: `bg-muted/50` or transparent

**Filter Sidebar (within content):**

Use for complex filtering (10+ filter options):

- Collapsible sections
- Checkbox groups
- Range sliders
- "Apply" and "Clear" actions at bottom

### Data Table Patterns

| Element | Implementation |
|---------|----------------|
| Sortable columns | Click header to sort, show arrow direction |
| Row selection | Checkbox in first column |
| Row actions | Overflow menu or icon buttons |
| Pagination | Bottom of table with page size selector |
| Empty state | Centered message in table body |

### State Management

| State | Handling |
|-------|----------|
| Loading | Show skeleton, disable interactions |
| Error | Show error message with retry |
| Empty | Show contextual empty state |
| Stale | Show "Last updated" timestamp |
| Refreshing | Show subtle loading indicator, keep data visible |

### Responsive Behavior

| Breakpoint | KPI Grid | Charts | Tables |
|------------|----------|--------|--------|
| Mobile | 1 column | Full width, stacked | Horizontal scroll or card view |
| Tablet | 2 columns | Full width | Horizontal scroll |
| Desktop | 4 columns | Grid layout | Full table |

---

## Best Practices

### Do's

1. **Show key metrics first** - Most important KPIs at top
2. **Provide context** - Explain what numbers mean
3. **Enable comparison** - Show trends, previous periods
4. **Allow customisation** - Date ranges, filters
5. **Cache appropriately** - Don't reload unchanged data
6. **Indicate data freshness** - Show last updated time

### Don'ts

1. **Don't overwhelm** - 4-6 KPIs maximum on first view
2. **Don't auto-refresh** without indication
3. **Don't use misleading scales** - Start axes at zero unless justified
4. **Don't remove context** - Show units, time periods
5. **Don't block interactions** during loading

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Too many metrics | Prioritise, use progressive disclosure |
| No loading states | Add skeletons, spinners |
| Unclear time periods | Always show selected date range |
| Color-only status | Add icons, labels for accessibility |
| Fixed chart sizes | Make charts responsive |

### Edge Cases

| Case | Handling |
|------|----------|
| Very large numbers | Use abbreviations (1.2M, 3.4K) |
| Zero values | Show "0" not empty or dash |
| Partial data | Show with caveat ("Data incomplete") |
| Real-time data | Show update indicator, timestamp |
| Export large datasets | Async export with notification |

---

## Related Documentation

- [Product Design](../design.md) - Sidebar Navigation layout
- [Accessibility foundations](../../../accessibility/accessibility.md) - Color and contrast
