---
name: Agent rules architecture optimisation
overview: "A plan to optimise the Equal Experts agent rules repository for high-performing agent use: structure, content, loading strategy, and discoverability, with explicit alignment to the meta guide once accessible."
todos: []
isProject: false
---

# Agent Rules Architecture and Content Optimisation Plan

## Meta guide note

The file [kuat-docs/.tmp/agent-rules-meta-guide.md](kuat-docs/.tmp/agent-rules-meta-guide.md) could not be read (path not found; `.tmp` may be ignored or untracked). **Recommendation:** Move the meta guide into the repo (e.g. `kuat-docs/docs/agent-rules-meta-guide.md`) or paste its main recommendations into this plan so implementation can follow them. The plan below is based on the current rules tree, [AGENTS.md](AGENTS.md), [setup/integration.md](kuat-docs/setup/integration.md), and agent-rule best practices.

---

## 1. Current state summary

- **Structure:** `rules/general/` (universal) + `rules/types/` (platform-specific). Platform isolation and “load general first” are documented. Scenarios and framework examples sit under web/product.
- **Discovery:** [AGENTS.md](AGENTS.md) defines load order and task → path mapping; [rules/README.md](kuat-docs/rules/README.md) and [setup/integration.md](kuat-docs/setup/integration.md) repeat similar tables. No single machine- or human-friendly “task → files” index.
- **Sizes:** Several rule files are long (e.g. general `accessibility.md` ~~425 lines, product `accessibility.md` ~381, `technical.md` ~458). Create-rule style guidance favours shorter, focused rules (~~50 lines per concern; cap ~500).
- **Placeholders:** [types/slides/README.md](kuat-docs/rules/types/slides/README.md), [types/photography/README.md](kuat-docs/rules/types/photography/README.md), and [types/charts-data/README.md](kuat-docs/rules/types/charts-data/README.md) contain “To Be Defined” and minimal content. Agents may still load them.
- **Examples:** [examples/](kuat-docs/rules/types/web/product/examples/) correctly point to general rules and add code-only content; overlap is minimal.

---

## 2. Architecture optimisations

### 2.1 Single source of truth for “task → rules” loading

- **Add a canonical loading index** (e.g. [kuat-docs/rules/LOADING.md](kuat-docs/rules/LOADING.md) or a small JSON/YAML next to rules) that defines:
  - Task type (e.g. `slides`, `web_product`, `web_marketing`, `icons`, `charts`, `photography`).
  - Required general files (or “all general”).
  - Required type-specific paths/files.
  - Optional paths (e.g. scenarios, framework examples) and when to include them.
- **Reference this index from:** [AGENTS.md](AGENTS.md), [rules/README.md](kuat-docs/rules/README.md), and [setup/integration.md](kuat-docs/setup/integration.md) so all three stay in sync by pointing at one place (or by generating tables from the index).

### 2.2 Optional rule metadata for agents

- Consider adding minimal frontmatter (or a companion manifest) to key rule files: `scope` (general | type), `platform` (e.g. web_product, slides), `prerequisites` (e.g. general/accessibility). This supports:
  - Filtering by task without parsing full content.
  - Clear prerequisite chains (already stated in prose in e.g. [component-decision-tree.md](kuat-docs/rules/types/web/product/component-decision-tree.md) and product [accessibility.md](kuat-docs/rules/types/web/product/accessibility.md)).
- Keep metadata small so it does not duplicate the loading index.

### 2.3 Keep platform isolation and layering

- Preserve “general first, then type-specific” and “types do not reference each other”. No change to the isolation model; only make the loading paths and prerequisites more explicit and centralised.

---

## 3. Content optimisations

### 3.1 Long rule files: split or add quick-reference tops

- **Option A (preferred where logical):** Split very long documents into focused sub-documents (one concern per file), e.g.:
  - [general/accessibility.md](kuat-docs/rules/general/accessibility.md): e.g. “principles + POUR” vs “visual” vs “content/motion” vs “testing” (with a short parent accessibility README that lists them and load order).
  - [types/web/product/technical.md](kuat-docs/rules/types/web/product/technical.md): e.g. setup vs theming vs components vs tokens (with a short technical README).
- **Option B:** Keep single file but add a **short “Quick reference” (bullet/summary) at the top** (e.g. first 30–50 lines) so agents with limited context can still get key constraints; full detail follows.
- **Target:** No single rule file > ~500 lines; aim for ~50–150 lines per focused file where splitting is done.

