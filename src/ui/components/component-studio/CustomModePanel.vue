<script setup lang="ts">
/**
 * UV custom 档源码面板。5 tab（template / wrapperCSS / titleCSS / bodyCSS / svgSlot）。
 * Lint 失败仅画波浪 + 底部 summary，不阻断编辑；保存期硬闸由 ComponentStudio 决定。
 *
 * 预览策略：宽屏（≥900px）布局下右侧大预览已挂在同一份 custom UV 上，本面板不再
 * 内嵌 IsolatedPreview；窄屏单列布局保留作 fallback。断点见 STUDIO_SPLIT_MEDIA_QUERY，
 * 与 SourceModePanel 同款 livePatchLog 双源策略。
 */
import { computed, nextTick, onMounted, ref } from 'vue'
import type { Theme } from '../../../core/themes/types'
import type {
  UserVariant,
  UserVariantCustom,
} from '../../../core/variants/userVariant'
import type { PatchLog, PatchLogSample } from '../../../core/pipeline/platforms/types'
import { lintTemplateHTML, lintInlineCSS } from '../../../core/pipeline/lint'
import {
  createUserVariantCSSLinter,
  createUserVariantHTMLLinter,
} from '../../composables/useUserVariantLint'
import type { DraftCustom } from './useComponentDraft'
import CodeMirrorPane from './CodeMirrorPane.vue'
import IsolatedPreview from './IsolatedPreview.vue'
import PatchInspector from './PatchInspector.vue'
import { useMediaQuery } from '../../composables/useMediaQuery'
import { STUDIO_SPLIT_MEDIA_QUERY } from '../../state/layoutMode'
import { defaultCustomScaffold, isCustomDraftEmpty } from './userVariantScaffold'

// 与 SourceModePanel 同一套 slot 命名（外壳/标题/正文）由 ComponentEditor 的 tree-nav
// 统一展示——内部不再持有 TAB_LABELS。Tab 类型字面定义重复 < 30 字节，无需共享模块。
type Tab = 'template' | 'wrapperCSS' | 'titleCSS' | 'bodyCSS' | 'svgSlot'

const props = defineProps<{
  custom: DraftCustom
  theme: Theme
  /** edit 模式复用此 id 让 preview 的 markdown 引用不需 rewrite。 */
  originalLinkedUvId: string | null
  /**
   * Studio 大预览透传下来的 patchLog —— 宽屏布局下作 PatchInspector 的数据源。
   * 双栏布局右侧大预览已挂载，内嵌 IsolatedPreview 是冗余视觉，按断点条件不挂载。
   */
  livePatchLog?: PatchLog | null
  /**
   * 受控：当前编辑的 tab 由父组件 ComponentEditor 的 tree-nav 决定；
   * PatchInspector 跳 sample 时通过 update:activeTab 反向通知。
   */
  activeTab: Tab
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', tab: Tab): void
}>()

const TAB_LANG: Record<Tab, 'html' | 'css'> = {
  template: 'html',
  wrapperCSS: 'css',
  titleCSS: 'css',
  bodyCSS: 'css',
  svgSlot: 'html',
}

const activeTab = computed<Tab>(() => props.activeTab)

// 进入面板时若 custom 草稿全空，灌入完整最小骨架：template + 三 CSS slot 都填好，
// 作者立刻在右侧大预览看到"3 行能跑"的样子；已写过的内容（含 edit 回填）不动。
// 字面常量与 lintTemplateHTML / lintInlineCSS 硬闸预先对齐。
onMounted(() => {
  if (isCustomDraftEmpty(props.custom)) {
    const s = defaultCustomScaffold()
    props.custom.template = s.template
    props.custom.wrapperCSS = s.wrapperCSS
    props.custom.titleCSS = s.titleCSS
    props.custom.bodyCSS = s.bodyCSS
    props.custom.svgSlot = s.svgSlot
  }
})

// linter 引用稳定：Extension 对象身份变化会触发 CM6 reconfigure
const linterByTab = {
  template: createUserVariantHTMLLinter('template'),
  wrapperCSS: createUserVariantCSSLinter('wrapperCSS'),
  titleCSS: createUserVariantCSSLinter('titleCSS'),
  bodyCSS: createUserVariantCSSLinter('bodyCSS'),
  svgSlot: createUserVariantHTMLLinter('svgSlot'),
} as const

const activeValue = computed<string>({
  get: () => props.custom[activeTab.value],
  set: (v) => {
    props.custom[activeTab.value] = v
  },
})

const activeExtensions = computed(() => [linterByTab[activeTab.value]])

const hasUvContent = computed<boolean>(
  () => !!(props.custom.template.trim() && props.custom.wrapperCSS.trim()),
)

// new 模式的 id 'NEW' 与 CUSTOM_FENCE_PLACEHOLDER 'uc-NEW' 对齐；custom 走 fence 注册
// 路径不依赖 uv_ 前缀，任意字符串都能作 id
const PREVIEW_NEW_ID = 'NEW'

