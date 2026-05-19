#!/usr/bin/env bash
# ts-code-review/scripts/scan.sh
# Run all static analysis tools and produce review-report.json
#
# Usage: bash scan.sh [project-root] [tsconfig-path]
# Output: review-report.json in the project root

set -euo pipefail

PROJECT_ROOT="${1:-.}"
TSCONFIG="${2:-tsconfig.json}"
OUT="$PROJECT_ROOT/review-report.json"

cd "$PROJECT_ROOT"

echo "🔍 TypeScript Code Review — Static Scan"
echo "   Project: $PROJECT_ROOT"
echo "   Config:  $TSCONFIG"
echo ""

# ─── Dependency check ────────────────────────────────────────────────────────
check_tool() {
  if ! command -v "$1" &>/dev/null && ! npx --yes "$1" --version &>/dev/null 2>&1; then
    echo "⚠️  Missing tool: $1 — run: npm install -D $2" >&2
  fi
}
check_tool knip knip
check_tool madge madge
check_tool rg ripgrep
check_tool jscpd jscpd

# ─── Capture baseline for regression guard ───────────────────────────────────
echo "📐 Capturing baseline metrics..."

BASELINE_TYPE_ERRORS=$(npx tsc --noEmit --project "$TSCONFIG" 2>&1 | grep -c "error TS" || true)
BASELINE_CIRCULAR=$(npx madge --circular --extensions ts,tsx src/ 2>/dev/null | grep -c "^" || true)

# ─── 1. knip — dead code ─────────────────────────────────────────────────────
echo "🗑️  Running knip (dead exports, files, dependencies)..."
KNIP_OUT=$(npx knip --reporter json 2>/dev/null || echo '{}')

# ─── 2. madge — circular dependencies ────────────────────────────────────────
echo "🔄 Running madge (circular dependencies)..."
CIRCULAR_OUT=$(npx madge --circular --extensions ts,tsx --json src/ 2>/dev/null || echo '[]')

# ─── 3. ripgrep — placeholders and unsafe patterns ───────────────────────────
echo "📌 Scanning for placeholders and unsafe patterns (ripgrep)..."

scan_pattern() {
  local label="$1"; local pattern="$2"
  rg "$pattern" --type ts --type tsx -n --json 2>/dev/null \
    | jq -c --arg type "$label" \
        'select(.type == "match") | {
           file: .data.path.text,
           line: .data.line_number,
           type: $type,
           text: (.data.lines.text | gsub("^\\s+|\\s+$"; ""))
         }' || true
}

{
  scan_pattern "TODO"            "TODO"
  scan_pattern "FIXME"           "FIXME"
  scan_pattern "HACK"            "HACK"
  scan_pattern "not-implemented" "throw new Error\\(.*(not implemented|not yet|TODO)"
  scan_pattern "as-any"          "\\bas any\\b"
  scan_pattern "ts-ignore"       "@ts-ignore|@ts-expect-error"
  scan_pattern "empty-body"      "=>\\s*\\{\\s*\\}|function[^(]*\\([^)]*\\)\\s*\\{\\s*\\}"
} > /tmp/placeholders_raw.jsonl

PLACEHOLDERS=$(jq -s '.' /tmp/placeholders_raw.jsonl)

# ─── 4. TypeScript type errors ───────────────────────────────────────────────
echo "🔴 Running tsc (type errors)..."
TYPE_ERRORS=$(npx tsc --noEmit --project "$TSCONFIG" 2>&1 \
  | grep "error TS" \
  | sed "s|$PROJECT_ROOT/||g" \
  | jq -R 'capture("(?<file>[^(]+)\\((?<line>[0-9]+),[0-9]+\\): error TS(?<code>[0-9]+): (?<message>.+)") | {file, line: (.line|tonumber), code: .code, message}' \
  2>/dev/null | jq -s '.' || echo '[]')

# ─── 5. jscpd — duplicate code ───────────────────────────────────────────────
echo "♊  Running jscpd (duplicate code blocks)..."
DUPES_OUT=$(npx jscpd src/ \
  --min-tokens 50 \
  --min-lines 5 \
  --reporters json \
  --output /tmp/jscpd-report \
  --silent 2>/dev/null && \
  cat /tmp/jscpd-report/jscpd-report.json 2>/dev/null | \
  jq '[.duplicates[] | {
    files: [.firstFile.name, .secondFile.name],
    lines: .lines,
    tokens: .tokens,
    fragment: .fragment[:120]
  }]' || echo '[]')

# ─── 6. Baseline dead export count for regression guard ──────────────────────
BASELINE_DEAD_EXPORTS=$(echo "$KNIP_OUT" | jq '[.exports // [] | .[]] | length' 2>/dev/null || echo 0)

# ─── Assemble report ─────────────────────────────────────────────────────────
echo "📄 Writing review-report.json..."
jq -n \
  --argjson knip       "$KNIP_OUT" \
  --argjson circular   "$CIRCULAR_OUT" \
  --argjson placeholders "$PLACEHOLDERS" \
  --argjson typeErrors "$TYPE_ERRORS" \
  --argjson dupes      "$DUPES_OUT" \
  --argjson baseline   "{
    \"deadExports\":   $BASELINE_DEAD_EXPORTS,
    \"circularDeps\":  $BASELINE_CIRCULAR,
    \"typeErrors\":    $BASELINE_TYPE_ERRORS
  }" \
'{
  generatedAt: (now | todate),
  deadCode: {
    files:        ($knip.files        // []),
    exports:      ($knip.exports      // []),
    dependencies: ($knip.dependencies // [])
  },
  circular:     $circular,
  placeholders: $placeholders,
  typeErrors:   $typeErrors,
  duplicates:   $dupes,
  baseline:     $baseline
}' > "$OUT"

# ─── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "✅ Scan complete → $OUT"
echo ""
echo "Summary:"
echo "  Dead exports:      $(jq '.deadCode.exports | length' "$OUT")"
echo "  Dead files:        $(jq '.deadCode.files | length' "$OUT")"
echo "  Circular deps:     $(jq '.circular | length' "$OUT")"
echo "  Placeholders:      $(jq '.placeholders | length' "$OUT")"
echo "  Type errors:       $(jq '.typeErrors | length' "$OUT")"
echo "  Duplicate blocks:  $(jq '.duplicates | length' "$OUT")"
echo ""
echo "Next: run ast-analyze.ts then priority.sh"
