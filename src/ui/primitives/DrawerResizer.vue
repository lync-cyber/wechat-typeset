<script setup lang="ts">
/**
 * 右侧抽屉左缘的可拖动加宽手柄
 *
 * 与 PaneSplitter.vue 的差异：方向相反——抽屉在视口右侧，向左拖手柄让抽屉变宽，
 * 因此 delta 是 `startX - currentX`（而不是 `currentX - startX`）。
 *
 * 用法约定：父组件持 width 状态（number | null），把手柄渲染在抽屉根 DOM 的最左侧，
 * width === null 时父组件回退到 CSS 默认变量（如 --drawer-w-sm）。
 *
 * 移动端（≤767px / pointer:coarse）不渲染：移动端抽屉走全屏 sheet 覆盖，无可拖空间。
 *
 * 可访问性：role=separator + aria-orientation=vertical + aria-valuenow，
 * 键盘 ArrowLeft 加宽 24px / ArrowRight 缩窄 24px，PageUp/PageDown 96px，
 * Home → max，End → min，Enter / Space → 复位到 null。
 *
 * 拖动期间在 body 上挂 .splitter-dragging 类，复用 PaneSplitter 已有的全局
 * cursor:col-resize + user-select:none 规则（见 src/ui/components.css 或全局样式）。
 */
import { computed, onBeforeUnmount } from 'vue'

const props = defineProps<{
  /** 当前抽屉像素宽度；null = 用 CSS 默认变量 */
  width: number | null
  /** 最小宽度；默认 300 */
  min?: number
  /** 最大宽度（由父级根据 viewport 算）；缺省不限制 */
  max?: number
  /** 当 width === null 时，drag 起步用什么值作为基准（一般 = 抽屉默认像素宽） */
  defaultWidth: number
}>()

const emit = defineEmits<{
  (e: 'update:width', value: number | null): void
}>()

const min = computed(() => props.min ?? 300)

function clamp(value: number): number {
  if (props.max !== undefined && value > props.max) return props.max
  if (value < min.value) return min.value
  return value
}

// --- mouse ---
let startX = 0
let startWidth = 0

function onMouseDown(ev: MouseEvent) {
  if (ev.button !== 0) return
  ev.preventDefault()
  startX = ev.clientX
  startWidth = props.width ?? props.defaultWidth
  document.body.classList.add('splitter-dragging')
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp, { once: true })
}
function onMouseMove(ev: MouseEvent) {
  // 抽屉在右侧：向左拖（clientX 变小）= 加宽
  const delta = startX - ev.clientX
  emit('update:width', clamp(startWidth + delta))
}
function onMouseUp() {
  document.body.classList.remove('splitter-dragging')
  window.removeEventListener('mousemove', onMouseMove)
}

// --- touch ---
let touchStartX = 0
let touchStartWidth = 0
function onTouchStart(ev: TouchEvent) {
  if (ev.touches.length !== 1) return
  touchStartX = ev.touches[0].clientX
  touchStartWidth = props.width ?? props.defaultWidth
}
function onTouchMove(ev: TouchEvent) {
  if (ev.touches.length !== 1) return
  const delta = touchStartX - ev.touches[0].clientX
  emit('update:width', clamp(touchStartWidth + delta))
}

// --- 双击复位 ---
function onDoubleClick() {
  emit('update:width', null)
}

// --- 键盘 ---
function onKeyDown(ev: KeyboardEvent) {
  let delta = 0
  if (ev.key === 'ArrowLeft') delta = 24
  else if (ev.key === 'ArrowRight') delta = -24
  else if (ev.key === 'PageUp') delta = 96
  else if (ev.key === 'PageDown') delta = -96
  else if (ev.key === 'Home') {
    if (props.max !== undefined) emit('update:width', props.max)
    ev.preventDefault()
    return
  } else if (ev.key === 'End') {
    emit('update:width', min.value)
    ev.preventDefault()
    return
  } else if (ev.key === 'Enter' || ev.key === ' ') {
    emit('update:width', null)
    ev.preventDefault()
    return
  } else {
    return
  }
  ev.preventDefault()
  const base = props.width ?? props.defaultWidth
  emit('update:width', clamp(base + delta))
}

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.body.classList.remove('splitter-dragging')
})
</script>

<template>
  <div
    class="drawer-resizer"
    role="separator"
    aria-orientation="vertical"
    aria-label="拖动加宽抽屉（双击恢复默认）"
    :aria-valuenow="props.width ?? undefined"
    :aria-valuemin="min"
    :aria-valuemax="props.max"
    tabindex="0"
    @mousedown="onMouseDown"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="() => {}"
    @dblclick="onDoubleClick"
    @keydown="onKeyDown"
  >
    <span class="drawer-resizer-handle" aria-hidden="true" />
  </div>
</template>

<style scoped>
.drawer-resizer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 6px;
  margin-left: -3px;
  z-index: 5;
  cursor: col-resize;
  background: transparent;
  transition: background var(--dur-quick) var(--ease-craft);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  outline: none;
}
.drawer-resizer:hover,
.drawer-resizer:focus-visible {
  background: var(--accent-soft);
}
.drawer-resizer:focus-visible {
  box-shadow: var(--focus-ring);
}

.drawer-resizer-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 36px;
  border-radius: 1px;
  background: transparent;
  transition: background var(--dur-quick) var(--ease-craft);
}
.drawer-resizer:hover .drawer-resizer-handle,
.drawer-resizer:focus-visible .drawer-resizer-handle {
  background: var(--accent);
}

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .drawer-resizer { display: none; }
}
</style>
