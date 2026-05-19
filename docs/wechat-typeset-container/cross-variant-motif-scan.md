# T3.1 横向手法重复扫描报告

**扫描范围**：新 40 variant × 既有 39 variant。
**消费方**：T3.2 signatureOf 共享标注。

---

## 视觉手法分类

### 朱印 / 旋转角度

- 旧：admonition/marginalia（signatureOf: literary-humanism）、pull-quote/stamp-quote（brutalist）
- 新：admonition/vermilion-seal（-3° 旋转方框朱印）、quote/seal-kai（居中朱印楷字）、pull-quote/calligraphic（朱色撇捺装饰）、note/vermilion-gloss（朱褐大字「注」）、highlight/vermilion-inline（朱色文字+左侧点线）

### 编号 / 横线 / 大字距

- 旧：admonition/news-row（signatureOf: data-brief）、admonition/top-bottom-rule（signatureOf: tech-geek）、admonition/manpage-log（signatureOf: tech-geek）
- 新：admonition/numbered-rule（顶2px+底1px 大字距 NOTICE·N°）、admonition/hanging-nb（N.B.+编号+竖分隔）、quote/numbered-lines（IBM Plex 编号竖列）、quote/huge-numeral（左 Lora 72px 巨号编号）

### 巨号引号 / Drop Cap / 首字下沉

- 旧：quote/magazine-dropcap（signatureOf: literary-humanism）、pull-quote/giant-mark（巨号 SVG 引号）
- 新：quote/oversized-mark（左上巨号 Cormorant ）、pull-quote/drop-capital（drop capital + Cormorant italic）

### 双行夹注 / 朱字批注

- 旧：pull-quote/with-gloss（signatureOf: literary-humanism）、admonition/marginalia（signatureOf: literary-humanism）
- 新：note/interlinear-gloss（上下 1px border + 朱色双行小字）、note/vermilion-gloss（朱褐大字「注」+右正文）

### 测量条 / 卡尺 / 标本括弧

- 旧：pull-quote/margin-pull（左竖向 monospace kicker）、admonition/sidenote-latex（signatureOf: academic-frontier）
- 新：note/ruler-note（NOTE + 虚线测量条）、pull-quote/caliper-mark（signatureOf: naturalist-notes）、quote/specimen-quote（SPEC.NO 测量括弧）、admonition/field-tag（FIG.CAVE + 短刻度）、admonition/specimen-box（左 border 方格 N°）

### 拉丁副标 / 学名 italic

- 旧：admonition/sidenote-latex（LaTeX 小型大写标题，signatureOf: academic-frontier）
- 新：note/latin-subhead（Annotatio redactoris 拉丁 italic）、quote/binomial-attrib（学名 + 命名人式 byline）

### 几何形块 / 三角徽 / 方块旗

- 旧：admonition/slab-corner（signatureOf: brutalist）、admonition/mook-tag（signatureOf: editorial-mook）
- 新：admonition/filled-square（左 18×18 accent 方块）、admonition/triangle-top（顶三角徽 + 1px 边框）、note/geometric-mark（三角引号）、highlight/geometric-flag（左右实色方块旗）

### 圆点 device / 圆盘 / 圆环

- 旧：admonition/bubble-organic（signatureOf: life-aesthetic）、admonition/ticket-notch（三圆点票据）
- 新：note/initial-disc（左 34×34 圆形深底）、quote/ring-device（上方圆环 device + 三角 + 圆点）、highlight/side-dots（字旁着重圆点）

### 反色板块

- 旧：quote/tilted-sticker（反色 + 微旋转）、pull-quote/centered-rule（gallery placard 体）
- 新：pull-quote/inverted-plate（signatureOf: bauhaus-digest → #111 底白字）、highlight/geometric-flag（左右实色方块旗）

### 双语堆叠 / bilingual

- 旧：（无直接旧 variant，closest: pull-quote/margin-pull NYT Sunday 体）
- 新：pull-quote/bilingual-stack（signatureOf: naturalist-notes）

### 编辑部落款 / kicker

- 旧：admonition/news-underline（signatureOf: swiss-grid）、note/editorial-stripe、note/smallcaps-kicker
- 新：note/ed-signoff（右下 ed. + 首字母 monospace）、note/inline-label（段首反白胶囊）、admonition/hanging-nb（N.B.+编号）

