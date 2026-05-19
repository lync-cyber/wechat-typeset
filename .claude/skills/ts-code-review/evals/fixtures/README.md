# Eval fixtures

Place small, deliberately-messy TypeScript fixtures here so test runs are
reproducible. Each fixture should be a self-contained directory:

```
fixtures/
  small-mess/         # 10-15 files, 2-3 dead exports, 1 cycle, a few TODOs
    package.json
    tsconfig.json
    src/*.ts
  medium-mess/        # 30-50 files, more variety
  legacy-react/       # react-specific anti-patterns
```

Each fixture should:

- Have a working `package.json` so `npm install` resolves cleanly.
- Have a working `tsconfig.json`.
- Contain known issues that the detectors should find, ideally one of
  every `IssueKind` across the fixture set.
- Include an `expected-findings.json` listing what should be detected.

This directory is intentionally empty at the moment. Add fixtures the
first time you run the eval loop end-to-end, or grab small public
repositories with `git submodule add`.
