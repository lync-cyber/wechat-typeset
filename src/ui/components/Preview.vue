<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PatchLog } from '../../core/pipeline/platforms/types'

const props = defineProps<{ html: string; patchLog?: PatchLog }>()
const transparencyExpanded = ref(false)

const emit = defineEmits<{
  (e: 'scroll', ratio: number): void
  (e: 'ready'): void
}>()

const iframeEl = ref<HTMLIFrameElement | null>(null)
let shellReady = false

/** 暴露 iframe 元素给父组件（长图导出等场景需要访问 iframe.contentDocument） */
function getIframe(): HTMLIFrameElement | null {
  return iframeEl.value
}

/** 获取 iframe 内的可滚动元素（body） */
function getScroller(): HTMLElement | null {
  return iframeEl.value?.contentDocument?.scrollingElement as HTMLElement
    ?? iframeEl.value?.contentDocument?.documentElement
    ?? null
}

/** 按比例滚动 iframe 内容 */
function scrollToRatio(ratio: number): void {
  const el = getScroller()
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  if (max <= 0) return
  el.scrollTop = Math.max(0, Math.min(max, ratio * max))
}

defineExpose({ getIframe, getScroller, scrollToRatio })

/**
 * 375px 移动端保真预览。
 *
 * 保真不变量：iframe 内 .phone-viewport 与剪贴板 text/html 同源 props.html（juice 已内联）。
 * 注入 CSS 仅命中 html/body/.phone-viewport 三个容器，不污染 .markdown-body。
 * sandbox 只给 allow-same-origin（主题样式即刻生效），不给 allow-scripts（iframe 纯静态）。
 *
 * srcdoc 用常量壳的理由：srcdoc 变更会整体重建 contentDocument（等价 navigation），
 * scrollTop 归零、listener 失效、闪屏。改为外壳一次塞入，props.html 走 innerHTML
 * 注入 .phone-viewport，document 不重建，scrollTop 自然保留。
 */
const SHELL_DOC = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1">
<style>
  /* 外框透明，由宿主 iframe.preview-frame 的 var(--preview-frame) 透出底色；
   * 不要给 html/body 加背景，否则会盖掉父级亮暗切换。 */
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
  }
  body {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  .phone-viewport {
    width: 375px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
    transform-origin: top center;
  }
  /* 当 iframe 宿主窄于 375 时，等比缩放，避免横向滚动 */
  @media (max-width: 374px) {
    body { align-items: flex-start; }
    .phone-viewport { transform: scale(calc(100vw / 375)); transform-origin: top left; }
  }
</style>
</head>
<body>
<div class="phone-viewport"></div>
</body>
</html>`

function applyHtml(): boolean {
  const doc = iframeEl.value?.contentDocument
  if (!doc) return false
  const slot = doc.querySelector('.phone-viewport') as HTMLElement | null
  if (!slot) return false
  slot.innerHTML = props.html
  return true
}

let lastEmit = 0
function onScroll() {
  const el = getScroller()
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  if (max <= 0) return
  const now = Date.now()
  if (now - lastEmit < 16) return
  lastEmit = now
  emit('scroll', el.scrollTop / max)
}

function onIframeLoad() {
  const doc = iframeEl.value?.contentDocument
  if (!doc) return
  // srcdoc 现在是常量壳，理论上只在首次 mount 触发一次 load；
  // 但若宿主重新挂载（HMR / v-if）仍可能再次 load，复位 shellReady 并重新装配。
  shellReady = true
  doc.addEventListener('scroll', onScroll, { passive: true })
  applyHtml()
  emit('ready')
}

// props.html 变更：直接 patch .phone-viewport 的 innerHTML，不重建 document
watch(() => props.html, () => {
  if (shellReady) applyHtml()
})
</script>

<template>
  <div class="preview-shell">
    <div class="preview-meta mono">
      <span class="meta-dot" />
      移动端视口 · 所见即所得
    </div>
    <iframe
      ref="iframeEl"
      class="preview-frame wechat-typeset-preview"
      :srcdoc="SHELL_DOC"
      sandbox="allow-same-origin"
      title="wechat-typeset 预览"
      @load="onIframeLoad"
    />
    <div
      v-if="props.patchLog && props.patchLog.total > 0"
      class="transparency-strip"
      :class="{ expanded: transparencyExpanded }"
    >
      <button
        class="transparency-toggle"
        :aria-expanded="transparencyExpanded"
        @click="transparencyExpanded = !transparencyExpanded"
      >
        <span class="tx-dot" />
        <span class="tx-label">
          渲染透明度 · 本次对 HTML 做了 <b>{{ props.patchLog.total }}</b> 处微信适配
        </span>
        <span class="tx-chev">{{ transparencyExpanded ? '▾' : '▸' }}</span>
      </button>
      <ul v-if="transparencyExpanded" class="transparency-list">
        <li v-for="(entry, i) in props.patchLog.entries" :key="i">
          <span class="tx-entry-label">{{ entry.label }}</span>
          <span class="tx-entry-count">× {{ entry.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.preview-shell {
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--preview-frame);
}
.preview-meta {
  flex: 0 0 auto;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-subtle);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  user-select: none;
}
.meta-dot {
  width: 6px; height: 6px; border-radius: var(--radius-pill);
  background: var(--accent);
  display: inline-block;
}
.preview-frame {
  flex: 1 1 auto;
  width: 100%;
  border: none;
  display: block;
  background: var(--preview-frame);
}

/* 透明度面板：只在有 patch log 时显示，默认折叠为单行 */
.transparency-strip {
  flex: 0 0 auto;
  border-top: 1px solid var(--border);
  background: var(--surface-raised);
  max-height: 220px;
  overflow-y: auto;
}
.transparency-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  font-size: var(--fs-12);
  color: var(--text-muted);
  text-align: left;
}
.transparency-toggle:hover { background: var(--surface); }
.tx-dot {
  width: 6px; height: 6px; border-radius: var(--radius-pill);
  background: var(--text-subtle);
  flex: 0 0 auto;
}
.transparency-strip.expanded .tx-dot { background: var(--accent); }
.tx-label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tx-label b { color: var(--text); font-weight: var(--fw-medium); }
.tx-chev { color: var(--text-subtle); font-size: 10px; flex: 0 0 auto; }
.transparency-list {
  list-style: none;
  padding: 4px 12px 10px;
  margin: 0;
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.transparency-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
  border-bottom: 1px dashed var(--border);
}
.transparency-list li:last-child { border-bottom: none; }
.tx-entry-label { flex: 1 1 auto; }
.tx-entry-count {
  flex: 0 0 auto;
  font-family: var(--font-mono);
  font-feature-settings: var(--font-feat-num);
  color: var(--text);
}
</style>
