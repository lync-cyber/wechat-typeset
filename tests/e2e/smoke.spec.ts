/**
 * 移动端冒烟：页面加载、两行工具栏、底部 tab 栏可见。
 *
 * 这是 E2E 的最小覆盖，确保未来 refactor 没有把 mobile 布局打碎——
 * 单测（jsdom）看不到 `@media (max-width: 767px)` 的真实效果。
 */

import { expect, test } from '@playwright/test'

test('页面可加载，品牌名可见', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.brand-mark')).toHaveText('wechat')
  await expect(page.locator('.brand-name')).toHaveText('typeset')
})

test('移动端：底部 tab 栏（编辑 / 一键复制 / 预览）显示', async ({ page }) => {
  await page.goto('/')
  const tabs = page.locator('.mobile-tabs')
  await expect(tabs).toBeVisible()
  await expect(tabs.locator('.mobile-tab', { hasText: '编辑' })).toBeVisible()
  await expect(tabs.locator('.mobile-tab-copy', { hasText: '一键复制' })).toBeVisible()
  await expect(tabs.locator('.mobile-tab', { hasText: '预览' })).toBeVisible()
})

test('移动端：两行工具栏（第一行品牌，第二行工具）', async ({ page }) => {
  await page.goto('/')
  // grid-template-rows: auto auto 下第一行 .zone-left 占 grid-column 1/3
  // 简单验收：品牌 + 草稿入口 + 中心工具按钮都在 toolbar 内且都能见
  const toolbar = page.locator('.toolbar')
  await expect(toolbar).toBeVisible()
  await expect(toolbar.locator('.brand')).toBeVisible()
  await expect(toolbar.locator('.draft-switch')).toBeVisible()
  await expect(toolbar.locator('.btn-theme')).toBeVisible()
  await expect(toolbar.locator('.btn-insert')).toBeVisible()
})

test('移动端：点底部编辑/预览 tab 切换面板', async ({ page }) => {
  await page.goto('/')
  // 初始默认 editor 面板
  await expect(page.locator('.pane-editor')).toBeVisible()
  // 切到 preview
  await page.locator('.mobile-tab', { hasText: '预览' }).click()
  await expect(page.locator('.pane-preview')).toBeVisible()
  await expect(page.locator('.pane-editor')).toBeHidden()
  // 切回 editor
  await page.locator('.mobile-tab', { hasText: '编辑' }).click()
  await expect(page.locator('.pane-editor')).toBeVisible()
})
