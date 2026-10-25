<script setup lang="ts">
// App 组合根：仅承载"模板里直接用"的 ref/computed/handler；其余拆到邻居 src/app/*.ts。
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import { updateArticleTheme } from '../core/pipeline/frontmatter'
import { resolveLocalImages } from '../infra/fs/images'
import Editor from '../ui/components/Editor.vue'
import Preview from '../ui/components/Preview.vue'
import Toolbar from '../ui/components/Toolbar.vue'
import PaneSplitter from '../ui/components/PaneSplitter.vue'
import DraftDrawer from '../ui/components/DraftDrawer.vue'
import ColorCustomizer from '../ui/components/ColorCustomizer.vue'
import PersonaStudio from '../ui/components/persona-studio/PersonaStudio.vue'
import ComponentPalette from '../ui/components/ComponentPalette.vue'
import CommandPalette from '../ui/components/CommandPalette.vue'
import HelpPanel from '../ui/components/HelpPanel.vue'
import OnboardingCard from '../ui/components/OnboardingCard.vue'
import UndoToast from '../ui/components/UndoToast.vue'
import CopyResultToast from '../ui/components/CopyResultToast.vue'
import ErrorBoundary from '../ui/primitives/ErrorBoundary.vue'
import type { ToolbarAction, ToolbarToggleTarget } from '../ui/components/toolbar-types'
import { useDebouncedRender } from '../ui/composables/useDebouncedRender'
import { useUiDrawers } from '../ui/composables/useUiDrawers'
import { useDraftLifecycle } from '../ui/composables/useDraftLifecycle'
import { useLibraryArticles } from '../ui/composables/useLibraryArticles'
import { useWritingStyles } from '../ui/composables/useWritingStyles'
import { useClipboardCopy } from '../ui/composables/useClipboardCopy'
import { useExportActions } from '../ui/composables/useExportActions'
import { useKeyboardShortcuts } from '../ui/composables/useKeyboardShortcuts'
import { modKey } from '../ui/composables/usePlatformKey'
import { getSample } from '../domain/samples'
import { safeRead, safeRemove, safeWrite } from '../infra/storage/_kv'
import { createDraft } from '../infra/storage/drafts'
import { md, baseThemeId, hoverThemeId, customTheme, mobileTab, activeTheme, editorWidth } from '../ui/state/store'
import { uiThemeMode } from '../ui/state/uiTheme'
import { useScrollSync } from './scrollSync'
import { useThemeOrchestrator } from './themeOrchestrator'
import { buildCommands } from './commands'
import { createAppActions } from './actions'
import { useBootstrap } from './bootstrap'
import { EDITOR_MIN_W, usePaneSizing } from './usePaneSizing'

const ONBOARD_STORAGE_KEY = 'wechat-typeset:onboard:dismissed'
const PublishChecklist = defineAsyncComponent(() => import('../ui/components/PublishChecklist.vue'))
const WritingStyleControl = defineAsyncComponent(() => import('../ui/components/WritingStyleControl.vue'))
const ThemeInspector = defineAsyncComponent(() => import('../ui/components/ThemeInspector.vue'))

const editorRef = ref<InstanceType<typeof Editor> | null>(null)
const previewRef = ref<InstanceType<typeof Preview> | null>(null)
const toolbarRef = ref<InstanceType<typeof Toolbar> | null>(null)
const paletteRef = ref<InstanceType<typeof ComponentPalette> | null>(null)

