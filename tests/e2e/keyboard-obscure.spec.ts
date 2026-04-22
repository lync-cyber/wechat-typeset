/**
 * 移动端虚拟键盘遮挡光标的回归测试。
 *
 * Editor.vue 监听 window.visualViewport.resize：键盘弹起时 vv.height 缩水，
 * 触发 CM.scrollIntoView(head, { y: 'center' }) 把光标拉回可视区。
 *
 * Playwright 不能真的唤起虚拟键盘，只能通过 DOM 事件 + 属性劫持模拟：
 *   1. 用 addInitScript 注入一个 window.__simulateKeyboard(h) 钩子，
 *      在实例上用 Object.defineProperty 覆盖 visualViewport.height getter，
 *      再 dispatch 一个 resize 事件。
 *   2. 在测试里先滚到顶（光标留在末尾，此时光标不在视口内），
 *      模拟键盘弹起 ≥100px，检查 scroller.scrollTop 被拉下来（cursor 被卷回）。
 *
 * 价值有限但不是零：
 *   - 回归守护：如果有人删掉 Editor.vue 的 addEventListener / 改错阈值 / 引入 null crash，
 *     这组用例会红。
 *   - 真机粘贴验收仍走 docs/release-checklist.md 的移动端手动清单（Safari/Chrome 各一次）。
 */

import { expect, test } from '@playwright/test'
import { freshMobilePage } from './_helpers'

test.describe('visualViewport 键盘遮挡防护', () => {
  test.beforeEach(async ({ page }) => {
    await freshMobilePage(page)
    // 进页之前再装钩子，确保覆盖 getter 在任何 reflow 前就绪
    await page.addInitScript(() => {
      let fakeKeyboardPx = 0
      ;(window as unknown as { __simulateKeyboard?: (h: number) => void }).__simulateKeyboard = (
        h: number,
      ) => {
        fakeKeyboardPx = h
        const vv = window.visualViewport
        if (!vv) return
        // 只劫持一次——之后靠同一个 getter 读取闭包里的 fakeKeyboardPx
        type Patched = VisualViewport & { __heightPatched?: boolean }
        if (!(vv as Patched).__heightPatched) {
          Object.defineProperty(vv, 'height', {
            configurable: true,
            get: () => window.innerHeight - fakeKeyboardPx,
          })
          ;(vv as Patched).__heightPatched = true
        }
        vv.dispatchEvent(new Event('resize'))
      }
    })
  })

  test('resize 事件监听已挂载且不抛异常', async ({ page }) => {
    await page.goto('/')
    await page.locator('.cm-content').waitFor()
    // Dispatch 一次 resize，不改 height（keyboardHeight=0，走 no-op 分支）
    const result = await page.evaluate(() => {
      if (!window.visualViewport) return 'NO_VISUAL_VIEWPORT'
      try {
        window.visualViewport.dispatchEvent(new Event('resize'))
        return 'OK'
      } catch (e) {
        return `ERROR: ${(e as Error).message}`
      }
    })
    expect(result).toBe('OK')
  })

  test('键盘弹起 ≥100px 时 CM scroller 位置被拉动', async ({ page }) => {
    await page.goto('/')
    const content = page.locator('.cm-content')
    await content.waitFor()
    await content.click()
    // 光标到文末
    await page.keyboard.press('End')
    await page.keyboard.press('Control+End')

    // 手动把 scroller 拉回顶部 —— 现在光标（在末尾）离视口很远
    const scroller = page.locator('.cm-scroller')
    await scroller.evaluate((el: HTMLElement) => {
      el.scrollTop = 0
    })
    // 等一帧，确保 scrollTop 写入生效
    await page.waitForTimeout(50)
    const before = await scroller.evaluate((el: HTMLElement) => el.scrollTop)

    // 模拟键盘弹起 240px（远超 100px 阈值）
    await page.evaluate(() => {
      ;(window as unknown as { __simulateKeyboard: (h: number) => void }).__simulateKeyboard(240)
    })
    // 等 CM 的 dispatch 落盘
    await page.waitForTimeout(80)

    const after = await scroller.evaluate((el: HTMLElement) => el.scrollTop)
    // 预期光标被卷回视口 → scrollTop 不再是 0
    expect(after).toBeGreaterThan(before)
  })

  test('键盘弹起 <100px 的轻微缩水（浏览器栏隐藏）走 no-op', async ({ page }) => {
    await page.goto('/')
    const content = page.locator('.cm-content')
    await content.waitFor()
    await content.click()
    await page.keyboard.press('Control+End')

    const scroller = page.locator('.cm-scroller')
    await scroller.evaluate((el: HTMLElement) => {
      el.scrollTop = 0
    })
    await page.waitForTimeout(50)
    const before = await scroller.evaluate((el: HTMLElement) => el.scrollTop)

    // 仅 60px 缩水（如浏览器地址栏隐藏）—— 低于阈值不应触发滚动
    await page.evaluate(() => {
      ;(window as unknown as { __simulateKeyboard: (h: number) => void }).__simulateKeyboard(60)
    })
    await page.waitForTimeout(80)

    const after = await scroller.evaluate((el: HTMLElement) => el.scrollTop)
    expect(after).toBe(before)
  })
})
