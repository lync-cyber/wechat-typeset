<script setup lang="ts">
/**
 * PanelHeader —— 面板顶部"标题 + 关闭按钮 + 可选右侧槽"。
 *
 * 样式约定：
 *   - 根元素 `<header class="panel-header">` 是本原语自己的 className，不与
 *     App.vue 的 `:deep(.drawer/.palette/.panel)` 移动端选择器冲突
 *   - 标题字号 / 间距走 tokens（var(--fs-15) 等）
 *
 * Slot：
 *   - default：覆盖标题（h3）；不传则用 `title` prop
 *   - meta：标题与关闭按钮之间的中段（如 DraftDrawer 的草稿计数）
 *   - actions：关闭按钮之外的额外动作（如 ComponentPalette 的"保存选区"）
 */
withDefaults(
  defineProps<{
    /** 标题文字；与 default slot 互斥（slot 优先） */
    title?: string
    /** 无障碍标签：当 title 缺省时给 dialog 上层提供 aria 用 */
    ariaLabel?: string
    /**
     * 标题字号变体。modal 形态（HelpPanel / CommandPalette）用 'md' = 15px；
     * 侧面板（DraftDrawer / ColorCustomizer / PublishChecklist / ComponentPalette）
     * 历史上用 14px——差 1px 是空间紧度区别（侧栏窄，14px 更协调）。
     */
    size?: 'sm' | 'md'
  }>(),
  { size: 'md' },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <header class="panel-header" :class="`panel-header--${size}`" :aria-label="ariaLabel">
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
  font-weight: var(--fw-semibold);
}
.panel-header--md .panel-header__title { font-size: var(--fs-15); }
.panel-header--sm .panel-header__title { font-size: var(--fs-14); }
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

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  /* 移动端关闭按钮达到 44px 触摸目标——侧面板（DraftDrawer 等）无 mask 可点，
     必须保证 close 按钮够大；modal 形态有 mask 兜底但同样不亏。 */
  .panel-header__close {
    min-height: 44px;
    padding: 0 var(--sp-3);
    display: inline-flex;
    align-items: center;
  }
}
</style>