const { ui, drawerStates: rawDrawerStates, toggleLeft, toggleRight: toggleDrawerRight, closeAll } = useUiDrawers()
type WorkspaceStage = 'write' | 'typeset' | 'publish'
const stage = ref<WorkspaceStage>('write')
const writingPreview = ref(true)
const toolsCollapsed = ref(false)
const workAreaRef = ref<HTMLElement | null>(null)
ui.leftSlot = window.innerWidth > 900 ? 'drafts' : null
const inspectorVisible = computed(() => !toolsCollapsed.value && (stage.value !== 'write' || ui.rightSlot !== null))
const drawerStates = computed(() => ({
  ...rawDrawerStates.value,
  components: inspectorVisible.value && ui.rightSlot === 'components',
  customizer: inspectorVisible.value && ui.rightSlot === 'customizer',
  checklist: inspectorVisible.value && stage.value === 'publish',
  personaStudio: inspectorVisible.value && ui.rightSlot === 'persona-studio',
}))
function setStage(value: WorkspaceStage) {
  stage.value = value
  ui.rightSlot = value === 'publish' ? 'checklist' : null
  toolsCollapsed.value = false
  hoverThemeId.value = null
  mobileTab.value = value === 'write' ? 'editor' : 'preview'
  if (window.innerWidth <= 900) ui.leftSlot = null
}
function setWritingView(value: 'editor' | 'preview') {
  mobileTab.value = value
  if (value === 'preview') writingPreview.value = true
  toolsCollapsed.value = true
}
function toggleRight(slot: 'components' | 'customizer' | 'checklist' | 'persona-studio') {
  if (slot === 'checklist') {
    if (stage.value === 'publish' && inspectorVisible.value) toolsCollapsed.value = true
    else setStage('publish')
    return
  }
  if (stage.value === 'publish') stage.value = 'typeset'
  toolsCollapsed.value = false
  toggleDrawerRight(slot)
}
watch(() => ui.rightSlot, (slot) => {
  if (slot) toolsCollapsed.value = false
  if (slot === 'checklist') stage.value = 'publish'
  else if (slot && stage.value === 'publish') stage.value = 'typeset'
  hoverThemeId.value = null
})
watch([stage, toolsCollapsed], () => { hoverThemeId.value = null })
const imageIntakeBusy = ref(false)
const imageRevision = ref(0)

const {
  activeDraftId, draftIndexTick, displayedSavingLabel, displayedSavingState,
  currentDraftTitle, undo, initActiveDraft, handleSave: saveDraft, handleSelectDraft: selectDraft,
  handleDeleteDraftRequest: deleteDraftRequest, flushDraftSave, pingTransient, showUndo,
  onUndo, onUndoExpire, fileStem,
} = useDraftLifecycle({ md, baseThemeId, getSample })

const files = useLibraryArticles({ md, baseThemeId, beforeOpen: () => {
  if (imageIntakeBusy.value) return false
  flushDraftSave()
  if (displayedSavingState.value === 'error') return false
  activeDraftId.value = null
  onUndoExpire()
  return true
} })
const { activeArticle, conflict: fileConflict, busy: fileBusy } = files
const writingStyles = useWritingStyles({
  md,
  directory: computed(() => activeArticle.value && files.permitted.value ? files.library.value?.dir ?? null : null),
})
async function goToStyleLine(line: number) {
  setStage('write')
  await nextTick()
  editorRef.value?.goToLine(line)
}
const documentTitle = computed(() => activeArticle.value ? files.title.value : currentDraftTitle.value)
const conflictDialog = ref<HTMLDialogElement | null>(null)
watch(fileConflict, (value) => {
  if (value) conflictDialog.value?.showModal()
  else conflictDialog.value?.close()
}, { flush: 'post' })
function handleThemeChange(theme: string) {
  hoverThemeId.value = null
  baseThemeId.value = theme
  if (activeArticle.value) md.value = updateArticleTheme(md.value, theme)
}
function handleSelectDraft(id: string) {
  if (imageIntakeBusy.value) return
  if (!files.leave()) return
  selectDraft(id)
}
function handleDeleteDraftRequest(id: string, title: string) {
  deleteDraftRequest(id, title, files.leave)
}
async function handleChooseLibrary() {
  if (imageIntakeBusy.value) return
  const wasFile = !!activeArticle.value
  await files.chooseLibrary()
  if (wasFile && !activeArticle.value) initActiveDraft(baseThemeId.value)
}

