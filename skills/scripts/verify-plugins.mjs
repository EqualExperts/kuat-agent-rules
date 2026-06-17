#!/usr/bin/env node
/**
 * Packaged-form verification for the Phase-3 plugin payloads under plugins/.
 *
 * Checks, per plugin:
 *  1. JSON validity (plugin.json, manifest.json) + required fields.
 *  2. No residual escape links in payload skills (../../, ../_shared, ../<skill>).
 *  3. Every ${CLAUDE_PLUGIN_ROOT}/... link in payload skills resolves to a real
 *     bundled file (simulate CLAUDE_PLUGIN_ROOT = plugins/<name>).
 *  4. reference/ snapshot: no internal broken links, no kuat-docs links.
 *  5. Payload skill body == source skill body modulo the link rewrite
 *     (proves the packaged skill behaves identically to the Phase-2-validated source).
 *
 * Also validates marketplace/ JSON. Exit 1 on any failure.
 *
 * Usage: node skills/scripts/verify-plugins.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SKILLS_DIR, "..");
const PLUGINS_DIR = path.join(REPO_ROOT, "plugins");
const MARKET_DIR = path.join(REPO_ROOT, "marketplace");
const PLUGIN_ROOT_TOKEN = "${CLAUDE_PLUGIN_ROOT}";

let failures = 0;
const fail = (m) => { console.log(`  FAIL: ${m}`); failures++; };
const ok = (m) => console.log(`  ok: ${m}`);

function mdFiles(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

function linkTargets(body) {
  const targets = [];
  const re = /\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(body))) targets.push(m[1]);
  return targets;
}

function validJson(p, requiredKeys = []) {
  try {
    const obj = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const k of requiredKeys) {
      if (!(k in obj)) { fail(`${path.relative(REPO_ROOT, p)} missing key '${k}'`); return null; }
    }
    return obj;
  } catch (e) {
    fail(`${path.relative(REPO_ROOT, p)} invalid JSON: ${e.message}`);
    return null;
  }
}

function verifyPlugin(name) {
  console.log(`\n[${name}]`);
  const root = path.join(PLUGINS_DIR, name);
  const skillsDir = path.join(root, "skills");

  // 1. manifests
  validJson(path.join(root, ".claude-plugin", "plugin.json"), ["name"]);
  validJson(path.join(root, "manifest.json"), ["plugin", "version", "reference"]);

  const skillMd = mdFiles(skillsDir);

  // 2. no residual escapes
  let escapes = 0;
  for (const f of skillMd) {
    for (const t of linkTargets(fs.readFileSync(f, "utf8"))) {
      if (/^(\.\.\/\.\.\/|\.\.\/_shared\/|\.\.\/(create|review)-)/.test(t)) {
        fail(`${path.relative(root, f)} still escapes: ${t}`); escapes++;
      }
    }
  }
  if (!escapes) ok(`no residual escape links (${skillMd.length} skill md)`);

  // 3. ${CLAUDE_PLUGIN_ROOT} links resolve under the plugin root
  let pr = 0, prBad = 0;
  for (const f of skillMd) {
    for (const t of linkTargets(fs.readFileSync(f, "utf8"))) {
      if (!t.startsWith(PLUGIN_ROOT_TOKEN)) continue;
      pr++;
      const rel = t.slice(PLUGIN_ROOT_TOKEN.length).replace(/^\//, "").replace(/#.*$/, "");
      if (!fs.existsSync(path.join(root, rel))) { fail(`${path.relative(root, f)} -> ${t} (missing)`); prBad++; }
    }
  }
  if (!prBad) ok(`all ${pr} \${CLAUDE_PLUGIN_ROOT} links resolve`);

  // 4. reference snapshot integrity
  const refDir = path.join(root, "reference");
  let refBad = 0, kuatDocs = 0;
  for (const f of mdFiles(refDir)) {
    const body = fs.readFileSync(f, "utf8");
    for (const t of linkTargets(body)) {
      if (/kuat-docs/.test(t)) { kuatDocs++; continue; }
      if (/^(https?:|mailto:|\$\{)/.test(t)) continue;
      const target = path.join(path.dirname(f), t.replace(/#.*$/, ""));
      if (!fs.existsSync(target)) { fail(`reference ${path.relative(refDir, f)} -> ${t} (broken)`); refBad++; }
    }
  }
  if (kuatDocs) fail(`${kuatDocs} kuat-docs link(s) survived in reference snapshot`);
  if (!refBad && !kuatDocs) ok(`reference snapshot: ${mdFiles(refDir).length} files, 0 broken / 0 kuat-docs links`);

  // 5. payload == source modulo link rewrite
  const skillNames = fs.readdirSync(skillsDir).filter((n) => n !== "_shared");
  let drift = 0;
  for (const s of skillNames) {
    const payload = fs.readFileSync(path.join(skillsDir, s, "SKILL.md"), "utf8");
    const source = fs.readFileSync(path.join(SKILLS_DIR, s, "SKILL.md"), "utf8");
    const skillAlt = skillNames.join("|");
    const norm = (x) => x
      // reverse target rewrites
      .replace(/\$\{CLAUDE_PLUGIN_ROOT\}\/reference\//g, "../../reference/")
      .replace(/\$\{CLAUDE_PLUGIN_ROOT\}\/skills\/_shared\//g, "../_shared/")
      .replace(/\$\{CLAUDE_PLUGIN_ROOT\}\/skills\//g, "../")
      // reverse label de-path rewrites
      .replace(/\[reference\//g, "[../../reference/")
      .replace(/\[skills\/_shared\//g, "[../_shared/")
      .replace(new RegExp(`\\[skills\\/(${skillAlt})\\/`, "g"), "[../$1/");
    if (norm(payload) !== source) { fail(`${s}/SKILL.md drifts from source beyond link rewrite`); drift++; }
  }
  if (!drift) ok(`${skillNames.length} skills identical to source modulo link rewrite`);

  // 6. asset pack (only bundles that ship one — e.g. kuat-studio)
  const assetsDir = path.join(root, "assets");
  if (fs.existsSync(assetsDir)) {
    const slides = path.join(assetsDir, "slides");
    const master = path.join(slides, "ee-master-2026.pptx");
    if (!fs.existsSync(master)) {
      fail("asset pack: ee-master-2026.pptx missing");
    } else {
      const mb = fs.statSync(master).size / 1048576;
      if (mb > 30) fail(`asset pack: master ${mb.toFixed(1)}MB exceeds 30MB guard`);
      else ok(`asset master present (${mb.toFixed(1)}MB)`);
    }
    const manifest = validJson(path.join(slides, "assets.manifest.json"), ["master", "layouts", "logo"]);
    if (manifest) {
      const refs = [];
      if (manifest.master?.file) refs.push(manifest.master.file);
      for (const v of Object.values(manifest.logo || {})) {
        if (v && typeof v === "object" && v.file) refs.push(v.file);
      }
      let bad = 0;
      for (const r of refs) {
        if (!fs.existsSync(path.join(slides, r))) { fail(`asset manifest -> ${r} (missing)`); bad++; }
      }
      if (!bad) ok(`asset manifest resolves (${refs.length} refs)`);
    }
  }
}

/**
 * Distribution guard (Phase 7): contributor skills live in .claude/skills/ and must NEVER
 * appear in a plugin payload. Derived from the live .claude/skills/ dir so it auto-covers
 * future contributor skills. Also asserts no `.claude` path leaked into any payload.
 */
