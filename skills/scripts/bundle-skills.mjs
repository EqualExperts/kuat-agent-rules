#!/usr/bin/env node
/**
 * Bundle kuat-review and kuat-create into self-contained dist/ artifacts for upload-only UIs.
 * Usage: node skills/scripts/bundle-skills.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SKILLS_DIR, "..");
const DIST_DIR = path.join(SKILLS_DIR, "dist");
const INCLUDE_RE = /\{\{include:([^}]+)\}\}/g;
const MAX_SKILL_BODY_CHARS = 65536; // Figma custom-skill hard limit (name/description separate)

// Two kinds of legacy bundle (Claude Code / Claude Projects / filesystem consumption):
// - legacy intent skills (kuat-review/kuat-create): use {{include:...}} directives, resolve
//   {RULES_DIR} at runtime via ensure-rules.sh + a git checkout or package snapshot.
//
// A third kind (figmaCustomSkill: true) targets Figma AI's native custom-skills feature
// (create_custom_skill / edit_custom_skill). That surface has NO network access and NO shell —
// {RULES_DIR} runtime resolution cannot work there at all, which is exactly the bug this group
// fixes. Sources for this group are already fully self-contained (hand-authored, no
// {{include}} directives, no {RULES_DIR} references) — the bundler's job for this group is just
// to validate the size limit and stamp a footer, not to expand or rewrite links.
const CRAFT = "install/make-kit-guidelines/craft.md";
const FIGMA_SHARED = ["_shared/intake.md", CRAFT, "_shared/version-stamp.md"];
const FIGMA_REVIEW_SHARED = [
  "_shared/intake.md",
  "_shared/review-common.md",
  CRAFT,
  "_shared/observer-gate.md",
  "_shared/report-formats.md",
  "_shared/version-stamp.md",
];

// Legacy (Claude Code / Claude Projects) — {RULES_DIR} runtime resolution, unchanged.
const LEGACY_SKILLS = [
  { id: "kuat-review", source: "kuat-review/SKILL.md" },
  { id: "kuat-create", source: "kuat-create/SKILL.md" },
];

// DEPRECATED — superseded by the figma-custom-skills domain split below (kuat-create,
// kuat-tokens, kuat-composition, kuat-patterns, kuat-components, kuat-review under
// dist/figma-custom-skills/). Kept here, commented out of the active build, only so the
// bundler script itself still documents what these were and why they were retired: every one
// of them still carries {RULES_DIR} link placeholders in its bundled body, which Figma's custom
// skills runtime (no network, no shell) can never resolve — the exact defect that prompted the
// domain-split rebuild. Do not re-enable without first removing the {RULES_DIR} links.
const DEPRECATED_FIGMA_WORKFLOW_SKILLS = [
  "kuat-figma-design",
  "kuat-figma-prototype",
  "kuat-figma-review-design",
  "kuat-figma-make",
  "kuat-figma-review-make",
];

// Figma AI custom skills — domain split, fully self-contained, no {RULES_DIR}.
// Source folder names differ from the shipped skill `name` for kuat-create / kuat-review to
// avoid colliding with the unrelated legacy Claude-Code sources of the same name above.
const FIGMA_CUSTOM_SKILLS = [
  { id: "kuat-create", source: "kuat-create-figma/SKILL.md" },
  { id: "kuat-tokens", source: "kuat-tokens/SKILL.md" },
  { id: "kuat-composition", source: "kuat-composition/SKILL.md" },
  { id: "kuat-patterns", source: "kuat-patterns/SKILL.md" },
  { id: "kuat-components", source: "kuat-components/SKILL.md" },
  { id: "kuat-review", source: "kuat-review-figma/SKILL.md" },
];

const SKILLS = [
  ...LEGACY_SKILLS,
  {
    id: "kuat-figma-design",
    source: "kuat-figma-design/SKILL.md",
    standalone: true,
    inline: [
      "_shared/intake.md",
      CRAFT,
      "kuat-figma-design/figma-build-checklist.md",
      "_shared/observer-gate.md",
      "_shared/version-stamp.md",
    ],
    deprecated: true,
  },
  { id: "kuat-figma-prototype", source: "kuat-figma-prototype/SKILL.md", standalone: true, inline: FIGMA_SHARED, deprecated: true },
  { id: "kuat-figma-review-design", source: "kuat-figma-review-design/SKILL.md", standalone: true, inline: FIGMA_REVIEW_SHARED, deprecated: true },
  { id: "kuat-figma-make", source: "kuat-figma-make/SKILL.md", standalone: true, inline: FIGMA_SHARED, deprecated: true },
  { id: "kuat-figma-review-make", source: "kuat-figma-review-make/SKILL.md", standalone: true, inline: FIGMA_REVIEW_SHARED, deprecated: true },
];
// Deprecated skills are not emitted to dist/ by default — see emitDeprecated below.
const emitDeprecated = process.env.KUAT_EMIT_DEPRECATED_FIGMA_SKILLS === "1";
const FIGMA_SKILL_IDS = SKILLS.filter((s) => s.standalone && !s.deprecated).map((s) => s.id);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function sha256(content) {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

function gitRef() {
  try {
    return execSync("git rev-parse HEAD", { cwd: REPO_ROOT, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

function bundleVersion() {
  const pkgPath = path.join(REPO_ROOT, "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      return JSON.parse(read(pkgPath)).version ?? "0.0.0";
    } catch {
      /* ignore */
    }
  }
  return "0.0.0";
}

