/**
 * 移动端 E2E 共享 setup：跳过 onboarding 卡 + 清草稿干扰。
 *
 * - Onboarding 卡（首次启动会渲染，覆盖编辑器一角、拦截点击）：
 *   通过 addInitScript 预先把 localStorage 标记为"已关闭"。
 * - 草稿：每个用例独立，避免上次用例残留影响列表数量断言。
 */

import { expect, type Page } from '@playwright/test'

const ONBOARD_KEY = 'wechat-typeset:onboard:dismissed'

export async function freshMobilePage(page: Page): Promise<void> {
  await page.addInitScript((key) => {
    // addInitScript 也会在预览 srcdoc iframe 中执行；它不能在重渲染时删掉主页面草稿。
    if (window.top !== window) return
    try {
      localStorage.setItem(key, '1')
      // 清空所有 wechat-typeset:* 数据，防止上轮测试残留
      const toRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith('wechat-typeset:') && k !== key) toRemove.push(k)
      }
      toRemove.forEach((k) => localStorage.removeItem(k))
    } catch {
      // 隐私模式等极端场景：忽略
    }
  }, ONBOARD_KEY)
}

/** 当前工作台的公共入口；只操作 Playwright 隔离浏览器中的可见控件。 */
export async function openComponents(page: Page): Promise<void> {
  await page.getByRole('navigation', { name: '创作流程' }).getByRole('button', { name: '排版', exact: true }).click()
  await page.getByRole('navigation', { name: '排版工具' }).getByRole('button', { name: '组件', exact: true }).click()
  await expect(page.getByRole('complementary', { name: '组件库', exact: true })).toBeVisible()
}

export async function showWritingPreview(page: Page): Promise<void> {
  await page.getByRole('navigation', { name: '写作视图' }).getByRole('button', { name: '预览', exact: true }).click()
  await expect(page.getByRole('region', { name: '微信文章预览' })).toBeVisible()
}

/** CodeMirror 按浏览器平台解释 Mod；不能用运行 Playwright 的宿主系统替代 iOS。 */
export async function editorModifier(page: Page): Promise<'Meta' | 'Control'> {
  return page.evaluate(() => {
    const ios = /Apple Computer/.test(navigator.vendor)
      && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2)
    return ios || /Mac/.test(navigator.platform) ? 'Meta' : 'Control'
  })
}

/** 用真实全选、删除和浏览器文本输入替换正文，并验证没有残留原样张。 */
export async function setEditorContent(page: Page, markdown: string): Promise<void> {
  const editor = page.locator('.cm-content')
  await editor.click()
  await page.keyboard.press(`${await editorModifier(page)}+A`)
  await page.keyboard.press('Backspace')
  await expect.poll(() => editor.locator('.cm-line').allTextContents()).toEqual([''])
  await page.keyboard.insertText(markdown)
  await expect.poll(() => editor.locator('.cm-line').allTextContents()).toEqual(markdown.split('\n'))
}
