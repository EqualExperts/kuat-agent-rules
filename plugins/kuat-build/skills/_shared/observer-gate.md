# Observer gate — adversarial anti-slop pass

Run this **last**, after the itemized checklists have already passed — the shared
[review-common.md](./review-common.md) checklist and the calling skill's own build checklist
(the create-design build checklists, the create-web-app pre-handoff checklist). Those checklists
are necessary but not sufficient: they are line-item and self-gradeable, and a screen can satisfy
them box-by-box and still read as generic. This gate is a whole-artifact adversarial judgment —
a critic's read, not a compliance scan.

**Run this as a fresh, adversarial pass, not a continuation of the build.** If the same context
that built or is defending the artifact also runs this gate, it under-catches. Re-read the artifact
as if you did not make it and have no investment in defending it; in a review skill, treat it as a
distinct final stage after the checklists, not one more checklist line.

The principles these tests enforce live in
[reference/design-language/composition.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/composition.md).

## The tests

Answer each plainly. Any single "yes" on a rejection test, or a missing answer on the restraint
test, is a finding — cite it, don't soften it.

- **Brand-swap test.** Strip the logo and swap the colour tokens for a competitor's. Would this
  layout still look completely at home on their product? If yes, it's generic — the composition
  isn't doing any brand- or content-specific work, only the colours are.
- **Hierarchy-differentiation test** (broadened after batch-1 eval evidence — see
  `Kuat/composition-craft-proposal/eval-results-g2-batch1.md`). Do any two adjacent hierarchy
  levels lack a real difference in size or weight — either because they're **flatly identical**, or
  because **colour is the only thing distinguishing them**? Either case is a fail: the original
  wording only caught "differs *only* by colour," but live output showed the more common failure is
  no differentiation at all, which is a step below that. If either is true, the hierarchy isn't
  real — colour, or nothing, is standing in for structure.
- **Uniform-spacing test.** Is every section using the same spacing value regardless of what the
  content actually is — dense data and a persuasive hero treated identically? If yes, spacing was
  defaulted, not decided (see composition.md's whitespace principle).
- **Cosmetic-divergence test.** For multi-concept work, do the "different" concepts share the same
  structure and differ only in accent colour or minor spacing? If yes, they're one idea presented
  twice, not real divergence.
- **Missing-restraint test (hard requirement).** Name one thing that was deliberately left out,
  dialed back, or simplified in service of the focal point. If nothing was cut — everything
  considered made it onto the screen — nothing was actually restrained. **At least one named
  restraint decision is required to pass this gate.** No named restraint = fail, regardless of how
  the checklists scored.
- **Placeholder test.** Was hierarchy validated against real or realistic content, or only against
  generic filler? Filler-only validation is unproven, not passing.

## Verdict

State plainly: **Pass** (no rejection-test hits, restraint named) or **Fail** (list which tests
hit, and what a fix would look like). Do not average a Fail on this gate against a clean checklist
elsewhere and call the net result a pass — this gate is a distinct, final judgment, not one more
line item. In review skills, report a Fail here as a **Major** finding per
[report-formats.md](./report-formats.md), citing the specific test(s) that hit.

## Related

- [reference/design-language/composition.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/composition.md) - the principles these tests enforce
- [review-common.md](./review-common.md) - run before this gate, not instead of it
