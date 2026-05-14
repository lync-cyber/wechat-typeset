<script setup lang="ts">
/**
 * Toolbar "更多操作" popover 内容体
 *
 * 从 Toolbar.vue 抽出：原本一段约 70 行 inline，含 4 类菜单项（drawer 切换 /
 * 一次性 action / outlink 分段控件 / 危险动作）。抽出后 Toolbar 模板只剩
 * 入口按钮 + popover 容器，菜单本体由本组件渲染。
 *
 * 与父协作：每次业务事件后额外 emit 'close'，让父统一关闭 popover——避免每
 * 个 @click 都写 `; overflowOpen = false` 样板。
 */
import type { ToolbarAction, ToolbarToggleTarget } from './toolbar-types'

defineProps<{
  drawer: {
    drafts: boolean
    components: boolean
    customizer: boolean
    checklist: boolean
    personaStudio: boolean
  }
  modKey: string
}>()

const emit = defineEmits<{
  (e: 'toggle', target: ToolbarToggleTarget): void
  (e: 'action', cmd: ToolbarAction): void
  (e: 'close'): void
}>()

function fireToggle(t: ToolbarToggleTarget) {
  emit('toggle', t)
  emit('close')
}
function fireAction(cmd: ToolbarAction) {
  emit('action', cmd)
  emit('close')
}
</script>

<template>
  <!--
    四段式菜单（命令面板 / 快捷键与帮助 / 主题编辑器 / 外链处理 已迁出，不再重复）：
      1. 抽屉：草稿 / 组件 / 配色 / 发文清单（主题编辑器走主题 popover 底部入口）
      2. 内容操作：载入示例 / 保存选区 / 中文修复
      3. 导出：HTML / Markdown / 长图 / 分享链接（外链处理已前置到"一键复制"split-button）
      4. 危险：清空正文（actions.handleClear 已走 UndoToast 可撤销）
  -->
  <div class="popover popover-menu">
    <div class="menu-section-head">视图</div>
    <button class="menu-item" @click="fireToggle('drafts')">
      <span>{{ drawer.drafts ? '关闭草稿列表' : '草稿列表' }}</span>
    </button>
    <button class="menu-item" @click="fireToggle('components')">
      <span>{{ drawer.components ? '关闭组件库' : '插入组件' }}</span>
    </button>
    <button class="menu-item" @click="fireToggle('customizer')">
      <span>{{ drawer.customizer ? '关闭自定义配色' : '自定义配色' }}</span>
    </button>
    <button class="menu-item" @click="fireToggle('checklist')">
      <span>{{ drawer.checklist ? '关闭发文清单' : '发文清单' }}</span>
    </button>
    <div class="menu-sep" />
    <div class="menu-section-head">内容操作</div>
    <button class="menu-item" @click="fireAction('loadSample')">
      <span>载入当前主题示例</span>
    </button>
    <button class="menu-item" @click="fireAction('saveSelection')">
      <span>保存选区为组件</span>
    </button>
    <button class="menu-item" @click="fireAction('fixZhTypo')">
      <span>一键修复中文排版</span>
    </button>
    <div class="menu-sep" />
    <div class="menu-section-head">导出</div>
    <button class="menu-item" @click="fireAction('exportHtml')">
      <span>导出 HTML</span><span class="menu-kbd">{{ modKey }}⇧H</span>
    </button>
    <button class="menu-item" @click="fireAction('exportMd')">
      <span>导出 Markdown</span><span class="menu-kbd">{{ modKey }}⇧M</span>
    </button>
    <button class="menu-item" @click="fireAction('exportImage')">
      <span>导出全文长图</span>
    </button>
    <button class="menu-item" @click="fireAction('exportCoverHorizontal')">
      <span>导出封面 · 横版 900×383</span>
    </button>
    <button class="menu-item" @click="fireAction('exportCoverSquare')">
      <span>导出封面 · 方版 900×900</span>
    </button>
    <button class="menu-item" @click="fireAction('copyShareLink')">
      <span>复制分享链接</span>
    </button>
    <div class="menu-sep" />
    <button class="menu-item danger" @click="fireAction('clear')">
      <span>清空正文</span>
    </button>
  </div>
</template>

<style scoped>
.popover {
  position: absolute;
  top: calc(100% + 6px);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-lift);
  z-index: 40;
  min-width: 220px;
  max-width: calc(100vw - 16px);
}
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

.menu-section {
  padding: var(--sp-2) var(--sp-3) var(--sp-3);
}
.menu-section-head {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  margin-bottom: var(--sp-1);
  /* 顶层使用：与 .menu-item padding-left 视觉对齐（sp-3） */
  padding: var(--sp-2) var(--sp-3) var(--sp-1);
}
/* 嵌套于 .menu-section 内的标题保持紧凑（原 OUTLINK 段落用） */
.menu-section .menu-section-head {
  padding: 0 var(--sp-1);
  margin-bottom: var(--sp-2);
  text-transform: none;
}
.menu-segment {
  display: inline-flex;
  gap: 1px;
  padding: 2px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
}
.menu-segment-btn {
  flex: 1 1 auto;
  min-width: 48px;
  padding: var(--sp-1) var(--sp-3);
  font-size: var(--fs-12);
  font-family: var(--font-text);
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-1);
  cursor: pointer;
  transition: var(--t-quick);
}
.menu-segment-btn:hover { color: var(--text); }
.menu-segment-btn.active {
  background: var(--surface-raised);
  color: var(--text);
  box-shadow: var(--shadow-inset);
}
</style>
