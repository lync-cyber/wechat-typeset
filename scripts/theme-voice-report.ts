#!/usr/bin/env tsx
/**
 * 主题 voice 覆盖度报告 CLI。
 *
 * `pnpm voice:report` —— 控制台输出 14 主题的覆盖率表格 + 各级 issue 计数。
 * `pnpm voice:report --json` —— 输出结构化 JSON（CI 集成 / 写到 release notes）。
 * `pnpm voice:report --theme <id>` —— 只看单主题，含 issue 明细。
 *
 * 渲染指标完全复用 analyzeThemeVoice（src/core/themes/_shared/spec/voice.ts），
 * 本脚本仅做"format + CLI 参数路由"，无重复分析逻辑。
 */

import {
  analyzeThemeVoice,
  type ThemeVoiceResult,
} from '../src/core/themes/_shared/spec'
import { loadAllSpecs } from './_lib'

function fmtRate(rate: number): string {
  return `${(rate * 100).toFixed(0).padStart(3)}%`
}

function printTable(results: ThemeVoiceResult[]): void {
  // eslint-disable-next-line no-console
  console.table(
    results.map((r) => ({
      id: r.themeId,
      rate: fmtRate(r.coverage.rate),
      containers: `${r.coverage.coveredContainers}/${r.coverage.expectedContainers}`,
      elements: `${r.coverage.coveredElements}/${r.coverage.expectedElements}`,
      errors: r.errors.length,
      warnings: r.warnings.length,
      infos: r.infos.length,
    })),
  )
}

function printDetail(r: ThemeVoiceResult): void {
  const cov = r.coverage
  // eslint-disable-next-line no-console
  console.log(
    `\n=== ${r.themeId} ===\n` +
      `覆盖率 ${fmtRate(cov.rate)}  容器 ${cov.coveredContainers}/${cov.expectedContainers}  元素 ${cov.coveredElements}/${cov.expectedElements}\n`,
  )
  for (const level of ['error', 'warning', 'info'] as const) {
    const items = r.issues.filter((i) => i.level === level)
    if (items.length === 0) continue
    // eslint-disable-next-line no-console
    console.log(`-- ${level.toUpperCase()} (${items.length})`)
    for (const it of items) {
      // eslint-disable-next-line no-console
      console.log(`   ${it.path}: ${it.message}`)
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  const jsonMode = args.includes('--json')
  const themeFlag = args.findIndex((a) => a === '--theme')
  const wantTheme = themeFlag >= 0 ? args[themeFlag + 1] : undefined

  const loaded = await loadAllSpecs()
  const results = loaded.map(({ spec }) => analyzeThemeVoice(spec))

  if (jsonMode) {
    // 失败主题非零退出码；CI 可直接 fail
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(results, null, 2))
    if (results.some((r) => r.errors.length > 0)) process.exit(1)
    return
  }

  if (wantTheme) {
    const r = results.find((x) => x.themeId === wantTheme)
    if (!r) {
      console.error(`Unknown theme id: ${wantTheme}`)
      console.error(`Available: ${results.map((x) => x.themeId).join(', ')}`)
      process.exit(2)
    }
    printDetail(r)
    if (r.errors.length > 0) process.exit(1)
    return
  }

  printTable(results)
  const failed = results.filter((r) => r.errors.length > 0)
  if (failed.length > 0) {
    console.error(
      `\n[voice:report] ${failed.length}/${results.length} 主题覆盖度低于阈值：${failed.map((r) => r.themeId).join(', ')}`,
    )
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
