# wechat-typeset · 全量容器 & 变体回归 fixture

> 本文档**不是**用户看到的预览样张，是 `tests/verify-sample-full.ts` 的端到端
> 渲染回归 fixture：覆盖全部 41 个容器、9 类 variant 全部 id、5 种行内扩展。
>
> 用户态默认样张（短、有叙事）在 `src/samples-md/sample-{themeId}.md`；
> 用户态组件参考（按主题枚举）由 `scripts/build-references.ts` 自动生成。
> 本 fixture 永远不会被打包进 `SAMPLE_BY_THEME`。

::: intro 一句话摘要
把 Markdown 写得像设计稿，把复制粘贴到公众号的体验当作一等公民。
:::

::: cover 本期封面 issue="023" date="2026-04-22" kind="周刊"
![封面占位](https://placehold.co/1200x630?text=wechat-typeset)
:::

::: author 作者 role=主理人 issue="023" date="2026-04-22"
负责全栈内容生产，关注工具、写作与研究方法。
:::

::: author-bio avatar="https://placehold.co/80x80?text=A" name="顾留白" role="专栏作者 · 城市观察"
非虚构写作 8 年，关注城市与日常。出版《街头三十年》《在场》。
:::

---

## Part 1 · 基础语法 & 行内扩展

### 标题层级

# H1 标题（22px）
## H2 标题（19px）
### H3 标题（16px）
#### H4 标题（14px）
##### H5 标题
###### H6 标题

### 段落 + 行内扩展

本段测试 **加粗**、*斜体*、`inline code`、==高亮==、~~删除~~、++插入++、[.着重.]、[~波浪~]、[链接](https://example.com/)、按 <kbd>Ctrl</kbd> + <kbd>K</kbd> 复制。

### 列表 / 引用 / 表格 / hr / 代码 / 图

- 无序一
- 无序二，含 `console.log('hi')`
- 无序三

1. 有序一
2. 有序二
3. 有序三

> 普通块引用：观点不需要花哨的排版也能立住。

| 主题 | 基调 | 适用 |
| --- | --- | --- |
| default | 中立 | 通用 |
| tech-geek | 深色 | 技术 |

---

```ts
export function hello(name: string): string {
  return `hello, ${name}`
}
```

![段内图](https://placehold.co/600x300?text=image)

---

## Part 2 · base 容器全集

### structure

::: section-title 章节标题（bordered 默认） variant=bordered
:::

::: section-title 章节标题（cornered 备选） variant=cornered
:::

::: section-title 01 · 编号前缀 variant=number-prefix
:::

::: section-title 学术前沿 kicker="CHAPTER ONE" variant=kicker-stack
:::

::: section-title 缘起 stamp=章 variant=ribbon-stamp
:::

### admonition 五态 + announcement

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明，请关注最末公告。
:::

::: tip 小贴士
高亮 `ctx.tokens` 里的色值——主题切换时会自然同步。
:::

::: warning 注意
`:::: compare` 必须用 4 个冒号，内层 pros/cons 用 3 个。
:::

::: info 说明
公众号不支持 `<style>` 块与 `class`——所有样式在导出阶段内联。
:::

::: danger 警告
禁止在主题里写 `font-family`；`themeCSS` 会抛 `ThemeAuthoringError`。
:::

::: note 第五态补注
note 不抢色、走 textMuted —— 用于"不构成警示、但读者可能错过"的旁注。
:::

### content

::: quote-card 王小波
一个人的成熟不是年纪的加法，而是欲望的减法。
:::

::: highlight 核心主张
保真复制、视觉一致、零外传 —— 三条不可妥协。
:::

:::: compare
::: pros 选择 wechat-typeset
- 一个工具打穿写、排、发
- 主题与内容解耦
:::
::: cons 暂不适合
- 强动效内容
- 短平快营销号
:::
::::

::: steps 实战流程
### 写初稿
把素材粘到左侧编辑器，先保证结构。

### 套主题
上方下拉切换主题，右侧实时 375px 预览。

### 一键复制
点右上角"一键复制"，粘贴到公众号后台。
:::

::: image-caption src="https://placehold.co/600x400?text=fig" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::: timeline-item year="2026" 正式开源
MIT License。
:::
::::

### navigation / media

::: divider variant=rule
:::

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

::: recommend 推荐阅读
- [前作](https://example.com/a)
- [续篇](https://example.com/b)
:::

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: voice-card title="开篇语" src="placeholder.mp3"
:::

::: video-card qqvid=w0000examplevid title="产品演示"
:::

### signature（base 三件）

::: abstract TL;DR
本文梳理全部 41 个容器与全部 33 个 variant，用于端到端渲染回归。
:::

::: key-number value="41" 容器总数
覆盖 admonition / quote / compare / steps / divider / sectionTitle / codeBlock / note / footnotes 九类 variant。
:::

::: recommend variant=academic-refs 延伸阅读
- [Headless 容器契约设计](https://example.com/headless)
- [微信硬约束清单](https://example.com/hard-rules)
:::

### free

::: free 编辑部补注
`free` 是兜底 escape hatch —— 渲染器刻意不施加主题样式。
:::

---

## Part 3 · pack:editorial 容器全集

::: masthead 慢读简报 issue="004" date="2026.04.22" kicker="第 04 期"
:::

<!-- section-tag 仅在 editorial-mook / data-brief / swiss-grid 等"刊物化"主题渲染签名视觉；其它主题走中性 fallback。用 DEMO 中性词避免暗示某主题专属。 -->
::: section-tag DEMO
:::

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

:::: toc INDEX layout="split" meta="目次排布采用 12 栏 / 1/3 : 2/3 比例"
::: toc-item no="01" page="p.04" 失去耐心的结构
:::
::: toc-item no="02" page="p.08" 慢读三练习
:::
::: toc-item no="03" page="p.14" 夜晚作为阅读时区
:::
::::

::: qa-block READER Q&A q="周末仅余两小时，能读完一本书吗？"
不能。能读完的不是书，是书的大意。两小时只够与一章相处。
:::

::: info INFO variant=news-row
说明一：深夜读书请保持光源在书后侧 45°。
:::

::: tip TIP variant=news-row
小贴士：配温水一盏。
:::

::: warning WARN variant=news-row
警告：手机应在别屋充电。
:::

::: danger STOP variant=news-row
严禁：忌在短片毕后翻书。
:::

::: note variant=editorial-stripe 编 者 按
慢读并非复古姿态，而是一种对自己时间主权的重新申明。
:::

::: note variant=research-dense 方法论
本文数据为作者自行整理，n=1,024，样本覆盖 18–72 岁都市读者；"连续阅读"定义为不被通知或切屏中断、持续 5 分钟以上的阅读行为。
:::

::: footnotes 注释 variant=lined
[1] 数据覆盖 2010–2025，以两年滑动窗口平滑。
[2] "深度理解"取自阅读后 24h 回忆测试，满分 100。
:::

::: footnotes 参考文献 variant=inline-flow
[1] 全国国民阅读调查 2015–2024 · [2] CNNIC 第 53 次报告 · [3] OECD Reading Habits Survey 2023 · [4] 国家图书馆 全民阅读数据简报 2024 · [5] 作者调研 n=1,024
:::

::: footnotes 编者随谈 variant=boxed-aside
[1] 关于"慢"的定义，本刊从未给出标准答案。
[2] 引文出处见上期目录页 §3。
:::

::: footnotes END NOTES variant=top-rule
[1] 数据采集 2023Q4-2024Q3，覆盖一线 + 新一线 32 城。
[2] "30 岁以下"定义见样本说明 §1.2，含 18-29 岁段。
:::

::: footnotes REFERENCES variant=dense-academic
[1] Chen, Y., & Wang, L. (2024). Representation collapse under low temperature. *NeurIPS Proceedings*, 38, 1124-1138.
[2] He, K., et al. (2020). Momentum contrast for unsupervised visual representation learning. *CVPR*, 9729-9738.
:::

::: footer-cta variant=triptych-actions like="♡ 赞同" star="★ 收藏" share="↗ 转发"
:::

::: qrcode variant=follow-card 慢读简报 desc="每周四，一封邮件，一组数据" kicker="SUBSCRIBE"
:::

::: qrcode variant=qr-stack 慢读简报 desc="每周四，一封邮件，一组数据" kicker="SUBSCRIBE"
:::

::: colophon next="纸本之必要：论书脊与手指的记忆" issue="第 004 期 · 2026"
:::

---

## Part 4 · pack:data-viz

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="−68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::: kpi-item label="02 · UNLOCK/DAY" caption="日均手机解锁" value="138" unit="次" delta="+23%" trend="up" series="11,10,9,8,7,5,3,2" foot="'15 41次 → '24 138次"
:::
::: kpi-item label="03 · BOOKS/YR" caption="年均完整阅读" value="2.7" unit="本" delta="±0" trend="flat" series="7,6,8,7,8,6,7,7" foot="'15 2.8本 → '24 2.7本"
:::
::::

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="n=1,024 · 单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::: bar label="45–59" pct="58" value="29 分"
:::
::: bar label="30–44" pct="34" value="17 分"
:::
::: bar label="18–29" pct="16" value="8 分"
:::
::: bar label="<18" pct="10" value="5 分" tone="warn"
:::
::::

---

## Part 5 · Variant 目录

### admonition · 27 variants

::: tip 温和提示 variant=accent-bar
accent-bar 骨架 —— 左侧 3px 色条 + 浅底 + 右侧轻圆角。
:::

::: warning 注意事项 variant=pill-tag
pill-tag 骨架 —— 顶部胶囊标签 + 下沉外框。
:::

::: info 背景补充 variant=ticket-notch
ticket-notch 骨架 —— 票根缺口样式。
:::

::: danger 风险警示 variant=card-shadow
card-shadow 骨架 —— 悬浮卡片式。
:::

::: tip 极简提醒 variant=minimal-underline
minimal-underline 骨架 —— 无底色，仅下划线与缩进。
:::

<!-- themeCompat: tech-geek / default 推荐；其它主题切换后将自动 fallback -->
::: info 终端风格 variant=terminal
terminal 骨架 —— 顶部三色圆点 + 等宽正文。
:::

<!-- themeCompat: tech-geek 独占；其它主题切换后将自动 fallback -->
::: tip // NOTE variant=dashed-border
dashed-border 骨架 —— 左 2px 虚线 + 浅底。
:::

<!-- themeCompat: tech-geek 独占；其它主题切换后将自动 fallback -->
::: danger // PITFALL variant=top-bottom-rule
top-bottom-rule 骨架 —— 顶底 1px 实线，报纸 errata 勘误条。
:::

<!-- themeCompat: tech-geek 独占；其它主题切换后将自动 fallback -->
::: tip 工程附注 variant=manpage-log
manpage-log 骨架 —— 顶底分隔线 + `:: NOTE ::` 状态条。
:::

<!-- themeCompat: academic-frontier 独占；其它主题切换后将自动 fallback -->
::: info 定义 variant=sidenote-latex
sidenote-latex 骨架 —— 1px 细边框 + `DEFINITION.` 小型大写起始。
:::

<!-- themeCompat: literary-humanism 独占；其它主题切换后将自动 fallback -->
::: warning 按 variant=marginalia
marginalia 骨架 —— 无框无底、墨色一色。
:::

<!-- themeCompat: business-finance 独占；其它主题切换后将自动 fallback -->
::: danger 异常 · ALERT variant=ledger-cell
ledger-cell 骨架 —— 深色表头条 + 硬边框。
:::

<!-- themeCompat: life-aesthetic 独占；其它主题切换后将自动 fallback -->
::: tip 今日小发现 variant=bubble-organic
bubble-organic 骨架 —— 大圆角 + 单侧柔软阴影。
:::

<!-- themeCompat: people-story 独占；其它主题切换后将自动 fallback -->
::: info 采访手记 variant=magazine-pull
magazine-pull 骨架 —— 上下细线 + 浮空小字标签。
:::

<!-- themeCompat: industry-observer 独占；其它主题切换后将自动 fallback -->
::: warning 需要警惕 variant=report-section
report-section 骨架 —— 顶 3px 底 1px + § 方角标签。
:::

<!-- themeCompat: data-brief 独占；其它主题切换后将自动 fallback -->
::: info INFO variant=news-row
news-row 骨架 —— 左 3px 色条 + 实色徽章 + 紧凑单行。
:::

<!-- themeCompat: swiss-grid 独占；其它主题切换后将自动 fallback -->
::: info INFO variant=news-underline
news-underline 骨架 —— 实色徽章 + 1px 黑竖分隔 + 1px 黑底线。
:::

<!-- themeCompat: editorial-mook 独占；其它主题切换后将自动 fallback -->
::: info variant=mook-tag
mook-tag 骨架 —— 米卡纸底 + 主色左条 + 単字 CJK 标签。
:::

<!-- themeCompat: brutalist 独占；其它主题切换后将自动 fallback -->
::: danger STOP variant=slab-corner
slab-corner 骨架 —— 顶部 6px 硬条 + 右上 accent 方块徽章 + zero-radius。
:::

<!-- themeCompat: official-gazette 独占 -->
::: tip 告示 variant=numbered-rule
numbered-rule 骨架 —— 顶 2px + 底 1px 大字距 NOTICE·N° 横线。
:::

<!-- themeCompat: official-gazette 独占 -->
::: tip variant=hanging-nb
hanging-nb 骨架 —— 左侧 N.B. 缩写 + 编号 + 竖分隔。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: tip 告示 variant=vermilion-seal
vermilion-seal 骨架 —— 右上 -3° 旋转方框朱印。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: tip 告示 variant=paper-slip
paper-slip 骨架 —— 左竖排黄签条 + 底 1px border。
:::

<!-- themeCompat: life-aesthetic 独占 -->
::: tip 告示 variant=field-tag
field-tag 骨架 —— FIG.CAVE + Notabene + 短刻度。
:::

<!-- themeCompat: life-aesthetic 独占 -->
::: tip 告示 variant=specimen-box
specimen-box 骨架 —— 左 1px border 方格 N°。
:::

<!-- themeCompat: brutalist 独占 -->
::: tip 告示 variant=triangle-top
triangle-top 骨架 —— 顶 -9px 三角徽 + 1px 边框。
:::

### quote-card · 14 variants

::: quote-card 苏轼 · 前赤壁赋 variant=classic
逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。
:::

::: quote-card 王小波 variant=left-bar
left-bar 骨架 —— 左 4px 实线竖条 + 左对齐 + 中文双破折号 byline。
:::

::: quote-card EDITORIAL · 03 variant=editorial-block
editorial-block 骨架 —— 左 6px 实色条 + 浅底 + 大写字距 byline。
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

::: quote-card BORGES, J.L. variant=tilted-sticker
"凡我所是，皆因我读。"
:::

<!-- themeCompat: editorial-mook 独占 -->
::: quote-card 韩少功《马桥词典》 variant=oversized-mark
沉默是一种回答，只是我们经常听不见。
:::

<!-- themeCompat: editorial-mook 独占 -->
::: quote-card 黑塞·《德米安》 variant=numbered-lines
我们终其一生，是为了摆脱他人的期待，找到真正的自己。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: quote-card 纳兰性德 variant=seal-kai
人生若只如初见，何事秋风悲画扇。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: quote-card 黄庭坚 variant=double-frame
念念不忘，必有回响；有灯，就有人。
:::

<!-- themeCompat: academic-frontier 独占 -->
::: quote-card Fragment IX variant=specimen-quote
所有过往的失败，都是为了让今天的失败显得不那么难以承受。
:::

<!-- themeCompat: academic-frontier 独占 -->
::: quote-card M. PROUST · 1923 variant=binomial-attrib
真正的旅行不在于看到新的风景，而在于换一双新的眼睛。
:::

<!-- themeCompat: swiss-grid 独占 -->
::: quote-card SHAKESPEARE · TEMPEST variant=huge-numeral
凡是过往，皆为序章。
:::

<!-- themeCompat: swiss-grid 独占 -->
::: quote-card D. RAMS, 1976 variant=ring-device
设计不是装饰，而是某种秩序的可视化。
:::

### compare · 8 variants

:::: compare variant=column-card
::: pros 优点
- 纯前端无后端
- 所见即所得
:::
::: cons 缺点
- 需要浏览器 Clipboard API
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

:::: compare variant=data-card
::: pros 纸 本 value="+37%" caption="深度理解得分"
:::
::: cons 屏 读 value="+210%" caption="跳读切换次数"
:::
::::

:::: compare variant=paired-specimen
::: pros Spec. A
*学名：Quercus robur*

- 特征 1
- 特征 2
:::
::: cons Spec. B
*学名：Quercus petraea*

- 特征 1
- 特征 2
:::
::::

:::: compare variant=measurement-table
::: pros 砖木结构
承重墙体：370mm 实心砖，层高 3.2m，抗震 6 度。
:::
::: cons 钢混结构
框架柱：600×600mm，层高 3.6m，抗震 8 度。
:::
::::

:::: compare variant=paired-shape
::: pros CIRCLE
有机、循环、无起点终点的运动。
:::
::: cons SQUARE
秩序、稳定、以角定界的结构。
:::
::::

:::: compare variant=axis-diagram
::: pros 现代主义
形式服从功能；理性秩序；以少胜多。
:::
::: cons 后现代主义
形式即内容；反讽引用；以多为多。
:::
::::

### steps · 7 variants

::: steps 使用流程 variant=number-circle
### 写
在左侧编辑器写 Markdown。
### 预览
右栏 375px 移动端实时预览。
### 复制
Ctrl/⌘ + K 复制富文本到公众号。
:::

::: steps 构建链路 variant=ribbon-chain
### 解析
markdown-it + 容器扩展拆节点树。
### 样式
juice 内联到每个元素。
### 打补丁
wxPatch 改造不兼容语法。
:::

::: steps 发稿节奏 variant=timeline-dot
### 选稿
草稿抽屉挑一篇。
### 定主题
头部下拉切换。
### 粘贴
公众号后台粘贴富文本。
:::

::: steps 上线 SOP variant=step-card
### 灰度发布
按 5% / 25% / 100% 三档逐级放量。
### 监控告警
关键指标接告警，p95 延迟 + 错误率双指标。
### 应急预案
回滚脚本与值班联系人提前到位。
:::

::: steps 调研流程 variant=split-row
### 01 收集
阅读 5 篇文献，提炼共识与争议点。
### 02 假设
基于共识与争议点形成可验证假设。
### 03 实验
选择对照组、自变量与样本量。
:::

::: steps variant=seal-cjk
### 一
第一步正文说明
### 二
第二步正文说明
### 三
第三步正文说明
:::

::: steps 旅程 variant=ruler-row
### 0KM
出发点描述
### 30KM
途经点描述
### 72KM
终点描述
:::

### divider · 6 variants

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

::: divider variant=seal-mark
:::

### note · 14 variants

::: note 第五态补注 variant=minimal-callout
minimal-callout —— 顶端 1px 短分隔线 + textMuted 标题。
:::

::: note variant=box-callout 参考资料
box-callout —— 单色 1px 全边框 + textMuted 标题。
:::

::: note variant=side-bar 旁注
side-bar —— 左 2px 实线 + 缩进。
:::

::: note variant=smallcaps-kicker layout=hanging REMARK
smallcaps-kicker(layout=hanging) —— uppercase 小标题 + 悬挂缩进，无顶线。
:::

::: note variant=dotted-margin 旁批
dotted-margin —— 左 dotted rule + 缩进，散文页边批注。
:::

::: note variant=smallcaps-kicker NOTE
smallcaps-kicker —— 顶 2px 主色条 + uppercase kicker，数据简报骨架。
:::

<!-- themeCompat: editorial-mook 独占 -->
::: note variant=ed-signoff
ed-signoff 骨架 —— 编者按语落款。
:::

<!-- themeCompat: editorial-mook 独占 -->
::: note variant=inline-label
inline-label 骨架 —— 行内标签式补注。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: note variant=interlinear-gloss
interlinear-gloss 骨架 —— 行间注释体。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: note variant=vermilion-gloss
vermilion-gloss 骨架 —— 朱批旁注。
:::

<!-- themeCompat: academic-frontier 独占 -->
::: note variant=ruler-note
ruler-note 骨架 —— 学术尺线脚注。
:::

<!-- themeCompat: academic-frontier 独占 -->
::: note variant=latin-subhead
latin-subhead 骨架 —— 拉丁小标题补注。
:::

<!-- themeCompat: swiss-grid 独占 -->
::: note variant=initial-disc
initial-disc 骨架 —— 首字圆点引导。
:::

<!-- themeCompat: brutalist 独占 -->
::: note variant=geometric-mark
geometric-mark 骨架 —— 几何符号标注。
:::

### codeBlock · 5 variants

```javascript variant=bare
// bare —— 裸 <pre><code>，默认
const sum = (a, b) => a + b
```

```typescript variant=header-bar
// header-bar —— 顶部语言徽章 + 可选 copy 图标（Stripe Docs 家族）
interface User { id: string; name: string }
```

```python variant=line-numbers
# line-numbers —— 左侧行号 gutter + 分隔线（IDE / 技术书家族）
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)
```

```bash variant=terminal-frame
# terminal-frame —— macOS Terminal 窗口腔 + 暗底（SSH/REPL 家族）
$ git rebase -i HEAD~3
$ git push --force-with-lease
```

```javascript variant=inline-card
// inline-card —— 软底 + 左主色窄竖条 + 紧凑字号（文学/生活向稿件）
const greet = (name) => `Hello, ${name}`
```

### highlight · 8 variants

<!-- themeCompat: editorial-mook 独占 -->
::: highlight variant=dotted-underline
强调短句
:::

<!-- themeCompat: editorial-mook 独占 -->
::: highlight variant=tracked-emphasis
强调短句
:::

<!-- themeCompat: literary-humanism 独占 -->
::: highlight variant=vermilion-inline
强调短句
:::

<!-- themeCompat: literary-humanism 独占 -->
::: highlight variant=side-dots
强调短句
:::

<!-- themeCompat: academic-frontier 独占 -->
::: highlight variant=wash-ground
强调短句
:::

<!-- themeCompat: academic-frontier 独占 -->
::: highlight variant=bracketed-tick
强调短句
:::

<!-- themeCompat: brutalist 独占 -->
::: highlight variant=geometric-flag
强调短句
:::

<!-- themeCompat: swiss-grid 独占 -->
::: highlight variant=single-stroke
强调短句
:::

### pull-quote · 12 variants

::: pull-quote variant=giant-mark
我们以为在阅读，其实只是在滑动。
:::

::: pull-quote variant=centered-rule
慢读不是怀旧姿态，是对自己时间主权的重新申明。
:::

::: pull-quote variant=stamp-quote
夜晚不该是被算法瓜分的剩余时区。
:::

::: pull-quote variant=margin-pull
书脊与手指的记忆，比屏幕的光更持久。
:::

<!-- themeCompat: people-story 独占 -->
::: pull-quote variant=weight-contrast
我们活在一个越来越快，却越来越慢的时代。
:::

<!-- themeCompat: people-story 独占 -->
::: pull-quote variant=drop-capital
凡人生大半的烦恼，都来自把别人的剧本当成自己的人生。
:::

<!-- themeCompat: literary-humanism 独占 -->
::: pull-quote variant=calligraphic
行 到 水 穷 处
坐 看 云 起 时
:::

<!-- themeCompat: literary-humanism 独占 -->
::: pull-quote variant=with-gloss
花 未 全 开
月 未 圆
:::

<!-- themeCompat: academic-frontier 独占 -->
::: pull-quote variant=bilingual-stack
荒野之中，
蕴藏世界。
:::
In wildness is the preservation of the world.

<!-- themeCompat: academic-frontier 独占 -->
::: pull-quote variant=caliper-mark
山是凝固的水，
水是流动的山。
:::
FIELD JOURNAL, FOL.211

<!-- themeCompat: brutalist 独占 -->
::: pull-quote variant=inverted-plate
形式追随功能，
而功能追随真诚。
:::

<!-- themeCompat: brutalist 独占 -->
::: pull-quote variant=grid-block
少即多
:::
L. MIES VAN DER ROHE

### announcement · 4 variants

::: announcement variant=danger-bar tone=danger 重要通知
本期推送涉及账号迁移说明，请阅后转发给同事知悉。
:::

::: announcement variant=mono-disclaimer tone=primary 免责声明
本文涉及个人投资判断，不构成任何投资建议；据此操作风险自担。
:::

::: announcement variant=ai-notice 本文部分内容由 AI 生成
为提高编辑效率，本期数据图表与段落初稿由模型辅助生成，已经过编辑部人工校对。
:::

::: announcement variant=stamped-banner tone=accent 编辑部通告
《慢读简报》自本期起改为隔周四出刊；订阅用户邮件提醒同步调整。
:::

### table-card · 7 variants

:::: table-card 设备规格 variant=rule-grid
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ¥6999"
:::
::: table-row cells="B · 512G · ¥8999"
:::
::::

:::: table-card 月度数据 variant=zebra-rows
::: table-row header=true cells="月份 | 销量 | 同比"
:::
::: table-row cells="01 | 1024 | +12%"
:::
::: table-row cells="02 | 1180 | +18%"
:::
::: table-row cells="03 | 1320 | +24%"
:::
::::

:::: table-card 关键参数 variant=key-value
::: table-row cells="芯片 | M4 Pro"
:::
::: table-row cells="内存 | 24GB"
:::
::: table-row cells="续航 | 22 小时"
:::
::::

:::: table-card 订阅档位 variant=price-tier
::: table-row header=true cells="基础 | *专业 | 旗舰"
:::
::: table-row cells="¥39 | ¥99 | ¥199"
:::
::: table-row cells="单端 | 三端 | 团队"
:::
::::

:::: table-card 研究结果 variant=three-line-table
::: table-row header=true cells="变量 | 均值 | 标准差"
:::
::: table-row cells="A 组 | 3.42 | 0.81"
:::
::: table-row cells="B 组 | 4.17 | 0.63"
:::
::::

:::: table-card 目录 variant=index-table
::: table-row header=true cells="No. | 文章 | 页"
:::
::: table-row cells="01 | 编辑前言 | 3"
:::
::: table-row cells="02 | 慢读论 | 8"
:::
::::

:::: table-card 矩阵评分 variant=matrix
::: table-row header=true cells=" | A | B | C"
:::
::: table-row cells="高 | 9 | 7 | 5"
:::
::: table-row cells="低 | 3 | 5 | 8"
:::
::::

### gallery · 4 variants

:::: gallery 双图对照 variant=duo
::: image-item src="https://placehold.co/400" alt="前" 改版前
:::
::: image-item src="https://placehold.co/400" alt="后" 改版后
:::
::::

:::: gallery 三幕 variant=triptych
::: image-item src="https://placehold.co/400" alt="春" 春
:::
::: image-item src="https://placehold.co/400" alt="夏" 夏
:::
::: image-item src="https://placehold.co/400" alt="秋" 秋
:::
::::

:::: gallery 城市九宫 variant=nine-grid
::: image-item src="https://placehold.co/400" alt="01"
:::
::: image-item src="https://placehold.co/400" alt="02"
:::
::: image-item src="https://placehold.co/400" alt="03"
:::
::: image-item src="https://placehold.co/400" alt="04"
:::
::: image-item src="https://placehold.co/400" alt="05"
:::
::: image-item src="https://placehold.co/400" alt="06"
:::
::::

:::: gallery 移动横滚 variant=ribbon-strip
::: image-item src="https://placehold.co/400" alt="01" 第一站
:::
::: image-item src="https://placehold.co/400" alt="02" 第二站
:::
::: image-item src="https://placehold.co/400" alt="03" 第三站
:::
::: image-item src="https://placehold.co/400" alt="04" 第四站
:::
::::

### dialogue · 5 variants

:::: dialogue 主编访谈 variant=qa-rows
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::: dialogue-turn name="主持人" role="Q"
"慢"是相对什么参照？
:::
::: dialogue-turn name="张三" role="A"
相对 2020 年的 AI hype。
:::
::::

:::: dialogue 客服对话 variant=chat-bubbles
::: dialogue-turn name="顾客" side="left"
请问续费有学生优惠吗？
:::
::: dialogue-turn name="客服" side="right"
有的，凭学生证认证后享 5 折，全年只需 ¥99。
:::
::::

:::: dialogue 剧本片段 variant=name-prefix
::: dialogue-turn name="李四"
今晚的会议改到八点了。
:::
::: dialogue-turn name="王五"
那我去订咖啡。
:::
::::

:::: dialogue 长访谈 variant=interview-column
::: dialogue-turn name="编辑" role="ED"
你怎么看慢读这件事？
:::
::: dialogue-turn name="作者" role="A"
慢读的对立面不是快读，而是被打断；只要不被打断，慢自然发生。
:::
::::

:::: dialogue 田野访谈 variant=audio-stamp
::: dialogue-turn name="访员" role="interviewer" timestamp="00:04:21"
你能描述当时的场景吗？
:::
::: dialogue-turn name="老李" role="villager" timestamp="00:04:38"
那天清晨雾很大，能见度不到 10 米。
:::
::::

### qa-block · 7 variants

::: qa-block 读者问答 variant=hanging-qa q="我是否需要先具备写作基础才能加入这个写作社群？"
不需要。我们更欢迎尚未形成"写作惯性"的初学者。
:::

::: qa-block 读者问答 variant=seal-stamp q="读古书是否一定要懂训诂之学？"
未必。能读懂大意已属可贵，训诂之学，可俟后日积累。
:::

::: qa-block 读者问答 variant=query-annotation q="何谓诗境？"
境者，意中之境也。情景交融，所谓"以我观物，物皆著我之色彩"。
:::

::: qa-block 读者问答 variant=sample-query q="山中昼夜温差超过多少时，应当停止野外考察？"
温差 ≥ 15℃ 且海拔超过 3000m 时，应即刻撤回营地。
:::

::: qa-block 读者问答 variant=field-card q="为何记录树木胸径而不是树高？"
胸径稳定可测，树高常因树梢断折而失真。
:::

::: qa-block 读者问答 variant=circle-square q="设计师该不该有自己的风格？"
风格是结果，不是目标。刻意打造的风格，往往变成局限。
:::

::: qa-block 读者问答 variant=typed-block q="如何判断一个项目应该被砍掉？"
当你已经无法回答"为什么是我们来做"时——该砍。
:::
