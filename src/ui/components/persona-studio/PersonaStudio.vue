<script setup lang="ts">
/**
 * Persona no-code 编辑器 —— 调色板 / 字号 / 间距 / 圆角 / variant 选择
 *
 * 设计纪律（避免与项目其他面板漂移）：
 *   - 单一真相：draft: PersonaSpec；preview 与 validation 都是 computed 派生
 *   - 不持有"编辑器 theme"中间状态：所有改动经 draft → specToTheme 出预览
 *   - "应用"按钮把 customTheme 设给 App 层（与 ColorCustomizer 同一注入点），
 *     不改 baseThemeId（编辑器只是临时预览/导出，不污染主题选择）
 *   - "下载 spec.json"是给作者去提 PR 加新 persona，符合 9 套主题的注册成本约定
 *
 * 子节顺序按"作者改动频率从高到低"：
 *   palette → status → typography → spacing → radius → variants → svgVariant
 */
import { computed, reactive } from 'vue'
import type { ThemeVariants } from '../../../core/themes/types'
import { VARIANT_IDS } from '../../../core/themes/types'
import { customTheme } from '../../../app/state'
import { downloadBlob } from '../../../infra/exporters/exportFile'
import PanelHeader from '../../primitives/PanelHeader.vue'
import DrawerResizer from '../../primitives/DrawerResizer.vue'
import PaletteEditor from './PaletteEditor.vue'
import { usePersonaDraft } from './usePersonaDraft'
import { useDrawerWidth } from '../../composables/useDrawerWidth'
import { PERSONA_STUDIO_WIDTH_KEY } from '../../../infra/storage/storageKeys'

