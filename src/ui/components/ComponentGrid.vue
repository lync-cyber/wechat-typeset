<script setup lang="ts">
/**
 * 组件网格 —— 一组 cell 的纯展示组件。
 *
 * 责任分工：
 *   - 渲染 thumbnail + name；hover（桌面）/ ⋯ 展开（触屏）露出 action 按钮
 *   - 不持有 entry 持久状态；click / action 都向上 emit
 *   - 哪些 action 显示，由 props.actions 控制（'delete' / 'edit' / 'derive' / 'share'）
 *
 * 触屏交互（pointer:coarse）：
 *   - 默认隐藏 action 群组，避免多按钮挤在 75×75 缩略图角落造成误点
 *   - 角标 ⋯ 按钮（默认可见）→ 展开本 cell 的 action 群组
 *   - 同一时刻只展开一个 cell（revealedCellId 单值），点其它 cell 主体 = 立刻 select 并收起
 */
import { ref } from 'vue'
import type { ComponentEntry } from '../../domain/components-lib'

export type GridAction = 'delete' | 'edit' | 'derive' | 'share'

const props = defineProps<{
  entries: ReadonlyArray<ComponentEntry>
  /** 每个 cell 上要露出的动作按钮（hover/触屏展开时可见）。空数组 = 仅 click 选中。 */
  actions?: ReadonlyArray<GridAction>
}>()

const emit = defineEmits<{
  (e: 'select', entry: ComponentEntry): void
  (e: 'action', payload: { kind: GridAction; entry: ComponentEntry }): void
}>()

/** 触屏：当前展开 action 群组的 cell id；null = 全部收起 */
const revealedCellId = ref<string | null>(null)

function clickCell(entry: ComponentEntry) {
  // 触屏：如果当前 cell 已展开 action，则收起；再次点同一 cell 才真正 select。
  // 桌面 hover 路径不受影响（actions 由 :hover 显式，revealedCellId 总是 null）。
  if (revealedCellId.value === entry.id) {
    revealedCellId.value = null
    return
  }
  if (revealedCellId.value !== null) {
    // 另一 cell 处于展开态：先收起，不触发 select（避免连点错位）
    revealedCellId.value = null
    return
  }
  emit('select', entry)
}

function toggleReveal(entry: ComponentEntry, ev: Event) {
  ev.stopPropagation()
  revealedCellId.value = revealedCellId.value === entry.id ? null : entry.id
}

function triggerAction(kind: GridAction, entry: ComponentEntry, ev: Event) {
  ev.stopPropagation()
  // 触发 action 后收起群组，与"点击 action 即生效"的预期一致
  revealedCellId.value = null
  emit('action', { kind, entry })
}

function hasActions(): boolean {
  return !!(props.actions && props.actions.length > 0)
}
</script>

<template>
  <div class="grid">
    <button
      v-for="entry in entries"
      :key="entry.id"
      class="cell"
      :class="{ 'is-revealed': revealedCellId === entry.id }"
      :title="entry.description"
      @click="clickCell(entry)"
    >
      <span class="thumb" v-html="entry.thumbnailSvg" />
      <span class="name">{{ entry.name }}</span>
      <!-- 触屏专用：⋯ 展开按钮（@media hover:none 才显示），点击切 revealedCellId -->
      <button
        v-if="hasActions()"
        type="button"
        class="cell-more"
        title="更多操作"
        aria-label="更多操作"
        :aria-expanded="revealedCellId === entry.id"
        @click="toggleReveal(entry, $event)"
      >⋯</button>
      <span v-if="hasActions()" class="cell-actions">
        <button
          v-for="kind in actions"
          :key="kind"
          type="button"
          class="cell-action"
          :class="`cell-action--${kind}`"
          :title="kind === 'delete' ? '删除' : kind === 'edit' ? '编辑' : kind === 'share' ? '复制分享链接' : '派生为我的组件'"
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
  opacity: 0;
  transition: opacity var(--dur-quick) var(--ease-craft);
  pointer-events: none;
}
.cell:hover .cell-actions {
  opacity: 1;
  pointer-events: auto;
}
.cell.is-revealed .cell-actions {
  opacity: 1;
  pointer-events: auto;
}

/* 桌面（hover:hover）：⋯ 按钮隐藏，hover 直接露出 actions */
.cell-more {
  display: none;
}
/* 触屏 / 无 hover 设备：⋯ 按钮常驻角标，点击切 .is-revealed；
 * actions 默认隐藏，避免 75×75 缩略图角落挤 3-4 个按钮造成误点 */
@media (hover: none) {
  .cell-more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2px;
    right: 2px;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: var(--radius-pill);
    background: var(--surface-raised);
    color: var(--text-muted);
    font-size: var(--fs-15);
    line-height: 1;
    cursor: pointer;
    opacity: 0.75;
    transition: var(--t-quick);
  }
  .cell-more:hover,
  .cell.is-revealed .cell-more {
    opacity: 1;
    background: var(--accent-soft);
    color: var(--accent);
  }
  /* 展开 actions 后 ⋯ 让位（被 actions 视觉覆盖），保持视觉简洁 */
  .cell.is-revealed .cell-more {
    visibility: hidden;
  }
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
.cell-action--share  { background: var(--text-muted); }

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .cell-action { width: 32px; height: 32px; font-size: var(--fs-15); }
}
</style>
