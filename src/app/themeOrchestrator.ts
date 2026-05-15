/**
 * baseThemeId watcher 的副作用编排。切主题触发 4 条独立副作用：
 *   1. persistThemeId — localStorage 写盘，刷新页面后还原
 *   2. resetCustomThemeWithUndo — 清掉 ColorCustomizer 自定义层，挂 undo
 *   3. autoSwapPristineSample — 若正文还是某主题原样示例，替换为新主题示例
 *   4. persistDraftTheme — 同步活跃草稿的 themeId 字段，避免下次打开漂移
 *
 * 时序耦合：autoSwapPristineSample 必须用 `prev` 而非 `current` 做 pristine 判定，
 * 否则切完之后 md 已更新就永远命中不到。除 persist 外都仅在 `val !== prev` 执行。
 */
import { watch, type Ref } from 'vue'
import { baseThemeId, customTheme, lastSeed, md } from './state'
import { safeWrite } from '../infra/storage/_kv'
import { THEME_STORAGE_KEY } from '../infra/storage/storageKeys'
import { SAMPLE_BY_THEME, getSample } from '../domain/samples'
import { updateDraft } from '../infra/storage/drafts'

function persistThemeId(val: string) {
  safeWrite(THEME_STORAGE_KEY, val)
}

/**
 * 切主题时若 customTheme 存在，把它和 seed 清空并挂 undo——用户可以一键回到上一个
 * 主题 + 上一份自定义配色。Toast 文案显式说"已重置自定义配色"，避免暗箱。
 *
 * undo restore 里要先置 suppressOnce=true 再写 baseThemeId.value=prev——否则本
 * watcher 会被自己的赋值再触发一遍，导致：
 *   1. autoSwapPristineSample(prev) 把 md 换回 prev 主题的 sample，破坏 undo 语义
 *   2. persistDraftTheme 把 draftIndexTick 多 bump 一次，UI 抖动
 *   3. resetCustomThemeWithUndo 因 customTheme 还没 restore 完为 null 而短路（侥幸
 *      不出 bug），但语义上仍是"undo 触发了一次完整副作用链"——脆弱。
 */
function resetCustomThemeWithUndo(
  prev: string,
  showUndo: (msg: string, undo: () => void) => void,
) {
  if (!customTheme.value) return
  const prevCustom = customTheme.value
  const prevSeed = lastSeed.value
  customTheme.value = null
  lastSeed.value = null
  showUndo('已切换主题并重置自定义配色', () => {
    suppressOnce = true
    baseThemeId.value = prev
    customTheme.value = prevCustom
    lastSeed.value = prevSeed
  })
}

/**
 * 正文还停在"任意主题的示例"（用户没动过）就自动换成新主题的示例；已经输入过内容则保留，
 * 避免覆盖用户草稿。
 *
 * 不只比对 prev 那一个样本——考虑两类场景：
 *   1. 用户首次打开 → 自动创建 default 示例 → 切到 tech-geek：旧实现里因 md.value
 *      恰好等于 getSample('default') 能 swap；但若 sample 内容刚刚更新（比如新增容器）
 *      而用户的草稿正文仍按老版 default 样本入库，会导致切主题后保持老文案。
 *   2. 用户自己选了"载入 B 主题示例"后，再切到 C 主题：旧实现要求 md.value ==
 *      getSample(B) 但 prev 是 B 之前的那个主题——条件永远不成立，用户被迫再次手动
 *      "载入当前主题示例"。
 * 改为"命中任意主题 sample"即视作 pristine，主题切换自动跟随。
 *
 * 两侧都 `replace(/\r\n/g, '\n')` 归一：生成器已经规范化为 LF，但编辑器 /
 * 草稿存储 / 剪贴板粘贴任意一环若未来再引入 CRLF，仍能命中 pristine 判断。
 */
function autoSwapPristineSample(val: string) {
  const current = md.value.replace(/\r\n/g, '\n')
  const isPristineSample = Object.values(SAMPLE_BY_THEME).some(
    (s) => s.replace(/\r\n/g, '\n') === current,
  )
  if (isPristineSample) md.value = getSample(val)
}

function persistDraftTheme(
  val: string,
  activeDraftId: Ref<string | null>,
  draftIndexTick: Ref<number>,
) {
  if (!activeDraftId.value) return
  updateDraft(activeDraftId.value, { themeId: val })
  draftIndexTick.value += 1
}

export interface UseThemeOrchestratorDeps {
  showUndo: (message: string, onUndo: () => void) => void
  activeDraftId: Ref<string | null>
  draftIndexTick: Ref<number>
}

/**
 * 模块级 suppressOnce 旗：undo restore 路径写回 baseThemeId 时置 true，
 * watcher 入口检查并跳过本次副作用链。persistThemeId 例外——localStorage 仍要
 * 跟着 baseThemeId 走，否则 undo 后刷新页面会丢主题。
 *
 * 不在 useThemeOrchestrator 闭包内：showUndo 的 callback 在 orchestrator setup
 * 阶段之外才被调用，但闭包 + 模块级单例 ref 行为一致——baseThemeId 是单例，
 * suppressOnce 也应为单例（同进程下只有一个 orchestrator 实例）。
 */
let suppressOnce = false

export function useThemeOrchestrator(deps: UseThemeOrchestratorDeps) {
  watch(baseThemeId, (val, prev) => {
    persistThemeId(val)
    if (suppressOnce) {
      suppressOnce = false
      return
    }
    if (val === prev) return
    resetCustomThemeWithUndo(prev, deps.showUndo)
    autoSwapPristineSample(val)
    persistDraftTheme(val, deps.activeDraftId, deps.draftIndexTick)
  })
}
