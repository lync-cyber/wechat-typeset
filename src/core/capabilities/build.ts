import { getPersona, listPersonas, listPublishPlatforms } from '../../public'
import { VARIANT_IDS, DEFAULT_VARIANTS, DEFAULT_KICKERS } from '../themes/types'
import { SUPPORTED_SIGNATURE_CONTAINERS } from '../themes/_shared/spec'
import { HEX_RE, MIN_FONT_SIZE, MIN_STROKE_WIDTH } from '../themes/_shared/spec/validate'
import { FORBIDDEN_CSS_PROPS, HARD_REMOVE_TAGS } from '../pipeline/rules'
import { CONTAINER_VOCABULARY, kindOf, notesFor, packOf } from '../vocabulary/vocabulary'
import { INLINE_EXTENSIONS } from '../pipeline/inlineExtensions'
import { WT_ERROR_INFO, WT_ERROR_CODES } from '../errors'

type CapabilitiesSchemaVersion = '3.0' | '3.1'

interface DeprecationNotice {
  id: string
  sinceVersion: string
  replacement: string
  removalPlannedIn?: string
}

export interface CapabilitiesV3 {
  schemaVersion: CapabilitiesSchemaVersion
  tool: { name: string; version: string; repo?: string }
  generatedAt: string
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
  errorCodes: ReadonlyArray<{ code: string; exitCode: number; description: string }>
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
  selfUri: string
  versionedSelfUri: string
  coverUriPattern: string
  coverUriPatternVersioned: string
  platforms: ReadonlyArray<{
    id: string
    name: string
    status: 'stable' | 'beta' | 'placeholder'
  }>
  deprecations: readonly DeprecationNotice[]
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

export interface BuildCapabilitiesV3Options {
  selfUri?: string
  versionedSelfUri?: string
  coverUriPattern?: string
  coverUriPatternVersioned?: string
  toolVersion: string
  toolName: string
  toolRepo?: string
  /** Pre-built CLI command list; omit to get an empty array */
  cliCommands?: ReadonlyArray<{
    name: string
    description: string
    inputSchema: Record<string, unknown>
    outputSchema: Record<string, unknown>
  }>
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

export function buildCapabilitiesV3(options: BuildCapabilitiesV3Options): CapabilitiesV3 {
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

  return {
    schemaVersion: '3.1',
    tool: {
      name: options.toolName,
      version: options.toolVersion,
      repo: options.toolRepo,
    },
    generatedAt: new Date().toISOString(),
    compatibility: {
      minToolVersion: '0.1.0',
      recommendedToolVersion: options.toolVersion,
      supportedSchemaVersions: ['3.0', '3.1'],
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
    cli: {
      bin: 'wechat-typeset',
      describeCommand: 'describe',
      commands: options.cliCommands ?? [],
    },
    platforms,
    selfUri: options.selfUri ?? '',
    versionedSelfUri: options.versionedSelfUri ?? '',
    coverUriPattern: options.coverUriPattern ?? '',
    coverUriPatternVersioned: options.coverUriPatternVersioned ?? '',
    deprecations: [
      { id: 'cli.command.render', sinceVersion: '0.2', replacement: 'markdown render' },
      { id: 'cli.command.lint', sinceVersion: '0.2', replacement: 'markdown lint' },
      { id: 'cli.command.annotate', sinceVersion: '0.2', replacement: 'markdown annotate' },
      { id: 'cli.command.annotate apply', sinceVersion: '0.2', replacement: 'markdown annotate apply' },
      { id: 'cli.command.validate', sinceVersion: '0.2', replacement: 'validate spec / validate markdown' },
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
