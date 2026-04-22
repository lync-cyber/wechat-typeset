<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import ThemeStrip from './components/ThemeStrip.vue'
import Toolbar from './components/Toolbar.vue'
import DraftDrawer from './components/DraftDrawer.vue'
import ColorCustomizer from './components/ColorCustomizer.vue'
import ComponentPalette from './components/ComponentPalette.vue'
import PublishChecklist from './components/PublishChecklist.vue'
import CommandPalette, { type Command } from './components/CommandPalette.vue'
import HelpPanel from './components/HelpPanel.vue'
import OnboardingCard from './components/OnboardingCard.vue'
import UndoToast from './components/UndoToast.vue'
import type { ToolbarAction, ToolbarToggleTarget } from './components/toolbar-types'
import { useDebouncedRender } from './composables/useDebouncedRender'
import { useUiDrawers } from './composables/useUiDrawers'
import { useDraftLifecycle } from './composables/useDraftLifecycle'
import { useClipboardCopy } from './composables/useClipboardCopy'
import { useExportActions } from './composables/useExportActions'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import { getTheme, themeList } from './themes'
import type { Theme } from './themes/types'
import { applyPalette } from './color/applyPalette'
import { fixZhTypo, scanZhTypo } from './pipeline/zhTypo'
import { getSample, SAMPLE_BY_THEME } from './samples'
import { createDraft, listDrafts, updateDraft } from './storage/drafts'
import { safeRead, safeWrite } from './storage/_kv'

const THEME_STORAGE_KEY = 'wechat-typeset:theme:last'
const ONBOARD_STORAGE_KEY = 'wechat-typeset:onboard:dismissed'

interface Seed { primary: string; secondary: string; accent: string; dark: boolean }

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

// ==============================================
// 核心响应式状态（跨 composable 共享）
// ==============================================
const md = ref<string>('')
const baseThemeId = ref<string>('default')
const hoverThemeId = ref<string | null>(null) // Preview 顶部缩略条的 hover 态，临时覆盖 activeTheme
const customTheme = ref<Theme | null>(null)
const lastSeed = ref<Seed | null>(null)
const mobileTab = ref<'editor' | 'preview'>('editor')

const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const previewRef = ref<InstanceType<typeof Preview> | null>(null)
const toolbarRef = ref<InstanceType<typeof Toolbar> | null>(null)
const paletteRef = ref<InstanceType<typeof ComponentPalette> | null>(null)

/**
 * activeTheme 的三级优先级：
 *   hoverThemeId （ThemeStrip 临时 hover）> customTheme （配色自定义）> baseThemeId （锁定）
 *
 * hover 覆盖 custom：作者悬停另一主题时是想"看一眼同稿换主题什么样"，
 * 不希望当前自定义配色残留在 hover 预览上；click 锁定后 hoverThemeId 清空，
 * 重新回到 baseThemeId / custom 的正常路径。
 */
const activeTheme = computed<Theme>(() => {
  if (hoverThemeId.value) return getTheme(hoverThemeId.value)
  return customTheme.value ?? getTheme(baseThemeId.value)
})

// ==============================================
// Composables
// ==============================================
const { ui, drawerStates, toggleLeft, toggleRight, closeAll } = useUiDrawers()

const {
  activeDraftId,
  draftIndexTick,
  displayedSavingLabel,
  displayedSavingState,
  currentDraftTitle,
  undo,
  initActiveDraft,
  handleSave,
  handleSelectDraft,
  handleDeleteDraftRequest,
  flushDraftSave,
  pingTransient,
  showUndo,
  onUndo,
  onUndoExpire,
  fileStem,
} = useDraftLifecycle({ md, baseThemeId, getSample })

const pipelineInput = computed(() => ({ md: md.value, theme: activeTheme.value }))
const { rendered, flush } = useDebouncedRender(pipelineInput, { delayMs: 80 })