function rewriteBundledMarkdown(body, skillId) {
  let out = body;

  // Repo-relative doc links → runtime placeholders
  // Phase 2: reference library links resolve against {RULES_DIR} at runtime.
  out = out.replace(/\]\(\.\.\/\.\.\/reference\//g, "]({RULES_DIR}/");
  out = out.replace(
    /\]\(\.\.\/\.\.\/AGENTS\.md\)/g,
    "]({RULES_ROOT}/AGENTS.md)"
  );
  out = out.replace(
    /\]\(\.\/resolve-rules\.md\)/g,
    "](above: Shared — Resolve rules)"
  );
  out = out.replace(
    /\]\(\.\.\/README\.md#install-rules\)/g,
    "](set KUAT_RULES_PATH or .kuat-rules-path — see skills README)"
  );
  out = out.replace(
    /\]\(\.\.\/install\/figma-agent\.md(#[^)]*)?\)/g,
    "](see skills/install/figma-agent.md in the kuat-agent-docs repo — pair a connector with rules content in the same prompt)"
  );
  out = out.replace(
    /\]\(\.\.\/scripts\/README\.md\)/g,
    "](skills/scripts/README.md in rules repo)"
  );

  // report-formats now ships as a shared include (skills/_shared/report-formats.md),
  // expanded inline below; the skill body references it as a plain section.
  const relatedMarker = "\n## Related\n";
  const relatedIdx = out.lastIndexOf(relatedMarker);
  if (relatedIdx !== -1) {
    const companion = skillId === "kuat-review" ? "kuat-create" : "kuat-review";
    out =
      out.slice(0, relatedIdx) +
      `\n## Related skills\n\n- Companion skill: \`${companion}\` (separate bundled SKILL.md in \`skills/dist/\`)\n- Rules standards: \`{RULES_DIR}\` — [kuat-agent-docs](https://github.com/equalexperts/kuat-agent-docs)\n- Bundle manifest: compare \`RULES_REF\` to \`dist/manifest.json\` → \`rules.builtAtRef\`\n`;
  }

  out = out.replace(
    /See \[consumption-contract\.md\]\(\.\/consumption-contract\.md\)/g,
    "See **Shared: consumption contract** (included above)"
  );

  return out;
}

function expandIncludes(content, stack = new Set()) {
  return content.replace(INCLUDE_RE, (_, includePath) => {
    const normalized = includePath.trim().replace(/^\//, "");
    const absPath = path.isAbsolute(normalized)
      ? normalized
      : path.join(REPO_ROOT, normalized);

    if (stack.has(absPath)) {
      throw new Error(`Circular include: ${includePath}`);
    }
    stack.add(absPath);

    if (!fs.existsSync(absPath)) {
      throw new Error(`Include not found: ${includePath} → ${absPath}`);
    }

    let included = read(absPath);
    // Demote top-level H1 in included files to H2 when nested
    included = included.replace(/^# /m, "## ");
    included = expandIncludes(included, stack);
    stack.delete(absPath);

    const base = path.basename(absPath, ".md").replace(/-/g, " ");
    const label = normalized.includes("/references/")
      ? `Reference: ${base}`
      : `Shared: ${base}`;
    return `\n\n<!-- begin include: ${normalized} -->\n\n## ${label}\n\n${included.trim()}\n\n<!-- end include: ${normalized} -->\n\n`;
  });
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: "", body: content };
  }
  return { frontmatter: match[1], body: match[2] };
}

