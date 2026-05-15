<script setup lang="ts">
/**
 * PanelShell —— 居中 modal 弹层外壳（"全屏 mask + 居中卡片 + click-on-mask 关闭"）。
 *
 * **本组件不覆盖侧面板**（DraftDrawer / ComponentPalette / ColorCustomizer /
 * PublishChecklist）：那些根 className（`.drawer / .palette / .panel`）被 App.vue
 * 的移动端 `:deep(...)` 选择器锁定，统一抽取会牵动一长串移动端 CSS 风险。
 *
 * Esc 关闭：本组件不监听 keydown，由 App.vue 的 useKeyboardShortcuts 统一管。
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** dialog aria-label */
    ariaLabel?: string
    /** 卡片最大宽度（px）；默认 560 与 HelpPanel 历史值一致 */
    maxWidth?: number
    /** 卡片最大高度（vh）；默认 80 与 HelpPanel 历史值一致 */
    maxHeight?: number
    /** mask 顶部对齐还是居中？CommandPalette 历史是 `align-items: flex-start; padding-top: 12vh` */
    align?: 'center' | 'top'
    /** align='top' 时顶部内边距（vh）；默认 12 */
    topPadVh?: number
  }>(),
  {
    maxWidth: 560,
    maxHeight: 80,
    align: 'center',
    topPadVh: 12,
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cardStyle = computed(() => ({
  width: `min(${props.maxWidth}px, 92vw)`,
  maxHeight: `${props.maxHeight}vh`,
}))

const maskClass = computed(() => ['panel-shell-mask', `panel-shell-mask--align-${props.align}`])
const maskStyle = computed(() =>
  props.align === 'top' ? { paddingTop: `${props.topPadVh}vh` } : {},
)
</script>

<template>
  <div :class="maskClass" :style="maskStyle" @click.self="emit('close')">
    <div class="panel-shell-card" role="dialog" :aria-label="ariaLabel" :style="cardStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.panel-shell-mask {
  position: fixed;
  inset: 0;
  background: rgba(14, 14, 10, 0.35);
  display: flex;
  justify-content: center;
  z-index: 100;
}
.panel-shell-mask--align-center {
  align-items: center;
}
.panel-shell-mask--align-top {
  align-items: flex-start;
}
.panel-shell-card {
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--font-text);
  color: var(--text);
}

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  /* 移动端把顶部对齐型 modal 上推（CommandPalette 历史 6vh） */
  .panel-shell-mask--align-top {
    padding-top: 6vh !important;
  }
}
</style>
