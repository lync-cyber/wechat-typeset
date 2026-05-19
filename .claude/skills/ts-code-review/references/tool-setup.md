# Tool setup

Every external tool the skill can use, how to install it, and the minimal
config that lets the corresponding detector work. None of these are required
— each detector has `enabledFor(ctx)` and self-disables when its tool is
missing.

## Required for the skill itself

```
npm install -D ts-node typescript
```

That's it. `ts-node` runs the scripts; `typescript` provides `tsc` for the
typecheck detector. Everything else is optional and gated by stack
detection.

## Cross-platform note

All scripts are pure Node.js. The skill does not depend on bash, jq, or
python. On Windows, run them via `npx ts-node` exactly as on macOS/Linux.

The old POSIX-only versions live in `scripts/posix/` for reference; do not
use them on Windows.

## knip — dead exports / files / dependencies

```
npm install -D knip
```

Minimal `knip.config.ts`:

```ts
import type { KnipConfig } from 'knip'
const config: KnipConfig = {
  entry: ['src/index.ts', 'src/main.ts'],
  project: ['src/**/*.{ts,tsx}'],
  ignore: ['**/*.test.ts', '**/*.d.ts'],
  paths: { '@/*': ['src/*'] },
}
export default config
```

False-positive suppression in source:

```ts
/** @public */
export function publicApiFunction() { /* ... */ }
```

## madge — circular dependencies

```
npm install -D madge
```

For TypeScript with path aliases, pass `--ts-config`:

```
npx madge --circular --ts-config tsconfig.json --extensions ts,tsx src/
```

For monorepos, run per package or set `tsconfig.include` to span all of
them. The `madgeDetector` reads `tsconfig.include` automatically.

## jscpd — duplicate code

```
npm install -D jscpd
```

Defaults used by the detector: `--min-tokens 50 --min-lines 5`, tests
ignored. Override via `.jscpd.json` in the project root if needed.

## eslint — lint rules

The detector auto-runs if any of these exist:

- `eslint.config.{js,ts,mjs,cjs}` (flat config)
- `.eslintrc.{js,cjs,json,yaml}` (legacy)

Type-aware rules need `parserOptions.project` pointed at your tsconfig.
The detector does not configure ESLint; it just runs `eslint --format json`
and reports back.

## ts-morph — AST detectors (ast, naming)

```
npm install -D ts-morph
```

The AST detector reads your `tsconfig.json` automatically; no separate
config needed. For monorepos, pass `--project packages/<pkg>/tsconfig.json`.

## ripgrep — NOT required

The original skill used ripgrep for placeholder scanning. The new
`placeholders` detector reads files with Node's `fs` and parses comments
with a state machine, so ripgrep is no longer needed. Removing the
dependency makes the skill work out-of-the-box on Windows without
installing rg.

## Optional: runtime coverage

For Node.js backend:

```
npm install -D c8
NODE_V8_COVERAGE=./cov-raw node dist/server.js
npx c8 report --reporter=json --reports-dir=./coverage
npx ts-node scripts/priority.ts --coverage ./coverage/coverage-final.json
```

For Vite frontend:

```
npm install -D @vitest/coverage-istanbul
# vitest.config.ts: coverage: { provider: 'istanbul', reporter: ['json'] }
npx vitest run --coverage
npx ts-node scripts/priority.ts --coverage ./coverage/coverage-final.json
```

Without coverage, the priority script renormalises weights so the missing
component does not silently zero out scores.

## Optional: stricter typecheck pass

Create `tsconfig.strict.json` extending your main config:

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Run the typecheck detector against it:

```
npx ts-node scripts/scan.ts --mode full --project tsconfig.strict.json
```

The strict pass usually surfaces ~10x more type-error issues than the
build config. Address them gradually; do not mass-fix in one PR.

## Optional: custom ESLint rules

Project-specific anti-patterns (e.g. "no `@company/legacy-*` imports") are
best expressed as custom ESLint rules. Put them in `scripts/eslint-rules/`,
register them in your eslint config, and the `eslintDetector` will surface
them automatically without code changes to the skill.

## Stack detection

The skill detects your stack from `package.json` and lockfiles. Detectors
that don't fit your stack self-disable. The output of `scan.ts` shows what
was detected:

```
scan.ts: mode=full, project=tsconfig.json
  stack: react,vite | files in scope: 247
  conventions loaded (1830 chars)
```
