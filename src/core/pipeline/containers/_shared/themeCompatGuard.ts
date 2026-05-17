/**
 * 变体主题兼容校验（运行时软警告 + fallback）。
 *
 * themeCompat 之前只在组件推荐 API 与 usage 分析里被消费，渲染管线零阻断。
 * 这导致 `::: tip variant=marginalia` 在任何主题下都会渲染 marginalia 的
 * 【按】【疑】【注】【辨】签名，污染了 literary-humanism 之外主题的视觉语义。
 *
 * 本守卫在 makeVariantContainer 的 resolveVariant 中调用：当 variant.meta.themeCompat
 * 非空且不含当前主题时，回退到 fallback variant，并按 (themeId, variantId) 去重 warn 一次。
 */
import type { VariantMeta } from '../../../variants/_core'

const warned = new Set<string>()

export interface CompatCheckResult {
  /** 是否允许当前 variant 被使用 */
  ok: boolean
}

export function checkVariantCompat(
  themeId: string,
  meta: VariantMeta | undefined,
): CompatCheckResult {
  const compat = meta?.themeCompat
  if (!compat || compat.length === 0) return { ok: true }
  if (compat.includes(themeId)) return { ok: true }

  const key = `${themeId}::${meta!.id}`
  if (!warned.has(key)) {
    warned.add(key)
    console.warn(
      `[wechat-typeset] variant "${meta!.id}" 的 themeCompat 不含当前主题 "${themeId}"，` +
        `已回退到主题默认/fallback variant。如确需此组合，请把 "${themeId}" 加入 ` +
        `${meta!.id}.meta.themeCompat。`,
    )
  }
  return { ok: false }
}

/** 测试钩子：只在 spec 测试里清理 warn dedupe 集合。生产代码勿用。 */
export function __resetCompatWarnedForTest(): void {
  warned.clear()
}
