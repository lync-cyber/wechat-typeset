<script setup lang="ts">
/**
 * 组件库抽屉（P3 后只剩"装配 + 模式切换"，不再持有展示派生 / cell DOM / 保存弹窗 DOM）。
 *
 * 三个子组件 + 三个来源：
 *   - ComponentGrid          每个 tab 的 cell 网格 + hover 动作按钮
 *   - SaveSelectionDialog    选区另存为组件的弹窗
 *   - ComponentStudio        新建 / 编辑 / 派生组件的内嵌 split view
 *   - sources/builtin        admonition / quote / compare / steps / ... 内置预设
 *   - sources/theme-template 当前主题的 templates 字段派生条目
 *   - sources/user           我的组件（响应式快照）
 *
 * 状态机：
 *   mode = 'list'：tab 切换 + grid 选择 + 保存选区弹窗
 *   mode = 'studio'：内嵌 Studio 编辑器，关闭后回到 list
 *
 * "保存选区"通过 defineExpose 暴露 openSaveDialog,由 actions.handleSaveSelection 调用。
 */
import { computed, reactive, ref } from 'vue'
import {
  COMPONENT_TABS,
  type ComponentEntry,
  type ComponentKind,
  getThemeTemplateEntries,
  createComponent,
  type CreateResult,
} from '../../domain/components-lib'
import { useUserComponents } from '../../domain/components-lib/useUserComponents'
import type { Theme } from '../../core/themes/types'
import { BUILTIN_COMPONENTS } from '../../domain/components-lib/registry'
import {
  exportUserComponentsJSON,
  importUserComponentsJSON,
} from '../../infra/storage/userComponents.transfer'
import { downloadBlob } from '../../infra/exporters/exportFile'
import { buildUrl } from '../../infra/share/codec'
import {
  componentCodec,
  wrapComponentSnapshot,
} from '../../infra/share/payloads/component'
import PanelHeader from '../primitives/PanelHeader.vue'
import ComponentGrid, { type GridAction } from './ComponentGrid.vue'
import SaveSelectionDialog from './SaveSelectionDialog.vue'
import ComponentStudio, { type StudioInit } from './component-studio/ComponentStudio.vue'

const props = defineProps<{ theme: Theme }>()
const emit = defineEmits<{
  (e: 'insert', md: string): void
  (e: 'close'): void
}>()

type TabKind = 'template' | ComponentKind | 'user'

const mode = ref<'list' | 'studio'>('list')
const studioInit = ref<StudioInit | null>(null)

const activeTab = ref<TabKind>('template')
const userMgr = useUserComponents()
const userComponents = userMgr.list

const builtinByKind = computed<Record<ComponentKind, ComponentEntry[]>>(() => {
  const bucket: Record<ComponentKind, ComponentEntry[]> = {
    admonition: [],
    quote: [],
    compare: [],
    steps: [],
    divider: [],
    sectionTitle: [],
    // codeBlock P0 后有 snippets,但暂无独立 tab 入口;先放空,后续如需再加 tab。
    codeBlock: [],
    note: [],
    none: [],
  }
  for (const c of BUILTIN_COMPONENTS) {
    if (c.kind in bucket) bucket[c.kind].push(c)
  }
  return bucket
})

const themeTemplateList = computed<ComponentEntry[]>(() =>
  getThemeTemplateEntries(props.theme),
)

const currentList = computed<ComponentEntry[]>(() => {
  if (activeTab.value === 'template') return themeTemplateList.value
  if (activeTab.value === 'user') return userComponents.value
  return builtinByKind.value[activeTab.value as ComponentKind]
})

const gridActions = computed<GridAction[]>(() => {
  if (activeTab.value === 'user') return ['edit', 'share', 'delete']
  // builtin / theme template:派生入口
  return ['derive']
})

// 短暂状态提示（导出 / 导入 / 分享 链接复制完毕）
const transientStatus = ref<string>('')
let statusTimer: number | null = null
function pingStatus(msg: string, ms = 2000) {
  transientStatus.value = msg
  if (statusTimer != null) window.clearTimeout(statusTimer)
  statusTimer = window.setTimeout(() => {
    transientStatus.value = ''
    statusTimer = null
  }, ms)
}

function onCellSelect(entry: ComponentEntry) {
  emit('insert', entry.markdownSnippet)
}

