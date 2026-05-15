#!/usr/bin/env tsx
/**
 * 生成 dist/api/capabilities.json —— 外部集成方（如 InkFlow）读取此文件
 * 来发现 wechat-typeset 当前支持的主题、容器、变体、硬约束。
 *
 * 运行：`npx tsx scripts/build-capabilities.ts`（通常由 `npm run build` 链触发）
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { getPersona, listPersonas, listPublishPlatforms } from '../src/public'
import { VARIANT_IDS, DEFAULT_VARIANTS, DEFAULT_KICKERS } from '../src/core/themes/types'
import { SIGNATURE_CONTAINER_MARKDOWN_NAME } from '../src/core/pipeline/containers'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/core/themes/_shared/spec'
import { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH } from '../src/core/themes/_shared/spec/validate'
import { FORBIDDEN_CSS_PROPS, HARD_REMOVE_TAGS } from '../src/core/pipeline/rules'
import { CONTAINER_VOCABULARY, packOf } from '../src/core/vocabulary/vocabulary'

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
type CapabilitiesSchemaVersion = '2.4'

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
    /** 主题级 kicker 文案覆盖（与 DEFAULT_KICKERS 深合并的最终值） */
    kickers: Record<string, string>
    /** 主题能力自描述（spec.capabilities，可选）。未声明 = 全集兜底 */
    capabilities?: {
      containers?: readonly string[]
      variantOverrides?: Record<string, string>
      excluded?: readonly string[]
    }
  }>
  containers: Array<{
    id: string
    category: string
    /**
     * 所属契约扩展包（缺省 = base）。下游可按此过滤"我只关心 base 容器"。
     * 三层 namespace：
     *   - `'base'`              基础契约，任何主题都渲染
     *   - `pack:<domain>`       领域扩展，多主题可借用（如 `pack:editorial`）
     *   - `theme:<themeId>`     主题专属，仅该主题渲染（如 `theme:data-brief`）
     */
    pack: 'base' | `pack:${string}` | `theme:${string}`
    /**
     * kind 是对 category 的"渲染行为"维度归纳：
     *   variantized - 有 variant slot，可通过 variant=xxx 切骨架
     *   admonition  - tip/warning/info/danger 四态；共享 admonition variant 清单
     *   nested      - pros/cons，必须嵌在父容器内
     *   fixed       - 固定骨架但有主题化 CSS 槽位（highlight / footer-cta / recommend 等）
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
   * 本 JSON 在 jsDelivr 上的 canonical URL。下游集成方读到此字段后无需再硬编码 CDN
   * 路径——若仓库改名 / fork 部署，本字段会跟着 package.json.homepage 走。
   *
   *   - selfUri          tracks @main，永远是仓库当前主分支的最新契约
   *   - versionedSelfUri 钉到当前 package.json.version 对应的 git tag（v{x.y.z}）；
   *                     若 tag 不存在（dev 期）下游建议回退到 selfUri
   *
   * 自 schemaVersion 2.3 起新增。
   */
  selfUri: string
  versionedSelfUri: string
  /**
   * 封面占位 SVG 资源路径模板（与 selfUri 同 CDN，相同 ref 策略）。
   *
   *   coverUriPattern          @main 跟前沿
   *   coverUriPatternVersioned @v{version} 钉版本
   *
   * 下游消费方用 `pattern.replace('{personaId}', id)` 算具体资源 URL。
   * 自 schemaVersion 2.3 起新增（与 selfUri 同批）。
   */
  coverUriPattern: string
  coverUriPatternVersioned: string
  /**
   * 已注册的发布平台 adapter 摘要。
   *
   *   - id        与 render(input.platform) 接受的字符串一致
   *   - status    'stable' / 'beta' / 'placeholder'
   *               下游 UI 建议只暴露 stable+beta；placeholder 表示 patch=identity，
   *               是给社区 PR / fork 预留的空位
   *
   * 自 schemaVersion 2.2 起新增。
   */
  platforms: ReadonlyArray<{
    id: string
    name: string
    status: 'stable' | 'beta' | 'placeholder'
  }>
  /**
   * 已登记的 deprecation 通道。下游适配时可检测 id 并准备迁移。
   * 当前为空数组占位；首次破坏 contract 时把旧字段登记进来。
   */
  deprecations: readonly DeprecationNotice[]
  /**
   * 4 级降级链与每层失效行为的机器可读版本。配合 `docs/contract/fallback.md`
   * 使用——下游集成方据此提前做 lint / warning。自 schemaVersion 2.4 起新增。
   */
  fallbackBehavior: {
    variantChain: ReadonlyArray<{
      level: 'L1' | 'L2' | 'L3' | 'L4'
      source: string
      action: string
    }>
    /** 各 slot 的 L4 fallback id（与 DEFAULT_VARIANTS 同源） */
    defaultVariants: Record<string, string>
    /** 各非法触发的处理策略（silently / warning / error） */
    triggers: ReadonlyArray<{
      condition: string
      action: 'silent-fallback' | 'warning' | 'error'
      report: string
    }>
  }
  personaSchemaUri: string
  docs: Record<string, string>
}

