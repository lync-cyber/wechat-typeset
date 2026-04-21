<script setup lang="ts">
/**
 * 组件库抽屉（合并版：主题模板 + 内置预设 + 我的组件）
 *
 * - Tab 0「主题模板」：读取 props.theme.templates，用当前主题色做色块 + 名称缩略卡
 * - Tab 1..N：内置 admonition / quote / compare / steps / divider / sectionTitle
 * - Tab N+1「我的组件」：用户自创
 * - 顶部「保存选区」入口：父组件通过 ref 调 openSaveDialog(selectionText) 弹窗
 * - 保存弹窗的校验走 inline error（不用 alert）
 */
import { computed, reactive, ref } from 'vue'
import {
  BUILTIN_COMPONENTS,
  COMPONENT_TABS,
  type ComponentEntry,
  type ComponentKind,
} from '../components-lib'
import {
  createUserComponent,
  deleteUserComponent,
  listUserComponents,
} from '../storage/userComponents'
import type { Theme } from '../themes/types'

const props = defineProps<{ theme: Theme }>()
const emit = defineEmits<{
  (e: 'insert', md: string): void
  (e: 'close'): void
}>()

type TabKind = 'template' | ComponentKind | 'user'

const activeTab = ref<TabKind>('template')
const refreshTick = ref(0)

const userComponents = computed<ComponentEntry[]>(() => {
  void refreshTick.value
  return listUserComponents()
})

const builtinByKind = computed<Record<ComponentKind, ComponentEntry[]>>(() => {
  const bucket: Record<ComponentKind, ComponentEntry[]> = {
    admonition: [],
    quote: [],
    compare: [],
    steps: [],
    divider: [],
    sectionTitle: [],
    // codeBlock 是主题级 variant（每个代码块共享同一骨架），不进组件抽屉；
    // 保留空桶满足 Record 完备性，永远不填充。
    codeBlock: [],
    none: [],
  }
  for (const c of BUILTIN_COMPONENTS) bucket[c.kind].push(c)
  return bucket
})

const themeTemplateList = computed<ComponentEntry[]>(() => {
  const t = props.theme.templates ?? {}
  const defs: Array<{ id: string; name: string; md?: string; hint: string }> = [
    { id: 'cover', name: '封面卡', md: t.cover, hint: '文首封面' },
    { id: 'authorBar', name: '作者栏', md: t.authorBar, hint: '作者+日期' },
    { id: 'tip', name: '小贴士', md: t.tip, hint: 'tip 容器' },
    { id: 'compare', name: '对比两列', md: t.compare, hint: '左右两栏' },
    { id: 'steps', name: '步骤流程', md: t.steps, hint: '分步推进' },
    { id: 'footerCTA', name: '文末引导', md: t.footerCTA, hint: '关注/收藏' },
    { id: 'recommend', name: '推荐阅读', md: t.recommend, hint: '文末链接' },
  ]
  return defs
    .filter((d): d is { id: string; name: string; md: string; hint: string } => !!d.md)
    .map<ComponentEntry>((d) => ({
      source: 'builtin',
      id: `tpl-${d.id}`,
      name: d.name,
      description: d.hint,
      kind: 'none',
      markdownSnippet: d.md,
      thumbnailSvg: themeSwatchSvg(d.id, props.theme),
    }))
})

function themeSwatchSvg(key: string, theme: Theme): string {
  const c = theme.tokens.colors
  const fill = key === 'compare' || key === 'steps' ? c.secondary : c.primary
  const label = key.slice(0, 1).toUpperCase()
  return `<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="73" height="73" rx="6" fill="${c.bg}" stroke="${c.border}" stroke-width="1"/>
<rect x="10" y="14" width="55" height="4" rx="2" fill="${fill}"/>
<rect x="10" y="24" width="42" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.6"/>
<rect x="10" y="31" width="50" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.4"/>
<rect x="10" y="38" width="38" height="2.5" rx="1.25" fill="${c.textMuted}" opacity="0.4"/>
<text x="58" y="62" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="${fill}" opacity="0.7">${label}</text>
</svg>`
}

