# Scan modes

The skill supports four scan modes. Pick the smallest one that fits — every
mode shares the same detectors, the same Issue schema, and the same reviewer
agent; they differ only in the file set fed to the detectors.

| Mode | Use when | Invocation |
|---|---|---|
| `full` | full-project audit, periodic health check, big refactor planning | `--mode full` |
| `branch-diff` | reviewing your own branch before opening a PR | `--mode branch-diff --base origin/main` |
| `pr` | reviewing a teammate's PR | `--mode pr --pr 123` |
| `single-file` | spot-check or "is this file OK" | `--mode single-file --files src/foo.ts` |

## What changes per mode

| | full | branch-diff | pr | single-file |
|---|---|---|---|---|
| File set | tsc `--listFiles` | `git diff --name-only base...HEAD` | `gh pr view` then base..HEAD | `--files` argument |
| Line filter | none | hunk ranges +/- 3 lines | hunk ranges +/- 3 lines | none |
| Whole-file detectors (knip, madge, jscpd) | run once on whole project, results filtered to in-scope files | same | same | same |
| Per-file detectors (ast, placeholders, comments, tests, security, bundle, naming) | every file in scope | only changed files | only changed files | only listed files |

The whole-file tools (knip, madge, jscpd) run against the whole project even
in diff modes — they have to, otherwise we miss cross-file consequences. We
then filter their findings down to the changed files so the report stays
focused.

## branch-diff mode in detail

```
npx ts-node scripts/scan.ts --mode branch-diff --base origin/main
```

- `git diff --name-only origin/main...HEAD` defines the file set.
- For each changed file, `git diff --unified=0` extracts hunk line ranges.
- Issues whose `line` is outside any hunk +/- 3 lines are dropped.
- Whole-file issues (no `line`) are kept if the file is in the changed set.

The `+/- 3` window catches "I changed line 50 and broke something at line
47", which is common when changes touch adjacent control flow.

## pr mode in detail

```
npx ts-node scripts/scan.ts --mode pr --pr 123
```

Requires `gh` CLI. It resolves the PR's base branch (e.g. `main`) and then
runs branch-diff against `origin/<baseRefName>...HEAD`. If `gh` is not
available or the PR cannot be read, falls back to `origin/main`.

This mode does NOT check out the PR branch — it assumes you have already
checked out the head locally. If you have not, the diff range is wrong and
the report will be empty or misleading. Check out first, scan second.

## single-file mode in detail

```
npx ts-node scripts/scan.ts --mode single-file --files src/foo.ts src/bar.ts
```

The cheapest mode. Skips whole-file tools entirely unless you opt in with
`--detectors knip,madge,...`. Useful for:

- "Quick check this one file before I commit"
- Investigating a specific reviewer complaint
- Iterating fast while fixing a single hotspot

## Choosing whole-file detectors in diff modes

By default diff modes still run knip/madge/jscpd because cross-file
consequences are exactly what diff reviewers miss. To skip them (faster,
narrower scope):

```
npx ts-node scripts/scan.ts --mode branch-diff --base origin/main \
  --detectors typecheck,ast,placeholders,comments,tests,security,bundle
```

Use this when you trust that your branch didn't move imports around.
