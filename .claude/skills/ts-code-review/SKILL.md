---
name: ts-code-review
description: >
  Review, audit, or clean any TypeScript / TSX codebase by combining deterministic static
  analysis (knip, madge, ts-morph, eslint, jscpd, git churn) with LLM semantic judgement,
  then emit a prioritized fix plan grounded in file:line evidence. Trigger whenever the user
  wants to: review a PR or branch diff, audit a release candidate, find dead code or
  circular deps, surface placeholder / TODO / `as any` debt, simplify over-engineered types,
  detect duplicate or zombie code, plan a refactor, or just asks "is this code OK", "this
  codebase is getting messy", "what should I clean up first", or "我们这个项目越来越复杂了".
  Especially valuable when prior LLM-only reviews kept missing issues or proposing
  over-engineered refactors — the tool-first pipeline anchors the model to evidence and
  constrains it toward deletion over restructuring. Supports four modes: full-project
  audit, branch-diff, PR review, and single-file spot-check.
---

# TypeScript Code Review

Core principle: **tools detect, LLM decides**. Detectors emit `Issue[]` against
a shared schema. The reviewer agent triages — it never re-discovers what the
detectors already found.

## Pick a mode

| Mode | Use when | Command |
|---|---|---|
| `full` | full-project audit, periodic health check, refactor planning | `--mode full` |
| `branch-diff` | self-review before opening a PR | `--mode branch-diff --base origin/main` |
| `pr` | reviewing a teammate's PR | `--mode pr --pr 123` (needs `gh`) |
| `single-file` | spot-check, "is this file OK" | `--mode single-file --files src/foo.ts` |

Whole-file detectors (knip, madge, jscpd) always run against the whole project
even in diff modes — cross-file consequences are exactly what diff reviewers
miss. Results then get filtered to the changed files.

Read `references/modes.md` for the detailed contract per mode.

## Pipeline

```
1. scan.ts     -> review-report.json     (detectors emit Issue[])
2. priority.ts -> priority-report.json   (impact x risk per file)
3. reviewer    -> verdicts + applyOrder  (the single LLM call)
4. report.ts   -> review-report.md       (human-readable)
5. validate.ts                            (gate any applied fixes)
```

Steps 1, 2, 4, 5 are deterministic Node scripts. Step 3 is the only LLM in
the loop.

## Step 1 — Scan

```
npx ts-node scripts/scan.ts --mode <mode> [args]
```

Loads project context (stack, conventions, file set, diff range), runs every
applicable detector, writes `review-report.json`. The report contains:

- `issues: Issue[]` — flat list, shared schema, every issue tagged with its
  `detector` and a `confidence` 0..1.
- `baseline` — metric snapshot for `validate.ts` to compare against later.
- `conventions` — markdown extracted from `CLAUDE.md` / `AGENTS.md` /
  `.cursorrules` etc., for injection into the reviewer prompt.
- `stack` — what was detected (react / vue / nest / next / vite / monorepo).
- `diffRange` — present in branch-diff / pr modes.

Detectors self-disable when their tool is missing. See
`references/tool-setup.md` for installation; see `references/detectors.md`
for the inventory and how to add new ones.

## Step 2 — Priority

```
npx ts-node scripts/priority.ts [--coverage coverage-final.json]
```

Scores every file with findings by `impact x risk`. Components renormalise
when one is unavailable (e.g. no coverage) so absent inputs do not silently
pull all scores toward zero. Outputs `priority-report.json` with `tier:
high | medium | low`.

The reviewer should look at `high` first, `medium` next, and skip `low`
unless the project is small.

## Step 3 — Reviewer (the LLM)

Feed `review-report.json` + trimmed source context to the reviewer agent
defined in `agents/reviewer.md`. It returns:

- `verdicts[]` — one decision per input issue (delete / keep / fix /
  insufficient-context / ...). Verdict enum is keyed by `IssueKind`.
- `applyOrder[]` — indices in safe execution order: deletions first,
  type-only second, imports third, behaviour-changes last.
- `summary` — short markdown for the human.

Read `agents/shared.md` first (input/output schema, universal constraints).
Read `references/prompts.md` for how to assemble the prompt — context
trimming, batching by file, prompt caching, token budgets.

