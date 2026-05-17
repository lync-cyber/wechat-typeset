<script setup lang="ts">
/**
 * UV custom 档源码面板。5 tab（template / wrapperCSS / titleCSS / bodyCSS / svgSlot）。
 * Lint 失败仅画波浪 + 底部 summary，不阻断编辑；保存期硬闸由 ComponentStudio 决定。
 */
import { computed, nextTick, ref } from 'vue'
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

const props = defineProps<{
  custom: DraftCustom
  theme: Theme
  /** edit 模式复用此 id 让 preview 的 markdown 引用不需 rewrite。 */
  originalLinkedUvId: string | null
}>()

type Tab = 'template' | 'wrapperCSS' | 'titleCSS' | 'bodyCSS' | 'svgSlot'

const TAB_LABELS: Record<Tab, string> = {
  template: 'HTML 骨架',
  wrapperCSS: '外壳 CSS',
  titleCSS: '标题 CSS',
  bodyCSS: '正文 CSS',
  svgSlot: '装饰 SVG',
}

const TAB_LANG: Record<Tab, 'html' | 'css'> = {
  template: 'html',
  wrapperCSS: 'css',
  titleCSS: 'css',
  bodyCSS: 'css',
  svgSlot: 'html',
}

const activeTab = ref<Tab>('template')

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

const livePatchLog = ref<PatchLog | null>(null)
function onPatchLog(log: PatchLog | null): void {
  livePatchLog.value = log
}

const activeCmRef = ref<InstanceType<typeof CodeMirrorPane> | null>(null)

/** PatchInspector sample 点击 → 跳源码。template/svgSlot/CSS slot 全量扫描首个命中 tab。 */
async function handleJumpToSample(sample: PatchLogSample): Promise<void> {
  const slots: Tab[] = ['template', 'wrapperCSS', 'titleCSS', 'bodyCSS', 'svgSlot']
  const target = slots.find((s) => props.custom[s].includes(sample.before))
  if (!target) return
  if (activeTab.value !== target) {
    activeTab.value = target
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
    <div class="tabs" role="tablist">
      <button
        v-for="(label, tab) in TAB_LABELS"
        :key="tab"
        role="tab"
        :aria-selected="activeTab === tab"
        :class="['tab', { active: activeTab === tab }]"
        @click="activeTab = tab as Tab"
      >
        {{ label }}
        <span v-if="custom[tab as Tab].trim()" class="tab-dot" aria-hidden="true" />
      </button>
    </div>

    <div class="editor-wrap">
      <CodeMirrorPane
        ref="activeCmRef"
        v-model:value="activeValue"
        :lang="TAB_LANG[activeTab]"
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
.tabs {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
}
.tab {
  flex: 1 1 0;
  min-width: 80px;
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
