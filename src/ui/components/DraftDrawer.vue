<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { DraftMeta } from '../../infra/storage/drafts'
import type { ArticleEntry } from '../../infra/fs/library'
import { useDraftManager } from '../composables/useDraftManager'
import { downloadBlob } from '../../infra/exporters/exportFile'

const props = defineProps<{
  activeId: string | null
  draftIndexTick?: number
  librarySupported?: boolean
  libraryName?: string
  libraryPermitted?: boolean
  articles?: ArticleEntry[]
  activeArticle?: string
  libraryBusy?: boolean
  libraryError?: string
}>()
const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'close'): void
  (e: 'requestDelete', id: string, title: string): void
  (e: 'refresh'): void
  (e: 'connectLibrary'): void
  (e: 'chooseLibrary'): void
  (e: 'selectArticle', article: ArticleEntry): void
  (e: 'createArticle', title: string): void
}>()

const mgr = useDraftManager()
const drafts = mgr.drafts
const knownTags = mgr.knownTags
const storageStat = mgr.storageStat
const storagePct = mgr.storagePct
const formatBytes = mgr.formatBytes
const hasLibrary = computed(() => props.librarySupported && props.libraryPermitted)
const browserOpen = ref(!props.libraryPermitted)
const articleQuery = ref('')
const newArticleTitle = ref('')
const creatingArticle = ref(false)
const articleTitleInput = ref<HTMLInputElement | null>(null)
const folderMenu = ref<HTMLDetailsElement | null>(null)
const filteredArticles = computed(() => (props.articles ?? []).filter((article) =>
  article.title.toLocaleLowerCase().includes(articleQuery.value.trim().toLocaleLowerCase()),
))
const query = ref('')
const renamingId = ref<string | null>(null)
const renameValue = ref('')
const renameInputRef = ref<HTMLInputElement | null>(null)
const importFeedback = ref<string | null>(null)
const tagFilter = ref<string | null>(null)
const editingTagsFor = ref<string | null>(null)
const editingTagDraft = ref<string[]>([])
const tagInputValue = ref('')
const tagInputRef = ref<HTMLInputElement | null>(null)

watch(() => props.draftIndexTick, () => mgr.refresh())
watch(() => props.libraryPermitted, (permitted) => { browserOpen.value = !permitted })
watch(() => props.activeId, (id) => {
  mgr.refresh()
  if (id) browserOpen.value = true
})
const filtered = computed<DraftMeta[]>(() => {
  const text = query.value.trim()
  const tags = tagFilter.value ? [tagFilter.value] : undefined
  return !text && !tags ? mgr.drafts.value : mgr.search({ query: text, tags })
})

function refresh() { mgr.refresh(); emit('refresh') }
function selectFolderAction(action: 'chooseLibrary' | 'connectLibrary') {
  if (folderMenu.value) folderMenu.value.open = false
  if (action === 'chooseLibrary') emit('chooseLibrary')
  else emit('connectLibrary')
}
function startArticle() {
  creatingArticle.value = true
  void nextTick(() => articleTitleInput.value?.focus())
}
function createFileArticle() {
  if (!newArticleTitle.value.trim() || props.libraryBusy) return
  emit('createArticle', newArticleTitle.value.trim())
  newArticleTitle.value = ''
  creatingArticle.value = false
}
function dateLabel(value: string, timestamp: number) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10).replaceAll('-', '.')
  const date = new Date(timestamp)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}
