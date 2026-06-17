# Phase 7 — Run B handoff (kuat-mono)

**Repo:** `kuat-mono` · **Branch:** `feature/phase-7-contributor` · **Depends on:** Run A (this repo) merged.

Run A (kuat-agent-rules) is complete: the contributor skills, the **upstream** half of
`generate-tokens` (colours.md generated from `colors.tokens.json` + drift check), and the studio
asset-pack skills all live here in `.claude/skills/` + `skills/scripts/`. Run B is the **downstream**
half — it can't run from kuat-agent-rules (different repo; `/kuat-phase` is single-repo). Execute it
in a kuat-mono checkout.

> All Run-B skills are **repo-local** — kuat-mono's `.claude/skills/`, project scope, never packaged,
> never in the marketplace. Same rule as Run A.

## B1 — `add-kuat-component` (`.claude/skills/add-kuat-component/`)

Scaffold a component end-to-end and keep the registry honest:

1. **Code** — React **and** Vue implementations in the house structure.
2. **Storybook** — a story per component.
3. **Tests** — the package's test convention.
4. **Manifest** — add/update the entry in `components.manifest.json`.
5. **Registry** — **regenerate the component registry from the manifest** (don't hand-edit it) — this
   is the durable fix for the "component log goes stale" concern.
6. **Bundle** — regenerate the package `agent-docs` bundle.

**Acceptance:** a DS member adds a component end-to-end via the skill; `pnpm build` green; the
registry is **generated**, not hand-maintained.

## B2 — `generate-tokens` downstream half (variables.css)

The token SoT is **upstream** (`reference/design-language/tokens/colors.tokens.json` in
kuat-agent-rules). Run B emits the CSS from the **synced** tokens:

1. Sync `reference/design-language/tokens/` into kuat-mono via the existing upstream→mono sync (the
   1b direction).
2. Generate `@equal-experts/kuat-core` `src/variables.css` from the synced tokens (brand scales +
   aliases; support scales — slate/red/indigo — live only here, not upstream).
3. **Drift check:** fail CI if `variables.css` diverges from the synced tokens. Mirror the upstream
   pattern in this repo (`skills/scripts/generate-tokens.mjs --check` → see it for the shape).

**Acceptance:** edit a token upstream → sync → `variables.css` regenerates to match; the drift check
fails on a deliberate hand-edit of `variables.css`.

## B3 — Registry drift check (reference registry ↔ kuat-mono manifest)

Plan **checkpoint 2**: the reference component registry consumed upstream must be **generated from
kuat-mono's published manifest**, with a CI drift check that fails when the reference registry and
kuat-mono's manifest disagree. Wire this so `add-kuat-component` (B1) is the thing that updates the
manifest + regenerates the registry, and CI catches divergence.

**Acceptance:** registry generated from the manifest; CI **fails on a deliberate mismatch**.

## Coordination

- Land B2's first `variables.css` regeneration in the **same release** as any upstream colour change,
  so the two artifacts never ship out of sync. The upstream `generate-tokens` skill flags this.
- Run B + Phase H are the two gates for `stable`. Report B's outcome back into the migration
  `execution-plans/reports/` like Run A's `report-phase-7.md`.

## Reference implementations to copy from Run A (this repo)

- Generator + drift-check shape: `skills/scripts/generate-tokens.mjs` (`--check` mode, deterministic output, first-diff message).
- Change gate shape: `skills/scripts/check-reference.mjs` (change-scoped, explicit-args, delegate to the drift check).
- Repo-local skill style + link conventions: `.claude/skills/*/SKILL.md`, and `.claude/skills/author-skill/SKILL.md`.
- Distribution guard: `skills/scripts/verify-plugins.mjs` `verifyNoContributorLeak()` (assert nothing in `.claude/skills/` reaches a payload).
