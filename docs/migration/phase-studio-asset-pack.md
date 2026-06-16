# Studio Asset Pack + Skill Rework (gates kuat-studio release)

**Repo / Claude Code project:** `kuat-agent-rules` (skills + reference) — assets sourced from EE
**Branch:** `feat/studio-asset-pack`
**Status:** **Blocks the kuat-studio bundle** (pilot/release). kuat-build proceeds independently.

> **Why this exists.** Phase-4 pilot surfaced a *false pass*: `create-presentation` produced an HTML lookalike with a **hand-drawn `[E]` logo**, and `review-presentation` passed it as on-brand (it even pixel-sampled the badge colour). Root cause: the reference is **markdown-only — it ships no genuine brand assets**, so the skills can only *approximate* and the review can only check *plausibility*. Web doesn't have this problem because it has a real **component library** (kuat-mono). **Studio is missing its equivalent.** This plan builds it.

Decisions (Ed): **bundle an official asset pack**; **create-presentation builds from the EE master template**.

---

## Precondition — RESOLVED (16 Jun 2026)

- **Master template provided:** "2026 EE branded master slides" — Google Slides (canonical) + PPTX export (bundleable). **Format decided: Google Slides master; PPTX is the asset-pack/source form.**
- **Genuine assets located:** the PPTX contains 65 layouts, 1 master, and 337 media files (logo, ~80-icon library, photography) — the source for the pack.
- **Brand guidelines = the `reference/design-language/` docs** (Ed) — there's no separate doc; those docs are the single source of truth all skills read. So "reconcile" = make those docs correct (see colour conflict below).
- **No image library exists yet.** The pack ships logo + icon library + master template/layouts + tokens, but **no photography**. Until a library exists, `create-presentation` uses clearly-marked placeholders that **block release**, and `review-presentation` treats placeholder imagery as a blocker. "Build the EE image library" is a separate future asset-pack addition.

### Finding from the master: the reference diverges from the brand

Inspecting the master vs `reference/design-language/`:

- **Colour is wrong.** Reference says EE Blue `#0066CC`; the master actually uses `#2095D3` (bright/"tech" blue) and `~#22567C` / `#1A547E` (dark/"principal" blue). `#0066CC` is absent. The studio deck used `#0066CC` (per the reference) and the review "passed" it against that same wrong value.
- **Font is right** — reference correctly says Lexend (the master mixes in Arial as a fallback; Lexend is canonical).

→ **The master template is the source of truth; the reference must be reconciled to it.** This is a second root cause of the false pass, alongside the missing assets.

---

## Deliverables

> **Prototype validated (16 Jun, accepted for this phase).** `build_from_master.py` (clone master → strip example slides → add from real layouts → fill placeholders, set Lexend) produces a deck that inherits genuine EE blue, the real layouts + left bracket + logo, and Lexend. Ed accepted the layout fidelity for this phase; **layout refinement is deferred to a future phase.** This section is now production-isation of that proven mechanism.

### 1. The studio asset pack (the missing source-of-truth)

A bundled, versioned set of genuine assets — the slides/imagery equivalent of web's component library:

- **Logo assets** — every approved lockup + brand-mark variant, as the canonical files (SVG/PNG). These are what skills *insert* and reviews *compare against*.
- **Master slide template** — PPTX, prepared from the genuine master via a **template-prep pass**: (a) **slim** it — strip the example slides + unused media (the raw export is ~52MB); (b) fix the **theme font Arial → Lexend**; (c) **embed Lexend** (and Lora/JetBrains Mono) so decks render correctly on any machine. Becomes `assets/slides/ee-master-2026.pptx`.
- **Photography** — the approved library, or a manifest pointing to it (mind plugin size; curate or reference rather than bundling everything).
- **`assets.manifest.json`** — maps logical IDs → asset files (mirrors `components.manifest.json`), so skills resolve assets by ID and reviews resolve the canonical to compare.
- **Packaging** — `build-plugin.mjs` includes `assets/` + manifest in the `kuat-studio` payload. Keep `kuat-build` unaffected (no asset pack). Watch payload size; verifier extended to check asset references resolve.

### 2. `create-presentation` rework

