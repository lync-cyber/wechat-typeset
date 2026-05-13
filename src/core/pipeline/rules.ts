/**
 * 微信公众号平台约束 · 单一事实来源
 *
 * 公众号粘贴管线对 CSS / HTML / SVG 的剥离与转换规则并非来自官方文档，
 * 而是多年实测沉淀的经验集合。本项目把所有规则收敛到这个模块：
 *
 *   - themeCSS.ts        读 FORBIDDEN_CSS_PROPS / DISPLAY_VALUES / VALUE_PATTERNS
 *                        （主题作者层守卫：写了即 throw）
 *   - wxPatch/*          读 FORBIDDEN_POSITION_PROPS / HARD_REMOVE_TAGS /
 *                        IFRAME_SRC_ALLOW / NEAR_WHITE（DOM 后处理层）
 *   - variant-sanity 测  读 FORBIDDEN_CSS_PATTERNS（回归层：扫描最终 HTML）
 *
 * 新增一条规则 = 改这里一次，跑 `npm test` 看谁接住。
 */

// --------------------------------------------------------------------------
// 主题 CSS 层（themeCSS.ts）
// --------------------------------------------------------------------------

/**
 * 公众号会完全剥离或让失效的 CSS 属性名。主题作者触碰 → ThemeAuthoringError。
 * `fontFamily` / `font-family` 都列：主题对象键名可能是驼峰或连字。
 */
export const FORBIDDEN_CSS_PROPS: readonly string[] = [
  'font-family',
  'fontfamily',
  'position',
  'float',
]

/**
 * display 的取值黑名单：flex / grid 在公众号被剥成空值，子项孤样式必塌。
 * 改用 block / inline-block / table 系列。
 */
export const FORBIDDEN_DISPLAY_VALUES: ReadonlySet<string> = new Set([
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
])

/**
 * CSS 值里不允许出现的文本模式（主题 CSS 层 + 最终 HTML 扫描层共用）。
 */
export const FORBIDDEN_VALUE_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/-webkit-/i, '-webkit- 前缀在公众号会被剥离'],
  [/@media/i, '@media 查询会被公众号剥离'],
  [/@keyframes/i, '@keyframes 动画不被公众号支持'],
  [/:hover/i, ':hover 伪类粘贴后无效'],
  [/:active/i, ':active 伪类粘贴后无效'],
]

/**
 * variant-sanity 扫描最终 HTML 用的"字节级禁区"。与上面重叠但包含 position / float，
 * 因为这两个在主题层是属性名黑名单，在最终 HTML 层需要额外看"是否漏网"。
 * -webkit-print-color-adjust 是 juice 注入的合法例外，不算禁区。
 */
export const FORBIDDEN_CSS_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/position\s*:/i, 'position:* 在微信粘贴后被剥离'],
  [/float\s*:/i, 'float:* 会被微信剥离'],
  [/@media\b/i, '@media 查询不被微信支持'],
  [/@keyframes\b/i, '@keyframes 动画不被微信支持'],
  [/:hover\b/i, ':hover 伪类在微信无效'],
  [/:active\b/i, ':active 伪类在微信无效'],
  [/-webkit-(?!print-color-adjust)/i, '-webkit- 前缀会被剥离（print-color-adjust 为 juice 注入例外）'],
]

// --------------------------------------------------------------------------
// DOM 后处理层（wxPatch/*）
// --------------------------------------------------------------------------

/**
 * DOM inline style 里需要主动剥离的定位相关属性。
 * 公众号编辑器粘贴后会直接吞掉，保留只会让预览与产物偏差。
 */
export const FORBIDDEN_POSITION_PROPS: ReadonlySet<string> = new Set([
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
])

/**
 * 必须整棵剥离（含内容）的标签。
 * juice 内联后 <style> 理论上应为空；仍兜底扫一遍。
 */
export const HARD_REMOVE_TAGS: ReadonlySet<string> = new Set([
  'style',
  'script',
  'noscript',
  'link',
  'meta',
])

/**
 * 允许保留的 iframe src 白名单。
 * v.qq.com 是 mpvideo 容器 (qqvid 模式) 的官方播放源。
 */
export const IFRAME_SRC_ALLOW: readonly RegExp[] = [
  /^https?:\/\/v\.qq\.com\//i,
]

/**
 * 纯白替代色。
 * 公众号的 SVG→PNG 光栅化管线会把纯白像素转成 alpha=0（整块变透明）。
 * 所有主题 SVG 里需要"白色填充"的地方一律用这个偏色。
 */
export const NEAR_WHITE = '#fefefe'
