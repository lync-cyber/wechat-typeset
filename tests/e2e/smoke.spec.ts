/** 移动工作台：文章库、创作流程、复制入口及写作视图切换。 */
import { expect, test } from '@playwright/test'
import { freshMobilePage, showWritingPreview } from './_helpers'

test.beforeEach(async ({ page }) => { await freshMobilePage(page) })

test('页面可加载，文章库内品牌名可见', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '打开文章库', exact: true }).click()
  await expect(page.locator('.sidebar-brand strong')).toHaveText('wechat-typeset')
  await expect(page.getByRole('button', { name: '新建浏览器草稿', exact: true })).toBeVisible()
})

test('移动端：底部写作视图及顶部复制入口可见', async ({ page }) => {
  await page.goto('/')
  const tabs = page.getByRole('navigation', { name: '写作视图' })
  await expect(tabs).toBeVisible()
  await expect(tabs.getByRole('button', { name: '编辑', exact: true })).toBeVisible()
  await expect(tabs.getByRole('button', { name: '预览', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '复制到公众号', exact: true })).toBeVisible()
})

test('移动端：工具栏提供文章库与三个创作阶段', async ({ page }) => {
  await page.goto('/')
  const toolbar = page.locator('.toolbar')
  await expect(toolbar).toBeVisible()
  await expect(toolbar.getByRole('button', { name: '打开文章库', exact: true })).toBeVisible()
  const stages = toolbar.getByRole('navigation', { name: '创作流程' })
  for (const name of ['写作', '排版', '发布准备']) {
    await expect(stages.getByRole('button', { name, exact: true })).toBeVisible()
  }
  await expect(stages.getByRole('button', { name: '写作', exact: true })).toHaveAttribute('aria-current', 'page')
})

test('移动端：点底部编辑/预览切换面板', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.pane-editor')).toBeVisible()
  await showWritingPreview(page)
  await expect(page.locator('.pane-editor')).toBeHidden()
  await page.getByRole('navigation', { name: '写作视图' }).getByRole('button', { name: '编辑', exact: true }).click()
  await expect(page.locator('.pane-editor')).toBeVisible()
  await expect(page.locator('.pane-preview')).toBeHidden()
})
