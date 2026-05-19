/**
 * 单一移动端判定：触屏 + 窄屏 双成立，或纯极窄屏（兜底罕见小机型）。
 * 桌面笔记本（鼠标 + 高 DPI 缩放）即便 CSS 宽度跌破 767px 也保留双栏。
 *
 * 所有 *.vue 文件里的 `@media (max-width: 767px) and (pointer: coarse), (max-width: 540px)`
 * 必须与本常量字面一致——查找替换前先 grep 这两个字面值。
 */
export const MOBILE_MEDIA_QUERY =
  '(max-width: 767px) and (pointer: coarse), (max-width: 540px)'

export function matchesMobile(): boolean {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches
}

/**
 * ComponentStudio 在 ≥900px 启用左右双栏（编辑器 / 大预览）布局。
 * 与 [ComponentStudio.vue] `@media (min-width: 900px)` 字面对齐——双栏时右侧已有
 * 大预览，Source/Custom 面板内的 IsolatedPreview 冗余，按本断点条件挂载。
 */
export const STUDIO_SPLIT_MEDIA_QUERY = '(min-width: 900px)'
