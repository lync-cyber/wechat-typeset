<script setup lang="ts">
/**
 * SearchBox —— `<input type="search">` 通用搜索框
 *
 * R5：HelpPanel（容器速查）/ DraftDrawer（草稿）/ CommandPalette（命令）的搜索 input
 * 样式高度一致——边框 + 圆角 + focus 时主色描边，差别只在 placeholder 文字。本组件
 * 收口该形态。
 *
 * 双向绑定：`v-model` —— 默认绑 modelValue，与 Vue 3 SFC 惯例一致。
 *
 * 暴露：
 *   - `focus()`：父组件可以 ref + onMounted focus（CommandPalette 是典型场景）
 *   - 不暴露 input element 本身，避免父组件直接动 DOM
 *
 * 不做的事：
 *   - 不内建图标——图标在 CommandPalette 是 ⌘ 大字，在 HelpPanel 是无图标，
 *     由父组件按需在 left/right slot 提供
 *   - 不内建 clear 按钮——`type="search"` 浏览器原生有 ✕，跨浏览器一致
 *   - 不接 keydown——CommandPalette 的 ↑↓Enter 导航是命令面板专有，由父组件挂
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
@media (max-width: 767px) {
  /* iOS 防 focus zoom：≥ 16px */
  .search-box--sm,
  .search-box--md {
    font-size: 16px;
  }
}
</style>
