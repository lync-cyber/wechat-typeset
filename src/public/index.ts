/**
 * wechat-typeset 公共 API。
 *
 * 这是 LLM / 外部集成方的唯一入口。设计三条约束：
 *   1. Node-safe：只用静态 import，不碰 import.meta.glob；tsx / vite / bun 下都能跑。
 *   2. 无副作用：createPersona 不改注册表；LLM 每次都能信赖 listPersonas() 的结果是恒定的。
 *   3. 窄表面：暴露 12 个符号，不暴露 Theme 内部的 buildTheme / themeCSS 等实现细节。
 *
 * 分层：
 *   - 只读元信息：listPersonas / getPersona / getPersonaSummary / getSchema
 *                 / getSupportedSignatureContainers / getVariantIds
 *   - 校验：validatePersona
 *   - 渲染：render（md → html）/ createPersona（spec → Theme）
 *   - Motif 工具：getMotifSpec / renderMotif / renderMotifWithValues
 */

import type { Theme, ThemeVariants } from '../core/themes/types'
import { DEFAULT_VARIANTS, VARIANT_IDS } from '../core/themes/types'
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
import { PERSONA_REGISTRY, PERSONA_SPECS } from './personas'
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

// ============================================================
// 只读元信息
// ============================================================

/**
 * LLM 友好的主题摘要。去掉了样式补丁和 meta.ownerNotes 等重字段，
 * 只保留选型信号（name / description / audience / palette / signatureContainers / variants）。
 */
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

/** 列出所有内置 persona 的摘要。展示顺序稳定（见 personas.ts 的 PERSONA_SPECS）。 */
export function listPersonas(): readonly PersonaSummary[] {
  return PERSONA_SPECS.map(toSummary)
}

/**
 * 返回指定 id 的 PersonaSpec 完整对象。
 * 未知 id 抛 Error（不静默回退到 default —— LLM 若拼错 id 应当早失败）。
 */
