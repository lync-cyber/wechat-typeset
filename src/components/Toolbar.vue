<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import ThemePicker from './ThemePicker.vue'
import { themeList } from '../themes'

const props = defineProps<{
  draftTitle: string
  wordCount: number
  readingTime: number
  savingState: 'idle' | 'saving' | 'saved'
  savingLabel: string
  error: string | null
  themeId: string
  hasCustomColor: boolean
  drawer: { drafts: boolean; components: boolean; customizer: boolean; checklist: boolean }
}>()

const emit = defineEmits<{
  (e: 'update:themeId', value: string): void
  (e: 'copy'): void
  (e: 'clear'): void
  (e: 'loadSample'): void
  (e: 'saveSelection'): void
  (e: 'fixZhTypo'): void
  (e: 'exportHtml'): void
  (e: 'exportMd'): void
  (e: 'exportImage'): void
  (e: 'toggleDrafts'): void
  (e: 'toggleComponents'): void
  (e: 'toggleCustomizer'): void
  (e: 'toggleChecklist'): void
  (e: 'openCommand'): void
  (e: 'openHelp'): void
  (e: 'dismissError'): void
}>()

const themeOpen = ref(false)
const overflowOpen = ref(false)

const currentThemeName = computed(
  () => themeList.find((t) => t.id === props.themeId)?.name ?? props.themeId,
)

function selectTheme(id: string) {
  emit('update:themeId', id)
  themeOpen.value = false
}

function closePopovers(ev: MouseEvent) {
  const target = ev.target as HTMLElement | null
  if (!target) return
  if (!target.closest('[data-popover-root]')) {
    themeOpen.value = false
    overflowOpen.value = false
  }
}

function onEsc(ev: KeyboardEvent) {
  if (ev.key === 'Escape') {
    themeOpen.value = false
    overflowOpen.value = false
  }
}

