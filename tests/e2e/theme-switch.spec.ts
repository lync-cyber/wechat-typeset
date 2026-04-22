/**
 * 移动端主题切换：工具栏打开主题 popover，点击另一张卡片，预览 iframe 主标题色变化。
 *
 * 验证链路：Toolbar → ThemePicker → baseThemeId ref → rendered.html → iframe srcdoc
 * 单测里 ThemePicker 的 CSS 在 jsdom 看不到；这里用真浏览器保底。
 */

import { expect, test } from '@playwright/test'
import { freshMobilePage } from './_helpers'

test.beforeEach(async ({ page }) => {
  await freshMobilePage(page)
})

test('移动端：点击主题卡切换会改变预览 h1 颜色', async ({ page }) => {
  await page.goto('/')
  // 先把 mobile tab 切到预览侧，才能看到 iframe
  await page.locator('.mobile-tab', { hasText: '预览' }).click()

  // iframe 就绪，初始主题下抓取 h1 颜色作为基线
  const iframe = page.frameLocator('iframe.preview-frame')
  await iframe.locator('h1, h2').first().waitFor()
  const colorBefore = await iframe.locator('h1, h2').first().evaluate(
    (el: HTMLElement) => getComputedStyle(el).color,
  )

  // 打开主题 popover
  await page.locator('.btn-theme').click()
  const picker = page.locator('.popover-theme')
  await expect(picker).toBeVisible()

  // 选一张不是 active 的卡（选第二张稳妥）
  const cards = picker.locator('.theme-card')
  await expect(cards.first()).toBeVisible()
  const cardCount = await cards.count()
  expect(cardCount).toBeGreaterThanOrEqual(2)

  // 找到首张未激活的卡点击
  let clickedIdx = -1
  for (let i = 0; i < cardCount; i++) {
    const active = await cards.nth(i).evaluate((el) => el.classList.contains('active'))
    if (!active) {
      await cards.nth(i).click()
      clickedIdx = i
      break
    }
  }
  expect(clickedIdx).toBeGreaterThanOrEqual(0)

  // popover 点击后关闭，等 iframe srcdoc 重建
  await page.waitForTimeout(200)

  const colorAfter = await iframe.locator('h1, h2').first().evaluate(
    (el: HTMLElement) => getComputedStyle(el).color,
  )
  expect(colorAfter).not.toBe(colorBefore)
})