const currentList = computed<ComponentEntry[]>(() => {
  if (activeTab.value === 'template') return themeTemplateList.value
  if (activeTab.value === 'user') return userComponents.value
  return builtinByKind.value[activeTab.value as ComponentKind]
})

function clickEntry(entry: ComponentEntry) {
  emit('insert', entry.markdownSnippet)
}

function removeUser(id: string, ev: Event) {
  ev.stopPropagation()
  deleteUserComponent(id)
  refreshTick.value += 1
}

// ---------- 保存选区为组件 ----------
const save = reactive({
  open: false,
  name: '',
  description: '',
  source: '',
  error: '' as string,
})

function openSaveDialog(selectionText: string) {
  const text = selectionText.trim()
  if (!text) {
    // 由父组件的 status 弹窗提示，这里兜底
    return
  }
  save.open = true
  save.name = ''
  save.description = ''
  save.source = selectionText
  save.error = ''
}

function cancelSave() {
  save.open = false
  save.error = ''
}

function confirmSave() {
  const name = save.name.trim()
  if (!name) {
    save.error = '组件名不能为空'
    return
  }
  createUserComponent({
    name,
    description: save.description,
    markdownSnippet: ensureTrailingNewline(save.source),
    sourceMarkdown: save.source,
    kind: 'none',
  })
  save.open = false
  save.error = ''
  refreshTick.value += 1
  activeTab.value = 'user'
}

function ensureTrailingNewline(s: string): string {
  return s.endsWith('\n') ? s : s + '\n'
}

defineExpose({ openSaveDialog })
</script>

<template>
  <aside class="palette" aria-label="组件库">
    <header class="palette-head">
      <h3 class="tx-section">插入</h3>
      <button class="btn-text" @click="emit('close')">关闭</button>
    </header>

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

    <div class="body">
      <div v-if="currentList.length === 0" class="empty">
        <template v-if="activeTab === 'template'">
          当前主题「{{ props.theme.name }}」暂无预设模板。切换主题或在下方预设里选择。
        </template>
        <template v-else-if="activeTab === 'user'">
          <div class="empty-title">还没有自创组件</div>
          <div class="empty-hint">
            在编辑器里选中一段 markdown，用更多菜单里的「保存选区为组件」把它存下来。
          </div>
        </template>
        <template v-else>本分类暂无预设</template>
      </div>
      <div v-else class="grid">
        <button
          v-for="entry in currentList"
          :key="entry.id"
          class="cell"
          :title="entry.description"
          @click="clickEntry(entry)"
        >
          <span class="thumb" v-html="entry.thumbnailSvg" />
          <span class="name">{{ entry.name }}</span>
          <button
            v-if="activeTab === 'user'"
            class="cell-del"
            title="删除"
            @click="removeUser(entry.id, $event)"
          >×</button>
        </button>
      </div>
    </div>

    <!-- 保存选区弹窗 -->
    <div v-if="save.open" class="modal-mask" @click.self="cancelSave">
      <div class="modal" role="dialog" aria-label="保存选区为组件">
        <h4 class="modal-title">保存选区为组件</h4>
        <label class="modal-field">
          <span>名称</span>
          <input
            v-model="save.name"
            maxlength="20"
            placeholder="如：我的封面卡"
            :class="{ invalid: !!save.error }"
            @keydown.enter.prevent="confirmSave"
          />
          <span v-if="save.error" class="field-error">{{ save.error }}</span>
        </label>
        <label class="modal-field">
          <span>描述（可选）</span>
          <input v-model="save.description" maxlength="30" placeholder="一句话说明" />
        </label>
        <details class="preview-src">
          <summary>选区预览</summary>
          <pre class="mono">{{ save.source }}</pre>
        </details>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="cancelSave">取消</button>
          <button class="btn btn-primary" @click="confirmSave">保存</button>
        </div>
      </div>
    </div>
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
.palette-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.palette-head h3 { margin: 0; font-size: var(--fs-14); font-weight: var(--fw-semibold); }
.btn-text {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: var(--fs-12);
}
.btn-text:hover { color: var(--text); }

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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-3);
}
.cell {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  gap: 6px;
  padding: 8px 4px 10px;
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
  background: var(--surface);
  cursor: pointer;
  font-size: var(--fs-11);
  color: var(--text);
  text-align: center;
  transition: var(--t-quick);
}
.cell:hover {
  background: var(--accent-soft); border-color: var(--accent);
}
.thumb { width: 75px; height: 75px; display: block; pointer-events: none; }
.thumb :deep(svg) { width: 75px; height: 75px; display: block; }
.name { line-height: 1.3; word-break: break-word; }
.cell-del {
  position: absolute; top: 2px; right: 2px;
  width: 18px; height: 18px;
  border: none;
  background: var(--danger);
  color: var(--accent-on);
  border-radius: var(--radius-pill);
  font-size: var(--fs-13); line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--dur-quick) var(--ease-craft);
}
.cell:hover .cell-del { opacity: 1; }

