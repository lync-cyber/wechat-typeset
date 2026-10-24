<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { parseFrontmatter, updatePublication, type PublicationField } from '../../core/pipeline/frontmatter'
import { buildChecklist, getChecklistCover, type CoverState } from '../../domain/publish/checklist'
import { checkStyle } from '../../domain/publish/styleCheck'
import type { WritingStyle } from '../../domain/publish/writingStyles'
import { listArticleImages, normalizeLocalImagePath } from '../../infra/fs/images'
import PanelHeader from '../primitives/PanelHeader.vue'

const props = defineProps<{
  md: string
  missingImages?: readonly string[]
  imageDirectory?: FileSystemDirectoryHandle | null
  imageRevision?: number
  writingStyle?: WritingStyle | null
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:md', value: string): void
  (e: 'gotoLine', line: number): void
}>()

const publication = computed(() => parseFrontmatter(props.md).publication)
const copyFeedback = ref('')

function field(key: PublicationField, maxCharacters?: number) {
  return computed({
    get: () => publication.value[key] ?? '',
    set: (value: string) => {
      copyFeedback.value = ''
      const text = maxCharacters === undefined ? value : Array.from(value).slice(0, maxCharacters).join('')
      emit('update:md', updatePublication(props.md, { [key]: text }))
    },
  })
}
const title = field('title')
const digest = field('digest', 120)
const digestLength = computed(() => Array.from(digest.value).length)
function updateDigest(event: Event) {
  if ((event as InputEvent).isComposing) return
  const input = event.target as HTMLTextAreaElement
  const value = Array.from(input.value).slice(0, 120).join('')
  input.value = value
  digest.value = value
}
const author = field('author')
const source = field('source')
const cover = field('cover')

const images = ref<string[]>([])
const imagesLoading = ref(false)
const imagesError = ref('')
let imagesRequest = 0
watch([() => props.imageDirectory, () => props.imageRevision], async ([dir]) => {
  const request = ++imagesRequest
  images.value = []
  imagesError.value = ''
  imagesLoading.value = Boolean(dir)
  if (!dir) return
  try {
    const paths = await listArticleImages(dir)
    if (request === imagesRequest) images.value = paths
  } catch (error) {
    if (request === imagesRequest) imagesError.value = `无法读取本篇图片：${error instanceof Error ? error.message : String(error)}`
  } finally {
    if (request === imagesRequest) imagesLoading.value = false
  }
}, { immediate: true })
onBeforeUnmount(() => { imagesRequest += 1 })

