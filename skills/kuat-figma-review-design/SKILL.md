---
name: kuat-figma-review-design
description: Review an existing Figma design — screens, components, or a whole file — for design-system compliance, accessibility, and composition quality. Use when asked to review, audit, or check design work that lives in a Figma Design file (URL, file key, or selected frames). Produces findings with severities, not a redesign. Not for reviewing code (review-web-app), Figma Make output (kuat-figma-review-make), or building/fixing designs (kuat-figma-design).
---

# Kuat Figma design review

Review the design **as built in the file**, not as it looks in a screenshot: a screen can render
correctly today with every value hardcoded and every component detached, and rot the moment the
library updates. Inspect bindings, not just pixels — then judge the composition, because a
token-perfect screen can still be generic ([composition.md](../../reference/design-language/composition.md)).

Findings only — this skill never fixes or rebuilds. Route fixes to
[kuat-figma-design](../kuat-figma-design/SKILL.md).

## Step 1 — Intake

Run the shared intake — [../_shared/intake.md](../_shared/intake.md) — including **review depth**
(never assume `brand_compliance` for "review this"). Plus:

- The target: file URL/key and which frames/pages are in scope.
- Which design system governs: Equal Experts/Kuat, or the client's own? If not Kuat, review
  against that system's own library and variables — no Kuat defaults.
- What the design is for (page type / scenario), so density and pattern findings judge it against
  the right content type.

## Step 2 — Binding audit (Figma-specific)

Inspect the actual node properties, not the rendering:

- [ ] Every fill, stroke, spacing, and radius bound to a real variable from the target system —
      flag literal hex/px values, including ones that visually match a token.
- [ ] Every text node bound to a real text style — flag hardcoded font/size/weight, including
      correct-looking Lexend set by hand.
- [ ] Every element that exists as a library component is a real instance — flag detached copies
      and hand-drawn lookalikes standing in for available components.
- [ ] Layout uses auto-layout where content can grow — flag absolutely-positioned text that will
      break with real copy lengths.

## Step 3 — Brand, accessibility, craft

Run the common checklist — [../_shared/review-common.md](../_shared/review-common.md) — in full:
brand compliance, accessibility, and **craft & composition** (focal point, density vs the content
type's default, scale contrast). For product UI, judge density against the table in
[../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md).

Also check composition honesty at the review level: does the design claim (or imply) it matches an
existing on-system pattern when it is actually a new composition?

## Step 4 — Observer gate (final pass)

Run the [observer gate](../_shared/observer-gate.md) as a fresh adversarial read — you didn't
build this, which is exactly the position the gate wants. A Fail is a **Major** finding in its own
right, cited by test, and is not averaged away by clean checklists above.

## Step 5 — Report

Map findings to severity and format per [../_shared/report-formats.md](../_shared/report-formats.md),
citing the `reference/...` file + section for each finding and the node/frame it applies to.
Include the version stamp per [../_shared/version-stamp.md](../_shared/version-stamp.md). Flag any
rule-vs-request conflict in the output rather than silently waiving the rule.

## Conflict & ambiguity

- If review depth or scope is ambiguous, ask once before starting.
- If the file mixes Kuat and non-Kuat work, report them separately — don't average two systems
  into one verdict.
- Provisional findings (missing product context at `product_ux`/`full` depth) are marked as such
  with assumptions listed — never invented research.

## Related

- [kuat-figma-design](../kuat-figma-design/SKILL.md) - create counterpart; route fixes here
- [figma-build-checklist](../kuat-figma-design/figma-build-checklist.md) - the build-time gate this review mirrors
- [review-web-app](../review-web-app/SKILL.md) - reviewing the coded implementation instead
- [intake](../_shared/intake.md) · [review-common](../_shared/review-common.md) · [observer-gate](../_shared/observer-gate.md) · [report-formats](../_shared/report-formats.md)
