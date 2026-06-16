# Phase 4 — Pilot (beta channel)

**Runs across:** rollout process (+ small fixes in `kuat-agent-rules`)
**Depends on:** Phase 3 merged (Kuat installs from the marketplace `beta` channel)

> This phase is mostly process, not code. The goal is to validate the skills and reference with real consultants on the `beta` channel before promoting to `stable`.

---

## Objective

Put Kuat in front of 5–10 consultants spanning the priority activities (web + slides, ideally one imagery user), gather structured feedback, and iterate the skills/reference until it's ready for org-wide `stable` release.

---

## Step 0 — Local validation first (no marketplace needed)

Prove the bundles work **before** any marketplace/org effort. This front-loads Phase 3's two deferred (structurally-only) criteria cheaply:

- `claude --plugin-dir plugins/kuat-build` (and `kuat-studio`) — loads from the dir; `${CLAUDE_PLUGIN_ROOT}` resolves there, exercising the bundled links exactly as on real install. `/reload-plugins` to iterate. Or `claude plugin install ./plugins/<name> --scope local` for install-fidelity, or `/plugin marketplace add .` for a local marketplace.
- **Run the real acceptance checks locally:** every skill triggers and resolves its `${CLAUDE_PLUGIN_ROOT}` links; and **`create-web-app` in an actual project with `@equal-experts/kuat-*` installed** reads component docs live + falls back/flags when missing.
- If anything fails here, it's a Phase-3 fix — fix and rebuild before proceeding.

**Only stand up the marketplace once the bundles pass locally.** Local testing does *not* cover org auto-registration, background auto-updates, or channel promotion — those need the real marketplace + managed settings, and are only worth the effort once the payloads are proven.

## Prerequisites (after local validation passes)

- **Fix the link *text*** in the web-app skills' Step-2 tables (targets are already `${CLAUDE_PLUGIN_ROOT}`; the visible label still reads `../../reference/…`). Small `build-plugin.mjs` tweak + rebuild — do it before consultants run the skills so the agent isn't reading a stale path label.
- **Stand up the marketplace.** Phase 3 staged `marketplace/` with placeholder coords. Create the real marketplace repo, set coords, create the `stable` tag + `beta` branch in `kuat-agent-rules` so the git-subdir sources resolve, and provision the private-repo auth token for background auto-updates.

## This pilot is also Phase 3's live acceptance test

Two Phase-3 criteria were structurally verified but **not** live (no publish in a repo-only context). Prove them here, first:

- **Clean-account install** from the marketplace — `${CLAUDE_PLUGIN_ROOT}` links resolve in the real runtime, zero setup.
- **`kuat-build` live component read** — in a real project with `@equal-experts/kuat-*` installed, `create-web-app` reads component docs from the package and falls back + flags when one is missing.

If either fails, that's a Phase-3 fix, not a pilot-feedback item.

## Setup

1. Pick pilot consultants across **web-app**, **presentation**, and ideally **imagery** work.
2. Pre-register them on the **`beta`** channel via managed settings (from Phase 3); confirm zero-setup install.
3. Give each a one-page quickstart: which skills exist, how to invoke them, and how to file feedback.

## Feedback capture

Use a single structured channel (form or repo issues) capturing per use:

| Field | |
|-------|--|
| Skill used | create-web-app / review-web-app / create-imagery / create-presentation / review-presentation |
| Task & scenario | what they were making, audience |
| Outcome | on-brand? usable first pass? edits needed |
| Triggering | did the right skill fire from natural language? |
| Reference gaps | anything missing/wrong/outdated in guidelines |
| Component gaps (web) | components that didn't exist / fell back |
| Rating | would-use-again (1–5) |

## Committed skill improvement — visual verification for `review-presentation`

Found while dogfooding: reviewing a deck via the Google Slides connector returns **text only**, so the skill is blind to photography treatment, exact colours, logo/badge rendering, and layout — it currently (correctly) flags this as a visual-verification gap. **This pilot must close that gap**, not just note it.

Implement in source (`skills/review-presentation/SKILL.md`), rebuild the `kuat-studio` payload, re-verify, ship on `beta`:

1. **Escalate to a rendered visual pass.** When the source is a live connector or text-only extraction, the skill obtains **rendered slides** (PDF or per-slide PNG — Google Slides export, or the Drive connector's export) and performs a vision pass over them, covering the checks text can't: photography treatment, logo/badge rendering, colour usage, layout/spacing.
2. **Exact colours → pixel sampling.** Where colour fidelity matters (badges, primary actions), sample pixel values from the render and compare to the tokens in `reference/design-language/colours` — a real hex check, not eyeballing.
3. **Document the limitation + fallback.** State the connector's text-only constraint in the skill; if no render can be obtained, keep the current behaviour (mark visual checks as a flagged gap and ask the user to supply a PDF/PNG export) rather than passing.
4. **Extend the checklist** with the visual items so they're a required gate, and add an eval brief that feeds a rendered deck and confirms the visual pass runs.

Likely generalises to **`review-web-app`** (reviewing a live URL/DOM vs rendered screenshots) — note it as a follow-up; scope this phase to `review-presentation`.

## Iterate

- Triage feedback weekly; fix reference/skill issues on short-lived branches.
- Cut `beta` releases (bump `version`, push) so pilots get fixes — this also rehearses the release mechanics for Phase 5.
- Keep the eval set (Phase 2) green on every beta release; add the visual-verification eval above.

---

## Exit criteria

- Pilot "would-use-again" clears an agreed bar (e.g. median ≥ 4/5).
- Top-severity reference/skill/triggering issues fixed and re-validated.
- At least one real deliverable per priority activity produced end-to-end on `beta`.
- Release mechanics (bump → beta → pilots receive) proven at least twice.
- **`review-presentation` visual verification shipped** on `beta`: renders slides for the visual pass, pixel-samples colours where it matters, documents the connector limitation, and its eval brief passes.

---

## Report back

Fill `docs/migration/report-phase-4.md`. Capture: pilot cohort + activities covered, feedback summary (themes, not raw), issues fixed vs deferred, ratings, component/reference gaps to backlog, and a go/no-go recommendation for `stable`. This report is the **promotion decision** input for Phase 5.
