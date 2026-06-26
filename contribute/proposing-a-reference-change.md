# Proposing a reference change

A new or updated **reference guideline or pattern** in the passive library (`reference/`).

| | |
|---|---|
| **Size** | **Fix** (clarity) · **Light** (a new pattern) · **Medium** (extends a pattern set) |
| **Skill** | [`author-reference`](../.claude/skills/author-reference/SKILL.md) |
| **Gate** | [`review-reference-change`](../.claude/skills/review-reference-change/SKILL.md) — passive test + link integrity + structure + token drift (`npm run reference:check`) |
| **Where** | `kuat-agent-rules` `reference/` |

## The one rule — keep it passive

`reference/` states **what is true** about Equal Experts — principles, specs, token values, fact
tables, patterns. The moment a file tells an agent *how to do a job* (verbs, role cards,
checklists, "before you create/review", numbered steps), it is **procedure** and belongs in a
**skill**, not in reference. The gate enforces this.

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**:
   what's unclear or missing, and which medium does it belong to?
2. **Collaborate** — write it through **[`author-reference`](../.claude/skills/author-reference/SKILL.md)**:
   place it correctly (foundations vs a medium's `patterns/`), keep it passive, and route any
   colour change through the [token SoT](./proposing-a-token-change.md).
3. **Review** — run `npm run reference:check`, then hand to
   **[`review-reference-change`](../.claude/skills/review-reference-change/SKILL.md)** for the
   manual pass (is it true? platform isolation? prose-smuggled procedure?). A clarity fix (**Fix**)
   can pass on a green gate.
4. **Release** — the next plugin build snapshots the updated `reference/` into the consumer
   plugins. Log notable decisions.

Proposing an outcome-framed **pattern** (single-medium or shared across media) has its own placement and
anatomy rules — see **[Proposing a pattern](./proposing-a-pattern.md)**.

See the [model overview](./overview.md) for sizes and decision rights.
