/**
 * useThemeOrchestrator 副作用契约（R7-D）
 *
 * baseThemeId 变化时 4 条副作用：
 *   1. persistThemeId → localStorage 写 'wechat-typeset:theme:last'
 *   2. resetCustomThemeWithUndo → 清 customTheme + lastSeed + 挂 undo
 *   3. autoSwapPristineSample → md 仍为某主题 sample 时跟随切换
 *   4. persistDraftTheme → activeDraftId 存在时把草稿 themeId 字段同步
 *
 * 测试 setupTestApp 工具：Vue watch 必须在 setup() 上下文里建立；用 createApp + 简单
 * holder 组件挂上 useThemeOrchestrator，wait nextTick 让 watcher 触发，
 * 然后断言 state 与 mock。
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, markRaw, nextTick, ref } from 'vue'
import {
  useThemeOrchestrator,
  type UseThemeOrchestratorDeps,
} from '../../src/app/themeOrchestrator'
import { baseThemeId, customTheme, lastSeed, md } from '../../src/app/state'
import { createDraft, readDraft } from '../../src/infra/storage/drafts'
import { THEME_STORAGE_KEY } from '../../src/infra/storage/storageKeys'
import { SAMPLE_BY_THEME, getSample } from '../../src/domain/samples'

interface Mounted {
  unmount: () => void
  deps: UseThemeOrchestratorDeps & { showUndo: ReturnType<typeof vi.fn> }
}

function mountOrchestrator(): Mounted {
  const showUndo = vi.fn()
  const activeDraftId = ref<string | null>(null)
  const draftIndexTick = ref(0)
  const deps = { showUndo, activeDraftId, draftIndexTick }
  const Comp = defineComponent({
    setup() {
      useThemeOrchestrator(deps)
      return () => h('div')
    },
  })
  const app = createApp(Comp)
  const root = document.createElement('div')
  app.mount(root)
  return { unmount: () => app.unmount(), deps }
}

let mounted: Mounted | null = null
beforeEach(() => {
  mounted = mountOrchestrator()
})
afterEach(() => {
  mounted?.unmount()
  mounted = null
})

describe('persistThemeId', () => {
  it('baseThemeId 变化 → localStorage 写入新值', async () => {
    baseThemeId.value = 'tech-geek'
    await nextTick()
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('tech-geek')
  })
})

describe('resetCustomThemeWithUndo', () => {
  it('有 customTheme 时切主题 → 清空 + 挂 undo', async () => {
    customTheme.value = markRaw({ ...mockTheme(), id: 'default--custom' })
    lastSeed.value = { primary: '#f00', secondary: '#0f0', accent: '#00f', dark: false }
    baseThemeId.value = 'tech-geek'
    await nextTick()
    expect(customTheme.value).toBeNull()
    expect(lastSeed.value).toBeNull()
    expect(mounted!.deps.showUndo).toHaveBeenCalledOnce()
  })

  it('无 customTheme 时切主题 → 不挂 undo', async () => {
    customTheme.value = null
    baseThemeId.value = 'tech-explainer'
    await nextTick()
    expect(mounted!.deps.showUndo).not.toHaveBeenCalled()
  })

  it('undo restore 能恢复主题 + customTheme + seed', async () => {
    // markRaw 避免 Vue ref 把 plain object 包成 Proxy，让 toBe 引用相等成立
    const prevCustom = markRaw({ ...mockTheme(), id: 'default--custom' })
    const prevSeed = markRaw({ primary: '#abc', secondary: '#def', accent: '#012', dark: false })
    customTheme.value = prevCustom
    lastSeed.value = prevSeed
    baseThemeId.value = 'tech-geek'
    await nextTick()
    const restore = mounted!.deps.showUndo.mock.calls[0][1] as () => void
    restore()
    expect(baseThemeId.value).toBe('default')
    expect(customTheme.value).toBe(prevCustom)
    expect(lastSeed.value).toBe(prevSeed)
  })
})

describe('autoSwapPristineSample', () => {
  it('md 是某主题 sample → 切主题后跟着换 sample', async () => {
    md.value = getSample('default')
    baseThemeId.value = 'tech-geek'
    await nextTick()
    expect(md.value).toBe(getSample('tech-geek'))
  })

  it('md 是用户改过的内容 → 切主题不动 md', async () => {
    md.value = '我自己写的草稿'
    baseThemeId.value = 'tech-geek'
    await nextTick()
    expect(md.value).toBe('我自己写的草稿')
  })

  it('md 命中"任意"主题 sample（非 prev）也算 pristine', async () => {
    // 设当前是 default，md 恰好是 tech-geek 的 sample → 仍视为可换
    md.value = SAMPLE_BY_THEME['tech-geek'] ?? ''
    baseThemeId.value = 'literary-humanism'
    await nextTick()
    expect(md.value).toBe(getSample('literary-humanism'))
  })
})

describe('persistDraftTheme', () => {
  it('activeDraftId 存在 → updateDraft 写新 themeId + 自增 tick', async () => {
    const created = createDraft({ title: 't', body: 'x', themeId: 'default' })
    mounted!.deps.activeDraftId.value = created.id
    const beforeTick = mounted!.deps.draftIndexTick.value
    baseThemeId.value = 'tech-geek'
    await nextTick()
    expect(readDraft(created.id)?.themeId).toBe('tech-geek')
    expect(mounted!.deps.draftIndexTick.value).toBe(beforeTick + 1)
  })

  it('activeDraftId 为空 → 不写草稿', async () => {
    mounted!.deps.activeDraftId.value = null
    baseThemeId.value = 'tech-geek'
    await nextTick()
    // 无 draft 创建过，listDrafts 仍空，tick 不变
    expect(mounted!.deps.draftIndexTick.value).toBe(0)
  })
})

describe('val === prev 守卫', () => {
  it('同主题再赋值不触发其他三条副作用（仅 persist 写盘）', async () => {
    baseThemeId.value = 'default'  // 与初值同
    await nextTick()
    expect(mounted!.deps.showUndo).not.toHaveBeenCalled()
  })
})

// helper: 构造一个最简 Theme stub，仅 id 字段被 R7-D 这层测试使用
function mockTheme() {
  return { id: '__mock__' } as never
}
