# Shared agent contract

Every agent prompt in this directory reuses the same Issue schema and output
shape so the LLM does not have to re-learn the structure per template.

## Issue schema (input from detectors)

```ts
type IssueKind =
  | 'dead-export' | 'dead-file' | 'dead-dependency'
  | 'circular-dep'
  | 'placeholder-todo' | 'placeholder-fixme' | 'placeholder-hack' | 'placeholder-notimpl'
  | 'empty-implementation'
  | 'complex-type'
  | 'zombie-branch'
  | 'as-any' | 'ts-ignore'
  | 'duplicate-block'
  | 'type-error'
  | 'eslint-warning' | 'eslint-error'
  | 'comment-discipline' | 'comment-drift'
  | 'test-skip' | 'test-only' | 'test-empty'
  | 'security-eval' | 'security-exec' | 'security-html-inject'
  | 'bundle-whole-import'
  | 'naming-smell'

interface Issue {
  file: string
  line?: number
  endLine?: number
  column?: number
  kind: IssueKind
  severity: 'info' | 'warn' | 'error'
  evidence: string
  detector: string
  confidence: number
  suggestion?: string
  meta?: Record<string, unknown>
}
```

## Output shape

Wrap reasoning and result in two tags. Orchestrators parse only `<result>`;
the `<reasoning>` block exists for inspection and to let the LLM think
through difficult judgement calls without polluting machine output.

```
<reasoning>
Short prose. Two or three sentences per non-trivial item. Cite file:line
evidence from the input. If information is insufficient, say what is missing.
</reasoning>
<result>
[ ... JSON array, schema below ... ]
</result>
```

Each result item follows this superset of fields:

```ts
interface Verdict {
  file: string
  line?: number
  kind: IssueKind | string
  verdict: string
  reason: string
  confidence: number
  suggestion?: string
  needsExternalChange?: boolean
}
```

## Universal constraints

1. Anchor every verdict to file:line evidence in the input. Do not speculate
   about files not in the input.
2. Prefer deletion over refactor; prefer no-op over abstraction. New files
   are acceptable only for: extracting a type-only interface to break a
   cycle, OR a shared util that replaces three or more sites and takes at
   most two parameters.
3. Decline when context is insufficient. Use verdict `insufficient-context`
   and name what is missing. Do not invent.
4. Project conventions override generic advice. When `<project-conventions>`
   is present, treat it as binding.
5. No comment writing. Do not propose adding explanatory comments.
6. Bound output. Max 50 verdicts per call. Cover highest-severity items
   first; emit `{ "verdict": "deferred-overflow" }` for the rest.

## Context budget

The orchestrator trims file content to the issue location plus or minus 30
lines plus the enclosing top-level scope. Answer for items where the snippet
is sufficient; mark the rest `insufficient-context`.
