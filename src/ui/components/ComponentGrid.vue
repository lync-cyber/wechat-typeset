<script setup lang="ts">
/**
 * 组件网格 —— 一组 cell 的纯展示组件（P3 从 ComponentPalette 提取）。
 *
 * 责任分工：
 *   - 渲染 thumbnail + name；hover 露出 action 按钮
 *   - 不持有任何状态；click / action 都向上 emit
 *   - 哪些 action 显示，由 props.actions 控制（'delete' / 'edit' / 'derive'）
 *
 * 设计纪律：
 *   - 不进行 entry 的 diff / 排序：调用方传什么就显示什么
 *   - 不区分 source（builtin / user）：根据 actions 数组决定按钮显示，让父组件按需配置
 */
import type { ComponentEntry } from '../../domain/components-lib'

export type GridAction = 'delete' | 'edit' | 'derive'

defineProps<{
  entries: ReadonlyArray<ComponentEntry>
  /** 每个 cell 上要露出的动作按钮（hover/触摸时可见）。空数组 = 仅 click 选中。 */
  actions?: ReadonlyArray<GridAction>
}>()

const emit = defineEmits<{
  (e: 'select', entry: ComponentEntry): void
  (e: 'action', payload: { kind: GridAction; entry: ComponentEntry }): void
}>()

function clickCell(entry: ComponentEntry) {
  emit('select', entry)
}

function triggerAction(kind: GridAction, entry: ComponentEntry, ev: Event) {
  ev.stopPropagation()
  emit('action', { kind, entry })
}
</script>

<template>
  <div class="grid">
    <button
      v-for="entry in entries"
      :key="entry.id"
      class="cell"
      :title="entry.description"
      @click="clickCell(entry)"
    >
      <span class="thumb" v-html="entry.thumbnailSvg" />
      <span class="name">{{ entry.name }}</span>
      <span v-if="actions && actions.length > 0" class="cell-actions">
        <button
          v-for="kind in actions"
          :key="kind"
          class="cell-action"
          :class="`cell-action--${kind}`"
          :title="kind === 'delete' ? '删除' : kind === 'edit' ? '编辑' : '派生为我的组件'"
          @click="triggerAction(kind, entry, $event)"
        >
          <template v-if="kind === 'delete'">×</template>
          <template v-else-if="kind === 'edit'">✎</template>
          <template v-else>+</template>
        </button>
      </span>
    </button>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-3);
}
.cell {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  gap: 6px;
  padding: 8px 4px 10px;
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  font-size: var(--fs-11);
  color: var(--text);
  text-align: center;
  transition: var(--t-quick);
}
.cell:hover {
  background: var(--accent-soft); border-color: var(--accent);
}
.thumb { width: 75px; height: 75px; display: block; pointer-events: none; }
.thumb :deep(svg) { width: 75px; height: 75px; display: block; }
.name { line-height: 1.3; word-break: break-word; }

.cell-actions {
  position: absolute; top: 2px; right: 2px;
  display: inline-flex; gap: 2px;
  opacity: 0;
  transition: opacity var(--dur-quick) var(--ease-craft);
}
.cell:hover .cell-actions { opacity: 1; }
@media (hover: none) {
  .cell-actions { opacity: 1; }
}

.cell-action {
  width: 18px; height: 18px;
  border: none;
  border-radius: var(--radius-pill);
  font-size: var(--fs-13); line-height: 1;
  cursor: pointer;
  color: var(--accent-on);
  display: inline-flex; align-items: center; justify-content: center;
}
.cell-action--delete { background: var(--danger); }
.cell-action--edit   { background: var(--text-muted); }
.cell-action--derive { background: var(--accent); }

@media (max-width: 767px) {
  .cell-action { width: 28px; height: 28px; font-size: var(--fs-15); }
}
</style>
