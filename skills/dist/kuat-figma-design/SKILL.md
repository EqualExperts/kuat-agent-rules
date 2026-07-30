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

- **If Kuat:** the target file defaults to Kuat2 — see [media-types/web-product/design.md]({RULES_DIR}/media-types/web-product/design.md)
  for layout templates and component-resolution priority. Confirm the file key/URL if not given.
- **If not Kuat:** carry over no Kuat file key, component, token, or layout default. Discover the
  client's own components, variables, and text styles live (Step 3).

If reached via create-design, reuse its context, concept-count, and
fidelity answers instead of re-asking.

## Step 1 — Brief intake

Run the shared intake — **intake.md** (see "Shared: intake" below) — plus the design-specific
items:

- **Scenario / page type**, sections needed, and which states are in scope (empty / loading / error).
- **Single design or multiple concepts?** Exploratory or comparative briefs default to 2-3 genuinely
  divergent concepts — different layout model, density, or hierarchy, not palette variations of one
  idea ([composition.md]({RULES_DIR}/design-language/composition.md), divergence principle).
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
  density table in [media-types/web-product/design.md]({RULES_DIR}/media-types/web-product/design.md)
  for product UI; never one flat spacing value across unlike content.
- **Scale contrast:** plan real size/weight steps between hierarchy levels — colour alone is not
  hierarchy.
- **Restraint:** name at least one thing you are deliberately leaving out or dialing back in
  service of the focal point. You will need it at the gate — a composition where everything made
  it on has not been edited.

Principles: [composition.md]({RULES_DIR}/design-language/composition.md). For multiple
concepts, sketch each direction's focal-hierarchy and density story separately — if two concepts
share the same story, they are one concept.

## Step 3 — Discovery (live, in full, every request)

There is no persisted registry. List every distinct UI element the build needs, then resolve each
in order: **Code Connect → inspect an existing screen in the target file → `search_design_system`**.
Record resolved (with key) or confirmed-absent for every line item before building —
**figma-build-checklist.md** (see "Shared: figma build checklist" below) Step 1 is the completeness bar.

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

Run **figma-build-checklist.md** (see "Shared: figma build checklist" below) Steps 1-6 in full — discovery
completeness, token binding, component fidelity, composition honesty, **composition quality**, and
the pre-handoff self-audit — then the **observer gate** (see "Shared: observer gate" below) as a fresh
adversarial pass. A checklist-clean build that fails the observer gate is not done.

Stamp the deliverable per **version-stamp.md** (see "Shared: version stamp" below).

## Conflict & ambiguity

- If the request conflicts with a brand or accessibility rule, flag the conflict and recommend the
  compliant option — don't silently break the rule.
- If a wanted component/variable doesn't exist in the target system, flag the gap at handoff —
  never silently substitute a hand-drawn lookalike.
- Ask when the target file, scenario, or scope is unclear; don't guess.

## Related skills

- Sibling Figma skills on this surface (each its own bundled SKILL.md in `skills/dist/`): `kuat-figma-prototype` · `kuat-figma-review-design` · `kuat-figma-make` · `kuat-figma-review-make`
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

<!-- begin include: skills/kuat-figma-design/figma-build-checklist.md -->

## Shared: figma build checklist

Verification checklist for any Figma build that claims to follow a design system — run it at the
start of a build (Step 0) and again before handoff (Steps 1-6). It applies whether the target system
is Kuat or a different client's own library; nothing here assumes Kuat by default.

There is no persisted component/variable registry to keep in sync. Discovery is done live, in full,
every request — Step 1 is what replaces a registry.

---

### Step 0 — Context gate (run first, every session)

Normally satisfied by kuat-figma-design Step 0, which runs before Figma's
own skills are invoked. Re-confirm here if that skill wasn't run for some reason:

- [ ] Confirm which design system is in scope before touching the canvas: Equal Experts / Kuat, or a
      different client or project's own system.
- [ ] **If Kuat:** use the Kuat2 file and the tokens/patterns in [media-types/web-product/design.md]({RULES_DIR}/media-types/web-product/design.md).
- [ ] **If not Kuat:** do not default to Kuat components, tokens, colours, or layout rules. Discover
      the target file's own components and variables using Step 1 below, the same way.
- Kuat defaults are never applied automatically outside EE/Kuat work. Treat this as a hard stop, not
  a preference — ask if it isn't already stated.

