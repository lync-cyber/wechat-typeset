/**
 * 应用级共享状态
 *
 * R6 之前所有"跨 composable 共享 ref"都挂在 App.vue 的 setup 顶部，命令面板 /
 * 主题 orchestrator / 滚动联动等想读这些值就只能反向被注入，导致 App.vue 充当了
 * 隐式状态容器。本文件把它们提到模块级——单例 ref，约等于一个超轻量 store。
 *
 * 为什么不用 Pinia：单页编辑器规模就这点状态（< 10 个 ref），引入 store 库的样板
 * 远大于直接 `import { md } from './state'`。如果未来加多窗口 / 多 tab，再考虑迁移。
 *
 * 谁可以写 / 读：
 *   - md / baseThemeId / mobileTab：所有 composable + App.vue 都可读写
 *   - hoverThemeId：ThemeStrip 写、activeTheme 读
 *   - customTheme / lastSeed：ColorCustomizer 流写、activeTheme 读
 *   - activeTheme：派生只读 computed，永远不要直接赋值
 *
 * 测试隔离：vitest 每个 spec 默认共享一个模块实例。本 store 没有显式 reset()——
 * tests/unit/* 走的是 pipeline / 容器纯函数测试，不 import 本文件，互不影响。
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
 * Preview 顶部缩略条的 hover 态，临时覆盖 activeTheme；点击锁定后清空。
 *
 * 不持久化——只在内存中。语义上是"瞬时窥探"，与 baseThemeId / customTheme 互斥。
 */
export const hoverThemeId = ref<string | null>(null)

/** 用户在 ColorCustomizer 自定义后派生的 Theme；切 baseThemeId 时重置为 null。 */
export const customTheme = ref<Theme | null>(null)

/** 上一次 apply 的 seed，用于"还原为主题默认" + undo 路径。 */
export const lastSeed = ref<Seed | null>(null)

/** 移动端底部 tabs 当前选中的栏目。 */
export const mobileTab = ref<'editor' | 'preview'>('editor')

/**
 * activeTheme 的三级优先级：
 *   hoverThemeId （ThemeStrip 临时 hover）> customTheme （配色自定义）> baseThemeId （锁定）
 *
 * hover 覆盖 custom：作者悬停另一主题时是想"看一眼同稿换主题什么样"，
 * 不希望当前自定义配色残留在 hover 预览上；click 锁定后 hoverThemeId 清空，
 * 重新回到 baseThemeId / custom 的正常路径。
 */
export const activeTheme = computed<Theme>(() => {
  if (hoverThemeId.value) return getTheme(hoverThemeId.value)
  return customTheme.value ?? getTheme(baseThemeId.value)
})
