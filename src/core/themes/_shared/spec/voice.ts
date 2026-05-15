/**
 * 主题 voice 覆盖度分析。
 *
 * 与 validate.ts 的边界（语义层级 vs 视觉表达）：
 *   - validate：硬约束（hex / fontSize ≥ 14 / strokeWidth ≥ 1 / font-family 白名单 / variant id 合法 …）
 *     违反就是 spec 不能构造为 Theme，必须 error。
 *   - voice：软约束（"该主题对核心通用容器/元素的视觉表达是否充足"）
 *     - base 容器/元素未覆写 → warning：主题在那些槽位走 token 兜底，与 default 视觉接近
 *     - 整体覆盖度 < 阈值 → error：主题没有可辨识的视觉个性，应充实 spec
 *     - 使用了 pack:* 扩展容器 → info：写作集成方/LLM 需要知道"该主题愿意演刊物形态"
 *     - 使用了 theme:<别人> 的专属容器 → warning：跨主题专属容器无法在自家 pipeline 落地
 *
 * 应覆盖集来源（纯派生，不重写清单）：
 *   - 容器：STYLED_CONTAINERS where packOf===base && !parent —— vocabulary 是单一真源
 *   - 元素：BASE_ELEMENT_KEYS —— ThemeElements 的全字段子集（手写一份字面量
 *     联合，运行时拿不到 TS 类型 keys；buildTheme.baseElements 改字段时手动同步）
 *
 * 纯函数；不读 Theme（避免污染 spec 阶段），不感知 pipeline 渲染。
 */

import { packOf, namespaceOf, STYLED_CONTAINERS } from '../../../vocabulary/vocabulary'
import type { PersonaSpec } from './types'

export interface VoiceIssue {
  /** spec 内位置（如 `containers.tip` / `elements.h2` / `signatureContainers.kpiDashboard`） */
  path: string
  message: string
  level: 'error' | 'warning' | 'info'
}

export interface ThemeVoiceCoverage {
  /** 应覆盖 base 容器数（vocab 派生）。 */
  expectedContainers: number
  /** 已覆盖 base 容器数（spec.containers ∩ expected）。 */
  coveredContainers: number
  /** 应覆盖元素数（BASE_ELEMENT_KEYS）。 */
  expectedElements: number
  /** 已覆盖元素数（spec.elements ∩ expected）。 */
  coveredElements: number
  /** (coveredContainers+coveredElements) / (expectedContainers+expectedElements) ∈ [0,1] */
  rate: number
}

export interface ThemeVoiceResult {
  themeId: string
  coverage: ThemeVoiceCoverage
  issues: VoiceIssue[]
  /** issues 中 level==='error' 的子集（便于 `expect(result.errors).toEqual([])`）。 */
  errors: VoiceIssue[]
  warnings: VoiceIssue[]
  infos: VoiceIssue[]
}

/**
 * ThemeElements 中由 voice 检查纳入"应覆盖"的字段集。
 *
 * 与 buildTheme.baseElements 的字段集严格同步——baseElements 增加字段时
 * 本数组同步追加，否则新元素会"无声地"落出 voice 检查范围。
 */
export const BASE_ELEMENT_KEYS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'blockquote',
  'ul', 'ol', 'li',
  'code', 'kbd', 'pre',
  'img', 'a', 'hr',
  'table', 'th', 'td',
  'strong', 'em',
] as const satisfies readonly string[]

/**
 * 主题 voice 覆盖率默认下限。
 *
 * 经验取值：base 容器约 21 个 + 元素 18 个 = 39 项应覆盖；30% 约 12 项。
 * 一个有可辨识视觉个性的主题至少应在 12 个槽位上有自己的 voice 表达，
 * 否则与 default 兜底视觉接近。
 */
export const DEFAULT_MIN_COVERAGE_RATE = 0.3

/**
 * "低 voice 容忍清单"：列入此清单的主题，覆盖度低于阈值时 error → warning 降级。
 *
 * 这是技术债务的**显式**登记：默认阈值 = "我们对主题视觉个性的下限期待"，清单 = "当前
 * 现状例外，待补"。比"偷偷降阈值放过"更诚实——读到代码的人立刻知道该补谁、补到什么程度。
 *
 * 移除流程：在主题的 spec.containers / spec.elements 里补足覆写，使其 rate ≥
 * DEFAULT_MIN_COVERAGE_RATE，即可从本清单删除条目。
 *
 * 当前条目：（空）
 */
