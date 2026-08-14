---
name: kuat-tokens
description: Token binding rules for Equal Experts / Kuat design work in Figma — which semantic token or variable to use for colour, spacing, radius, and typography, and which Plugin API call binds it. Use whenever a design, component, or screen is being built or edited against the Kuat design system and needs correct variable/style bindings rather than hardcoded values. Not for composition/layout judgment (kuat-composition), per-medium page patterns (kuat-patterns), or component selection (kuat-components) — load those alongside this skill, not instead of it.
---

# Kuat tokens

Kuat's design values live as **variables and text styles in the Kuat2 Figma library**, not as
numbers in this skill. This skill is the decision framework for which named token to search for
and bind, and which Plugin API call binds it — not a table of hex codes or pixel values. Hardcoded
numbers drift out of sync with the library the moment it updates; a bound variable does not.

**Working rule:** if you are about to type a hex code, a `px` value, or a hardcoded font size into
a node property, stop — search the library for the semantic token first via `search_variables` (for
spacing, radius, size, opacity tokens) or `search_styles` (for text styles and paint styles). If no
matching token exists, flag it in the handoff rather than inventing one (see Fallback below).

## Figma AI tool mapping

| Need | Figma AI tool to use |
|---|---|
| Find a variable (colour, spacing, radius, size) | `search_variables` — search enabled library keys |
| Find a text or paint style | `search_styles` — search enabled library keys |
| Find a component | `assistant_component_search` — search enabled library keys |
| Find a local file variable | `evaluate_script` with `figma.variables.getLocalVariablesAsync()` |
| Import a discovered variable | `evaluate_script` with `figma.variables.importVariableByKeyAsync(key)` |

## Variable naming convention in Kuat2

Kuat2 variables use a `semantic/` prefix for the semantic tier. When searching, include this prefix
for precise results:

| Role | Search query | Example variable name |
|---|---|---|
| Radius — none | `rounded-none` | `semantic/rounded-none` |
| Radius — small | `rounded-sm` | `semantic/rounded-sm` |
| Radius — medium | `rounded-md` | `semantic/rounded-md` |
| Radius — large | `rounded-lg` | `semantic/rounded-lg` |
| Radius — extra large | `rounded-xl` | `semantic/rounded-xl` |
| Radius — 2xl | `rounded-2xl` | `semantic/rounded-2xl` |
| Radius — full/pill | `rounded-full` | `semantic/rounded-full` |

For colour, spacing, and other tokens, search by role keyword (e.g. `background`, `foreground`,
`border`, `spacing`) — the `semantic/` prefix applies consistently across all token categories.

## Binding rules by property type

| Property | Plugin API call | What to bind |
|---|---|---|
| Fill / background colour | `figma.variables.setBoundVariableForPaint(paint, 'color', variable)` | The semantic colour variable, not a raw hex paint |
| Stroke / border colour | `figma.variables.setBoundVariableForPaint(paint, 'color', variable)` on the stroke paint | Same semantic variable as the matching fill role (e.g. a card border binds the border-neutral variable, not a copy of the fill colour) |
| Corner radius | `node.setBoundVariable('topLeftRadius'/'topRightRadius'/... or 'cornerRadius', variable)` | The radius token matching the node's category (see Radius below) |
| Spacing (gap, padding, item spacing in auto-layout) | `node.setBoundVariable('itemSpacing'/'paddingLeft'/'paddingTop'/etc, variable)` | The spacing token nearest the intended value on the 4px scale, not a literal pixel number |
| Size (width/height, where the design system defines a fixed size) | `node.setBoundVariable('width'/'height', variable)` | Only when a component genuinely has a token-defined size (e.g. icon button hit target); free-sizing content areas don't need a bound size |
| Opacity | `node.setBoundVariable('opacity', variable)` | Only for defined states (disabled, hover overlay) that have a token; don't invent opacity values |
| Typography | `node.textStyleId = styleId` (a text **style**, not a variable) | The named text style for the node's role — heading level, body, label, caption — never a manually set font/size/weight combination |
| Import before binding | `figma.variables.importVariableByKeyAsync(key)` | Any variable discovered via `search_variables` that isn't yet imported into the working file |

If `search_variables` or `search_styles` returns a candidate whose name matches the semantic role
but you haven't confirmed its resolved value, prefer it anyway over a hardcoded guess — the library
is the source of truth, this skill is not.

## Semantic tiers — naming hierarchy

Kuat tokens resolve through three tiers. Search and bind at the semantic or component tier, never
the primitive tier, so the binding survives a brand refresh:

1. **Primitive** — raw scale values (a colour ramp step, a spacing unit). Internal; don't bind
   directly to a primitive from a screen — that's what a semantic token is for.
2. **Semantic** — role-based names under the `semantic/` prefix that describe *what the value is
   for*, not what it looks like: `semantic/background-primary`, `semantic/text-foreground`,
   `semantic/border-neutral`, `semantic/rounded-none`. These are what you search for and bind in
   almost every case.
3. **Component** — a token scoped to one component's own states (e.g. a button's own hover
   background). Bind these only when styling that specific component; don't reuse a component
   token outside its component.

Search queries should target the semantic tier by role name: e.g. searching `background primary`
for a primary-action fill, `rounded-none` for a static content panel, `rounded-md` for interactive
elements. A semantic name search will resolve to the right underlying value without this skill ever
stating what that value is.

## Colour — roles, not hex

Kuat's colour system has four tiers of *permission*, not four palettes to pick freely from. This
governs which token family to search for:

