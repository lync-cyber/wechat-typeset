<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  createDraft,
  exportDraftsJSON,
  importDraftsJSONDetailed,
  listAllTags,
  listDrafts,
  readDraft,
  searchDrafts,
  updateDraft,
  type DraftMeta,
} from '../storage/drafts'
import { formatBytes, getStorageStat, type StorageStat } from '../storage/quota'

const props = defineProps<{ activeId: string | null }>()
const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'close'): void
  (e: 'requestDelete', id: string, title: string): void
  (e: 'refresh'): void
}>()

const refreshTick = ref(0)
const query = ref('')
const renamingId = ref<string | null>(null)
const renameValue = ref('')
const renameInputRef = ref<HTMLInputElement | null>(null)
const importFeedback = ref<string | null>(null)

watch(
  () => props.activeId,
  () => {
    refreshTick.value += 1
  },
)

const drafts = computed<DraftMeta[]>(() => {
  void refreshTick.value
  return listDrafts()
})

/**
 * 列表过滤走 storage.searchDrafts —— 扫标题 + 正文 + tag。
 * query 里写 `#技术` 当 tag 过滤；叠加 tagFilter.value 的显式选择取交集。
 */
const tagFilter = ref<string | null>(null)
const filtered = computed<DraftMeta[]>(() => {
  void refreshTick.value
  const q = query.value.trim()
  const tags = tagFilter.value ? [tagFilter.value] : undefined
  if (!q && !tags) return drafts.value
  return searchDrafts({ query: q, tags })
})

const knownTags = computed<string[]>(() => {
  void refreshTick.value
  return listAllTags()
})

/**
 * 存储占用走 navigator.storage.estimate() 异步查；不可用时 fallback 到 LS 估算。
 * 为什么挪到 ref：配额查询是 async，不能塞进 computed
 */
const storageStat = ref<StorageStat>({
  supported: false,
  used: 0,
  quota: 5 * 1024 * 1024,
  pct: 0,
  warn: false,
})
async function refreshStorageStat() {
  storageStat.value = await getStorageStat()
}
const storagePct = computed(() => Math.min(100, Math.round(storageStat.value.pct * 100)))

function refresh() {
  refreshTick.value += 1
  void refreshStorageStat()
  emit('refresh')
}

onMounted(() => {
  void refreshStorageStat()
})

