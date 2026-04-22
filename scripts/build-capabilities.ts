#!/usr/bin/env tsx
/**
 * 生成 dist/api/capabilities.json —— 外部集成方（如 InkFlow）读取此文件
 * 来发现 wechat-typeset 当前支持的主题、容器、变体、硬约束。
 *
 * 契约版本 v2.1。
 *
 * 2.1（非破坏，向后兼容）：
 *   - hardRules 的阈值常量由 validate.ts / rules.ts 真源派生（不再手抄）
 *   - 新增 deprecations[]：未来废弃字段先登记在此，给下游窗口迁移
 *
 * 2.0 起：
 *   - personas[] 提供完整选型信号（audience / signatureContainers / variants）
 *   - containers[] 枚举所有合法 `:::` fence 名 + 每个容器支持的 variant id
 *   - inlineExtensions 列 == / ~~ / ++ / [. .] / [~ ~]
 *   - personaSchemaUri 指向 persona-spec.schema.json 的相对路径
 *
 * 运行：`npx tsx scripts/build-capabilities.ts`（通常由 `npm run build` 链触发）
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { listPersonas } from '../src/public'
import { VARIANT_IDS, DEFAULT_VARIANTS } from '../src/themes/types'
import { SIGNATURE_CONTAINER_MARKDOWN_NAME } from '../src/pipeline/containers'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/themes/_shared/spec'
import { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH } from '../src/themes/_shared/spec/validate'
import { FORBIDDEN_CSS_PROPS, HARD_REMOVE_TAGS } from '../src/pipeline/rules'
import { CONTAINER_VOCABULARY } from '../src/containers/vocabulary'

/**
 * 下游集成约定：
 *   - `schemaVersion` 遵循语义：major 变更 = 破坏性 → 下游必须改代码；
 *     minor 变更 = 新增字段；patch 变更 = 非契约修正（如描述文字）
 *   - 不兼容的移除走 `deprecations[]`：标 sinceVersion 与 replacement 至少保留一个 minor，
 *     让下游有感知窗口。
 *
 * 发版 checklist（在 CHANGELOG 里记录）：
 *   - 破坏 contract 的变更前，先把旧字段登记进 `deprecations[]`
 *   - 移除 deprecated 字段必须提升 major
 */
type CapabilitiesSchemaVersion = '2.1'

interface DeprecationNotice {
  /** 受影响的字段或契约 id（dotted path，如 "hardRules.forbidClass"） */
  id: string
  /** 自哪个 schemaVersion 起标记 deprecated */
  sinceVersion: CapabilitiesSchemaVersion
  /** 替代方案（下游迁移指引） */
  replacement: string
  /** 计划哪个 schemaVersion 彻底移除（可选） */
  removalPlannedIn?: string
}

interface CapabilitiesV2 {
  schemaVersion: CapabilitiesSchemaVersion
  tool: { name: string; version: string; repo?: string }
  generatedAt: string
  contract: {
    fenceOuter: string
    fenceInner: string
    attrSyntax: string
    variantKey: string
    notes: string[]
  }
  personas: Array<{
    id: string
    name: string
    description: string
    audience: string
    signatureContainers: readonly string[]
    variants: Record<string, string>
    palettePrimary: string
  }>
  containers: Array<{
    id: string
    category: string
    /**
     * kind 是对 category 的"渲染行为"维度归纳：
     *   variantized - 有 variant slot，可通过 variant=xxx 切骨架
     *   admonition  - tip/warning/info/danger 四态；共享 admonition variant 清单
     *   nested      - pros/cons，必须嵌在父容器内
     *   fixed       - 固定骨架但有主题化 CSS 槽位（highlight / footer-cta / recommend / note 等）
     *   free        - 兜底 escape hatch（只有 `free`）
     */
    kind: 'variantized' | 'admonition' | 'nested' | 'fixed' | 'free'
    variants?: readonly string[]
    defaultVariant?: string
    children?: readonly string[]
    parent?: string
    fenceLength: 3 | 4
    description: string
    example: string
    attrs?: ReadonlyArray<{ key: string; description: string; enum?: readonly string[]; example?: string }>
    notes?: string
  }>
  signatureContainerIds: readonly string[]
  signatureContainerMarkdownNames: Record<string, string>
  inlineExtensions: Array<{ syntax: string; description: string }>
  hardRules: {
    minFontSize: number
    minStrokeWidth: number
    paletteHexPattern: string
    forbidFontFamily: boolean
    forbidClass: boolean
    forbidStyleTag: boolean
    forbidPosition: boolean
    forbidMediaQueries: boolean
  }
  /**
   * 已登记的 deprecation 通道。下游适配时可检测 id 并准备迁移。
   * 当前为空数组占位；首次破坏 contract 时把旧字段登记进来。
   */
  deprecations: readonly DeprecationNotice[]
  personaSchemaUri: string
  docs: Record<string, string>
}

function pkgJson(): { name: string; version: string; homepage?: string } {
  const raw = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
  return JSON.parse(raw)
}

