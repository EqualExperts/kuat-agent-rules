# Browse and filter

**User goal:** Find a specific item — or a small relevant subset — inside a larger collection, by
narrowing with search terms and filters rather than scanning everything.

> **Pattern:** *Help users to…* · single-medium (web-product) — concept and implementation together.
> Covers record lists, admin directories, search results, and any table/list fronted by search and
> filter controls.

## Context

Users arrive with a question ("which of these match?") rather than a fixed target. They want to narrow
a large set quickly, understand how many results their filters produced, refine without losing their
place, and move from a result straight into the record itself.

## Principles

| Principle | Implementation |
|-----------|-----------------|
| Filters are visible, not buried | Show active filters as removable chips, not just inside a menu |
| Results confirm the query | Show a result count alongside the applied filters |
| Narrowing is reversible | "Clear filters" always available; query state survives back/forward |
| No dead ends | Empty result sets explain why and offer a way out |

Success shows up as: time to find a specific record, filter usage patterns, zero-result-query rate, and
click-through rate from result to detail.

## Solution in web-product

### Layout

**Base Layout:** Sidebar Navigation (or Single Column full-width, for a standalone search page)

#### Structure

```
┌──────┬──────────────────────────────────┐
│      │ Header: Title + Actions          │
│ Side ├──────────────────────────────────┤
│ bar  │ Search + Filter Bar              │
│      │ [Search input] [Filter▼][Filter▼]│
│      │ Active filters: [Tag ×][Tag ×]   │
│      ├──────────────────────────────────┤
│      │ Results count: "128 results"     │
│      ├──────────────────────────────────┤
│      │ ┌─────────────────────────────┐  │
│      │ │                             │  │
│      │ │   Results Table / List      │  │
│      │ │   (scrollable)              │  │
│      │ │                             │  │
│      │ └─────────────────────────────┘  │
│      ├──────────────────────────────────┤
│      │ Pagination                       │
└──────┴──────────────────────────────────┘
```

For 10+ filter dimensions, move filters into a left-hand panel inside the content area instead of a bar:

```
┌──────┬────────┬─────────────────────────┐
│      │ Filter │ Header: Title + Actions │
│ Side │ Panel  ├─────────────────────────┤
│ bar  │        │ Results count            │
│      │ [ ] A  ├─────────────────────────┤
│      │ [ ] B  │ Results Table / List     │
│      │ [ ] C  │ (scrollable)             │
│      │ Apply  ├─────────────────────────┤
│      │ Clear  │ Pagination               │
└──────┴────────┴─────────────────────────┘
```

#### Specifications

| Element | Value |
|---------|-------|
| Sidebar width | 240-280px (collapsible to 64px) |
| Filter panel width | 240-280px, when used |
| Content padding | 24-32px |
| Filter bar height | 48-56px |

### Design

#### Colour Tokens

| Element | Token |
|---------|-------|
| Filter bar background | `bg-muted/50` or transparent |
| Active filter chip | `bg-secondary`, `text-secondary-foreground` |
| Results table | `bg-card`, `border` |
| Result count text | `text-sm text-muted-foreground` |

#### Filter Bar Pattern

```
┌─────────────────────────────────────────────────────┐
│ [Search...] [Category ▼] [Status ▼]   [Clear all]  │
└─────────────────────────────────────────────────────┘
```

- Search input leftmost
- Dropdown/select filters follow, left to right in priority order
- "Clear all" right-aligned, shown only when a filter is active

#### Filter Panel Pattern (10+ options)

- Collapsible sections per filter group
- Checkbox groups, range sliders as needed
- "Apply" and "Clear" actions pinned at the bottom of the panel

#### Results Table/List Pattern

