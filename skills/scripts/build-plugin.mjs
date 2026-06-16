#!/usr/bin/env node
/**
 * Assemble the EE activity skills into installable Claude Code / Cowork plugins.
 *
 * Phase 3 packaging. Each bundle gets a self-contained plugin payload under
 * plugins/<name>/ with:
 *   - .claude-plugin/plugin.json   (auto-discovers skills/)
 *   - skills/<subset> + skills/_shared   (escape-links rewritten to ${CLAUDE_PLUGIN_ROOT})
 *   - reference/**                 (full passive snapshot, minus the migration map)
 *   - commands/*.md                (explicit entry points)
 *   - manifest.json                (stamped reference SHA + plugin version)
 *   - CHANGELOG.md
 *
 * Source skills keep their repo-relative ../../reference links (so the repo dev
 * path + Phase-2 evals still resolve); the rewrite happens here, in the payload.
 *
 * Usage: node skills/scripts/build-plugin.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(__dirname, "..");          // repo/skills
const REPO_ROOT = path.resolve(SKILLS_DIR, "..");          // repo root
const REFERENCE_DIR = path.join(REPO_ROOT, "reference");
const PLUGINS_DIR = path.join(REPO_ROOT, "plugins");
const ASSETS_DIR = path.join(REPO_ROOT, "assets");

// Guard: only ever package the distributable root skills/, never .claude/skills/
// (reserved for repo-local contributor skills — Phase 7).
if (path.basename(SKILLS_DIR) !== "skills" || SKILLS_DIR.includes(`${path.sep}.claude${path.sep}`)) {
  throw new Error(`build-plugin: refusing to package from ${SKILLS_DIR}`);
}

const ALL_SKILLS = [
  "create-web-app",
  "review-web-app",
  "create-imagery",
  "create-presentation",
  "review-presentation",
];

const BUNDLES = [
  {
    name: "kuat-build",
    displayName: "Kuat Build",
    description:
      "Build and review Equal Experts web application UI — forms, dashboards, app screens, product flows — on brand and accessible, using the Kuat design system. For engineers in Claude Code / Cowork.",
    skills: ["create-web-app", "review-web-app"],
    commands: [
      { file: "web-app.md", description: "Build EE web app UI", skill: "create-web-app", verb: "build or modify" },
      { file: "review.md", description: "Review EE web app UI", skill: "review-web-app", verb: "review" },
    ],
  },
  {
    name: "kuat-studio",
    displayName: "Kuat Studio",
    description:
      "Create and review Equal Experts branded slide decks, presentations, and visual assets (icons, infographics, illustrations, photography) — on brand, no setup required.",
    skills: ["create-presentation", "review-presentation", "create-imagery"],
    assets: true, // bundle the slides asset pack (master + manifest + logo + fonts); kuat-build gets none

    commands: [
      { file: "presentation.md", description: "Create an EE slide deck", skill: "create-presentation", verb: "create" },
      { file: "review.md", description: "Review an EE slide deck", skill: "review-presentation", verb: "review" },
      { file: "imagery.md", description: "Create EE imagery", skill: "create-imagery", verb: "create or select" },
    ],
  },
];

const VERSION = "1.0.0";
const AUTHOR = { name: "Equal Experts", url: "https://www.equalexperts.com" };

// ${CLAUDE_PLUGIN_ROOT} kept literal (regular strings — no template interpolation).
const PLUGIN_ROOT = "${CLAUDE_PLUGIN_ROOT}";

function read(p) {
  return fs.readFileSync(p, "utf8");
}
function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
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
function today() {
  return new Date().toISOString().slice(0, 10);
}
function dirSizeBytes(dir) {
  let total = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    total += e.isDirectory() ? dirSizeBytes(p) : fs.statSync(p).size;
  }
  return total;
}

/** Rewrite the escape-links inside a skill / _shared markdown file to ${CLAUDE_PLUGIN_ROOT}. */
function rewriteSkillLinks(content) {
  let out = content;
  // ../../reference/ -> ${CLAUDE_PLUGIN_ROOT}/reference/   (SKILL.md and _shared/*.md)
  out = out.replace(/\]\(\.\.\/\.\.\/reference\//g, () => `](${PLUGIN_ROOT}/reference/`);
  // ../_shared/ -> ${CLAUDE_PLUGIN_ROOT}/skills/_shared/
  out = out.replace(/\]\(\.\.\/_shared\//g, () => `](${PLUGIN_ROOT}/skills/_shared/`);
  // ../<other-skill>/ -> ${CLAUDE_PLUGIN_ROOT}/skills/<other-skill>/   (cross-skill "Related" links)
  const skillAlt = ALL_SKILLS.join("|");
  out = out.replace(new RegExp(`\\]\\(\\.\\./(${skillAlt})/`, "g"), (_m, s) => `](${PLUGIN_ROOT}/skills/${s}/`);
  // De-path the visible link LABELS too, so an agent reading the SKILL.md doesn't
  // treat a stale ../../ escape path as the location (targets are already rewritten above).
  out = out.replace(/\[\.\.\/\.\.\/(reference\/)/g, "[$1");
  out = out.replace(/\[\.\.\/_shared\//g, "[skills/_shared/");
  out = out.replace(new RegExp(`\\[\\.\\./(${skillAlt})/`, "g"), (_m, s) => `[skills/${s}/`);
  return out;
}

/**
 * Strip markdown links that point outside the bundle down to plain text:
 *  - kuat-docs/* (the setup docs aren't part of the consultant bundle)
 *  - MIGRATION-MAP.md (excluded from the snapshot as a migration artifact)
 */
function neutraliseExternalLinks(content) {
  return content
    .replace(/\[([^\]]+)\]\([^)]*kuat-docs[^)]*\)/g, (_m, text) => text)
    .replace(/\[([^\]]+)\]\([^)]*MIGRATION-MAP[^)]*\)/g, (_m, text) => text);
}

