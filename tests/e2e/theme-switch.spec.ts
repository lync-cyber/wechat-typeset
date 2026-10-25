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

test('切换和重复载入内置示例更新同一草稿的合理标题', async ({ page }) => {
  await page.goto('/')
  const draftId = await page.evaluate(() => localStorage.getItem('wechat-typeset:drafts:active'))
  for (const [theme, title] of [
    ['苏黎世栅格', '苏黎世主题演示稿'],
    ['数据简报', '数据简报主题演示稿'],
    ['苏黎世栅格', '苏黎世主题演示稿'],
  ]) {
    await page.getByRole('navigation', { name: '创作流程' }).getByRole('button', { name: '排版', exact: true }).click()
    const picker = page.locator('.theme-inspector')
    if (!await picker.locator('details').evaluate((el) => (el as HTMLDetailsElement).open)) {
      await picker.locator('summary').click()
    }
    await picker.getByRole('button', { name: `H2 标题 引文示意 tip 提示 ${theme}`, exact: true }).click()
    await expect(page.locator('.document-heading h1')).toHaveText(title)
  }
  await page.getByRole('button', { name: '更多操作', exact: true }).click()
  await page.getByRole('button', { name: '载入当前主题示例', exact: true }).click()
  await expect(page.locator('.document-heading h1')).toHaveText('苏黎世主题演示稿')
  expect(await page.evaluate(() => localStorage.getItem('wechat-typeset:drafts:active'))).toBe(draftId)
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('wechat-typeset:drafts:index') ?? '[]').length)).toBe(1)
})