function fmt(ts: number): string {
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

function bodySummary(id: string): string {
  const body = readDraft(id)?.body ?? ''
  const first = body
    .split('\n')
    .map((l) => l.replace(/^#+\s*/, '').replace(/^\s*[-*>:]+\s*/, '').trim())
    .find((l) => l.length > 0 && !l.startsWith(':::'))
  if (!first) return '（空白草稿）'
  return first.length > 60 ? first.slice(0, 60) + '…' : first
}

function newDraft() {
  const created = createDraft({ title: '新草稿', body: '# 新草稿\n' })
  refresh()
  emit('select', created.id)
}

function startRename(d: DraftMeta, ev: Event) {
  ev.stopPropagation()
  renamingId.value = d.id
  renameValue.value = d.title || ''
  void nextTick(() => renameInputRef.value?.focus())
}

function commitRename() {
  if (!renamingId.value) return
  const title = renameValue.value.trim() || '未命名草稿'
  updateDraft(renamingId.value, { title })
  renamingId.value = null
  refresh()
}

function cancelRename() {
  renamingId.value = null
}

function requestDelete(d: DraftMeta, ev: Event) {
  ev.stopPropagation()
  emit('requestDelete', d.id, d.title || '未命名草稿')
}

/**
 * 编辑草稿 tag —— 走原生 prompt() 最省力：MVP 里用户不会频繁打 tag，
 * 以后可改成 chip 编辑器。支持逗号 / 空格混合分隔，去重、去首尾空白。
 */
function editTags(d: DraftMeta, ev: Event) {
  ev.stopPropagation()
  const current = (d.tags ?? []).join(', ')
  const next = typeof window !== 'undefined' ? window.prompt(`标签（用逗号或空格分隔，留空删除全部）`, current) : null
  if (next === null) return // 用户取消
  const list = Array.from(new Set(
    next
      .split(/[,，\s]+/g)
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
  ))
  updateDraft(d.id, { tags: list })
  refresh()
}

function toggleTagFilter(tag: string) {
  tagFilter.value = tagFilter.value === tag ? null : tag
}

function download(filename: string, text: string, mime = 'application/json') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function exportAll() {
  download(`wechat-typeset-drafts-${Date.now()}.json`, exportDraftsJSON())
}

function onImport(ev: Event) {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const r = importDraftsJSONDetailed(String(reader.result ?? ''))
    importFeedback.value = `导入 ${r.added} 篇（跳过 ${r.skipped}，非法 ${r.invalid}）`
    refresh()
    input.value = ''
    setTimeout(() => (importFeedback.value = null), 3200)
  }
  reader.readAsText(file)
}

defineExpose({ refresh })
</script>

<template>
  <aside class="drawer" aria-label="草稿列表">
    <header class="drawer-head">
      <h3 class="tx-section">草稿</h3>
      <button class="btn-text" @click="emit('close')" aria-label="关闭抽屉">关闭</button>
    </header>

    <div class="head-tools">
      <button class="btn btn-primary" @click="newDraft">+ 新建</button>
      <div class="search">
        <span class="search-icon">⌕</span>
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="搜索标题 / 正文 / #标签"
          aria-label="搜索草稿"
        />
      </div>
    </div>

    <div class="io-row">
      <button class="btn btn-ghost" @click="exportAll">导出 JSON</button>
      <label class="btn btn-ghost">
        导入 JSON
        <input type="file" accept="application/json" hidden @change="onImport" />
      </label>
      <span v-if="importFeedback" class="io-feedback">{{ importFeedback }}</span>
    </div>

    <div v-if="knownTags.length > 0" class="tagbar" aria-label="标签过滤">
      <button
        v-for="t in knownTags"
        :key="t"
        class="tag-pill"
        :class="{ active: tagFilter === t }"
        :aria-pressed="tagFilter === t"
        @click="toggleTagFilter(t)"
      >#{{ t }}</button>
    </div>

    <div v-if="storageStat.warn" class="quota-warn" role="status">
      <span class="quota-warn-icon" aria-hidden="true">!</span>
      <span class="quota-warn-text">
        存储占用 {{ storagePct }}%，建议导出 JSON 并删除不再需要的草稿
      </span>
    </div>

    <ul class="list">
      <li
        v-for="d in filtered"
        :key="d.id"
        class="item"
        :class="{ active: d.id === props.activeId }"
        @click="emit('select', d.id)"
      >
        <div class="item-main">
          <div v-if="renamingId === d.id" class="rename-row" @click.stop>
            <input
              ref="renameInputRef"
              v-model="renameValue"
              class="rename-input"
              maxlength="48"
              @keydown.enter.prevent="commitRename"
              @keydown.esc.prevent="cancelRename"
              @blur="commitRename"
            />
          </div>
          <div
            v-else
            class="title"
            :title="`双击重命名 · ${d.title}`"
            @dblclick.stop="startRename(d, $event)"
          >{{ d.title || '未命名' }}</div>
          <div class="summary">{{ bodySummary(d.id) }}</div>
          <div v-if="d.tags && d.tags.length > 0" class="tags">
            <span
              v-for="t in d.tags"
              :key="t"
              class="tag-chip"
              @click.stop="toggleTagFilter(t)"
            >#{{ t }}</span>
          </div>
          <div class="meta mono">
            <span class="meta-theme">{{ d.themeId }}</span>
            <span class="dot">·</span>
            <span>{{ fmt(d.updatedAt) }}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="icon-btn" title="编辑标签" @click="editTags(d, $event)">#</button>
          <button class="icon-btn" title="重命名" @click="startRename(d, $event)">✎</button>
          <button class="icon-btn danger" title="删除" @click="requestDelete(d, $event)">×</button>
        </div>
      </li>
      <li v-if="drafts.length === 0" class="empty">
        <div class="empty-body">
          <div class="empty-title">还没有草稿</div>
          <div class="empty-hint">新建一篇开始，或者把旧 JSON 导进来继续写。</div>
          <button class="btn btn-primary" @click="newDraft">新建第一篇</button>
        </div>
      </li>
      <li v-else-if="filtered.length === 0" class="empty">
        <div class="empty-body">
          <div class="empty-title mono">没有匹配 "{{ query }}" 的草稿</div>
        </div>
      </li>
    </ul>

    <footer class="drawer-foot mono">
      <div class="cap-bar">
        <div class="cap-fill" :style="{ width: storagePct + '%' }" />
      </div>
      <div class="cap-text">
        <span>{{ drafts.length }} 篇</span>
        <span class="dot">·</span>
        <span>
          {{ storagePct }}% · {{ formatBytes(storageStat.used) }} / {{ formatBytes(storageStat.quota) }}
          <span v-if="!storageStat.supported" class="dot" title="浏览器未暴露 storage.estimate API，此为 localStorage 估算值">估算</span>
        </span>
      </div>
    </footer>
  </aside>
</template>

<style scoped>
.drawer {
  width: var(--drawer-w-sm);
  height: 100%;
  display: flex; flex-direction: column;
  background: var(--surface-raised);
  border-right: 1px solid var(--border);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  color: var(--text);
}
.drawer-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.drawer-head h3 { margin: 0; font-size: var(--fs-14); font-weight: var(--fw-semibold); }

.btn-text {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: var(--fs-12);
}
.btn-text:hover { color: var(--text); }

.head-tools {
  display: flex; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
}
.search {
  flex: 1 1 auto;
  display: flex; align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: 0 var(--sp-3);
}
.search:focus-within { border-color: var(--accent); box-shadow: var(--focus-ring); }
.search-icon { color: var(--text-subtle); font-size: var(--fs-13); margin-right: 4px; }
.search-input {
  flex: 1 1 auto;
  border: none;
  background: transparent;
  outline: none;
  font: inherit;
  height: 26px;
  color: var(--text);
}

.io-row {
  display: flex; gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--border);
  align-items: center;
  flex-wrap: wrap;
}
.io-feedback {
  font-family: var(--font-mono);
  font-size: var(--fs-11);
  color: var(--success);
  letter-spacing: var(--ls-wide);
}

.btn {
  height: 26px; padding: 0 var(--sp-3);
  font-size: var(--fs-12); border-radius: var(--radius-2);
  cursor: pointer; font-family: var(--font-text);
  white-space: nowrap;
  flex: 0 0 auto;
}
.btn-primary {
  background: var(--accent); color: var(--accent-on);
  border: 1px solid var(--accent);
}
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.btn-ghost {
  background: var(--surface-raised);
  color: var(--text);
  border: 1px solid var(--border);
}
.btn-ghost:hover { background: var(--surface); }

.tagbar {
  display: flex; flex-wrap: wrap; gap: 4px;
  padding: var(--sp-2) var(--sp-4);
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.tag-pill {
  padding: 2px 8px;
  font-size: var(--fs-11);
  font-family: var(--font-mono);
  color: var(--text-muted);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: var(--t-quick);
  letter-spacing: var(--ls-wide);
}
.tag-pill:hover { color: var(--text); border-color: var(--accent); }
.tag-pill.active {
  color: var(--accent-on);
  background: var(--accent);
  border-color: var(--accent);
}

.quota-warn {
  display: flex; align-items: center; gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  background: var(--warn-soft);
  border-bottom: 1px solid var(--border);
  font-size: var(--fs-11);
  color: var(--warn);
  line-height: var(--lh-tight);
}
.quota-warn-icon {
  width: 16px; height: 16px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--amber-500);
  color: white;
  border-radius: 50%;
  font-weight: var(--fw-bold);
  font-size: var(--fs-11);
  flex: 0 0 auto;
}

.list {
  list-style: none; margin: 0; padding: var(--sp-2) 0;
  overflow-y: auto; flex: 1 1 auto;
}

.tags {
  display: flex; flex-wrap: wrap; gap: 3px;
  margin-top: 3px;
}
.tag-chip {
  font-size: var(--fs-11);
  font-family: var(--font-mono);
  color: var(--text-subtle);
  background: var(--surface);
  padding: 1px 6px;
  border-radius: var(--radius-pill);
  letter-spacing: var(--ls-wide);
  cursor: pointer;
  transition: var(--t-quick);
}
.tag-chip:hover { color: var(--accent); background: var(--accent-soft); }
.item {
  position: relative;
  display: flex; align-items: flex-start; gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  cursor: pointer;
  border-left: 2px solid transparent;
}
.item:hover { background: var(--surface); }
.item:hover .item-actions { opacity: 1; }
/* 触摸设备上无 hover —— 操作按钮常驻显示 */
@media (hover: none) {
  .item-actions { opacity: 1; }
}
.item.active {
  background: var(--accent-soft);
  border-left-color: var(--accent);
}
.item-main { flex: 1 1 auto; min-width: 0; }
.title {
  font-size: var(--fs-13);
  font-weight: var(--fw-semibold);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.summary {
  font-size: var(--fs-12);
  color: var(--text-muted);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  margin-top: 2px;
}
.meta {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  margin-top: 4px;
  font-feature-settings: var(--font-feat-num);
  letter-spacing: var(--ls-wide);
}
.meta-theme { text-transform: lowercase; }
.dot { opacity: .5; margin: 0 4px; }

.item-actions {
  display: flex; gap: 2px;
  opacity: 0;
  transition: var(--t-quick);
}
.icon-btn {
  width: 22px; height: 22px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-1);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: var(--fs-13);
}
.icon-btn:hover { background: var(--surface-raised); border-color: var(--border); color: var(--text); }
.icon-btn.danger:hover { color: var(--danger); border-color: var(--danger); background: var(--danger-soft); }

.rename-row { display: flex; }
.rename-input {
  width: 100%; height: 22px; padding: 0 6px;
  font: inherit; font-size: var(--fs-13); font-weight: var(--fw-semibold);
  border: 1px solid var(--accent);
  border-radius: var(--radius-1);
  background: var(--surface-raised);
  color: var(--text);
  outline: none;
}

.empty {
  list-style: none;
  padding: var(--sp-6) var(--sp-5);
}
.empty-body {
  text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-3);
}
.empty-title { color: var(--text); font-size: var(--fs-13); font-weight: var(--fw-medium); }
.empty-hint { color: var(--text-muted); font-size: var(--fs-12); line-height: var(--lh-normal); max-width: 240px; }

