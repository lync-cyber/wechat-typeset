/**
 * 应用启动/卸载副作用 —— onMounted / onBeforeUnmount 的协调器
 *
 * 拆出动机：App.vue 的 onMounted 在 R6 之前混着"读 localStorage 的主题"、"试着从
 * URL hash 恢复分享链"、"否则走草稿初始化"、"挂 pagehide flush"四件事。每件都有
 * 独立的失败路径与时序约束。拆到这里后 App.vue 只调用 useBootstrap(deps)。
 *
 * 顺序说明：
 *   1. 先读 baseThemeId（决定后续 sample 选取）；
 *   2. 再试 share-hash 恢复（优先级最高，URL 携带的稿件覆盖本地草稿）；
 *   3. 都没有就走 initActiveDraft 正常路径；
 *   4. 最后挂 pagehide 监听器——保证用户关闭 tab 前 flushDraftSave 兜底一次。
 *
 * onBeforeUnmount 镜像清理：解绑 pagehide，触发一次 flush（HMR 下也走过），
 * 清掉移动端 body class（避免热更替换 App 后样式残留）。
 */
import { onBeforeUnmount, onMounted, watch, type Ref, type ComputedRef } from 'vue'
import { baseThemeId, editorWidth, md } from './state'
import { safeRead, safeWrite } from '../infra/storage/_kv'
import { THEME_STORAGE_KEY, EDITOR_WIDTH_STORAGE_KEY } from '../infra/storage/storageKeys'
import { useUiTheme } from './uiTheme'
import {
  peekComponentShareHash,
  tryImportComponentFromHash,
} from '../infra/share/payloads/componentImport'

export interface BootstrapDeps {
  activeDraftId: Ref<string | null>
  initActiveDraft: (themeId: string) => void
  flushDraftSave: () => void
  tryLoadShareFromHash: (
    onLoaded: (id: string, body: string, themeId: string) => void,
  ) => boolean
  /**
   * 我的组件库导入后回调（外部用来刷新 useUserComponents 的响应式 list）。
   * 缺省则不调，仅本地 storage 写入。
   */
  onComponentImported?: () => void
  /** 任意抽屉/面板/浮层打开状态——移动端用来锁 body 滚动 */
  hasOpenDrawer: ComputedRef<boolean>
}

function importComponentFromHashIfPresent(onImported?: () => void): boolean {
  if (typeof location === 'undefined') return false
  const rawHash = location.hash
  const preview = peekComponentShareHash(rawHash)
  if (!preview) return false
  const proceed = window.confirm(
    `检测到分享链接里包含组件「${preview.component.name}」。\n` +
      `导入到我的组件库吗？\n\n` +
      `（${preview.component.description || '无描述'}）`,
  )
  // 不论用户选 Yes/No 都清 hash——下次刷新不重复弹窗。
  try {
    history.replaceState(null, '', location.pathname + location.search)
  } catch {
    location.hash = ''
  }
  if (!proceed) return false
  const res = tryImportComponentFromHash(rawHash)
  if (res.ok) {
    onImported?.()
    return true
  }
  if (res.message) window.alert(res.message)
  return false
}

export function useBootstrap(deps: BootstrapDeps) {
  // UI 亮/暗模式：onMounted 之前先调用是因为 useUiTheme 内部已经做了 onMounted
  // 时序的封装——它只是在调用处建立 watch；首次 applyToDom 也是在 setup 阶段
  // 同步执行，能让首屏直接进对应模式而非闪一下 light。
  useUiTheme()

  onMounted(() => {
    const savedThemeId = safeRead(THEME_STORAGE_KEY)
    if (savedThemeId) baseThemeId.value = savedThemeId

    // 编辑栏宽度：仅在合法整数时恢复；解析失败 → 维持 null（默认 flex 行为）。
    // 不在此处再 clamp 到当前视口——App.vue 的 max 会兜底裁剪。
    const savedWidth = safeRead(EDITOR_WIDTH_STORAGE_KEY)
    if (savedWidth) {
      const parsed = Number.parseInt(savedWidth, 10)
      if (Number.isFinite(parsed) && parsed > 0) editorWidth.value = parsed
    }
    // 组件分享链优先探测：`#share-component=...` 是"导入到我的组件库"，不替换草稿。
    // 不论是否导入（用户可能 cancel），都不算 "已加载分享"；继续往下走正常初始化路径。
    importComponentFromHashIfPresent(deps.onComponentImported)

    // 文章分享链：若 URL 里带有 `#share=`，把 payload 作为新草稿载入；
    // 否则沿用正常的草稿恢复路径。
    //
    // 载入分享前先 flush 一次：HMR / 重 mount 路径下，pendingDraftBody 可能仍指向上一段
    // 编辑内容。tryLoadShareFromHash 会立即切 activeDraftId，若不先 flush，pending body
    // 会随后续触发被错误写入新 activeDraftId，把分享内容覆盖回去。
    deps.flushDraftSave()
    const loaded = deps.tryLoadShareFromHash((id, body, themeId) => {
      deps.activeDraftId.value = id
      md.value = body
      baseThemeId.value = themeId
    })
    if (!loaded) {
      deps.initActiveDraft(baseThemeId.value)
    }
    window.addEventListener('pagehide', deps.flushDraftSave)
  })

  // 移动端抽屉/面板打开 → 锁 body 滚动；桌面上抽屉不占满视口，无需锁。
  watch(deps.hasOpenDrawer, (open) => {
    if (typeof document === 'undefined') return
    const mobile = window.matchMedia('(max-width: 767px)').matches
    document.body.classList.toggle('drawer-scroll-lock', open && mobile)
  })

  // 编辑栏宽度持久化：变化时写盘；置 null（恢复默认）时主动删除 key，
  // 避免下次启动从空字符串恢复成 NaN。
  watch(editorWidth, (val) => {
    if (val == null) safeWrite(EDITOR_WIDTH_STORAGE_KEY, '')
    else safeWrite(EDITOR_WIDTH_STORAGE_KEY, String(Math.round(val)))
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pagehide', deps.flushDraftSave)
    deps.flushDraftSave()
    if (typeof document !== 'undefined') {
      document.body.classList.remove('drawer-scroll-lock')
    }
  })
}
