import { expect, test, type Page } from '@playwright/test'
import { freshMobilePage } from './_helpers'

async function expectWorkAreaFilled(page: Page, selector: string) {
  await expect.poll(async () => {
    const area = await page.locator('.work-area').boundingBox()
    const pane = await page.locator(selector).boundingBox()
    if (!area || !pane) return Infinity
    return Math.abs(area.x + area.width - pane.x - pane.width)
  }).toBeLessThan(2)
}

test.beforeEach(async ({ page }) => {
  await freshMobilePage(page)
  await page.addInitScript(() => {
    if (window.top === window) localStorage.setItem('wechat-typeset:editor-width', '412')
  })
})

for (const width of [1280, 1440, 1920]) {
  test(`保存分栏宽度后填满工作区：${width}px`, async ({ page, isMobile }) => {
    test.skip(isMobile, '桌面分栏')
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const splitter = page.getByRole('separator')
    await expect(splitter).toHaveAttribute('aria-valuenow', '412')
    await expectWorkAreaFilled(page, '.pane-preview')

    await splitter.press('ArrowLeft')
    await expect(splitter).toHaveAttribute('aria-valuenow', '388')
    await expectWorkAreaFilled(page, '.pane-preview')
    await page.setViewportSize({ width: width + 200, height: 900 })
    await expectWorkAreaFilled(page, '.pane-preview')

    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await page.getByRole('button', { name: '关闭草稿列表', exact: true }).click()
    await expect(page.locator('.library-sidebar')).toBeHidden()
    await expectWorkAreaFilled(page, '.pane-preview')

    await page.getByRole('button', { name: '专注写作', exact: true }).click()
    await expectWorkAreaFilled(page, '.pane-editor')
    await page.getByRole('button', { name: '显示预览', exact: true }).click()
    await expectWorkAreaFilled(page, '.pane-preview')

    await page.setViewportSize({ width: 1200, height: 900 })
    await page.getByRole('button', { name: '更多操作', exact: true }).click()
    await page.getByRole('button', { name: '插入组件', exact: true }).click()
    await expect(page.locator('.context-inspector')).toBeVisible()
    await expect(page.locator('.pane-preview')).toBeHidden()
    await expectWorkAreaFilled(page, '.pane-editor')
    await page.getByRole('button', { name: '收起工具', exact: true }).click()
    await expectWorkAreaFilled(page, '.pane-preview')

    await page.getByRole('separator').press('Enter')
    await expect(page.locator('.pane-editor')).not.toHaveClass(/fixed-width/)
    await expectWorkAreaFilled(page, '.pane-preview')
  })
}

test('移动端忽略保存的分栏宽度，编辑与预览各占满工作区', async ({ page, isMobile }) => {
  test.skip(!isMobile, '移动端单栏')
  await page.goto('/')
  await expectWorkAreaFilled(page, '.pane-editor')
  await page.getByRole('navigation', { name: '写作视图' }).getByRole('button', { name: '预览', exact: true }).click()
  await expect(page.locator('.pane-editor')).toBeHidden()
  await expectWorkAreaFilled(page, '.pane-preview')
})
