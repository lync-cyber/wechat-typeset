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
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { VARIANT_IDS } from '../../../core/themes/types'
import { validateSnippet } from '../../../domain/components-lib/validate'
import type { ComponentKind } from '../../../domain/components-lib'
import { getVariantTokenSchema } from '../../../core/variants/tokenSchemaLookup'
import type { Theme, VariantKind } from '../../../core/themes/types'
import type { PatchLog } from '../../../core/pipeline/platforms/types'
import type { DraftFields, UserVariantMode } from './useComponentDraft'
import { nextSnippetOnSelectionChange } from './placeholderFence'
import MarkdownInput from './MarkdownInput.vue'
import TokensPanel from './TokensPanel.vue'

// 懒载：CM6 lang-css/lang-html + linter 约 30-40 kB，大多数路径不进源码模式
const SourceModePanel = defineAsyncComponent(() => import('./SourceModePanel.vue'))
const CustomModePanel = defineAsyncComponent(() => import('./CustomModePanel.vue'))

const props = defineProps<{
  draft: DraftFields
  theme: Theme
  originalLinkedUvId?: string | null
  /** 由 ComponentStudio 转发的大预览 patchLog，供宽屏布局下 Source/Custom 面板复用 */
  livePatchLog?: PatchLog | null
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

// 仅当 markdown 仍是"上次注入的占位脚手架"或纯空白时才覆盖；任何用户编辑都让它原样保留。
// 不与 draft.markdownSnippet 同步——它只是 watcher 的本地记忆，避免吞掉作者已写的内容。
const lastInjectedSnippet = ref<string>('')

watch(
  () => [props.draft.kind, props.draft.variantId] as const,
  ([k, vid], [prevK, prevVid]) => {
    // kind 切换：先把 variantId 收敛到该 kind 下首个合法 id（none 时清空）。
    // 收敛触发 watcher 二次执行，让 snippet 处理在 vid 已稳定的那次完成——
    // 避免一次回调里做"改 vid + 改 md"两步，前者还可能被后者基于旧 vid 计算覆盖
    if (k !== prevK) {
      if (k === 'none') {
        if (props.draft.variantId !== '') {
          props.draft.variantId = ''
          return
        }
      } else {
        const allowed = VARIANT_IDS[k] as readonly string[]
        if (!allowed.includes(vid)) {
          props.draft.variantId = allowed[0] ?? ''
          return
        }
      }
    }
    const { nextSnippet, rewriteLastInjected } = nextSnippetOnSelectionChange({
      kind: k,
      variantId: vid,
      prevKind: prevK,
      prevVariantId: prevVid,
      current: props.draft.markdownSnippet,
      lastInjected: lastInjectedSnippet.value,
    })
    if (nextSnippet !== props.draft.markdownSnippet) {
      props.draft.markdownSnippet = nextSnippet
    }
    if (rewriteLastInjected) {
      lastInjectedSnippet.value = nextSnippet
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

// 切 base 必清 token/patch 草稿（base 不同 → 字段语义不同）。custom 不绑 base，豁免
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

// 三档互斥：切档清空其它档草稿，点同档=切回 null（仅折叠面板，草稿保留）。
// 切档前若"即将被清空"的档（非 next 那两档）有内容则 confirm；不能只看 cur——
// toggle-off 后 cur=null 但其它档草稿仍在，下次切档会被静默清掉，是真 bug。
// 假阳"刚进 patch/custom 还没编辑就再切档（脚手架算作内容）"代价低，远低于真编辑丢失。
// 内联 trim 检查不引 ./userVariantScaffold —— 那模块字面常量只随 lazy panel 走，
// 不能拖回主包；patch / custom 档"空 → 灌脚手架"由对应面板 onMounted 自行负责。
function setMode(next: UserVariantMode): void {
  const cur = props.draft.userVariantMode
  if (next === cur) {
    props.draft.userVariantMode = null
    return
  }
  const d = props.draft
  const tokensHas = Object.keys(d.userVariantTokens).length > 0
  const p = d.userVariantCssPatch
  const patchHas = !!(p.wrapperCSS.trim() || p.titleCSS.trim() || p.bodyCSS.trim())
  const c = d.userVariantCustom
  const customHas = !!(c.template.trim() || c.wrapperCSS.trim() || c.titleCSS.trim() || c.bodyCSS.trim() || c.svgSlot.trim())
  const willClear =
    (next !== 'tokens' && tokensHas) ||
    (next !== 'patch' && patchHas) ||
    (next !== 'custom' && customHas)
  if (willClear && !window.confirm('切换将清空其它模式下已写的内容，是否继续？')) return
  if (next === 'tokens') {
    d.userVariantCssPatch.wrapperCSS = ''
    d.userVariantCssPatch.titleCSS = ''
    d.userVariantCssPatch.bodyCSS = ''
    clearCustomDraft()
  } else if (next === 'patch') {
    for (const k of Object.keys(d.userVariantTokens)) delete d.userVariantTokens[k]
    clearCustomDraft()
  } else if (next === 'custom') {
    for (const k of Object.keys(d.userVariantTokens)) delete d.userVariantTokens[k]
    d.userVariantCssPatch.wrapperCSS = ''
    d.userVariantCssPatch.titleCSS = ''
    d.userVariantCssPatch.bodyCSS = ''
  }
  d.userVariantMode = next
}

function clearCustomDraft(): void {
  props.draft.userVariantCustom.template = ''
  props.draft.userVariantCustom.wrapperCSS = ''
  props.draft.userVariantCustom.titleCSS = ''
  props.draft.userVariantCustom.bodyCSS = ''
  props.draft.userVariantCustom.svgSlot = ''
}

// ── 高级样式 tree-nav 受控状态 ──────────────────────────────────────
// 同组内切 slot 不触发 setMode（无 confirm 阻断）；跨组切才走 setMode 流程。
// activeSlot 在档之间各自保留，方便作者来回切组时回到上次编辑的 slot。
type PatchSlot = 'wrapperCSS' | 'titleCSS' | 'bodyCSS'
type CustomSlot = 'template' | 'wrapperCSS' | 'titleCSS' | 'bodyCSS' | 'svgSlot'

const activePatchSlot = ref<PatchSlot>('wrapperCSS')
const activeCustomTab = ref<CustomSlot>('template')

const PATCH_SLOT_LABELS: Record<PatchSlot, string> = {
  wrapperCSS: '外壳 (wrapper)',
  titleCSS: '标题 (title)',
  bodyCSS: '正文 (body)',
}
const CUSTOM_TAB_LABELS: Record<CustomSlot, string> = {
  template: 'HTML 骨架',
  wrapperCSS: '外壳 (wrapper)',
  titleCSS: '标题 (title)',
  bodyCSS: '正文 (body)',
  svgSlot: '装饰 SVG',
}

type GroupId = 'tokens' | 'patch' | 'custom'
interface SlotNode { slot: string; label: string; hasContent: boolean }
interface GroupNode {
  id: GroupId
  label: string
  available: boolean
  expanded: boolean
  slots: SlotNode[]
}

const treeGroups = computed<GroupNode[]>(() => {
  const mode = props.draft.userVariantMode
  const d = props.draft
  return [
    {
      id: 'tokens',
      label: 'Tokens 微调骨架值',
      available: hasTokenSchema.value,
      expanded: mode === 'tokens',
      slots: [],
    },
    {
      id: 'patch',
      label: '源码模式 改基底 CSS',
      available: canEditPatch.value,
      expanded: mode === 'patch',
      slots: (['wrapperCSS', 'titleCSS', 'bodyCSS'] as PatchSlot[]).map((s) => ({
        slot: s,
        label: PATCH_SLOT_LABELS[s],
        hasContent: !!d.userVariantCssPatch[s].trim(),
      })),
    },
    {
      id: 'custom',
      label: '完全自定义 从零写',
      available: true,
      expanded: mode === 'custom',
      slots: (['template', 'wrapperCSS', 'titleCSS', 'bodyCSS', 'svgSlot'] as CustomSlot[]).map((s) => ({
        slot: s,
        label: CUSTOM_TAB_LABELS[s],
        hasContent: !!d.userVariantCustom[s].trim(),
      })),
    },
  ]
})

function activeSlotKey(id: GroupId): string {
  if (id === 'patch') return activePatchSlot.value
  if (id === 'custom') return activeCustomTab.value
  return ''
}

// 点击组头：复用 setMode 的 toggle / confirm / 清空逻辑
function onGroupClick(id: GroupId): void {
  setMode(id)
}

// 点击组内 slot：组已展开 → 同组切 slot，纯切换无 confirm
function onSlotClick(id: GroupId, slot: string): void {
  if (id === 'patch') activePatchSlot.value = slot as PatchSlot
  else if (id === 'custom') activeCustomTab.value = slot as CustomSlot
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
      <MarkdownInput
        v-model="props.draft.markdownSnippet"
        placeholder="选择上方“分类 + 骨架”自动填入示例；或直接在此撰写自由 markdown"
      />
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
      <p class="advanced-hint">
        高级样式 · 三档互斥：Tokens 微调骨架值 · 源码模式 改基底 CSS · 完全自定义 从零写
      </p>
      <div class="slot-tree" role="tree" aria-label="样式编辑模式与槽位">
        <template v-for="g in treeGroups" :key="g.id">
          <template v-if="g.available">
            <button
              type="button"
              role="treeitem"
              :aria-expanded="g.expanded"
              :class="['tree-group', { active: g.expanded }]"
              @click="onGroupClick(g.id)"
            >
              <span class="caret" aria-hidden="true">{{ g.expanded ? '▼' : '▶' }}</span>
              {{ g.label }}
            </button>
            <div v-if="g.expanded && g.slots.length > 0" class="tree-slots" role="group">
              <button
                v-for="s in g.slots"
                :key="s.slot"
                type="button"
                role="treeitem"
                :aria-selected="activeSlotKey(g.id) === s.slot"
                :class="['tree-slot', { active: activeSlotKey(g.id) === s.slot }]"
                @click="onSlotClick(g.id, s.slot)"
              >
                {{ s.label }}
                <span v-if="s.hasContent" class="tree-dot" aria-hidden="true" />
              </button>
            </div>
          </template>
        </template>
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
        :live-patch-log="props.livePatchLog ?? null"
        :active-slot="activePatchSlot"
        @update:active-slot="activePatchSlot = $event"
      />
      <CustomModePanel
        v-else-if="props.draft.userVariantMode === 'custom'"
        :custom="props.draft.userVariantCustom"
        :theme="props.theme"
        :original-linked-uv-id="props.originalLinkedUvId ?? null"
        :live-patch-log="props.livePatchLog ?? null"
        :active-tab="activeCustomTab"
        @update:active-tab="activeCustomTab = $event"
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
.advanced-hint {
  margin: 0;
  font-size: var(--fs-11);
  color: var(--text-muted);
}
.slot-tree {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: 4px;
  background: var(--surface-raised);
}
.tree-group {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 8px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-muted);
  background: transparent;
  border: 0;
  border-radius: var(--radius-1, 2px);
  cursor: pointer;
  font-family: var(--font-text);
  text-align: left;
}
.tree-group:hover { color: var(--text); background: var(--surface); }
.tree-group.active {
  color: var(--accent);
  background: var(--surface);
  font-weight: var(--fw-medium);
}
.tree-group .caret {
  font-size: 9px;
  width: 10px;
  text-align: center;
  color: var(--text-subtle);
  flex: 0 0 auto;
}
.tree-slots {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 18px;
  margin-bottom: 2px;
}
.tree-slot {
  display: flex; align-items: center; gap: 6px;
  padding: 3px 8px;
  font-size: var(--fs-11);
  color: var(--text-muted);
  background: transparent;
  border: 0;
  border-left: 2px solid transparent;
  border-radius: 0;
  cursor: pointer;
  font-family: var(--font-text);
  text-align: left;
}
.tree-slot:hover { color: var(--text); background: var(--surface); }
.tree-slot.active {
  color: var(--accent);
  border-left-color: var(--accent);
  background: var(--surface);
}
.tree-dot {
  width: 5px;
  height: 5px;
  border-radius: var(--radius-pill, 50%);
  background: var(--accent);
  margin-left: auto;
}

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .text-input { height: 40px; font-size: 16px; }
  .md-row { height: 220px; }
}
</style>
