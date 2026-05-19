const n={default:`# 默认主题 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`default\`) 启用的全部容器（base + pack:* + theme:default）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"tech-geek":`# 极客夜行 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`tech-geek\`) 启用的全部容器（base + pack:* + theme:tech-geek）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"tech-explainer":`# 文档白昼 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`tech-explainer\`) 启用的全部容器（base + pack:* + theme:tech-explainer）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"business-finance":`# 硬核财经 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`business-finance\`) 启用的全部容器（base + pack:* + theme:business-finance）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"data-brief":`# 数据简报 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`data-brief\`) 启用的全部容器（base + pack:* + theme:data-brief）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"industry-observer":`# 行业观察 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`industry-observer\`) 启用的全部容器（base + pack:* + theme:industry-observer）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"commerce-pulse":`# 电商脉动 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`commerce-pulse\`) 启用的全部容器（base + pack:* + theme:commerce-pulse）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"literary-humanism":`# 人文札记 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`literary-humanism\`) 启用的全部容器（base + pack:* + theme:literary-humanism）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"people-story":`# 人物特稿 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`people-story\`) 启用的全部容器（base + pack:* + theme:people-story）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"editorial-mook":`# 编辑刊 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`editorial-mook\`) 启用的全部容器（base + pack:* + theme:editorial-mook）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"late-night-vinyl":`# 深夜电台 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`late-night-vinyl\`) 启用的全部容器（base + pack:* + theme:late-night-vinyl）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"life-aesthetic":`# 慢生活 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`life-aesthetic\`) 启用的全部容器（base + pack:* + theme:life-aesthetic）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"edu-classroom":`# 教室课堂 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`edu-classroom\`) 启用的全部容器（base + pack:* + theme:edu-classroom）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"academic-frontier":`# 学术前沿 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`academic-frontier\`) 启用的全部容器（base + pack:* + theme:academic-frontier）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"official-gazette":`# 公文公报 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`official-gazette\`) 启用的全部容器（base + pack:* + theme:official-gazette）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"swiss-grid":`# 苏黎世栅格 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`swiss-grid\`) 启用的全部容器（base + pack:* + theme:swiss-grid）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,brutalist:`# 粗野主义报刊 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`brutalist\`) 启用的全部容器（base + pack:* + theme:brutalist）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`,"youth-zine":`# 青年潮志 · 组件参考

> 本文档由 \`scripts/build-references.ts\` 自动生成，按 \`src/core/vocabulary\` 单一真源派生。
> 列出本主题 (\`youth-zine\`) 启用的全部容器（base + pack:* + theme:youth-zine）。
>
> 想看故事化样张请切回"故事样张"档；本文档专为 *"这个容器在该主题下长啥样"* 这类查阅。

## 骨架 · structure

### \`::: intro\` · \`base\`

文首引子／导语卡。独立 bgSoft 底，区别于正文段落。

\`\`\`markdown
::: intro
本文探讨 …
:::
\`\`\`

::: intro
本文探讨 …
:::

### \`::: cover\` · \`base\`

封面卡（封面图 + 题头 + 可选期号戳）。

\`\`\`markdown
::: cover
![](cover.png)

## 主标题
:::
\`\`\`

::: cover
![](cover.png)

## 主标题
:::

### \`::: author\` · \`base\`

作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。

\`\`\`markdown
::: author
作者 · 日期
:::
\`\`\`

::: author
作者 · 日期
:::

### \`::: author-bio\` · \`base\`

多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。

\`\`\`markdown
::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::
\`\`\`

::: author-bio avatar="me.png" name="顾留白" role="专栏作者"
非虚构写作 8 年，关注城市与日常。
:::

### \`::: section-title\` · \`base\` · *variantKind=sectionTitle*

章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。

\`\`\`markdown
::: section-title
第一章 · 缘起
:::
\`\`\`

::: section-title
第一章 · 缘起
:::

### \`::: masthead\` · \`pack:editorial\`

刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。

\`\`\`markdown
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::
\`\`\`

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

### \`::: section-tag\` · \`pack:editorial\`

小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。

\`\`\`markdown
::: section-tag 深度
:::
\`\`\`

::: section-tag 深度
:::

### \`::: byline\` · \`pack:editorial\`

署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。

\`\`\`markdown
::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
\`\`\`

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::

### \`::: editorial-header\` · \`pack:editorial\`

装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。

\`\`\`markdown
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::
\`\`\`

::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: divider
:::

## 提示五态 · admonition

### \`::: announcement\` · \`base\` · *variantKind=announcement*

强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。

\`\`\`markdown
::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::
\`\`\`

::: announcement tone=danger 重要通知
本期推送涉及账号迁移说明 …
:::

### \`::: tip\` · \`base\` · *variantKind=admonition*

tip：小贴士／正向提示。

\`\`\`markdown
::: tip 小贴士
内容 …
:::
\`\`\`

::: tip 小贴士
内容 …
:::

### \`::: warning\` · \`base\` · *variantKind=admonition*

warning：需要读者注意的提醒。

\`\`\`markdown
::: warning 注意
内容 …
:::
\`\`\`

::: warning 注意
内容 …
:::

### \`::: info\` · \`base\` · *variantKind=admonition*

info：中性说明／补充信息。

\`\`\`markdown
::: info 说明
内容 …
:::
\`\`\`

::: info 说明
内容 …
:::

### \`::: danger\` · \`base\` · *variantKind=admonition*

danger：高风险警告／错误示范。

\`\`\`markdown
::: danger 警告
内容 …
:::
\`\`\`

::: danger 警告
内容 …
:::

### \`::: note\` · \`base\` · *variantKind=note*

note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。

\`\`\`markdown
::: note 补注
内容 …
:::
\`\`\`

::: note 补注
内容 …
:::

::: divider
:::

## 内容块 · content

### \`::: quote-card\` · \`base\` · *variantKind=quote*

大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。

\`\`\`markdown
::: quote-card
一段值得突出的引用 …
:::
\`\`\`

::: quote-card
一段值得突出的引用 …
:::

### \`::: highlight\` · \`base\` · *variantKind=highlight*

行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。

\`\`\`markdown
::: highlight
需要读者停下来的一段话 …
:::
\`\`\`

::: highlight
需要读者停下来的一段话 …
:::

### \`::: compare\` · \`base\` · *variantKind=compare*

双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。

\`\`\`markdown
:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
\`\`\`

:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::

### \`::: steps\` · \`base\` · *variantKind=steps*

编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。

\`\`\`markdown
::: steps
1. 初始化
2. 构建
3. 发布
:::
\`\`\`

::: steps
1. 初始化
2. 构建
3. 发布
:::

### \`::: image-caption\` · \`base\`

图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。

\`\`\`markdown
::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::
\`\`\`

::: image-caption src="cover.png" alt="封面" 图 1 · 城市夜景与霓虹
摄于 2026 年春，北京三里屯。
:::

### \`::: timeline\` · \`base\`

时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。

\`\`\`markdown
:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::
\`\`\`

:::: timeline 项目里程碑
::: timeline-item year="2024" 项目立项
方案确认，团队组建。
:::
::: timeline-item year="2025" 公测上线
首批用户邀请制开放。
:::
::::

### \`::: qa-block\` · \`pack:editorial\` · *variantKind=qaBlock*

读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。

\`\`\`markdown
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::
\`\`\`

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力，从睡前 15 分钟开始即可。
:::

### \`::: pull-quote\` · \`pack:editorial\` · *variantKind=pullQuote*

拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。

\`\`\`markdown
::: pull-quote
我们以为在阅读，其实只是在滑动。
:::
\`\`\`

::: pull-quote
我们以为在阅读，其实只是在滑动。
:::

### \`::: table-card\` · \`base\` · *variantKind=tableCard*

结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。

\`\`\`markdown
:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::
\`\`\`

:::: table-card 规格对比
::: table-row header=true cells="型号 | 容量 | 价格"
:::
::: table-row cells="A · 256G · ￥6999"
:::
::::

### \`::: gallery\` · \`base\` · *variantKind=gallery*

多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。

\`\`\`markdown
:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::
\`\`\`

:::: gallery variant=triptych
::: image-item src="a.jpg" alt="A" 春
:::
::: image-item src="b.jpg" alt="B" 夏
:::
::: image-item src="c.jpg" alt="C" 秋
:::
::::

### \`::: dialogue\` · \`pack:editorial\` · *variantKind=dialogue*

多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。

\`\`\`markdown
:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::
\`\`\`

:::: dialogue 主编访谈
::: dialogue-turn name="主持人" role="Q"
你怎么看这次行业转向？
:::
::: dialogue-turn name="张三" role="A"
转向是必然的，但节奏会比想象慢。
:::
::::

::: divider
:::

## 数据可视化 · data

### \`::: kpi-dashboard\` · \`pack:data-viz\`

KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。

\`\`\`markdown
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::
\`\`\`

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::::

### \`::: bar-chart\` · \`pack:data-viz\`

横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。

\`\`\`markdown
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::
\`\`\`

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟"
::: bar label="60+" pct="84" value="42 分"
:::
::::

::: divider
:::

## 导航 / 收束 · navigation

### \`::: toc\` · \`pack:editorial\`

目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。

\`\`\`markdown
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::
\`\`\`

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::::

### \`::: divider\` · \`base\` · *variantKind=divider*

装饰分隔线。可切 wave / dots / flower / rule / glyph / seal-mark。

\`\`\`markdown
::: divider
:::
\`\`\`

::: divider
:::

### \`::: footer-cta\` · \`base\` · *variantKind=footerCTA*

文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。

\`\`\`markdown
::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
\`\`\`

::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::

### \`::: recommend\` · \`base\` · *variantKind=recommend*

推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。

\`\`\`markdown
::: recommend
- [前作](url)
- [续篇](url)
:::
\`\`\`

::: recommend
- [前作](url)
- [续篇](url)
:::

### \`::: qrcode\` · \`base\` · *variantKind=qrcode*

二维码块。两态骨架：bare（默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。

\`\`\`markdown
::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::
\`\`\`

::: qrcode text="https://mp.weixin.qq.com/s/xxx"
扫码关注
:::

::: divider
:::

## 媒体占位 · media

### \`::: voice-card\` · \`base\`

公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。

\`\`\`markdown
::: voice-card title="片头曲" src="..."
:::
\`\`\`

::: voice-card title="片头曲" src="..."
:::

### \`::: video-card\` · \`base\`

公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。

\`\`\`markdown
::: video-card title="片段" qqvid="..."
:::
\`\`\`

::: video-card title="片段" qqvid="..."
:::

::: divider
:::

## 签名块 · signature

### \`::: abstract\` · \`base\`

文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。

\`\`\`markdown
::: abstract 摘要
本文论点 …
:::
\`\`\`

::: abstract 摘要
本文论点 …
:::

### \`::: key-number\` · \`base\`

大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。

\`\`\`markdown
::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
\`\`\`

::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::

### \`::: footnotes\` · \`pack:editorial\` · *variantKind=footnotes*

脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 \`·\` / \`／\` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。

\`\`\`markdown
::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::
\`\`\`

::: footnotes
[1] 数据覆盖 2010–2025。
[2] 深度理解得分取自 24h 回忆测试。
:::

### \`::: colophon\` · \`pack:editorial\`

刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。

\`\`\`markdown
::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::
\`\`\`

::: colophon next="纸本之必要" issue="第 004 期 · 2026"
:::

::: divider
:::

## 兜底 · free

### \`::: free\` · \`base\`

兜底容器：渲染器刻意不施加主题样式，写不归类内容。

\`\`\`markdown
::: free
编辑部补注 …
:::
\`\`\`

::: free
编辑部补注 …
:::

::: divider
:::
`};export{n as REFERENCE_BY_THEME};
