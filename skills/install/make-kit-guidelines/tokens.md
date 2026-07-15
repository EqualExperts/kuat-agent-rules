# Design Tokens

## Format quirks to know before anything else

- **Colours are CSS custom properties resolving to OKLCH**, not raw hex — `var(--primary)`,
  `var(--ee-blue-500)`, etc. They're full, ready-to-use CSS colour values. No unit multiplication or
  escaping is needed (unlike some design-token systems) — just use `var(--token-name)` or the matching
  Tailwind class (`bg-primary`, `text-ee-blue-500`) directly.
- **Spacing is Tailwind's own default scale** — Kuat does not define a custom spacing scale on top
  of Tailwind's. `p-4` = 16px, `gap-6` = 24px, etc., exactly as Tailwind ships them. There's no
  Kuat-specific spacing token file to learn.
- **Radius is a Kuat token scale** (`--radius-none/xs/sm/md/lg/xl` in `kuat-core`) mapped onto the
  standard `rounded-*` utilities — see the Radius section below for which size each element
  category takes. Never hard-code a radius pixel value.

## Colour

### Brand palette (each a full 50→950 ramp; use the semantic aliases below over raw ramp steps)

| Brand colour | Named CSS var | Role |
|---|---|---|
| EE Blue | `--brand-ee-blue` (→ `--primary`) | Primary brand colour — primary actions, links, focus |
| Tech Blue | `--brand-tech-blue` (→ `--sidebar`) | Dark/structural — navigation, sidebar |
| Transform Teal | `--brand-transform-teal` (→ `--secondary`) | Secondary brand colour |
| Equal Ember | `--brand-equal-ember` (→ `--warning`) | Warm accent; warning status |

### Extended palette (categorisation + data viz — see `Tag`'s own restricted set below)

Index Indigo, Packet Plum, Runtime Red, Uptime Green, Server Slate, Logic Lime, Edge Blue, Signal
Yellow, Cursor Coral, Patch Peach — each a full ramp. Three of these ten are reserved for status, not
general use: Runtime Red (error), Uptime Green (success), Index Indigo (info, and also one of `Tag`'s
categorical colours — the one deliberate overlap). Edge Blue is reserved for hover/active interaction
states.

### Semantic aliases — use these, not raw ramp steps, in application code

| Token | Resolves to | Use for |
|---|---|---|
| `--primary` / `bg-primary` | EE Blue 500 | Primary buttons, primary actions, links |
| `--secondary` | Transform Teal 500 | Secondary emphasis |
| `--sidebar` | Tech Blue 500 | Dark navigation background |
| `--destructive` | Runtime Red 600 | Destructive actions (buttons, confirmations) |
| `--muted` / `--muted-foreground` | Neutral 100 / Neutral 700 | De-emphasised backgrounds and text |
| `--background` / `--foreground` | White / Neutral 950 (Dark Data) | Page canvas and primary text |
| `--card` | White | Card and panel surfaces |
| `--error` | Runtime Red 600 | Error status only |
| `--warning` | Equal Ember 500 | Warning status only — pair with **dark** text, white text fails contrast here |
| `--success` | Uptime Green 500 | Success status only |
| `--info` | Index Indigo 800 | Info status only |
| `--link` | A dedicated accessible blue (`#0080be`), not raw EE Blue | Text links and small text — EE Blue 500 itself fails small-text contrast |
| `--interaction-state` | Edge Blue 200 | Hover/active state backgrounds |

### What not to do

- Do not use an extended-palette colour (Index Indigo, Packet Plum, etc.) as a page or section
  background — they're for `Tag` categorisation and chart series only.
- Do not use `--warning` (Equal Ember) with white text — it fails contrast at that combination; use
  dark text (`--foreground` / Dark Data) on warning surfaces.
- Never convey status by colour alone — every status colour in this system is documented to pair with
  an icon and a text label (see `Callout` and `StatusBadge` in `components/overview.md`).
- Do not use raw EE Blue (`--ee-blue-500`) for text links or small text — use `--link` instead; it's a
  deliberately different, accessible value.

### Dark mode

Every semantic token above has a `.dark` counterpart already wired in `kuat-core` (e.g. `--error`
becomes a lighter Runtime Red step for legibility on dark surfaces). Toggle the `.dark` class on a
root ancestor — do not redefine these tokens per-component.

## Typography

- **Font**: Lexend (`--font-sans`) is the default for all UI text — this is already the value behind
  Tailwind's `font-sans`, so no special class is needed beyond the framework default. Lora
  (`--font-serif`) is reserved for rare decorative/editorial use, not general UI. JetBrains Mono
  (`--font-mono`) is for code/technical content.
- **Type scale**: standard Tailwind scale (`text-xs` 12px through `text-8xl` 96px) — Kuat does not
  define a separate composite type-scale on top of this. Use the scale as Tailwind ships it; don't
  set arbitrary font sizes.
- **Weights**: 400 (body default), 500 (labels/UI text), 600/700 (headings, strong emphasis). Avoid
  mixing more than two or three weights on one screen.
- **Heading hierarchy**: H1 → H2 → H3, no skipped levels.
- **Minimum body size**: 12px; minimum contrast 4.5:1 normal text, 3:1 for 18px+ (or 14px+ bold).

## Spacing

4px base unit — this **is** Tailwind's own default spacing scale (`--spacing: 0.25rem` in
`kuat-core`), not a bespoke Kuat scale layered on top. `p-4`/`gap-4` = 16px is the standard default
padding; `p-6`/`gap-6` = 24px for section separation; `p-8`+ for major page sections. Prefer spacing
over borders as the primary tool for visual separation.

## Radius

The token scale in `kuat-core/src/variables.css` (base `--radius: 0.5rem`) now matches the design
intent in `reference/design-language/borders.md` exactly — the earlier discrepancy (a `0.3rem` base
that made `--radius-sm` compute to under 1px) was fixed on 2026-07-15. Use the tokens/utilities by
element category; never hard-code a pixel value:

| Element category | Token | Utility | Value |
|---|---|---|---|
| Static content **and floating overlays** (cards, sections, dialogs, dropdown/select menus, popovers, toasts) | `--radius-none` | `rounded-none` | 0px |
| Form inputs and card-style option fields (text inputs, textareas, selects, checkboxes, toggles, radio/checkbox/switch "card" wrappers) | `--radius-sm` | `rounded-sm` | 4px |
| Interactive elements (buttons, clickable cards, tabs, menu items — even items inside a flat overlay) | `--radius-md` | `rounded-md` | 6px |
| Larger surfaces (bigger modals, feature cards) | `--radius-xl` | `rounded-xl` | 12px |
| Pills and circles (avatars, pill tags/badges, status dots, spinners) | n/a | `rounded-full` | pill / circle |

`--radius-xs` (2px) is rare fine-detail only, and `--radius-lg` (8px) is reserved — don't reach for
either by default. Kuat-authored components (`Callout`, `Tag`, `StatusBadge`, etc.) ship their own
correct radius baked in (e.g. `Tag` is always full-pill) — the table above is for hand-built
elements and shadcn-sourced primitives.

## Borders

Minimal-border philosophy: prefer spacing and surface-colour contrast over borders. When a border is
needed: 1px default, 2px for emphasis/active states, 3-4px for focus indicators. Always solid — no
dashed or dotted styles exist in this system. Minimum 3:1 contrast against the adjacent surface.