The reviewer is one agent doing three jobs. The original four-agent design
(analyzer / planner / fixer / reviewer) was overkill for review-only flows;
auto-fix orchestration is documented in `references/orchestration.md` for
the rare cases that need it.

## Step 4 — Report

```
npx ts-node scripts/report.ts [--top 15]
```

Renders `review-report.json` + `priority-report.json` into
`review-report.md` — grouped by file, sorted by tier, with the reviewer's
summary up top. This is what a human reads in a PR comment or wiki.

## Step 5 — Validate (only if applying fixes)

```
npx ts-node scripts/validate.ts [--allow src/foo.ts src/bar.ts] [--skip-build] [--skip-tests]
```

Stronger than a count comparison. Checks:

1. `tsc --noEmit` — error count not above baseline.
2. **Build smoke** — `npm run build` if a build script exists.
3. **Test inventory** — total `it()`/`test()` count must not decrease
   (catches `.skip` cheats).
4. **Diff-scope guard** — `--allow` restricts which paths a fix may touch;
   out-of-scope changes are rejected.
5. **Dead-export delta** — knip count not above baseline.

Exits non-zero on any failure so an orchestrator can revert. On success,
rolls the baseline forward.

## Quick-start decision tree

```
What does the user want?

  "review this PR"            -> pr mode               (gh pr view, branch-diff)
  "before I push my branch"   -> branch-diff mode
  "is this file OK"           -> single-file mode
  "clean up the project"      -> full mode + priority + multi-pass
  "find the dead code"        -> full mode, --detectors knip,madge
  "untangle circular deps"    -> full mode, --detectors madge,ast
  "audit `as any` debt"       -> full mode, --detectors ast,typecheck
```

For full audits with many findings, run a multi-pass strategy
(see `references/orchestration.md` "Multi-pass strategy"):
delete dead code first, types second, quality third. Each pass re-scans;
many downstream findings disappear after deletion.

## Project conventions

Before calling the reviewer, the skill auto-extracts hard rules from
`CLAUDE.md` / `AGENTS.md` / `.cursorrules` / `CONTRIBUTING.md` and injects
them into the prompt as `<project-conventions>`. The reviewer treats them
as binding — if a generic best practice conflicts with the project's own
rules, the project wins.

Read `references/conventions-loader.md` to tune what counts as a rule.

## Bundled resources

```
ts-code-review/
  SKILL.md                          (this file)
  agents/
    shared.md                       (Issue / Verdict schema + universal rules)
    reviewer.md                     (the only required agent)
  references/
    modes.md                        (per-mode behaviour)
    detectors.md                    (inventory + adding new detectors)
    prompts.md                      (how to build the reviewer prompt)
    tool-setup.md                   (every external tool, installation)
    orchestration.md                (review-only vs assisted-fix vs full-auto)
    conventions-loader.md           (where project rules come from)
  scripts/
    scan.ts                         (Node, cross-platform)
    priority.ts
    validate.ts
    report.ts
    context.ts                      (stack detect + file set + diff + conventions)
    util.ts
    types.ts                        (shared Issue / Verdict types)
    detectors/
      index.ts                      (registry + diff-mode filtering)
      knip.ts madge.ts typecheck.ts jscpd.ts eslint.ts
      ast.ts placeholders.ts comments.ts tests.ts
      security.ts bundle.ts naming.ts
    posix/                          (legacy bash scripts; do not use on Windows)
  evals/
    evals.json                      (5 trigger + execution prompts)
    trigger-eval.json               (20 queries for description optimisation)
    fixtures/                       (add reproducible test projects here)
  assets/
    report-template.md
```

## Common pitfalls

- **Asking the LLM to find problems**: the detectors already found them.
  Feed the structured report; never ask the LLM to re-scan files.
- **Running with no conventions block**: generic best practices will fight
  your project's actual rules. Make sure `CLAUDE.md` or similar exists.
- **Running auto-fix on `main`**: always use a `review/<date>` branch.
- **Skipping validate.ts**: a test that no longer exists is not a test
  that passes. `validate.ts` is the only guard against silent regressions.
- **Deleting `as any` without checking the inferred type**: some `as any`
  guards real type holes; the reviewer agent should propose the concrete
  replacement, not just remove the cast.
- **Merging duplicates before deleting dead code**: dead code inflates
  duplicate-block scores. Run multi-pass: delete first, dedupe second.