export function getPersona(id: string): PersonaSpec {
  const spec = PERSONA_REGISTRY[id]
  if (!spec) {
    throw new Error(
      `Unknown persona id: "${id}". Known: ${Object.keys(PERSONA_REGISTRY).join(', ')}`,
    )
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

// ============================================================
// Container Vocabulary（Headless 契约层的作者查询接口）
// ============================================================

/**
 * 返回所有合法 `:::` 容器的权威词汇表（主题无关）。
 *
 * 每个条目含：name（kebab fence）、category、variantKind?、fenceLength、
 * description、example、attrs? —— 足够 LLM 直接生成合法 markdown 而不需要
 * 反查任何主题。
 */
export function getContainerVocabulary(): readonly ContainerSpec[] {
  return _getContainerVocabulary()
}

/** 按 fence 名查单个容器描述。未知名返回 undefined。 */
export function getContainerSpec(name: string): ContainerSpec | undefined {
  return _getContainerSpec(name)
}

/**
 * 某容器可切换的所有 variant 骨架（id + 中文名 + description + themeCompat）。
 * 不支持 variant 切换的容器（note / intro / highlight 等）返回空数组。
 */
export function getVariantsForContainer(containerName: string): VariantDescriptor[] {
  return _getVariantsForContainer(containerName)
}

/**
 * 某主题为各 variant slot 选的默认骨架描述集。
 *
 * 典型用法：先 getPersona(id) 拿 PersonaSpec，再把 spec.variants 传进来。
 */
export function getThemeDefaultVariants(
  variants: import('../core/themes/types').ThemeVariants,
): VariantDescriptor[] {
  return _getThemeDefaultVariants(variants)
}

/**
 * 为指定容器生成最小 markdown snippet。
 *   - 不传 options：返回 spec.example 原样
 *   - 传 variantId：在 open 行追加/替换 variant=xxx
 */
export function getContainerSnippet(
  containerName: string,
  options?: SnippetOptions,
): string {
  return _getContainerSnippet(containerName, options)
}

/**
 * 主题能力复合查询（"按主题筛容器 + 推荐 variant"一站式）。
 *
 * 输入 personaId 后聚合：
 *   - PersonaSpec.variants / signatureContainers / capabilities
 *   - ContainerVocabulary 全集（按 namespace 过滤本主题可用容器）
 *   - 反向索引 themeCompat：哪些 variant 对本主题友好
 *
 * 让 LLM / 写作集成方一次拿到"swiss-grid 主题下该用什么、推荐什么、排除什么"。
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
 * 反向索引：列出对指定主题"友好"的 variant 清单（按 kind 分组），
 * `spec.capabilities.variantOverrides` 中显式推荐的 id 排在最前。
 *
 * 与 getVariantsForContainer 的差别：本函数从主题视角枚举所有"对本主题友好"的 variant，
 * 用于回答"作者切到 swiss-grid 后，admonition 类除了主题默认还推荐用什么"。
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

// ============================================================
// 校验
// ============================================================

/**
 * 对任意 PersonaSpec 跑硬约束校验。
 * 输入可能来自 LLM 生成，不保证类型完整——参数签名用 `unknown` 不合适会误导调用方，
 * 这里要求 PersonaSpec 类型，靠 JSON Schema 验证让外部先做结构拦截。
 */
export function validatePersona(spec: PersonaSpec): SpecValidationResult {
  return validateSpec(spec)
}

// ============================================================
// 渲染
// ============================================================

/**
 * 三选一输入（exclusive）：
 *   - persona: id，查内置注册表
 *   - theme: 已构建的 Theme 对象
 *   - spec: 临时 PersonaSpec（先投影为 Theme 再渲染）
 */
export interface PublicRenderInput {
  md: string
  persona?: string
  theme?: Theme
  spec?: PersonaSpec
  /**
   * 复制 / 导出目标平台 id。默认 'wechat'。
   * 走 platforms/registry 派发；可选值见 listPublishPlatforms()。
   */
  platform?: string
  wxPatch?: WxPatchOptions
}

export type PublicRenderOutput = RenderOutput

/**
 * markdown → HTML 主入口。
 *
 * 三选一 persona / theme / spec 必须恰好给一个；都不给时默认 persona="default"。
 * 传 spec 时会先 validatePersona，失败抛 SpecValidationError。
 *
 * Frontmatter（L2 页面局部配置）解析：
 *   - markdown 首部 `---\n theme: <id>\n---` 会**覆盖**入参 persona / theme / spec
 *     （让一篇 markdown 自带主题声明；集成方读 frontmatter 后即可决定渲染人格）
 *   - `variants:` 嵌套块作为 L2 优先级生效，介于 attrs.variant 与 theme.variants 之间
 *   - 未识别的主题 id 静默回退到 input.persona / theme / spec；frontmatterIssues 报告 warning
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
 * 列出所有已注册发布平台 adapter（id / name / status）。
 *
 * 外部集成方据此知道当前哪些平台可用 / 处于占位状态——也由 capabilities.json
 * 同源派生。不暴露 patch / inspect 函数，避免外部绕过 pipeline 直接调用。
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
    throw new Error(
      'render: provide exactly one of `persona` | `theme` | `spec` (got ' + declared + ')',
    )
  }
  // L2 frontmatter.theme 优先级最高：让一篇 markdown 自带主题声明，凌驾于调用方的 input.persona / theme / spec。
  // 未注册的 frontmatter.theme 静默回退到 input（避免 publish 时因小拼写挂掉整篇）；详细 warning 由
  // pipelineRender 输出的 frontmatterIssues 承担。
  if (frontmatterTheme && PERSONA_REGISTRY[frontmatterTheme]) {
    return specToTheme(PERSONA_REGISTRY[frontmatterTheme])
  }
  if (input.theme) return input.theme
  if (input.spec) {
    const result = validateSpec(input.spec)
    if (!result.ok) throw new SpecValidationError(result)
    return specToTheme(input.spec)
  }
  const id = input.persona ?? 'default'
  const spec = getPersona(id)
  return specToTheme(spec)
}

/**
 * spec → Theme 投影 + 校验。返回结果里附带 validation，失败时不抛错——
 * LLM 生成流程常会拿到部分合规的 spec，让调用方自己决定是警告还是硬拒。
 *
 * 调用方拿到 ok=true 的 Theme 就可以直接传给 render()；
 * ok=false 时 theme 仍然返回（best-effort 投影），但外观可能脱离平台约束。
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

/** 校验失败抛出的专用错误类型；携带 errors / warnings 原文，便于 LLM 改写重试。 */
export class SpecValidationError extends Error {
  readonly result: SpecValidationResult
  constructor(result: SpecValidationResult) {
    super(
      `PersonaSpec validation failed (${result.errors.length} errors):\n` +
        result.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n'),
    )
    this.name = 'SpecValidationError'
    this.result = result
  }
}

// ============================================================
// Motif 工具
// ============================================================

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

// ============================================================
// 类型再导出（消费方单点引用）
// ============================================================

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
}
