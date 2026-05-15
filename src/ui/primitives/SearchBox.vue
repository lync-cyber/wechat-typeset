<script setup lang="ts">
/**
 * SearchBox —— `<input type="search">` 通用搜索框，收口 HelpPanel / DraftDrawer /
 * CommandPalette 的"边框 + 圆角 + focus 主色描边"形态。
 *
 * 不做的事：
 *   - 不内建图标——由父组件按需在 left/right slot 提供
 *   - 不内建 clear 按钮——`type="search"` 浏览器原生有 ✕
 *   - 不接 keydown——↑↓Enter 导航是命令面板专有，由父组件挂
 * 暴露 `focus()`，不暴露 input element，避免父组件直接动 DOM。
 */
import { ref } from 'vue'

defineProps<{
  /** v-model 值 */
  modelValue: string
  placeholder?: string
  ariaLabel?: string
  /** 移动端关键：要防 iOS focus zoom，input 字号必须 ≥ 16px。本组件默认已 ≥ 16px */
  size?: 'sm' | 'md'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  focus(): void {
    inputRef.value?.focus()
  },
})
</script>

<template>
  <input
    ref="inputRef"
    type="search"
    class="search-box"
    :class="size === 'sm' ? 'search-box--sm' : 'search-box--md'"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.search-box {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-1);
  outline: none;
}
.search-box:focus {
  border-color: var(--accent);
}
.search-box::placeholder {
  color: var(--text-subtle);
}
.search-box--sm {
  padding: 6px 10px;
  font-size: var(--fs-12);
}
.search-box--md {
  padding: 8px 12px;
  font-size: var(--fs-13);
}
@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  /* iOS 防 focus zoom：≥ 16px */
  .search-box--sm,
  .search-box--md {
    font-size: 16px;
  }
}
</style>