### 竖签条 / 左竖排

- 旧：admonition/marginalia（靠【按】【疑】符号区分）、note/side-bar（左 2px 中性线）
- 新：admonition/paper-slip（左竖排黄签条）

### 米黄底色 / 色块底

- 旧：admonition/bubble-organic（signatureOf: life-aesthetic）、admonition/mook-tag（米卡纸底）
- 新：highlight/wash-ground（整段米黄色块底）

### 点状下划线 / dotted

- 旧：note/dotted-margin（左 dotted rule + 缩进）
- 新：highlight/dotted-underline（整段底部点状线）

### 大字距字重

- 旧：admonition/news-underline（signatureOf: swiss-grid）、note/hanging-indent（uppercase + 悬挂缩进）
- 新：highlight/tracked-emphasis（整段 letter-spacing + bold）

### 方格 / 方块 / 网格编号

- 旧：admonition/ledger-cell（signatureOf: business-finance）、pull-quote/grid-block（signatureOf: bauhaus-digest）
- 新：admonition/specimen-box（左 border 方格 N°）、pull-quote/grid-block（已有 signatureOf）

### 单划底线 / accent 实线

- 旧：admonition/minimal-underline（仅标题下划线）、admonition/news-underline（signatureOf: swiss-grid）
- 新：highlight/single-stroke（底部 3px accent 实线）

---

## 重叠对清单

| 新 variant | 旧 variant | 共享手法 | signatureOf 建议 |
|---|---|---|---|
| admonition/vermilion-seal | admonition/marginalia | 朱印 / 旋转角度 | literary-humanism |
| admonition/paper-slip | admonition/marginalia | 竖签条 / 宋本批注气质 | literary-humanism |
| admonition/numbered-rule | admonition/news-row | 编号横线 + 大字距 | editorial-mook |
| admonition/hanging-nb | admonition/news-underline | 竖分隔 + 编号 + kicker | editorial-mook |
| admonition/field-tag | admonition/sidenote-latex | 测量刻度 + 学名风格 | academic-frontier |
| admonition/specimen-box | admonition/ledger-cell | 方格编号 + 左 border | academic-frontier |
| admonition/filled-square | admonition/slab-corner | 几何实色方块 + zero-radius | brutalist |
| admonition/triangle-top | admonition/slab-corner | 三角徽 + 1px 边框 | brutalist |
| note/ed-signoff | note/editorial-stripe | 编辑落款 kicker | editorial-mook |
| note/inline-label | admonition/mook-tag | 段首反白胶囊标签 | editorial-mook |
| note/interlinear-gloss | pull-quote/with-gloss | 双行夹注 + 朱色细线 | literary-humanism |
| note/vermilion-gloss | admonition/marginalia | 朱字批注 + 宋本气质 | literary-humanism |
| note/ruler-note | admonition/sidenote-latex | 测量条 / 标本刻度 | academic-frontier |
| note/latin-subhead | admonition/sidenote-latex | 拉丁 italic 副标 | academic-frontier |
| note/initial-disc | admonition/bubble-organic | 圆形 device + 有机形 | swiss-grid |
| note/geometric-mark | admonition/filled-square | 三角几何形标题 | brutalist |
| quote/oversized-mark | quote/magazine-dropcap | 巨号引号 + italic 衬线 | editorial-mook |
| quote/numbered-lines | admonition/news-row | 编号竖列 + 竖分隔 | editorial-mook |
| quote/seal-kai | admonition/marginalia | 朱印楷字 + 宋本气质 | literary-humanism |
| quote/double-frame | quote/frame-brackets | 双层边框 + 朱色 | literary-humanism |
| quote/specimen-quote | admonition/sidenote-latex | 标本括弧 + 学名 byline | academic-frontier |
| quote/binomial-attrib | admonition/sidenote-latex | 拉丁学名 + 命名人式 | academic-frontier |
| quote/huge-numeral | pull-quote/giant-mark | 巨号编号 + 衬线大字 | swiss-grid |
| quote/ring-device | admonition/bubble-organic | 圆环 / 圆点几何 device | brutalist |
| highlight/dotted-underline | note/dotted-margin | 点状线 + 轻强调底色 | editorial-mook |
| highlight/tracked-emphasis | admonition/news-underline | 大字距 + 印刷感 | editorial-mook |
| highlight/vermilion-inline | admonition/marginalia | 朱色文字 + 左侧点线 | literary-humanism |
| highlight/side-dots | admonition/marginalia | 字旁朱色着重圆点 | literary-humanism |
| highlight/wash-ground | admonition/bubble-organic | 米黄色块底 + 笔记气质 | academic-frontier |
| highlight/bracketed-tick | admonition/field-tag | 方括号刻度 + 博物标本感 | academic-frontier |
| highlight/geometric-flag | admonition/filled-square | 几何实色旗块 + 大字距 | brutalist |
| highlight/single-stroke | admonition/minimal-underline | 底部 accent 实线 | swiss-grid |
| pull-quote/weight-contrast | pull-quote/centered-rule | 上下 hairline + 字重对比 | people-story |
| pull-quote/drop-capital | quote/magazine-dropcap | drop cap + Cormorant italic | people-story |
| pull-quote/inverted-plate | quote/tilted-sticker | 反色板块 / 深底白字 | brutalist |
| pull-quote/grid-block | admonition/ledger-cell | 方格编号 + 顶 accent 条 | brutalist |

