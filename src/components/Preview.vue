<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PatchLog } from '../pipeline/wxPatch'

const props = defineProps<{ html: string; patchLog?: PatchLog }>()
const transparencyExpanded = ref(false)

const emit = defineEmits<{
  (e: 'scroll', ratio: number): void
  (e: 'ready'): void
}>()

const iframeEl = ref<HTMLIFrameElement | null>(null)

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
 * 375px 移动端保真预览
 *
 * 保真不变量（原则 1）：
 *   iframe 内的 .phone-viewport 内容与剪贴板 text/html 一字不差——
 *   都来自同一份 props.html（已经 juice 内联过）。
 *
 * 关于 iframe 内注入的那点 CSS：
 *   仅作用于三个容器节点（html / body / .phone-viewport），
 *   **不会选中 .markdown-body 或其任何子元素**，因此不会"污染"内容样式。
 *
 * sandbox="allow-same-origin"：
 *   - 允许 iframe 与宿主同源，便于主题样式（已内联）即刻生效
 *   - 不加 allow-scripts：iframe 内不执行任何 JS，纯静态渲染
 */
const srcdoc = computed(() => {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1">
<style>
  /* —— 外框层，只作用于容器节点；不染指 .markdown-body —— */
  html, body {
    margin: 0;
    padding: 0;
    background: #ececec;
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
<div class="phone-viewport">${props.html}</div>
</body>
</html>`
})

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
  // iframe 每次 srcdoc 更新会重建 document，需重新绑定滚动监听
  doc.removeEventListener('scroll', onScroll)
  doc.addEventListener('scroll', onScroll, { passive: true })
  emit('ready')
}
</script>

<template>
  <div class="preview-shell">
    <div class="preview-meta mono">
      <span class="meta-dot" />
      移动端视口 · 所见即所得
    </div>
    <iframe
      ref="iframeEl"
      class="preview-frame wx-md-preview"
      :srcdoc="srcdoc"
      sandbox="allow-same-origin"
      title="wx-md 预览"
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
  background: var(--paper-300);
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
  background: var(--paper-300);
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
