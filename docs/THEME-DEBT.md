# 主题系统 · 显式技术债务清单

本文只登记当前仍存在的例外。源码中的 grace 集合与实验性标记是事实来源，已完成事项保留在 Git 历史中。

更新规则：新增例外时同步记录原因与退出条件；解除例外时同时删除登记。字号和对比度检查由 `validateSpec` 执行，实验性骨架由 `tests/unit/variant-coverage.spec.ts` 检查。

## A. 字号下限债（`TYPOGRAPHY_TEMPORARY_GRACE`）

> 代码：`src/core/themes/_shared/spec/typography-rules.ts`

| 主题 | 字段 | 当前值 | 守卫期望 | 原因 |
|---|---|---|---|---|
| `editorial-mook` | `baseSize` | 13px | ≥14px | POPEYE / Japanese mook 设计稿原值；与 LowDensity layout 协同 |
| `swiss-grid` | `baseSize` | 13px | ≥14px | Neue Grafik 1958 对开页原值，13px 是 Swiss 排版语言一部分 |
| `brutalist` | `baseSize` | 13px | ≥14px | Brutalist Web Design 美学：刻意紧凑、无装饰 |
| `late-night-vinyl` | `lineHeight` | 2.1 | ≤2.0 | 夜读慢读签名；故意拉宽行间呼吸 |

**偿还路径**：与各主题作者协商，在不损视觉签名前提下提升到 14px / 行高 2.0；
若 mook/brutalist/swiss-grid 决定保持 13px 永久不动，应把规则从 grace 提升为
"特定主题永久豁免"显式契约（不再是"暂时"）。

---

## B. 对比度债（`A11Y_TEMPORARY_GRACE`）

> 代码：`src/core/themes/_shared/spec/a11y.ts`

| 主题 | 色对 | 比值 | 阈值 | 原因 |
|---|---|---|---|---|
| `swiss-grid` | `status.warning` `#f9a825 on #fdf5d6` | 1.80:1 | 4.5:1 | Swiss 设计黄是招牌签名色，加深即失语言 |
| `editorial-mook` | `textMuted/bg` | 4.19 | 4.5 | mook 灰蓝在暖米底，整套低反差是签名 |
| `editorial-mook` | `textMuted/bgSoft` | 3.80 | 4.5 | 同上 |
| `editorial-mook` | `code/bgMuted` | 2.73 | 4.5 | POPEYE 朱橙 #e85a3c 是主题灵魂色 |
| `editorial-mook` | `status.tip` | 2.76 | 4.5 | 整套语义色低反差 |
| `editorial-mook` | `status.info` | 3.61 | 4.5 | 同上 |
| `editorial-mook` | `status.warning` | 1.99 | 4.5 | 同上 |
| `editorial-mook` | `status.danger` | 2.96 | 4.5 | 同上（朱橙复用） |
| `life-aesthetic` | `textMuted/bgSoft` | 4.35 | 4.5 | 暖米卡纸"做旧标签纸"风格 |
| `life-aesthetic` | `code/bgMuted` | 3.27 | 4.5 | inline code 暖色融入卡纸 |
| `life-aesthetic` | `primary/bg` | 2.72 | 3.0（大字） | 暖橙在暖米底的克制反差 |
| `life-aesthetic` | 4 态 status | 2.5–3.5 | 4.5 | 整套低饱和暖色 |
| `late-night-vinyl` | `status.danger` | 4.20 | 4.5 | 暗底霓虹红，再加深丢失霓虹质感 |

**偿还路径**：与设计 owner 协商可读性 vs. 品牌张力的取舍。可能的退出策略：
- editorial-mook：要么改主题视觉语言，要么签"mook 主题不为正文 a11y 兜底，
  只为大字 / 标题对比"的弱契约
- life-aesthetic：同上
- swiss-grid warning：换"文字色 + soft 强对比"或品牌让步加深
- late-night-vinyl danger：接受 4.20:1（仅差 0.3）作为"暗底主题宽容度"

---

## C. Voice 覆盖率债（`LOW_VOICE_TEMPORARY_GRACE`）

> 代码：`src/core/themes/_shared/spec/voice.ts`

**当前条目：（空）**

所有内置主题 voice 覆盖率均 ≥ 30% 阈值；本清单留作未来"启动期主题不达标"的容器。

---

## D. 实验性 variant 标记（`meta.experimental: true`）

conformance: `experimental: true` 必须配 `experimentalSince`（守卫见 variant-coverage.spec.ts）。

> 代码：各 `src/core/variants/<kind>/<id>.ts`
> 报告：`pnpm variant:usage --orphans`

未被主题默认采用、也没有 `designedFor` 推荐的骨架，应登记 `experimental` 与 `experimentalSince`。当前清单通过命令查看，避免手写数量与实现漂移：

```sh
pnpm variant:usage --orphans
pnpm variant:usage --stale
```

被主题采用或获得明确的 `designedFor` 推荐后，移除实验标记；长期未采用的条目应结合引用与设计用途审查后再决定去留。

守卫：`tests/unit/variant-coverage.spec.ts` 断言每个 VARIANT_IDS 成员满足
default ∨ designedFor ∨ experimental。

---

## E. 悬空资产（`@experimental` JSDoc）

> 代码：`src/core/themes/types.ts` `ThemeAssets`

| 资产 | 来源 | 当前状态 |
|---|---|---|
| `externalLinkIcon` | spec.motifs，spec-to-theme 渲染为 SVG | 接口暴露，**无 renderer 自动注入** |
| `terminalPrompt` | 同上 | 同上 |

**偿还路径**：

- 接入流程：在 inline `<a>` / codeBlock 'terminal-frame' renderer 读取 theme.assets，
  命中后拼接 SVG，加 1 个 conformance 用例
- 无明确消费场景时，审查公共 API 引用后决定是否移除。

---

## 未登记的 grace（永远不应该出现）

如果以下情况出现，应**立刻**升级为正式登记，不应隐式存在：

- 主题 spec 里硬编码 hex 绕过 token-flow lint（被 `theme-token-flow.spec.ts` 抓）
- variant 在 VARIANT_IDS 但不在 `_all.ts` 注册（被 conformance 抓）
- variant 引用未注册主题 id（被 ts 类型抓）
- typography baseSize < 14 但未登记 grace（被 validateSpec 抓 + 守卫红）
- palette 色对失败但未登记 grace（同上）

校验链路若漏抓 = 守卫缺口，应同步补到对应 `*.spec.ts`。
