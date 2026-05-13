#!/usr/bin/env tsx
/**
 * 从 `src/containers/vocabulary.ts` 派生写作契约文档里的速查表段。
 *
 * 为什么：速查表（容器清单 + 签名标记 + 一句话用途）是词汇表的完整下游投影——
 * 作者按表写 fence，新增容器时表必须同步更新。手写容易漂移。
 *
 * 工作方式：
 *   - 容器按本文件内的 PACK_OF[name] 分入 base / data-brief 两个包
 *   - 各包的速查表分别写进对应文档的 `<!-- generated:container-quick-ref:<pack>:start/end -->` 标记之间
 *     - base       → docs/contract/base.md
 *     - data-brief → docs/contract/packs/data-brief.md
 *   - 其余手写段落保留不动
 *
 * 命令：
 *   tsx scripts/build-writer-docs.ts          # 原地更新
 *   tsx scripts/build-writer-docs.ts --check  # CI 模式：差异即 exit 1
 *
 * 新增 pack：
 *   1. 在 PACK_OF 里给新 pack 的容器登记 packId
 *   2. 在 PACK_TARGETS 里登记 packId → 目标文档路径
 *   3. 目标文档里手工放置 `<!-- generated:container-quick-ref:<packId>:start/end -->` 标记对
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { CONTAINER_VOCABULARY } from '../src/containers/vocabulary'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/themes/_shared/spec'

// ─────────────────────────────────────────────────────────────
// Pack 归属：哪个容器属于"基础契约"，哪个属于"扩展契约"。
//
// 规则：未在 PACK_OF 中显式列出的容器，默认归入 'base'。
// 新增 data-brief（或其他领域）专属容器时，在这里登记即可。
// ─────────────────────────────────────────────────────────────

type PackId = 'base' | 'data-brief'

const PACK_OF: Record<string, PackId> = {
  // data-brief 家族：刊物气质 + 数据可视化
  masthead: 'data-brief',
  'section-tag': 'data-brief',
  toc: 'data-brief',
  'toc-item': 'data-brief',
  'kpi-dashboard': 'data-brief',
  'kpi-item': 'data-brief',
  'bar-chart': 'data-brief',
  bar: 'data-brief',
  'qa-block': 'data-brief',
  footnotes: 'data-brief',
  'cta-bar': 'data-brief',
  'qr-follow': 'data-brief',
}

function packOf(name: string): PackId {
  return PACK_OF[name] ?? 'base'
}

interface PackTarget {
  /** 文档绝对路径（resolve 自 cwd） */
  docPath: string
  /** 速查段开头说明的一句话 */
  intro: string
}

const PACK_TARGETS: Record<PackId, PackTarget> = {
  base: {
    docPath: resolve(process.cwd(), 'docs/contract/base.md'),
    intro: '所有主题都覆盖渲染；写作者无需关心当前主题是谁。带 ★ 是可登记的**签名容器**。',
  },
  'data-brief': {
    docPath: resolve(process.cwd(), 'docs/contract/packs/data-brief.md'),
    intro:
      '为数据简报 / 财经栏目化版面设计的签名元素。' +
      '在其他主题里语法仍合法，但会回退到中性兜底样式（不塌版，少签名）。带 ★ 是可登记的**签名容器**。',
  },
}

const CATEGORY_LABEL: Record<string, string> = {
  structure: '结构',
  admonition: '提示',
  content: '内容',
  navigation: '导航',
  media: '媒体',
  signature: '签名',
  free: '兜底',
}

const CATEGORY_ORDER = [
  'structure',
  'admonition',
  'content',
  'navigation',
  'media',
  'signature',
  'free',
] as const

function renderPackTable(packId: PackId): string {
  const signatureSet = new Set<string>(SUPPORTED_SIGNATURE_CONTAINERS)
  const specs = CONTAINER_VOCABULARY.filter((s) => packOf(s.name) === packId)
  if (specs.length === 0) return ''

  const target = PACK_TARGETS[packId]
  const lines: string[] = []
  lines.push(target.intro)
  lines.push('')
  lines.push('| 类 | 容器 | ★ | 一句话用途 |')
  lines.push('| --- | --- | :-: | --- |')

  const byCategory = new Map<string, typeof CONTAINER_VOCABULARY[number][]>()
  for (const spec of specs) {
    const list = byCategory.get(spec.category) ?? []
    list.push(spec)
    byCategory.set(spec.category, list)
  }

  for (const cat of CATEGORY_ORDER) {
    const list = byCategory.get(cat)
    if (!list || list.length === 0) continue
    list.forEach((spec, i) => {
      const groupCell = i === 0 ? CATEGORY_LABEL[cat] : ''
      const isSig =
        spec.styleKey !== null &&
        signatureSet.has(spec.styleKey as (typeof SUPPORTED_SIGNATURE_CONTAINERS)[number])
      const mark = isSig ? '★' : ''
      const desc = spec.description.replace(/\|/g, '\\|')
      lines.push(`| ${groupCell} | \`${spec.name}\` | ${mark} | ${desc} |`)
    })
  }

  lines.push('')
  lines.push(
    `> 由 \`npm run build:writer-docs\` 从 \`src/containers/vocabulary.ts\` 生成，请勿手改。` +
      `新增容器先改 vocabulary，需要划入扩展包再在 \`scripts/build-writer-docs.ts:PACK_OF\` 追加。`,
  )

  return lines.join('\n')
}

function splice(
  source: string,
  packId: PackId,
  generated: string,
  docPath: string,
): string {
  const startMark = `<!-- generated:container-quick-ref:${packId}:start -->`
  const endMark = `<!-- generated:container-quick-ref:${packId}:end -->`
  const startIdx = source.indexOf(startMark)
  const endIdx = source.indexOf(endMark)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `[build-writer-docs] ${docPath} 缺少 ${startMark} / ${endMark} 标记对。` +
        `请手动在速查段前后补齐后重跑。`,
    )
  }
  const before = source.slice(0, startIdx + startMark.length)
  const after = source.slice(endIdx)
  return `${before}\n\n${generated}\n\n${after}`
}

function main() {
  const isCheck = process.argv.includes('--check')
  let allUpToDate = true
  const drifted: string[] = []

  for (const packId of Object.keys(PACK_TARGETS) as PackId[]) {
    const target = PACK_TARGETS[packId]
    const current = readFileSync(target.docPath, 'utf8')
    const next = splice(current, packId, renderPackTable(packId), target.docPath)

    if (current === next) continue
    allUpToDate = false

    if (isCheck) {
      drifted.push(target.docPath)
      continue
    }

    writeFileSync(target.docPath, next, 'utf8')
    process.stdout.write(`[build-writer-docs] ${target.docPath} updated ✓\n`)
  }

  if (allUpToDate) {
    process.stdout.write('[build-writer-docs] up to date ✓\n')
    return
  }

  if (isCheck) {
    process.stderr.write(
      `[build-writer-docs] 以下文档的速查段与 vocabulary 不同步：\n` +
        drifted.map((p) => `  - ${p}`).join('\n') +
        `\n请本地跑 \`npm run build:writer-docs\` 后重新提交。\n`,
    )
    process.exit(1)
  }
}

main()
