# Orchestration patterns

The skill does not ship an auto-fix runner. Reviewing is enough for the
majority of use cases (PR review, branch audit, "is this code OK?"), and
auto-fix introduces a class of failure modes — silently-disabled tests,
out-of-scope diffs, behavior changes that pass tsc — that are best handled
by a human in the loop.

This document describes the patterns to use if you do want auto-fix, so you
can build it on top of the skill without re-deriving the protocol.

## Pattern 1: review only (default)

```
scan.ts  ->  priority.ts  ->  reviewer agent  ->  report.ts (markdown)
                                              ->  human reads report, decides
                                              ->  human applies fixes
                                              ->  validate.ts gates result
```

This is what the skill is for. Stop here unless you have a concrete reason
to automate fixes.

## Pattern 2: assisted-fix (human in loop)

```
scan.ts  ->  reviewer agent emits verdicts + applyOrder
         ->  human picks N verdicts they trust
         ->  fixer agent (single call per verdict) produces a diff
         ->  human reviews each diff in their editor
         ->  validate.ts gates each commit
```

The fixer agent is a single prompt. Inputs:

- One verdict from the reviewer.
- The current file content.
- The project conventions.

Output: a unified diff that applies exactly that verdict. The pattern is
described in `agents/reviewer.md` under "Auto-fix path"; the prompt body
is small enough that you do not need a separate file for it. If you find
yourself running this dozens of times, then extract it.

## Pattern 3: full automation (use with caution)

```
for each verdict in applyOrder:
  fixer agent  ->  diff
  validate.ts  ->  if pass: git apply + git commit; else: revert and skip
```

Hard rules for this pattern:

1. Run on a dedicated branch (`review/<date>-auto`); never on `main`.
2. `validate.ts --allow <path>` must constrain the diff scope. Out-of-scope
   changes are auto-rejected.
3. `validate.ts` must run: tsc + build smoke + test inventory + dead-export
   delta. Skipping any of these defeats the purpose.
4. Stop the pipeline on the first `risk: high` verdict; flag for human.
5. Squash the auto-commits before merging — one logical change per branch.

## Verdict-to-fix mapping

Most verdicts map 1:1 to a mechanical diff. A few need extra inputs:

| Verdict | Fixer needs |
|---|---|
| `delete`, `delete-comment`, `delete-test`, `remove-marker` | only the file content |
| `replace-with-concrete-type`, `replace-with-unknown` | reviewer's `suggestion` field as the replacement |
| `simplify` | reviewer's `simplifiedTs` field |
| `extract-interface` | reviewer's `newFile` and `interfaceName`; fixer creates a new file plus edits the original |
| `merge-to-util` | reviewer's `utilName`, `utilSignature`; fixer creates the util plus replaces sites |
| `rename` | reviewer's `newName`; project-wide rename usually outside fixer scope — escalate |

## When to abandon automation

If you find yourself patching the fixer prompt to handle special cases, or
adding "ignore this verdict kind in auto mode" lists, you have crossed
into the regime where Pattern 1 or Pattern 2 is cheaper. The marginal
verdict that does not auto-apply cleanly costs more engineer-hours to
automate than it saves.

The skill is not trying to be a refactoring robot. It is trying to give
LLMs and humans a clean, grounded, evidence-anchored substrate to do
their judgement work.

## Multi-pass strategy

If a project has hundreds of findings, do not feed them all to the reviewer
in one call. The recommended pass order:

1. **Pass 1 — dead code only.** `--detectors knip` + reviewer. Deletes
   first. Re-run scan after fixes; many downstream findings disappear.
2. **Pass 2 — types.** `--detectors typecheck,ast`. Type errors, `as any`,
   `ts-ignore`, complex types.
3. **Pass 3 — quality.** Everything else: tests, security, comments,
   bundle, naming, duplicates.

Each pass is independent: scan, review, apply (manual or automated),
validate, repeat with the next detector subset.
