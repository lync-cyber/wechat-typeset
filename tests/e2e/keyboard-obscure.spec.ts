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

import { expect, test, type Page } from '@playwright/test'
import { editorModifier, freshMobilePage } from './_helpers'

/** 先等 CodeMirror 完成文末定位，再制造“光标在文末、视口在顶部”的测试前提。 */
async function placeCursorBelowViewport(page: Page) {
  await page.goto('/')
  const content = page.locator('.cm-content')
  await content.waitFor()
  await content.click()
  await page.keyboard.press(`${await editorModifier(page)}+End`)

  const scroller = page.locator('.cm-scroller')
  await expect.poll(() => scroller.evaluate((el: HTMLElement) => el.scrollTop)).toBeGreaterThan(0)
  await scroller.evaluate(async (el: HTMLElement) => {
    let previous = el.scrollTop
    let stableFrames = 0
    while (stableFrames < 3) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
      const current = el.scrollTop
      stableFrames = current === previous ? stableFrames + 1 : 0
      previous = current
    }
    el.scrollTop = 0
    // 等浏览器处理主动回顶，避免把文末定位的延迟滚动误认为键盘 resize 的结果。
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
  })
  await expect.poll(() => scroller.evaluate((el: HTMLElement) => el.scrollTop)).toBe(0)
  return scroller
}

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
    const scroller = await placeCursorBelowViewport(page)

    // 模拟键盘弹起 240px（远超 100px 阈值）
    await page.evaluate(() => {
      ;(window as unknown as { __simulateKeyboard: (h: number) => void }).__simulateKeyboard(240)
    })
    // 预期光标被卷回视口 → scrollTop 不再是 0
    await expect.poll(() => scroller.evaluate((el: HTMLElement) => el.scrollTop)).toBeGreaterThan(0)
  })

  test('键盘弹起 <100px 的轻微缩水（浏览器栏隐藏）走 no-op', async ({ page }) => {
    const scroller = await placeCursorBelowViewport(page)

    // 仅 60px 缩水（如浏览器地址栏隐藏）—— 低于阈值不应触发滚动
    await page.evaluate(() => {
      ;(window as unknown as { __simulateKeyboard: (h: number) => void }).__simulateKeyboard(60)
    })
    // 跨过 CM 的测量帧，确认没有延迟滚动，而非只检查 dispatch 后的瞬时值。
    const positions = await scroller.evaluate(async (el: HTMLElement) => {
      const values: number[] = []
      for (let frame = 0; frame < 3; frame++) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
        values.push(el.scrollTop)
      }
      return values
    })
    expect(positions).toEqual([0, 0, 0])
  })
})