const missingImages = ref<string[]>([])
const pipelineInput = computed(() => {
  void activeArticle.value?.dir
  void files.revision.value
  return { md: md.value, theme: activeTheme.value }
})
const { rendered: rawRendered, flush } = useDebouncedRender(pipelineInput, {
  delayMs: 80,
  async prepareInput(input) {
    const dir = activeArticle.value?.dir
    if (input === pipelineInput.value) missingImages.value = []
    if (!dir) { missingImages.value = []; return input }
    const resolved = await resolveLocalImages(input.md, dir)
    if (input === pipelineInput.value && dir === activeArticle.value?.dir) missingImages.value = resolved.missing
    return { ...input, md: resolved.md }
  },
})

const {
  rendered, outlinkStrategy, setOutlinkStrategy, persistentError,
  copyResult, dismissCopyResult,
  handleCopy: copyArticle, handleCopyShareLink: copyShareLink, tryLoadShareFromHash,
} = useClipboardCopy({ md, rendered: rawRendered, flush, baseThemeId, activeDraftId, draftIndexTick, pingTransient })

const { doExportHtml: exportHtml, doExportMd: exportMd, doExportImage: exportImage, doExportCover: exportCover } = useExportActions({
  md, rendered, flush, activeTheme,
  getPreviewBody: () => previewRef.value?.getIframe?.()?.contentDocument?.querySelector<HTMLElement>('.phone-viewport') ?? null,
  fileStem: () => fileStem(),
  pingTransient,
  setPersistentError: (msg) => { persistentError.value = msg },
})

const IMAGE_PENDING_MESSAGE = '图片仍在处理中，请等待完成后再保存、复制或导出。'
function guardImageAction<Args extends unknown[], Result>(action: (...args: Args) => Result) {
  return (...args: Args): Result | undefined => {
    if (imageIntakeBusy.value) {
      persistentError.value = IMAGE_PENDING_MESSAGE
      return
    }
    if (persistentError.value === IMAGE_PENDING_MESSAGE) persistentError.value = null
    return action(...args)
  }
}
watch(imageIntakeBusy, (busy) => {
  if (!busy) imageRevision.value += 1
  if (!busy && persistentError.value === IMAGE_PENDING_MESSAGE) persistentError.value = null
})
const handleSave = guardImageAction(() => activeArticle.value ? files.save() : saveDraft())
const handleOverwrite = guardImageAction(files.overwrite)
const handleCopy = guardImageAction(copyArticle)
const handleCopyShareLink = guardImageAction(copyShareLink)
const doExportHtml = guardImageAction(exportHtml)
const doExportMd = guardImageAction(exportMd)
const doExportImage = guardImageAction(async () => {
  const previous = { preview: writingPreview.value, tab: mobileTab.value, collapsed: toolsCollapsed.value }
  writingPreview.value = true
  mobileTab.value = 'preview'
  toolsCollapsed.value = true
  let page: HTMLElement | null | undefined
  let zoom = ''
  try {
    await nextTick()
    await flush()
    page = previewRef.value?.getIframe()?.contentDocument?.querySelector<HTMLElement>('.phone-viewport')
    if (page) { zoom = page.style.zoom; page.style.zoom = '1' }
    await exportImage()
  } catch (error) {
    persistentError.value = `长图导出失败：${error instanceof Error ? error.message : String(error)}`
  } finally {
    if (page) page.style.zoom = zoom
    writingPreview.value = previous.preview
    mobileTab.value = previous.tab
    toolsCollapsed.value = previous.collapsed
  }
})
const doExportCover = guardImageAction(exportCover)

useThemeOrchestrator({ showUndo, activeDraftId, draftIndexTick, fileArticleActive: computed(() => !!activeArticle.value) })
const { onEditorScroll, onPreviewScroll } = useScrollSync({ editorRef, previewRef })

const {
  handleClear, handleLoadSample, handleLoadReference, handleLoadShowcase, handleFixZhTypo,
  handleApplyPalette, handleResetPalette, handleInsertTemplate, handleSaveSelection,
} = createAppActions({ showUndo, pingTransient, editorRef, paletteRef, ui })
async function insertTemplateInEditor(snippet: string) {
  setStage('write')
  await nextTick()
  handleInsertTemplate(snippet)
}

/**
 * Toolbar draft popover 内的"新建草稿"——与 commands.ts 内同名命令保持行为一致：
 * 用当前主题生成新草稿、切到它、bump tick 让顶栏 popover 与 DraftDrawer 同步刷新。
 */
