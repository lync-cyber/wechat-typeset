<script setup lang="ts">
/**
 * 发文清单面板 —— 右抽屉第三档（components / customizer / checklist）。
 *
 * 职责：
 *   - 接 md 文本 → 调 buildChecklist() → 逐条渲染
 *   - 每条条目左侧画 status 圆点；hint 文本弱化灰显
 *   - 顶栏右侧给一个"关闭"按钮，与 ColorCustomizer 风格一致
 *
 * 为什么不做"一键修复"：
 *   检查项多半是"你写得对不对"层面（封面 / 摘要 / 字数），不是"工具能替你改"——
 *   自动改反而越权。唯一可能的例外是"一键把所有外链改为文末 recommend 列表"，
 *   那属于 #17 外链降级，独立任务。
 */
import { computed } from 'vue'
import { buildChecklist, type ChecklistItem } from '../publish/checklist'

const props = defineProps<{ md: string }>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const report = computed(() => buildChecklist(props.md))

const STATUS_DOT: Record<ChecklistItem['status'], string> = {
  pass: 'pass',
  warn: 'warn',
  fail: 'fail',
  info: 'info',
}
</script>

<template>
  <div class="panel">
    <header class="panel-head">
      <h3>发文前清单</h3>
      <button class="btn-text" @click="emit('close')">关闭</button>
    </header>
    <div class="hint">静态分析 · 封面 / 摘要 / 原创 / 外链 / 体积</div>

    <div class="panel-section summary">
      <div
        class="summary-dot"
        :class="report.pass ? 'summary-dot-pass' : 'summary-dot-warn'"
      />
      <div class="summary-text">
        {{
          report.pass
            ? '清单无阻断项，可以进入发稿流程'
            : '存在待处理项，建议修正后再发稿'
        }}
      </div>
    </div>

    <ul class="items">
      <li
        v-for="item in report.items"
        :key="item.id"
        class="item"
        :class="`status-${STATUS_DOT[item.status]}`"
      >
        <span class="item-dot" aria-hidden="true" />
        <div class="item-body">
          <div class="item-label">{{ item.label }}</div>
          <div v-if="item.hint" class="item-hint">{{ item.hint }}</div>
        </div>
      </li>
    </ul>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.panel-head h3 {
  margin: 0;
  font-size: var(--fs-14);
  font-weight: var(--fw-semibold);
}
.btn-text {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: var(--fs-12);
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

.summary {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}
.summary-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-pill);
  flex: 0 0 auto;
}
.summary-dot-pass { background: var(--success); }
.summary-dot-warn { background: var(--amber-500); }
.summary-text { font-size: var(--fs-13); color: var(--text); }

.items {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  flex: 1 1 auto;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  border-bottom: 1px solid var(--border);
}

.item-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-pill);
  margin-top: 6px;
  flex: 0 0 auto;
}

.status-pass .item-dot { background: var(--success); }
.status-warn .item-dot { background: var(--amber-500); }
.status-fail .item-dot { background: var(--danger); }
.status-info .item-dot { background: var(--text-subtle); }

.item-body {
  flex: 1 1 auto;
  min-width: 0;
}
.item-label {
  font-size: var(--fs-13);
  color: var(--text);
  line-height: 1.5;
}
.item-hint {
  margin-top: 4px;
  font-size: var(--fs-11);
  color: var(--text-muted);
  line-height: 1.55;
  word-break: break-word;
}

@media (max-width: 640px) {
  .panel { width: 100%; border-left: none; }
}
</style>
