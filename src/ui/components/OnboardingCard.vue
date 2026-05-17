<script setup lang="ts">
/**
 * 首次使用的引导卡 · 三步 coachmark（卡片文案 + 目标按钮挂 .onboard-spotlight 脉冲 ring）。
 *
 * spotlight 类用全局 unscoped <style>：目标按钮 DOM 在 Toolbar 内、不属本组件作用域。
 * 卡片 dismiss / unmount 时主动清理所有 .onboard-spotlight，避免残留高亮。
 */
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { MOBILE_MEDIA_QUERY } from '../../app/layoutMode'
import { modKey } from '../composables/usePlatformKey'

const emit = defineEmits<{
  (e: 'dismiss'): void
  (e: 'openHelp'): void
}>()

const isMobile = ref(false)
let mq: MediaQueryList | null = null
function syncMobile() {
  isMobile.value = mq?.matches ?? false
}

// 三步引导
const step = ref<0 | 1 | 2>(0)
const totalSteps = 3

interface Step {
  /** 目标按钮 CSS 选择器（spotlight 锚点）；null 表示该 step 不挂高亮 */
  anchor: string | null
  /** 步骤短标题 */
  title: string
  /** 主体说明 */
  body: string
  /** 下一步按钮文案 */
  next: string
}

const desktopSteps: readonly Step[] = [
  {
    anchor: '.btn-theme',
    title: '① 先选主题',
    body: '点工具栏的「主题名」按钮，主题决定配色、字距、装饰；切换瞬时生效。',
    next: '下一步 →',
  },
  {
    anchor: '.btn-insert',
    title: '② 插入排版块',
    body: '点「+ 插入」打开组件库——提示块、金句卡、步骤、对比……一键插光标处。',
    next: '下一步 →',
  },
  {
    anchor: '.btn-copy-main',
    title: '③ 一键复制到公众号',
    body: `按 ${modKey} ↵ 或点工具栏「一键复制」，回到公众号编辑器粘贴即可。`,
    next: '完成',
  },
]

const mobileSteps: readonly Step[] = [
  {
    anchor: '.btn-theme',
    title: '① 先选主题',
    body: '点上方「主题名」选不同视觉气质；预览实时更新。',
    next: '下一步 →',
  },
  {
    anchor: '.btn-insert',
    title: '② 插入排版块',
    body: '点「+」插入提示块 / 金句卡 / 步骤等公众号常用版式。',
    next: '下一步 →',
  },
  {
    // 移动端 hero 复制按钮在底部 tab bar
    anchor: '.mobile-tab-copy',
    title: '③ 一键复制',
    body: '底部「一键复制」按钮把富文本复制到剪贴板，去公众号粘贴即可。',
    next: '完成',
  },
]

const steps = computed(() => (isMobile.value ? mobileSteps : desktopSteps))
const current = computed<Step>(() => steps.value[step.value])

const SPOTLIGHT_CLASS = 'onboard-spotlight'

