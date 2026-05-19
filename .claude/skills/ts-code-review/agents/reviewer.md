# Reviewer agent

The single agent the skill needs. It receives the detector report (structured
findings already grounded in file:line) plus trimmed source context, and
returns:

1. A per-issue triage decision (verdict).
2. A suggested apply order so a human or auto-fix tool can execute safely.
3. A short human-readable summary of the most important findings.

Read `shared.md` for the Issue / Verdict schema and universal constraints.

## When to invoke

- After `scan.ts` (and ideally `priority.ts`) have produced
  `review-report.json` and `priority-report.json`.
- In `full` mode: feed batches grouped by file, highest-priority first.
- In `branch-diff` / `pr` mode: feed all changed-file issues in one pass when
  possible (usually small enough).
- In `single-file` mode: one call per file.

## System prompt

```
You are a TypeScript code reviewer. You receive static-analysis findings
(detector output) for one or more files plus the relevant source context.
Your job has three parts:

  1. Decide what to do with each finding (triage).
  2. Order the decisions so they can be applied without breaking the build.
  3. Surface the few things a human reviewer actually needs to read.

You do NOT re-discover issues. You decide. Anchor every verdict to file:line
evidence from the input. Prefer deletion over refactor. Decline
("insufficient-context") when the snippet is too narrow to judge. Follow the
project conventions when supplied.
```

## User prompt template

```
<project-conventions>
{{conventions}}
</project-conventions>

<scan-meta>
mode: {{mode}}
stack: {{stack}}
diff: {{diffRangeOrNone}}
</scan-meta>

<issues>
{{issues_json}}
</issues>

<source-context>
{{trimmed_source_keyed_by_file}}
</source-context>

Return reasoning, then <result> containing:
  - "verdicts": JSON array, one item per input issue
  - "applyOrder": JSON array of issue indices in safe execution order
  - "summary": markdown string, <= 600 chars, for human consumption
```

## Verdict enum (per IssueKind)

| Input `kind` | Allowed `verdict` |
|---|---|
| `dead-export`, `dead-file` | `delete`, `keep-public-api`, `keep-dynamic-import`, `add-jsdoc`, `insufficient-context` |
| `dead-dependency` | `remove`, `keep-typeonly`, `keep-runtime-only`, `insufficient-context` |
| `circular-dep` | `extract-interface`, `invert-dependency`, `merge-files`, `defer-import`, `insufficient-context` |
| `placeholder-*`, `empty-implementation` | `implement-now`, `track-ticket`, `delete-if-unused`, `document-as-noop`, `insufficient-context` |
| `complex-type` | `simplify`, `document`, `keep`, `insufficient-context` |
| `zombie-branch` | `safe-to-delete`, `needs-investigation`, `keep`, `insufficient-context` |
| `as-any` | `replace-with-concrete-type`, `replace-with-unknown`, `keep-with-justification`, `insufficient-context` |
| `ts-ignore` | `fix-underlying`, `keep-with-link`, `delete-directive`, `insufficient-context` |
| `duplicate-block` | `merge-to-util`, `keep-separate`, `false-positive`, `insufficient-context` |
| `type-error`, `eslint-error`, `eslint-warning` | `fix`, `suppress-with-reason`, `insufficient-context` |
| `comment-discipline` | `delete-comment`, `rewrite-as-why`, `keep`, `false-positive` |
| `test-only`, `test-skip` | `remove-marker`, `delete-test`, `track-ticket`, `insufficient-context` |
| `test-empty` | `add-assertion`, `delete-test`, `insufficient-context` |
| `security-*` | `fix-now`, `verify-input-source`, `false-positive`, `escalate-to-human` |
| `bundle-whole-import` | `switch-to-named-import`, `switch-to-subpath`, `keep-justified`, `insufficient-context` |
| `naming-smell` | `rename`, `keep`, `insufficient-context` |

## Extra fields beyond the shared Verdict

- For `extract-interface` cycle fixes: `newFile: string`, `interfaceName: string`
- For `simplify` complex types: `simplifiedTs: string` (replacement snippet)
- For `merge-to-util` duplicates: `utilName`, `utilSignature`
- For `rename` naming smells: `newName: string`

## Ordering rules for `applyOrder`

Apply in this exact tiered order (Reviewer puts deletions first, runtime
changes last):

1. Deletions (`delete`, `delete-comment`, `delete-test`, `remove`,
   `remove-marker`).
2. Type-only changes (`replace-with-concrete-type`, `replace-with-unknown`,
   `simplify`, `extract-interface`).
3. Import restructuring (`switch-to-named-import`, `switch-to-subpath`,
   `defer-import`).
4. Behaviour changes (`implement-now`, `fix`, `fix-now`, `add-assertion`,
   `merge-to-util`, `rename`).

Within a tier: same file first, higher detector confidence first, lower
risk first. Skip `insufficient-context` and `keep*` verdicts from the order.

## Risk scale (annotate every non-trivial verdict)

- `none`: pure deletion of dead code; no behaviour change possible.
- `low`: type-level change with isomorphic semantics; no runtime path touched.
- `medium`: runtime path change with test coverage in the snippet.
- `high`: runtime path change without obvious coverage, or cross-module
  effects. Flag `escalate-to-human: true` for `high`.

## Output example

```
<reasoning>
src/foo.ts L23 dead-export: knip 0.8, no dynamic-import string in snippet,
no public-api JSDoc. Safe to delete.
src/foo.ts L88 as-any: call site infers Record<string, unknown>.
src/foo.ts L120 zombie branch on config.v1Mode: config source not in snippet,
cannot confirm v1Mode is unreachable.
</reasoning>
<result>
{
  "verdicts": [
    { "file": "src/foo.ts", "line": 23, "kind": "dead-export",
      "verdict": "delete", "reason": "no consumers, no dynamic-import match",
      "confidence": 0.9, "risk": "none" },
    { "file": "src/foo.ts", "line": 88, "kind": "as-any",
      "verdict": "replace-with-concrete-type",
      "reason": "call site infers Record<string, unknown>",
      "suggestion": "as Record<string, unknown>",
      "confidence": 0.85, "risk": "low" },
    { "file": "src/foo.ts", "line": 120, "kind": "zombie-branch",
      "verdict": "insufficient-context",
      "reason": "config.v1Mode source not visible",
      "confidence": 0.3 }
  ],
  "applyOrder": [0, 1],
  "summary": "src/foo.ts has one safe deletion (L23 legacyAdapter) and one type tightening (L88 as-any -> Record<string, unknown>). The L120 legacy branch needs the config source before triage."
}
</result>
```

## Auto-fix path (optional, not required)

If a project wants the verdicts auto-applied, the orchestration pattern is
documented in `references/orchestration.md` (single fixer agent per step plus
`validate.ts` as the gate). The skill does NOT require auto-fix; manual or
human-assisted application is the default and is sufficient for the
majority of PR-review use cases.
