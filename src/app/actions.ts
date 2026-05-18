/**
 * 应用级 md 动作 —— 清空 / 载入示例 / 一键修复中文排版 / 应用配色 / 插入模板 / ...
 *
 * 这些动作的共同点：直接读写 src/app/state.ts 的 md / customTheme / hoverThemeId，
 * 在执行成功 / 失败时通过 useDraftLifecycle 的 showUndo / pingTransient 反馈给用户。
 *
 * 为什么提到独立文件而不是 App.vue 顶部：每个 handler 都是"完整事件流"——
 * 校验 + 修改 state + 反馈，自包含；App.vue 里写一长串只让组合根的"装配核心"被淹没。
 * 命名规则：`handleXxx` 表示"用户触发的一次性动作"，与 composable 内部的 internal
 * helper 区分。
 */
import type { Ref } from 'vue'
import {
  baseThemeId,
  customTheme,
  md,
  type Seed,
} from '../ui/state/store'
import { getTheme } from '../core/themes'
import { applyPalette } from '../core/color/applyPalette'
import { fixZhTypoWithRanges } from '../core/pipeline/zhTypo'
import { getSample, getReference, getShowcase } from '../domain/samples'

export interface ActionDeps {
  showUndo: (message: string, onUndo: () => void) => void
  pingTransient: (message: string) => void
  /** 用于读写编辑器选区 / 插入光标处文本；可能在 mount 前为 null */
  editorRef: Ref<{
    insertAtCursor?: (text: string) => void
    getSelectedText?: () => string
    /** F3：在新文档应用后短时高亮一组 post-fix 区间 */
    highlightZhFix?: (ranges: readonly { from: number; to: number }[]) => void
  } | null>
  /** 组件库 palette 实例（保存选区时唤起对话框） */
  paletteRef: Ref<{ openSaveDialog?: (text: string) => void } | null>
  /** UI 抽屉总线（保存选区时需打开 components 面板） */
  ui: { rightSlot: string | null }
}

export function createAppActions(deps: ActionDeps) {
  const { showUndo, pingTransient, editorRef, paletteRef, ui } = deps

  function handleClear() {
    if (!md.value) return
    const prev = md.value
    md.value = ''
    showUndo('已清空正文', () => { md.value = prev })
  }

  function handleLoadSample() {
    const sample = getSample(baseThemeId.value)
    if (md.value === sample) return
    const prev = md.value
    md.value = sample
    if (prev.trim()) {
      showUndo('已载入示例，原正文可撤销', () => { md.value = prev })
    } else {
      pingTransient('已载入示例')
    }
  }

  /**
   * 载入当前主题的"组件参考"文档（由 scripts/build-references.ts 自动生成）。
   *
   * 三档载入按写作场景分工，详见 src/domain/samples/index.ts 头注释：
   *   - handleLoadSample    = 故事样张：~150 行的真文章，主打"决策"
   *   - handleLoadReference = 组件参考：按 category 分章 + 实渲染示例，主打"查阅"
   *   - handleLoadShowcase  = 全功能展示：覆盖所有容器/变体的一稿到底，主打"全景"
   * 三档共享一套撤销 / 提示约定，避免用户切档时丢掉手稿。
   */
  async function handleLoadReference() {
    const reference = await getReference(baseThemeId.value)
    if (!reference || md.value === reference) {
      pingTransient('本主题暂无组件参考')
      return
    }
    const prev = md.value
    md.value = reference
    if (prev.trim()) {
      showUndo('已载入组件参考，原正文可撤销', () => { md.value = prev })
    } else {
      pingTransient('已载入组件参考')
    }
  }

  async function handleLoadShowcase() {
    const showcase = await getShowcase()
    if (!showcase || md.value === showcase) {
      pingTransient('全功能展示稿为空')
      return
    }
    const prev = md.value
    md.value = showcase
    if (prev.trim()) {
      showUndo('已载入全功能展示，原正文可撤销', () => { md.value = prev })
    } else {
      pingTransient('已载入全功能展示')
    }
  }

  /**
   * 一键修复中文排版 —— 扫描并应用 zhTypo 四条规则。
   * 无命中时用瞬时提示"本文已干净"；有命中时写回 md，把"撤销"入口挂到 UndoToast，
   * 并把每条改动在新文本中的位置传给 Editor 短时高亮（F3 diff）。
   */
  function handleFixZhTypo() {
    const prev = md.value
    if (!prev) {
      pingTransient('正文为空')
      return
    }
    const { fixed, ranges } = fixZhTypoWithRanges(prev)
    if (ranges.length === 0) {
      pingTransient('中文排版已干净')
      return
    }
    md.value = fixed
    showUndo(`已修正 ${ranges.length} 处中文排版`, () => { md.value = prev })
    // 等下一个 tick：modelValue 回流到 CM doc 后再下发高亮，确保 ranges 落在最新文本上
    requestAnimationFrame(() => {
      editorRef.value?.highlightZhFix?.(ranges)
    })
  }

  function handleApplyPalette(seed: Seed) {
    const base = getTheme(baseThemeId.value)
    customTheme.value = applyPalette({
      base,
      seed,
      id: `${base.id}--custom`,
      name: `${base.name} · 自定义`,
    })
  }

  function handleResetPalette() {
    if (!customTheme.value) return
    customTheme.value = null
    pingTransient('已还原主题配色')
  }

  function handleInsertTemplate(snippet: string) {
    const inst = editorRef.value
    if (inst && typeof inst.insertAtCursor === 'function') {
      inst.insertAtCursor(snippet)
    } else {
      md.value = `${md.value}${md.value.endsWith('\n') ? '' : '\n'}\n${snippet}`
    }
    pingTransient('已插入')
  }

  function handleSaveSelection() {
    const inst = editorRef.value
    const text = inst?.getSelectedText?.() ?? ''
    if (!text.trim()) {
      pingTransient('先在编辑器中选中一段 markdown')
      return
    }
    if (ui.rightSlot !== 'components') ui.rightSlot = 'components'
    requestAnimationFrame(() => paletteRef.value?.openSaveDialog?.(text))
  }

  return {
    handleClear,
    handleLoadSample,
    handleLoadReference,
    handleLoadShowcase,
    handleFixZhTypo,
    handleApplyPalette,
    handleResetPalette,
    handleInsertTemplate,
    handleSaveSelection,
  }
}
