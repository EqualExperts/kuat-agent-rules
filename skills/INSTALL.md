# Kuat brand skills — installation and testing guide

This guide is for **humans** setting up `kuat-review` and `kuat-create` in an AI tool. It explains what to install, how the pieces fit together, and how to verify everything works.

---

## What you are installing

Two things work together:

| Piece | What it is | Where it lives |
|-------|------------|----------------|
| **Rules** | Brand and design **standards** (colours, slides layouts, web product patterns) | the `reference/` library in [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs) |
| **Skills** | **How the agent runs a session** (ask for context first, review depth, report format, which rules to load) | `skills/kuat-review`, `skills/kuat-create` |

The skills do **not** replace the rules. They tell the agent to load rules fresh and follow a consistent review or create workflow.

```text
You → AI tool (skill) → loads rules → produces review report or new content
```

### Two skill variants

| Skill | Use when you want to… |
|-------|----------------------|
| **kuat-review** | Audit existing slides, UI, copy, or imagery for EE brand and (optionally) product fit |
| **kuat-create** | Generate new EE-branded decks, screens, or copy following the rules |

---

## Choose your install path

| Your tool | Install approach | Guide section |
|-----------|------------------|---------------|
| **Cursor** | Symlink source skill folders | [Cursor](#cursor) |
| **Claude Code** | `CLAUDE.md` + repo path, or symlink | [Claude Code](#claude-code) |
| **Claude Projects** | Upload **bundled** `dist/*.SKILL.md` + rules files | [Claude Projects](#claude-projects) |
| **Codex** | Symlink source or `dist/` | [Codex](#codex) |
| **Figma Make** | Upload bundled `dist/*.SKILL.md` as custom skills; rules via Guidelines / connectors | [Figma Make](#figma-make) |
| **Other / API** | Upload `skills/dist/kuat-review/SKILL.md` or `kuat-create/SKILL.md` | [Upload-only tools](#upload-only-tools) |

**Rule of thumb**

- **Filesystem access** to the repo → install **source** skills (`skills/kuat-review/`).
- **Upload-only** (no folders) → install **bundled** skills (`skills/dist/kuat-review/SKILL.md`).

---

## Prerequisites

1. **Git** — to clone the rules repository.
2. **A clone of this repo** (or a submodule in your project, e.g. `kuat-mono`):

   ```bash
   git clone https://github.com/equalexperts/kuat-agent-docs.git
   cd kuat-agent-docs
   ```

3. **Node.js** (optional) — only needed if you will regenerate bundles (`npm run bundle:skills`). Not required for normal use.

---

## Entry by context

| Context | Rules entry | Skills |
|---------|-------------|--------|
| **Org / all platforms** | Clone `kuat-agent-docs` → `reference/` | Symlink `skills/` from clone |
| **Library (`kuat-mono`)** | `.kuat-rules-path` → agent-docs clone; `KUAT_RULES_OVERLAY_PATH` → mono `kuat-docs/` | Symlink skills from agent-docs clone |
| **App (npm only)** | `node_modules/@equal-experts/kuat-react/agent-docs/AGENTS.md` after install | Symlink skills; `ensure-rules.sh` → `RULES_SOURCE=package` |

Architecture: [kuat-docs/setup/consumption-architecture.md](../kuat-docs/setup/consumption-architecture.md).

---

## Step 1 — Verify rules resolve

From the repo root (or any machine where skills will run):

```bash
./skills/scripts/ensure-rules.sh
```

**You should see** output like:

```text
RULES_ROOT=/path/to/kuat-agent-docs
RULES_DIR=/path/to/kuat-agent-docs/reference
RULES_REF=abc1234...
```

**If it fails**

- Set an explicit path: `export KUAT_RULES_PATH=/absolute/path/to/kuat-agent-docs` and run again.
- In a **consumer repo** (not the rules repo itself), create `.kuat-rules-path` in the project root with one line: the absolute path to `kuat-agent-docs`.

**Keep rules up to date** before important reviews:

```bash
KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh
```

---

## Step 2 — Install skills in your tool

### Cursor

1. Symlink both skills (personal = all projects):

   ```bash
   ln -sf "$(pwd)/skills/kuat-review" ~/.cursor/skills/kuat-review
   ln -sf "$(pwd)/skills/kuat-create" ~/.cursor/skills/kuat-create
   ```

   For **project-only** install, use `.cursor/skills/` inside your project instead of `~/.cursor/skills/`.

2. Optional: add to the project `.cursorrules`:

   ```markdown
   For EE brand review use skill kuat-review; for create use kuat-create.
   Run skills/scripts/ensure-rules.sh or set KUAT_RULES_PATH to the kuat-agent-docs clone.
   ```

3. Restart Cursor or start a **new agent chat** so skills are picked up.

More detail: [install/cursor.md](./install/cursor.md)

### Claude Code

1. Ensure the rules repo is on disk and `ensure-rules.sh` works (Step 1).
2. Add to project `CLAUDE.md`:

   ```markdown
   ## Equal Experts brand

   - Review: follow skills/kuat-review/SKILL.md in the kuat-agent-docs clone
   - Create: follow skills/kuat-create/SKILL.md
   - Run: KUAT_RULES_PATH=/path/to/kuat-agent-docs ./skills/scripts/ensure-rules.sh before brand work
   ```

3. Or symlink skills if your setup supports `.claude/skills/`.

More detail: [install/claude-code.md](./install/claude-code.md)

### Claude Projects

Claude Projects cannot read `../shared/` from a folder tree. Use **bundled** skills.

1. Regenerate bundles (if `dist/` is missing or you changed source skills):

   ```bash
   npm run bundle:skills
   ```

2. In your Claude Project, **upload to Project knowledge**:

   | File | Required |
   |------|----------|
   | `skills/dist/kuat-review/SKILL.md` | For review work |
   | `skills/dist/kuat-create/SKILL.md` | For create work |
   | `reference/README.md` | Yes — reference index |
   | Relevant `reference/...` files | At least foundations + your task type (e.g. `media-types/slides/`) |
   | `skills/dist/manifest.json` | Optional — records which rules version the bundle was built against |

3. Add **Project instructions**:

   ```text
   For brand review, follow the uploaded kuat-review skill document.
   For create work, follow the uploaded kuat-create skill document.
   Load rules from the uploaded reference/ library starting with README.md (loading is per-skill).
   On web feature reviews, ask for user story and research before UX findings.
   ```

4. Run `ensure-rules.sh` locally and paste `RULES_REF` into instructions when you update rules.

More detail: [install/claude-projects.md](./install/claude-projects.md)

### Codex

```bash
ln -sf /path/to/kuat-agent-docs/skills/kuat-review ~/.codex/skills/kuat-review
ln -sf /path/to/kuat-agent-docs/skills/kuat-create ~/.codex/skills/kuat-create
export KUAT_RULES_PATH=/path/to/kuat-agent-docs
```

The legacy `agent-rules-design-review` Codex skill delegates to `kuat-review`.

More detail: [install/codex.md](./install/codex.md)

### Figma Make

Figma Make only accepts **one Markdown file per custom skill** (no `shared/` or `scripts/` folders). Use **bundled** skills.

1. Regenerate bundles:

   ```bash
   npm run bundle:skills
   ```

2. In Figma Make: prompt box → **Skills** → **Create skill** → **Import from computer**:
   - `skills/dist/kuat-create/SKILL.md` (primary — building UI in Make)
   - `skills/dist/kuat-review/SKILL.md` (optional — auditing output)

3. Add brand **standards** via Make **Guidelines.md** and/or [connectors](https://help.figma.com/hc/en-us/articles/35440096186007) — rules are not loaded from a local repo path.

4. Invoke with slash commands, e.g. `/kuat-create` or `/kuat-review`.

**Limits:** Custom skills work on the default model and Claude Opus 4.7 only; only the first skill mentioned in a prompt is used; share skills by export/import per teammate.

More detail: [install/figma-make.md](./install/figma-make.md)

### Upload-only tools

Applies to **Claude Projects**, **Figma Make**, and any tool that accepts a single skill file (no `shared/` folder).

1. Run `npm run bundle:skills` in the repo.
2. Upload **`skills/dist/kuat-review/SKILL.md`** and/or **`skills/dist/kuat-create/SKILL.md`** — each file is self-contained (shared content is inlined).
3. Provide rules separately (upload a `reference/` subset, project knowledge, Make **Guidelines**, or connectors).
4. Tell the tool: *“Follow the kuat-review skill; rules are in the reference/ library (start at README.md).”* In Figma Make, use `/kuat-review` or `/kuat-create` slash commands.

---

## Step 3 — Test that it works

Use a **new chat** after installing. Old chats may not load new skills.

### Test A — Rules are reachable

**Prompt:**

```text
Run the kuat ensure-rules script or tell me RULES_DIR and RULES_REF for this repo.
```

**Pass if:** The agent reports a valid `RULES_DIR` ending in `reference` and a git SHA (or explains how to set `KUAT_RULES_PATH`).

---

### Test B — Review skill asks before judging

**Prompt:**

```text
Review this slide deck for brand compliance.
```

(Attach a sample deck, screenshots, or say “no file yet — walk through intake only”.)

**Pass if** the agent asks in **one grouped message** for some of:

- Artifacts in scope  
- Review depth (`brand_compliance` vs `product_ux` / `full`)  
- Output format (full report, checklist only, etc.)  
- For slides: scenario, audience, live vs read-ahead  

**Fail if:** It immediately lists violations without asking, or invents a user story without you providing one.

---

### Test C — Web feature review asks for product context

**Prompt:**

```text
Review this checkout feature for EE brand and UX.
```

**Pass if:** It asks for **user story** and **research/insights** (or accepts explicit “brand only”) before detailed UX findings.

**Fail if:** It states what “users want” without evidence you supplied.

---

### Test D — Create skill pre-flight

**Prompt:**

```text
Create a slide deck for a client pitch.
```

**Pass if:** It asks about **scenario**, **audience**, and **delivery mode** (live vs read-ahead) before generating slides.

**Fail if:** It produces a full deck without any clarifying questions.

---

### Test E — Brand token sanity check

**Prompt:**

```text
What is the primary EE brand colour and which semantic token should I use in product UI?
```

**Pass if:** EE Blue / `#0066CC` (or oklch equivalent) and `bg-primary` or `--primary` from rules — not a guessed purple or generic blue.

---

### Test checklist (quick)

| # | Test | Pass? |
|---|------|-------|
| A | `ensure-rules.sh` / RULES_DIR | ☐ |
| B | Review intake before findings | ☐ |
| C | Web review asks story/research | ☐ |
| D | Create asks scenario/audience | ☐ |
| E | Primary colour from rules | ☐ |

More tests (web product, tokens, components): [kuat-docs/setup/verification.md](../kuat-docs/setup/verification.md)

---

## Working from kuat-mono (library contributors)

1. Clone or submodule **kuat-agent-docs** (e.g. `external/kuat-agent-docs`).
2. `.kuat-rules-path` in mono root → absolute path to that clone.
3. `export KUAT_RULES_OVERLAY_PATH=/path/to/kuat-mono/kuat-docs`
4. Symlink skills from the agent-docs clone (see [Cursor](#cursor)).
5. Run [kuat-mono implementation plan](../kuat-docs/setup/kuat-mono-implementation-plan.md) on branch `feat/multi-entry-rules-architecture`.

Load order: upstream git first, overlay second — [consumption-contract.md](./shared/consumption-contract.md).

## Working from an application (npm consumers)

1. `pnpm add @equal-experts/kuat-core @equal-experts/kuat-react` (no agent-docs git clone required once packages ship `agent-docs/`).
2. Symlink `kuat-review` / `kuat-create` from a local `kuat-agent-docs` clone (skills are not in the npm package).
3. Point `.cursorrules` at `node_modules/@equal-experts/kuat-react/agent-docs/AGENTS.md`.
4. Run `./skills/scripts/ensure-rules.sh` — expect `RULES_SOURCE=package`.

Override bundled rules: `KUAT_RULES_PATH=/path/to/kuat-agent-docs` for latest upstream or non-web tasks.

---

## Updating skills or rules

| Change | What to do |
|--------|------------|
| **Rules updated** (pull on `kuat-agent-docs`) | `KUAT_RULES_UPDATE=1 ./skills/scripts/ensure-rules.sh` |
| **Source skills edited** | Reinstall not needed for symlinks; restart chat |
| **Upload tools** (Claude Projects, Figma Make) | `npm run bundle:skills`, re-import `dist/*.SKILL.md`, refresh Guidelines / project knowledge |
| **Check bundle vs rules version** | Compare `RULES_REF` from script to `skills/dist/manifest.json` → `rules.builtAtRef` |

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Agent ignores intake | Skill not loaded; old chat | New chat; confirm symlink or upload; mention `kuat-review` in prompt |
| “Cannot resolve reference/ library” | Rules path not set | `KUAT_RULES_PATH` or `.kuat-rules-path`; run `ensure-rules.sh` |
| Broken shared links in Claude / Make | Uploaded source skill, not `dist/` | Upload `skills/dist/kuat-review/SKILL.md` instead |
| Make ignores brand rules | Only skill uploaded, no Guidelines | Add `reference/` excerpts to Make Guidelines or use connectors |
| `/kuat-review` not found | Skill not imported or wrong name | Re-import `dist/kuat-review/SKILL.md`; check skill name in Manage skills |
| Stale brand guidance | Agent using memory | Ask it to read `{RULES_DIR}/design-language/colours.md`; cite `RULES_REF` |
| Two different review styles | Mixed old workflow docs | Use skills only; ignore any old workflow docs |
| `bundle:skills` fails | Wrong directory | Run from repo root; need Node for `npm run` |

---

## What to read next

| Document | Audience |
|----------|----------|
| [README.md](./README.md) | Overview and env vars |
| [AGENTS.md](./AGENTS.md) | Short pointer for agents |
| [install/](./install/) | Per-tool detail |
| [kuat-docs/setup/integration.md](../kuat-docs/setup/integration.md) | Snippet for `.cursorrules` / `CLAUDE.md` |
| [reference library](../reference/README.md) | Compliance standards (the WHAT) |

---

## Feedback

If a test passes in Cursor but fails in Claude Projects or Figma Make, note whether you used **source** vs **`dist/`** bundles and whether **rules** were in Guidelines/connectors — upload-only tools need both bundled skills and separate standards.
