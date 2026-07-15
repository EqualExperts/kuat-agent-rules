# Install skills in Figma Make

[Figma Make](https://www.figma.com/make/) supports **custom skills** — single Markdown files that follow the [Agent Skills specification](https://agentskills.io/specification). Invoke them with slash commands (e.g. `/kuat-create`).

**Important:** Make accepts **one `.md` file per skill** only. It does not load `scripts/`, `references/`, or `shared/` folders. Use **bundled** skills from `skills/dist/`.

Official help: [Custom skills for Figma Make](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-Figma-Make)

---

## Prerequisites

- Figma **paid plan** with edit access to Make files
- Custom skills supported on the **default** model and **Claude Opus 4.7** in Make
- A local clone of this repo to run `npm run bundle:skills`

---

## Step 1 — Bundle skills

From the `kuat-agent-docs` repo root:

```bash
npm run bundle:skills
```

Upload these files (not the source `skills/kuat-review/` folders):

| File | Skill name (slash command) |
|------|----------------------------|
| `skills/dist/kuat-create/SKILL.md` | `kuat-create` |
| `skills/dist/kuat-review/SKILL.md` | `kuat-review` |

---

## Step 2 — Import into Figma Make

Repeat for each skill file:

1. Open a **Figma Make** file.
2. Click in the **prompt box**.
3. Select **Skills** → **Create skill**.
4. Click **Import from computer** (or drag the file).
5. Select `skills/dist/kuat-create/SKILL.md` (or `kuat-review`).
6. Review **name**, **description**, and content (from YAML frontmatter).
7. Click **Create**.

Skills are available **across all your Make files** on your account.

### Share with teammates

Skills are created **per account**, but a skill can be **published to a team or organization**:
**Skills** → **Manage skills** → select skill → **···** → **Publish** (target the team the source
file belongs to, or the whole org). Published skills appear for every member automatically, and
**Publish changes** pushes later edits — this is preferred over per-person export/import. Use manual
export/import (**Manage skills** → select skill → **Export**; teammates import the file) only as a
fallback, e.g. for people outside the org. See [figma-agent.md](./figma-agent.md#step-2--install-publish-to-the-team-dont-rely-on-per-account-import)
for the full publish walkthrough — the same mechanism applies to skills created here in Make.

---

## Step 3 — Add brand rules (separate from skills)

Make does **not** read `KUAT_RULES_PATH` or run `ensure-rules.sh`. Standards come from:

### Option A — Guidelines.md (recommended baseline)

In Figma Make, open **Guidelines** and add EE brand rules. Minimum content to paste or adapt:

- Link or summary from `reference/README.md`
- `reference/design-language/colours.md` — tokens, EE Blue, semantic names
- `reference/design-language/typography.md` — Lexend, scale
- Task-specific: e.g. `reference/media-types/web-product/design.md` for product UI

See [Add guidelines to Figma Make](https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make).

### Option B — Connectors

Use [connectors](https://help.figma.com/hc/en-us/articles/35440096186007) (Notion, Google Drive, etc.) so Make can pull live docs. Reference connectors in the same prompt as a skill:

```text
Use /kuat-create to build this screen. Follow our design system doc from @Notion [url].
```

### Option C — Make kits (preferred for design-system-backed generation)

**Make kits** let Make start from the real `@equal-experts/kuat-react`/`kuat-vue` npm packages and/or
the Kuat2 Figma library's variables and styles, instead of approximating Kuat from prose. This is a
stronger mechanism than Guidelines/connectors alone — Make begins with actual Kuat components rather
than look-alikes that need cleanup. Reference: [Get started with Make
kits](https://help.figma.com/hc/en-us/articles/39241689698839), [Write design system guidelines for
Make kits](https://developers.figma.com/docs/code/write-design-system-guidelines/).

**Guideline content is staged and ready to use**: [install/make-kit-guidelines/](./make-kit-guidelines/)
has drafted `Guidelines.md`, `setup.md`, `tokens.md`, and `components/overview.md`, sourced from the
real `kuat-react` package and `reference/` docs — copy them into the kit's `guidelines/` folder when
assembling it (Make file → Settings → Create a kit → Assemble). That folder's README also lists open
questions (primitive import path, undocumented components) to resolve before publishing the kit to
the org.

Once published (Settings → Publish Make kit → team or organization), select it from **Select a Make
kit** in the prompter — no more per-session Guidelines setup needed.

---

## Step 4 — Use skills

### Create (primary)

```text
/kuat-create Build an EE product settings page with dark nav and semantic tokens.
```

Or: **Skills** → **Use skills** → select `kuat-create` → **Send**.

**Pass if:** Make asks clarifying questions (scenario, audience, deliverable) before generating a large UI.

### Review

Attach a screenshot or describe the current Make output, then:

```text
/kuat-review Review this screen for EE brand compliance. brand_compliance depth only.
```

**Pass if:** It asks for artifacts/depth/output format before listing violations.

---

## Limitations

| Limitation | Workaround |
|------------|------------|
| Single file per skill | Always upload `dist/*.SKILL.md`, never source skills |
| No `ensure-rules.sh` in Make | Run script locally; paste `RULES_REF` into Guidelines or prompt when rules change |
| Only first skill in a multi-skill prompt runs | Use one slash command per message |
| Custom skills: default + Claude Opus 4.7 only | Switch model in Make settings |
| Switching models mid-session blocks skill invocation in the very next prompt | Wait one extra prompt after a model switch before invoking a skill again |
| Rules not in git inside Make | Guidelines + connectors + optional Make kit |
| Non-deterministic output | Re-run or tighten Guidelines |

---

## Not the same as the Figma agent or Figma MCP (Cursor)

| | **Figma Make custom skills** | **Figma agent (Design)** | **Figma MCP in Cursor** |
|--|-------------------------------|---------------------------|-------------------------|
| Purpose | Prompt-to-build in Make | Chat with the agent inside a Design file | Read/write Design, FigJam, Slides files |
| Install | Upload `dist/*.SKILL.md`, or use a published team/org skill | Upload `dist/*.SKILL.md`, or use a published team/org skill | MCP + `figma-use` skill |
| Kuat rules | Guidelines / connectors / Make kits | No Guidelines equivalent — connector or nothing (see [figma-agent.md](./figma-agent.md)) | `KUAT_RULES_PATH` + repo rules |

See [figma-agent.md](./figma-agent.md) for the Design-file agent install guide — same skill bundles,
different rules mechanism.

---

## Verify

See [INSTALL.md](../INSTALL.md) tests **D** (create pre-flight) and **B** (review intake). Run them in Make with `/kuat-create` and `/kuat-review`.

---

## Related

- [../INSTALL.md](../INSTALL.md)
- [../dist/README.md](../dist/README.md)
- [claude-projects.md](./claude-projects.md) — similar upload-only pattern
- [figma-agent.md](./figma-agent.md) — companion guide for the Figma agent in Design files
