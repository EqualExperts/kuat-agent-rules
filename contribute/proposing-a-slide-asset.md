# Proposing a slide asset

A change to the studio asset pack — the slide master, its layouts, or a brand asset (logo, font,
photograph) it carries.

| | |
|---|---|
| **Size** | **Fix** (mislabelled layout) · **Light** (a new asset) · **Medium** (master changes) |
| **Skill** | [`prep-slides-master`](../.claude/skills/prep-slides-master/SKILL.md) · [`curate-slide-layouts`](../.claude/skills/curate-slide-layouts/SKILL.md) · [`add-brand-asset`](../.claude/skills/add-brand-asset/SKILL.md) |
| **Gate** | `verify-plugins` asset check; `assets.manifest.json` integrity |
| **Where** | `kuat-agent-rules` `assets/slides/` |

## The one rule — genuine assets only

Assets *are* the brand: register the **real** logo lockups, fonts, and photography — never a
recreated or redrawn mark. A from-scratch lookalike defeats the point of bundling a genuine
source of truth.

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**:
   what asset or layout, and do you have the genuine source file?
2. **Collaborate** — pick the skill for the job:
   - **Re-slim / brand-fix the master** from a fresh export → **[`prep-slides-master`](../.claude/skills/prep-slides-master/SKILL.md)**
     (**Medium**, custodian-led).
   - **Label or prune master layouts** → **[`curate-slide-layouts`](../.claude/skills/curate-slide-layouts/SKILL.md)**
     (**Fix/Light**).
   - **Register a logo variant, font, or photo** → **[`add-brand-asset`](../.claude/skills/add-brand-asset/SKILL.md)**
     (**Light**).
3. **Review** — `npm run verify:plugins` validates the asset pack and manifest. Layout
   labelling/pruning (**Fix/Light**) can pass on green gates; master changes are custodian-led.
4. **Release** — the studio plugin re-bundles the asset pack. Log notable decisions.

See the [model overview](./overview.md) for sizes and decision rights.
