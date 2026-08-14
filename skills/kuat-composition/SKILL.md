---
name: kuat-composition
description: Composition and craft rules for Equal Experts / Kuat design work — focal hierarchy, density defaults by content type, scale contrast, whitespace as a decision, restraint, and the observer-gate tests that catch a compliant-but-generic screen. Use for any Figma design, review, or Figma Make generation that needs layout and hierarchy judgment, not just correct tokens. Load alongside kuat-tokens (the values these principles spend) and kuat-patterns (how each medium specializes them).
---

# Kuat composition

Correct tokens, real components, and accessible contrast are **necessary but not sufficient**. A
screen can pass every token and component check and still read as generic — flat, interchangeable,
doing nothing that a competitor's product couldn't do with a colour swap. This skill states what
"considered" means, so it can be checked rather than felt, and gives the adversarial gate that
catches the compliant-but-generic case before it ships.

Two failure modes to design out, in order of how often they're missed: a screen that ignores the
design system (wrong tokens, lookalike components — see kuat-tokens and kuat-components), and a
screen that satisfies the design system but reads as generic anyway. This skill is entirely about
the second failure mode.

## Principle 1 — Focal hierarchy

Every screen or section has **one clear focal point** at first glance, established by a deliberate
combination of size, weight, position, and whitespace working together — not by colour alone, and
not by making every element the same visual weight.

**Why:** a viewer should be able to say what a screen is *for* within a second, without reading
every line of copy. A layout where five elements compete for attention equally has no hierarchy,
regardless of whether each element individually uses correct tokens.

**Compliant example (in words):** a dashboard's top metric card is visibly larger and sits first in
reading order; secondary metrics are smaller and grouped below it; the eye lands on the primary
number before anything else.

**Non-compliant example:** four metric cards of identical size, weight, and position, distinguished
only by their accent colour — nothing tells the viewer which number matters most.

## Principle 2 — Whitespace is a decision, not a minimum

The spacing scale (see kuat-tokens) sets the *unit*; how generously that unit is spent is a
separate, deliberate decision for each piece of content — not always the smallest value that
satisfies the grid, and not always the largest either. Which end of the range is correct depends
on content type (see Density below) and medium (see kuat-patterns). Neither density nor generosity
is a universal default.

**Compliant example:** a metrics table uses tight row spacing so more rows are visible without
scrolling; the page header above it uses generous spacing so the page's purpose reads clearly
before the data starts.

**Non-compliant example:** the same spacing value applied to the metrics table and the page header
because it was the default, not a decision — "uniform spacing regardless of content" is a named
defect (see the observer gate).

## Principle 3 — Scale contrast carries hierarchy

Distinctiveness between hierarchy levels comes from **deliberate contrast** — size, weight, and
spacing moving together — not from a colour or a border standing in for structure. A heading one
real step up in the type scale from body text, with generous surrounding whitespace, reads as more
considered than the same heading in the same position distinguished only by colour.

**Compliant example:** a section heading is a full type-scale step larger and semibold; the body
text beneath it is the base size and regular weight — two real, stacked differences.

**Non-compliant example:** the "heading" and the body text are the same size and weight, and the
only difference is that the heading is in the primary brand colour. Two adjacent hierarchy levels
that differ *only* by colour are not a real hierarchy.

## Principle 4 — Restraint is not flatness

Simplicity rules out *unnecessary* complexity — visual noise with no job to do. It does not rule
out *deliberate* visual interest that serves the focal point: a single well-placed accent, an
intentionally asymmetric layout, or one section that breaks the grid to draw the eye are restrained
choices, not decoration, when they exist to sharpen hierarchy or focus. The failure this principle
guards against is ornamentation with no job to do — not visual interest itself.

Every considered composition can **name at least one thing it deliberately left out, dialed back,
or declined to add**. A composition where everything considered made it onto the screen has not
been edited — see the missing-restraint test below.

## Principle 5 — Real content sharpens hierarchy decisions

Placeholder text ("Title", "Heading text goes here", generic filler) hides whether a hierarchy
decision actually works, because placeholder content has no real length, tone, or information
density to test against. A layout validated only against placeholder copy is validated for
structure only — not for composition. Use real or realistic copy for anything that carries
hierarchy; if placeholder text is genuinely unavoidable at handoff time, flag it rather than
treating the design as validated.

## Principle 6 — Divergence is a legitimate output, not just a fallback

For exploratory or comparative briefs, genuinely different compositions — a different layout
model, density, or hierarchy, not palette or spacing variations of one idea — surface the
considered option faster than committing to the first assembly that satisfies the component map.
Concepts that share the same structure and differ only in accent colour or minor spacing are one
idea presented twice, not real divergence (see the cosmetic-divergence test).