const {
  outlinkStrategy,
  setOutlinkStrategy,
  persistentError,
  handleCopy,
  handleCopyShareLink,
  tryLoadShareFromHash,
} = useClipboardCopy({
  md,
  rendered,
  flush,
  baseThemeId,
  activeDraftId,
  draftIndexTick,
  pingTransient,
})

const { doExportHtml, doExportMd, doExportImage } = useExportActions({
  md,
  rendered,
  flush,
  activeTheme,
  getPreviewBody: () => previewRef.value?.getIframe?.()?.contentDocument?.body ?? null,
  fileStem: () => fileStem(),
  pingTransient,
  setPersistentError: (msg) => { persistentError.value = msg },
})

// ==============================================
// 引导层
// ==============================================
const onboardDismissed = ref<boolean>(safeRead(ONBOARD_STORAGE_KEY) === '1')
function dismissOnboard() {
  onboardDismissed.value = true
  safeWrite(ONBOARD_STORAGE_KEY, '1')
}
const showOnboard = computed(() =>
  !onboardDismissed.value &&
  !ui.commandOpen &&
  !ui.helpOpen &&
  ui.leftSlot === null &&
  ui.rightSlot === null,
)

/**
 * 移动端：任意抽屉 / 面板 / 浮层打开时挂 `.drawer-open` 到根元素，
 * 配合 CSS `overflow: hidden` 阻止背景滚动（iOS Safari 橡皮筋会透过 fixed 抽屉）。
 */
const hasOpenDrawer = computed(
  () =>
    ui.leftSlot !== null ||
    ui.rightSlot !== null ||
    ui.commandOpen ||
    ui.helpOpen,
)

// ==============================================
// 观察器：mobileTab 切换关闭 drawer；baseThemeId 切换联动持久化 / 重置 custom / 样本跟随 / 草稿 themeId 回写
// ==============================================
watch(mobileTab, () => { closeAll() })

watch(baseThemeId, (val, prev) => {
  safeWrite(THEME_STORAGE_KEY, val)
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
  // 正文还停在"任意主题的示例"（用户没动过）就自动换成新主题的示例；已经
  // 输入过内容则保留，避免覆盖用户草稿。
  //
  // 不只比对 prev 那一个样本——考虑两类场景：
  //   1. 用户首次打开 → 自动创建 default 示例 → 切到 tech-geek：旧实现里因 md.value
  //      恰好等于 getSample('default') 能 swap；但若 sample 内容刚刚更新（比如新增容器）
  //      而用户的草稿正文仍按老版 default 样本入库，会导致切主题后保持老文案。
  //   2. 用户自己选了"载入 B 主题示例"后，再切到 C 主题：旧实现要求 md.value ==
  //      getSample(B) 但 prev 是 B 之前的那个主题——条件永远不成立，用户被迫再次手动
  //      "载入当前主题示例"。
  // 改为"命中任意主题 sample"即视作 pristine，主题切换自动跟随。
  //
  // 两侧都 `replace(/\r\n/g, '\n')` 归一：生成器已经规范化为 LF，但编辑器 /
  // 草稿存储 / 剪贴板粘贴任意一环若未来再引入 CRLF，仍能命中 pristine 判断。
  if (val !== prev) {
    const current = md.value.replace(/\r\n/g, '\n')
    const isPristineSample = Object.values(SAMPLE_BY_THEME).some(
      (s) => s.replace(/\r\n/g, '\n') === current,
    )
    if (isPristineSample) md.value = getSample(val)
  }
  if (activeDraftId.value) {
    updateDraft(activeDraftId.value, { themeId: val })
    draftIndexTick.value += 1
  }
})

// ==============================================
// 本地动作（md 层）—— 依赖 draft.showUndo / pingTransient 做反馈
// ==============================================
function handleClear() {
  if (!md.value) return
  const prev = md.value
  md.value = ''
  showUndo('已清空正文', () => { md.value = prev })
}

function handleLoadSample() {
  const sample = getSample(baseThemeId.value)
  if (md.value === sample) return
  const prev = md.value
  md.value = sample
  if (prev.trim()) {
    showUndo('已载入示例，原正文可撤销', () => { md.value = prev })
  } else {
    pingTransient('已载入示例')
  }
}

