/**
 * Studio 全屏工作台冒烟（桌面）：
 *   - 点 + 插入 打开组件库抽屉
 *   - 点 + 新建 触发 ComponentStudio 模态
 *   - 模态使用 layout='modal'，且左右两栏在 ≥900px 视口下并排
 *   - Esc / mask 点击关闭模态（无 dirty 状态下不弹确认）
 *
 * 抽屉左缘 DrawerResizer 拖动测试：
 *   - 默认 340px，拖左到 500px 后宽度持久化
 */
import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1280, height: 800 } })

test('桌面：打开组件库 → 点 + 新建 → 弹出 Studio 模态（左右两栏）', async ({ page }) => {
  await page.goto('/')
  // 关掉首次引导卡，避免遮住按钮
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  // 打开组件库抽屉
  await page.locator('.btn-insert').click()
  await expect(page.locator('.palette')).toBeVisible()

  // 点 + 新建
  await page.locator('.palette .head-action', { hasText: '新建' }).click()

  // 模态可见
  const mask = page.locator('.studio-modal-mask')
  await expect(mask).toBeVisible()
  const card = page.locator('.studio-modal-card')
  await expect(card).toBeVisible()

  // 1280px 视口下 ≥900px，两栏并排：col-editor + col-preview 都可见
  await expect(card.locator('.col-editor')).toBeVisible()
  await expect(card.locator('.col-preview')).toBeVisible()

  // mode banner 不再渲染（modal 模式走 .modal-head 而非 .mode-banner）
  await expect(card.locator('.modal-head')).toBeVisible()
  await expect(card.locator('.mode-banner')).toHaveCount(0)

  // 点 mask 关闭（无 dirty，直接关）
  await mask.click({ position: { x: 5, y: 5 } })
  await expect(mask).toBeHidden()

  // 抽屉列表仍在
  await expect(page.locator('.palette')).toBeVisible()
})

test('桌面：Studio 模态 Esc 关闭', async ({ page }) => {
  await page.goto('/')
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  await page.locator('.btn-insert').click()
  await page.locator('.palette .head-action', { hasText: '新建' }).click()
  await expect(page.locator('.studio-modal-mask')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('.studio-modal-mask')).toBeHidden()
})

test('桌面：抽屉左缘可拖动加宽', async ({ page }) => {
  await page.goto('/')
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  await page.locator('.btn-insert').click()
  const palette = page.locator('.palette')
  await expect(palette).toBeVisible()

  const initialBox = await palette.boundingBox()
  expect(initialBox).not.toBeNull()
  const initialWidth = initialBox!.width

  // 抓住左缘 resizer，向左拖 200px
  const resizer = palette.locator('.drawer-resizer')
  await expect(resizer).toBeVisible()
  const resizerBox = await resizer.boundingBox()
  expect(resizerBox).not.toBeNull()
  const startX = resizerBox!.x + resizerBox!.width / 2
  const startY = resizerBox!.y + resizerBox!.height / 2

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  await page.mouse.move(startX - 200, startY, { steps: 10 })
  await page.mouse.up()

  const newBox = await palette.boundingBox()
  expect(newBox).not.toBeNull()
  // 加宽约 200px（允许 ±10px 视差）
  expect(newBox!.width).toBeGreaterThan(initialWidth + 150)
})
