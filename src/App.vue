<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import Toolbar from './components/Toolbar.vue'
import DraftDrawer from './components/DraftDrawer.vue'
import ColorCustomizer from './components/ColorCustomizer.vue'
import ComponentPalette from './components/ComponentPalette.vue'
import CommandPalette, { type Command } from './components/CommandPalette.vue'
import HelpPanel from './components/HelpPanel.vue'
import OnboardingCard from './components/OnboardingCard.vue'
import UndoToast from './components/UndoToast.vue'
import { useDebouncedRender } from './composables/useDebouncedRender'
import { getTheme, themeList } from './themes'
import type { Theme } from './themes/types'
import { applyPalette } from './color/applyPalette'
import { copyHtmlToClipboard } from './clipboard/copyHtml'
import { exportHtml, exportImage, exportMd } from './clipboard/exportFile'
import { getSample } from './samples'
import {
  createDraft,
  deleteDraft,
  getActiveDraftId,
  importDraftsJSONDetailed,
  listDrafts,
  readDraft,
  setActiveDraftId,
  updateDraft,
  type Draft,
} from './storage/drafts'

const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'
const ONBOARD_STORAGE_KEY = 'wechat-typeset:onboard:dismissed'

interface Seed { primary: string; secondary: string; accent: string; dark: boolean }

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

const md = ref<string>('')
const activeDraftId = ref<string | null>(null)
const baseThemeId = ref<string>('default')
const customTheme = ref<Theme | null>(null)
const lastSeed = ref<Seed | null>(null)

const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const previewRef = ref<InstanceType<typeof Preview> | null>(null)
const paletteRef = ref<InstanceType<typeof ComponentPalette> | null>(null)

const ui = reactive({
  leftSlot: null as null | 'drafts',
  rightSlot: null as null | 'components' | 'customizer',
  commandOpen: false,
  helpOpen: false,
})

const onboardDismissed = ref<boolean>(
  typeof localStorage !== 'undefined' && localStorage.getItem(ONBOARD_STORAGE_KEY) === '1',
)

const mobileTab = ref<'editor' | 'preview'>('editor')

const activeTheme = computed<Theme>(() => customTheme.value ?? getTheme(baseThemeId.value))

const draftIndexTick = ref(0) // 强制重算草稿标题（重命名后）
const currentDraftTitle = computed(() => {
  void draftIndexTick.value
  if (!activeDraftId.value) return ''
  return listDrafts().find((d) => d.id === activeDraftId.value)?.title ?? ''
})

const drawerStates = computed(() => ({
  drafts: ui.leftSlot === 'drafts',
  components: ui.rightSlot === 'components',
  customizer: ui.rightSlot === 'customizer',
}))

function toggleLeft(slot: 'drafts') {
  ui.leftSlot = ui.leftSlot === slot ? null : slot
}
function toggleRight(slot: 'components' | 'customizer') {
  ui.rightSlot = ui.rightSlot === slot ? null : slot
}

// ==============================================
// 草稿初始化与持续保存
// ==============================================
function initActiveDraft(preferredThemeId: string = 'default') {
  const id = getActiveDraftId()
  if (id) {
    const existing = readDraft(id)
    if (existing) {
      activeDraftId.value = existing.id
      md.value = existing.body
      if (existing.themeId) baseThemeId.value = existing.themeId
      return
    }
  }
  const drafts = listDrafts()
  if (drafts.length > 0) {
    const first = drafts[0]
    activeDraftId.value = first.id
    setActiveDraftId(first.id)
    const body = readDraft(first.id)?.body ?? ''
    md.value = body
    if (first.themeId) baseThemeId.value = first.themeId
  } else {
    const created = createDraft({
      title: 'wechat-typeset 示例',
      body: getSample(preferredThemeId),
      themeId: preferredThemeId,
    })
    activeDraftId.value = created.id
    md.value = created.body
  }
}

const DRAFT_SAVE_DELAY = 400
let draftSaveTimer: number | null = null
let pendingDraftBody: string | null = null
let savedFadeTimer: number | null = null

const savingState = ref<'idle' | 'saving' | 'saved'>('idle')

