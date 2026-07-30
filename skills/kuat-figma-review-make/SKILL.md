---
name: kuat-figma-review-make
description: Review Figma Make output — the generated app and its code — for genuine Kuat system usage, brand and accessibility compliance, and composition quality. Use when asked to review, audit, or check something built in Figma Make. Verifies the code imports real @equal-experts/kuat-react components and kuat-core tokens rather than lookalikes. Produces findings with severities, not fixes. Not for Figma Design files (kuat-figma-review-design), code outside Make (review-web-app), or building (kuat-figma-make).
---

# Kuat Figma Make review

Make output is **code**, so review the code, not the preview. The defining failure mode on this
surface is the plausible lookalike: generated JSX that renders a convincing Kuat button while
importing nothing from `@equal-experts/kuat-react` — visually right today, drifting tomorrow, and
carrying none of the package's accessibility behaviour. Pixels can't tell you that; imports can.

Findings only — route fixes back through `kuat-figma-make`.

## Step 1 — Intake

Run the shared intake — [../_shared/intake.md](../_shared/intake.md) — including **review depth**.
Plus: the Make file/link, what was asked of Make, whether the Kuat Make kit was active for the
build (it changes what "should" have happened), and which screens are in scope.

## Step 2 — Package audit (the Make-specific core)

Read the generated code:

- [ ] Every component that exists in `@equal-experts/kuat-react` is imported from the package —
      list the imports, then hunt for local re-implementations of things the package exports
      (a `const Button = ...` next to an available `kuat-react` Button is a Major finding however
      good it looks).
- [ ] Components with package usage guides (Button, ButtonGroup, Callout, StatusBadge, Tag,
      TagGroup, CounterBadge, KuatHeader) follow their documented API and variants — flag invented
      props/variants.
- [ ] Custom-built elements exist only where no Kuat equivalent does, and each is named as a gap —
      not presented as a Kuat component.
- [ ] If no kit was active for the build, say so up front: the whole component layer is then
      expected to be lookalikes, and the finding is "rebuild with the kit", not fifty individual
      import findings.

## Step 3 — Token audit

- [ ] Colours/type/spacing/radius resolve to kuat-core semantic tokens / CSS variables (the kit's
      `tokens.md`) — flag raw hex, arbitrary px, and Make's own generic tokens standing in.
- [ ] Radius rule: 0 static, 6px interactive, 4px inputs. Dark nav + white monochrome logo for
      product shells. Status colours paired with icon/label, never colour alone.

## Step 4 — Brand, accessibility, craft

Run the common checklist — [../_shared/review-common.md](../_shared/review-common.md) — in full:
brand compliance, accessibility (heading structure, contrast, focus states, accessible names in
the generated code), and **craft & composition** (focal point, density vs the content type's
default, scale contrast). Then run the [observer gate](../_shared/observer-gate.md) as the final
adversarial pass — a Fail there is its own Major finding, cited by test, never averaged away by
clean audits above.

## Step 5 — Report

Severity and format per [../_shared/report-formats.md](../_shared/report-formats.md), citing the
rule source (kit guideline file or `reference/...` section) and the file/component each finding
applies to. Version stamp per [../_shared/version-stamp.md](../_shared/version-stamp.md) —
include the kit/package version reviewed against. Flag rule-vs-request conflicts rather than
waiving them.

## Conflict & ambiguity

- Depth or scope ambiguous: ask once first.
- Can't see the generated code (only a preview/screenshot): say the package and token audits are
  **not possible** from pixels and mark any visual-only findings provisional — don't fake an
  import audit.

## Related

- Build counterpart: `kuat-figma-make` (separate skill on this surface)
- Kit guideline sources staged in the rules repo: [make-kit-guidelines](../install/make-kit-guidelines/README.md)
- Reviewing a Figma Design file instead: `kuat-figma-review-design` · code outside Make: `review-web-app`
- [intake](../_shared/intake.md) · [review-common](../_shared/review-common.md) · [observer-gate](../_shared/observer-gate.md) · [report-formats](../_shared/report-formats.md)
