<script setup lang="ts">
/**
 * 组件库抽屉：装配 + 模式切换（list / studio）+ 抽屉宽度可拖加宽。
 *
 * studio 模式时，ComponentStudio 由本组件 teleport 到 body 渲染为 90vw×90vh
 * 全屏工作台；列表保留在抽屉里作为参照背景；mask 点击 / Esc 都走
 * ComponentStudio.attemptCancel() 保留 dirty 提示。
 *
 * "保存选区"通过 defineExpose 暴露 openSaveDialog 由 actions.handleSaveSelection 调用。
 */
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import {
  COMPONENT_GROUPS,
  type ComponentEntry,
  type ComponentKind,
  type ComponentGroup,
  type ComponentSub,
  type GroupId,
  getThemeTemplateEntries,
  createComponent,
  type CreateResult,
} from '../../domain/components-lib'
import { useUserComponents } from '../composables/useUserComponents'
import type { Theme } from '../../core/themes/types'
import { BUILTIN_COMPONENTS } from '../../domain/components-lib/registry'

/** UV 管理面板懒加载——大多数用户不会进入"我的样式" tab。 */
const UserVariantsPanel = defineAsyncComponent(
  () => import('./component-studio/UserVariantsPanel.vue'),
)
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
import DrawerResizer from '../primitives/DrawerResizer.vue'
import ComponentGrid, { type GridAction } from './ComponentGrid.vue'
import SaveSelectionDialog from './SaveSelectionDialog.vue'
import ComponentStudio, { type StudioInit } from './component-studio/ComponentStudio.vue'
import { useDrawerWidth } from '../composables/useDrawerWidth'
import { COMPONENT_PALETTE_WIDTH_KEY } from '../../infra/storage/storageKeys'

const props = defineProps<{ theme: Theme }>()
const emit = defineEmits<{
  (e: 'insert', md: string): void
  (e: 'close'): void
}>()

const mode = ref<'list' | 'studio'>('list')
const studioInit = ref<StudioInit | null>(null)
const studioRef = ref<InstanceType<typeof ComponentStudio> | null>(null)

// 两级导航：一级 7 大组（registry.ts · COMPONENT_GROUPS），二级 sub 严格对齐
// 单一 ComponentKind 或单一 variantId。activeSub 是 sub.key 字符串（不带语义双关），
// 取条目走 sub.source 判别联合（type:'kind'/'theme-template'/'user'/'uv'）。
const activeGroupId = ref<GroupId>('template')
const activeSub = ref<string>(COMPONENT_GROUPS[0]?.subs[0]?.key ?? '')

const activeGroup = computed<ComponentGroup>(
  () => COMPONENT_GROUPS.find((g) => g.id === activeGroupId.value) ?? COMPONENT_GROUPS[0],
)

const activeSubDef = computed<ComponentSub | undefined>(() =>
  activeGroup.value.subs.find((s) => s.key === activeSub.value),
)

function selectGroup(id: GroupId) {
  activeGroupId.value = id
  const grp = COMPONENT_GROUPS.find((g) => g.id === id)
  if (grp && grp.subs.length > 0) activeSub.value = grp.subs[0].key
}

// 抽屉左缘拖宽：本组件默认 340px（var(--drawer-w-sm)），localStorage 持久化
const COMPONENT_PALETTE_DEFAULT_W = 340
const {
  width: drawerWidth,
  maxWidth: drawerMaxWidth,
  defaultWidth: drawerDefaultWidth,
  minWidth: drawerMinWidth,
} = useDrawerWidth({
  storageKey: COMPONENT_PALETTE_WIDTH_KEY,
  defaultWidth: COMPONENT_PALETTE_DEFAULT_W,
  min: 320,
  maxViewportRatio: 0.55,
})

const paletteStyle = computed(() =>
  drawerWidth.value === null ? undefined : { width: drawerWidth.value + 'px' },
)

/**
 * Studio modal mask 点击 / Esc 都走 ComponentStudio.attemptCancel()，
 * 让 dirty 提示统一在一处（避免 mask 点掉直接销毁、用户改动丢失）。
 */
function onStudioMaskClick() {
  studioRef.value?.attemptCancel()
}

