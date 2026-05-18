# Slides — Data

Charts, tables, and impact metrics on slides.

For deeper chart guidance, see LOADING.md optional path `types/charts-data/`.

**See also:** [layouts.md](./layouts.md) (*Stats panel*), [styling.md](./styling.md), [foundations/design/colours.md](../../foundations/design/colours.md).

---

## Charts

- One chart per slide. The chart is the slide.
- Title states the conclusion, not the chart type. "Deployments increased 400× year on year" beats "Annual deployment count".
- Use EE Blue as the primary series colour. Secondary series step down to Tech Blue, then a neutral grey. Reserve Equal Ember or Transform Teal for highlighting a single data point that makes the argument.
- Remove gridlines, chart borders, and legends where the data labels alone are sufficient. Direct-label series instead of using a legend.
- Round numbers. "£30M" not "£29,847,221.50" in a presented chart. Precision goes in an appendix or notes.

### Do

- Annotate the one or two data points that carry the argument with a callout line + label.
- Use sparklines or small multiples instead of cramming series into one chart.

### Don't

- Do not use pie charts for more than three slices, and avoid them in favour of bar charts where possible.
- Do not use dual-axis charts — split into two adjacent charts instead.
- Do not use gradient fills or 3D effects on bars or columns.

---

## Tables

- See the template's table styles: dark-header table for dense data, light-header for summary tables, alternating-row tinting at low opacity.
- Maximum 6 columns and 8 rows on a single slide. Beyond that, summarise on slide and link to an appendix.
- Right-align numeric columns, left-align text columns, do not centre body cells.
- Bold the row or cell that carries the argument — let the reader's eye land on it.

---

## Stats and impact metrics

- Use the *Stats panel* layout for 2–4 headline metrics.
- Pair every number with a one-line "what this means" — a number without context is noise. "$3M savings → driven by data health check at a global broadcaster" beats "$3M".
- Source-cite quietly in 10pt Slate-500 if the number is external; internal client outcomes do not need citation but should be true and current.

### Don't

- Do not invent or round-up metrics. If a client outcome is approximate, say "~" or "over".
- Do not present a stat without context.
