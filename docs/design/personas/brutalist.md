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
| 2 | `primary = #ebff00` 荧光黄，唯一强调色 | 整篇文章里，黄色等同于"被点名"。文中需要被点名的位置只有：章节编号、关键术语 `==highlight==`、editor-note 整块、inline code、subtitle pill。多于这些，黄色就贬值成装饰 |
| 3 | status 四联词 `NOTE / TIP / WARN / HALT` | 跳出 mkdocs 的 `INFO / TIP / WARN / STOP` 工业默认。"HALT" 比 "STOP" 更 brutalist-aggressive（承袭终端 / 汇编语言传统）；语义信号靠 **色相 + 方括号 [TAG] 字** 双重冗余，不靠纯色块 |

---

## 签名动作三条

读者应该一眼把这篇文章认出是 brutalist 主题。三条视觉签名：

1. **三栏 ribbon 刊头**（masthead `kicker` 模式）：上下双 2px 实线 + monospace 三栏（`第 04 期 | 慢读 | 2026.04.22`），中间期名是荧光黄。这是粗野主义版面骨架的"压舱物"——开篇定调，结尾的 colophon 以同款双线对称收束
2. **荧光黄整块 editor-note**：通栏荧光黄底 + 反色"编 · 者 · 按" kicker + 反色正文。整篇 1 次出现，承担"编辑发声"的视觉重量
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

## 复用关系（架构纪律）

brutalist 严格遵守"最大复用 + 最小架构侵入"原则。新引入的容器组件为 **0** 个。新引入的变体为 **1** 个（`quote.tilted-sticker`，generic，可被未来 zine / punk 主题复用）。其余视觉签名全部走现有词汇 + spec patch：

| 设计元素 | 复用方式 |
|---|---|
| masthead 三栏 ribbon | `masthead` 容器增 `kicker` attr → 三栏布局开关（通用增强） |
| toc 虚线框 | spec.containers.toc 覆盖 `border: 1px dashed` |
| cover-header 大字 + subtitle pill | h1 元素样式 + 一段 `::: highlight` 黄底 |
| byline 灰小字 | `::: author` + spec.containers.author 覆盖 |
| intro 关键词高亮 | spec.inline.highlight = 黄底反色 |
| section-heading 顶线 + 黄序号 | spec.elements.h2 + decorations.headingPrefix `arabic-padded` |
| sub-heading 黄色 2.x | spec.elements.h3 + decorations.headingPrefix `arabic-section` |
| pull-quote 旋转贴纸 | `quote.tilted-sticker` variant（**唯一新增**） |
| image yellow 边框 | spec.elements.img 边框 |
| inline / block code 黄底反色 | spec.elements.code / pre |
| callout 黄整块 | `::: editor-note` + spec.containers.editorNote 覆盖 + innerStyles.editorNoteKicker 反色 |
| Q&A 终端风 | data-brief `::: qa-block` + spec.containers.qaBlock 边框收紧 |
| multi-callout NOTE/TIP/WARN/HALT | data-brief `admonition: news-row` 变体 + 作者写 `::: info NOTE` 覆盖徽章字 |
| CTA 三栏 | data-brief `::: cta-bar` |
| qr-follow | data-brief `::: qr-follow` |
| footnotes fn[] | data-brief `::: footnotes` + 紧凑灰小字覆盖 |
| divider em-dash bar | spec.elements.hr = 2px 黄色实线（语义等价的"光栅化"近似） |
| end-marker 完 badge | 用 `**完**` markdown + spec.elements.strong = 黄色（视觉等价） |
| footer colophon | data-brief `::: colophon` + 上 2px 双粗线覆盖（与 masthead 头尾呼应） |

**新增内层样式槽位 1 个**：`innerStyles.editorNoteKicker`。理由：editor-note renderer 内 kicker 颜色硬编码为 `primary`，brutalist 把 editor-note bg 涂满 primary 后 kicker 与 bg 同色不可见——这是个**所有用 primary 整块底色的主题**都会遇到的问题，把 kicker 提到 innerStyles 槽位与现有 `abstractKicker` / `keyNumberKicker` / `seeAlsoTitle` 同构。

