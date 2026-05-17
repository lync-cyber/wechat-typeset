/**
 * P1 UI 优化冒烟（桌面）：
 *   1. 组件库 5 个一级 group + "我的"组内二级 sub-tab 切换
 *   2. "我的→我的组件"空态显示 + 新建 CTA
 *   3. 工具栏 zone-right 已收纳：发文清单 / 帮助按钮不再出现
 *   4. HelpPanel 底部"重新打开新手引导"按钮工作
 *   5. saving-error banner 不再以 pill 形态出现在 zone-right
 */
import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 1280, height: 800 } })

test('桌面：工具栏右区已收纳——发文清单 / 帮助按钮不在工具栏', async ({ page }) => {
  await page.goto('/')
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  // 这两个 class 之前直接挂在 toolbar，本次已迁入 ⋯ 溢出菜单
  await expect(page.locator('.toolbar .btn-checklist')).toHaveCount(0)
  await expect(page.locator('.toolbar .btn-help')).toHaveCount(0)

  // ⋯ 溢出菜单内能找到帮助与发文清单
  await page.locator('.toolbar .btn-overflow').click()
  await expect(page.locator('.popover-menu .menu-item', { hasText: '快捷键与帮助' })).toBeVisible()
  await expect(page.locator('.popover-menu .menu-item', { hasText: '发文清单' })).toBeVisible()
})

test('桌面：组件库 5 个一级 group + "我的"组二级 sub-tab', async ({ page }) => {
  await page.goto('/')
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  await page.locator('.btn-insert').click()
  const palette = page.locator('.palette')
  await expect(palette).toBeVisible()

  // 一级 5 个 tab（不多不少）
  const groupTabs = palette.locator('.tabs-group .tab')
  await expect(groupTabs).toHaveCount(5)
  await expect(groupTabs.nth(0)).toHaveText(/主题模板/)
  await expect(groupTabs.nth(1)).toHaveText(/提示与引用/)
  await expect(groupTabs.nth(2)).toHaveText(/结构/)
  await expect(groupTabs.nth(3)).toHaveText(/互动/)
  await expect(groupTabs.nth(4)).toHaveText(/我的/)

  // 默认 "主题模板" group：sub 只有 1 个 → 不渲染 sub-tab 行
  await expect(palette.locator('.tabs-sub')).toHaveCount(0)

  // 切到"提示与引用"：sub-tab 出现 3 个（提示 / 补注 / 引用）
  await groupTabs.nth(1).click()
  const subTabs = palette.locator('.tabs-sub .sub-tab')
  await expect(subTabs).toHaveCount(3)
  await expect(subTabs.nth(0)).toContainText('提示')
  await expect(subTabs.nth(1)).toContainText('补注')
  await expect(subTabs.nth(2)).toContainText('引用')
})

test('桌面："我的→我的组件"空态显示 + CTA 触发新建', async ({ page }) => {
  await page.goto('/')
  const dismiss = page.locator('.onboard .close')
  if (await dismiss.isVisible().catch(() => false)) await dismiss.click()

  await page.locator('.btn-insert').click()
  const palette = page.locator('.palette')

  // 进入"我的"group：默认 sub = 'user'
  await palette.locator('.tabs-group .tab', { hasText: '我的' }).click()
  await expect(palette.locator('.tabs-sub .sub-tab', { hasText: '我的组件' })).toBeVisible()

  // 空态：title + hint + CTA
  await expect(palette.locator('.empty-title')).toContainText('还没有自创组件')
  const cta = palette.locator('.empty-cta')
  await expect(cta).toBeVisible()

  // 点 CTA 触发 studio 模态
  await cta.click()
  await expect(page.locator('.studio-modal-mask')).toBeVisible()
})

test('桌面：HelpPanel 底部"重新打开新手引导"按钮恢复 onboarding', async ({ page }) => {
  await page.goto('/')
  // 先 dismiss 原引导卡
  const onboardClose = page.locator('.onboard .close')
  if (await onboardClose.isVisible().catch(() => false)) await onboardClose.click()
  await expect(page.locator('.onboard')).toHaveCount(0)

  // 通过 ⋯ → 快捷键与帮助 打开
  await page.locator('.toolbar .btn-overflow').click()
  await page.locator('.popover-menu .menu-item', { hasText: '快捷键与帮助' }).click()
  await expect(page.locator('.panel-shell-card')).toBeVisible()

  // 点底部"重新打开新手引导"
  await page.locator('.help-foot-btn', { hasText: '重新打开新手引导' }).click()

  // 帮助面板关闭 + 引导卡重新出现
  await expect(page.locator('.panel-shell-card')).toHaveCount(0)
  await expect(page.locator('.onboard')).toBeVisible()
})
