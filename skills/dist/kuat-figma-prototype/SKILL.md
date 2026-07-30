---
name: kuat-figma-prototype
description: Turn Figma screens into a clickable prototype that demonstrates a user flow end to end — define the flow, audit that every step has a screen and state, wire connections with sensible triggers and restrained animation, and gate the flow for coherence. Use when a request asks for a prototype, clickable flow, walkthrough, or "make it interactive" in Figma. Not for designing the screens themselves (kuat-figma-design — invoked from here when screens are missing), reviewing designs (kuat-figma-review-design), or Figma Make (kuat-figma-make).
---

# Kuat Figma prototype

A prototype is an **argument about a flow**, not a pile of wired frames. Flow first: decide what
journey the prototype demonstrates, prove every step of that journey has a screen, then wire it.
Wiring screens that don't yet exist, or wiring whatever happens to be on the canvas, produces
click-throughs that demo nothing.

## Step 0 — Design-system context

Same hard stop as kuat-figma-design Step 0: confirm Equal
Experts/Kuat vs. another client's system, and the target file, before anything else. If the
screens were just built via that skill, reuse its context.

## Step 1 — Define the flow

Run the shared intake (**intake.md** (see "Shared: intake" below)), then pin the flow itself:

- **Scenario:** what task does the prototype demonstrate, for whom, in what setting (user testing,
  stakeholder walkthrough, handoff illustration)?
- **Entry point** and **end state** — where does the journey start and what does "done" look like?
- **Happy path** as an ordered list of steps.
- **Alternate paths in scope:** which error, empty, and edge states must be reachable? Which are
  explicitly out of scope? (Follow the states rule product UI already uses — empty/loading/error
  when in scope.)
- One flow per prototype run. A second scenario is a second pass, not more wires on the first.

## Step 2 — Screen audit

Map every step from Step 1 to a concrete frame **and state** in the file. Three outcomes per step:

- **Exists** — note the frame.
- **Exists but wrong state** — the frame shows the happy path only and the flow needs its error/
  empty variant; that variant is a missing screen.
- **Missing** — build it via kuat-figma-design (full skill, gates
  included) before wiring. Prototype wiring never justifies an ungated screen.

Do not start wiring until every in-scope step maps to a real frame.

## Step 3 — Wire the flow

Wire via Figma's own tooling (`figma-use`; load Figma's motion skill alongside if animating):

- **Triggers:** on-click on the actual interactive element (the real button/link instance), not on
  the whole frame — a prototype that advances wherever you click tests nothing.
- **Actions:** navigate for page-to-page; overlays for modals/drawers/menus (matching how the
  pattern behaves in product); back for reverse paths.
- **Animation — restraint applies here too:** instant or dissolve is the default. Smart animate
  only where the transition itself carries meaning (an element visibly moving/expanding between
  states). Motion that doesn't clarify the transition is decoration —
  [composition.md]({RULES_DIR}/design-language/composition.md)'s restraint principle, applied
  to time instead of space.
- **Settings:** set the starting frame to the flow's entry point and the device/viewport to match
  the designs.

## Step 4 — Flow coherence gate

Walk the prototype start to finish as the user, then check:

- [ ] Every step of the Step 1 flow is reachable in order from the starting frame — no dead ends.
- [ ] Every interactive-looking element in the flow's path either works or is visibly out of scope
      — no "which bits are clickable?" guessing for the demo audience.
- [ ] In-scope alternate paths (error/empty) are reachable, and each has a way back.
- [ ] Back/escape routes exist wherever the real product would offer them (modals dismiss, back
      returns).
- [ ] The flow demonstrates the scenario **without narration** — someone clicking through cold
      should be able to say what task they just completed.
- [ ] Animation choices pass the restraint test: name what was deliberately kept instant.

Then state plainly what the prototype demonstrates, what is out of scope, and the starting-frame
link. Stamp per **version-stamp.md** (see "Shared: version stamp" below).

## Conflict & ambiguity

- If the flow needs a screen or state the brief never mentioned, surface it — don't silently
  invent product behaviour.
- If asked to wire around a missing screen ("just link it back to the start"), flag that the flow
  will misrepresent the product at that point.
- Ask when the scenario or audience is unclear — the same wiring reads differently for user
  testing vs a stakeholder demo.

## Related skills

- Sibling Figma skills on this surface (each its own bundled SKILL.md in `skills/dist/`): `kuat-figma-design` · `kuat-figma-review-design` · `kuat-figma-make` · `kuat-figma-review-make`
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
| 4 | Output format — for review, see report-formats.md |
| 5 | Deliverable format — for create (Figma, code, copy doc, deck file) |

If the deliverable or review depth is ambiguous, ask once before starting.

<!-- end include: skills/_shared/intake.md -->

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

<!-- kuat-skill-bundle: kuat-figma-prototype v1.0.0 rules-ref:3a78ad12cb5c built:2026-07-30 -->
