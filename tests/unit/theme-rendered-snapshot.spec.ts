/**
 * 主题快照双闸（CSS 字节 + 渲染产物）
 *
 * 两道闸守不同事故面：
 *   - themeCSS：generateThemeCSS(theme) 字节产物——"主题 CSS 没漂"
 *   - rendered：render({ md: BASE_FIXTURE_MD, theme }).html——"主题真的把那段 CSS 用上了"
 *
 * 为什么需要两道：CSS 写了不代表 sample 触发了对应选择器；只锁渲染产物则看不清
 * CSS 层的微调影响。两份快照分别写到 __snapshots__/themeCSS/{id}.css 与
 * __snapshots__/rendered/{id}.html，diff 视图可按 CSS / HTML 语法独立阅读。
 *
 * 合到同一 spec 文件：两者都遍历 themeList、都拉 src/core/themes，分文件意味着
 * collect 阶段重复 parse 同一批主题模块。
 *
 * 骨架不感知主题——任何主题特化都是 voice 表达失败信号。
 *
 * 补录快照：npx vitest run tests/unit/theme-rendered-snapshot.spec.ts -u
 */

import { describe, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { render } from '../../src/core/pipeline'
import { generateThemeCSS } from '../../src/core/pipeline/themeCSS'
import { themeList } from '../../src/core/themes'
import { BASE_FIXTURE_MD } from '../helpers/baseFixture'

const RENDERED_DIR = resolve(process.cwd(), 'tests/unit/__snapshots__/rendered')
const CSS_DIR = resolve(process.cwd(), 'tests/unit/__snapshots__/themeCSS')

describe('主题快照（CSS + 渲染）', () => {
  for (const theme of themeList) {
    it(`${theme.id}`, async () => {
      const css = generateThemeCSS(theme)
      await expect(css).toMatchFileSnapshot(resolve(CSS_DIR, `${theme.id}.css`))

      const { html } = render({ md: BASE_FIXTURE_MD, theme })
      await expect(html).toMatchFileSnapshot(resolve(RENDERED_DIR, `${theme.id}.html`))
    })
  }
})