### 3.2 Placeholder types (slides, photography, charts-data)

- **Decide policy:** Either (1) “expand with real guidance” or (2) “explicitly optional/skeleton.”
- **If skeleton:** Add a clear **Status** (e.g. “Placeholder – load only when task is slides/charts/photography; prefer general rules otherwise”) and a one-line “Load these general files only: …” so agents do not over-load. Remove or shorten “To Be Defined” lists to avoid noise.
- **If expand:** Prioritise by use case (e.g. slides if used often) and add minimal but actionable rules (like charts-data already has for colour/type/chart types), and link to general rules.

### 3.3 Reduce duplication across READMEs

- [rules/README.md](kuat-docs/rules/README.md), [rules/general/README.md](kuat-docs/rules/general/README.md), [rules/types/README.md](kuat-docs/rules/types/README.md), [AGENTS.md](AGENTS.md), and [setup/integration.md](kuat-docs/setup/integration.md) repeat “load general first”, “platform isolation”, and task tables.
- **Consolidate:** One canonical “structure + load order + task table” (e.g. in LOADING.md + rules/README), and have AGENTS.md and setup/integration.md “include by reference” (link + one short table) so updates happen in one place.

### 3.4 Prerequisites and cross-references

- Ensure every type-specific rule that depends on general (or another file) states **Prerequisites** at the top (as already done in [component-decision-tree.md](kuat-docs/rules/types/web/product/component-decision-tree.md) and product [accessibility.md](kuat-docs/rules/types/web/product/accessibility.md)).
- When splitting long files, add a tiny “Related” section at the top of each new part pointing to sibling sections or parent README.

---

## 4. Discovery and integration

### 4.1 One entry point for agents

- Make [AGENTS.md](AGENTS.md) the single entry point: “For load order and task → files, see `kuat-docs/rules/LOADING.md` (or the canonical index).” Keep AGENTS.md short: purpose, link to index, quick reference snippet, and behaviour guidelines (check docs first, follow patterns, use tokens, ask if unclear).

### 4.2 Setup and verification alignment

- [setup/integration.md](kuat-docs/setup/integration.md): Point to the same loading index; remove duplicate task tables or generate a short table from the index.
- [setup/verification.md](kuat-docs/setup/verification.md): Ensure verification prompts and expected answers map to the actual rule set (e.g. if accessibility is split, ensure tests still reference the right concepts and any new file names).

---

## 5. Implementation order (recommended)


| Phase | Action                                                                                                                            |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Add canonical loading index (LOADING.md or manifest) and link from AGENTS.md, rules/README, setup/integration.                    |
| 2     | Consolidate duplicate task/load tables into the index; trim READMEs and AGENTS.md to reference it.                                |
| 3     | Add quick-reference tops or split the longest rules (general and product accessibility, product technical).                       |
| 4     | Clarify placeholder types (slides, photography, charts-data): either mark as optional/skeleton or expand with minimal guidance.   |
| 5     | Optionally add minimal frontmatter/manifest for key rules; keep prerequisites and “Related” sections consistent.                  |
| 6     | Re-run verification scenarios and adjust [setup/verification.md](kuat-docs/setup/verification.md) if rule paths or names changed. |


---

## 6. Success criteria

- Agents can resolve “task X” → exact list of files to load from one place.
- No single rule file exceeds ~500 lines; long topics are split or have a short top summary.
- Placeholder types do not mislead agents (either minimal and marked optional, or filled with useful content).
- Duplication of load order and task tables is removed; updates happen in the canonical index.
- Verification tests still pass and match the updated rule structure.

---

## 7. Aligning with the meta guide

Once [kuat-docs/.tmp/agent-rules-meta-guide.md](kuat-docs/.tmp/agent-rules-meta-guide.md) is available (e.g. moved to `kuat-docs/docs/agent-rules-meta-guide.md` or content pasted into the repo):

- Map its recommendations to the sections above (e.g. “chunking” → 3.1, “loading” → 2.1, “discovery” → 4).
- Add any meta-guide-specific requirements (e.g. naming, formatting, or tooling) as extra tasks in the implementation order.
- If the meta guide conflicts with this plan, prioritise the meta guide and adjust the plan accordingly.

