#!/usr/bin/env tsx
/**
 * Variant 实证采用率报告 CLI。
 *
 * `pnpm variant:usage` —— 汇总表（每 kind 的 default/themeCompat/orphan 计数）
 * `pnpm variant:usage --json` —— 结构化 JSON
 * `pnpm variant:usage --orphans` —— 只列 orphan + 是否已标 experimental
 *
 * 分析逻辑全部在 src/core/variants/usage.ts；本脚本仅做 IO + 格式化。
 */

import { analyzeVariantUsage, type VariantUsageEntry, type VariantUsageReport } from '../src/core/variants/usage'
import { ALL_VARIANT_DEFS } from '../src/core/variants/registry'
import { loadAllSpecs } from './_lib'

function summary(report: VariantUsageReport): void {
  // 按 kind 汇总
  const byKind: Record<string, { total: number; def: number; tc: number; orphan: number; unflagged: number }> = {}
  for (const e of report.entries) {
    const row = (byKind[e.kind] ??= { total: 0, def: 0, tc: 0, orphan: 0, unflagged: 0 })
    row.total += 1
    if (e.status === 'default') row.def += 1
    else if (e.status === 'themeCompat') row.tc += 1
    else {
      row.orphan += 1
      if (!e.experimental) row.unflagged += 1
    }
  }
  // eslint-disable-next-line no-console
  console.table(
    Object.entries(byKind).map(([kind, r]) => ({
      kind,
      total: r.total,
      default: r.def,
      themeCompat: r.tc,
      orphan: r.orphan,
      'orphan/未标 experimental': r.unflagged,
    })),
  )
  if (report.unknownReferenced.length > 0) {
    console.error('\n[variant:usage] 主题引用了 VARIANT_IDS 外的 variant：')
    for (const u of report.unknownReferenced) console.error(`  · ${u.themeId} → ${u.kind}/${u.id}`)
  }
}

function listOrphans(report: VariantUsageReport): void {
  for (const e of report.orphans) {
    const flag = e.experimental ? '[experimental ✓]' : '[未标 experimental ✗]'
    // eslint-disable-next-line no-console
    console.log(`${e.kind.padEnd(14)} ${e.id.padEnd(22)} ${flag}`)
  }
  const unflagged = report.orphans.filter((e) => !e.experimental)
  if (unflagged.length > 0) {
    console.error(
      `\n[variant:usage] ${unflagged.length} 个 orphan 未标 experimental（违反 conformance 守卫）。`,
    )
    process.exit(1)
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const json = args.includes('--json')
  const orphansOnly = args.includes('--orphans')
  const loaded = await loadAllSpecs()
  const report = analyzeVariantUsage(loaded.map((l) => l.spec), [...ALL_VARIANT_DEFS])
  if (json) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(report, null, 2))
    return
  }
  if (orphansOnly) {
    listOrphans(report)
    return
  }
  summary(report)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
