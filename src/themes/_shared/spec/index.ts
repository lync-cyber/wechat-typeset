/**
 * PersonaSpec 子模块入口。
 *
 * 导出：
 *   - types：PersonaSpec、MotifSpec、MotifPrimitive、StatusKey 等
 *   - specToTheme：spec → Theme（运行时）
 *   - themeToSpec：Theme → spec（一次性迁移工具，Phase 2 用完即可删）
 *   - primitivesToSvg / renderMotifTemplate / shapeToSvg：motif 渲染
 *   - validateSpec：硬约束校验
 *   - PERSONA_SPEC_SCHEMA / getPersonaSpecSchema：JSON Schema
 */

export * from './types'
export type { SvgWrapperAttrs } from './render-motif'
export { motifsToAssets, specToTheme } from './spec-to-theme'
export { themeToSpec } from './theme-to-spec'
export { primitivesToSvg, renderMotifTemplate, renderPrimitive, shapeToSvg } from './render-motif'
export { validateSpec } from './validate'
export { PERSONA_SPEC_SCHEMA, getPersonaSpecSchema } from './schema'
export type { JSONSchema7 } from './schema'
