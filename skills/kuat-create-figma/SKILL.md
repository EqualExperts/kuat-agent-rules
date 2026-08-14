---
name: kuat-create
description: Orchestrator for building Equal Experts / Kuat design work in Figma, Figma Make, or Figma prototypes — screens, components, views, or full flows, from ideation through a gated, design-system-compliant build. Use for any request that creates or updates design work for Equal Experts/Kuat inside a Figma surface. Steps through intake, composition, token/component resolution, and quality gates, and tells you which sibling skill to load for each rule set. Not for reviewing existing work (kuat-review) or code outside Figma.
---

# Kuat create

Build design work that is **considered, not just compliant**. Two failure modes to design out, in
order: a screen that ignores the design system (wrong tokens, lookalike components), and a screen
that satisfies the design system but reads as generic anyway — correct and flat. This skill
sequences the work; the sibling skills below hold the actual rule content. Load each sibling skill
at the point it's needed — skills on this surface can't call each other automatically, so pull them
in yourself as this workflow reaches the matching step.

| Sibling skill | Load it for |
|---|---|
| **kuat-tokens** | Which variable/style to bind for colour, spacing, radius, typography |
| **kuat-composition** | Focal hierarchy, density, scale contrast, restraint, the observer gate |
| **kuat-patterns** | The layout shell and expected components for the page type in hand |
| **kuat-components** | Resolution priority, which specific component to use, slots, states |
| **kuat-review** | After building, or when asked to check existing work instead of build |

Figma's own generation and editing tools (design/prototype/make generation, the plugin-execution
tool) don't know which design system is in scope and must never be assumed to default to Kuat —
that assumption would be wrong the moment this same workflow is reused for a different client. This
skill resolves the design-system context before invoking them, and runs the quality gates after.

## Step 0 — Design-system context (hard stop, every session)

Is this Equal Experts/Kuat work, or work for a different client with its own design system? Ask if
not already stated — never assume Kuat by default.

- **If Kuat:** load kuat-patterns for the target layout shell and kuat-components for resolution
  priority; confirm the target file (key/URL) if not given.
- **If not Kuat:** carry over no Kuat file, component, token, or layout default. Discover the
  client's own components, variables, and text styles live via design-system search — this
  skill's *workflow* (intake → compose → resolve → build → gate) still applies; the Kuat-specific
  sibling skills' *content* does not.

## Step 1 — Intake

Ask, in one grouped message, before producing anything:

1. **Scenario / page type** — which pattern this is (see kuat-patterns), sections needed, which
   states are in scope (empty / loading / error / populated — see kuat-components).
2. **Single design or multiple concepts?** Exploratory or comparative briefs default to 2–3
   genuinely divergent concepts — different layout model, density, or hierarchy, not palette
   variations of one idea (kuat-composition, divergence principle).
3. **Real content.** Get real or realistic copy from the brief. A layout validated against
   placeholder text is validated for structure only, not composition.
4. **Audience and constraints** — deadline, must-use patterns, anything already decided.
5. Whether the source contains reference images — route to the parallel image-based generation
   path if the design/build tool being used supports it.

If deliverable format is ambiguous (Figma design vs. Figma Make vs. prototype wiring), ask once.

## Step 2 — Compose before you build

Decide composition on paper before touching the canvas — cheap here, expensive after nodes exist.
Load **kuat-composition** for the full principle set; at minimum, before building, decide:

- **Focal point** — what is the one thing each screen/section is for, and which element carries it.
- **Density** — dense or generous for this content type (kuat-composition's density table via
  kuat-patterns' per-scenario specifics) — never one flat spacing value across unlike content.
- **Scale contrast** — real size/weight steps between hierarchy levels, not colour-only difference.
- **Restraint** — name at least one thing deliberately left out or dialed back. You'll need this
  at the gate in Step 4.

## Step 3 — Build

- Load **kuat-patterns** for the shell and expected components for this scenario.
- Load **kuat-components** and resolve every component in priority order (blocks → custom
  components → themed primitives → custom build) before placing a single node — don't invent a
  layout or component unless the brief and pattern say to.
- Load **kuat-tokens** and bind every fill, stroke, radius, spacing value, and text node to a real
  variable or style — never a hardcoded value. If a needed token doesn't exist, flag it rather than
  hardcoding a stand-in (kuat-tokens' fallback rule).
- Cover the states the scenario needs (empty/loading/error/populated — kuat-components), not just
  the default populated state.
- Ask if scenario, audience, or constraints are unclear partway through — don't guess silently.

## Step 4 — Gate before handoff

Two passes, in order, neither optional:

1. **Checklist pass** — tokens bound (not hardcoded), correct component chosen for each slot, all
   required states present, accessibility basics (contrast, focus states, alt text, heading order).
2. **Observer gate** (kuat-composition) — a fresh, adversarial re-read: brand-swap test,
   hierarchy-differentiation test, uniform-spacing test, cosmetic-divergence test (multi-concept
   work), missing-restraint test (hard requirement — cite the restraint decision from Step 2),
   placeholder test. Any rejection-test hit, or a missing restraint answer, is a defect to fix or
   flag — not something to soften into "could be more polished." A Fail here is not overridden by a
   clean checklist above it.

## Step 5 — Deliver

- State the design-system context used (Kuat, or the named client system) and the file/frames
  produced or updated.
- List any flagged gaps: missing tokens, missing variants, states not covered, and why (e.g. no
  data available to design an empty state against).
- Stamp the deliverable: `Kuat create skill vX.Y.Z · <date>`.
- If asked to check this work later, or to review something someone else built, that's
  **kuat-review**, not this skill — route there instead of re-running this workflow defensively on
  your own output.

## Conflict & ambiguity

- If the design-system context (Step 0) isn't answered, stop and ask — don't proceed on an assumed
  default.
- If a rule in a sibling skill conflicts with an explicit instruction in the brief, flag the
  conflict in the handoff rather than silently overriding either one.

## Related

- **kuat-tokens**, **kuat-composition**, **kuat-patterns**, **kuat-components** — load each at the
  step above where it's needed.
- **kuat-review** — for checking existing work instead of building new work.

<!-- kuat-skill-bundle: kuat-create v1.0.0 -->
