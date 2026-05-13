<script setup lang="ts">
/**
 * 保存选区为组件 —— 弹窗（P3 从 ComponentPalette 提取）。
 *
 * 设计：受控组件,父组件通过 `open + sourceText` 双 prop 控制；
 * 保存与取消通过 emit 抛出。校验 markdown 是否含野 fence 的责任在父组件
 * （它调 mutations.createComponent,失败时把 ValidateResult 转写到 error prop）。
 *
 * 本组件只做"表单输入 + 校验文案展示",不涉及 storage / mutations。
 */
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  /** 选区原文,用于弹窗内 "选区预览" 折叠区展示 */
  sourceText: string
  /** 外部传入的当前错误文案。父组件清空 = 关闭错误态。 */
  error?: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm', payload: { name: string; description: string }): void
}>()

const name = ref('')
const description = ref('')

// 每次重新打开都清掉之前的输入,避免上次填写残留
watch(
  () => props.open,
  (now) => {
    if (now) {
      name.value = ''
      description.value = ''
    }
  },
)

function cancel() {
  emit('cancel')
}

function confirm() {
  emit('confirm', { name: name.value.trim(), description: description.value.trim() })
}
</script>

<template>
  <div v-if="open" class="modal-mask" @click.self="cancel">
    <div class="modal" role="dialog" aria-label="保存选区为组件">
      <h4 class="modal-title">保存选区为组件</h4>
      <label class="modal-field">
        <span>名称</span>
        <input
          v-model="name"
          maxlength="20"
          placeholder="如：我的封面卡"
          :class="{ invalid: !!error }"
          @keydown.enter.prevent="confirm"
        />
        <span v-if="error" class="field-error">{{ error }}</span>
      </label>
      <label class="modal-field">
        <span>描述（可选）</span>
        <input v-model="description" maxlength="30" placeholder="一句话说明" />
      </label>
      <details class="preview-src">
        <summary>选区预览</summary>
        <pre class="mono">{{ sourceText }}</pre>
      </details>
      <div class="modal-actions">
        <button class="btn btn-ghost" @click="cancel">取消</button>
        <button class="btn btn-primary" @click="confirm">保存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: absolute; inset: 0;
  background: rgba(14, 14, 10, 0.42);
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
}
.modal {
  width: 300px;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: var(--sp-5);
  box-shadow: var(--shadow-modal);
  display: flex; flex-direction: column; gap: var(--sp-3);
}
.modal-title { margin: 0; font-size: var(--fs-14); font-weight: var(--fw-semibold); }
.modal-field {
  display: flex; flex-direction: column; gap: 4px;
  font-size: var(--fs-12); color: var(--text-muted);
}
.modal-field input {
  height: 28px; padding: 0 var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  font: inherit; font-size: var(--fs-13);
  color: var(--text);
  background: var(--surface-raised);
}
.modal-field input:focus { outline: none; border-color: var(--accent); box-shadow: var(--focus-ring); }
.modal-field input.invalid { border-color: var(--danger); }
.field-error {
  color: var(--danger); font-size: var(--fs-11); letter-spacing: var(--ls-wide);
}
.preview-src { font-size: var(--fs-11); color: var(--text-subtle); }
.preview-src pre {
  margin: 6px 0 0;
  max-height: 120px;
  overflow: auto;
  background: var(--surface);
  padding: var(--sp-3);
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
  white-space: pre-wrap; word-break: break-word;
  font-size: var(--fs-11);
  color: var(--text);
}
.modal-actions {
  display: flex; justify-content: flex-end; gap: var(--sp-2);
  margin-top: var(--sp-2);
}
.btn {
  height: 28px; padding: 0 var(--sp-4);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  cursor: pointer; font-family: var(--font-text);
}
.btn-ghost { background: var(--surface-raised); color: var(--text); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--surface); }
.btn-primary { background: var(--accent); color: var(--accent-on); border: 1px solid var(--accent); }
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

@media (max-width: 767px) {
  .modal-mask { position: fixed; z-index: 60; }
  .modal { width: min(320px, calc(100vw - 32px)); }
  .modal-field input { height: 40px; font-size: 16px; }
}
</style>