function onCellAction(payload: { kind: GridAction; entry: ComponentEntry }) {
  const { kind, entry } = payload
  if (kind === 'delete') {
    userMgr.remove(entry.id)
    return
  }
  if (kind === 'edit') {
    if (entry.source !== 'user') return
    studioInit.value = { mode: 'edit', source: entry }
    mode.value = 'studio'
    return
  }
  if (kind === 'derive') {
    studioInit.value = { mode: 'derive', source: entry }
    mode.value = 'studio'
    return
  }
  if (kind === 'share') {
    void shareEntry(entry)
  }
}

async function shareEntry(entry: ComponentEntry) {
  const wrapped = wrapComponentSnapshot({
    id: entry.id,
    name: entry.name,
    description: entry.description,
    kind: entry.kind,
    variantId: entry.variantId,
    markdownSnippet: entry.markdownSnippet,
    thumbnailSvg: entry.thumbnailSvg,
  })
  const url = buildUrl(componentCodec, wrapped)
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      pingStatus('已复制分享链接')
    } else {
      // 降级：直接把 hash 写到当前地址（用户从地址栏复制）
      location.hash = url.slice(url.indexOf('#'))
      pingStatus('请从地址栏复制当前链接', 3000)
    }
  } catch {
    pingStatus('分享失败：剪贴板权限不足', 3000)
  }
}

// 导出 / 导入
function exportAll() {
  const json = exportUserComponentsJSON()
  const filename = `wechat-typeset-components-${new Date().toISOString().slice(0, 10)}.json`
  downloadBlob(filename, json, 'application/json')
  pingStatus('已导出组件库 JSON')
}

const importInputRef = ref<HTMLInputElement | null>(null)
function pickImport() {
  importInputRef.value?.click()
}

async function onImportFile(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  // 选完文件先重置 value，让同名文件再次选时能触发 change
  input.value = ''
  if (!file) return
  try {
    const text = await file.text()
    const added = importUserComponentsJSON(text)
    if (added > 0) {
      userMgr.refresh()
      pingStatus(`已导入 ${added} 个组件`)
    } else {
      pingStatus('未导入：文件为空或重复', 2500)
    }
  } catch {
    pingStatus('导入失败：文件读取错误', 2500)
  }
}

function openStudioNew() {
  studioInit.value = { mode: 'new' }
  mode.value = 'studio'
}

function exitStudio() {
  mode.value = 'list'
  studioInit.value = null
}

function onStudioSaved(savedId: string) {
  exitStudio()
  activeTab.value = 'user'
  // 触发列表刷新,新条目立刻可见
  userMgr.refresh()
  void savedId
}

// ---------- 保存选区为组件 ----------
const save = reactive({
  open: false,
  source: '',
  error: '' as string,
})

function openSaveDialog(selectionText: string) {
  const text = selectionText.trim()
  if (!text) return
  save.open = true
  save.source = selectionText
  save.error = ''
}

function cancelSave() {
  save.open = false
  save.error = ''
}

function confirmSave(payload: { name: string; description: string }) {
  if (!payload.name) {
    save.error = '组件名不能为空'
    return
  }
  const md = ensureTrailingNewline(save.source)
  const res: CreateResult = createComponent({
    name: payload.name,
    description: payload.description,
    markdownSnippet: md,
    sourceMarkdown: save.source,
    kind: 'none',
  })
  if (!res.ok) {
    save.error = formatMutationError(res)
    return
  }
  save.open = false
  save.error = ''
  activeTab.value = 'user'
  userMgr.refresh()
}

function ensureTrailingNewline(s: string): string {
  return s.endsWith('\n') ? s : s + '\n'
}

function formatMutationError(res: Exclude<CreateResult, { ok: true }>): string {
  if (res.reason === 'validation') {
    const fences = res.result.unknownFences
    const variants = res.result.unknownVariants
    if (fences.length > 0) {
      return `选区含未注册容器: ${fences.join(', ')}。请在编辑器修正后再保存。`
    }
    if (variants.length > 0) {
      const v = variants[0]
      return `选区含未注册 variant: ${v.container}:${v.variantId}。请在编辑器修正。`
    }
    return '选区内容未通过校验'
  }
  return '保存失败'
}

defineExpose({ openSaveDialog })
</script>

