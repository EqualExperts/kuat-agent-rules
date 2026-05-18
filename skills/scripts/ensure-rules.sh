#!/usr/bin/env bash
# Resolve Equal Experts rules repo root and verify freshness.
# Usage: ./skills/scripts/ensure-rules.sh
# Output (stdout): RULES_ROOT=... RULES_DIR=... RULES_REF=...
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DEFAULT_RULES_ROOT="$(cd "${SKILLS_DIR}/.." && pwd)"

loading_path() {
  local root="$1"
  [[ -f "${root}/kuat-docs/rules/LOADING.md" ]]
}

canonical_root() {
  cd "$1" && pwd
}

resolve_rules_root() {
  local candidate="" line="" git_root=""

  if loading_path "${DEFAULT_RULES_ROOT}"; then
    canonical_root "${DEFAULT_RULES_ROOT}"
    return 0
  fi

  if [[ -n "${KUAT_RULES_PATH:-}" ]]; then
    candidate="${KUAT_RULES_PATH}"
    if loading_path "${candidate}"; then
      canonical_root "${candidate}"
      return 0
    fi
    echo "ensure-rules: KUAT_RULES_PATH is set but kuat-docs/rules/LOADING.md not found: ${candidate}" >&2
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
        if loading_path "${candidate}"; then
          canonical_root "${candidate}"
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
      if loading_path "${candidate}"; then
        canonical_root "${candidate}"
        return 0
      fi
    done
  done

  echo "ensure-rules: could not resolve rules repo. Set KUAT_RULES_PATH or add .kuat-rules-path. See skills/README.md" >&2
  return 1
}

RULES_ROOT="$(resolve_rules_root)"
RULES_DIR="${RULES_ROOT}/kuat-docs/rules"

if [[ -d "${RULES_ROOT}/.git" ]]; then
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
