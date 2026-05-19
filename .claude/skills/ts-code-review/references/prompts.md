# Prompt engineering for the reviewer agent

The reviewer agent is the only LLM in the loop. This document explains how
to build the prompt that goes to it. Read `agents/shared.md` for the schema
and `agents/reviewer.md` for the agent's contract.

## Three blocks, in order

```
<system>
{{system_prompt_from_reviewer.md}}
</system>

<user>
<project-conventions>...</project-conventions>
<scan-meta>...</scan-meta>
<issues>...</issues>
<source-context>...</source-context>
</user>
```

Keep the system block stable across calls so prompt caching wins. Vary only
the user block.

## Building `<issues>`

Group issues by file, sorted by line. Strip detector-internal fields not in
the schema. Truncate `evidence` and `suggestion` to 200 chars each (the
agent does not need verbose evidence — file:line tells it where to look).

```json
[
  { "file": "src/foo.ts", "line": 23, "kind": "dead-export",
    "severity": "warn", "evidence": "export legacyAdapter unused",
    "detector": "knip", "confidence": 0.8 }
]
```

## Building `<source-context>`

For each unique file in `<issues>`:

1. Find the union of issue lines.
2. For each line L, take the enclosing top-level scope (function, class,
   namespace) AND lines L-30..L+30, whichever is larger.
3. Merge overlapping windows, prefix each line with its number.
4. If the file has >300 lines of windows, switch to "scope only" mode (skip
   the +/- 30 expansion).

This typically keeps each file under 200 lines of context while ensuring
the agent can see the definition site, immediate callers, and surrounding
types.

Format:

```
<file path="src/foo.ts" totalLines="412">
  20  export function publicApi(...) { ... }
  21
  22  /** @internal */
  23  export function legacyAdapter(x: unknown) {
  24    return JSON.parse(x as string)
  25  }
  ...
</file>
```

## Building `<project-conventions>`

`scripts/context.ts` already pulls heuristic-extracted rules from `CLAUDE.md`,
`AGENTS.md`, `.cursorrules`, `CONTRIBUTING.md`. The output is capped at 4000
characters. Pass it verbatim. Do not paraphrase — the user wrote it for a
reason.

If the project has no convention files, omit the block entirely (an empty
`<project-conventions>` block is a wasted token).

## Token budget

| Block | Target tokens |
|---|---|
| system | 600 |
| project-conventions | <=1000 |
| scan-meta | <50 |
| issues | <=2000 (~50 items) |
| source-context | <=3000 |
| total input | <=6500 |

If `issues` or `source-context` overshoots, split the batch by file group.

## Output parsing

The agent emits `<reasoning>...</reasoning><result>...</result>`. Parse
`<result>` as JSON. If parsing fails:

1. Retry once with a system-suffix: `"Your last response could not be parsed
   as JSON. Re-emit only the <result> block, valid JSON."`.
2. If retry fails, log the response and skip the batch (do not invent
   verdicts).

## Caching for repeat passes

The system block + project-conventions block are stable across all reviewer
calls in a single run. Use prompt caching (Anthropic) by placing
`cache_control: { type: "ephemeral" }` after the `<project-conventions>`
close tag. This gives a ~80% input-token discount on subsequent calls in
the same run.

## What NOT to include

- Whole files larger than 300 lines.
- Files NOT referenced in `<issues>`.
- Detector internals like `meta.cycleLength` (the agent does not need them).
- ASCII tables, decorative emoji, "please" / "could you" politeness — they
  cost tokens and do not improve output quality.
