---
name: kuat-components
description: Component selection and usage rules for Equal Experts / Kuat design work — resolution priority (blocks vs custom components vs shadcn primitives vs custom build), which component to reach for in ambiguous cases (Card vs ContentCard, Badge vs StatusBadge/Tag/CounterBadge), slot patterns, and state coverage. Use whenever a Figma design, Figma Make generation, or code build needs to pick or configure a component instance rather than invent a new one. Load alongside kuat-tokens (binding once chosen) and kuat-patterns (which components a given page pattern expects).
---

# Kuat components

Never draw a hand-made lookalike of something the library already has, and never assume a generic
default (a raw framework primitive's default styling) is correct without checking for a themed
Kuat override first. This skill is the selection logic; the actual component instances, variants,
and their bound tokens live in the Figma library or the code component package — discover them via
`assistant_component_search` (for Figma components) or Code Connect (for code), don't recreate
them from memory.

## Figma AI tool mapping for component discovery

| Need | Tool | Notes |
|---|---|---|
| Find a component by name or role | `assistant_component_search` | Pass enabled library keys; returns asset IDs, names, guidelines |
| Find a local file component | `assistant_local_component_search` | Include `lk-local` in library keys |
| Search for a variable to bind after choosing a component | `search_variables` | See kuat-tokens |
| Search for a text/paint style | `search_styles` | See kuat-tokens |

## Resolution priority — check in this order, every time

1. **Kuat blocks (pre-built compositions)** — a complete, pre-built pattern that combines multiple
   components and already follows brand guidelines (e.g. an application header with logo and
   navigation, a footer, a search-with-filters composition). If a block exists for the scenario,
   use it whole rather than reassembling its parts.
2. **Kuat custom components** — components unique to this design system that don't exist in the
   underlying primitive library at all (see the list below). Use when the need is real but no
   primitive covers it.
3. **Themed primitives** (e.g. shadcn-sourced components, themed via the design system's core
   theme layer) — standard UI components (button, dialog, dropdown, input, tabs…) that exist as
   primitives and are themed automatically through the system's CSS variables / bound Figma
   variables. Use these for anything that's genuinely a standard control, and rely on the theming
   layer rather than restyling by hand.
4. **Custom build** — only when none of the above fit, the pattern is genuinely unique to this one
   build, and you've confirmed via `assistant_component_search` that nothing existing can be adapted.
   Custom-built pieces still bind tokens per kuat-tokens; "custom" means custom composition, not
   licence to hardcode values.

Work down this list in order on every component decision — don't jump straight to custom build
because it's faster, and don't reach for a themed primitive when a purpose-built custom component
already exists for that exact need (see the two named traps below).

## Named resolution traps

- **Generic "card" → the custom content-container component, not the primitive's default card.**
  A primitive UI library's default `Card` often ships with its own unthemed corner radius that
  conflicts with this system's static-content radius rule (`semantic/rounded-none` — see
  kuat-tokens). Resolve a generic, non-interactive content container (optional media, category
  label, title, body, footer) to the design system's own content-card component, not the primitive
  default — search `assistant_component_search` for it by name before falling back to the primitive.
- **Status/count indicators → pick the specific component for the job, not one generic "badge."**
  A single-value, non-interactive per-item status (success/warning/error/info/neutral, one per
  item) is a **status indicator** component. A categorisation label a user can toggle or dismiss,
  zero-to-many per item, pulled from a defined colour set, is a **tag** component — and a *set* of
  tags needs the accessible group wrapper (group role, group label, dismissal announcements), not
  bare repeated tags. A numeric overflow count overlaid on an icon or avatar ("99+") is a **counter
  badge**, a distinct component from both. If the library's plain "badge" component is marked
  deprecated, don't reach for it even though it may still render — resolve to the specific
  successor component the scenario actually needs.
- **Grouped related buttons → the dedicated button-group component**, not several independent
  buttons placed next to each other with manual spacing — the group component carries the
  connected-edge styling and shared focus/keyboard behaviour that manual placement doesn't.

## Slot patterns

Compositions (blocks and custom components with multiple regions) have defined slots — fill only
the slots that apply to the scenario, and don't invent new slots:

- **Content-card:** optional media at top, category label, title, optional body copy, optional
  footer (actions or metadata). A generic card doesn't need every slot filled — an empty slot is
  correct when the scenario has nothing for it, not a placeholder.
- **Page-shell regions** (from kuat-patterns' layout shells): sidebar → primary nav → secondary
  nav → account footer; top bar → wayfinding (breadcrumb/title) → utilities (search, notifications,
  theme toggle). Fill each region with the item it's defined for; don't put page-level actions in
  the sidebar's account-footer slot, for instance.
- **Form field wrapper:** label → control → helper/error text slot. The helper/error slot is
  conditional — present only when there's a message to show, not an empty reserved space by
  default.

## State coverage

Before treating a component instance or a whole screen as finished, confirm the states the
scenario actually needs are represented, not just the default/populated state:

| State | When it's required |
|---|---|
| **Empty** | Any list, table, dashboard, or search result that can legitimately have nothing in it yet |
| **Loading** | Any content that arrives asynchronously — skeleton or spinner, not a flash of empty state |
| **Error** | Any content that can fail to load, plus form fields that can fail validation |
| **Populated (default)** | The base case — always required |
| **Disabled** | Any interactive control that can be legitimately unavailable given current state |
| **Focus / hover / active** | Every interactive component, for accessibility and to confirm the design carries these rather than relying on browser/OS defaults |

A build that only shows the populated/default state for a data-driven surface (a table, a
dashboard) is incomplete — flag the missing states explicitly rather than letting them be silently
assumed later.

## Instance configuration

- **Swap variants through the component's defined variant properties**, not by manually editing an
  instance's visual properties to fake a different variant — a faked variant won't track future
  updates to the real one.
- **Use instance overrides only for the properties the component exposes for override** (text
  content, icon swap, state) — don't detach an instance to make an edit that the component's own
  properties already support.
- **Never detach an instance** to work around a missing property or variant — flag the gap (a
  needed variant that doesn't exist) rather than routing around the library by detaching.
- When a block or component is themed for a specific client's design system rather than Kuat,
  discover that system's own components live (via `assistant_component_search` against the active
  library) rather than carrying over Kuat's own resolution priority or component names — the
  *process* in this skill transfers to other systems; the specific Kuat component names do not.

## Accessibility that follows from component choice

- Use the component's semantic role, not a generic container styled to look like it — an
  interactive-looking element that isn't an actual button/link loses keyboard and screen-reader
  behaviour the library component already provides for free.
- A component's defined states (disabled, expanded, invalid) should drive its accessible attributes
  automatically when using the real component — this is exactly what's lost when a lookalike is
  hand-drawn instead of using the real instance.
- Icon-only interactive components (icon buttons, icon-only tags) need an accessible name from the
  component's own labelling slot/property — not from a visual tooltip alone.

## Version stamp

Stamp deliverables with the reference version this skill was used at, e.g. `Kuat components skill
vX.Y.Z · <date>`, in the deliverable footer or the review's References section.

## Related

- **kuat-tokens** — binding rules once a component is chosen.
- **kuat-patterns** — which components a given page pattern expects, in context.
- **kuat-composition** — hierarchy and density judgment that decides how a component is sized and
  placed, not just which one to use.
- **kuat-create** — the orchestrator; load this skill alongside it for any build task.

<!-- kuat-skill-bundle: kuat-components v1.0.0 rules-ref:d87e1c6cbacb built:2026-08-14 -->
