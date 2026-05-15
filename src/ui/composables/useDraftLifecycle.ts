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

import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import {
  createDraft,
  deleteDraft,
  DRAFT_STORAGE_PREFIX,
  getActiveDraftId,
  importDraftsJSONDetailed,
  listDrafts,
  readDraft,
  setActiveDraftId,
  updateDraft,
  type Draft,
} from '../../infra/storage/drafts'
import { SAMPLE_BUILD_ID } from '../../domain/samples'
import { safeRead, safeWrite } from '../../infra/storage/_kv'

const DRAFT_SAVE_DELAY = 400
const SAVED_FADE_MS = 1800

/**
 * dev 重建检测：scripts/build-samples.ts 每次生成 generated.ts 时会写入
 * 当前样本内容的稳定哈希 SAMPLE_BUILD_ID。localStorage 里存一份上次见到的 id，
 * 不一致 = 样本源刚刚被更新（作者改了 src/samples-md/*.md 或者新增容器/变体）。
 *
 * 为什么只在 dev 触发：
 *   - 生产用户的草稿是真实创作内容，不应被任何"主题更新"破坏；
 *   - dev 模式的草稿基本是"主题/容器联调用的示例"，重建后想看新版本 —— 频繁
 *     手动按"载入当前主题示例"很烦，自动刷新更符合直觉。
 *   - 副作用：dev 模式重建一次会一次性刷掉**活跃**草稿正文。其他非活跃草稿不动。
 */
const DEV_SAMPLE_VERSION_KEY = 'wechat-typeset:dev:sampleBuildId'

function isDevEnv(): boolean {
  // import.meta.env.DEV 由 Vite 注入；vitest / 测试环境视为非 dev 以避免污染断言
  return typeof import.meta !== 'undefined' && Boolean(import.meta.env?.DEV)
}

/** 比对存储指纹与当前指纹；若变化则更新存储并返回 true，否则 false。 */
function consumeDevSampleRebuildSignal(): boolean {
  if (!isDevEnv()) return false
  const stored = safeRead(DEV_SAMPLE_VERSION_KEY)
  if (stored === SAMPLE_BUILD_ID) return false
  safeWrite(DEV_SAMPLE_VERSION_KEY, SAMPLE_BUILD_ID)
  // 首次启动（stored === null）也算重建：把刚生成的 id 写入，但不强制刷新草稿
  // （首次启动可能就是真实的用户首次进入，无草稿可刷）
  return stored !== null
}

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

  /**
   * 保存状态机：
   *   - idle  → 无活动写盘
   *   - saving → 防抖窗口内或正在写
   *   - saved  → 刚写成功（SAVED_FADE_MS 后回 idle）
   *   - error  → 上次写盘失败（quota / 隐私模式）；下次写成功或正文变更触发 'saving' 才退出
   */
  const savingState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
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
    if (savingState.value === 'error') return '草稿写盘失败 · 存储已满'
    return '　'
  })
  const displayedSavingState = computed<'idle' | 'saving' | 'saved' | 'error'>(() => {
    // error 态优先于 transient——quota 失败的反馈不能被 transient 弹幕掩盖
    if (savingState.value === 'error') return 'error'
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
      const ok = updateDraft(activeDraftId.value, { body: pendingDraftBody })
      if (ok) {
        pendingDraftBody = null
        draftIndexTick.value += 1
        savingState.value = 'saved'
        if (savedFadeTimer !== null) window.clearTimeout(savedFadeTimer)
        savedFadeTimer = window.setTimeout(() => {
          if (savingState.value === 'saved') savingState.value = 'idle'
        }, SAVED_FADE_MS)
      } else {
        // 写失败：不清 pendingDraftBody——下次正文变更触发的 watch 会用更新值覆盖、再试一次。
        // savingState='error' 让顶部 label 持续显示警告，不被 transient 短暂"已复制"等覆盖。
        savingState.value = 'error'
        pingTransient('草稿写盘失败 · 存储已满', 4000)
      }
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
    // 先消费一次"样本重建"信号：第一次进入时只是落 id 占位，从第二次开始凡是
    // SAMPLE_BUILD_ID 与上次落的不同，就把活跃草稿正文重置为该草稿对应主题的
    // 最新 sample 内容。详见 consumeDevSampleRebuildSignal 注释。
    const sampleRebuilt = consumeDevSampleRebuildSignal()

    const id = getActiveDraftId()
    if (id) {
      const existing = readDraft(id)
      if (existing) {
        activeDraftId.value = existing.id
        const themeForBody = existing.themeId || preferredThemeId
        if (sampleRebuilt) {
          const fresh = deps.getSample(themeForBody)
          deps.md.value = fresh
          updateDraft(existing.id, { body: fresh })
          // 用 info 级别打印，作者一眼能在 dev console 看到"为什么草稿被刷"
          // eslint-disable-next-line no-console
          console.info(
            `[dev] 检测到样本重建（SAMPLE_BUILD_ID=${SAMPLE_BUILD_ID}）；` +
              `活跃草稿正文已重置为 sample-${themeForBody}.md`,
          )
        } else {
          deps.md.value = existing.body
        }
        if (existing.themeId) deps.baseThemeId.value = existing.themeId
        return
      }
    }
    const drafts = listDrafts()
    if (drafts.length > 0) {
      const first = drafts[0]
      activeDraftId.value = first.id
      setActiveDraftId(first.id)
      const themeForBody = first.themeId || preferredThemeId
      if (sampleRebuilt) {
        const fresh = deps.getSample(themeForBody)
        deps.md.value = fresh
        updateDraft(first.id, { body: fresh })
        // eslint-disable-next-line no-console
        console.info(
          `[dev] 检测到样本重建（SAMPLE_BUILD_ID=${SAMPLE_BUILD_ID}）；` +
            `活跃草稿正文已重置为 sample-${themeForBody}.md`,
        )
      } else {
        deps.md.value = readDraft(first.id)?.body ?? ''
      }
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

  /**
   * 跨 tab 同步：另一个同域 tab 写草稿 storage 时，本 tab 收到 storage event。
   * 仅 bump draftIndexTick，让 currentDraftTitle / DraftDrawer 重读最新索引。
   * 不做乐观锁——并发写入仍可能后写覆盖前写，但至少 UI 视图一致，避免显示陈旧的标题列表。
   */
  function onCrossTabStorage(ev: StorageEvent) {
    // ev.key === null 时是 localStorage.clear() 触发；保守也刷新一次。
    if (ev.key === null || ev.key.startsWith(DRAFT_STORAGE_PREFIX)) {
      draftIndexTick.value += 1
    }
  }
  onMounted(() => {
    window.addEventListener('storage', onCrossTabStorage)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('storage', onCrossTabStorage)
  })

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
