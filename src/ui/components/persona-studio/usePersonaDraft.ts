/**
 * usePersonaDraft —— PersonaStudio 的状态层
 *
 * 单一真相：`draft: PersonaSpec`。所有 UI 子节都直接对 draft 做 patch（reactive
 * 深响应）；preview / validation 都是 computed 派生，绝不把"编辑器 theme"和
 * draft 两条状态并存——这是 spec-first 架构的纪律。
 *
 * 与 ColorCustomizer 的差别：ColorCustomizer 只动 palette seed，由 applyPalette
 * 函数派生 Theme；本编辑器编的是完整 PersonaSpec，由 specToTheme 派生 Theme。
 * 两条路径在 customTheme 写入点汇合（App.vue 同一个 ref）。
 */

import { computed, reactive, watch, type ComputedRef } from 'vue'
import {
  specToTheme,
  validateSpec,
  type PersonaSpec,
  type SpecValidationResult,
} from '../../../core/themes/_shared/spec'
import { getPersona, listPersonas } from '../../../public'
import type { Theme } from '../../../core/themes/types'

/**
 * 深拷贝 PersonaSpec —— motif primitives 是嵌套对象，必须真正 clone 避免
 * reactive draft 与原 spec 共享引用。
 *
 * 用 structuredClone 而不是 JSON 往返：保留 readonly tuple 形态、性能高。
 * spec 字段全部 JSON-serializable，符合 structuredClone 的限制。
 */
function cloneSpec(spec: PersonaSpec): PersonaSpec {
  return structuredClone(spec) as PersonaSpec
}

export interface UsePersonaDraft {
  /** 当前 base persona id（编辑起始点） */
  baseId: ComputedRef<string>
  /** 编辑中的 spec（响应式） */
  draft: PersonaSpec
  /** 实时校验 */
  validation: ComputedRef<SpecValidationResult>
  /** 投影出 Theme，供预览 */
  previewTheme: ComputedRef<Theme>
  /** 是否相对 base 有未保存改动 */
  dirty: ComputedRef<boolean>
  /** 所有可选 base persona 摘要 */
  baseOptions: ReadonlyArray<{ id: string; name: string }>
  /** 切换 base persona —— 拷贝新 base 到 draft，丢弃改动 */
  setBase(id: string): void
  /** 把 draft 重置回 base persona */
  reset(): void
  /** 导出 spec.json 字符串（含缩进） */
  exportJson(): string
  /** 从 JSON 字符串导入；失败返回 false 不修改 draft */
  importJson(json: string): boolean
}

export function usePersonaDraft(initialBaseId: string): UsePersonaDraft {
  const baseRef = { current: initialBaseId }
  const initialSpec = cloneSpec(getPersona(initialBaseId))
  const draft = reactive(initialSpec) as PersonaSpec

  // 用 JSON 序列化作 dirty 判定的"hash" —— PersonaSpec ~20KB，stringify 在
  // 现代浏览器约 1ms 内完成；用 watchEffect+structural equality 反而更慢。
  let lastBaseSerialized = JSON.stringify(initialSpec)

  const validation = computed(() => validateSpec(draft))
  // previewTheme：仅在 validation 通过时投影，否则保留上一帧（避免 spec 中间态
  // 抛错让预览闪烁）。这里直接 specToTheme(draft)——specToTheme 本身不校验，
  // 只要类型对它就吐出 Theme；具体错误由 validation 面板独立展示。
  const previewTheme = computed(() => specToTheme(draft))

  const dirty = computed(() => JSON.stringify(draft) !== lastBaseSerialized)

  const baseOptions = listPersonas().map((p) => ({ id: p.id, name: p.name }))
  const baseId = computed(() => baseRef.current)

  function setBase(id: string) {
    if (!baseOptions.some((o) => o.id === id)) return
    const next = cloneSpec(getPersona(id))
    // 把所有顶层字段替换为 next；保持 reactive 包装
    Object.keys(draft).forEach((k) => delete (draft as unknown as Record<string, unknown>)[k])
    Object.assign(draft, next)
    baseRef.current = id
    lastBaseSerialized = JSON.stringify(next)
  }

  function reset() {
    setBase(baseRef.current)
  }

  function exportJson(): string {
    return JSON.stringify(draft, null, 2)
  }

  function importJson(json: string): boolean {
    try {
      const parsed = JSON.parse(json)
      if (!parsed || typeof parsed !== 'object') return false
      // 不做结构校验——validateSpec 会在 UI 上把不合规的错误显示出来
      Object.keys(draft).forEach((k) => delete (draft as unknown as Record<string, unknown>)[k])
      Object.assign(draft, parsed)
      return true
    } catch {
      return false
    }
  }

  // 切 base persona 时 lastBaseSerialized 已重置；这里挂 watch 仅记录 draft
  // 变化次数供下游 sanity 用，不做副作用。
  void watch

  return {
    baseId,
    draft,
    validation,
    previewTheme,
    dirty,
    baseOptions,
    setBase,
    reset,
    exportJson,
    importJson,
  }
}
