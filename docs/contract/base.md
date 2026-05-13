# 基础契约：通用容器

[← 回 README](README.md) · [通用语法](syntax.md) · [data-brief 扩展包 →](packs/data-brief.md)

任意内置主题都正确渲染本节列出的全部容器——换主题**不需要改稿**。
如果你的写作品类需要更多结构化版面（数据简报、栏目化深度文……），看完本文后再翻 [扩展包](packs/data-brief.md)。

---

## 速查表

<!-- generated:container-quick-ref:base:start -->

所有主题都覆盖渲染；写作者无需关心当前主题是谁。带 ★ 是可登记的**签名容器**。

| 类 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |
| 结构 | `intro` | ★ | 文首引子／导语卡。独立 bgSoft 底，区别于正文段落。 |
|  | `cover` | ★ | 封面卡（封面图 + 题头 + 可选期号戳）。 |
|  | `author` | ★ | 作者栏：头像 + 名字 + 日期／期号。 |
|  | `section-title` | ★ | 章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。 |
| 提示 | `tip` | ★ | tip：小贴士／正向提示。 |
|  | `warning` | ★ | warning：需要读者注意的提醒。 |
|  | `info` | ★ | info：中性说明／补充信息。 |
|  | `danger` | ★ | danger：高风险警告／错误示范。 |
|  | `note` | ★ | note：第五态补注（中性，不抢色，走 textMuted + noteIcon）。 |
| 内容 | `quote-card` | ★ | 大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。 |
|  | `highlight` | ★ | 高亮段落（bgMuted 底色块）。无 variant 切换。 |
|  | `compare` | ★ | 双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。 |
|  | `pros` |  | compare 的"正面"列（必须嵌在 :::: compare 内）。 |
|  | `cons` |  | compare 的"反面"列（必须嵌在 :::: compare 内）。 |
|  | `steps` | ★ | 编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。 |
| 导航 | `divider` |  | 装饰分隔线。可切 wave / dots / flower / rule / glyph。 |
|  | `footer-cta` | ★ | 文末 CTA 块（关注、投喂、二维码收束）。href 支持公众号内链白名单。 |
|  | `recommend` | ★ | 推荐阅读列表。 |
| 媒体 | `qrcode` | ★ | 二维码块（图 + 说明文案）。 |
|  | `mpvoice` | ★ | 公众号语音卡（占位，粘贴后在公众号编辑器补真 mpvoice 节点）。 |
|  | `mpvideo` | ★ | 公众号视频卡（占位，粘贴后在公众号编辑器补真 mpvideo 节点）。 |
| 签名 | `abstract` | ★ | 文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。 |
|  | `key-number` | ★ | 大数字 + 说明（研究报告／内参版面）。attrs.value 为数字，info 为 kicker。 |
|  | `see-also` | ★ | 相关阅读链接列表（academic-frontier / tech-explainer 的"扩展阅读"）。 |
| 兜底 | `free` |  | 兜底容器：渲染器刻意不施加主题样式，写不归类内容。 |

> 由 `npm run build:writer-docs` 从 `src/containers/vocabulary.ts` 生成，请勿手改。新增容器先改 vocabulary（含 `pack` 字段），需要划入扩展包就声明 `pack: '<id>'`。

<!-- generated:container-quick-ref:base:end -->

> 非签名容器 `pros` / `cons` / `divider` / `free` 是**结构位**，不参与主题人格签名。
> `signatureContainers` 的合法 id 清单：`getSupportedSignatureContainers()`。

---

## 结构（structure）

文章骨架四件套：引子 / 封面 / 作者 / 章节大标题。

```
::: intro
文章导语。独立视觉样式——浅色背景、左侧色条、小字号，
用来把"本文要讲什么"钉在最顶。
:::

::: cover 本期封面
![封面图](https://placehold.co/1200x630)

_一句图注_
:::

::: author 张三 role=主笔
发表于 2026-04-18

一句简短的作者话
:::

::: section-title 第一章
章节大标题，带主题装饰 SVG
:::
```

---

## 提示（admonition）