function onStudioKeyDown(ev: KeyboardEvent) {
  if (ev.key === 'Escape' && mode.value === 'studio') {
    // bubble 阶段：让 CodeMirror autocomplete 等内部 Esc 处理先消费；
    // 走到 window 之前在这里 stopPropagation，避免 useKeyboardShortcuts 同时
    // 关掉别的浮层（命令面板 / 帮助）
    ev.stopPropagation()
    ev.preventDefault()
    studioRef.value?.attemptCancel()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onStudioKeyDown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onStudioKeyDown)
})

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
    codeBlock: [],
    note: [],
    highlight: [],
    footnotes: [],
    recommend: [],
    qrcode: [],
    footerCTA: [],
    pullQuote: [],
    announcement: [],
    tableCard: [],
    gallery: [],
    dialogue: [],
    qaBlock: [],
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

/**
 * 按 sub.source 派发取条目。统一入口便于 currentList / subCount / 空态消费。
 *   - type:'kind' + variantIds → 在 kind 桶上按 variantId 收窄（页饰组用此分支）
 *   - type:'theme-template' → 主题 templates 字段派生
 *   - type:'user' → 用户自创组件仓
 *   - type:'uv' → 走独立面板（grid 上不渲染，返回空数组）
 */
function entriesForSub(sub: ComponentSub | undefined): ComponentEntry[] {
  if (!sub) return []
  const src = sub.source
  if (src.type === 'theme-template') return themeTemplateList.value
  if (src.type === 'user') return userComponents.value
  if (src.type === 'uv') return []
  const bucket = builtinByKind.value[src.kind] ?? []
  if (!src.variantIds || src.variantIds.length === 0) return bucket
  const allow = new Set(src.variantIds)
  return bucket.filter((e) => e.variantId !== undefined && allow.has(e.variantId))
}

const currentList = computed<ComponentEntry[]>(() => entriesForSub(activeSubDef.value))

const gridActions = computed<GridAction[]>(() => {
  if (activeSubDef.value?.source.type === 'user') return ['edit', 'share', 'delete']
  // builtin / theme-template：派生入口
  return ['derive']
})

/** sub-tab 显示计数：让作者扫一眼知道哪个子分类有内容（uv 走独立面板，不计） */
function subCount(sub: ComponentSub): number {
  if (sub.source.type === 'uv') return 0
  return entriesForSub(sub).length
}

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
    if (entry.source !== 'user') {
      pingStatus('内置组件不可直接编辑，请先派生为「我的」', 2500)
      return
    }
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
  // 保存成功后跳到"我的 → 我的组件"，让作者立刻看到新条目
  selectGroup('mine')
  activeSub.value = 'm-user'
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
  selectGroup('mine')
  activeSub.value = 'm-user'
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
  <aside class="palette" aria-label="组件库" :style="paletteStyle">
    <DrawerResizer
      :width="drawerWidth"
      :min="drawerMinWidth"
      :max="drawerMaxWidth"
      :default-width="drawerDefaultWidth"
      @update:width="drawerWidth = $event"
    />
    <PanelHeader title="插入" size="sm" @close="emit('close')">
      <template #actions>
        <button
          v-if="mode !== 'studio'"
          class="head-action"
          title="新建组件"
          @click="openStudioNew"
        >+ 新建</button>
      </template>
    </PanelHeader>

    <!-- 一级：7 大组（主题模板 / 提示与强调 / 结构 / 数据与对话 / 互动 / 页饰 / 我的） -->
    <nav class="tabs tabs-group" role="tablist" aria-label="组件分组">
      <button
        v-for="g in COMPONENT_GROUPS"
        :key="g.id"
        class="tab"
        role="tab"
        :aria-selected="activeGroupId === g.id"
        :class="{ active: activeGroupId === g.id }"
        @click="selectGroup(g.id)"
      >
        {{ g.label }}
      </button>
    </nav>

    <!-- 二级：组内子分类（>1 时渲染；单 sub 直接退化） -->
    <nav
      v-if="activeGroup.subs.length > 1"
      class="tabs tabs-sub"
      role="tablist"
      aria-label="子分类"
    >
      <button
        v-for="s in activeGroup.subs"
        :key="s.key"
        class="sub-tab"
        role="tab"
        :aria-selected="activeSub === s.key"
        :class="{ active: activeSub === s.key }"
        @click="activeSub = s.key"
      >
        <span>{{ s.label }}</span>
        <span v-if="s.source.type !== 'uv' && subCount(s) > 0" class="sub-count">{{ subCount(s) }}</span>
      </button>
    </nav>

    <div v-if="activeSubDef?.source.type === 'user'" class="user-toolbar">
      <button class="tool-btn" title="导出我的组件为 JSON" @click="exportAll">↓ 导出</button>
      <button class="tool-btn" title="从 JSON 文件导入组件" @click="pickImport">↑ 导入</button>
      <input
        ref="importInputRef"
        type="file"
        accept="application/json,.json"
        class="hidden-input"
        @change="onImportFile"
      />
      <span
        v-if="transientStatus"
        class="tool-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >{{ transientStatus }}</span>
    </div>

    <div class="body">
      <UserVariantsPanel v-if="activeSubDef?.source.type === 'uv'" />
      <template v-else>
        <div v-if="currentList.length === 0" class="empty">
          <template v-if="activeSubDef?.source.type === 'theme-template'">
            <div class="empty-title">当前主题「{{ props.theme.name }}」暂无预设模板</div>
            <div class="empty-hint">从工具栏切换主题，或在其它分类挑选通用组件。</div>
          </template>
          <template v-else-if="activeSubDef?.source.type === 'user'">
            <div class="empty-title">还没有自创组件</div>
            <div class="empty-hint">
              点下方"新建"开始，或在编辑器里选中一段 markdown 后用"保存选区为组件"把它存下来。
            </div>
            <button class="empty-cta" type="button" @click="openStudioNew">＋ 新建组件</button>
          </template>
          <template v-else>
            <div class="empty-title">本分类暂无预设</div>
            <div class="empty-hint">切到其它子分类继续浏览。</div>
          </template>
        </div>
        <ComponentGrid
          v-else
          :entries="currentList"
          :theme="props.theme"
          :actions="gridActions"
          @select="onCellSelect"
          @action="onCellAction"
        />
      </template>
    </div>

    <SaveSelectionDialog
      :open="save.open"
      :source-text="save.source"
      :error="save.error"
      @cancel="cancelSave"
      @confirm="confirmSave"
    />
  </aside>

  <!-- Studio 全屏工作台：teleport 到 body，避开抽屉 340px 宽限制。
       backdrop 半透明，列表与 toolbar 透出做背景参照。 -->
  <Teleport to="body">
    <div
      v-if="mode === 'studio' && studioInit"
      class="studio-modal-mask"
      role="dialog"
      aria-modal="true"
      aria-label="组件 Studio"
      @click.self="onStudioMaskClick"
    >
      <div class="studio-modal-card">
        <ComponentStudio
          ref="studioRef"
          :init="studioInit"
          :theme="props.theme"
          @done="onStudioSaved"
          @cancel="exitStudio"
        />
      </div>
    </div>
  </Teleport>
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

