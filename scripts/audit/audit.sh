#!/usr/bin/env bash
# ts-audit v2 — TypeScript 全栈代码审查
#
# 用法:
#   bash scripts/audit/audit.sh                           # 全量扫描（按 audit.config.sh 默认开关）
#   bash scripts/audit/audit.sh --src lib --out reports   # 覆盖路径
#   bash scripts/audit/audit.sh --only circular,depcruise # 只跑指定模块
#   bash scripts/audit/audit.sh --skip knip,eslint        # 跳过指定模块
#   bash scripts/audit/audit.sh --llm                     # 额外生成 LLM prompt
#   bash scripts/audit/audit.sh --ci                      # CI 模式（超阈值退出 1）
#
# 必须从项目根目录调用：AUDIT_SRC / AUDIT_TSCONFIG / AUDIT_OUT 都是相对路径

set -euo pipefail

# ── 项目根定位 ─────────────────────────────────────
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(cd "$SCRIPT_DIR/../.." && pwd)
cd "$PROJECT_ROOT"

# ── 加载配置 ─────────────────────────────────────────
CONFIG_FILE="${SCRIPT_DIR}/audit.config.sh"
[[ -f "$CONFIG_FILE" ]] && source "$CONFIG_FILE" || {
  echo "警告: 未找到 audit.config.sh，使用内置默认值"
  AUDIT_SRC="src"; AUDIT_OUT="audit-report"; AUDIT_TSCONFIG="tsconfig.json"
  ENABLE_KNIP="true"; ENABLE_JSCPD="true"; ENABLE_ESLINT="true"
  ENABLE_COMPLEXITY="true"; ENABLE_CIRCULAR="true"
  ENABLE_DEPCRUISE="true"; ENABLE_TSARCH="false"
  ENABLE_REPORT="true"; ENABLE_GRAPH="false"
  THRESHOLD_DUPLICATION=15; THRESHOLD_CIRCULAR=0
  THRESHOLD_DEAD_EXPORTS=-1; THRESHOLD_ARCH_VIOLATIONS=0
  THRESHOLD_COMPLEXITY_CC=10; THRESHOLD_COMPLEXITY_LINES=80
  JSCPD_MIN_TOKENS=40; JSCPD_MIN_LINES=5
  JSCPD_IGNORE="**/*.test.ts,**/*.spec.ts,**/*.d.ts"
  MADGE_EXTENSIONS="ts,tsx"; MADGE_EXCLUDE="\.test\.|\.spec\.|\.d\.ts$"
  TSARCH_RUNNER="vitest"
  VERBOSE="false"; FAIL_FAST="false"; COLOR="true"
}

# ── CLI 参数覆盖 ──────────────────────────────────────
LLM_MODE="false"; CI_MODE="false"; ONLY=""; SKIP=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --src)        AUDIT_SRC="$2";     shift 2 ;;
    --out)        AUDIT_OUT="$2";     shift 2 ;;
    --tsconfig)   AUDIT_TSCONFIG="$2"; shift 2 ;;
    --only)       ONLY="$2";          shift 2 ;;
    --skip)       SKIP="$2";          shift 2 ;;
    --llm)        LLM_MODE="true";    shift ;;
    --ci)         CI_MODE="true";     shift ;;
    --verbose)    VERBOSE="true";     shift ;;
    --no-color)   COLOR="false";      shift ;;
    *) echo "未知参数: $1"; shift ;;
  esac
done

# ── --only / --skip 解析为开关覆盖 ───────────────────
apply_filter() {
  local name=$1
  if [[ -n "$ONLY" ]]; then
    [[ ",$ONLY," == *",$name,"* ]] && echo "true" || echo "false"
  elif [[ -n "$SKIP" ]]; then
    [[ ",$SKIP," == *",$name,"* ]] && echo "false" || eval echo \$ENABLE_${name^^}
  else
    eval echo \$ENABLE_${name^^}
  fi
}

ENABLE_KNIP=$(apply_filter knip)
ENABLE_JSCPD=$(apply_filter jscpd)
ENABLE_ESLINT=$(apply_filter eslint)
ENABLE_COMPLEXITY=$(apply_filter complexity)
ENABLE_CIRCULAR=$(apply_filter circular)
ENABLE_DEPCRUISE=$(apply_filter depcruise)
ENABLE_TSARCH=$(apply_filter tsarch)

