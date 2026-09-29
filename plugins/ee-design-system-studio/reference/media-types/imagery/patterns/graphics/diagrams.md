# Diagram Colour Guidelines (Provisional)

Colour rules for architecture diagrams, flowcharts, and other keyed/coded diagrams. **Provisional**
— pending a dedicated diagrams session with Brand (Ben Wilks); the rules below are the interim
position from the June 2026 colours lockdown.

---

## Default palette

Diagrams default to **Tier 1 Core** (White / The Cloud backgrounds, core hues for elements).
Extended-palette colours (Tier 2) are used **only when nodes are genuinely keyed or coded** — a
legend distinguishing categories of node — not decoratively. When a diagram needs more than 4–5
distinct categories, use the Tier 3 categorical order from
[colours.md](../../../../design-language/colours.md#data-visualisation--categorical-order).

Equal Ember is reserved for "attention" nodes — the single element a diagram wants to draw the eye
to. Using it on more than one node dilutes the emphasis.

---

## CVD and simplicity rules

These follow [accessibility.md](../../../../accessibility/accessibility.md) and
[colour-usage.md](../../../../design-language/colour-usage.md):

- Differentiate node categories by **lightness plus a text label**, not hue alone — hue
  differences vanish under colour-vision deficiency and in greyscale/print.
- Never place EE Blue and Transform Teal adjacent or use them to distinguish two node categories
  in the same diagram (1.01:1 luminance — indistinguishable).
- Never use the Fruity combination to encode node categories or status.
- **Keep diagrams simple.** Colour node *categories*, not every individual node, and don't exceed
  the categorical cap (6–8 distinct colours). Over-complex, over-coloured diagrams are a recurring
  brand complaint — fewer colours and more direct labelling reads better than a large keyed legend.

---

## Related

- [colours.md](../../../../design-language/colours.md) — token values and the categorical order.
- [colour-usage.md](../../../../design-language/colour-usage.md) — tier model and adjacency rules.
- [accessibility.md](../../../../accessibility/accessibility.md) — CVD and never-colour-alone rules.
