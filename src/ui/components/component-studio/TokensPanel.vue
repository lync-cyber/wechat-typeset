<script setup lang="ts">
/**
 * TokensPanel —— L1 结构化 token 编辑面板（步骤 4）。
 *
 * 给定 (kind, variantId)，从 ALL_VARIANT_DEFS 查 tokenSchema：
 *   - 找到 → 按 type 渲染对应控件（color / size / text）
 *   - 找不到 → 渲染空状态（"当前 variant 未开放可调字段"）
 *
 * 用户输入直接写回 props.tokens（reactive 对象，父组件 mutate 触发响应）。
 * 空字符串视为"未覆盖"——与 useComponentDraft 的语义对齐，避免 `tokens={a:''}` 这种
 * 看似有值实际无效的"幽灵覆盖"。
 *
 * 不做的事：
 *   - 不做 lint（lintInlineCSS 由保存期 ComponentStudio 跑）
 *   - 不持有 storage（仓在 ComponentStudio 保存时统一写）
 *   - 不渲染预览（预览由父组件 ComponentPreview 接 userVariants 跑 pipeline）
 */
import { computed } from 'vue'
import type { ComponentKind } from '../../../domain/components-lib'
import type { VariantKind } from '../../../core/themes/types'
import type { TokenField } from '../../../core/variants/_core'
import { getVariantTokenSchema } from '../../../core/variants/tokenSchemaLookup'

const props = defineProps<{
  kind: ComponentKind
  variantId: string
  /** reactive 对象，子组件 mutate 直接生效 */
  tokens: Record<string, string>
}>()

const schema = computed(() => {
  if (props.kind === 'none' || !props.variantId) return undefined
  return getVariantTokenSchema(props.kind as VariantKind, props.variantId)
})

const fields = computed<Array<{ key: string; field: TokenField; value: string }>>(() => {
  const s = schema.value
  if (!s) return []
  return Object.entries(s).map(([key, field]) => ({
    key,
    field,
    value: props.tokens[key] ?? '',
  }))
})

function setToken(key: string, raw: string): void {
  const v = raw.trim()
  if (v === '') {
    delete props.tokens[key]
  } else {
    props.tokens[key] = v
  }
}

function onColorInput(key: string, e: Event): void {
  setToken(key, (e.target as HTMLInputElement).value)
}

function onTextInput(key: string, e: Event): void {
  setToken(key, (e.target as HTMLInputElement).value)
}

function clearToken(key: string): void {
  delete props.tokens[key]
}
</script>

<template>
  <div class="tokens-panel">
    <div v-if="!schema" class="empty">
      此 variant 未开放可调字段；如需自定义样式，可后续走"源码模式"（步骤 5）。
    </div>
    <div v-else class="fields">
      <div
        v-for="entry in fields"
        :key="entry.key"
        class="field"
      >
        <label class="field-head">
          <span class="label">{{ entry.field.label }}</span>
          <span class="key mono">{{ entry.key }}</span>
        </label>
        <div class="field-body">
          <!-- color：原生 color picker；空 = 用主题默认 -->
          <template v-if="entry.field.type === 'color'">
            <input
              type="color"
              class="color-input"
              :value="entry.value || '#000000'"
              @input="onColorInput(entry.key, $event)"
            />
            <input
              type="text"
              class="text-input"
              :placeholder="entry.field.default"
              :value="entry.value"
              @input="onTextInput(entry.key, $event)"
            />
          </template>
          <!-- size / text：纯文本 -->
          <template v-else>
            <input
              type="text"
              class="text-input full"
              :placeholder="entry.field.default"
              :value="entry.value"
              @input="onTextInput(entry.key, $event)"
            />
          </template>
          <button
            v-if="entry.value"
            type="button"
            class="clear"
            title="清除覆盖"
            @click="clearToken(entry.key)"
          >×</button>
        </div>
        <p v-if="entry.field.hint" class="hint">{{ entry.field.hint }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tokens-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  padding-top: var(--sp-2);
}
.empty {
  font-size: var(--fs-11);
  color: var(--text-subtle);
  font-style: italic;
  padding: var(--sp-3);
  background: var(--surface-raised);
  border-radius: var(--radius-2);
}
.fields {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: var(--fs-11);
}
.label { color: var(--text-muted); letter-spacing: var(--ls-wide); }
.key { color: var(--text-subtle); font-size: 10px; }
.field-body { display: flex; align-items: center; gap: var(--sp-2); }
.color-input {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: transparent;
  cursor: pointer;
  flex: 0 0 auto;
}
.text-input {
  flex: 1 1 0;
  min-width: 0;
  height: 28px;
  padding: 0 var(--sp-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  font: inherit;
  font-size: var(--fs-12);
  font-family: var(--font-mono);
  color: var(--text);
  background: var(--surface-raised);
}
.text-input.full { flex: 1 1 auto; }
.text-input:focus { outline: none; border-color: var(--accent); box-shadow: var(--focus-ring); }
.clear {
  height: 28px;
  width: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  background: var(--surface-raised);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  flex: 0 0 auto;
}
.clear:hover { background: var(--surface); color: var(--text); }
.hint {
  margin: 0;
  font-size: 10px;
  color: var(--text-subtle);
  letter-spacing: 0.2px;
}
</style>
