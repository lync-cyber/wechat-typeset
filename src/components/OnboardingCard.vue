<script setup lang="ts">
/**
 * 首次使用的浮层卡片 · 只出现一次（localStorage 记忆）
 *
 * 不走模态遮罩——贴在右下角，不挡编辑器，用户可以一边读一边写。
 */
const emit = defineEmits<{
  (e: 'dismiss'): void
  (e: 'openHelp'): void
  (e: 'openCommand'): void
}>()

const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'
</script>

<template>
  <aside class="onboard" role="note" aria-label="首次使用提示">
    <header class="onboard-head">
      <span class="onboard-kicker mono">WELCOME</span>
      <button class="close" title="不再显示" @click="emit('dismiss')">×</button>
    </header>
    <h4 class="onboard-title">三个键，走通 80% 动作</h4>
    <ul class="onboard-list">
      <li>
        <button class="kbd-btn mono" @click="emit('openCommand')">{{ modKey }} K</button>
        <span>打开命令面板，搜索一切动作</span>
      </li>
      <li>
        <span class="kbd mono">{{ modKey }} ↵</span>
        <span>复制排版后的富文本</span>
      </li>
      <li>
        <button class="kbd-btn mono" @click="emit('openHelp')">?</button>
        <span>查看全部快捷键</span>
      </li>
    </ul>
    <button class="dismiss" @click="emit('dismiss')">明白了</button>
  </aside>
</template>

<style scoped>
.onboard {
  position: absolute;
  right: var(--sp-5);
  bottom: var(--sp-5);
  width: 300px;
  padding: var(--sp-4) var(--sp-5);
  background: var(--surface-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-lift);
  font-family: var(--font-text);
  color: var(--text);
  z-index: 20;
  animation: onboard-in var(--dur-settled) var(--ease-craft);
}
@keyframes onboard-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.onboard-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--sp-2);
}
.onboard-kicker {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  color: var(--accent);
}
.close {
  background: none; border: none; cursor: pointer;
  color: var(--text-subtle); font-size: var(--fs-17); line-height: 1;
  padding: 0; width: 20px; height: 20px;
}
.close:hover { color: var(--text); }
.onboard-title {
  margin: 0 0 var(--sp-3);
  font-family: var(--font-display);
  font-size: var(--fs-17);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
}
.onboard-list {
  list-style: none; margin: 0 0 var(--sp-3); padding: 0;
  display: flex; flex-direction: column; gap: 8px;
}
.onboard-list li {
  display: flex; align-items: center; gap: var(--sp-3);
  font-size: var(--fs-12);
  color: var(--text-muted);
}
.kbd, .kbd-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 36px; height: 22px;
  padding: 0 6px;
  font-family: var(--font-mono);
  font-size: var(--fs-12);
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: var(--radius-1);
}
.kbd-btn { cursor: pointer; transition: var(--t-quick); }
.kbd-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
.dismiss {
  width: 100%;
  height: 28px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  cursor: pointer;
}
.dismiss:hover { background: var(--surface-alt); }
</style>
