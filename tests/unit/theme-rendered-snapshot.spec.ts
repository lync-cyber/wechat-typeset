/**
 * 主题渲染产物快照（视觉契约层）
 *
 * 与已有 themeCSS-snapshot 的边界：
 *   - themeCSS-snapshot：锁住 generateThemeCSS(theme) 字节产物——"主题 CSS 没漂"
 *   - 本测试：锁住 render({md: BASE_FIXTURE_MD, theme}).html——"主题真的把那段 CSS 用上了"
 *
 * 为什么需要两道：CSS 写了不代表 sample 触发了对应选择器。本测试用同一份骨架
 * md（自 vocabulary 派生，base 命名空间全集）跑过 14 主题，捕获主题间的"渲染差异"
 * 与"主题改 spec 后产物变化"。
 *
 * 骨架不感知主题——任何主题特化都是 voice 表达失败信号。
 *
 * 补录快照：npx vitest run tests/unit/theme-rendered-snapshot.spec.ts -u
 */

import { describe, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { render } from '../../src/core/pipeline'
import { themeList } from '../../src/core/themes'
import { BASE_FIXTURE_MD } from '../helpers/baseFixture'

const SNAP_DIR = resolve(process.cwd(), 'tests/unit/__snapshots__/rendered')

describe('主题渲染快照（base 骨架）', () => {
  for (const theme of themeList) {
    it(`${theme.id}`, async () => {
      const { html } = render({ md: BASE_FIXTURE_MD, theme })
      await expect(html).toMatchFileSnapshot(resolve(SNAP_DIR, `${theme.id}.html`))
    })
  }
})