const transientStatus = ref<string>('')
let transientTimer: number | null = null
function pingTransient(msg: string, ms = 1500) {
  transientStatus.value = msg
  if (transientTimer !== null) window.clearTimeout(transientTimer)
  transientTimer = window.setTimeout(() => (transientStatus.value = ''), ms)
}

const displayedSavingLabel = computed(() => {
  if (transientStatus.value) return transientStatus.value
  if (savingState.value === 'saving') return '保存中…'
  if (savingState.value === 'saved') return '已保存'
  return '　'
})
const displayedSavingState = computed<'idle' | 'saving' | 'saved'>(() => {
  if (transientStatus.value) return 'saved'
  return savingState.value
})

function flushDraftSave() {
  if (draftSaveTimer !== null) {
    window.clearTimeout(draftSaveTimer)
    draftSaveTimer = null
  }
  if (pendingDraftBody !== null && activeDraftId.value) {
    updateDraft(activeDraftId.value, { body: pendingDraftBody })
    pendingDraftBody = null
    draftIndexTick.value += 1
    savingState.value = 'saved'
    if (savedFadeTimer !== null) window.clearTimeout(savedFadeTimer)
    savedFadeTimer = window.setTimeout(() => {
      if (savingState.value === 'saved') savingState.value = 'idle'
    }, 1800)
  }
}

watch(md, (val) => {
  if (!activeDraftId.value) return
  pendingDraftBody = val
  savingState.value = 'saving'
  if (draftSaveTimer !== null) window.clearTimeout(draftSaveTimer)
  draftSaveTimer = window.setTimeout(flushDraftSave, DRAFT_SAVE_DELAY)
})

watch(mobileTab, () => {
  ui.leftSlot = null
  ui.rightSlot = null
})

watch(baseThemeId, (val, prev) => {
  localStorage.setItem(THEME_STORAGE_KEY, val)
  if (customTheme.value && val !== prev) {
    const prevCustom = customTheme.value
    const prevSeed = lastSeed.value
    customTheme.value = null
    lastSeed.value = null
    showUndo('已切换主题并重置自定义配色', () => {
      baseThemeId.value = prev
      customTheme.value = prevCustom
      lastSeed.value = prevSeed
    })
  }
  // 正文还停在前一主题的示例（用户没动过）就自动换成新主题的示例；
  // 已经输入过内容则保留，避免覆盖用户草稿。
  if (val !== prev && md.value === getSample(prev)) {
    md.value = getSample(val)
  }
  if (activeDraftId.value) {
    updateDraft(activeDraftId.value, { themeId: val })
    draftIndexTick.value += 1
  }
})

// ==============================================
// 错误 banner + 撤销 toast
// ==============================================
const persistentError = ref<string | null>(null)
const undo = ref<{ message: string; restore: () => void } | null>(null)
function showUndo(message: string, restore: () => void) {
  undo.value = { message, restore }
}
function onUndo() {
  undo.value?.restore()
  undo.value = null
}
function onUndoExpire() {
  undo.value = null
}

// ==============================================
// 渲染管线（不动）
// ==============================================
const pipelineInput = computed(() => ({ md: md.value, theme: activeTheme.value }))
const { rendered, flush } = useDebouncedRender(pipelineInput, { delayMs: 80 })

// ==============================================
// 动作
// ==============================================
async function handleCopy() {
  flush()
  const html = rendered.value.html
  const plain = md.value
  const result = await copyHtmlToClipboard(html, plain)
  if (result.ok) {
    pingTransient(result.mode === 'clipboard-api' ? '已复制' : '已复制（降级）')
    persistentError.value = null
  } else {
    persistentError.value = `复制失败：${result.error ?? '未知错误'}（请换 Chrome/Safari 或关闭跨域 iframe）`
  }
}

function handleSave() {
  if (!activeDraftId.value) return
  pendingDraftBody = md.value
  flushDraftSave()
  pingTransient('已保存')
}

function handleClear() {
  if (!md.value) return
  const prev = md.value
  md.value = ''
  showUndo('已清空正文', () => {
    md.value = prev
  })
}

function handleLoadSample() {
  const sample = getSample(baseThemeId.value)
  if (md.value === sample) return
  const prev = md.value
  md.value = sample
  if (prev.trim()) {
    showUndo('已载入示例，原正文可撤销', () => {
      md.value = prev
    })
  } else {
    pingTransient('已载入示例')
  }
}