.drawer-foot {
  flex: 0 0 auto;
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--border);
  background: var(--surface);
  font-size: var(--fs-11);
  color: var(--text-subtle);
  letter-spacing: var(--ls-wide);
}
.cap-bar {
  height: 2px; background: var(--border); border-radius: var(--radius-pill); overflow: hidden;
  margin-bottom: 4px;
}
.cap-fill {
  height: 100%; background: var(--accent); transition: var(--t-quick);
}
.cap-text { display: flex; gap: 4px; align-items: baseline; }

/* ---- 移动端适配 ---- */
@media (max-width: 767px) {
  /* 关闭按钮和操作按钮达到 44px 触摸目标 */
  .btn-text { min-height: 44px; padding: 0 var(--sp-3); display: inline-flex; align-items: center; }
  .icon-btn { width: 40px; height: 40px; font-size: var(--fs-15); }
  .btn { height: 40px; padding: 0 var(--sp-4); font-size: 16px; }
  .search-input { height: 40px; font-size: 16px; }
  .rename-input { height: 36px; font-size: 16px; }
  /* head-tools 两行堆叠：新建在第一行，搜索单独一行 */
  .head-tools { flex-wrap: wrap; }
  .search { flex: 1 1 100%; order: 2; }
  /* io-row 同理换行更容易阅读 */
  .io-row { gap: var(--sp-3); }
  .io-row .btn { flex: 1 1 calc(50% - var(--sp-3)); justify-content: center; }
  .io-feedback { flex: 1 1 100%; text-align: center; }
  /* 草稿项：按钮常驻，留出右侧可触区域 */
  .item { padding: var(--sp-4); }
  .item-actions { gap: 4px; }
}
</style>
