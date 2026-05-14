/**
 * Bundle size guard —— 读 .size-budget.json，校验 `dist/assets/` 各 chunk 不超预算。
 *
 * 为什么自写而非 size-limit：
 *   size-limit 拉 30+ transitive deps 只为做"读文件 + gzip + 比阈值"。Node 24 自带
 *   `zlib.gzipSync` + `fs.readdirSync`，60 行就能干完，与仓库现有 `tsx scripts/*`
 *   风格一致；CI 入口一行 `npm run check:size` 即可。
 *
 * 工作流：
 *   1. `npm run build` 产出 `dist/assets/<prefix>-<hash>.<ext>`
 *   2. 本脚本按 prefix 匹配（hash 不入断言），逐 entry 校验 raw + gzip
 *   3. `mustBeLazyChunk: true` 的 entry 额外断言：除 entry 本身外，其它 .js 不得
 *      包含其源码模块标志，确保 lazy import 没被静态化进主 bundle
 *
 * 调优思路：
 *   - 阈值给 ~13% headroom（避免噪声 hash diff 触发误报）
 *   - 单 chunk 涨 > headroom 时不要顺手放宽阈值——先想清楚为什么涨
 *   - 新 chunk 出现：必须显式在 .size-budget.json 加 entry，否则会被未注册告警拦下
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface BudgetEntry {
  name: string
  prefix: string
  ext: 'js' | 'css'
  limit: number
  gzipLimit: number
  mustNotEmbed?: string[]
}

interface BudgetFile {
  distDir: string
  entries: BudgetEntry[]
}

const __filename = fileURLToPath(import.meta.url)
const ROOT = resolve(dirname(__filename), '..')
const BUDGET_PATH = join(ROOT, '.size-budget.json')

function fmt(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} kB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function loadBudget(): BudgetFile {
  if (!existsSync(BUDGET_PATH)) {
    throw new Error(`.size-budget.json 不存在：${BUDGET_PATH}`)
  }
  const raw = readFileSync(BUDGET_PATH, 'utf-8')
  const parsed = JSON.parse(raw) as BudgetFile
  if (!parsed.distDir || !Array.isArray(parsed.entries)) {
    throw new Error('.size-budget.json 结构错：需要 distDir / entries[]')
  }
  return parsed
}

function findChunkFile(distDir: string, entry: BudgetEntry): string | null {
  const files = readdirSync(distDir)
  // 命名约定：`<prefix>-<hash>.<ext>` 或 `<prefix>.esm-<hash>.<ext>`（html2canvas 默认导出）
  const prefixPattern = new RegExp(`^${entry.prefix}(\\.esm)?-[\\w-]+\\.${entry.ext}$`)
  const matches = files.filter((f) => prefixPattern.test(f))
  if (matches.length === 0) return null
  if (matches.length > 1) {
    throw new Error(
      `entry "${entry.name}" 匹配到 ${matches.length} 个文件：${matches.join(', ')}`,
    )
  }
  return join(distDir, matches[0])
}

interface CheckResult {
  ok: boolean
  message: string
}

function checkEntry(distDir: string, entry: BudgetEntry): CheckResult[] {
  const results: CheckResult[] = []
  const filePath = findChunkFile(distDir, entry)
  if (!filePath) {
    return [
      {
        ok: false,
        message: `[${entry.name}] 未找到匹配文件（prefix=${entry.prefix}, ext=${entry.ext}）`,
      },
    ]
  }
  const content = readFileSync(filePath)
  const raw = content.byteLength
  const gz = gzipSync(content).byteLength
  const rawOk = raw <= entry.limit
  const gzOk = gz <= entry.gzipLimit
  results.push({
    ok: rawOk && gzOk,
    message:
      `[${entry.name}] ${fmt(raw)} / gz ${fmt(gz)}` +
      ` (limit ${fmt(entry.limit)} / gz ${fmt(entry.gzipLimit)})` +
      (rawOk && gzOk ? ' ok' : ' OVER'),
  })

  if (entry.mustNotEmbed && entry.mustNotEmbed.length > 0) {
    const text = content.toString('utf-8')
    for (const needle of entry.mustNotEmbed) {
      // 允许"动态 import 的 chunk URL 引用"——形如 `"html2canvas.esm-xxxx.js"`
      // 不允许该库的源码痕迹（同名出现但非 chunk URL）。
      const re = new RegExp(needle, 'g')
      const all = text.match(re) ?? []
      const asChunkUrl = text.match(new RegExp(needle + '[\\.\\-][\\w\\-]+\\.js', 'g')) ?? []
      const embedded = all.length - asChunkUrl.length
      results.push({
        ok: embedded <= 0,
        message:
          `[${entry.name}] mustNotEmbed "${needle}": URL refs=${asChunkUrl.length}, 嵌入痕迹=${embedded}` +
          (embedded <= 0 ? ' ok' : ' LEAKED'),
      })
    }
  }

  return results
}

function main(): void {
  const budget = loadBudget()
  const distDir = resolve(ROOT, budget.distDir)
  if (!existsSync(distDir)) {
    throw new Error(`产物目录不存在：${distDir}（先跑 npm run build）`)
  }
  // 兜底：dist 里所有 .js / .css 文件都必须挂上 entry，否则新加的 chunk 会逃过预算
  const registered = new Set<string>()
  for (const e of budget.entries) {
    const fp = findChunkFile(distDir, e)
    if (fp) registered.add(fp)
  }
  const stray = readdirSync(distDir)
    .filter((f) => /\.(js|css)$/.test(f))
    .map((f) => join(distDir, f))
    .filter((p) => !registered.has(p))

  let allOk = true
  const lines: string[] = []
  for (const entry of budget.entries) {
    const rs = checkEntry(distDir, entry)
    for (const r of rs) {
      lines.push(r.message)
      if (!r.ok) allOk = false
    }
  }
  for (const s of stray) {
    const name = s.split(/[\\/]/).pop()
    lines.push(`[未注册产物] ${name} 没有匹配的 .size-budget.json entry`)
    allOk = false
  }

  // eslint-disable-next-line no-console
  console.log(lines.join('\n'))
  if (!allOk) {
    // eslint-disable-next-line no-console
    console.error('\n[check-size] 超预算或新增 chunk 未登记；请在 .size-budget.json 评估后调整。')
    process.exit(1)
  }
  // eslint-disable-next-line no-console
  console.log(`\n[check-size] 全部 ${budget.entries.length} 个 entry 在预算内。`)
}

main()
