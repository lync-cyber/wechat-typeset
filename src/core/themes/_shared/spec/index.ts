/**
 * PersonaSpec 子模块入口。
 *
 * 导出：
 *   - types：PersonaSpec、MotifSpec、MotifPrimitive、StatusKey 等
 *   - specToTheme：spec → Theme（运行时）
 *   - themeToSpec：Theme → spec（迁移工具，仅离线脚本使用）
 *   - primitivesToSvg / renderMotifTemplate / shapeToSvg：motif 渲染
 *   - validateSpec：硬约束校验
 *   - PERSONA_SPEC_SCHEMA / getPersonaSpecSchema：JSON Schema
 */

export * from './types'
export type { SvgWrapperAttrs } from './render-motif'
export { motifsToAssets, specToTheme, toThemeTokens } from './spec-to-theme'
export { themeToSpec } from './theme-to-spec'
export { primitivesToSvg, renderMotifTemplate, renderPrimitive, shapeToSvg } from './render-motif'
export { validateSpec } from './validate'
export {
  analyzeThemeVoice,
  getBaseContainerStyleKeys,
  BASE_ELEMENT_KEYS,
  DEFAULT_MIN_COVERAGE_RATE,
  LOW_VOICE_TEMPORARY_GRACE,
} from './voice'
export { wcagRatio, relativeLuminance, WCAG_AA_NORMAL, WCAG_AA_LARGE, WCAG_AAA_NORMAL } from './wcag'
export { analyzeContrast, A11Y_TEMPORARY_GRACE } from './a11y'
export {
  validateTypography,
  TYPOGRAPHY_TEMPORARY_GRACE,
  LINE_HEIGHT_MIN,
  LINE_HEIGHT_MAX,
  LETTER_SPACING_MAX,
} from './typography-rules'
export type { ThemeVoiceResult, ThemeVoiceCoverage, VoiceIssue } from './voice'
export { PERSONA_SPEC_SCHEMA, getPersonaSpecSchema } from './schema'
export type { JSONSchema7 } from './schema'
export { makeCoverPlaceholder } from './coverPlaceholder'
export type { CoverBuilderOptions } from './coverPlaceholder'