function newDraft() {
  if (props.libraryBusy) return
  const created = mgr.create({ title: '新草稿', body: '# 新草稿\n' })
  emit('select', created.id)
}
function selectDraft(id: string) { emit('select', id) }
function closeRowMenu(event: Event) {
  const details = (event.currentTarget as HTMLElement).closest('details')
  if (details) details.open = false
}
function startRename(draft: DraftMeta, event: Event) {
  closeRowMenu(event)
  renamingId.value = draft.id
  renameValue.value = draft.title
  void nextTick(() => { renameInputRef.value?.focus(); renameInputRef.value?.select() })
}
function commitRename() {
  if (!renamingId.value) return
  mgr.update(renamingId.value, { title: renameValue.value.trim() || '未命名草稿' })
  renamingId.value = null
  emit('refresh')
}
function requestDelete(draft: DraftMeta, event: Event) {
  closeRowMenu(event)
  emit('requestDelete', draft.id, draft.title || '未命名草稿')
}
function startEditTags(draft: DraftMeta, event: Event) {
  closeRowMenu(event)
  editingTagsFor.value = draft.id
  editingTagDraft.value = [...(draft.tags ?? [])]
  tagInputValue.value = ''
  void nextTick(() => tagInputRef.value?.focus())
}
function flushTagInput() {
  for (const tag of tagInputValue.value.split(/[,，\s]+/g).filter(Boolean)) {
    if (!editingTagDraft.value.includes(tag)) editingTagDraft.value.push(tag)
  }
  tagInputValue.value = ''
}
function onTagInputKey(event: KeyboardEvent) {
  if ([',', '，', ' '].includes(event.key)) { event.preventDefault(); flushTagInput() }
  if (event.key === 'Backspace' && !tagInputValue.value) { event.preventDefault(); editingTagDraft.value.pop() }
}
function commitTags() {
  if (!editingTagsFor.value) return
  flushTagInput()
  mgr.update(editingTagsFor.value, { tags: [...editingTagDraft.value] })
  editingTagsFor.value = null
  emit('refresh')
}
function toggleTagFilter(tag: string) { tagFilter.value = tagFilter.value === tag ? null : tag }
function exportAll() { downloadBlob(`wechat-typeset-drafts-${Date.now()}.json`, mgr.exportJSON(), 'application/json') }
function onImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const result = mgr.importJSON(String(reader.result ?? ''))
    importFeedback.value = `导入 ${result.added} 篇，跳过 ${result.skipped} 篇，无效 ${result.invalid} 篇`
    input.value = ''
    emit('refresh')
  }
  reader.onerror = () => { importFeedback.value = '文件读取失败，请重新选择。'; input.value = '' }
  reader.readAsText(file)
}
defineExpose({ refresh })
</script>

