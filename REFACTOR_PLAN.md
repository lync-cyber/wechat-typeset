# wechat-typeset 重构进度追踪（临时）

> 此文档用于在分阶段重构期间追踪进度，完成后清理。

## 事实核对结论（与清单原文的差异）

| 清单项 | 原描述 | 核对后实际情况 |
|---|---|---|
| #1 hardRules | validate.ts:26-31 "导出"常量 | 常量存在但**未 export**（私有模块作用域） |
| #2 SIGNATURE_CONTAINER_MARKDOWN_NAME | "24 行映射，有 algorithm/seal/prelude 残留" | 20 条有效映射 + 1 行注释占位（未实现的 algorithm/seal/prelude） |
| #3 registry.ts | "P0 阶段：本文件为空 shell" | **确认**旧注释残留在 lines 15-16；下方有新注释说明已显式 import |
| #10 patchListWrap | "≥3 层仅警告" | 当前**完全无嵌套深度检测**，只做 wrap 以保存原始层级 |
| #14 README | "顶部加链接" | README 当前无 writer contract 引用 |

其余 Stage 0-4 项事实与清单一致。

---

## Stage 0 · 契约地基清理 [已完成]

- [x] **#1** `validate.ts` export `HEX_RE`/`MIN_FONT_SIZE`/`MIN_STROKE_WIDTH`/`ALLOWED_FONT_FAMILIES`；`build-capabilities.ts` 的 hardRules 值改为派生自 validate.ts + rules.ts
- [x] **#2** 删 `SIGNATURE_CONTAINER_MARKDOWN_NAME` 手写 21 条 → re-export `STYLE_KEY_TO_CONTAINER_NAME`；同步更新 hard-rules.md 中旧表引用
- [x] **#3** 改写 `registry.ts` docstring（去掉"P0 空 shell"过时说法，重述 3 步新增流程）；合并重复的历史说明
- [x] **#4** 新增 `scripts/build-writer-docs.ts` 从 vocabulary + SUPPORTED_SIGNATURE_CONTAINERS 派生速查表；加 `<!-- generated:container-quick-ref:start/end -->` 标记；package.json `build` 链接入 `--check` 模式
- [x] **#5** capabilities `schemaVersion: '2.0' → '2.1'`；新增 `deprecations: DeprecationNotice[]`（当前空数组占位）+ 文件头契约演进说明

## 验收（Stage 0 完成判据）

- [x] `vue-tsc --noEmit` 静默通过
- [x] `vitest run` 611/611 绿（含 conformance / themeCSS-snapshot）
- [x] `verify-sample-full` 51/51 样本回归通过
- [x] `capabilities.json` 的 `hardRules` 数值与旧版完全一致（14 / 1 / `^#[0-9a-fA-F]{3,8}$` / 五个 true）
- [x] `signatureContainerMarkdownNames` 21 条与旧手写表完全一致
- [x] `build-writer-docs --check` 幂等

---

## Stage 1 · 作者契约 & 编辑器入口 [已完成]

- [x] **#6** 新增 `docs/writer-contract.md`（25 fence + 5 inline 硬承诺 + 主题边界 + 契约演进）；CONTRIBUTING 补"不得扩展 fence 词汇"硬规则；README 顶部链出
- [x] **#9** 新增 `src/pipeline/diagnose.ts` + 20 项测试：未知容器 / fence 长度 / 嵌套错位 / 未知 variant / 未闭合 / YAML 风格 attr 六类诊断
- [x] **#8** package.json 显式登记 `@codemirror/autocomplete` + `@codemirror/lint`（已作为 codemirror 传递依赖安装）；新增 `src/components/editor-extensions.ts` 提供 `createContainerAutocomplete()` + `createContainerLinter()`；Editor.vue 接入
- [x] **#7** HelpPanel 新增"容器速查"段：数据源 `CONTAINER_VOCABULARY`，分组 + 搜索 + 点击插入（复用 App 的 `handleInsertTemplate`）

验收：vue-tsc 静默通过；vitest 631/631（新增 20 项 diagnose 测试）；verify-sample-full 51/51；vite build 成功。

待手动 UI 验证（没有本地 browser 测试）：
- CodeMirror 在 `::: ` 和 `variant=` 后弹出补全
- 写错的容器 / variant 在编辑器左侧 gutter 显红波浪
- HelpPanel 容器搜索 + 点击插入光标处

## 后续阶段
- Stage 2（1-2 Sprint）: #10 图片入站 / #11 粘贴清洗 / #12 嵌套列表自愈
- Stage 3（1 Sprint）: #13 中文排版 lint / #14 多主题并排 / #15 发文清单 / #16 透明度面板
- Stage 4（1 Sprint）: #17 外链降级 / #18 MD 导出 / #19 分享链接 / #20 IndexedDB 迁移
- Stage 5（机会主义）: #21 elements 差异化 / #22 可视化主题编辑 / #23 storage kv 抽取 / #24 variants _all.ts / #25 scripts writeOutput
- Stage 6（延后）: #26-32
