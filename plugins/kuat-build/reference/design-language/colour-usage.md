# Colour Usage

Tier, pairing, and role rules for the Equal Experts palette. This is the prose companion to
[colours.md](./colours.md) (generated — the token-derived swatches and values live there); this
file states the rules that govern *when* each tier applies. See
[accessibility.md](../accessibility/accessibility.md) for contrast targets and the never-colour-alone
rule, and each medium's own reference (`media-types/<medium>/`) for how a tier applies there.

Source: the June 2026 Nick Orme / Ed Ford colours lockdown.

---

## The tier model

Colour is governed by **what it is allowed to do**, not by which palette it belongs to.

| Tier | Contents | Where |
|------|----------|-------|
| **Tier 1 — Core** | The four brand hues (EE Blue, Transform Teal, Tech Blue, Equal Ember) + neutrals (Dark Data, The Cloud, Byte White) | Default for almost everything: product UI, adverts, the body of most slide decks |
| **Tier 2 — Extended accents** | The ten extended-palette colours | Exception only: small pull-out highlights, keyed diagrams, illustration accents. Capped at roughly 5–10% of a page's area |
| **Tier 3 — Data encoding** | The `categorical-1…8` sequence | Charts and data visualisation only |
| **Semantic / RAG** | `error`, `warning`, `success`, `info`, `link`, `interaction-state` | Cross-cutting — sits above all tiers, may appear in any scenario, reserved for meaning and never reused decoratively |

Core is what almost everyone should use almost all the time. The extended colours exist for
defined situations, used sparingly — flooding a layout with them reads as a different brand.

---

## Background floods

Full-page background floods are restricted to **Dark Data** or **Tech Blue** (or light greys /
The Cloud). **EE Blue, Transform Teal, and Equal Ember are not full-page fills** — they are
block/component-level backgrounds and accent/CTA colours only. A full-page EE Blue background is
too bright and swallows CTAs; the same logic applies to Transform Teal and Equal Ember.

---

## The three-stage blue

The blue family forms a deliberate three-step ramp:

**Tech Blue** (dark) → **EE Blue** (mid) → **Edge Blue** (light).

Edge Blue is the light end, brought in specifically for hover/active interaction states — it has
a defined product-UI role, not just decoration.

---

## Adjacency and pairing rules

- **Never place EE Blue and Transform Teal adjacent** in a categorical sequence, fill, or chart.
  They share near-identical lightness (1.01:1 contrast) — indistinguishable in greyscale and for
  many colour-vision-deficient viewers. Use one or the other per chart, not both.
- **The Fruity combination is decoration-only.** Runtime Red, Cursor Coral, Uptime Green, Logic
  Lime, Signal Yellow, and Patch Peach together collapse under protanopia (Runtime Red and Uptime
  Green become indistinguishable). Never use Fruity to encode data, status, or categories.
- **White text on Equal Ember fails** (2.8:1) — Equal Ember always takes Dark Data text.
- Dark-surface extended colours (Index Indigo, Packet Plum, Runtime Red, Uptime Green, Server
  Slate) take white text; bright-surface extended colours (Logic Lime, Edge Blue, Signal Yellow,
  Cursor Coral, Patch Peach) take Dark Data text — see [colours.md](./colours.md#pairing-summary)
  for the generated pairing table.

---

## Server Slate vs the EE neutral scale

Server Slate is a distinct **brand grey** (a peer of the other extended colours, its own 50–950
scale). The EE neutral scale (Byte White → Dark Data) is a separate **UI neutral** scale for
surfaces, borders, and text. The two are kept apart because they serve different jobs: Server
Slate carries brand identity in a near-neutral tone; the neutral scale is the plain structural
scale product UI is built on.

---

## Links vs buttons — the accessible blue

EE Blue (`#1795d4`) fails body-text contrast (3.3:1 on white) but is retained for buttons, icons,
and larger CTAs, where it remains iconic and visually acceptable. Text links and small text use
the semantic `link` token instead (`#0080be`), a darkened EE Blue that keeps close to the brand
hue.

**The `link` value is WIP.** It is set deliberately just under the 4.5:1 AA threshold (4.34:1 on
white, ≈97%) to stay as close to EE Blue as possible — a brand-fidelity-over-strict-compliance
call, pending validation in real link contexts. A strict-AA fallback (`#007cb9`, 4.58:1) exists if
that validation doesn't hold up. Don't hard-code the current hex in a consuming app; reference the
`link` token so the value can move without a second migration.

---

## Named combinations

Brand groups colours into five named combinations — **Core, Data, Digital, Fruity, Ocean** — used
as mood/theme groupings for marketing and slide decks (Ocean reads cool/corporate, Fruity reads
energetic, and so on). These are theme palettes, not data-series orders: for charts, use the
Tier 3 categorical sequence in [colours.md](./colours.md), not a named combination. Fruity in
particular must never encode data (see above).

---

## Related

- [colours.md](./colours.md) — generated token values: brand colours, the extended palette, the
  neutral scale, semantic roles, and the data-viz categorical order.
- [accessibility.md](../accessibility/accessibility.md) — contrast targets and the
  never-colour-alone rule.
- `media-types/<medium>/` — how a tier applies in web product, web marketing, charts, slides, and
  imagery.
