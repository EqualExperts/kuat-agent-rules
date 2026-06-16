# Slides — Styling

Colour roles, typography, and spacing for presentation decks.

**See also:** [colours.md](../../design-language/colours.md), [typography.md](../../design-language/typography.md), [accessibility.md](../../accessibility/accessibility.md).

If a foundation rule and this file conflict on accessibility minimums, the foundation wins.

---

## Colour usage

| Role | Token | Use for |
|---|---|---|
| Eyebrow / section label | EE Blue | ALL CAPS section labels above titles, page-number badge, the left-side "[" bracket, key callout panels |
| Slide title | Tech Blue (on light) / White (on dark) | H1 of every content slide |
| Body copy | Slate-900 | Paragraphs, lists, table cells on light backgrounds |
| Body copy (dark slide) | White at ~95% opacity | Paragraphs on Slate-900 backgrounds |
| Lead sentence / emphasis | Tech Blue or **bold Slate-900** | The first sentence of a paragraph block when you want it to read as a deck |
| Stat panels | EE Blue → Tech Blue gradient stack | Impact metrics — see [layouts.md](./layouts.md) (*Stats panel*) |
| Accent (sparingly) | Transform Teal, Equal Ember | One accent colour per deck, never two. Reserve for highlighting a single key idea or differentiator |

### Do

- Default backgrounds to white. Use Slate-900 backgrounds to mark narrative beats — section openers, "about us", key claims, closing.
- Alternate light and dark slides through the deck to give rhythm; aim for roughly 70/30 light/dark in sales decks, 90/10 light in reporting.
- Use EE Blue for one job at a time on a given slide — eyebrow OR callout OR chart accent, not all three.

### Don't

- Do not use Equal Ember and Transform Teal in the same deck unless the deck is explicitly about cross-service comparison.
- Do not put Tech Blue text on Slate-900 — contrast is poor. Use white on dark.
- Do not introduce off-brand colours from a client palette in the body. If a client co-brand colour is needed, restrict it to a single endorsement strip.

---

## Typography

Presentation decks use tighter line height than other media; minimum sizes follow [accessibility.md](../../accessibility/accessibility.md).

- **Section eyebrow:** Lexend, ALL CAPS, ~12pt, EE Blue, tracked slightly looser than body.
- **Slide title (H1):** Lexend, sentence case, ~22pt, Tech Blue (light bg) or White (dark bg), tight leading.
- **Subtitle / lead:** Lexend Medium or **Bold**, ~12–14pt, Tech Blue (light) or White (dark).
- **Body:** Lexend Regular, **11pt minimum** (accessibility floor — do not go smaller), Slate-900, line height **1.15** (presentation-specific; foundation default 1.5 applies elsewhere).
- **Stat numerals:** Lexend Bold, oversized (40–60pt), white on blue panel.
- **Captions / footnotes:** Lexend Regular, **10pt minimum**, Slate-900 at 70% — only on detail-heavy slides, not body text.

### Do

- Keep line length around 60–80 characters for body — narrower if the slide has a paired image.
- Use sentence case for titles. Reserve ALL CAPS for the section eyebrow only.
- Bold the lead sentence of a paragraph when you want a deck to be skimmable.

### Don't

- Do not centre-align body copy. Left-align everything except the page-number badge and stat numerals.
- Do not mix Lexend with another sans-serif. Code or technical strings only use JetBrains Mono.
- Do not justify body text — it creates ragged whitespace at slide widths.
- Do not drop below 11pt for any body copy. If it doesn't fit at 11pt, the slide has too much content — split it.

---

## Spacing and grid

- Maintain a generous outer margin (~5–6% of slide width). Brackets sit at the margin, not bleeding off the page unless intentionally full-bleed.
- Use one of three content widths: full (one column), 60/40 split (text + image), 50/50 split (text + visual). Avoid three-column body content except for icon grids.
- White space is a brand asset — empty area around a single statement reads as confident; cluttered slides read as junior consultancy.
