#!/usr/bin/env node
/**
 * check-reference — the gate for changes to the passive reference library.
 *
 * Four checks (the things an out-of-phase reference edit has slipped past before):
 *   1. PASSIVE TEST   — reference states the WHAT; it carries no procedure. Flags the
 *                       clear procedure markers (checklists, "before you create/review",
 *                       Step-N headings, role cards, the retired loading taxonomy).
 *   2. LINK INTEGRITY — every relative markdown link in a scanned file resolves.
 *   3. STRUCTURE      — `patterns/` is a per-medium concept: it may only live at
 *                       reference/media-types/<medium>/patterns/, never elsewhere.
 *   4. TOKEN DRIFT    — colours.md must match the token SoT (delegates to tokens:check).
 *
 * This is a CHANGE gate, not a corpus linter. Scope of the passive + link checks:
 *   - explicit file args ......... check exactly those (use in the eval / targeted runs)
 *   - --all ...................... scan every reference/**.md (surfaces legacy debt; not the merge gate)
 *   - (default) ................. reference/*.md changed vs the base branch (git); the review gate
 * Structure + token-drift always run repo-wide (they are global invariants).
 *
 * Usage:  node skills/scripts/check-reference.mjs [--all] [file ...]
 * Exit 1 on any failure.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const REFERENCE_DIR = path.join(REPO_ROOT, "reference");

// Meta files that DESCRIBE the passive/skill boundary (they quote the markers in prose)
// or record old procedure paths — exempt from the passive scan.
const PASSIVE_SKIP = new Set(["reference/README.md", "reference/MIGRATION-MAP.md"]);

let failures = 0;
const fail = (m) => { console.log(`  FAIL: ${m}`); failures++; };
const ok = (m) => console.log(`  ok: ${m}`);
const rel = (p) => path.relative(REPO_ROOT, p);

function allRefMd() {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === ".DS_Store") continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  walk(REFERENCE_DIR);
  return out;
}

/** reference/*.md changed vs the base branch (committed diff + uncommitted + untracked). */
function changedRefMd() {
  const git = (args) => {
    const r = spawnSync("git", args, { cwd: REPO_ROOT, encoding: "utf8" });
    return r.status === 0 ? r.stdout.trim() : null;
  };
  let base = null;
  for (const ref of ["origin/main", "main"]) {
    const mb = git(["merge-base", "HEAD", ref]);
    if (mb) { base = mb; break; }
  }
  if (base == null) return null; // not a git repo / no base — caller falls back to --all
  const names = new Set();
  const tracked = git(["diff", "--name-only", "--diff-filter=d", base, "--", "reference"]);
  const untracked = git(["ls-files", "--others", "--exclude-standard", "--", "reference"]);
  for (const block of [tracked, untracked]) {
    if (!block) continue;
    for (const line of block.split("\n")) {
      if (line.endsWith(".md")) names.add(path.join(REPO_ROOT, line));
    }
  }
  return [...names];
}

// --- 1. PASSIVE TEST -------------------------------------------------------
// High-precision procedure markers. Reference = WHAT (passive); procedure = a skill.
const PROCEDURE_MARKERS = [
  { re: /^\s*[-*]\s*\[[ xX]\]\s/, label: "checklist item ('- [ ]') — checklists are procedure, move to a skill" },
  { re: /^#{1,6}\s+.*\bbefore you (create|review)\b/i, label: "'before you create/review' heading — procedure, move to a skill" },
  { re: /^#{1,6}\s*step\s+\d/i, label: "'Step N' heading — numbered procedure, move to a skill" },
  { re: /\brole card\b/i, label: "role card — procedure, move to a skill" },
  { re: /\bLOADING\.md\b/, label: "reference to the retired global LOADING taxonomy" },
  { re: /\|[^|\n]*\btask\b[^|\n]*\|[^|\n]*\b(files?|load)\b/i, label: "task→files loading table — retired taxonomy, move to per-skill loading" },
];

function passiveTest(files) {
  let hits = 0, scanned = 0;
  for (const f of files) {
    if (PASSIVE_SKIP.has(rel(f))) continue;
    scanned++;
    const lines = fs.readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const m of PROCEDURE_MARKERS) {
        if (m.re.test(line)) { fail(`passive test — ${rel(f)}:${i + 1} — ${m.label}`); hits++; }
      }
    });
  }
  if (!hits) ok(`passive test: ${scanned} file(s) carry no procedure markers`);
}