function buildContainers(): CapabilitiesV2['containers'] {
  // 单一真相：直接迭代 CONTAINER_VOCABULARY；新增容器只需在 vocabulary 登记。
  const admonitions = new Set(['tip', 'warning', 'info', 'danger', 'note'])
  const result: CapabilitiesV2['containers'] = []

  for (const spec of CONTAINER_VOCABULARY) {
    const isAdmonition = admonitions.has(spec.name)
    const isNested = spec.parent !== undefined
    const isFree = spec.category === 'free'

    // variantKind 存在 → 可切骨架
    let variants: readonly string[] | undefined
    let defaultVariant: string | undefined
    let kind: CapabilitiesV2['containers'][number]['kind']

    if (spec.variantKind) {
      variants = VARIANT_IDS[spec.variantKind]
      defaultVariant = DEFAULT_VARIANTS[spec.variantKind]
      kind = isAdmonition ? 'admonition' : 'variantized'
    } else if (isNested) {
      kind = 'nested'
    } else if (isFree) {
      kind = 'free'
    } else {
      // 其他都是"固定骨架 + 主题化 CSS"：highlight / footer-cta / recommend / note /
      // qrcode / mpvoice / mpvideo / abstract / key-number / see-also
      kind = 'fixed'
    }

    const notes = isNested
      ? `必须嵌在 ${spec.parent} 内（外层 ::::，内层 :::）`
      : isAdmonition
        ? 'admonition 五态（tip/warning/info/danger/note）共享 variant 清单；可通过 variant=xxx 在 open 行覆盖主题默认。note 不参与 variant 切换。'
        : isFree
          ? '兜底 escape hatch：无主题样式，按作者内容原样透传。'
          : undefined

    result.push({
      id: spec.name,
      category: spec.category,
      kind,
      variants: spec.name === 'note' ? undefined : variants,
      defaultVariant: spec.name === 'note' ? undefined : defaultVariant,
      children: spec.children,
      parent: spec.parent,
      fenceLength: spec.fenceLength,
      description: spec.description,
      example: spec.example,
      attrs: spec.attrs,
      notes,
    })
  }
  // 稳定排序：按 id 字典序
  result.sort((a, b) => a.id.localeCompare(b.id))
  return result
}

function build(): CapabilitiesV2 {
  const pkg = pkgJson()
  const personas = listPersonas().map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    audience: p.audience,
    signatureContainers: p.signatureContainers,
    variants: p.variants as unknown as Record<string, string>,
    palettePrimary: p.palette.primary,
  }))
  return {
    schemaVersion: '2.1',
    tool: {
      name: pkg.name,
      version: pkg.version,
      repo: pkg.homepage,
    },
    generatedAt: new Date().toISOString(),
    contract: {
      fenceOuter: '::::',
      fenceInner: ':::',
      attrSyntax: 'key=value key2="with space" — 写在 open 行 name 之后；不接受 {key="..."}  JSX 风格',
      variantKey: 'variant',
      notes: [
        '容器名必须是 kebab-case（quote-card，不是 quoteCard）',
        'admonition 不是容器名；用 tip / warning / info / danger / note 之一',
        'compare 外层用 :::: 四冒号，内层 pros/cons 用 ::: 三冒号',
        '<!-- variant=X --> HTML 注释不被解析；variant 必须写在 open 行',
      ],
    },
    personas,
    containers: buildContainers(),
    signatureContainerIds: SUPPORTED_SIGNATURE_CONTAINERS,
    signatureContainerMarkdownNames: { ...SIGNATURE_CONTAINER_MARKDOWN_NAME },
    inlineExtensions: [
      { syntax: '==mark==', description: '荧光笔高亮（markdown-it-mark）' },
      { syntax: '~~del~~', description: 'GFM 删除线' },
      { syntax: '++ins++', description: '插入（markdown-it-ins）' },
      { syntax: '[.text.]', description: '中文着重号' },
      { syntax: '[~text~]', description: '波浪下划线' },
    ],
    hardRules: {
      minFontSize: MIN_FONT_SIZE,
      minStrokeWidth: MIN_STROKE_WIDTH,
      paletteHexPattern: HEX_RE.source,
      forbidFontFamily: FORBIDDEN_CSS_PROPS.includes('font-family'),
      forbidClass: true,
      forbidStyleTag: HARD_REMOVE_TAGS.has('style'),
      forbidPosition: FORBIDDEN_CSS_PROPS.includes('position'),
      forbidMediaQueries: true,
    },
    deprecations: [],
    personaSchemaUri: '../schema/persona-spec.schema.json',
    docs: {
      containerSyntax: 'docs/container-syntax.md',
      skillReadme: 'skills/wechat-typeset/SKILL.md',
      personas: 'skills/wechat-typeset/references/personas.md',
      hardRules: 'skills/wechat-typeset/references/hard-rules.md',
      api: 'skills/wechat-typeset/references/api.md',
    },
  }
}

const OUT = resolve(process.cwd(), 'dist/api/capabilities.json')
mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(build(), null, 2) + '\n', 'utf8')
console.log(`wrote ${OUT}`)
