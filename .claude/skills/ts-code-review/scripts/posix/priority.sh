#!/usr/bin/env bash
# ts-code-review/scripts/priority.sh
# Score every TypeScript file by impact × risk using git history + static metrics.
#
# Usage: bash priority.sh [project-root] [--coverage coverage-final.json]
# Output: priority-report.json

set -euo pipefail

PROJECT_ROOT="${1:-.}"
COVERAGE_FILE=""
REPORT_IN="$PROJECT_ROOT/review-report.json"
REPORT_OUT="$PROJECT_ROOT/priority-report.json"

# Parse optional --coverage flag
shift || true
while [[ $# -gt 0 ]]; do
  case "$1" in
    --coverage) COVERAGE_FILE="${2:-}"; shift 2 ;;
    *) shift ;;
  esac
done

cd "$PROJECT_ROOT"

echo "📊 Building priority matrix..."
echo "   Reading: $REPORT_IN"
[[ -n "$COVERAGE_FILE" ]] && echo "   Coverage: $COVERAGE_FILE"

if [[ ! -f "$REPORT_IN" ]]; then
  echo "❌ review-report.json not found. Run scan.sh first." >&2
  exit 1
fi

# ─── Git churn: commits per file (last 90 days) ───────────────────────────────
echo "   Analysing git history (90 days)..."
declare -A CHURN
while IFS= read -r line; do
  count=$(echo "$line" | awk '{print $1}')
  file=$(echo "$line" | awk '{$1=""; print $0}' | xargs)
  CHURN["$file"]="$count"
done < <(
  git log --since="90 days ago" --format=format: --name-only 2>/dev/null \
    | grep -E '\.(ts|tsx)$' \
    | sed "s|^$PROJECT_ROOT/||" \
    | sort | uniq -c | sort -rg \
    | head -200
)

MAX_CHURN=$(printf '%s\n' "${CHURN[@]:-0}" | sort -rn | head -1)
MAX_CHURN=${MAX_CHURN:-1}

# ─── Coverage data (optional) ─────────────────────────────────────────────────
declare -A COVERAGE_PCT
if [[ -n "$COVERAGE_FILE" && -f "$COVERAGE_FILE" ]]; then
  echo "   Parsing coverage data..."
  while IFS='=' read -r file pct; do
    COVERAGE_PCT["$file"]="$pct"
  done < <(
    jq -r 'to_entries[] | "\(.key)=\(.value.s | to_entries | 
      ((map(select(.value > 0)) | length) / (length + 0.001) * 100 | floor | tostring))"' \
      "$COVERAGE_FILE" 2>/dev/null || true
  )
fi

# ─── Collect per-file metrics from review-report.json ────────────────────────
echo "   Scoring files..."

python3 - <<PYEOF
import json, os, re, subprocess

report = json.load(open('$REPORT_IN'))
coverage = {}
$(
  for file in "${!COVERAGE_PCT[@]}"; do
    echo "coverage['$file'] = ${COVERAGE_PCT[$file]}"
  done
)

churn = {}
$(
  for file in "${!CHURN[@]}"; do
    echo "churn['$file'] = ${CHURN[$file]}"
  done
)
max_churn = ${MAX_CHURN}

# Build index of issues per file
dead_files  = set(report.get('deadCode', {}).get('files', []))
dead_exports = {}
for e in report.get('deadCode', {}).get('exports', []):
    f = e.get('file', '')
    dead_exports[f] = dead_exports.get(f, 0) + 1

todo_counts = {}
for p in report.get('placeholders', []):
    f = p.get('file', '')
    todo_counts[f] = todo_counts.get(f, 0) + 1

type_errors = {}
for e in report.get('typeErrors', []):
    f = e.get('file', '')
    type_errors[f] = type_errors.get(f, 0) + 1

ast = report.get('astIssues', {})
empty_impls = {}
for e in ast.get('emptyImplementations', []):
    f = e.get('file', '')
    empty_impls[f] = empty_impls.get(f, 0) + 1