const previewUvId = computed<string>(() => props.originalLinkedUvId ?? PREVIEW_NEW_ID)

const previewUserVariants = computed<readonly UserVariant[]>(() => {
  if (!hasUvContent.value) return []
  const uv: UserVariantCustom = {
    id: previewUvId.value,
    name: '__custom_preview__',
    level: 'custom',
    createdAt: 0,
    updatedAt: Date.now(),
    base: null,
    template: props.custom.template,
    css: {
      wrapperCSS: props.custom.wrapperCSS,
      ...(props.custom.titleCSS.trim() ? { titleCSS: props.custom.titleCSS } : {}),
      ...(props.custom.bodyCSS.trim() ? { bodyCSS: props.custom.bodyCSS } : {}),
      ...(props.custom.svgSlot.trim() ? { svgSlot: props.custom.svgSlot } : {}),
    },
  }
  return [uv]
})

const placeholderMd = computed<string>(() => {
  if (!hasUvContent.value) return ''
  return `::: uc-${previewUvId.value} 标题占位\n正文示例段落（演示 {{body}} 切分）\n:::\n`
})

// 仅窄屏单列布局下挂 IsolatedPreview——宽屏右侧大预览已经在同一份草稿上跑了同一份 UV
const isSplitLayout = useMediaQuery(STUDIO_SPLIT_MEDIA_QUERY)
const showIsolatedPreview = computed<boolean>(() => !isSplitLayout.value)

// 窄屏 fallback 时 IsolatedPreview 的本地 patchLog；宽屏不挂载，本字段恒为 null
const localPatchLog = ref<PatchLog | null>(null)
function onPatchLog(log: PatchLog | null): void {
  localPatchLog.value = log
}

// PatchInspector 的数据源：按布局二选一——
// 窄屏走本地（小预览是当前肉眼可见的那一份）；宽屏走 Studio 透传的大预览 log。
// 不能写 `local ?? prop` —— 拖窗口从窄屏切宽屏时 IsolatedPreview 卸载但 localPatchLog
// 残留旧值，那种写法会让宽屏 PatchInspector 显示过期数据。
const inspectorPatchLog = computed<PatchLog | null>(() =>
  showIsolatedPreview.value
    ? localPatchLog.value
    : (props.livePatchLog ?? null),
)

const activeCmRef = ref<InstanceType<typeof CodeMirrorPane> | null>(null)

/** PatchInspector sample 点击 → 跳源码。template/svgSlot/CSS slot 全量扫描首个命中 tab。 */
async function handleJumpToSample(sample: PatchLogSample): Promise<void> {
  const slots: Tab[] = ['template', 'wrapperCSS', 'titleCSS', 'bodyCSS', 'svgSlot']
  const target = slots.find((s) => props.custom[s].includes(sample.before))
  if (!target) return
  if (activeTab.value !== target) {
    // 受控：让父切 tab，nextTick 后 CM dispatch 完才跳光标
    emit('update:activeTab', target)
    await nextTick()
  }
  activeCmRef.value?.jumpToSubstring(sample.before)
}

const allDiagnostics = computed(() => {
  const out: Array<{ slot: Tab; message: string }> = []
  for (const slot of ['template', 'wrapperCSS', 'titleCSS', 'bodyCSS', 'svgSlot'] as Tab[]) {
    const text = props.custom[slot]
    if (!text.trim()) continue
    const diags =
      slot === 'template' || slot === 'svgSlot'
        ? lintTemplateHTML(text, slot)
        : lintInlineCSS(text, slot)
    for (const d of diags) {
      if (d.severity === 'error') out.push({ slot, message: d.message })
    }
  }
  return out
})

defineExpose({ allDiagnostics })
</script>

<template>
  <div class="custom-mode">
    <div class="editor-wrap">
      <CodeMirrorPane
        ref="activeCmRef"
        v-model:value="activeValue"
        :lang="TAB_LANG[activeTab]"
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

    <div v-if="allDiagnostics.length > 0" class="lint-summary">
      <div class="lint-title">{{ allDiagnostics.length }} 处保存阻断</div>
      <ul class="lint-list">
        <li v-for="(d, i) in allDiagnostics" :key="i">
          <code class="lint-slot">{{ d.slot }}</code>
          {{ d.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.custom-mode {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.editor-wrap {
  height: 220px;
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
.lint-summary {
  background: var(--danger-soft, #fbecea);
  border: 1px solid var(--danger);
  border-radius: var(--radius-2);
  padding: var(--sp-2) var(--sp-3);
  font-size: var(--fs-11);
}
.lint-title {
  font-weight: var(--fw-medium);
  color: var(--danger);
  margin-bottom: 4px;
}
.lint-list {
  margin: 0;
  padding-left: var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lint-slot {
  font-family: var(--font-mono);
  background: var(--surface-raised);
  padding: 1px 4px;
  border-radius: var(--radius-1, 2px);
  font-size: 10px;
  margin-right: 4px;
}
</style>
