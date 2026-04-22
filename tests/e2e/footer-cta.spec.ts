/**
 * footer-cta href 渲染为 <a> 且带 data-wx-footer-cta 标记。
 *
 * 这是本轮移动端跟进最关键的 e2e 覆盖：确保作者按正规契约写的 href 在预览里真的是可点链接。
 * jsdom 的 containers.spec 只验渲染字符串，这里验真实 iframe + 浏览器 DOM。
 */

import { expect, test } from '@playwright/test'
import { freshMobilePage } from './_helpers'

test.beforeEach(async ({ page }) => {
  await freshMobilePage(page)
})

async function setEditorContent(page: import('@playwright/test').Page, md: string) {
  // CodeMirror contenteditable：先全选清空，再 dispatch paste 事件一次性灌入。
  // 不走 keyboard.type —— 既避开 autocomplete/lint 对 Enter 的吃键，
  // 也让换行被 CM 的 paste handler 正常拆成多行（type 不翻译 \n）。
  const editor = page.locator('.cm-content')
  await editor.click()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.press('Delete')
  await editor.evaluate((el, text) => {
    const dt = new DataTransfer()
    dt.setData('text/plain', text)
    el.dispatchEvent(
      new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true,
      }),
    )
  }, md)
}

test('footer-cta 带白名单 href：预览 iframe 里 <a> 含 data-wx-footer-cta 与正确 href', async ({ page }) => {
  await page.goto('/')
  await setEditorContent(
    page,
    '::: footer-cta 标题 cta=阅读原篇 href=https://mp.weixin.qq.com/s/abc\n:::\n',
  )
  // 切到预览面板（移动端布局下默认 editor；自动化里显式切）
  await page.locator('.mobile-tab', { hasText: '预览' }).click()

  const preview = page.frameLocator('iframe.preview-frame')
  const cta = preview.locator('a[data-wx-footer-cta]')
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('href', 'https://mp.weixin.qq.com/s/abc')
  await expect(cta).toHaveText('阅读原篇')
})

test('footer-cta 无 href：渲染为 <span>，不出现 <a data-wx-footer-cta>', async ({ page }) => {
  await page.goto('/')
  await setEditorContent(page, '::: footer-cta 标题 cta=点此关注\n:::\n')
  await page.locator('.mobile-tab', { hasText: '预览' }).click()

  const preview = page.frameLocator('iframe.preview-frame')
  await expect(preview.locator('.container-footer-cta')).toBeVisible()
  await expect(preview.locator('a[data-wx-footer-cta]')).toHaveCount(0)
})

test('footer-cta <a> min-height ≥ 44px（tap target 保底）', async ({ page }) => {
  await page.goto('/')
  await setEditorContent(
    page,
    '::: footer-cta 标题 cta=去 href=tel:10086\n:::\n',
  )
  await page.locator('.mobile-tab', { hasText: '预览' }).click()

  const preview = page.frameLocator('iframe.preview-frame')
  const cta = preview.locator('a[data-wx-footer-cta]')
  await expect(cta).toBeVisible()
  const box = await cta.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.height).toBeGreaterThanOrEqual(44)
})
