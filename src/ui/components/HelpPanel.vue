<script setup lang="ts">
/**
 * 帮助 / 快捷键面板。数据源：
 *   - Command 列表（快捷键）由 App.vue 传入
 *   - 容器速查直接读 CONTAINER_VOCABULARY（与 docs/contract/base.md + docs/contract/packs/ 同源）
 * 容器条目可点击插入到编辑器。
 */
import { computed } from 'vue'
import type { Command } from './CommandPalette.vue'
import { CONTAINER_VOCABULARY } from '../../core/vocabulary/vocabulary'
import PanelShell from '../primitives/PanelShell.vue'
import PanelHeader from '../primitives/PanelHeader.vue'
import SearchBox from '../primitives/SearchBox.vue'
import { useFilteredList } from '../composables/useFilteredList'

type ContainerSpec = (typeof CONTAINER_VOCABULARY)[number]

const props = defineProps<{
  commands: Command[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'insert', snippet: string): void
}>()

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

// ── 容器速查（vocabulary 派生） ────────────────────────────
const CATEGORY_LABEL: Record<ContainerSpec['category'], string> = {
  structure: '文章结构',
  admonition: '提示',
  content: '内容',
  navigation: '导航',
  media: '媒体',
  signature: '签名',
  data: '数据图表',
  free: '兜底',
}
const CATEGORY_ORDER: ContainerSpec['category'][] = [
  'structure',
  'admonition',
  'content',
  'navigation',
  'data',
  'media',
  'signature',
  'free',
]

const { query: containerQuery, filtered: filteredContainers } = useFilteredList<ContainerSpec>({
  source: () => CONTAINER_VOCABULARY,
  predicate: (s, q) =>
    s.name.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q),
})

const groupedContainers = computed(() => {
  const bucket = new Map<ContainerSpec['category'], ContainerSpec[]>()
  for (const spec of filteredContainers.value) {
    const list = bucket.get(spec.category) ?? []
    list.push(spec)
    bucket.set(spec.category, list)
  }
  return CATEGORY_ORDER
    .map((cat) => [cat, bucket.get(cat) ?? []] as const)
    .filter(([, list]) => list.length > 0)
})

function insertContainer(spec: ContainerSpec) {
  emit('insert', spec.example)
  emit('close')
}
</script>

<template>
  <PanelShell
    aria-label="快捷键与帮助"
    :max-width="560"
    :max-height="80"
    @close="emit('close')"
  >
    <PanelHeader title="快捷键与帮助" @close="emit('close')" />

    <section class="help-intro">
      <div class="intro-line">
        <strong>wechat-typeset</strong> 是纯浏览器里的微信公众号 Markdown 排版工具。
      </div>
      <div class="intro-line">
        草稿保存在本地浏览器，切 tab / 关 tab 都不丢；一键复制后直接粘贴进公众号编辑器即可保留排版。
      </div>
    </section>

    <section class="help-icons">
      <div class="group-title mono">移动端工具栏</div>
      <ul class="icon-list">
        <li class="icon-item">
          <span class="icon-glyph">●</span>
          <span class="icon-desc"><strong>切换主题</strong> — 更换排版风格与配色方案</span>
        </li>
        <li class="icon-item">
          <span class="icon-glyph">＋</span>
          <span class="icon-desc"><strong>插入组件</strong> — 封面、引用、代码块等预置模板</span>
        </li>
        <li class="icon-item">
          <span class="icon-glyph">◐</span>
          <span class="icon-desc"><strong>自定义配色</strong> — 调整强调色与文字颜色</span>
        </li>
        <li class="icon-item">
          <span class="icon-glyph">···</span>
          <span class="icon-desc"><strong>更多操作</strong> — 导出、清空、三档样张（故事 / 组件参考 / 全功能展示）等</span>
        </li>
      </ul>
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

    <section class="help-containers">
      <div class="group-title mono">容器速查 · 点击插入光标处</div>
      <SearchBox
        v-model="containerQuery"
        class="container-search"
        size="sm"
        placeholder="搜索容器名或用途（例：金句 / admonition / compare）"
        aria-label="搜索容器"
      />
      <div
        v-for="[cat, specs] in groupedContainers"
        :key="cat"
        class="container-group"
      >
        <div class="container-cat mono">{{ CATEGORY_LABEL[cat] }}</div>
        <ul class="container-list">
          <li
            v-for="spec in specs"
            :key="spec.name"
            class="container-item"
            @click="insertContainer(spec)"
          >
            <code class="container-name">::: {{ spec.name }}</code>
            <span class="container-desc">{{ spec.description }}</span>
          </li>
        </ul>
      </div>
      <div v-if="groupedContainers.length === 0" class="container-empty">
        无匹配容器
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
  </PanelShell>
</template>

<style scoped>
.help-intro {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
  font-size: var(--fs-13);
  color: var(--text-muted);
  line-height: var(--lh-normal);
}
.intro-line + .intro-line { margin-top: 4px; }
.intro-line strong { color: var(--text); }

.help-icons {
  display: none;
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--border);
}
@media (max-width: 767px) and (pointer: coarse), (max-width: 540px) {
  .help-icons { display: block; }
}
.icon-list { list-style: none; margin: var(--sp-2) 0 0; padding: 0; }
.icon-item {
  display: flex; align-items: baseline; gap: var(--sp-3);
  padding: 6px 0;
  font-size: var(--fs-13);
  border-bottom: 1px dashed var(--border);
}
.icon-item:last-child { border-bottom: none; }
.icon-glyph {
  flex: 0 0 28px;
  text-align: center;
  font-size: var(--fs-15);
  color: var(--accent);
  font-family: var(--font-mono);
  line-height: 1;
}
.icon-desc { color: var(--text-muted); line-height: var(--lh-normal); }
.icon-desc strong { color: var(--text); font-weight: var(--fw-medium); }

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

.help-containers {
  padding: var(--sp-4) var(--sp-5);
  border-top: 1px solid var(--border);
  overflow-y: auto;
}
.container-search {
  margin: var(--sp-2) 0 var(--sp-3);
}
.container-group + .container-group { margin-top: var(--sp-3); }
.container-cat {
  font-size: var(--fs-11);
  letter-spacing: var(--ls-kicker);
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: 4px;
}
.container-list { list-style: none; margin: 0; padding: 0; }
.container-item {
  display: flex;
  align-items: baseline;
  gap: var(--sp-3);
  padding: 5px 6px;
  border-radius: var(--radius-1);
  cursor: pointer;
  font-size: var(--fs-12);
}
.container-item:hover {
  background: var(--surface);
}
.container-name {
  flex: 0 0 auto;
  font-family: var(--font-mono);
  font-size: var(--fs-12);
  color: var(--accent);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-1);
  padding: 1px 6px;
  white-space: nowrap;
}
.container-desc {
  color: var(--text-muted);
  line-height: var(--lh-normal);
}
.container-empty {
  color: var(--text-subtle);
  font-size: var(--fs-12);
  padding: var(--sp-3) 0;
  text-align: center;
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
