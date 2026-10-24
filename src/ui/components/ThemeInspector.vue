<script setup lang="ts">
import ThemePicker from './ThemePicker.vue'
import { themeList } from '../../core/themes'
import type { Theme } from '../../core/themes/types'

defineProps<{ theme: Theme; themeId: string; custom: boolean }>()
const emit = defineEmits<{
  (event: 'select', id: string): void
  (event: 'hover', id: string | null): void
  (event: 'advanced'): void
  (event: 'publish'): void
}>()
</script>

<template>
  <div class="theme-inspector">
    <section>
      <h2>当前主题 <span v-if="custom">已自定义</span></h2>
      <div class="current-theme">
        <div class="specimen" :style="{ background: theme.tokens.colors.bg, color: theme.tokens.colors.primary }" aria-hidden="true">文</div>
        <div class="theme-description"><strong>{{ theme.name }}</strong><p :title="theme.description">{{ theme.description }}</p></div>
      </div>
      <details class="theme-browser" @toggle="emit('hover', null)">
        <summary><span>全部主题 <span class="theme-count">{{ themeList.length }}</span></span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
        <ThemePicker :model-value="themeId" @update:model-value="emit('select', $event)" @hover="emit('hover', $event)" />
      </details>
    </section>
    <button class="advanced-link" type="button" @click="emit('advanced')"><span><strong>高级样式与变体</strong><span>调整字号、间距与组件变体</span></span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button>
  </div>
</template>

<style scoped>
.theme-inspector { display: flex; flex-direction: column; height: 100%; overflow-y: auto; padding: 22px 18px 16px; box-sizing: border-box; font-family: var(--font-text); font-size: var(--fs-13); }
section { min-width: 0; }
h2 { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin: 0 0 12px; color: var(--text-muted); font-size: var(--fs-12); font-weight: var(--fw-medium); }
h2 span { padding: 3px 6px; border-radius: var(--radius-1); background: var(--surface); font-size: var(--fs-11); color: var(--text-subtle); font-weight: 400; }
.current-theme { display: flex; align-items: center; gap: 13px; padding: 14px 12px; border: 1px solid var(--border); border-radius: var(--radius-2); background: var(--surface-raised); box-shadow: 0 2px 5px color-mix(in srgb, var(--text) 3%, transparent); }
.specimen { display: grid; place-items: center; flex: 0 0 46px; height: 62px; border-radius: var(--radius-1); font: 27px var(--font-display); }
.theme-description { min-width: 0; }
.theme-description strong { color: var(--text); font-size: var(--fs-15); font-weight: var(--fw-semibold); }
.theme-description p { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 6px 0 0; font-size: var(--fs-11); color: var(--text-muted); line-height: 1.65; }
.theme-browser { margin-top: 17px; }
.theme-browser summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 1px 12px; cursor: pointer; color: var(--text); font-size: var(--fs-12); font-weight: var(--fw-medium); }
.theme-browser summary::-webkit-details-marker { display: none; }
.theme-browser summary > span { display: inline-flex; align-items: center; gap: 7px; }
.theme-count { padding: 2px 5px; border-radius: var(--radius-1); background: var(--surface); color: var(--text-subtle); font-family: var(--font-mono); font-size: var(--fs-11); font-variant-numeric: tabular-nums; font-weight: var(--fw-regular); }
.theme-browser summary svg { color: var(--text-subtle); transform: rotate(-90deg); transition: transform var(--t-quick); }
.theme-browser[open] summary svg { transform: rotate(0); }
.theme-browser :deep(.theme-grid) { padding: 0 0 14px; gap: 10px; }
.advanced-link { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; padding: 17px 1px; border: 0; border-top: 1px solid var(--border); background: transparent; color: var(--text); font: inherit; text-align: left; cursor: pointer; }
.advanced-link strong { display: block; font-size: var(--fs-12); font-weight: var(--fw-medium); }
.advanced-link span > span { display: block; margin-top: 5px; color: var(--text-subtle); font-size: var(--fs-11); }
.advanced-link svg { flex: 0 0 auto; color: var(--text-subtle); }
.advanced-link:hover strong, .theme-browser summary:hover { color: var(--accent); }
.advanced-link:hover svg { color: var(--accent); }
button:focus-visible, summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
</style>
