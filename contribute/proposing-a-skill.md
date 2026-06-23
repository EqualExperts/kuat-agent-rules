# Proposing a skill

A new or updated **skill** — either a consumer activity skill (packaged into a plugin) or a
repo-local contributor skill.

| | |
|---|---|
| **Size** | **Heavy** — a skill is procedure that ships to the network; it gets the full treatment |
| **Skill** | [`author-skill`](../.claude/skills/author-skill/SKILL.md) |
| **Gate** | trigger / eval review; for consumer skills, the plugin build + `verify-plugins` |
| **Where** | `kuat-agent-rules` (`skills/` for consumer skills; `.claude/skills/` for contributor skills) |

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**:
   what activity does the skill cover, who triggers it, and why isn't an existing skill enough?
2. **Proposal kick-off** — a new skill is **Heavy** and custodian-led: agree the trigger, the
   audience (consumer vs contributor), and where it lives.
3. **Collaborate** — scaffold it through **[`author-skill`](../.claude/skills/author-skill/SKILL.md)**:
   a sharp trigger, progressive disclosure into `reference/`, the link conventions the build
   expects, a delivery checklist, and a version stamp. A **consumer** skill is wired into the
   plugin build; a **contributor** skill stays repo-local.
4. **Review** — the trigger and evals are reviewed; for consumer skills the plugin build runs and
   `npm run verify:plugins` confirms a valid payload with **no contributor-skill leak**.
5. **Release** — consumer skills ship in the next plugin release; contributor skills are available
   in-repo immediately. Log the decision.

See the [model overview](./overview.md) for sizes and decision rights.
