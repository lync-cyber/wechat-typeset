<script setup lang="ts">
/**
 * PatchInspector —— 把 wechat 平台 inspect() 输出的 PatchLog 暴露到 UI（步骤 6）。
 *
 * 与主 Preview.vue 的 transparency-strip 区别：
 *   - 主 Preview 给"日常排版"的整稿渲染用，只显示 count（节省纵向空间）
 *   - 本组件给 component-studio 的"编辑容器变体"场景用：默认展开，逐条显示 sample diff
 *     让作者立刻看到"你写的 X 会在公众号被剥成 ..."
 *
 * 不持有 storage，不主动 watch；纯 prop 驱动。父组件（ComponentPreview / 主 Preview）
 * 把当前渲染产物的 patchLog 传进来即可。
 */
import { computed } from 'vue'
import type {
  PatchLog,
  PatchLogEntry,
  PatchLogSample,
} from '../../../core/pipeline/platforms/types'

const props = defineProps<{
  patchLog: PatchLog | null
  /**
   * 是否提供"点击 sample 跳转源码"affordance。
   *   - true（SourceModePanel 用）：sample 行显 pointer + hover，且发 'click-sample'
   *   - false / 缺省（主 Preview / ComponentPreview 用）：仅展示，不发事件
   * 让父组件按使用场景决定 UX，避免在无 CSS 编辑器的场景里给用户假承诺。
   */
  clickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'click-sample', sample: PatchLogSample): void
}>()

function onSampleClick(s: PatchLogSample): void {
  if (!props.clickable) return
  emit('click-sample', s)
}

const hasContent = computed<boolean>(() => {
  if (!props.patchLog) return false
  return props.patchLog.total > 0
})

const groupedEntries = computed<PatchLogEntry[]>(() => {
  return props.patchLog?.entries ?? []
})
</script>

<template>
  <div class="patch-inspector" :class="{ empty: !hasContent }">
    <div class="head">
      <span class="dot" />
      <span class="head-text">
        <template v-if="hasContent">
          本次渲染对 HTML 做了 <b>{{ props.patchLog?.total }}</b> 处微信适配
        </template>
        <template v-else>
          渲染透明度 · 无适配
        </template>
      </span>
    </div>
    <ul v-if="hasContent" class="entries">
      <li v-for="(entry, i) in groupedEntries" :key="i" class="entry">
        <div class="entry-head">
          <code class="patch-name mono">{{ entry.patch }}</code>
          <span class="label">{{ entry.label }}</span>
          <span class="count mono">× {{ entry.count }}</span>
        </div>
        <ul v-if="entry.samples && entry.samples.length > 0" class="samples">
          <li
            v-for="(s, j) in entry.samples"
            :key="j"
            :class="['sample', { clickable: props.clickable }]"
            :role="props.clickable ? 'button' : undefined"
            :tabindex="props.clickable ? 0 : undefined"
            @click="onSampleClick(s)"
            @keydown.enter.prevent="onSampleClick(s)"
            @keydown.space.prevent="onSampleClick(s)"
          >
            <code class="selector mono">{{ s.selector }}</code>
            <span class="arrow">→</span>
            <code class="before mono">{{ s.before }}</code>
          </li>
          <li v-if="entry.count > entry.samples.length" class="more">
            ...还有 {{ entry.count - entry.samples.length }} 处
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.patch-inspector {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  padding: var(--sp-3);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  font-size: var(--fs-11);
}
.patch-inspector.empty {
  background: transparent;
  border-style: dashed;
  color: var(--text-subtle);
}
.head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.head-text b { color: var(--text); font-weight: var(--fw-medium); }
.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-pill);
  background: var(--accent);
  flex: 0 0 auto;
}
.patch-inspector.empty .dot { background: var(--text-subtle); }
.entries {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.entry {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--sp-2);
  border-radius: var(--radius-1, 2px);
  background: var(--surface);
}
.entry-head {
  display: flex;
  align-items: baseline;
  gap: var(--sp-2);
  flex-wrap: wrap;
}
.patch-name {
  font-size: 10px;
  color: var(--accent);
  background: var(--surface-raised);
  padding: 1px 4px;
  border-radius: var(--radius-1, 2px);
}
.label { flex: 1 1 auto; color: var(--text); }
.count {
  color: var(--text-muted);
  font-size: 10px;
  font-feature-settings: var(--font-feat-num);
}
.samples {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: var(--sp-3);
  border-left: 2px solid var(--border);
}
.sample {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 10px;
  color: var(--text-muted);
}
.sample.clickable {
  cursor: pointer;
  border-radius: var(--radius-1, 2px);
  padding: 2px 4px;
  margin: 0 -4px;
  transition: background-color 0.12s ease;
}
.sample.clickable:hover {
  background: var(--surface-raised);
}
.sample.clickable:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
.selector { color: var(--text-subtle); }
.arrow { color: var(--text-subtle); }
.before {
  color: var(--text);
  background: var(--surface-raised);
  padding: 1px 4px;
  border-radius: var(--radius-1, 2px);
  word-break: break-all;
}
.more {
  font-size: 10px;
  color: var(--text-subtle);
  font-style: italic;
}
</style>
