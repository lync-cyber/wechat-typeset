<script setup lang="ts">
import { computed } from 'vue'
import OverflowMenu from './OverflowMenu.vue'
import {
  OUTLINK_STRATEGIES,
  OUTLINK_STRATEGY_LABEL,
  OUTLINK_STRATEGY_HINT,
  type OutlinkStrategy,
} from '../../infra/clipboard/outlinkDegrade'
import type { UiThemeMode } from '../state/uiTheme'
import type { ToolbarAction, ToolbarToggleTarget } from './toolbar-types'
import { useToolbarPopovers } from '../composables/useToolbarPopovers'
import { modKey } from '../composables/usePlatformKey'

type WorkspaceStage = 'write' | 'typeset' | 'publish'
const props = withDefaults(defineProps<{
  stage?: WorkspaceStage
  collapsed?: boolean
  draftTitle: string
  activeDraftId: string | null
  draftIndexTick: number
  wordCount: number
  readingTime: number
  savingState: 'idle' | 'saving' | 'saved' | 'error' | 'unsaved'
  savingLabel: string
  error: string | null
  themeId: string
  hasCustomColor: boolean
  drawer: { drafts: boolean; components: boolean; customizer: boolean; checklist: boolean; personaStudio: boolean }
  outlinkStrategy: OutlinkStrategy
  uiTheme: UiThemeMode
}>(), { stage: 'typeset' })

const emit = defineEmits<{
  (e: 'update:stage', value: WorkspaceStage): void
  (e: 'save'): void
  (e: 'update:themeId', value: string): void
  (e: 'update:outlinkStrategy', value: OutlinkStrategy): void
  (e: 'update:uiTheme', value: UiThemeMode): void
  (e: 'toggle', target: ToolbarToggleTarget): void
  (e: 'action', cmd: ToolbarAction): void
  (e: 'hoverTheme', id: string | null): void
  (e: 'selectDraft', id: string): void
  (e: 'newDraft'): void
}>()

