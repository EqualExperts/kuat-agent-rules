# The Kuat contribution model

How people across Equal Experts propose, build, review, and release changes to the Kuat design
system. This is the canonical model; [CONTRIBUTING.md](../CONTRIBUTING.md) is the short front
door, and the per-surface pages in this directory tell you *how* for each kind of change.

**Inspiration:** [EightShapes — *Defining Design System Contributions* (Nathan Curtis)](https://medium.com/eightshapes-llc/defining-design-system-contributions-eb48e00e8898)
and the [Octopus Design System contribution model](https://www.octopus.design/latest/contribute/overview-7l7n932Y),
adapted to Kuat's architecture and the **contributor skills + gates** that automate the hard parts.

## 1. The model — hybrid (custodians + federated network)

Kuat runs a **hybrid model**, mirroring the consumer/contributor split the architecture already
encodes:

- **Custodians** — the **Kuat design system team**, owning the sources of truth: the reference
  guidelines, the design tokens (`colors.tokens.json`), the `kuat-mono` component library, and the
  studio asset pack. They maintain tooling, gates, and the release cadence.
- **Federated contributors** — the wider EE network (consultants, product engineers, designers)
  who *use* Kuat and are encouraged to improve it.

Custodians don't build everything; they curate, gate, and enable. Contributors do the bulk of
fixes and light changes autonomously.

## 2. Contribution ≠ participation

A **contribution** (Curtis): *any proposal, design, code, documentation, or asset of a new
feature, enhancement, or fix — released through the system for others to reuse.* Everything else
is valuable **participation**, not contribution.

| ✅ Contribution | ❌ Participation (not a contribution) |
|----------------|--------------------------------------|
| New/updated/deprecated **component** (kuat-mono) | Asking *which* component to use |
| A **token** change via the SoT (`colors.tokens.json`) | Feedback in a review/critique |
| New/updated **reference guideline or pattern** | A question about a guideline |
| A **slide layout / brand asset** added to the studio pack | "Can you review how I used Kuat?" |
| A new/updated **icon or imagery** asset | Attending a DS sync |
| A new/updated **skill** | Advocating for the system |

## 3. What's contributable, by surface

| Surface | Where | Contribution skill | Source of truth / gate |
|---------|-------|--------------------|------------------------|
| Components | `kuat-mono` | `add-kuat-component` | `components.manifest.json` → generated registry + drift check |
| Design tokens (colour…) | `kuat-agent-rules` `tokens/` (SoT) → kuat-mono | `generate-tokens` | `tokens:check` drift gate (`colours.md` + `variables.css`) |
| Reference guidelines / patterns | `kuat-agent-rules` `reference/` | `author-reference` / `review-reference-change` | passive-test + link + token-drift gate |
| Slide layouts / brand assets | `kuat-agent-rules` `assets/` | `prep-slides-master` / `curate-slide-layouts` / `add-brand-asset` | `verify-plugins` asset check |
| Skills | `kuat-agent-rules` (or repo-local) | `author-skill` | trigger / eval review |

See the matching **[Proposing a …](./proposing-a-component.md)** page for each surface. A **pattern**
(outcome-framed guidance, single-medium or shared across media) has its own shape and placement rules —
see **[Proposing a pattern](./proposing-a-pattern.md)**.

## 4. Contribution size

| Size | What | Who / how | Examples |
|------|------|-----------|----------|
| **Fix** | Defect in code/design/doc/asset | Frequent, fast, **self-directed** via the relevant skill + gate | Browser bug, token typo, doc clarity, mislabelled asset |
| **Light** | Non-breaking addition | Semi-frequent, **mostly autonomous** via skill + gate; light custodian touch | New component variant/state, new reference pattern, doc edit, new icon |
| **Medium** | Extends an existing feature | Proposal + **custodian review**; may need >1 participant | New component capability, extend a pattern set, a token-value change affecting consumers |
| **Heavy** | New feature / breaking / foundational | Rigorous, multidisciplinary, **custodian-led**; proposal kick-off | New component, new media-type/pattern area, token *structure* change, breaking change, new skill |

Frequency is inversely correlated with cost: Fix/Light should be a constant healthy hum;
Medium/Heavy are rarer and curated.

## 5. The process (scales with size)

Kuat's twist on Octopus's five steps: **much of "Collaborate" and "Review" is skill-mediated and
gate-enforced**, which is what makes the Fix/Light lane genuinely fast and autonomous.

1. **Request** — an open conversation first in Slack
   **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**: "what problem are
   you solving?" Avoids duplicate work and surfaces existing solutions.
2. **Proposal kick-off** — *Medium/Heavy only*: agree scope + delivery with a custodian.
3. **Collaborate** — the contributor does the work **through the matching contributor skill**
   (`add-kuat-component`, `author-reference`, `generate-tokens`, …). The skill *is* the guided,
   house-style path — you drive a skill, not raw files. This is the answer to "designers won't
   touch git/markdown".
4. **Review** — the **gates run automatically**: `review-reference-change` (passive test + links +
   token drift), `tokens:check`, registry drift, `verify-plugins`, tests. **Fix/Light can pass on
   green gates** (autonomous); **Medium/Heavy add custodian sign-off**. The gate replaces both the
   too-high git barrier and the unreviewed-wiki chaos.
5. **Release** — pinned semver + `beta`/`stable` channels; regenerate the artifacts (tokens →
   `colours.md`/`variables.css`, registry, plugin payloads); **communicate** (changelog) and log
   the decision.

## 6. Decision rights (who can do what)

Decision rights **relax over time** as the team gains confidence:

- **Now (launch posture):** the **Kuat DS team reviews every contribution, all sizes.** The gates
  still run on everything — that's what makes reviewing *all* of it fast and consistent — but
  custodian sign-off is required even for Fix/Light.
- **Target (as trust builds):** **Fix + Light become autonomous** for federated contributors
  *provided the gates are green*; **Medium** keeps a review; **Heavy** keeps proposal + review +
  pairing. The gates are the trust mechanism that lets custodians safely relinquish control of the
  small lane — so the relaxation is earned, not a leap of faith.
- **Always custodian-led, never autonomous (at any maturity):** foundations / token *structure*,
  breaking changes, new media-types, anything changing the shape of a source of truth. (The
  `generate-tokens` / `review-reference-change` gates enforce the SoT direction regardless.)
- **Contributor skills are repo-local and DS-team-distributed** — the *authoring* tools sit with
  custodians/contributors in-repo, never in the consumer Enterprise plugin.

## 7. Release, communicate, deprecate

- **Versioning:** pinned semver, `beta` → `stable` channels. A contribution ships on `beta`,
  promotes to `stable`.
- **Communicate:** changelog per release; a lightweight "what changed" note to the network.
- **Decision log:** record notable accept/reject/deprecate decisions in
  [decision-log.md](./decision-log.md) — useful as the network grows.
- **Deprecation:** a deprecation path (status + replacement + migration note) for
  components/patterns/assets being retired — see
  [deprecation-guidelines.md](./deprecation-guidelines.md).