### Step 1 — Discovery completeness

- [ ] List every distinct UI element the build needs before writing a single node — not just the
      obvious primitives (button, input, select) but the full set: badges/chips, avatars,
      checkboxes/toggles, dividers, icons, tables, tooltips, empty states, and anything else the
      source calls for.
- [ ] For each element, attempt resolution in order: Code Connect → inspect an existing screen in the
      target file → `search_design_system`. Record a result for **every** line item — resolved (with
      key) or confirmed absent — before building.
- [ ] Don't stop once the obvious elements resolve. A partially-resolved list is not a finished
      discovery pass.

### Step 2 — Token binding

- [ ] Every fill, stroke, spacing, and radius value is bound to a real variable from the target file
      — never a literal hex or pixel value.
- [ ] Every text node uses a real text style from the target file (`node.textStyleId`) — never a
      hardcoded font family/size/weight (e.g. defaulting to Inter) standing in for the system's actual
      type styles.
- [ ] Any value that can't be bound, because no matching variable or text style exists, is flagged
      explicitly in the handoff notes rather than silently hardcoded.

### Step 3 — Component fidelity

- [ ] Every element uses a real component instance where one exists in the target library.
- [ ] Manually constructed elements (shapes or text standing in for a component) are used only when
      Step 1 confirmed no equivalent component exists, and each one is named and flagged in the
      handoff notes.

### Step 4 — Composition honesty

- [ ] State plainly whether the overall layout is copied from an existing on-system screen or newly
      composed from on-system parts. "Built from on-system components" and "matches an existing
      on-system layout" are different claims — don't conflate them.

### Step 5 — Composition quality

Distinct from Step 4: Step 4 discloses *which* layout was used; this step checks whether it's any
good, against [design-language/composition.md]({RULES_DIR}/design-language/composition.md)
**and** the target medium's own specialization (e.g.
[media-types/web-product/design.md]({RULES_DIR}/media-types/web-product/design.md)
for product UI, [media-types/web-marketing/patterns/marketing-pages.md]({RULES_DIR}/media-types/web-marketing/patterns/marketing-pages.md)
for marketing).

- [ ] The build has one identifiable focal point per screen or section — not several elements
      competing at equal visual weight.
- [ ] Spacing choices match the medium's own density default for this content type (e.g. dense for
      a product dashboard's metric row, generous for a marketing hero or a product onboarding
      screen) — not defaulted to the smallest grid value that technically satisfies the token.
- [ ] Hierarchy levels show real scale/weight contrast, not colour-only differentiation.
- [ ] Text content used for validation is real or realistic (from the source brief), not
      placeholder Latin filler or generic labels — if placeholder text was unavoidable, flag it
      explicitly rather than treating the layout as validated.
- [ ] For exploratory/multiple-concept requests (create-design Step 1), concepts
      differ in more than palette or spacing — genuine layout or hierarchy divergence, not
      near-duplicates.

**Before handoff:** run the **observer gate** (see "Shared: observer gate" below) — a separate, ruthless
pass distinct from this checklist. This step can be satisfied box-by-box and still produce
something generic; the observer gate is what catches that.

### Step 6 — Pre-handoff self-audit

- [ ] Re-scan the finished build for: unbound colours/spacing, non-component shapes duplicating an
      available component, and anything skipped in Step 1.
- [ ] Report gaps in the handoff message — the component wanted, why it wasn't resolved, what was
      used instead — rather than shipping silently.

### Related

- kuat-figma-design - the skill this checklist gates
- claude-design-build-checklist - equivalent checklist for the Claude Design route
- create-web-app - invokes this checklist for Figma deliverables
- **intake** (see "Shared: intake" below) - shared intake, run before this checklist

<!-- end include: skills/kuat-figma-design/figma-build-checklist.md -->

<!-- begin include: skills/_shared/observer-gate.md -->

## Shared: observer gate

Run this **last**, after the itemized checklists have already passed — the shared
review-common.md checklist and the calling skill's own build checklist
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
report-formats.md, citing the specific test(s) that hit.

### Related

- [design-language/composition.md]({RULES_DIR}/design-language/composition.md) - the principles these tests enforce
- review-common.md - run before this gate, not instead of it

<!-- end include: skills/_shared/observer-gate.md -->

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

<!-- kuat-skill-bundle: kuat-figma-design v1.0.0 rules-ref:3a78ad12cb5c built:2026-07-30 -->
