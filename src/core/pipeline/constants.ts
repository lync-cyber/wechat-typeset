/**
 * 渲染管线侧的命名常量。
 *
 * 单源原则：跨多个 TS 模块共享的 magic 字符串 / 数字归集于此。
 * CSS 侧的同名 token 在 src/ui/tokens.css 维护（如 `--preview-w`），
 * 二者没有耦合机制，改动需手动同步——本文件 docstring 提醒一次。
 */

/**
 * 渲染产物最外层 wrapper 的 className。
 *
 * - generateThemeCSS 用它作为所有规则的祖先选择器（确保主题样式只对 .markdown-body 子树生效，
 *   不污染外部页面 / iframe 父框）。
 * - render() 在 wrap HTML 时挂这个 class，让上面的 CSS 选择器命中。
 *
 * 改动会破坏所有快照测试（tests/unit/__snapshots__/themeCSS/*.css）。
 */
export const ROOT_CLASS = 'markdown-body'

/**
 * 微信预览基准宽度（px）。
 *
 * 与 src/ui/tokens.css 的 `--preview-w: 375px` 保持一致；导出 HTML 的 viewport meta
 * 用此值告知浏览器以该宽度初始化布局。
 */
export const WECHAT_PREVIEW_WIDTH = 375
