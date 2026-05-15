/**
 * wechat-typeset 公共 API —— LLM / 外部集成方的唯一入口。
 *
 * 设计约束：Node-safe（静态 import，不用 import.meta.glob）；无副作用（createPersona 不改
 * 注册表）；窄表面（不暴露 Theme 内部 buildTheme / themeCSS）。
 */

import type { Theme, ThemeVariants } from '../core/themes/types'
import { DEFAULT_KICKERS, DEFAULT_VARIANTS, VARIANT_IDS } from '../core/themes/types'
import {
  ALLOWED_FONT_FAMILIES,
  HEX_RE,
  MIN_FONT_SIZE,
  MIN_STROKE_WIDTH,
} from '../core/themes/_shared/spec/validate'
import { INLINE_EXTENSIONS, type InlineExtensionSpec } from '../core/pipeline/inlineExtensions'
import { WtException, fail } from '../core/errors'
import type {
  JSONSchema7,
  MotifShape,
  MotifSpec,
  MotifTemplate,
  Palette,
  PersonaSpec,
  SignatureContainerId,
  SpecValidationResult,
} from '../core/themes/_shared/spec'
import {
  PERSONA_SPEC_SCHEMA,
  SUPPORTED_SIGNATURE_CONTAINERS,
  renderMotifTemplate,
  shapeToSvg,
  specToTheme,
  validateSpec,
} from '../core/themes/_shared/spec'
import { render as pipelineRender, type RenderOutput } from '../core/pipeline'
import { parseFrontmatter } from '../core/pipeline/frontmatter'
import type { WxPatchOptions } from '../core/pipeline/platforms/wechat'
import { listPlatforms } from '../core/pipeline/platforms/registry'
import type { PlatformAdapter, PlatformStatus } from '../core/pipeline/platforms/types'
import { SPEC_REGISTRY, ORDERED_SPECS } from '../core/themes/registry'
import {
  getContainerVocabulary as _getContainerVocabulary,
  getContainerSpec as _getContainerSpec,
  getVariantsForContainer as _getVariantsForContainer,
  getThemeDefaultVariants as _getThemeDefaultVariants,
  getContainerSnippet as _getContainerSnippet,
  getThemeCapabilitiesView as _getThemeCapabilitiesView,
  getRecommendedVariantsFor as _getRecommendedVariantsFor,
  type ContainerSpec,
  type ContainerCategory,
  type ContainerPack,
  type AttrSpec,
  type VariantDescriptor,
  type SnippetOptions,
  type ThemeCapabilitiesView,
} from '../core/vocabulary'

// region 只读元信息

/** LLM 友好的主题摘要。去掉样式补丁和 meta.ownerNotes 等重字段，只保留选型信号。 */
export interface PersonaSummary {
  id: string
  name: string
  description: string
  audience: string
  palette: Palette
  variants: ThemeVariants
  signatureContainers: readonly SignatureContainerId[]
}

function toSummary(spec: PersonaSpec): PersonaSummary {
  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    audience: spec.audience,
    palette: spec.palette,
    variants: spec.variants,
    signatureContainers: spec.signatureContainers ?? [],
  }
}

/** 列出所有内置 persona 的摘要。展示顺序见 themes/registry.ts:DISPLAY_ORDER。 */
export function listPersonas(): readonly PersonaSummary[] {
  return ORDERED_SPECS.map(toSummary)
}

/**
 * 返回指定 id 的 PersonaSpec 完整对象。
 * 未知 id 抛 `WtException(RESOURCE_NOT_FOUND)`——不静默回退到 default。
 */
export function getPersona(id: string): PersonaSpec {
  const spec = SPEC_REGISTRY[id]
  if (!spec) {
    fail('RESOURCE_NOT_FOUND', `Unknown persona id: "${id}"`, {
      path: `persona.id`,
      hint: `Known ids: ${Object.keys(SPEC_REGISTRY).join(', ')}`,
    })
  }
  return spec
}

/** 只拿摘要（省带宽；列表选型后再 getPersona 拿详细） */
export function getPersonaSummary(id: string): PersonaSummary {
  return toSummary(getPersona(id))
}

/** PersonaSpec 的完整 JSON Schema（draft-07），用于 LLM 结构化输出约束。 */
export function getSchema(): JSONSchema7 {
  return PERSONA_SPEC_SCHEMA
}