**注**：pull-quote/weight-contrast、drop-capital、calligraphic、with-gloss、bilingual-stack、caliper-mark、inverted-plate、grid-block 均已有 signatureOf（见 grep 结果），其中 `naturalist-notes` 和 `bauhaus-digest` 不在现有 18 主题列表内，T3.2 需修正为 `academic-frontier` 和 `brutalist`。

---

## 无重叠的 variant

新 40 variant 中，与既有 39 variant 无直接手法重叠（在该类型与该手法组合上属独立存在）：

1. **pull-quote/bilingual-stack** — 中英双语堆叠，既有 variant 无同类
2. **pull-quote/caliper-mark** — 左右卡尺刻度对称框，既有无同类（ruler-note 仅单侧测量条）
3. **pull-quote/calligraphic** — 朱色撇捺 SVG 装饰（笔画级）
4. **pull-quote/with-gloss** — 双行夹注 + 上下朱线（此为竖排夹注，note/interlinear-gloss 是行间夹注）

---

## T3.2 建议动作

### 需新增 signatureOf 的 variant（取代 experimental: true 或 themeCompat 非现有主题）

| signatureOf 目标主题 | variant 列表 |
|---|---|
| editorial-mook | admonition/numbered-rule、admonition/hanging-nb、note/ed-signoff、note/inline-label、quote/oversized-mark、quote/numbered-lines、highlight/dotted-underline、highlight/tracked-emphasis |
| literary-humanism | admonition/vermilion-seal、admonition/paper-slip、note/interlinear-gloss、note/vermilion-gloss、quote/seal-kai、quote/double-frame、highlight/vermilion-inline、highlight/side-dots |
| academic-frontier | admonition/field-tag、admonition/specimen-box、note/ruler-note、note/latin-subhead、quote/specimen-quote、quote/binomial-attrib、highlight/wash-ground、highlight/bracketed-tick |
| brutalist | admonition/filled-square、admonition/triangle-top、note/geometric-mark、quote/ring-device、highlight/geometric-flag、pull-quote/inverted-plate、pull-quote/grid-block |
| swiss-grid | note/initial-disc、quote/huge-numeral、highlight/single-stroke |
| people-story | pull-quote/weight-contrast、pull-quote/drop-capital |
| academic-frontier（修正 naturalist-notes） | pull-quote/bilingual-stack、pull-quote/caliper-mark |
| literary-humanism（现有） | pull-quote/calligraphic、pull-quote/with-gloss |

### 既有 variant 不动

共 39 个既有 variant 的 signatureOf 不变，新 variant 共享其签名归属方向，不改旧有绑定。

### signatureOf 分布汇总

| 主题 | 新 variant 数 |
|---|---|
| editorial-mook | 8 |
| literary-humanism | 10（含已有 calligraphic / with-gloss） |
| academic-frontier | 10（含 bilingual-stack / caliper-mark 修正） |
| brutalist | 7 |
| swiss-grid | 3 |
| people-story | 2 |