watch([themeOpen, overflowOpen], ([t, o]) => {
  if (t || o) {
    window.addEventListener('mousedown', closePopovers)
    window.addEventListener('keydown', onEsc)
  } else {
    window.removeEventListener('mousedown', closePopovers)
    window.removeEventListener('keydown', onEsc)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', closePopovers)
  window.removeEventListener('keydown', onEsc)
})

const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

/** 允许父组件（如 OnboardingCard 移动端引导）打开 "更多操作" 菜单 */
defineExpose({
  openOverflow() {
    overflowOpen.value = true
    themeOpen.value = false
  },
})
</script>

<template>
  <header class="toolbar">
    <div class="ruler" />

    <!-- Left zone: brand + current draft -->
    <div class="zone zone-left">
      <span class="brand">
        <span class="brand-mark">wechat</span><span class="brand-dot">-</span><span class="brand-name">typeset</span>
      </span>
      <button
        class="draft-switch"
        :class="{ active: props.drawer.drafts }"
        :title="`草稿列表  ${modKey}+Shift+D`"
        @click="emit('toggleDrafts')"
      >
        <span class="draft-title">{{ props.draftTitle || '未命名草稿' }}</span>
        <span class="draft-mobile-hint">导入</span>
        <span class="chevron">▾</span>
      </button>
    </div>

    <!-- Center zone: theme / insert / palette -->
    <div class="zone zone-center">
      <div class="pop-wrap" data-popover-root>
        <button
          class="btn btn-ghost btn-theme"
          :class="{ active: themeOpen }"
          :title="'切换主题'"
          @click="themeOpen = !themeOpen; overflowOpen = false"
        >
          <span class="dot-mark" />
          <span class="theme-name-full">{{ currentThemeName }}</span>
          <span v-if="props.hasCustomColor" class="custom-chip" title="已有自定义配色">·自定义</span>
        </button>
        <div v-if="themeOpen" class="popover popover-theme">
          <ThemePicker
            :model-value="props.themeId"
            @update:model-value="selectTheme"
          />
        </div>
      </div>
      <button
        class="btn btn-ghost btn-insert"
        :class="{ active: props.drawer.components }"
        :title="`插入组件 / 主题模板  ${modKey}+Shift+P`"
        :aria-label="`插入组件 / 主题模板  ${modKey}+Shift+P`"
        @click="emit('toggleComponents')"
      ><span class="btn-label">插入</span><span class="btn-glyph" aria-hidden="true">＋</span></button>
      <button
        class="btn btn-ghost btn-palette"
        :class="{ active: props.drawer.customizer }"
        :title="`自定义配色  ${modKey}+Shift+C`"
        :aria-label="`自定义配色  ${modKey}+Shift+C`"
        @click="emit('toggleCustomizer')"
      ><span class="btn-label">配色</span><span class="btn-glyph" aria-hidden="true">◐</span></button>
    </div>

    <!-- Right zone: stats / command / overflow / copy -->
    <div class="zone zone-right">
      <div class="stats mono">
        <span class="stat"><span class="stat-num">{{ props.wordCount }}</span><span class="stat-lbl">字</span></span>
        <span class="stat"><span class="stat-num">{{ props.readingTime }}</span><span class="stat-lbl">分钟</span></span>
        <span
          class="saving"
          :class="props.savingState"
          :title="props.savingLabel"
        >
          <span class="saving-dot" />
          <span class="saving-text">{{ props.savingLabel }}</span>
        </span>
      </div>

      <button class="btn btn-ghost icon btn-cmd" :title="`命令面板  ${modKey}+K`" @click="emit('openCommand')">
        <span class="kbd">{{ modKey }}K</span>
      </button>
      <button class="btn btn-ghost icon btn-help" title="快捷键与帮助  ?" @click="emit('openHelp')">
        ?
      </button>

      <div class="pop-wrap" data-popover-root>
        <button
          class="btn btn-ghost icon"
          :class="{ active: overflowOpen }"
          title="更多操作"
          @click="overflowOpen = !overflowOpen; themeOpen = false"
        >···</button>
        <div v-if="overflowOpen" class="popover popover-menu">
          <button class="menu-item" @click="emit('toggleDrafts'); overflowOpen = false">
            <span>{{ props.drawer.drafts ? '关闭草稿列表' : '草稿列表' }}</span>
          </button>
          <button class="menu-item" @click="emit('toggleComponents'); overflowOpen = false">
            <span>{{ props.drawer.components ? '关闭组件库' : '插入组件' }}</span>
          </button>
          <button class="menu-item" @click="emit('toggleCustomizer'); overflowOpen = false">
            <span>{{ props.drawer.customizer ? '关闭自定义配色' : '自定义配色' }}</span>
          </button>
          <button class="menu-item" @click="emit('toggleChecklist'); overflowOpen = false">
            <span>{{ props.drawer.checklist ? '关闭发文清单' : '发文清单' }}</span>
          </button>
          <div class="menu-sep" />
          <button class="menu-item" @click="emit('saveSelection'); overflowOpen = false">
            <span>保存选区为组件</span>
          </button>
          <button class="menu-item" @click="emit('loadSample'); overflowOpen = false">
            <span>载入当前主题示例</span>
          </button>
          <button class="menu-item" @click="emit('fixZhTypo'); overflowOpen = false">
            <span>一键修复中文排版</span>
          </button>
          <div class="menu-sep" />
          <button class="menu-item" @click="emit('exportHtml'); overflowOpen = false">
            <span>导出 HTML</span><span class="menu-kbd">{{ modKey }}⇧H</span>
          </button>
          <button class="menu-item" @click="emit('exportMd'); overflowOpen = false">
            <span>导出 Markdown</span><span class="menu-kbd">{{ modKey }}⇧M</span>
          </button>
          <button class="menu-item" @click="emit('exportImage'); overflowOpen = false">
            <span>导出长图</span>
          </button>
          <div class="menu-sep" />
          <button class="menu-item" @click="emit('openCommand'); overflowOpen = false">
            <span>命令面板</span><span class="menu-kbd">{{ modKey }}K</span>
          </button>
          <button class="menu-item" @click="emit('openHelp'); overflowOpen = false">
            <span>快捷键与帮助</span>
          </button>
          <div class="menu-sep" />
          <button class="menu-item danger" @click="emit('clear'); overflowOpen = false">
            <span>清空正文</span>
          </button>
        </div>
      </div>

      <button class="btn btn-primary" :title="`复制到剪贴板  ${modKey}+Enter`" @click="emit('copy')">
        <span>一键复制</span>
      </button>
    </div>

    <!-- Persistent error banner -->
    <div v-if="props.error" class="error-banner" role="alert">
      <span class="error-icon">!</span>
      <span class="error-text">{{ props.error }}</span>
      <button class="error-close" @click="emit('dismissError')">知道了</button>
    </div>
  </header>
</template>

<style scoped>
.toolbar {
  position: relative;
  flex: 0 0 auto;
  height: var(--toolbar-h);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: var(--sp-3);
  padding: 0 var(--sp-4);
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-text);
  color: var(--text);
  white-space: nowrap;
}

