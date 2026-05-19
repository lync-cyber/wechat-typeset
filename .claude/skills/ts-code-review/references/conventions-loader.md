# Project conventions loader

The skill injects project-local conventions into every reviewer prompt so
the LLM judges by the project's own rules, not generic best practices.
Loaded from these files in this order (first found wins for each rule
section):

1. `CLAUDE.md`
2. `AGENTS.md`
3. `.cursorrules`
4. `.cursor/rules.md`
5. `CONTRIBUTING.md`
6. `CODE_STYLE.md`

## Extraction heuristic

`scripts/context.ts` does not parse the full file — that would blow the
prompt budget. Instead it pulls:

- Markdown sections whose heading contains a rule-hint word
  (约定, 纪律, 规范, 禁止, 必须, 不可, never, must, always, do not,
  disallow, forbidden, rule, discipline, hard constraint).
- Standalone lines that match the same hint pattern (catches inline rules
  like "Always run X before Y").
- Capped at 4000 characters total.

The heuristic is biased toward false positives (over-inclusion). It is
cheap to feed a few extra paragraphs to the LLM; it is expensive to
silently drop a rule the user cares about.

## How conventions reach the prompt

```
<project-conventions>
### CLAUDE.md
## 注释纪律（最小必要原则）
...rule text...

### CONTRIBUTING.md
## 不可破坏的硬约束
...rule text...
</project-conventions>
```

The reviewer agent treats this block as binding (see
`agents/reviewer.md`). If a generic best practice conflicts with the
conventions, the conventions win.

## Adding your own convention sources

Edit `scripts/context.ts`, `CONVENTION_FILES` array. The skill is happy
to read multiple files; ordering matters only for human readability.

For machine-readable rules (e.g. "ban these import paths"), prefer custom
ESLint rules rather than `CLAUDE.md` prose — the eslint detector will
surface them with line-level precision, while the conventions block can
only guide LLM judgement.

## What NOT to put in CLAUDE.md (for skill purposes)

- Onboarding instructions ("install node, then run npm install") — not
  rules; takes prompt budget.
- Architecture descriptions — better discovered from the code.
- Recent PR changelogs — `git log` is authoritative.

Keep `CLAUDE.md` rules: "this is how we do it here", short, imperative,
with a one-line "why" so the LLM can judge edge cases. The current project's
`CLAUDE.md` 注释纪律 section is a good example of the shape.