function handleNewDraft() {
  if (imageIntakeBusy.value) return
  if (!files.leave()) return
  const created = createDraft({ title: '新草稿', body: '# 新草稿\n', themeId: baseThemeId.value })
  handleSelectDraft(created.id)
  draftIndexTick.value += 1
}


// 桌面分隔条 viewport 追踪 + max 计算 + 越界回收：见 usePaneSizing.ts
const { editorMaxWidth } = usePaneSizing({ editorWidth, container: workAreaRef })

// ==============================================
// 引导层（模板里 v-if 直接用，留在 App.vue）
// ==============================================
const onboardDismissed = ref<boolean>(safeRead(ONBOARD_STORAGE_KEY) === '1')
function dismissOnboard() {
  onboardDismissed.value = true
  safeWrite(ONBOARD_STORAGE_KEY, '1')
}
/**
 * "重新打开新手引导" 入口（HelpPanel 触发）：清持久化 + 关闭帮助 + 关闭其它浮层，
 * 让 showOnboard computed 自动重新为 true。
 */
function restartOnboard() {
  safeRemove(ONBOARD_STORAGE_KEY)
  onboardDismissed.value = false
  ui.helpOpen = false
  ui.commandOpen = false
  closeAll()
}
const showOnboard = computed(() =>
  !onboardDismissed.value && !ui.commandOpen && !ui.helpOpen
  && !activeArticle.value && ui.rightSlot === null,
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
    case 'loadReference': return handleLoadReference()
    case 'loadShowcase': return handleLoadShowcase()
    case 'saveSelection': return handleSaveSelection()
    case 'fixZhTypo': return handleFixZhTypo()
    case 'exportHtml': return doExportHtml()
    case 'exportMd': return doExportMd()
    case 'exportImage': return doExportImage()
    case 'exportCoverHorizontal': return doExportCover('wechat-horizontal')
    case 'exportCoverSquare': return doExportCover('wechat-square')
    case 'copyShareLink': return handleCopyShareLink()
    case 'openCommand': ui.commandOpen = true; return
    case 'openHelp': ui.helpOpen = true; return
    case 'dismissError': persistentError.value = null; return
  }
}

const commands = buildCommands({
  modKey, ui, drawerStates, toggleLeft, toggleRight,
  draftIndexTick, activeDraftId, handleSave, handleSelectDraft,
  handleThemeChange,
  handleCopy, handleCopyShareLink, doExportHtml, doExportMd, doExportImage,
  doExportCoverHorizontal: () => doExportCover('wechat-horizontal'),
  doExportCoverSquare: () => doExportCover('wechat-square'),
  handleClear, handleLoadSample, handleLoadReference, handleLoadShowcase, handleSaveSelection, handleFixZhTypo,
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
  closeDrawers: () => {
    if (inspectorVisible.value) { toolsCollapsed.value = true; return true }
    if (ui.leftSlot !== null || ui.rightSlot !== null) { closeAll(); return true }
    return false
  },
})

useBootstrap({ activeDraftId, initActiveDraft, flushDraftSave, tryLoadShareFromHash, hasOpenDrawer })
</script>