/* Thin "ruler" strip at the bottom of the bar — the "校样" signature. */
.ruler {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--ruler-h);
  background: linear-gradient(
    to right,
    transparent 0,
    transparent calc(100% - 120px),
    var(--accent) calc(100% - 120px),
    var(--accent) 100%
  );
  pointer-events: none;
}

.zone { display: flex; align-items: center; gap: var(--sp-3); min-width: 0; }
.zone-left { justify-self: start; }
.zone-center { justify-self: center; }
.zone-right { justify-self: end; }

.brand {
  display: inline-flex; align-items: baseline; gap: 2px;
  font-family: var(--font-display);
  font-size: var(--fs-17);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
  color: var(--text);
  user-select: none;
}
.brand-mark { color: var(--accent); }
.brand-dot { color: var(--text-subtle); margin: 0 1px; }
.brand-name { color: var(--text); }

.draft-switch {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  max-width: 280px;
  height: 28px;
  padding: 0 var(--sp-3);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-2);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-13);
  cursor: pointer;
  transition: var(--t-quick);
}
.draft-switch:hover { background: var(--surface); }
.draft-switch.active { background: var(--accent-soft); color: var(--accent); border-color: transparent; }
.draft-title {
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  max-width: 240px;
  font-weight: var(--fw-medium);
}
.chevron { color: var(--text-subtle); font-size: 10px; }
.draft-mobile-hint { display: none; }

.btn {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  height: 28px;
  padding: 0 var(--sp-4);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  border-radius: var(--radius-2);
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: var(--t-quick);
  white-space: nowrap;
  flex: 0 0 auto;
}
.btn.icon { padding: 0 var(--sp-3); min-width: 28px; justify-content: center; }
.btn-glyph { display: none; }
.btn-ghost { border-color: var(--border); background: var(--surface-raised); }
.btn-ghost:hover { background: var(--surface); }
.btn-ghost.active { background: var(--accent-soft); color: var(--accent); border-color: var(--accent-soft); }
.btn-primary {
  background: var(--accent);
  color: var(--accent-on);
  border-color: var(--accent);
  height: 32px;
  padding: 0 var(--sp-4);
  font-weight: var(--fw-medium);
}
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.btn-primary:active { background: var(--accent-press); border-color: var(--accent-press); }

.dot-mark {
  width: 8px; height: 8px; border-radius: var(--radius-pill);
  background: var(--accent); display: inline-block;
}
.custom-chip {
  font-size: var(--fs-11);
  color: var(--text-muted);
  letter-spacing: var(--ls-wide);
}

.kbd {
  display: inline-flex; align-items: center; justify-content: center;
  height: 18px; padding: 0 5px;
  font-family: var(--font-mono);
  font-feature-settings: var(--font-feat-num);
  font-size: var(--fs-11);
  color: var(--text-muted);
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-1);
}
.btn-primary .kbd-on-primary {
  color: var(--accent-on);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
}

.stats {
  display: inline-flex; align-items: baseline;
  gap: var(--sp-3);
  margin-right: var(--sp-2);
  color: var(--text-muted);
  font-size: var(--fs-12);
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
}
.stat { display: inline-flex; align-items: baseline; gap: 3px; }
.stat-num { color: var(--text); font-weight: var(--fw-medium); font-size: var(--fs-13); }
.stat-lbl { color: var(--text-subtle); font-size: var(--fs-11); letter-spacing: var(--ls-wide); }