function handleSelectDraft(id: string) {
  if (id === activeDraftId.value) return
  flushDraftSave()
  const d = readDraft(id)
  if (!d) return
  activeDraftId.value = d.id
  setActiveDraftId(d.id)
  md.value = d.body
  if (d.themeId) baseThemeId.value = d.themeId
  draftIndexTick.value += 1
}

function handleDeleteDraftRequest(id: string, title: string) {
  const full = readDraft(id)
  if (!full) return
  const wasActive = activeDraftId.value === id
  deleteDraft(id)
  if (wasActive) {
    const next = listDrafts()[0]
    if (next) {
      const body = readDraft(next.id)?.body ?? ''
      activeDraftId.value = next.id
      setActiveDraftId(next.id)
      md.value = body
      if (next.themeId) baseThemeId.value = next.themeId
    } else {
      activeDraftId.value = null
      md.value = ''
    }
  }
  draftIndexTick.value += 1
  showUndo(`已删除「${title}」`, () => {
    const record: Draft = { ...full }
    importDraftsJSONDetailed(JSON.stringify({ version: 1, drafts: [record] }))
    activeDraftId.value = record.id
    setActiveDraftId(record.id)
    md.value = record.body
    if (record.themeId) baseThemeId.value = record.themeId
    draftIndexTick.value += 1
  })
}

function handleApplyPalette(seed: Seed) {
  const base = getTheme(baseThemeId.value)
  customTheme.value = applyPalette({
    base,
    seed,
    id: `${base.id}--custom`,
    name: `${base.name} · 自定义`,
  })
  lastSeed.value = { ...seed }
}

function handleResetPalette() {
  if (!customTheme.value) return
  customTheme.value = null
  lastSeed.value = null
  pingTransient('已还原主题配色')
}

function handleInsertTemplate(snippet: string) {
  const inst = editorRef.value
  if (inst && typeof inst.insertAtCursor === 'function') {
    inst.insertAtCursor(snippet)
  } else {
    md.value = `${md.value}${md.value.endsWith('\n') ? '' : '\n'}\n${snippet}`
  }
  pingTransient('已插入')
}

function handleSaveSelection() {
  const inst = editorRef.value
  const text = inst?.getSelectedText?.() ?? ''
  if (!text.trim()) {
    pingTransient('先在编辑器中选中一段 markdown')
    return
  }
  if (ui.rightSlot !== 'components') ui.rightSlot = 'components'
  requestAnimationFrame(() => paletteRef.value?.openSaveDialog?.(text))
}

