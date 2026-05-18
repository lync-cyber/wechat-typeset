<script setup lang="ts">
/**
 * 组件网格 —— 一组 cell 的纯展示组件。
 *
 * 责任分工：
 *   - 渲染 thumbnail + name；action 按钮（'delete' / 'edit' / 'derive' / 'share'）常驻可见
 *   - 不持有 entry 持久状态；click / action 都向上 emit
 *   - 单击 cell = select（插入）；双击 cell = edit（仅当 actions 含 'edit'）
 */
import type { ComponentEntry } from '../../domain/components-lib'

export type GridAction = 'delete' | 'edit' | 'derive' | 'share'

const props = defineProps<{
  entries: ReadonlyArray<ComponentEntry>
  /** 每个 cell 上要露出的动作按钮。空数组 = 仅 click 选中。 */
  actions?: ReadonlyArray<GridAction>
}>()

const emit = defineEmits<{
  (e: 'select', entry: ComponentEntry): void
  (e: 'action', payload: { kind: GridAction; entry: ComponentEntry }): void
}>()

function clickCell(entry: ComponentEntry) {
  emit('select', entry)
}

function dblClickCell(entry: ComponentEntry, ev: Event) {
  if (!props.actions?.includes('edit')) return
  ev.preventDefault()
  emit('action', { kind: 'edit', entry })
}

function triggerAction(kind: GridAction, entry: ComponentEntry, ev: Event) {
  ev.stopPropagation()
  emit('action', { kind, entry })
}

function hasActions(): boolean {
  return !!(props.actions && props.actions.length > 0)
}

function actionTitle(kind: GridAction): string {
  if (kind === 'delete') return '删除'
  if (kind === 'edit') return '编辑'
  if (kind === 'share') return '复制分享链接'
  return '复制一份到「我的」可编辑'
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
      @dblclick="dblClickCell(entry, $event)"
    >
      <span class="thumb" v-html="entry.thumbnailSvg" />
      <span class="name">{{ entry.name }}</span>
      <span v-if="hasActions()" class="cell-actions">
        <button
          v-for="kind in actions"
          :key="kind"
          type="button"
          class="cell-action"
          :class="`cell-action--${kind}`"
          :title="actionTitle(kind)"
          @click="triggerAction(kind, entry, $event)"
        >
          <template v-if="kind === 'delete'">×</template>
          <template v-else-if="kind === 'edit'">✎</template>
          <template v-else-if="kind === 'share'">↗</template>
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
  pointer-events: auto;
}

.cell-action {
  width: 18px; height: 18px;
  border: none;
  border-radius: var(--radius-pill);
  font-size: var(--fs-13); line-height: 1;
  cursor: pointer;
  color: var(--accent-on);
  display: inline-flex; align-items: center; justify-content: center;
  opacity: 0.85;
  transition: opacity var(--dur-quick) var(--ease-craft);
}
.cell:hover .cell-action,
.cell-action:hover { opacity: 1; }
.cell-action--delete { background: var(--danger); }
.cell-action--edit   { background: var(--text-muted); }
.cell-action--derive { background: var(--accent); }
.cell-action--share  { background: var(--text-muted); }

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .cell-action { width: 32px; height: 32px; font-size: var(--fs-15); }
}
</style>
