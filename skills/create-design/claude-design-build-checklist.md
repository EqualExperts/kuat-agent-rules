# Claude Design Build Checklist

Verification checklist for a Kuat-targeted mockup built with the Claude Design inline-mockup tool.
Mirrors [figma-build-checklist.md](./figma-build-checklist.md) for the route that can't instantiate
real components or bind live variables — so it leans harder on explicit flagging of what's exact vs.
approximated. Run at the start of a build (Step 0) and again before returning the mockup (Steps 1-6).

There is no persisted token/component registry for Claude Design either — resolution happens live
against the same sources code and Figma builds use ([reference/design-language/](../../reference/design-language/),
[component-registry.md](../../reference/media-types/web-product/component-registry.md)), every
request.

---

## Step 0 — Context and fidelity gate

Normally satisfied by [mockup-build-intake](../mockup-build-intake/SKILL.md) (and
[create-design](./SKILL.md) upstream of it). Re-confirm here if that wasn't run:

- [ ] Confirmed Equal Experts/Kuat vs. a different client's system before using any Kuat value.
- [ ] Confirmed the fidelity level (low/mid/high) and therefore how much of Steps 1-3 below is
      mandatory vs. informational.

## Step 1 — Discovery completeness

- [ ] Listed every distinct UI element the mockup needs — badges, avatars, checkboxes, dividers,
      tables, empty states, not just the obvious primitives.
- [ ] For each element at mid/high fidelity, resolved its real colour/type/spacing/radius values and
      (where one exists) its component visual spec, from the reference sources, before writing markup.

## Step 2 — Token fidelity (not generic Claude Design tokens)

- [ ] Colours, type, spacing, and radius in the HTML/CSS are the actual Kuat values (exact hex/rem),
      not the tool's own generic surface/text/border tokens standing in unlabelled.
- [ ] Any value that couldn't be resolved to a real Kuat token is flagged in the handoff notes, not
      silently approximated.

## Step 3 — Component visual fidelity

- [ ] Each element's appearance (padding, radius, type, states) matches the real Kuat component's
      documented spec as closely as HTML/CSS allows.
- [ ] The mockup is presented as what it is — a visual approximation, not a real component instance —
      and any element with no real Kuat equivalent is named and flagged.

## Step 4 — Composition honesty

- [ ] States plainly whether the overall layout matches an existing Kuat pattern/screen or is newly
      composed from on-system parts.

## Step 5 — Composition quality

Distinct from Step 4: Step 4 discloses *which* layout was used; this step checks whether it's any
good, against [../../reference/design-language/composition.md](../../reference/design-language/composition.md)
and the target medium's own specialization. This applies regardless of the fact that Claude Design
renders through generic CSS rather than bound Kuat variables (Steps 1-3 above) — composition is a
property of the layout itself, not of how faithfully its tokens are bound.

- [ ] The mockup has one identifiable focal point per screen or section — not several elements
      competing at equal visual weight.
- [ ] Spacing choices match the medium's own density default for this content type — not defaulted
      to the smallest value that technically satisfies the resolved token.
- [ ] Hierarchy levels show real scale/weight contrast, not colour-only differentiation.
- [ ] Content used to validate hierarchy is real or realistic, not placeholder filler — if
      placeholder text was unavoidable at low fidelity, flag it explicitly per Step 0's fidelity
      gate rather than treating the layout as validated.
- [ ] For exploratory/multiple-concept requests ([create-design](./SKILL.md) Step 1), concepts
      differ in more than palette or spacing — genuine layout or hierarchy divergence, not
      near-duplicates.

**Before returning the mockup:** run the [observer gate](../_shared/observer-gate.md) — the same
gate as the Figma route, unmodified. It doesn't care which tool produced the artifact.

## Step 6 — Pre-handoff self-audit

- [ ] Re-scan for unresolved/generic values that should have been mapped to real Kuat tokens, and for
      any element skipped in Step 1.
- [ ] State the fidelity level achieved and list what was deliberately approximated because of that
      fidelity band vs. what's a genuine gap.
- [ ] If the mockup is meant to progress toward a build-ready deliverable, say so and point to
      [figma-build-intake](../figma-build-intake/SKILL.md) as the next step — Claude Design output is
      not itself a build-ready artifact.

## Related

- [figma-build-checklist](./figma-build-checklist.md) - equivalent checklist for the Figma route
- [mockup-build-intake](../mockup-build-intake/SKILL.md) - runs before this checklist
- [create-design](./SKILL.md) - upstream context/fidelity/route decision
