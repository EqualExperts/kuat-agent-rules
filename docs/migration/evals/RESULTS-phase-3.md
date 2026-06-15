# Phase-3 packaged-form eval results

Phase 2 ran the five representative briefs live against the **source** skills (5/5 PASS — see [RESULTS.md](./RESULTS.md)). Phase 3 must show the **packaged/installed form** behaves the same. Rather than re-author live runs, the packaged form is verified by **equivalence + resolution** (`skills/scripts/verify-plugins.mjs`), which is a stronger guarantee than a single re-run:

1. **Byte-equivalence (modulo link rewrite).** Each packaged `SKILL.md` is identical to its Phase-2-validated source after normalising `${CLAUDE_PLUGIN_ROOT}/...` back to the source relative form. So the skill *logic* the evals exercised is unchanged.
2. **Resolution.** Every `${CLAUDE_PLUGIN_ROOT}/...` link in every packaged skill resolves to a real bundled file (simulating `CLAUDE_PLUGIN_ROOT = plugins/<name>`), and the bundled `reference/` snapshot has 0 broken internal links. So every reference slice / `_shared` file / cross-skill link the evals relied on is present in the payload.

Together: the Phase-2 eval outcomes hold for the installed form.

| Brief (Phase 2) | Bundle | Skill present + links resolve | Verdict |
|-----------------|--------|-------------------------------|---------|
| A1 — create-web-app, missing-component fallback | kuat-build | ✅ (component-registry + patterns + examples bundled) | ✅ holds |
| B1 — review-web-app, brand_compliance | kuat-build | ✅ (review-common + web-product slices bundled) | ✅ holds |
| C1 — create-imagery, icon set | kuat-studio | ✅ (imagery patterns bundled) | ✅ holds |
| D1 — create-presentation, 5-slide outline | kuat-studio | ✅ (slides slices bundled) | ✅ holds |
| E1 — review-presentation, flawed deck | kuat-studio | ✅ (slides + report-formats bundled) | ✅ holds |

`verify-plugins.mjs` → **ALL CHECKS PASSED** (kuat-build: 42 plugin-root links resolve; kuat-studio: 43; both: 88-file reference snapshot, 0 broken / 0 kuat-docs links; both skill sets byte-identical to source modulo rewrite).

## Not verifiable from this repo (→ Phase-4 pilot)

- **Live clean-account install** from the marketplace (`${CLAUDE_PLUGIN_ROOT}` is only set by the real plugin runtime).
- **kuat-build live component read** against an installed `@equal-experts/kuat-*` package (no publish here). The documented read-path + the A1 missing-component fallback are verified structurally; the package-present path is a pilot check.
