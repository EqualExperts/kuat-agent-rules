# Proposing a component

A new or changed UI component in the `kuat-mono` component library.

| | |
|---|---|
| **Size** | **Light** (new variant/state) → **Heavy** (a brand-new component) |
| **Skill** | `add-kuat-component` — lives **downstream in `kuat-mono`**, not in this repo |
| **Gate** | `components.manifest.json` → generated registry + **registry drift check**; component tests |
| **Where** | `kuat-mono` |

## Steps

1. **Request** — start in Slack
   **[#design-system](https://equalexperts.slack.com/archives/C0BCFBB4EK0)**: what problem does
   the component solve, and is there an existing one (or variant) that already covers it?
2. **Proposal kick-off** — for a brand-new component (**Heavy**) or one that extends an existing
   capability (**Medium**), agree scope and the API with a custodian first.
3. **Collaborate** — build it through **`add-kuat-component`** in `kuat-mono`. The skill is the
   house-style path: it scaffolds the component, its variants/states, the manifest entry, and the
   stories/tests.
4. **Review** — the registry drift check and tests run automatically. A new variant/state on an
   existing component (**Light**) can pass on green gates; a new component or a breaking change
   (**Heavy**) is custodian-led.
5. **Release** — ships on `beta`, promotes to `stable`; the registry and downstream artifacts
   regenerate. Log notable decisions in the [decision log](./decision-log.md).

See the [model overview](./overview.md) for sizes and decision rights.