function copyReferenceSnapshot(destRefDir) {
  // Full passive snapshot, minus MIGRATION-MAP.md (a migration artifact full of old-path refs).
  const skip = new Set(["MIGRATION-MAP.md"]);
  const walk = (srcDir, outDir) => {
    for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
      if (entry.name === ".DS_Store") continue;
      const src = path.join(srcDir, entry.name);
      const out = path.join(outDir, entry.name);
      if (entry.isDirectory()) {
        walk(src, out);
      } else if (entry.isFile()) {
        const rel = path.relative(REFERENCE_DIR, src);
        if (skip.has(rel)) continue;
        let body = read(src);
        if (entry.name.endsWith(".md")) body = neutraliseExternalLinks(body);
        write(out, body);
      }
    }
  };
  walk(REFERENCE_DIR, destRefDir);
}

/**
 * Recursively copy a tree. Markdown files get their escape-links rewritten (when
 * rewriteMd); every other file (incl. binary: .pptx, .ttf, .png, .py) is copied
 * byte-for-byte. Skips .DS_Store. Used for skills (with subdirs like scripts/)
 * and the asset pack.
 */
function copyTree(srcDir, outDir, rewriteMd) {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const src = path.join(srcDir, entry.name);
    const out = path.join(outDir, entry.name);
    if (entry.isDirectory()) {
      copyTree(src, out, rewriteMd);
    } else if (entry.isFile()) {
      if (rewriteMd && entry.name.endsWith(".md")) {
        write(out, rewriteSkillLinks(read(src)));
      } else {
        fs.mkdirSync(path.dirname(out), { recursive: true });
        fs.copyFileSync(src, out); // binary-safe
      }
    }
  }
}

function copySkill(skillName, destSkillsDir) {
  copyTree(path.join(SKILLS_DIR, skillName), path.join(destSkillsDir, skillName), true);
}

function copyAssets(destAssetsDir) {
  copyTree(ASSETS_DIR, destAssetsDir, false); // raw copy — never rewrite asset bytes
}

function copyShared(destSkillsDir) {
  const srcDir = path.join(SKILLS_DIR, "_shared");
  for (const name of fs.readdirSync(srcDir)) {
    if (!name.endsWith(".md")) continue;
    let body = rewriteSkillLinks(read(path.join(srcDir, name)));
    write(path.join(destSkillsDir, "_shared", name), body);
  }
}

function commandBody(cmd) {
  return `---
description: ${cmd.description}
---

Use the **${cmd.skill}** skill (\`${PLUGIN_ROOT}/skills/${cmd.skill}/SKILL.md\`) to ${cmd.verb} the requested Equal Experts work. Follow the skill end to end — run its intake first, load the reference slices it names, and apply its checklist before handoff.
`;
}

function buildBundle(bundle) {
  const root = path.join(PLUGINS_DIR, bundle.name);
  fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });

  const skillsDest = path.join(root, "skills");
  for (const s of bundle.skills) copySkill(s, skillsDest);
  copyShared(skillsDest);
  copyReferenceSnapshot(path.join(root, "reference"));
  if (bundle.assets) copyAssets(path.join(root, "assets"));

  for (const cmd of bundle.commands) write(path.join(root, "commands", cmd.file), commandBody(cmd));

  const pluginJson = {
    name: bundle.name,
    displayName: bundle.displayName,
    version: VERSION,
    description: bundle.description,
    author: AUTHOR,
    homepage: "https://www.equalexperts.com",
    license: "UNLICENSED",
    keywords: ["equal-experts", "brand", "design-system", "kuat"],
  };
  write(path.join(root, ".claude-plugin", "plugin.json"), `${JSON.stringify(pluginJson, null, 2)}\n`);

  const ref = gitRef();
  const manifest = {
    plugin: bundle.name,
    version: VERSION,
    skills: bundle.skills,
    reference: { repo: "EqualExperts/kuat-agent-rules", builtAtRef: ref },
    builtAt: new Date().toISOString(),
  };
  write(path.join(root, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  write(
    path.join(root, "CHANGELOG.md"),
    `# Changelog — ${bundle.displayName} (\`${bundle.name}\`)

All notable changes to this plugin are recorded here. Drives release notes.

## ${VERSION} — ${today()}

- Initial release. Skills: ${bundle.skills.map((s) => `\`${s}\``).join(", ")}.
- Bundled \`reference/\` snapshot at \`${ref.slice(0, 12)}\`.
`
  );

  // payload digest over skill + command markdown (reference snapshot tracked via builtAtRef)
  const digestInput = bundle.skills
    .map((s) => read(path.join(skillsDest, s, "SKILL.md")))
    .join("\n");
  return { name: bundle.name, skills: bundle.skills.length, ref, sha: sha256(digestInput), bytes: dirSizeBytes(root) };
}

function main() {
  console.log("Building plugins → plugins/");
  const built = BUNDLES.map(buildBundle);
  for (const b of built) {
    console.log(`  wrote plugins/${b.name}/ (${b.skills} skills, ${(b.bytes / 1048576).toFixed(1)}MB, ref ${b.ref.slice(0, 12)})`);
  }
  console.log("Done.");
}

main();