complex_types = {}
for t in ast.get('complexTypes', []):
    f = t.get('file', '')
    complex_types[f] = max(complex_types.get(f, 0), t.get('complexity', 0))

zombie_branches = {}
for z in ast.get('zombieBranches', []):
    f = z.get('file', '')
    zombie_branches[f] = zombie_branches.get(f, 0) + 1

as_any = {x['file']: x['count'] for x in ast.get('asAnyConcentrations', [])}

# Circular dep depth per file
circular_depth = {}
for cycle in report.get('circular', []):
    for f in cycle:
        circular_depth[f] = max(circular_depth.get(f, 0), len(cycle))

# All unique files
all_files = set()
for key in [dead_exports, todo_counts, type_errors, empty_impls,
            complex_types, zombie_branches, as_any, circular_depth]:
    all_files.update(key.keys())
all_files -= dead_files  # skip files already marked for deletion

scores = []
for f in sorted(all_files):
    if not f.endswith(('.ts', '.tsx')): continue

    # Normalised 0-1 impact components
    churn_score    = churn.get(f, 0) / max(max_churn, 1)
    circ_score     = min(circular_depth.get(f, 0) / 10, 1.0)
    covered_pct    = coverage.get(f, 80)  # assume 80% if unknown
    uncov_score    = (100 - covered_pct) / 100
    complexity_raw = min(complex_types.get(f, 0) / 20, 1.0)
    todo_raw       = min(todo_counts.get(f, 0) / 10, 1.0)

    impact = (churn_score * 0.30 + circ_score * 0.20 + uncov_score * 0.20
              + complexity_raw * 0.15 + todo_raw * 0.15)

    # Risk components
    test_cov   = covered_pct / 100
    api_count  = dead_exports.get(f, 0)  # proxy for exposure
    api_score  = min(api_count / 10, 1.0)

    risk = (1 - test_cov) * 0.40 + api_score * 0.30 + churn_score * 0.30

    total = round(impact * risk, 4)

    issues = []
    if todo_counts.get(f):      issues.append(f"{todo_counts[f]} placeholders")
    if empty_impls.get(f):      issues.append(f"{empty_impls[f]} empty impls")
    if zombie_branches.get(f):  issues.append(f"{zombie_branches[f]} zombie branches")
    if circular_depth.get(f):   issues.append(f"circular depth {circular_depth[f]}")
    if complex_types.get(f):    issues.append(f"type complexity {complex_types[f]}")
    if as_any.get(f):           issues.append(f"{as_any[f]}x as-any")
    if type_errors.get(f):      issues.append(f"{type_errors[f]} type errors")

    scores.append({
        'file':    f,
        'score':   total,
        'impact':  round(impact, 3),
        'risk':    round(risk, 3),
        'churn':   churn.get(f, 0),
        'coverage': covered_pct,
        'issues':  issues,
        'tier':    'high' if total > 0.15 else 'medium' if total > 0.05 else 'low',
    })

scores.sort(key=lambda x: x['score'], reverse=True)

output = {
    'generatedAt': __import__('datetime').datetime.utcnow().isoformat() + 'Z',
    'summary': {
        'total':  len(scores),
        'high':   sum(1 for s in scores if s['tier'] == 'high'),
        'medium': sum(1 for s in scores if s['tier'] == 'medium'),
        'low':    sum(1 for s in scores if s['tier'] == 'low'),
    },
    'files': scores,
}

with open('$REPORT_OUT', 'w') as f:
    json.dump(output, f, indent=2)

print(f"\n  Scored {len(scores)} files")
print(f"  High priority:   {output['summary']['high']}")
print(f"  Medium priority: {output['summary']['medium']}")
print(f"  Low priority:    {output['summary']['low']}")
print(f"\n  Top 5 files to address first:")
for s in scores[:5]:
    print(f"    [{s['tier'].upper():6}] {s['file']}  score={s['score']}  {', '.join(s['issues'][:2])}")
PYEOF

echo ""
echo "✅ Priority matrix written → $REPORT_OUT"
echo "   Next: feed high-tier files to LLM with references/llm-prompts.md templates"
