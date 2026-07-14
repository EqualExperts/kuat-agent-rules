# Kuat Make kit — staged guidelines

Drafts of the guideline files for a Figma **Make kit** built on `@equal-experts/kuat-react` (and/or
`kuat-vue`) plus the Kuat2 Figma library. These are staged here because assembling the actual kit
happens inside Figma's UI (Make file → Settings → Create a kit) — this repo has no way to create a
kit directly. Once a kit exists, copy each file below into the matching path in the kit's
`guidelines/` folder.

Background: [../figma-make.md](../figma-make.md#option-c--make-kits) · [Figma: Get started with Make
kits](https://help.figma.com/hc/en-us/articles/39241689698839) · [Figma: Write design system
guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/)

## Files

| File | Maps to |
|------|---------|
| [Guidelines.md](./Guidelines.md) | Kit root `guidelines/Guidelines.md` — read first, routes to everything else |
| [setup.md](./setup.md) | Kit root `guidelines/setup.md` — imports, CSS, theming |
| [tokens.md](./tokens.md) | Kit root `guidelines/tokens.md` — colour, typography, spacing, radius |
| [components/overview.md](./components/overview.md) | `guidelines/components/overview.md` — component catalog + decision trees |

## What's authoritative vs. what's drafted

Sourced directly from real package/repo facts, not invented:

- Colour tokens: `reference/design-language/tokens/colors.tokens.json` (source of truth) and
  `@equal-experts/kuat-core/src/variables.css` (generated CSS)
- Typography/spacing/borders intent: `reference/design-language/{typography,spacing,borders}.md`
- Component APIs: `@equal-experts/kuat-react/agent-docs/components/*.md` (button, callout,
  status-badge, tag, tag-group, counter-badge, button-group, kuat-header)
- Component resolution priority: `reference/media-types/web-product/component-decision-tree.md`
- Page shell/composition: `reference/media-types/web-product/design.md`

## Open questions before this kit goes live (resolve with Ed / DS team)

1. **Primitive import path.** `component-decision-tree.md` says primitives (Button, Input, Select,
   Checkbox, etc.) are meant to be installed via the shadcn CLI into the consumer app and themed via
   `kuat-core` CSS variables — not imported from `kuat-react` directly. But `kuat-react`'s
   `package.json` *also* exports ready subpaths for these exact components (`./button`, `./input`,
   `./select`, `./checkbox`, `./radio`, `./switch`, `./textarea`, `./accordion`, `./alert-dialog`,
   `./carousel`, `./toggle`, `./toggle-group`, `./sonner`, `./icon-button`, `./field`). Make kits work
   by importing an npm package, not by running CLI scaffolding — there's no way to have Make run
   `npx shadcn add button` as part of kit setup. `setup.md` below therefore instructs Make to import
   primitives straight from `@equal-experts/kuat-react/{name}`, which is the only path that actually
   fits the Make-kit mechanism. Confirm whether those subpath exports are intended for exactly this
   kind of direct consumption, or are an internal implementation detail — if the latter, the kit needs
   a different primitives strategy before publishing.
2. **Border radius mismatch.** `reference/design-language/borders.md` states the design intent as
   0px (static) / 6px (interactive) / 4px (inputs). The actual generated Tailwind scale in
   `kuat-core/src/variables.css` is `--radius: 0.3rem` (4.8px) with `--radius-sm/md/lg/xl` derived by
   ±2px/4px from that base — none of which lands exactly on 0, 4, or 6. `tokens.md` below flags this
   discrepancy rather than picking one silently; needs a decision on which is canonical before this
   goes into a published kit.
3. **Coverage gap.** Only 7 components have real `agent-docs` guides (Callout, StatusBadge, Tag,
   TagGroup, CounterBadge, ButtonGroup, KuatHeader) plus Button. Everything else `kuat-react` exports
   (Accordion, AlertDialog, Select, Checkbox, Radio, Switch, Textarea, Field, Toggle, ToggleGroup,
   Carousel, KuatCarousel, IconButton, Sonner, KuatRadialProgress, Badge) has no documented props in
   this repo yet — `components/overview.md` lists them but can't give Make the same granular
   guidance. Worth prioritising for the same treatment `add-kuat-component` gives new components
   ([phase-7-contributor-skills.md](../../../docs/migration/phase-7-contributor-skills.md)).
4. **npm registry reachability.** Confirmed public and usable per Ed — no blocker here, but worth a
   final check that Figma Make can actually resolve `@equal-experts/kuat-react` at kit-assembly time
   (Step 2 of [Get started with Make kits](https://help.figma.com/hc/en-us/articles/39241689698839)).
