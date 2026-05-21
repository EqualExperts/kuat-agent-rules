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

const SKILLS = [
  { id: "kuat-review", source: "kuat-review/SKILL.md" },
  { id: "kuat-create", source: "kuat-create/SKILL.md" },
];

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
  out = out.replace(
    /\]\(\.\.\/\.\.\/kuat-docs\/rules\/LOADING\.md\)/g,
    "]({RULES_DIR}/LOADING.md)"
  );
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
    /\]\(\.\.\/scripts\/README\.md\)/g,
    "](skills/scripts/README.md in rules repo)"
  );

  // Source-only cross-skill links
  out = out.replace(
    /\[references\/report-formats\.md\]\(\.\/references\/report-formats\.md\)/g,
    "Report formats (included below)"
  );
  out = out.replace(
    /follow \[references\/report-formats\.md\]\(\.\/references\/report-formats\.md\)/gi,
    "follow **Reference: Report formats** below"
  );
  out = out.replace(
    /see \[references\/report-formats\.md\]\(\.\/references\/report-formats\.md\)/gi,
    "see **Reference: Report formats** below"
  );
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

function bundleSkill({ id, source }) {
  const sourcePath = path.join(SKILLS_DIR, source);
  const raw = read(sourcePath);
  const { frontmatter, body } = extractFrontmatter(raw);

  let bundledBody = expandIncludes(body);
  bundledBody = rewriteBundledMarkdown(bundledBody, id);

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
      loadingPath: "kuat-docs/rules/LOADING.md",
      builtAtRef: rulesRef,
    },
    skills: Object.fromEntries(
      built.map(({ id, file, sha256: hash }) => [id, { file, sha256: hash }])
    ),
    ensureRulesScript: "scripts/ensure-rules.sh",
    usage: {
      uploadOnlyTools:
        "Upload dist/kuat-review/SKILL.md and/or dist/kuat-create/SKILL.md (self-contained).",
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
| [kuat-review/SKILL.md](./kuat-review/SKILL.md) | Upload to Claude Projects, Figma Make, other single-file tools |
| [kuat-create/SKILL.md](./kuat-create/SKILL.md) | Upload to Claude Projects, Figma Make, other single-file tools |
| [manifest.json](./manifest.json) | Version and rules ref for installers |
| [scripts/ensure-rules.sh](./scripts/ensure-rules.sh) | Keep rules fresh (filesystem tools) |

Rules standards remain in \`kuat-docs/rules/\` — not embedded in bundles.

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
