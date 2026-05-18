/**
 * 变体主题兼容校验（运行时软警告 + fallback）。
 *
 * themeCompat / signatureOf 之前只在组件推荐 API 与 usage 分析里被消费，渲染管线零阻断。
 * 这导致 `::: tip variant=marginalia` 在任何主题下都会渲染 marginalia 的
 * 【按】【疑】【注】【辨】签名，污染了 literary-humanism 之外主题的视觉语义。
 *
 * 本守卫在 makeVariantContainer 的 resolveVariant 中调用：当 variant 的等效主题白名单
 * （getEffectiveCompat：signatureOf 优先单元素，否则取 themeCompat）非空且不含当前主题时，
 * 回退到 fallback variant，并按 (themeId, variantId) 去重 warn 一次。
 */
import { getEffectiveCompat, type VariantMeta } from '../../../variants/_core'

const warned = new Set<string>()
let silent = false

export interface CompatCheckResult {
  /** 是否允许当前 variant 被使用 */
  ok: boolean
}

export function checkVariantCompat(
  themeId: string,
  meta: VariantMeta | undefined,
): CompatCheckResult {
  const compat = getEffectiveCompat(meta)
  if (compat.length === 0) return { ok: true }
  if (compat.includes(themeId)) return { ok: true }

  const key = `${themeId}::${meta!.id}`
  if (!silent && !warned.has(key)) {
    warned.add(key)
    const fieldName = meta!.signatureOf ? 'signatureOf' : 'themeCompat'
    console.warn(
      `[wechat-typeset] variant "${meta!.id}" 的 ${fieldName} 不含当前主题 "${themeId}"，` +
        `已回退到主题默认/fallback variant。如确需此组合，请把 "${themeId}" 加入 ` +
        `${meta!.id}.meta.${fieldName === 'signatureOf' ? 'themeCompat' : 'themeCompat'}（多主题语境需从 signatureOf 升级为 themeCompat）。`,
    )
  }
  return { ok: false }
}

/** 测试钩子：只在 spec 测试里清理 warn dedupe 集合。生产代码勿用。 */
export function __resetCompatWarnedForTest(): void {
  warned.clear()
}

/**
 * 测试钩子：静音 warn 输出。variant-sanity 全矩阵 / e2e fixture 覆盖会故意穿越
 * 所有 (variant, theme) 组合（fallback 路径正是被测对象），生产期 warn 在测试日志
 * 里变成数百行噪声。spec 在 beforeAll 打开、afterAll 关掉。生产代码勿用。
 */
export function __setCompatSilentForTest(v: boolean): void {
  silent = v
}
