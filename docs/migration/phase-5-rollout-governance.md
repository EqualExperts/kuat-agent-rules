# Phase 5 — Rollout & Governance

**Runs across:** rollout process (+ `kuat-agent-rules` / marketplace)
**Depends on:** Phase 4 go decision

> Promote to `stable`, make Kuat available to all EE consultants, retire the legacy skills, and put a sustainable contribution + release model in place.

---

## Objective

Take Kuat from pilot to **org-wide GA**, and establish the governance that keeps the reference, skills, and component library healthy over time.

---

## Tasks

### Promote & distribute

1. Move the `stable` ref to the validated pilot version (distinct version string from any newer `beta`).
2. Update managed settings to pre-register **all** consultants on `stable`; keep `beta` for the maintainer cohort.
3. Announce GA with the quickstart + a short "what Kuat does for you" note.

### Retire legacy

4. Remove `skills/kuat-create` and `skills/kuat-review` (now superseded by activity skills). Leave a deprecation note + redirect in the repo for anyone with old references.
5. Finish quarantining/removing the runtime resolution machinery not needed by the developer path.

### Governance

6. **Ownership** — confirm the §ownership-matrix split for the new layout: reference + skills owned in `kuat-agent-rules`; component implementation/usage docs in `kuat-mono`.
7. **Contribution model** — document how to propose a reference change or a new skill (a new skill requires a one-pager justifying the job, to prevent skill sprawl).
8. **Release cadence** — set a regular reference/skill release rhythm and the bump → beta → stable flow (architecture §7.1). Define who approves promotion.
9. **Freshness guardrail** — define the trigger to introduce the **MCP server** (architecture §7 MCP evolution): reference/components churning faster than the release cadence, or demand for the data outside Claude.
10. **Backlog** — fold Phase-4 component/reference gaps into the `kuat-mono` / reference backlogs.

---

## Exit criteria

- All consultants on `stable`, zero-setup install confirmed at scale.
- Legacy skills removed with redirects; no broken consumers.
- Ownership, contribution, and release-cadence docs published and linked from both repos.
- A written, agreed trigger for the MCP evolution.

---

## Report back

Fill `docs/migration/report-phase-5.md`. Capture: GA date + cohort, what was retired, links to the governance/contribution/cadence docs, the MCP-trigger definition, and the carried-forward backlog. This closes the migration; ongoing work continues under the contribution model.
