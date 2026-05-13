# 派生现有主题模板

> 9 套内置主题任选一作底，spread + 改 3 个字段。落地走 `scripts/persist-persona.ts`。

## 派生模板 1：换主色 + 换 code 骨架

```ts
import { getPersona, type PersonaSpec } from '../../src/public'

const base = getPersona('tech-explainer')

export const spec: PersonaSpec = {
  ...base,
  id: 'tech-explainer-red',
  name: '文档白昼·红',
  description: '在 tech-explainer 基础上替换主色',
  palette: {
    ...base.palette,
    primary: '#c8102e',
    accent: '#c8102e',
  },
  variants: {
    ...base.variants,
    codeBlock: 'header-bar',  // 已经是默认，写出来强调
  },
  meta: {
    ...(base.meta ?? {}),
    createdAt: '2026-05-13',
    basedOn: 'tech-explainer',
  },
}
```

## 派生模板 2：换 admonition 骨架（最常见）

```ts
const base = getPersona('default')

export const spec: PersonaSpec = {
  ...base,
  id: 'default-magazine',
  name: '默认·杂志',
  variants: {
    ...base.variants,
    admonition: 'card-shadow',
    quote: 'magazine-dropcap',
  },
  meta: {
    ...(base.meta ?? {}),
    createdAt: '2026-05-13',
    basedOn: 'default',
  },
}
```

## 派生模板 3：加签名容器（不改视觉）

```ts
const base = getPersona('business-finance')

export const spec: PersonaSpec = {
  ...base,
  id: 'business-finance-pro',
  name: '硬核财经·专业版',
  signatureContainers: [
    ...(base.signatureContainers ?? []),
    'methodology',
    'colophon',
  ],
  meta: {
    ...(base.meta ?? {}),
    createdAt: '2026-05-13',
    basedOn: 'business-finance',
  },
}
```

## 派生模板 4：用 patch 覆盖具体容器 CSS

```ts
const base = getPersona('default')

export const spec: PersonaSpec = {
  ...base,
  id: 'default-rounded',
  containers: {
    ...(base.containers ?? {}),
    tip: { ...(base.containers?.tip ?? {}), 'border-radius': '12px' },
    quoteCard: { ...(base.containers?.quoteCard ?? {}), 'border-radius': '16px' },
  },
  meta: {
    ...(base.meta ?? {}),
    createdAt: '2026-05-13',
    basedOn: 'default',
  },
}
```

**注意**：`containers` 的 key 必须 camelCase（`quoteCard` / `sectionTitle` / `keyNumber`），不是 fence 名（`quote-card`）。

## 派生主题的校验流程

派生 spec 也必须过 `validate-and-fix.ts`——patch 系统的 `__reset: true` 能意外清掉硬约束：

```bash
tsx skills/wechat-typeset-author-persona/scripts/validate-and-fix.ts <spec-path>
```

## 不要做的事

- 不要 spread 后忘改 `id` 和 `name`——会与原主题冲突
- 不要 spread 后忘填 `meta.createdAt`（必填字段，会过不了校验）
- 不要在 patch 里直接写 `font-family`——抛 `ThemeAuthoringError`
- 不要直接改 `signatureContainers` 后假装"主题就支持了"——signatureContainers 是承诺，需要对应的 elements/containers 补丁兑现承诺
