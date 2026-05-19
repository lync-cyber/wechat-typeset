# tokens.css 现状审计

**审计依据**：阶段 0 任务 T0.2。
**消费方**：任务 T1.2（ThemeTokens 色槽扩展）、T5.3（启用 tokens.css 消费）。

## 结论速览

| 维度 | 状态 |
|---|---|
| 文件存在 | 是（[tokens.css](tokens.css)，100 行） |
| 被任何 html link | **否**（grep `tokens.css` 在本目录全部 html 中无匹配） |
| 与 [shell.css](shell.css) 关系 | **完全独立的两套体系**，token 槽位无交集 |
| 与画布 4 主题（t1–t4）的关系 | **无关**——tokens.css 不知道 4 主题存在 |
| 适用于 T5.3 的"启用消费"路径 | **不适用**，详见下方"T5.3 影响" |

## tokens.css 的实际设计意图

tokens.css 服务于 `.wx` / `.wx-article` 容器（440px 模拟微信单列宽度），是另一条**正文级排版**的体系：

- **色板**：`--ink-1..5`（编辑灰阶）+ `--paper / --paper-soft / --paper-gray / --paper-deep`（纸面背景）+ `--accent / --accent-soft / --accent-dim`（单一编辑红 `#B83A2E`）
- **字体栈**：`--serif / --sans / --mono`
- **字号尺度**：`--fs-display / --fs-stat / --fs-h2 / --fs-h3 / --fs-body / --fs-small / --fs-micro`
- **行高**：`--lh-tight / --lh-base / --lh-loose`

特征：
- 单主题色板（不区分 4 主题），无 t1–t4 概念
- 主背景白（`#ffffff`），与画布原型 4 主题背景 `#fbfaf7 / #f3eada / #ece4d2 / #efece5` 均不一致
- 主 accent `#B83A2E`，与画布 t2 朱印 `#a03a2a`、t4 包豪斯红 `#c8412e` 均不一致

## shell.css 体系（画布壳层）

服务于 7 个 content/meta/media html 的设计画布外壳：

- `--canvas-bg / --canvas-fg / --canvas-dim / --canvas-line / --canvas-hair`（暗背景画布）
- `--t1..t4`（4 主题标签色，仅用于 `.v-label .dot`）
- 4 主题预览背景写死在 [shell.css:230-236](shell.css:230)：`.phone.t1{#fbfaf7}` 等
- 字体族在 `<style>` / inline 字面值中重复声明，**未抽 token**

## 两套体系无法直接合并的原因

| 维度 | shell.css 画布壳 | tokens.css 正文级 |
|---|---|---|
| 渲染目标 | 7 个设计画布 html | `.wx` 440px 文章主容器 |
| 主题数 | 4（t1–t4） | 1（编辑红） |
| 背景色 | 4 套纸色 | 单一白纸 |
| 字号体系 | 无 token，inline 字面 | 完整 token 尺度 |
| 字体 token | 无 | 完整 token 栈 |

两者**关注点正交**，可以共存但不应合并 token 槽位。

## 对下游任务的影响

### T1.2 ThemeTokens 色槽扩展

T1.2 是生产侧 `src/core/themes/types.ts` 的扩展，**与 tokens.css 无关**。不受本审计影响。

### T5.3 "启用 tokens.css 消费"重新评估

任务序列原文：

> T5.3：tokens.css 写入 4 主题色板槽位；shell.css 或 7 个 html 引入；变体 inline 改 `var(--editorial-fg, #0a0a0a)` 模板（保留字面 fallback）

按本审计现状，T5.3 不能直接"启用"，需要**先做路径决策**。三个候选：

**方案 A（推荐）· 不动 tokens.css，新建 `themes.css`**

- 新建 `docs/wechat-typeset-container/themes.css`，定义 4 主题色槽：
  ```css
  :root {
    --editorial-bg: #fbfaf7;
    --editorial-fg: #0a0a0a;
    --editorial-dim: #6b6b65;

    --classical-bg: #f3eada;
    --classical-fg: #2a1d10;
    --classical-dim: #6b4a2a;
    --classical-accent: #a03a2a;
    /* ... */
  }
  ```
- [shell.css](shell.css) 头部 `@import` 引入
- 变体 inline 改 `var(--editorial-fg, #0a0a0a)` 模板（保字面 fallback）
- 优点：tokens.css 与 themes.css 单一关切，不互相污染
- 缺点：多一个文件

**方案 B · 扩展 tokens.css 增加 4 主题段**

- 在 tokens.css 末尾追加 `.theme-t1 { --bg: #fbfaf7; ... }` 段
- 缺点：tokens.css 同时承担"正文级单主题"和"画布层 4 主题"两个关切
- 不推荐

**方案 C · 放弃 T5.3，保留全 inline 字面**

- 接受 inline-style 中字体族与色值重复
- 优点：微信粘贴稳定性最高（不依赖 var fallback）
- 缺点：设计师调主题色需修改 N 处
- 适用条件：T5.3 价值不抵 inline 维护成本时

### T0.2 验收备注

T5.3 执行前需先在以上 A / B / C 三个方案中选定。本审计不替 T5.3 做选择，仅提供事实输入。