// 列表路径来自磁盘文件名，只有 Markdown/frontmatter 引用需要解码。
const coverSelection = computed({
  get: () => normalizeLocalImagePath(cover.value) || cover.value,
  set: (path: string) => { cover.value = path.replace(/[%?#]/g, (char) => encodeURIComponent(char)) },
})
const unlistedCover = computed(() => Boolean(cover.value) && !images.value.includes(coverSelection.value))
const coverState = computed<CoverState | undefined>(() => {
  if (!props.imageDirectory) return undefined
  const selected = getChecklistCover(props.md)
  if (!selected) return undefined
  const path = normalizeLocalImagePath(selected)
  if (path === null) return undefined
  if (imagesLoading.value) return 'loading'
  if (imagesError.value) return 'error'
  return path && images.value.includes(path) ? 'present' : 'missing'
})
const coverMissing = computed(() => unlistedCover.value && coverState.value === 'missing')
const report = computed(() => buildChecklist(props.md, { missingImages: props.missingImages, coverState: coverState.value }))
const styleIssues = computed(() => props.writingStyle ? checkStyle(props.md, props.writingStyle) : [])

async function copyField(key: 'title' | 'digest') {
  const value = publication.value[key] ?? ''
  if (!value.trim()) return
  try {
    await navigator.clipboard.writeText(value)
    copyFeedback.value = key === 'title' ? '标题已复制' : '摘要已复制'
  } catch {
    copyFeedback.value = '复制失败，请选中文字手动复制。'
  }
}
</script>

<template>
  <aside class="panel" aria-label="发布准备">
    <PanelHeader title="发布准备" size="sm" @close="emit('close')" />
    <div class="panel-scroll">
      <section class="publication-fields" aria-labelledby="publication-heading">
        <h4 id="publication-heading" class="section-heading">发布信息</h4>
        <div class="field">
          <div class="field-heading">
            <label for="publication-title">标题</label>
            <button class="copy-button" type="button" :disabled="!title.trim()" @click="copyField('title')">复制标题</button>
          </div>
          <input id="publication-title" v-model="title" type="text" placeholder="填写公众号标题" />
        </div>
        <div class="field">
          <div class="field-heading">
            <label for="publication-digest">摘要</label>
            <span id="publication-digest-count" class="character-count" :class="{ 'over-limit': digestLength > 120 }">{{ digestLength }} / 120</span>
            <button class="copy-button" type="button" :disabled="!digest.trim()" @click="copyField('digest')">复制摘要</button>
          </div>
          <textarea
            id="publication-digest"
            :value="digest"
            @input="updateDigest"
            @compositionend="updateDigest"
            rows="3"
            aria-describedby="publication-digest-count"
            :aria-invalid="digestLength > 120"
            placeholder="用一小段话说明这篇文章值得读什么"
          />
          <p v-if="digestLength > 120" class="field-note error">现有摘要超过 120 字，请缩短后使用。</p>
        </div>
        <div class="field">
          <label for="publication-author">作者</label>
          <input id="publication-author" v-model="author" type="text" placeholder="选填" />
        </div>
        <div class="field">
          <label for="publication-source">原文链接</label>
          <input id="publication-source" v-model="source" type="url" inputmode="url" placeholder="https://…" />
        </div>
        <div class="field">
          <label for="publication-cover">封面</label>
          <select id="publication-cover" v-model="coverSelection" :disabled="!imageDirectory || imagesLoading || Boolean(imagesError)">
            <option value="">{{ imagesLoading ? '正在读取本篇图片…' : '未单独选择 · 沿用正文首图' }}</option>
            <option v-if="unlistedCover" :value="coverSelection">{{ cover }}{{ coverMissing ? '（未找到）' : '' }}</option>
            <option v-for="path in images" :key="path" :value="path">{{ path.replace(/^images\//, '') }}</option>
          </select>
          <p v-if="imagesError" class="field-note error" role="status">{{ imagesError }}</p>
          <p v-else-if="!imageDirectory" class="field-note">打开文件夹文章后，可从本篇图片中选择封面。</p>
          <p v-else-if="!imagesLoading && images.length === 0" class="field-note">本篇还没有图片，粘贴或上传一张后即可选择。</p>
        </div>
        <p v-if="copyFeedback" class="copy-feedback" role="status">{{ copyFeedback }}</p>
      </section>

      <section class="checklist" aria-labelledby="checklist-heading">
        <div class="checklist-heading">
          <h4 id="checklist-heading" class="section-heading">发文前清单</h4>
          <span class="check-summary" :class="{ blocked: !report.pass }">{{ report.pass ? '无阻断项' : '有待处理项' }}</span>
        </div>
        <ul class="items">
          <li v-for="item in report.items" :key="item.id" class="item" :class="`status-${item.status}`">
            <span class="item-dot" aria-hidden="true" />
            <div class="item-body">
              <div class="item-label">{{ item.label }}</div>
              <div v-if="item.hint" class="item-hint">{{ item.hint }}</div>
            </div>
          </li>
          <li v-for="issue in styleIssues" :key="issue.id" class="item item-action" :class="`status-${issue.status}`">
            <button class="item-body style-issue" type="button" :aria-label="`定位到第 ${issue.line} 行：${issue.message}`" @click="emit('gotoLine', issue.line)">
              <span class="item-dot" aria-hidden="true" />
              <span class="issue-text">
                <span class="item-label">{{ issue.message }}</span>
                <span class="item-hint character-count">第 {{ issue.line }} 行 · 点击定位</span>
              </span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  background: var(--surface-raised);
  color: var(--text);
  font: var(--fs-13)/1.55 var(--font-text);
}
.panel-scroll { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
.panel :deep(.panel-header) { padding: var(--sp-3) var(--sp-4); }
.publication-fields { padding: var(--sp-4); border-bottom: 1px solid var(--border); }
.section-heading { margin: 0; font-size: var(--fs-12); font-weight: var(--fw-semibold); }
.publication-fields > .section-heading { margin-bottom: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: var(--sp-3); }
.field:last-of-type { margin-bottom: 0; }
.field-heading { display: flex; align-items: center; gap: var(--sp-2); min-height: 24px; }
.field label { color: var(--text-muted); font-weight: var(--fw-medium); }
.field label, .item-label { font-size: var(--fs-12); }
:is(input, textarea, select) {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: var(--bg);
  color: inherit;
  font: inherit;
}
:is(input, select) { height: 32px; }
textarea { resize: vertical; min-height: 80px; padding-block: 8px; }
:is(input, textarea, select):hover:not(:disabled) { border-color: var(--border-strong); }
:is(input, textarea)::placeholder { color: var(--text-subtle); }
select:disabled { background: var(--surface); }
button { border: 0; border-radius: var(--radius-2); background: transparent; color: inherit; font: inherit; cursor: pointer; }
:focus-visible { outline: 2px solid var(--border-strong); outline-offset: 2px; }
:disabled { opacity: .5; cursor: default; }
.copy-button { min-height: 24px; margin-left: auto; padding: 3px 6px; color: var(--text-muted); font-size: var(--fs-11); }
.copy-button:hover:not(:disabled) { color: var(--text); background: var(--surface); }
.character-count { color: var(--text-subtle); font-family: var(--font-mono); font-size: var(--fs-11); font-variant-numeric: tabular-nums; }
.field-note { margin: 0; overflow-wrap: anywhere; }
.field-note, .item-hint, .copy-feedback { font-size: var(--fs-11); color: var(--text-muted); }
.character-count.over-limit,
.field-note.error { color: var(--danger); }
.copy-feedback { margin: var(--sp-3) 0 0; }
.checklist-heading { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); padding: var(--sp-4) var(--sp-4) var(--sp-3); }
.check-summary { padding: 3px 6px; border-radius: var(--radius-2); background: var(--surface); color: var(--text-subtle); font-size: var(--fs-11); white-space: nowrap; }
.check-summary.blocked { color: var(--text); font-weight: var(--fw-medium); }
.items { display: grid; gap: 4px; list-style: none; padding: 0 var(--sp-2) var(--sp-3); margin: 0; }
.item, .style-issue { display: flex; align-items: flex-start; gap: 9px; padding: 10px var(--sp-2); border-radius: var(--radius-2); }
.item-dot { width: 5px; height: 5px; margin-top: 7px; border-radius: var(--radius-pill); flex: none; background: var(--text-subtle); }
.status-pass { color: var(--text-muted); }
.status-pass .item-dot { opacity: .55; }
.status-pass .item-hint { color: var(--text-subtle); }
.status-warn .item-dot { background: var(--amber-500); }
.status-fail .item-dot { background: var(--danger); }
.status-warn, .status-fail { background: var(--surface); }
.item-body, .issue-text { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.item-label, .item-hint { display: block; }
.item-hint { margin-top: 3px; }
.item-action { padding: 0; }
.style-issue { width: 100%; min-height: 40px; text-align: left; }
.style-issue:hover { background: var(--surface-alt); }
</style>
