/**
 * baseThemeId watcher 的副作用编排
 *
 * 切主题这一动作会触发 4 条独立副作用，原本挤在 App.vue 的一个 watch 回调里 ~40
 * 行难以单独读懂。R6 把每条拆成命名函数，组合根只负责连线。每条说明了"为什么这件
 * 事必须发生"，因为时序耦合不是显式的——例如自动换 sample 必须用 `prev` 而非
 * `current` 做比对，否则切完之后 md 已经更新就永远命中不到 pristine 判定。
 *
 * 4 条副作用（按当前执行顺序）：
 *   1. persistThemeId — localStorage 写盘，刷新页面后还原
 *   2. resetCustomThemeWithUndo — 切主题时把 ColorCustomizer 的自定义层清掉，挂 undo
 *   3. autoSwapPristineSample — 若正文还是某主题的原样示例，替换为新主题示例
 *   4. persistDraftTheme — 把当前活跃草稿的 themeId 字段也更新，避免下次打开漂移
 *
 * 这 4 条都仅在 `val !== prev` 时执行（persist 例外，首次 init 也写）。
 */
import { watch, type Ref } from 'vue'
import { baseThemeId, customTheme, lastSeed, md } from './state'
import { safeWrite } from '../infra/storage/_kv'
import { SAMPLE_BY_THEME, getSample } from '../domain/samples'
import { updateDraft } from '../infra/storage/drafts'

const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'

function persistThemeId(val: string) {
  safeWrite(THEME_STORAGE_KEY, val)
}

/**
 * 切主题时若 customTheme 存在，把它和 seed 清空并挂 undo——用户可以一键回到上一个
 * 主题 + 上一份自定义配色。Toast 文案显式说"已重置自定义配色"，避免暗箱。
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

export function useThemeOrchestrator(deps: UseThemeOrchestratorDeps) {
  watch(baseThemeId, (val, prev) => {
    persistThemeId(val)
    if (val === prev) return
    resetCustomThemeWithUndo(prev, deps.showUndo)
    autoSwapPristineSample(val)
    persistDraftTheme(val, deps.activeDraftId, deps.draftIndexTick)
  })
}
