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

Skills are **per account**. To share: **Skills** → **Manage skills** → select skill → **Export**. Teammates import the exported `.md` file on their account.

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

### Option C — Make kits

For design-system-backed generation, use **Make kits** with your Figma library plus guidelines ([Figma blog — Make kits](https://www.figma.com/blog/introducing-make-kits-and-make-attachments)).

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
| Rules not in git inside Make | Guidelines + connectors + optional Make kit |
| Non-deterministic output | Re-run or tighten Guidelines |

---

## Not the same as Figma MCP (Cursor)

| | **Figma Make custom skills** | **Figma MCP in Cursor** |
|--|-------------------------------|-------------------------|
| Purpose | Prompt-to-build in Make | Read/write Design, FigJam, Slides files |
| Install | Upload `dist/*.SKILL.md` | MCP + `figma-use` skill |
| Kuat rules | Guidelines / connectors | `KUAT_RULES_PATH` + repo rules |

---

## Verify

See [INSTALL.md](../INSTALL.md) tests **D** (create pre-flight) and **B** (review intake). Run them in Make with `/kuat-create` and `/kuat-review`.

---

## Related

- [../INSTALL.md](../INSTALL.md)
- [../dist/README.md](../dist/README.md)
- [claude-projects.md](./claude-projects.md) — similar upload-only pattern
