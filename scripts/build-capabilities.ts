#!/usr/bin/env tsx
/**
 * 生成 dist/api/capabilities.json —— 外部集成方（如 InkFlow）读取此文件
 * 来发现 wechat-typeset 当前支持的主题、容器、变体、硬约束、CLI 命令、错误码。
 *
 * schemaVersion 语义：major 变更 = 破坏性 → 下游必须改代码；minor 变更 = 新增字段；
 * patch 变更 = 非契约修正。破坏前先把旧字段登记进 `deprecations[]` 给下游窗口。
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { getPersona, listPersonas, listPublishPlatforms } from '../src/public'
import { VARIANT_IDS, DEFAULT_VARIANTS, DEFAULT_KICKERS } from '../src/core/themes/types'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../src/core/themes/_shared/spec'
import { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH } from '../src/core/themes/_shared/spec/validate'
import { FORBIDDEN_CSS_PROPS, HARD_REMOVE_TAGS } from '../src/core/pipeline/rules'
import { CONTAINER_VOCABULARY, kindOf, notesFor, packOf } from '../src/core/vocabulary/vocabulary'
import { INLINE_EXTENSIONS } from '../src/core/pipeline/inlineExtensions'
import { WT_ERROR_INFO, WT_ERROR_CODES } from '../src/core/errors'
import { COMMANDS } from '../packages/cli/src/commands'

type CapabilitiesSchemaVersion = '3.0'

interface DeprecationNotice {
  id: string
  sinceVersion: string
  replacement: string
  removalPlannedIn?: string
}

interface CapabilitiesV3 {
  schemaVersion: CapabilitiesSchemaVersion
  tool: { name: string; version: string; repo?: string }
  generatedAt: string
  /**
   * 版本桥接：`tool.version` 走 SemVer（实现版本），`schemaVersion` 走契约版本。
   *   - minToolVersion         下游能用本契约的最低工具版本
   *   - recommendedToolVersion 推荐对齐的工具版本
   *   - supportedSchemaVersions 本工具当前能消费 / 输出的所有 schemaVersion（多版本共存窗口）
   */
  compatibility: {
    minToolVersion: string
    recommendedToolVersion: string
    supportedSchemaVersions: readonly string[]
  }
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
    kickers: Record<string, string>
    capabilities?: {
      containers?: readonly string[]
      variantOverrides?: Record<string, string>
      excluded?: readonly string[]
    }
  }>
  containers: Array<{
    id: string
    category: string
    /** 'base' / 'pack:<domain>' / 'theme:<themeId>' 三层 namespace */
    pack: 'base' | `pack:${string}` | `theme:${string}`
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
  inlineExtensions: Array<{
    syntax: string
    description: string
    regex: string
    inputExample: string
    outputHtmlExample: string
  }>
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
  /** WtException 可能抛的错误码 + 对应 CLI 退出码 + 一行说明。 */
  errorCodes: ReadonlyArray<{ code: string; exitCode: number; description: string }>
  /**
   * CLI 自描述。每个 Command 的 inputSchema/outputSchema 是 JSON Schema draft-07，
   * 下游 LLM 工具注册（MCP / OpenAI function-calling）可直接消费。
   */
  cli: {
    bin: string
    describeCommand: string
    commands: ReadonlyArray<{
      name: string
      description: string
      inputSchema: Record<string, unknown>
      outputSchema: Record<string, unknown>
    }>
  }
  /** 本 JSON 在 jsDelivr 上的 canonical URL。selfUri tracks @main；versionedSelfUri 钉到 v{x.y.z} tag。 */
  selfUri: string
  versionedSelfUri: string
  /** 封面占位 SVG 资源路径模板，`pattern.replace('{personaId}', id)` 拼具体 URL。 */
  coverUriPattern: string
  coverUriPatternVersioned: string
  /** 已注册的发布平台 adapter 摘要。下游 UI 建议只暴露 stable+beta。 */
  platforms: ReadonlyArray<{
    id: string
    name: string
    status: 'stable' | 'beta' | 'placeholder'
  }>
  /** 已登记的 deprecation 通道。首次破坏 contract 时把旧字段登记进来。 */
  deprecations: readonly DeprecationNotice[]
  /**
   * 4 级降级链与每层失效行为的机器可读版本。配合 `docs/contract/fallback.md` 使用。
   */
  fallbackBehavior: {
    variantChain: ReadonlyArray<{
      level: 'L1' | 'L2' | 'L3' | 'L4'
      source: string
      action: string
    }>
    defaultVariants: Record<string, string>
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
 * 用于构造 jsDelivr URL `cdn.jsdelivr.net/gh/{owner}/{repo}@{ref}/...`。
 * 非 GitHub 仓库返回 null —— 私有镜像的 selfUri 需要 fork 自己改 build 脚本。
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

function buildContainers(): CapabilitiesV3['containers'] {
  return CONTAINER_VOCABULARY
    .map((spec) => ({
      id: spec.name,
      category: spec.category,
      pack: packOf(spec),
      kind: kindOf(spec),
      variants: spec.variantKind ? VARIANT_IDS[spec.variantKind] : undefined,
      defaultVariant: spec.variantKind ? DEFAULT_VARIANTS[spec.variantKind] : undefined,
      children: spec.children,
      parent: spec.parent,
      fenceLength: spec.fenceLength,
      description: spec.description,
      example: spec.example,
      attrs: spec.attrs,
      notes: notesFor(spec),
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
}

function buildErrorCodes(): CapabilitiesV3['errorCodes'] {
  return WT_ERROR_CODES.map((code) => ({
    code,
    exitCode: WT_ERROR_INFO[code].exitCode,
    description: WT_ERROR_INFO[code].description,
  }))
}

function buildCli(): CapabilitiesV3['cli'] {
  return {
    bin: 'wechat-typeset',
    describeCommand: 'describe',
    commands: COMMANDS.map((c) => ({
      name: c.name,
      description: c.description,
      inputSchema: c.inputSchema as Record<string, unknown>,
      outputSchema: c.outputSchema as Record<string, unknown>,
    })),
  }
}

function build(): CapabilitiesV3 {
  const pkg = pkgJson()
  const personas = listPersonas().map((p) => {
    const fullSpec = getPersona(p.id)
    const kickers = { ...DEFAULT_KICKERS, ...(fullSpec.kickers ?? {}) }
    const out: CapabilitiesV3['personas'][number] = {
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
    schemaVersion: '3.0',
    tool: {
      name: pkg.name,
      version: pkg.version,
      repo: pkg.homepage,
    },
    generatedAt: new Date().toISOString(),
    compatibility: {
      minToolVersion: '0.1.0',
      recommendedToolVersion: pkg.version,
      supportedSchemaVersions: ['3.0'],
    },
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
    inlineExtensions: INLINE_EXTENSIONS.map((e) => ({
      syntax: e.syntax,
      description: e.description,
      regex: e.regex,
      inputExample: e.inputExample,
      outputHtmlExample: e.outputHtmlExample,
    })),
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
    errorCodes: buildErrorCodes(),
    cli: buildCli(),
    platforms,
    selfUri,
    versionedSelfUri,
    coverUriPattern,
    coverUriPatternVersioned,
    deprecations: [],
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
        { condition: 'render 同时给 persona/theme/spec', action: 'error', report: '抛 WtException(INPUT_AMBIGUOUS)' },
        { condition: 'render(spec) 投影失败', action: 'error', report: '抛 WtException(SPEC_INVALID)，e.errors 携带逐条 WtError' },
        { condition: '未知 persona id', action: 'error', report: '抛 WtException(RESOURCE_NOT_FOUND)' },
        { condition: '未知 platform id', action: 'error', report: '抛 WtException(PLATFORM_UNSUPPORTED)' },
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
