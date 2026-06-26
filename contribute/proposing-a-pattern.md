# Proposing a pattern

A new or changed **pattern** — outcome-framed best-practice guidance for solving a user problem in one
or more media. Patterns are cross-cutting guidance, so they are **custodian-led**.

| | |
|---|---|
| **Size** | **Medium** (extend or reframe a pattern within one medium) · **Heavy** (a new shared, cross-medium concept, or a whole new pattern area) |
| **Skill** | [`author-reference`](../.claude/skills/author-reference/SKILL.md) |
| **Gate** | [`review-reference-change`](../.claude/skills/review-reference-change/SKILL.md) — passive test + link integrity + structure + token drift (`npm run reference:check`) |
| **Where** | `kuat-agent-rules` — `reference/patterns/` (a shared concept) or `reference/media-types/<medium>/patterns/` (a single-medium pattern) |

## What you're proposing

A pattern is named for the **outcome** a user is after, not the UI that delivers it — *Ask users for…*,
*Help users to…*, or a *Pages* type. See the [patterns overview](../reference/patterns/overview.md) for
the model. Two things shape every pattern proposal:

- **Anatomy.** A pattern document reads **user goal → context → principles → solution(s) → examples**. A
  shared concept states the medium-agnostic *why* and principles once; an implementation states the *how*
  in one medium and links up to its concept.
- **Placement decides relevance.** A pattern relevant to one medium lives **in that medium**
  (`media-types/<medium>/patterns/`), with its concept and implementation together. Only when a second
  medium genuinely needs it does its **concept** factor up to `reference/patterns/`, with a per-medium
  implementation under each relevant medium. A medium's `patterns/` folder holds only the patterns it
  implements — never add a pattern to a medium that doesn't build it.

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**: what
   user outcome is unserved, and which medium (or media) is it for?
2. **Proposal kick-off** — patterns are cross-cutting, so agree scope with a custodian first: is this
   single-medium or shared? does a related concept already exist? is a promotion (single-medium → shared)
   the right move?
3. **Collaborate** — write it through
   **[`author-reference`](../.claude/skills/author-reference/SKILL.md)**: place it correctly, follow the
   anatomy, keep it **passive** (the *what*, not agent how-to), and use relative links only.
4. **Review** — run `npm run reference:check`, then hand to
   **[`review-reference-change`](../.claude/skills/review-reference-change/SKILL.md)** for the manual pass
   (is it true? right placement? no medium bloat? prose-smuggled procedure?).
5. **Release** — the next plugin build snapshots the updated `reference/` into the consumer plugins. Log
   notable decisions in the [decision log](./decision-log.md).

## Blocks (deferred)

A pattern may one day point to a coded **Block** — a predefined composition that implements part of it.
The Block model and a pattern↔Block registry are **not yet defined**, and there is no `proposing-a-block`
path yet. A pattern document may note that a Block could link in later; nothing more.

See the [model overview](./overview.md) for sizes and decision rights.
