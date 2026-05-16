# 容器词汇表速查（共享 reference）

> annotate-markdown / export-richtext 两个 skill 通过 `../_shared/references/container-vocabulary.md` 相对路径共同引用本文件，零副本零同步。改本文件 = 两个 skill 同时生效。
>
> 权威依据：`src/core/vocabulary/vocabulary.ts` 的 `CONTAINER_VOCABULARY` 数组。完整字段语义见该文件顶部注释。

所有 `:::` fence 名（kebab-case）。**任何超出此清单的 fence 名都会被 lint 报错。** `★` 标记的是可登记的"签名容器"（在主题 `signatureContainers` 里声明后获得人格视觉，不登记走中性兜底）。

> 该表由 `npm run build:writer-docs` 从源码派生（详见 `docs/contract/base.md` 与 `docs/contract/packs/data-brief.md` 的速查段）。本文档为给 LLM 用的精简整合版。

## 基础契约（base pack）

| 类 | fence 名 | ★ | 用途 | variantKind |
| --- | --- | :-: | --- | --- |
| 结构 | `intro` | ★ | 文首引子／导语卡 | — |
|  | `cover` | ★ | 封面卡（封面图 + 题头 + 期号戳） | — |
|  | `author` | ★ | 作者栏：单行署名块 | — |
|  | `author-bio` | ★ | 多行作者简介卡（avatar + name + role + bio） | — |
|  | `section-title` | ★ | 章节标题块（比 ## 更强势） | `sectionTitle` |
| 提示 | `announcement` | ★ | 文章级强警示横幅（attrs.tone=danger\|primary\|accent） | — |
|  | `tip` | ★ | 小贴士／正向提示 | `admonition` |
|  | `warning` | ★ | 需读者注意的提醒 | `admonition` |
|  | `info` | ★ | 中性说明 / 补充信息 | `admonition` |
|  | `danger` | ★ | 高风险警告 / 错误示范 | `admonition` |
|  | `note` | ★ | 第五态补注（中性，不抢色） | `note` |
| 内容 | `quote-card` | ★ | 大段引用卡（"引用他人"） | `quote` |
|  | `highlight` | ★ | 行内高亮段（"作者自我强调"） | — |
|  | `compare`（外层 `::::`） | ★ | 双列对比 | `compare` |
|  | `pros` |  | compare 的"正面"列 | — |
|  | `cons` |  | compare 的"反面"列 | — |
|  | `steps` | ★ | 编号步骤列表（动作序列） | `steps` |
|  | `image-caption` | ★ | 图 + 居中小字灰说明（attrs.src 自动渲染 img） | — |
|  | `timeline`（外层 `::::`） | ★ | 年份+事件时序（与 steps 动作序列正交） | — |
|  | `timeline-item` |  | timeline 内单条（attrs.year） | — |
| 导航 | `divider` |  | 装饰分隔线 | `divider` |
|  | `footer-cta` | ★ | 文末 CTA 块（关注 / 投喂 / 二维码收束） | — |
|  | `recommend` | ★ | 推荐阅读链接（"读者延伸阅读"） | — |
|  | `qrcode` | ★ | 通用二维码块（任意 QR） | — |
| 媒体 | `voice-card` | ★ | 公众号语音占位卡（粘贴后识别为 mpvoice） | — |
|  | `video-card` | ★ | 公众号视频占位卡（qqvid 直渲 v.qq.com iframe） | — |
| 签名 | `abstract` | ★ | 文首 tl;dr 摘要 | — |
|  | `key-number` | ★ | 大数字 + 说明（attrs.value 为数字） | — |
|  | `see-also` | ★ | 学术参考引用列表（"论证凭证"，与 recommend 正交） | — |
| 兜底 | `free` |  | 不施加主题样式（退出契约保护） | — |

## 编辑刊扩展包（pack:editorial）

| 类 | fence 名 | ★ | 用途 |
| --- | --- | :-: | --- |
| 结构 | `masthead` | ★ | 刊头：刊名 + 期号·日期 monospace 右对齐 |
|  | `section-tag` | ★ | 小栏目标签（黑底白字胶囊） |
|  | `byline` | ★ | 多栏 newspaper 署名（AUTHOR / EDITOR / SET） |
|  | `editorial-header` | ★ | 装饰副刊头（红章 + 大字标题 + PP 页码 + subtitle） |
| 提示 | `callout-group`（外层 `::::`） | ★ | 四态 callout 联表（tip/warning/info/danger 串联） |
| 导航 | `toc`（外层 `::::`） | ★ | 目录三栏（序号·标题·页码） |
|  | `toc-item` |  | toc 内单条 |
|  | `cta-bar` | ★ | CTA 三栏（赞同 / 收藏 / 转发） |
|  | `qr-follow` | ★ | 二维码订阅卡（左 QR + 右 kicker/title/desc 三行版式） |
| 签名 | `qa-block` | ★ | 读者问答（固定签名格式，attrs.q 为问题） |
|  | `footnotes` | ★ | 脚注块：上分割线 + 编号引用（一条一行） |
|  | `refs` | ★ | 流式参考文献：同源紧凑、条目同段流式排列（长引用列表用） |
|  | `editor-note` | ★ | 编辑部注：主色左竖条 callout |
|  | `methodology` | ★ | 方法论小字注释 |
|  | `colophon` | ★ | 刊物收束栏 |

## 数据可视化（pack:data-viz）

| 类 | fence 名 | ★ | 用途 |
| --- | --- | :-: | --- |
| 数据 | `kpi-dashboard`（外层 `::::`） | ★ | KPI 仪表盘 + sparkline |
|  | `kpi-item` |  | kpi-dashboard 内单指标 |
|  | `bar-chart`（外层 `::::`） | ★ | 横向条形图 |
|  | `bar` |  | bar-chart 内单条 |

> 边界提示：
> - `recommend` vs `see-also`：前者是"读者延伸阅读"（同号其他文章），后者是"学术参考引用"（论文 / 数据原始来源）
> - `qrcode` vs `qr-follow`：前者通用 QR（任意场景），后者是订阅栏版式（kicker + title + desc + 左 QR）
> - `note` vs `editor-note`：前者作者题外话，后者编辑部机构按语
> - `voice-card` / `video-card` 是作者面语义命名；平台契约（HTML 注释 + data-wx-mp-kind）保持 mpvoice / mpvideo

## 通用 fence 语法

```
::: name 标题文字 key=value key2="带空格的值"
任意 Markdown 正文
:::
```

- **name**：kebab-case，必须在上面两张表内。
- **标题**：`name` 之后、首个 `key=` 之前的空格串，进 `info.title`。
- **键值对**：`key=value` 或 `key="v with space"`，**仅在 open 行生效**。正文里写 `key: value` 是普通段落。
- **嵌套**：外层冒号必须严格多于内层（compare/toc/kpi-dashboard/bar-chart 都是外 4 内 3）。
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
| 未知容器名 | 见上两张表 |
| `<!-- variant=xxx -->` 不生效 | HTML 注释不解析 variant；写到 open 行 |
| `{variant="xxx"}` 不生效 | JSX 属性不解析；写 `variant=xxx`（不带大括号、不带引号） |
