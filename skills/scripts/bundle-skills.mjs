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

// Two kinds of bundle:
// - legacy intent skills (kuat-review/kuat-create): use {{include:...}} directives in source.
// - standalone activity skills (kuat-figma-*): plugin-convention sources (plain relative links);
//   the bundler appends each `inline` file as a "Shared: <name>" section and rewrites links to it,
//   then unlinks any remaining relative .md links (single-file surfaces can't resolve them).
// craft.md (composition principles + density table + observer tests) is inlined into every
// Figma bundle: these surfaces are single-file uploads with no guaranteed rules source, and
// the craft content is the point of these skills — it must not live only behind {RULES_DIR}.
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
const SKILLS = [
  { id: "kuat-review", source: "kuat-review/SKILL.md" },
  { id: "kuat-create", source: "kuat-create/SKILL.md" },
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
  },
  { id: "kuat-figma-prototype", source: "kuat-figma-prototype/SKILL.md", standalone: true, inline: FIGMA_SHARED },
  { id: "kuat-figma-review-design", source: "kuat-figma-review-design/SKILL.md", standalone: true, inline: FIGMA_REVIEW_SHARED },
  { id: "kuat-figma-make", source: "kuat-figma-make/SKILL.md", standalone: true, inline: FIGMA_SHARED },
  { id: "kuat-figma-review-make", source: "kuat-figma-review-make/SKILL.md", standalone: true, inline: FIGMA_REVIEW_SHARED },
];
const FIGMA_SKILL_IDS = SKILLS.filter((s) => s.standalone).map((s) => s.id);

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

  const built = SKILLS.map(bundleSkill);
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
    ensureRulesScript: "scripts/ensure-rules.sh",
    usage: {
      uploadOnlyTools:
        "Upload the dist/<skill>/SKILL.md files you need (each self-contained). Figma surfaces: the kuat-figma-* skills. Claude Projects: kuat-create/kuat-review.",
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

| Artifact | Use |
|----------|-----|
${SKILLS.map(({ id, standalone }) => `| [${id}/SKILL.md](./${id}/SKILL.md) | ${standalone ? "Upload to the Figma agent (Design files) or Figma Make custom skills" : "Upload to Claude Projects and other single-file tools"} |`).join("\n")}
| [manifest.json](./manifest.json) | Version and rules ref for installers |
| [scripts/ensure-rules.sh](./scripts/ensure-rules.sh) | Keep rules fresh (filesystem tools) |

Rules standards remain in the \`reference/\` library — not embedded in bundles.

Built against rules ref: \`${rulesRef}\`
`
  );

  console.log(`  rules-ref: ${rulesRef}`);
  for (const { id, file } of built) {
    console.log(`  wrote dist/${file}`);
  }
  console.log("  wrote dist/manifest.json");
  console.log("Done.");
}

main();
