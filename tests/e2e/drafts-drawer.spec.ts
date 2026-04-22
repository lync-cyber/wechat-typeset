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

test('移动端：打开草稿抽屉 → 新建草稿 → 列表出现新项', async ({ page }) => {
  await page.goto('/')

  await page.locator('.draft-switch').click()

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

  await page.locator('.draft-switch').click()
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
