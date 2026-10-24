<script setup lang="ts">
import { computed, onMounted, ref, useId, watch } from 'vue'
import {
  buildWritingPrompt,
  parseWritingStylesJSON,
  type WritingStyle,
  type WritingStylesConfig,
} from '../../domain/publish/writingStyles'

const props = withDefaults(defineProps<{
  config: WritingStylesConfig
  selectedId: string
  canEdit?: boolean
  loading?: boolean
  saving?: boolean
  error?: string
}>(), { canEdit: true, loading: false, saving: false, error: '' })

const emit = defineEmits<{
  close: []
  save: [config: WritingStylesConfig]
  reload: []
}>()

const uid = useId()
const dialog = ref<HTMLDialogElement | null>(null)
const draft = ref(cloneConfig(props.config))
const baseline = ref(JSON.stringify(props.config))
const editingId = ref(props.selectedId || props.config.defaultId)
const page = ref(0)
const pages = ['定位与表达', '结构与证据', '检查']
const formError = ref('')
const notice = ref('')
const copying = ref(false)
const externalChanged = ref(false)
let baselineConfig = props.config
let submitted: { text: string; previous: WritingStylesConfig } | null = null
let reloadRequested: WritingStylesConfig | null = null

const busy = computed(() => props.loading || props.saving)
const editDisabled = computed(() => busy.value || !props.canEdit)
const editingStyle = computed(() => draft.value.styles.find((style) => style.id === editingId.value))
const dirty = computed(() => JSON.stringify(draft.value) !== baseline.value)
const displayedError = computed(() => formError.value || props.error)
const phrasesText = computed({
  get: () => editingStyle.value?.rules.phrases.join('\n') ?? '',
  set: (value: string) => { if (editingStyle.value) editingStyle.value.rules.phrases = value.split(/\r?\n/) },
})
const patternsText = computed({
  get: () => editingStyle.value?.rules.patterns.join('\n') ?? '',
  set: (value: string) => { if (editingStyle.value) editingStyle.value.rules.patterns = value.split(/\r?\n/) },
})

function cloneConfig(value: WritingStylesConfig): WritingStylesConfig {
  return JSON.parse(JSON.stringify(value)) as WritingStylesConfig
}

function resetDraft(): void {
  draft.value = cloneConfig(props.config)
  baseline.value = JSON.stringify(props.config)
  baselineConfig = props.config
  if (!draft.value.styles.some((style) => style.id === editingId.value)) {
    editingId.value = draft.value.styles.some((style) => style.id === props.selectedId)
      ? props.selectedId : draft.value.defaultId
  }
  externalChanged.value = false
  formError.value = ''
}

onMounted(() => {
  resetDraft()
  dialog.value?.showModal()
})

function close(): void {
  if (busy.value) return
  if (dirty.value && !window.confirm('放弃尚未保存的写作风格修改？')) return
  dialog.value?.close()
  emit('close')
  submitted = null
  reloadRequested = null
}


function duplicateStyle(): void {
  const current = editingStyle.value
  if (editDisabled.value || !current || draft.value.styles.length >= 50) return
  const copy = JSON.parse(JSON.stringify(current)) as WritingStyle
  copy.id = crypto.randomUUID()
  const base = `${current.name.slice(0, 50)} 副本`
  copy.name = base
  for (let suffix = 2; draft.value.styles.some((style) => style.name === copy.name); suffix++) {
    copy.name = `${base} ${suffix}`
  }
  draft.value.styles.push(copy)
  editingId.value = copy.id
  notice.value = '已复制为新风格，可修改名称和指引后保存。'
  formError.value = ''
}

function removeStyle(): void {
  const current = editingStyle.value
  if (editDisabled.value || !current || draft.value.styles.length <= 1) return
  if (!window.confirm(`删除“${current.name}”？保存后，使用它的文章需要重新选择风格。`)) return
  draft.value.styles = draft.value.styles.filter((style) => style.id !== current.id)
  const first = draft.value.styles[0]!
  if (draft.value.defaultId === current.id) draft.value.defaultId = first.id
  editingId.value = first.id
  notice.value = '已从当前配置移除，保存全部后生效。'
}

function validatedDraft(): WritingStylesConfig | null {
  const candidate = cloneConfig(draft.value)
  for (const style of candidate.styles) {
    style.name = style.name.trim()
    style.rules.phrases = style.rules.phrases.map((line) => line.trim()).filter(Boolean)
    style.rules.patterns = style.rules.patterns.map((line) => line.trim()).filter(Boolean)
  }
  const result = parseWritingStylesJSON(JSON.stringify(candidate))
  if (!result.ok) {
    formError.value = result.error
    notice.value = ''
    return null
  }
  formError.value = ''
  return result.value
}

