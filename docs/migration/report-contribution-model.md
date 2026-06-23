# Execution Report — Contribution model rollout (publish + wire up the governance layer)

> Adapts the finalised `docs/migration/kuat-contribution-model.md` into the repo's published
> contribution docs, per `docs/migration/contribution-model-rollout-prompt.md`. Decisions were
> already resolved (Ed, 19 Jun 2026) — this run publishes and wires the model, it does not re-decide.

---

**Repo:** kuat-agent-rules
**Branch / PR:** `feature/contribution-model` (PR pending)
**Run date:** 2026-06-23
**Status:** ✅ complete (kuat-agent-rules scope; kuat-mono half handed off)

## 1. What was done

Published the contribution model and wired the contributor skills into it. All within
`kuat-agent-rules` (rollout-prompt deliverables 1–4 + 7); deliverables 5–6 (kuat-mono) are a
documented handoff.

- **`CONTRIBUTING.md`** (repo root, new) — front door: hybrid model in a line, contribution-vs-participation,
  the four sizes, the 5-step process, the Slack [#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)
  request step, and links into `contribute/`.
- **`contribute/`** (new top-level dir):
  - `overview.md` — the canonical model, adapted from `kuat-contribution-model.md` §1–7 (hybrid model,
    contribution-vs-participation table, surface→skill→gate table, Fix/Light/Medium/Heavy, the 5-step
    process, decision rights incl. the **review-everything-now → relax-later** posture).
  - 6 per-type pages — `proposing-a-component.md`, `proposing-a-token-change.md`,
    `proposing-a-reference-change.md`, `proposing-a-slide-asset.md`, `proposing-an-icon-or-image.md`,
    `proposing-a-skill.md` — each naming the **size**, the **contributor skill**, the **gate**, and the
    **Slack request** step.
  - `decision-log.md` — seeded verbatim from `decision-log.seed.md`; marked append-only, newest first.
  - `deprecation-guidelines.md` — **stub** flagging the Phase-5 fast-follow.
- **`AGENTS.md`** — new "Contributing" subsection linking `CONTRIBUTING.md` + `contribute/overview.md`,
  noting the docs sit outside the passive library so they never bundle into a plugin.
- **7 contributor skills wired** — each `.claude/skills/*/SKILL.md` gained a first `## Related` bullet
  naming its size · surface and linking the model + its `proposing-a-*.md` page.

## 2. Acceptance criteria

| Criterion (from rollout prompt) | Met? | Evidence |
|---------------------------------|------|----------|
| `CONTRIBUTING.md` present + linked from `AGENTS.md` | ✅ | `CONTRIBUTING.md`; `AGENTS.md` "Contributing" subsection |
| `contribute/` overview + per-type pages + seeded decision log present | ✅ | `contribute/overview.md`, 6 `proposing-a-*.md`, `decision-log.md`, `deprecation-guidelines.md` |
| `contribute/` **not** under `reference/` and **not** in any payload | ✅ | top-level dir; `grep -rl "contribute/" plugins/*` → none; no `contribute/` dir under `plugins/` |
| `verify-plugins.mjs` green | ✅ | `ALL CHECKS PASSED` — 7 repo-local skills kept out, reference snapshot 89 files / 0 broken |
| `review-reference-change` still passes (no new reference violations) | ✅ | `reference:check` green; **0 changed reference files** (nothing added under `reference/`) |
| Each contributor skill references the model | ✅ | 7 `## Related` pointer bullets; link sweep 0 broken |
| Decision log seeded | ✅ | `contribute/decision-log.md` matches `decision-log.seed.md` |
| Deprecation-guidelines stub flags Phase-5 fast-follow | ✅ | `contribute/deprecation-guidelines.md` ("Status: TBD — Phase 5") |

## 3. Deviations from the plan

- **Source path.** The rollout prompt cites `execution-plans/…`; the live model + seed are in
  `docs/migration/`. Used those.
- **Skill-name reconciliation.** Per-type pages use the real skill names (`prep-slides-master`,
  `curate-slide-layouts`); `add-kuat-component` is downstream in kuat-mono, so
  `proposing-a-component.md` points there rather than wiring a local skill.
- **Richer pointer line.** Each skill pointer links both `contribute/overview.md` and the specific
  `proposing-a-*.md` page (still one line) — slightly more than the prompt's "one-line pointer".

## 4. Decisions made (with rationale)

Mirror `docs/migration/LOG.md` (Contribution model — rollout):
- **A — kuat-agent-rules only this run** (the branch exists only here; kuat-mono is a separate repo/PR).
- **B — `contribute/` top-level, not under `reference/`** (governance is how-to: would trip the passive
  gate and must never ship in a consumer plugin; confirmed `build-plugin.mjs` only snapshots `reference/`).

## 5. Open decisions for Ed

- **None blocking.** Confirm you want the **kuat-mono** half (CONTRIBUTING.md + AGENTS.md link) done as a
  follow-up branch in that repo — default: yes, pointing at the canonical `contribute/overview.md` here.

## 6. Verification results

```
build:plugins     → kuat-build (2 skills, 0.3MB) + kuat-studio (3 skills, 20.3MB)
verify:plugins    → ALL CHECKS PASSED
                    · no contributor skill leaked (7 repo-local kept out)
                    · reference snapshot 89 files, 0 broken
grep contribute/  → none in plugins/kuat-build or plugins/kuat-studio (no contribute/ dir bundled)
reference:check   → ALL REFERENCE CHECKS PASSED (0 changed reference files)
link sweep        → 18 files checked, 0 broken relative links
```

## 7. Follow-ups / backlog

- **kuat-mono (deliverables 5–6):** own `feature/contribution-model` branch — a focused
  `CONTRIBUTING.md` (component via `add-kuat-component` + downstream token regen via `generate-tokens`,
  the sizes, the Slack step, a link to the canonical `contribute/overview.md` here — no model
  duplication) + an AGENTS.md Contributing link.
- **Deprecation guidelines:** Phase-5 fast-follow, designed against retiring `kuat-create`/`kuat-review`.
- **Image library gap:** `proposing-an-icon-or-image.md` notes there is no genuine EE photography library
  yet; standing one up is a custodian-led Medium/Heavy effort.

## 8. Inputs to the next phase

- The canonical model now lives at `contribute/overview.md` — the kuat-mono `CONTRIBUTING.md` links to it
  rather than duplicating it.
- The contribution-model slice of **Phase 5 (rollout governance)** is now concrete and skill-backed; the
  deprecation-guidelines stub is the first Phase-5 work item (legacy-skill retirement).
