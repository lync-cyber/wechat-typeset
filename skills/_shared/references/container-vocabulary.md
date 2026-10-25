# 容器词汇表速查（共享 reference）

> annotate-markdown / export-richtext 两个 skill 通过 `../_shared/references/container-vocabulary.md` 相对路径共同引用本文件，零副本零同步。改本文件 = 两个 skill 同时生效。
>
> 权威依据：`src/core/vocabulary/vocabulary.ts` 的 `CONTAINER_VOCABULARY` 数组。完整字段语义见该文件顶部注释。

所有 `:::` fence 名（kebab-case）。**任何超出此清单的 fence 名都会被 lint 报错。** `★` 标记的是可登记的"签名容器"（在主题 `signatureContainers` 里声明后获得人格视觉，不登记走中性兜底）。

下面的清单由 `pnpm build:skill-refs` 从容器契约自动生成，`--check` 检查漂移。

<!-- generated:container-vocabulary:start -->

| 扩展包 | fence 名 | ★ | 用途 | variantKind |
| --- | --- | :-: | --- | --- |
| base | `::: intro` | ★ | 文首引子／导语卡。独立 bgSoft 底，区别于正文段落。 | — |
| base | `::: cover` | ★ | 封面卡（封面图 + 题头 + 可选期号戳）。 | — |
| base | `::: author` | ★ | 作者栏：单行署名块（名字 + 日期/期号）。与 author-bio 的边界见 author-bio.description。 | — |
| base | `::: author-bio` | ★ | 多行作者简介卡：头像 + 名字 + 身份 + 多行简介。与 author 的边界：author 单行署名，author-bio 是独立块（头像 + 多行 bio + 社交链接），通常用在文末"关于作者"。 | — |
| base | `::: section-title` | ★ | 章节标题块（比 ## 更强势的分节）。常用骨架有 bordered / cornered，完整清单见对应 variantKind。 | sectionTitle |
| pack:editorial | `::: masthead` | ★ | 刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。 | — |
| pack:editorial | `::: section-tag` | ★ | 小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。 | — |
| pack:editorial | `::: byline` | ★ | 署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。 | — |
| pack:editorial | `::: editorial-header` | ★ | 装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 &lt;section&gt;，不抢平台 H1 语义。data-brief 家族签名。 | — |
| pack:editorial | `:::: toc` | ★ | 目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。 | — |
| pack:editorial | `::: toc-item` |  | toc 内单条；info 为条目标题。body 内容会被忽略。 | — |
| base | `::: announcement` | ★ | 强警示横幅：文章顶部 / 中部"置顶通告"块，比 tip/warning 视觉强度更高。info 为标题，body 为说明文本。4 种 variant 覆盖：常规警示 / 法律免责 / AI 合规 / 印章公告。 | announcement |
| base | `::: tip` | ★ | tip：小贴士／正向提示。 | admonition |
| base | `::: warning` | ★ | warning：需要读者注意的提醒。 | admonition |
| base | `::: info` | ★ | info：中性说明／补充信息。 | admonition |
| base | `::: danger` | ★ | danger：高风险警告／错误示范。 | admonition |
| base | `::: note` | ★ | note：作者旁批 + 编辑部按 + 调研口径的统一容器。variant 切换语气主体：默认中性（textMuted 不抢色）；editorial-stripe 切到"编辑部以机构身份按语"；research-dense 切到"调研方法论小字栏"。 | note |
| base | `::: quote-card` | ★ | 大段引用卡。常用骨架有 classic / magazine-dropcap / column-rule / frame-brackets，完整清单见对应 variantKind。 | quote |
| base | `::: highlight` | ★ | 行内高亮段（bgMuted 底色块）。与 quote-card 的边界：quote-card 是"成段引用"（外部话语、有 variant 骨架），highlight 是"作者自己想强调的一段话"。想强调一句"我要让读者停下来"用 highlight；想引用一段他人话用 quote-card。 | highlight |
| base | `:::: compare` | ★ | 双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。 | compare |
| base | `::: pros` |  | compare 的"正面"列（必须嵌在 :::: compare 内）。 | — |
| base | `::: cons` |  | compare 的"反面"列（必须嵌在 :::: compare 内）。 | — |
| base | `::: steps` | ★ | 编号步骤列表。常用骨架有 number-circle / ribbon-chain / timeline-dot，完整清单见对应 variantKind。 | steps |
| base | `::: image-caption` | ★ | 图 + 居中小字灰说明的图注块。声明 attrs.src 时自动渲染 img；info 为图注文本。body 内容（如长描述 / 数据来源）作为副说明跟在 caption 下方。 | — |
| base | `:::: timeline` | ★ | 时间线：左侧年份 + 右侧事件。外层 4 个冒号，内部 timeline-item 列条目。 | — |
| base | `::: timeline-item` |  | timeline 内单条；info 为事件标题，body 为详述。 | — |
| pack:editorial | `::: qa-block` | ★ | 读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&amp;A"）。 | qaBlock |
| base | `::: divider` |  | 装饰分隔线。常用骨架有 wave / dots / flower / rule / glyph / seal-mark，完整清单见对应 variantKind。 | divider |
| base | `::: footer-cta` | ★ | 文末 CTA 块。两态骨架：button-led（默认）= 单按钮 + 引导文案（关注、投喂、阅读原篇）；triptych-actions = 三栏赞同 / 收藏 / 转发并列动作集（data-brief 家族签名）。href 支持公众号内链白名单。 | footerCTA |
| base | `::: recommend` | ★ | 推荐阅读链接列表。两态骨架：card-list 走"读者面延伸阅读"（同一作者的其他文章、关联推送）；academic-refs 走"学术参考引用"（论文 / 原始数据 / 二次研究，更克制 uppercase 小字）。 | recommend |
| base | `::: qrcode` | ★ | 二维码块。bare（系统默认）= 居中 QR + caption，"任意场景的 QR"（赞赏码 / 活动链接 / 小程序）；follow-card = 左 QR + 右 kicker/title/desc 三行刊物订阅卡。qr-stack = 上 QR + 下 kicker/title/desc 居中堆叠。带 text= 时内置 QR 编码生成 SVG，无需外链 / 外部生成。 | qrcode |
| base | `::: voice-card` | ★ | 公众号语音占位卡（粘贴后由微信识别为真 mpvoice 节点）。 | — |
| base | `::: video-card` | ★ | 公众号视频占位卡（带 qqvid 时直出 v.qq.com iframe；其余为占位）。 | — |
| base | `::: abstract` | ★ | 文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。 | — |
| base | `::: key-number` | ★ | 大数字 + 说明（研究报告 / 内参版面 / issue-banner）。attrs.value 为数字，info 为 kicker；声明 attrs.meta 切到双栏布局（issue-banner 模式）。 | — |
| pack:data-viz | `:::: kpi-dashboard` | ★ | KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。 | — |
| pack:data-viz | `::: kpi-item` |  | kpi-dashboard 内单指标。一切以 attrs 驱动，body 内容被忽略。 | — |
| pack:data-viz | `:::: bar-chart` | ★ | 横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。 | — |
| pack:data-viz | `::: bar` |  | bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。 | — |
| pack:editorial | `::: footnotes` | ★ | 脚注 / 参考文献块。常用骨架：lined（系统默认，分段条目 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 `·` / `／` 分隔条目。另有 boxed-aside 旁白卡 / top-rule 报纸尾注 / dense-academic 论文文献表。info 非空时按所选骨架渲染标题。 | footnotes |
| pack:editorial | `::: colophon` | ★ | 刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。 | — |
| pack:editorial | `::: pull-quote` | ★ | 拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。 | pullQuote |
| base | `:::: table-card` | ★ | 结构化表格：弥补 markdown 原生 table 在公众号字号小 / 列宽不可控的缺陷。外层 4 冒号，内部 table-row 列条目。与 compare 正交（compare 限 2 列 pros/cons）。 | tableCard |
| base | `::: table-row` |  | table-card 内单行。attrs.cells 必填，body 内容被忽略。 | — |
| base | `:::: gallery` | ★ | 多图组合：弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。外层 4 冒号，内部 image-item 列单图。 | gallery |
| base | `::: image-item` |  | gallery 内单图。info 为该图的图注（小字），body 内容被忽略。 | — |
| pack:editorial | `:::: dialogue` | ★ | 多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&amp;A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。 | dialogue |
| base | `::: dialogue-turn` |  | dialogue 内单轮发言。name 与 shape 二选一必填（shape 以形状代号替代姓名），body 为发言内容。 | — |
| base | `::: free` |  | 兜底容器：渲染器刻意不施加主题样式，写不归类内容。 | — |

