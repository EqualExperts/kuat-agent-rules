# Install skills in the Figma agent (Figma Design)

The **Figma agent** is the chat sidebar available inside Figma Design files — distinct from
[Figma Make](./figma-make.md) (prompt-to-code) and from the Figma MCP server used by Cursor/Claude
Code. It supports the same **custom skills** mechanism as Make: single Markdown files following the
[Agent Skills specification](https://agentskills.io/specification), invoked with slash commands (e.g.
`/kuat-create`).

Official help: [Custom skills for the Figma agent and Figma Make](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make)

**Key difference from Make:** the Figma agent has **no Guidelines file**. `Guidelines.md` and Make
kits ([figma-make.md](./figma-make.md#step-3--add-brand-rules-separate-from-skills) Options A/C) are
Make-only — there is no equivalent surface for pasting brand rules into a Design file. For the Figma
agent, context comes from three sources only: the custom skill itself, [connectors](#step-3--pair-with-a-connector-for-live-rules)
paired with it in the same prompt, and whatever the target file's own components/variables/styles
already contain. This lines up with how [figma-build-intake](../figma-build-intake/SKILL.md) and
[figma-build-checklist](../create-design/figma-build-checklist.md) already work — live discovery every
session, no persisted registry — so no change is needed there.

---

## Prerequisites

- Figma **paid plan**; **Full seat** to chat with the agent in Figma Design, or a **View/Dev/Collab**
  seat trying it in Drafts
- Edit access to the file you're working in
- A local clone of this repo to run `npm run bundle:skills`

---

## Step 1 — Bundle skills

From this repo's root — the directory containing `package.json` and `skills/scripts/bundle-skills.mjs`
(this clone is `kuat-agent-rules`; `package.json` still names it `kuat-agent-docs`, same repo):

```bash
npm run bundle:skills
```

Upload these files (not the source `skills/kuat-review/`, `skills/kuat-create/` folders — the agent
does not load `scripts/`, `references/`, or `shared/` folders, same restriction as Make):

| File | Skill name (slash command) |
|------|----------------------------|
| `skills/dist/kuat-create/SKILL.md` | `kuat-create` |
| `skills/dist/kuat-review/SKILL.md` | `kuat-review` |

---

## Step 2 — Install: publish to the team, don't rely on per-account import

Skills created in the agent's chat sidebar are **per account** by default, same as Make. But once a
skill exists, it can be **published to a team or organization** — this is the preferred distribution
path for Kuat, not manual export/import per person.

### First-time setup (one person, e.g. a DS team member)

1. Open any Figma Design file you have edit access to, ideally one in the team/org you want to
   publish to.
2. Click in the **prompt box** → **Skills** → **Add skill** → **Import from computer**.
3. Select `skills/dist/kuat-create/SKILL.md`. Review name/description/content → **Add**.
4. Repeat for `skills/dist/kuat-review/SKILL.md`.
5. Open **Skills** → **Manage skills**, select `kuat-create` → **···** → **Publish**. Confirm name and
   description, then **Publish** to the team or the whole organization.
6. Repeat for `kuat-review`.

**Note:** you can only publish to the team the source file belongs to, or to the whole organization —
not to a team the file isn't in. Pick a Kuat-owned file/team as the publishing origin.

### Everyone else

Nothing to do — a published skill appears for every member of that team/org automatically. This
replaces the "export the file, teammates import it manually" flow described in
[figma-make.md](./figma-make.md#share-with-teammates); use that manual flow only as a fallback if
publishing isn't set up yet, or for people outside the org.

### Keeping it current

When the skill's instructions change (e.g. after a rules migration phase lands):

1. Re-bundle: `npm run bundle:skills`.
2. In **Manage skills**, select the skill → **···** → **Manage skill** → **Publish changes**.

Ownership of this publish step sits with the DS team, consistent with the
[Phase 7 contributor-skills](../../docs/migration/phase-7-contributor-skills.md) model — publishing is
a distribution action on a **consumer-facing** skill, not a contributor skill, so it's fine to do from
outside `.claude/skills/`.

---

## Step 3 — Pair with a connector for live rules

Because there's no Guidelines file here, the closest thing to Make's Option B
([figma-make.md](./figma-make.md#option-b--connectors)) is not optional — it's the main lever. Use
[connectors](https://help.figma.com/hc/en-us/articles/35440096186007) (Notion, Google Drive, etc.) so
the agent can pull live design-system context, and reference the connector in the same prompt as the
skill:

```text
Use /kuat-create to build this screen. Follow our design system doc from @Notion [url].
```

If a Notion/Drive mirror of the `reference/` library (at minimum `design.md`, `colours.md`,
`typography.md`) doesn't exist yet, that's the gap to close — without it, Figma-agent sessions in
Design files have no path to current Kuat rules content at all, since they can't run
`ensure-rules.sh` or read a Guidelines file.

---

## Step 4 — Use skills

### Create

```text
/kuat-create Build an EE product settings page with dark nav and semantic tokens.
```

**Pass if:** the agent asks clarifying questions (scenario, audience, deliverable) before generating a
large UI.

### Review

Select the frame or attach a screenshot, then:

```text
/kuat-review Review this screen for EE brand compliance. brand_compliance depth only.
```

**Pass if:** it asks for artifacts/depth/output format before listing violations.

---

## Known issues (from Figma, apply here too)

| Issue | Workaround |
|-------|------------|
| Only the first skill mentioned in a prompt is invoked | One slash command per message — sequence `figma-build-intake` context and `/kuat-create` across turns, not in one prompt |
| No Guidelines file for Design-file agent sessions | Pair the skill with a connector every time (Step 3); don't assume rules persist between sessions without one |
| Rules not in git inside the agent's own context | Keep the connector-mirrored copy current; re-bundle skills after rules changes |
| Non-deterministic output | Re-run, or tighten the connector doc / prompt |
| Single Markdown file per skill, no `scripts/`/`references/` | Always upload `dist/*/SKILL.md`, never source skills |

---

## Not the same as Figma Make or the Figma MCP

| | **Figma agent (Design)** | **Figma Make** | **Figma MCP (Cursor/Claude Code)** |
|--|---------------------------|-----------------|-------------------------------------|
| Purpose | Chat with the agent inside a Design file | Prompt-to-build in Make | Read/write Design, FigJam, Slides files from an external agent |
| Install | Upload `dist/*.SKILL.md` in-app, or use a published team/org skill | Upload `dist/*.SKILL.md` in-app, or use a published team/org skill | MCP server + `figma-use` skill |
| Persistent brand rules | No Guidelines equivalent — connector or nothing | `Guidelines.md`, Make kits | `KUAT_RULES_PATH` + repo `reference/` |
| Kuat skill distribution | Publish to team/org (preferred) or manual export/import | Publish to team/org (preferred) or manual export/import | Filesystem symlink of source `skills/` |

---

## Verify

See [INSTALL.md](../INSTALL.md) tests **D** (create pre-flight) and **B** (review intake). Run them in
a Figma Design file with `/kuat-create` and `/kuat-review`.

---

## Related

- [../INSTALL.md](../INSTALL.md)
- [../dist/README.md](../dist/README.md)
- [figma-make.md](./figma-make.md) — companion guide for Figma Make specifically
- [figma-build-intake](../figma-build-intake/SKILL.md) · [figma-build-checklist](../create-design/figma-build-checklist.md) — live-discovery pattern this guide relies on in the absence of Guidelines