/* Studio 全屏工作台：mask + card。
 * mask 用 PanelShell 同款 rgba(14,14,10,0.35) 半透明纸黑；z-index 100 与 PanelShell 一致。
 * card 宽高用 vw/vh 与 px 取 min，保证 1280×800 笔记本与超宽屏都能合理展开。 */
.studio-modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(14, 14, 10, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: studio-mask-in 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.studio-modal-card {
  width: min(1240px, 94vw);
  height: min(840px, 90vh);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: studio-card-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
@keyframes studio-mask-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes studio-card-in {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* 移动端：mask 顶部贴 toolbar + 底部 tab bar 之间，card 占满该窗，
 * 与 App.vue 的 .main :deep(.palette) 全屏化保持视觉一致；动画收为淡入 */
@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .studio-modal-mask {
    align-items: stretch;
    background: var(--surface-raised);
  }
  .studio-modal-card {
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
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
.tabs-sub {
  padding: var(--sp-2) var(--sp-4);
  background: var(--surface);
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

/* 二级 sub-tab：弱化形态，与一级组按钮拉开层级
 * 文字 + 内嵌计数小徽标（active 时白底反色 chip） */
.sub-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-1);
  border: 1px solid transparent;
  background: transparent;
  font-size: var(--fs-11);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--t-quick);
  font-family: var(--font-text);
}
.sub-tab:hover { color: var(--text); background: var(--surface-raised); }
.sub-tab.active {
  color: var(--accent);
  background: var(--accent-soft);
  font-weight: var(--fw-medium);
}
.sub-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 14px;
  padding: 0 4px;
  font-size: var(--fs-10);
  font-feature-settings: var(--font-feat-num);
  background: var(--surface);
  color: var(--text-subtle);
  border-radius: var(--radius-pill);
}
.sub-tab.active .sub-count {
  background: var(--accent);
  color: var(--accent-on);
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
.empty-hint { color: var(--text-muted); margin-bottom: var(--sp-3); }
.empty-cta {
  margin: var(--sp-2) auto 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 30px;
  padding: 0 var(--sp-4);
  background: var(--accent);
  color: var(--accent-on);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  font: inherit;
  font-size: var(--fs-12);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: var(--t-quick);
}
.empty-cta:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

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
