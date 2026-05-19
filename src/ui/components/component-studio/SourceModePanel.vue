<script setup lang="ts">
/**
 * SourceModePanel —— UV patch 档源码编辑面板（步骤 5.3）。
 *
 * 职责：三个 CSS slot Tab（wrapperCSS / titleCSS / bodyCSS）→ CodeMirrorPane → 嵌入
 * PatchInspector 列微信适配 diff。
 *
 * 预览策略：宽屏（≥900px）双栏布局下右侧大预览已挂在同一份 UV 上，本面板不再内嵌
 * IsolatedPreview——视觉冗余 + 浪费一次 pipeline render；PatchInspector 改用 Studio
 * 透传下来的 livePatchLog。窄屏单列布局下右侧大预览会被滚到视口外，仍按需挂 IsolatedPreview
 * 作 fallback 兼数据源，断点字面值见 STUDIO_SPLIT_MEDIA_QUERY。
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
import { computed, nextTick, onMounted, ref } from 'vue'
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
import { useMediaQuery } from '../../composables/useMediaQuery'
import { STUDIO_SPLIT_MEDIA_QUERY } from '../../state/layoutMode'
import { defaultPatchScaffold, isPatchDraftEmpty } from './userVariantScaffold'

// Slot 同时被 ComponentEditor 的 tree-nav 引用；类型字面定义同源即可（重复 < 5 字节）
type Slot = 'wrapperCSS' | 'titleCSS' | 'bodyCSS'

const props = defineProps<{
  /** 当前编辑的基底 kind / variantId；为空时面板提示"请先选 base" */
  kind: ComponentKind
  variantId: string
  /** patch 草稿（双向绑定到 ComponentStudio.draft.userVariantCssPatch） */
  cssPatch: DraftCssPatch
  theme: Theme
  /**
   * Studio 大预览透传下来的 patchLog —— 宽屏布局下作 PatchInspector 的数据源。
   * 双栏布局右侧大预览已挂载，内嵌 IsolatedPreview 是冗余视觉，按断点条件不挂载。
   */
  livePatchLog?: PatchLog | null
  /**
   * 受控：当前编辑的 slot 由父组件 ComponentEditor 的 tree-nav 决定；
   * PatchInspector 跳转 sample 时通过 update:activeSlot emit 反向通知，由父更新。
   */
  activeSlot: Slot
}>()

const emit = defineEmits<{
  (e: 'update:activeSlot', slot: Slot): void
}>()

// activeSlot 来自 props（受控）；handleJumpToSample 通过 emit 而非直写
const activeSlot = computed<Slot>(() => props.activeSlot)

// 进入面板时若 patch 草稿全空，灌入默认脚手架——降低作者从空白起步的心智门槛，
// 立刻让右侧大预览看到三个 slot 的视觉效果。已有内容（含 edit 回填）不动。
// 脚手架字面常量与 lint 硬闸预先对齐，作者点保存不会被拦。
onMounted(() => {
  if (isPatchDraftEmpty(props.cssPatch)) {
    const s = defaultPatchScaffold()
    props.cssPatch.wrapperCSS = s.wrapperCSS
    props.cssPatch.titleCSS = s.titleCSS
    props.cssPatch.bodyCSS = s.bodyCSS
  }
})

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

// 仅窄屏单列布局下挂 IsolatedPreview——宽屏右侧大预览已经在同一份草稿上跑了同一份 UV，
// 重复内嵌一个小 iframe 只是视觉噪声且浪费一次 pipeline render
const isSplitLayout = useMediaQuery(STUDIO_SPLIT_MEDIA_QUERY)
const showIsolatedPreview = computed<boolean>(() => !isSplitLayout.value)

// 窄屏 fallback 时 IsolatedPreview 的本地 patchLog；宽屏不挂载，本字段恒为 null
const localPatchLog = ref<PatchLog | null>(null)
function onPatchLog(log: PatchLog | null): void {
  localPatchLog.value = log
}

// PatchInspector 的数据源：按布局二选一——
// 窄屏走本地（小预览是当前肉眼可见的那一份，与大预览滚到视口外时唯一可信源对齐）；
// 宽屏走 Studio 透传的大预览 log。
// 不能写 `local ?? prop` —— 拖窗口从窄屏切宽屏时 IsolatedPreview 卸载但 localPatchLog
// 残留旧值，那种写法会让宽屏 PatchInspector 显示过期数据。
const inspectorPatchLog = computed<PatchLog | null>(() =>
  showIsolatedPreview.value
    ? localPatchLog.value
    : (props.livePatchLog ?? null),
)

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
    // 受控：让父组件改 prop，CodeMirrorPane 的 value/extensions 通过 Compartment 更新；
    // 等下一个 tick 让 Vue 的 watch 把新 doc dispatch 到 CM 后再 jump
    emit('update:activeSlot', target)
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
      <div class="editor-wrap">
        <CodeMirrorPane
          ref="activeCmRef"
          v-model:value="activeValue"
          lang="css"
          :extra-extensions="activeExtensions"
        />
      </div>

      <div v-if="showIsolatedPreview" class="preview-wrap">
        <IsolatedPreview
          :placeholder-md="placeholderMd"
          :theme="theme"
          :user-variants="previewUserVariants"
          @patch-log="onPatchLog"
        />
      </div>

      <PatchInspector
        class="inspector"
        :patch-log="inspectorPatchLog"
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
