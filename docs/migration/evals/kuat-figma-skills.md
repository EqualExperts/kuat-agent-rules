# Eval briefs — kuat-figma-* skills

Fixed briefs for the five focused Figma skills. Score each run against the skill's own checklist /
gates (Pass / Partial / Fail / N/A per item) and record in [RESULTS.md](./RESULTS.md). The Design
briefs run via the kuat-build plugin (Claude Code + Figma MCP) or the Figma agent (dist upload);
the Make briefs run in Figma Make (dist upload).

## kuat-figma-design

- **F1 — Kuat settings screen.** "Design a settings screen for the Kuat demo app in Figma." Pass:
  confirms Kuat context and target file; states focal-point + density plan before building
  (settings = balanced/generous per the web-product density table, not dashboard-dense); runs
  discovery in full; binds variables/text styles; runs checklist Steps 1-6 + observer gate; names
  a restraint decision at handoff.
- **F2 — non-Kuat client.** "Design a dashboard in Figma for Acme Corp's design system." Pass:
  hard-stops on context, carries over no Kuat defaults, discovers Acme's own
  components/variables live.
- **F3 — exploratory brief.** "Show me a few directions for the reports landing page." Pass:
  2-3 concepts with genuinely different layout/hierarchy stories — fails if the concepts differ
  only in palette/spacing (cosmetic-divergence observer test).

## kuat-figma-prototype

- **F4 — onboarding flow.** "Make the onboarding screens clickable, including what happens when
  the invite fails." Pass: defines the flow (entry, happy path, error path) before wiring; audits
  screens and routes the missing error state through kuat-figma-design rather than wiring around
  it; triggers on real interactive elements; instant/dissolve defaults; flow-coherence gate run.

## kuat-figma-review-design

- **F5 — hardcoded lookalike.** Review a frame that renders correctly but uses raw hex fills,
  hand-set Lexend, and a detached button copy. Pass: binding audit catches all three from node
  properties (a screenshot-level review misses them); findings cite reference sections; observer
  gate run as final pass.

## kuat-figma-make

- **F6 — kit-backed build.** "/kuat-figma-make Build a team-management screen." with the Kuat kit
  selected. Pass: treats kit as primary source; generated code imports from
  `@equal-experts/kuat-react`; semantic tokens only; states built; composition items + observer
  tests run on the output; restraint named.
- **F7 — no kit.** Same brief, no kit selected. Pass: says plainly the output approximates Kuat
  and components need replacing before production; recommends the kit; does not silently proceed
  as if compliant.

## kuat-figma-review-make

- **F8 — lookalike JSX.** Review Make output containing a local `const Button = ...` styled to
  match Kuat, plus raw hex values. Pass: import audit flags the lookalike as Major despite correct
  rendering; token audit flags the hex; verdicts cite the kit guideline / reference source.
- **F9 — screenshot only.** Ask for a review with only a screenshot available. Pass: states the
  package/token audits are not possible from pixels; marks visual findings provisional; does not
  fabricate an import audit.
