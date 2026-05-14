/**
 * 移动端草稿抽屉：打开 → 新建 → 列表里出现新条目 → 关闭。
 *
 * 注：移动端 `@media (max-width: 767px)` 下抽屉 fixed 占满视口（toolbar 与 tab 栏之间），
 * `.mobile-drawer-mask` 在抽屉背后、同区域 —— 用户实际上无法点到它关闭。
 * 这对用户 OK（关闭按钮在 header 里很明显），对 E2E 意味着不测"点遮罩关"。
 */

import { expect, test } from '@playwright/test'
import { freshMobilePage } from './_helpers'

test.beforeEach(async ({ page }) => {
  await freshMobilePage(page)
})

/**
 * IA4 后：点 .draft-switch 先开 popover（最近 5 篇 + 新建 + 全部）。
 * "全部草稿与搜索"才打开完整 DraftDrawer。
 * 下面两个测试对齐这条新路径。
 */
test('移动端：popover → 全部草稿入口 → 抽屉 → 新建草稿 → 列表新增', async ({ page }) => {
  await page.goto('/')

  // 第一次点击：开 draft popover（不再直接开 drawer）
  await page.locator('.draft-switch').click()
  const popover = page.locator('.popover-draft')
  await expect(popover).toBeVisible()

  // 走"全部草稿与搜索"入口进 drawer
  await popover.locator('.draft-pop-action', { hasText: '全部草稿' }).click()
  const drawer = page.locator('aside.drawer')
  await expect(drawer).toBeVisible()

  const beforeCount = await drawer.locator('li.item').count()

  await drawer.locator('.btn.btn-primary', { hasText: '新建' }).first().click()

  await expect.poll(async () => drawer.locator('li.item').count()).toBe(beforeCount + 1)

  await drawer.locator('.btn-text', { hasText: '关闭' }).click()
  await expect(drawer).toBeHidden()
})

test('移动端：抽屉打开时 body 挂 drawer-scroll-lock 类（背景不滚）', async ({ page }) => {
  await page.goto('/')

  const bodyBefore = await page.evaluate(() =>
    document.body.classList.contains('drawer-scroll-lock'),
  )
  expect(bodyBefore).toBe(false)

  // popover → 全部草稿入口（新路径，与 IA4 设计一致）
  await page.locator('.draft-switch').click()
  await page.locator('.popover-draft .draft-pop-action', { hasText: '全部草稿' }).click()
  await expect(page.locator('aside.drawer')).toBeVisible()

  await expect
    .poll(async () => page.evaluate(() => document.body.classList.contains('drawer-scroll-lock')))
    .toBe(true)

  await page.locator('aside.drawer .btn-text', { hasText: '关闭' }).click()
  await expect(page.locator('aside.drawer')).toBeHidden()

  await expect
    .poll(async () => page.evaluate(() => document.body.classList.contains('drawer-scroll-lock')))
    .toBe(false)
})

/**
 * IA4 直接路径：popover 内"新建草稿"绕过 drawer，1 步达成。
 */
test('移动端：popover 内"新建草稿" → 直接切到新草稿（不开 drawer）', async ({ page }) => {
  await page.goto('/')

  await page.locator('.draft-switch').click()
  const popover = page.locator('.popover-draft')
  await expect(popover).toBeVisible()

  // 记录当前 draft-switch 标题（活动草稿名）
  const titleBefore = await page.locator('.draft-title').innerText()

  await popover.locator('.draft-pop-action', { hasText: '新建草稿' }).click()

  // popover 自动关闭
  await expect(popover).toBeHidden()
  // drawer 不应该被打开
  await expect(page.locator('aside.drawer')).toBeHidden()
  // 顶部标题切到了新建草稿
  await expect.poll(async () => page.locator('.draft-title').innerText()).not.toBe(titleBefore)
})
