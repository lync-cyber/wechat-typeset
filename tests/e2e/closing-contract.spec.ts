/**
 * P2 关闭契约统一冒烟：
 *   - 抽屉打开后 Esc 关闭（DraftDrawer / ComponentPalette / PublishChecklist）
 *   - 重命名 input 内的 Esc 仅取消重命名，不连带关掉抽屉（stop propagation 起效）
 *
 * P2 chip 标签编辑器冒烟：
 *   - 点 # 按钮展开 chip 编辑器
 *   - 输入 + Enter 添加 chip；× 删除 chip；✓ 提交
 */
import { expect, test, type Page } from '@playwright/test'

test.use({ viewport: { width: 1280, height: 800 } })

async function dismissOnboard(page: Page) {
  const close = page.locator('.onboard .close')
  if (await close.isVisible().catch(() => false)) await close.click()
}

test('桌面：Esc 关闭 DraftDrawer（左抽屉）', async ({ page }) => {
  await page.goto('/')
  await dismissOnboard(page)

  // 用 ⌘⇧D 打开草稿抽屉
  const isMac = await page.evaluate(() => /Mac|iPhone|iPad|iPod/.test(navigator.platform))
  await page.keyboard.press(`${isMac ? 'Meta' : 'Control'}+Shift+KeyD`)
  await expect(page.locator('.drawer')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('.drawer')).toHaveCount(0)
})

test('桌面：Esc 关闭 ComponentPalette（右抽屉）', async ({ page }) => {
  await page.goto('/')
  await dismissOnboard(page)

  await page.locator('.btn-insert').click()
  await expect(page.locator('.palette')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('.palette')).toHaveCount(0)
})

test('桌面：DraftDrawer 重命名 input 里按 Esc 仅取消重命名，抽屉保持打开', async ({ page }) => {
  await page.goto('/')
  await dismissOnboard(page)

  const isMac = await page.evaluate(() => /Mac|iPhone|iPad|iPod/.test(navigator.platform))
  await page.keyboard.press(`${isMac ? 'Meta' : 'Control'}+Shift+KeyD`)
  await expect(page.locator('.drawer')).toBeVisible()

  // 让至少有一篇草稿可重命名（启动注入的默认草稿一般有一篇）
  const firstItem = page.locator('.drawer .item').first()
  await expect(firstItem).toBeVisible()
  await firstItem.locator('.title').dblclick()
  const renameInput = page.locator('.drawer .rename-input')
  await expect(renameInput).toBeVisible()

  // Esc 应只关 rename input
  await renameInput.press('Escape')
  await expect(renameInput).toHaveCount(0)
  await expect(page.locator('.drawer')).toBeVisible()
})

test('桌面：DraftDrawer chip 标签编辑器 — 添加 / 删除 / 提交', async ({ page }) => {
  await page.goto('/')
  await dismissOnboard(page)

  const isMac = await page.evaluate(() => /Mac|iPhone|iPad|iPod/.test(navigator.platform))
  await page.keyboard.press(`${isMac ? 'Meta' : 'Control'}+Shift+KeyD`)
  await expect(page.locator('.drawer')).toBeVisible()

  const firstItem = page.locator('.drawer .item').first()
  // hover 让 .item-actions 显形（@media hover:hover）
  await firstItem.hover()
  const tagBtn = firstItem.locator('.icon-btn', { hasText: '#' }).first()
  await tagBtn.click()

  const editor = firstItem.locator('.tag-editor')
  await expect(editor).toBeVisible()

  // 添加两条 chip
  const input = editor.locator('.tag-input')
  await input.fill('技术')
  await input.press('Enter')
  await expect(editor.locator('.tag-chip-edit', { hasText: '技术' })).toBeVisible()

  // 逗号也触发 push
  await input.fill('随笔')
  await input.press(',')
  await expect(editor.locator('.tag-chip-edit', { hasText: '随笔' })).toBeVisible()

  // 删一个
  await editor.locator('.tag-chip-edit', { hasText: '技术' })
    .locator('.tag-chip-remove').click()
  await expect(editor.locator('.tag-chip-edit', { hasText: '技术' })).toHaveCount(0)

  // ✓ 提交 → 编辑器收起，只读 chip 列表显示剩下的 '随笔'
  await editor.locator('.tag-editor-done').click()
  await expect(editor).toHaveCount(0)
  await expect(firstItem.locator('.tags .tag-chip', { hasText: '随笔' })).toBeVisible()
})
