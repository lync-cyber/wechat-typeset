<script setup lang="ts">
/**
 * IsolatedPreview —— SourceModePanel 内嵌的"单 variant 实例"沙盒预览（步骤 5.2）。
 *
 * 与 ComponentPreview.vue 区别：
 *   - ComponentPreview 渲染用户写的整段 markdown（多 fence 多容器）
 *   - 本组件只渲染**一个 variant 实例**——包一段固定占位 markdown，便于用户专注
 *     调试他正在编辑的那条 UV 的视觉效果，主稿件预览不受连带影响
 *
 * 占位 markdown 由父组件传入（SourceModePanel 按 kind/variantId 拼好），缺省给一段
 * 通用 markdown 让 placeholder 至少能展示。
 *
 * iframe 模式：与主 Preview.vue 对齐——SHELL_DOC 常量壳 + innerHTML 注入（不要 srcdoc
 * 重建：scrollTop 归零、闪屏；本组件 viewport 较窄不必受连带影响）。sandbox 只给
 * allow-same-origin，与主预览一致。
 *
 * 错误恢复：pipelineRender 抛错时保留上次 HTML + 在 banner 显示错误（用户改 CSS 改坏
 * 是常态，预览不该清空）。错误清除：下次 render 成功立即覆盖 lastHtml + 清 error。
 */
import { ref, watch, onMounted } from 'vue'
import { render as pipelineRender } from '../../../core/pipeline'
import type { Theme } from '../../../core/themes/types'
import type { UserVariant } from '../../../core/variants/userVariant'
import type { PatchLog } from '../../../core/pipeline/platforms/types'

const props = defineProps<{
  /** 占位 markdown：由父组件按当前编辑 variant 拼好（如 '::: tip variant=uv_preview\n示例\n:::'） */
  placeholderMd: string
  theme: Theme
  /** 当前编辑中的 UV（步骤 5：通常只 1 条 ephemeral preview UV）；空数组 = 仅基底渲染 */
  userVariants?: readonly UserVariant[]
}>()

const emit = defineEmits<{
  /**
   * 每次成功 render 后透出 patchLog 给父组件（让 SourceModePanel 喂给 PatchInspector）。
   * render 失败时不发，保留上次 log（与 lastHtml 保留语义一致）。
   */
  (e: 'patch-log', log: PatchLog | null): void
}>()

const iframeEl = ref<HTMLIFrameElement | null>(null)
const error = ref<string>('')
let shellReady = false
let lastHtml = ''

const SHELL_DOC = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=300, initial-scale=1">
<style>
  html, body {
    margin: 0; padding: 0;
    background: #ececec;
  }
  body {
    display: flex; justify-content: center;
    min-height: 100vh;
  }
  .phone-viewport {
    width: 300px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  }
</style>
</head>
<body>
<div class="phone-viewport"></div>
</body>
</html>`

function renderCurrent(): string | null {
  if (!props.placeholderMd.trim()) return null
  try {
    const out = pipelineRender({
      md: props.placeholderMd,
      theme: props.theme,
      userVariants: props.userVariants,
    })
    error.value = ''
    emit('patch-log', out.patchLog ?? null)
    return out.html
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    return null
  }
}

function applyHtml(html: string): void {
  const doc = iframeEl.value?.contentDocument
  if (!doc) return
  const slot = doc.querySelector('.phone-viewport') as HTMLElement | null
  if (!slot) return
  slot.innerHTML = html
}

function refresh(): void {
  const html = renderCurrent()
  if (html !== null) {
    lastHtml = html
    if (shellReady) applyHtml(html)
  }
  // html === null：保留 lastHtml；banner 已经被 renderCurrent 写错误了
}

function onIframeLoad() {
  shellReady = true
  if (lastHtml) applyHtml(lastHtml)
  else refresh()
}

onMounted(() => {
  // 首次渲染——iframe load 还没触发也无妨，applyHtml 会在 load 之后或 shellReady 时统一执行
  refresh()
})

watch(
  () => [props.placeholderMd, props.theme, props.userVariants],
  () => refresh(),
  { deep: true },
)
</script>

<template>
  <div class="iso-shell">
    <iframe
      ref="iframeEl"
      class="iso-frame"
      :srcdoc="SHELL_DOC"
      sandbox="allow-same-origin"
      title="变体预览"
      @load="onIframeLoad"
    />
    <div v-if="error" class="iso-error" role="alert">
      渲染失败 · {{ error }}（已保留上次有效快照）
    </div>
  </div>
</template>

<style scoped>
.iso-shell {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--preview-frame);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  overflow: hidden;
}
.iso-frame {
  flex: 1 1 auto;
  width: 100%;
  border: none;
  background: var(--preview-frame);
  min-height: 200px;
}
.iso-error {
  flex: 0 0 auto;
  padding: 6px 10px;
  font-size: var(--fs-11);
  color: var(--danger, #b42318);
  background: var(--danger-soft, #fdecea);
  border-top: 1px solid var(--danger, #b42318);
  line-height: 1.4;
}
</style>