const props = defineProps<{ initialBaseId: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const draftMgr = usePersonaDraft(props.initialBaseId)
const draft = draftMgr.draft

// 抽屉左缘拖宽：默认 400px（var(--drawer-w-md)），localStorage 持久化
const PERSONA_STUDIO_DEFAULT_W = 400
const {
  width: drawerWidth,
  maxWidth: drawerMaxWidth,
  defaultWidth: drawerDefaultWidth,
  minWidth: drawerMinWidth,
} = useDrawerWidth({
  storageKey: PERSONA_STUDIO_WIDTH_KEY,
  defaultWidth: PERSONA_STUDIO_DEFAULT_W,
  min: 360,
  maxViewportRatio: 0.55,
})

const studioStyle = computed(() =>
  drawerWidth.value === null ? undefined : { width: drawerWidth.value + 'px' },
)

// 短暂提示
const ui = reactive({ status: '' })
let statusTimer: number | null = null
function pingStatus(msg: string, ms = 2000) {
  ui.status = msg
  if (statusTimer != null) window.clearTimeout(statusTimer)
  statusTimer = window.setTimeout(() => {
    ui.status = ''
    statusTimer = null
  }, ms)
}

// 色板 / 状态四色编辑已抽到 PaletteEditor.vue
const VARIANT_SLOTS = [
  ['admonition', 'admonition (tip/warning/info/danger)'],
  ['quote', 'quote-card'],
  ['compare', 'compare 对比块'],
  ['steps', 'steps 步骤'],
  ['divider', 'divider 分隔'],
  ['sectionTitle', 'section-title 章节'],
  ['codeBlock', 'code block 代码块'],
  ['note', 'note 第五态'],
] as const

const SVG_VARIANTS = ['geometric', 'soft', 'serif', 'playful'] as const

// 校验提示分类
const errors = computed(() => draftMgr.validation.value.errors)
const warnings = computed(() => draftMgr.validation.value.warnings)
const validForApply = computed(() => draftMgr.validation.value.ok)

// 三种保存出口
function applyAsCurrent() {
  if (!validForApply.value) {
    pingStatus('校验未通过，先修正再应用', 2500)
    return
  }
  // ColorCustomizer 同位的注入点：写 customTheme，activeTheme computed 立即生效
  customTheme.value = draftMgr.previewTheme.value
  pingStatus('已应用为当前预览主题')
}

function downloadSpec() {
  const json = draftMgr.exportJson()
  const filename = `persona-${draft.id || 'custom'}.spec.json`
  downloadBlob(filename, json, 'application/json')
  pingStatus('已下载 spec.json')
}

function resetDraft() {
  if (draftMgr.dirty.value) {
    if (!window.confirm('放弃当前所有改动？')) return
  }
  draftMgr.reset()
  pingStatus('已恢复 base persona 默认')
}

function changeBase(ev: Event) {
  const id = (ev.target as HTMLSelectElement).value
  if (draftMgr.dirty.value) {
    if (!window.confirm('切换 base 将丢失当前改动，继续？')) {
      ;(ev.target as HTMLSelectElement).value = draftMgr.baseId.value
      return
    }
  }
  draftMgr.setBase(id)
}

// number-input 防 NaN 兜底
function setNum<T extends object>(obj: T, key: keyof T, ev: Event) {
  const v = Number((ev.target as HTMLInputElement).value)
  if (Number.isFinite(v)) (obj as unknown as Record<string, unknown>)[key as string] = v
}

function setVariant<K extends keyof ThemeVariants>(slot: K, value: string) {
  const allowed: readonly string[] = VARIANT_IDS[slot]
  if (!allowed.includes(value)) return
  draft.variants[slot] = value as ThemeVariants[K]
}

function castSvgVariant(v: string): (typeof SVG_VARIANTS)[number] | undefined {
  return (SVG_VARIANTS as readonly string[]).includes(v)
    ? (v as (typeof SVG_VARIANTS)[number])
    : undefined
}
function onSvgVariant(ev: Event) {
  const v = castSvgVariant((ev.target as HTMLSelectElement).value)
  if (v) draft.svgVariant = v
}

// id 修改：阻止覆盖已注册 id；只允许 "另存为新 id" 的语义
const reservedIds = new Set(draftMgr.baseOptions.map((o) => o.id))
function onIdInput(ev: Event) {
  const next = (ev.target as HTMLInputElement).value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
  draft.id = next
}
const idCollision = computed(() => reservedIds.has(draft.id) && draft.id !== draftMgr.baseId.value)
</script>

<template>
  <aside class="studio" aria-label="主题编辑器" :style="studioStyle">
    <DrawerResizer
      :width="drawerWidth"
      :min="drawerMinWidth"
      :max="drawerMaxWidth"
      :default-width="drawerDefaultWidth"
      @update:width="drawerWidth = $event"
    />
    <PanelHeader title="主题编辑器" size="sm" @close="emit('close')">
      <template #actions>
        <button class="head-action" :disabled="!draftMgr.dirty.value" @click="resetDraft">
          还原
        </button>
      </template>
    </PanelHeader>

    <div class="body">
      <!-- 基底 + 标识 -->
      <section class="section">
        <header class="section-title">基底主题</header>
        <label class="row">
          <span class="row-label">Base persona</span>
          <select :value="draftMgr.baseId.value" @change="changeBase">
            <option v-for="o in draftMgr.baseOptions" :key="o.id" :value="o.id">
              {{ o.name }} ({{ o.id }})
            </option>
          </select>
        </label>
        <label class="row">
          <span class="row-label">新主题 id</span>
          <input :value="draft.id" placeholder="my-theme" @input="onIdInput" />
        </label>
        <div v-if="idCollision" class="hint hint-warn">
          该 id 与内置主题冲突；用于"另存为"前请改名。
        </div>
        <label class="row">
          <span class="row-label">中文名</span>
          <input v-model="draft.name" placeholder="我的主题" />
        </label>
        <label class="row row-text">
          <span class="row-label">一句描述</span>
          <textarea v-model="draft.description" rows="2"></textarea>
        </label>
      </section>

      <PaletteEditor :palette="draft.palette" :status="draft.status" />

      <!-- 字号 / 行高 / 字距 -->
      <details class="section">
        <summary class="section-title">字号 / 字距 · typography</summary>
        <label class="row">
          <span class="row-label">baseSize (px, ≥14)</span>
          <input type="number" min="14" max="22"
            :value="draft.typography.baseSize"
            @input="setNum(draft.typography, 'baseSize', $event)" />
        </label>
        <label class="row">
          <span class="row-label">lineHeight</span>
          <input type="number" min="1" max="2.5" step="0.05"
            :value="draft.typography.lineHeight"
            @input="setNum(draft.typography, 'lineHeight', $event)" />
        </label>
        <label class="row">
          <span class="row-label">h1Size</span>
          <input type="number" min="14" max="48"
            :value="draft.typography.h1Size"
            @input="setNum(draft.typography, 'h1Size', $event)" />
        </label>
        <label class="row">
          <span class="row-label">h2Size</span>
          <input type="number" min="14" max="36"
            :value="draft.typography.h2Size"
            @input="setNum(draft.typography, 'h2Size', $event)" />
        </label>
        <label class="row">
          <span class="row-label">h3Size</span>
          <input type="number" min="14" max="28"
            :value="draft.typography.h3Size"
            @input="setNum(draft.typography, 'h3Size', $event)" />
        </label>
        <label class="row">
          <span class="row-label">letterSpacing (px)</span>
          <input type="number" min="-2" max="4" step="0.1"
            :value="draft.typography.letterSpacing"
            @input="setNum(draft.typography, 'letterSpacing', $event)" />
        </label>
      </details>

      <!-- 间距 -->
      <details class="section">
        <summary class="section-title">间距 · spacing (px)</summary>
        <label class="row">
          <span class="row-label">paragraph</span>
          <input type="number" min="0" max="48"
            :value="draft.spacing.paragraph"
            @input="setNum(draft.spacing, 'paragraph', $event)" />
        </label>
        <label class="row">
          <span class="row-label">section</span>
          <input type="number" min="0" max="72"
            :value="draft.spacing.section"
            @input="setNum(draft.spacing, 'section', $event)" />
        </label>
        <label class="row">
          <span class="row-label">listItem</span>
          <input type="number" min="0" max="24"
            :value="draft.spacing.listItem"
            @input="setNum(draft.spacing, 'listItem', $event)" />
        </label>
        <label class="row">
          <span class="row-label">containerPadding</span>
          <input type="number" min="0" max="48"
            :value="draft.spacing.containerPadding"
            @input="setNum(draft.spacing, 'containerPadding', $event)" />
        </label>
      </details>

      <!-- 圆角 -->
      <details class="section">
        <summary class="section-title">圆角 · radius (px)</summary>
        <label class="row">
          <span class="row-label">sm</span>
          <input type="number" min="0" max="24"
            :value="draft.radius.sm" @input="setNum(draft.radius, 'sm', $event)" />
        </label>
        <label class="row">
          <span class="row-label">md</span>
          <input type="number" min="0" max="32"
            :value="draft.radius.md" @input="setNum(draft.radius, 'md', $event)" />
        </label>
        <label class="row">
          <span class="row-label">lg</span>
          <input type="number" min="0" max="48"
            :value="draft.radius.lg" @input="setNum(draft.radius, 'lg', $event)" />
        </label>
      </details>

      <!-- 骨架变体 -->
      <details class="section">
        <summary class="section-title">骨架变体 · variants</summary>
        <label v-for="[slot, label] in VARIANT_SLOTS" :key="slot" class="row">
          <span class="row-label">{{ label }}</span>
          <select
            :value="draft.variants[slot]"
            @change="setVariant(slot, ($event.target as HTMLSelectElement).value)"
          >
            <option v-for="v in VARIANT_IDS[slot]" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
      </details>

      <!-- SVG 字形变体 -->
      <details class="section">
        <summary class="section-title">SVG 字形 · svgVariant</summary>
        <label class="row">
          <span class="row-label">几何 / 柔和 / 衬线 / 活泼</span>
          <select :value="draft.svgVariant ?? 'geometric'" @change="onSvgVariant">
            <option v-for="v in SVG_VARIANTS" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
        <p class="hint">
          仅作为 applyPalette 用户自定义配色路径的 fallback；spec-first 主路径不消费此字段。
        </p>
      </details>

      <!-- 校验报告 -->
      <details v-if="errors.length || warnings.length" class="section section-warn" open>
        <summary class="section-title">
          校验 · {{ errors.length }} error / {{ warnings.length }} warning
        </summary>
        <ul class="issues">
          <li v-for="(e, i) in errors" :key="`e${i}`" class="issue issue-err">
            <code>{{ e.path }}</code> {{ e.message }}
          </li>
          <li v-for="(w, i) in warnings" :key="`w${i}`" class="issue issue-warn">
            <code>{{ w.path }}</code> {{ w.message }}
          </li>
        </ul>
      </details>
    </div>

    <footer class="actions">
      <button class="action-btn" :disabled="!validForApply" @click="applyAsCurrent">
        应用为当前主题
      </button>
      <button class="action-btn action-secondary" @click="downloadSpec">
        下载 spec.json
      </button>
      <span v-if="ui.status" class="action-status">{{ ui.status }}</span>
    </footer>
  </aside>
</template>

<style scoped>
.studio {
  position: relative;
  width: var(--drawer-w-md, 360px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--surface-raised);
  border-left: 1px solid var(--border);
  font-family: var(--font-text);
  font-size: var(--fs-13);
  color: var(--text);
}
.head-action {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-12);
  height: 24px;
  padding: 0 var(--sp-3);
  border-radius: var(--radius-pill);
  cursor: pointer;
}
.head-action:disabled { opacity: 0.4; cursor: default; }

