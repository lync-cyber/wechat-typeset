<script setup lang="ts">
/**
 * ErrorBoundary —— 单子树渲染异常的兜底层。给"可能炸"的子树套壳（ColorCustomizer /
 * ComponentPalette / DraftDrawer 等面板的 setup 抛错时，避免整 App 白屏）：
 *   - errorCaptured 触发后渲染降级 UI（标题 + 可读错误描述 + 重试 + 关闭）
 *   - 返回 false 阻止错误冒泡到 App.vue / Vue 全局 handler
 *   - "重试"=key 重渲染 slot；"关闭"=触发 close emit 让父组件卸载本 boundary
 *
 * 用法：
 *   <ErrorBoundary fallback-title="组件库渲染失败" @close="ui.rightSlot = null">
 *     <ComponentPalette ... />
 *   </ErrorBoundary>
 *
 * 不接管：
 *   - 异步错误（Promise reject、setTimeout 抛错）—— Vue errorCaptured 不覆盖；
 *     这些应该在原地 try/catch 后用 useDraftLifecycle.pingTransient 反馈
 *   - 模板表达式里的空引用——用 v-if 防御，不要寄希望于 boundary
 */
import { onErrorCaptured, ref } from 'vue'

const props = defineProps<{
  /** 降级 UI 标题，例如"组件库渲染失败"；缺省值兜底 */
  fallbackTitle?: string
  /** 是否在控制台 console.error 完整堆栈；dev 默认 true，prod 默认 false */
  logToConsole?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  /** 子树抛错时触发，传出 Error 对象供父级遥测 */
  (e: 'error', err: Error): void
}>()

const errorState = ref<{ message: string; stack?: string } | null>(null)
const renderKey = ref(0) // 重试时 +1 强制 slot 重渲染

onErrorCaptured((err) => {
  const error = err instanceof Error ? err : new Error(String(err))
  errorState.value = {
    message: error.message || '未知错误',
    stack: error.stack,
  }
  if (props.logToConsole ?? import.meta.env?.DEV ?? false) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error)
  }
  emit('error', error)
  return false // 阻止继续冒泡
})

function retry() {
  errorState.value = null
  renderKey.value += 1
}

function close() {
  emit('close')
}
</script>

<template>
  <div v-if="errorState" class="error-boundary" role="alert">
    <div class="error-boundary__head">
      <strong class="error-boundary__title">{{ fallbackTitle ?? '面板渲染失败' }}</strong>
      <button class="error-boundary__close" type="button" @click="close">关闭</button>
    </div>
    <div class="error-boundary__body">
      <p class="error-boundary__message">{{ errorState.message }}</p>
      <details v-if="errorState.stack" class="error-boundary__details">
        <summary>调用栈</summary>
        <pre class="error-boundary__stack">{{ errorState.stack }}</pre>
      </details>
    </div>
    <div class="error-boundary__actions">
      <button class="error-boundary__retry" type="button" @click="retry">重试</button>
    </div>
  </div>
  <slot v-else :key="renderKey" />
</template>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-5);
  background: var(--surface-raised);
  border: 1px solid var(--danger);
  border-radius: var(--radius-2);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  color: var(--text);
  max-width: 480px;
  margin: var(--sp-4);
}
.error-boundary__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-3);
}
.error-boundary__title {
  color: var(--danger);
  font-weight: var(--fw-semibold);
}
.error-boundary__close,
.error-boundary__retry {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: 4px var(--sp-3);
  cursor: pointer;
  font: inherit;
  color: var(--text-muted);
}
.error-boundary__close:hover,
.error-boundary__retry:hover {
  color: var(--text);
  border-color: var(--accent);
}
.error-boundary__message {
  margin: 0;
  color: var(--text);
  word-break: break-word;
}
.error-boundary__details {
  font-size: var(--fs-11);
  color: var(--text-subtle);
}
.error-boundary__stack {
  margin: var(--sp-2) 0 0;
  padding: var(--sp-2);
  background: var(--surface);
  border-radius: var(--radius-1);
  font-family: var(--font-mono);
  font-size: var(--fs-11);
  overflow: auto;
  max-height: 200px;
  white-space: pre-wrap;
}
.error-boundary__actions {
  display: flex;
  justify-content: flex-end;
}
</style>
