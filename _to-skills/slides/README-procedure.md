# Slides Rules

Guidelines for Equal Experts presentation decks and slides. Use these rules when generating, editing, or reviewing EE-branded presentations.

---

**Status:** Full rule set (replaces placeholder).

**Intent:** Use skill [kuat-review](../../../../skills/kuat-review/SKILL.md) or [kuat-create](../../../../skills/kuat-create/SKILL.md) first.

**Load order:** For task type **slides**, load [foundations](../../foundations/) first, then all core files in `types/slides/`. Add a scenario file when the deck type is known. See [LOADING.md](../../LOADING.md).

**Prerequisites:** Load [foundations](../../foundations/) first (at least brand, logo, design, content). If a foundation rule and a slides rule conflict, the foundation wins — raise the conflict in output rather than silently override.

---

## Before you review

1. **Artifacts** — Deck file, export PDF, screenshots, or Figma link; confirm which slides are in scope.
2. **Review depth** — Per [kuat-review](../../../../skills/kuat-review/SKILL.md): `brand_compliance` (visual/brand only) vs `product_ux`/`full` (also narrative, density, voice fit).
3. **Scenario** — Sales & marketing, knowledge sharing, case study, or reporting ([scenarios/](./scenarios/)).
4. **Audience** — External (masterbrand-strict) vs internal (masterbrand-lite).
5. **Delivery mode** — Live-presented (sparse) vs read-ahead (denser); needed to judge density fairly.
6. **Output format** — Per review workflow (full report, checklist only, etc.).

**Rubric:** [checklist.md](./checklist.md). Run every item you can verify from supplied artifacts.

---

## Before you create

1. **Which scenario?** Sales & marketing, knowledge sharing, case study, or reporting. Each has different content density, formality, and slide budget — see [scenarios/](./scenarios/).
2. **Which audience?** External (client, prospect, conference) → masterbrand-strict. Internal (network, community of practice) → masterbrand-lite, more latitude on tone but same visual rules.
3. **Which delivery mode?** Presented live (sparse text, large type, presenter carries the narrative) vs. sent as a read-ahead (denser, self-contained, each slide stands alone). The same content needs different slides for each mode — ask if unclear.
4. **Which layout per slide?** Pick from the catalogue in [layouts.md](./layouts.md). Do not invent new layouts unless explicitly asked.

---

## Rule files (load in order)

| File | Content |
|------|---------|
| [brand-compliance.md](./brand-compliance.md) | Logo, page-number badge, bracket motif, co-branding |
| [styling.md](./styling.md) | Colour roles, typography, spacing and grid |
| [layouts.md](./layouts.md) | 11 canonical slide layouts |
| [content.md](./content.md) | Density, hierarchy, voice |
| [imagery-and-diagrams.md](./imagery-and-diagrams.md) | Photography placement, diagrams, icons |
| [data.md](./data.md) | Charts, tables, impact metrics |
| [checklist.md](./checklist.md) | Pre-delivery and review checklist |

**Optional — when deck type is known:**

| File | Content |
|------|---------|
| [scenarios/sales-marketing.md](./scenarios/sales-marketing.md) | Pitch and client-facing decks |
| [scenarios/knowledge-sharing.md](./scenarios/knowledge-sharing.md) | Talks, conferences, internal sharing |
| [scenarios/case-studies.md](./scenarios/case-studies.md) | Named client stories |
| [scenarios/reporting.md](./scenarios/reporting.md) | Read-ahead reports and findings |

---

## Quick reference

- **One idea per slide** — title carries the argument, not the topic.
- **B&W photography** on all slides; compositional space for overlays and brackets.
- **11pt minimum** body copy; 10pt minimum captions only on detail-heavy slides.
- **Page-number badge** on body slides — not the EE logo on every slide.
- **5–8 layouts** across a full deck, not one layout per slide.
- **EE Blue** for one accent job per slide (eyebrow OR callout OR chart accent).
- Run [checklist.md](./checklist.md) before delivering.

---

## Related documentation

- [Foundations](../../foundations/) — Brand, design, content, accessibility
- [skills/](../../../../skills/) — Review and create skills
- [LOADING.md](../../LOADING.md) — Optional paths: `types/slides/scenarios/`, `types/photography/`, `types/charts-data/`
