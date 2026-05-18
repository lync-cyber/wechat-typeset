/**
 * PersonaSpec 子模块入口。
 *
 * 导出：
 *   - types：PersonaSpec、MotifSpec、MotifPrimitive、StatusKey 等
 *   - specToTheme：spec → Theme（运行时）
 *   - primitivesToSvg / renderMotifTemplate / shapeToSvg：motif 渲染
 *   - validateSpec：硬约束校验
 *   - PERSONA_SPEC_SCHEMA：JSON Schema
 *
 * 其它（常量阈值 / WCAG 数值 / themeToSpec 迁移工具 / 子分析器）需要时直接 from
 * `./voice` `./wcag` `./a11y` `./typography-rules` `./theme-to-spec` 子模块取——
 * 不再通过本 barrel 转发以保持窄表面。
 */

export * from './types'
export { specToTheme, toThemeTokens } from './spec-to-theme'
export { primitivesToSvg, renderMotifTemplate, shapeToSvg } from './render-motif'
export { validateSpec } from './validate'
export { analyzeThemeVoice } from './voice'
export type { ThemeVoiceResult, VoiceIssue } from './voice'
export { PERSONA_SPEC_SCHEMA } from './schema'
export type { JSONSchema7 } from './schema'
export { makeCoverPlaceholder } from './coverPlaceholder'
