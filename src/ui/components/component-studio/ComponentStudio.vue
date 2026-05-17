<script setup lang="ts">
/**
 * ComponentStudio —— 新建 / 编辑 / 派生组件的 split view。
 *
 * 由 ComponentPalette teleport 到 body 后渲染为全屏工作台（90vw×90vh），
 * ≥900px 视口左右两栏：左侧表单 + 高级模式编辑，右侧大尺寸预览；窄屏自动
 * 退化为单列纵向堆叠。
 *
 * 三种 init.mode 决定保存路径:
 *   - new / derive  → mutations.createComponent (新落 storage)
 *   - edit          → mutations.updateComponent (按 id 更新)
 *
 * 校验: ComponentEditor 实时跑 validateSnippet 显示 diagnostics,
 * 保存时统一走 mutations,失败 inline error 显示在底部 actions 旁。
 *
 * dirty 跟踪: useComponentDraft 持 initial snapshot 与 draft 的 reactive 对比。
 * "取消"在 dirty 时弹确认; 不 dirty 直接退出。
 * defineExpose 暴露 attemptCancel 让外层 modal mask click / Esc 走同一路径。
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
import type { Theme, VariantKind } from '../../../core/themes/types'
import type {
  UserVariant,
  UserVariantTokens,
  UserVariantPatch,
  UserVariantCustom,
} from '../../../core/variants/userVariant'
import ComponentEditor from './ComponentEditor.vue'
import ComponentPreview from './ComponentPreview.vue'
import { useComponentDraft, type StudioMode } from './useComponentDraft'
import {
  CUSTOM_FENCE_PLACEHOLDER,
  dispatchUserVariant,
  rewriteCustomFenceInMarkdown,
  rewriteVariantInMarkdown,
} from './userVariantSave'

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

const { draft, dirty, editingId, originalLinkedUvId, reset } = useComponentDraft(
  props.init.mode,
  props.init.source ?? null,
)

const error = ref<string>('')

// tokens/patch 预览 id 固定不变（与真实仓 id 池隔离，避免与 createUserVariant 产物冲突）
const PREVIEW_UV_ID = 'uv_preview_draft'

const tokenCount = computed(() => Object.keys(draft.userVariantTokens).length)
const hasPatchContent = computed<boolean>(() => {
  const p = draft.userVariantCssPatch
  return !!(p.wrapperCSS.trim() || p.titleCSS.trim() || p.bodyCSS.trim())
})
const hasCustomContent = computed<boolean>(() => {
  const c = draft.userVariantCustom
  return !!(c.template.trim() && c.wrapperCSS.trim())
})

const baseValid = computed<boolean>(() => draft.kind !== 'none' && !!draft.variantId)

const hasUvContent = computed<boolean>(() => {
  if (draft.userVariantMode === 'custom') return hasCustomContent.value
  if (!baseValid.value) return false
  if (draft.userVariantMode === 'tokens') return tokenCount.value > 0
  if (draft.userVariantMode === 'patch') return hasPatchContent.value
  return false
})

// custom 预览 id 必须与 markdown 里的 fence 名（`uc-${id}`）匹配：
// edit 模式复用原 id；new 模式用 'NEW'，与作者写的 CUSTOM_FENCE_PLACEHOLDER 对齐
const PREVIEW_CUSTOM_ID = computed<string>(
  () => originalLinkedUvId ?? CUSTOM_FENCE_PLACEHOLDER.replace(/^uc-/, ''),
)

const previewUserVariants = computed<readonly UserVariant[]>(() => {
  if (!hasUvContent.value) return []
  if (draft.userVariantMode === 'custom') {
    const c = draft.userVariantCustom
    const preview: UserVariantCustom = {
      id: PREVIEW_CUSTOM_ID.value,
      name: '__custom_preview__',
      level: 'custom',
      createdAt: 0,
      updatedAt: Date.now(),
      base: null,
      template: c.template,
      css: {
        wrapperCSS: c.wrapperCSS,
        ...(c.titleCSS.trim() ? { titleCSS: c.titleCSS } : {}),
        ...(c.bodyCSS.trim() ? { bodyCSS: c.bodyCSS } : {}),
        ...(c.svgSlot.trim() ? { svgSlot: c.svgSlot } : {}),
      },
    }
    return [preview]
  }
  const base = { kind: draft.kind as VariantKind, variantId: draft.variantId }
  if (draft.userVariantMode === 'tokens') {
    const preview: UserVariantTokens = {
      id: PREVIEW_UV_ID,
      name: '__preview__',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base,
      tokens: { ...draft.userVariantTokens },
    }
    return [preview]
  }
  // patch
  const p = draft.userVariantCssPatch
  const preview: UserVariantPatch = {
    id: PREVIEW_UV_ID,
    name: '__preview__',
    level: 'patch',
    createdAt: 0,
    updatedAt: 0,
    base,
    cssPatch: {
      ...(p.wrapperCSS.trim() ? { wrapperCSS: p.wrapperCSS } : {}),
      ...(p.titleCSS.trim() ? { titleCSS: p.titleCSS } : {}),
      ...(p.bodyCSS.trim() ? { bodyCSS: p.bodyCSS } : {}),
    },
  }
  return [preview]
})

const previewMarkdown = computed<string>(() => {
  if (!hasUvContent.value) return draft.markdownSnippet
  if (draft.userVariantMode === 'custom') {
    return rewriteCustomFenceInMarkdown(
      draft.markdownSnippet,
      CUSTOM_FENCE_PLACEHOLDER,
      `uc-${PREVIEW_CUSTOM_ID.value}`,
    )
  }
  return rewriteVariantInMarkdown(draft.markdownSnippet, draft.variantId, PREVIEW_UV_ID)
})

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

  const { markdown: finalMarkdown, linkAction } = dispatchUserVariant(draft, originalLinkedUvId)

  // linkedUserVariantId 的 patch：set / clear 都映射为显式值（undefined 在 patch 端 = 不改）
  const linkPatch: string | null | undefined =
    linkAction.kind === 'set' ? linkAction.id : linkAction.kind === 'clear' ? null : undefined

  const payload = {
    name: draft.name.trim(),
    description: draft.description.trim(),
    kind: draft.kind,
    variantId: draft.variantId || undefined,
    markdownSnippet: ensureTrailingNewline(finalMarkdown),
    thumbnailSvg: draft.thumbnailSvg || undefined,
    linkedUserVariantId: linkAction.kind === 'set' ? linkAction.id : undefined,
  }

  if (props.init.mode === 'edit' && editingId) {
    const res: UpdateResult = updateComponent(editingId, {
      name: payload.name,
      description: payload.description,
      markdownSnippet: payload.markdownSnippet,
      thumbnailSvg: payload.thumbnailSvg,
      linkedUserVariantId: linkPatch,
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

// 暴露给外层 modal mask：点 backdrop / 按 Esc 走与"取消"按钮同一逻辑，保留 dirty 提示
defineExpose({ attemptCancel: onCancel })
</script>

<template>
  <section class="studio" aria-label="组件 Studio">
    <header class="modal-head">
      <span class="modal-head-label">{{ headerLabel }}</span>
      <span v-if="dirty" class="modal-head-dirty" aria-label="有未保存改动">·已改动</span>
      <button
        class="modal-head-close"
        type="button"
        aria-label="关闭"
        title="关闭（Esc）"
        @click="onCancel"
      >×</button>
    </header>

    <div class="content">
      <div class="col col-editor">
        <ComponentEditor
          :draft="draft"
          :theme="props.theme"
          :original-linked-uv-id="originalLinkedUvId"
        />
      </div>
      <div class="col col-preview">
        <div class="preview-wrap">
          <ComponentPreview
            :md="previewMarkdown"
            :theme="props.theme"
            :user-variants="previewUserVariants"
          />
        </div>
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
/* ComponentStudio 永远以全屏 modal 形态渲染（由 ComponentPalette teleport 到 body）。
 * ≥900px 视口左右两栏 grid；窄屏单列纵向。 */
.studio {
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.content {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.col-editor,
.col-preview {
  background: var(--surface-raised);
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.col-preview {
  padding: var(--sp-4);
  background: var(--surface);
}
.preview-wrap {
  flex: 1 1 auto;
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

@media (min-width: 900px) {
  .content {
    display: grid;
    grid-template-columns: minmax(380px, 1fr) minmax(420px, 1.4fr);
    gap: 1px;
    background: var(--border);
    overflow: hidden;
  }
  .col-editor,
  .col-preview {
    overflow-y: auto;
  }
  .preview-wrap {
    min-height: 0;
  }
}

/* Studio 顶栏：左侧标题 + dirty 提示，右侧关闭 × */
.modal-head {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--surface-raised);
}
.modal-head-label {
  font-family: var(--font-display);
  font-size: var(--fs-14);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-tight);
  color: var(--text);
}
.modal-head-dirty {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--accent);
}
.modal-head-close {
  margin-left: auto;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-2);
  color: var(--text-muted);
  font-size: var(--fs-17);
  line-height: 1;
  cursor: pointer;
  transition: var(--t-quick);
}
.modal-head-close:hover {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
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

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .btn { min-height: 40px; padding: 0 var(--sp-4); }
}
</style>
