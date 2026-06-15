#!/usr/bin/env bash
# Resolve Equal Experts rules root and verify freshness.
# Usage: ./skills/scripts/ensure-rules.sh
# Output (stdout): RULES_ROOT, RULES_DIR, RULES_REF, RULES_SOURCE, optional OVERLAY_*, PACKAGE_VERSION
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEFAULT_RULES_ROOT="$(cd "${SKILLS_DIR}/.." && pwd)"

RULES_SOURCE="git"
PACKAGE_VERSION=""

git_rules_path() {
  local root="$1"
  # Phase 2: the passive reference library is the git rules root marker.
  [[ -f "${root}/reference/README.md" ]]
}

package_agent_docs_path() {
  local pkg_root="$1"
  [[ -f "${pkg_root}/agent-docs/rules/LOADING-consumer.md" ]] || \
    [[ -f "${pkg_root}/agent-docs/manifest.json" ]]
}

canonical_path() {
  cd "$1" && pwd
}

resolve_git_rules_root() {
  local candidate="" line="" git_root=""

  if git_rules_path "${DEFAULT_RULES_ROOT}"; then
    canonical_path "${DEFAULT_RULES_ROOT}"
    return 0
  fi

  if [[ -n "${KUAT_RULES_PATH:-}" ]]; then
    candidate="${KUAT_RULES_PATH}"
    if git_rules_path "${candidate}"; then
      canonical_path "${candidate}"
      return 0
    fi
    if package_agent_docs_path "${candidate}"; then
      canonical_path "${candidate}"
      RULES_SOURCE="package"
      return 0
    fi
    echo "ensure-rules: KUAT_RULES_PATH set but no reference/ library or package agent-docs found: ${candidate}" >&2
    return 1
  fi

  for search_root in "${PWD}" "$(git rev-parse --show-toplevel 2>/dev/null || true)"; do
    [[ -n "${search_root}" && -d "${search_root}" ]] || continue
    if [[ -f "${search_root}/.kuat-rules-path" ]]; then
      line="$(head -n 1 "${search_root}/.kuat-rules-path" | tr -d '\r\n')"
      if [[ -n "${line}" ]]; then
        if [[ "${line}" != /* ]]; then
          candidate="$(cd "${search_root}" && cd "$(dirname "${line}")" 2>/dev/null && pwd)/$(basename "${line}")"
        else
          candidate="${line}"
        fi
        if git_rules_path "${candidate}"; then
          canonical_path "${candidate}"
          return 0
        fi
        if package_agent_docs_path "${candidate}"; then
          canonical_path "${candidate}"
          RULES_SOURCE="package"
          return 0
        fi
      fi
    fi
  done

  git_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
  for rel in kuat-agent-docs vendor/kuat-agent-docs ../kuat-agent-docs; do
    for base in "${PWD}" "${git_root}"; do
      [[ -n "${base}" && -d "${base}" ]] || continue
      candidate="${base}/${rel}"
      if git_rules_path "${candidate}"; then
        canonical_path "${candidate}"
        return 0
      fi
    done
  done

  if git_rules_path "${SKILLS_DIR}/.."; then
    canonical_path "$(cd "${SKILLS_DIR}/.." && pwd)"
    return 0
  fi

  return 1
}

resolve_package_rules_root() {
  local dir="${PWD}" pkg="" nm=""
  while [[ "${dir}" != "/" ]]; do
    nm="${dir}/node_modules"
    if [[ -d "${nm}" ]]; then
      for pkg in "@equal-experts/kuat-react" "@equal-experts/kuat-vue" "@equal-experts/kuat-core"; do
        if package_agent_docs_path "${nm}/${pkg}"; then
          canonical_path "${nm}/${pkg}"
          RULES_SOURCE="package"
          return 0
        fi
      done
    fi
    dir="$(dirname "${dir}")"
  done
  return 1
}

RULES_ROOT=""
if RULES_ROOT="$(resolve_git_rules_root 2>/dev/null)"; then
  :
elif RULES_ROOT="$(resolve_package_rules_root 2>/dev/null)"; then
  :
else
  echo "ensure-rules: could not resolve rules. Set KUAT_RULES_PATH, add .kuat-rules-path, or install @equal-experts/kuat-react. See skills/README.md" >&2
  exit 1
fi

if [[ "${RULES_SOURCE}" == "package" ]]; then
  RULES_DIR="${RULES_ROOT}/agent-docs/rules"
else
  RULES_DIR="${RULES_ROOT}/reference"
fi

if [[ "${RULES_SOURCE}" == "package" ]]; then
  manifest="${RULES_ROOT}/agent-docs/manifest.json"
  if [[ -f "${manifest}" ]] && command -v node >/dev/null 2>&1; then
    RULES_REF="$(node -e "
      const m = require(process.argv[1]);
      console.log(m.rules?.snapshotRef || m.rules?.builtAtRef || 'unknown');
    " "${manifest}" 2>/dev/null || echo "unknown")"
    PACKAGE_VERSION="$(node -e "
      const m = require(process.argv[1]);
      console.log(m.packageVersion || m.version || '');
    " "${manifest}" 2>/dev/null || true)"
  else
    RULES_REF="package-bundle"
  fi
elif [[ -d "${RULES_ROOT}/.git" ]]; then
  git -C "${RULES_ROOT}" fetch --quiet 2>/dev/null || true

  if [[ -n "${KUAT_RULES_REF:-}" ]]; then
    if [[ "${KUAT_RULES_UPDATE:-0}" == "1" ]]; then
      git -C "${RULES_ROOT}" checkout "${KUAT_RULES_REF}" --quiet 2>/dev/null || {
        echo "ensure-rules: failed to checkout KUAT_RULES_REF=${KUAT_RULES_REF}" >&2
        exit 1
      }
    else
      current="$(git -C "${RULES_ROOT}" rev-parse HEAD 2>/dev/null || echo unknown)"
      target="$(git -C "${RULES_ROOT}" rev-parse "${KUAT_RULES_REF}" 2>/dev/null || echo "")"
      if [[ -n "${target}" && "${current}" != "${target}" ]]; then
        echo "ensure-rules: warning: HEAD (${current:0:7}) != KUAT_RULES_REF (${target:0:7}). Set KUAT_RULES_UPDATE=1 to checkout." >&2
      fi
    fi
  elif [[ "${KUAT_RULES_UPDATE:-0}" == "1" ]]; then
    branch="$(git -C "${RULES_ROOT}" rev-parse --abbrev-ref HEAD 2>/dev/null || echo HEAD)"
    if [[ "${branch}" != "HEAD" ]]; then
      git -C "${RULES_ROOT}" pull --ff-only --quiet 2>/dev/null || \
        echo "ensure-rules: warning: git pull failed; using current HEAD" >&2
    fi
  else
    upstream="$(git -C "${RULES_ROOT}" rev-parse --abbrev-ref '@{upstream}' 2>/dev/null || true)"
    if [[ -n "${upstream}" ]]; then
      behind="$(git -C "${RULES_ROOT}" rev-list --count "HEAD..@{upstream}" 2>/dev/null || echo 0)"
      if [[ "${behind}" != "0" ]]; then
        echo "ensure-rules: warning: rules repo is ${behind} commit(s) behind ${upstream}. Set KUAT_RULES_UPDATE=1 to pull." >&2
      fi
    fi
  fi

  RULES_REF="$(git -C "${RULES_ROOT}" rev-parse HEAD 2>/dev/null || echo unknown)"
else
  RULES_REF="non-git"
fi

echo "RULES_ROOT=${RULES_ROOT}"
echo "RULES_DIR=${RULES_DIR}"
echo "RULES_REF=${RULES_REF}"
echo "RULES_SOURCE=${RULES_SOURCE}"

if [[ -n "${PACKAGE_VERSION}" ]]; then
  echo "PACKAGE_VERSION=${PACKAGE_VERSION}"
fi

if [[ -n "${KUAT_RULES_OVERLAY_PATH:-}" ]]; then
  overlay="${KUAT_RULES_OVERLAY_PATH}"
  if [[ -d "${overlay}" ]]; then
    echo "OVERLAY_DIR=${overlay}"
    if [[ -f "${overlay}/components.manifest.json" ]]; then
      echo "COMPONENT_MANIFEST=${overlay}/components.manifest.json"
    elif [[ -f "${overlay}/agent-docs/components.manifest.json" ]]; then
      echo "COMPONENT_MANIFEST=${overlay}/agent-docs/components.manifest.json"
    fi
  else
    echo "ensure-rules: warning: KUAT_RULES_OVERLAY_PATH is not a directory: ${overlay}" >&2
  fi
fi
