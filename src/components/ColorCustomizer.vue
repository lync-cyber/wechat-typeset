<script setup lang="ts">
/**
 * 配色自定义面板
 *
 * 工作流：
 *   1. 预设十套 palette 网格可点
 *   2. 三个色选器（primary / secondary / accent）+ dark toggle
 *   3. 每次 seed 改动 debounce 120ms → emit('apply', seed)，主区域实时重渲染
 *   4. 实时显示 primary 与推导 bg 的 WCAG 对比度，不过关时给红字警示
 *   5. 提供"还原为主题默认"按钮，一键去掉自定义层
 */
import { onBeforeUnmount, reactive, watch } from 'vue'
import { palettePresets } from '../color/palettes'
import { checkContrast, derivePalette, seedFromPrimary } from '../color/generator'

interface Seed {
  primary: string
  secondary: string
  accent: string
  dark: boolean
}

const props = defineProps<{ hasCustomColor: boolean }>()
const emit = defineEmits<{
  (e: 'apply', value: Seed): void
  (e: 'reset'): void
  (e: 'close'): void
}>()

const seed = reactive<Seed>({
  primary: '#a83420',
  secondary: '#6a6655',
  accent: '#46573f',
  dark: false,
})

const state = reactive({
  previewBg: '#ffffff',
  contrastRatio: 0,
  contrastPass: true,
})

let applyTimer: number | null = null

watch(
  () => [seed.primary, seed.secondary, seed.accent, seed.dark],
  () => {
    const derived = derivePalette(seed)
    state.previewBg = derived.bg
    const { pass, ratio } = checkContrast(seed.primary, derived.bg)
    state.contrastPass = pass
    state.contrastRatio = ratio

    if (applyTimer !== null) window.clearTimeout(applyTimer)
    applyTimer = window.setTimeout(() => emit('apply', { ...seed }), 120)
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (applyTimer !== null) window.clearTimeout(applyTimer)
})

function pick(p: (typeof palettePresets)[number]) {
  seed.primary = p.primary
  seed.secondary = p.secondary
  seed.accent = p.accent
  seed.dark = Boolean(p.dark)
}

function autoCompleteFromPrimary() {
  const s = seedFromPrimary(seed.primary, seed.dark)
  seed.secondary = s.secondary
  seed.accent = s.accent
}

function resetToTheme() {
  emit('reset')
}
</script>

<template>
  <div class="panel">
    <header class="panel-head">
      <h3 class="tx-section">自定义配色</h3>
      <button class="btn-text" @click="emit('close')">关闭</button>
    </header>

    <div class="hint mono">
      <span>改动即刻应用；切主题会重置。</span>
    </div>

    <section class="panel-section">
      <div class="section-title">预设调色板</div>
      <div class="preset-grid">
        <button
          v-for="p in palettePresets"
          :key="p.id"
          class="preset"
          :title="p.description"
          @click="pick(p)"
        >
          <span class="preset-swatches">
            <span class="swatch" :style="{ background: p.primary }" />
            <span class="swatch" :style="{ background: p.secondary }" />
            <span class="swatch" :style="{ background: p.accent }" />
          </span>
          <span class="preset-name">{{ p.name }}</span>
        </button>
      </div>
    </section>

    <section class="panel-section">
      <div class="section-title">三色 seed</div>
      <div class="field-row">
        <label class="field">
          <span class="field-label">主色</span>
          <input type="color" v-model="seed.primary" />
          <code class="mono">{{ seed.primary }}</code>
        </label>
        <label class="field">
          <span class="field-label">辅色</span>
          <input type="color" v-model="seed.secondary" />
          <code class="mono">{{ seed.secondary }}</code>
        </label>
        <label class="field">
          <span class="field-label">点缀</span>
          <input type="color" v-model="seed.accent" />
          <code class="mono">{{ seed.accent }}</code>
        </label>
      </div>
      <div class="field-row inline">
        <label class="toggle">
          <input type="checkbox" v-model="seed.dark" /> 暗底主题
        </label>
        <button class="btn btn-ghost" @click="autoCompleteFromPrimary">由主色补全</button>
      </div>
    </section>

    <section class="panel-section">
      <div class="section-title">对比度</div>
      <div class="check mono" :class="{ fail: !state.contrastPass }">
        primary × bg =
        <strong>{{ state.contrastRatio.toFixed(1) }}</strong>
        <span v-if="state.contrastPass" class="check-ok">通过 WCAG AA 3.0</span>
        <span v-else class="check-bad">低于 3.0 · 可读性差</span>
      </div>
    </section>

    <footer class="panel-foot">
      <button
        class="btn btn-ghost wide"
        :disabled="!props.hasCustomColor"
        @click="resetToTheme"
      >还原为主题默认</button>
    </footer>
  </div>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  background: var(--surface-raised);
  width: var(--drawer-w-md);
  height: 100%;
  font-family: var(--font-text);
  font-size: var(--fs-13);
  color: var(--text);
  border-left: 1px solid var(--border);
}
.panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.panel-head h3 { margin: 0; font-size: var(--fs-14); font-weight: var(--fw-semibold); }
.btn-text {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: var(--fs-12);
}
.btn-text:hover { color: var(--text); }

.hint {
  padding: var(--sp-2) var(--sp-5);
  color: var(--text-subtle);
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.panel-section {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.section-title {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: var(--sp-3);
}

.preset-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-2);
}
.preset {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: 6px var(--sp-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  cursor: pointer;
  font-size: var(--fs-12);
  color: var(--text);
  text-align: left;
  transition: var(--t-quick);
}
.preset:hover { border-color: var(--accent); }
.preset-swatches { display: inline-flex; gap: 2px; }
.swatch {
  display: inline-block; width: 12px; height: 12px;
  border-radius: 2px; border: 1px solid rgba(0, 0, 0, 0.08);
}
.preset-name { flex: 1 1 auto; }

.field-row {
  display: flex; flex-wrap: wrap; gap: var(--sp-3);
  align-items: center;
  margin-bottom: var(--sp-3);
}
.field-row:last-child { margin-bottom: 0; }
.field-row.inline { gap: var(--sp-4); }
.field { display: inline-flex; align-items: center; gap: 6px; }
.field-label { color: var(--text-muted); font-size: var(--fs-12); }
.field input[type="color"] {
  width: 32px; height: 24px; padding: 0;
  border: 1px solid var(--border); border-radius: var(--radius-1);
  cursor: pointer; background: transparent;
}
.field code { font-size: var(--fs-11); color: var(--text-subtle); }
.toggle { display: inline-flex; align-items: center; gap: 4px; font-size: var(--fs-12); color: var(--text); }

.btn {
  height: 26px; padding: 0 var(--sp-3);
  font-size: var(--fs-12);
  border-radius: var(--radius-2);
  cursor: pointer;
  font-family: var(--font-text);
}
.btn-ghost { background: var(--surface-raised); color: var(--text); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--surface); }
.btn-ghost:disabled { color: var(--text-subtle); cursor: not-allowed; }
.btn-ghost:disabled:hover { background: var(--surface-raised); }
.btn.wide { width: 100%; height: 32px; }

.check {
  padding: var(--sp-3);
  background: var(--success-soft);
  color: var(--success);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
}
.check.fail { background: var(--danger-soft); color: var(--danger); }
.check strong { font-family: var(--font-mono); font-weight: var(--fw-bold); }
.check-ok, .check-bad { opacity: .8; font-size: var(--fs-11); letter-spacing: var(--ls-wide); }

.panel-foot {
  padding: var(--sp-4) var(--sp-5);
  margin-top: auto;
  border-top: 1px solid var(--border);
}
</style>