function sectionLabel(relPath) {
  return path.basename(relPath, ".md").replace(/-/g, " ");
}

// Standalone activity skills: append each `inline` file as a section, point links at it,
// then unlink whatever relative .md links remain (single-file surfaces resolve nothing).
function bundleStandaloneBody(body, inline) {
  let out = body;
  const sections = [];
  for (const rel of inline) {
    const absPath = path.join(SKILLS_DIR, rel);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Inline file not found: ${rel} → ${absPath}`);
    }
    const label = sectionLabel(rel);
    // Drop the file's own H1 (the "Shared:" section heading replaces it), demote H2s to H3s.
    let content = read(absPath).replace(/^# .*\n/, "").trim();
    content = content.replace(/^## /gm, "### ");
    sections.push(`\n\n<!-- begin include: skills/${rel} -->\n\n## Shared: ${label}\n\n${content}\n\n<!-- end include: skills/${rel} -->`);

    // Links to this file (from the skill dir or from a sibling _shared file) → the section below.
    const base = path.basename(rel);
    const linkRe = new RegExp(
      String.raw`\[([^\]]+)\]\((?:\.\.\/_shared\/|\.\/)${base.replace(".", "\\.")}(#[^)]*)?\)`,
      "g"
    );
    out = out.replace(linkRe, (_, text) => `**${text.includes("/") ? path.basename(text) : text}** (see "Shared: ${label}" below)`);
  }
  out += sections.join("");

  // Second pass so links *inside* inlined sections also resolve to sibling sections.
  for (const rel of inline) {
    const base = path.basename(rel);
    const label = sectionLabel(rel);
    const linkRe = new RegExp(
      String.raw`\[([^\]]+)\]\((?:\.\.\/_shared\/|\.\/)${base.replace(".", "\\.")}(#[^)]*)?\)`,
      "g"
    );
    out = out.replace(linkRe, (_, text) => `**${text.includes("/") ? path.basename(text) : text}** (see "Shared: ${label}" below)`);
  }

  // Reference library links resolve against {RULES_DIR} at runtime (kit / connector / checkout).
  out = out.replace(/\]\(\.\.\/\.\.\/reference\//g, "]({RULES_DIR}/");
  // De-path link labels that were spelled as the repo-relative path.
  out = out.replace(/\[\.\.\/\.\.\/reference\/([^\]]+)\]/g, "[$1]");

  // Anything else relative — sibling skills, repo docs — cannot resolve on a single-file
  // surface: keep the label as plain text.
  out = out.replace(/\[([^\]]+)\]\((?:\.\.?\/)[^)]*\.md(?:#[^)]*)?\)/g, "$1");

  return out;
}

function bundleSkill({ id, source, standalone, inline }) {
  const sourcePath = path.join(SKILLS_DIR, source);
  const raw = read(sourcePath);
  const { frontmatter, body } = extractFrontmatter(raw);

  let bundledBody;
  if (standalone) {
    // Related tail first (it names sibling skills as links we'd otherwise unlink blindly).
    const relatedIdx = body.lastIndexOf("\n## Related\n");
    let trimmed = relatedIdx !== -1 ? body.slice(0, relatedIdx) : body;
    const siblings = FIGMA_SKILL_IDS.filter((s) => s !== id)
      .map((s) => `\`${s}\``)
      .join(" · ");
    trimmed += `\n## Related skills\n\n- Sibling Figma skills on this surface (each its own bundled SKILL.md in \`skills/dist/\`): ${siblings}\n- Rules standards: \`{RULES_DIR}\` — [kuat-agent-rules](https://github.com/EqualExperts/kuat-agent-rules)\n`;
    bundledBody = bundleStandaloneBody(trimmed, inline ?? []);
  } else {
    bundledBody = expandIncludes(body);
    bundledBody = rewriteBundledMarkdown(bundledBody, id);
  }

  const rulesRef = gitRef();
  const version = bundleVersion();
  const builtAt = new Date().toISOString().slice(0, 10);

  const footer = `
<!-- kuat-skill-bundle: ${id} v${version} rules-ref:${rulesRef.slice(0, 12)} built:${builtAt} -->
`;

  const out = `---\n${frontmatter.trim()}\n---\n\n${bundledBody.trim()}\n${footer}`;
  const outPath = path.join(DIST_DIR, id, "SKILL.md");
  write(outPath, out);
  return { id, file: `${id}/SKILL.md`, sha256: sha256(out), rulesRef };
}

// Figma custom skills: sources are already fully self-contained (no {{include}}, no {RULES_DIR}).
// Just re-stamp the footer with the current rules ref/date and enforce the size limit.
function bundleFigmaCustomSkill({ id, source }) {
  const sourcePath = path.join(SKILLS_DIR, source);
  const raw = read(sourcePath);
  const { frontmatter, body } = extractFrontmatter(raw);

  // Strip any footer the source already carries — it gets a fresh one below.
  const bodyNoFooter = body.replace(/\n<!-- kuat-skill-bundle:[^\n]*-->\s*$/m, "").trim();

  if (/\{RULES_DIR\}|\{RULES_ROOT\}/.test(bodyNoFooter)) {
    throw new Error(
      `${id}: figma-custom-skill body still contains a {RULES_DIR}/{RULES_ROOT} placeholder — ` +
        `these skills must be fully self-contained (no network access on the Figma custom-skills surface).`
    );
  }

  const rulesRef = gitRef();
  const version = bundleVersion();
  const builtAt = new Date().toISOString().slice(0, 10);
  const footer = `\n<!-- kuat-skill-bundle: ${id} v${version} rules-ref:${rulesRef.slice(0, 12)} built:${builtAt} -->\n`;

  const out = `---\n${frontmatter.trim()}\n---\n\n${bodyNoFooter}\n${footer}`;

  if (out.length > MAX_SKILL_BODY_CHARS) {
    throw new Error(
      `${id}: figma-custom-skill output is ${out.length} chars, exceeds the ${MAX_SKILL_BODY_CHARS}-char Figma custom-skill limit`
    );
  }

  const outPath = path.join(DIST_DIR, "figma-custom-skills", id, "SKILL.md");
  write(outPath, out);
  return { id, file: `figma-custom-skills/${id}/SKILL.md`, sha256: sha256(out), rulesRef, chars: out.length };
}

function copySharedAndScripts() {
  const sharedSrc = path.join(SKILLS_DIR, "shared");
  const sharedDest = path.join(DIST_DIR, "shared");
  fs.mkdirSync(sharedDest, { recursive: true });
  for (const name of fs.readdirSync(sharedSrc)) {
    if (name.endsWith(".md")) {
      write(path.join(sharedDest, name), read(path.join(sharedSrc, name)));
    }
  }

  const scriptsDest = path.join(DIST_DIR, "scripts");
  fs.mkdirSync(scriptsDest, { recursive: true });
  for (const name of ["ensure-rules.sh", "README.md"]) {
    const src = path.join(SKILLS_DIR, "scripts", name);
    if (fs.existsSync(src)) {
      write(path.join(scriptsDest, name), read(src));
      if (name.endsWith(".sh")) {
        fs.chmodSync(path.join(scriptsDest, name), 0o755);
      }
    }
  }
}

function main() {
  console.log("Bundling skills → skills/dist/");

  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });

  const activeLegacy = SKILLS.filter((s) => !s.deprecated || emitDeprecated);
  const built = activeLegacy.map(bundleSkill);
  const figmaCustom = FIGMA_CUSTOM_SKILLS.map(bundleFigmaCustomSkill);
  copySharedAndScripts();

  const rulesRef = gitRef();
  const manifest = {
    version: bundleVersion(),
    builtAt: new Date().toISOString(),
    rules: {
      repo: "equalexperts/kuat-agent-docs",
      loadingPath: "reference/README.md",
      builtAtRef: rulesRef,
    },
    skills: Object.fromEntries(
      built.map(({ id, file, sha256: hash }) => [id, { file, sha256: hash }])
    ),
    figmaCustomSkills: Object.fromEntries(
      figmaCustom.map(({ id, file, sha256: hash, chars }) => [id, { file, sha256: hash, chars }])
    ),
    deprecated: {
      figmaWorkflowSkills: DEPRECATED_FIGMA_WORKFLOW_SKILLS,
      reason:
        "Superseded by figmaCustomSkills (domain split) — each still referenced {RULES_DIR}, " +
        "which the Figma custom-skills runtime cannot resolve (no network, no shell). Set " +
        "KUAT_EMIT_DEPRECATED_FIGMA_SKILLS=1 to still emit them to dist/ during the transition.",
    },
    ensureRulesScript: "scripts/ensure-rules.sh",
    usage: {
      uploadOnlyTools:
        "Upload the dist/<skill>/SKILL.md files you need (each self-contained). Claude Projects: kuat-create/kuat-review.",
      figmaCustomSkills:
        "Install dist/figma-custom-skills/<skill>/SKILL.md via Figma AI's create_custom_skill (name/description/body) " +
        "— fully self-contained, no {RULES_DIR}, no network required at runtime. Install all six: " +
        "kuat-create, kuat-tokens, kuat-composition, kuat-patterns, kuat-components, kuat-review.",
      filesystemTools:
        "Symlink dist/kuat-review or source skills/kuat-review; run dist/scripts/ensure-rules.sh.",
    },
  };

  write(path.join(DIST_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  write(
    path.join(DIST_DIR, "README.md"),
    `# Bundled skills (generated)

Do not edit by hand. Regenerate from repo root:

\`\`\`bash
node skills/scripts/bundle-skills.mjs
\`\`\`

## Figma AI custom skills (\`figma-custom-skills/\`)

Fully self-contained — no \`{RULES_DIR}\`, no network access required. Install all six via
\`create_custom_skill\` / \`edit_custom_skill\`:

| Artifact | Loads for |
|----------|-----------|
${FIGMA_CUSTOM_SKILLS.map(({ id }) => `| [figma-custom-skills/${id}/SKILL.md](./figma-custom-skills/${id}/SKILL.md) | ${
  id === "kuat-create"
    ? "Orchestrator — start here, load siblings per step"
    : id === "kuat-review"
      ? "Reviewing existing Figma/Figma Make work"
      : `${id.replace("kuat-", "")} rules`
}${", "}see \`skills/${
  { "kuat-create": "kuat-create-figma", "kuat-review": "kuat-review-figma" }[id] ?? id
}/SKILL.md\` for source |`).join("\n")}

## Other consumption surfaces

| Artifact | Use |
|----------|-----|
${LEGACY_SKILLS.map(({ id }) => `| [${id}/SKILL.md](./${id}/SKILL.md) | Upload to Claude Projects and other single-file tools; resolves \`{RULES_DIR}\` at runtime via \`scripts/ensure-rules.sh\` |`).join("\n")}
| [manifest.json](./manifest.json) | Version and rules ref for installers |
| [scripts/ensure-rules.sh](./scripts/ensure-rules.sh) | Keep rules fresh (filesystem tools) |

**Deprecated:** \`kuat-figma-design\`, \`kuat-figma-prototype\`, \`kuat-figma-review-design\`,
\`kuat-figma-make\`, \`kuat-figma-review-make\` — superseded by \`figma-custom-skills/\` above.
Not emitted by default (still \`{RULES_DIR}\`-dependent); set
\`KUAT_EMIT_DEPRECATED_FIGMA_SKILLS=1\` to emit them during the transition.

Rules standards for the legacy group remain in the \`reference/\` library — not embedded in those
bundles. The \`figma-custom-skills/\` group inlines everything it needs instead, by design.

Built against rules ref: \`${rulesRef}\`
`
  );

  console.log(`  rules-ref: ${rulesRef}`);
  for (const { id, file } of built) {
    console.log(`  wrote dist/${file}`);
  }
  for (const { id, file, chars } of figmaCustom) {
    console.log(`  wrote dist/${file} (${chars} chars)`);
  }
  console.log("  wrote dist/manifest.json");
  console.log("Done.");
}

main();
