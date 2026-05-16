/**
 * 三档样张统一入口
 *
 * 用户在 UI 上能切换三种"载入"档位：
 *   1. 故事样张（getSample）   — 单主题克制随笔，~150 行，5 秒判断主题气质
 *      src/samples-md/sample-{themeId}.md → scripts/build-samples → _generated.ts
 *   2. 组件参考（getReference） — 按 category 列举本主题启用容器 + 默认 example
 *      vocabulary + 主题 capabilities → scripts/build-references → _references.ts
 *   3. 全功能展示（getShowcase）— 所有 base + pack:* + theme:* 容器/变体一稿到底
 *      tests/fixtures/all-containers.md → scripts/build-showcase → _showcase.ts
 *
 * 三档共享同一份"主题切换不丢稿"的撤销 UX，但语义边界严格：
 *   - story 是写给"决策的"，reference 是写给"查阅的"，showcase 是写给"开发/高级用户全景看的"
 *   - 全功能展示的源头就是 e2e 测试 fixture——保证 UI 演示永远和测试覆盖等价
 */

import { SAMPLE_BY_THEME, SAMPLE_BUILD_ID } from './_generated'
import { REFERENCE_BY_THEME, REFERENCE_BUILD_ID } from './_references'
import { SHOWCASE_MARKDOWN, SHOWCASE_BUILD_ID } from './_showcase'

export {
  SAMPLE_BY_THEME, SAMPLE_BUILD_ID,
  REFERENCE_BY_THEME, REFERENCE_BUILD_ID,
  SHOWCASE_MARKDOWN, SHOWCASE_BUILD_ID,
}

/** 主题 id → story 样张；未知 id 回退到 default。 */
export function getSample(themeId: string): string {
  return SAMPLE_BY_THEME[themeId] ?? SAMPLE_BY_THEME.default ?? ''
}

/** 主题 id → 自动生成的组件参考文档；未知 id 回退到 default。 */
export function getReference(themeId: string): string {
  return REFERENCE_BY_THEME[themeId] ?? REFERENCE_BY_THEME.default ?? ''
}

/** 全功能展示稿：与主题无关——所有 14 主题共享同一份字符串，差异由 voice 渲染表达。 */
export function getShowcase(): string {
  return SHOWCASE_MARKDOWN
}

/**
 * 作为"通用起手示例"的字符串（旧 commonSample 的迁移别名）。
 * 新代码优先走 getSample('default') 或直接导入 SAMPLE_BY_THEME.default。
 */
export const commonSample: string = SAMPLE_BY_THEME.default ?? ''
