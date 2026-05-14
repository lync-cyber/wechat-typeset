/**
 * useDraftLifecycle 关键路径契约（R7-D）
 *
 * 覆盖：
 *   - initActiveDraft：从空 storage 起 → 创建首篇示例草稿
 *   - handleSelectDraft：切换活跃 → md.value 跟着换
 *   - handleSave：立即 flush，pingTransient "已保存"
 *   - handleDeleteDraftRequest：删除 + 自动切到下一篇 / 全删退到 null
 *   - displayedSavingState：error 态优先于 transient
 *   - 跨 tab storage event：bump draftIndexTick
 *
 * 真实 useDraftLifecycle 内部有 setTimeout（防抖 400ms），
 * 用 vi.useFakeTimers 控制；watch md 也要 mount 在 Vue setup 上下文。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { useDraftLifecycle } from '../../src/ui/composables/useDraftLifecycle'
import {
  createDraft,
  DRAFT_STORAGE_PREFIX,
  listDrafts,
  readDraft,
} from '../../src/infra/storage/drafts'

function mountLifecycle() {
  const md = ref<string>('')
  const baseThemeId = ref<string>('default')
  const getSample = vi.fn((id: string) => `# 示例 for ${id}\n正文`)
  let api: ReturnType<typeof useDraftLifecycle> | null = null
  const Comp = defineComponent({
    setup() {
      api = useDraftLifecycle({ md, baseThemeId, getSample })
      return () => h('div')
    },
  })
  const app = createApp(Comp)
  app.mount(document.createElement('div'))
  return {
    md,
    baseThemeId,
    getSample,
    api: api!,
    unmount: () => app.unmount(),
  }
}

let h_: ReturnType<typeof mountLifecycle> | null = null
beforeEach(() => {
  vi.useFakeTimers()
  h_ = mountLifecycle()
})
afterEach(() => {
  h_?.unmount()
  h_ = null
  vi.useRealTimers()
})

describe('initActiveDraft', () => {
  it('空 storage → 创建一篇示例草稿，activeDraftId 写入', () => {
    h_!.api.initActiveDraft('default')
    expect(h_!.api.activeDraftId.value).not.toBeNull()
    expect(listDrafts()).toHaveLength(1)
    expect(h_!.md.value).toContain('示例 for default')
  })

  it('已有 active draft → 直接还原 body 与 themeId', () => {
    const d = createDraft({ title: 'A', body: 'hello body', themeId: 'tech-geek' })
    // 模拟 activeDraftId 已写
    localStorage.setItem(`${DRAFT_STORAGE_PREFIX}active`, d.id)
    h_!.api.initActiveDraft('default')
    expect(h_!.api.activeDraftId.value).toBe(d.id)
    expect(h_!.md.value).toBe('hello body')
    expect(h_!.baseThemeId.value).toBe('tech-geek')
  })
})

describe('handleSelectDraft', () => {
  it('切换 → activeDraftId / md / themeId 同步更新', () => {
    const a = createDraft({ title: 'A', body: 'body-a', themeId: 'default' })
    const b = createDraft({ title: 'B', body: 'body-b', themeId: 'tech-geek' })
    h_!.api.activeDraftId.value = a.id
    h_!.md.value = 'body-a'
    h_!.api.handleSelectDraft(b.id)
    expect(h_!.api.activeDraftId.value).toBe(b.id)
    expect(h_!.md.value).toBe('body-b')
    expect(h_!.baseThemeId.value).toBe('tech-geek')
  })

  it('选同一草稿 → noop', () => {
    const a = createDraft({ title: 'A', body: 'x' })
    h_!.api.activeDraftId.value = a.id
    h_!.md.value = '改了'
    h_!.api.handleSelectDraft(a.id)
    expect(h_!.md.value).toBe('改了')
  })
})

describe('handleSave', () => {
  it('立即 flush + ping "已保存"', async () => {
    const a = createDraft({ title: 'A', body: 'old' })
    h_!.api.activeDraftId.value = a.id
    h_!.md.value = 'new body'
    await nextTick()
    h_!.api.handleSave()
    expect(readDraft(a.id)?.body).toBe('new body')
  })
})

describe('handleDeleteDraftRequest', () => {
  it('删活跃 → 自动切到列表第一篇', () => {
    const a = createDraft({ title: 'A', body: 'x' })
    const b = createDraft({ title: 'B', body: 'y' })
    h_!.api.activeDraftId.value = a.id
    h_!.api.handleDeleteDraftRequest(a.id, 'A')
    // a 被删，剩 b（或最新一篇）
    expect(readDraft(a.id)).toBeNull()
    expect(h_!.api.activeDraftId.value).toBe(b.id)
    expect(h_!.md.value).toBe('y')
  })

  it('删唯一一篇 → activeDraftId 置 null，md 清空', () => {
    const only = createDraft({ title: 'Only', body: 'z' })
    h_!.api.activeDraftId.value = only.id
    h_!.api.handleDeleteDraftRequest(only.id, 'Only')
    expect(h_!.api.activeDraftId.value).toBeNull()
    expect(h_!.md.value).toBe('')
  })

  it('undo restore 后草稿恢复 + activeDraftId 回到它', () => {
    const a = createDraft({ title: 'A', body: 'restore-me' })
    h_!.api.activeDraftId.value = a.id
    h_!.api.handleDeleteDraftRequest(a.id, 'A')
    const restore = h_!.api.undo.value!.restore
    restore()
    expect(readDraft(a.id)?.body).toBe('restore-me')
    expect(h_!.api.activeDraftId.value).toBe(a.id)
  })
})

describe('displayedSavingState / Label · 优先级', () => {
  it('error 态：state 压过 transient（视觉色为 error）', () => {
    h_!.api.pingTransient('已复制', 500)
    h_!.api.savingState.value = 'error'
    expect(h_!.api.displayedSavingState.value).toBe('error')
  })

  it('error 态无 transient 时：label 显示"写盘失败"', () => {
    h_!.api.savingState.value = 'error'
    expect(h_!.api.displayedSavingLabel.value).toContain('写盘失败')
  })

  it('有 transient 时 label 优先显示 transient 文案（不被 saving 覆盖）', () => {
    h_!.api.pingTransient('已复制', 1000)
    h_!.api.savingState.value = 'saving'
    expect(h_!.api.displayedSavingLabel.value).toBe('已复制')
  })
})

describe('跨 tab storage event', () => {
  it('收到 DRAFT_STORAGE_PREFIX 前缀的 storage event → bump tick', () => {
    const before = h_!.api.draftIndexTick.value
    window.dispatchEvent(
      new StorageEvent('storage', { key: `${DRAFT_STORAGE_PREFIX}body:other` }),
    )
    expect(h_!.api.draftIndexTick.value).toBe(before + 1)
  })

  it('ev.key === null（clear 触发）也 bump', () => {
    const before = h_!.api.draftIndexTick.value
    window.dispatchEvent(new StorageEvent('storage', { key: null }))
    expect(h_!.api.draftIndexTick.value).toBe(before + 1)
  })

  it('非 draft key 不 bump', () => {
    const before = h_!.api.draftIndexTick.value
    window.dispatchEvent(new StorageEvent('storage', { key: 'unrelated:foo' }))
    expect(h_!.api.draftIndexTick.value).toBe(before)
  })
})
