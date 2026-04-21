<script setup lang="ts">
/**
 * 帮助 / 快捷键面板
 *
 * 数据源是 App.vue 登记的 Command 列表——一处登记，两处显示。
 * 另外附一小段"首次上手"提示。
 */
import type { Command } from './CommandPalette.vue'

const props = defineProps<{
  commands: Command[]
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

function groupedWithShortcut() {
  const map = new Map<string, Command[]>()
  props.commands
    .filter((c) => c.shortcut)
    .forEach((c) => {
      const bucket = map.get(c.group) ?? []
      bucket.push(c)
      map.set(c.group, bucket)
    })
  return Array.from(map.entries())
}

const groups = groupedWithShortcut()
</script>

<template>
  <div class="help-mask" @click.self="emit('close')">
    <div class="help-panel" role="dialog" aria-label="快捷键与帮助">
      <header class="help-head">
        <h3 class="tx-section">快捷键与帮助</h3>
        <button class="btn-text" @click="emit('close')">关闭</button>
      </header>

      <section class="help-intro">
        <div class="intro-line">
          <strong>wechat-typeset</strong> 是纯浏览器里的微信公众号 Markdown 排版工具。
        </div>
        <div class="intro-line">
          草稿保存在本地浏览器，切 tab / 关 tab 都不丢；一键复制后直接粘贴进公众号编辑器即可保留排版。
        </div>
      </section>

      <section class="help-shortcuts">
        <div v-for="[group, items] in groups" :key="group" class="shortcut-group">
          <div class="group-title mono">{{ group }}</div>
          <ul class="shortcut-list">
            <li v-for="c in items" :key="c.id" class="shortcut-item">
              <span class="item-title">{{ c.title }}</span>
              <span class="item-kbd mono">{{ c.shortcut }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="help-tips">
        <div class="tip-title mono">提示</div>
        <ul>
          <li>双击草稿标题可就地重命名。</li>
          <li>自定义配色改动即刻应用；切主题会还原为主题默认。</li>
          <li>复制失败时请改用 Chrome / Safari 或关闭跨域预览。</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.help-mask {
  position: fixed; inset: 0;
  background: rgba(14, 14, 10, 0.35);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.help-panel {
  width: min(560px, 92vw);
  max-height: 80vh;
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-modal);
  display: flex; flex-direction: column;
  overflow: hidden;
  font-family: var(--font-text);
  color: var(--text);
}
.help-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
.help-head h3 { margin: 0; font-size: var(--fs-15); font-weight: var(--fw-semibold); }
.btn-text {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: var(--fs-12);
}
.btn-text:hover { color: var(--text); }

.help-intro {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
  font-size: var(--fs-13);
  color: var(--text-muted);
  line-height: var(--lh-normal);
}
.intro-line + .intro-line { margin-top: 4px; }
.intro-line strong { color: var(--text); }

.help-shortcuts {
  padding: var(--sp-4) var(--sp-5);
  overflow-y: auto;
}
.shortcut-group + .shortcut-group { margin-top: var(--sp-4); }
.group-title {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: var(--sp-2);
}
.shortcut-list { list-style: none; margin: 0; padding: 0; }
.shortcut-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0;
  font-size: var(--fs-13);
  border-bottom: 1px dashed var(--border);
}
.shortcut-item:last-child { border-bottom: none; }
.item-kbd {
  font-size: var(--fs-12);
  color: var(--text-muted);
  letter-spacing: var(--ls-wide);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-1);
  padding: 2px 6px;
}

.help-tips {
  padding: var(--sp-4) var(--sp-5);
  border-top: 1px solid var(--border);
  background: var(--surface);
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.tip-title {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: var(--sp-2);
}
.help-tips ul { margin: 0; padding-left: var(--sp-4); }
.help-tips li + li { margin-top: 3px; }
</style>
