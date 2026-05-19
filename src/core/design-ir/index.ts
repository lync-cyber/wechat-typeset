/**
 * design-ir 模块对外入口。**纯**：无 jsdom / 无 fs / 无外部 IO，可被 src/public 安全引用。
 *
 * 提取（jsdom）+ 生成（fs）逻辑住在 [tools/extract-design-ir.ts]。本模块只暴露：
 *   - 类型（DesignIR 等）
 *   - 字典（字面色→token 反查、设计稿主题→实现主题映射）
 *   - 纯函数（parseInlineStyle、styleToBox、几何 diff）
 */

export type {
  DesignIR,
  DesignIRIndexEntry,
  DesignTheme,
  IRBox,
  IRColor,
  IRDecoration,
  IRSlot,
  IRSlotRole,
} from './types'
export {
  DESIGN_THEME_LABELS,
  DESIGN_THEME_TO_RECOMMENDED_THEME,
  suggestToken,
} from './literal-to-token'
export {
  buildTokenIndex,
  lookupToken,
  __clearTokenIndexCacheForTest,
  type LookupTokenResult,
  type TokenHit,
  type TokenIndex,
} from './build-token-index'
export { parseInlineStyle, styleToBox } from './parse-style'
export {
  compareGeometry,
  type GeometryDiff,
  type GeometryDiffSeverity,
} from './compare'
export {
  lintVariantCss,
  offsetToLine,
  type CssLintIssue,
  type CssLintOptions,
  type LintSeverity,
} from './lint-css'
