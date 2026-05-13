<script setup lang="ts">
/**
 * 首次使用的浮层卡片 · 只出现一次（localStorage 记忆）
 *
 * 两套内容：桌面端讲快捷键（⌘K / ⌘↵ / ?）；移动端没有键盘，改指向工具栏上的按钮
 * （主题切换 / 复制 / 更多菜单）——免得新用户看见 "⌘K" 不知所云。
 * 切分依据：`(max-width: 767px)` 与 `.mobile-tabs` 在 App.vue 的断点保持一致。
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'dismiss'): void
  (e: 'openHelp'): void
  (e: 'openCommand'): void
  (e: 'openOverflow'): void
}>()

const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const modKey = isMac ? '⌘' : 'Ctrl'

const isMobile = ref(false)
let mq: MediaQueryList | null = null
function syncMobile() {
  isMobile.value = mq?.matches ?? false
}
onMounted(() => {
  mq = window.matchMedia('(max-width: 767px)')
  syncMobile()
  mq.addEventListener('change', syncMobile)
})
onUnmounted(() => {
  mq?.removeEventListener('change', syncMobile)
})

const heading = computed(() =>
  isMobile.value ? '三步开始写' : '三个键，走通 80% 动作',
)
</script>

<template>
  <aside class="onboard" role="note" aria-label="首次使用提示">
    <header class="onboard-head">
      <span class="onboard-kicker mono">WELCOME</span>
      <button class="close" title="不再显示" @click="emit('dismiss')">×</button>
    </header>
    <h4 class="onboard-title">{{ heading }}</h4>

    <!-- 桌面：讲快捷键 -->
    <ul v-if="!isMobile" class="onboard-list">
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

    <!-- 移动：讲工具栏按钮 -->
    <ul v-else class="onboard-list onboard-list--mobile">
      <li>
        <span class="pill">顶栏</span>
        <span>选 <strong>主题</strong>、打开 <strong>插入组件</strong>、<strong>自定义配色</strong></span>
      </li>
      <li>
        <span class="pill pill-accent">复制</span>
        <span>右上角 <strong>复制到公众号</strong> 按钮 —— 长按可直接粘贴到公众号后台</span>
      </li>
      <li>
        <button class="pill pill-btn" @click="emit('openOverflow')">⋯ 更多</button>
        <span>草稿管理 / 载入示例 / 导出 HTML MD / 快捷键帮助</span>
      </li>
      <li>
        <span class="pill">底栏</span>
        <span><strong>编辑 ⇄ 预览</strong> 切换；右半屏写完切过去检查效果</span>
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
.onboard-list--mobile li {
  align-items: flex-start;
  line-height: 1.5;
}
.onboard-list--mobile strong {
  color: var(--text);
  font-weight: var(--fw-bold);
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
.pill {
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 44px; height: 22px;
  padding: 0 8px;
  font-size: var(--fs-11);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
  color: var(--text-subtle);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-1);
}
.pill-accent {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}
.pill-btn {
  cursor: pointer;
  transition: var(--t-quick);
  font-family: var(--font-mono);
}
.pill-btn:hover { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
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

@media (max-width: 767px) {
  /* 贴到屏幕中部偏下，不被底部 tab 遮挡 */
  .onboard {
    right: var(--sp-3);
    left: var(--sp-3);
    bottom: calc(var(--mobile-tabs-h, 56px) + var(--sp-3));
    width: auto;
    max-width: 360px;
    margin: 0 auto;
  }
}
</style>
