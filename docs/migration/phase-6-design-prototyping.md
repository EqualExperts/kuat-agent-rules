# Phase 6 — Design & Prototyping Skill (consumer · fast-follow)

**Repo / Claude Code project:** `kuat-agent-rules` (skills live here)
**Branch:** `feature/phase-6-design-prototyping`
**Depends on:** Phase 3 packaging conventions (`${CLAUDE_PLUGIN_ROOT}`, bundle build). True fast-follow — build once the core consumer launch (Phase 5) is live, or in parallel after Phase 3.

> Run in plan mode first. This adds the **third consumer runtime lane** (design-tool / requirements-driven), alongside web (code) and content (document).

---

## Objective

Add a consumer skill that turns **design intent into on-brand EE product designs / prototypes**, applying the design language and component *visual* specs — **regardless of where that intent lives**. It is technical-but-not-code: the runtime is a design tool and/or connected source systems, not a build pipeline.

---

## Core principle — input-source resolution (tool-agnostic)

The skill must **not assume Figma or any single source.** At intake it detects what's connected and asks where the design intent / user needs live, then adapts:

1. **Figma designs** (Figma MCP connected) → read the design, build/prototype from it.
2. **Requirements / user needs in another connected system** (Jira, Confluence, Asana, Notion, … via MCP) → query that system and work from it.
3. **A brief the user provides directly** → work from that.
4. **Greenfield / nothing formal** → elicit the need, then apply patterns.

Connectors are **environment-level** (wired up in Cowork/Claude by the user/org) — **not bundled in the Kuat plugin.** The skill uses whatever is connected, asks when ambiguous, and degrades gracefully (never assume a source is present). This mirrors `create-web-app`'s graceful-component fallback.

---

## Checkpoint decisions (resolve at start, log)

1. **Output form(s)** — Figma/Pencil artifact (via MCP), a coded prototype (Claude Code), and/or a design spec. Likely driven by intake/intent; confirm the supported set.
2. **Packaging** — does this ship in a **new consumer "design" bundle** or join an existing consumer bundle? (Runtime overlaps Cowork + design-tool MCPs.) Tie to the bundle model set in Phase 3.

---

## Tasks

1. Branch + log; resolve checkpoints.
2. Author `create-prototype` (name TBD) with the **input-source resolution intake** above as Step 1.
3. Load reference progressively via `${CLAUDE_PLUGIN_ROOT}/reference/...`: `design-language/`, `media-types/web-product/` (design + patterns), `accessibility/`, and component *visual* specs via `component-registry.md`.
4. Resolve component visual specs the same way `create-web-app` does (registry → component docs; live in dev runtime, or bundled per the consumer bundle's packaging).
5. Produce the deliverable per the resolved intent and output form; **flag gaps** (missing component, unreachable source) explicitly.
6. Build an **eval set spanning the source variants** — has-Figma, has-requirements-MCP, brief-only, greenfield — scored against the skill checklist.
7. Package into the chosen consumer bundle (Phase 3 conventions); release on the `beta` → `stable` channel cycle.

---

## Acceptance criteria

- Skill triggers and runs the input-source intake; in evals it adapts correctly to **each** source variant (Figma / requirements-MCP / brief / greenfield).
- Tool-agnostic: never hard-codes Figma; asks/detects and degrades gracefully, flagging unreachable sources.
- On-brand output applying design language + component visual specs (semantic tokens, EE patterns).
- Verified in **packaged/installed form** (per Phase 3) — links resolve via `${CLAUDE_PLUGIN_ROOT}`; evals pass against the installed bundle, not just the repo.

---

## Report back

Fill `docs/migration/report-phase-6.md`. Capture: the output-form + packaging decisions; how input-source resolution was implemented (connector detection + ask + fallback); eval results per source variant; the bundle it shipped in and the channel/version.