# ── 工具函数 ─────────────────────────────────────────
FAILS=()
log()  { [[ "$COLOR" == "true" ]] && echo -e "\033[1;36m[audit]\033[0m $*" || echo "[audit] $*"; }
ok()   { [[ "$COLOR" == "true" ]] && echo -e "\033[1;32m  ✓\033[0m $*" || echo "  ✓ $*"; }
warn() { [[ "$COLOR" == "true" ]] && echo -e "\033[1;33m  !\033[0m $*" || echo "  ! $*"; }
skip() { echo "  - 跳过: $*"; }

check_threshold() {
  local name="$1" val="$2" limit="$3"
  [[ "$limit" == "-1" ]] && return
  if (( $(echo "$val > $limit" | bc -l 2>/dev/null || echo 0) )); then
    warn "$name 超阈值: $val > $limit"
    FAILS+=("$name=$val(limit=$limit)")
    [[ "$FAIL_FAST" == "true" ]] && { echo "FAIL_FAST 触发，退出"; exit 1; }
  fi
}

has_cmd() { command -v "$1" &>/dev/null; }

mkdir -p "$AUDIT_OUT"
echo "{ \"started\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\" }" > "$AUDIT_OUT/.meta.json"

log "TypeScript Audit v2  src=$AUDIT_SRC  out=$AUDIT_OUT  root=$PROJECT_ROOT"
echo

# ════════════════════════════════════════════════════
#  代码质量层
# ════════════════════════════════════════════════════

