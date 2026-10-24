/** 移动端：排版阶段选择主题，真实预览样式随之更新。 */
import { expect, test } from '@playwright/test'
import { freshMobilePage, showWritingPreview } from './_helpers'

test.beforeEach(async ({ page }) => { await freshMobilePage(page) })

test('移动端：选择主题后预览 h1 颜色改变', async ({ page }) => {
  await page.goto('/')
  await showWritingPreview(page)
  const iframe = page.frameLocator('iframe.preview-frame')
  const heading = iframe.locator('h1, h2').first()
  await expect(heading).toBeVisible()
  const colorBefore = await heading.evaluate((el) => getComputedStyle(el).color)
  await page.getByRole('navigation', { name: '创作流程' }).getByRole('button', { name: '排版', exact: true }).click()
  const inspector = page.locator('.theme-inspector')
  await inspector.locator('summary').click()
  const cards = inspector.locator('.theme-card')
  await expect(cards).toHaveCount(18)
  const target = inspector.locator('.theme-card:not(.active)').first()
  const selectedName = await target.locator('.card-name').textContent()
  await target.click()
  await expect(inspector.locator('.current-theme strong')).toHaveText(selectedName!.trim())
  await page.getByRole('button', { name: '收起工具', exact: true }).click()
  await expect(inspector).toBeHidden()
  await expect.poll(async () => heading.evaluate((el) => getComputedStyle(el).color)).not.toBe(colorBefore)
})
