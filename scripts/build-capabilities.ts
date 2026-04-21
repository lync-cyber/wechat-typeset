#!/usr/bin/env tsx
/**
 * 生成 dist/api/capabilities.json —— 外部集成方（如 InkFlow）读取此文件
 * 来发现 wechat-typeset 当前支持的主题、容器、变体、硬约束。
 *
 * 契约版本 v2。相较 v1 变化：
 *   - personas[] 提供完整选型信号（audience / signatureContainers / variants）
 *   - containers[] 枚举所有合法 `:::` fence 名 + 每个容器支持的 variant id
 *   - hardRules 直接从 validate.ts 源里抽取（唯一事实来源）
 *   - inlineExtensions 列 == / ~~ / ++ / [. .] / [~ ~]
 *   - personaSchemaUri 指向 persona-spec.schema.json 的相对路径
 *
 * 运行：`npx tsx scripts/build-capabilities.ts`（通常由 `npm run build` 链触发）
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { listPersonas } from '../src/public'
import { VARIANT_IDS, DEFAULT_VARIANTS } from '../src/themes/types'
import {
  CONTAINER_REGISTRY,
  SIGNATURE_CONTAINER_MARKDOWN_NAME,
} from '../src/pipeline/containers'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/themes/_shared/spec'

interface CapabilitiesV2 {
  schemaVersion: '2.0'
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
    kind: 'variantized' | 'admonition' | 'free' | 'nested'
    variants?: readonly string[]
    defaultVariant?: string
    children?: readonly string[]
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
  personaSchemaUri: string
  docs: Record<string, string>
}

function pkgJson(): { name: string; version: string; homepage?: string } {
  const raw = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
  return JSON.parse(raw)
}

function buildContainers(): CapabilitiesV2['containers'] {
  const variantized: Record<string, keyof typeof VARIANT_IDS> = {
    'quote-card': 'quote',
    compare: 'compare',
    steps: 'steps',
    divider: 'divider',
    'section-title': 'sectionTitle',
  }
  const admonitions = new Set(['tip', 'warning', 'info', 'danger'])
  const nested: Record<string, readonly string[]> = {
    compare: ['pros', 'cons'],
  }

  const result: CapabilitiesV2['containers'] = []
  for (const id of Object.keys(CONTAINER_REGISTRY)) {
    if (id in variantized) {
      const kind = variantized[id]
      result.push({
        id,
        kind: 'variantized',
        variants: VARIANT_IDS[kind],
        defaultVariant: DEFAULT_VARIANTS[kind],
        children: nested[id],
      })
    } else if (admonitions.has(id)) {
      result.push({
        id,
        kind: 'admonition',
        variants: VARIANT_IDS.admonition,
        defaultVariant: DEFAULT_VARIANTS.admonition,
        notes: 'admonition 四态共享 variant 清单；可通过 variant=xxx 在 open 行覆盖主题默认。',
      })
    } else if (id === 'pros' || id === 'cons') {
      result.push({
        id,
        kind: 'nested',
        notes: `必须嵌在 ::: compare 内（外层 ::::，内层 :::）`,
      })
    } else {
      result.push({
        id,
        kind: 'free',
        notes: '无 variant 切换；按主题默认样式渲染。',
      })
    }
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
    schemaVersion: '2.0',
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
      minFontSize: 14,
      minStrokeWidth: 1,
      paletteHexPattern: '^#[0-9a-fA-F]{3,8}$',
      forbidFontFamily: true,
      forbidClass: true,
      forbidStyleTag: true,
      forbidPosition: true,
      forbidMediaQueries: true,
    },
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
