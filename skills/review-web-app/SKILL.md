---
name: review-web-app
description: Review Equal Experts web application UI for brand, accessibility, and product-UX compliance — audit a form, dashboard, app screen, or product flow against EE rules. Use when checking existing product UI (code, Figma, screenshots, URLs). Produces findings, not a redesign. Not for marketing pages or slides.
---

# Review EE web app UI

You are a **Brand Reviewer** for Equal Experts product UI. Audit existing work against EE brand, design, accessibility, and (when scoped) product-UX rules. Produce actionable, cited findings — do not redesign unless asked. Read rules from [`/reference`](../../reference/README.md); never rely on memorised token values.

## Step 1 — Intake (required, before findings)

Run the grouped intake and choose a **review depth** first: see [../_shared/intake.md](../_shared/intake.md).

For web product specifically, at `product_ux` or `full` depth gather the **review context** (user story, research, constraints, scope, known decisions):

| Context | Ask for |
|---------|---------|
| User story / job-to-be-done | Who, doing what, what counts as success |
| Research & evidence | Insights, analytics, usability findings — or explicit "none yet" |
| Constraints | Deadlines, tech limits, policy, must-use patterns |
| Scope | Which screens/states (happy path vs errors/empty/loading/edge) |
| Known decisions | What discovery already settled (don't relitigate) |

Skip the context block at `brand_compliance` depth, and note in the report that UX/content fit is **out of scope**. If context is withheld at `product_ux`/`full`, either drop to `brand_compliance` (with consent) or mark UX findings **provisional** under Open questions. **Never invent user stories or research conclusions.**

## Step 2 — Load the standards you need

- Brand + accessibility core: [../_shared/review-common.md](../_shared/review-common.md)
- Product design & navigation: [../../reference/media-types/web-product/design.md](../../reference/media-types/web-product/design.md)
- Web accessibility specifics: [../../reference/media-types/web-product/accessibility.md](../../reference/media-types/web-product/accessibility.md)
- Component selection: [../../reference/media-types/web-product/component-decision-tree.md](../../reference/media-types/web-product/component-decision-tree.md)
- Token contract, for any shadcn/third-party item: `@equal-experts/kuat-core/token-contract.json` (shipped in the package — the authored light+dark semantic tokens and their `--color-*` backing)
- The page-type pattern in scope: [../../reference/media-types/web-product/patterns/](../../reference/media-types/web-product/patterns/)
- UX writing (when depth ≥ `product_ux`): [../../reference/media-types/web-product/content/](../../reference/media-types/web-product/content/)

**Do not load** `reference/media-types/web-product/examples/` for review — it is create-time syntax, not a compliance source.

When primitives are cited by ID (`shadcn:button`, `kuat:*`), resolve the guide via [../../reference/media-types/web-product/component-registry.md](../../reference/media-types/web-product/component-registry.md) → `{package}/agent-docs/components/{slug}.md` or overlay. If the guide is unresolvable, review against documented patterns and **flag** that the component guide was unavailable.

## Step 3 — Review checklist

Run the common checklist ([../_shared/review-common.md](../_shared/review-common.md)) plus these product items:

**Product patterns (all depths)**
- [ ] Dark navigation pattern used where applicable; white monochrome logo on dark
- [ ] Components sourced per the decision tree; cited IDs match their component guides
- [ ] No inline styles for themeable properties — design tokens used
- [ ] Any added shadcn/third-party UI item passes the token audits (coverage + theme integrity) — see below

**Product / UX fit (`product_ux` / `full` only — blocked without review context)**
- [ ] Primary actions/labels support the stated job-to-be-done
- [ ] Copy enables task completion, not marketing tone
- [ ] Errors / empty / loading states match the scoped flows
- [ ] Form labels & validation align with the pattern (validate-on-submit; never disable submit)
- [ ] Screen reflects the stated success criteria — cite evidence

If context is missing, mark this section **Blocked** and list required items under Open questions.

Cite the `reference/...` file + section for every finding.

### Token audits (any shadcn/third-party item in scope)

A consumer's own global CSS, or a `shadcn init`/`add` run, can silently override Kuat's semantic
tokens even when the component itself looks fine — coverage alone won't catch that. Run both
checks against the shipped `@equal-experts/kuat-core/token-contract.json`:

1. **Coverage (names).** Enumerate the tokens the item consumes — raw `var(--x)` and Tailwind
   `bg-/text-/border-/ring-/fill-*` utilities — and diff against the contract's authored
   vocabulary. Report ✅ inherited / ⚠️ missing in Kuat / ⚠️ light-only (dark gap), plus a WCAG
   contrast note on fg/bg pairs.
2. **Theme integrity (values).** Resolve the app's effective `:root`/`.dark` (kuat-core's baseline
   plus the consumer's own blocks, in import order) and diff each semantic token against the
   contract's authored value **by resolved colour**. Report ✅ intact / ⚠️ OVERRIDDEN. This is
   what catches a `shadcn init` clobber that coverage alone misses.

**Resolution (fixed rule):** a missing/dark-gap/overridden token is resolved by adding it to
kuat-core (`variables.css`, light **and** dark) so every consumer inherits it, then the contract
regenerates. Fall back to an explicit local mapping only when adding to kuat-core is genuinely
wrong. Never leave a token resolving to a shadcn default.

**Feedback record.** On a gap or missing-token finding, write a structured record to
`.kuat/feedback/<timestamp>-<item>.json`:
```json
{ "kind": "...", "item": "...", "itemSource": "...", "tokensMissing": [], "tokensDarkGap": [], "resolution": "...", "resolutionDetail": "...", "kuatCoreVersion": "..." }
```
and surface a one-line "notify the Kuat DS team" pointer in the report — no channel is wired yet,
don't invent one.

No published audit script exists yet (`audit-coverage.mjs` / `audit-theme.mjs` live unpublished in
kuat-mono) — run this as a manual enumerate → diff → resolve activity against the contract, the
same way every other rule in this skill is cited rather than scripted. Publishing these as
`kuat-core` bins or a dedicated `@equal-experts/kuat-audit` package is an open packaging decision
for kuat-mono, not something this skill assumes.

## Step 4 — Deliver

Use the agreed output format and severity model: [../_shared/report-formats.md](../_shared/report-formats.md). Include the reference version in **References** — see [../_shared/version-stamp.md](../_shared/version-stamp.md). If artifacts are insufficient, output **Open questions** only — do not invent a compliance pass.

## Conflict & ambiguity

- Where the artifact (or the user's stated intent) conflicts with a brand/accessibility rule, **flag the conflict** as a finding and recommend the compliant option — never silently mark it a pass.
- If a foundation rule and a web-product rule conflict, the foundation wins — raise it explicitly.
- If a component guide or asset can't be resolved, review against documented patterns and **flag the gap** rather than fabricating a verdict.

## Do not

- Generate mockups, rewritten copy, or code unless asked
- Assume full UX review without product context
- Skip intake when artifacts or depth are unstated

## Related

- Create counterpart: [create-web-app](../create-web-app/SKILL.md)
- Shared: [intake](../_shared/intake.md) · [review-common](../_shared/review-common.md) · [report-formats](../_shared/report-formats.md)
