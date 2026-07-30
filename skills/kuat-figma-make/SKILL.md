---
name: kuat-figma-make
description: Generate Equal Experts product UI in Figma Make backed by the real Kuat system — the @equal-experts/kuat-react package via the Kuat Make kit, real semantic tokens, and composition-quality gates. Use for any prompt-to-build work in a Figma Make file (new screens, apps, or edits to Make output). Ensures generated code imports real Kuat components instead of hand-rolled lookalikes. Not for Figma Design files (kuat-figma-design), reviewing Make output (kuat-figma-review-make), or code outside Make (create-web-app).
---

# Kuat Figma Make build

Figma Make generates **working React code** — so "on brand" here means the generated code imports
the real `@equal-experts/kuat-react` components and kuat-core tokens, not that the output merely
looks Kuat-ish. A pixel-plausible lookalike component is a defect: it drifts from the real system
the day either changes, and it ships none of the package's accessibility work.

## Step 0 — Source gate: is the Kuat Make kit active?

Check the prompter's **Select a Make kit**:

- **Kit selected (preferred):** the kit is the primary source — its attached
  `@equal-experts/kuat-react` package is what components import from, and its `guidelines/` files
  (`Guidelines.md`, `tokens.md`, `components/overview.md`, `craft.md`, `setup.md`) are the rules.
  Don't ask for a connector on top of it.
- **No kit:** fall back to session Guidelines or a connector for the rules content, and say
  plainly that without the kit the output approximates Kuat — components will need replacing with
  real package imports before any production use. Recommend selecting/publishing the kit
  (see the Make install guide in the rules repo).

If the work is **not** Equal Experts/Kuat, none of this applies — use the client's own kit or
guidelines, and no Kuat default.

## Step 1 — Brief intake

Ask once, grouped: scenario / page type; audience; sections needed; which states are in scope
(empty / loading / error); real or realistic content for anything that carries hierarchy — not
lorem ipsum ([composition principles](../../reference/design-language/composition.md): placeholder
copy validates structure, not composition).

## Step 2 — Compose before generating

Decide, and say in the prompt or plan: the **focal point** of each screen; the **density** for
this content type (dense for dashboards/tables/metric rows, generous for page headers, onboarding,
empty states — per the web-product density table in the kit's `craft.md`); real **scale contrast**
between hierarchy levels, not colour-only; and at least one named **restraint** decision. One flat
spacing value across unlike content is a defaulted composition, not a designed one.

## Step 3 — Components: real imports, never lookalikes

- Resolution order: **Kuat Blocks → Kuat Components → shadcn primitives themed via kuat-core →
  custom build (flagged)** — the kit's `components/overview.md` carries the catalog and decision
  trees.
- Every component that exists in `@equal-experts/kuat-react` is **imported from the package** in
  the generated code — never re-implemented as local JSX, however close the copy.
- Components with real usage guides in the package's `agent-docs/components/` (Button, ButtonGroup,
  Callout, StatusBadge, Tag, TagGroup, CounterBadge, KuatHeader today) follow their documented
  API and variant rules.
- A needed component with no Kuat equivalent: build custom from the documented patterns and token
  syntax, and **name the gap** in the handoff — never silently invent a Kuat-looking API.

## Step 4 — Tokens

Colours, type, spacing, and radius come from kuat-core's semantic tokens / CSS variables (the
kit's `tokens.md`), never Make's own generic defaults or raw hex. Product shells use the dark-nav
pattern with the white monochrome logo. Radius: 0 static, 6px interactive, 4px inputs. Status
colours always paired with an icon or label, never colour alone.

## Step 5 — Gate before handing over

Self-audit the **generated code**, not just the preview:

- [ ] Imports: every on-system component comes from `@equal-experts/kuat-react` — search the code
      for local re-implementations of things the package exports.
- [ ] No raw hex/px standing in for a token; no Make-default tokens left unlabelled.
- [ ] In-scope states (empty/loading/error) actually built.
- [ ] Composition: one focal point per screen; density matches the content type; hierarchy carried
      by scale/weight, not colour alone; at least one restraint decision named.
- [ ] Run the observer tests from the kit's `craft.md` as a fresh adversarial pass — brand-swap,
      colour-only hierarchy, uniform spacing, placeholder, named restraint. Any hit is a finding
      to fix or flag, not soften.
- [ ] State what was approximated (and why) vs. what is a genuine gap; stamp the output with the
      kit/package version per [../_shared/version-stamp.md](../_shared/version-stamp.md).

## Conflict & ambiguity

- Request vs. brand/accessibility rule: flag the conflict, recommend the compliant option.
- If the kit's package fails to resolve at generation time, stop and say so — don't quietly
  hand-roll the whole component layer.
- Ask when scenario or scope is unclear; don't guess.

## Related

- Review counterpart: `kuat-figma-review-make` (separate skill on this surface)
- Kit guideline sources staged in the rules repo: [make-kit-guidelines](../install/make-kit-guidelines/README.md)
- Figma Design route instead: `kuat-figma-design` · code outside Make: `create-web-app`
- [intake](../_shared/intake.md) · [version-stamp](../_shared/version-stamp.md)