/** 允许在 signatureContainers 里声明的容器 id 清单。 */
export function getSupportedSignatureContainers(): readonly SignatureContainerId[] {
  return SUPPORTED_SIGNATURE_CONTAINERS
}

/** 各 variant 类目的合法 id 清单（admonition/quote/compare/steps/divider/sectionTitle/codeBlock）。 */
export function getVariantIds(): typeof VARIANT_IDS {
  return VARIANT_IDS
}

/** 微信平台硬约束阈值（spec 校验 / LLM 生成提示统一引用）。 */
export const HARD_RULES = Object.freeze({
  hexPattern: HEX_RE.source,
  minFontSize: MIN_FONT_SIZE,
  minStrokeWidth: MIN_STROKE_WIDTH,
  allowedFontFamilies: Object.freeze([...ALLOWED_FONT_FAMILIES]) as readonly string[],
})

/** 主题级 kicker 文案的全局兜底（与主题 `kickers` 字段深合并后产出最终值）。 */
export function getDefaultKickers(): typeof DEFAULT_KICKERS {
  return DEFAULT_KICKERS
}

/** 行内扩展清单（==mark== / [.着重.] 等），与 capabilities.json 同源。 */
export function getInlineExtensions(): readonly InlineExtensionSpec[] {
  return INLINE_EXTENSIONS
}

// region Container Vocabulary（Headless 契约层的作者查询接口）

/** 返回所有合法 `:::` 容器的权威词汇表（主题无关）。足够 LLM 直接生成合法 markdown。 */
export function getContainerVocabulary(): readonly ContainerSpec[] {
  return _getContainerVocabulary()
}

/** 按 fence 名查单个容器描述。未知名返回 undefined。 */
export function getContainerSpec(name: string): ContainerSpec | undefined {
  return _getContainerSpec(name)
}

/** 某容器可切换的所有 variant 骨架。不支持切换的容器（note/intro/highlight）返回空数组。 */
export function getVariantsForContainer(containerName: string): VariantDescriptor[] {
  return _getVariantsForContainer(containerName)
}

/** 某主题为各 variant slot 选的默认骨架描述集。传 PersonaSpec.variants 进来。 */
export function getThemeDefaultVariants(
  variants: import('../core/themes/types').ThemeVariants,
): VariantDescriptor[] {
  return _getThemeDefaultVariants(variants)
}

/** 为指定容器生成最小 markdown snippet。传 variantId 时在 open 行追加/替换 variant=xxx。 */
export function getContainerSnippet(
  containerName: string,
  options?: SnippetOptions,
): string {
  return _getContainerSnippet(containerName, options)
}

/**
 * 主题能力复合查询（"按主题筛容器 + 推荐 variant"一站式）。聚合 PersonaSpec.variants /
 * signatureContainers / capabilities + ContainerVocabulary 全集（按 namespace 过滤）+
 * themeCompat 反向索引。
 */
export function getThemeCapabilities(personaId: string): ThemeCapabilitiesView {
  const spec = getPersona(personaId)
  return _getThemeCapabilitiesView({
    themeId: spec.id,
    variants: { ...DEFAULT_VARIANTS, ...spec.variants },
    capabilities: spec.capabilities,
    signatureContainers: spec.signatureContainers,
  })
}

/**
 * 反向索引：列出对指定主题"友好"的 variant 清单（按 kind 分组）。
 * `spec.capabilities.variantOverrides` 中显式推荐的 id 排在最前。
 */
export function getRecommendedVariantsFor(
  personaId: string,
): Record<import('../core/themes/types').VariantKind, string[]> {
  const spec = getPersona(personaId)
  return _getRecommendedVariantsFor({
    themeId: spec.id,
    capabilities: spec.capabilities,
  })
}

// region 校验

/** 对任意 PersonaSpec 跑硬约束校验。LLM 生成的 spec 先靠 JSON Schema 做结构拦截再传入。 */
export function validatePersona(spec: PersonaSpec): SpecValidationResult {
  return validateSpec(spec)
}

// region 渲染

/** 三选一输入（exclusive）：persona id / 已构建的 Theme / 临时 PersonaSpec（投影前先校验）。 */
export interface PublicRenderInput {
  md: string
  persona?: string
  theme?: Theme
  spec?: PersonaSpec
  /** 平台 id，默认 'wechat'。可选值见 listPublishPlatforms()。 */
  platform?: string
  wxPatch?: WxPatchOptions
}

