<script setup lang="ts">
/**
 * PersonaStudio 内"色板 + 状态四色"编辑区
 *
 * 抽出动机：PersonaStudio.vue 原本把 11 项 palette + 4 类 status 的 color/hex
 * 双输入控件 inline 写在主模板，模板 + CSS 加起来 ~80 行。本组件聚合，
 * 让 PersonaStudio 主模板视觉聚焦在 typography / spacing / variants 等其他段。
 *
 * 数据：draft 是父 reactive 的 PersonaSpec.palette / status 子对象引用。
 * Vue 3 的响应式传递性允许子组件直接写 `palette[key]` 触发父端 watcher；
 * 不需要 emit('update:modelValue') 双向绑定样板。
 */
import type { PersonaSpec } from '../../../core/themes/_shared/spec'

defineProps<{
  palette: PersonaSpec['palette']
  status: PersonaSpec['status']
}>()

// 11 项 palette；保持与项目里 ColorCustomizer / theme tokens 同序，作者
// 切换面板时不需要重新建立心智模型
const PALETTE_KEYS = [
  ['primary', '主色'],
  ['secondary', '次色'],
  ['accent', '点睛色'],
  ['bg', '正文底色'],
  ['bgSoft', '柔底（intro / quote 等）'],
  ['bgMuted', '极柔底（inline code）'],
  ['text', '正文文本'],
  ['textMuted', '次要文本（脚注 / hint）'],
  ['textInverse', '反白文本（暗底主题）'],
  ['border', '描边 / divider'],
  ['code', 'inline code 文本色'],
] as const

const STATUS_KEYS = [
  ['tip', 'tip · 提示'],
  ['info', 'info · 信息'],
  ['warning', 'warning · 警告'],
  ['danger', 'danger · 危险'],
] as const
</script>

<template>
  <div class="palette-editor">
    <details class="section" open>
      <summary class="section-title">色板 · palette</summary>
      <label v-for="[key, label] in PALETTE_KEYS" :key="key" class="color-row">
        <span class="row-label">{{ label }}</span>
        <input
          type="color"
          :value="palette[key]"
          @input="palette[key] = ($event.target as HTMLInputElement).value"
        />
        <input
          class="hex-input"
          type="text"
          :value="palette[key]"
          @input="palette[key] = ($event.target as HTMLInputElement).value"
        />
      </label>
    </details>

    <details class="section">
      <summary class="section-title">状态四色 · status</summary>
      <div v-for="[key, label] in STATUS_KEYS" :key="key" class="status-block">
        <div class="status-label">{{ label }}</div>
        <label class="color-row">
          <span class="row-label">accent</span>
          <input
            type="color"
            :value="status[key].accent"
            @input="status[key].accent = ($event.target as HTMLInputElement).value"
          />
          <input
            class="hex-input"
            type="text"
            :value="status[key].accent"
            @input="status[key].accent = ($event.target as HTMLInputElement).value"
          />
        </label>
        <label class="color-row">
          <span class="row-label">soft</span>
          <input
            type="color"
            :value="status[key].soft"
            @input="status[key].soft = ($event.target as HTMLInputElement).value"
          />
          <input
            class="hex-input"
            type="text"
            :value="status[key].soft"
            @input="status[key].soft = ($event.target as HTMLInputElement).value"
          />
        </label>
      </div>
    </details>
  </div>
</template>

<style scoped>
.section {
  margin: var(--sp-3) 0;
  padding: var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: var(--surface-raised);
}
.section-title {
  font-size: var(--fs-13);
  font-weight: var(--fw-medium);
  color: var(--text);
  cursor: pointer;
  user-select: none;
}
.color-row {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) 0;
  font-size: var(--fs-12);
}
.color-row input[type="color"] {
  width: 32px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: none;
  cursor: pointer;
}
.row-label {
  flex: 0 0 auto;
  min-width: 120px;
  color: var(--text-muted);
}
.hex-input {
  flex: 0 1 96px;
  height: 26px;
  padding: 0 var(--sp-2);
  font-family: var(--font-mono);
  font-size: var(--fs-11);
  text-transform: uppercase;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: var(--surface-raised);
  color: var(--text);
}
.status-block {
  margin-top: var(--sp-2);
  padding-top: var(--sp-2);
  border-top: 1px dashed var(--border);
}
.status-block:first-of-type {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}
.status-label {
  font-size: var(--fs-11);
  color: var(--text-muted);
  margin-bottom: 2px;
}
</style>
