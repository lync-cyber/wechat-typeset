# Persona Cookbook · 4 套常见话题的 spec 骨架

> 不是给"复用"用——这些骨架是**起点**，LLM 应该在上面调 palette、motif、variants 直到满足用户具体需求。
> 想直接复用内置主题，参考 [../references/personas.md](../references/personas.md)。

## 1. 夜行技术（dark · 暗琥珀字 + 墨炭暖底）

**何时拷此骨架**：用户描述"暗黑、终端、manpage、JetBrains/VSCode 暗色风、深背景"。

```jsonc
{
  "id": "dark-terminal",
  "name": "夜行技术",
  "description": "暗琥珀字 + 墨炭暖底 + manpage 印刷传统",
  "audience": "工程师 / 系统编程 / 底层内幕",
  "palette": {
    "primary":      "#e6a347",
    "secondary":    "#8c9099",
    "accent":       "#e6a347",
    "bg":           "#1a1612",
    "bgSoft":       "#23201c",
    "bgMuted":      "#2c2925",
    "text":         "#e8dfd1",
    "textMuted":    "#9a9085",
    "textInverse":  "#1a1612",
    "border":       "#3a352e",
    "code":         "#e6a347"
  },
  "status": {
    "tip":     { "accent": "#7cb069", "soft": "#243a25" },
    "info":    { "accent": "#e6a347", "soft": "#3a2e1f" },
    "warning": { "accent": "#d59d3a", "soft": "#3a2f1c" },
    "danger":  { "accent": "#d9544f", "soft": "#3a1d1d" }
  },
  "typography": { "baseSize": 15, "lineHeight": 1.6, "h1Size": 22, "h2Size": 18, "h3Size": 16, "letterSpacing": 0 },
  "variants": {
    "admonition": "dashed-border",
    "quote": "frame-brackets",
    "compare": "stacked-row",
    "steps": "number-circle",
    "divider": "wave",
    "sectionTitle": "bordered",
    "codeBlock": "bare",
    "note": "margin-bracket"
  }
  // motifs: h2Prefix 用 `§` 文本 + 琥珀色 underscore；dividerWave 用单根虚线；stepBadge 实心圆 + 琥珀字
}
```

**坑**：`textInverse` 必须是暖底色而非纯白（否则 admonition variant `card-shadow` 的"翻转面"会变扎眼）；`code = primary` 是设计选择，code 与 h2Prefix 视觉同色。

---

## 2. 暖色生活（warm · 米底 + 圆角 + 衬线点装饰）

**何时拷此骨架**：用户描述"美食、旅行、四时、慢节奏、有温度、不要冷蓝色"。

```jsonc
{
  "id": "warm-aesthetic",
  "name": "暖色生活",
  "description": "暖米底 + 圆角柔和 + 衬线点装饰",
  "audience": "生活写作 / 非虚构随笔 / 季节随笔",
  "palette": {
    "primary":      "#a8612d",
    "secondary":    "#9a8f80",
    "accent":       "#c8784a",
    "bg":           "#faf6ef",
    "bgSoft":       "#f3ecdf",
    "bgMuted":      "#e8ddc8",
    "text":         "#3d342a",
    "textMuted":    "#7d6f5e",
    "textInverse":  "#fefefe",
    "border":       "#d4c5a8",
    "code":         "#a8612d"
  },
  "status": {
    "tip":     { "accent": "#6b8e3d", "soft": "#eef0d8" },
    "info":    { "accent": "#a8612d", "soft": "#f0e4cf" },
    "warning": { "accent": "#c89a3a", "soft": "#f4e9c8" },
    "danger":  { "accent": "#b8493a", "soft": "#f4d8cf" }
  },
  "typography": { "baseSize": 16, "lineHeight": 1.85, "h1Size": 24, "h2Size": 20, "h3Size": 17, "letterSpacing": 0.4 },
  "radius": { "sm": 6, "md": 12, "lg": 16 },
  "variants": {
    "admonition": "card-shadow",
    "quote": "classic",
    "compare": "column-card",
    "steps": "ribbon-chain",
    "divider": "flower",
    "sectionTitle": "bordered",
    "codeBlock": "bare",
    "note": "minimal"
  }
  // motifs: dividerFlower 用云头花饰；h2Prefix 用衬线圆点+花蕊样式
}
```

