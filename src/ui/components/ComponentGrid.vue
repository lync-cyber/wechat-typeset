<script setup lang="ts">
/**
 * 组件网格 —— 一组 cell 的纯展示组件。
 *
 * 责任分工：
 *   - 渲染 thumbnail + name；action 按钮（'delete' / 'edit' / 'derive' / 'share'）常驻可见
 *   - 不持有 entry 持久状态；click / action 都向上 emit
 *   - 单击 cell = select（插入）；双击 cell = edit（仅当 actions 含 'edit'）
 *
 * Hover 真实样式预览：
 *   - 鼠标 hover cell 时弹出 popover 跑 markdownSnippet → 当前主题真实渲染（共享 iframe，
 *     不每个 cell 一个）
 *   - 触屏（pointer: coarse）不启用 hover preview——hover 在触屏上语义不可信
 *   - enter 80ms / leave 150ms 防抖，鼠标快速划过 grid 不会闪烁挂载 / 卸载
 *   - 首次 hover 才挂载 IsolatedPreview（避免空 grid 也付 iframe 启动成本），之后保持
 *     挂载只切 props（不重复 iframe 加载）
 */
import { computed, defineAsyncComponent, onBeforeUnmount, ref } from 'vue'
import type { ComponentEntry } from '../../domain/components-lib'
import type { Theme } from '../../core/themes/types'
import { computePopoverPlacement } from './popoverPlacement'

export type GridAction = 'delete' | 'edit' | 'derive' | 'share'

// IsolatedPreview 携带 pipeline render —— 懒载让"不 hover 的会话"完全免费
const IsolatedPreview = defineAsyncComponent(
  () => import('./component-studio/IsolatedPreview.vue'),
)

const props = defineProps<{
  entries: ReadonlyArray<ComponentEntry>
  /**
   * 当前主题——hover popover 用它跑真实样式渲染。未传则不显示 popover（向后兼容旧
   * 调用点，但 ComponentPalette 现在恒传）
   */
  theme?: Theme
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

// ─────────────────────────────────────────────────────────────
// hover 真实样式预览
// ─────────────────────────────────────────────────────────────

const POPOVER_WIDTH = 320
const POPOVER_HEIGHT = 280

interface PopoverState {
  entry: ComponentEntry
  left: number
  top: number
}

const popover = ref<PopoverState | null>(null)
// 首次 hover 才挂载 IsolatedPreview；之后保持挂载，仅切 props
const previewMounted = ref<boolean>(false)
let enterTimer: number | null = null
let leaveTimer: number | null = null

const popoverStyle = computed(() => {
  if (!popover.value) return undefined
  return {
    left: popover.value.left + 'px',
    top: popover.value.top + 'px',
    width: POPOVER_WIDTH + 'px',
    height: POPOVER_HEIGHT + 'px',
  }
})

function clearTimers(): void {
  if (enterTimer != null) {
    window.clearTimeout(enterTimer)
    enterTimer = null
  }
  if (leaveTimer != null) {
    window.clearTimeout(leaveTimer)
    leaveTimer = null
  }
}

function previewEnabled(): boolean {
  if (!props.theme) return false
  // 触屏：hover 语义不可信（多数浏览器 tap 后 lingering hover），直接禁用
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

function onCellEnter(entry: ComponentEntry, ev: MouseEvent): void {
  if (!previewEnabled()) return
  clearTimers()
  const target = ev.currentTarget as HTMLElement | null
  if (!target) return
  enterTimer = window.setTimeout(() => {
    enterTimer = null
    const rect = target.getBoundingClientRect()
    const placement = computePopoverPlacement(
      rect,
      { width: window.innerWidth, height: window.innerHeight },
      { width: POPOVER_WIDTH, height: POPOVER_HEIGHT },
    )
    popover.value = { entry, left: placement.left, top: placement.top }
    previewMounted.value = true
  }, 80)
}

function onCellLeave(): void {
  if (!previewEnabled()) return
  if (enterTimer != null) {
    window.clearTimeout(enterTimer)
    enterTimer = null
  }
  if (leaveTimer != null) window.clearTimeout(leaveTimer)
  leaveTimer = window.setTimeout(() => {
    leaveTimer = null
    popover.value = null
  }, 150)
}

onBeforeUnmount(() => {
  clearTimers()
})
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
      @mouseenter="onCellEnter(entry, $event)"
      @mouseleave="onCellLeave"
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

  <Teleport v-if="previewMounted && props.theme" to="body">
    <div
      v-show="popover"
      class="cell-preview-popover"
      :style="popoverStyle"
      role="tooltip"
      aria-hidden="true"
    >
      <div class="cell-preview-meta">{{ popover?.entry.name }} · {{ props.theme.name }}</div>
      <div class="cell-preview-frame">
        <IsolatedPreview
          v-if="popover"
          :placeholder-md="popover.entry.markdownSnippet"
          :theme="props.theme"
        />
      </div>
    </div>
  </Teleport>
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

/* hover popover：Teleport 到 body，避免被抽屉 / 滚动容器 overflow 裁剪。
 * z-index 101 略高于 ComponentStudio mask 的 100，确保 Studio 打开期间继续可见——
 * 实际用例里 Studio 打开时 grid 不可交互，但 hover 边界 case 也不要遮挡。 */
.cell-preview-popover {
  position: fixed;
  z-index: 101;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: none;
  animation: cell-preview-in 120ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.cell-preview-meta {
  flex: 0 0 auto;
  height: 22px;
  display: flex; align-items: center; justify-content: center;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-subtle);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-text);
}
.cell-preview-frame {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}
/* IsolatedPreview 内部是 100% 宽高的 .iso-shell；让它在 popover 里占满
 * 剩余空间，并去掉重复的圆角边框（popover 自己已有） */
.cell-preview-frame :deep(.iso-shell) {
  border: none;
  border-radius: 0;
}
@keyframes cell-preview-in {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}
</style>