<!-- generated:container-vocabulary:end -->

语义通过容器与变体共同表达：
- `recommend`：`card-list` 推荐阅读；`academic-refs` 参考引用。
- `qrcode`：`bare` 通用二维码；`follow-card` 订阅卡。
- `footer-cta`：`button-led` 单按钮；`triptych-actions` 三栏动作。
- `note`：中性补注；`editorial-stripe` 编辑部按语；`research-dense` 方法论。
- `footnotes`：`lined` 分行脚注；`inline-flow` 流式文献。

以上列出常用语义组合；完整变体清单见 `hard-rules.md` 的自动生成白名单。`lined` 分条脚注在各条目之间留空行，普通换行仍属于同一 Markdown 段落。

## 通用 fence 语法

```
::: name 标题文字 key=value key2="带空格的值"
任意 Markdown 正文
:::
```

- **name**：kebab-case，必须在上面的表内。
- **标题**：从 `name` 后提取全部 `key=value` 属性后，剩余文字合并空白进入 `info.title`；属性可写在标题前后。
- **键值对**：`key=value` 或 `key="v with space"`，**仅在 open 行生效**。正文里写 `key: value` 是普通段落。
- **嵌套**：外层冒号必须严格多于内层（compare/toc/timeline/kpi-dashboard/bar-chart/table-card/gallery/dialogue 都用外 4 内 3）。闭合行只写冒号，数量与对应开启行相同。
- **variant 覆盖**：`::: tip variant=pill-tag 重要`——open 行最后写 `variant=xxx`，**不要**写 JSX `{variant="xxx"}` 也不要写 `<!-- variant=xxx -->`。