## Density by content type (product UI default)

Product UI carries the sharpest density tension of any medium: some content is correctly dense,
some correctly generous, and defaulting to one everywhere is the single most common cause of flat,
generic product screens.

| Content type | Default | Why |
|---|---|---|
| Metric/summary rows, tables, dashboards | **Dense** — tight spacing, small type-scale steps between adjacent values | Users scan many concurrent data points; generosity here costs fold-space without adding clarity |
| Page headers, empty states, onboarding, confirmations | **Generous** — a larger type-scale jump, more surrounding whitespace | One message to land; density here reads as cramped, not efficient |
| Forms, detail pages | **Balanced** — generous at section breaks, dense within a section | Fields within a section belong together; section breaks are where the reader re-orients |

The dashboard default does **not** transfer to a settings or onboarding screen just because both
are "product UI" — the content type in hand, not the medium label, sets the density. Marketing and
slides specialise this differently again (see kuat-patterns): marketing defaults to generous
throughout because the goal is persuasion, not density; slides treat "one idea per slide" as their
focal-hierarchy rule and "empty area is fine" as their whitespace rule.

## The observer gate — run last, adversarially

Run this **after** any itemized token/component checklist has already passed, as a distinct final
stage — not one more line item. Itemized checklists are necessary but not sufficient: they are
self-gradeable and a screen can satisfy them box-by-box and still read as generic. This gate is a
whole-artifact, critic's judgment.

**Re-read the artifact as if you didn't build it and have no investment in defending it.** If the
same context that built the screen also runs this gate, it under-catches — treat it as a genuinely
fresh, skeptical look.

Answer each test plainly. Any single "yes" on a rejection test, or a missing answer on the
restraint test, is a finding — cite it, don't soften it into "could be more polished":

- **Brand-swap test.** Strip the logo and swap the colour tokens for a competitor's. Would this
  layout still look completely at home on their product? If yes, it's generic — only the colours
  are doing brand work.
- **Hierarchy-differentiation test.** Do any two adjacent hierarchy levels lack a real difference
  in size or weight — either because they're flatly identical, or because colour is the *only*
  thing distinguishing them? Either case fails: no differentiation at all is one step worse than
  "differs only by colour," and both count as a hit.
- **Uniform-spacing test.** Is every section using the same spacing value regardless of what the
  content actually is — dense data and a persuasive hero treated identically? If yes, spacing was
  defaulted, not decided.
- **Cosmetic-divergence test** (multi-concept work only). Do the "different" concepts share the
  same structure and differ only in accent colour or minor spacing? If yes, they're one idea
  presented twice.
- **Missing-restraint test (hard requirement).** Name one thing that was deliberately left out,
  dialed back, or simplified in service of the focal point. If nothing was cut, nothing was
  actually restrained — **at least one named restraint decision is required to pass this gate**,
  regardless of how the checklists scored.
- **Placeholder test.** Was hierarchy validated against real or realistic content, or only against
  generic filler? Filler-only validation is unproven, not passing.

**Verdict:** state plainly **Pass** (no rejection-test hits, restraint named) or **Fail** (list
which tests hit, and what a fix would look like). Do not average a Fail against a clean checklist
elsewhere and call the net result a pass — this gate is a distinct, final judgment. In a review
context, a Fail here is a Major finding in its own right, cited by test.

## Medium specialization — pointers, not duplication

These six principles and the density table above are the product-UI default. Each medium
specialises them differently; the specifics live in **kuat-patterns**, not here:

- **Web product** — when density is correct (dashboards, tables) vs when generosity is correct
  (onboarding, empty states, confirmations) — the table above.
- **Web marketing** — persuasive-default spacing throughout (hero, CTA sections); "one message per
  section" and "one primary CTA per section" as this medium's focal-hierarchy rule.
- **Slides** — "one idea per slide" as the focal-hierarchy rule; "empty area is fine" as the
  whitespace rule.

## Version stamp

Stamp deliverables with the reference version this skill was used at, e.g. `Kuat composition skill
vX.Y.Z · <date>`, in the deliverable footer or the review's References section.

## Related

- **kuat-tokens** — the spacing/type-scale values these principles spend; load together.
- **kuat-patterns** — per-medium specialisation of density and focal-hierarchy rules.
- **kuat-components** — which component carries a given piece of hierarchy.
- **kuat-create** — the orchestrator; load this skill alongside it for any build or review task.

<!-- kuat-skill-bundle: kuat-composition v1.0.0 -->
