<script setup lang="ts">
/**
 * App —— 组合根
 *
 * R6 之后这里只剩三件事：装配（template）、连线（拿 composable + state.ts 的输出
 * 拼成 props/handlers）、声明 onboarding 这种"只在模板里用"的派生态。具体业务逻辑
 * 全部在邻居文件，本 SFC 不再隐藏任何状态机：
 *
 *   src/app/state.ts           - 跨 composable 共享的 ref（md / baseThemeId / ...）
 *   src/app/actions.ts         - handle* 动作（清空 / 载入示例 / 一键修复 / ...）
 *   src/app/commands.ts        - 命令面板清单
 *   src/app/scrollSync.ts      - editor ↔ preview 滚动联动
 *   src/app/themeOrchestrator.ts - baseThemeId watcher 的 4 条副作用
 *   src/app/bootstrap.ts       - onMounted / onBeforeUnmount 启停副作用
 *
 * 命名约定：只有"模板里直接用"的 ref / computed / handler 才在此 setup；任何能
 * 抽出去单独命名一个函数的都拒绝再写进 App.vue。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Editor from '../ui/components/Editor.vue'
import Preview from '../ui/components/Preview.vue'
import Toolbar from '../ui/components/Toolbar.vue'
import PaneSplitter from '../ui/components/PaneSplitter.vue'
import DraftDrawer from '../ui/components/DraftDrawer.vue'
import ColorCustomizer from '../ui/components/ColorCustomizer.vue'
import PersonaStudio from '../ui/components/persona-studio/PersonaStudio.vue'
import ComponentPalette from '../ui/components/ComponentPalette.vue'
import PublishChecklist from '../ui/components/PublishChecklist.vue'
import CommandPalette from '../ui/components/CommandPalette.vue'
import HelpPanel from '../ui/components/HelpPanel.vue'
import OnboardingCard from '../ui/components/OnboardingCard.vue'
import UndoToast from '../ui/components/UndoToast.vue'
import ErrorBoundary from '../ui/primitives/ErrorBoundary.vue'
import type { ToolbarAction, ToolbarToggleTarget } from '../ui/components/toolbar-types'
import { useDebouncedRender } from '../ui/composables/useDebouncedRender'
import { useUiDrawers } from '../ui/composables/useUiDrawers'
import { useDraftLifecycle } from '../ui/composables/useDraftLifecycle'
import { useClipboardCopy } from '../ui/composables/useClipboardCopy'
import { useExportActions } from '../ui/composables/useExportActions'
import { useKeyboardShortcuts } from '../ui/composables/useKeyboardShortcuts'
import { getSample } from '../domain/samples'
import { safeRead, safeWrite } from '../infra/storage/_kv'
import { md, baseThemeId, hoverThemeId, customTheme, mobileTab, activeTheme, editorWidth } from './state'
import { uiThemeMode } from './uiTheme'
import { useScrollSync } from './scrollSync'
import { useThemeOrchestrator } from './themeOrchestrator'
import { buildCommands } from './commands'
import { createAppActions } from './actions'
import { useBootstrap } from './bootstrap'

const ONBOARD_STORAGE_KEY = 'wechat-typeset:onboard:dismissed'
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const previewRef = ref<InstanceType<typeof Preview> | null>(null)
const toolbarRef = ref<InstanceType<typeof Toolbar> | null>(null)
const paletteRef = ref<InstanceType<typeof ComponentPalette> | null>(null)

const { ui, drawerStates, toggleLeft, toggleRight, closeAll } = useUiDrawers()

const {
  activeDraftId, draftIndexTick, displayedSavingLabel, displayedSavingState,
  currentDraftTitle, undo, initActiveDraft, handleSave, handleSelectDraft,
  handleDeleteDraftRequest, flushDraftSave, pingTransient, showUndo,
  onUndo, onUndoExpire, fileStem,
} = useDraftLifecycle({ md, baseThemeId, getSample })

const pipelineInput = computed(() => ({ md: md.value, theme: activeTheme.value }))
const { rendered, flush } = useDebouncedRender(pipelineInput, { delayMs: 80 })

const {
  outlinkStrategy, setOutlinkStrategy, persistentError,
  handleCopy, handleCopyShareLink, tryLoadShareFromHash,
} = useClipboardCopy({ md, rendered, flush, baseThemeId, activeDraftId, draftIndexTick, pingTransient })

const { doExportHtml, doExportMd, doExportImage } = useExportActions({
  md, rendered, flush, activeTheme,
  getPreviewBody: () => previewRef.value?.getIframe?.()?.contentDocument?.body ?? null,
  fileStem: () => fileStem(),
  pingTransient,
  setPersistentError: (msg) => { persistentError.value = msg },
})

useThemeOrchestrator({ showUndo, activeDraftId, draftIndexTick })
const { onEditorScroll, onPreviewScroll } = useScrollSync({ editorRef, previewRef })

const {
  handleClear, handleLoadSample, handleFixZhTypo,
  handleApplyPalette, handleResetPalette, handleInsertTemplate, handleSaveSelection,
} = createAppActions({ showUndo, pingTransient, editorRef, paletteRef, ui })

// mobileTab 切换关闭 drawer——避免横屏切到 preview 还有抽屉占着半屏
watch(mobileTab, () => { closeAll() })

// ==============================================
// 桌面分隔条：viewport 追踪 + max 计算 + 越界 clamp
// ==============================================
// 预览栏锁 var(--preview-w) + var(--sp-7) = 375 + 32 = 407（WeChat 保真）；
// 分隔条本身 6px；额外留 8px 防贴边。这些常数与 PaneSplitter.vue / 全局 CSS
// 保持一致——改了别忘了同步。
const PREVIEW_PANE_W = 407
const SPLITTER_W = 6
const EDITOR_MIN_W = 320
const viewportW = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
function trackViewport() { viewportW.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', trackViewport))
onBeforeUnmount(() => window.removeEventListener('resize', trackViewport))

const editorMaxWidth = computed(() =>
  Math.max(EDITOR_MIN_W, viewportW.value - PREVIEW_PANE_W - SPLITTER_W - 8),
)
// 视口缩小时若当前 editorWidth 已经放不下，回收到当前 max——避免预览栏被挤出去
watch([viewportW, editorMaxWidth], () => {
  if (editorWidth.value !== null && editorWidth.value > editorMaxWidth.value) {
    editorWidth.value = editorMaxWidth.value
  }
})

// ==============================================
// 引导层（模板里 v-if 直接用，留在 App.vue）
// ==============================================
const onboardDismissed = ref<boolean>(safeRead(ONBOARD_STORAGE_KEY) === '1')
function dismissOnboard() {
  onboardDismissed.value = true
  safeWrite(ONBOARD_STORAGE_KEY, '1')
}
const showOnboard = computed(() =>
  !onboardDismissed.value && !ui.commandOpen && !ui.helpOpen
  && ui.leftSlot === null && ui.rightSlot === null,
)

/**
 * 任意抽屉 / 面板 / 浮层打开时挂 `.drawer-open`，移动端配合 CSS 锁 body 滚动。
 */
