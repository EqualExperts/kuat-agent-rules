# Proposing an icon or image

A new or updated **icon or imagery** asset for the brand.

| | |
|---|---|
| **Size** | **Light** (a new icon) · **Medium** (a set or a sourced photo library) |
| **Skill** | [`add-brand-asset`](../.claude/skills/add-brand-asset/SKILL.md) |
| **Gate** | `verify-plugins` asset check; `assets.manifest.json` integrity |
| **Where** | `kuat-agent-rules` `assets/` |

## Steps

1. **Request** — Slack **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**:
   what icon/image, what is it for, and is it a genuine, licensed source?
2. **Collaborate** — register it through **[`add-brand-asset`](../.claude/skills/add-brand-asset/SKILL.md)**:
   place the file and add its `assets.manifest.json` entry. Genuine assets only — no recreated marks.
3. **Review** — `npm run verify:plugins` validates the pack and manifest. A single catalogued icon
   (**Light**) can pass on a green gate; a set or library is custodian-reviewed.
4. **Release** — the relevant plugin re-bundles the asset pack. Log notable decisions.

> **Known gap.** There is **no genuine EE photography library** in the asset pack yet — imagery
> contributions today are icons and catalogued assets. Standing up a sourced photo library is a
> larger (**Medium/Heavy**) custodian-led effort; raise it in `#design-system` if you need it.

See the [model overview](./overview.md) for sizes and decision rights.
