# Contributing to Kuat

Kuat is the Equal Experts design system. Anyone across the EE network can improve it — this
page is the front door. The full model, the per-surface "how" pages, and the decision log live
in **[contribute/](./contribute/overview.md)**.

## How it works — a hybrid model

A small **Kuat design system team** (custodians) owns the sources of truth — the reference
guidelines, the design tokens, the `kuat-mono` component library, and the studio asset pack —
and maintains the tooling, gates, and release cadence. The **wider EE network** (consultants,
product engineers, designers) does the bulk of the fixes and light additions. Custodians don't
build everything; they curate, gate, and enable.

## Contribution vs participation

A **contribution** is a proposal, design, code, doc, or asset — a new feature, enhancement, or
fix — **released through the system for others to reuse**. Improving a component, changing a
token, adding a reference pattern, registering a brand asset, authoring a skill: all
contributions. Asking which component to use, giving review feedback, or attending a sync are
valuable **participation**, but not contributions.

## Sizes

| Size | What | How |
|------|------|-----|
| **Fix** | A defect in code, design, doc, or asset | Fast, self-directed via the relevant skill + gate |
| **Light** | A non-breaking addition | Mostly autonomous via skill + gate; light custodian touch |
| **Medium** | Extends an existing feature | Proposal + custodian review |
| **Heavy** | New feature, breaking, or foundational | Custodian-led; proposal kick-off |

Fix/Light should be a constant healthy hum; Medium/Heavy are rarer and curated.

## The process

1. **Request** — start an open conversation in Slack
   **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**: what problem are
   you solving? This avoids duplicate work and surfaces existing solutions.
2. **Proposal kick-off** *(Medium/Heavy only)* — agree scope and delivery with a custodian.
3. **Collaborate** — do the work **through the matching contributor skill** (`add-kuat-component`,
   `author-reference`, `generate-tokens`, …). The skill *is* the guided, house-style path — you
   drive a skill, not raw files.
4. **Review** — the **gates run automatically** (passive test, link integrity, token drift,
   registry drift, `verify-plugins`, tests). Fix/Light can pass on green gates; Medium/Heavy add
   custodian sign-off. *(Launch posture: custodians review every contribution while the model
   matures — see the overview.)*
5. **Release** — pinned semver, `beta` → `stable` channels; regenerate the artifacts; communicate
   the change and log the decision.

## Find your path

Pick the page for what you're contributing — each names the size, the skill to use, the gate, and
the request step:

- [Proposing a component](./contribute/proposing-a-component.md)
- [Proposing a token change](./contribute/proposing-a-token-change.md)
- [Proposing a reference change](./contribute/proposing-a-reference-change.md)
- [Proposing a pattern](./contribute/proposing-a-pattern.md)
- [Proposing a slide asset](./contribute/proposing-a-slide-asset.md)
- [Proposing an icon or image](./contribute/proposing-an-icon-or-image.md)
- [Proposing a skill](./contribute/proposing-a-skill.md)

**Full model:** [contribute/overview.md](./contribute/overview.md) ·
**Decisions:** [contribute/decision-log.md](./contribute/decision-log.md)
