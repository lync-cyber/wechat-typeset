/**
 * 草稿生命周期：活跃切换 / 自动保存 / 删除 + 撤销 / 初始化 / 标题计算。
 *
 * 打包进来的边缘状态：
 *   - transient status 与 savingState——保存反馈与临时提示共享顶部 label，合写在这里
 *     比让 App.vue 持有两套 state 再拼接更紧凑
 *   - undo toast——草稿删除 / 主题切换重置配色 / 清空正文等多处用到，也一并持有
 *
 * App.vue 注入：md（编辑器正文 ref）、baseThemeId、初始 sample 工厂（getSample）。
 */

import { computed, ref, watch, type Ref } from 'vue'
import {
  createDraft,
  deleteDraft,
  getActiveDraftId,
  importDraftsJSONDetailed,
  listDrafts,
  readDraft,
  setActiveDraftId,
  updateDraft,
  type Draft,
} from '../storage/drafts'

const DRAFT_SAVE_DELAY = 400
const SAVED_FADE_MS = 1800

export interface DraftLifecycleDeps {
  md: Ref<string>
  baseThemeId: Ref<string>
  /** 按主题 id 取内置示例正文，新建草稿时用 */
  getSample: (themeId: string) => string
}

export interface UndoEntry {
  message: string
  restore: () => void
}

export function useDraftLifecycle(deps: DraftLifecycleDeps) {
  const activeDraftId = ref<string | null>(null)
  const draftIndexTick = ref(0) // 强制重算草稿标题列表（重命名/删除/新建后）

  const savingState = ref<'idle' | 'saving' | 'saved'>('idle')
  const transientStatus = ref<string>('')
  let transientTimer: number | null = null

  const undo = ref<UndoEntry | null>(null)

  let draftSaveTimer: number | null = null
  let pendingDraftBody: string | null = null
  let savedFadeTimer: number | null = null

  function pingTransient(msg: string, ms = 1500) {
    transientStatus.value = msg
    if (transientTimer !== null) window.clearTimeout(transientTimer)
    transientTimer = window.setTimeout(() => (transientStatus.value = ''), ms)
  }

  const displayedSavingLabel = computed(() => {
    if (transientStatus.value) return transientStatus.value
    if (savingState.value === 'saving') return '保存中…'
    if (savingState.value === 'saved') return '已保存'
    return '　'
  })
  const displayedSavingState = computed<'idle' | 'saving' | 'saved'>(() => {
    if (transientStatus.value) return 'saved'
    return savingState.value
  })

  function showUndo(message: string, restore: () => void) {
    undo.value = { message, restore }
  }
  function onUndo() {
    undo.value?.restore()
    undo.value = null
  }
  function onUndoExpire() {
    undo.value = null
  }

  const currentDraftTitle = computed(() => {
    void draftIndexTick.value
    if (!activeDraftId.value) return ''
    return listDrafts().find((d) => d.id === activeDraftId.value)?.title ?? ''
  })

  function flushDraftSave() {
    if (draftSaveTimer !== null) {
      window.clearTimeout(draftSaveTimer)
      draftSaveTimer = null
    }
    if (pendingDraftBody !== null && activeDraftId.value) {
      updateDraft(activeDraftId.value, { body: pendingDraftBody })
      pendingDraftBody = null
      draftIndexTick.value += 1
      savingState.value = 'saved'
      if (savedFadeTimer !== null) window.clearTimeout(savedFadeTimer)
      savedFadeTimer = window.setTimeout(() => {
        if (savingState.value === 'saved') savingState.value = 'idle'
      }, SAVED_FADE_MS)
    }
  }

  // 监听 md 变化，防抖自动落盘
  watch(deps.md, (val) => {
    if (!activeDraftId.value) return
    pendingDraftBody = val
    savingState.value = 'saving'
    if (draftSaveTimer !== null) window.clearTimeout(draftSaveTimer)
    draftSaveTimer = window.setTimeout(flushDraftSave, DRAFT_SAVE_DELAY)
  })

  function initActiveDraft(preferredThemeId: string = 'default') {
    const id = getActiveDraftId()
    if (id) {
      const existing = readDraft(id)
      if (existing) {
        activeDraftId.value = existing.id
        deps.md.value = existing.body
        if (existing.themeId) deps.baseThemeId.value = existing.themeId
        return
      }
    }
    const drafts = listDrafts()
    if (drafts.length > 0) {
      const first = drafts[0]
      activeDraftId.value = first.id
      setActiveDraftId(first.id)
      const body = readDraft(first.id)?.body ?? ''
      deps.md.value = body
      if (first.themeId) deps.baseThemeId.value = first.themeId
    } else {
      const created = createDraft({
        title: 'wechat-typeset 示例',
        body: deps.getSample(preferredThemeId),
        themeId: preferredThemeId,
      })
      activeDraftId.value = created.id
      deps.md.value = created.body
    }
  }

  function handleSave() {
    if (!activeDraftId.value) return
    pendingDraftBody = deps.md.value
    flushDraftSave()
    pingTransient('已保存')
  }

  function handleSelectDraft(id: string) {
    if (id === activeDraftId.value) return
    flushDraftSave()
    const d = readDraft(id)
    if (!d) return
    activeDraftId.value = d.id
    setActiveDraftId(d.id)
    deps.md.value = d.body
    if (d.themeId) deps.baseThemeId.value = d.themeId
    draftIndexTick.value += 1
  }

  function handleDeleteDraftRequest(id: string, title: string) {
    const full = readDraft(id)
    if (!full) return
    const wasActive = activeDraftId.value === id
    deleteDraft(id)
    if (wasActive) {
      const next = listDrafts()[0]
      if (next) {
        const body = readDraft(next.id)?.body ?? ''
        activeDraftId.value = next.id
        setActiveDraftId(next.id)
        deps.md.value = body
        if (next.themeId) deps.baseThemeId.value = next.themeId
      } else {
        activeDraftId.value = null
        deps.md.value = ''
      }
    }
    draftIndexTick.value += 1
    showUndo(`已删除「${title}」`, () => {
      const record: Draft = { ...full }
      importDraftsJSONDetailed(JSON.stringify({ version: 1, drafts: [record] }))
      activeDraftId.value = record.id
      setActiveDraftId(record.id)
      deps.md.value = record.body
      if (record.themeId) deps.baseThemeId.value = record.themeId
      draftIndexTick.value += 1
    })
  }

  /** 文件名 stem：活跃草稿标题剥非法字符；空则回退到默认前缀。 */
  function fileStem(fallback: string = 'wechat-typeset-export'): string {
    const t = (listDrafts().find((d) => d.id === activeDraftId.value)?.title ?? fallback).replace(
      /[\\/:*?"<>|\s]+/g,
      '-',
    )
    return t || fallback
  }

  return {
    // 状态
    activeDraftId,
    draftIndexTick,
    savingState,
    displayedSavingLabel,
    displayedSavingState,
    currentDraftTitle,
    undo,
    // 动作
    initActiveDraft,
    handleSave,
    handleSelectDraft,
    handleDeleteDraftRequest,
    flushDraftSave,
    pingTransient,
    showUndo,
    onUndo,
    onUndoExpire,
    fileStem,
  }
}
