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
import { computed, watch } from 'vue'
import { render, type RenderOutput } from '../../../core/pipeline'
import type { Theme } from '../../../core/themes/types'
import type { UserVariant } from '../../../core/variants/userVariant'
import type { PatchLog } from '../../../core/pipeline/platforms/types'
import PatchInspector from './PatchInspector.vue'

const props = defineProps<{
  /** 当前草稿 markdown */
  md: string
  /** 渲染所用主题 */
  theme: Theme
  /**
   * 临时注入的用户态变体快照。Studio 编辑场景下，token 面板的实时改动
   * 由父组件按 draft 构造 UserVariantTokens 数组传入，让预览即时反映 token 覆盖。
   * 步骤 4 引入；缺省 = 走原管线。
   */
  userVariants?: readonly UserVariant[]
}>()

const emit = defineEmits<{
  /**
   * 每次成功 render 后透出 patchLog 给父组件，让宽屏布局下 Source/Custom 面板的
   * PatchInspector 复用同一份产物，免去内嵌 IsolatedPreview 的冗余。
   */
  (e: 'patch-log', log: PatchLog | null): void
}>()

/**
 * 渲染产物的完整对象（含 html 与 patchLog），透出给父组件用于 PatchInspector（步骤 6）。
 * render 失败保留上次产物的 placeholder，避免 transient 错误把面板清空。
 */
const renderedOutput = computed<RenderOutput | null>(() => {
  if (!props.md.trim()) return null
  try {
    return render({
      md: props.md,
      theme: props.theme,
      userVariants: props.userVariants,
    })
  } catch {
    return null
  }
})

const rendered = computed<string>(() => renderedOutput.value?.html ?? '')
const patchLog = computed(() => renderedOutput.value?.patchLog ?? null)

// 把 patchLog 透出给父组件——computed 仅在被消费时求值，靠 watch immediate 主动触发首次 emit
watch(patchLog, (log) => emit('patch-log', log), { immediate: true })

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
    <PatchInspector v-if="rendered" :patch-log="patchLog" class="inspector" />
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
  background: var(--preview-frame);
  min-height: 200px;
}
.inspector {
  flex: 0 0 auto;
  margin: var(--sp-2);
  max-height: 200px;
  overflow-y: auto;
}
</style>
