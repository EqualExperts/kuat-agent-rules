---
name: review-reference-change
description: Review the passive reference library — either gate a change before it merges (pass/fail) or do a general review/audit of specific reference file(s). Use when reviewing an edit/add/move under reference/ (a guideline, pattern, token, or colours change) OR auditing an existing reference doc — runs the passive test (no verbs/checklists/role cards/loading tables), link integrity, structure conformance, and token drift, then a manual read, and reports findings by severity. The gate the recent out-of-phase content edit lacked. Contributor-only; repo-local.
---

# Review the reference library

`reference/` is the **passive** library — it states the **WHAT** about Equal Experts and carries no
procedure. This skill reviews it on two levels: the **automated checks** (a script) and a **manual
read** (judgement the script can't do), then reports findings by severity.

It works in either direction:

- **As a merge gate** — verify *a change* stays passive, its links resolve, it keeps the
  `media-types/<medium>/patterns/` structure, and it hasn't drifted the colour tokens. Verdict = PASS/FAIL.
- **As a general review / audit** — point it at specific reference file(s) (or the whole tree) to
  assess quality, not just block a diff. Output = findings by severity, like the consumer review skills.

> Standards live in [`/reference`](../../../reference/README.md); the passive/skill boundary is
> defined in [`reference/README.md`](../../../reference/README.md#the-passiveskill-boundary). This
> skill enforces it.

## Step 1 — Pick the scope (which mode)

```bash
# (a) Gate a change — default: reference/*.md changed vs the base branch
npm run reference:check

# (b) Review specific file(s) — a general review/audit of named docs
node skills/scripts/check-reference.mjs reference/media-types/slides/styling.md

# (c) Full audit — the entire reference tree (surfaces legacy debt too)
node skills/scripts/check-reference.mjs --all
```

Use **(a)** for a PR gate, **(b)** when someone asks "review this reference doc", **(c)** for a
periodic sweep. Settle the **output format** with the requester first (Step 4).

## Step 2 — Run the automated checks

All three modes run the same four checks; non-zero exit on any failure:

| Check | What it catches | Severity |
|-------|-----------------|----------|
| **Token drift** | `colours.md` out of sync with `colors.tokens.json` (SoT integrity — the `#0066CC` class) | **Critical** |
| **Passive test** | Checklists (`- [ ]`), "before you create/review" headings, `Step N` headings, role cards, the retired `LOADING.md` task→files taxonomy — **procedure**, which belongs in a skill | **Major** |
| **Link integrity** | Any relative markdown link that doesn't resolve (the Phase-1 broken-link class) | **Major** |
| **Structure** | `patterns/` appearing anywhere but `reference/media-types/<medium>/patterns/` | **Major** |

How to act on each:

- **Token drift** → the change hand-edited a generated artifact. Revert it; change the colour in the
  token SoT and run [generate-tokens](../generate-tokens/SKILL.md).
- **Passive-test hit** → the content is procedure. Move it to a **skill** and link from the skill into
  the reference slice it needs (progressive disclosure). Don't reword to dodge the scan.
- **Broken link** → fix/repoint it; if a path moved, update [`MIGRATION-MAP.md`](../../../reference/MIGRATION-MAP.md) (see [author-reference](../author-reference/SKILL.md)).
- **Structure** → relocate the `patterns/` content under the owning medium. Patterns is **not** a top-level concept.

## Step 3 — Manual review (the script is a floor, not the ceiling)

Read the file(s) and judge what the scan can't:

- **Is it actually true about EE?** Reference is facts/specs/principles — not opinion or aspiration. *(Critical if wrong.)*
- **Platform isolation** — a media-type file must not depend on another media-type's rules (slides ↛ web); foundations are fine. See [AGENTS.md](../../../AGENTS.md). *(Major.)*
- **Prose-smuggled procedure** — a paragraph can hide "how to" past the marker scan (imperatives, "first… then…", a recipe). It belongs in a skill. *(Major.)*
- **Clarity / consistency** — heading levels, terminology, duplication. *(Minor.)*
- **Colours** — any colour must originate in `colors.tokens.json`, never `colours.md`. *(Critical if hand-set.)*

## Step 4 — Output (agree the format, then report)

Pick a format from [`../../../skills/_shared/report-formats.md`](../../../skills/_shared/report-formats.md):
default **`checklist_only`** for a quick merge gate, **`full_report`** for a general review/audit.
Use the shared severity scale (**Critical / Major / Minor**) per Step 2–3.

**Gate verdict (modes a/b quick):**

- **PASS** — automated checks green + manual review clean.
- **FAIL** — one or more findings; do not merge until green.

**Findings table (full_report / violations_only):**

| Severity | Check / Aspect | Location (`file:line`) | Evidence | Fix |
|----------|----------------|------------------------|----------|-----|
| Critical | Token drift | `design-language/colours.md:22` | `#0066cc` ≠ token `#1795d4` | regen via generate-tokens |
| Major | Passive test | `media-types/slides/x.md:40` | `- [ ] …` checklist | move to a skill |

Close with **References** — the reference ref reviewed against
([version-stamp](../../../skills/_shared/version-stamp.md)) and the files cited.

> **Known backlog (not a blocker for unrelated changes):** mode **(c)** `--all` surfaces ~60
> pre-existing "Testing Checklist" sections in legacy reference files (accessibility,
> component-decision-tree, product-content, photography). These predate Phase 7 and are tracked for a
> reference-cleanup pass — they are *not* introduced by a new change, so the change gate (mode a) won't
> block on them. Report them as backlog, not as a gate failure. Don't add new ones.

## Related

- Part of the [contribution model](../../../contribute/overview.md) — this is the **reference-contribution gate** (the Review step) ([proposing a reference change](../../../contribute/proposing-a-reference-change.md)).
- Authoring counterpart: [author-reference](../author-reference/SKILL.md) · colours: [generate-tokens](../generate-tokens/SKILL.md)
- Output formats + severity: [`skills/_shared/report-formats.md`](../../../skills/_shared/report-formats.md)
- Checker: `skills/scripts/check-reference.mjs` · npm: `reference:check`
