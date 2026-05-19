# Detectors

A detector is a deterministic finder. It emits `Issue[]` against a shared
schema. No LLM in the loop. The reviewer agent decides what to do with the
issues; the detector only finds them.

## Inventory

| Name | Issue kinds | Requires | Notes |
|---|---|---|---|
| `knip` | `dead-export`, `dead-file`, `dead-dependency` | knip | Best-in-class dead-code; configure `knip.config.ts` for entrypoints |
| `madge` | `circular-dep` | madge | Pass `--ts-config` for path-aliases; runs against tsconfig.include |
| `typecheck` | `type-error` | tsc | Always on |
| `jscpd` | `duplicate-block` | jscpd | Tests ignored by default |
| `eslint` | `eslint-warning`, `eslint-error` | eslint config | Auto-skipped if no eslint config |
| `ast` | `empty-implementation`, `complex-type`, `zombie-branch`, `as-any`, `ts-ignore` | ts-morph | Whitelists React hooks / JSX attrs / decorators |
| `placeholders` | `placeholder-todo`, `placeholder-fixme`, `placeholder-hack`, `placeholder-notimpl` | none | Comment-aware (skips string literals) |
| `comment-discipline` | `comment-discipline` | none | Patterns from `CLAUDE.md`; rules listed below |
| `tests` | `test-only`, `test-skip`, `test-empty` | none | Only scans `*.test.ts` / `*.spec.ts` |
| `security` | `security-eval`, `security-exec`, `security-html-inject` | none | High-precision patterns only — not a semgrep replacement |
| `bundle` | `bundle-whole-import` | react/vue/vite/next | Skipped on plain-Node projects |
| `naming` | `naming-smell` | ts-morph | Vague class names (Manager/Helper/Util) + one-letter locals |

## Adding a new detector

1. Add a `kind` to `IssueKind` in `scripts/types.ts`.
2. Add a file in `scripts/detectors/<name>.ts` exporting a `Detector` object:

```ts
export const myDetector: Detector = {
  name: 'my-detector',
  kinds: ['my-new-kind'],
  enabledFor: (ctx) => /* check stack/config */,
  async detect(ctx) { return [/* Issue[] */] },
}
```

3. Register it in `scripts/detectors/index.ts` (`ALL_DETECTORS`).
4. Update `agents/reviewer.md`'s verdict table to cover the new kind.

That's the whole contract. The diff-mode filter, parallel execution, and
error isolation all happen in `runDetectors`, so detector authors don't have
to think about them.

## Comment-discipline rules

The `comment-discipline` detector flags comment shapes the project's
`CLAUDE.md` bans. Current rules:

| Rule id | Pattern matches | Reason |
|---|---|---|
| `design-residue` | "方案 A vs B", "本来想", "after considering" | git/PR description is the right home |
| `history-migration` | "迁移", "phase N", "已移到", "previously" | `git log` is authoritative |
| `invalid-todo` | TODO/FIXME/HACK without a ticket reference | track issues in the issue tracker |
| `debug-leftover` | "临时打印", "调一下", "console.log debug" | delete debug; do not narrate it |
| `restate-code` | "creates instance", "returns value", "声明变量" | the next line already says this |

Tune rules by editing `scripts/detectors/comments.ts`. If your project has
different conventions, replace or extend the `RULES` array.

## Confidence values (rule of thumb)

| Confidence | Meaning |
|---|---|
| 0.9+ | Detector is essentially never wrong (e.g. tsc errors, eslint, test-only) |
| 0.7..0.9 | Strong signal but FPs exist (knip dead exports, ast complex-types) |
| 0.5..0.7 | Heuristic — needs LLM/human review (zombie branches, naming) |
| <0.5 | Tracked-externally TODOs, etc — surface for awareness only |

The reviewer agent may override the detector's confidence in its verdict. The
final `priority.ts` score multiplies impact and risk, not confidence.

## False-positive defense

- **knip dynamic imports**: a `dead-export` flagged at 0.8 confidence can
  still be reached via `import('./foo')` or `require(name)`. The reviewer
  agent should grep for the export name in string literals before deleting.
- **ast empty-body**: noop is intentional inside React hooks, JSX
  attributes, and decorators — the detector whitelists these contexts. If
  you see a noisy FP elsewhere, add to `isInWhitelistedContext`.
- **comment-discipline restate-code**: the rule is intentionally aggressive;
  the reviewer agent should mark culturally-acceptable cases as
  `false-positive`.

## Skipping detectors per scan

```
npx ts-node scripts/scan.ts --mode full --detectors knip,madge,ast
```

Comma-separated whitelist. Useful when one tool is slow or unconfigured.