function pkgJson(): {
  name: string
  version: string
  homepage?: string
  repository?: string | { type?: string; url?: string }
} {
  const raw = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
  return JSON.parse(raw)
}

/**
 * 从 package.json.homepage / repository.url 提取 GitHub 的 owner/repo。
 *
 * 支持的输入形态：
 *   - "https://github.com/owner/repo"
 *   - "https://github.com/owner/repo#readme"
 *   - "git+https://github.com/owner/repo.git"
 *   - "git@github.com:owner/repo.git"
 *
 * 用于构造 jsDelivr URL `cdn.jsdelivr.net/gh/{owner}/{repo}@{ref}/...`。
 * 非 GitHub 仓库返回 null——本工具目前只支持 jsDelivr GitHub 模式，私有镜像
 * 的 selfUri 需要 fork 自己改 build 脚本。
 */
function parseGithubSlug(pkg: ReturnType<typeof pkgJson>): { owner: string; repo: string } | null {
  const candidates: string[] = []
  if (pkg.homepage) candidates.push(pkg.homepage)
  if (typeof pkg.repository === 'string') {
    candidates.push(pkg.repository)
  } else if (pkg.repository?.url) {
    candidates.push(pkg.repository.url)
  }
  for (const raw of candidates) {
    // https://github.com/owner/repo(.git)?(#anchor)?  /  git+https://...
    const httpsMatch = raw.match(/github\.com[/:]([^/]+)\/([^/?#.]+)(?:\.git)?/i)
    if (httpsMatch) {
      return { owner: httpsMatch[1], repo: httpsMatch[2] }
    }
  }
  return null
}

const CAPABILITIES_REL_PATH = 'dist/api/capabilities.json'
const COVERS_REL_DIR = 'dist/api/covers'

interface SelfUriBundle {
  selfUri: string
  versionedSelfUri: string
  coverUriPattern: string
  coverUriPatternVersioned: string
}

function buildSelfUris(pkg: ReturnType<typeof pkgJson>): SelfUriBundle {
  const slug = parseGithubSlug(pkg)
  if (!slug) {
    // 非 GitHub 部署：留空串而非编造一个不可达 URL；下游应据此回退到自己已知的来源
    return { selfUri: '', versionedSelfUri: '', coverUriPattern: '', coverUriPatternVersioned: '' }
  }
  const base = `https://cdn.jsdelivr.net/gh/${slug.owner}/${slug.repo}`
  return {
    selfUri: `${base}@main/${CAPABILITIES_REL_PATH}`,
    versionedSelfUri: `${base}@v${pkg.version}/${CAPABILITIES_REL_PATH}`,
    coverUriPattern: `${base}@main/${COVERS_REL_DIR}/{personaId}.svg`,
    coverUriPatternVersioned: `${base}@v${pkg.version}/${COVERS_REL_DIR}/{personaId}.svg`,
  }
}

function buildContainers(): CapabilitiesV2['containers'] {
  // 单一真相：直接迭代 CONTAINER_VOCABULARY；新增容器只需在 vocabulary 登记。
  const admonitions = new Set(['tip', 'warning', 'info', 'danger'])
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
      // 其他都是"固定骨架 + 主题化 CSS"：highlight / footer-cta / recommend /
      // qrcode / mpvoice / mpvideo / abstract / key-number / see-also
      kind = 'fixed'
    }

    const notes = isNested
      ? `必须嵌在 ${spec.parent} 内（外层 ::::，内层 :::）`
      : isAdmonition
        ? 'admonition 四态（tip/warning/info/danger）共享 variant 清单；可通过 variant=xxx 在 open 行覆盖主题默认。第五态 note 已独立为 variantKind=note。'
        : spec.name === 'note'
          ? '第五态补注：独立 variantKind=note，中性骨架；可通过 variant=xxx 切骨架，色彩走 textMuted 不抢色。'
          : isFree
            ? '兜底 escape hatch：无主题样式，按作者内容原样透传。'
            : undefined

    result.push({
      id: spec.name,
      category: spec.category,
      pack: packOf(spec),
      kind,
      variants,
      defaultVariant,
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
  const personas = listPersonas().map((p) => {
    const fullSpec = getPersona(p.id)
    const kickers = { ...DEFAULT_KICKERS, ...(fullSpec.kickers ?? {}) }
    const out: CapabilitiesV2['personas'][number] = {
      id: p.id,
      name: p.name,
      description: p.description,
      audience: p.audience,
      signatureContainers: p.signatureContainers,
      variants: p.variants as unknown as Record<string, string>,
      palettePrimary: p.palette.primary,
      kickers: kickers as unknown as Record<string, string>,
    }
    if (fullSpec.capabilities) {
      out.capabilities = {
        containers: fullSpec.capabilities.containers,
        variantOverrides: fullSpec.capabilities.variantOverrides as unknown as Record<string, string> | undefined,
        excluded: fullSpec.capabilities.excluded,
      }
    }
    return out
  })
  const platforms = listPublishPlatforms().map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
  }))
  const { selfUri, versionedSelfUri, coverUriPattern, coverUriPatternVersioned } = buildSelfUris(pkg)
  return {
    schemaVersion: '2.4',
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
        'containers[].pack 三层 namespace：base（基础契约） / pack:<domain>（领域扩展，多主题共享） / theme:<themeId>（主题专属，仅该主题渲染）',
        'L2 页面局部配置：markdown frontmatter `---\\nvariants:\\n  admonition: terminal\\n---` 覆盖主题默认，逐处 attrs.variant 仍优先',
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
    platforms,
    selfUri,
    versionedSelfUri,
    coverUriPattern,
    coverUriPatternVersioned,
    deprecations: [
      {
        // 字段命名误导：实际覆盖所有 styled 容器（intro / cover / author / ...），
        // 而非仅 signature 容器。下游已可从 containers[].id 直接读到 markdown fence 名，
        // 无需中间 camelCase→kebab 映射。
        id: 'signatureContainerMarkdownNames',
        sinceVersion: '2.1',
        replacement: '改用 containers[].id 作为 markdown fence 名权威源；signatureContainerIds 仅给"是否签名"分类信号。',
        removalPlannedIn: '3.0',
      },
    ],
    fallbackBehavior: {
      variantChain: [
        { level: 'L1', source: 'attrs.variant', action: '逐处覆盖。非法 id 静默忽略，回退 L2/L3/L4' },
        { level: 'L2', source: 'markdown frontmatter `variants:`', action: '页面级覆盖。非法 id 写入 frontmatterIssues warning，回退 L3/L4' },
        { level: 'L3', source: 'theme.variants[slot]', action: '主题映射表。注册表里不存在则回退 L4' },
        { level: 'L4', source: 'DEFAULT_VARIANTS / makeVariantContainer.fallbackId', action: '系统默认，保证渲染必定有骨架' },
      ],
      defaultVariants: { ...DEFAULT_VARIANTS } as unknown as Record<string, string>,
      triggers: [
        { condition: 'attrs.variant 非法 id', action: 'silent-fallback', report: '回退 L2/L3/L4；lint 阶段用 getVariantsForContainer 校验' },
        { condition: 'frontmatter variants[slot] 非法 id', action: 'warning', report: 'RenderOutput.frontmatterIssues[]' },
        { condition: 'frontmatter theme 未知 id', action: 'warning', report: 'RenderOutput.frontmatterIssues[]；回退 input.persona/theme/spec' },
        { condition: 'theme:<X> 容器在非该主题渲染', action: 'silent-fallback', report: 'wrapper CSS 走 token 中性兜底；通过 getThemeCapabilities().containers[].available 提前发现' },
        { condition: 'render 同时给 persona/theme/spec', action: 'error', report: '抛 Error: provide exactly one of ...' },
        { condition: 'render(spec) 投影失败', action: 'error', report: '抛 SpecValidationError' },
      ],
    },
    personaSchemaUri: '../schema/persona-spec.schema.json',
    docs: {
      writerContract: 'docs/contract/README.md',
      containerSyntax: 'docs/contract/syntax.md',
      containerBase: 'docs/contract/base.md',
      containerPackEditorial: 'docs/contract/packs/editorial.md',
      containerThemeDataBrief: 'docs/contract/packs/data-brief.md',
      fallback: 'docs/contract/fallback.md',
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
