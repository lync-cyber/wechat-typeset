<script setup lang="ts">
/**
 * UserVariantsPanel —— "我的样式"管理面板（步骤 4-6 遗留）。
 *
 * 职责：列出本地仓所有 UserVariant，支持重命名 / 删除。不做编辑（编辑入口走
 * ComponentStudio 的 tokens / patch / custom 三档面板）——直接编辑 UV 而不关联具体
 * 用户组件会让 markdown 引用悬空，所以 UV 编辑必须通过组件 Studio 入口（绑 linkedUserVariantId）。
 *
 * 删除语义：直接调用 deleteUserVariant，会留下"悬空 linkedUserVariantId"在引用此 UV 的
 * 用户组件上——下次 ComponentStudio.useComponentDraft.loadLinkedUv 检测到 UV 已删则
 * 静默回退到 fresh 路径，并在保存时把 linkedUserVariantId 清掉。本面板不主动级联清理
 * 组件引用，避免"管理面板悄悄改动组件"的违反预期。
 */
import { computed, ref } from 'vue'
import {
  deleteUserVariant,
  listUserVariants,
  updateUserVariant,
} from '../../../infra/storage/userVariants.repo'
import type { UserVariant } from '../../../core/variants/userVariant'

const refreshTick = ref(0)
const variants = computed<UserVariant[]>(() => {
  // 借 refreshTick 触发重新读仓——repo 是 localStorage，没有 reactive
  void refreshTick.value
  return listUserVariants()
})

function refresh() {
  refreshTick.value++
}

const editingId = ref<string | null>(null)
const editingName = ref<string>('')

function startRename(uv: UserVariant) {
  editingId.value = uv.id
  editingName.value = uv.name
}

function commitRename() {
  if (!editingId.value) return
  const name = editingName.value.trim()
  if (!name) {
    cancelRename()
    return
  }
  updateUserVariant(editingId.value, { name })
  editingId.value = null
  editingName.value = ''
  refresh()
}

function cancelRename() {
  editingId.value = null
  editingName.value = ''
}

function confirmDelete(uv: UserVariant) {
  // window.confirm 在 Studio 抽屉里足够；不引入 Modal 系统让面板保持轻量
  const ok = window.confirm(
    `确定删除「${uv.name}」？引用此样式的组件会保留但失去样式覆盖（下次打开组件时回退）。`,
  )
  if (!ok) return
  deleteUserVariant(uv.id)
  refresh()
}

function levelLabel(uv: UserVariant): string {
  if (uv.level === 'tokens') return 'Tokens'
  if (uv.level === 'patch') return 'CSS Patch'
  return 'Custom (HTML)'
}

function baseLabel(uv: UserVariant): string {
  if (uv.level === 'custom') return '—'
  return `${uv.base.kind} · ${uv.base.variantId}`
}

defineExpose({ refresh })
</script>

<template>
  <div class="uv-panel">
    <div v-if="variants.length === 0" class="empty">
      <div class="empty-title">还没有自创样式</div>
      <div class="empty-hint">
        在组件 Studio 里编辑组件并启用 Tokens / CSS Patch / 完全自定义面板，
        样式会自动落到此处。
      </div>
    </div>

    <ul v-else class="uv-list">
      <li v-for="uv in variants" :key="uv.id" class="uv-item">
        <div class="uv-meta">
          <template v-if="editingId === uv.id">
            <input
              v-model="editingName"
              class="rename-input"
              maxlength="40"
              autofocus
              @keydown.enter.prevent="commitRename"
              @keydown.escape.prevent="cancelRename"
              @blur="commitRename"
            />
          </template>
          <template v-else>
            <span class="uv-name" :title="uv.id">{{ uv.name }}</span>
            <span class="uv-level" :class="`level-${uv.level}`">{{ levelLabel(uv) }}</span>
          </template>
        </div>
        <div class="uv-base">{{ baseLabel(uv) }}</div>
        <div class="uv-actions">
          <button
            v-if="editingId !== uv.id"
            class="uv-btn"
            type="button"
            title="重命名"
            @click="startRename(uv)"
          >重命名</button>
          <button
            class="uv-btn uv-btn-danger"
            type="button"
            title="删除"
            @click="confirmDelete(uv)"
          >删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.uv-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--sp-3);
}
.empty {
  padding: var(--sp-4);
  text-align: center;
  color: var(--text-muted);
}
.empty-title {
  font-weight: var(--fw-medium);
  margin-bottom: 4px;
  color: var(--text);
}
.empty-hint {
  font-size: var(--fs-12);
  line-height: var(--lh-normal);
}
.uv-list {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.uv-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--sp-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
}
.uv-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.uv-name {
  flex: 1 1 auto;
  font-weight: var(--fw-medium);
  color: var(--text);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.uv-level {
  flex: 0 0 auto;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  background: var(--surface-raised);
  border: 1px solid var(--border);
}
.uv-level.level-tokens { color: var(--accent); border-color: var(--accent); }
.uv-level.level-patch { color: var(--warning, #c98a00); border-color: var(--warning, #c98a00); }
.uv-level.level-custom { color: var(--danger, #d3514c); border-color: var(--danger, #d3514c); }

.uv-base {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  font-family: var(--font-mono);
}
.uv-actions {
  display: flex;
  gap: var(--sp-2);
  justify-content: flex-end;
}
.uv-btn {
  font-size: var(--fs-11);
  padding: 3px 10px;
  border-radius: var(--radius-1, 2px);
  border: 1px solid var(--border);
  background: var(--surface-raised);
  color: var(--text);
  cursor: pointer;
  font-family: var(--font-text);
}
.uv-btn:hover { background: var(--surface); }
.uv-btn-danger {
  color: var(--danger);
  border-color: var(--danger);
}
.uv-btn-danger:hover {
  background: var(--danger-soft, #fbecea);
}
.rename-input {
  flex: 1 1 auto;
  min-width: 0;
  height: 24px;
  padding: 0 var(--sp-2);
  font-size: var(--fs-13);
  border: 1px solid var(--accent);
  border-radius: var(--radius-1, 2px);
  background: var(--surface-raised);
  color: var(--text);
  font-family: var(--font-text);
}
.rename-input:focus {
  outline: none;
  box-shadow: var(--focus-ring);
}
</style>
