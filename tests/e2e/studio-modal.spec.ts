/** Studio 模态双栏/关闭契约，以及当前工作台的分栏拖动。 */
import { expect, test } from '@playwright/test'
import { freshMobilePage, openComponents } from './_helpers'

test.beforeEach(async ({ page }) => { await freshMobilePage(page) })

test('桌面：组件库新建 Studio 双栏可见，点击遮罩关闭后保留组件库', async ({ page }) => {
  await page.goto('/')
  await openComponents(page)
  await page.locator('.palette').getByRole('button', { name: '+ 新建', exact: true }).click()
  const mask = page.getByRole('dialog', { name: '组件 Studio' })
  await expect(mask).toBeVisible()
  const card = page.locator('.studio-modal-card')
  await expect(card.locator('.col-editor')).toBeVisible()
  await expect(card.locator('.col-preview')).toBeVisible()
  const editorBox = await card.locator('.col-editor').boundingBox()
  const previewBox = await card.locator('.col-preview').boundingBox()
  expect(editorBox!.x + editorBox!.width).toBeLessThanOrEqual(previewBox!.x + 1)
  await expect(card.locator('.modal-head')).toBeVisible()
  await expect(card.locator('.mode-banner')).toHaveCount(0)
  await mask.click({ position: { x: 5, y: 5 } })
  await expect(mask).toBeHidden()
  await expect(page.locator('.palette')).toBeVisible()
})

test('桌面：Studio Esc 关闭且保留组件库', async ({ page }) => {
  await page.goto('/')
  await openComponents(page)
  await page.locator('.palette').getByRole('button', { name: '+ 新建', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '组件 Studio' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: '组件 Studio' })).toBeHidden()
  await expect(page.locator('.palette')).toBeVisible()
})

test('桌面：写作分栏可拖动，保留预览宽度并支持双击复位', async ({ page }) => {
  await page.goto('/')
  const editor = page.locator('.pane-editor')
  const preview = page.locator('.pane-preview')
  const splitter = page.getByRole('separator', { name: '拖动调整编辑栏宽度（双击恢复默认）' })
  await expect(splitter).toBeVisible()
  const initial = await editor.boundingBox()
  const handle = await splitter.boundingBox()
  const startX = handle!.x + handle!.width / 2
  const startY = handle!.y + handle!.height / 2
  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX - 120, startY, { steps: 10 })
  await page.mouse.up()
  await expect.poll(async () => (await editor.boundingBox())!.width).toBeLessThan(initial!.width - 80)
  const previewBox = await preview.boundingBox()
  expect(previewBox!.width).toBeGreaterThanOrEqual(375)
  await expect(page.locator('body')).not.toHaveClass(/splitter-dragging/)
  await splitter.dblclick()
  await expect.poll(async () => Math.abs((await editor.boundingBox())!.width - initial!.width)).toBeLessThan(2)
})
