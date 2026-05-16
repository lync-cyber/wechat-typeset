# `data-brief` 主题排版说明

[← 回 README](../README.md) · [基础契约](../base.md) · [editorial 领域扩展](editorial.md) · [data-viz 数据可视化包](data-viz.md) · [自定义扩展](../custom.md)

`data-brief` 主题的数据可视化容器（KPI 仪表盘、横向条形图）已迁至跨主题共享的 [`pack:data-viz`](data-viz.md)，可在 `business-finance`、`industry-observer` 等主题里复用。

本文记录 `data-brief` 主题**私有**的排版行为。

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

端到端示范：[`src/samples-md/sample-data-brief.md`](../../../src/samples-md/sample-data-brief.md)——同时演示 editorial 家族（刊头/目录/Q&A/CTA…）与 pack:data-viz（KPI / 条形图）。