/**
 * 从 Preview 顶部缩略条点击 → 锁定该主题；hover 态同步清空以免闪回。
 * hoverThemeId 不持久化，只影响预览渲染；真正的锁定走 baseThemeId 原有通路
 * （会触发示例随 theme 切换的 watch、持久化到 localStorage 等副作用）。
 */
function handleLockTheme(id: string) {
  hoverThemeId.value = null
  if (baseThemeId.value !== id) baseThemeId.value = id
}

/**
 * 一键修复中文排版 —— 扫描并应用 zhTypo 四条规则。
 * 无命中时用瞬时提示"本文已干净"；有命中时写回 md 并把"撤销"入口挂到 UndoToast。
 */
function handleFixZhTypo() {
  const prev = md.value
  if (!prev) {
    pingTransient('正文为空')
    return
  }
  const hits = scanZhTypo(prev)
  if (hits.length === 0) {
    pingTransient('中文排版已干净')
    return
  }
  md.value = fixZhTypo(prev)
  showUndo(`已修正 ${hits.length} 处中文排版`, () => { md.value = prev })
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

// ==============================================
// Toolbar 命令总线 dispatch
// ==============================================
function onToolbarToggle(target: ToolbarToggleTarget) {
  if (target === 'drafts') toggleLeft('drafts')
  else toggleRight(target)
}

function onToolbarAction(cmd: ToolbarAction) {
  switch (cmd) {
    case 'copy': handleCopy(); return
    case 'clear': handleClear(); return
    case 'loadSample': handleLoadSample(); return
    case 'saveSelection': handleSaveSelection(); return
    case 'fixZhTypo': handleFixZhTypo(); return
    case 'exportHtml': doExportHtml(); return
    case 'exportMd': doExportMd(); return
    case 'exportImage': doExportImage(); return
    case 'copyShareLink': handleCopyShareLink(); return
    case 'openCommand': ui.commandOpen = true; return
    case 'openHelp': ui.helpOpen = true; return
    case 'dismissError': persistentError.value = null; return
  }
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
// 命令面板清单
// ==============================================
const commands = computed<Command[]>(() => {
  void draftIndexTick.value
  const list: Command[] = []
  list.push({ id: 'copy', title: '复制为微信富文本', group: '操作', shortcut: `${modKey} ↵`, run: handleCopy })
  list.push({ id: 'save', title: '保存当前草稿', group: '操作', shortcut: `${modKey} S`, run: handleSave })
  list.push({ id: 'clear', title: '清空正文', group: '操作', run: handleClear })
  list.push({ id: 'load-sample', title: '载入当前主题示例', group: '操作', run: handleLoadSample })
  list.push({ id: 'save-selection', title: '保存选区为组件', group: '操作', run: handleSaveSelection })
  list.push({ id: 'fix-zh-typo', title: '一键修复中文排版', group: '操作', run: handleFixZhTypo })

  list.push({ id: 'toggle-drafts', title: drawerStates.value.drafts ? '关闭草稿抽屉' : '打开草稿抽屉', group: '视图', shortcut: `${modKey} ⇧ D`, run: () => toggleLeft('drafts') })
  list.push({ id: 'toggle-components', title: drawerStates.value.components ? '关闭组件库' : '打开组件库', group: '视图', shortcut: `${modKey} ⇧ P`, run: () => toggleRight('components') })
  list.push({ id: 'toggle-customizer', title: drawerStates.value.customizer ? '关闭自定义配色' : '打开自定义配色', group: '视图', shortcut: `${modKey} ⇧ C`, run: () => toggleRight('customizer') })
  list.push({ id: 'toggle-checklist', title: drawerStates.value.checklist ? '关闭发文清单' : '打开发文清单', group: '视图', run: () => toggleRight('checklist') })
  list.push({ id: 'open-help', title: '快捷键与帮助', group: '视图', shortcut: '?', run: () => (ui.helpOpen = true) })

  list.push({ id: 'export-html', title: '导出 HTML', group: '导出', shortcut: `${modKey} ⇧ H`, run: doExportHtml })
  list.push({ id: 'export-md', title: '导出 Markdown', group: '导出', shortcut: `${modKey} ⇧ M`, run: doExportMd })
  list.push({ id: 'export-image', title: '导出长图', group: '导出', run: doExportImage })
  list.push({ id: 'copy-share-link', title: '复制分享链接', group: '导出', run: handleCopyShareLink })

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

// ==============================================
// 快捷键
// ==============================================
useKeyboardShortcuts({
  openCommand: () => { ui.commandOpen = true },
  copy: handleCopy,
  save: handleSave,
  toggleCustomizer: () => toggleRight('customizer'),
  toggleDrafts: () => toggleLeft('drafts'),
  toggleComponents: () => toggleRight('components'),
  exportHtml: doExportHtml,
  exportMd: doExportMd,
  openHelp: () => { ui.helpOpen = true },
  closeCommand: () => { if (ui.commandOpen) { ui.commandOpen = false; return true } return false },
  closeHelp: () => { if (ui.helpOpen) { ui.helpOpen = false; return true } return false },
})

// ==============================================
// 生命周期
// ==============================================
onMounted(() => {
  const savedThemeId = safeRead(THEME_STORAGE_KEY)
  if (savedThemeId) baseThemeId.value = savedThemeId
  // 分享链接优先于草稿：若 URL 里带有 `#share=`，把 payload 作为新草稿载入；
  // 否则沿用正常的草稿恢复路径。
  const loaded = tryLoadShareFromHash((id, body, themeId) => {
    activeDraftId.value = id
    md.value = body
    baseThemeId.value = themeId
  })
  if (!loaded) {
    initActiveDraft(baseThemeId.value)
  }
  window.addEventListener('pagehide', flushDraftSave)
})

// 移动端抽屉/面板打开 → 锁 body 滚动；桌面上抽屉不占满视口，无需锁。
watch(hasOpenDrawer, (open) => {
  if (typeof document === 'undefined') return
  const mobile = window.matchMedia('(max-width: 767px)').matches
  document.body.classList.toggle('drawer-scroll-lock', open && mobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('pagehide', flushDraftSave)
  flushDraftSave()
  if (typeof document !== 'undefined') {
    document.body.classList.remove('drawer-scroll-lock')
  }
})
</script>

<template>
  <div class="app" :class="{ 'drawer-open': hasOpenDrawer }">
    <Toolbar
      ref="toolbarRef"
      :draft-title="currentDraftTitle"
      :word-count="rendered.wordCount"
      :reading-time="rendered.readingTime"
      :saving-state="displayedSavingState"
      :saving-label="displayedSavingLabel"
      :error="persistentError"
      :theme-id="baseThemeId"
      :has-custom-color="customTheme !== null"
      :drawer="drawerStates"
      :outlink-strategy="outlinkStrategy"
      @update:theme-id="baseThemeId = $event"
      @update:outlink-strategy="setOutlinkStrategy"
      @toggle="onToolbarToggle"
      @action="onToolbarAction"
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
          @open-overflow="toolbarRef?.openOverflow(); dismissOnboard()"
        />
      </section>
      <section class="pane pane-preview">
        <ThemeStrip
          :themes="themeList"
          :active-id="baseThemeId"
          :hover-id="hoverThemeId"
          @hover="hoverThemeId = $event"
          @select="handleLockTheme"
        />
        <Preview
          ref="previewRef"
          :html="rendered.html"
          :patch-log="rendered.patchLog"
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
      <PublishChecklist
        v-if="ui.rightSlot === 'checklist'"
        :md="md"
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
      @insert="handleInsertTemplate"
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
/* 按下视觉反馈：无障碍 + 让 iOS 用户确认点到了（无 tap-highlight 时靠这个） */
.mobile-tab:active {
  background: var(--surface);
  transform: scale(0.97);
}
.mobile-tab.active:active {
  background: var(--accent-soft);
  filter: brightness(0.96);
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
