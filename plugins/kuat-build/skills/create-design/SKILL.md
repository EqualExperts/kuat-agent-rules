---
name: create-design
description: Use when a request needs new visual design concepts or mockups — screens, components, or layouts — before any code or Figma work starts. Determines (1) whether to produce a single design or multiple concept directions, (2) the fidelity level and how strictly Kuat design-system compliance applies at that fidelity, and (3) whether the output route is Figma or Claude Design (inline mockup). Hands off to figma-build-intake or mockup-build-intake accordingly. Not for code implementation (see create-web-app) or slides/imagery (see create-presentation, create-imagery).
---

# Create a design (mockup / concept)

Front door for any request to produce new visual design work — a screen, a component, a layout idea
— before deciding *how* to build it. Resolves three things up front so the downstream build skill
gets a clear brief instead of guessing.

## Step 0 — Design-system context (ask once, pass it downstream)

Is this Equal Experts / Kuat work, or work for a different client with its own design system? Ask if
not already stated. Carry the answer into whichever skill you hand off to in Step 4 — don't ask again.

- **If Kuat:** [reference/media-types/web-product/design.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/design.md) and the Kuat2 file are in scope.
- **If not Kuat:** no Kuat file, component, token, or layout default applies. The downstream intake
  skill discovers the target system live instead.

## Step 1 — Single design or multiple concepts?

Ask if it isn't clear from the request:

- **Single** — the brief is specific enough that one direction is the answer (e.g. "redesign this
  specific filter panel").
- **Multiple** — the brief is exploratory or comparative (e.g. "show me a few ways we could lay out
  the dashboard", "explore 2-3 directions"). Default to 2-3 concepts, not more, unless asked.

Multiple concepts should differ in a meaningful way (layout model, information density, interaction
pattern) — not just colour or spacing tweaks of the same idea.

## Step 2 — Fidelity level (sets compliance strictness)

Ask if not stated, using these three bands:

| Fidelity | What it looks like | Kuat compliance requirement |
|----------|--------------------|------------------------------|
| **Low** (wireframe / concept) | Structure and content hierarchy only; greyscale or neutral placeholders; boxes stand in for components | Follow Kuat's *structural* patterns ([patterns/](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/patterns/), [design.md](${CLAUDE_PLUGIN_ROOT}/reference/media-types/web-product/design.md)) — exact tokens/components not required. Label it a wireframe, not a compliance reference. |
| **Mid** (styled concept / directional) | Real Kuat brand colours and typography visible; approximate spacing/radius; components can be close approximations | Use real Kuat tokens for colour/type; component approximations allowed if flagged. Good for comparing multiple directions quickly. |
| **High** (spec-accurate / build-ready) | Pixel-accurate; intended to be handed to engineering or dropped into the file as-is | Full compliance — run the downstream checklist (`figma-build-checklist` or `claude-design-build-checklist`) start to finish. No unflagged approximations. |

Default to **mid** for exploratory work and **high** for anything described as final, a redesign
proposal for review, or destined for handoff.

## Step 3 — Route: Figma or Claude Design?

Ask if not stated. Use these as defaults, not hard rules:

| Signal | Route |
|--------|-------|
| Needs to live in the design file, be reusable, editable by others, or feed into a Figma-based handoff | **Figma** |
| Quick exploration, side-by-side comparison of concepts, or a throwaway discussion aid | **Claude Design** (inline mockup) |
| Multiple concepts at low/mid fidelity for a fast decision | **Claude Design** — faster to produce and compare; promote the chosen one to Figma afterward if needed |
| Single high-fidelity, build-ready design | **Figma** — Claude Design cannot bind real tokens or instantiate real components, so it can't reach full compliance at high fidelity |

## Step 4 — Hand off

- **Figma route:** invoke [figma-build-intake](${CLAUDE_PLUGIN_ROOT}/skills/figma-build-intake/SKILL.md), passing the context
  (Step 0), concept count (Step 1), and fidelity (Step 2).
- **Claude Design route:** invoke [mockup-build-intake](${CLAUDE_PLUGIN_ROOT}/skills/mockup-build-intake/SKILL.md),
  passing the same three inputs.
- If the request turns out to need code (not a mockup), stop here and use
  [create-web-app](${CLAUDE_PLUGIN_ROOT}/skills/create-web-app/SKILL.md) instead.

## Related

- [figma-build-intake](${CLAUDE_PLUGIN_ROOT}/skills/figma-build-intake/SKILL.md) - Figma route
- [mockup-build-intake](${CLAUDE_PLUGIN_ROOT}/skills/mockup-build-intake/SKILL.md) - Claude Design route
- [create-web-app](${CLAUDE_PLUGIN_ROOT}/skills/create-web-app/SKILL.md) - code implementation, not a mockup
- [figma-build-checklist](./figma-build-checklist.md) · [claude-design-build-checklist](./claude-design-build-checklist.md)