<template>
  <aside class="palette" aria-label="组件库">
    <PanelHeader
      :title="mode === 'studio' ? '编辑组件' : '插入'"
      size="sm"
      @close="emit('close')"
    >
      <template v-if="mode === 'list'" #actions>
        <button class="head-action" title="新建组件" @click="openStudioNew">+ 新建</button>
      </template>
      <template v-else #actions>
        <button class="head-action" title="返回列表" @click="exitStudio">← 返回</button>
      </template>
    </PanelHeader>

    <template v-if="mode === 'list'">
      <nav class="tabs" role="tablist">
        <button
          class="tab"
          :class="{ active: activeTab === 'template' }"
          @click="activeTab = 'template'"
        >
          主题模板
        </button>
        <button
          v-for="t in COMPONENT_TABS"
          :key="t.kind"
          class="tab"
          :class="{ active: activeTab === t.kind }"
          @click="activeTab = t.kind as TabKind"
        >
          {{ t.label }}
        </button>
      </nav>

      <div v-if="activeTab === 'user'" class="user-toolbar">
        <button class="tool-btn" title="导出我的组件为 JSON" @click="exportAll">↓ 导出</button>
        <button class="tool-btn" title="从 JSON 文件导入组件" @click="pickImport">↑ 导入</button>
        <input
          ref="importInputRef"
          type="file"
          accept="application/json,.json"
          class="hidden-input"
          @change="onImportFile"
        />
        <span v-if="transientStatus" class="tool-status">{{ transientStatus }}</span>
      </div>

      <div class="body">
        <div v-if="currentList.length === 0" class="empty">
          <template v-if="activeTab === 'template'">
            当前主题「{{ props.theme.name }}」暂无预设模板。切换主题或在下方预设里选择。
          </template>
          <template v-else-if="activeTab === 'user'">
            <div class="empty-title">还没有自创组件</div>
            <div class="empty-hint">
              点上方"+ 新建"开始,或在编辑器里选中一段 markdown 后用"保存选区为组件"把它存下来。
            </div>
          </template>
          <template v-else>本分类暂无预设</template>
        </div>
        <ComponentGrid
          v-else
          :entries="currentList"
          :actions="gridActions"
          @select="onCellSelect"
          @action="onCellAction"
        />
      </div>

      <SaveSelectionDialog
        :open="save.open"
        :source-text="save.source"
        :error="save.error"
        @cancel="cancelSave"
        @confirm="confirmSave"
      />
    </template>

    <template v-else>
      <ComponentStudio
        :init="studioInit!"
        :theme="props.theme"
        @done="onStudioSaved"
        @cancel="exitStudio"
      />
    </template>
  </aside>
</template>

<style scoped>
.palette {
  position: relative;
  width: var(--drawer-w-sm);
  height: 100%;
  display: flex; flex-direction: column;
  background: var(--surface-raised);
  border-left: 1px solid var(--border);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  color: var(--text);
}

.head-action {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  font: inherit;
  font-size: var(--fs-12);
  height: 24px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-pill);
  transition: var(--t-quick);
}
.head-action:hover { background: var(--accent-soft); border-color: var(--accent); }

.tabs {
  display: flex; flex-wrap: wrap; gap: 4px;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
}
.tab {
  height: 24px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface-raised);
  font-size: var(--fs-12);
  color: var(--text);
  cursor: pointer;
  transition: var(--t-quick);
}
.tab:hover { background: var(--surface); }
.tab.active {
  background: var(--accent); color: var(--accent-on); border-color: var(--accent);
}

.body {
  flex: 1 1 auto; overflow-y: auto;
  padding: var(--sp-4);
}
.empty {
  padding: var(--sp-5);
  color: var(--text-muted);
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
  text-align: center;
}
.empty-title { color: var(--text); font-weight: var(--fw-medium); margin-bottom: 4px; }
.empty-hint { color: var(--text-muted); }

.user-toolbar {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.tool-btn {
  font: inherit;
  font-size: var(--fs-12);
  height: 22px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface-raised);
  color: var(--text);
  cursor: pointer;
  transition: var(--t-quick);
}
.tool-btn:hover { background: var(--accent-soft); border-color: var(--accent); }
.tool-status {
  margin-left: auto;
  font-size: var(--fs-11);
  color: var(--text-muted);
}
.hidden-input { display: none; }

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .head-action { min-height: 44px; padding: 0 var(--sp-3); display: inline-flex; align-items: center; }
  .tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { height: 32px; flex: 0 0 auto; scroll-snap-align: start; }
}
</style>