function fileStem(): string {
  const t = (listDrafts().find((d) => d.id === activeDraftId.value)?.title ?? 'wechat-typeset-export').replace(
    /[\\/:*?"<>|\s]+/g,
    '-',
  )
  return t || 'wechat-typeset-export'
}

function doExportHtml() {
  flush()
  const colors = activeTheme.value.tokens.colors
  exportHtml(`${fileStem()}.html`, rendered.value.html, {
    background: colors.bg,
    color: colors.text,
  })
  pingTransient('已导出 HTML')
}

function doExportMd() {
  exportMd(`${fileStem()}.md`, md.value)
  pingTransient('已导出 Markdown')
}

async function doExportImage() {
  pingTransient('长图渲染中…', 4000)
  const iframe = previewRef.value?.getIframe?.() ?? null
  const body = iframe?.contentDocument?.body
  if (!body) {
    persistentError.value = '长图导出失败：未找到预览节点'
    return
  }
  const result = await exportImage(body, `${fileStem()}.png`, {
    background: activeTheme.value.tokens.colors.bg,
  })
  if (result.ok) pingTransient('已导出长图')
  else persistentError.value = `长图导出失败：${result.error ?? '未知错误'}`
}

// ==============================================
// 滚动联动（按比例，~200ms 锁防止往复）
// ==============================================
let lastSyncTime = 0
let lastSyncSource: 'editor' | 'preview' | null = null
const SYNC_LOCK_MS = 180

function onEditorScroll(ratio: number) {
  if (lastSyncSource === 'preview' && Date.now() - lastSyncTime < SYNC_LOCK_MS) return
  lastSyncSource = 'editor'
  lastSyncTime = Date.now()
  previewRef.value?.scrollToRatio(ratio)
}

function onPreviewScroll(ratio: number) {
  if (lastSyncSource === 'editor' && Date.now() - lastSyncTime < SYNC_LOCK_MS) return
  lastSyncSource = 'preview'
  lastSyncTime = Date.now()
  editorRef.value?.scrollToRatio(ratio)
}

// ==============================================
// 命令面板 + 快捷键
// ==============================================
const commands = computed<Command[]>(() => {
  void draftIndexTick.value
  const list: Command[] = []
  list.push({ id: 'copy', title: '复制为微信富文本', group: '操作', shortcut: `${modKey} ↵`, run: handleCopy })
  list.push({ id: 'save', title: '保存当前草稿', group: '操作', shortcut: `${modKey} S`, run: handleSave })
  list.push({ id: 'clear', title: '清空正文', group: '操作', run: handleClear })
  list.push({ id: 'load-sample', title: '载入当前主题示例', group: '操作', run: handleLoadSample })
  list.push({ id: 'save-selection', title: '保存选区为组件', group: '操作', run: handleSaveSelection })

  list.push({ id: 'toggle-drafts', title: drawerStates.value.drafts ? '关闭草稿抽屉' : '打开草稿抽屉', group: '视图', shortcut: `${modKey} ⇧ D`, run: () => toggleLeft('drafts') })
  list.push({ id: 'toggle-components', title: drawerStates.value.components ? '关闭组件库' : '打开组件库', group: '视图', shortcut: `${modKey} ⇧ P`, run: () => toggleRight('components') })
  list.push({ id: 'toggle-customizer', title: drawerStates.value.customizer ? '关闭自定义配色' : '打开自定义配色', group: '视图', shortcut: `${modKey} ⇧ C`, run: () => toggleRight('customizer') })
  list.push({ id: 'open-help', title: '快捷键与帮助', group: '视图', shortcut: '?', run: () => (ui.helpOpen = true) })

  list.push({ id: 'export-html', title: '导出 HTML', group: '导出', shortcut: `${modKey} ⇧ H`, run: doExportHtml })
  list.push({ id: 'export-md', title: '导出 Markdown', group: '导出', shortcut: `${modKey} ⇧ M`, run: doExportMd })
  list.push({ id: 'export-image', title: '导出长图', group: '导出', run: doExportImage })

  themeList.forEach((t) => {
    list.push({
      id: `theme-${t.id}`,
      title: `主题 · ${t.name}`,
      group: '主题',
      keywords: `${t.id} theme`,
      run: () => { baseThemeId.value = t.id },
    })
  })

  list.push({
    id: 'new-draft',
    title: '新建草稿',
    group: '草稿',
    run: () => {
      const created = createDraft({ title: '新草稿', body: '# 新草稿\n', themeId: baseThemeId.value })
      handleSelectDraft(created.id)
      draftIndexTick.value += 1
    },
  })
  listDrafts().slice(0, 30).forEach((d) => {
    list.push({
      id: `draft-${d.id}`,
      title: `草稿 · ${d.title || '未命名'}`,
      group: '草稿',
      keywords: d.themeId,
      run: () => handleSelectDraft(d.id),
    })
  })
  return list
})

function onShortcut(e: KeyboardEvent) {
  const meta = e.ctrlKey || e.metaKey
  const target = e.target as HTMLElement | null
  const inEditable = !!target?.closest('input, textarea, [contenteditable="true"], .cm-editor')

  // Meta-driven shortcuts
  if (meta) {
    const key = e.key.toLowerCase()
    // ⌘K: open command palette (reassigned from copy)
    if (key === 'k' && !e.shiftKey) {
      e.preventDefault()
      ui.commandOpen = true
      return
    }
    // ⌘+Enter: copy
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleCopy()
      return
    }
    // ⌘+S: save
    if (key === 's' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
      return
    }
    // ⌘+Shift+C: customizer
    if (key === 'c' && e.shiftKey) {
      e.preventDefault()
      toggleRight('customizer')
      return
    }
    // ⌘+Shift+D: drafts
    if (key === 'd' && e.shiftKey) {
      e.preventDefault()
      toggleLeft('drafts')
      return
    }
    // ⌘+Shift+P: components
    if (key === 'p' && e.shiftKey) {
      e.preventDefault()
      toggleRight('components')
      return
    }
    if (key === 'h' && e.shiftKey) {
      e.preventDefault()
      doExportHtml()
      return
    }
    if (key === 'm' && e.shiftKey) {
      e.preventDefault()
      doExportMd()
      return
    }
  }
  // ? key: help (only when not typing)
  if (e.key === '?' && !inEditable) {
    e.preventDefault()
    ui.helpOpen = true
    return
  }
  // Escape: close top-most overlay
  if (e.key === 'Escape') {
    if (ui.commandOpen) { ui.commandOpen = false; return }
    if (ui.helpOpen) { ui.helpOpen = false; return }
  }
}