function save(): void {
  if (editDisabled.value || externalChanged.value) return
  const candidate = validatedDraft()
  if (!candidate) return
  submitted = { text: JSON.stringify(candidate), previous: props.config }
  notice.value = ''
  emit('save', candidate)
}

function reload(): void {
  if (busy.value) return
  if (dirty.value && !window.confirm('重新载入会放弃尚未保存的写作风格修改，继续？')) return
  reloadRequested = props.config
  submitted = null
  formError.value = ''
  notice.value = ''
  emit('reload')
}

async function copyPrompt(): Promise<void> {
  if (editDisabled.value || copying.value) return
  const candidate = validatedDraft()
  const style = candidate?.styles.find((item) => item.id === editingId.value)
  if (!style) return
  copying.value = true
  notice.value = ''
  try {
    if (!navigator.clipboard?.writeText) throw new Error('浏览器暂不能写入剪贴板，请在 HTTPS 或本机地址下重试。')
    await navigator.clipboard.writeText(buildWritingPrompt(style))
    notice.value = `已复制“${style.name}”的创作指令${dirty.value ? '（包含尚未保存的修改）' : ''}。`
  } catch (error) {
    formError.value = error instanceof Error ? `复制失败：${error.message}` : '复制失败，请重试。'
  } finally {
    copying.value = false
  }
}

function moveTab(event: KeyboardEvent): void {
  let target = page.value
  if (event.key === 'ArrowRight') target = (target + 1) % pages.length
  else if (event.key === 'ArrowLeft') target = (target + pages.length - 1) % pages.length
  else if (event.key === 'Home') target = 0
  else if (event.key === 'End') target = pages.length - 1
  else return
  event.preventDefault()
  page.value = target
  dialog.value?.querySelector<HTMLButtonElement>(`[data-page="${target}"]`)?.focus()
}

watch(() => [props.config, props.loading, props.saving, props.error, props.canEdit] as const, () => {
  if (props.loading && !reloadRequested) {
    submitted = null
    if (dirty.value) externalChanged.value = true
  }
  if (busy.value) return
  const current = JSON.stringify(props.config)
  if (reloadRequested) {
    const previous = reloadRequested
    reloadRequested = null
    if (props.canEdit && props.config !== previous) {
      resetDraft()
      notice.value = '已重新载入写作风格。'
    }
    return
  }
  if (submitted !== null) {
    if (props.canEdit && props.config !== submitted.previous && current === submitted.text) {
      resetDraft()
      notice.value = '已保存全部写作风格。'
      submitted = null
      return
    }
    if (props.error) submitted = null
  }
  if (props.config !== baselineConfig) {
    if (dirty.value) externalChanged.value = true
    else resetDraft()
  }
})
</script>