<template>
  <div class="app" :class="{ 'drawer-open': hasOpenDrawer }">
    <aside v-show="ui.leftSlot === 'drafts'" class="library-sidebar" aria-label="文章库">
      <ErrorBoundary fallback-title="文章库加载失败" @close="ui.leftSlot = null">
        <DraftDrawer
          :active-id="activeDraftId"
          :draft-index-tick="draftIndexTick"
          :library-supported="files.supported"
          :library-name="files.library.value?.dir.name"
          :library-permitted="files.permitted.value"
          :articles="files.articles.value"
          :active-article="activeArticle?.name"
          :library-busy="fileBusy || imageIntakeBusy"
          :library-error="files.error.value"
          @connect-library="files.connect"
          @choose-library="handleChooseLibrary"
          @select-article="files.open"
          @create-article="files.create"
          @select="handleSelectDraft"
          @close="ui.leftSlot = null"
          @request-delete="handleDeleteDraftRequest"
          @refresh="draftIndexTick++"
        />
      </ErrorBoundary>
    </aside>
    <div class="workspace">
      <Toolbar
        ref="toolbarRef"
        :stage="stage"
        :draft-title="documentTitle"
        :active-draft-id="activeDraftId"
        :draft-index-tick="draftIndexTick"
        :word-count="rendered.wordCount"
        :reading-time="rendered.readingTime"
        :saving-state="activeArticle ? (files.error.value ? 'error' : fileBusy ? 'saving' : files.dirty.value ? 'unsaved' : 'saved') : displayedSavingState"
        :saving-label="activeArticle ? files.savingLabel.value : displayedSavingLabel"
        :error="persistentError"
        :theme-id="baseThemeId"
        :has-custom-color="customTheme !== null"
        :drawer="drawerStates"
        :outlink-strategy="outlinkStrategy"
        :ui-theme="uiThemeMode"
        @update:stage="setStage"
        @save="handleSave"
        @update:theme-id="handleThemeChange"
        @update:outlink-strategy="setOutlinkStrategy"
        @update:ui-theme="uiThemeMode = $event"
        @hover-theme="hoverThemeId = $event"
        @toggle="onToolbarToggle"
        @action="onToolbarAction"
        @select-draft="handleSelectDraft"
        @new-draft="handleNewDraft"
      />
      <div class="document-bar">
        <button v-if="ui.leftSlot !== 'drafts'" class="quiet-button library-reopen" type="button" @click="toggleLeft('drafts')">文章库</button>
        <div class="document-heading">
          <div class="document-meta">
            <span class="document-location" :title="activeArticle ? activeArticle.name + '/article.md' : '仅保存在当前浏览器'">{{ activeArticle ? files.library.value?.dir.name + ' / article.md' : '个人工作区 / 浏览器草稿' }}</span>
            <span class="document-stats">{{ rendered.wordCount.toLocaleString() }} 字</span>
          </div>
          <h1 :title="documentTitle">{{ documentTitle }}</h1>
        </div>
        <div class="document-actions">
          <WritingStyleControl v-if="stage !== 'typeset'" :config="writingStyles.config.value" :selected-id="writingStyles.selectedId.value" :can-edit="writingStyles.canEdit.value" :loading="writingStyles.loading.value" :saving="writingStyles.saving.value" :error="writingStyles.error.value" @select="writingStyles.select" @save="writingStyles.save" @reload="writingStyles.reload" />
          <button v-if="stage === 'write'" class="quiet-button preview-toggle" type="button" :aria-pressed="!writingPreview" @click="writingPreview = !writingPreview">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"/></svg>
            {{ writingPreview ? '专注写作' : '显示预览' }}
          </button>
          <button v-if="stage !== 'write' || ui.rightSlot" class="quiet-button" type="button" :aria-expanded="!toolsCollapsed" @click="toolsCollapsed = !toolsCollapsed">{{ toolsCollapsed ? '展开工具' : '收起工具' }}</button>
        </div>
      </div>
      <main class="main" :data-stage="stage" :data-mobile-tab="mobileTab" :class="{ 'has-inspector': inspectorVisible, 'focus-writing': !writingPreview }">
        <div ref="workAreaRef" class="work-area">
        <section v-show="stage === 'write'" class="pane pane-editor" :class="{ 'fixed-width': editorWidth !== null && writingPreview }" :style="editorWidth !== null && writingPreview ? { '--editor-w': editorWidth + 'px' } : undefined" aria-label="Markdown 编辑器">
          <Editor ref="editorRef" v-model="md" :image-directory="activeArticle?.dir" :document-id="activeArticle?.name || activeDraftId || ''" @image-busy="imageIntakeBusy = $event" @scroll="onEditorScroll" />
          <OnboardingCard v-if="showOnboard && stage === 'write'" @dismiss="dismissOnboard" @open-help="ui.helpOpen = true; dismissOnboard()" />
        </section>
        <PaneSplitter v-show="stage === 'write' && writingPreview" :width="editorWidth" :min="EDITOR_MIN_W" :max="editorMaxWidth" @update:width="editorWidth = $event" />
        <section v-show="stage !== 'write' || writingPreview" class="pane pane-preview" aria-label="微信文章预览">
          <Preview ref="previewRef" :html="rendered.html" :patch-log="rendered.patchLog" @scroll="onPreviewScroll" />
        </section>
        </div>
        <aside v-show="inspectorVisible" class="context-inspector" :class="{ 'inspector-wide': ui.rightSlot === 'persona-studio', 'publish-inspector': stage === 'publish' }" aria-label="当前任务工具">
          <nav v-if="stage !== 'publish'" class="inspector-tabs" aria-label="排版工具">
            <button type="button" :class="{ active: !ui.rightSlot || ui.rightSlot === 'persona-studio' }" @click="ui.rightSlot = null">主题</button>
            <button type="button" :class="{ active: ui.rightSlot === 'components' }" @click="ui.rightSlot = 'components'">组件</button>
            <button type="button" :class="{ active: ui.rightSlot === 'customizer' }" @click="ui.rightSlot = 'customizer'">配色</button>
          </nav>
          <div class="inspector-body">
            <ErrorBoundary v-if="stage === 'publish'" fallback-title="发文清单加载失败" @close="toolsCollapsed = true">
              <PublishChecklist v-model:md="md" :missing-images="missingImages" :image-directory="activeArticle?.dir" :image-revision="imageRevision + files.revision.value" :writing-style="writingStyles.activeStyle.value" @goto-line="goToStyleLine" @close="toolsCollapsed = true" />
            </ErrorBoundary>
            <ErrorBoundary v-else-if="ui.rightSlot === 'components'" fallback-title="组件库加载失败" @close="ui.rightSlot = null">
              <ComponentPalette ref="paletteRef" :theme="activeTheme" @insert="insertTemplateInEditor" @close="ui.rightSlot = null" />
            </ErrorBoundary>
            <ErrorBoundary v-else-if="ui.rightSlot === 'customizer'" fallback-title="配色面板加载失败" @close="ui.rightSlot = null">
              <ColorCustomizer :has-custom-color="customTheme !== null" @apply="handleApplyPalette" @reset="handleResetPalette" @close="ui.rightSlot = null" />
            </ErrorBoundary>
            <ErrorBoundary v-else-if="ui.rightSlot === 'persona-studio'" fallback-title="主题编辑器加载失败" @close="ui.rightSlot = null">
              <PersonaStudio :initial-base-id="baseThemeId" @close="ui.rightSlot = null" />
            </ErrorBoundary>
            <ThemeInspector v-else :theme="activeTheme" :theme-id="baseThemeId" :custom="customTheme !== null" @select="handleThemeChange" @hover="hoverThemeId = $event" @advanced="ui.rightSlot = 'persona-studio'" @publish="setStage('publish')" />
          </div>
        </aside>
      </main>
      <nav v-if="stage === 'write'" class="mobile-tabs" aria-label="写作视图">
        <button type="button" :class="{ active: mobileTab === 'editor' }" :aria-pressed="mobileTab === 'editor'" @click="setWritingView('editor')">编辑</button>
        <button type="button" :class="{ active: mobileTab === 'preview' }" :aria-pressed="mobileTab === 'preview'" @click="setWritingView('preview')">预览</button>
      </nav>
    </div>
    <div v-if="ui.leftSlot === 'drafts'" class="mobile-drawer-mask" aria-hidden="true" @click="ui.leftSlot = null" />
    <ErrorBoundary v-if="ui.commandOpen" fallback-title="命令面板加载失败" @close="ui.commandOpen = false"><CommandPalette :commands="commands" @close="ui.commandOpen = false" /></ErrorBoundary>
    <ErrorBoundary v-if="ui.helpOpen" fallback-title="帮助面板加载失败" @close="ui.helpOpen = false"><HelpPanel :commands="commands" @close="ui.helpOpen = false" @insert="insertTemplateInEditor" @restart-onboard="restartOnboard" /></ErrorBoundary>
    <dialog ref="conflictDialog" class="file-conflict" aria-labelledby="file-conflict-title" @cancel.prevent @keydown.stop>
      <h3 id="file-conflict-title">文件和当前内容都有修改</h3>
      <p>「{{ files.title.value }}」已被外部编辑器修改。请选择要保留的版本。</p>
      <div class="file-conflict-actions">
        <button :disabled="fileBusy" @click="files.loadDiskVersion">载入磁盘版本</button>
        <button :disabled="fileBusy || imageIntakeBusy" @click="handleOverwrite">用当前内容覆盖</button>
      </div>
      <p v-if="imageIntakeBusy" role="status">{{ IMAGE_PENDING_MESSAGE }}</p>
      <p v-if="files.error.value" role="status">{{ files.error.value }}</p>
    </dialog>
    <UndoToast v-if="undo" :message="undo.message" @undo="onUndo" @expire="onUndoExpire" />
    <CopyResultToast v-if="copyResult" :message="copyResult.message" :details="copyResult.details" :cta="copyResult.cta" @dismiss="dismissCopyResult" />
  </div>