const hasOpenDrawer = computed(
  () => ui.leftSlot !== null || ui.rightSlot !== null || ui.commandOpen || ui.helpOpen,
)

// ==============================================
// Toolbar 命令总线
// ==============================================
function onToolbarToggle(target: ToolbarToggleTarget) {
  if (target === 'drafts') toggleLeft('drafts')
  else if (target === 'personaStudio') toggleRight('persona-studio')
  else toggleRight(target)
}
function onToolbarAction(cmd: ToolbarAction) {
  switch (cmd) {
    case 'copy': return handleCopy()
    case 'clear': return handleClear()
    case 'loadSample': return handleLoadSample()
    case 'saveSelection': return handleSaveSelection()
    case 'fixZhTypo': return handleFixZhTypo()
    case 'exportHtml': return doExportHtml()
    case 'exportMd': return doExportMd()
    case 'exportImage': return doExportImage()
    case 'copyShareLink': return handleCopyShareLink()
    case 'openCommand': ui.commandOpen = true; return
    case 'openHelp': ui.helpOpen = true; return
    case 'dismissError': persistentError.value = null; return
  }
}

const commands = buildCommands({
  modKey, ui, drawerStates, toggleLeft, toggleRight,
  draftIndexTick, activeDraftId, handleSave, handleSelectDraft,
  handleCopy, handleCopyShareLink, doExportHtml, doExportMd, doExportImage,
  handleClear, handleLoadSample, handleSaveSelection, handleFixZhTypo,
})

useKeyboardShortcuts({
  openCommand: () => { ui.commandOpen = true },
  copy: handleCopy, save: handleSave,
  toggleCustomizer: () => toggleRight('customizer'),
  toggleDrafts: () => toggleLeft('drafts'),
  toggleComponents: () => toggleRight('components'),
  exportHtml: doExportHtml, exportMd: doExportMd,
  openHelp: () => { ui.helpOpen = true },
  closeCommand: () => { if (ui.commandOpen) { ui.commandOpen = false; return true } return false },
  closeHelp: () => { if (ui.helpOpen) { ui.helpOpen = false; return true } return false },
})

