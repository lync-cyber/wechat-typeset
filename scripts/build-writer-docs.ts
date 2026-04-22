#!/usr/bin/env tsx
/**
 * 从 `src/containers/vocabulary.ts` 派生 docs/container-syntax.md 的速查表段。
 *
 * 为什么：速查表（容器清单 + 签名标记 + 一句话用途）是词汇表的完整下游投影——
 * 作者按表写 fence，新增容器时表必须同步更新。手写容易漂移。
 *
 * 工作方式：
 *   - 扫 docs/container-syntax.md 中的 `<!-- generated:container-quick-ref:start/end -->` 标记
 *   - 用 vocabulary + SUPPORTED_SIGNATURE_CONTAINERS 重新渲染标记之间的块
 *   - 其余手写段落（"何时用 / 反模式"等）保留不动
 *
 * 命令：
 *   tsx scripts/build-writer-docs.ts          # 原地更新
 *   tsx scripts/build-writer-docs.ts --check  # CI 模式：差异即 exit 1
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { CONTAINER_VOCABULARY } from '../src/containers/vocabulary'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/themes/_shared/spec'

const DOC_PATH = resolve(process.cwd(), 'docs/container-syntax.md')
const START_MARK = '<!-- generated:container-quick-ref:start -->'
const END_MARK = '<!-- generated:container-quick-ref:end -->'

const CATEGORY_LABEL: Record<string, string> = {
  structure: '文章结构',
  admonition: '提示 (admonition)',
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

function renderQuickRefBlock(): string {
  const signatureSet = new Set<string>(SUPPORTED_SIGNATURE_CONTAINERS)
  const total = CONTAINER_VOCABULARY.length
  const styled = CONTAINER_VOCABULARY.filter((s) => s.styleKey !== null).length

  const lines: string[] = []
  lines.push(
    `共 **${total}** 个合法容器（其中 ${styled} 个参与主题 CSS 样式槽位）。带 ★ 是 spec 可登记的**签名容器**（主题可在 \`signatureContainers\` 里声明）。`,
  )
  lines.push('')
  lines.push('| 组 | 容器 | ★ | 一句话用途 |')
  lines.push('| --- | --- | :-: | --- |')

  const byCategory = new Map<string, typeof CONTAINER_VOCABULARY[number][]>()
  for (const spec of CONTAINER_VOCABULARY) {
    const list = byCategory.get(spec.category) ?? []
    list.push(spec)
    byCategory.set(spec.category, list)
  }

  for (const cat of CATEGORY_ORDER) {
    const specs = byCategory.get(cat)
    if (!specs || specs.length === 0) continue
    specs.forEach((spec, i) => {
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
    '> 源：`src/containers/vocabulary.ts` + `SUPPORTED_SIGNATURE_CONTAINERS`。本表由 `scripts/build-writer-docs.ts` 生成，请勿手改；新增容器先改 vocabulary，再跑 `npm run build:writer-docs`。',
  )

  return lines.join('\n')
}

function splice(source: string, generated: string): string {
  const startIdx = source.indexOf(START_MARK)
  const endIdx = source.indexOf(END_MARK)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `[build-writer-docs] ${DOC_PATH} 缺少 ${START_MARK} / ${END_MARK} 标记对。请手动在速查段前后补齐后重跑。`,
    )
  }
  const before = source.slice(0, startIdx + START_MARK.length)
  const after = source.slice(endIdx)
  return `${before}\n\n${generated}\n\n${after}`
}

function main() {
  const isCheck = process.argv.includes('--check')
  const current = readFileSync(DOC_PATH, 'utf8')
  const next = splice(current, renderQuickRefBlock())

  if (current === next) {
    process.stdout.write('[build-writer-docs] up to date ✓\n')
    return
  }

  if (isCheck) {
    process.stderr.write(
      '[build-writer-docs] docs/container-syntax.md 的速查段与 vocabulary 不同步。\n' +
        '请本地跑 `npm run build:writer-docs` 后重新提交。\n',
    )
    process.exit(1)
  }

  writeFileSync(DOC_PATH, next, 'utf8')
  process.stdout.write('[build-writer-docs] docs/container-syntax.md updated ✓\n')
}

main()