# ── 1. knip ──────────────────────────────────────────
if [[ "$ENABLE_KNIP" == "true" ]]; then
  log "[knip] 未使用文件 / 导出 / 依赖…"
  npx knip --reporter json > "$AUDIT_OUT/knip.json" 2> "$AUDIT_OUT/knip.log" || true
  read DEAD UFILES UDEPS < <(node -e "
    try {
      const k = require('./$AUDIT_OUT/knip.json')
      let de=0, uf=0, ud=0
      for (const i of (k.issues||[])) {
        de += (i.exports||[]).length + (i.types||[]).length + (i.enumMembers||[]).length
        uf += (i.files||[]).length
        ud += (i.dependencies||[]).length + (i.devDependencies||[]).length + (i.unlisted||[]).length
      }
      console.log(de, uf, ud)
    } catch { console.log('0 0 0') }
  ")
  ok "knip: $DEAD 个未使用导出，$UFILES 个未使用文件，$UDEPS 个依赖问题"
  check_threshold "dead_exports" "$DEAD" "$THRESHOLD_DEAD_EXPORTS"
else
  skip knip
fi

# ── 2. jscpd ─────────────────────────────────────────
if [[ "$ENABLE_JSCPD" == "true" ]]; then
  log "[jscpd] 重复代码块…"
  npx jscpd "$AUDIT_SRC" \
    --min-tokens "$JSCPD_MIN_TOKENS" \
    --min-lines  "$JSCPD_MIN_LINES" \
    --reporters  "json" \
    --output     "$AUDIT_OUT/jscpd" \
    --ignore     "$JSCPD_IGNORE" > "$AUDIT_OUT/jscpd.log" 2>&1 || true
  read PCT CLONES < <(node -e "
    try {
      const r = require('./$AUDIT_OUT/jscpd/jscpd-report.json')
      const t = r.statistics?.total ?? {}
      console.log((t.percentage ?? 0), (t.clones ?? 0))
    } catch { console.log('0 0') }
  ")
  ok "jscpd: 重复率 ${PCT}%（${CLONES} 个重复块）"
  check_threshold "duplication_pct" "$PCT" "$THRESHOLD_DUPLICATION"
else
  skip jscpd
fi

# ── 3. ESLint ─────────────────────────────────────────
if [[ "$ENABLE_ESLINT" == "true" ]]; then
  log "[eslint] 未使用变量 / 导入…"
  npx eslint "$AUDIT_SRC" \
    --format json --output-file "$AUDIT_OUT/eslint.json" || true
  ok "eslint 完成"
else
  skip eslint
fi

# ── 4. 复杂度 (ts-morph) ──────────────────────────────
if [[ "$ENABLE_COMPLEXITY" == "true" ]]; then
  log "[complexity] 函数复杂度…"
  node - <<JSEOF
const { Project } = require('ts-morph')
const fs = require('fs')
const path = require('path')
const ROOT = process.cwd()
const SRC_DIR = path.resolve(ROOT, '${AUDIT_SRC}')
const p = new Project({ tsConfigFilePath: '${AUDIT_TSCONFIG}', skipFileDependencyResolution: true })
const results = [], CC_LIMIT = ${THRESHOLD_COMPLEXITY_CC}, LN_LIMIT = ${THRESHOLD_COMPLEXITY_LINES}
p.getSourceFiles()
  .filter(sf => {
    const abs = path.resolve(sf.getFilePath())
    return abs.startsWith(SRC_DIR + path.sep) && !/(?:^|\\\\|\\/)(node_modules|dist|audit-report)(?:\\\\|\\/)/.test(abs)
  })
  .forEach(sf => {
    const fns = [...sf.getFunctions(), ...sf.getClasses().flatMap(c => c.getMethods())]
    fns.forEach(fn => {
      const lines = fn.getEndLineNumber() - fn.getStartLineNumber()
      const body  = fn.getText()
      const cc = (body.match(/\b(if|else if|for|while|case|catch|\?\?|\?\.|&&|\|\|)/g)||[]).length + 1
      const overCC = cc > CC_LIMIT, overLN = lines > LN_LIMIT
      if (overCC || overLN) {
        const rel = path.relative(ROOT, sf.getFilePath()).replace(/\\\\/g, '/')
        const reasons = [overCC && \`cc>\${CC_LIMIT}\`, overLN && \`lines>\${LN_LIMIT}\`].filter(Boolean).join('+')
        results.push({ file: rel, name: fn.getName?.() || 'anonymous', lines, cc, reason: reasons })
      }
    })
  })
results.sort((a,b) => (b.cc + b.lines) - (a.cc + a.lines))
fs.writeFileSync('${AUDIT_OUT}/complexity.json', JSON.stringify(results, null, 2))
console.log('  ✓ complexity: 发现', results.length, '个高复杂度函数')
JSEOF
else
  skip complexity
fi

# ════════════════════════════════════════════════════
#  架构层
# ════════════════════════════════════════════════════
echo

# ── 5. Madge — 循环依赖 ───────────────────────────────
if [[ "$ENABLE_CIRCULAR" == "true" ]]; then
  log "[madge] 循环依赖扫描…"
  npx madge "$AUDIT_SRC" \
    --extensions "$MADGE_EXTENSIONS" \
    --exclude   "$MADGE_EXCLUDE" \
    --ts-config  "$AUDIT_TSCONFIG" \
    --circular --json > "$AUDIT_OUT/circular-raw.json" 2>&1 || true
  node - <<JSEOF
const fs = require('fs')
let raw
try { raw = JSON.parse(fs.readFileSync('${AUDIT_OUT}/circular-raw.json', 'utf8')) } catch { raw = [] }
const cycles = Array.isArray(raw)
  ? raw.map(chain => ({ file: chain[0], deps: chain.slice(1) }))
  : []
fs.writeFileSync('${AUDIT_OUT}/circular.json', JSON.stringify(cycles, null, 2))
console.log('  ✓ madge: 发现', cycles.length, '个循环依赖链')
JSEOF
  CIRC=$(node -e "try{console.log(require('./$AUDIT_OUT/circular.json').length)}catch{console.log(0)}")
  check_threshold "circular_deps" "$CIRC" "$THRESHOLD_CIRCULAR"
else
  skip circular
fi

# ── 6. dependency-cruiser — 架构规则 ─────────────────
if [[ "$ENABLE_DEPCRUISE" == "true" ]]; then
  log "[depcruise] 架构边界规则校验…"
  DCFG="${SCRIPT_DIR}/.dep-cruiser.js"
  if [[ ! -f "$DCFG" ]]; then
    warn "$DCFG 不存在，跳过 depcruise"
  else
    npx depcruise "$AUDIT_SRC" \
      --config   "$DCFG" \
      --output-type json \
      --ts-config "$AUDIT_TSCONFIG" \
      > "$AUDIT_OUT/depcruise.json" 2>&1 || true
    VIOL=$(node -e "
      try {
        const r = require('./$AUDIT_OUT/depcruise.json')
        const v = (r.modules||[]).flatMap(m => m.dependencies||[])
          .filter(d => d.rules?.some(r => r.severity === 'error')).length
        console.log(v)
      } catch { console.log(0) }")
    ok "depcruise: 发现 $VIOL 个架构违规 (error 级别)"
    check_threshold "arch_violations" "$VIOL" "$THRESHOLD_ARCH_VIOLATIONS"

    if [[ "$ENABLE_GRAPH" == "true" ]] && has_cmd dot; then
      npx depcruise "$AUDIT_SRC" --config "$DCFG" \
        --output-type dot --ts-config "$AUDIT_TSCONFIG" \
        | dot -T svg > "$AUDIT_OUT/dep-graph.svg"
      ok "依赖图 → $AUDIT_OUT/dep-graph.svg"
    fi
  fi
else
  skip depcruise
fi

# ── 7. ts-arch 架构单测（vitest 运行） ────────────────
if [[ "$ENABLE_TSARCH" == "true" ]]; then
  log "[ts-arch] 架构约束单测…"
  ARCH_TEST="${SCRIPT_DIR}/arch.test.ts"
  if [[ ! -f "$ARCH_TEST" ]]; then
    warn "$ARCH_TEST 不存在"
  else
    if [[ "$TSARCH_RUNNER" == "vitest" ]]; then
      if npx vitest run "$ARCH_TEST" --reporter=json \
           --outputFile="$AUDIT_OUT/tsarch.json" 2>&1 | tail -5; then
        ok "ts-arch: 所有架构约束通过"
      else
        warn "ts-arch: 架构约束有失败项"
        FAILS+=("tsarch_tests")
      fi
    else
      if npx jest "$ARCH_TEST" --json \
           --outputFile="$AUDIT_OUT/tsarch.json" 2>&1 | tail -5; then
        ok "ts-arch: 所有架构约束通过"
      else
        warn "ts-arch: 架构约束有失败项"
        FAILS+=("tsarch_tests")
      fi
    fi
  fi
else
  skip tsarch
fi

# ════════════════════════════════════════════════════
#  汇总 & 报告
# ════════════════════════════════════════════════════
echo
log "汇总结果…"

node - <<JSEOF
const fs = require('fs'), path = require('path'), OUT = '${AUDIT_OUT}'
const safe = (f, d={}) => { try { return JSON.parse(fs.readFileSync(path.join(OUT,f),'utf8')) } catch { return d } }
const knip   = safe('knip.json')
const jscpd  = safe('jscpd/jscpd-report.json')
const cx     = safe('complexity.json', [])
const circ   = safe('circular.json',   [])
const dc     = safe('depcruise.json',  { modules: [] })
const archV  = (dc.modules||[]).flatMap(m=>m.dependencies||[]).filter(d=>d.rules?.some(r=>r.severity==='error')).length
let deadExports = 0, unusedFiles = 0, unusedDeps = 0
for (const i of (knip.issues || [])) {
  deadExports += (i.exports||[]).length + (i.types||[]).length + (i.enumMembers||[]).length
  unusedFiles += (i.files||[]).length
  unusedDeps  += (i.dependencies||[]).length + (i.devDependencies||[]).length + (i.unlisted||[]).length
}
const summary = {
  generated:           new Date().toISOString(),
  dead_exports:        deadExports,
  unused_files:        unusedFiles,
  unused_deps:         unusedDeps,
  duplicate_blocks:    jscpd.statistics?.total?.clones ?? 0,
  duplicate_pct:       parseFloat(jscpd.statistics?.total?.percentage ?? 0).toFixed(1),
  high_complexity_fns: cx.length,
  circular_deps:       circ.length,
  arch_violations:     archV,
}
fs.writeFileSync(path.join(OUT,'summary.json'), JSON.stringify(summary, null, 2))
const pad = s => String(s).padStart(6)
console.log('')
console.log('  ┌─────────────────────────────────┐')
console.log('  │      Audit Summary              │')
console.log('  ├─────────────────────────────────┤')
Object.entries(summary).filter(([k])=>k!=='generated').forEach(([k,v])=>{
  console.log('  │  ' + k.padEnd(24) + pad(v) + '  │')
})
console.log('  └─────────────────────────────────┘')
JSEOF

# LLM 报告
if [[ "$LLM_MODE" == "true" || "$ENABLE_REPORT" == "true" ]]; then
  PYBIN=""
  for p in python3 python py; do
    if has_cmd "$p"; then PYBIN="$p"; break; fi
  done
  if [[ -n "$PYBIN" ]]; then
    "$PYBIN" "${SCRIPT_DIR}/report.py"
  else
    warn "未找到 python，跳过 LLM prompt 生成"
  fi
fi

# CI 退出码
if [[ "$CI_MODE" == "true" && ${#FAILS[@]} -gt 0 ]]; then
  echo
  warn "以下指标超阈值: ${FAILS[*]}"
  exit 1
fi

ok "完成 → $AUDIT_OUT/"