.body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--sp-3) var(--sp-4);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  padding: var(--sp-3);
}
.section-title {
  font-weight: var(--fw-medium);
  font-size: var(--fs-12);
  cursor: pointer;
  padding: 2px 0;
  user-select: none;
}
.section-warn .section-title { color: var(--danger); }

.row {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) 0;
  font-size: var(--fs-12);
}
.row-label {
  flex: 0 0 auto;
  min-width: 120px;
  color: var(--text-muted);
}
.row input[type="text"],
.row input[type="number"],
.row select,
.row-text textarea {
  flex: 1 1 auto;
  height: 26px;
  padding: 0 var(--sp-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: var(--surface-raised);
  color: var(--text);
  font: inherit;
  font-size: var(--fs-12);
}
.row-text textarea {
  height: auto;
  padding: var(--sp-2);
  resize: vertical;
}
/* color-row / hex-input / status-block / status-label 见 PaletteEditor.vue */

.hint {
  font-size: var(--fs-11);
  color: var(--text-muted);
  line-height: 1.4;
  margin-top: var(--sp-2);
}
.hint-warn { color: var(--danger); }

.issues {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--fs-11);
  line-height: 1.5;
}
.issue {
  padding: 2px 0;
}
.issue code {
  font-family: var(--font-mono);
  font-size: var(--fs-10);
  color: var(--text-muted);
  margin-right: 4px;
}
.issue-err { color: var(--danger); }
.issue-warn { color: var(--text-muted); }

.actions {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.action-btn {
  font: inherit;
  font-size: var(--fs-12);
  height: 28px;
  padding: 0 var(--sp-3);
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--accent-on);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: var(--t-quick);
}
.action-btn:disabled {
  opacity: 0.45;
  cursor: default;
}
.action-secondary {
  background: var(--surface-raised);
  color: var(--text);
  border-color: var(--border);
}
.action-status {
  margin-left: auto;
  font-size: var(--fs-11);
  color: var(--text-muted);
}
</style>