<template>
  <dialog
    ref="dialog"
    class="style-dialog"
    :aria-labelledby="`${uid}-heading`"
    :aria-describedby="`${uid}-intro`"
    @cancel.prevent="close"
    @keydown.stop
  >
    <form class="dialog-shell" novalidate @submit.prevent="save">
      <header class="dialog-header">
        <div>
          <h2 :id="`${uid}-heading`">写作风格</h2>
          <p :id="`${uid}-intro`">保留常用指引，按文章选择；修改后保存全部生效。</p>
        </div>
        <button type="button" class="close-button" aria-label="关闭写作风格配置" :disabled="busy" @click="close">×</button>
      </header>

      <div class="style-switcher">
        <label :for="`${uid}-editing`">正在配置</label>
        <select :id="`${uid}-editing`" v-model="editingId" :disabled="busy">
          <option v-for="style in draft.styles" :key="style.id" :value="style.id">
            {{ style.name || '未命名风格' }}{{ style.id === draft.defaultId ? ' · 默认' : '' }}
          </option>
        </select>
        <button type="button" class="button" :disabled="editDisabled || draft.styles.length >= 50" @click="duplicateStyle">复制为新风格</button>
        <button type="button" class="button quiet-button danger-button" :disabled="editDisabled || draft.styles.length <= 1" @click="removeStyle">删除</button>
      </div>

      <div class="tabs" role="tablist" aria-label="写作风格配置分组" @keydown="moveTab">
        <button
          v-for="(title, index) in pages"
          :id="`${uid}-tab-${index}`"
          :key="title"
          type="button"
          role="tab"
          :data-page="index"
          :aria-selected="page === index"
          :aria-controls="`${uid}-page-${index}`"
          :tabindex="page === index ? 0 : -1"
          @click="page = index"
        >{{ title }}</button>
      </div>

      <div class="dialog-body">
        <fieldset v-if="editingStyle" class="fields" :disabled="editDisabled">
          <legend class="sr-only">{{ editingStyle.name }}的写作风格配置</legend>
          <div class="name-row">
            <label class="field name-field" :for="`${uid}-name`">
              <span>风格名称</span>
              <input :id="`${uid}-name`" v-model="editingStyle.name" maxlength="60" required />
            </label>
            <button
              type="button"
              class="button default-button"
              :disabled="draft.defaultId === editingStyle.id"
              @click="draft.defaultId = editingStyle.id"
            >{{ draft.defaultId === editingStyle.id ? '默认风格' : '设为默认' }}</button>
          </div>

          <section
            v-show="page === 0"
            :id="`${uid}-page-0`"
            class="tab-page"
            role="tabpanel"
            :aria-labelledby="`${uid}-tab-0`"
          >
            <label class="field" :for="`${uid}-description`">
              <span>适用场景 <small>一句话说明何时使用</small></span>
              <textarea :id="`${uid}-description`" v-model="editingStyle.description" rows="2" maxlength="500" />
            </label>
            <label class="field" :for="`${uid}-positioning`">
              <span>定位与读者</span>
              <textarea :id="`${uid}-positioning`" v-model="editingStyle.positioning" rows="7" maxlength="10000" />
            </label>
            <label class="field" :for="`${uid}-expression`">
              <span>语言与表达</span>
              <textarea :id="`${uid}-expression`" v-model="editingStyle.expression" rows="6" maxlength="10000" />
            </label>
          </section>

          <section
            v-show="page === 1"
            :id="`${uid}-page-1`"
            class="tab-page"
            role="tabpanel"
            :aria-labelledby="`${uid}-tab-1`"
          >
            <label class="field" :for="`${uid}-structure`">
              <span>结构与标题</span>
              <textarea :id="`${uid}-structure`" v-model="editingStyle.structure" rows="9" maxlength="10000" />
            </label>
            <label class="field" :for="`${uid}-evidence`">
              <span>证据与案例</span>
              <textarea :id="`${uid}-evidence`" v-model="editingStyle.evidence" rows="6" maxlength="10000" />
            </label>
            <label class="field" :for="`${uid}-visuals`">
              <span>配图与视觉</span>
              <textarea :id="`${uid}-visuals`" v-model="editingStyle.visuals" rows="6" maxlength="10000" />
            </label>
            <label class="field" :for="`${uid}-review`">
              <span>评审与补充</span>
              <textarea :id="`${uid}-review`" v-model="editingStyle.review" rows="8" maxlength="10000" />
            </label>
          </section>

          <section
            v-show="page === 2"
            :id="`${uid}-page-2`"
            class="tab-page"
            role="tabpanel"
            :aria-labelledby="`${uid}-tab-2`"
          >
            <p class="field-hint">以下规则用于发文清单提醒。字数按正文文字计算，标点与空格不计入。</p>
            <div class="word-lists">
              <label class="field" :for="`${uid}-phrases`">
                <span>套话词表 <small>每行一个，最多 <b>60</b> 条</small></span>
                <textarea :id="`${uid}-phrases`" v-model="phrasesText" rows="9" spellcheck="false" />
              </label>
              <label class="field" :for="`${uid}-patterns`">
                <span>句式词表 <small>每行一个，最多 <b>60</b> 条</small></span>
                <textarea :id="`${uid}-patterns`" v-model="patternsText" rows="9" spellcheck="false" :aria-describedby="`${uid}-pattern-hint`" />
              </label>
            </div>
            <p :id="`${uid}-pattern-hint`" class="field-hint">用“……”表示句式中间的内容，例如“不是……而是……”。仅匹配同一句，不使用正则表达式。</p>
            <label class="field tolerance-field" :for="`${uid}-tolerance`">
              <span>每种句式的容许次数</span>
              <input :id="`${uid}-tolerance`" v-model.number="editingStyle.rules.patternTolerance" type="number" inputmode="numeric" min="0" max="20" step="1" required />
              <small>超过后提醒；未超过时仍显示出现位置。</small>
            </label>
            <div class="range-grid">
              <fieldset class="range-field">
                <legend>正文字数范围</legend>
                <label :for="`${uid}-min-words`">最少字数</label>
                <input :id="`${uid}-min-words`" v-model.number="editingStyle.rules.minWords" type="number" inputmode="numeric" min="0" max="20000" step="1" required />
                <label :for="`${uid}-max-words`">最多字数</label>
                <input :id="`${uid}-max-words`" v-model.number="editingStyle.rules.maxWords" type="number" inputmode="numeric" min="0" max="20000" step="1" required />
              </fieldset>
              <fieldset class="range-field">
                <legend>正文图片范围</legend>
                <label :for="`${uid}-min-images`">最少张数</label>
                <input :id="`${uid}-min-images`" v-model.number="editingStyle.rules.minImages" type="number" inputmode="numeric" min="0" max="30" step="1" required />
                <label :for="`${uid}-max-images`">最多张数</label>
                <input :id="`${uid}-max-images`" v-model.number="editingStyle.rules.maxImages" type="number" inputmode="numeric" min="0" max="30" step="1" required />
              </fieldset>
            </div>
            <p class="field-hint">同时检查超过 <b>80</b> 字的长句、连续 <b>3</b> 个以上的单句段和缺少图注的图片。</p>
          </section>
        </fieldset>
      </div>

      <div v-if="externalChanged || displayedError || notice" class="feedback">
        <p v-if="externalChanged" class="error-message" role="alert">配置已在其他位置更新。请重新载入后再保存，避免覆盖新内容。</p>
        <p v-if="displayedError" class="error-message" role="alert">{{ displayedError }}</p>
        <p v-if="notice" class="notice-message" role="status">{{ notice }}</p>
      </div>

      <footer class="dialog-footer">
        <div class="footer-tools">
          <button type="button" class="button quiet-button" :disabled="busy" @click="reload">重新载入</button>
          <button type="button" class="button quiet-button" :disabled="editDisabled || copying" @click="copyPrompt">{{ copying ? '复制中…' : '复制创作指令' }}</button>
        </div>
        <div class="footer-actions">
          <span v-if="dirty" class="dirty-label">未保存</span>
          <button type="button" class="button" :disabled="busy" @click="close">取消</button>
          <button type="submit" class="button primary-button" :disabled="editDisabled || !dirty || externalChanged">{{ saving ? '保存中…' : '保存全部' }}</button>
        </div>
      </footer>
    </form>
  </dialog>