// ==============================================
// 引导层
// ==============================================
function dismissOnboard() {
  onboardDismissed.value = true
  try { localStorage.setItem(ONBOARD_STORAGE_KEY, '1') } catch { /* ignore */ }
}

const showOnboard = computed(() =>
  !onboardDismissed.value &&
  !ui.commandOpen &&
  !ui.helpOpen &&
  ui.leftSlot === null &&
  ui.rightSlot === null,
)

// ==============================================
// 生命周期
// ==============================================
onMounted(() => {
  const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedThemeId) baseThemeId.value = savedThemeId
  initActiveDraft(baseThemeId.value)
  window.addEventListener('keydown', onShortcut)
  window.addEventListener('pagehide', flushDraftSave)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onShortcut)
  window.removeEventListener('pagehide', flushDraftSave)
  flushDraftSave()
})
</script>

<template>
  <div class="app">
    <Toolbar
      :draft-title="currentDraftTitle"
      :word-count="rendered.wordCount"
      :reading-time="rendered.readingTime"
      :saving-state="displayedSavingState"
      :saving-label="displayedSavingLabel"
      :error="persistentError"
      :theme-id="baseThemeId"
      :has-custom-color="customTheme !== null"
      :drawer="drawerStates"
      @update:theme-id="baseThemeId = $event"
      @copy="handleCopy"
      @clear="handleClear"
      @load-sample="handleLoadSample"
      @save-selection="handleSaveSelection"
      @toggle-drafts="toggleLeft('drafts')"
      @toggle-components="toggleRight('components')"
      @toggle-customizer="toggleRight('customizer')"
      @open-command="ui.commandOpen = true"
      @open-help="ui.helpOpen = true"
      @dismiss-error="persistentError = null"
      @export-html="doExportHtml"
      @export-md="doExportMd"
      @export-image="doExportImage"
    />
    <main class="main" :data-mobile-tab="mobileTab">
      <DraftDrawer
        v-if="ui.leftSlot === 'drafts'"
        :active-id="activeDraftId"
        @select="handleSelectDraft"
        @close="ui.leftSlot = null"
        @request-delete="handleDeleteDraftRequest"
      />
      <section class="pane pane-editor">
        <Editor
          ref="editorRef"
          v-model="md"
          @scroll="onEditorScroll"
        />
        <OnboardingCard
          v-if="showOnboard"
          @dismiss="dismissOnboard"
          @open-help="ui.helpOpen = true; dismissOnboard()"
          @open-command="ui.commandOpen = true; dismissOnboard()"
        />
      </section>
      <section class="pane pane-preview">
        <Preview
          ref="previewRef"
          :html="rendered.html"
          @scroll="onPreviewScroll"
        />
      </section>
      <ComponentPalette
        v-if="ui.rightSlot === 'components'"
        ref="paletteRef"
        :theme="activeTheme"
        @insert="handleInsertTemplate"
        @close="ui.rightSlot = null"
      />
      <ColorCustomizer
        v-if="ui.rightSlot === 'customizer'"
        :has-custom-color="customTheme !== null"
        @apply="handleApplyPalette"
        @reset="handleResetPalette"
        @close="ui.rightSlot = null"
      />
    </main>

    <CommandPalette
      v-if="ui.commandOpen"
      :commands="commands"
      @close="ui.commandOpen = false"
    />
    <HelpPanel
      v-if="ui.helpOpen"
      :commands="commands"
      @close="ui.helpOpen = false"
    />
    <UndoToast
      v-if="undo"
      :message="undo.message"
      @undo="onUndo"
      @expire="onUndoExpire"
    />

    <!-- Mobile backdrop: tap outside an open drawer to dismiss (mobile only via CSS) -->
    <div
      v-if="ui.leftSlot || ui.rightSlot"
      class="mobile-drawer-mask"
      aria-hidden="true"
      @click="ui.leftSlot = null; ui.rightSlot = null"
    />

    <!-- Mobile bottom tab bar -->
    <nav class="mobile-tabs" role="tablist" aria-label="视图切换">
      <button
        class="mobile-tab"
        role="tab"
        :aria-selected="mobileTab === 'editor'"
        :class="{ active: mobileTab === 'editor' }"
        @click="mobileTab = 'editor'"
      >编辑</button>
      <button
        class="mobile-tab-copy"
        aria-label="复制到剪贴板"
        @click="handleCopy"
      >一键复制</button>
      <button
        class="mobile-tab"
        role="tab"
        :aria-selected="mobileTab === 'preview'"
        :class="{ active: mobileTab === 'preview' }"
        @click="mobileTab = 'preview'"
      >预览</button>
    </nav>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-text);
}
.main {
  flex: 1 1 auto;
  display: flex;
  min-height: 0;
}
.pane {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.pane-editor {
  border-right: 1px solid var(--border);
}
.pane-preview {
  flex: 0 0 auto;
  width: calc(var(--preview-w) + var(--sp-7));
  background: var(--paper-300);
}

/* Mobile drawer mask (hidden on desktop) */
.mobile-drawer-mask {
  display: none;
}

/* Mobile bottom tab bar — hidden on desktop */
.mobile-tabs {
  display: none;
}
.mobile-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  font-weight: var(--fw-medium);
  cursor: pointer;
  border-radius: var(--radius-2);
  transition: var(--t-quick);
  -webkit-tap-highlight-color: transparent;
}
.mobile-tab.active {
  color: var(--accent);
  background: var(--accent-soft);
}
.mobile-tab-copy {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 96px;
  height: 44px;
  padding: 0 var(--sp-5);
  border: none;
  background: var(--accent);
  color: var(--accent-on);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  font-weight: var(--fw-medium);
  border-radius: var(--radius-2);
  cursor: pointer;
  transition: var(--t-quick);
  -webkit-tap-highlight-color: transparent;
}
.mobile-tab-copy:hover { background: var(--accent-hover); }
.mobile-tab-copy:active { background: var(--accent-press); }

