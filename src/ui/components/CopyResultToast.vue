<script setup lang="ts">
/**
 * 复制成功后的"行动 toast"——区别于 UndoToast 的"撤销 toast"。
 *
 * 设计动机：
 *   - 复制成功后，作者的下一步是切到 mp.weixin.qq.com 粘贴。把这一步做成 toast 内
 *     的 next-action CTA，工作流闭环 1 次点击省下 1 次切应用 + 找标签的摩擦。
 *   - 顺便把"图片/外链处理摘要"显式呈现（之前隐在顶栏 1.5s 的 transient label 里
 *     很难注意到），让作者对降级行为可见。
 *
 * 与 UndoToast 的关系：复制成功路径不会同时触发 Undo，但若用户连点 / 复制后立刻
 * 清空，两者可能同时挂载。CSS 上 CopyResultToast 上移一格（bottom + 56px），避免
 * 视觉叠压。
 */
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps<{
  /** 主信息，如"已复制到剪贴板" */
  message: string
  /** 摘要细节，按 chip 排列展示 */
  details?: string[]
  /** 主行动 CTA；缺省时不渲染 */
  cta?: { label: string; url: string }
  /** 自动关闭毫秒数，默认 6000 */
  duration?: number
}>()

const emit = defineEmits<{
  (e: 'dismiss'): void
}>()

let timer: number | null = null

onMounted(() => {
  timer = window.setTimeout(() => emit('dismiss'), props.duration ?? 6000)
})

onBeforeUnmount(() => {
  if (timer !== null) window.clearTimeout(timer)
})

function openCta() {
  if (!props.cta) return
  // noopener: 避免被打开的页面通过 window.opener 反向操作本页
  window.open(props.cta.url, '_blank', 'noopener,noreferrer')
  emit('dismiss')
}

function dismiss() {
  emit('dismiss')
}
</script>

<template>
  <div class="copy-toast" role="status">
    <div class="copy-toast-body">
      <span class="copy-toast-glyph" aria-hidden="true">✓</span>
      <div class="copy-toast-text">
        <span class="copy-toast-msg">{{ props.message }}</span>
        <span v-if="props.details && props.details.length > 0" class="copy-toast-chips">
          <span v-for="(d, i) in props.details" :key="i" class="copy-toast-chip">{{ d }}</span>
        </span>
      </div>
    </div>
    <div class="copy-toast-actions">
      <button
        v-if="props.cta"
        class="copy-toast-cta"
        type="button"
        @click="openCta"
      >{{ props.cta.label }} →</button>
      <button class="copy-toast-close" type="button" aria-label="关闭" @click="dismiss">×</button>
    </div>
  </div>
</template>

<style scoped>
.copy-toast {
  position: fixed;
  left: 50%;
  bottom: calc(var(--sp-6) + 60px);
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: var(--sp-4);
  max-width: min(92vw, 560px);
  padding: var(--sp-3) var(--sp-3) var(--sp-3) var(--sp-4);
  background: var(--ink-500);
  color: var(--paper-50);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  z-index: 92;
  animation: copy-toast-in var(--dur-settled) var(--ease-craft);
}
@keyframes copy-toast-in {
  from { opacity: 0; transform: translate(-50%, 8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.copy-toast-body {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-3);
  min-width: 0;
}
.copy-toast-glyph {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px;
  border-radius: var(--radius-pill);
  background: var(--success);
  color: var(--ink-500);
  font-weight: var(--fw-bold);
  font-size: var(--fs-12);
  flex: 0 0 auto;
}
.copy-toast-text {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.copy-toast-msg {
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-tight);
}
.copy-toast-chips {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
}
.copy-toast-chip {
  display: inline-flex;
  padding: 1px var(--sp-2);
  background: rgba(255, 255, 255, 0.08);
  color: var(--paper-200);
  border-radius: var(--radius-pill);
  font-size: var(--fs-11);
  letter-spacing: var(--ls-tight);
}
.copy-toast-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  flex: 0 0 auto;
}
.copy-toast-cta {
  background: transparent;
  color: var(--proof-200);
  border: 1px solid var(--proof-400);
  border-radius: var(--radius-1);
  padding: 4px var(--sp-3);
  font-size: var(--fs-12);
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: var(--t-quick);
}
.copy-toast-cta:hover {
  background: var(--proof-500);
  color: var(--paper-50);
  border-color: var(--proof-500);
}
.copy-toast-close {
  width: 24px;
  height: 24px;
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent;
  border: none;
  color: var(--paper-200);
  font-size: var(--fs-15);
  cursor: pointer;
  border-radius: var(--radius-1);
  transition: var(--t-quick);
}
.copy-toast-close:hover { background: rgba(255, 255, 255, 0.1); color: var(--paper-50); }

@media (max-width: 600px) {
  .copy-toast {
    bottom: calc(var(--mobile-tabs-h, 56px) + var(--sp-3));
    padding: var(--sp-2) var(--sp-2) var(--sp-2) var(--sp-3);
    max-width: calc(100vw - 16px);
  }
  .copy-toast-chips { display: none; }
  .copy-toast-glyph { width: 16px; height: 16px; font-size: var(--fs-11); }
}
</style>
