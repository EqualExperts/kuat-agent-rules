---
name: kuat-figma-review-design
description: Review an existing Figma design — screens, components, or a whole file — for design-system compliance, accessibility, and composition quality. Use when asked to review, audit, or check design work that lives in a Figma Design file (URL, file key, or selected frames). Produces findings with severities, not a redesign. Not for reviewing code (review-web-app), Figma Make output (kuat-figma-review-make), or building/fixing designs (kuat-figma-design).
---

# Kuat Figma design review

Review the design **as built in the file**, not as it looks in a screenshot: a screen can render
correctly today with every value hardcoded and every component detached, and rot the moment the
library updates. Inspect bindings, not just pixels — then judge the composition, because a
token-perfect screen can still be generic ([composition.md]({RULES_DIR}/design-language/composition.md)).

Findings only — this skill never fixes or rebuilds. Route fixes to
kuat-figma-design.

## Step 1 — Intake

Run the shared intake — **intake.md** (see "Shared: intake" below) — including **review depth**
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

Run the common checklist — **review-common.md** (see "Shared: review common" below) — in full:
brand compliance, accessibility, and **craft & composition** (focal point, density vs the content
type's default, scale contrast). For product UI, judge density against the table in
[media-types/web-product/design.md]({RULES_DIR}/media-types/web-product/design.md).

Also check composition honesty at the review level: does the design claim (or imply) it matches an
existing on-system pattern when it is actually a new composition?

## Step 4 — Observer gate (final pass)

Run the **observer gate** (see "Shared: observer gate" below) as a fresh adversarial read — you didn't
build this, which is exactly the position the gate wants. A Fail is a **Major** finding in its own
right, cited by test, and is not averaged away by clean checklists above.

## Step 5 — Report

Map findings to severity and format per **report-formats.md** (see "Shared: report formats" below),
citing the `reference/...` file + section for each finding and the node/frame it applies to.
Include the version stamp per **version-stamp.md** (see "Shared: version stamp" below). Flag any
rule-vs-request conflict in the output rather than silently waiving the rule.

## Conflict & ambiguity

- If review depth or scope is ambiguous, ask once before starting.
- If the file mixes Kuat and non-Kuat work, report them separately — don't average two systems
  into one verdict.
- Provisional findings (missing product context at `product_ux`/`full` depth) are marked as such
  with assumptions listed — never invented research.

## Related skills

- Sibling Figma skills on this surface (each its own bundled SKILL.md in `skills/dist/`): `kuat-figma-design` · `kuat-figma-prototype` · `kuat-figma-make` · `kuat-figma-review-make`
- Rules standards: `{RULES_DIR}` — [kuat-agent-rules](https://github.com/EqualExperts/kuat-agent-rules)


<!-- begin include: skills/_shared/intake.md -->

## Shared: intake

Ask intake in **one grouped message** before producing anything. Don't assume defaults the user hasn't given.

### Review depth (review skills)

Ask the user to choose — do **not** assume `brand_compliance` for "review this":

| Depth | Evaluates | Minimum context |
|-------|-----------|-----------------|
| `brand_compliance` | Tokens, logo, typography, spacing, accessibility | Artifacts only |
| `product_ux` | Task fit, copy, flows, empty/error states | Artifacts + product context |
| `full` | Brand + product UX + scenario/pattern rules | Above + research/insights |

If context for `product_ux`/`full` is missing, ask first; if the user proceeds anyway, mark UX findings **provisional** and list assumptions under **Open questions**. Never invent user stories or research conclusions.

### Universal intake

| # | Item |
|---|------|
| 1 | Task / scenario (what is this, what is it for) |
| 2 | Audience and constraints (deadline, tech, policy, must-use patterns) |
| 3 | Artifacts (files, URLs, Figma, screenshots) — for review |
| 4 | Output format — for review, see **report-formats.md** (see "Shared: report formats" below) |
| 5 | Deliverable format — for create (Figma, code, copy doc, deck file) |

If the deliverable or review depth is ambiguous, ask once before starting.

<!-- end include: skills/_shared/intake.md -->

<!-- begin include: skills/_shared/review-common.md -->

## Shared: review common

Brand + accessibility core that applies to **every** review intent (web, slides, imagery). Pair with the medium-specific checklist in the calling skill. Cite the `reference/...` file + section for each finding.

### Brand compliance (all depths)

- [ ] Colours from the approved palette / semantic tokens — no arbitrary hex ([design-language/colours.md]({RULES_DIR}/design-language/colours.md))
- [ ] Typography uses the defined scale and roles ([design-language/typography.md]({RULES_DIR}/design-language/typography.md))
- [ ] Spacing follows the 4px grid ([design-language/spacing.md]({RULES_DIR}/design-language/spacing.md))
- [ ] Border radius matches the rule: 0px static, 6px interactive, 4px inputs ([design-language/borders.md]({RULES_DIR}/design-language/borders.md))
- [ ] Logo usage follows [brand/logo.md]({RULES_DIR}/brand/logo.md) (no recolour, distortion, effects, or busy backing)

### Accessibility (all depths)

- [ ] Single logical H1 / page-title per view; sequential heading hierarchy
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large text / UI / graphics)
- [ ] Focus states visible for keyboard users; controls have accessible names
- [ ] Non-decorative images have descriptive alt text; decorative images use `alt=""`

Full requirements: [accessibility/accessibility.md]({RULES_DIR}/accessibility/accessibility.md).

### Craft & composition (all depths)

- [ ] One clear focal point per screen/section — not multiple elements at equal visual weight
      ([design-language/composition.md]({RULES_DIR}/design-language/composition.md))
- [ ] Whitespace use matches the medium's own density default for this content type — not
      uniformly minimal (or uniformly generous) regardless of context; see the medium's own
      reference file (e.g. `web-product/design.md`, `web-marketing/patterns/marketing-pages.md`,
      `slides/content.md`)
- [ ] Hierarchy is reinforced by scale/weight contrast, not colour alone
- [ ] Run the **observer gate** (see "Shared: observer gate" below) as the final pass — a compliant checklist above
      does not by itself clear a screen of being generic; the observer gate makes that a distinct,
      citable finding rather than a vague impression

### Severity & reporting

Map failures to severity (Critical / Major / Minor) and the chosen output format — see **report-formats.md** (see "Shared: report formats" below). Flag any rule-vs-request conflict in the output rather than silently breaking the rule.

<!-- end include: skills/_shared/review-common.md -->

<!-- begin include: skills/install/make-kit-guidelines/craft.md -->

## Shared: craft

Correct tokens and real components are necessary but not sufficient — a screen can use every Kuat
value and still read as generic. These rules define what "considered" means for generated UI, and
the tests output must survive before it ships. Source: the Composition & Craft layer in the
Kuat reference (`reference/design-language/composition.md`).

### Principles

- **One focal point per screen.** Each screen or section has one clear focal point at first
  glance, established by size, weight, position, and whitespace together — not by colour alone,
  and not by making everything equally weighted. A viewer should be able to say what the screen is
  *for* within a second.
- **Whitespace is a decision, not a minimum.** The spacing scale sets the unit; how generously it
  is spent depends on the content type — never one flat value across unlike content.
- **Scale contrast carries hierarchy.** Adjacent hierarchy levels differ in size and weight moving
  together, not colour only. Two levels that differ only by colour are not a hierarchy.
- **Restraint is not flatness.** Simplicity rules out ornament with no job to do; it does not rule
  out a deliberate accent or asymmetry that sharpens the focal point. Every considered screen can
  name at least one thing deliberately left out or dialed back.
- **Real content or it isn't validated.** "Heading text goes here" and lorem ipsum validate
  structure, not composition. Use real or realistic copy for anything that carries hierarchy.

### Density by content type (product UI)

| Content type | Default | Why |
|--------------|---------|-----|
| Metric/summary rows, tables, dashboards | Dense — tight spacing, small type steps between adjacent values | Users scan many concurrent data points; generosity here costs fold-space without adding clarity |
| Page headers, empty states, onboarding, confirmations | Generous — larger type-scale jump, more surrounding whitespace | One message to land; density here reads cramped, not efficient |
| Forms, detail pages | Balanced — generous at section breaks, dense within a section | Fields in a section belong together; breaks are where the reader re-orients |

The dashboard default does not transfer to a settings or onboarding screen just because both are
"product UI" — the content type in hand sets the density.

### The observer tests (run before shipping)

A fresh, adversarial re-read of the whole screen — not a repeat of the line-item checks:

- **Brand-swap:** strip the logo and swap the colour tokens for a competitor's. Still looks
  completely at home on their product? Then the composition is generic — only the colours are
  doing brand work.
- **Colour-only hierarchy:** any two adjacent hierarchy levels differing only by colour? The
  hierarchy isn't real.
- **Uniform spacing:** one spacing value everywhere regardless of content type? Spacing was
  defaulted, not decided.
- **Placeholder:** hierarchy validated only against filler? Unproven, not passing.
- **Named restraint (hard requirement):** name one thing deliberately left out, dialed back, or
  simplified in service of the focal point. No named restraint = fail, regardless of how the
  other checks scored.

Any test hit is a defect to fix or flag plainly — never soften it into "could be more polished".

### Related

- `Guidelines.md` — product character and rules
- `tokens.md` — the values these principles spend
- `components/overview.md` — what to compose with

<!-- end include: skills/install/make-kit-guidelines/craft.md -->

<!-- begin include: skills/_shared/observer-gate.md -->

## Shared: observer gate

Run this **last**, after the itemized checklists have already passed — the shared
**review-common.md** (see "Shared: review common" below) checklist and the calling skill's own build checklist
(the create-design build checklists, the create-web-app pre-handoff checklist). Those checklists
are necessary but not sufficient: they are line-item and self-gradeable, and a screen can satisfy
them box-by-box and still read as generic. This gate is a whole-artifact adversarial judgment —
a critic's read, not a compliance scan.

**Run this as a fresh, adversarial pass, not a continuation of the build.** If the same context
that built or is defending the artifact also runs this gate, it under-catches. Re-read the artifact
as if you did not make it and have no investment in defending it; in a review skill, treat it as a
distinct final stage after the checklists, not one more checklist line.

The principles these tests enforce live in
[design-language/composition.md]({RULES_DIR}/design-language/composition.md).

### The tests

Answer each plainly. Any single "yes" on a rejection test, or a missing answer on the restraint
test, is a finding — cite it, don't soften it.

- **Brand-swap test.** Strip the logo and swap the colour tokens for a competitor's. Would this
  layout still look completely at home on their product? If yes, it's generic — the composition
  isn't doing any brand- or content-specific work, only the colours are.
- **Colour-only hierarchy test.** Do any two adjacent hierarchy levels differ *only* by colour,
  with no difference in size, weight, or spacing? If yes, the hierarchy isn't real — it's colour
  standing in for structure.
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

### Verdict

State plainly: **Pass** (no rejection-test hits, restraint named) or **Fail** (list which tests
hit, and what a fix would look like). Do not average a Fail on this gate against a clean checklist
elsewhere and call the net result a pass — this gate is a distinct, final judgment, not one more
line item. In review skills, report a Fail here as a **Major** finding per
**report-formats.md** (see "Shared: report formats" below), citing the specific test(s) that hit.

### Related

- [design-language/composition.md]({RULES_DIR}/design-language/composition.md) - the principles these tests enforce
- **review-common.md** (see "Shared: review common" below) - run before this gate, not instead of it

<!-- end include: skills/_shared/observer-gate.md -->

<!-- begin include: skills/_shared/report-formats.md -->

## Shared: report formats

Ask the user to select one format before producing findings. Default to `full_report` only if they decline to choose.

| Format | Use when |
|--------|----------|
| `full_report` | Structured Markdown (sections below) |
| `checklist_only` | Pass/fail by rule group |
| `violations_only` | Prioritized fix list (Critical / Major / Minor) |
| `inline_annotations` | Screen-by-screen or slide-by-slide notes in thread |
| `executive_summary` | Short narrative + top 3–5 risks |

### full_report sections

1. **Summary** — Scope, review depth, context received/missing, overall status, high-risk gaps
2. **Checklist** (optional) — Rule/Group | Status (Pass/Fail/Partial/N/A) | Notes
3. **Violations** — Severity | Rule | Evidence | Location | Fix
4. **Recommendations** — Non-blocking improvements; cite rule file
5. **Product/UX notes** — When depth ≥ `product_ux` and context supplied; else N/A with reason
6. **Open questions** — Missing context or artifacts
7. **References** — Rules files used + `RULES_REF` from ensure-rules

### Severity

| Severity | Definition |
|----------|------------|
| **Critical** | Brand or accessibility violations that must be fixed before release |
| **Major** | Clear rule breaks with user-facing impact |
| **Minor** | Nits, inconsistencies, or polish gaps |

<!-- end include: skills/_shared/report-formats.md -->

<!-- begin include: skills/_shared/version-stamp.md -->

## Shared: version stamp

Stamp every deliverable with the reference version it was produced/reviewed against, so output is traceable to a known rule set. Carry forward the `RULES_REF` citation habit from the legacy skills.

### What to record

| Field | Source |
|-------|--------|
| `reference ref` | Git SHA of this `kuat-agent-rules` checkout (`git rev-parse --short HEAD`), or the plugin/package version when consumed via a release |
| `package version` | Installed `@equal-experts/kuat-react` / `kuat-vue` version, when building against published components |
| `date` | Date the artifact was produced or reviewed |

### How to surface it

- **Create:** add a small footer / note on the deliverable, e.g. `EE reference <ref> · <date>`.
- **Review:** include the ref in the **References** section of the report alongside the reference files cited.

If a shell is unavailable and no release version is known, state `reference ref: unknown (local working copy)` rather than omitting it.

<!-- end include: skills/_shared/version-stamp.md -->

<!-- kuat-skill-bundle: kuat-figma-review-design v1.0.0 rules-ref:3a78ad12cb5c built:2026-07-30 -->
