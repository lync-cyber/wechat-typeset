<script setup lang="ts">
import { computed, defineAsyncComponent, ref, useId } from 'vue'
import type { WritingStylesConfig } from '../../domain/publish/writingStyles'

const props = withDefaults(defineProps<{
  config: WritingStylesConfig
  selectedId: string
  canEdit?: boolean
  loading?: boolean
  saving?: boolean
  error?: string
}>(), { canEdit: true, loading: false, saving: false, error: '' })

const emit = defineEmits<{
  select: [id: string]
  save: [config: WritingStylesConfig]
  reload: []
}>()

const WritingStyleDialog = defineAsyncComponent(() => import('./WritingStyleDialog.vue'))
const uid = useId()
const opened = ref(false)
const busy = computed(() => props.loading || props.saving)
const selected = computed(() => props.selectedId || props.config.defaultId)
const missingSelection = computed(() => !!props.selectedId && !props.config.styles.some((style) => style.id === props.selectedId))

function select(event: Event): void {
  if (!busy.value && props.canEdit) emit('select', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="writing-style-control">
    <label :for="`${uid}-active`">写作风格</label>
    <select :id="`${uid}-active`" :value="selected" :disabled="busy || !canEdit" :aria-describedby="error ? `${uid}-error` : undefined" @change="select">
      <option v-if="missingSelection" :value="selectedId" disabled>此风格不存在，请重新选择</option>
      <option v-for="style in config.styles" :key="style.id" :value="style.id">{{ style.name }}</option>
    </select>
    <button type="button" :disabled="busy" title="配置写作风格" aria-label="配置写作风格" aria-haspopup="dialog" @click="opened = true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 5 5 5M3 21l4.5-1 12-12a2.12 2.12 0 0 0-3-3l-12 12L3 21Z" /></svg>
    </button>
    <span v-if="loading" role="status">载入中…</span>
    <p v-if="error && !opened" :id="`${uid}-error`" role="alert">{{ error }}</p>
  </div>
  <WritingStyleDialog
    v-if="opened"
    :config="config"
    :selected-id="selectedId"
    :can-edit="canEdit"
    :loading="loading"
    :saving="saving"
    :error="error"
    @close="opened = false"
    @save="emit('save', $event)"
    @reload="emit('reload')"
  />
</template>

<style scoped>
.writing-style-control { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 6px; min-width: 0; max-width: 280px; color: var(--text-muted); font: var(--fs-12) var(--font-text); }
label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
select, button { min-width: 0; height: 34px; border: 1px solid var(--border); background: var(--surface-raised); color: var(--text-muted); font: inherit; }
select { width: 170px; max-width: calc(100% - 40px); padding: 0 12px; border-radius: var(--radius-pill); }
button { display: grid; place-items: center; flex: 0 0 34px; padding: 0; border-radius: var(--radius-2); cursor: pointer; }
button:hover { background: var(--surface); }
:disabled { opacity: .55; cursor: default; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
p { flex-basis: 100%; margin: 0; color: var(--danger); line-height: 1.5; overflow-wrap: anywhere; }
</style>
