# `pack:data-viz` 数据可视化扩展包

[← 回 README](../README.md) · [基础契约](../base.md) · [editorial 领域扩展](editorial.md) · [data-brief 主题说明](data-brief.md) · [自定义扩展](../custom.md)

为数据驱动文章设计的跨主题可视化容器集——KPI 仪表盘、横向条形图。气质参照：晚点 LatePost · 财新数据 · Morning Brew "By the numbers" 板块。

本包是**领域扩展**，多主题可借用（不绑定 `data-brief` 主题）。在 `signatureContainers` 里声明 `kpiDashboard` 或 `barChart` 即激活整包签名视觉；未声明的主题语法仍合法，但会回退到中性兜底样式。

## 何时用本扩展包

- 文章主体是**数据驱动**（统计 / 调研 / 季度复盘）
- 想要克制的"数据简报"几何审美：div 柱、sparkline、表格化栏位
- 主题选了 `data-brief`、`business-finance`、`industry-observer` 等数据向人格

## 速查表

<!-- generated:container-quick-ref:pack:data-viz:start -->

数据可视化容器集（多主题可借用）：KPI 仪表盘 / 横向条形图。在 `signatureContainers` 里声明 `kpiDashboard` 或 `barChart` 即启用整包签名视觉。带 ★ 是可登记的**签名容器**。

| 类 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |
| 数据 | `kpi-dashboard` | ★ | KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。 |
|  | `kpi-item` |  | kpi-dashboard 内单指标。一切以 attrs 驱动，body 内容被忽略。 |
|  | `bar-chart` | ★ | 横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。 |
|  | `bar` |  | bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。 |

> 由 `npm run build:writer-docs` 从 `src/containers/vocabulary.ts` 生成，请勿手改。新增容器先改 vocabulary（含 `pack` 字段），需要划入扩展包就声明 `pack: '<id>'`。

<!-- generated:container-quick-ref:pack:data-viz:end -->

---

## KPI 仪表盘（三指标 + sparkline）

```
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::: kpi-item label="02 · UNLOCK/DAY" caption="日均手机解锁" value="138" unit="次" delta="+23%" trend="up" series="11,10,9,8,7,5,3,2" foot="'15 41次 → '24 138次"
:::
::: kpi-item label="03 · BOOKS/YR" caption="年均完整阅读" value="2.7" unit="本" delta="±0" trend="flat" series="7,6,8,7,8,6,7,7" foot="'15 2.8本 → '24 2.7本"
:::
::::
```

`kpi-item` 的全部展示**靠 attrs 驱动**，body 内容会被忽略：

| attr | 用途 |
| --- | --- |
| `label` | 指标编号 / 口径（monospace） |
| `caption` | 中文说明 |
| `value` / `unit` | 数字本体 + 单位 |
| `delta` | 同比标签（前缀决定颜色：`-` 红 / `+` 红 / `±` 灰） |
| `trend` | sparkline 颜色方向（`up` / `down` / `flat`） |
| `series` | sparkline 折线数据（逗号分隔的任意数值；按 min/max 自动缩放到可视区，左右端点对齐） |
| `foot` | 期端对比小字（monospace 双端） |

---

## 横向条形图

```
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟 · n=1,024"
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
```

纯 `div` 宽度，无 SVG——`pct` 是 0–100 整数。`tone="warn"` 把柱色切到 danger 红，用作"异常值"标注。

标签列宽默认 72px（容下 5 字中文），数值列宽默认 48px（容下 "9 分钟" / "100%"）。需要更宽的标签（如 "用户首次访问"）或更长的数值（如 "12.5 万 / 周"）可在 `bar-chart` 上覆写——所有子 `bar` 跟随对齐：

```
:::: bar-chart 行为来源分布 labelWidth="96px" valueWidth="64px"
::: bar label="社交应用切换" pct="35" value="12.5 万"
:::
::::
```

也支持 per-bar 覆写（少见，仅做对齐微调用）。值是 CSS 长度字面量（`80` / `80px` / `25%` / `5em`），非法时落回默认。

---

## 完整示例

端到端示范：[`src/samples-md/sample-data-brief.md`](../../../src/samples-md/sample-data-brief.md)——同时演示 editorial 家族（刊头/目录/Q&A/CTA…）与 pack:data-viz 的 KPI / 条形图。
