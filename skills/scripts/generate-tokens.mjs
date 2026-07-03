#!/usr/bin/env node
/**
 * generate-tokens — emit the human-readable colour reference FROM the token SoT.
 *
 * Source of truth:  reference/design-language/tokens/colors.tokens.json  (W3C design tokens)
 * Generated artifact: reference/design-language/colours.md                (this script owns it)
 *
 * colours.md is a PURE BUILD ARTIFACT — never hand-edit it. Change colours in the
 * token file, then `npm run tokens:generate`. The value-bearing tables (brand -500
 * values, semantic aliases) are derived from the tokens; the surrounding prose lives
 * in the TEMPLATE below (so it is still version-controlled + reviewable, but the doc
 * can never silently drift from the SoT — that is how EE Blue once became #0066CC).
 *
 * The downstream half — @equal-experts/kuat-core src/variables.css — is generated in
 * kuat-mono from the synced tokens (Phase 7 Run B). This script only owns the upstream
 * doc; it never touches kuat-core.
 *
 * Modes:
 *   (default)  write reference/design-language/colours.md
 *   --check    regenerate in memory, diff against the committed file, exit 1 on drift
 *
 * Output is DETERMINISTIC (no timestamps / SHAs in the body) so --check is stable.
 *
 * Usage:  node skills/scripts/generate-tokens.mjs [--check]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const TOKENS_PATH = path.join(REPO_ROOT, "reference/design-language/tokens/colors.tokens.json");
const OUT_PATH = path.join(REPO_ROOT, "reference/design-language/colours.md");

const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, "utf8"));

/** Resolve a token $value (literal hex or a {dotted.reference}) to a literal hex. */
function resolveHex(value, seen = 0) {
  if (seen > 10) throw new Error(`token reference cycle near: ${value}`);
  if (typeof value !== "string") throw new Error(`non-string token value: ${JSON.stringify(value)}`);
  const m = value.match(/^\{(.+)\}$/);
  if (!m) {
    if (!/^#[0-9a-fA-F]{6}$/.test(value)) throw new Error(`not a hex value: ${value}`);
    return value.toLowerCase();
  }
  const node = m[1].split(".").reduce((o, k) => (o == null ? o : o[k]), tokens);
  if (node == null || node.$value === undefined) throw new Error(`unresolved token reference: {${m[1]}}`);
  return resolveHex(node.$value, seen + 1);
}

/** A brand scale's -500 hex + oklch (the canonical brand value). */
function brand500(key) {
  return scaleStep(key, "500");
}

/** Any scale's step hex + oklch. */
function scaleStep(key, step) {
  const node = tokens.color?.[key]?.[String(step)];
  if (!node) throw new Error(`missing color.${key}.${step} in tokens`);
  return { hex: node.$value.toLowerCase(), oklch: node.$extensions?.oklch ?? "" };
}

// --- Presentation config: prose is template; VALUES come from the tokens above. ---

const BRAND = [
  {
    key: "ee-blue", name: "EE Blue", role: "Primary", cssVar: "--ee-blue-500",
    purpose: "Trust, professionalism, technology",
    useFor: ["Primary actions and CTAs", "Brand identity elements", "Key highlights and focus states", "Links and interactive elements"],
  },
  {
    key: "transform-teal", name: "Transform Teal", role: "Secondary", cssVar: "--transform-teal-500",
    purpose: "Transformation, growth, innovation",
    useFor: ["Secondary actions", "Accent elements and badges", "Success indicators", "Data visualization (secondary)"],
  },
  {
    key: "tech-blue", name: "Tech Blue", role: "Supporting", cssVar: "--tech-blue-500",
    purpose: "Technical, professional, structural",
    useFor: ["Dark backgrounds", "Navigation areas", "Technical interfaces", "Depth and structure"],
  },
  {
    key: "equal-ember", name: "Equal Ember", role: "Accent", cssVar: "--equal-ember-500",
    purpose: "Energy, warmth, attention",
    useFor: ["Special highlights (use sparingly)", "Warning states", "Attention-grabbing elements", "Call-to-action emphasis"],
  },
];

// Alias rows: `label` (first cell markdown) + `mapsTo` are presentation; HEX is resolved from tokens.alias.
const ALIASES = [
  { label: "`--primary`", aliasKey: "primary", mapsTo: "EE Blue 500" },
  { label: "`--secondary`", aliasKey: "secondary", mapsTo: "Transform Teal 500" },
  { label: "`--sidebar` (dark nav)", aliasKey: "sidebar", mapsTo: "Tech Blue 500" },
  { label: "`--accent` (`--brand-ee-blue-accent`)", aliasKey: "accent", mapsTo: "EE Blue 50" },
  { label: "`--foreground` (`--brand-dark-data`)", aliasKey: "foreground", mapsTo: "text dark" },
  { label: "`--background` (`--brand-byte-white`)", aliasKey: "background", mapsTo: "white" },
  { label: "`--muted` (`--brand-the-cloud`)", aliasKey: "muted", mapsTo: "Slate 100" },
  { label: "`--destructive`", aliasKey: "destructive", mapsTo: "Runtime Red 600" },
];

// Extended palette — 2026-06-29 colours lockdown (extended-palette-review.md). Exception-only:
// see colour-usage.md for the tier model. Each is a flat peer scale, anchored at its measured
// lightness step (not forced to 500).
const EXTENDED = [
  { key: "index-indigo", name: "Index Indigo", anchorStep: "800", role: "Info / call-out", textOn: "White" },
  { key: "packet-plum", name: "Packet Plum", anchorStep: "600", role: "Expressive accent / dark surface", textOn: "White" },
  { key: "runtime-red", name: "Runtime Red", anchorStep: "600", role: "Error / danger", textOn: "White" },
  { key: "uptime-green", name: "Uptime Green", anchorStep: "500", role: "Success", textOn: "White" },
  { key: "server-slate", name: "Server Slate", anchorStep: "600", role: "Near-neutral brand grey (distinct from the EE neutral scale)", textOn: "White" },
  { key: "logic-lime", name: "Logic Lime", anchorStep: "300", role: "Bright pull-out accent · display alias \"Lime\"", textOn: "Dark Data" },
  { key: "edge-blue", name: "Edge Blue", anchorStep: "200", role: "Hover/active state — light end of the 3-stage blue", textOn: "Dark Data" },
  { key: "signal-yellow", name: "Signal Yellow", anchorStep: "300", role: "Bright pull-out accent · display alias \"Sunflower\"", textOn: "Dark Data" },
  { key: "cursor-coral", name: "Cursor Coral", anchorStep: "400", role: "Decorative pull-out (not error)", textOn: "Dark Data" },
  { key: "patch-peach", name: "Patch Peach", anchorStep: "300", role: "Light warm pull-out accent", textOn: "Dark Data" },
];

// EE neutral scale — monotonic Byte White (50) -> Dark Data (950). Named aliases at 4 points.
const NEUTRAL_ALIASES = [
  { step: "50", name: "Byte White" },
  { step: "100", name: "The Cloud" },
  { step: "600", name: "Overcast" },
  { step: "950", name: "Dark Data" },
];

// Cross-cutting semantic / RAG layer — sits above the tiers. Never colour alone (WCAG 1.4.1).
const SEMANTIC = [
  { key: "error", label: "Error / danger", requiredText: "White", note: "7.8:1 AAA · replaces support #dc2626" },
  { key: "warning", label: "Warning", requiredText: "Dark Data", note: "5.6:1 AA · white text FAILS (2.8:1)" },
  { key: "success", label: "Success", requiredText: "White", note: "5.0:1 AA" },
  { key: "info", label: "Info / call-out", requiredText: "White", note: "13.4:1 AAA" },
  { key: "link", label: "Text link / small text", requiredText: "is the text", note: "WIP — ~97% of AA on white (4.34:1), deliberately close to EE Blue; strict-AA fallback #007cb9" },
  { key: "interaction-state", label: "Interaction state (hover/active)", requiredText: "Dark Data", note: "8.8:1 AAA" },
  { key: "error-dark", label: "Error, on dark surfaces", requiredText: "—", note: "lighter step for on-dark text" },
  { key: "success-dark", label: "Success, on dark surfaces", requiredText: "—", note: "lighter step for on-dark text" },
  { key: "info-dark", label: "Info, on dark surfaces", requiredText: "—", note: "lighter step for on-dark text" },
];

const DATAVIZ_ORDER = [
  ["categorical-1", "EE Blue"], ["categorical-2", "Equal Ember"], ["categorical-3", "Tech Blue"],
  ["categorical-4", "Logic Lime"], ["categorical-5", "Packet Plum"], ["categorical-6", "Edge Blue"],
  ["categorical-7", "Runtime Red"], ["categorical-8", "Signal Yellow"],
];

function brandSection(b) {
  const v = brand500(b.key);
  return `### ${b.name} (${b.role})

**Purpose:** ${b.purpose}${"  "}
**Value:** \`${v.oklch}\` / \`${v.hex}\` (kuat-core \`${b.cssVar}\`)

**Use for:**
${b.useFor.map((u) => `- ${u}`).join("\n")}`;
}

function aliasRows() {
  return ALIASES.map((a) => `| ${a.label} | ${a.mapsTo} | \`${resolveHex(tokens.alias[a.aliasKey].$value)}\` |`).join("\n");
}

function extendedRows() {
  return EXTENDED.map((e) => {
    const v = scaleStep(e.key, e.anchorStep);
    return `| ${e.name} | ${e.role} | \`${v.hex}\` (step ${e.anchorStep}) | ${e.textOn} |`;
  }).join("\n");
}

function neutralRows() {
  const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
  return steps
    .map((s) => {
      const v = scaleStep("neutral", s);
      const alias = NEUTRAL_ALIASES.find((n) => n.step === s);
      return `| ${s} | \`${v.hex}\` | ${alias ? `**${alias.name}**` : ""} |`;
    })
    .join("\n");
}

function semanticRows() {
  return SEMANTIC.map((s) => `| ${s.label} | \`${resolveHex(tokens.semantic[s.key].$value)}\` | ${s.requiredText} | ${s.note} |`).join("\n");
}

function dataVizRows() {
  return DATAVIZ_ORDER.map(([key, name], i) => `${i + 1}. **${name}** \`${resolveHex(tokens["data-viz"][key].$value)}\``).join("\n");
}

function pairingSummary() {
  const darkSurfaces = EXTENDED.filter((e) => e.textOn === "White").map((e) => e.name);
  const brightSurfaces = EXTENDED.filter((e) => e.textOn === "Dark Data").map((e) => e.name);
  return `**Dark surfaces (white text):** ${darkSurfaces.join(", ")}, Dark Data.

**Bright surfaces (Dark Data text):** ${brightSurfaces.join(", ")}, EE Blue, Transform Teal, Equal Ember.

**Do not pair:**
- EE Blue \`${resolveHex(tokens.brand["ee-blue"].$value)}\` and Transform Teal \`${resolveHex(tokens.brand["transform-teal"].$value)}\` adjacent in a categorical sequence — 1.01:1 luminance, indistinguishable in greyscale/CVD.
- The Fruity combination (Runtime Red, Cursor Coral, Uptime Green, Logic Lime, Signal Yellow, Patch Peach) for any data encoding — collapses under protanopia. Decoration only.
- White text on Equal Ember \`${resolveHex(tokens.brand["equal-ember"].$value)}\` — fails at 2.8:1; use Dark Data.`;
}

function render() {
  return `# Colour Rules

<!-- GENERATED FILE — DO NOT EDIT BY HAND.
     Produced by skills/scripts/generate-tokens.mjs from
     reference/design-language/tokens/colors.tokens.json (the source of truth).
     Change colours in the token file, then run \`npm run tokens:generate\`.
     CI runs \`npm run tokens:check\` and fails if this file drifts from the tokens. -->

Brand color specifications for Equal Experts. This document defines the brand colors, palette scales, and usage guidelines.

> **Source of truth:** the canonical colour tokens live **upstream in this repo** at [\`tokens/colors.tokens.json\`](./tokens/colors.tokens.json) (W3C design-tokens; brand palettes + aliases). **This document is generated from it** by \`skills/scripts/generate-tokens.mjs\`, and the downstream \`@equal-experts/kuat-core\` \`variables.css\` is generated from the same tokens — don't hand-edit either; change colours in the token file and regenerate. (kuat-core is downstream; never the reverse.) Support scales (slate/red/indigo) are *not* brand colours. Hex values below are the authoritative \`…-500\` brand values; full 50–950 scales + aliases live in the token file.

---

## Brand Colors

Equal Experts uses four core brand color palettes:

${BRAND.map(brandSection).join("\n\n")}

---

## Brand Color Palette Scale

Each brand color has a scale from 50 (lightest) to 950 (darkest):

| Range | Usage |
|-------|-------|
| 50-200 | Light backgrounds, subtle accents, hover states |
| 300-500 | Primary brand colors, main actions |
| 600-800 | Darker variants for depth and contrast |
| 900-950 | Maximum depth, dark mode, high contrast |

---

## Brand Aliases (semantic roles)

How the brand palettes map to semantic roles in kuat-core \`variables.css\`. **Use these aliases, not raw scale values.**

| Alias | Maps to | Hex |
|-------|---------|-----|
${aliasRows()}

Support scales (slate, red, indigo) back these aliases but are **not brand colours** — never use them directly as a brand colour.

---

## Extended Palette (exception-only)

Added in the June 2026 colours lockdown. **Core is primary; extended is exception-only** — see
[colour-usage.md](./colour-usage.md) for the tier model (data viz, keyed diagrams, small pull-outs).
Each is a flat peer scale (50–950), anchored at its measured lightness step, not forced to 500.

| Colour | Role | Value | Text on it |
|--------|------|-------|------------|
${extendedRows()}

---

## EE Neutral Scale

Monotonic Byte White → Dark Data, distinct from Server Slate (a brand grey, not a UI neutral):

| Step | Value | Alias |
|------|-------|-------|
${neutralRows()}

---

## Semantic / RAG Colours

Cross-cutting roles that mean a *specific thing* and may appear in any scenario — reserved for
meaning, never reused decoratively. Always pair with an icon/shape/label (WCAG 1.4.1 — never
colour alone).

| Role | Value | Required text | Notes |
|------|-------|----------------|-------|
${semanticRows()}

---

## Data Visualisation — Categorical Order

Tier 3 sequence for charts/data viz only. Use in order; stop when there are enough categories.
CVD-checked, lightness-separated. Never place EE Blue and Transform Teal adjacent.

${dataVizRows()}

---

## Pairing Summary

${pairingSummary()}

---

## Color Format

All colors use **OKLCH** color space:

\`\`\`
oklch(lightness chroma hue)
\`\`\`

**Benefits:**
- Perceptual uniformity (equal changes = equal perception)
- Better color manipulation for consistent scales
- Modern format with excellent support

**Hex values** are provided for tools that don't support OKLCH.

---

## Light and Dark Mode

Colors should adapt for light and dark contexts:

**Light Mode (default):**
- Light backgrounds (white, light gray)
- Dark text (slate-900, slate-950)
- Brand colors at standard values

**Dark Mode:**
- Dark backgrounds (slate-900, slate-950)
- Light text (white, slate-100)
- Brand colors remain consistent
- Supporting colors adapt for contrast

---

## Accessibility Requirements

All color combinations must meet **WCAG AA** standards:

| Content Type | Minimum Contrast |
|--------------|------------------|
| Normal text (14px and below) | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| Graphical objects/borders | 3:1 |

**Approved Combinations:**
- Dark text on light backgrounds ✓
- White text on EE Blue ✓
- White text on Tech Blue ✓
- White text on Transform Teal ✓
- Dark text on Equal Ember (check contrast) ✓

---

## Usage Guidelines

### Do's

1. **Use brand colors consistently** - EE Blue for primary, Transform Teal for secondary
2. **Pair colors correctly** - Ensure sufficient contrast for text
3. **Support light and dark contexts** - Colors work in both modes
4. **Respect brand hierarchy** - Primary for main actions, secondary for alternatives
5. **Verify accessibility** - Always check contrast ratios

### Don'ts

1. **Don't use non-brand colors** - Stick to the defined palette
2. **Don't mix brand colors inappropriately** - Each has a specific purpose
3. **Don't break accessibility** - Always verify contrast ratios
4. **Don't create custom variations** - Use only defined palette values
5. **Don't use color alone to convey meaning** - Combine with text, icons, patterns

---

## Platform-Specific Implementation

For platform-specific color usage:

- **Web product** - See [media-types/web-product/](../media-types/web-product/) for CSS variables and tokens
- **Web marketing** - See [media-types/web-marketing/](../media-types/web-marketing/)
- **Slides** - See [media-types/slides/](../media-types/slides/)
- **Graphics** - See [media-types/imagery/patterns/graphics/](../media-types/imagery/patterns/graphics/)
- **Charts** - See [media-types/charts-data/](../media-types/charts-data/)

---

## Related Documentation

- [Brand Guidelines](../brand/brand.md) - Brand principles
- [Typography](./typography.md) - Font colors and text styling
- [Logo](../brand/logo.md) - Logo color variants
`;
}

function main() {
  const check = process.argv.includes("--check");
  const generated = render();
  const rel = path.relative(REPO_ROOT, OUT_PATH);
  if (check) {
    const current = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, "utf8") : "";
    if (current === generated) {
      console.log(`tokens:check ok — ${rel} matches the token SoT`);
      process.exit(0);
    }
    console.error(`tokens:check FAILED — ${rel} has drifted from colors.tokens.json.`);
    console.error(`Run \`npm run tokens:generate\` (don't hand-edit ${rel}).`);
    // show the first differing line to make the drift obvious
    const a = current.split("\n"), b = generated.split("\n");
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) {
        console.error(`  first diff at line ${i + 1}:`);
        console.error(`    committed:  ${a[i] ?? "(missing)"}`);
        console.error(`    generated:  ${b[i] ?? "(missing)"}`);
        break;
      }
    }
    process.exit(1);
  }
  fs.writeFileSync(OUT_PATH, generated, "utf8");
  console.log(`tokens:generate — wrote ${rel} from ${path.relative(REPO_ROOT, TOKENS_PATH)}`);
}

main();