useBootstrap({ activeDraftId, initActiveDraft, flushDraftSave, tryLoadShareFromHash, hasOpenDrawer })
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
      :ui-theme="uiThemeMode"
      @update:theme-id="baseThemeId = $event"
      @update:outlink-strategy="setOutlinkStrategy"
      @update:ui-theme="uiThemeMode = $event"
      @hover-theme="hoverThemeId = $event"
      @toggle="onToolbarToggle"
      @action="onToolbarAction"
    />
    <main class="main" :data-mobile-tab="mobileTab">
      <ErrorBoundary
        v-if="ui.leftSlot === 'drafts'"
        fallback-title="草稿列表加载失败"
        @close="ui.leftSlot = null"
      >
        <DraftDrawer
          :active-id="activeDraftId"
          @select="handleSelectDraft"
          @close="ui.leftSlot = null"
          @request-delete="handleDeleteDraftRequest"
        />
      </ErrorBoundary>
      <section
        class="pane pane-editor"
        :class="{ 'fixed-width': editorWidth !== null }"
        :style="editorWidth !== null ? { '--editor-w': editorWidth + 'px' } : undefined"
      >
        <Editor ref="editorRef" v-model="md" @scroll="onEditorScroll" />
        <OnboardingCard
          v-if="showOnboard"
          @dismiss="dismissOnboard"
          @open-help="ui.helpOpen = true; dismissOnboard()"
          @open-command="ui.commandOpen = true; dismissOnboard()"
          @open-overflow="toolbarRef?.openOverflow(); dismissOnboard()"
        />
      </section>
      <PaneSplitter
        :width="editorWidth"
        :min="EDITOR_MIN_W"
        :max="editorMaxWidth"
        @update:width="editorWidth = $event"
      />
      <section class="pane pane-preview">
        <Preview
          ref="previewRef"
          :html="rendered.html"
          :patch-log="rendered.patchLog"
          @scroll="onPreviewScroll"
        />
      </section>
      <ErrorBoundary
        v-if="ui.rightSlot === 'components'"
        fallback-title="组件库加载失败"
        @close="ui.rightSlot = null"
      >
        <ComponentPalette
          ref="paletteRef"
          :theme="activeTheme"
          @insert="handleInsertTemplate"
          @close="ui.rightSlot = null"
        />
      </ErrorBoundary>
      <ErrorBoundary
        v-else-if="ui.rightSlot === 'customizer'"
        fallback-title="配色面板渲染失败"
        @close="ui.rightSlot = null"
      >
        <ColorCustomizer
          :has-custom-color="customTheme !== null"
          @apply="handleApplyPalette"
          @reset="handleResetPalette"
          @close="ui.rightSlot = null"
        />
      </ErrorBoundary>
      <ErrorBoundary
        v-else-if="ui.rightSlot === 'checklist'"
        fallback-title="发文清单渲染失败"
        @close="ui.rightSlot = null"
      >
        <PublishChecklist :md="md" @close="ui.rightSlot = null" />
      </ErrorBoundary>
      <ErrorBoundary
        v-else-if="ui.rightSlot === 'persona-studio'"
        fallback-title="主题编辑器渲染失败"
        @close="ui.rightSlot = null"
      >
        <PersonaStudio :initial-base-id="baseThemeId" @close="ui.rightSlot = null" />
      </ErrorBoundary>
    </main>

    <ErrorBoundary
      v-if="ui.commandOpen"
      fallback-title="命令面板渲染失败"
      @close="ui.commandOpen = false"
    >
      <CommandPalette :commands="commands" @close="ui.commandOpen = false" />
    </ErrorBoundary>
    <ErrorBoundary
      v-if="ui.helpOpen"
      fallback-title="帮助面板渲染失败"
      @close="ui.helpOpen = false"
    >
      <HelpPanel
        :commands="commands"
        @close="ui.helpOpen = false"
        @insert="handleInsertTemplate"
      />
    </ErrorBoundary>
    <UndoToast v-if="undo" :message="undo.message" @undo="onUndo" @expire="onUndoExpire" />

    <!-- Mobile backdrop: tap outside an open drawer to dismiss (mobile only via CSS) -->
    <div
      v-if="ui.leftSlot || ui.rightSlot"
      class="mobile-drawer-mask"
      aria-hidden="true"
      @click="ui.leftSlot = null; ui.rightSlot = null"
    />

    <!-- Mobile bottom tab bar -->
    <nav class="mobile-tabs" role="tablist" aria-label="视图切换">
      <button class="mobile-tab" role="tab" :aria-selected="mobileTab === 'editor'"
        :class="{ active: mobileTab === 'editor' }" @click="mobileTab = 'editor'">编辑</button>
      <button class="mobile-tab-copy" aria-label="复制到剪贴板" @click="handleCopy">一键复制</button>
      <button class="mobile-tab" role="tab" :aria-selected="mobileTab === 'preview'"
        :class="{ active: mobileTab === 'preview' }" @click="mobileTab = 'preview'">预览</button>
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
  /* 编辑栏 fixed-width 时 splitter 与 preview 之间的"空隙"会显出 .main 底色——
   * 用与预览栏一致的纸面色，让间隙看起来像预览侧延伸出的版式留白。 */
  background: var(--paper-300);
}
.pane {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
/* 默认：编辑栏 flex 自适应填充。PaneSplitter 组件自身带 1px border-right 充当分割线，
 * 编辑栏不再重复画。 */
.pane-editor.fixed-width {
  flex: 0 0 auto;
  width: var(--editor-w);
}
.pane-preview {
  flex: 0 0 auto;
  width: calc(var(--preview-w) + var(--sp-7));
  /* 编辑栏 fixed-width 时，flex 容器里剩余空间通过双 auto margin 均分到预览栏
   * 左右，达成"始终居中"——编辑栏越窄，预览栏左右"纸面留白"越对称。
   * 默认 flex:1 模式下编辑栏吃满剩余，没有自由空间可分，auto 不产生效果。 */
  margin-left: auto;
  margin-right: auto;
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
