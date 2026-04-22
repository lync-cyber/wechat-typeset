/**
 * 分享链接哈希：#share=<base64url({v:1,md,themeId})> → 落为新草稿 → 编辑器载入 → 哈希被清理。
 *
 * 单测已覆盖 encodeShare/decodeShare 的纯函数；这里验证 App.vue 的 onMounted 接线、
 * 以及 history.replaceState 把 URL 上的 #share= 擦掉（避免二次刷新二次建草稿）。
 *
 * 编码逻辑内联在测试里：JSON → UTF-8 → base64url。与 src/share/shareLink.ts 保持同构。
 */

import { expect, test } from '@playwright/test'
import { freshMobilePage } from './_helpers'

test.beforeEach(async ({ page }) => {
  await freshMobilePage(page)
})

function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function makeShareHash(md: string, themeId: string): string {
  const payload = JSON.stringify({ v: 1, md, themeId })
  return `#share=${toBase64Url(payload)}`
}

test('带 #share= 打开 → 落为新草稿 + md 注入编辑器', async ({ page }) => {
  const MD = '# 分享链接载入\n\n这段 md 从 `#share=` 哈希解出。'
  // 直接带哈希首次进页，确保 onMounted 能拿到 location.hash
  await page.goto('/' + makeShareHash(MD, 'default'))

  // iframe 的预览里应能看到 "分享链接载入" 标题
  await page.locator('.mobile-tab', { hasText: '预览' }).click()
  const iframe = page.frameLocator('iframe.preview-frame')
  await expect(iframe.locator('h1, h2').filter({ hasText: '分享链接载入' })).toBeVisible()

  // 哈希应被 replaceState 擦掉（避免刷新二次注入）
  await expect.poll(async () => page.evaluate(() => location.hash)).toBe('')
})

test('非法 #share= 不会崩，走正常草稿路径', async ({ page }) => {
  // 非法 base64url → decodeShare 返回 null → initActiveDraft 走正常路径
  await page.goto('/#share=!!!not-valid!!!')
  // 页面仍能完整加载
  await expect(page.locator('.brand-mark')).toHaveText('wechat')
  // 编辑器可见
  await expect(page.locator('.cm-content')).toBeVisible()
})
