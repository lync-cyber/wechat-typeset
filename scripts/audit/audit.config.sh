#!/usr/bin/env bash
# audit.config.sh — TypeScript 审查统一配置
# audit.sh 启动时会 source 本文件；直接修改后重跑 audit.sh 即可生效

# ═══════════════════════════════════════════════
#  路径配置（相对项目根）
# ═══════════════════════════════════════════════
AUDIT_SRC="src"
AUDIT_OUT="audit-report"
AUDIT_TSCONFIG="tsconfig.json"

# ═══════════════════════════════════════════════
#  模块开关（true/false）
# ═══════════════════════════════════════════════
ENABLE_KNIP="true"          # 死代码 / 未使用导出
ENABLE_JSCPD="true"         # 重复代码检测
ENABLE_ESLINT="true"        # 未使用变量（沿用 eslint.config.js）
ENABLE_COMPLEXITY="true"    # 函数复杂度扫描
ENABLE_CIRCULAR="true"      # 循环依赖（Madge）
ENABLE_DEPCRUISE="true"     # 架构边界规则（dependency-cruiser）
ENABLE_TSARCH="false"       # ts-arch 架构单测（需先调整 arch.test.ts）
ENABLE_REPORT="true"        # 生成 LLM prompt
ENABLE_GRAPH="false"        # 生成依赖 SVG（需安装 Graphviz dot）

# ═══════════════════════════════════════════════
#  阈值（超过则 --ci 模式失败；设为 -1 表示只警告不 fail）
# ═══════════════════════════════════════════════
THRESHOLD_DUPLICATION=15
THRESHOLD_CIRCULAR=0
THRESHOLD_DEAD_EXPORTS=-1
THRESHOLD_COMPLEXITY_CC=10
THRESHOLD_COMPLEXITY_LINES=80
THRESHOLD_ARCH_VIOLATIONS=0

# ═══════════════════════════════════════════════
#  jscpd
# ═══════════════════════════════════════════════
JSCPD_MIN_TOKENS=40
JSCPD_MIN_LINES=5
JSCPD_IGNORE="**/*.test.ts,**/*.spec.ts,**/*.d.ts,**/__snapshots__/**,**/dist/**,**/audit-report/**"

# ═══════════════════════════════════════════════
#  架构层级（按 wechat-typeset 实际目录定义）
#  依赖方向：core → domain → infra → ui → app
#  （即 core 只能被依赖、app 只能依赖其它层）
# ═══════════════════════════════════════════════
ARCH_LAYER_CORE="src/core/**"
ARCH_LAYER_DOMAIN="src/domain/**"
ARCH_LAYER_INFRA="src/infra/**"
ARCH_LAYER_UI="src/ui/**"
ARCH_LAYER_APP="src/app/**"

# ═══════════════════════════════════════════════
#  Madge
# ═══════════════════════════════════════════════
MADGE_EXTENSIONS="ts,tsx"
MADGE_EXCLUDE="\.test\.|\.spec\.|\.d\.ts$|/__snapshots__/|/dist/|/audit-report/"

# ═══════════════════════════════════════════════
#  输出控制
# ═══════════════════════════════════════════════
VERBOSE="false"
FAIL_FAST="false"
COLOR="true"

# ═══════════════════════════════════════════════
#  ts-arch 测试运行器
#  本项目用 vitest（非 jest）；ENABLE_TSARCH=true 时生效
# ═══════════════════════════════════════════════
TSARCH_RUNNER="vitest"