</template>

<style scoped>
.style-dialog {
  width: 720px;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-3);
  color: var(--text);
  background: var(--surface-raised);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  box-shadow: var(--shadow-modal);
}
.style-dialog::backdrop { background: rgb(20 26 23 / 34%); }
.dialog-shell { display: flex; flex-direction: column; max-height: calc(100dvh - 34px); margin: 0; }
.dialog-header { display: flex; justify-content: space-between; gap: var(--sp-5); padding: var(--sp-6) var(--sp-6) var(--sp-5); }
.dialog-header h2 { margin: 0; font-size: var(--fs-19); font-weight: var(--fw-semibold); line-height: 1.4; letter-spacing: -.02em; }
.dialog-header p { margin: 6px 0 0; font-size: var(--fs-12); line-height: 1.6; color: var(--text-muted); }
.close-button { flex: 0 0 32px; align-self: flex-start; width: 32px; height: 32px; padding: 0; border: 0; border-radius: var(--radius-2); color: var(--text-muted); background: transparent; font-family: var(--font-text); font-size: var(--fs-24); cursor: pointer; }
.close-button:hover:not(:disabled) { color: var(--text); background: var(--surface); }
.style-switcher { display: flex; align-items: center; flex-wrap: wrap; gap: var(--sp-2); padding: 0 var(--sp-6) var(--sp-5); }
.style-switcher > label { font-size: var(--fs-12); color: var(--text-muted); }
.style-switcher > select { flex: 1 1 150px; }
.tabs { display: flex; flex: 0 0 auto; gap: 4px; margin: 0 var(--sp-6); padding: 4px; border-radius: var(--radius-2); background: var(--surface); }
.tabs > button { flex: 1; min-width: 0; min-height: 32px; padding: 6px var(--sp-3); border: 1px solid transparent; border-radius: var(--radius-2); background: transparent; color: var(--text-muted); font: inherit; font-size: var(--fs-12); cursor: pointer; }
.tabs > button:hover:not([aria-selected="true"]) { color: var(--text); background: var(--surface-alt); }
.tabs > button[aria-selected="true"] { border-color: var(--border); color: var(--text); background: var(--surface-raised); font-weight: var(--fw-semibold); box-shadow: var(--shadow-rest); }
.dialog-body { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: var(--sp-5) var(--sp-6) var(--sp-6); }
.fields { min-width: 0; margin: 0; padding: 0; border: 0; }
.name-row { display: flex; align-items: flex-end; gap: var(--sp-3); margin-bottom: var(--sp-5); }
.name-field { flex: 1; min-width: 0; }
.tab-page { display: grid; gap: var(--sp-4); }
.field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.field > span, .range-field > legend { font-size: var(--fs-12); font-weight: var(--fw-medium); line-height: 1.5; }
.field small { margin-left: var(--sp-2); font-weight: var(--fw-regular); }
.field small, .field-hint { color: var(--text-muted); font-size: var(--fs-11); line-height: 1.65; }
.field-hint { margin: 0; }
:is(input, select, textarea) { box-sizing: border-box; min-width: 0; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--bg); color: inherit; font: inherit; }
:is(input, select) { height: 32px; padding: 0 10px; }
textarea { width: 100%; padding: 9px 11px; line-height: 1.65; resize: vertical; min-height: 64px; }
:is(input, select, textarea):hover:not(:disabled) { border-color: var(--border-strong); }
input[type="number"], b { font-family: var(--font-mono); font-feature-settings: var(--font-feat-num); font-variant-numeric: tabular-nums; font-weight: var(--fw-regular); }
.word-lists, .range-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--sp-5); }
.tolerance-field > input { width: 100px; }
.tolerance-field > small { margin: 0; }
.range-grid { padding-block: var(--sp-4); border-block: 1px solid var(--border); }
.range-field { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: var(--sp-2) var(--sp-3); min-width: 0; margin: 0; padding: 0; border: 0; }
.range-field > legend { padding: 0 0 var(--sp-3); }
.range-field > label { color: var(--text-muted); font-size: var(--fs-12); }
.feedback { flex: 0 0 auto; max-height: 100px; overflow-y: auto; padding: var(--sp-3) var(--sp-6); background: var(--surface); border-top: 1px solid var(--border); font-size: var(--fs-12); line-height: 1.6; overflow-wrap: anywhere; }
.feedback > p { margin: 0; }
.error-message { color: var(--danger); }
.notice-message { color: var(--text-muted); }
.dialog-footer { display: flex; flex: 0 0 auto; align-items: center; justify-content: space-between; gap: var(--sp-3); flex-wrap: wrap; padding: var(--sp-4) var(--sp-6); border-top: 1px solid var(--border); }
.footer-tools, .footer-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--sp-2); }
.footer-actions { margin-left: auto; }
.dirty-label { font-size: var(--fs-11); color: var(--text-muted); }
.button { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; min-height: 32px; padding: 5px 11px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); color: inherit; font: inherit; font-size: var(--fs-12); line-height: 1.5; white-space: nowrap; cursor: pointer; }
.button:hover:not(:disabled) { background: var(--surface); border-color: var(--border-strong); }
.quiet-button { padding-inline: 8px; border-color: transparent; background: transparent; color: var(--text-muted); }
.quiet-button:hover:not(:disabled) { color: var(--text); border-color: transparent; }
.primary-button { min-width: 90px; color: var(--accent-on); background: var(--accent); border-color: var(--accent); font-weight: var(--fw-medium); }
.primary-button:hover:not(:disabled) { background: var(--accent-hover); border-color: var(--accent-hover); }
.default-button:disabled { opacity: 1; color: var(--text-muted); border-color: transparent; background: var(--surface); }
:is(button, input, select, textarea):disabled { cursor: default; opacity: .55; }
:focus-visible { outline: 2px solid var(--border-strong); outline-offset: 2px; }
:is(input, select, textarea):focus-visible { border-color: var(--text-subtle); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 520px) {
  .style-dialog { max-width: calc(100vw - 24px); max-height: calc(100dvh - 24px); }
  .dialog-shell { max-height: calc(100dvh - 26px); }
  .dialog-header { padding: var(--sp-4) var(--sp-5); }
  .style-switcher { padding: 0 var(--sp-5) var(--sp-4); }
  .style-switcher > select { flex-basis: calc(100% - 70px); }
  .tabs { margin: 0 var(--sp-5); }
  .tabs > button { padding-inline: var(--sp-2); }
  .dialog-body { padding: var(--sp-4) var(--sp-5); }
  .word-lists, .range-grid { grid-template-columns: minmax(0, 1fr); }
  .feedback { padding-inline: var(--sp-5); }
  .dialog-footer { padding: var(--sp-3) var(--sp-5); }
  .footer-tools, .footer-actions { width: 100%; }
  .footer-actions { justify-content: flex-end; }
}
</style>
