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
import { computed, defineAsyncComponent, watch } from 'vue'
import { VARIANT_IDS } from '../../../core/themes/types'
import { validateSnippet } from '../../../domain/components-lib/validate'
import type { ComponentKind } from '../../../domain/components-lib'
import { getVariantTokenSchema } from '../../../core/variants/tokenSchemaLookup'
import type { Theme, VariantKind } from '../../../core/themes/types'
import type { DraftFields, UserVariantMode } from './useComponentDraft'
import MarkdownInput from './MarkdownInput.vue'
import TokensPanel from './TokensPanel.vue'

/**
 * SourceModePanel / CustomModePanel 懒加载：拉入 CM6 lang-css / lang-html / oneDark
 * 主题 + linter，体积约 30-40 kB。大多数 Studio 编辑路径不进源码模式（只走 tokens 面板
 * 或不开 UV），用 defineAsyncComponent 推迟到 mode='patch'/'custom' 切换时才下载，
 * 节约 main app bundle。
 */
const SourceModePanel = defineAsyncComponent(() => import('./SourceModePanel.vue'))
const CustomModePanel = defineAsyncComponent(() => import('./CustomModePanel.vue'))

const props = defineProps<{
  draft: DraftFields
  /** 传入主题让 SourceModePanel/CustomModePanel 跑 IsolatedPreview——TokensPanel 不消费 theme */
  theme: Theme
  /** edit 模式：原 UV id 透传到 CustomModePanel 让预览 markdown 不需 rewrite */
  originalLinkedUvId?: string | null
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

// 当前 (kind, variantId) 是否有 tokenSchema——决定是否显示 tokens 切换按钮
const hasTokenSchema = computed<boolean>(() => {
  if (props.draft.kind === 'none' || !props.draft.variantId) return false
  return !!getVariantTokenSchema(props.draft.kind as VariantKind, props.draft.variantId)
})

// patch 档对所有"有 base 的 variant"都开放——理论上不需要 base 暴露 tokenSchema 也可写 patch
const canEditPatch = computed<boolean>(
  () => props.draft.kind !== 'none' && !!props.draft.variantId,
)

// kind / variantId 切换时清掉所有 UV 草稿数据（不同 base 的 token / patch 都无意义可移植）。
// custom 档不依赖 base.kind/variantId（fence = uc-<uvid>，与 kind 无关），切 kind 不清。
watch(
  () => `${props.draft.kind}::${props.draft.variantId}`,
  () => {
    if (props.draft.userVariantMode === 'custom') return
    for (const k of Object.keys(props.draft.userVariantTokens)) {
      delete props.draft.userVariantTokens[k]
    }
    props.draft.userVariantCssPatch.wrapperCSS = ''
    props.draft.userVariantCssPatch.titleCSS = ''
    props.draft.userVariantCssPatch.bodyCSS = ''
    props.draft.userVariantMode = null
  },
)

/**
 * 切档语义：tokens / patch / custom 三档互斥。切换时清空其它档的草稿数据
 *（防止保存路径歧义）。切回 null = 关闭 UV 编辑入口；不强制清数据。
 */
function setMode(next: UserVariantMode): void {
  if (next === props.draft.userVariantMode) {
    props.draft.userVariantMode = null
    return
  }
  if (next === 'tokens') {
    props.draft.userVariantCssPatch.wrapperCSS = ''
    props.draft.userVariantCssPatch.titleCSS = ''
    props.draft.userVariantCssPatch.bodyCSS = ''
    clearCustomDraft()
  } else if (next === 'patch') {
    for (const k of Object.keys(props.draft.userVariantTokens)) {
      delete props.draft.userVariantTokens[k]
    }
    clearCustomDraft()
  } else if (next === 'custom') {
    for (const k of Object.keys(props.draft.userVariantTokens)) {
      delete props.draft.userVariantTokens[k]
    }
    props.draft.userVariantCssPatch.wrapperCSS = ''
    props.draft.userVariantCssPatch.titleCSS = ''
    props.draft.userVariantCssPatch.bodyCSS = ''
  }
  props.draft.userVariantMode = next
}

function clearCustomDraft(): void {
  props.draft.userVariantCustom.template = ''
  props.draft.userVariantCustom.wrapperCSS = ''
  props.draft.userVariantCustom.titleCSS = ''
  props.draft.userVariantCustom.bodyCSS = ''
  props.draft.userVariantCustom.svgSlot = ''
}
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

    <div class="advanced">
      <div class="mode-switch" role="tablist" aria-label="样式编辑模式">
        <button
          v-if="hasTokenSchema"
          type="button"
          role="tab"
          :aria-selected="props.draft.userVariantMode === 'tokens'"
          :class="['mode-btn', { active: props.draft.userVariantMode === 'tokens' }]"
          @click="setMode('tokens')"
        >Tokens 面板</button>
        <button
          v-if="canEditPatch"
          type="button"
          role="tab"
          :aria-selected="props.draft.userVariantMode === 'patch'"
          :class="['mode-btn', { active: props.draft.userVariantMode === 'patch' }]"
          @click="setMode('patch')"
        >源码模式 (CSS patch)</button>
        <button
          type="button"
          role="tab"
          :aria-selected="props.draft.userVariantMode === 'custom'"
          :class="['mode-btn', { active: props.draft.userVariantMode === 'custom' }]"
          @click="setMode('custom')"
        >完全自定义 (custom)</button>
      </div>
      <TokensPanel
        v-if="props.draft.userVariantMode === 'tokens' && hasTokenSchema"
        :kind="props.draft.kind"
        :variant-id="props.draft.variantId"
        :tokens="props.draft.userVariantTokens"
      />
      <SourceModePanel
        v-else-if="props.draft.userVariantMode === 'patch'"
        :kind="props.draft.kind"
        :variant-id="props.draft.variantId"
        :css-patch="props.draft.userVariantCssPatch"
        :theme="props.theme"
      />
      <CustomModePanel
        v-else-if="props.draft.userVariantMode === 'custom'"
        :custom="props.draft.userVariantCustom"
        :theme="props.theme"
        :original-linked-uv-id="props.originalLinkedUvId ?? null"
      />
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

.advanced {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  border-top: 1px dashed var(--border);
  padding-top: var(--sp-3);
}
.mode-switch {
  display: flex;
  gap: 4px;
}
.mode-btn {
  flex: 0 0 auto;
  padding: 4px 10px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-muted);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-1, 2px);
  cursor: pointer;
  font-family: var(--font-text);
}
.mode-btn:hover { color: var(--text); }
.mode-btn.active {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--surface);
}

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .text-input { height: 40px; font-size: 16px; }
  .md-row { height: 220px; }
}
</style>
