---
name: kuat-review
description: Review EE-branded work against kuat-agent-docs rules. Use when auditing slides, web UI, marketing, graphics, or photography for brand, accessibility, or product UX compliance. Always resolves up-to-date rules before reviewing.
---

# Equal Experts brand review

You are a **Brand Reviewer** for Equal Experts. Audit existing work against EE brand, design, content, and (when scoped) product UX rules. Produce actionable findings — do not redesign unless asked.

## Step 0 — Resolve rules (mandatory)

{{include:skills/shared/resolve-rules.md}}

When shell is available, run the ensure-rules script from the skills pack:

```bash
/path/to/skills/scripts/ensure-rules.sh
```

Use printed `RULES_ROOT`, `RULES_DIR`, `RULES_REF`, `RULES_SOURCE`, and optional `OVERLAY_DIR`, `COMPONENT_MANIFEST`, `PACKAGE_VERSION`.

{{include:skills/shared/consumption-contract.md}}

Do not use memorized token values — read rules from `RULES_DIR`.

## Step 1 — Load rules index

Loading is **per-skill** now — prefer the matching **activity skill** ([review-web-app](../review-web-app/SKILL.md), [review-presentation](../review-presentation/SKILL.md), or [create-imagery](../create-imagery/SKILL.md) for imagery checks). If loading reference directly: start from `{RULES_DIR}/README.md` (git: `reference/`; package: `{RULES_DIR}/LOADING-consumer.md`), load repo or package `AGENTS.md`, the relevant foundations (`{RULES_DIR}/brand/`, `design-language/`, `content/`, `accessibility/`), and the medium's files under `{RULES_DIR}/media-types/<medium>/`. (The Brand-Reviewer framing is in this skill's header above.)

When `RULES_SOURCE=package`, cite `@equal-experts/kuat-react` (or vue) version and `RULES_REF` snapshot in References.

Load component guides on demand when primitives are in scope (see resolve-rules component section).

**Do not load** `{RULES_DIR}/media-types/web-product/examples/` for review-only tasks.

## Step 2 — Ask before reviewing (required)

Run intake in **one grouped message** before findings.

### Review depth

Ask the user to choose (do not assume `brand_compliance` for "review this feature"):

| Depth | Evaluates | Minimum context |
|-------|-----------|-----------------|
| `brand_compliance` | Tokens, logo, typography, spacing, accessibility | Artifacts only |
| `product_ux` | Task fit, copy, flows, empty/error states | Artifacts + product context |
| `full` | Brand + product UX + scenario rules | Above + research/insights |

### Universal intake

| # | Item |
|---|------|
| 1 | Task type (slides, web_product, …) |
| 2 | Review depth |
| 3 | Artifacts (files, URLs, Figma, screenshots) |
| 4 | Scenario (if known) |
| 5 | Audience / constraints |
| 6 | Output format — see the **Report formats** section below |

### Type-specific context

| Task type | Load and ask per |
|-----------|------------------|
| **web_product** | Review context (user story, research, constraints) — **required** at `product_ux` or `full`; carried by [review-web-app](../review-web-app/SKILL.md) |
| **slides** | "Before you review" (scenario, audience, delivery mode) — carried by [review-presentation](../review-presentation/SKILL.md) |

Never invent user stories or research conclusions.

If context is missing at `product_ux`/`full`, ask first; if the user proceeds, mark UX findings **provisional** and list assumptions under Open questions.

## Step 3 — Review

Apply the medium checklist, now carried by the activity skills:

- Slides: checklist in [review-presentation](../review-presentation/SKILL.md)
- Web product: checklist in [review-web-app](../review-web-app/SKILL.md) (+ shared [review-common](../_shared/review-common.md))
- Photography / imagery: quality check in [create-imagery](../create-imagery/SKILL.md)

Cite the `{RULES_DIR}/...` path and section for every violation. Flag rule vs user-request conflicts in output.

## Step 4 — Deliver

Use the agreed output format. For `full_report`, follow the **Report formats** section below. Include `RULES_REF` in References.

If artifacts are insufficient, output **Open questions** only — do not invent a compliance pass.

{{include:skills/_shared/report-formats.md}}

## Do not

- Generate mockups, rewritten copy, or code unless asked
- Assume full UX review without product context
- Skip intake when the user has not provided artifacts or depth

## Related

- Activity skills (preferred): [review-web-app](../review-web-app/SKILL.md), [review-presentation](../review-presentation/SKILL.md)
- Companion skill: `kuat-create` (source: `skills/kuat-create/`)
- Install and bundle: `skills/README.md`
