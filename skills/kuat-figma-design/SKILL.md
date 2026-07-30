---
name: kuat-figma-design
description: Design screens, components, or views in a Figma Design file — from ideation through composition to a gated, design-system-compliant build. Use for any request that creates or updates design work inside Figma (via figma-generate-design or use_figma), whether Equal Experts/Kuat or another client's system. Steps the agent through craft (focal hierarchy, density, scale contrast) as well as correct component, variable, and text-style usage. Not for prototype wiring (kuat-figma-prototype), reviewing existing designs (kuat-figma-review-design), Figma Make generation (kuat-figma-make), inline mockups (create-design → mockup-build-intake), or code (create-web-app).
---

# Kuat Figma design

Build design work in Figma that is **considered, not just compliant**. Two failure modes to design
out, in order: a screen that ignores the design system (wrong tokens, lookalike components), and a
screen that satisfies the design system but reads as generic — correct and flat. The steps below
gate both.

Figma's own skills (`figma-generate-design`, `figma-use`) don't know which design system is in
scope and must never be edited to bake one in — vendor edits are lost on update, and a Kuat default
would be wrong for other clients' work. This skill resolves everything Figma's skills need
**before** they are invoked, and runs the quality gates after.

## Step 0 — Design-system context (hard stop, every session)

Is this Equal Experts / Kuat work, or work for a different client with its own design system? Ask
if not already stated — never assume Kuat.

- **If Kuat:** the target file defaults to Kuat2 — see [../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md)
  for layout templates and component-resolution priority. Confirm the file key/URL if not given.
- **If not Kuat:** carry over no Kuat file key, component, token, or layout default. Discover the
  client's own components, variables, and text styles live (Step 3).

If reached via [create-design](../create-design/SKILL.md), reuse its context, concept-count, and
fidelity answers instead of re-asking.

## Step 1 — Brief intake

Run the shared intake — [../_shared/intake.md](../_shared/intake.md) — plus the design-specific
items:

- **Scenario / page type**, sections needed, and which states are in scope (empty / loading / error).
- **Single design or multiple concepts?** Exploratory or comparative briefs default to 2-3 genuinely
  divergent concepts — different layout model, density, or hierarchy, not palette variations of one
  idea ([composition.md](../../reference/design-language/composition.md), divergence principle).
- **Real content.** Get real or realistic copy from the brief. A layout validated against "Heading
  text goes here" is validated for structure only, not composition — if placeholder text is
  unavoidable, plan to flag it at handoff rather than treating the design as validated.
- Whether the source contains images — that triggers the parallel capture workflow in Figma's own
  `figma-generate-design` skill.

## Step 2 — Compose before you build

Decide the composition on paper before touching the canvas — these decisions are cheap here and
expensive after 40 nodes exist:

- **Focal point:** what is the one thing each screen or section is for? Which element carries it,
  and what combination of size, weight, position, and whitespace makes that unmistakable?
- **Density:** which density default does this content type take — dense (dashboards, tables,
  metric rows) or generous (page headers, onboarding, empty states, confirmations)? See the
  density table in [../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md)
  for product UI; never one flat spacing value across unlike content.
- **Scale contrast:** plan real size/weight steps between hierarchy levels — colour alone is not
  hierarchy.
- **Restraint:** name at least one thing you are deliberately leaving out or dialing back in
  service of the focal point. You will need it at the gate — a composition where everything made
  it on has not been edited.

Principles: [composition.md](../../reference/design-language/composition.md). For multiple
concepts, sketch each direction's focal-hierarchy and density story separately — if two concepts
share the same story, they are one concept.

## Step 3 — Discovery (live, in full, every request)

There is no persisted registry. List every distinct UI element the build needs, then resolve each
in order: **Code Connect → inspect an existing screen in the target file → `search_design_system`**.
Record resolved (with key) or confirmed-absent for every line item before building —
[figma-build-checklist.md](./figma-build-checklist.md) Step 1 is the completeness bar.

## Step 4 — State the plan

Before invoking Figma's skills, state: target file and which design-system rules apply; the
sections/components needed; whether this reuses an existing on-system layout or is a new
composition; the focal-point and density decisions from Step 2. Confirm with the user if the plan
is non-trivial (multiple sections, a pattern not seen elsewhere in the file).

## Step 5 — Build

Invoke Figma's own skills (`figma-generate-design`, `figma-use`) **unmodified**, using the context
above. Bind every fill, stroke, spacing, and radius to a real variable; every text node to a real
text style; use real component instances wherever Step 3 resolved one.

## Step 6 — Gate before handoff

Run [figma-build-checklist.md](./figma-build-checklist.md) Steps 1-6 in full — discovery
completeness, token binding, component fidelity, composition honesty, **composition quality**, and
the pre-handoff self-audit — then the [observer gate](../_shared/observer-gate.md) as a fresh
adversarial pass. A checklist-clean build that fails the observer gate is not done.

Stamp the deliverable per [../_shared/version-stamp.md](../_shared/version-stamp.md).

## Conflict & ambiguity

- If the request conflicts with a brand or accessibility rule, flag the conflict and recommend the
  compliant option — don't silently break the rule.
- If a wanted component/variable doesn't exist in the target system, flag the gap at handoff —
  never silently substitute a hand-drawn lookalike.
- Ask when the target file, scenario, or scope is unclear; don't guess.

## Related

- [figma-build-checklist](./figma-build-checklist.md) - the execution-time gate for Steps 3-6
- [kuat-figma-prototype](../kuat-figma-prototype/SKILL.md) - wire these screens into a clickable flow
- [kuat-figma-review-design](../kuat-figma-review-design/SKILL.md) - review counterpart
- [create-design](../create-design/SKILL.md) - upstream route decision (Figma vs Claude Design)
- [create-web-app](../create-web-app/SKILL.md) - code deliverables instead of Figma
- [intake](../_shared/intake.md) · [observer-gate](../_shared/observer-gate.md) · [version-stamp](../_shared/version-stamp.md)