- **Build from the master template** in the confirmed format — not bespoke HTML. Crucially, **inherit the master's actual layouts**, don't re-describe-then-regenerate them. The brand signature lives in the layout structure — above all the **left-side "[" bracket** (a full-height tech-blue `#2095D3` element on the left edge, confirmed in the master layouts) — and a prose description can't reproduce it faithfully (the Phase-4 deck proved this). Starting from the master layouts makes the bracket, grid, and masters come for free.
- **Insert the official logo asset; NEVER recreate or redraw it.** If the asset can't be resolved, **stop and flag** — do not fabricate a mark.
- Use approved imagery from the pack; any placeholder must be **explicitly marked and block release**.
- Intake confirms output format/tool and that the template + assets are available.

### 3. `review-presentation` rework (ground truth + skepticism)

- **Authenticity auto-fails:** logo is the official asset, not a recreation (compare against the canonical) → recreation = **brand FAIL** regardless of colour/placement; deck is built on the EE master template, not an approximation.
- Encode the principle: **visual plausibility ≠ brand compliance.** Passing the described rules is necessary, not sufficient.
- Keep the visual pass (render + pixel-sample — it works) and add the authenticity comparison against bundled assets. When no ground-truth asset is available, **flag "authenticity unverified," don't pass.**

### 4. Reconcile the reference to the master (source-of-truth correction)

The master is authoritative; the reference was written from memory. Correct it:

- **Colours — a design-tokens file upstream in agent-rules is the SoT** (Ed). There is no upstream token source today (kuat-core `variables.css` is hand-maintained *downstream*, and the `raw-colors.json`/`ee-light.json` it cites don't exist in-repo). Build it:
  - Create a canonical **tokens file in `kuat-agent-rules`** (structured JSON — W3C design-tokens or the oklch+hex shape), seeded with the genuine kuat-core values (EE Blue `#1795d4`, Tech Blue `#22567c`, Transform Teal `#269c9e`, Equal Ember `#f07c00` + aliases).
  - **Generate** `colours.md` (human-readable) and **kuat-core `variables.css`** (downstream consumes upstream via the 1b sync pipeline) from it. The interim hand-fix to `colours.md` (commit `4dea12b`) is superseded once generation exists.
  - **CI drift check** fails if any generated artifact diverges from the tokens (would have caught `#0066CC`).
- **Bracket / layout description is also wrong.** The reference describes the bracket as *top-left + bottom-right corner framing*; the master uses a **left-side "[" bracket** (`#2095D3`, left edge). Reconcile the slides layout/bracket guidance to the master — though the durable fix is create *inheriting* the master layouts (above), not relying on prose.
- **Audit the rest** of `design-language/` + slides layout reference (spacing, type sizes, radii, layout structure) against the master and guidelines — assume other values drift, since colour and bracket both did.

### 5. `create-imagery` — same disease

Apply "use genuine assets, never recreate" + asset-pack consumption (it almost certainly has the same logo-recreation risk). In scope here or an immediate follow-up.

---

## Tasks

1. Resolve the precondition (assets located, template format chosen). Branch + log.
2. Assemble the asset pack + `assets.manifest.json`; wire into `build-plugin.mjs` for `kuat-studio` only.
3. Rework `create-presentation` (template-based output + genuine-logo insertion + stop-on-missing-asset).
4. Rework `review-presentation` (authenticity auto-fails + plausibility-≠-compliance + unverified-flag).
5. Apply the same to `create-imagery`.
6. Rebuild `kuat-studio`; extend `verify-plugins.mjs` to check asset references resolve.
7. **Evals:** a brief that produces a deck (must use the genuine logo/template), and a *negative* brief — feed a deck with a recreated `[E]` logo and confirm `review-presentation` now **FAILS** it. This regression is the proof the false pass is fixed.

---

## Acceptance criteria

- `kuat-studio` payload bundles the asset pack + manifest; references resolve; verifier green.
- `create-presentation` produces a master-template deck with the **official** logo inserted; refuses (flags) when an asset is missing rather than recreating.
- `review-presentation` **fails** a deck with a recreated logo or non-template layout; flags "authenticity unverified" when ground truth is absent.
- Re-run the original failing pilot deck through the reworked review → it is **no longer a false pass**.
- Human spot-check (the Phase-4 reviewer) agrees the output is genuinely on-brand.

---

## Report back

Fill `docs/migration/report-studio-asset-pack.md`. Capture: asset sourcing + template-format decision; pack contents + manifest; the create/review reworks; eval results incl. the negative (recreated-logo) test; confirmation the original false-pass deck now fails review; and a go/no-go for the kuat-studio pilot.