// --- 2. LINK INTEGRITY -----------------------------------------------------
function linkIntegrity(files) {
  let bad = 0, n = 0;
  const re = /\]\(([^)]+)\)/g;
  for (const f of files) {
    const body = fs.readFileSync(f, "utf8");
    let m;
    while ((m = re.exec(body))) {
      const t = m[1].trim();
      if (/^(https?:|mailto:|#|\$\{)/.test(t)) continue;
      n++;
      const target = path.resolve(path.dirname(f), t.replace(/#.*$/, ""));
      if (!fs.existsSync(target)) { fail(`broken link — ${rel(f)} -> ${t}`); bad++; }
    }
  }
  if (!bad) ok(`link integrity: ${n} relative link(s) resolve`);
}

// --- 3. STRUCTURE ----------------------------------------------------------
function structure() {
  let bad = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const p = path.join(d, e.name);
      if (e.name === "patterns") {
        const parent = path.dirname(p);   // .../<medium>  OR  reference/ (shared layer)
        const grand = path.dirname(parent); // .../media-types
        // Two legal homes: the shared cross-medium concepts layer (reference/patterns/)
        // and a medium's own patterns (reference/media-types/<medium>/patterns/).
        const sharedLayer = parent === REFERENCE_DIR;
        const mediumLayer = path.basename(grand) === "media-types" && path.dirname(grand) === REFERENCE_DIR;
        if (!sharedLayer && !mediumLayer) {
          fail(`structure — '${rel(p)}' : patterns/ may only live at reference/patterns/ (shared concepts) or reference/media-types/<medium>/patterns/`);
          bad++;
        }
      }
      walk(p);
    }
  };
  walk(REFERENCE_DIR);
  if (!bad) ok("structure: patterns/ only at reference/patterns/ or media-types/<medium>/");
}

// --- 4. TOKEN DRIFT --------------------------------------------------------
function tokenDrift() {
  const r = spawnSync("node", [path.join(__dirname, "generate-tokens.mjs"), "--check"], { encoding: "utf8" });
  if (r.status === 0) ok("token drift: colours.md matches the token SoT");
  else { process.stdout.write(r.stdout || ""); process.stderr.write(r.stderr || ""); fail("token drift: colours.md is out of sync (run npm run tokens:generate)"); }
}

function main() {
  const argv = process.argv.slice(2);
  const all = argv.includes("--all");
  const fileArgs = argv.filter((a) => !a.startsWith("-"));

  let files, scope;
  if (fileArgs.length) {
    files = fileArgs.map((a) => path.resolve(REPO_ROOT, a)).filter((p) => p.endsWith(".md"));
    scope = `${files.length} file(s) (explicit)`;
  } else if (all) {
    files = allRefMd();
    scope = `all ${files.length} reference/**.md`;
  } else {
    const changed = changedRefMd();
    if (changed == null) { files = allRefMd(); scope = `all ${files.length} (no git base — fell back to --all)`; }
    else { files = changed; scope = `${files.length} changed reference file(s) vs base branch`; }
  }

  console.log(`check-reference — ${scope}`);
  passiveTest(files);
  linkIntegrity(files);
  structure();
  tokenDrift();
  console.log(failures ? `\nFAILED: ${failures} issue(s)` : `\nALL REFERENCE CHECKS PASSED`);
  process.exit(failures ? 1 : 0);
}

main();