export const LOW_VOICE_TEMPORARY_GRACE: ReadonlySet<string> = new Set([])

/**
 * Base 容器应覆盖集（styleKey）。从 STYLED_CONTAINERS 派生，过滤：
 *   - packOf === 'base'           扩展包/主题专属容器不强求所有主题覆写
 *   - !parent                     嵌套子项（pros/cons/toc-item/...）样式由外层承担
 *
 * free 容器在 STYLED_CONTAINERS 里已被 styleKey=null 过滤掉。
 */
export function getBaseContainerStyleKeys(): readonly string[] {
  return STYLED_CONTAINERS
    .filter((s) => packOf(s) === 'base' && !s.parent)
    .map((s) => s.styleKey)
}

export function analyzeThemeVoice(
  spec: PersonaSpec,
  options?: { minCoverageRate?: number },
): ThemeVoiceResult {
  const threshold = options?.minCoverageRate ?? DEFAULT_MIN_COVERAGE_RATE
  const issues: VoiceIssue[] = []

  const expectedContainers = getBaseContainerStyleKeys()
  const expectedElements = BASE_ELEMENT_KEYS as readonly string[]

  const containerKeys = new Set(Object.keys(spec.containers ?? {}))
  const elementKeys = new Set(Object.keys(spec.elements ?? {}))

  for (const k of expectedContainers) {
    if (!containerKeys.has(k)) {
      issues.push({
        path: `containers.${k}`,
        message: `base 容器 "${k}" 未在 spec.containers 中显式覆写，将使用 token 兜底（视觉与默认主题接近）`,
        level: 'warning',
      })
    }
  }

  for (const k of expectedElements) {
    if (!elementKeys.has(k)) {
      issues.push({
        path: `elements.${k}`,
        message: `元素 "${k}" 未在 spec.elements 中显式覆写，将使用 base 兜底`,
        level: 'warning',
      })
    }
  }

  // signatureContainers 中的 pack 归属分级
  const sigContainers = spec.signatureContainers ?? []
  for (const styleKey of sigContainers) {
    const cs = STYLED_CONTAINERS.find((s) => s.styleKey === styleKey)
    if (!cs) continue
    const pack = packOf(cs)
    const ns = namespaceOf(pack)
    if (ns === 'pack') {
      issues.push({
        path: `signatureContainers.${styleKey}`,
        message: `使用了扩展包 ${pack} 的容器 "${cs.name}"（pack:* 容器跨主题共享，可演刊物形态）`,
        level: 'info',
      })
    } else if (ns === 'theme') {
      const ownerThemeId = pack.slice('theme:'.length)
      if (ownerThemeId !== spec.id) {
        issues.push({
          path: `signatureContainers.${styleKey}`,
          message: `使用了其他主题的专属容器 "${cs.name}"（pack=${pack}）—— 该容器仅在 ${ownerThemeId} 主题下渲染`,
          level: 'warning',
        })
      }
    }
  }

  // 覆盖率
  const coveredContainers = expectedContainers.filter((k) => containerKeys.has(k)).length
  const coveredElements = expectedElements.filter((k) => elementKeys.has(k)).length
  const expectedTotal = expectedContainers.length + expectedElements.length
  const covered = coveredContainers + coveredElements
  const rate = expectedTotal > 0 ? covered / expectedTotal : 1

  if (rate < threshold) {
    const inGrace = LOW_VOICE_TEMPORARY_GRACE.has(spec.id)
    issues.push({
      path: 'voice',
      message:
        `主题 voice 覆盖度过低：${(rate * 100).toFixed(1)}% < 阈值 ${(threshold * 100).toFixed(0)}% ` +
        `（已覆盖 ${covered}/${expectedTotal}：容器 ${coveredContainers}/${expectedContainers.length}，元素 ${coveredElements}/${expectedElements.length}）` +
        (inGrace ? '【已登记技术债 LOW_VOICE_TEMPORARY_GRACE，补足后从清单移除即可 hard-fail】' : ''),
      level: inGrace ? 'warning' : 'error',
    })
  }

  return {
    themeId: spec.id,
    coverage: {
      expectedContainers: expectedContainers.length,
      coveredContainers,
      expectedElements: expectedElements.length,
      coveredElements,
      rate,
    },
    issues,
    errors: issues.filter((i) => i.level === 'error'),
    warnings: issues.filter((i) => i.level === 'warning'),
    infos: issues.filter((i) => i.level === 'info'),
  }
}
