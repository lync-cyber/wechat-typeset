<script setup lang="ts">
/**
 * 破坏性动作的撤销 toast
 *
 * 用法：父组件把被删掉的东西缓存起来，传 message + onUndo 给本组件；
 * 4 秒窗口内点"撤销"就还原。不阻塞用户继续操作。
 */
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps<{
  message: string
  duration?: number
}>()

const emit = defineEmits<{
  (e: 'undo'): void
  (e: 'expire'): void
}>()

let timer: number | null = null

onMounted(() => {
  timer = window.setTimeout(() => emit('expire'), props.duration ?? 4000)
})

onBeforeUnmount(() => {
  if (timer !== null) window.clearTimeout(timer)
})

function undo() {
  if (timer !== null) window.clearTimeout(timer)
  emit('undo')
}
</script>

<template>
  <div class="toast" role="status">
    <span class="toast-msg">{{ props.message }}</span>
    <button class="toast-undo" @click="undo">撤销</button>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: var(--sp-6);
  transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: var(--sp-4);
  padding: var(--sp-3) var(--sp-4) var(--sp-3) var(--sp-5);
  background: var(--ink-500);
  color: var(--paper-50);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  z-index: 90;
  animation: toast-in var(--dur-settled) var(--ease-craft);
}
@keyframes toast-in {
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.toast-msg { max-width: 60vw; }
.toast-undo {
  background: transparent;
  color: var(--proof-200);
  border: 1px solid var(--proof-400);
  border-radius: var(--radius-1);
  padding: 2px var(--sp-3);
  font-size: var(--fs-12);
  cursor: pointer;
  font-family: inherit;
  transition: var(--t-quick);
}
.toast-undo:hover { background: var(--proof-500); color: var(--paper-50); border-color: var(--proof-500); }
</style>
