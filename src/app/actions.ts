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
  lastSeed,
  md,
  type Seed,
} from './state'
import { getTheme } from '../core/themes'
import { applyPalette } from '../core/color/applyPalette'
import { fixZhTypo, scanZhTypo } from '../core/pipeline/zhTypo'
import { getSample } from '../domain/samples'

export interface ActionDeps {
  showUndo: (message: string, onUndo: () => void) => void
  pingTransient: (message: string) => void
  /** 用于读写编辑器选区 / 插入光标处文本；可能在 mount 前为 null */
  editorRef: Ref<{
    insertAtCursor?: (text: string) => void
    getSelectedText?: () => string
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
   * 一键修复中文排版 —— 扫描并应用 zhTypo 四条规则。
   * 无命中时用瞬时提示"本文已干净"；有命中时写回 md 并把"撤销"入口挂到 UndoToast。
   */
  function handleFixZhTypo() {
    const prev = md.value
    if (!prev) {
      pingTransient('正文为空')
      return
    }
    const hits = scanZhTypo(prev)
    if (hits.length === 0) {
      pingTransient('中文排版已干净')
      return
    }
    md.value = fixZhTypo(prev)
    showUndo(`已修正 ${hits.length} 处中文排版`, () => { md.value = prev })
  }

  function handleApplyPalette(seed: Seed) {
    const base = getTheme(baseThemeId.value)
    customTheme.value = applyPalette({
      base,
      seed,
      id: `${base.id}--custom`,
      name: `${base.name} · 自定义`,
    })
    lastSeed.value = { ...seed }
  }

  function handleResetPalette() {
    if (!customTheme.value) return
    customTheme.value = null
    lastSeed.value = null
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
    handleFixZhTypo,
    handleApplyPalette,
    handleResetPalette,
    handleInsertTemplate,
    handleSaveSelection,
  }
}