| Element | Implementation |
|---------|-----------------|
| Sortable columns | Click header to sort, show arrow direction |
| Row selection | Checkbox in first column, when bulk actions exist |
| Row click target | Whole row navigates to detail — see [detail page](./detail-page.md) |
| Row actions | Overflow menu or icon buttons, right-aligned |
| Pagination | Bottom of table, with a page-size selector |
| List view (alternative to table) | Card-per-row, for records with more visual content (avatar, thumbnail) |

### Content

#### Active Filter Chips

**Structure:** Filter label + value, with a remove (×) affordance.

**Example:** `Status: Active ×`  `Region: EMEA ×`

#### Result Count

| Scenario | Message |
|----------|---------|
| Results found | "128 results" |
| Single result | "1 result" |
| Filtered | "12 results for "database migration" in Engineering" |

#### Empty States

| Scenario | Message |
|----------|---------|
| No results for query | "No results match your filters" + "Clear filters" button |
| No records exist yet | "No [records] yet" + guidance to create the first one |

#### Loading States

- Filter bar stays interactive while results load
- Table: 5-10 skeleton rows
- Show a loading indicator on re-query; never swap in stale results silently

### Accessibility

**Base requirements:** See [accessibility foundations](../../../accessibility/accessibility.md) and
[web accessibility](../accessibility.md)

**Scenario-specific:**

| Requirement | Implementation |
|--------------|------------------|
| Filter state announced | Screen reader announces the result count after each filter change (`aria-live`) |
| Keyboard filter removal | Chips removable via keyboard (Delete/Backspace when focused, or a focusable × button) |
| Table semantics | Use a native `<table>` with `<th scope="col">`; never a div grid for tabular data |
| Focus order | Search → filters → result count → table → pagination |

### Implementation

#### State Management

| State | Handling |
|-------|----------|
| Loading | Show skeleton rows, keep filters interactive |
| Error | Show error message with retry, preserve entered filters |
| Empty (no matches) | Contextual empty state with "Clear filters" |
| Empty (no records) | Contextual empty state with a create action |

#### Responsive Behaviour

| Breakpoint | Filter bar | Filter panel | Table |
|------------|-------------|----------------|-------|
| Mobile | Collapses to a single "Filters" button opening a sheet | Sheet/drawer | Card view or horizontal scroll |
| Tablet | Wraps to two rows | Collapsible, default collapsed | Horizontal scroll |
| Desktop | Single row | Persistent | Full table |

## Best Practices

### Do's

1. **Show active filters as chips** - Users shouldn't have to reopen a menu to see what's applied
2. **Confirm the result count** - Alongside the filters that produced it
3. **Preserve query state** - In the URL, so results are shareable and survive back/forward
4. **Debounce search input** - Query as the user types, without firing on every keystroke

### Don'ts

1. **Don't hide active filters** - Inside a closed dropdown with no visible indicator
2. **Don't reset filters** - On pagination or sort
3. **Don't block the whole page** - While results reload, only the table region should show loading

### Common Mistakes

| Mistake | Solution |
|---------|----------|
| Filters and results feel disconnected | Show result count next to active filters |
| Losing place after navigating back | Persist filters and page in the URL |
| No indication a query is slow | Add a loading indicator on the results region |

### Edge Cases

| Case | Handling |
|------|----------|
| Zero results | Explain why, offer "Clear filters" |
| Very large result sets | Paginate or virtualise; never render all rows |
| Ambiguous search term | Show "Did you mean…" or broaden automatically with a note |

## Examples

The sidebar-navigation frame above is the canonical instance: a search-and-filter bar above a scrollable
results table, with pagination beneath. [Dashboard](./dashboard.md)'s data-table variant is this pattern
applied inside a metrics-first page — same filter bar and table, reached from a dashboard rather than a
standalone directory.

## Related

- [Product Design](../design.md) - Sidebar Navigation layout
- [Dashboard](./dashboard.md) - Metrics-first pages that also use this pattern's table/filter structure
- [Detail page](./detail-page.md) - Where a result row leads
- [Accessibility foundations](../../../accessibility/accessibility.md) - Colour and contrast
