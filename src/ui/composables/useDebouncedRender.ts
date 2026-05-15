/**
 * 把 "md 源码 → 渲染产物" 的链路加防抖（后沿触发，默认 80ms），
 * 避免每次击键都跑完整管线（markdown-it + juice + highlight）。
 *
 * 80ms 阈值：<40ms 快速键入仍触发多次；>150ms 用户感知预览滞后。
 */

import { onBeforeUnmount, ref, watch, type Ref } from 'vue'
import { render as pipelineRender, type RenderInput, type RenderOutput } from '../../core/pipeline'

export interface UseDebouncedRenderOptions {
  delayMs?: number
  immediate?: boolean
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
): { rendered: Ref<RenderOutput>; flush: () => void } {
  const delayMs = options.delayMs ?? 80
  const immediate = options.immediate ?? true

  const rendered = ref<RenderOutput>(EMPTY_OUTPUT)
  let timer: number | null = null

  function runRender(input: RenderInput) {
    try {
      rendered.value = pipelineRender(input)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[useDebouncedRender] render failed:', err)
      rendered.value = {
        html: `<pre style="color:#c00;padding:16px;white-space:pre-wrap">渲染失败：${escapeHtml(String(err))}</pre>`,
        wordCount: 0,
        readingTime: 1,
        patchLog: { entries: [], total: 0 },
        pageConfig: {},
        frontmatterIssues: [],
      }
    }
  }

  function schedule(input: RenderInput) {
    if (timer !== null) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = null
      runRender(input)
    }, delayMs)
  }

  function flush() {
    if (timer !== null) {
      window.clearTimeout(timer)
      timer = null
    }
    runRender(source.value)
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
    if (timer !== null) {
      window.clearTimeout(timer)
      timer = null
    }
  })

  return { rendered, flush }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