<template>
  <aside class="drawer" :class="{ 'only-browser': !hasLibrary }" aria-label="文章库">
    <div class="sidebar-brand">
      <svg class="brand-mark" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 5 5 5M3 21l4.5-1 12-12a2.12 2.12 0 0 0-3-3l-12 12L3 21Z" /></svg>
      <div><strong>wechat-typeset</strong><span>本地文章与排版工具</span></div>
      <button class="sidebar-close" type="button" aria-label="关闭文章库" @click="emit('close')">关闭</button>
    </div>

    <section v-if="librarySupported" class="file-library" :class="{ connected: hasLibrary }" aria-label="文件夹文章库">
      <div class="library-heading">
        <svg class="heading-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h6l2 2h10v12H3V6Z" /></svg>
        <h2 :title="libraryName">{{ libraryName || '我的文章库' }}</h2>
        <details ref="folderMenu" class="folder-menu" @keydown.esc.prevent.stop="folderMenu && (folderMenu.open = false)">
          <summary aria-label="文章库操作" title="文章库操作"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
          <div class="folder-menu-content">
            <button type="button" :disabled="libraryBusy" @click="selectFolderAction('connectLibrary')">{{ libraryPermitted ? '刷新文章列表' : libraryName ? '恢复文件夹访问' : '打开文件夹' }}</button>
            <button v-if="libraryName" type="button" :disabled="libraryBusy" @click="selectFolderAction('chooseLibrary')">更换文件夹</button>
          </div>
        </details>
      </div>

      <template v-if="hasLibrary">
        <div class="library-tools">
        <label class="search-field">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 5 5" /></svg>
          <input v-model="articleQuery" type="search" placeholder="搜索文章" aria-label="搜索文件夹文章" />
        </label>
        <button class="icon-button" type="button" aria-label="新建文章" title="新建文章" :disabled="libraryBusy || creatingArticle" @click="startArticle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        </div>
        <form v-if="creatingArticle" class="new-article-form" @submit.prevent="createFileArticle">
          <input ref="articleTitleInput" v-model="newArticleTitle" aria-label="新文章标题" placeholder="写下文章标题" maxlength="120" :disabled="libraryBusy" @keydown.esc.prevent="creatingArticle = false" />
          <button type="submit" class="create-confirm" aria-label="创建文章" title="创建文章" :disabled="libraryBusy || !newArticleTitle.trim()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5" /></svg></button>
          <button type="button" class="create-cancel" aria-label="取消新建" title="取消" @click="creatingArticle = false"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12" /></svg></button>
        </form>
        <ul class="article-list" :aria-busy="libraryBusy">
          <li v-for="article in filteredArticles" :key="article.name">
            <button class="article-item" type="button" :class="{ active: article.name === activeArticle }" :aria-current="article.name === activeArticle ? 'page' : undefined" :disabled="libraryBusy" :title="article.title" @click="emit('selectArticle', article)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>
              <span class="article-copy"><span class="article-title">{{ article.title }}</span><span class="article-date">{{ dateLabel(article.date, article.lastModified) }}</span></span>
            </button>
          </li>
          <li v-if="!filteredArticles.length" class="empty-message">{{ libraryBusy ? '正在读取文章…' : articleQuery ? '没有匹配的文章' : '还没有文章，开始写第一篇。' }}</li>
        </ul>
      </template>
      <div v-else class="library-empty-state">
        <p>{{ libraryName ? '恢复文件夹访问，接着写。' : '从一个文件夹开始，文章与图片都在本机。' }}</p>
        <button class="connect-button" type="button" :disabled="libraryBusy" @click="emit('connectLibrary')"><span>{{ libraryBusy ? '正在连接…' : libraryName ? '恢复访问' : '打开文章文件夹' }}</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
      </div>
      <p v-if="libraryError" class="library-error" role="alert">{{ libraryError }}</p>
    </section>

    <section class="browser-library" :class="{ expanded: browserOpen }" aria-label="浏览器草稿">
      <button class="browser-heading" type="button" :aria-expanded="browserOpen" aria-controls="browser-drafts-panel" @click="browserOpen = !browserOpen">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h6l2 2h10v12H3V6Z" /></svg>
        <span>浏览器草稿</span>
        <span class="draft-count">{{ drafts.length }}</span>
        <svg class="section-chevron" :class="{ expanded: browserOpen }" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <div v-show="browserOpen" id="browser-drafts-panel" class="browser-panel">
        <div class="library-tools">
          <label class="search-field browser-search"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 5 5" /></svg><input v-model="query" type="search" placeholder="搜索草稿 / #标签" aria-label="搜索浏览器草稿" /></label>
          <button class="icon-button" type="button" aria-label="新建浏览器草稿" title="新建浏览器草稿" :disabled="libraryBusy" @click="newDraft"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></button>
        </div>
        <div v-if="knownTags.length" class="tag-filters" aria-label="按标签筛选草稿">
          <button v-for="tag in knownTags" :key="tag" type="button" :class="{ selected: tagFilter === tag }" :aria-pressed="tagFilter === tag" @click="toggleTagFilter(tag)">#{{ tag }}</button>
        </div>
        <ul class="browser-list">
          <li v-for="draft in filtered" :key="draft.id" class="browser-item" :class="{ active: draft.id === activeId }">
            <div class="browser-item-main">
              <svg class="draft-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>
              <input v-if="renamingId === draft.id" :ref="(el) => renameInputRef = el as HTMLInputElement | null" v-model="renameValue" class="rename-input" aria-label="草稿名称" maxlength="48" @keydown.enter.prevent="commitRename" @keydown.esc.prevent.stop="renamingId = null" @blur="commitRename" />
              <button v-else class="draft-select" type="button" :disabled="libraryBusy" :aria-current="draft.id === activeId ? 'page' : undefined" :title="draft.title || '未命名草稿'" @click="selectDraft(draft.id)" @dblclick="startRename(draft, $event)">
                <span class="article-title">{{ draft.title || '未命名草稿' }}</span><span class="article-date">{{ dateLabel('', draft.updatedAt) }}</span>
              </button>
              <details class="row-menu" @keydown.esc.prevent.stop="closeRowMenu($event)">
                <summary :aria-label="`管理草稿：${draft.title}`" title="管理草稿"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg></summary>
                <div class="row-menu-content"><button type="button" @click="startRename(draft, $event)">重命名</button><button type="button" @click="startEditTags(draft, $event)">编辑标签</button><button type="button" class="danger" @click="requestDelete(draft, $event)">删除草稿</button></div>
              </details>
            </div>
            <div v-if="editingTagsFor === draft.id" class="tag-editor">
              <div class="tag-filters"><button v-for="(tag, index) in editingTagDraft" :key="tag" type="button" :aria-label="`移除标签 ${tag}`" @click="editingTagDraft.splice(index, 1)">#{{ tag }} · 移除</button></div>
              <input :ref="(el) => tagInputRef = el as HTMLInputElement | null" v-model="tagInputValue" aria-label="新标签" placeholder="输入标签，回车添加" @keydown.enter.prevent="flushTagInput" @keydown.esc.prevent="editingTagsFor = null" @keydown="onTagInputKey" />
              <div class="tag-editor-actions"><button class="text-button" type="button" @click="editingTagsFor = null">取消</button><button class="text-button" type="button" @click="commitTags">完成</button></div>
            </div>
            <div v-else-if="draft.tags?.length" class="draft-tags"><button v-for="tag in draft.tags" :key="tag" type="button" @click="toggleTagFilter(tag)">#{{ tag }}</button></div>
          </li>
          <li v-if="!filtered.length" class="empty-message">{{ drafts.length ? '没有匹配的草稿' : '暂时没有浏览器草稿' }}</li>
        </ul>
        <details class="browser-management">
          <summary>管理与备份</summary>
          <div class="backup-actions"><button type="button" @click="exportAll">导出 JSON</button><label>导入 JSON<input type="file" accept="application/json" @change="onImport" /></label></div>
          <p v-if="importFeedback" class="import-feedback" role="status">{{ importFeedback }}</p>
          <p class="storage-summary" :class="{ warning: storageStat.warn }">已用 {{ storagePct }}% · {{ formatBytes(storageStat.used) }} / {{ formatBytes(storageStat.quota) }}{{ !storageStat.supported ? '（估算）' : '' }}</p>
          <p v-if="storageStat.warn" class="storage-summary warning">存储空间不足，建议先导出备份。</p>
        </details>
      </div>
    </section>
    <footer class="sidebar-footer"><span class="local-dot" aria-hidden="true" />仅在本机保存</footer>
  </aside>