/* 触摸设备（无 hover）时，删除按钮常驻 */
@media (hover: none) {
  .cell-del { opacity: 1; }
}

/* modal */
.modal-mask {
  position: absolute; inset: 0;
  background: rgba(14, 14, 10, 0.42);
  display: flex; align-items: center; justify-content: center;
  z-index: 10;
}
.modal {
  width: 300px;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: var(--sp-5);
  box-shadow: var(--shadow-modal);
  display: flex; flex-direction: column; gap: var(--sp-3);
}
.modal-title { margin: 0; font-size: var(--fs-14); font-weight: var(--fw-semibold); }
.modal-field {
  display: flex; flex-direction: column; gap: 4px;
  font-size: var(--fs-12); color: var(--text-muted);
}
.modal-field input {
  height: 28px; padding: 0 var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  font: inherit; font-size: var(--fs-13);
  color: var(--text);
  background: var(--surface-raised);
}
.modal-field input:focus { outline: none; border-color: var(--accent); box-shadow: var(--focus-ring); }
.modal-field input.invalid { border-color: var(--danger); }
.field-error {
  color: var(--danger); font-size: var(--fs-11); letter-spacing: var(--ls-wide);
}
.preview-src { font-size: var(--fs-11); color: var(--text-subtle); }
.preview-src pre {
  margin: 6px 0 0;
  max-height: 120px;
  overflow: auto;
  background: var(--surface);
  padding: var(--sp-3);
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
  white-space: pre-wrap; word-break: break-word;
  font-size: var(--fs-11);
  color: var(--text);
}
.modal-actions {
  display: flex; justify-content: flex-end; gap: var(--sp-2);
  margin-top: var(--sp-2);
}
.btn {
  height: 28px; padding: 0 var(--sp-4);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  cursor: pointer; font-family: var(--font-text);
}
.btn-ghost { background: var(--surface-raised); color: var(--text); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--surface); }
.btn-primary { background: var(--accent); color: var(--accent-on); border: 1px solid var(--accent); }
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

/* ---- 移动端适配 ---- */
@media (max-width: 767px) {
  /* 关闭按钮达到 44px 触摸目标 */
  .btn-text { min-height: 44px; padding: 0 var(--sp-3); display: inline-flex; align-items: center; }
  /* 分类 tab 改为横向滚动，单行 */
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
  /* 保存选区弹窗：fixed 居中、宽度响应 */
  .modal-mask { position: fixed; z-index: 60; }
  .modal { width: min(320px, calc(100vw - 32px)); }
  .modal-field input { height: 40px; font-size: 16px; }
  /* 删除按钮可触 */
  .cell-del { width: 28px; height: 28px; font-size: var(--fs-15); }
}
</style>