function clearAllSpotlights() {
  document.querySelectorAll(`.${SPOTLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(SPOTLIGHT_CLASS)
  })
}

function applySpotlight(selector: string | null) {
  clearAllSpotlights()
  if (!selector) return
  const el = document.querySelector(selector)
  el?.classList.add(SPOTLIGHT_CLASS)
}

const nextBtnRef = ref<HTMLButtonElement | null>(null)

function focusNextBtn() {
  // 让键盘用户 Enter / Space 就能推到下一步，不必从卡顶 Tab 几次
  void nextTick(() => nextBtnRef.value?.focus())
}

function gotoStep(next: number) {
  if (next >= totalSteps) {
    dismiss()
    return
  }
  step.value = next as 0 | 1 | 2
  applySpotlight(current.value.anchor)
  focusNextBtn()
}

function dismiss() {
  clearAllSpotlights()
  emit('dismiss')
}

onMounted(() => {
  mq = window.matchMedia(MOBILE_MEDIA_QUERY)
  syncMobile()
  mq.addEventListener('change', syncMobile)
  applySpotlight(current.value.anchor)
  focusNextBtn()
})

onUnmounted(() => {
  mq?.removeEventListener('change', syncMobile)
  // 卡片被外部 v-if 拆掉时也清掉高亮
  clearAllSpotlights()
})
</script>

<template>
  <aside class="onboard" role="note" aria-label="首次使用引导">
    <header class="onboard-head">
      <span class="onboard-kicker mono">WELCOME · {{ step + 1 }}/{{ totalSteps }}</span>
      <button class="close" title="不再显示" aria-label="不再显示" @click="dismiss">×</button>
    </header>
    <h4 class="onboard-title">{{ current.title }}</h4>
    <p class="onboard-body">{{ current.body }}</p>

    <div class="onboard-dots" role="tablist" aria-label="引导步骤">
      <button
        v-for="i in totalSteps"
        :key="i"
        type="button"
        role="tab"
        class="onboard-dot"
        :class="{ active: i - 1 === step }"
        :aria-selected="i - 1 === step"
        :aria-label="`第 ${i} 步`"
        @click="gotoStep(i - 1)"
      />
    </div>

    <div class="onboard-actions">
      <button class="onboard-skip" type="button" @click="dismiss">跳过</button>
      <button
        ref="nextBtnRef"
        class="onboard-next"
        type="button"
        @click="gotoStep(step + 1)"
      >
        {{ current.next }}
      </button>
    </div>

    <p v-if="step === 0" class="onboard-foot">
      想直接看快捷键？
      <button class="onboard-link" type="button" @click="emit('openHelp'); dismiss()">打开帮助</button>
    </p>
  </aside>
</template>

<style scoped>
.onboard {
  position: absolute;
  right: var(--sp-5);
  bottom: var(--sp-5);
  width: 320px;
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
  margin: 0 0 var(--sp-2);
  font-family: var(--font-display);
  font-size: var(--fs-15);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-tight);
}
.onboard-body {
  margin: 0 0 var(--sp-3);
  font-size: var(--fs-12);
  color: var(--text-muted);
  line-height: 1.55;
}
.onboard-dots {
  display: inline-flex;
  gap: 6px;
  margin-bottom: var(--sp-3);
}
.onboard-dot {
  width: 18px;
  height: 6px;
  border-radius: var(--radius-pill);
  border: none;
  background: var(--surface-alt);
  cursor: pointer;
  padding: 0;
  transition: var(--t-quick);
}
.onboard-dot:hover { background: var(--border-strong); }
.onboard-dot.active { background: var(--accent); }

.onboard-actions {
  display: flex;
  gap: var(--sp-2);
}
.onboard-skip {
  flex: 0 0 auto;
  padding: 0 var(--sp-3);
  height: 30px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  font-family: inherit;
  cursor: pointer;
  transition: var(--t-quick);
}
.onboard-skip:hover { background: var(--surface); color: var(--text); }
.onboard-next {
  flex: 1 1 auto;
  height: 30px;
  background: var(--accent);
  border: 1px solid var(--accent);
  color: var(--accent-on);
  border-radius: var(--radius-2);
  font-size: var(--fs-12);
  font-weight: var(--fw-medium);
  font-family: inherit;
  cursor: pointer;
  transition: var(--t-quick);
}
.onboard-next:hover { background: var(--accent-hover); border-color: var(--accent-hover); }

.onboard-foot {
  margin: var(--sp-3) 0 0;
  font-size: var(--fs-11);
  color: var(--text-subtle);
  text-align: center;
}
.onboard-link {
  background: none; border: none; padding: 0;
  color: var(--accent);
  cursor: pointer;
  font: inherit;
  font-size: var(--fs-11);
  text-decoration: underline;
  text-decoration-style: dotted;
}

@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  /* 移动端把卡贴到屏幕中部偏下，不被底部 tab 遮挡 */
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

<!--
  全局 spotlight 样式 —— 必须 unscoped，因为目标节点（.btn-theme / .btn-insert /
  .btn-copy-main / .mobile-tab-copy）位于 Toolbar / App 模板内、不属于 OnboardingCard
  的 scoped 作用域。
  脉冲 ring 用 box-shadow 双层（实环 + 软光晕），不依赖外部布局空间，对原按钮无侵入。
-->
<style>
@keyframes onboard-spotlight-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 2px var(--accent),
      0 0 0 6px var(--accent-soft);
  }
  50% {
    box-shadow:
      0 0 0 2px var(--accent),
      0 0 0 10px transparent;
  }
}
.onboard-spotlight {
  position: relative;
  z-index: 30;
  border-radius: var(--radius-2, 4px);
  animation: onboard-spotlight-pulse 1.6s ease-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .onboard-spotlight {
    animation: none;
    box-shadow: 0 0 0 2px var(--accent), 0 0 0 6px var(--accent-soft);
  }
}
</style>