export type PublicRenderOutput = RenderOutput

/**
 * markdown → HTML 主入口。三选一 persona / theme / spec 必须恰好给一个；都不给时默认 persona="default"。
 *
 * Frontmatter (L2)：markdown 首部 `---\n theme: <id>\nvariants:\n  …\n---` 覆盖入参；未识别的
 * `theme` 静默回退到 input，warning 由 RenderOutput.frontmatterIssues 携带。
 */
export function render(input: PublicRenderInput): PublicRenderOutput {
  const { config: fm } = parseFrontmatter(input.md)
  const theme = resolveTheme(input, fm.theme)
  return pipelineRender({
    md: input.md,
    theme,
    platform: input.platform,
    wxPatch: input.wxPatch,
  })
}

/**
 * 列出所有已注册发布平台 adapter。不暴露 patch / inspect 函数，避免外部绕过 pipeline。
 * 与 capabilities.json.platforms 同源派生。
 */
export interface PublicPlatformInfo {
  id: string
  name: string
  status: PlatformStatus
}

export function listPublishPlatforms(): readonly PublicPlatformInfo[] {
  return listPlatforms().map((p: PlatformAdapter) => ({
    id: p.id,
    name: p.name,
    status: p.status,
  }))
}

function resolveTheme(input: PublicRenderInput, frontmatterTheme?: string): Theme {
  const declared = [input.persona, input.theme, input.spec].filter((v) => v !== undefined).length
  if (declared > 1) {
    fail(
      'INPUT_AMBIGUOUS',
      `render: provide exactly one of \`persona\` | \`theme\` | \`spec\` (got ${declared})`,
    )
  }
  // L2 frontmatter.theme 优先级最高：让一篇 markdown 自带主题声明，凌驾于 input.persona/theme/spec。
  if (frontmatterTheme && SPEC_REGISTRY[frontmatterTheme]) {
    return specToTheme(SPEC_REGISTRY[frontmatterTheme])
  }
  if (input.theme) return input.theme
  if (input.spec) {
    const result = validateSpec(input.spec)
    if (!result.ok) throw new WtException('SPEC_INVALID', result.errors, result.warnings)
    return specToTheme(input.spec)
  }
  const id = input.persona ?? 'default'
  const spec = getPersona(id)
  return specToTheme(spec)
}

/**
 * spec → Theme 投影 + 校验。返回 `{ theme, validation }`，失败时不抛错；调用方据
 * `validation.ok` 自决是警告还是硬拒。ok=false 时仍返回 best-effort Theme。
 */
export interface CreatePersonaResult {
  theme: Theme
  validation: SpecValidationResult
}

export function createPersona(spec: PersonaSpec): CreatePersonaResult {
  const validation = validateSpec(spec)
  const theme = specToTheme(spec)
  return { theme, validation }
}

// region Motif 工具

/** 取指定 persona 的 motif AST 集合（用于独立渲染、预览或 LLM 参考）。 */
export function getMotifSpec(personaId: string): MotifSpec {
  return getPersona(personaId).motifs
}

/** 单个 MotifShape → SVG 字符串（xmlns 自动注入）。 */
export function renderMotif(shape: MotifShape): string {
  return shapeToSvg(shape)
}

/** MotifTemplate + 占位符值 → SVG 字符串（e.g. stepBadge + {N:1}）。 */
export function renderMotifWithValues(
  template: MotifTemplate,
  values: Record<string, string | number>,
): string {
  return renderMotifTemplate(template, values)
}

// region 类型再导出（消费方单点引用）

export { parseFrontmatter } from '../core/pipeline/frontmatter'
export type { FrontmatterParseIssue, PageConfig } from '../core/pipeline/frontmatter'

export { EXIT_CODES, WtException } from '../core/errors'
export type { WtError, WtErrorCode } from '../core/errors'

export type {
  JSONSchema7,
  MotifShape,
  MotifSpec,
  MotifTemplate,
  Palette,
  PersonaSpec,
  SignatureContainerId,
  SpecValidationResult,
  Theme,
  ThemeVariants,
  WxPatchOptions,
  PlatformStatus,
  ContainerSpec,
  ContainerCategory,
  ContainerPack,
  AttrSpec,
  VariantDescriptor,
  SnippetOptions,
  ThemeCapabilitiesView,
  InlineExtensionSpec,
}
