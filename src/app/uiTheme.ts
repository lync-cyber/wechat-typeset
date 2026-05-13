/**
 * UI 亮/暗模式（app shell 主题，不影响内容预览）
 *
 * 与"排版主题（baseThemeId）"严格区分：
 *   - 排版主题：作用于 .markdown-body 与导出的 HTML，由 PersonaSpec 投影。
 *   - UI 主题：仅作用于 toolbar / drawer / dialog / editor chrome 等"工作台"
 *     ——通过 <html data-theme="light|dark"> 切换 tokens.css 里的语义令牌。
 *
 * 设计决策：
 *   - 默认 light：与之前未支持暗色时一致，老用户不会突然变暗。
 *   - 不跟随系统：用户主动切换才进 dark；写盘到 localStorage，刷新保持。
 *   - 二态枚举：light | dark；想做"跟随系统"可扩 'system' 第三态 + 在 watch 里
 *     根据 matchMedia('(prefers-color-scheme: dark)') 写回 data-theme。
 *
 * 预览栏隔离：Preview.vue 用 iframe srcdoc 重写文档，自带 #ffffff/#ececec 底，
 * 父级 data-theme 不会渗入 .markdown-body —— UI 暗色绝不污染"微信保真"预览。
 */
import { ref, watch } from 'vue'
import { safeRead, safeWrite } from '../infra/storage/_kv'

export type UiThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'wechat-typeset:ui-theme'

function readInitial(): UiThemeMode {
  const v = safeRead(STORAGE_KEY)
  return v === 'dark' ? 'dark' : 'light'
}

export const uiThemeMode = ref<UiThemeMode>(readInitial())

function applyToDom(mode: UiThemeMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = mode
}

/**
 * 在 onMounted 时调用：写当前模式到 <html>、订阅后续变更同步 DOM + 持久化。
 *
 * 不在模块加载期立刻 apply：SSR 场景 document 未必存在；bootstrap.ts 是
 * onMounted 入口，时序更明确。
 */
export function useUiTheme(): void {
  applyToDom(uiThemeMode.value)
  watch(uiThemeMode, (mode) => {
    applyToDom(mode)
    safeWrite(STORAGE_KEY, mode)
  })
}

/** 二态翻转，给 Toolbar / 快捷键直接调用 */
export function toggleUiTheme(): void {
  uiThemeMode.value = uiThemeMode.value === 'dark' ? 'light' : 'dark'
}
