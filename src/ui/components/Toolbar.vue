<script setup lang="ts">
import { computed, watch } from 'vue'
import ThemePicker from './ThemePicker.vue'
import OverflowMenu from './OverflowMenu.vue'
import { themeList } from '../../core/themes'
import { listDrafts, type DraftMeta } from '../../infra/storage/drafts'
import {
  OUTLINK_STRATEGIES,
  OUTLINK_STRATEGY_LABEL,
  OUTLINK_STRATEGY_HINT,
  type OutlinkStrategy,
} from '../../infra/clipboard/outlinkDegrade'
import type { UiThemeMode } from '../../app/uiTheme'
import type { ToolbarAction, ToolbarToggleTarget } from './toolbar-types'
import { useToolbarPopovers } from '../composables/useToolbarPopovers'

const props = defineProps<{
  /** 移动端瘦顶栏：true 时把第一行标题行滑出视口（CSS 只在移动断点下生效） */
  collapsed?: boolean
  draftTitle: string
  /** 当前活动草稿 id，draft popover 用来高亮命中项 */
  activeDraftId: string | null
  /** 外部 mutate 草稿后递增的 tick，用来让本组件 popover 内的最近列表跟着失效 */
  draftIndexTick: number
  wordCount: number
  readingTime: number
  savingState: 'idle' | 'saving' | 'saved' | 'error'
  savingLabel: string
  error: string | null
  themeId: string
  hasCustomColor: boolean
  drawer: { drafts: boolean; components: boolean; customizer: boolean; checklist: boolean; personaStudio: boolean }
  outlinkStrategy: OutlinkStrategy
  uiTheme: UiThemeMode
}>()

/**
 * 命令总线：4 个事件覆盖原来 18 个 emit。
 *   - update:themeId / update:outlinkStrategy —— 带载荷，沿用 Vue update:xxx 规约
 *   - toggle —— 4 个抽屉切换合一，target 选择具体侧
 *   - action —— 所有无载荷纯动作（copy / export / 中文修复 / 关闭错误条 等）
 */
const emit = defineEmits<{
  (e: 'update:themeId', value: string): void
  (e: 'update:outlinkStrategy', value: OutlinkStrategy): void
  (e: 'update:uiTheme', value: UiThemeMode): void
  (e: 'toggle', target: ToolbarToggleTarget): void
  (e: 'action', cmd: ToolbarAction): void
  (e: 'hoverTheme', id: string | null): void
  /** 用户从 draft popover 选中一篇 —— App.vue 走 useDraftLifecycle.handleSelectDraft */
  (e: 'selectDraft', id: string): void
  /** 用户在 draft popover 点了"新建草稿" */
  (e: 'newDraft'): void
}>()

const popovers = useToolbarPopovers()

const currentThemeName = computed(
  () => themeList.find((t) => t.id === props.themeId)?.name ?? props.themeId,
)

function selectTheme(id: string) {
  emit('update:themeId', id)
  emit('hoverTheme', null)
  popovers.theme.value = false
}

function selectOutlinkStrategy(s: OutlinkStrategy) {
  emit('update:outlinkStrategy', s)
  popovers.outlink.value = false
}

/**
 * draft popover: 最近 5 篇草稿。父侧每次 mutate（新建 / 删除 / 重命名）都会 bump
 * draftIndexTick；读取 .value 让 computed 依赖它，自动重算。
 */
const recentDrafts = computed<DraftMeta[]>(() => {
  void props.draftIndexTick
  return listDrafts().slice(0, 5)
})

function selectDraft(id: string) {
  emit('selectDraft', id)
  popovers.draft.value = false
}

function newDraft() {
  emit('newDraft')
  popovers.draft.value = false
}

function openFullDrafts() {
  // popover 关掉的同时打开完整 drawer（用户主动表达"我要全部草稿管理"）
  popovers.draft.value = false
  if (!props.drawer.drafts) emit('toggle', 'drafts')
}

