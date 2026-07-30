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

Same hard stop as [kuat-figma-design](${CLAUDE_PLUGIN_ROOT}/skills/kuat-figma-design/SKILL.md) Step 0: confirm Equal
Experts/Kuat vs. another client's system, and the target file, before anything else. If the
screens were just built via that skill, reuse its context.

## Step 1 — Define the flow

Run the shared intake ([skills/_shared/intake.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md)), then pin the flow itself:

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
- **Missing** — build it via [kuat-figma-design](${CLAUDE_PLUGIN_ROOT}/skills/kuat-figma-design/SKILL.md) (full skill, gates
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
  [composition.md](${CLAUDE_PLUGIN_ROOT}/reference/design-language/composition.md)'s restraint principle, applied
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
link. Stamp per [skills/_shared/version-stamp.md](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md).

## Conflict & ambiguity

- If the flow needs a screen or state the brief never mentioned, surface it — don't silently
  invent product behaviour.
- If asked to wire around a missing screen ("just link it back to the start"), flag that the flow
  will misrepresent the product at that point.
- Ask when the scenario or audience is unclear — the same wiring reads differently for user
  testing vs a stakeholder demo.

## Related

- [kuat-figma-design](${CLAUDE_PLUGIN_ROOT}/skills/kuat-figma-design/SKILL.md) - builds any missing screens/states, gates included
- [kuat-figma-review-design](${CLAUDE_PLUGIN_ROOT}/skills/kuat-figma-review-design/SKILL.md) - review the screens themselves
- [intake](${CLAUDE_PLUGIN_ROOT}/skills/_shared/intake.md) · [version-stamp](${CLAUDE_PLUGIN_ROOT}/skills/_shared/version-stamp.md)