const popovers = useToolbarPopovers()
const stages: { id: WorkspaceStage; label: string; icon: string }[] = [
  { id: 'write', label: '写作', icon: '<path d="m14 5 5 5M3 21l4.5-1 12-12a2.12 2.12 0 0 0-3-3l-12 12L3 21Z"/>' },
  { id: 'typeset', label: '排版', icon: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h8M8 11h8M8 15h5"/>' },
  { id: 'publish', label: '发布准备', icon: '<path d="M12 3v14m0 0 5-5m-5 5-5-5M4 17v4h16v-4"/>' },
]
const saveStatus = computed(() => props.savingLabel.trim())

function changeStage(stage: WorkspaceStage) {
  popovers.closeAll()
  emit('update:stage', stage)
}
function selectOutlinkStrategy(strategy: OutlinkStrategy) {
  emit('update:outlinkStrategy', strategy)
  popovers.outlink.value = false
}
function openCommand() {
  popovers.closeAll()
  emit('action', 'openCommand')
}
defineExpose({ openOverflow: () => {
  popovers.closeAll()
  popovers.overflow.value = true
} })
</script>

<template>
  <header class="toolbar" :class="{ 'is-collapsed': collapsed }" aria-label="文章工作区">
    <div class="toolbar-leading">
      <button class="library-trigger icon-button" type="button" aria-label="打开文章库" :aria-expanded="drawer.drafts" @click="emit('toggle', 'drafts')">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h6l2 2h10v12H3V6Z" /></svg>
      </button>
    </div>

    <nav class="workflow" aria-label="创作流程">
      <button v-for="item in stages" :key="item.id" type="button" class="workflow-step" :class="{ active: stage === item.id }" :aria-current="stage === item.id ? 'page' : undefined" @click="changeStage(item.id)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="item.icon" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="toolbar-actions">
      <span v-if="saveStatus" class="saving" :class="savingState" :title="saveStatus" role="status" aria-live="polite">
        <span class="saving-dot" aria-hidden="true" />
        <span>{{ saveStatus }}</span>
      </span>
      <button class="save-button" type="button" :title="`保存文章 ${modKey}+S`" @click="emit('save')">保存</button>
      <div class="copy-control" data-popover-root>
        <button class="copy-button" type="button" :title="`复制到公众号 ${modKey}+Enter`" @click="emit('action', 'copy')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="1" /><path d="M16 8V3H4v13h4" /></svg>
          <span>复制到公众号</span>
        </button>
        <button class="copy-options" type="button" :class="{ active: popovers.outlink.value }" :title="`外链处理：${OUTLINK_STRATEGY_LABEL[outlinkStrategy]}`" :aria-label="`外链处理：${OUTLINK_STRATEGY_LABEL[outlinkStrategy]}`" aria-haspopup="menu" :aria-expanded="popovers.outlink.value" @click="popovers.toggleOutlink()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
        <div v-if="popovers.outlink.value" class="outlink-menu" role="menu" aria-label="外链处理策略">
          <p class="menu-title">外链处理</p>
          <button v-for="strategy in OUTLINK_STRATEGIES" :key="strategy" type="button" class="outlink-option" :class="{ selected: strategy === outlinkStrategy }" role="menuitemradio" :aria-checked="strategy === outlinkStrategy" @click="selectOutlinkStrategy(strategy)">
            <strong>{{ OUTLINK_STRATEGY_LABEL[strategy] }}</strong>
            <span>{{ OUTLINK_STRATEGY_HINT[strategy] }}</span>
          </button>
        </div>
      </div>
      <div class="utilities" data-popover-root>
        <button class="icon-button more-button" type="button" title="更多操作" aria-label="更多操作" aria-haspopup="true" :aria-expanded="popovers.overflow.value" @click="popovers.toggleOverflow()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
        </button>
        <div v-if="popovers.overflow.value" class="utility-menu" aria-label="更多操作">
          <div>
            <button class="outlink-option" type="button" @click="openCommand"><strong>命令面板 <kbd>{{ modKey }} K</kbd></strong></button>
            <button class="outlink-option" type="button" @click="emit('update:uiTheme', uiTheme === 'dark' ? 'light' : 'dark')"><strong>{{ uiTheme === 'dark' ? '使用亮色界面' : '使用暗色界面' }}</strong></button>
          </div>
          <OverflowMenu :drawer="drawer" :mod-key="modKey" @toggle="emit('toggle', $event)" @action="emit('action', $event)" @close="popovers.overflow.value = false" />
        </div>
      </div>
    </div>

    <div v-if="error || savingState === 'error'" class="toolbar-banners" aria-label="保存与复制提示">
      <div v-if="error" class="error-banner" role="alert"><span>{{ error }}</span><button type="button" @click="emit('action', 'dismissError')">知道了</button></div>
      <div v-if="savingState === 'error'" class="error-banner" role="alert"><span>{{ saveStatus || '保存失败，请保留当前页面并重试。' }}</span><button type="button" @click="emit('save')">重新保存</button></div>
    </div>
  </header>
</template>

<style scoped>
.toolbar { position: relative; z-index: 30; display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: 56px; align-items: center; column-gap: 20px; min-height: 56px; padding: 0 24px; border-bottom: 1px solid var(--border); background: var(--surface-raised); color: var(--text); font-family: var(--font-text); flex: 0 0 auto; }
button { font: inherit; cursor: pointer; }
button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.toolbar-leading { min-width: 0; display: none; align-items: center; }
.workflow { height: 38px; display: flex; justify-self: center; align-items: stretch; gap: 2px; padding: 3px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface); }
.workflow-step { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 17px; border: 0; border-radius: var(--radius-1); background: transparent; color: var(--text-muted); font-size: var(--fs-13); white-space: nowrap; }
.workflow-step:hover { color: var(--text); }
.workflow-step.active { color: var(--text); background: var(--surface-raised); box-shadow: var(--shadow-rest); font-weight: var(--fw-semibold); }
.workflow-step.active svg { color: var(--accent); }
.toolbar-actions { min-width: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.saving { display: inline-flex; align-items: center; gap: 6px; min-width: 0; max-width: 150px; margin-right: 4px; color: var(--text-muted); font-size: var(--fs-11); white-space: nowrap; }
.saving > span:last-child { overflow: hidden; text-overflow: ellipsis; }
.saving-dot { flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%; background: var(--text-subtle); }
.saving.saved .saving-dot { background: var(--success); }
.saving.unsaved .saving-dot, .saving.saving .saving-dot { background: var(--warn); }
.saving.error { color: var(--danger); }
.saving.error .saving-dot { background: var(--danger); }
.save-button { height: 36px; min-width: 60px; padding: 0 15px; border: 1px solid var(--border); border-radius: var(--radius-2); background: transparent; color: var(--text-muted); font-size: var(--fs-13); white-space: nowrap; }
.save-button:hover { background: var(--surface); color: var(--text); }
.copy-control { position: relative; display: inline-flex; flex: 0 0 auto; border: 1px solid var(--accent); border-radius: var(--radius-2); background: var(--accent); }
.copy-button, .copy-options { height: 34px; display: inline-flex; align-items: center; justify-content: center; border: 0; background: transparent; color: var(--accent-on); }
.copy-button { gap: 8px; padding: 0 13px; font-size: var(--fs-13); font-weight: var(--fw-medium); white-space: nowrap; border-radius: var(--radius-2) 0 0 var(--radius-2); }
.copy-options { width: 25px; padding: 0; border-left: 1px solid color-mix(in srgb, var(--accent-on) 25%, transparent); border-radius: 0 var(--radius-2) var(--radius-2) 0; }
.copy-button:hover, .copy-options:hover, .copy-options.active { background: var(--accent-hover); }
.icon-button { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; width: 32px; height: 36px; padding: 0; background: transparent; color: var(--text-muted); border: 1px solid transparent; border-radius: var(--radius-2); }
.icon-button:hover { color: var(--text); border-color: var(--border); background: var(--surface); }
.utilities { position: relative; flex: 0 0 auto; }
.outlink-menu, .utility-menu { position: absolute; top: calc(100% + 9px); right: 0; width: 270px; max-width: calc(100vw - 24px); max-height: calc(100dvh - 95px); overflow-y: auto; padding: 8px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); box-shadow: var(--shadow-lift); z-index: 50; }
.menu-title { margin: 5px 8px 10px; color: var(--text-subtle); font-size: var(--fs-11); }
.outlink-option { width: 100%; display: flex; flex-direction: column; align-items: stretch; gap: 5px; padding: 10px; border: 1px solid transparent; border-radius: var(--radius-1); background: transparent; text-align: left; color: var(--text); }
.outlink-option strong { font-size: var(--fs-13); font-weight: var(--fw-medium); }
.outlink-option span { font-size: var(--fs-12); line-height: 1.6; color: var(--text-muted); }
.outlink-option:hover { background: var(--surface); }
.outlink-option.selected { background: var(--accent-soft); border-color: var(--border); }
.utility-menu :deep(.popover-menu) { position: static; width: 100%; min-width: 0; max-width: none; padding: 7px 0 0; border: 0; box-shadow: none; background: transparent; }
.toolbar-banners { grid-column: 1 / -1; display: flex; flex-direction: column; padding-bottom: 8px; }
.error-banner { display: flex; align-items: center; gap: 16px; padding: 10px 20px; border-bottom: 1px solid var(--danger); background: var(--danger-soft); color: var(--danger); font-size: var(--fs-12); line-height: 1.6; }
.error-banner > span { flex: 1; overflow-wrap: anywhere; }
.error-banner button { flex: 0 0 auto; background: transparent; border: 0; color: inherit; text-decoration: underline; padding: 4px; font-size: var(--fs-12); }
@media (max-width: 1180px) { .toolbar { gap: 12px; padding-inline: 16px; } .workflow { justify-self: start; } .workflow-step { padding-inline: 12px; } .saving { max-width: 110px; } }
@media (max-width: 900px) { .toolbar { grid-template-rows: 50px 42px; gap: 0 8px; padding: 0 12px 8px; } .toolbar-leading { display: flex; grid-column: 1; grid-row: 1; } .toolbar-actions { grid-column: 2; grid-row: 1; gap: 6px; } .workflow { grid-column: 1 / -1; grid-row: 2; justify-self: center; width: 100%; max-width: 540px; } .workflow-step { min-width: 0; flex: 1; padding-inline: 8px; } .saving { display: none; } .utility-menu, .outlink-menu { max-height: calc(100dvh - 125px); } }
@media (max-width: 520px) { .toolbar { padding-inline: 8px; } .save-button { min-width: 46px; padding-inline: 10px; } .copy-button { padding-inline: 9px; font-size: var(--fs-12); } .copy-button svg { display: none; } .copy-options { width: 22px; } .toolbar-actions { gap: 4px; } .more-button { width: 27px; } .workflow-step { font-size: var(--fs-13); } }
</style>
