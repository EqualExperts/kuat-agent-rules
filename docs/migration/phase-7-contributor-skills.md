# Phase 7 — Contributor Skills (restricted · fast-follow)

**Repos / Claude Code projects:** `kuat-mono` **and** `kuat-agent-rules` (cross-repo)
**Branches:** `feature/phase-7-contributor` in each repo
**Depends on:** Phase 5 (governance + contribution model published; consumer system stable). Restricted distribution to the DS team only.

> Everything so far has served **Kuat consumers** (people applying the design system). This phase serves **Kuat contributors** — the small DS team who extend the system itself. These skills touch the source of truth, so they are sensitive.
>
> **Distribution rule (Ed, firm): contributor skills live in the repo ONLY — never in the Enterprise marketplace/managed-settings distribution.** They are committed as project-scoped Claude Code skills (in each repo's `.claude/skills/`), discovered automatically when someone works in that repo. No marketplace entry, no channel, no audience targeting — being in the repo *is* the access control.

---

## Objective

Equip the DS team to extend Kuat safely and consistently: author **components** downstream (`kuat-mono`) and **reference guidelines / patterns / skills** upstream (`kuat-agent-rules`), with the house conventions enforced (the passive test, the ownership matrix, registry integrity).

---

## Skills to build

| Skill | Repo | Job |
|-------|------|-----|
| `add-kuat-component` | `kuat-mono` | Scaffold a new component (React + Vue) + Storybook + tests; update `components.manifest.json` + the generated component registry; regenerate the package `agent-docs` bundle |
| `author-reference` | `kuat-agent-rules` | Add/edit a reference guideline or pattern **upholding the passive test** and the `media-types/<medium>/patterns/` structure; update `MIGRATION-MAP.md` if paths move |
| `review-reference-change` | `kuat-agent-rules` | Gate a reference change: passive-test scan (no verbs/roles/loading tables), link integrity, structure conformance |
| `author-skill` *(optional)* | `kuat-agent-rules` | Scaffold a new activity skill in the house style (sharp trigger, progressive disclosure, `${CLAUDE_PLUGIN_ROOT}` links, checklist, version stamp) |

---

## Checkpoint decisions (resolve at start, log)

1. **Placement = repo-local.** Each repo's contributor skills live in **that repo's `.claude/skills/`** (project scope), committed to the repo. In `kuat-agent-rules`, keep them **separate from the distributable `skills/`** (which Phase 3 packages) — `.claude/skills/` is never bundled. No marketplace, no managed-settings, no channel.
2. **Registry as generated-from-`kuat-mono` + CI drift check** (the recommendation from the skill-placement review). Confirm: `add-kuat-component` becomes the thing that updates the manifest and regenerates the registry, and CI fails on drift between the reference registry and kuat-mono's published manifest. This is the durable fix for the "component log goes stale" concern.

---

## Tasks

1. Branch + log in each repo; resolve checkpoints.
2. **kuat-mono:** author `add-kuat-component` — scaffolds component code (both frameworks), Storybook story, tests; updates `components.manifest.json`; regenerates `agent-docs`; updates/generates the component registry consumed upstream.
3. **kuat-agent-rules:** author `author-reference` + `review-reference-change` (+ optional `author-skill`) — enforce the passive test and the `media-types`/`patterns` structure; reuse the Phase-1 verification (procedure grep, link check) as the review gate.
4. Wire the **registry generation + CI drift check** so the reference registry is derived from kuat-mono's manifest, not hand-maintained.
5. Build evals: add a component end-to-end (code → docs → registry → bundle); author + review a reference change (incl. a deliberate passive-test violation the review must catch).
6. Commit the skills to each repo's **`.claude/skills/`** (repo-local, project scope). **Do not** add them to the marketplace, managed settings, or any plugin bundle. Confirm the Phase-3 `build-plugin` excludes `.claude/skills/` (see Phase 3 guard).

---

## Acceptance criteria

- A DS-team member can add a component **end-to-end** via `add-kuat-component` (code + Storybook + tests + manifest + registry + regenerated bundle); `pnpm build` green.
- `author-reference` produces passive-compliant reference; `review-reference-change` **catches** a planted passive-test violation and any broken links.
- Registry is generated from kuat-mono's manifest; CI **fails on drift** (verified with a deliberate mismatch).
- **Repo-only confirmed:** contributor skills are discovered when working in the repo (Claude Code), and are **absent from every marketplace bundle** — verify the built consumer plugins contain none of them.
- Skills verified working in their repo context.

---

## Report back

Fill `docs/migration/report-phase-7.md` (in each repo as relevant). Capture: the bundle decision; the registry-generation + drift-check implementation (closes the stale-registry item); eval results (component end-to-end; reference author/review); the restricted-distribution verification; channel/version.
