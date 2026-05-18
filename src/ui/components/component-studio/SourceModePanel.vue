<script setup lang="ts">
/**
 * SourceModePanel —— UV patch 档源码编辑面板（步骤 5.3）。
 *
 * 职责：三个 CSS slot Tab（wrapperCSS / titleCSS / bodyCSS）→ CodeMirrorPane → 实时
 * IsolatedPreview 单 variant 沙盒预览 → 嵌入 PatchInspector 列微信适配 diff。
 *
 * 关系：与 TokensPanel 互斥——同一 draft 上 userVariantMode 决定显示哪个。
 * 切到 patch 档由 ComponentEditor 的"切换到源码模式"按钮触发，本组件只读 draft。
 *
 * HTML pane（L3 custom）暂不渲染：spec 明确"L2 patch 不开放 HTML"，custom 档走步骤 7
 * 单独的"裸 HTML 容器"渲染器，不在 Studio 主路径。
 *
 * Linter：每个 CodeMirrorPane 喂 createUserVariantCSSLinter('<slot>')，违禁声明
 * （position/float/font-family/@media/:hover 等微信黑名单）实时画红波浪。
 */
import { computed, nextTick, ref } from 'vue'
import type { Theme, VariantKind as VK } from '../../../core/themes/types'
import type { ComponentKind } from '../../../domain/components-lib'
import type {
  UserVariant,
  UserVariantPatch,
} from '../../../core/variants/userVariant'
import type { PatchLog, PatchLogSample } from '../../../core/pipeline/platforms/types'
import type { DraftCssPatch } from './useComponentDraft'
import CodeMirrorPane from './CodeMirrorPane.vue'
import IsolatedPreview from './IsolatedPreview.vue'
import PatchInspector from './PatchInspector.vue'
import { createUserVariantCSSLinter } from '../../composables/useUserVariantLint'
import { findSlotContainingSubstring } from './userVariantSave'
import { PLACEHOLDER_FENCE_BY_KIND } from './placeholderFence'

const props = defineProps<{
  /** 当前编辑的基底 kind / variantId；为空时面板提示"请先选 base" */
  kind: ComponentKind
  variantId: string
  /** patch 草稿（双向绑定到 ComponentStudio.draft.userVariantCssPatch） */
  cssPatch: DraftCssPatch
  theme: Theme
}>()

type Slot = 'wrapperCSS' | 'titleCSS' | 'bodyCSS'

const SLOT_LABELS: Record<Slot, string> = {
  wrapperCSS: '外壳 (wrapper)',
  titleCSS: '标题 (title)',
  bodyCSS: '正文 (body)',
}

const activeSlot = ref<Slot>('wrapperCSS')

/** 不重复构造 linter：CM Extension 对象身份变化会触发 reconfigure，频繁重建浪费。 */
const linterWrapper = createUserVariantCSSLinter('wrapperCSS')
const linterTitle = createUserVariantCSSLinter('titleCSS')
const linterBody = createUserVariantCSSLinter('bodyCSS')

const linterByslot: Record<Slot, ReturnType<typeof createUserVariantCSSLinter>> = {
  wrapperCSS: linterWrapper,
  titleCSS: linterTitle,
  bodyCSS: linterBody,
}

const activeValue = computed<string>({
  get: () => props.cssPatch[activeSlot.value],
  set: (v) => {
    props.cssPatch[activeSlot.value] = v
  },
})

const activeExtensions = computed(() => [linterByslot[activeSlot.value]])

const baseReady = computed<boolean>(() => props.kind !== 'none' && !!props.variantId)

/** patch 草稿是否有非空 slot——决定 preview 是否注入临时 UV vs 仅渲染基底。 */
function hasAnyPatch(p: DraftCssPatch): boolean {
  return !!(p.wrapperCSS.trim() || p.titleCSS.trim() || p.bodyCSS.trim())
}

const PREVIEW_UV_ID = 'uv_source_mode_preview'

const previewUserVariants = computed<readonly UserVariant[]>(() => {
  if (!baseReady.value) return []
  if (!hasAnyPatch(props.cssPatch)) return []
  const uv: UserVariantPatch = {
    id: PREVIEW_UV_ID,
    name: '__source_preview__',
    level: 'patch',
    createdAt: 0,
    updatedAt: 0,
    base: { kind: props.kind as VK, variantId: props.variantId },
    cssPatch: {
      ...(props.cssPatch.wrapperCSS.trim() ? { wrapperCSS: props.cssPatch.wrapperCSS } : {}),
      ...(props.cssPatch.titleCSS.trim() ? { titleCSS: props.cssPatch.titleCSS } : {}),
      ...(props.cssPatch.bodyCSS.trim() ? { bodyCSS: props.cssPatch.bodyCSS } : {}),
    },
  }
  return [uv]
})