| Tier | What it covers | When to reach for it |
|---|---|---|
| **Core** | The primary/secondary/accent brand hues + the neutral scale | Default for almost everything — product UI, most marketing, most slide content. Search for these first |
| **Extended** | A wider set of peer accent colours | Exception only — small pull-out highlights, keyed diagrams, illustration accents. Roughly capped at 5–10% of a page's area. Don't reach for an extended-tier colour as a primary UI colour |
| **Data / categorical** | An ordered sequence reserved for chart series | Charts and data visualisation only. Use in the defined order; stop adding series once you have enough — don't skip around the sequence |
| **Semantic / RAG** | `error`, `warning`, `success`, `info`, `link`, an interaction/hover state | Cross-cutting — reserved for meaning, may appear in any scenario, never reused decoratively. Always pair with an icon or label, never colour alone (WCAG 1.4.1) |

Binding rules that follow from the tier model, regardless of the resolved hex:

- **Full-page background floods** search for a dark-neutral or dark-brand token (or a light
  neutral), never a bright primary/secondary/accent hue as a full-page fill — those bind at
  block/component level and as accent/CTA colours, not as page backgrounds.
- **Never place the two closest-lightness core brand hues adjacent** in a categorical sequence,
  fill, or chart — search results will confirm which pair this is for the active library; treat
  a same-lightness pair as one colour for sequencing purposes.
- **Links vs buttons use different tokens even though they're the same brand hue family.** Search
  for a dedicated `link` (or `text-link`) token for body text and small text; use the primary brand
  token for buttons, icons, and larger CTAs. Don't reuse the button token for a text link — it is
  tuned differently for small-text contrast.
- **A colour that fails required text contrast on a given surface has a documented text-colour
  pairing** — search for the paired foreground token for that background rather than assuming
  white or dark text; some warm accent tokens require dark text, not white.
- Named "combination" or "theme" groupings (mood palettes for marketing/slide decks) are not the
  same thing as the data/categorical sequence — don't substitute one for the other.

## Radius — by node category, not by eyeballing

Radius binds by what the node **is**, not by what looks good:

| Category | Variable to search for | Figma variable name | Applies to |
|---|---|---|---|
| Static content & floating overlays | `rounded-none` | `semantic/rounded-none` | Cards, sections, dividers, content blocks, dialogs, dropdown/select menus, popovers, toasts — an overlay is still "static" in this sense; it's the surface a control sits on, not the control itself |
| Interactive elements | `rounded-md` | `semantic/rounded-md` | Buttons, clickable cards, interactive tiles, tabs, menu items — including a menu item inside an otherwise-flat overlay |
| Form inputs & card-style option fields | `rounded-sm` | `semantic/rounded-sm` | Text inputs, textareas, selects, checkboxes, toggles, and the card-style wrapper of a radio/checkbox/switch |
| Pills / circular elements | `rounded-full` | `semantic/rounded-full` | Avatars, pill-shaped tags/badges, status dots, spinners — always the true pill/circle token so it holds shape at any size |

Never approximate a pill with a large fixed radius value — use `semantic/rounded-full` so it
stays a true stadium/circle regardless of the element's size. If a node's category doesn't map
cleanly to one of these four rows (rare — most of the system is covered), flag it for a human
decision rather than guessing.

## Spacing — scale position, not pixel count

Kuat spacing runs on a small base unit multiplied into a scale (roughly tight → standard →
generous → hero, from a handful of pixels up to page-section scale). Bind to the scale **position**
appropriate to the relationship being expressed, not a specific number remembered from a previous
build:

- Tightly related elements (icon + its label, a value + its unit) → the tightest end of the scale.
- A component's own internal content padding → the standard/default position.
- Distinct sections or unrelated content groups → a noticeably larger step, not one increment up.
- Hero/feature moments (page headers, empty states, onboarding) → the most generous end.

Which position is correct is a **composition** decision (density vs generosity by content type) —
see the kuat-composition skill. This skill only says: whatever position you land on, bind the
matching spacing token, don't hand-type its pixel value.

## Typography — style binding, not manual font settings

Bind text nodes to a named **text style**, never a manual font family + size + weight + line-height
combination, even if the numbers happen to match:

- Search `search_styles` by role: heading level (H1/H2/H3…), body, label, caption/metadata, display.
- A text node with a hand-set font size that happens to equal a style's size is still a defect —
  it won't track future changes to that style.
- Don't invent a new style for a one-off "slightly smaller heading" — pick the nearest existing
  role and defer the gap to a human, or use the next role down.

## Fallback rules — when a token doesn't exist

If `search_variables` or `search_styles` returns nothing for a role you need:

1. **Do not hardcode a value to fill the gap.** A hardcoded stand-in looks identical today and
   silently drifts the moment the library changes.
2. **Flag it explicitly** in the handoff/summary: name the role that had no matching token, and
   what value you used as a visible placeholder so a human can resolve it deliberately.
3. **Prefer the nearest existing semantic token over a new primitive value** if a close match
   exists and the gap is cosmetic rather than structural (e.g. no exact spacing step between two
   defined ones — round to the nearest defined step, don't split the difference with a new number).
4. Never mark a build "complete" or "compliant" while a flagged fallback is still in place —
   surface it as an open item.

## Version stamp

Every deliverable built or reviewed against this skill should be stamped with the reference
version it used — a small footer note or a line in the handoff, e.g. `Kuat tokens skill vX.Y.Z ·
<date>`. If the skill version is unknown, say so rather than omitting the stamp.

## Related

- **kuat-composition** — how generously to spend the spacing scale for a given content type (the
  composition decision this skill's spacing section defers to).
- **kuat-components** — which component to use in the first place, before token-binding it.
- **kuat-patterns** — per-medium defaults that combine tokens, composition, and components.
- **kuat-create** — the orchestrator; load this skill alongside it for any build task.

<!-- kuat-skill-bundle: kuat-tokens v1.0.0 -->
