# wechat-typeset · 全量容器 & 变体演示

这篇 Markdown 覆盖全部 33 个 variant 与 14 个无 variant 容器（含第五态 note + 签名块 abstract / key-number / see-also + 兜底 free），用于：

- `scripts/verify-sample-full.ts` 端到端渲染自检
- 人工审阅任何一次 variant / 容器改动的视觉回归
- 作为主题作者的"全容器参考卷"

::: intro 一句话摘要
把 Markdown 写得像设计稿，把复制粘贴到公众号的体验当作一等公民。
:::

::: cover 本期封面
![封面占位](https://placehold.co/1200x630?text=wechat-typeset)

> 一份给写作者的排版工具 —— 所见即所得，粘贴即保真。
:::

::: author 作者 role=主理人
长期写作，偶尔折腾工具。记录一些关于写与读的真心话。
:::

---

## section-title 两种写法

::: section-title 章节标题 · bordered variant=bordered
:::

::: section-title 章节标题 · cornered variant=cornered
:::

---

## 提示容器 9 种 variant

::: tip 温和提示 variant=accent-bar
这是 `accent-bar` 骨架 —— 左侧 3px 色条 + 浅底 + 右侧轻圆角。
:::

::: warning 注意事项 variant=pill-tag
这是 `pill-tag` 骨架 —— 顶部胶囊标签 + 下沉外框。
:::

::: info 背景补充 variant=ticket-notch
这是 `ticket-notch` 骨架 —— 票根缺口样式。
:::

::: danger 风险警示 variant=card-shadow
这是 `card-shadow` 骨架 —— 悬浮卡片式。
:::

::: tip 极简提醒 variant=minimal-underline
这是 `minimal-underline` 骨架 —— 无底色，仅下划线与缩进。
:::

::: info 终端风格 variant=terminal
这是 `terminal` 骨架 —— 顶部三色圆点 + 等宽正文。
:::

::: tip // NOTE variant=dashed-border
这是 `dashed-border` 骨架 —— 左 2px 虚线 + 浅底，工程"附注"铅笔感。
:::

::: info // REF §2.3 variant=double-border
这是 `double-border` 骨架 —— 左 4px 双线 + 透明底，manpage 交叉引用风。
:::

::: danger // PITFALL variant=top-bottom-rule
这是 `top-bottom-rule` 骨架 —— 顶底 1px 实线，报纸 errata 勘误条。
:::

::: tip 工程附注 variant=manpage-log
这是 `manpage-log` 骨架 —— 顶底分隔线 + `:: NOTE ::` 状态条，终端日志输出感（tech-geek 专属签名）。
:::

::: info 定义 variant=sidenote-latex
这是 `sidenote-latex` 骨架 —— 1px 细边框 + `DEFINITION.` 小型大写起始，LaTeX 定理框语汇（academic-frontier 专属签名）。
:::

::: warning 按 variant=marginalia
这是 `marginalia` 骨架 —— 无框无底、墨色一色；靠【按/疑/注/辨】CJK 符号区分类型（literary-humanism 专属签名）。
:::

::: danger 异常 · ALERT variant=ledger-cell
这是 `ledger-cell` 骨架 —— 深色表头条 + 硬边框，Bloomberg Terminal 数据感（business-finance 专属签名）。
:::

::: tip 今日小发现 variant=bubble-organic
这是 `bubble-organic` 骨架 —— 大圆角 + 单侧柔软阴影，手绘信笺气质（life-aesthetic 专属签名）。
:::

::: info 采访手记 variant=magazine-pull
这是 `magazine-pull` 骨架 —— 上下细线 + 浮空小字标签，《人物》特稿 pull-quote（people-story 专属签名）。
:::

::: warning 需要警惕 variant=report-section
这是 `report-section` 骨架 —— 顶 3px 底 1px + § 方角标签，研究报告条款感（industry-observer 专属签名）。
:::

---

## 引用卡 4 种 variant

::: quote-card 苏轼 · 前赤壁赋 variant=classic
逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。
:::

::: quote-card 鲁迅 · 野草 variant=magazine-dropcap
当我沉默着的时候，我觉得充实；我将开口，同时感到空虚。
:::

::: quote-card 张爱玲 variant=column-rule
你年轻么？不要紧，过两年就老了。
:::

::: quote-card 木心 · 云雀叫了一整天 variant=frame-brackets
你再不来，我要下雪了。
:::

---

## 对比卡 3 种 variant

:::: compare variant=column-card

::: pros 优点
- 纯前端无后端
- 所见即所得
- 一键复制到公众号
:::

::: cons 缺点
- 需要浏览器支持 Clipboard API
:::

::::

:::: compare variant=stacked-row

::: pros 收益
- 视觉一致的出稿节奏
:::

::: cons 代价
- 对 Markdown 写作有一点门槛
:::

::::

:::: compare variant=ledger

::: pros 入账
- 每次发文都自带排版资产
:::

::: cons 支出
- 初始化主题需要调参
:::

::::

---

## 分步 3 种 variant

::: steps 使用流程 variant=number-circle
### 写
在左侧编辑器里用 Markdown 写稿。

### 预览
右栏 375px 移动端实时预览。

### 复制
Ctrl / ⌘ + K 把富文本复制到公众号。
:::

::: steps 构建链路 variant=ribbon-chain
### 解析
markdown-it + 容器扩展把源文本拆成节点树。

### 样式
主题 CSS 写进 style 标签，juice 内联到每个元素。

### 打补丁
wxPatch 把公众号不兼容的语法改造为兼容形态。
:::

::: steps 发稿节奏 variant=timeline-dot
### 选稿
草稿抽屉挑一篇。

### 定主题
头部下拉切换主题；或自定义配色。

### 粘贴发送
打开公众号后台，粘贴富文本。
:::

---

## 分割线 5 种 variant

::: divider variant=wave
:::

::: divider variant=dots
:::

::: divider variant=flower
:::

::: divider variant=rule
:::

::: divider variant=glyph glyph=◆
:::

---

## 行内 & 基本元素

这段话测试**加粗**、*斜体*、`inline code`、==高亮==、[.着重.]、[~波浪~]、[链接](https://example.com/)。

列表：

- 第一项
- 第二项，含 `console.log('hi')`
- 第三项

有序列表：

1. 早起
2. 写作一小时
3. 读一本书

> 普通块引用：观点不需要花哨的排版也能立住。

```ts
export function hello(name: string): string {
  return `hello, ${name}`
}
```

---

## 签名容器 & 兜底 · abstract / key-number / see-also / note / free

::: abstract TL;DR
本文梳理 wechat-typeset 的 24+ 容器：覆盖五档提示（tip / warning / info / danger / note）、
三种签名块（abstract / key-number / see-also）、全部 33 个 variant。新容器在这里一次过目。
:::

::: key-number value="33" variant 数量
覆盖 admonition 16 × quote 4 × compare 3 × steps 3 × divider 5 × sectionTitle 2 × codeBlock 2。
换骨架不动 markdown 源码。
:::

::: note 第五态补注
note 是"中性补注"——不抢色（走 textMuted），与 tip / warning / info / danger 四态形成互补。
教程主题里最常见。
:::

::: see-also 延伸阅读
- [Headless 容器契约设计](https://example.com/headless)
- [微信硬约束清单](https://example.com/hard-rules)
- [主题 CRUD 工作流](https://example.com/theme-crud)
:::

::: free 编辑部补注
`free` 是兜底 escape hatch —— 渲染器刻意不施加主题样式，只套一层 `<section>`。
写不归类内容（致谢名单、编辑后记、补丁记录）的地方。
:::

---

## 底部组件

::: highlight 核心主张
保真复制、视觉一致、零外传 —— 三条不可妥协。
:::

::: footer-cta 关注作者 cta=每周一封来信
写写工具、写写产品、偶尔写写生活。
:::

::: recommend 推荐阅读
- [关于工具的工具](https://example.com/a)
- [关于阅读的阅读](https://example.com/b)
:::

::: qrcode 扫码关注
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: mpvoice 语音占位
用户粘贴富文本无法保留 `<mpvoice>`；此容器只渲染为占位提示。
:::

::: mpvideo qqvid=w0000examplevid
腾讯视频示例容器：占位 iframe 会保留 `v.qq.com` 白名单源。
:::

---

## Default 主题专属验证 · h4 / kbd / bare codeBlock

以下片段覆盖 default 落地后新增的渲染点 —— h4 层级在 steps 之外的独立出现、inline kbd 键帽、以及 bare variant 的 codeBlock（default 拒绝 header-bar）。

### 小节标题示例 h3

正文一段，紧接着 h4 作为更小一档的分项：

#### 分项 A · h4 独立出现

h4 在 default 里走 14px / 600 / text 色 —— 不染 primary（那是 tech-explainer 教程签名）。

#### 分项 B · 与 kbd 共现

按 <kbd>Ctrl</kbd> + <kbd>K</kbd>（或 Mac 下 <kbd>⌘</kbd> + <kbd>K</kbd>）复制富文本到公众号后台。

### bare codeBlock（default 默认）

default 的 codeBlock 走 bare variant，**没有** header-bar 语言标签带（那是 tech-explainer 签名）。代码块底色用中性深灰 `#2a2d32`，不沾 Atom One Dark `#282c34` / VSCode Dark+ `#1e1e1e` 出处：

```python
def greet(name: str) -> str:
    return f"hello, {name}"
```

> 同一段话用裸 blockquote：default 的 blockquote 走 3px primary 左边 + bgSoft 浅底 + textMuted 文字色。