/** "今天 14:32" / "05-08 09:15" / "去年 11-23" —— 与 DraftDrawer 的 fmt 保持一致风格 */
function fmtDraftTime(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const sameDay = d.toDateString() === now.toDateString()
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  if (sameDay) return `今天 ${hh}:${mm}`
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${m}-${day} ${hh}:${mm}`
}

/**
 * 主题 popover 底部"自定义配色 / 主题编辑器"入口：触发 toggle 同时把 popover 关掉，
 * 避免抽屉打开后 popover 仍悬浮在上面遮内容。
 */
function triggerToggle(target: ToolbarToggleTarget) {
  emit('toggle', target)
  emit('hoverTheme', null)
  popovers.theme.value = false
}

// popover 关闭时主动清 hover，避免预览停留在临时主题上
watch(popovers.theme, (open) => {
  if (!open) emit('hoverTheme', null)
})

const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

/** 允许父组件（如 OnboardingCard 移动端引导）打开 "更多操作" 菜单 */
defineExpose({
  openOverflow() {
    popovers.overflow.value = true
    popovers.theme.value = false
  },
})
</script>

<template>
  <header class="toolbar" :class="{ 'is-collapsed': props.collapsed }">
    <div class="ruler" />

    <!-- Left zone: brand + current draft -->
    <div class="zone zone-left">
      <span class="brand">
        <span class="brand-mark">wechat</span><span class="brand-dot">-</span><span class="brand-name">typeset</span>
      </span>
      <div class="pop-wrap" data-popover-root>
        <button
          class="draft-switch"
          :class="{ active: popovers.draft.value || props.drawer.drafts }"
          :title="`草稿列表  ${modKey}+Shift+D`"
          aria-haspopup="menu"
          :aria-expanded="popovers.draft.value"
          @click="popovers.toggleDraft()"
        >
          <span class="draft-title">{{ props.draftTitle || '未命名草稿' }}</span>
          <span class="draft-mobile-hint">导入</span>
          <span class="chevron">▾</span>
        </button>
        <div v-if="popovers.draft.value" class="popover popover-draft" role="menu" aria-label="草稿列表">
          <div class="draft-pop-head">最近草稿</div>
          <ul v-if="recentDrafts.length > 0" class="draft-pop-list">
            <li v-for="d in recentDrafts" :key="d.id">
              <button
                type="button"
                class="draft-pop-item"
                :class="{ active: d.id === props.activeDraftId }"
                role="menuitemradio"
                :aria-checked="d.id === props.activeDraftId"
                @click="selectDraft(d.id)"
              >
                <span class="draft-pop-title">{{ d.title || '未命名草稿' }}</span>
                <span class="draft-pop-meta mono">{{ fmtDraftTime(d.updatedAt) }}</span>
              </button>
            </li>
          </ul>
          <div v-else class="draft-pop-empty">暂无草稿</div>
          <div class="draft-pop-sep" />
          <button type="button" class="draft-pop-action" @click="newDraft">
            <span class="draft-pop-action-glyph" aria-hidden="true">＋</span>
            <span>新建草稿</span>
          </button>
          <button type="button" class="draft-pop-action" @click="openFullDrafts">
            <span class="draft-pop-action-glyph" aria-hidden="true">⇉</span>
            <span>全部草稿与搜索</span>
            <span class="draft-pop-action-kbd mono">{{ modKey }}⇧D</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Center zone: theme / insert / palette -->
    <div class="zone zone-center">
      <div class="pop-wrap" data-popover-root>
        <button
          class="btn btn-ghost btn-theme"
          :class="{ active: popovers.theme.value }"
          :title="'切换主题'"
          @click="popovers.toggleTheme()"
        >
          <span class="dot-mark" />
          <span class="theme-name-full">{{ currentThemeName }}</span>
          <span v-if="props.hasCustomColor" class="custom-chip" title="已有自定义配色">·自定义</span>
        </button>
        <div v-if="popovers.theme.value" class="popover popover-theme">
          <ThemePicker
            :model-value="props.themeId"
            @update:model-value="selectTheme"
            @hover="emit('hoverTheme', $event)"
          />
          <!-- popover 底部 footer: 主题外观调整的两条延伸路径 -->
          <div class="theme-popover-foot">
            <button
              type="button"
              class="theme-foot-btn"
              :class="{ active: props.drawer.customizer }"
              :title="`自定义配色  ${modKey}+Shift+C`"
              @click="triggerToggle('customizer')"
            >
              <span class="theme-foot-glyph" aria-hidden="true">◐</span>
              <span class="theme-foot-label">自定义配色</span>
            </button>
            <button
              type="button"
              class="theme-foot-btn"
              :class="{ active: props.drawer.personaStudio }"
              title="打开主题编辑器（创建 / 派生主题）"
              @click="triggerToggle('personaStudio')"
            >
              <span class="theme-foot-glyph" aria-hidden="true">＋</span>
              <span class="theme-foot-label">主题编辑器</span>
            </button>
          </div>
        </div>
      </div>
      <button
        class="btn btn-ghost btn-insert"
        :class="{ active: props.drawer.components }"
        :title="`插入组件 / 主题模板  ${modKey}+Shift+P`"
        :aria-label="`插入组件 / 主题模板  ${modKey}+Shift+P`"
        @click="emit('toggle', 'components')"
      ><span class="btn-label">插入</span><span class="btn-glyph" aria-hidden="true">＋</span></button>
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
      <!-- 保存错误的独立角标：≤900px 时 .stats 整块隐藏，但 error 态必须可见。
       * pingTransient 的 4 秒提示太短，作者关掉页面可能就丢稿——给个常驻的
       * 红色 pill 直到下次保存成功（savingState 自然回归 saved/idle）。 -->
      <button
        v-if="props.savingState === 'error'"
        class="saving-error-pill"
        type="button"
        :title="props.savingLabel || '草稿写盘失败 · 存储已满'"
        :aria-label="props.savingLabel || '草稿写盘失败 · 存储已满'"
        @click="emit('toggle', 'drafts')"
      >
        <span class="saving-error-glyph" aria-hidden="true">!</span>
        <span class="saving-error-text">写盘失败</span>
      </button>

      <button
        class="btn btn-ghost btn-checklist"
        :class="{ active: props.drawer.checklist }"
        title="发文清单：发文前自检"
        aria-label="发文清单"
        @click="emit('toggle', 'checklist')"
      >
        <svg class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" />
          <polyline points="5 8.2 7 10.2 11 6" />
        </svg>
        <span class="btn-checklist-label">发文清单</span>
      </button>
      <button class="btn btn-ghost icon btn-cmd" :title="`命令面板  ${modKey}+K`" :aria-label="`命令面板 ${modKey}+K`" @click="emit('action', 'openCommand')">
        <span class="kbd">{{ modKey }}K</span>
      </button>
      <button class="btn btn-ghost icon btn-help" title="快捷键与帮助  ?" aria-label="快捷键与帮助" @click="emit('action', 'openHelp')">
        <svg class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" />
          <path d="M6.1 6.2a1.9 1.9 0 1 1 2.85 1.65c-.55.32-.95.8-.95 1.45v.3" />
          <circle cx="8" cy="11.6" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      </button>
      <button
        class="btn btn-ghost icon btn-ui-theme"
        :class="{ 'is-dark': props.uiTheme === 'dark' }"
        :title="props.uiTheme === 'dark' ? '切换到亮色界面' : '切换到暗色界面'"
        :aria-label="props.uiTheme === 'dark' ? '切换到亮色界面' : '切换到暗色界面'"
        @click="emit('update:uiTheme', props.uiTheme === 'dark' ? 'light' : 'dark')"
      >
        <!-- 亮色态显示太阳 / 暗色态显示月亮：按钮承担"切换到对侧"语义，所以图标
             显示的是"当前在哪一侧"，点击后切到另一侧。 -->
        <svg v-if="props.uiTheme !== 'dark'" class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="2.6" />
          <line x1="8" y1="1.2" x2="8" y2="2.8" />
          <line x1="8" y1="13.2" x2="8" y2="14.8" />
          <line x1="1.2" y1="8" x2="2.8" y2="8" />
          <line x1="13.2" y1="8" x2="14.8" y2="8" />
          <line x1="3.2" y1="3.2" x2="4.4" y2="4.4" />
          <line x1="11.6" y1="11.6" x2="12.8" y2="12.8" />
          <line x1="12.8" y1="3.2" x2="11.6" y2="4.4" />
          <line x1="4.4" y1="11.6" x2="3.2" y2="12.8" />
        </svg>
        <svg v-else class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M13.6 9.4A5.6 5.6 0 1 1 6.6 2.4a4.6 4.6 0 0 0 7 7z" />
        </svg>
      </button>

      <div class="pop-wrap" data-popover-root>
        <button
          class="btn btn-ghost icon btn-overflow"
          :class="{ active: popovers.overflow.value }"
          title="更多操作"
          aria-label="更多操作"
          @click="popovers.toggleOverflow()"
        >
          <svg class="btn-icon-svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <circle cx="3" cy="8" r="1.3" />
            <circle cx="8" cy="8" r="1.3" />
            <circle cx="13" cy="8" r="1.3" />
          </svg>
        </button>
        <OverflowMenu
          v-if="popovers.overflow.value"
          :drawer="props.drawer"
          :mod-key="modKey"
          @toggle="emit('toggle', $event)"
          @action="emit('action', $event)"
          @close="popovers.overflow.value = false"
        />
      </div>

      <!-- Split-button: 主体执行复制，▾ 切换外链策略；让 per-copy 决策 1 步达成
           （原本要 ··· → 滚动到中部 segmented control，3 步） -->
      <div class="copy-split" data-popover-root>
        <button class="btn btn-primary btn-copy-main" :title="`复制到剪贴板  ${modKey}+Enter`" @click="emit('action', 'copy')">
          <span>一键复制</span>
        </button>
        <button
          class="btn btn-primary btn-copy-chev"
          :class="{ active: popovers.outlink.value }"
          :title="`外链处理 · 当前：${OUTLINK_STRATEGY_LABEL[props.outlinkStrategy]}`"
          :aria-label="`外链处理 · 当前${OUTLINK_STRATEGY_LABEL[props.outlinkStrategy]}`"
          aria-haspopup="menu"
          :aria-expanded="popovers.outlink.value"
          @click="popovers.toggleOutlink()"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M2 4l3 3 3-3z" />
          </svg>
        </button>
        <div v-if="popovers.outlink.value" class="popover popover-outlink" role="menu" aria-label="外链处理策略">
          <div class="outlink-head">外链处理</div>
          <button
            v-for="s in OUTLINK_STRATEGIES"
            :key="s"
            type="button"
            class="outlink-item"
            :class="{ active: props.outlinkStrategy === s }"
            role="menuitemradio"
            :aria-checked="props.outlinkStrategy === s"
            @click="selectOutlinkStrategy(s)"
          >
            <span class="outlink-radio" aria-hidden="true">
              <span v-if="props.outlinkStrategy === s" class="outlink-radio-dot" />
            </span>
            <span class="outlink-label">{{ OUTLINK_STRATEGY_LABEL[s] }}</span>
            <span class="outlink-hint">{{ OUTLINK_STRATEGY_HINT[s] }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Persistent error banner -->
    <div v-if="props.error" class="error-banner" role="alert">
      <span class="error-icon">!</span>
      <span class="error-text">{{ props.error }}</span>
      <button class="error-close" @click="emit('action', 'dismissError')">知道了</button>
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

/* Split-button: 主复制按钮 + ▾ 外链策略切换。两个按钮共享 accent 背景，中间用一条
 * 半透明分隔线区分点击区域。展开 popover 提供 3 选 1 + 一句话效果说明（用户做选
 * 择前能预期复制后正文形态）。 */
.copy-split {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  border-radius: var(--radius-2);
  overflow: visible;
  flex: 0 0 auto;
}
.btn-copy-main {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.22);
}
.btn-copy-chev {
  height: 32px;
  padding: 0 var(--sp-3);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
}
.btn-copy-chev.active { background: var(--accent-press); border-color: var(--accent-press); }
.popover-outlink {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-lift);
  z-index: 40;
  min-width: 260px;
  padding: var(--sp-2);
}
.outlink-head {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  padding: var(--sp-2) var(--sp-3) var(--sp-1);
}
.outlink-item {
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: var(--sp-3);
  width: 100%;
  padding: var(--sp-3);
  border: none;
  background: transparent;
  border-radius: var(--radius-1);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-13);
  cursor: pointer;
  text-align: left;
  transition: var(--t-quick);
}
.outlink-item:hover { background: var(--surface); }
.outlink-item.active { background: var(--accent-soft); }
.outlink-radio {
  width: 14px; height: 14px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--text-subtle);
  display: inline-flex; align-items: center; justify-content: center;
}
.outlink-item.active .outlink-radio { border-color: var(--accent); }
.outlink-radio-dot {
  width: 6px; height: 6px; border-radius: var(--radius-pill);
  background: var(--accent);
}
.outlink-label {
  color: var(--text);
  font-weight: var(--fw-medium);
}
.outlink-item.active .outlink-label { color: var(--accent); }
.outlink-hint {
  grid-column: 2 / 4;
  grid-row: 2;
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-tight);
  margin-top: -2px;
}

.dot-mark {
  width: 8px; height: 8px; border-radius: var(--radius-pill);
  background: var(--accent); display: inline-block;
}

/* 发文清单（zone-right）—— SVG 勾选圆 + 文字标签。
 * 文字在 <1100px 时隐藏退化为 icon-only，移动端断点（<768px）下完全隐去（避免与
 * 紧凑 grid 工具栏冲突；移动端清单仍能从 ··· 菜单 / 命令面板进入）。 */
.btn-checklist { gap: var(--sp-2); }
.btn-checklist .btn-icon-svg { color: var(--text-subtle); }
.btn-checklist.active .btn-icon-svg { color: var(--accent); }
.btn-checklist-label { font-size: var(--fs-13); }
@media (max-width: 1100px) {
  .btn-checklist .btn-checklist-label { display: none; }
  .btn-checklist { padding: 0 var(--sp-3); min-width: 28px; justify-content: center; }
}

/* 工具栏 zone-right 的 icon 按钮统一走 SVG 实物图标。
 * 每个按钮形态语义独立：✓ 圆=发文清单 / ? 圆=帮助 / 太阳·月亮=亮暗切换 / 三点=溢出菜单。
 * 颜色继承 .btn 当前 color；active 态走 ghost.active accent。 */
.btn-icon-svg {
  display: inline-block;
  flex: 0 0 auto;
  color: currentColor;
}
.btn-ui-theme.is-dark .btn-icon-svg {
  color: var(--accent);
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

  .btn-cmd, .btn-help, .btn-checklist { display: none; }

  /* 中区：44×44 图标按钮 */
  .zone-center .btn { min-width: 44px; height: 44px; padding: 0; justify-content: center; }
  .btn-theme .theme-name-full,
  .btn-theme .custom-chip,
  .btn-insert .btn-label { display: none; }
  .btn-insert .btn-glyph { display: inline-flex; font-size: var(--fs-15); line-height: 1; }

  /* 右区 */
  .zone-right .btn.icon { min-width: 44px; height: 44px; }
  .btn-primary { height: 36px; padding: 0 var(--sp-3); min-width: 80px; }

  /* L4 瘦顶栏：collapsed 时把第一行（40px 标题行）通过 max-height 收起，让 92px
   * 顶栏变 ~53px。max-height 比 grid-template-rows fr 动画兼容性更好；保留 hide
   * 后的 0 高度仍占 grid row 1，popover 仍以第二行为定位锚点。 */
  .zone-left {
    max-height: 40px;
    overflow: hidden;
    transition:
      max-height 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
      padding 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 200ms;
  }
  .toolbar.is-collapsed .zone-left {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-bottom-color: transparent;
  }
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
.saving.error .saving-dot { background: var(--danger); }
.saving.error .saving-text { color: var(--danger); font-weight: var(--fw-medium); }
.saving.idle .saving-text { color: transparent; }

/* 写盘失败 pill —— 始终可见的"红色！+ 写盘失败"按钮，点击打开草稿抽屉（让用户查
 * 看存储用量 / 删除老草稿）。颜色用 danger token；点击区域 28px 高，与 ghost btn 一致。 */
.saving-error-pill {
  display: inline-flex; align-items: center; gap: 4px;
  height: 28px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-2);
  border: 1px solid var(--danger);
  background: var(--danger-soft);
  color: var(--danger);
  font-family: var(--font-text);
  font-size: var(--fs-12);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: var(--t-quick);
  flex: 0 0 auto;
}
.saving-error-pill:hover { background: var(--danger); color: var(--accent-on); }
.saving-error-glyph {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px;
  border-radius: var(--radius-pill);
  background: var(--danger);
  color: var(--accent-on);
  font-weight: var(--fw-bold);
  font-size: var(--fs-11);
}
.saving-error-pill:hover .saving-error-glyph {
  background: var(--accent-on);
  color: var(--danger);
}
@media (max-width: 600px) {
  .saving-error-text { display: none; }
  .saving-error-pill { padding: 0 var(--sp-2); }
}

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

/* Draft popover —— 最近 5 篇 + 新建 + 全部入口。
 * 选中 1 步即切草稿；点"全部"才走 DraftDrawer（搜索 / 标签 / 删除等重操作）。 */
.popover-draft { left: 0; padding: var(--sp-2); width: 300px; }
.draft-pop-head {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  padding: var(--sp-2) var(--sp-3) var(--sp-1);
}
.draft-pop-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.draft-pop-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: var(--sp-3);
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  border: none;
  background: transparent;
  border-radius: var(--radius-1);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-13);
  cursor: pointer;
  text-align: left;
  transition: var(--t-quick);
}
.draft-pop-item:hover { background: var(--surface); }
.draft-pop-item.active { background: var(--accent-soft); color: var(--accent); }
.draft-pop-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: var(--fw-medium);
}
.draft-pop-meta {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  font-feature-settings: var(--font-feat-num);
}
.draft-pop-item.active .draft-pop-meta { color: var(--accent); }
.draft-pop-empty {
  padding: var(--sp-3) var(--sp-3);
  color: var(--text-subtle);
  font-size: var(--fs-12);
  text-align: center;
}
.draft-pop-sep { height: 1px; background: var(--border); margin: var(--sp-2) 0; }
.draft-pop-action {
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: var(--sp-3);
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  border: none;
  background: transparent;
  border-radius: var(--radius-1);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-13);
  cursor: pointer;
  text-align: left;
  transition: var(--t-quick);
}
.draft-pop-action:hover { background: var(--surface); }
.draft-pop-action-glyph {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px;
  font-size: var(--fs-13);
  color: var(--text-subtle);
  line-height: 1;
}
.draft-pop-action-kbd {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
}
.theme-popover-foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
  padding-top: var(--sp-2);
  border-top: 1px solid var(--border);
}
.theme-foot-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  height: 32px;
  padding: 0 var(--sp-3);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-12);
  cursor: pointer;
  transition: var(--t-quick);
}
.theme-foot-btn:hover { background: var(--surface); }
.theme-foot-btn.active { background: var(--accent-soft); color: var(--accent); border-color: var(--accent-soft); }
.theme-foot-glyph { font-size: var(--fs-13); line-height: 1; color: var(--text-subtle); }
.theme-foot-btn.active .theme-foot-glyph { color: var(--accent); }
.theme-foot-label { letter-spacing: var(--ls-tight); }
/* popover-menu 与其内部 .menu-* 样式见 OverflowMenu.vue */

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
