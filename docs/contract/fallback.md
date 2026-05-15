# 降级合同（fallback contract）

[← 回 README](README.md) · [通用语法](syntax.md) · [基础契约](base.md)

写作者写错、主题作者没写完、LLM 生成的 spec 半合规——这些情况下，wechat-typeset 给出**何种降级行为**，本文档是权威说明。集成方在做"作者-LLM 协同写作"时，可据此预测每一层失效后的表现。

> 一句话承诺：**任何降级都不会塌版、不会丢内容**，最坏情况是"视觉签名感弱了"或"骨架退到中性默认"。

---

## 一、容器层降级（fence 名 → 渲染器）

| 触发条件 | 行为 | 报告 |
| --- | --- | --- |
| `:::` 名命中 `CONTAINER_REGISTRY`（合法 fence 名） | 走对应 renderer | — |
| `:::` 名不在白名单 | markdown-it-container 不识别，整段当普通 markdown 渲染（文本会出现在最终 HTML） | lint 阶段可读 capabilities.json 提前发现 |
| `theme:<X>` 容器在非该主题里使用 | renderer 仍出 HTML，但 wrapper CSS 走 token 兜底（`baseContainers(tokens)`），失去主题签名 voice | `getThemeCapabilities(personaId)` 的 `containers[].available === false` |

> 容器 namespace（`base` / `pack:*` / `theme:*`）见 [README.md 三层契约](README.md#契约的三层) 与 [packs/](packs/)。

---

## 二、变体层降级（variant id → 骨架）

变体优先级链（L1 高 → L4 低）：

1. **L1** · attrs.variant（`::: tip variant=pill-tag`）
2. **L2** · frontmatter `variants:`（[syntax.md · Frontmatter](syntax.md#frontmatter页面局部配置--l2)）
3. **L3** · 主题映射表 `theme.variants[slot]`
4. **L4** · `DEFAULT_VARIANTS` / 容器 renderer 的 `fallbackId`

| 触发条件 | 行为 | 报告 |
| --- | --- | --- |
| L1 attrs.variant 合法 | 直接生效 | — |
| L1 attrs.variant 非法（不在 variant 注册表） | **静默忽略**，回退 L2/L3/L4 | 不报错；用 `getVariantsForContainer(name)` 提前校验 |
| L2 frontmatter.variants[slot] 合法 | 在该 slot 上覆盖 L3 主题默认 | `RenderOutput.pageConfig.variants[slot]` |
| L2 frontmatter.variants[slot] 非法 / 未知 slot | **静默忽略**，回退 L3/L4；写 issue | `RenderOutput.frontmatterIssues[]` warning |
| L3 theme.variants[slot] 在 variant 注册表里不存在 | 回退到 L4 fallbackId（如 admonition 是 `accent-bar`） | — |
| variant.meta.themeCompat 不含当前主题（"理论上能用但不推荐"） | 仍正常渲染 | 由 `getRecommendedVariantsFor(personaId)[kind]` 反向索引提示 LLM |

L4 各 slot fallbackId（见 `DEFAULT_VARIANTS`，与 `makeVariantContainer.fallbackId` 同源）：

| slot | fallbackId |
| --- | --- |
| admonition | `accent-bar` |
| quote | `classic` |
| compare | `column-card` |
| steps | `number-circle` |
| divider | `rule` |
| sectionTitle | `bordered` |
| codeBlock | `bare` |
| note | `minimal-callout` |

---

## 三、主题层降级

| 触发条件 | 行为 | 报告 |
| --- | --- | --- |
| frontmatter `theme:` 命中已注册主题 | **覆盖**入参 persona/theme/spec | — |
| frontmatter `theme:` 命中未知 id | **静默回退**到 input.persona / theme / spec | `RenderOutput.frontmatterIssues[]` warning |
| `getTheme(id)` 未知 id（内部 API） | 回退到 `defaultTheme` | — |
| `render(input)` 三选一都未给 | 默认 `persona: 'default'` | — |
| `render(input)` 同时给多个 | **抛 `WtException(INPUT_AMBIGUOUS)`** | `e.code === 'INPUT_AMBIGUOUS'` |
| 未知 `persona` id | **抛 `WtException(RESOURCE_NOT_FOUND)`** | `e.code === 'RESOURCE_NOT_FOUND'` |
| 未知 `platform` id | **抛 `WtException(PLATFORM_UNSUPPORTED)`** | `e.code === 'PLATFORM_UNSUPPORTED'` |
| Spec 投影失败（`createPersona(spec)` 校验出 errors） | 仍返回 best-effort Theme + `ok: false` 校验报告 | `CreatePersonaResult.validation` |
| `render({ spec })` 投影失败 | **抛 `WtException(SPEC_INVALID)`**（携带 errors / warnings） | `e.errors[]` 数组 |

---

## 四、容器样式层降级（主题没声明某容器 CSS）

| 触发条件 | 行为 | 报告 |
| --- | --- | --- |
| `theme.containers[styleKey]` 主题未声明 | 走 `baseContainers(tokens)` token 驱动中性兜底（bgSoft / border 色） | — |
| `theme.innerStyles[key]` 主题未声明 | 走 `baseInnerStyles(tokens)` 中性默认 | — |
| `theme.assets[motifKey]` 主题未声明 SVG | renderer 不渲染对应装饰（如 noteIcon 缺失 → 无图标） | — |
| `theme.kickers[key]` 主题未声明 kicker 文案 | 走 `DEFAULT_KICKERS` 兜底（如 `qaBlock: '读者问答 · Q&A'`） | `capabilities.json:personas[].kickers` 暴露最终值 |

---

## 五、平台 patch 层降级（公众号发布兼容）

| 触发条件 | 行为 |
| --- | --- |
| HTML 含 `class="..."` | wxPatch 把 class 摊平为 inline style（粘贴稳定性） |
| HTML 含 `position` / `float` / `@media` 等禁用 CSS | wxPatch 剥离对应属性（白底无视觉降级） |
| HTML 含 `#ffffff` 纯白 SVG | wxPatch 替换为 `#fefefe`（公众号 SVG → PNG 透明化保护） |
| `<style>` 标签 | wxPatch 在 inline 阶段已合并到节点 style；标签被剥 |
| 未知平台 id（`platform: 'unknown'`） | 走 placeholder adapter（patch=identity） |

> 完整 patch 行为见 [`skills/wechat-typeset-export-richtext/references/wxpatch-behavior.md`](../../skills/wechat-typeset-export-richtext/references/wxpatch-behavior.md)。

---

## 集成方 self-check 清单

发布前，把以下 4 件事跑一遍即可避免 95% 的"看预览没问题，发到公众号塌版"事故：

1. **Lint 容器名**：`getContainerVocabulary().map(s => s.name)` 是合法 fence 全集，把 markdown 里所有 `:::` 名校验一遍。
2. **Lint variant id**：对每个 `::: <name> variant=<id>` 调 `getVariantsForContainer(name).some(v => v.id === id)`。
3. **检查 theme:* 容器与主题匹配**：`getThemeCapabilities(personaId).containers` 过滤 `available === false` 项，提示作者"这些容器在 {主题} 下没有签名视觉"。
4. **吞掉 frontmatterIssues**：把 `RenderOutput.frontmatterIssues[]` 的 warning 串成提示，让作者修正非法 variant id 而非默默回退。

---

## 演进策略

新增降级路径走 deprecation 流程：见 [platform.md · 契约演进](platform.md#契约演进)。capabilities.json 的 `fallbackBehavior` 字段是本文档的机器可读副本。
