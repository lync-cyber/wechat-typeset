<script setup lang="ts">
/**
 * ComponentStudio —— 新建 / 编辑 / 派生组件的内嵌 split view (P2)。
 *
 * 三种 init.mode 决定保存路径:
 *   - new / derive  → mutations.createComponent (新落 storage)
 *   - edit          → mutations.updateComponent (按 id 更新)
 *
 * 布局: 抽屉 340px 宽内做不下水平 split,故垂直堆叠:
 *   ┌─ 表单 (name / desc / kind / variantId / markdown)
 *   ├─ 预览 iframe
 *   └─ 底部 actions (取消 / 保存)
 *
 * 校验: ComponentEditor 实时跑 validateSnippet 显示 diagnostics,
 * 保存时统一走 mutations,失败 inline error 显示在底部 actions 旁。
 *
 * dirty 跟踪: useComponentDraft 持 initial snapshot 与 draft 的 reactive 对比。
 * "取消"在 dirty 时弹确认; 不 dirty 直接退出。
 */
import { computed, ref } from 'vue'
import type { ComponentEntry } from '../../../domain/components-lib'
import {
  createComponent,
  updateComponent,
} from '../../../domain/components-lib/mutations'
import type {
  CreateResult,
  UpdateResult,
} from '../../../domain/components-lib/mutations'
import type { Theme } from '../../../core/themes/types'
import ComponentEditor from './ComponentEditor.vue'
import ComponentPreview from './ComponentPreview.vue'
import { useComponentDraft, type StudioMode } from './useComponentDraft'

export interface StudioInit {
  mode: StudioMode
  /** edit 与 derive 需要 source;new 可省 */
  source?: ComponentEntry
}

const props = defineProps<{
  init: StudioInit
  theme: Theme
}>()

const emit = defineEmits<{
  /** 保存成功;参数是新落地或更新后的 entry id */
  (e: 'done', id: string): void
  /** 取消或返回列表 */
  (e: 'cancel'): void
}>()

const { draft, dirty, editingId, reset } = useComponentDraft(
  props.init.mode,
  props.init.source ?? null,
)

const error = ref<string>('')

function onCancel() {
  if (dirty.value) {
    const ok = window.confirm('放弃此次编辑?')
    if (!ok) return
  }
  emit('cancel')
}

function onReset() {
  reset()
  error.value = ''
}

const canSave = computed(() => {
  if (!draft.name.trim()) return false
  if (!draft.markdownSnippet.trim()) return false
  return true
})

function onSave() {
  error.value = ''
  if (!draft.name.trim()) {
    error.value = '名称不能为空'
    return
  }
  if (!draft.markdownSnippet.trim()) {
    error.value = 'Markdown 内容不能为空'
    return
  }

  const payload = {
    name: draft.name.trim(),
    description: draft.description.trim(),
    kind: draft.kind,
    variantId: draft.variantId || undefined,
    markdownSnippet: ensureTrailingNewline(draft.markdownSnippet),
    thumbnailSvg: draft.thumbnailSvg || undefined,
  }

  if (props.init.mode === 'edit' && editingId) {
    const res: UpdateResult = updateComponent(editingId, {
      name: payload.name,
      description: payload.description,
      markdownSnippet: payload.markdownSnippet,
      thumbnailSvg: payload.thumbnailSvg,
    })
    if (!res.ok) {
      error.value = formatError(res)
      return
    }
    emit('done', editingId)
    return
  }

  // new / derive
  const res: CreateResult = createComponent(payload)
  if (!res.ok) {
    error.value = formatError(res)
    return
  }
  emit('done', res.entry.id)
}

function ensureTrailingNewline(s: string): string {
  return s.endsWith('\n') ? s : s + '\n'
}

function formatError(
  res: Exclude<CreateResult | UpdateResult, { ok: true }>,
): string {
  if (res.reason === 'not-found') return '组件不存在(可能已被删除)'
  // validation
  const v = res.result
  if (v.unknownFences.length > 0) {
    return `未注册容器: ${v.unknownFences.join(', ')}`
  }
  if (v.unknownVariants.length > 0) {
    const u = v.unknownVariants[0]
    return `未注册 variant: ${u.container} → ${u.variantId}`
  }
  return '校验失败'
}

const headerLabel = computed(() => {
  if (props.init.mode === 'new') return '新建组件'
  if (props.init.mode === 'edit') return '编辑组件'
  return '派生为我的组件'
})
</script>

<template>
  <section class="studio" aria-label="组件 Studio">
    <div class="mode-banner">{{ headerLabel }}</div>

    <div class="content">
      <ComponentEditor :draft="draft" />

      <div class="preview-wrap">
        <ComponentPreview :md="draft.markdownSnippet" :theme="props.theme" />
      </div>
    </div>

    <div class="footer">
      <div v-if="error" class="error">{{ error }}</div>
      <div class="actions">
        <button class="btn btn-ghost" type="button" @click="onCancel">取消</button>
        <button
          v-if="dirty"
          class="btn btn-ghost"
          type="button"
          title="还原到初始状态"
          @click="onReset"
        >还原</button>
        <button
          class="btn btn-primary"
          type="button"
          :disabled="!canSave"
          @click="onSave"
        >保存</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.studio {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.mode-banner {
  flex: 0 0 auto;
  padding: var(--sp-3) var(--sp-4);
  font-size: var(--fs-12);
  letter-spacing: var(--ls-wide);
  color: var(--text-muted);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.preview-wrap {
  padding: 0 var(--sp-4) var(--sp-4);
  display: flex;
  flex-direction: column;
  min-height: 240px;
}

.footer {
  flex: 0 0 auto;
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.error {
  color: var(--danger);
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--sp-2);
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
.btn-primary:hover:not(:disabled) { background: var(--accent-hover); border-color: var(--accent-hover); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

@media (max-width: 767px) {
  .btn { min-height: 40px; padding: 0 var(--sp-4); }
}
</style>
