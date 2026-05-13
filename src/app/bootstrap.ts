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
import { baseThemeId, md } from './state'
import { safeRead } from '../infra/storage/_kv'

const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'

export interface BootstrapDeps {
  activeDraftId: Ref<string | null>
  initActiveDraft: (themeId: string) => void
  flushDraftSave: () => void
  tryLoadShareFromHash: (
    onLoaded: (id: string, body: string, themeId: string) => void,
  ) => boolean
  /** 任意抽屉/面板/浮层打开状态——移动端用来锁 body 滚动 */
  hasOpenDrawer: ComputedRef<boolean>
}

export function useBootstrap(deps: BootstrapDeps) {
  onMounted(() => {
    const savedThemeId = safeRead(THEME_STORAGE_KEY)
    if (savedThemeId) baseThemeId.value = savedThemeId
    // 分享链接优先于草稿：若 URL 里带有 `#share=`，把 payload 作为新草稿载入；
    // 否则沿用正常的草稿恢复路径。
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

  onBeforeUnmount(() => {
    window.removeEventListener('pagehide', deps.flushDraftSave)
    deps.flushDraftSave()
    if (typeof document !== 'undefined') {
      document.body.classList.remove('drawer-scroll-lock')
    }
  })
}