const placeholderMd = computed<string>(() => {
  if (!baseReady.value) return ''
  // 注入 UV 时改写 variant= 让占位 fence 走 preview UV；否则仍用基底 id
  const targetVariantId = previewUserVariants.value.length > 0 ? PREVIEW_UV_ID : props.variantId
  const builder = PLACEHOLDER_FENCE_BY_KIND[props.kind as VK]
  if (!builder) return ''
  return builder(targetVariantId)
})

const livePatchLog = ref<PatchLog | null>(null)
function onPatchLog(log: PatchLog | null): void {
  livePatchLog.value = log
}

// ─────────────────────────────────────────────────────────────
// 6.2 PatchInspector sample 点击 → 跳转 CodeMirror 行
// ─────────────────────────────────────────────────────────────

/**
 * CodeMirrorPane 由 v-if/v-show 切换 active tab 时只挂载当前 slot；
 * ref 始终指向"当前可见的那一个"实例。jumpToSubstring 在 nextTick 后调用确保
 * 切 tab 后新挂载的 EditorView 已就绪。
 */
const activeCmRef = ref<InstanceType<typeof CodeMirrorPane> | null>(null)

async function handleJumpToSample(sample: PatchLogSample): Promise<void> {
  const target = findSlotContainingSubstring(props.cssPatch, sample.before)
  if (!target) return
  if (activeSlot.value !== target) {
    activeSlot.value = target
    // 切 tab 后 CodeMirrorPane 的 value/extensions 通过 Compartment 更新；
    // 等下一个 tick 让 Vue 的 watch 把新 doc dispatch 到 CM 后再 jump
    await nextTick()
  }
  activeCmRef.value?.jumpToSubstring(sample.before)
}
</script>

<template>
  <div class="source-mode">
    <div v-if="!baseReady" class="hint">
      请先在上方"分类"+"骨架"里选择基底；patch 档需要一个已注册 variant 作为叠加目标。
    </div>
    <template v-else>
      <div class="tabs" role="tablist">
        <button
          v-for="(label, slot) in SLOT_LABELS"
          :key="slot"
          role="tab"
          :aria-selected="activeSlot === slot"
          :class="['tab', { active: activeSlot === slot }]"
          @click="activeSlot = slot as Slot"
        >
          {{ label }}
          <span v-if="cssPatch[slot as Slot].trim()" class="tab-dot" aria-hidden="true" />
        </button>
      </div>

      <div class="editor-wrap">
        <CodeMirrorPane
          ref="activeCmRef"
          v-model:value="activeValue"
          lang="css"
          :extra-extensions="activeExtensions"
        />
      </div>

      <div class="preview-wrap">
        <IsolatedPreview
          :placeholder-md="placeholderMd"
          :theme="theme"
          :user-variants="previewUserVariants"
          @patch-log="onPatchLog"
        />
      </div>

      <PatchInspector
        class="inspector"
        :patch-log="livePatchLog"
        clickable
        @click-sample="handleJumpToSample"
      />
    </template>
  </div>
</template>

<style scoped>
.source-mode {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.hint {
  padding: var(--sp-3);
  font-size: var(--fs-12);
  color: var(--text-muted);
  background: var(--surface-raised);
  border: 1px dashed var(--border);
  border-radius: var(--radius-2);
}
.tabs {
  display: flex;
  gap: 2px;
}
.tab {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 8px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-1, 2px);
  color: var(--text-muted);
  cursor: pointer;
  font-family: var(--font-text);
}
.tab.active {
  background: var(--surface);
  color: var(--text);
  border-color: var(--accent);
}
.tab-dot {
  width: 5px;
  height: 5px;
  border-radius: var(--radius-pill, 50%);
  background: var(--accent);
}
.editor-wrap {
  height: 180px;
  min-height: 0;
}
.preview-wrap {
  height: 220px;
  min-height: 0;
}
.inspector {
  flex: 0 0 auto;
  max-height: 200px;
  overflow-y: auto;
}
</style>