</template>

<style scoped>
.app { height: 100%; display: flex; background: var(--surface); color: var(--text); font-family: var(--font-text); --preview-frame: var(--surface); }
.library-sidebar { flex: 0 0 232px; width: 232px; min-height: 0; border-right: 1px solid var(--border); }
.workspace { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.document-bar { display: flex; flex: 0 0 auto; align-items: center; gap: 20px; min-height: 80px; padding: 12px 22px; box-sizing: border-box; }
.document-heading { flex: 1; min-width: 0; }
.document-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 5px; color: var(--text-subtle); font-size: var(--fs-11); }
.document-location { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.document-bar h1 { margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 20px; line-height: 1.4; letter-spacing: -.025em; font-weight: var(--fw-semibold); }
.document-stats { flex-shrink: 0; font-family: var(--font-mono); font-variant-numeric: tabular-nums; white-space: nowrap; }
.document-actions { display: flex; align-items: center; gap: 8px; min-width: 0; }
.quiet-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: 0 0 auto; min-height: 32px; padding: 6px 9px; border: 1px solid transparent; border-radius: var(--radius-2); background: transparent; color: var(--text-muted); font: inherit; font-size: var(--fs-12); cursor: pointer; white-space: nowrap; transition: var(--t-quick); }
.quiet-button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.quiet-button:hover { background: var(--bg); border-color: var(--border); color: var(--text); box-shadow: var(--shadow-rest); }
.quiet-button[aria-pressed="true"] { color: var(--accent); background: var(--accent-soft); }
.main { flex: 1; min-height: 0; min-width: 0; display: flex; gap: 16px; padding: 0 20px 20px; }
.work-area { display: flex; flex: 1; min-width: 0; min-height: 0; }
.pane { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 0; border: 1px solid var(--border); border-radius: var(--radius-3); box-shadow: var(--shadow-rest); }
.pane-editor { flex: 1 1 0; background: var(--bg); }
.pane-editor :deep(.editor-shell) { border-radius: inherit; overflow: hidden; }
.pane-editor.fixed-width { flex: 0 1 var(--editor-w); }
.pane-preview { flex: 1 1 0; overflow: hidden; background: var(--bg); }
.main[data-stage="write"] .pane-preview { flex: 0 1 407px; }
.main[data-stage="write"] .pane-editor.fixed-width ~ .pane-preview { flex-grow: 1; }
.context-inspector { flex: 0 0 320px; width: 320px; min-width: 0; min-height: 0; display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-3); background: var(--bg); box-shadow: var(--shadow-rest); overflow: hidden; }
.context-inspector.inspector-wide { flex-basis: 380px; width: 380px; }
.context-inspector.publish-inspector { flex-basis: 360px; width: 360px; }
.inspector-tabs { display: flex; flex: 0 0 40px; gap: 4px; border-bottom: 1px solid var(--border); padding: 5px 8px; box-sizing: border-box; }
.inspector-tabs button { flex: 1; padding: 0 12px; border: 0; border-radius: var(--radius-1); background: transparent; color: var(--text-muted); font: inherit; font-size: var(--fs-12); cursor: pointer; }
.inspector-tabs button:hover { background: var(--surface); }
.inspector-tabs button.active { color: var(--accent); background: var(--accent-soft); font-weight: var(--fw-semibold); }
.inspector-body { flex: 1; min-height: 0; }
.inspector-body :deep(.palette), .inspector-body :deep(.panel), .inspector-body :deep(.studio) { width: 100% !important; max-width: none; height: 100%; border-left: 0; }
.inspector-body :deep(.drawer-resizer) { display: none; }
.mobile-drawer-mask, .mobile-tabs { display: none; }
button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.file-conflict { max-width: 440px; padding: var(--sp-6); background: var(--surface-raised); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-3); font-family: var(--font-text); }
.file-conflict::backdrop { background: rgb(0 0 0 / 35%); }
.file-conflict h3 { margin-top: 0; font-size: 16px; }
.file-conflict p { font-size: var(--fs-13); line-height: 1.6; }
.file-conflict-actions { display: flex; gap: var(--sp-3); }
.file-conflict-actions button { padding: var(--sp-2) var(--sp-3); border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface); color: var(--text); cursor: pointer; font: inherit; }
.file-conflict-actions button:last-child { background: var(--accent); color: var(--accent-on); border-color: var(--accent); }
@media (max-width: 1280px) { .main[data-stage="write"].has-inspector .pane-preview { display: none; } .main[data-stage="write"].has-inspector .pane-editor { flex: 1 1 0; } .main[data-stage="write"].has-inspector :deep(.splitter) { display: none; } }
@media (max-width: 1100px) { .library-sidebar { flex-basis: 216px; width: 216px; } .context-inspector { flex-basis: 288px; width: 288px; } .main[data-stage="write"] .pane-preview { flex-basis: 390px; } .document-bar { padding-inline: 16px; gap: 8px; } .main { padding-inline: 12px; gap: 12px; } .document-actions { gap: 4px; } .preview-toggle { font-size: var(--fs-11); } }
@media (max-width: 900px) {
  .library-sidebar { position: fixed; inset: 0 auto 0 0; width: min(300px, 88vw); z-index: 70; background: var(--bg); }
  .mobile-drawer-mask { display: block; position: fixed; inset: 0; z-index: 60; background: rgb(0 0 0 / 30%); }
  .library-reopen { display: none; }
  .document-bar { padding-inline: 14px; }
  .document-bar h1 { font-size: var(--fs-17); }
  .context-inspector { flex-basis: 300px; width: 300px; }
}
@media (max-width: 640px) {
  .document-bar { gap: 9px; flex-wrap: wrap; padding: 10px 12px; }
  .document-heading { flex-basis: 100%; }
  .document-meta { margin-bottom: 3px; }
  .document-actions { flex: 1; justify-content: space-between; }
  .preview-toggle { display: none; }
  .main { position: relative; padding: 0 8px 8px; }
  .pane-preview, .main[data-stage="write"] .pane-preview { flex: 1; }
  .pane-editor.fixed-width { flex: 1; }
  .main[data-stage="write"][data-mobile-tab="editor"] .pane-preview { display: none; }
  .main[data-stage="write"][data-mobile-tab="preview"] .pane-editor { display: none; }
  .main :deep(.splitter) { display: none; }
  .context-inspector, .context-inspector.inspector-wide, .context-inspector.publish-inspector { position: absolute; inset: 0 8px 8px; width: auto; z-index: 20; }
  .mobile-tabs { display: flex; flex: 0 0 48px; padding-bottom: env(safe-area-inset-bottom, 0px); background: var(--bg); border-top: 1px solid var(--border); }
  .mobile-tabs button { flex: 1; border: 0; background: transparent; color: var(--text-muted); font: inherit; font-size: var(--fs-13); cursor: pointer; }
  .mobile-tabs button.active { color: var(--accent); background: var(--accent-soft); }
  :deep(input[type="text"]), :deep(input[type="search"]), :deep(input:not([type])), :deep(textarea) { font-size: 16px; }
}
</style>
