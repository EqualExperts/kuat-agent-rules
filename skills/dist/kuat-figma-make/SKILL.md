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
lorem ipsum ([composition principles]({RULES_DIR}/design-language/composition.md): placeholder
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
      kit/package version per **version-stamp.md** (see "Shared: version stamp" below).

## Conflict & ambiguity

- Request vs. brand/accessibility rule: flag the conflict, recommend the compliant option.
- If the kit's package fails to resolve at generation time, stop and say so — don't quietly
  hand-roll the whole component layer.
- Ask when scenario or scope is unclear; don't guess.

## Related skills

- Sibling Figma skills on this surface (each its own bundled SKILL.md in `skills/dist/`): `kuat-figma-design` · `kuat-figma-prototype` · `kuat-figma-review-design` · `kuat-figma-review-make`
- Rules standards: `{RULES_DIR}` — [kuat-agent-rules](https://github.com/EqualExperts/kuat-agent-rules)


<!-- begin include: skills/_shared/intake.md -->

## Shared: intake

Ask intake in **one grouped message** before producing anything. Don't assume defaults the user hasn't given.

### Review depth (review skills)

Ask the user to choose — do **not** assume `brand_compliance` for "review this":

| Depth | Evaluates | Minimum context |
|-------|-----------|-----------------|
| `brand_compliance` | Tokens, logo, typography, spacing, accessibility | Artifacts only |
| `product_ux` | Task fit, copy, flows, empty/error states | Artifacts + product context |
| `full` | Brand + product UX + scenario/pattern rules | Above + research/insights |

If context for `product_ux`/`full` is missing, ask first; if the user proceeds anyway, mark UX findings **provisional** and list assumptions under **Open questions**. Never invent user stories or research conclusions.

### Universal intake

| # | Item |
|---|------|
| 1 | Task / scenario (what is this, what is it for) |
| 2 | Audience and constraints (deadline, tech, policy, must-use patterns) |
| 3 | Artifacts (files, URLs, Figma, screenshots) — for review |
| 4 | Output format — for review, see report-formats.md |
| 5 | Deliverable format — for create (Figma, code, copy doc, deck file) |

If the deliverable or review depth is ambiguous, ask once before starting.

<!-- end include: skills/_shared/intake.md -->

<!-- begin include: skills/install/make-kit-guidelines/craft.md -->

## Shared: craft

Correct tokens and real components are necessary but not sufficient — a screen can use every Kuat
value and still read as generic. These rules define what "considered" means for generated UI, and
the tests output must survive before it ships. Source: the Composition & Craft layer in the
Kuat reference (`reference/design-language/composition.md`).

### Principles

- **One focal point per screen.** Each screen or section has one clear focal point at first
  glance, established by size, weight, position, and whitespace together — not by colour alone,
  and not by making everything equally weighted. A viewer should be able to say what the screen is
  *for* within a second.
- **Whitespace is a decision, not a minimum.** The spacing scale sets the unit; how generously it
  is spent depends on the content type — never one flat value across unlike content.
- **Scale contrast carries hierarchy.** Adjacent hierarchy levels differ in size and weight moving
  together, not colour only. Two levels that differ only by colour are not a hierarchy.
- **Restraint is not flatness.** Simplicity rules out ornament with no job to do; it does not rule
  out a deliberate accent or asymmetry that sharpens the focal point. Every considered screen can
  name at least one thing deliberately left out or dialed back.
- **Real content or it isn't validated.** "Heading text goes here" and lorem ipsum validate
  structure, not composition. Use real or realistic copy for anything that carries hierarchy.

### Density by content type (product UI)

| Content type | Default | Why |
|--------------|---------|-----|
| Metric/summary rows, tables, dashboards | Dense — tight spacing, small type steps between adjacent values | Users scan many concurrent data points; generosity here costs fold-space without adding clarity |
| Page headers, empty states, onboarding, confirmations | Generous — larger type-scale jump, more surrounding whitespace | One message to land; density here reads cramped, not efficient |
| Forms, detail pages | Balanced — generous at section breaks, dense within a section | Fields in a section belong together; breaks are where the reader re-orients |

The dashboard default does not transfer to a settings or onboarding screen just because both are
"product UI" — the content type in hand sets the density.

### The observer tests (run before shipping)

A fresh, adversarial re-read of the whole screen — not a repeat of the line-item checks:

- **Brand-swap:** strip the logo and swap the colour tokens for a competitor's. Still looks
  completely at home on their product? Then the composition is generic — only the colours are
  doing brand work.
- **Colour-only hierarchy:** any two adjacent hierarchy levels differing only by colour? The
  hierarchy isn't real.
- **Uniform spacing:** one spacing value everywhere regardless of content type? Spacing was
  defaulted, not decided.
- **Placeholder:** hierarchy validated only against filler? Unproven, not passing.
- **Named restraint (hard requirement):** name one thing deliberately left out, dialed back, or
  simplified in service of the focal point. No named restraint = fail, regardless of how the
  other checks scored.

Any test hit is a defect to fix or flag plainly — never soften it into "could be more polished".

### Related

- `Guidelines.md` — product character and rules
- `tokens.md` — the values these principles spend
- `components/overview.md` — what to compose with

<!-- end include: skills/install/make-kit-guidelines/craft.md -->

<!-- begin include: skills/_shared/version-stamp.md -->

## Shared: version stamp

Stamp every deliverable with the reference version it was produced/reviewed against, so output is traceable to a known rule set. Carry forward the `RULES_REF` citation habit from the legacy skills.

### What to record

| Field | Source |
|-------|--------|
| `reference ref` | Git SHA of this `kuat-agent-rules` checkout (`git rev-parse --short HEAD`), or the plugin/package version when consumed via a release |
| `package version` | Installed `@equal-experts/kuat-react` / `kuat-vue` version, when building against published components |
| `date` | Date the artifact was produced or reviewed |

### How to surface it

- **Create:** add a small footer / note on the deliverable, e.g. `EE reference <ref> · <date>`.
- **Review:** include the ref in the **References** section of the report alongside the reference files cited.

If a shell is unavailable and no release version is known, state `reference ref: unknown (local working copy)` rather than omitting it.

<!-- end include: skills/_shared/version-stamp.md -->

<!-- kuat-skill-bundle: kuat-figma-make v1.0.0 rules-ref:3a78ad12cb5c built:2026-07-30 -->
