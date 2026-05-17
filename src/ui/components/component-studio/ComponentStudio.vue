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

// ─────────────────────────────────────────────────────────────
// 用户 token 覆盖：预览期临时 UV + 保存期真实落仓
// ─────────────────────────────────────────────────────────────

/** 预览用的固定 ephemeral id；与真实仓 id 池隔离（真实 id 由 createUserVariant 生成）。 */
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

/** 当前是否有可保存的 UV 草稿（按 mode 区分）。custom 不依赖 base。 */
const hasUvContent = computed<boolean>(() => {
  if (draft.userVariantMode === 'custom') return hasCustomContent.value
  if (!baseValid.value) return false
  if (draft.userVariantMode === 'tokens') return tokenCount.value > 0
  if (draft.userVariantMode === 'patch') return hasPatchContent.value
  return false
})

/**
 * custom 档预览 UV id：edit 模式复用原 id（markdown 已含 `uc-<orig.id>`，无需 rewrite）；
 * new 模式用 CUSTOM_FENCE_PLACEHOLDER 去掉 `uc-` 前缀剩 'NEW'——markdown 里写 `uc-NEW`，
 * 预览也用 id='NEW'，fence 注册自动生成 `uc-NEW`，配对成功。
 */
const PREVIEW_CUSTOM_ID = computed<string>(
  () => originalLinkedUvId ?? CUSTOM_FENCE_PLACEHOLDER.replace(/^uc-/, ''),
)

/** 预览期的临时 UV（不入仓），让 ComponentPreview 即时反映 token / patch / custom 改动。 */
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

/**
 * 预览期 markdown 改写：tokens/patch 改写 `variant=<base>` → `variant=<PREVIEW_UV_ID>`；
 * custom 改写 `uc-NEW` → `uc-<PREVIEW_CUSTOM_ID>`（仅 new 模式生效，edit 模式 id 不变
 * 故 rewriteCustomFenceInMarkdown 静默 no-op）。
 */
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

// dispatchUserVariant 抽到 userVariantSave.ts；本组件只持有 reactive draft 的访问壳。

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
</script>

<template>
  <section class="studio" aria-label="组件 Studio">
    <div class="mode-banner">{{ headerLabel }}</div>

    <div class="content">
      <ComponentEditor
        :draft="draft"
        :theme="props.theme"
        :original-linked-uv-id="originalLinkedUvId"
      />

      <div class="preview-wrap">
        <ComponentPreview
          :md="previewMarkdown"
          :theme="props.theme"
          :user-variants="previewUserVariants"
        />
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

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .btn { min-height: 40px; padding: 0 var(--sp-4); }
}
</style>