</template>

<style scoped>
.drawer { width: 100%; min-width: 0; box-sizing: border-box; height: 100%; min-height: 0; display: flex; flex-direction: column; background: var(--surface); color: var(--text); font-family: var(--font-text); font-size: var(--fs-13); }
button, input, summary { font: inherit; }
button, summary { cursor: pointer; }
button:disabled { opacity: .55; cursor: wait; }
button:focus-visible, summary:focus-visible, input:focus-visible, .backup-actions label:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
svg { flex: 0 0 auto; color: var(--text-muted); }
.sidebar-brand { box-sizing: border-box; display: flex; align-items: center; gap: 9px; min-height: 84px; padding: 18px 16px 15px; flex: 0 0 auto; }
.sidebar-brand .brand-mark { color: var(--accent); flex: 0 0 25px; }
.sidebar-brand > div { min-width: 0; }
.sidebar-brand strong { display: block; font-family: var(--font-text); font-size: 17px; font-weight: var(--fw-bold); letter-spacing: -.045em; color: var(--text); white-space: nowrap; }
.sidebar-brand span { display: block; margin-top: 5px; font-size: var(--fs-11); color: var(--text-subtle); }
.sidebar-close { display: none; flex: 0 0 auto; margin-left: auto; padding: 5px; border: 0; background: transparent; color: var(--text-muted); font-size: var(--fs-12); }
.file-library { padding: 8px 14px 14px; display: flex; flex-direction: column; gap: 10px; min-height: 0; flex: 0 0 auto; }
.file-library.connected { flex: 1 1 auto; }
.library-heading { display: flex; align-items: center; gap: 9px; min-height: 32px; padding: 0 3px; flex: 0 0 auto; }
.library-heading .heading-icon, .browser-heading > svg:first-child { width: 16px; height: 16px; color: var(--text); }
.library-heading h2 { margin: 0; font-size: var(--fs-13); font-weight: var(--fw-semibold); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
.folder-menu { position: relative; }
.folder-menu summary, .row-menu summary { list-style: none; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; color: var(--text-muted); border-radius: var(--radius-1); }
summary::-webkit-details-marker { display: none; }
.folder-menu summary:hover, .row-menu summary:hover { background: var(--surface-alt); }
.folder-menu-content, .row-menu-content { position: absolute; top: calc(100% + 4px); right: 0; z-index: 40; width: 150px; padding: 5px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); box-shadow: var(--shadow-lift); }
.folder-menu-content button, .row-menu-content button { width: 100%; text-align: left; padding: 9px 10px; border: 0; border-radius: var(--radius-1); background: transparent; color: var(--text); font-size: var(--fs-12); }
.folder-menu-content button:hover, .row-menu-content button:hover { background: var(--surface); }
.library-tools { display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.search-field { min-width: 0; display: flex; align-items: center; gap: 7px; min-height: 32px; padding: 0 8px; border: 1px solid var(--border); border-radius: var(--radius-2); color: var(--text-muted); background: var(--surface-raised); flex: 1 1 auto; }
.search-field > svg { width: 14px; height: 14px; color: var(--text-subtle); }
.search-field input { width: 100%; min-width: 0; height: 30px; padding: 0; outline: 0; border: 0; background: transparent; color: var(--text); font-size: var(--fs-12); }
.search-field:focus-within { border-color: var(--accent); box-shadow: var(--focus-ring); }
input::placeholder { color: var(--text-subtle); }
.icon-button { display: grid; place-items: center; flex: 0 0 32px; width: 32px; height: 32px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); color: var(--text); }
.icon-button svg { color: inherit; }
.icon-button:hover:not(:disabled) { border-color: var(--border-strong); background: var(--bg); }
.new-article-form { display: grid; grid-template-columns: minmax(0, 1fr) 25px 25px; align-items: center; gap: 2px; flex: 0 0 auto; padding: 4px; border: 1px solid var(--border-strong); border-radius: var(--radius-2); background: var(--surface-raised); }
.new-article-form:focus-within { border-color: var(--accent); }
.new-article-form input { width: 100%; min-width: 0; height: 28px; padding: 0 4px; border: 0; background: transparent; color: var(--text); font-size: var(--fs-12); outline: none; }
.create-confirm, .create-cancel { display: grid; place-items: center; width: 25px; height: 25px; padding: 0; border: 0; border-radius: var(--radius-1); }
.create-confirm { background: var(--accent); color: var(--accent-on); }
.create-confirm svg { color: inherit; }
.create-confirm:hover:not(:disabled) { background: var(--accent-hover); }
.create-cancel { background: transparent; color: var(--text-muted); }
.create-cancel:hover { background: var(--surface); }
.rename-input, .tag-editor input { width: 100%; min-width: 0; padding: 8px; border: 1px solid var(--border); border-radius: var(--radius-1); background: var(--surface-raised); color: var(--text); font-size: var(--fs-12); }
.text-button { padding: 5px 3px; border: 0; background: transparent; color: var(--text-muted); font-size: var(--fs-12); }
.text-button:hover { color: var(--accent); }
.article-list { list-style: none; margin: 0 -4px; padding: 3px 3px 8px; min-height: 0; overflow-y: auto; scrollbar-width: thin; flex: 1 1 auto; }
.article-item { box-sizing: border-box; width: 100%; display: flex; align-items: flex-start; gap: 9px; padding: 10px 9px; margin-bottom: 4px; text-align: left; border: 1px solid transparent; border-left: 2px solid transparent; border-radius: var(--radius-2); background: transparent; color: var(--text); transition: background var(--t-quick), box-shadow var(--t-quick); }
.article-item > svg { width: 16px; height: 16px; margin-top: 2px; }
.article-item:hover, .browser-item:hover { background: var(--bg); }
.article-item.active, .browser-item.active { border-color: var(--border); border-left-color: var(--accent); background: var(--surface-raised); box-shadow: 0 2px 5px color-mix(in srgb, var(--text) 4%, transparent); }
.article-copy { display: flex; flex-direction: column; min-width: 0; gap: 4px; }
.article-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: var(--fs-13); line-height: 1.5; overflow-wrap: anywhere; }
.article-item.active .article-title { font-weight: var(--fw-semibold); }
.article-date { color: var(--text-subtle); font-family: var(--font-mono); font-size: 10px; font-feature-settings: var(--font-feat-num); letter-spacing: -.02em; }
.empty-message, .library-empty-state p { color: var(--text-muted); font-size: var(--fs-12); line-height: 1.8; }
.empty-message { padding: 20px 9px; text-align: left; }
.library-empty-state { padding: 4px 3px 14px; }
.library-empty-state p { margin: 0 0 12px; color: var(--text-subtle); font-size: var(--fs-11); line-height: 1.8; }
.connect-button { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; min-height: 35px; padding: 8px 10px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); color: var(--text); font-size: var(--fs-12); }
.connect-button:hover:not(:disabled) { border-color: var(--border-strong); box-shadow: 0 2px 4px color-mix(in srgb, var(--text) 4%, transparent); }
.library-error { flex: 0 0 auto; max-height: 100px; overflow-y: auto; color: var(--danger); margin: 0; font-size: var(--fs-12); line-height: 1.7; overflow-wrap: anywhere; }
.browser-library { flex: 0 0 auto; min-height: 0; margin: auto 14px 0; border-top: 1px solid var(--border); }
.browser-heading { width: 100%; min-height: 48px; display: flex; align-items: center; gap: 9px; padding: 10px 3px; border: 0; background: transparent; color: var(--text); text-align: left; font-size: var(--fs-12); font-weight: var(--fw-semibold); }
.draft-count { margin-left: auto; font-size: var(--fs-11); color: var(--text-subtle); font-family: var(--font-mono); font-feature-settings: var(--font-feat-num); font-weight: var(--fw-regular); }
.section-chevron { transform: rotate(-90deg); }
.section-chevron.expanded { transform: rotate(0); }
.browser-panel { max-height: min(42vh, 390px); padding: 0 0 12px; overflow-y: auto; scrollbar-width: thin; }
.only-browser .browser-library { margin-top: 0; flex: 1 1 auto; display: flex; flex-direction: column; }
.only-browser .browser-heading { flex: 0 0 auto; }
.only-browser .browser-panel { flex: 1 1 auto; min-height: 0; max-height: none; }
.tag-filters { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0; }
.tag-filters button, .draft-tags button { border: 0; border-radius: var(--radius-1); padding: 3px 6px; background: var(--bg); color: var(--text-muted); font-size: var(--fs-11); line-height: 1.5; }
.tag-filters button:hover, .tag-filters button.selected { color: var(--accent); background: var(--accent-soft); }
.browser-list { list-style: none; padding: 8px 0 0; margin: 0; }
.browser-item { padding: 8px 7px; margin-bottom: 3px; border: 1px solid transparent; border-left: 2px solid transparent; border-radius: var(--radius-2); }
.browser-item-main { display: flex; align-items: flex-start; gap: 7px; }
.draft-icon { margin-top: 5px; }
.draft-select { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: stretch; gap: 4px; padding: 3px 0; text-align: left; background: transparent; color: var(--text); border: 0; }
.draft-select .article-title { font-size: var(--fs-12); }
.row-menu { position: relative; flex: 0 0 auto; margin-left: auto; }
.row-menu summary { width: 23px; height: 26px; opacity: .65; }
.row-menu[open] summary, .browser-item:hover .row-menu summary, .row-menu summary:focus-visible { opacity: 1; }
.row-menu-content .danger { color: var(--danger); }
.draft-tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 5px; }
.draft-tags button { padding: 2px 4px; background: transparent; }
.tag-editor { padding: 9px 0 0; }
.tag-editor .tag-filters { margin-top: 0; }
.tag-editor-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 5px; }
.browser-management { margin-top: 13px; padding: 10px 0 0; border-top: 1px solid var(--border); }
.browser-management > summary { color: var(--text-muted); padding: 3px 0; font-size: var(--fs-11); }
.backup-actions { display: flex; gap: 7px; margin: 10px 0; }
.backup-actions button, .backup-actions label { display: inline-flex; align-items: center; justify-content: center; flex: 1; min-width: 0; min-height: 30px; padding: 5px; border: 1px solid var(--border); border-radius: var(--radius-1); background: var(--bg); color: var(--text-muted); font-size: var(--fs-11); cursor: pointer; position: relative; }
.backup-actions input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.import-feedback, .storage-summary { margin: 7px 0; font-size: var(--fs-11); color: var(--text-muted); line-height: 1.7; overflow-wrap: anywhere; }
.storage-summary { font-family: var(--font-mono); font-feature-settings: var(--font-feat-num); }
.storage-summary.warning { color: var(--warn); }
.sidebar-footer { display: flex; align-items: center; gap: 8px; margin: 0 14px; padding: 16px 3px; border-top: 1px solid var(--border); color: var(--text-subtle); font-size: var(--fs-11); flex: 0 0 auto; }
.local-dot { width: 5px; height: 5px; flex: 0 0 5px; border-radius: var(--radius-pill); background: var(--success); }
@media (max-width: 900px) { .sidebar-close { display: block; } .sidebar-brand { min-height: 76px; } .article-item { min-height: 64px; } .browser-panel { max-height: 40vh; } }
@media (pointer: coarse) { .folder-menu summary, .row-menu summary { min-width: 36px; min-height: 36px; } .search-field, .search-field input, .icon-button, .connect-button { min-height: 40px; } .icon-button { flex-basis: 40px; width: 40px; } .search-field input, .new-article-form input, .rename-input, .tag-editor input { font-size: 16px; } .new-article-form { grid-template-columns: minmax(0, 1fr) 32px 32px; } .create-confirm, .create-cancel { width: 32px; height: 32px; } .folder-menu-content button, .row-menu-content button { min-height: 40px; } }
</style>
