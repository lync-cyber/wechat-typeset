<script setup lang="ts">
/**
 * 编辑栏 / 预览栏中间的可拖动分隔条
 *
 * 设计约束（与 App.vue 协作）：
 *   - 预览正文保持 375px 视口；拖动只调编辑栏宽度。
 *   - editorWidth === null 时编辑栏走 flex:1 1 auto 默认填充；
 *     为 number 时以该宽度作为编辑栏的 flex-basis。
 *   - 分隔条包含左右间距，总宽与 usePaneSizing 的预留空间一致。
 *   - 双击 / 键盘 Enter → 复位到默认（editorWidth = null）。
 *
 * 移动端（≤767px）不渲染：移动端是 mobileTab 切换，没有分割线。
 *
 * 可访问性：role=separator + aria-orientation=vertical + aria-valuenow，
 * 键盘 ArrowLeft/ArrowRight 步进 24px，PageUp/PageDown 步进 96px。
 *
 * 拖动期间在 body 上挂 .splitter-dragging 类，全局 cursor=col-resize、
 * user-select=none，避免拖过 iframe 时选中文字。
 */
import { computed, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  /** 当前编辑栏像素宽度；null = 默认 flex:1 自适应 */
  width: number | null
  /** 编辑栏最小宽度（再窄不能用），默认 320 */
  min?: number
  /** 编辑栏最大宽度（工作区宽 - 预览栏 - splitter 自身），由父级测量计算 */
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:width', value: number | null): void
}>()

const dragging = ref(false)
const min = computed(() => props.min ?? 320)

function clamp(value: number): number {
  if (props.max !== undefined && value > props.max) return props.max
  if (value < min.value) return min.value
  return value
}

function currentWidth(target: HTMLElement): number {
  if (props.width !== null) return props.width
  // offsetLeft 包含左侧文章库等祖先偏移，不能作为编辑器宽度。
  const width = target.previousElementSibling?.getBoundingClientRect().width ?? 0
  return width > 0 ? width : min.value
}

// --- mouse ---
let startX = 0
let startWidth = 0

function onMouseDown(ev: MouseEvent) {
  // 左键以外忽略——避免右键唤起菜单中途变拖动
  if (ev.button !== 0) return
  ev.preventDefault()
  dragging.value = true
  startX = ev.clientX
  startWidth = currentWidth(ev.currentTarget as HTMLElement)
  document.body.classList.add('splitter-dragging')
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp, { once: true })
}
function onMouseMove(ev: MouseEvent) {
  if (!dragging.value) return
  const delta = ev.clientX - startX
  emit('update:width', clamp(startWidth + delta))
}
function onMouseUp() {
  dragging.value = false
  document.body.classList.remove('splitter-dragging')
  window.removeEventListener('mousemove', onMouseMove)
}

// --- touch（桌面浏览器在触屏笔记本上偶发触发；移动端 CSS 已隐藏）---
let touchStartX = 0
let touchStartWidth = 0
function onTouchStart(ev: TouchEvent) {
  if (ev.touches.length !== 1) return
  dragging.value = true
  touchStartX = ev.touches[0].clientX
  touchStartWidth = currentWidth(ev.currentTarget as HTMLElement)
}
function onTouchMove(ev: TouchEvent) {
  if (!dragging.value || ev.touches.length !== 1) return
  const delta = ev.touches[0].clientX - touchStartX
  emit('update:width', clamp(touchStartWidth + delta))
}
function onTouchEnd() {
  dragging.value = false
}

// --- 双击复位 ---
function onDoubleClick() {
  emit('update:width', null)
}

// --- 键盘 ---
function onKeyDown(ev: KeyboardEvent) {
  let delta = 0
  if (ev.key === 'ArrowLeft') delta = -24
  else if (ev.key === 'ArrowRight') delta = 24
  else if (ev.key === 'PageDown') delta = -96
  else if (ev.key === 'PageUp') delta = 96
  else if (ev.key === 'Home') {
    emit('update:width', min.value)
    ev.preventDefault()
    return
  } else if (ev.key === 'End') {
    if (props.max !== undefined) emit('update:width', props.max)
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
  const base = currentWidth(ev.currentTarget as HTMLElement)
  emit('update:width', clamp(base + delta))
}

onBeforeUnmount(() => {
  // 拖动中组件被销毁的兜底——避免遗留监听器
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  document.body.classList.remove('splitter-dragging')
})
</script>

<template>
  <div
    class="splitter"
    :class="{ dragging }"
    role="separator"
    aria-orientation="vertical"
    aria-label="拖动调整编辑栏宽度（双击恢复默认）"
    :aria-valuenow="props.width ?? undefined"
    :aria-valuemin="min"
    :aria-valuemax="props.max"
    tabindex="0"
    @mousedown="onMouseDown"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @dblclick="onDoubleClick"
    @keydown="onKeyDown"
  >
    <span class="splitter-handle" aria-hidden="true" />
  </div>
</template>

<style scoped>
.splitter {
  flex: 0 0 6px;
  margin-inline: 4px;
  align-self: stretch;
  position: relative;
  cursor: col-resize;
  border-radius: var(--radius-pill);
  background: transparent;
  transition: background var(--dur-quick) var(--ease-craft);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}
.splitter:hover,
.splitter:focus-visible,
.splitter.dragging {
  background: var(--accent-soft);
  outline: none;
}
.splitter:focus-visible {
  box-shadow: var(--focus-ring);
}

/* 居中抓手保持轻量可见，悬停和键盘聚焦时强化。 */
.splitter-handle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 24px;
  border-radius: 1px;
  background: var(--border-strong);
  transition: background var(--dur-quick) var(--ease-craft);
}
.splitter:hover .splitter-handle,
.splitter:focus-visible .splitter-handle,
.splitter.dragging .splitter-handle {
  background: var(--accent);
}

/* 移动端：tab 切换，无 splitter */
@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .splitter { display: none; }
}
</style>
