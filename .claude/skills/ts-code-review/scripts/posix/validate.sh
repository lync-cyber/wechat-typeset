#!/usr/bin/env bash
# ts-code-review/scripts/validate.sh
# Validate that a code change did not regress any tracked metrics.
# Run after every fix — if any metric worsens, the script exits non-zero.
#
# Usage: bash validate.sh [project-root] [--tsconfig tsconfig.json] [--skip-tests]
# Reads baseline from: review-report.json (produced by scan.sh)

set -euo pipefail

PROJECT_ROOT="${1:-.}"
TSCONFIG="tsconfig.json"
SKIP_TESTS=false
REPORT="$PROJECT_ROOT/review-report.json"

shift || true
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tsconfig)    TSCONFIG="$2";   shift 2 ;;
    --skip-tests)  SKIP_TESTS=true; shift ;;
    *)             shift ;;
  esac
done

cd "$PROJECT_ROOT"

if [[ ! -f "$REPORT" ]]; then
  echo "❌ review-report.json not found. Run scan.sh first to establish baseline." >&2
  exit 1
fi

echo "🛡️  Validation — checking against baseline..."

# Read baseline values
BASELINE_TYPE_ERRORS=$(jq '.baseline.typeErrors'    "$REPORT")
BASELINE_CIRCULAR=$(jq    '.baseline.circularDeps'  "$REPORT")
BASELINE_DEAD=$(jq        '.baseline.deadExports'   "$REPORT")

FAILED=0
WARNINGS=()

# ─── 1. TypeScript type errors ───────────────────────────────────────────────
echo "  [1/4] tsc --noEmit..."
CURRENT_TYPE_ERRORS=$(npx tsc --noEmit --project "$TSCONFIG" 2>&1 | grep -c "error TS" || true)

if [[ "$CURRENT_TYPE_ERRORS" -gt "$BASELINE_TYPE_ERRORS" ]]; then
  echo "  ❌ Type errors INCREASED: $BASELINE_TYPE_ERRORS → $CURRENT_TYPE_ERRORS"
  FAILED=1
else
  DELTA=$(( BASELINE_TYPE_ERRORS - CURRENT_TYPE_ERRORS ))
  echo "  ✅ Type errors: $CURRENT_TYPE_ERRORS (was $BASELINE_TYPE_ERRORS, Δ -$DELTA)"
fi

# ─── 2. Circular dependencies ─────────────────────────────────────────────────
echo "  [2/4] madge circular check..."
CURRENT_CIRCULAR=$(npx madge --circular --extensions ts,tsx src/ 2>/dev/null | grep -c "^" || true)

if [[ "$CURRENT_CIRCULAR" -gt "$BASELINE_CIRCULAR" ]]; then
  echo "  ❌ Circular deps INCREASED: $BASELINE_CIRCULAR → $CURRENT_CIRCULAR"
  FAILED=1
else
  echo "  ✅ Circular deps: $CURRENT_CIRCULAR (was $BASELINE_CIRCULAR)"
fi

# ─── 3. Dead exports (should not increase) ───────────────────────────────────
echo "  [3/4] knip dead exports..."
CURRENT_DEAD=$(npx knip --reporter json 2>/dev/null \
  | jq '[.exports // [] | .[]] | length' 2>/dev/null || echo "$BASELINE_DEAD")

if [[ "$CURRENT_DEAD" -gt "$BASELINE_DEAD" ]]; then
  echo "  ⚠️  Dead exports INCREASED: $BASELINE_DEAD → $CURRENT_DEAD (new dead code introduced)"
  WARNINGS+=("dead-exports-increase")
else
  DELTA=$(( BASELINE_DEAD - CURRENT_DEAD ))
  echo "  ✅ Dead exports: $CURRENT_DEAD (was $BASELINE_DEAD, Δ -$DELTA)"
fi

# ─── 4. Test suite ────────────────────────────────────────────────────────────
if [[ "$SKIP_TESTS" == false ]]; then
  echo "  [4/4] Running test suite..."

  TEST_CMD=""
  [[ -f "package.json" ]] && TEST_CMD=$(jq -r '.scripts.test // empty' package.json 2>/dev/null || true)

  if [[ -z "$TEST_CMD" || "$TEST_CMD" == "null" ]]; then
    echo "  ⏭️  No test script found in package.json, skipping"
  else
    if npm test --silent 2>&1 | tail -5; then
      echo "  ✅ Tests passed"
    else
      echo "  ❌ Tests FAILED"
      FAILED=1
    fi
  fi
else
  echo "  [4/4] Tests skipped (--skip-tests)"
fi

# ─── Result ───────────────────────────────────────────────────────────────────
echo ""
if [[ $FAILED -eq 1 ]]; then
  echo "❌ VALIDATION FAILED — revert this change before proceeding"
  echo "   Suggestion: git stash or git checkout -- <file>"
  exit 1
else
  if [[ ${#WARNINGS[@]} -gt 0 ]]; then
    echo "⚠️  VALIDATION PASSED with warnings: ${WARNINGS[*]}"
  else
    echo "✅ VALIDATION PASSED — safe to continue"
  fi

  # Update baseline in report to reflect the improvement
  UPDATED_REPORT=$(jq \
    --argjson te "$CURRENT_TYPE_ERRORS" \
    --argjson cd "$CURRENT_CIRCULAR" \
    --argjson de "$CURRENT_DEAD" \
    '.baseline.typeErrors = $te | .baseline.circularDeps = $cd | .baseline.deadExports = $de' \
    "$REPORT")
  echo "$UPDATED_REPORT" > "$REPORT"
  echo "   Baseline updated in review-report.json"
  exit 0
fi
