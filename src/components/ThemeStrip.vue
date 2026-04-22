<script setup lang="ts">
/**
 * Preview 顶部的 9 主题缩略条。
 *
 * 交互：
 *   - hover 某卡片 → 即时切换预览主题（emit('hover', id)）
 *   - mouseleave 当前卡片区 → hover=null，预览回落到当前锁定主题
 *   - click → 锁定主题（emit('select', id)），同步写回 baseThemeId
 *
 * 缩略卡信息：
 *   - 左侧：primary 色点（palette 签名，8px 直径）
 *   - 右侧：中文主题名（truncate 掉溢出）
 *
 * 外观：
 *   - 默认态：低对比 border + surface 底
 *   - hover / active：accent-soft 底 + accent border
 *   - 当前锁定态（activeId）：多一个 ·locked 小圆点做次级强调
 *
 * 不在此处做：宽度自适应滚动—— 9 主题 + mobile 两行布局已在 toolbar 处理；
 * 这里给 overflow-x: auto 当兜底，但正常视口不应横滚。
 */

import type { Theme } from '../themes/types'

const props = defineProps<{
  themes: readonly Theme[]
  /** 当前锁定的主题 id（click 的结果、持久化到 storage） */
  activeId: string
  /** 当前 hover 的主题 id（null = 未 hover） */
  hoverId: string | null
}>()

const emit = defineEmits<{
  (e: 'hover', id: string | null): void
  (e: 'select', id: string): void
}>()

function onEnter(id: string): void {
  emit('hover', id)
}
function onLeave(): void {
  emit('hover', null)
}
function onClick(id: string): void {
  emit('select', id)
}
</script>

<template>
  <div class="theme-strip" role="tablist" aria-label="主题缩略预览">
    <button
      v-for="t in props.themes"
      :key="t.id"
      class="theme-card"
      role="tab"
      :class="{
        active: t.id === props.activeId,
        hover: t.id === props.hoverId,
      }"
      :title="`切换到 ${t.name}`"
      :aria-selected="t.id === props.activeId"
      @mouseenter="onEnter(t.id)"
      @mouseleave="onLeave()"
      @focus="onEnter(t.id)"
      @blur="onLeave()"
      @click="onClick(t.id)"
    >
      <span class="swatch" :style="{ background: t.tokens.colors.primary }" />
      <span class="name">{{ t.name }}</span>
      <span v-if="t.id === props.activeId" class="lock-dot" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.theme-strip {
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  padding: 6px 8px;
  overflow-x: auto;
  background: var(--surface-raised);
  border-bottom: 1px solid var(--border);
  scrollbar-width: thin;
}

.theme-card {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: var(--radius-1);
  font: inherit;
  font-size: var(--fs-11);
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--t-quick);
}
.theme-card:hover,
.theme-card.hover {
  background: var(--accent-soft);
  border-color: var(--accent-soft);
  color: var(--text);
}
.theme-card.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}

.swatch {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-pill);
  flex: 0 0 auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.name {
  white-space: nowrap;
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lock-dot {
  width: 4px;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--accent);
  flex: 0 0 auto;
  margin-left: 2px;
}

@media (max-width: 640px) {
  .name { max-width: 48px; }
}
</style>
