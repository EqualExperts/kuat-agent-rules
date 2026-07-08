---
name: claude-design-build-intake
description: Run before building a design mockup with the Claude Design inline-mockup tool (show_widget / visualize). Confirms design-system context (EE/Kuat vs. a different client), resolves the fidelity level's compliance bar, and — for Kuat work — pulls real token values and component visual specs live from kuat-agent-rules rather than generic Claude Design tokens, so the mockup is as spec-accurate as the fidelity level requires instead of only directionally similar.
---

# Claude Design build intake

The Claude Design tool renders through its own generic design tokens (surface/text/border roles) —
it has no native concept of Kuat's tokens or components. Left alone, a mockup built with it is only
ever directionally similar to Kuat, never spec-accurate, because nothing forces it to use Kuat's real
values. This skill is what makes a Kuat-targeted Claude Design mockup actually resolve against the
real design system, at whatever fidelity the brief calls for.

Usually reached via [create-design](../create-design/SKILL.md), which resolves context, concept
count, and fidelity first. If invoked directly, resolve those here instead.

## Step 1 — Context and fidelity (skip if already given)

- Equal Experts / Kuat, or a different client's own system? If Kuat, proceed below. If not, do not
  substitute any Kuat value — discover the client's own brand/tokens (from what's provided) using the
  same live-resolution approach.
- Fidelity level (low / mid / high) — see [create-design](../create-design/SKILL.md#step-2--fidelity-level-sets-compliance-strictness)
  for what each requires. This sets how much of Step 2 is mandatory.

## Step 2 — Resolve real values live (no persisted registry)

There is no separate "Claude Design token registry" to maintain — pull straight from the same sources
`create-web-app` uses for code, every request:

| Need | Source |
|------|--------|
| Colour / type / spacing / radius values | [../../reference/design-language/](../../reference/design-language/) (exact hex/rem values, not approximations) |
| Colour tiers, pairing, status colours | [../../reference/design-language/colour-usage.md](../../reference/design-language/colour-usage.md) |
| Component visual spec (padding, radius, states) | [../../reference/media-types/web-product/component-registry.md](../../reference/media-types/web-product/component-registry.md) → the resolved component's guide |
| Layout / regions | [../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md) + [patterns/](../../reference/media-types/web-product/patterns/) |

At **low** fidelity this step is informational only (structure matters, not exact values — use
neutral placeholders and say so). At **mid** fidelity, resolve real colour/type tokens but
approximate component visual details if needed (flag it). At **high** fidelity, every value used in
the HTML/CSS must trace to a real token or component spec — treat an unresolved value the same way
`create-web-app` treats a missing component: flag it, don't paper over it with a generic Claude Design
token.

## Step 3 — State the plan before building

- Fidelity level and what it implies for this build (from Step 1)
- Number of concepts (single or multiple, from create-design Step 1)
- Which elements resolved to real Kuat values/specs vs. which will be flagged as approximated

## Step 4 — Hand off

Build with the Claude Design tool using the resolved values. Since it can't bind live variables or
instantiate real components the way Figma can, translate each resolved token/spec into literal CSS
values at build time — accuracy is a one-time translation, not a live binding, so re-verify against
source if the underlying tokens change. Run
[claude-design-build-checklist.md](../_shared/claude-design-build-checklist.md) before returning the
mockup.

## Related

- [claude-design-build-checklist](../_shared/claude-design-build-checklist.md) - execution-time verification
- [figma-build-intake](../figma-build-intake/SKILL.md) - equivalent skill for the Figma route
- [create-design](../create-design/SKILL.md) - upstream context/fidelity/route decision
