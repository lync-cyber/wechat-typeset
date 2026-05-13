<script setup lang="ts">
/**
 * Studio 预览:把当前草稿 markdown 跑 core/pipeline.render,iframe 内静态展示。
 *
 * 与主 Preview.vue 的差异:
 *   - 宽度变小(在 340px drawer 里展示, 内容缩放到约 300px)
 *   - 不展示透明度面板 / patch log(Studio 编辑场景不关心)
 *   - 不订阅滚动联动(不参与全局 scroll sync)
 *   - 允许切换 "Theme 1 / Theme 2 / ..." 预览跨主题效果
 *
 * 主题列表:接 theme prop 作 "当前默认", 加几个跨题主题作可切换选项;
 * 实际跨主题选择由父组件控制(props.theme 切换), 本组件只渲染传入主题。
 */
import { computed } from 'vue'
import { render } from '../../../core/pipeline'
import type { Theme } from '../../../core/themes/types'

const props = defineProps<{
  /** 当前草稿 markdown */
  md: string
  /** 渲染所用主题 */
  theme: Theme
}>()

const rendered = computed(() => {
  if (!props.md.trim()) return ''
  try {
    return render({ md: props.md, theme: props.theme }).html
  } catch {
    return ''
  }
})

const srcdoc = computed(() => {
  if (!rendered.value) return ''
  return `<!doctype html>
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
<div class="phone-viewport">${rendered.value}</div>
</body>
</html>`
})
</script>

<template>
  <div class="preview-shell">
    <div class="preview-meta mono">{{ props.theme.name }} · 预览</div>
    <div v-if="!rendered" class="empty">输入 markdown 后,这里会显示渲染结果。</div>
    <iframe
      v-else
      class="preview-frame"
      :srcdoc="srcdoc"
      sandbox="allow-same-origin"
      title="组件预览"
    />
  </div>
</template>

<style scoped>
.preview-shell {
  width: 100%;
  display: flex; flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  overflow: hidden;
  flex: 1 1 auto;
  min-height: 0;
}
.preview-meta {
  flex: 0 0 auto;
  height: 24px;
  display: flex; align-items: center; justify-content: center;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-subtle);
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border);
  user-select: none;
}
.empty {
  flex: 1 1 auto;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
  font-size: var(--fs-12);
  padding: var(--sp-4);
  text-align: center;
}
.preview-frame {
  flex: 1 1 auto;
  width: 100%;
  border: none;
  background: var(--paper-300);
  min-height: 200px;
}
</style>
