# Project Setup

## Required CSS imports

Import the compiled Kuat stylesheet once, globally:

```tsx
import '@equal-experts/kuat-react/styles'
```

`@equal-experts/kuat-react` ships a `./styles` export (`dist/style.css`) — this is the single
stylesheet that carries all component styles. There is no separate `kuat-core` CSS import needed at
the application level; `kuat-core`'s `variables.css`/`button-variables.css` are consumed upstream by
`kuat-react`'s own build, not imported directly by consumer apps.

Do not add Tailwind `@source` scanning rules pointing into `@equal-experts/kuat-react`'s package
directory — the package ships pre-compiled CSS with the utility classes it needs already generated.

## Dark mode

Kuat is a light/dark pair driven by a `.dark` class on a root ancestor (see `tokens.md` for the token
pairs). No `ThemeProvider` component or hook is documented in this package's `agent-docs` — if the
generated app needs a theme toggle, implement it as a plain class toggle on `<html>` or the app root,
not a Kuat-provided hook (none exists in the current docs).

## Importing components — two different paths, don't mix them up

Kuat has two categories of components with **different import paths**, per
`reference/media-types/web-product/component-decision-tree.md`'s resolution priority:

### 1. Kuat-authored components — import directly from the package

These have no shadcn equivalent and are imported straight from `@equal-experts/kuat-react`'s own
subpaths:

```tsx
import { KuatHeader } from '@equal-experts/kuat-react/kuat-header'
import { Callout } from '@equal-experts/kuat-react/callout'
import { StatusBadge } from '@equal-experts/kuat-react/status-badge'
import { Tag } from '@equal-experts/kuat-react/tag'
import { TagGroup } from '@equal-experts/kuat-react/tag-group'
import { CounterBadge } from '@equal-experts/kuat-react/counter-badge'
import { ButtonGroup } from '@equal-experts/kuat-react/button-group'
```

(Vue equivalents: same subpaths under `@equal-experts/kuat-vue`.)

### 2. Generic primitives (Button, Input, Select, etc.) — resolve this before relying on it

The documented, official pattern (`component-decision-tree.md`) is: install these via the **shadcn
CLI** into the consumer app's own `components/ui/`, themed automatically by `@equal-experts/kuat-core`
CSS variables. That's not something a Make kit can do — Make kits work by importing an npm package,
not by running `npx shadcn add button` as a setup step.

`@equal-experts/kuat-react`'s `package.json` *also* exports ready subpaths for these same primitives —
`./button`, `./input`, `./select`, `./checkbox`, `./radio`, `./switch`, `./textarea`, `./accordion`,
`./alert-dialog`, `./carousel`, `./kuat-carousel`, `./toggle`, `./toggle-group`, `./sonner`,
`./icon-button`, `./field`. **This kit imports primitives from these subpaths** since it's the only
route that fits the Make-kit mechanism:

```tsx
import { Button } from '@equal-experts/kuat-react/button'
import { Input } from '@equal-experts/kuat-react/input'
```

**This is a judgement call, not a confirmed pattern** — the package's own docs (`components/button.md`)
describe the shadcn-CLI route as canonical and don't mention the subpath exports as an alternative
consumption method. Treat generated output built this way as needing a design-system-team review
before it's treated as equivalent to a normal Kuat app, until this is confirmed one way or the other.

## Build configuration

No bespoke Vite/PostCSS configuration is documented for consuming `@equal-experts/kuat-react` as a
plain dependency — treat it as a standard React 18/19 + Tailwind v4 project. `kuat-react` itself is
built with Vite; that's an implementation detail of the package, not something a consuming app needs
to replicate.

## Rules

- Import the stylesheet once via `@equal-experts/kuat-react/styles` — do not hand-roll Kuat's CSS
  variables into the app's own stylesheet.
- Use semantic Tailwind classes generated from Kuat's CSS variables (`bg-primary`, `bg-sidebar`,
  `text-foreground`) — never hardcode the underlying OKLCH/hex values from `tokens.md`.
- Kuat-authored components (`KuatHeader`, `Callout`, `StatusBadge`, `Tag`, `TagGroup`, `CounterBadge`,
  `ButtonGroup`) always come from `@equal-experts/kuat-react/{subpath}` — never approximate them with
  raw HTML or a different library's equivalent.
- Do not use the deprecated `Badge` — use `StatusBadge`, `Tag`, or `CounterBadge` per
  `components/overview.md`.
