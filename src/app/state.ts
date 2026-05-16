/**
 * 应用级共享状态：模块级单例 ref，作为超轻量 store。
 *
 * 不用 Pinia：< 10 个 ref 时 store 库样板大于直接 import；未来若加多窗口再迁移。
 *
 * 读写约定：
 *   - md / baseThemeId / mobileTab：所有 composable + App.vue 都可读写
 *   - hoverThemeId：ThemePicker 写、activeTheme 读
 *   - customTheme：ColorCustomizer 写、activeTheme 读
 *   - activeTheme：派生只读 computed，不直接赋值
 */
import { computed, ref } from 'vue'
import type { Theme } from '../core/themes/types'
import { getTheme } from '../core/themes'

export interface Seed {
  primary: string
  secondary: string
  accent: string
  dark: boolean
}

/** 编辑器正文（响应式）；保存到草稿、复制为公众号、参与 pipeline 渲染。 */
export const md = ref<string>('')

/** 当前锁定的主题 id（持久化到 localStorage，对应 themes registry 中的 key）。 */
export const baseThemeId = ref<string>('default')

/**
 * Toolbar 主题选择 popover 内 hover 卡片的临时态，临时覆盖 activeTheme；
 * popover 关闭或点击锁定后清空。
 *
 * 不持久化——只在内存中。语义上是"瞬时窥探"，与 baseThemeId / customTheme 互斥。
 */
export const hoverThemeId = ref<string | null>(null)

/** 用户在 ColorCustomizer 自定义后派生的 Theme；切 baseThemeId 时重置为 null。 */
export const customTheme = ref<Theme | null>(null)

/** 移动端底部 tabs 当前选中的栏目。 */
export const mobileTab = ref<'editor' | 'preview'>('editor')

/**
 * 编辑栏显式像素宽度（仅桌面端有意义）。
 *
 *   - null   = 默认行为，编辑栏 flex:1 1 auto 自适应填充
 *   - number = 用户通过 PaneSplitter 拖出的固定宽度；预览栏靠 margin-left:auto 贴右
 *
 * 持久化在 bootstrap.ts 里做（与 baseThemeId 同样路径）；移动端 CSS 直接忽略。
 */
export const editorWidth = ref<number | null>(null)

/**
 * activeTheme 的三级优先级：
 *   hoverThemeId （ThemePicker 临时 hover）> customTheme （配色自定义）> baseThemeId （锁定）
 *
 * hover 覆盖 custom：作者悬停另一主题时是想"看一眼同稿换主题什么样"，
 * 不希望当前自定义配色残留在 hover 预览上；click 锁定后 hoverThemeId 清空，
 * 重新回到 baseThemeId / custom 的正常路径。
 */
export const activeTheme = computed<Theme>(() => {
  if (hoverThemeId.value) return getTheme(hoverThemeId.value)
  return customTheme.value ?? getTheme(baseThemeId.value)
})

/**
 * 测试钩子：把所有 ref 复位到初始值。tests/setup.ts 在每个 afterEach 调用一次，
 * 避免 spec A 的 baseThemeId='tech-geek' 泄漏给 spec B（state.ts 是模块单例，
 * vitest 进程内共享）。仅供测试代码使用——生产代码不应该 import。
 *
 * 若以后新增 ref，记得加入此处；保留 plain 写法而非 reflection，遗漏会被
 * useDraftLifecycle.spec / themeOrchestrator.spec 等通过断言 default 状态发现。
 */
export function __resetForTest(): void {
  md.value = ''
  baseThemeId.value = 'default'
  hoverThemeId.value = null
  customTheme.value = null
  mobileTab.value = 'editor'
  editorWidth.value = null
}
