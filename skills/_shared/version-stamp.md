# Version stamp (shared)

Stamp every deliverable with the reference version it was produced/reviewed against, so output is traceable to a known rule set. Carry forward the `RULES_REF` citation habit from the legacy skills.

## What to record

| Field | Source |
|-------|--------|
| `reference ref` | Git SHA of this `kuat-agent-rules` checkout (`git rev-parse --short HEAD`), or the plugin/package version when consumed via a release |
| `package version` | Installed `@equal-experts/kuat-react` / `kuat-vue` version, when building against published components |
| `date` | Date the artifact was produced or reviewed |

## How to surface it

- **Create:** add a small footer / note on the deliverable, e.g. `EE reference <ref> · <date>`.
- **Review:** include the ref in the **References** section of the report alongside the reference files cited.

If a shell is unavailable and no release version is known, state `reference ref: unknown (local working copy)` rather than omitting it.
