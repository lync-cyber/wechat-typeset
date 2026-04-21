/**
 * Container Vocabulary 运行时查询 API
 *
 * 面向 LLM / 外部集成方的"上游作者视角"入口：回答三类问题：
 *   1. 这个项目能用哪些 `:::` 容器？（getContainerVocabulary）
 *   2. 某个容器能切换什么骨架？（getVariantsForContainer）
 *   3. 某个主题默认给每个 variant slot 选了什么？（getThemeDefaultVariants）
 *   4. 给我一个最小可插入的 markdown 示例。（getContainerSnippet）
 *
 * 这些函数是 capabilities.json 的运行时对应物 —— 任何一处改了词汇表或 variant 注册表，
 * 这些查询会实时反映（不需要重跑 build-capabilities）。
 *
 * 零副作用；纯函数；Node / Vite 两种运行时都能跑（不依赖 import.meta.glob）。
 */

import {
  CONTAINER_VOCABULARY,
  type ContainerSpec,
  lookupContainerSpec,
} from './vocabulary'
import {
  ADMONITION_VARIANTS,
  CODE_BLOCK_VARIANTS,
  COMPARE_VARIANTS,
  DIVIDER_VARIANTS,
  QUOTE_VARIANTS,
  SECTION_TITLE_VARIANTS,
  STEPS_VARIANTS,
} from '../variants/registry'
import type { VariantKind, ThemeVariants } from '../themes/types'

// ============================================================
// 1. 词汇表查询
// ============================================================

/** 返回所有合法容器的权威描述列表（主题无关）。 */
export function getContainerVocabulary(): readonly ContainerSpec[] {
  return CONTAINER_VOCABULARY
}

/** 按 markdown fence 名查单个容器描述；未知名返回 undefined。 */
export function getContainerSpec(name: string): ContainerSpec | undefined {
  return lookupContainerSpec(name)
}

// ============================================================
// 2. Variant 查询
// ============================================================

/**
 * 某 variant kind 的所有可用 id + 元信息（name / description / themeCompat）。
 * 用于 UI 做骨架切换面板，或 LLM 推荐「这个主题用哪个骨架最合适」。
 */
export interface VariantDescriptor {
  id: string
  kind: VariantKind | 'codeBlock'
  name: string
  description: string
  themeCompat?: readonly string[]
}

function variantMeta(kind: VariantKind | 'codeBlock', id: string): VariantDescriptor | undefined {
  const table: Record<VariantKind | 'codeBlock', Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>> = {
    admonition: ADMONITION_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    quote: QUOTE_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    compare: COMPARE_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    steps: STEPS_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    divider: DIVIDER_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    sectionTitle: SECTION_TITLE_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
    codeBlock: CODE_BLOCK_VARIANTS as unknown as Record<string, { meta: { name: string; description: string; themeCompat?: readonly string[] } }>,
  }
  const def = table[kind]?.[id]
  if (!def) return undefined
  return {
    id,
    kind,
    name: def.meta.name,
    description: def.meta.description,
    themeCompat: def.meta.themeCompat,
  }
}

/**
 * 某容器支持的所有 variant 描述。
 *   - 不支持 variant 切换的容器（styleKey=null / 无 variantKind）返回 []
 *   - codeBlock 不是容器 —— 它通过 ``` fence 触发，不在本 API 范围
 */
export function getVariantsForContainer(containerName: string): VariantDescriptor[] {
  const spec = lookupContainerSpec(containerName)
  if (!spec || !spec.variantKind) return []
  return variantIdsForKind(spec.variantKind).map((id) => variantMeta(spec.variantKind!, id)!).filter(Boolean)
}

function variantIdsForKind(kind: VariantKind | 'codeBlock'): string[] {
  const table: Record<VariantKind | 'codeBlock', Record<string, unknown>> = {
    admonition: ADMONITION_VARIANTS,
    quote: QUOTE_VARIANTS,
    compare: COMPARE_VARIANTS,
    steps: STEPS_VARIANTS,
    divider: DIVIDER_VARIANTS,
    sectionTitle: SECTION_TITLE_VARIANTS,
    codeBlock: CODE_BLOCK_VARIANTS,
  }
  return Object.keys(table[kind] ?? {})
}

// ============================================================
// 3. 主题视角查询
// ============================================================

/**
 * 主题对每个 variant slot 的默认选择。
 * 委托给 public/personas —— 不直接 import 避免循环；调用方自备 ThemeVariants。
 *
 * 常见用法：
 *   import { getPersona } from './public'
 *   const v = getPersona('tech-geek').variants  // ThemeVariants
 *   getThemeDefaultVariants(v)                  // 解包成 VariantDescriptor[]
 */
export function getThemeDefaultVariants(variants: ThemeVariants): VariantDescriptor[] {
  const kinds: VariantKind[] = [
    'admonition',
    'quote',
    'compare',
    'steps',
    'divider',
    'sectionTitle',
    'codeBlock',
  ]
  const out: VariantDescriptor[] = []
  for (const kind of kinds) {
    const id = variants[kind]
    const meta = variantMeta(kind, id)
    if (meta) out.push(meta)
  }
  return out
}

// ============================================================
// 4. Snippet 生成
// ============================================================

export interface SnippetOptions {
  /** 覆盖容器 variant（写入 open 行的 variant=xxx 属性） */
  variantId?: string
  /** 若为 admonition 且需要指定 kind（tip/warning/info/danger/note） */
  admonitionKind?: 'tip' | 'warning' | 'info' | 'danger' | 'note'
}

/**
 * 为指定容器生成最小可用 markdown snippet。
 *
 *   - 不传 options：返回 ContainerSpec.example 的原样复制（已含起止 fence）
 *   - variantId：在 open 行末尾追加 `variant=xxx`
 *
 * 不会校验 variantId 是否合法；调用方可先用 getVariantsForContainer 确认。
 */
export function getContainerSnippet(
  containerName: string,
  options: SnippetOptions = {},
): string {
  const spec = lookupContainerSpec(containerName)
  if (!spec) throw new Error(`Unknown container name: "${containerName}"`)
  if (!options.variantId) return spec.example

  const fence = spec.fenceLength === 4 ? '::::' : ':::'
  const lines = spec.example.split('\n')
  const openIdx = lines.findIndex((l) => l.startsWith(fence))
  if (openIdx < 0) return spec.example
  const open = lines[openIdx]
  // 如果已经有 variant= 就替换，没有就追加
  lines[openIdx] = /\bvariant=/.test(open)
    ? open.replace(/\bvariant=("[^"]*"|'[^']*'|\S+)/, `variant=${options.variantId}`)
    : `${open}${open.endsWith(' ') ? '' : ' '}variant=${options.variantId}`.trimEnd()
  return lines.join('\n')
}
