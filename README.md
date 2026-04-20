# wx-md 设计系统

本设计系统提取自 **[lync-cyber/wechat-typeset](https://github.com/lync-cyber/wechat-typeset)** —— 一款纯前端 Markdown → 微信公众号富文本编辑器（项目代号 **wx-md**）。

> 左边写 Markdown，右边 375 px 移动端实时预览，点一下把整篇文章当富文本复制出去——不跑后端、不登账号、不发任何数据到外部。

系统中存在**两个彼此独立的设计面**：

| 设计面 | 是什么 | 宽度 | 面向 |
| --- | --- | --- | --- |
| **编辑器外壳** | Vue 3 应用：顶栏、编辑器面板、预览面板、抽屉 | 桌面全屏 | 使用 wx-md 的作者 |
| **公众号文章** | 在 375 px 手机视口内渲染的 Markdown 产物 | **375 px（硬约束）** | 公众号移动端读者 |

**编辑器外壳**是一个朴素克制的工具界面（GitHub Primer 谱系的中性色、蓝色主色、CodeMirror 暗底编辑区）。**公众号文章**才是表达力所在——5 套内置主题（`default`、`tech-geek`、`life-aesthetic`、`business-finance`、`literary-humanism`）+ 配色生成器（10 套预设）共同决定最终产物的视觉语言。

微信公众号对 HTML 的硬约束塑造了本系统每一条视觉规则：

- **不允许 `<style>` 标签、不允许 `class`**：所有样式必须通过 `juice` 内联到元素。
- **不允许 `font-family`**：微信客户端会覆盖为系统字体；主题构建器只要探测到此字段就直接 `throw`。
- **不允许 `position`、`float`、`@media`、`@keyframes`、`:hover`、`-webkit-`、`flex gap`**：全部在渲染管线阶段剔除。
- **不允许外部字体、不允许 `::before` / `::after`**：所有装饰走 inline SVG 字符串。
- **375 px 移动端优先**：预览 iframe 锁定 375 px；字阶、间距、版面宽度都以此为基准。

## 资料来源

- **仓库**：https://github.com/lync-cyber/wechat-typeset（MIT · © 2026 lync-cyber）
- **在线 Demo**：https://lync-cyber.github.io/wechat-typeset/
- **已读取的关键文件**：
  - `src/App.vue`、`src/components/{Toolbar,Editor,Preview,ColorCustomizer,ComponentPalette}.vue`
  - `src/themes/types.ts` —— token schema
  - `src/themes/{default,tech-geek,life-aesthetic,business-finance,literary-humanism}/index.ts` —— 5 套主题
  - `src/color/palettes.ts` —— 10 套配色预设
  - `src/samples/common.ts` —— 全量容器示例 Markdown
  - `README.md`、`package.json`、`index.html`

## 索引

- `README.md` —— 本文（概览 · 文案 · 视觉 · 图标）
- `src/ui/tokens.css` —— **编辑器外壳 token**（Typesetter's Bench：纸 · 墨 · 朱）
- `tokens-spec.html` —— 编辑器外壳 token 的可视化规范页
- `colors_and_type.css` —— 5 套主题（公众号文章面）的 CSS 变量，含语义化元素样式
- `fonts/` —— 空目录（wx-md 刻意只用系统字体栈，见「字体」章节）
- `assets/` —— 从主题中提取的 logo、SVG 装饰（H2 前缀、分割、引号、步骤徽章、提示图标）
- `preview/` —— 设计系统 tab 的卡片（tokens、type、components、brand）
- `ui_kits/editor/` —— wx-md 编辑器外壳（顶栏 + 编辑器 + 预览三栏）的高保真复刻
- `ui_kits/wechat-article/` —— 5 套主题下 375 px 公众号产物的复刻
- `SKILL.md` —— Agent Skill 清单

## 文案基调（CONTENT FUNDAMENTALS）

wx-md 的文案是**简体中文的开发者工具语气**——克制、直白、文档级。技术术语保留英文并用反引号；日常交互全中文。

**语气**

- **断言式、专家式、不绕弯。** "不跑后端、不登账号、不发任何数据到外部。" —— 三句并列，没有一个缓冲词。
- **约束以事实陈述，不是警告。** "这是浏览器规则，不是工具的限制。"
- **在必要处把"为什么"写进 UI 文案。** 存选按钮的 tooltip："把编辑器当前选区保存为自创组件" —— 15 字说清"做什么、为什么"。

**格式与标点**

- 散文正文用**中文全角标点**：`，。；：、？！`
- 代码、路径、CLI 用**半角**：`npm run dev`、`127.0.0.1:7788`
- **中英/中数之间强制空格**（Pangu 约定）：`Node 18 +`、`375 px`、`Ctrl/⌘ + K`。整个仓库贯彻这一条。
- **代码/API 名放在反引号里**，即使在散文中："`navigator.clipboard.write(ClipboardItem)` 要求 secure context"。

**人称**

- **极少用「你」或「我」**。主语常省略或用第三人称。"草稿不离开本机。"（不是"你的草稿…"）
- 例外：tooltip 里偶尔用第二人称祈使句——"确定清空当前草稿？"

**Emoji**

- README 里仅作为功能要点的项目符号使用：🎨 🧩 📋 💾 ⌨️ 🔒 —— 一行一个，功能性而非装饰性。
- **UI 文案、按钮、标签、文章正文中从不使用。**
- 主题层明令禁止装饰性 emoji。

**在调文案示例**

| 场景 | 文案 |
| --- | --- |
| README 开头 | **纯前端 Markdown → 微信公众号富文本编辑器。** |
| 主要按钮 | `一键复制` |
| 次级按钮 | `草稿` / `模板` / `组件` / `存选` / `配色` |
| 状态反馈 | `已复制（富文本）` / `已复制（降级模式）` |
| 破坏性确认 | `确定清空当前草稿？此操作不可撤销。` |
| 空状态 | `还没有自创组件。在编辑器里选中一段 markdown，点顶部「保存选区」。` |
| 对比度检查 | `primary vs bg 对比度 = 4.8（通过 WCAG AA 3.0）` |
| 已知限制 | `微信语音 <mpvoice>：只能在公众号后台素材库插入，粘贴富文本无法保留。` |

**引用约定**。在散文中引用专有名词或按钮名时使用中文直角引号 `「」`：`点顶部「保存选区」`。从不使用 `""` 或 `""`。

## 视觉基础（VISUAL FOUNDATIONS）

### 两个设计面，两套调色盘

本系统的编辑器外壳采用独立性格 **「Typesetter's Bench（排字工作台）」**——纸、墨、朱三色主张，印刷体感为准。全部 token 定义在 **[`src/ui/tokens.css`](src/ui/tokens.css)**；可视化规范见 **[`tokens-spec.html`](tokens-spec.html)**（色阶 11 步、语义色 9 步、字阶 1.125、间距 4 的倍数、圆角封顶 6 px、阴影暖墨色偏、单一 `cubic-bezier(0.2,0.7,0.1,1)` 曲线 + 三档时长）。

**编辑器外壳 · Typesetter's Bench**——纸色底、墨黑字、校样红为唯一主张色。GitHub Primer 的原设定（蓝主色 `#2d6fdd`、灰边 `#e1e4e8`、白底 `#f5f6f8`）已被完整替换：

| 语义 | Light（默认） | Dark |
| --- | --- | --- |
| `--bg` / 应用底 | `paper-50` `#fdfcf8` | `ink-700` `#16140f` |
| `--surface` / 顶栏、抽屉 | `paper-100` `#f8f6ef` | `ink-600` `#1f1d18` |
| `--border` / 边框 | `paper-300` `#d8d4c4` | `ink-400` `#3e3b30` |
| `--text` / 主文 | `paper-800` `#2c2a22` | `ink-50` `#e7e5df` |
| `--accent` / 主色 · 校样红 | `proof-500` `#a83420` | `proof-400` `#c54a38` |
| `--editor-bg` / 编辑器槽位 | `ink-500` `#2a2822`（故意保留暗底作"工作台物件"） | 同 light |

校样红只允许出现在三种语境：**主按钮 / 错误 / 品牌与刻度标记**。三种以外不得使用，即便是小点缀。

**公众号文章**仍从 5 套主题中选其一（详见设计系统 tab 的 Colors 分组）。每套主题是一整组 token：`primary`、`secondary`、`accent`、`bg`、`bgSoft`、`bgMuted`、`text`、`textMuted`、`border`，加上四组状态色 `{tip, warning, info, danger}`，每组包含 `{accent, soft}`。**外壳与文章完全解耦**：tokens.css 不泄漏到 iframe 内，主题 token 也不进入外壳；改其一不影响另一。

### 字体

**两面两套策略。**

**编辑器外壳**采用三族印刷级字体栈（Typesetter's Bench）——**Display · Text · Mono** 三族，1.125 modular 字阶，基准 15 px：

```
--font-display: "GT Super Display", "Tiempos Headline", "Noto Serif SC", Georgia, serif
--font-text:    "Inter var", "Inter", -apple-system, "PingFang SC", sans-serif
--font-text OpenType features: "ss01","cv11","calt","kern"
--font-mono:    "JetBrains Mono NL", "Berkeley Mono", ui-monospace, "SF Mono", "Menlo"
```

字阶 8 档：`fs-11 / fs-12 / fs-13 / fs-14 / fs-15 (BASE) / fs-17 / fs-19 / fs-22 / fs-24 / fs-30 / fs-38`。Display 仅用于品牌标志与模态主标题；Mono 覆盖**全部数字**（字数、px、hex、hotkey、刻度）并强制 `tnum lnum`。字距：display `-0.02em`、snug `-0.005em`、大写 kicker `0.12em`。

**公众号文章**则**完全不声明字体**——微信客户端会覆盖任何 `font-family`，主题构建器探测到此字段就直接 `throw`。所以主题只管字号、字重、行高、字距。各主题在 375 px 下的字阶：

- **default**：基准 15 / 行高 1.8 / 字距 0.5 / H1 24 / H2 20 / H3 17
- **literary-humanism**：基准 16 / 行高 2.0 / 字距 1.0 / H1 25（居中、字距 2 px）/ H2 20 / H3 17 —— 呼吸最阔
- **business-finance**：基准 15 / 行高 1.75 / 字距 0.3 / H1 25 / H2 21（800 粗、左 5 px 色条）—— 最密、最硬

### 间距

**编辑器外壳**：11 步阶梯，4 的倍数，命名 `--sp-0..sp-10`，基数 `sp-3 = 8px`。组件间距默认走 `sp-3 / sp-4 / sp-5`；绝不出现非网格值。

```
sp-1 2 · sp-2 4 · sp-3 8 · sp-4 12 · sp-5 16 · sp-6 24 · sp-7 32 · sp-8 48 · sp-9 64 · sp-10 96
```

**公众号文章**则由各主题 token 控制 `{paragraph, section, listItem, containerPadding}`，跨主题范围：段落 margin-bottom 16–22 px、章节 H2 top-margin 26–34 px、列表项 6–12 px、容器内 padding 14–18 px。

### 背景

- **公众号文章**：通体平铺主题 `bg`，从不使用渐变、图片、pattern。容器内部使用 `bgSoft` 或 `bgMuted` 作为色块。
- **编辑器外壳**：纯白或浅灰平铺，无渐变、无图片。
- **装饰**：仅 inline SVG。单条 ≤ 2 KB，描边 ≥ 1 px（微信服务端会把 SVG 栅格化为 PNG，细线会消失）。母题：色条、点阵线、波浪线、装饰引号、数字徽章、角标。

### 动效

**产物零动效。** 微信会剥离所有动画。

**编辑器外壳**采用单一贝塞尔 `cubic-bezier(0.2, 0.7, 0.1, 1)`（`--ease-craft`）+ 三档时长：

- `--dur-instant 80ms` —— hover 底色、tooltip
- `--dur-quick 160ms` —— 按钮、tab、抽屉内小件（默认）
- `--dur-settled 280ms` —— 抽屉推入、模态入场

**无 spring、无 bounce、无 overshoot**；所有过渡线性收敛到静止。`prefers-reduced-motion` 下三档时长全部降到 `0ms`。这是写字工具，不是演示。

### 悬浮与按压（仅编辑器外壳）

- **Hover**：ghost 按钮底色变 `--surface-alt`（`paper-200`）；primary 从 `--accent`（`proof-500`）→ `--accent-hover`（`proof-600`）；抽屉内 tab hover → `--surface-alt`。
- **按压**：primary 降到 `--accent-press`（`proof-700`）；其它沿用浏览器默认。
- **激活 / 选中**：tab 保持纸色底 + 校样红下划线（不填主色），与旧版填色 tab 区别开。
- **焦点环**：双层 `0 0 0 2px var(--bg), 0 0 0 4px rgba(168,52,32,0.45)`，键盘可达性优先。

### 边框

- **编辑器外壳**：**1 px 实线**，颜色走 `--border`（`paper-300`）/ `--border-strong`（`paper-400`），暖纸色中性。刻度带 `ruler-strip` 由 8 px 短齿 + 48 px 长齿构成，长齿为朱红——这是品牌结构的一部分，不可替换。
- **文章主题**：边框色跟随各主题（`#e1e4e8` / `#d7dce3` / `#e0d1ba` / `#d7ccb2` / `#2a2f3a`）。虚线、点线、双线用于性格区分：life-aesthetic 用 dotted + dashed；literary-humanism 用 `3px double` 引用块；tech-geek 用 `1px dashed` H2 下边；business-finance 在 H2 左侧用一道粗 `5px solid`。

### 阴影系统

**编辑器外壳**三档阴影均以暖墨色 `rgba(35, 30, 20, α)` 渲染，而非中性黑——纸面基底要求投影带体温：

- `--shadow-rest` —— 顶栏底边、input 静态（几乎察觉不到的"纸压着纸"）
- `--shadow-lift` —— 抽屉、浮动面板（偏下投影，暗示自上而下照明）
- `--shadow-modal` —— 存选对话框（最重，"校样置于工作台"意象）
- `--shadow-inset` —— 编辑器槽位、代码块（内阴影暗示深度 / 横滚）

**文章产物**的阴影受微信约束仅保留两处：**代码块内阴影**（横滚提示）与**预览 iframe 外框**的淡阴影；很多浏览器粘贴到公众号时仍会剥掉 box-shadow，所以容器的层级仍靠边框、填色、SVG 达成。

### 透明与模糊

- **模态蒙层**：`rgba(31,35,40,0.42)`，无模糊。
- **删除按钮底**：`rgba(180,35,24,0.9)` —— 接近实色，透明仅为了"像贴上去的"。
- **装饰透明度**：SVG 引号以 `opacity: 0.3` 渲染；H2 前缀矩形以 `opacity: 0.6` 渲染。不用于文字或交互元素。
- **全系统不使用 `backdrop-filter`**，微信不支持。

### 圆角

- **编辑器外壳**：三档 + 一 pill，上限封顶 **6 px**——`--radius-0 0`（刻度带、主容器）、`--radius-1 3`（按钮、输入、tag）、`--radius-2 6`（模态、抽屉、卡片）、`--radius-pill` 仅用于状态点。**绝不**使用 8 px 以上的矩形圆角。
- 各主题 `sm / md / lg`（文章内部容器）：
  - default：`4 / 8 / 12`
  - tech-geek：`3 / 6 / 10`
  - business-finance：`2 / 4 / 6`（最锐利——"报告感"）
  - literary-humanism：`2 / 4 / 8`
  - life-aesthetic：`6 / 12 / 18`（最柔——"慢生活"）

### 卡片

本系统中的"卡片"指**文章内部的容器盒子**，不是后台管理界面的图块。它们包含：

- 填色：`bgSoft` 或状态 `soft` 色。
- Padding：`12–22 px`，随主题和容器种类浮动。
- 主题 `sm / md / lg` 某一档的圆角。
- **左侧 3–5 px 主题色竖条**（`accent-bar` 容器变体，全部主题默认采用）。
- 不投阴影。很多浏览器在粘贴到公众号时都会剥掉 box-shadow。

全系统提供 6 种 admonition 变体：`accent-bar`、`pill-tag`、`ticket-notch`、`card-shadow`、`minimal-underline`、`terminal` —— 每个变体对应一个渲染模块，CSS 拼接 ≤ 400 字符以保粘贴稳定性。

### 布局规则

- **预览 iframe 锁死 375 px**，从不自适应；物理宽度是硬约束，因为公众号读者是手机优先。
- **编辑器外壳**：三栏 flex —— 草稿抽屉（条件）/ 编辑器 / 预览。右侧抽屉（组件面板 340 px、配色面板 360–440 px、模板市场）从右覆盖。
- **文章产物不用 CSS Grid**（微信不友好）。对比容器用 `display: table-cell` 兜底。
- **顶栏固定 48 px**；文章正文内无 sticky 元素。

### 图像色调

仓库不自带任何摄影素材；样例中用 `placehold.co` 占位。主题对文章中的图像只做两件事：`border-radius: 4–10 px` 与 `max-width: 100%`。不加滤镜、不做调色、不加颗粒。氛围全部交给主题调色盘。

## 图标规范（ICONOGRAPHY）

**主题内嵌 inline SVG 字符串，手工、极简。** wx-md **不用**图标字体。**不引入** Lucide、Heroicons 或任何 CDN 图标集。**不用** Unicode 字符作为正式图标。**不在**文章正文中使用 emoji。

**每一个出现在文章中的图标，都是主题 `assets` 映射中手写的 inline SVG**。每个图标满足：

- viewBox ≤ 40×32，实际渲染 ≤ 34 px 宽
- 单色（主题 token：primary / accent / status accent）
- 描边 ≥ 1.5 px（微信服务端 SVG→PNG 会吃掉更细的线）
- **不含 `<style>`、`<script>`、外部引用、`url(#id)`**
- 需要"白"时用 `#fefefe` 而非 `#ffffff`——纯白会在微信 PNG 转换中变透明

**主题 `assets` 字段**：

```
h2Prefix | h3Prefix | dividerFlower | dividerWave | dividerDots
quoteMark | listBullet | sectionCorner | stepBadge(n)
tipIcon | warningIcon | infoIcon | dangerIcon
```

默认主题的 SVG 已拆分至 `assets/` 目录（`h2-prefix.svg`、`divider-wave.svg` 等独立文件）。编辑器外壳自身**完全不使用图标**——按钮全是纯文字标签（`草稿`、`模板`、`组件`、`配色`、`HTML`、`MD`、`长图`）。这是一种刻意的克制。

**Emoji**。只在 README 功能要点中（🎨🧩📋💾⌨️🔒）。UI 不用。文章不用。不用作图标替身。

**Unicode 当图标用**。仅 `divider` 容器提供 `glyph` 变体，允许使用 `§ ❦ ◆` 等单字符做分隔。这是系统中唯一允许 Unicode 作装饰的位置，并且需要主动开启。

## 已知缺口与替代

- **字体**：未做替代——本系统本就不携带字体，「系统字体栈」即设计。任何未来试图声明 `font-family` 的主题都应视为 bug，`themeCSS` 会直接 `throw`。
- **SVG**：默认主题的 SVG 已从 `src/themes/default/index.ts` 原样拆出；其他主题的 SVG 变体位于各自 `assets.ts`，本系统在设计卡中有代表性展示但未逐条拆文件。
- **编辑器复刻**：`ui_kits/editor/` 为 JSX 复刻，CodeMirror 编辑区用暗底占位——CodeMirror 6 的完整 runtime 在原型中不必引入。

---

完整 token 与组件清单请打开**设计系统 tab**查看。
