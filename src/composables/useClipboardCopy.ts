/**
 * 复制相关动作：一键复制富文本 / 复制分享链接 / 外链策略持久化 / share hash 自动载入。
 *
 * 一并打包的原因：
 *   - 三处都写 persistentError / transientStatus，合在一个 composable 里共享 setError 入口
 *   - 外链策略（keep/tail-list/drop）是复制时决策的上游输入，跟复制语义绑定
 *   - 分享链接的 hash 解码也是"粘贴链接 → 载入本地"，与复制形成往返对
 */

import { ref, type Ref } from 'vue'
import type { RenderOutput } from '../pipeline'
import { copyHtmlToClipboard } from './../clipboard/copyHtml'
import {
  degradeOutlinks,
  OUTLINK_STRATEGIES,
  type OutlinkStrategy,
} from '../clipboard/outlinkDegrade'
import {
  buildShareUrl,
  parseShareHash,
  type SharePayload,
} from '../share/shareLink'
import { createDraft, setActiveDraftId } from '../storage/drafts'
import { safeRead, safeWrite } from '../storage/_kv'

const OUTLINK_STRATEGY_KEY = 'wechat-typeset:outlink-strategy'

export interface ClipboardCopyDeps {
  md: Ref<string>
  rendered: Ref<RenderOutput>
  flush: () => void
  baseThemeId: Ref<string>
  activeDraftId: Ref<string | null>
  draftIndexTick: Ref<number>
  pingTransient: (msg: string, ms?: number) => void
}

function readOutlinkStrategy(): OutlinkStrategy {
  const v = safeRead(OUTLINK_STRATEGY_KEY)
  if (v && (OUTLINK_STRATEGIES as readonly string[]).includes(v)) {
    return v as OutlinkStrategy
  }
  return 'keep'
}

export function useClipboardCopy(deps: ClipboardCopyDeps) {
  const outlinkStrategy = ref<OutlinkStrategy>(readOutlinkStrategy())
  const persistentError = ref<string | null>(null)

  function setOutlinkStrategy(v: OutlinkStrategy) {
    outlinkStrategy.value = v
    safeWrite(OUTLINK_STRATEGY_KEY, v)
  }

  async function handleCopy() {
    deps.flush()
    const rawHtml = deps.rendered.value.html
    const { html, count } = degradeOutlinks(rawHtml, outlinkStrategy.value)
    const plain = deps.md.value
    const result = await copyHtmlToClipboard(html, plain)
    if (result.ok) {
      const strategyNote =
        count > 0 && outlinkStrategy.value === 'tail-list'
          ? `（${count} 条外链已尾注）`
          : count > 0 && outlinkStrategy.value === 'drop'
          ? `（${count} 条外链已丢弃）`
          : ''
      const base = result.mode === 'clipboard-api' ? '已复制' : '已复制（降级）'
      deps.pingTransient(base + strategyNote)
      persistentError.value = null
    } else {
      persistentError.value = `复制失败：${result.error ?? '未知错误'}（请换 Chrome/Safari 或关闭跨域 iframe）`
    }
  }

  async function handleCopyShareLink() {
    const payload: SharePayload = {
      v: 1,
      md: deps.md.value,
      themeId: deps.baseThemeId.value,
    }
    const url = buildShareUrl(payload)
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        deps.pingTransient('已复制分享链接')
      } else {
        location.hash = url.slice(url.indexOf('#'))
        deps.pingTransient('请从地址栏复制当前链接')
      }
    } catch {
      persistentError.value = '分享链接复制失败：请手动复制地址栏 URL'
    }
  }

  function deriveShareDraftTitle(body: string): string {
    const line = body.split('\n').map((l) => l.trim()).find((l) => l.length > 0) ?? ''
    const stripped = line.replace(/^#+\s*/, '').slice(0, 20)
    return `[分享] ${stripped || '未命名'}`
  }

  /**
   * 检测并解码 `#share=…`。解码成功时把内容落为新草稿；失败或无 hash 返回 false。
   * 注入 setActiveAndBody 回调让上层 App.vue 同步自己的 activeDraftId 与 md。
   */
  function tryLoadShareFromHash(
    setActiveAndBody: (id: string, body: string, themeId: string) => void,
  ): boolean {
    if (typeof location === 'undefined') return false
    const payload = parseShareHash(location.hash)
    if (!payload) return false
    const created = createDraft({
      title: deriveShareDraftTitle(payload.md),
      body: payload.md,
      themeId: payload.themeId,
    })
    setActiveDraftId(created.id)
    setActiveAndBody(created.id, created.body, created.themeId)
    deps.draftIndexTick.value += 1
    try {
      history.replaceState(null, '', location.pathname + location.search)
    } catch {
      location.hash = ''
    }
    deps.pingTransient('已从分享链接载入新草稿', 2500)
    return true
  }

  return {
    outlinkStrategy,
    setOutlinkStrategy,
    persistentError,
    handleCopy,
    handleCopyShareLink,
    tryLoadShareFromHash,
  }
}
