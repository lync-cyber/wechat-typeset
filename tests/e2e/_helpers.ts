/**
 * 移动端 E2E 共享 setup：跳过 onboarding 卡 + 清草稿干扰。
 *
 * - Onboarding 卡（首次启动会渲染，覆盖编辑器一角、拦截点击）：
 *   通过 addInitScript 预先把 localStorage 标记为"已关闭"。
 * - 草稿：每个用例独立，避免上次用例残留影响列表数量断言。
 */

import type { Page } from '@playwright/test'

const ONBOARD_KEY = 'wechat-typeset:onboard:dismissed'

export async function freshMobilePage(page: Page): Promise<void> {
  await page.addInitScript((key) => {
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
