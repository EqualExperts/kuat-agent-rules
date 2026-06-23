# Contribution Model — Rollout Execution Prompt

**Repos:** `kuat-agent-rules` (primary) + `kuat-mono` · **Branch:** `feature/contribution-model` in each.
**Source of content:** `execution-plans/kuat-contribution-model.md` (the finalised model — decisions resolved). Adapt it into the repo docs below; don't re-decide.

> **Intention.** Publish and wire up the Kuat contribution model so the federated EE network knows *what* to contribute, *how*, and *who reviews it* — backed by the Phase-7 contributor skills + gates. Plan mode first; branch/PR per repo; dated `LOG.md`; report back.

## Guardrails (don't break)

- The **"Contribute" docs go in a top-level `contribute/` dir in `kuat-agent-rules` — NOT under `reference/`.** Reason: `reference/` bundles into the consumer plugins (governance doesn't belong there) and must stay passive — the `review-reference-change` gate would flag the how-to procedure. Confirm `build-plugin` does **not** snapshot `contribute/` (it only takes `reference/` + skills), and the reference gate still passes.
- Contributor skills stay repo-local (Phase 7 rule) — unchanged.

## Deliverables

### `kuat-agent-rules`
1. **`CONTRIBUTING.md`** (repo root) — short: the hybrid model, the contribution-vs-participation line, the four sizes, the 5-step process, the Slack [#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0) request channel, and a link into `contribute/`.
2. **`contribute/` section:**
   - `contribute/overview.md` — the model (adapt `kuat-contribution-model.md` §1–§7): hybrid, contribution-vs-participation table, the surface→skill→gate table, Fix/Light/Medium/Heavy, the process, decision rights (incl. the **review-everything-now → relax-later** posture).
   - Per-type "**Proposing a …**" pages (Octopus-style), each naming the **size**, the **contributor skill** to use, the **gate**, and the **Slack request** step:
     - `proposing-a-component.md` → `add-kuat-component` (kuat-mono)
     - `proposing-a-token-change.md` → `generate-tokens` + drift gate
     - `proposing-a-reference-change.md` → `author-reference` / `review-reference-change`
     - `proposing-a-slide-asset.md` → `prep-master` / `curate-layouts` / `add-brand-asset`
     - `proposing-an-icon-or-image.md` → asset pack (+ image-library gap noted)
     - `proposing-a-skill.md` → `author-skill`
   - `contribute/decision-log.md` — **seed from `execution-plans/contribute/decision-log.seed.md`** (provided); append-only going forward.
3. **`AGENTS.md`** — add a "Contributing" link to `CONTRIBUTING.md` / `contribute/overview.md`.
4. **Wire the contributor skills** — each `.claude/skills/*/SKILL.md` gets a one-line "Part of the contribution model — see `contribute/`; this is the <Fix/Light/Medium/Heavy> <surface> path" pointer.

### `kuat-mono`
5. **`CONTRIBUTING.md`** (repo root) — component + token focus: how to contribute a component (`add-kuat-component`) and the downstream token regen (`generate-tokens`), the sizes, the Slack request step, and a link to the canonical `contribute/overview.md` in kuat-agent-rules (don't duplicate the whole model — point to it).
6. **`AGENTS.md`** — add the Contributing link.

### Both repos — note, don't build
7. **Deprecation guidelines = fast-follow**, designed against the **first real case: retiring `kuat-create`/`kuat-review` in Phase 5.** Leave a `contribute/deprecation-guidelines.md` stub that says "TBD — Phase 5" so the nav slot exists.

## Acceptance

- `CONTRIBUTING.md` present + linked from `AGENTS.md` in both repos; `contribute/` overview + per-type pages + seeded decision log present in kuat-agent-rules.
- `contribute/` is **not** under `reference/` and **not** in any plugin payload; `verify-plugins.mjs` green; `review-reference-change` still passes (no new reference violations).
- Each contributor skill references the model.
- Decision log seeded; deprecation-guidelines stub flags the Phase-5 fast-follow.

## Report back

`docs/migration/report-contribution-model.md`: what was published where, the contribute/ structure, confirmation contribute/ is excluded from payloads + the reference gate passes, and the deprecation-guidelines fast-follow note.