**新增 masthead 属性 1 个**：`kicker`。理由：粗野主义的三栏 ribbon 刊头（issue / name / date）是杂志编辑系常见的视觉骨架，但与 data-brief 默认的"刊名左 + 期号·日期右"两栏不同。给 masthead 一个可选 `kicker` 属性切换布局，是更通用的"杂志期次条" pattern，未来其他报刊感主题（如 zine、newsweek）可直接复用。

---

## 微信公众号兼容性

| 风险点 | brutalist 处理 |
|---|---|
| `font-family` 全平台被剥 | 不依赖等宽字体的视觉信号——letter-spacing + 字号节奏承担"等宽气质"。tilted-sticker 不写 monospace 字体属性 |
| `flex` 被 wxPatch 转 block | masthead ribbon / cta-bar / qa-block / qr-follow 全部走 `display: grid` 或 `display: table`（公众号粘贴稳定） |
| `transform: rotate(-1deg)` 是否被剥 | 不在 `FORBIDDEN_POSITION_PROPS` 列表（position/top/right/bottom/left/z-index 才被剥）。tilted-sticker 在公众号粘贴期保留 |
| 纯白 `#ffffff` → 透明（PNG 光栅化） | 全主题用 `#f0f0f0` 替代纯白，`#fefefe` 替代 SVG 内白 |
| `repeating-linear-gradient` 图片占位 | 公众号实测对 gradient 支持不稳定——brutalist 改用纯 hex bgMuted 底（spec.elements.img 黄框承担"占位"视觉） |
| `aspect-ratio` 可能被剥 | brutalist 不依赖 aspect-ratio——图片走原图比例，img 黄框由 border 承担识别 |
| `display: grid` 在 masthead/qa-block | grid 在 themeCSS 层会被守卫拒绝，但 renderer 在 **inline style** 里写 grid 是被允许的（被 wxPatch 后由 grid 退化为 block，子项作为兄弟堆叠——masthead 三栏会变成三行，仍可阅读；这是合规的优雅降级） |

---

## 未复用而新增实现的清单（终归只有 3 项）

| 新增项 | 类型 | 通用性论证 | 替代方案被驳回原因 |
|---|---|---|---|
| `quote.tilted-sticker` variant | 变体 | punk-zine "撕贴纸" pull-quote 是公认视觉档位，未来任何 zine / 朋克编辑系主题可复用 | 复用 `quote.classic`：locks `text-align: center` 与 `border-radius: 8px`；不符合左对齐 + 直角硬边要求 |
| `masthead.kicker` attr | 容器属性 | 报刊三栏期次条（kicker / name / date）是杂志编辑系经典骨架；未来 zine / newsweek / mook 主题可直接复用 | 新增 `issue-band` 容器：违反"能扩配置不新增容器"纪律。masthead 已是刊头容器，加一个 attr 切布局是最小侵入 |
| `innerStyles.editorNoteKicker` | 内层样式槽位 | 任何把 editor-note 整块涂成 primary 底色的主题都会遇到 kicker 与 bg 同色的问题；与既有 `abstractKicker` / `keyNumberKicker` 同构 | 修改 editor-note renderer 硬编码：会让其他主题失去主题作者覆盖的入口 |

---

## Owner notes

- **设计稿与实现的明确妥协**：（1）设计稿原 cover-header 36px 大字 + display:inline-block subtitle pill：brutalist 落地用 h1 30px + 独立段 `::: highlight` 黄底块表达，少 1 个像素维度的"贴边"感但语义等价；（2）设计稿 `━━━━━━━━━━━━━━━━━━━━━━━━━━` 等宽破折分割线：brutalist 落地为 hr 黄色 2px 实线（font-family 被剥后真等宽不可达，光栅化等价物即可）；（3）news-row admonition 徽章默认是宽边距 + 大写徽章字，没有 `[NOTE]` 方括号——作者在 ctx.info 里自写 `[NOTE]` 即可（写作侧成本极低）
- **作者契约的稳定性**：本主题不要求作者写任何内联 HTML。所有视觉签名走容器 / decoration / spec patch 表达。换主题不动稿
- **未来扩展**：tilted-sticker 的 -1deg 角度刻意保守。若未来出现更"猛"的 zine 主题想要 -3deg 撕贴感，可在 variant 里加可选 attr 而非新开一个 variant
