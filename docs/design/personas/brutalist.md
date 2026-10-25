# Brutalist · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / containers / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**brutalist 不是"做旧暗黑皮肤"，是"凌晨三点印刷厂"。** 参照坐标是 punk-zine 的撕贴排版、Plan 9 / VT220 终端的等宽节奏、地下杂志 *Mute* / *032c* 的近黑底 + 荧光强调色单点用色纪律、Wim Crouwel / Total Design 的极简栅格但反向走"反精致"。气质关键词：**夜班、印刷、荧光黄、反色、直角**。拒绝坐标：拒绝 Tron 霓虹绿渐变（赛博朋克叙事），拒绝 cyberpunk 多色高饱（电竞气），拒绝玻璃拟态 / 卡片阴影 / 圆角柔化（一切"软"），拒绝多种 accent 色（破坏"单色稀缺"纪律）。

一句话收束：**brutalist 应该让读者觉得"这是凌晨三点抢印的简报样张——只有一种黄是被允许的"**。

---

## 三条不可妥协决策

| # | 决策 | 理由 |
|---|---|---|
| 1 | `radius = { sm:0, md:0, lg:0 }` 全直角 | 圆角即软，软即软文。粗野主义的几何语言是**未加工的版面骨架**，任何弧度都把"粗野"软化成"复古" |
| 2 | `primary = #ebff00` 荧光黄，唯一强调色 | 整篇文章里，黄色等同于"被点名"。文中需要被点名的位置只有：章节编号、关键术语 `==highlight==`、编者按、inline code、subtitle pill。多于这些，黄色就贬值成装饰 |
| 3 | status 四联词 `NOTE / TIP / WARN / HALT` | 跳出 mkdocs 的 `INFO / TIP / WARN / STOP` 工业默认。"HALT" 比 "STOP" 更 brutalist-aggressive（承袭终端 / 汇编语言传统）；语义信号靠 **色相 + 方括号 [TAG] 字** 双重冗余，不靠纯色块 |

---

## 签名动作三条

读者应该一眼把这篇文章认出是 brutalist 主题。三条视觉签名：

1. **三栏 ribbon 刊头**（masthead `kicker` 模式）：上下双 2px 实线 + monospace 三栏（`第 04 期 | 慢读 | 2026.04.22`），中间期名是荧光黄。这是粗野主义版面骨架的"压舱物"——开篇定调，结尾的 colophon 以同款双线对称收束
2. **主色编者按**：`note variant=editorial-stripe` 用主色竖线与标题标出编辑发声；整篇控制出现次数，保持强调色稀缺
3. **旋转贴纸金句**（quote.tilted-sticker）：反色卡片 `transform: rotate(-1deg)` + 大字 sans 粗体左对齐。punk-zine 的撕贴语义——金句不是被尊敬地引用，是被"贴"上去的

---

## 色板理由

色板理由（11 token，简表，理由不必逐项 padding）：

| token | 值 | 角色 |
|---|---|---|
| `primary` | `#ebff00` | 荧光黄（唯一强调色） |
| `secondary` | `#a0a0a0` | 灰辅助（与 textMuted 同源） |
| `accent` | `#ebff00` | = primary（不引入第二强调色——多于一种 accent 即破坏"稀缺纪律"） |
| `bg` | `#0a0a0a` | 近黑底（非纯黑：纯黑 `#000` 在公众号 PNG 光栅化时偶发偏紫，#0a0a0a 稳） |
| `bgSoft` | `#1a1a1a` | 次级深色块（KPI / highlight 等次要容器） |
| `bgMuted` | `#2a2a2a` | 再上一档（图片占位斜纹 / inline code 备选） |
| `text` | `#f0f0f0` | 近白字（不用 `#fff` 规避 SVG → PNG 透明化） |
| `textMuted` | `#a0a0a0` | 灰辅助（byline / 脚注 / 时间戳） |
| `textInverse` | `#0a0a0a` | = bg（**反色 token 语义反转**：在荧光黄 / 浅色贴纸上的文字色） |
| `border` | `#f0f0f0` | = text（强对比双粗线 / 章节顶线 / qa-block 边框） |
| `code` | `#ebff00` | = primary（行内代码黄底，与 strong 同色但不同形态） |

**status 四态打破交通灯**：

| 语义 | accent | 设计稿标签 | 理由 |
|---|---|---|---|
| info | `#4488dd` | `[NOTE]` | 冷蓝，参见性附注 |
| tip | `#66cc66` | `[TIP]` | 绿，正向提示 |
| warning | `#ebff00` | `[WARN]` | **黄 = primary**——粗野主义里 warning 是最常出现的语义（"小心这里"），让它与主色同源形成视觉节奏 |
| danger | `#ff3355` | `[HALT]` | 鲜红 + HALT 字（不用 STOP——STOP 太工业）。整篇最多 1 次的稀缺位 |

**拒绝渐变 / 拒绝多 accent / 拒绝半透明**：所有颜色 hex 直给，bg/text 严格反色，accent 单色。半透明叠加在公众号 PNG 光栅化时不稳定。

---

## 当前实现入口

[PersonaSpec](../../../src/core/themes/brutalist/persona.data.ts) 定义色板、默认骨架与样式；[主题样稿](../../../src/samples-md/sample-brutalist.md) 提供完整写法。设计原型用于对照视觉意图，语法以 [写作契约](../../contract/README.md) 为准。

| 设计元素 | 复用方式 |
|---|---|
| 三栏刊头 | `masthead` 的 `kicker`、`issue`、`date` 属性 |
| 虚线目录 | `toc` + `toc-item`，主题设置外框 |
| 章节编号 | `decorations.headingPrefix`，作者只写 Markdown 标题 |
| 旋转贴纸金句 | `quote.tilted-sticker` 骨架 |
| 编者按 | `note variant=editorial-stripe` |
| 问答 | `qa-block`，主题默认 `typed-block` 骨架 |
| NOTE / TIP / WARN / HALT | `news-row` 骨架，作者通过标题设置标签 |
| 三栏互动 | `footer-cta variant=triptych-actions` |
| 订阅卡 | `qrcode variant=follow-card` |
| 参考文献 | `footnotes`，各条引用间保留空行 |
| 卷尾信息 | `colophon`，与刊头的双线呼应 |

## 平台边界

- 多栏布局采用 `table`、`inline-block` 或 `block`；不可依赖 flex/grid 在公众号中维持布局。
- 视觉层次依靠颜色、字重、字距和边框，不能只依赖特定字体。
- 作者不需要内联 HTML；视觉签名由容器、骨架与主题配置表达。
- 公众号处理规则以 [平台契约](../../contract/platform.md) 为准，发布前按 [验收清单](../../release-checklist.md) 检查实际预览与粘贴结果。
