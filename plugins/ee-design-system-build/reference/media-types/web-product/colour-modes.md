# Colour Modes (Light & Dark)

Shadcn/ui semantic-role mapping for Equal Experts product UI. Product UI runs on a 50–950
primitive scale with semantic role tokens (`background`, `foreground`, `primary`,
`primary-foreground`, …) that flip value between light and dark mode while the role name stays
fixed — components reference `bg-primary text-primary-foreground` and the mode handles the rest.

**Status:** the mapping below is agreed (June 2026 colours lockdown) and is the target for
`@equal-experts/kuat-core`'s light and dark themes and `token-contract.json` (published
downstream). Until that release ships, treat the recommended values as the authority for review
and design work; the shipped `--color-*` CSS custom properties are the implementation of record
once published — see [colours.md](../../design-language/colours.md) for the upstream token values
these resolve from.

## Light mode

| Role | Value | Notes |
|------|-------|-------|
| `background` / `foreground` | White / Dark Data | 15.5:1 |
| `card` / `card-foreground` | White / Dark Data | 15.5:1 |
| `primary` / `primary-foreground` | EE Blue-600 `#1378ae` / White | EE Blue-600, not the brand -500, so white button text reaches AA (4.85:1); brand EE Blue `#1795d4` only passes for large/bold labels |
| `secondary` / `secondary-foreground` | Transform Teal-50 / Transform Teal-700 | 6.8:1 |
| `muted` / `muted-foreground` | The Cloud / Server Slate | 6.9:1 |
| `accent` / `accent-foreground` | EE Blue-50 / EE Blue-700 | 6.5:1 |
| `destructive` / `destructive-foreground` | Runtime Red / White | 7.8:1 |
| `ring` | EE Blue-600 | Meets 3:1 UI floor |
| `border` / `input` | Light neutral | Decorative divider — subtle by design, not a state indicator |
| `chart-1…5` | Tier 3 order | EE Blue, Equal Ember, Tech Blue, Logic Lime, Packet Plum |

## Dark mode

| Role | Value | Notes |
|------|-------|-------|
| `background` / `foreground` | Dark Data / The Cloud | 14.2:1 |
| `card` / `card-foreground` | Dark surface / The Cloud | 12.5:1 |
| `primary` / `primary-foreground` | EE Blue (brand -500) / Dark Data | 4.6:1 — on dark surfaces, brand EE Blue itself passes with dark text |
| `secondary` / `secondary-foreground` | Tech Blue / White | 7.8:1 |
| `muted` / `muted-foreground` | Dark neutral / Edge Blue | 7.2:1 |
| `accent` / `accent-foreground` | Tech Blue-900 / Edge Blue | 10.7:1 |
| `destructive` / `destructive-foreground` | Runtime Red / White | 7.8:1 (unchanged from light mode) |
| `ring` | EE Blue (brand -500) | — |
| `border` / `input` | Dark neutral | — |
| `chart-1…5` | Tier 3 order, dark-adjusted | EE Blue, Equal Ember, Edge Blue, Logic Lime, Signal Yellow (Edge Blue/Signal Yellow swapped in for dark-surface contrast) |

## Interaction states

Hover/active states use **Edge Blue** (the light end of the three-stage blue — see
[colour-usage.md](../../design-language/colour-usage.md#the-three-stage-blue)), not a raw opacity
tint of EE Blue. Interactive elements combine a tint-plus-darker-overlay treatment with an
affordance cue (border-radius, shape) — colour is never the only signal that something is
clickable.

## Links vs primary actions

`primary` (buttons, key CTAs) uses EE Blue; text links and small text use the semantic `link`
token, not `primary` — see
[colour-usage.md](../../design-language/colour-usage.md#links-vs-buttons--the-accessible-blue) for
why these are deliberately different values.
