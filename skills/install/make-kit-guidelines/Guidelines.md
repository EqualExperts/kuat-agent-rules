# Kuat Design System — Make Kit Guidelines

Equal Experts' internal design system for web products, built on `@equal-experts/kuat-react`
(companion: `kuat-vue`) plus shadcn primitives themed via `@equal-experts/kuat-core`.

## Product character

Kuat is used for **internal business tools and product UI** — dashboards, admin consoles, data-heavy
workflows. Not marketing pages, not slides.

- **Navigation**: dark, persistent — either a horizontal bar or a left sidebar (see
  `components/overview.md` → Navigation). Product screens are visually distinct from EE marketing
  pages, which use light navigation — never mix the two.
- **Surface strategy**: light content areas (`bg-background`, white) inside a dark navigation shell
  (`bg-sidebar`, Tech Blue). Cards and panels use `bg-card`.
- **Colour discipline**: EE Blue (`--primary`) is the one brand colour used for primary actions and
  emphasis. `Tag`'s nine categorical colours — `base` (EE neutral) plus Index Indigo, Transform Teal,
  Packet Plum, Server Slate, Logic Lime, Signal Yellow, Cursor Coral, Patch Peach — exist for
  **categorisation and data visualisation only** (see `tokens.md`) — never as page or section
  backgrounds. Note Index Indigo does double duty as both a `Tag` category *and* the `info` status
  colour; that overlap is intentional, not a conflict.
- **Status colour is reserved for status.** Runtime Red = error only, Uptime Green = success only,
  Equal Ember = warning only, Index Indigo = info only. Edge Blue is reserved for hover/active
  interaction states, not categorisation. None of the five should be repurposed decoratively.
- **Border philosophy**: minimal. Prefer spacing and surface-colour contrast over borders. See
  `tokens.md` for the current radius-value discrepancy that needs resolving before this is final.

## Reading order

**Read before writing any code:**

1. This file — product character and rules
2. `setup.md` — imports, CSS, theming, and the primitives import-path decision
3. `tokens.md` — colour, typography, spacing, radius
4. `components/overview.md` — full component catalog, resolution priority, decision trees

**Read on demand:**

- Read the relevant row in `components/overview.md`'s catalog *before* using any component — it says
  whether that component has a full per-component guide or is still undocumented (and therefore
  needs conservative, standard-shadcn-behaviour assumptions rather than invented Kuat-specific props).

## Workflows

### Before using any component

1. Check `components/overview.md`'s resolution priority: Kuat Blocks → Kuat Components → shadcn (via
   `kuat-core` theming) → custom build. Don't reach for a custom build if a higher-priority option
   exists.
2. Check the catalog table for the component's status (documented / undocumented).
3. If documented, follow its API exactly — variant names, prop names, and defaults are not
   interchangeable with plausible-sounding alternatives (e.g. `StatusBadge`'s `type` values are
   exactly `success | warning | error | info | neutral` — nothing else).
4. If undocumented, use it conservatively: standard shadcn/Radix defaults, no invented Kuat-specific
   variants.

### When building a page shell

1. Read `components/overview.md` → Navigation for the two sanctioned nav patterns (horizontal,
   sidebar) and the content-only layouts (narrow/centred for auth-forms, full-width for
   reports/documents).
2. Every product screen with persistent navigation uses **dark** nav (`bg-sidebar`, Tech Blue) — never
   light navigation on a product screen.
3. Follow the region composition in `components/overview.md` (system banner → sidebar/top bar →
   content) rather than inventing a different shell shape.

## Rules

IMPORTANT: Product screens use dark navigation (Tech Blue). Marketing-style light navigation is a
different system — do not use it here.

IMPORTANT: Never use an extended accent colour (Index Indigo, Packet Plum, etc.) as a large-area
background. They are for `Tag` categorisation and chart series only.

IMPORTANT: Status colours (error/warning/success/info) are never the sole signal — always pair with
an icon and a text label, never colour alone.

- Always prefer semantic tokens (`bg-primary`, `text-foreground`) over raw palette steps
  (`bg-ee-blue-500`) or hex values in application code.
- `Badge` is deprecated — use `StatusBadge` (status), `Tag` (categorisation), or `CounterBadge`
  (counts) instead. See `components/overview.md`.
- Font is Lexend (`font-sans`) for all UI text by default — do not introduce another sans-serif
  family.
- Spacing and type scale are Tailwind's own defaults (see `tokens.md`) — Kuat does not define a
  separate custom scale for either, only the token/colour layer sits on top.

## Related

- `setup.md` — how to actually import and theme
- `tokens.md` — the token layer, including two open discrepancies flagged for resolution
- `components/overview.md` — full catalog and decision trees
