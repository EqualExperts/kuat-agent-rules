---
name: kuat-review
description: Review existing Equal Experts / Kuat design or Figma Make output — screens, components, or a whole file — for design-system compliance, accessibility, and composition quality. Use when asked to review, audit, or check design work that already exists in Figma or Figma Make. Produces findings with severities, not a redesign — route fixes back through kuat-create. Load alongside kuat-tokens, kuat-composition, kuat-patterns, and kuat-components, whose rules this skill checks against.
---

# Kuat review

Review the design **as built**, not as it looks in a screenshot: a screen can render correctly
today with every value hardcoded and every component detached, and rot the moment the library
updates. Inspect bindings, not just pixels — then judge the composition, because a token-perfect
screen can still be generic.

This skill produces findings only — it never fixes or rebuilds. Route fixes to **kuat-create**
(with kuat-tokens / kuat-composition / kuat-patterns / kuat-components loaded alongside it).

## Step 1 — Intake

Ask, in one grouped message, before producing anything:

- **Review depth** — never assume `brand_compliance` for a bare "review this":
  - `brand_compliance` — tokens, component choice, typography, spacing, accessibility. Needs
    artifacts only.
  - `product_ux` — task fit, copy, flows, empty/error states. Needs artifacts + product context.
  - `full` — brand + product UX + scenario/pattern rules. Needs the above + research/insight.
  If context for `product_ux`/`full` is missing, ask first; if the requester proceeds anyway, mark
  UX findings **provisional** and list assumptions under Open questions. Never invent user
  research or flows that weren't provided.
- **The target** — file/frame/node scope, or the Figma Make project in scope.
- **Which design system governs** — Equal Experts/Kuat, or a different client's own system? If not
  Kuat, review against that system's own library and variables — carry over no Kuat defaults.
- **What the design is for** (page type / scenario), so density and pattern findings judge it
  against the right content type (see kuat-patterns).
- **Output format** — pick one before producing findings, default to `full_report` only if
  declined:

| Format | Use when |
|---|---|
| `full_report` | Structured write-up (sections below) |
| `checklist_only` | Pass/fail by rule group |
| `violations_only` | Prioritised fix list (Critical / Major / Minor) |
| `inline_annotations` | Screen-by-screen or frame-by-frame notes |
| `executive_summary` | Short narrative + top 3–5 risks |

## Step 2 — Binding audit (Figma-specific, run first)

Inspect actual node properties, not the rendering:

- Every fill, stroke, spacing, and radius bound to a real variable — flag literal hex/px values,
  including ones that visually match a token (see kuat-tokens for what "real" binding means).
- Every text node bound to a real text style — flag hand-set font/size/weight, including
  correct-looking values set by hand.
- Every element that exists as a library component or block is a real instance — flag detached
  copies and hand-drawn lookalikes standing in for an available component (see kuat-components'
  resolution traps for the most common misses).
- Auto-layout used wherever content can grow — flag absolutely-positioned text that will break
  once real copy lengths are dropped in.

## Step 3 — Brand, accessibility, craft

- **Tokens & components** — colours from the correct tier (kuat-tokens), radius by node category,
  spacing on-scale, component choice correct for the scenario (kuat-components), no deprecated
  component in use.
- **Accessibility** — single logical H1/page-title per view with sequential heading hierarchy;
  text contrast meets WCAG AA (4.5:1 body, 3:1 large text/UI/graphics); visible focus states for
  keyboard users with accessible names on controls; non-decorative images have descriptive alt
  text, decorative images use an empty alt.
- **Craft & composition** — one clear focal point per screen/section (not several elements at
  equal weight); whitespace matches this content type's density default, not a uniform value
  regardless of context; hierarchy reinforced by scale/weight contrast, not colour alone (see
  kuat-composition for the full principle set and density table).

## Step 4 — Observer gate (final pass, always)

Run kuat-composition's observer gate as a fresh, adversarial read — reviewing is exactly the right
position for this, since you didn't build the artifact. A gate Fail is a **Major** finding in its
own right, cited by which test hit, and is never averaged away by a clean checklist above it.

Also check composition honesty specific to review: does the design claim, or imply, that it
matches an existing on-system pattern when it's actually a new composition invented for this
screen?

## Step 5 — Report

Map every finding to a severity and the chosen output format:

| Severity | Definition |
|---|---|
| **Critical** | Brand or accessibility violations that must be fixed before release |
| **Major** | Clear rule breaks with user-facing impact |
| **Minor** | Nits, inconsistencies, or polish gaps |

`full_report` sections: Summary (scope, depth, context received/missing, overall status,
high-risk gaps) → Checklist (optional; rule group | status | notes) → Violations (severity | rule
| evidence | location | fix) → Recommendations (non-blocking, cite the rule) → Product/UX notes
(only when depth ≥ `product_ux` and context was supplied; otherwise N/A with a stated reason) →
Open questions (missing context/artifacts) → References (which sibling skill's rule was used for
each finding — kuat-tokens / kuat-composition / kuat-patterns / kuat-components — plus the version
stamp below).

Include the version stamp: `Kuat review skill vX.Y.Z · <date>`.

## Conflict & ambiguity

- If review depth or scope is ambiguous, ask once before starting — don't guess and proceed.
- If the file mixes Kuat and non-Kuat work, report them separately; never average two different
  systems into one verdict.
- Provisional findings (missing product context at `product_ux`/`full` depth) are marked as such
  with assumptions listed — never invented research or flows.

## Related

- **kuat-tokens**, **kuat-composition**, **kuat-patterns**, **kuat-components** — the rule sets
  this skill checks against; load alongside it.
- **kuat-create** — routes fixes for anything this skill finds.

<!-- kuat-skill-bundle: kuat-review v1.0.0 rules-ref:5812d78c12ab built:2026-08-14 -->
