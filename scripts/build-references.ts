#!/usr/bin/env tsx
/**
 * 组件参考生成器：vocabulary + persona 注册表 → src/domain/samples/_references.ts
 *
 * 为每个主题生成一份 **组件参考 markdown**——按 category 分章，列举该主题下所有
 * 启用的容器（base + pack:* + theme:<self>），每个容器输出最短可用 demo（来自
 * ContainerSpec.example）+ 一句"是什么/何时用"。
 *
 * 设计意图：
 *   - story 样张（src/samples-md/sample-{themeId}.md）= 讲故事、克制、~150 行
 *   - reference 文档（本脚本产物）= 查阅、全集、~300 行；想看"本主题怎么渲染 X 容器"
 *     就切到这一份
 *   - 用户态 UI 两档切换："故事样张" / "组件参考"
 *
 * 输出位置：src/domain/samples/_references.ts（与 _generated.ts 同目录，同消费层）；
 * 不写 src/samples-md/ —— 那是手工文档的领地，不应被自动产物污染。
 *
 * 跨主题差异：同一份"组件参考"被多个主题消费时，**内容字符串完全一致**——差异
 * 由主题的 voice（containers / elements / variants）在渲染期产生。所以这份文档
 * 也是"换主题对比 voice"的最佳载体。
 *
 * 例外：theme:<id> namespace 容器只对该主题渲染，因此每个主题的参考文档会按
 * isContainerEnabledForTheme 过滤一遍（data-brief 主题的参考文档比其他主题多
 * kpi-dashboard / bar-chart 这一节）。
 *
 * 运行：`npm run build:references`
 */

import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import {
  CONTAINER_VOCABULARY,
  type ContainerSpec,
  type ContainerCategory,
  isContainerEnabledForTheme,
  packOf,
  namespaceOf,
  namespaceIdOf,
} from '../src/core/vocabulary'
import { ORDERED_SPECS } from '../src/core/themes/registry'

const OUT = resolve(process.cwd(), 'src/domain/samples/_references.ts')

// ============================================================
// 分章顺序（与作者心智一致）
// ============================================================

const CATEGORY_ORDER: ContainerCategory[] = [
  'structure',
  'admonition',
  'content',
  'data',
  'navigation',
  'media',
  'signature',
  'free',
]

const CATEGORY_TITLE: Record<ContainerCategory, string> = {
  structure: '骨架 · structure',
  admonition: '提示五态 · admonition',
  content: '内容块 · content',
  data: '数据可视化 · data',
  navigation: '导航 / 收束 · navigation',
  media: '媒体占位 · media',
  signature: '签名块 · signature',
  free: '兜底 · free',
}

// ============================================================
// 单主题文档生成
// ============================================================

/** 嵌套子容器：在 example 里跟随父容器一起出现，不单列章节。 */
function isStandaloneSpec(spec: ContainerSpec): boolean {
  return !spec.parent
}

function packBadge(spec: ContainerSpec): string {
  const pack = packOf(spec)
  const ns = namespaceOf(pack)
  if (ns === 'base') return '`base`'
  if (ns === 'pack') return `\`pack:${namespaceIdOf(pack)}\``
  return `\`theme:${namespaceIdOf(pack)}\``
}

function renderContainerSection(spec: ContainerSpec): string {
  const lines: string[] = []
  const headerBits: string[] = [`### \`::: ${spec.name}\``, packBadge(spec)]
  if (spec.variantKind) headerBits.push(`*variantKind=${spec.variantKind}*`)
  lines.push(headerBits.join(' · '))
  lines.push('')
  lines.push(spec.description)
  lines.push('')
  lines.push('```markdown')
  // 去掉 example 末尾多余换行（spec.example 自带末尾 \n）
  lines.push(spec.example.replace(/\n+$/, ''))
  lines.push('```')
  lines.push('')
  // 真实示例：直接渲染该 example，让用户在当前主题下看到效果
  lines.push(spec.example.replace(/\n+$/, ''))
  lines.push('')
  return lines.join('\n')
}

function renderCategorySection(
  category: ContainerCategory,
  specs: ContainerSpec[],
): string {
  if (specs.length === 0) return ''
  const lines: string[] = []
  lines.push(`## ${CATEGORY_TITLE[category]}`)
  lines.push('')
  for (const spec of specs) lines.push(renderContainerSection(spec))
  lines.push('::: divider')
  lines.push(':::')
  lines.push('')
  return lines.join('\n')
}

function buildReferenceFor(themeId: string, themeName: string): string {
  const enabled = CONTAINER_VOCABULARY.filter(
    (s) => isStandaloneSpec(s) && isContainerEnabledForTheme(s, themeId),
  )

  const byCategory = new Map<ContainerCategory, ContainerSpec[]>()
  for (const s of enabled) {
    const arr = byCategory.get(s.category) ?? []
    arr.push(s)
    byCategory.set(s.category, arr)
  }

  const lines: string[] = []
  lines.push(`# ${themeName} · 组件参考`)
  lines.push('')
  lines.push(
    `> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。`,
  )
  lines.push(
    `> 列出本主题 (\`${themeId}\`) 启用的全部容器（base + pack:* + theme:${themeId}）。`,
  )
  lines.push('>')
  lines.push(
    `> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。`,
  )
  lines.push('')

  for (const cat of CATEGORY_ORDER) {
    const specs = byCategory.get(cat) ?? []
    lines.push(renderCategorySection(cat, specs))
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n')
}

// ============================================================
// 主：枚举所有主题
// ============================================================

function build(): string {
  const entries: Array<[string, string]> = []
  for (const spec of ORDERED_SPECS) {
    entries.push([spec.id, buildReferenceFor(spec.id, spec.name)])
  }

  const fp = createHash('sha1')
  for (const [id, content] of entries) fp.update(`${id}:${content}\n`)
  const buildId = fp.digest('hex').slice(0, 12)

  const out: string[] = []
  out.push(`/* eslint-disable */`)
  out.push(
    `// @generated — 由 scripts/build-references.ts 从 vocabulary + persona 注册表生成。`,
  )
  out.push(`// 手工修改会在下一次 \`npm run build:references\` 被覆盖。`)
  out.push(``)
  out.push(
    `/** 各主题 id 对应的组件参考文档（按 vocabulary 分类列举本主题可用容器）。 */`,
  )
  out.push(`export const REFERENCE_BY_THEME: Record<string, string> = {`)
  for (const [id, content] of entries) {
    out.push(`  ${JSON.stringify(id)}: ${JSON.stringify(content)},`)
  }
  out.push(`}`)
  out.push(``)
  out.push(`/** 参考文档指纹（sha1 截断 12 字）。 */`)
  out.push(`export const REFERENCE_BUILD_ID: string = ${JSON.stringify(buildId)}`)
  out.push(``)
  return out.join('\n')
}

const output = build()
writeFileSync(OUT, output, 'utf8')
console.log(
  `wrote ${OUT} (${output.length} chars, ${ORDERED_SPECS.length} themes)`,
)
