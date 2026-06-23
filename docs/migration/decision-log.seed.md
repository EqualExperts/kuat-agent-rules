# Kuat Decision Log

Notable design-system decisions and *why* — so they're not re-litigated and the rationale survives. Append-only; newest first. (Seeded from the migration roadmap ledger; carry forward as contributions and reviews generate new decisions.)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-19 | **Contribution model adopted** (hybrid; Fix/Light/Medium/Heavy; skill-mediated, gate-enforced). | Adapted from EightShapes (Curtis) + Octopus; the Phase-7 skills/gates already implement the hard parts. |
| 2026-06-19 | **Custodians review everything initially, relaxing as we learn.** | Build trust first; the gates make reviewing all sizes fast, and let the small lane go autonomous later safely. |
| 2026-06-17 | **Design tokens have one source of truth, upstream** (`reference/design-language/tokens/colors.tokens.json`); `colours.md` + kuat-core `variables.css` are generated from it, each with a drift gate. | A hand-maintained value in two places drifted (EE Blue became `#0066CC`). Generation + drift checks make it impossible to recur. |
| 2026-06-17 | **EE Blue = `#1795d4`, Tech Blue = `#22567c`** (from kuat-core), not `#0066CC`. | `#0066CC` was reverse-drift in the reference; the genuine palette lives in kuat-core. |
| 2026-06-16 | **Studio decks are built *from* the master template, not generated as HTML.** | A from-scratch generator improvises the brand (fake `[E]` logo, wrong colour) even with correct reference; cloning the master inherits colour/layout/logo/font by construction. |
| 2026-06-16 | **Every medium needs a genuine asset source-of-truth** — web has the component library; slides/imagery got the bundled master + asset pack. | Prose describes the brand; assets *are* the brand. Rules-as-text review can't tell a faithful fake from the real thing. |
| 2026-06-16 | **`review-presentation` gains an authenticity gate** (recreated logo / non-master = FAIL); visual plausibility ≠ brand compliance. | A plausible-looking off-brand deck passed the Phase-4 review; the gate now inverts that. |
| 2026-06-15 | **Contributor skills are repo-local only** (each repo's `.claude/skills/`), never in the Enterprise distribution. | They touch the source of truth; being in the repo *is* the access control. |
| 2026-06-15 | **Two consumer bundles by runtime** — `kuat-build` (web, Claude Code/Cowork, live components) + `kuat-studio` (slides/imagery, self-contained). | Avoids a lowest-common-denominator package; `create-web-app` isn't forced through a chat runtime it won't be used in. |
| 2026-06-15 | **Plugins use pinned semver + beta/stable channels + managed-settings pre-registration.** | Deliberate, reviewable releases; a plugin release is how fresh reference reaches consultants. |
| 2026-06-13 | **Reference is strictly passive; activity + contributor skills hold the procedure.** | The old `rules/` tree tangled what-is-true with how-to; separating them is the core architecture. |
| 2026-06-13 | **`technical.md` is consumer-repo-owned and was found superseded** by kuat-mono's overlay — dropped, not ported. | Implementation/technical setup belongs downstream; mono already had more complete versions. |
