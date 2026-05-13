<script setup lang="ts">
/**
 * PanelHeader —— 面板顶部"标题 + 关闭按钮 + 可选右侧槽"
 *
 * R5：HelpPanel / DraftDrawer / ComponentPalette / ColorCustomizer / PublishChecklist
 * 各自实现的 `<header class="*-head">` 结构高度相似：左侧 h3 标题 + 右侧"关闭"按钮，
 * 中间偶有副信息或操作。本组件收口该形态。
 *
 * 样式约定：
 *   - 根元素 `<header class="panel-header">` —— 这是本原语自己的 className，不与
 *     App.vue 的 `:deep(.drawer/.palette/.panel)` mobile 选择器冲突（那些指根容器，
 *     本组件是子级 header）
 *   - 标题字号 / 间距走 tokens（var(--fs-15) 等），与原 6 处实现像素级一致
 *   - 关闭按钮文字"关闭"——与现有 HelpPanel / DraftDrawer 一致；
 *     需要图标按钮的场景未来加 prop（YAGNI）
 *
 * Slot：
 *   - default：覆盖标题（h3）；不传则用 `title` prop
 *   - meta：标题与关闭按钮之间的中段（如 DraftDrawer 的草稿计数 / quota 指示）
 *   - actions：关闭按钮之外的额外动作按钮（如 ComponentPalette 的"保存选区"）
 */
defineProps<{
  /** 标题文字；与 default slot 互斥（slot 优先） */
  title?: string
  /** 无障碍标签：当 title 缺省时给 dialog 上层提供 aria 用 */
  ariaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <header class="panel-header" :aria-label="ariaLabel">
    <slot>
      <h3 class="panel-header__title tx-section">{{ title }}</h3>
    </slot>
    <span class="panel-header__meta">
      <slot name="meta" />
    </span>
    <span class="panel-header__actions">
      <slot name="actions" />
      <button class="panel-header__close btn-text" type="button" @click="emit('close')">关闭</button>
    </span>
  </header>
</template>

<style scoped>
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
  flex: 0 0 auto;
}
.panel-header__title {
  margin: 0;
  font-size: var(--fs-15);
  font-weight: var(--fw-semibold);
}
.panel-header__meta {
  flex: 1 1 auto;
  min-width: 0;
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.panel-header__meta:empty {
  display: none;
}
.panel-header__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  flex: 0 0 auto;
}
.panel-header__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: var(--fs-12);
  font-family: inherit;
}
.panel-header__close:hover {
  color: var(--text);
}
</style>
