# Proposing a token change

A change to a brand **design token** — a colour, scale step, or semantic alias.

| | |
|---|---|
| **Size** | **Fix** (typo) · **Medium** (a value change affecting consumers) · **Heavy** (token *structure*) |
| **Skill** | [`generate-tokens`](../.claude/skills/generate-tokens/SKILL.md) |
| **Gate** | `tokens:check` **drift gate** — both `colours.md` and kuat-core `variables.css` must match the source of truth |
| **Where** | `kuat-agent-rules` `reference/design-language/tokens/` (SoT) → kuat-mono |

## The one rule

Tokens have **one source of truth**: `reference/design-language/tokens/colors.tokens.json`.
`colours.md` and `variables.css` are **generated** from it — never hand-edited. Editing a value in
two places is exactly the drift the gate exists to prevent.

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**:
   which token and why? Colour changes ripple to every consumer, so surface it early.
2. **Proposal kick-off** — a value change that affects consumers (**Medium**) or any change to the
   token *structure* (**Heavy**, always custodian-led) is agreed with a custodian first.
3. **Collaborate** — edit `colors.tokens.json` and run **[`generate-tokens`](../.claude/skills/generate-tokens/SKILL.md)**
   (`npm run tokens:generate`) to regenerate the downstream artifacts.
4. **Review** — `npm run tokens:check` gates the drift. A pure typo fix (**Fix**) can pass on a
   green gate; value/structure changes get custodian sign-off.
5. **Release** — artifacts regenerate; the change ships on `beta` → `stable`. Log the decision.

See the [model overview](./overview.md) for sizes and decision rights.
