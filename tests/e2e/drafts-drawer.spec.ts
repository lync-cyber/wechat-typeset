/** 移动文章库：新建/选择浏览器草稿，以及覆盖层关闭与滚动锁。 */
import { expect, test } from '@playwright/test'
import { freshMobilePage, setEditorContent } from './_helpers'

test.beforeEach(async ({ page }) => { await freshMobilePage(page) })

test('移动端：文章库 → 新建浏览器草稿 → 列表新增', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '打开文章库', exact: true }).click()
  const drawer = page.locator('aside.drawer')
  await expect(drawer).toBeVisible()
  const beforeCount = await drawer.locator('li.browser-item').count()
  await drawer.getByRole('button', { name: '新建浏览器草稿', exact: true }).click()
  await expect(drawer.locator('li.browser-item')).toHaveCount(beforeCount + 1)
  await expect(page.locator('.document-bar h1')).toHaveText('新草稿')
  await drawer.getByRole('button', { name: '关闭文章库', exact: true }).click()
  await expect(drawer).toBeHidden()
  await expect(page.locator('.cm-content')).toContainText('新草稿')
})

test('移动端：文章库打开锁定背景滚动，关闭后解除', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).not.toHaveClass(/drawer-scroll-lock/)
  await page.getByRole('button', { name: '打开文章库', exact: true }).click()
  await expect(page.locator('aside.drawer')).toBeVisible()
  await expect(page.locator('body')).toHaveClass(/drawer-scroll-lock/)
  await page.getByRole('button', { name: '关闭文章库', exact: true }).click()
  await expect(page.locator('aside.drawer')).toBeHidden()
  await expect(page.locator('body')).not.toHaveClass(/drawer-scroll-lock/)
})

test('移动端：新建后可切回原草稿，正文与当前标题同步', async ({ page }) => {
  await page.goto('/')
  const titleBefore = '返回测试的原草稿'
  await setEditorContent(page, `# ${titleBefore}\n\n切回时应恢复的原稿正文。`)
  await page.keyboard.press('ControlOrMeta+S')
  await expect(page.locator('.document-bar h1')).toHaveText(titleBefore)
  await page.getByRole('button', { name: '打开文章库', exact: true }).click()
  const drawer = page.locator('aside.drawer')
  const original = drawer.locator('.draft-select').filter({ hasText: titleBefore })
  await expect(original).toHaveCount(1)
  await drawer.getByRole('button', { name: '新建浏览器草稿', exact: true }).click()
  await expect(page.locator('.document-bar h1')).toHaveText('新草稿')
  await original.click()
  await expect(original).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('.document-bar h1')).toHaveText(titleBefore)
  await drawer.getByRole('button', { name: '关闭文章库', exact: true }).click()
  await expect(page.locator('.cm-content')).toContainText('切回时应恢复的原稿正文。')
})