@media (max-width: 767px) {
  .app {
    --mobile-tabs-h: 56px;
    --toolbar-h: 93px; /* 两行工具栏：40px 标题行 + 1px 分隔线 + 52px 工具行 */
  }

  /* Show the tab bar */
  .mobile-tabs {
    display: flex;
    flex: 0 0 auto;
    height: var(--mobile-tabs-h);
    align-items: center;
    gap: var(--sp-2);
    padding: 0 var(--sp-3);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: var(--surface-raised);
    border-top: 1px solid var(--border);
  }

  /* Preview pane: full width on mobile */
  .pane-preview {
    flex: 1 1 auto;
    width: 100%;
  }

  /* Hide the inactive pane */
  .main[data-mobile-tab="editor"] .pane-preview { display: none; }
  .main[data-mobile-tab="preview"] .pane-editor { display: none; }

  /* No border between panes on mobile */
  .pane-editor { border-right: none; }

  /* Side panels become full-screen overlays — cover .drawer / .panel / .palette */
  .main :deep(.drawer),
  .main :deep(.panel),
  .main :deep(.palette) {
    position: fixed;
    top: var(--toolbar-h);
    right: 0;
    bottom: var(--mobile-tabs-h, 56px);
    left: 0;
    width: 100% !important;
    max-width: 100vw;
    z-index: 50;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    animation: sheet-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @keyframes sheet-in {
    from { transform: translateY(8px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }

  /* Tap-outside mask */
  .mobile-drawer-mask {
    display: block;
    position: fixed;
    top: var(--toolbar-h);
    left: 0; right: 0;
    bottom: var(--mobile-tabs-h, 56px);
    background: rgba(14, 14, 10, 0.32);
    z-index: 45;
  }

  /* Prevent iOS focus-zoom: all text inputs >= 16px */
  :deep(input[type="text"]),
  :deep(input[type="search"]),
  :deep(input:not([type])),
  :deep(textarea) {
    font-size: 16px;
  }
}
</style>
