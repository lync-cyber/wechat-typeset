<script setup lang="ts">
/**
 * Popover —— dropdown / 工具菜单弹层外壳。形态定位（与 PanelShell 区别）：
 *   - PanelShell：居中 modal，全屏 mask + 暗背景
 *   - Popover：紧贴触发按钮的下拉浮层，无 mask
 *
 * 设计：
 *   - 通过 `anchor` ref 取触发按钮 DOMRect 决定位置（视口 fixed 定位）
 *   - 外部点击关闭：useOutsideClose 监听 mousedown；anchor 算"内部"避免点触发按钮立刻被关
 *   - Esc 关闭：useOutsideClose 已包含
 *   - z-index 50：低于 PanelShell modal (100)，高于 toolbar (auto)
 *
 * 用法：
 *   <button ref="triggerRef" @click="open = !open">主题</button>
 *   <Popover :open="open" :anchor="triggerRef" align="left" @update:open="open = $event">
 *     <ThemePicker v-model="themeId" />
 *   </Popover>
 */
import { computed, ref, watchEffect, type Ref } from 'vue'
import { useOutsideClose } from '../composables/useOutsideClose'

const props = withDefaults(
  defineProps<{
    /** 弹层是否打开 */
    open: boolean
    /** 触发按钮 ref——同时用于定位和"点击在按钮上不关弹层"判定 */
    anchor: Ref<HTMLElement | null> | HTMLElement | null
    /** 对齐方向（相对 anchor 左/右边缘）；默认 'left' */
    align?: 'left' | 'right'
    /** 弹层与 anchor 的垂直间距（px）；默认 6 */
    offset?: number
    /** 弹层宽度（px）；缺省自适应内容 */
    width?: number
  }>(),
  { align: 'left', offset: 6 },
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const popoverEl = ref<HTMLDivElement | null>(null)

function resolveAnchor(): HTMLElement | null {
  if (!props.anchor) return null
  return 'value' in props.anchor ? props.anchor.value : props.anchor
}

const positionStyle = ref<Record<string, string>>({})

watchEffect(() => {
  if (!props.open) return
  const el = resolveAnchor()
  if (!el) return
  const rect = el.getBoundingClientRect()
  const top = rect.bottom + props.offset
  const style: Record<string, string> = {
    position: 'fixed',
    top: `${top}px`,
    zIndex: '50',
  }
  if (props.align === 'left') style.left = `${rect.left}px`
  else style.right = `${window.innerWidth - rect.right}px`
  if (props.width) style.width = `${props.width}px`
  positionStyle.value = style
})

useOutsideClose(
  () => {
    const el = resolveAnchor()
    const pop = popoverEl.value
    return [el, pop].filter((x): x is HTMLElement => !!x)
  },
  () => emit('update:open', false),
  { active: computed(() => props.open) },
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="popoverEl"
      class="popover"
      :style="positionStyle"
      role="dialog"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
.popover {
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-popover, 0 10px 24px -8px rgba(35, 30, 20, 0.18));
  max-width: calc(100vw - 16px);
  max-height: calc(100vh - 16px);
  overflow: auto;
}
</style>
