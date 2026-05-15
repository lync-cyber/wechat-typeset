<script setup lang="ts">
/**
 * 主题选择网格（popover 内容体）
 *
 * 2 × N 小预览卡：显示主题名 + primary/secondary/accent 三色条 + 小标题示意。
 * 不再是 <select>，切换前用户就能看到色彩差异。
 *
 * Hover 临时预览：mouseenter → emit('hover', id)；mouseleave → emit('hover', null)。
 * App.vue 把这个事件接到 state.hoverThemeId，activeTheme 派生时优先级高于 customTheme。
 * 移动端没有 hover 事件，自然降级到 click 锁定路径，不需额外处理。
 */
import { computed, onBeforeUnmount } from 'vue'
import { themeList } from '../../core/themes'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'hover', id: string | null): void
}>()

// 缩略图仅读 token、不读 elements/containers CSSObject：避免被某主题硬编码 padding/margin 扭曲。
const options = computed(() =>
  themeList.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    primary: t.tokens.colors.primary,
    secondary: t.tokens.colors.secondary,
    accent: t.tokens.colors.accent,
    bg: t.tokens.colors.bg,
    bgSoft: t.tokens.colors.bgSoft,
    text: t.tokens.colors.text,
    textMuted: t.tokens.colors.textMuted,
    border: t.tokens.colors.border,
    tipAccent: t.tokens.colors.status.tip.accent,
    tipSoft: t.tokens.colors.status.tip.soft,
  })),
)

function pick(id: string) {
  if (id !== props.modelValue) emit('update:modelValue', id)
}

/**
 * hover 写入走 rAF 同帧合并：mouseenter 在快速划过网格时会高频触发，每次
 * 都同步触发 activeTheme → themeCSS → md re-render，链路里 generateThemeCSS
 * 即便命中缓存仍要走一次 vue 响应式开销。rAF 把同一帧内的多次写并成最后一
 * 次，划过中间格子不会被无意义渲染。
 *
 * enter/leave 走同一队列：rAF 内只取最新值，保证 leave 后能立即清回锁定主题，
 * 不会被前一次 enter 残留覆盖。
 */
let rafId: number | null = null
let pending: string | null = null

function scheduleHover(id: string | null) {
  pending = id
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    emit('hover', pending)
  })
}

function onEnter(id: string) {
  scheduleHover(id)
}
function onLeave() {
  scheduleHover(null)
}

onBeforeUnmount(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<template>
  <div class="theme-grid" @mouseleave="onLeave">
    <button
      v-for="o in options"
      :key="o.id"
      class="theme-card"
      :class="{ active: o.id === props.modelValue }"
      :title="o.description"
      @click="pick(o.id)"
      @mouseenter="onEnter(o.id)"
      @focus="onEnter(o.id)"
      @blur="onLeave"
    >
      <!--
        缩略图四段（对应主题最易辨识的 voice 槽位）：
          ① H2 标题（主色 + 下划色条）
          ② 引文（bgSoft 底 + 主色左条 + textMuted 字）
          ③ tip admonition（status.tip.soft 底 + status.tip.accent 左条）
          ④ 正文片段（text 色 + 微小 secondary 装饰）
      -->
      <span class="preview" :style="{ background: o.bg, color: o.text }">
        <span class="prev-h2" :style="{ color: o.primary, borderBottom: `2px solid ${o.primary}` }">H2 标题</span>
        <span
          class="prev-quote"
          :style="{
            background: o.bgSoft,
            borderLeft: `3px solid ${o.primary}`,
            color: o.textMuted,
          }"
        >引文示意</span>
        <span
          class="prev-tip"
          :style="{
            background: o.tipSoft,
            borderLeft: `3px solid ${o.tipAccent}`,
            color: o.tipAccent,
          }"
        >tip 提示</span>
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
/* 窄屏（移动端 popover 全屏化后）切换为单列，否则两列每张卡过窄 */
@media (max-width: 480px) {
  .theme-grid { grid-template-columns: 1fr; }
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
  display: flex; flex-direction: column;
  gap: 4px;
  padding: 8px var(--sp-3) 10px;
  font-family: var(--font-display);
  font-size: 10px;
  line-height: 1.4;
}
.prev-h2 {
  font-size: 11px;
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
  padding-bottom: 2px;
  align-self: flex-start;
}
.prev-quote,
.prev-tip {
  padding: 2px 6px;
  border-radius: 2px;
  font-size: 10px;
}
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
