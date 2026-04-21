/**
 * 每套主题的演示 Markdown
 *
 * **权威单一来源：`docs/samples/sample-{themeId}.md`**
 *   - 人编辑 markdown 文件
 *   - `scripts/build-samples.ts` 把它们打包成 `generated.ts`（派生产物，git 纳入）
 *   - 本 index 只做"主题 id → markdown 字符串"的查表 + 兜底
 *
 * 历史：原先 `src/samples/{theme}.ts` 与 `docs/samples/sample-{theme}.md` 双写，
 * 两边内容漂移、容器变更必须双改。现在统一到 docs/samples，双向打通。
 *
 * 新增主题 sample：在 docs/samples/ 新建 sample-<themeId>.md，跑
 * `npm run build:samples` 即可。
 */

import { SAMPLE_BY_THEME, FULL_SAMPLE } from './generated'

export { SAMPLE_BY_THEME, FULL_SAMPLE }

/** 主题 id → sample markdown；未知 id 回退到 default。 */
export function getSample(themeId: string): string {
  return SAMPLE_BY_THEME[themeId] ?? SAMPLE_BY_THEME.default ?? FULL_SAMPLE
}

/**
 * 作为"通用起手示例"的字符串（旧 commonSample 的迁移别名）。
 * 新代码优先走 getSample('default') 或直接导入 SAMPLE_BY_THEME.default。
 */
export const commonSample: string = SAMPLE_BY_THEME.default ?? FULL_SAMPLE
