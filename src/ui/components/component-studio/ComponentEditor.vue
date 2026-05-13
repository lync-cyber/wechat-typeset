<script setup lang="ts">
/**
 * Studio 表单 —— name / description / kind / variantId / markdown 五字段。
 *
 * 字段联动:
 *   - kind 切换 → 重置 variantId 为该 kind 下首个合法 id(或空,若 kind='none')
 *   - variantId 选项从 VARIANT_IDS 派生,kind='none' 时下拉禁用并显示"自由组件"
 *   - markdown 区域实时跑 validateSnippet,unknownFences / unknownVariants 列表展示在底部
 *
 * 与 mutations 的契约:校验失败不阻断本组件内的编辑(只是显示警告),
 * 是否落库由父组件 ComponentStudio.vue 在 Save 按钮上判断 dirty + ok。
 *
 * 接受 draft 引用而非 v-model:draft 是 reactive 对象,直接 mutate 触发响应;
 * 这与 useComponentDraft 的设计一致,避免双层 emit 同步。
 */
import { computed, watch } from 'vue'
import { VARIANT_IDS } from '../../../core/themes/types'
import { validateSnippet } from '../../../domain/components-lib/validate'
import type { ComponentKind } from '../../../domain/components-lib'
import type { DraftFields } from './useComponentDraft'
import MarkdownInput from './MarkdownInput.vue'

const props = defineProps<{
  draft: DraftFields
}>()

const KIND_OPTIONS: Array<{ value: ComponentKind; label: string }> = [
  { value: 'none', label: '自由组件' },
  { value: 'admonition', label: '提示 (admonition)' },
  { value: 'quote', label: '引用 (quote)' },
  { value: 'compare', label: '对比 (compare)' },
  { value: 'steps', label: '步骤 (steps)' },
  { value: 'divider', label: '分隔 (divider)' },
  { value: 'sectionTitle', label: '章节标题 (section-title)' },
  { value: 'note', label: '补注 (note)' },
  { value: 'codeBlock', label: '代码块 (codeBlock)' },
]

const variantOptions = computed<string[]>(() => {
  const k = props.draft.kind
  if (k === 'none') return []
  return [...(VARIANT_IDS[k] as readonly string[])]
})

// 当 kind 变化时,如果当前 variantId 不在新 kind 的合法列表里,清空
watch(
  () => props.draft.kind,
  (k) => {
    if (k === 'none') {
      props.draft.variantId = ''
      return
    }
    const allowed = VARIANT_IDS[k] as readonly string[]
    if (!allowed.includes(props.draft.variantId)) {
      props.draft.variantId = allowed[0] ?? ''
    }
  },
)

const validation = computed(() => validateSnippet(props.draft.markdownSnippet))
</script>

<template>
  <div class="editor">
    <div class="row">
      <label class="field">
        <span class="label">名称</span>
        <input
          v-model="props.draft.name"
          maxlength="20"
          placeholder="如:我的封面卡"
          class="text-input"
        />
      </label>
    </div>

    <div class="row">
      <label class="field">
        <span class="label">描述 (可选)</span>
        <input
          v-model="props.draft.description"
          maxlength="30"
          placeholder="一句话说明"
          class="text-input"
        />
      </label>
    </div>

    <div class="row row-split">
      <label class="field">
        <span class="label">分类</span>
        <select v-model="props.draft.kind" class="text-input">
          <option v-for="opt in KIND_OPTIONS" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </label>
      <label class="field">
        <span class="label">骨架 (variant)</span>
        <select
          v-model="props.draft.variantId"
          class="text-input"
          :disabled="props.draft.kind === 'none'"
        >
          <option value="">(无)</option>
          <option v-for="v in variantOptions" :key="v" :value="v">{{ v }}</option>
        </select>
      </label>
    </div>

    <div class="row md-row">
      <span class="label">Markdown</span>
      <MarkdownInput v-model="props.draft.markdownSnippet" />
    </div>

    <div v-if="!validation.ok" class="diagnostics">
      <div class="diag-title">未通过校验</div>
      <ul class="diag-list">
        <li v-if="validation.unknownFences.length > 0">
          未注册容器: <code>{{ validation.unknownFences.join(', ') }}</code>
        </li>
        <li v-for="(v, i) in validation.unknownVariants" :key="i">
          未注册 variant: <code>{{ v.container }} → variant={{ v.variantId }}</code>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding: var(--sp-4);
  flex: 0 0 auto;
}
.row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.row-split {
  flex-direction: row;
  gap: var(--sp-3);
}
.row-split .field { flex: 1 1 0; min-width: 0; }
.field {
  display: flex; flex-direction: column;
  gap: 4px;
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.label {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-subtle);
}
.text-input {
  height: 28px;
  padding: 0 var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  font: inherit; font-size: var(--fs-13);
  color: var(--text);
  background: var(--surface-raised);
  font-family: var(--font-text);
}
.text-input:focus { outline: none; border-color: var(--accent); box-shadow: var(--focus-ring); }
.text-input:disabled { opacity: 0.5; cursor: not-allowed; }

.md-row {
  display: flex; flex-direction: column;
  gap: 4px;
  height: 180px;
}
.md-row > :deep(.md-input) {
  flex: 1 1 auto;
  min-height: 0;
}

.diagnostics {
  background: var(--danger-soft, #fbecea);
  border: 1px solid var(--danger);
  border-radius: var(--radius-2);
  padding: var(--sp-3);
  font-size: var(--fs-11);
  color: var(--text);
}
.diag-title {
  font-weight: var(--fw-medium);
  color: var(--danger);
  margin-bottom: 4px;
}
.diag-list {
  margin: 0; padding-left: var(--sp-4);
  display: flex; flex-direction: column; gap: 2px;
}
.diag-list code {
  font-family: var(--font-mono);
  background: var(--surface-raised);
  padding: 1px 4px;
  border-radius: var(--radius-1, 2px);
}

@media (max-width: 767px) {
  .text-input { height: 40px; font-size: 16px; }
  .md-row { height: 220px; }
}
</style>
