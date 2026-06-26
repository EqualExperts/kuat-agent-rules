# Kuat Pattern Model (draft)

How patterns are framed, documented, related across media, and consumed — and how they relate to coded **Blocks**.

**Inspiration:** [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) (outcome framing — *Ask users for…*, *Help users to…*, *Pages*) and [Octopus — *Proposing a UI Pattern*](https://www.octopus.design/latest/contribute/proposing-a-ui-pattern-v2R5Cf9E-v2R5Cf9E) (pattern anatomy; pattern-vs-component). Plus Ed's two principles: Blocks are **decoupled** coded implementations, and patterns are **shared across media** with medium-specific implementations.

> **Draft for Ed.** The core proposal is the **concept ↔ implementation split** (§3) — the answer to "how should shared concepts relate?". Open calls flagged **[confirm]**.

---

## 1. What a pattern is

A **pattern** is a best-practice, **outcome-framed** solution to a user-focused problem — named for the *outcome*, not the UI:

- **Ask users for…** — collect something (contact details, a date, a brief).
- **Help users to…** — accomplish a task (sign in, compare options, understand a case study).
- **Pages** — whole page/artefact types (dashboard, confirmation, a deck section).

A pattern *uses components and explains how to adapt them to the context* (GOV.UK); it *guides how components are organised and interact to solve a user goal* (Octopus). Components/Blocks are the building blocks; patterns are the higher-scale guidance.

## 2. Pattern vs component vs Block vs scenario

| | What | Where | Coded? |
|--|------|-------|--------|
| **Pattern** | Outcome-framed guidance to solve a user problem | single-medium → `media-types/<medium>/patterns/`; shared → `reference/patterns/` concept + per-medium implementations | No (guidance) |
| **Component** | A single building block (Button, Input) | kuat-mono | Yes |
| **Block** | A **predefined coded composition** that solves (part of) a pattern | kuat-mono ("Kuat Blocks") | Yes |
| **Scenario** *(retired term)* | What today's `web-product/patterns/` files are | → become pattern *implementations* | — |

**Blocks are decoupled from patterns (Ed):** a pattern *may* have a Block, a pattern may have *no* Block (guidance only), and a Block may exist with *no* pattern (a utility composition). Many-to-some, linked by a registry — never assume 1:1.

## 3. The cross-medium model — concept ↔ implementation *(the core proposal)*

The problem: "describe a case study" is one idea, but a **slide** case study and a **web/marketing** case study are built differently. Patterns nested only under a single medium can't express that without duplication and drift.

**Solution — placement encodes applicable media; factor a shared concept *only* when a pattern is actually shared.** A pattern is "relevant to medium X" iff it has an implementation under X — so a medium's `patterns/` folder contains only its relevant patterns, never bloat.

- **Single-medium pattern** → lives **entirely in that medium** (`media-types/<medium>/patterns/`), concept + implementation in one doc. No top-level entry. (Most patterns start here.)
- **Multi-medium pattern** → **only then** factor the shared **concept** to top-level `reference/patterns/` (medium-agnostic: user goal, when/when-not, principles), with a per-medium **implementation** under each relevant medium that links up to it.

```
reference/patterns/                                  # SHARED concepts only (factored when >1 medium)
  help-users/describe-a-case-study.md                #   concept · → slides + web-marketing implementations (NOT web-product)
reference/media-types/
  slides/patterns/case-study.md                      #   implements describe-a-case-study (slides)
  web-marketing/patterns/case-study.md               #   implements describe-a-case-study (marketing)
  web-product/patterns/
    ask-associates-for-profile.md                    #   SINGLE-medium: concept + impl together; web-product only
    sign-in.md                                        #   (web-product implementation; shared concept only if another medium needs it)
```

So your examples land correctly: **"Ask associates for profile"** lives only in `web-product/patterns/` (slides never sees it); **"Describe a case study"** is a top-level concept with `slides/` + `web-marketing/` implementations and **no** `web-product/` entry.

**Rule:** the shared concept (when one exists) owns the *why* + shared principles, stated once; implementations own the *how in this medium* and link up. **Promotion:** when a single-medium pattern is needed by a second medium, extract its shared concept to top-level and add the new implementation — a small, deliberate refactor, not a default. A generated **pattern index** can still list everything (with applicable media) for discovery without putting irrelevant patterns in any medium's folder.

## 4. Blocks and the pattern↔block registry

- **Blocks** are coded compositions in kuat-mono (the existing "Kuat Blocks" notion — Header, etc.).
- A **pattern↔block registry** (mirroring `component-registry.md`) records which Blocks solve which pattern implementation, and which Blocks are standalone. Web pattern implementations cite Block IDs; Block docs cite the pattern they solve (if any).
- This keeps the decoupling explicit and lets `create-web-app`/engineers answer "is there a coded Block for this, or do I build from guidance?"

## 5. Pattern doc anatomy (Octopus structure)

**Concept doc:** **User goal** (the outcome) → **Context** (when it occurs, why it matters; optional UX laws/heuristics) → **Principles** (medium-agnostic best practice) → **Implementations** (links per medium) → **Related Blocks / components**.

**Implementation doc:** **Implements** *(link to concept)* → **Medium-specific solution** (layout, components/Blocks, content) → **Block(s)** for this (if coded) → **Examples** (mid-fidelity, not screenshots).

## 6. Consumption

- **Activity skills** (`create-web-app`, `create-presentation`, a future `create-web-marketing`) load the **pattern concept** (outcome + principles) **+ the matching medium implementation**, then resolve **Blocks/components** for the build.
- **Engineers** use the **Block** if the registry says one exists; otherwise build from the implementation guidance and flag the gap (same graceful-fallback ethos as components).
- The pattern concept is the cross-medium glue: change the shared principle once, every medium implementation inherits it.

## 7. Lifecycle + contribution

- **Documented → coded lifecycle:** a pattern starts as guidance (concept + implementation); when proven and reused, a web implementation can **graduate to a coded Block**. (Mirrors Octopus's component lifecycle/status.)
- **Contribution model fit:** proposing a *pattern* is a **Medium/Heavy** contribution (custodian-led — it's cross-cutting guidance); proposing a *Block* is a component-class contribution (`add-kuat-component`-style). Add `contribute/proposing-a-pattern.md` (+ `proposing-a-block.md`) to the contribution model, each citing the size, the skill, and the gate.

## 8. Migrating today's web-product patterns

The current `web-product/patterns/{authentication,dashboards,forms,documentation}.md` are page-level scenarios. Re-home each as: a **concept** (outcome-framed) top-level + the existing file as the **web-product implementation** linking it. E.g. `authentication.md` → concept `help-users/sign-in` + impl `web-product/patterns/sign-in.md`. Reuse the new `review-reference-change` gate to keep them passive.

## 9. Decisions (resolved — Ed, 19 Jun 2026)

1. **Structure** — **relevance-scoped** (§3): single-medium patterns live in-medium; a shared concept is factored to top-level *only when >1 medium needs it*; a medium's `patterns/` folder only ever holds its relevant patterns (no bloat). A cross-medium pattern index may be generated for discovery.
2. **First cut** — **build `web-product` fully; create placeholder structure for `slides` + `web-marketing`** (dirs + stubs, ready to populate later). Seed the top-level shared layer with the `describe-a-case-study` **concept** as the worked cross-medium example (its slides + web-marketing *implementations* are stubbed TBD; no web-product implementation).
3. **Blocks** — **later.** First define *how Blocks are created* (a separate piece). For now: no pattern↔block registry, no Block contribution path; pattern docs note that Blocks may link in later.
4. **Contribution tie-in** — **yes:** add `contribute/proposing-a-pattern.md` now. `proposing-a-block` is deferred with Blocks.