function verifyNoContributorLeak() {
  console.log(`\n[distribution guard]`);
  const claudeSkillsDir = path.join(REPO_ROOT, ".claude", "skills");
  const contributorSkills = fs.existsSync(claudeSkillsDir)
    ? fs.readdirSync(claudeSkillsDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
    : [];
  let leaks = 0;
  const hasClaudePath = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === ".claude") return true;
      if (e.isDirectory() && hasClaudePath(path.join(dir, e.name))) return true;
    }
    return false;
  };
  for (const name of fs.readdirSync(PLUGINS_DIR)) {
    const root = path.join(PLUGINS_DIR, name);
    if (!fs.statSync(root).isDirectory()) continue;
    const skillsDir = path.join(root, "skills");
    for (const s of contributorSkills) {
      if (fs.existsSync(path.join(skillsDir, s))) { fail(`contributor skill '${s}' leaked into ${name} payload`); leaks++; }
    }
    if (hasClaudePath(root)) { fail(`a .claude/ path leaked into ${name} payload`); leaks++; }
  }
  if (!leaks) ok(`no contributor skill leaked into any payload (${contributorSkills.length} repo-local skills kept out)`);
}

function verifyMarketplace() {
  console.log(`\n[marketplace]`);
  const mp = validJson(path.join(MARKET_DIR, ".claude-plugin", "marketplace.json"), ["name", "owner", "plugins"]);
  if (mp) {
    const noVersion = mp.plugins.every((p) => !("version" in p));
    if (noVersion) ok(`${mp.plugins.length} entries, none set 'version' (channel version comes from each ref's plugin.json)`);
    else fail(`a marketplace entry sets 'version' — beta/stable would collide`);
    for (const p of mp.plugins) {
      if (!p.name || !p.source) fail(`entry missing name/source: ${JSON.stringify(p)}`);
    }
  }
  for (const f of ["org-wide.json", "engineering.json", "pilot-beta.json"]) {
    validJson(path.join(MARKET_DIR, "managed-settings", f));
  }
  ok("managed-settings JSON valid");
}

function main() {
  for (const name of fs.readdirSync(PLUGINS_DIR)) {
    if (fs.statSync(path.join(PLUGINS_DIR, name)).isDirectory()) verifyPlugin(name);
  }
  verifyNoContributorLeak();
  verifyMarketplace();
  console.log(failures ? `\nFAILED: ${failures} issue(s)` : `\nALL CHECKS PASSED`);
  process.exit(failures ? 1 : 0);
}

main();