.saving {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  color: var(--text-subtle);
  min-width: 0;
  transition: var(--t-quick);
}
@media (max-width: 1100px) {
  .stats .saving-text { display: none; }
}
@media (max-width: 960px) {
  .stats .stat-lbl { display: none; }
}
@media (max-width: 900px) {
  .stats { display: none; }
}
@media (max-width: 767px) {
  /* ── 两行工具栏 ──────────────────────────────────────────
     第一行（40px）：品牌名左 / 导入草稿按钮右
     第二行（52px）：工具图标左 / 操作按钮右
     ──────────────────────────────────────────────────────── */
  .toolbar {
    height: auto;
    padding: 0;
    gap: 0;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
  }

  /* 第一行：品牌名与草稿入口两端对齐 */
  .zone-left {
    grid-column: 1 / 3;
    grid-row: 1;
    overflow: hidden;
    justify-self: stretch;
    align-self: stretch;
    justify-content: space-between;
    padding: 0 var(--sp-3);
    border-bottom: 1px solid var(--border);
  }

  /* 移动端：隐藏草稿标题，显示功能说明 */
  .draft-title { display: none; }
  .draft-mobile-hint {
    display: inline;
    font-size: var(--fs-13);
    font-weight: var(--fw-medium);
    color: var(--text);
  }

  /* 草稿按钮收缩为功能入口 */
  .draft-switch {
    width: auto;
    max-width: none;
    height: 40px;
    padding: 0 var(--sp-3);
    align-items: center;
    gap: var(--sp-2);
  }

  /* 第二行：左区工具按钮 */
  .zone-center {
    grid-column: 1;
    grid-row: 2;
    justify-self: start;
    padding: 4px var(--sp-3);
    gap: 4px;
  }

  /* 第二行：右区操作按钮 */
  .zone-right {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
    padding: 4px var(--sp-3);
    gap: 4px;
  }

  .btn-cmd, .btn-help { display: none; }

  /* 中区：44×44 图标按钮 */
  .zone-center .btn { min-width: 44px; height: 44px; padding: 0; justify-content: center; }
  .btn-theme .theme-name-full,
  .btn-theme .custom-chip,
  .btn-insert .btn-label,
  .btn-palette .btn-label { display: none; }
  .btn-insert .btn-glyph,
  .btn-palette .btn-glyph { display: inline-flex; font-size: var(--fs-15); line-height: 1; }

  /* 右区 */
  .zone-right .btn.icon { min-width: 44px; height: 44px; }
  .btn-primary { height: 36px; padding: 0 var(--sp-3); min-width: 80px; }
}

/* 两行工具栏总高约 92px（40px 标题行 + 52px 工具行），品牌名不再需要隐藏 */
/* popover 宽度兜底：不溢出视口 */
.popover { max-width: calc(100vw - 16px); }
.saving-dot {
  width: 6px; height: 6px; border-radius: var(--radius-pill);
  background: var(--text-subtle);
  transition: var(--t-quick);
}
.saving.saving .saving-dot { background: var(--amber-500); }
.saving.saved .saving-dot { background: var(--success); }
.saving.idle .saving-text { color: transparent; }

.pop-wrap { position: relative; }
.popover {
  position: absolute;
  top: calc(100% + 6px);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-lift);
  z-index: 40;
  min-width: 220px;
}
.popover-theme { left: 0; padding: var(--sp-2); width: 320px; }
.popover-menu {
  right: 0;
  padding: var(--sp-2);
  width: 220px;
}
.menu-item {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%;
  padding: var(--sp-3) var(--sp-3);
  border-radius: var(--radius-1);
  border: none;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: var(--fs-13);
  cursor: pointer;
  text-align: left;
}
.menu-item:hover { background: var(--surface); }
.menu-item.danger { color: var(--danger); }
.menu-item.danger:hover { background: var(--danger-soft); }
.menu-kbd {
  font-family: var(--font-mono);
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
}
.menu-sep { height: 1px; background: var(--border); margin: var(--sp-2) 0; }

/* Error banner sits as a full-width sliver under the toolbar */
.error-banner {
  position: absolute;
  top: 100%;
  left: 0; right: 0;
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  background: var(--danger-soft);
  color: var(--danger);
  border-bottom: 1px solid var(--border);
  font-size: var(--fs-13);
  z-index: 30;
}
.error-icon {
  width: 18px; height: 18px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: var(--radius-pill);
  background: var(--danger);
  color: var(--accent-on);
  font-weight: var(--fw-bold);
  font-size: var(--fs-11);
  flex: 0 0 auto;
}
.error-text { flex: 1 1 auto; }
.error-close {
  border: 1px solid var(--danger);
  background: transparent;
  color: var(--danger);
  border-radius: var(--radius-1);
  padding: 2px var(--sp-3);
  font-size: var(--fs-12);
  cursor: pointer;
}
.error-close:hover { background: var(--danger); color: var(--accent-on); }
</style>
