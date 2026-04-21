<script setup lang="ts">
/**
 * ⌘K 命令面板
 *
 * 单一通道，把所有 Toolbar 动作 + 草稿切换 + 主题切换汇聚到可搜索列表。
 * 命令在父组件登记一次，两处复用（面板 + 帮助）。
 *
 * 交互：
 *   - ↑/↓ 选择；Enter 执行；Esc 关闭
 *   - 输入自动筛选（title / group / keywords）
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'

export interface Command {
  id: string
  title: string
  group: string
  shortcut?: string
  keywords?: string
  run: () => void
}

const props = defineProps<{
  commands: Command[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const query = ref('')
const activeIdx = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLUListElement | null>(null)

const filtered = computed<Command[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.commands
  return props.commands.filter((c) => {
    const hay = `${c.title} ${c.group} ${c.keywords ?? ''} ${c.shortcut ?? ''}`.toLowerCase()
    return hay.includes(q)
  })
})

watch(filtered, () => {
  activeIdx.value = 0
})

onMounted(() => {
  void nextTick(() => inputRef.value?.focus())
})

function onKey(ev: KeyboardEvent) {
  if (ev.key === 'Escape') {
    ev.preventDefault()
    emit('close')
    return
  }
  if (ev.key === 'ArrowDown') {
    ev.preventDefault()
    activeIdx.value = Math.min(activeIdx.value + 1, filtered.value.length - 1)
    scrollIntoView()
    return
  }
  if (ev.key === 'ArrowUp') {
    ev.preventDefault()
    activeIdx.value = Math.max(activeIdx.value - 1, 0)
    scrollIntoView()
    return
  }
  if (ev.key === 'Enter') {
    ev.preventDefault()
    const cmd = filtered.value[activeIdx.value]
    if (cmd) {
      cmd.run()
      emit('close')
    }
  }
}

function scrollIntoView() {
  void nextTick(() => {
    const el = listRef.value?.querySelector<HTMLElement>(`[data-idx="${activeIdx.value}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function run(cmd: Command) {
  cmd.run()
  emit('close')
}

/** 按 group 分桶，保持输入顺序 */
const grouped = computed(() => {
  const map = new Map<string, Command[]>()
  filtered.value.forEach((c) => {
    const bucket = map.get(c.group) ?? []
    bucket.push(c)
    map.set(c.group, bucket)
  })
  return Array.from(map.entries())
})

function indexOf(cmd: Command): number {
  return filtered.value.indexOf(cmd)
}
</script>

<template>
  <div class="cmd-mask" @click.self="emit('close')">
    <div class="cmd-panel" role="dialog" aria-label="命令面板" @keydown="onKey">
      <div class="cmd-head">
        <span class="cmd-icon">⌘</span>
        <input
          ref="inputRef"
          v-model="query"
          class="cmd-input"
          type="text"
          placeholder="搜索命令、草稿、主题…"
          @keydown="onKey"
        />
        <span class="cmd-hint mono">↵ 执行 · Esc 关闭</span>
      </div>
      <ul ref="listRef" class="cmd-list">
        <template v-for="[group, items] in grouped" :key="group">
          <li class="cmd-group mono">{{ group }}</li>
          <li
            v-for="cmd in items"
            :key="cmd.id"
            class="cmd-item"
            :class="{ active: indexOf(cmd) === activeIdx }"
            :data-idx="indexOf(cmd)"
            @mouseenter="activeIdx = indexOf(cmd)"
            @click="run(cmd)"
          >
            <span class="cmd-title">{{ cmd.title }}</span>
            <span v-if="cmd.shortcut" class="cmd-kbd">{{ cmd.shortcut }}</span>
          </li>
        </template>
        <li v-if="filtered.length === 0" class="cmd-empty">没有匹配的命令</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cmd-mask {
  position: fixed; inset: 0;
  background: rgba(14, 14, 10, 0.35);
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 12vh;
  z-index: 100;
}
.cmd-panel {
  width: min(620px, 92vw);
  max-height: 64vh;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  display: flex; flex-direction: column;
  overflow: hidden;
  font-family: var(--font-text);
  color: var(--text);
}
.cmd-head {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.cmd-icon {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: var(--fs-17);
}
.cmd-input {
  flex: 1 1 auto;
  height: 32px;
  border: none; outline: none; background: transparent;
  font: inherit;
  font-size: var(--fs-15);
  color: var(--text);
}
@media (max-width: 767px) {
  .cmd-input { font-size: 16px; height: 40px; }
  .cmd-item { padding: 12px var(--sp-5); min-height: 44px; }
  .cmd-panel { max-height: 80vh; }
  .cmd-mask { padding-top: 6vh; }
}
.cmd-input::placeholder { color: var(--text-subtle); }
.cmd-hint {
  color: var(--text-subtle);
  font-size: var(--fs-11);
  letter-spacing: var(--ls-wide);
}

.cmd-list {
  list-style: none; margin: 0; padding: var(--sp-2) 0;
  overflow-y: auto;
  flex: 1 1 auto;
}
.cmd-group {
  padding: var(--sp-3) var(--sp-5) 4px;
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.cmd-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px var(--sp-5);
  cursor: pointer;
  font-size: var(--fs-13);
}
.cmd-item.active { background: var(--accent-soft); }
.cmd-item.active .cmd-title { color: var(--accent); font-weight: var(--fw-medium); }
.cmd-title { color: var(--text); }
.cmd-kbd {
  display: inline-flex; align-items: center; justify-content: center;
  height: 18px; padding: 0 6px;
  font-family: var(--font-mono); font-size: var(--fs-11);
  color: var(--text-muted);
  background: var(--surface);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-1);
}
.cmd-empty {
  padding: var(--sp-5);
  text-align: center;
  color: var(--text-muted);
  font-size: var(--fs-13);
}
</style>
