---
name: figma-build-intake
description: Run before generating or updating any Figma design, screen, or component (before figma-generate-design or use_figma). Confirms whether the work is Equal Experts/Kuat or a different client's own design system, and produces a short build plan. Deliberately separate from Figma's own skills — it does not customise figma-generate-design, figma-use, or any other Figma-provided skill, so Figma's own updates to those skills are never affected.
---

# Figma build intake

Figma's own skills don't know which design system is in scope, and shouldn't be edited to bake one
in — a hardcoded EE/Kuat default would (a) survive contrary to future Figma-provided updates to those
skills, since edits to a vendor skill get overwritten on update, and (b) be wrong for client work that
doesn't use Kuat at all. This skill resolves that context **before** Figma's skills are ever invoked,
entirely outside Figma's package, so there is nothing to lose when Figma updates its skills.

## When to use

Any time a request will result in building or updating a screen, component, or view inside a Figma
file — run this first, before calling `figma-generate-design` or writing a `use_figma` script.

Usually reached via [create-design](../create-design/SKILL.md), which decides single-vs-multiple
concepts, fidelity, and the Figma-vs-Claude-Design route before handing off here. If reached that way,
reuse its answers below instead of re-asking.

## Step 1 — Design-system context (ask if not already known)

- Is this Equal Experts / Kuat work, or work for a different client with its own design system?
- **If Kuat:** the target file defaults to Kuat2 — see [../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md) for layout templates and the component-resolution priority. Still confirm the file key/URL if not already given.
- **If not Kuat:** do not carry over any Kuat file key, component, token, or layout default. Get (or discover from) the client's own file — Step 3 of [figma-build-checklist.md](../_shared/figma-build-checklist.md) covers live discovery against whatever file is in scope.

## Step 2 — Scope the build

Run the shared intake — see [../_shared/intake.md](../_shared/intake.md): scenario/page type, sections
needed, states in scope, whether the source contains images (triggers the parallel
`generate_figma_design` capture workflow in Figma's own skill).

## Step 3 — State the plan before building

Before invoking `figma-generate-design`, state:

- Target file (key/URL) and which design-system rules apply (Step 1 answer)
- The sections/components the build will need, at a glance
- Whether this reuses/clones an existing screen or is a new composition

Get a quick confirmation from the user if the plan is non-trivial (multiple sections, a new pattern
not seen elsewhere in the file).

## Step 4 — Hand off

Only now invoke Figma's own skills (`figma-generate-design`, `figma-use`) unmodified, using the
context resolved in Steps 1-3. During and after the build, run
[figma-build-checklist.md](../_shared/figma-build-checklist.md) Steps 1-5 (discovery completeness,
token binding, component fidelity, composition honesty, pre-handoff self-audit) before calling it
done.

## Related

- [figma-build-checklist](../_shared/figma-build-checklist.md) - execution-time verification, run after this intake
- [create-design](../create-design/SKILL.md) - upstream single/multiple, fidelity, and route decision
- [claude-design-build-intake](../claude-design-build-intake/SKILL.md) - equivalent skill for the Claude Design route
- [create-web-app](../create-web-app/SKILL.md) - EE code deliverables; this skill covers the Figma deliverable case instead
- [intake](../_shared/intake.md) - shared intake used in Step 2
