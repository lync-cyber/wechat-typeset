/**
 * 把 "md 源码 → 渲染产物" 的链路加防抖（后沿触发，默认 80ms），
 * 避免每次击键都跑完整管线（markdown-it + juice + highlight）。
 *
 * 80ms 阈值：<40ms 快速键入仍触发多次；>150ms 用户感知预览滞后。
 */

import { onBeforeUnmount, ref, watch, type Ref } from 'vue'
import { render as pipelineRender, type RenderInput, type RenderOutput } from '../../core/pipeline'
import { escText } from '../../core/pipeline/containers/_shared/escape'

export interface UseDebouncedRenderOptions {
  delayMs?: number
  immediate?: boolean
  prepareInput?: (input: RenderInput) => Promise<RenderInput>
}

const EMPTY_OUTPUT: RenderOutput = {
  html: '',
  wordCount: 0,
  readingTime: 1,
  patchLog: { entries: [], total: 0 },
  pageConfig: {},
  frontmatterIssues: [],
}

export function useDebouncedRender(
  source: Ref<RenderInput>,
  options: UseDebouncedRenderOptions = {},
): { rendered: Ref<RenderOutput>; flush: () => void | Promise<void> } {
  const delayMs = options.delayMs ?? 80
  const immediate = options.immediate ?? true

  const rendered = ref<RenderOutput>(EMPTY_OUTPUT)
  let timer: number | null = null
  let generation = 0
  let disposed = false
  let flushing: Promise<void> | null = null

  function showError(err: unknown) {
    // eslint-disable-next-line no-console
    console.error('[useDebouncedRender] render failed:', err)
    rendered.value = {
      ...EMPTY_OUTPUT,
      html: `<pre style="color:#c00;padding:16px;white-space:pre-wrap">渲染失败：${escText(String(err))}</pre>`,
    }
  }

  function runRender(input: RenderInput, rethrow = false) {
    try {
      rendered.value = pipelineRender(input)
    } catch (err) {
      showError(err)
      if (rethrow) throw err
    }
  }

  function clearTimer() {
    if (timer === null) return
    window.clearTimeout(timer)
    timer = null
  }

  async function prepareAndRender(input: RenderInput, request: number) {
    try {
      const prepared = await options.prepareInput!(input)
      if (!disposed && request === generation && input === source.value) runRender(prepared)
    } catch (err) {
      if (!disposed && request === generation && input === source.value) showError(err)
    }
  }

  function schedule(input: RenderInput) {
    const request = ++generation
    clearTimer()
    if (flushing || disposed) return
    timer = window.setTimeout(() => {
      timer = null
      if (options.prepareInput) void prepareAndRender(input, request)
      else runRender(input)
    }, delayMs)
  }

  async function flushPrepared() {
    while (!disposed) {
      const input = source.value
      const request = ++generation
      let prepared: RenderInput
      try {
        prepared = await options.prepareInput!(input)
      } catch (err) {
        if (disposed) break
        if (request !== generation || input !== source.value) continue
        showError(err)
        throw err
      }
      if (disposed) break
      if (request !== generation || input !== source.value) continue
      runRender(prepared, true)
      return
    }
    throw new Error('渲染已停止')
  }

  function flush(): void | Promise<void> {
    clearTimer()
    if (!options.prepareInput) {
      ++generation
      if (!disposed) runRender(source.value)
      return
    }
    if (!flushing) flushing = flushPrepared().finally(() => { flushing = null })
    return flushing
  }

  // shallow watch：source 是 computed，依赖变更时整个引用会换；
  // 没必要 deep 遍历 theme.tokens / assets / containers 的整棵树——tokens 内部是不可变的
  // （主题切换会整体替换），每次击键都深度比对是纯浪费。
  watch(
    source,
    (val) => {
      schedule(val)
    },
    { immediate },
  )

  onBeforeUnmount(() => {
    disposed = true
    ++generation
    clearTimer()
  })

  return { rendered, flush }
}