**坑**：`letterSpacing 0.4` 已经偏大，再多就散；`radius.lg 16` 是上限，更大显得"廉价餐饮店菜单"。

---

## 3. 内参财经（report · 深栗墨 + 内参蓝 + 直角）

**何时拷此骨架**：用户描述"研报、内参、财新、FT 中文、数字优先、克制"。

```jsonc
{
  "id": "internal-report",
  "name": "内参财经",
  "description": "深栗墨 + 内参蓝 + 账本式排版",
  "audience": "财经内参 / 研究所 newsletter / 投资备忘",
  "palette": {
    "primary":      "#2d4a78",
    "secondary":    "#7a8294",
    "accent":       "#8a3a2e",
    "bg":           "#fbfaf7",
    "bgSoft":       "#f0ede5",
    "bgMuted":      "#e8e3d4",
    "text":         "#1f1c18",
    "textMuted":    "#6a6358",
    "textInverse":  "#fefefe",
    "border":       "#c8c2b3",
    "code":         "#1f1c18"
  },
  "status": {
    "tip":     { "accent": "#3a6b3a", "soft": "#e8eee0" },
    "info":    { "accent": "#2d4a78", "soft": "#dde4ee" },
    "warning": { "accent": "#a06b1f", "soft": "#efe3c8" },
    "danger":  { "accent": "#8a3a2e", "soft": "#eedfd8" }
  },
  "typography": { "baseSize": 15, "lineHeight": 1.7, "h1Size": 26, "h2Size": 20, "h3Size": 16, "letterSpacing": 0 },
  "radius": { "sm": 2, "md": 4, "lg": 6 },
  "variants": {
    "admonition": "accent-bar",
    "quote": "frame-brackets",
    "compare": "ledger",
    "steps": "timeline-dot",
    "divider": "wave",
    "sectionTitle": "bordered",
    "codeBlock": "bare",
    "note": "minimal"
  },
  "signatureContainers": ["abstract", "keyNumber"]
}
```

**坑**：`radius` 几乎全直角是设计纪律；`compare.ledger` 是这套主题的视觉签名（一红一绿账本双列），不要换成 column-card；signatureContainers 至少声明 `abstract`/`keyNumber`，是核心卖点。

---

## 4. 学术清简（academic · 极简白 + 极少装饰）

**何时拷此骨架**：用户描述"学术、论文、arXiv、Nature、LaTeX article、严谨克制、不要装饰"。

```jsonc
{
  "id": "academic-clean",
  "name": "学术清简",
  "description": "极简白底 + 衬线引文框 + 极少装饰",
  "audience": "学术研究者 / 论文科普 / 综述",
  "palette": {
    "primary":      "#1a3a6e",
    "secondary":    "#6c7280",
    "accent":       "#1a3a6e",
    "bg":           "#fefefd",
    "bgSoft":       "#f5f5f3",
    "bgMuted":      "#ebebe8",
    "text":         "#1c1e22",
    "textMuted":    "#5a606a",
    "textInverse":  "#fefefe",
    "border":       "#d0d0cc",
    "code":         "#1c1e22"
  },
  "status": {
    "tip":     { "accent": "#2d6b3a", "soft": "#eaf0e5" },
    "info":    { "accent": "#1a3a6e", "soft": "#e3e8f0" },
    "warning": { "accent": "#8a6520", "soft": "#f0eadf" },
    "danger":  { "accent": "#a02e22", "soft": "#f0dcd8" }
  },
  "typography": { "baseSize": 16, "lineHeight": 1.8, "h1Size": 24, "h2Size": 20, "h3Size": 17, "letterSpacing": 0.1 },
  "radius": { "sm": 2, "md": 4, "lg": 6 },
  "variants": {
    "admonition": "accent-bar",
    "quote": "frame-brackets",
    "compare": "column-card",
    "steps": "timeline-dot",
    "divider": "rule",
    "sectionTitle": "bordered",
    "codeBlock": "bare",
    "note": "minimal"
  },
  "signatureContainers": ["abstract", "seeAlso"]
}
```

**坑**：`divider.rule` 是最枯的一档（一条横线）—— 这套主题靠"留白 + 文字"而非装饰；`signatureContainers` 给 `abstract`（摘要）+ `seeAlso`（参考文献）是论文路径下的基本盘。
