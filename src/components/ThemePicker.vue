<script setup lang="ts">
/**
 * 主题选择网格（popover 内容体）
 *
 * 2 × N 小预览卡：显示主题名 + primary/secondary/accent 三色条 + 小标题示意。
 * 不再是 <select>，切换前用户就能看到色彩差异。
 */
import { computed } from 'vue'
import { themeList } from '../themes'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const options = computed(() =>
  themeList.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    primary: t.tokens.colors.primary,
    secondary: t.tokens.colors.secondary,
    accent: t.tokens.colors.accent,
    bg: t.tokens.colors.bg,
    text: t.tokens.colors.text,
  })),
)

function pick(id: string) {
  if (id !== props.modelValue) emit('update:modelValue', id)
}
</script>

<template>
  <div class="theme-grid">
    <button
      v-for="o in options"
      :key="o.id"
      class="theme-card"
      :class="{ active: o.id === props.modelValue }"
      :title="o.description"
      @click="pick(o.id)"
    >
      <span class="preview" :style="{ background: o.bg, color: o.text }">
        <span class="preview-title" :style="{ color: o.primary }">标题</span>
        <span class="preview-bar" :style="{ background: o.secondary }" />
      </span>
      <span class="card-foot">
        <span class="card-name">{{ o.name }}</span>
        <span class="swatches">
          <span class="sw" :style="{ background: o.primary }" />
          <span class="sw" :style="{ background: o.secondary }" />
          <span class="sw" :style="{ background: o.accent }" />
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-3);
  padding: var(--sp-2);
}
.theme-card {
  display: flex; flex-direction: column;
  padding: 0;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  cursor: pointer;
  overflow: hidden;
  transition: var(--t-quick);
  text-align: left;
}
.theme-card:hover { border-color: var(--border-strong); }
.theme-card.active { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent) inset; }
.preview {
  display: flex; flex-direction: column; justify-content: space-between;
  height: 64px;
  padding: var(--sp-3);
  font-family: var(--font-display);
  font-size: var(--fs-12);
}
.preview-title { font-weight: var(--fw-bold); letter-spacing: var(--ls-tight); }
.preview-bar { display: block; height: 3px; border-radius: var(--radius-pill); width: 60%; }
.card-foot {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px var(--sp-3);
  border-top: 1px solid var(--border);
  background: var(--surface);
}
.card-name {
  font-size: var(--fs-12);
  font-weight: var(--fw-medium);
  color: var(--text);
}
.swatches { display: inline-flex; gap: 3px; }
.sw {
  width: 10px; height: 10px; border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
