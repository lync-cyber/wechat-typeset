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

import type { Theme, ThemeVariants } from '../themes/types'
import { VARIANT_IDS } from '../themes/types'
import type {
  JSONSchema7,
  MotifShape,
  MotifSpec,
  MotifTemplate,
  Palette,
  PersonaSpec,
  SignatureContainerId,
  SpecValidationResult,
} from '../themes/_shared/spec'
import {
  PERSONA_SPEC_SCHEMA,
  SUPPORTED_SIGNATURE_CONTAINERS,
  renderMotifTemplate,
  shapeToSvg,
  specToTheme,
  validateSpec,
} from '../themes/_shared/spec'
import { render as pipelineRender, type RenderOutput } from '../pipeline'
import type { WxPatchOptions } from '../pipeline/wxPatch'
import { PERSONA_REGISTRY, PERSONA_SPECS } from './personas'

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
  wxPatch?: WxPatchOptions
}

export type PublicRenderOutput = RenderOutput

/**
 * markdown → HTML 主入口。
 *
 * 三选一 persona / theme / spec 必须恰好给一个；都不给时默认 persona="default"。
 * 传 spec 时会先 validatePersona，失败抛 SpecValidationError。
 */
export function render(input: PublicRenderInput): PublicRenderOutput {
  const theme = resolveTheme(input)
  return pipelineRender({ md: input.md, theme, wxPatch: input.wxPatch })
}

function resolveTheme(input: PublicRenderInput): Theme {
  const declared = [input.persona, input.theme, input.spec].filter((v) => v !== undefined).length
  if (declared > 1) {
    throw new Error(
      'render: provide exactly one of `persona` | `theme` | `spec` (got ' + declared + ')',
    )
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
}
