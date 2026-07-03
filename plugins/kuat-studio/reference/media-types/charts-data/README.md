# Charts & Data Visualization Rules

Guidelines for Equal Experts charts and data visualization.

---

## Overview

These rules govern the creation of charts, graphs, and data visualizations in Equal Experts materials.

---

## Key Principles

1. **Accuracy** - Data must be represented accurately and honestly
2. **Clarity** - Charts should be easy to understand
3. **Accessibility** - Don't rely on color alone, use labels and patterns
4. **Simplicity** - Remove unnecessary chart elements (chartjunk)

---

## Chart Colors

Use one palette at a time — the Tier 3 categorical order, not the four core brand colours. The
core palette is for UI chrome; reusing it for data series makes series blend into the surrounding
interface, and EE Blue/Transform Teal are near-identical in lightness (1.01:1) so they must never
sit adjacent in a sequence.

Use the CVD-checked, lightness-separated sequence in order and stop when there are enough
categories (cap at 6–8; beyond that hues become indistinguishable for everyone):

1. EE Blue
2. Equal Ember
3. Tech Blue
4. Logic Lime
5. Packet Plum
6. Edge Blue
7. Runtime Red
8. Signal Yellow

Full values: [colours.md — Data Visualisation](../../design-language/colours.md#data-visualisation--categorical-order).
For sequential data use a single palette's 50→900 steps (light→dark); for diverging data pair
Tech Blue (low) with Runtime Red (high) and a light neutral midpoint. Never use the Fruity
combination (Runtime Red, Cursor Coral, Uptime Green, Logic Lime, Signal Yellow, Patch Peach) to
encode data — it collapses under protanopia.

**Accessibility:** Use patterns or labels in addition to color for color-blind users. Maintain 3:1
contrast between adjacent fills (WCAG 1.4.11); see
[accessibility.md](../../accessibility/accessibility.md#charts-and-data-visualisation).

---

## Chart Types

### Bar Charts
- Use for comparing categories
- Horizontal or vertical orientation
- Clear axis labels

### Line Charts
- Use for trends over time
- Clear data point markers
- Labeled axes

### Pie/Donut Charts
- Use sparingly (bar charts often clearer)
- Maximum 5-6 segments
- Direct labeling preferred

### Area Charts
- Use for cumulative data
- Clear legend
- Consider stacking carefully

---

## Typography in Charts

- Use Lexend font
- Axis labels: 12-14px minimum
- Chart titles: 16-18px, semibold
- Data labels: 11-12px minimum

---

Further guidance (templates, grid/axis styling, legend placement, export formats) to be added as needed.

---

## Related Documentation

- [Reference overview](../../README.md) - Brand and design language
- [Colours](../../design-language/colours.md) - Color palette
- [Typography](../../design-language/typography.md)
- [Graphics/Infographics](../imagery/patterns/graphics/infographics.md) - For infographic-style data visualization
