# `theme:data-brief` 主题专属扩展

[← 回 README](../README.md) · [基础契约](../base.md) · [editorial 领域扩展](editorial.md) · [自定义扩展](../custom.md)

**只有 `data-brief` 主题渲染下面这组数据可视化容器**：KPI 仪表盘、横向条形图、及其子项。气质参照：晚点 LatePost · 财新数据 · Morning Brew "By the numbers" 板块。

> **重要：本扩展属于 `theme:data-brief` namespace**——`kpi-dashboard / bar-chart` 在其他主题里**不会得到签名视觉**（renderer 仍出 HTML，但不保证版面气质）。
> 想要刊头 / 目录 / 问答 / 脚注 / 编辑部注等**多主题共享**的刊物容器，看 [editorial 领域扩展包](editorial.md)。

## 何时用本扩展

- 主题选了 `data-brief`
- 文章主体是**数据驱动**（统计 / 调研 / 季度复盘）
- 想要克制的"数据简报"几何审美：div 柱、sparkline、表格化栏位

## 速查表

<!-- generated:container-quick-ref:theme:data-brief:start -->

`data-brief` 主题专属：KPI 仪表盘 / 横向条形图等数据可视化容器。只在 `data-brief` 主题渲染时给出签名视觉；其他主题里属于"主题专属扩展"未启用范畴。

| 类 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |

> 由 `npm run build:writer-docs` 从 `src/containers/vocabulary.ts` 生成，请勿手改。新增容器先改 vocabulary（含 `pack` 字段），需要划入扩展包就声明 `pack: '<id>'`。

<!-- generated:container-quick-ref:theme:data-brief:end -->

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
| `series` | sparkline 折线数据（逗号分隔 0–13 整数，左右端点对齐） |
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

---

## 章节蓝色 monospace 编号（无需手写 HTML）

data-brief 主题在渲染层识别 `## 01 标题` / `## 12 标题` / `## 附 数据说明` 这类前缀模式，自动把数字（1–2 位）或单字标记（`附` / `终` / `前` / `补`）切成主色 monospace 小字 + 间距。作者写：

```
## 01 为什么我们失去了阅读的耐心
## 02 慢读的三种练习
## 附 数据说明 · NOTES
```

不写任何 `<span>` 标签。匹配不上的前缀（如 `## 一、 …` 或 `## 第一章`）保持原样不被改写——这是 data-brief 主题的私有装饰，走 `decorations.headingPrefix` 声明式规则承载。

---

## 完整示例

端到端示范：[`src/samples-md/sample-data-brief.md`](../../../src/samples-md/sample-data-brief.md)——同时演示 editorial 家族（刊头/目录/Q&A/CTA…）与 data-brief 主题专属的 KPI / 条形图。