## 5 个行内扩展

| 语法 | 效果 | 实现 |
| --- | --- | --- |
| `==高亮==` | 荧光笔背景 | markdown-it-mark |
| `~~删除~~` | 删除线 | GFM 原生 |
| `++插入++` | 下划线 ins | markdown-it-ins |
| `[.着重.]` | 着重号（中文排版传统，点居字下） | 自定义 inline rule |
| `[~波浪~]` | 波浪下划线 | 自定义 inline rule |

行内扩展可与标准 Markdown 强调（`**粗**` / `*斜*` / `` `code` ``）任意组合。**密度建议**：每千字 ≤3 处，否则视觉噪声大。

## 容易踩的坑

| 症状 | 原因 |
| --- | --- |
| `::: tip key: value` 被当正文 | 键值对必须写在 open 行末尾，不是 YAML 风格 |
| `::: compare` 内的 `::: pros` 不闭合 | 外层 `compare` 应用 4 个冒号 `::::`，内层 pros/cons 用 3 个 |
| `variant=xxx` 被忽略 | 容器不支持 variant，或 id 不在 `VARIANT_IDS` 白名单内 |
| `::: free` 里"样式失灵" | free 定位就是「不施加样式」，需要装饰请换具名容器 |
| 未知容器名 | 见上方自动生成的表 |
| `<!-- variant=xxx -->` 不生效 | HTML 注释不解析 variant；写到 open 行 |
| `{variant="xxx"}` 不生效 | JSX 属性不解析；写 `variant=xxx`（不带大括号、不带引号） |