四（五）态分别渲染不同标签与形状。**形状冗余**是色盲友好设计——不仅靠颜色区分。

```
::: tip 小贴士
正向提示
:::

::: warning 注意
需读者留意的提醒
:::

::: info 补充
中性说明
:::

::: danger 警告
高风险 / 错误示范
:::

::: note 脚注
中性补注——放参考资料 / 版本说明这类场景，不抢色
:::
```

主题在 spec 里挑了某个 admonition variant（如 `accent-bar`），某处想换可在 attrs 覆盖：

```
::: tip variant=pill-tag 重要
这一处我就是要 pill tag 的视觉
:::
```

---

## 内容（content）

```
::: quote-card
这是一句金句，大字号居中，主题装饰引号 SVG。
—— 作者
:::

::: highlight
重点段落，整段高亮背景——用于"本文核心论点"这类锚点。
:::

:::: compare
::: pros 优点
- 优点 1
- 优点 2
:::
::: cons 缺点
- 缺点 1
- 缺点 2
:::
::::

::: steps
1. 第一步
2. 第二步
3. 第三步
:::
```

`quote-card` 的 variant：`classic` / `magazine-dropcap` / `column-rule` / `frame-brackets`。
`compare` 的 variant：`column-card`（默认） / `stacked-row` / `ledger`（账本感） / `data-card`。
`steps` 的 variant：`number-circle` / `ribbon-chain` / `timeline-dot`。

---

## 导航（navigation）

```
::: divider variant=flower
:::

::: footer-cta 觉得有用？ cta=关注我 href=https://mp.weixin.qq.com/s/xxx
一句引导文案
:::

::: recommend 推荐阅读
- [文章 A](https://...)
- [文章 B](https://...)
:::
```

- `divider` variant：`line`（默认） / `wave` / `dots` / `flower` / `glyph`。`glyph` 是唯一允许 Unicode 当装饰的位置（`::: divider variant=glyph glyph=§`）。
- `footer-cta` 的 `href` 行为见 [platform.md · footer-cta 的 href 属性](platform.md#footer-cta-的-href-属性)——非白名单 URL 在公众号正文里点不动，但本工具会保真复制。

---

## 媒体（media · 公众号官方元素占位）

```
::: qrcode 扫码关注
![二维码](https://...)
:::

::: mpvoice title="片头曲" src="..."
微信 <mpvoice> 只能在公众号后台从素材库插入；此容器渲染为占位卡，
粘贴后请在公众号编辑器里插入真节点。
:::

::: mpvideo qqvid=v326875u4ek
腾讯视频：直接渲染 v.qq.com iframe（无需公众号后台）。
:::
```

`mpvideo` 还支持 `vid=wxv_xxx`（公众号视频，仅占位）。

---

## 签名（signature · 跨主题通用）

这三个属于"深度文"高频元素——多主题都会用，但在 spec 里需登记进 `signatureContainers` 才会获得人格化视觉；未登记的主题里走中性兜底样式。

```
::: abstract 摘要
TL;DR · 一段 80–160 字的摘要。学术 / 行业观察家族推荐在正文前挂一段，
给读者"是否继续读下去"的决策材料。
:::

::: key-number value=87% 留存率
数据卡：巨号数字 + 标签 + 注释。attrs.value 放数字本体，info 放 kicker。
:::

::: see-also 延伸阅读
- [相关资料 A](https://...)
- [相关资料 B](https://...)
:::
```

> 数据简报家族（masthead / toc / kpi-dashboard / bar-chart / qa-block / footnotes / cta-bar / qr-follow）是更结构化的签名元素，独立放在 [`data-brief` 扩展包](packs/data-brief.md)。

---

## 兜底（free · escape hatch）

```
::: free
刻意不施加主题样式——边距与正文段落对齐，无边框、无底色。
用来装"编辑部补注 / 致谢列表"这类不归类内容。
:::
```

写进 `free` 意味着**放弃人格签名**——主题作者也不应在自己的 spec 里给 `free` 加 CSS。
内部可写自定义 HTML（如三栏 CTA、自制小卡），但**这部分内容退出本契约的承诺保护**。
