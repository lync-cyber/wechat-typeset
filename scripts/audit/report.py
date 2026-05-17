#!/usr/bin/env python3
# report.py — 生成 audit-report/llm-prompt.md
# audit.sh 完成各工具扫描后调用本脚本，把所有 JSON 汇总成可投喂给 LLM 的提示词

import json
import sys
from pathlib import Path
from datetime import datetime

# Windows GBK 终端下打印 ✓ 等 Unicode 字符会 UnicodeEncodeError，强制 stdout 走 utf-8
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

OUT = Path("audit-report")

def load(f, d=None):
    p = OUT / f
    if not p.exists():
        return d if d is not None else {}
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return d if d is not None else {}

summary    = load("summary.json")
knip       = load("knip.json")
complexity = load("complexity.json", [])
circular   = load("circular.json",   [])
eslint_raw = load("eslint.json",     [])
jscpd_path = OUT / "jscpd/jscpd-report.json"
jscpd      = json.loads(jscpd_path.read_text(encoding="utf-8")) if jscpd_path.exists() else {}
dc_raw     = load("depcruise.json", {"modules": []})

# ── 架构违规提取 ──────────────────────────────────────
arch_violations = []
for mod in dc_raw.get("modules", []):
    for dep in mod.get("dependencies", []):
        for rule in dep.get("rules", []):
            if rule.get("severity") in ("error", "warn"):
                arch_violations.append({
                    "rule":     rule.get("name"),
                    "severity": rule.get("severity"),
                    "from":     mod.get("source", "").split("/")[-3:],
                    "to":       dep.get("resolved", "").split("/")[-3:],
                })
arch_violations.sort(key=lambda x: x["severity"])

def norm_path(p: str) -> str:
    return p.replace("\\", "/") if isinstance(p, str) else ""

def tail(p: str, n: int = 2) -> str:
    return "/".join(norm_path(p).split("/")[-n:])

# ── 重复块 top 10 ──────────────────────────────────
clones = jscpd.get("duplicates", [])
top_clones = sorted(clones, key=lambda x: -x.get("lines", 0))[:10]

# ── knip 未使用导出汇总（top 25）─────────────────────
dead_export_entries = []
for issue in (knip.get("issues") or []):
    file_name = norm_path(issue.get("file", ""))
    for exp in (issue.get("exports") or []):
        dead_export_entries.append({"file": file_name, "symbol": exp.get("name", "?")})
    for t in (issue.get("types") or []):
        dead_export_entries.append({"file": file_name, "symbol": f"type {t.get('name', '?')}"})
unused_file_entries = []
for issue in (knip.get("issues") or []):
    for f in (issue.get("files") or []):
        unused_file_entries.append(norm_path(f.get("name", issue.get("file", "?"))))

# ── ESLint 统计 ────────────────────────────────────
eslint_warns = sum(f.get("warningCount", 0) for f in eslint_raw)
eslint_errs  = sum(f.get("errorCount", 0)   for f in eslint_raw)

# ── prompt 组装 ──────────────────────────────────────
lines = [
    "# TypeScript 代码质量 & 架构审查报告",
    f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
    "",
    "## 一、总览",
    "| 指标 | 值 | 说明 |",
    "|------|----|------|",
    f"| 未使用文件 | {summary.get('unused_files','?')} | 可直接删除候选 |",
    f"| 未使用导出 | {summary.get('dead_exports','?')} | 死代码，需确认无动态引用 |",
    f"| 未使用/未声明依赖 | {summary.get('unused_deps','?')} | package.json 清理候选 |",
    f"| 代码重复率 | {summary.get('duplicate_pct','?')}% | >10% 需重点关注 |",
    f"| 重复代码块 | {summary.get('duplicate_blocks','?')} | — |",
    f"| 高复杂度函数 | {summary.get('high_complexity_fns','?')} | CC>10 或 行数>80 |",
    f"| 循环依赖 | {summary.get('circular_deps','?')} | 架构健康核心指标 |",
    f"| 架构规则违规 | {summary.get('arch_violations','?')} | error 级别 |",
    f"| ESLint 警告/错误 | {eslint_warns}/{eslint_errs} | — |",
    "",
]

# 架构违规
lines += ["## 二、架构违规（最高优先级）"]
if arch_violations:
    for v in arch_violations[:20]:
        f = "/".join(v["from"]); t = "/".join(v["to"])
        lines.append(f"  - [{v['severity'].upper()}] {v['rule']}: {f} → {t}")
else:
    lines.append("  ✓ 无架构违规")

# 循环依赖
lines += ["", "## 三、循环依赖"]
if circular:
    for c in circular[:10]:
        f = c['file'].split('/')[-2:]
        d = ', '.join(str(x) for x in c['deps'][:3])
        lines.append(f"  - {'/'.join(f)} ↔ {d}")
else:
    lines.append("  ✓ 无循环依赖")

# 重复代码
lines += ["", "## 四、Top 重复代码块"]
if top_clones:
    for i, c in enumerate(top_clones, 1):
        fa = tail(c.get("firstFile", {}).get("name", ""))
        fb = tail(c.get("secondFile", {}).get("name", ""))
        ln = c.get("lines", 0); tk = c.get("tokens", 0)
        tk_str = f"/{tk}token" if tk else ""
        lines.append(f"  {i}. {fa} ↔ {fb} — {ln}行{tk_str}")
else:
    lines.append("  ✓ 无明显重复块")

# 高复杂度函数
lines += ["", "## 五、高复杂度函数"]
if complexity:
    for fn in complexity[:15]:
        reason = f" [{fn['reason']}]" if fn.get("reason") else ""
        lines.append(f"  - {fn['file']} :: {fn['name']}  行={fn['lines']} CC={fn['cc']}{reason}")
else:
    lines.append("  ✓ 无高复杂度函数")

# 未使用文件
lines += ["", "## 六、未使用文件（删除候选）"]
if unused_file_entries:
    for f in unused_file_entries[:25]:
        lines.append(f"  - {f}")
else:
    lines.append("  ✓ 无未使用文件")

# 未使用导出
lines += ["", "## 七、未使用导出（死代码）"]
if dead_export_entries:
    for item in dead_export_entries[:25]:
        lines.append(f"  - {item['file']} → {item['symbol']}")
else:
    lines.append("  ✓ 无未使用导出")

# 任务指令
lines += ["", """## 审查任务
请基于以上数据完成以下分析（中文回答）:

**P0 — 架构问题**
1. 列出所有架构违规，说明违反了哪条设计原则，并给出修复方案
2. 分析循环依赖的根因，给出依赖图解耦建议

**P1 — 代码质量**
3. 选出 Top 5 最严重的重复代码，说明如何抽取公共模块
4. 对复杂度最高的 3 个函数，给出具体拆分步骤

**P2 — 清理任务**
5. 哪些未使用导出可以安全删除？哪些可能有动态引用风险？
6. 整体技术债严重程度评分（1-10）及清理优先级路线图"""]

prompt = "\n".join(lines)
out_file = OUT / "llm-prompt.md"
out_file.write_text(prompt, encoding="utf-8")
print(f"  ✓ LLM prompt → {out_file}  ({len(prompt):,} chars)")
