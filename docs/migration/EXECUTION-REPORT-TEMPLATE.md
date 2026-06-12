# Execution Report — Phase &lt;N&gt; (&lt;plan name&gt;)

> Claude Code fills this in at the end of a phase, saves it as `docs/migration/report-phase-<n>.md` in the repo, and outputs the contents. Ed then drops it into this project's `execution-plans/reports/` to drive the next planning round.

---

**Repo:** &lt;kuat-agent-rules | kuat-mono | marketplace&gt;
**Branch / PR:** &lt;link&gt;
**Run date:** &lt;date&gt;
**Status:** ✅ complete · ⚠️ complete with caveats · ⛔ blocked

## 1. What was done
&lt;Bullet summary of the actual changes. Reference the move/deliverable tables from the plan and note what's done.&gt;

## 2. Acceptance criteria
| Criterion (from plan) | Met? | Evidence |
|------------------------|------|----------|
| … | ✅ / ⚠️ / ⛔ | test output / file / link |

## 3. Deviations from the plan
&lt;Where execution differed from the plan and why. This is the most important section for re-planning.&gt;

## 4. Decisions made (with rationale)
&lt;Checkpoint decisions resolved during the run — e.g. reference at root vs kuat-docs, examples/ fate, create/review split. Mirror the `docs/migration/LOG.md` entries.&gt;

## 5. Open decisions for Ed
&lt;Anything that needs a human call before the next phase. Be specific; propose a default.&gt;

## 6. Verification results
&lt;Test/eval/build/install-test output. For Phase 2: eval scores per skill. For 1b: sync + build results. For Phase 3: clean-account install result.&gt;

## 7. Follow-ups / backlog
&lt;Items deliberately deferred, with where they should land (next phase, kuat-mono backlog, reference backlog).&gt;

## 8. Inputs to the next phase
&lt;What the next phase needs from this one — e.g. MIGRATION-MAP location, version/channel mapping, component contract.&gt;
