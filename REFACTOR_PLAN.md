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

## Stage 2 · 高频作者痛点 [已完成]

- [x] **#12** `patchListWrap.ts` 扩展深层递归扁平化：depth ≥ 2 (即第三层) 的 `<ul>/<ol>` 被换成 `<p data-wx-list-flatten>· text</p>` 段落序列；`diagnose.ts` 增 `list-too-deep` 规则（列表行缩进 ≥ 4 空格或 1 tab 时 warning）
- [x] **#11** 新增 `src/clipboard/pasteSanitize.ts`：turndown 驱动的 HTML → markdown 降级；剥 `<style>/<script>/<meta>/<link>` 和 Word 的 `<o:p>/<w:*>` XML；`shouldSanitize()` 过滤"平凡单 `<p>`"避免 CM 自复制被打扰；Editor.vue 接 paste handler
- [x] **#10** 新增 `src/clipboard/imageIntake.ts`：`ImageProvider` 接口 + 内置 `base64Provider`（WebP 压缩，`>` 32KB 走 canvas.toDataURL('image/webp', 0.85)，失败回退原图 base64）；Editor.vue 接 paste/drop handler，插入"上传中"占位后异步替换

验收：vue-tsc 静默通过；vitest 663/663（+32 新增：5 深层扁平化 + 5 list-too-deep + 15 pasteSanitize + 8 imageIntake）；verify-sample-full 51/51。

待手动 UI 验证：
- Word/浏览器粘贴：`<p style>`/`<span class>` 噪声被剥，段落和列表正确落地
- 从剪贴板或磁盘拖入图片：占位提示 → 自动换成 `![name](data:image/webp;...)`
- 编辑器里写 ≥ 三级嵌套列表：第三层起标记行显黄波浪

## Stage 3 · 中文与发文完备性 [已完成]

- [x] **#13** 新增 `src/pipeline/zhTypo.ts`：四条中文排版规则（ascii-spacing / halfwidth-punct / straight-quote / dash-ellipsis）+ 保护区（代码块 / URL / 链接 / HTML / 缩进代码）；diagnose.ts 桥接 4 条 `zh-*` info 级诊断；Toolbar 菜单增"一键修复中文排版" → App.handleFixZhTypo (UndoToast 支持撤销)
- [x] **#16** 新增 `src/pipeline/wxPatch/inspect.ts`：扫描 juice 后 / wxPatch 前的 HTML 产出 PatchLog（9 条补丁类目的命中计数）；RenderOutput 增 `patchLog` 字段；Preview.vue 新增底部折叠"渲染透明度"面板
- [x] **#14** 新增 `src/components/ThemeStrip.vue`：9 主题缩略卡（primary 色点 + 主题名 + lock-dot）；App.vue 新增 `hoverThemeId` 临时覆盖 activeTheme → 实现 hover 即时切换 / click 锁定
- [x] **#15** 新增 `src/publish/checklist.ts`（纯函数）+ `PublishChecklist.vue`（右抽屉第三档）：7 条检查 —— 封面 / 摘要≤120 / 字数≥400 / 作者声明 / 外链数 / 内联图体积 / 封面比例提示；接 Toolbar 菜单 + CommandPalette

验收：vue-tsc 静默通过；vitest 731/731（+68 新增：29 zhTypo + 5 diagnose 桥接 + 15 inspect + 19 checklist）；verify-sample-full 51/51。

待手动 UI 验证：
- 编辑器内写 `你好world，那时候...走了` 看是否出现 info 级中文排版诊断
- 点击 Toolbar 菜单"一键修复中文排版" → 一次替换、UndoToast 可撤销
- Preview 底部出现"渲染透明度 · N 处微信适配"折叠栏，展开后列表可见
- Preview 顶部出现 9 主题缩略条，hover 切换 / click 锁定
- Toolbar 菜单出现"发文清单" → 右抽屉展开检查列表

## Stage 4 · 内容 / 存储 / 导出 [已完成（含 #20 范围调整）]

- [x] **#18** Markdown 原文导出：历史已落地——`exportFile.ts` 的 `exportMd()` 已被 `App.vue` / `Toolbar.vue` 用上（菜单项"导出 Markdown"，快捷键 `⌘⇧M`），本阶段只做确认
- [x] **#19** 只读分享链接：新增 `src/share/shareLink.ts`（`encodeShare` / `decodeShare` / `buildShareUrl` / `parseShareHash`；base64url + JSON，暂不 gzip）；Toolbar 菜单 + Command palette 入口"复制分享链接"；`App.onMounted` 若检测到 `#share=...` 自动载入为新草稿（`[分享] 标题`），写入后 `history.replaceState` 清 hash
- [x] **#17** 站外链接降级：新增 `src/clipboard/outlinkDegrade.ts`（`keep` / `tail-list` / `drop` 三策略 + 幂等；DOMParser 路径）；`handleCopy` 执行降级并拼 `（N 条外链已 xxx）`；Toolbar overflow 新增「外链处理」三段式开关；`wechat-typeset:outlink-strategy` localStorage 持久化
- [x] **#20** （范围调整）tags / 全文搜索 / 配额告警：`drafts.ts` 扩 `tags?: string[]` + `searchDrafts({ query, tags })`（tokens 支持 `#xxx` 语法）+ `listAllTags`；新增 `src/storage/quota.ts` 走 `navigator.storage.estimate()`（不支持时 LS 估算）；`DraftDrawer` 新增 tag 过滤条 / 80% 警告条 / 字节化 footer；原 LS 持久化保留
  - **IndexedDB 后端迁移延后到 Stage 6**：典型草稿 10-30KB，LS 5MB 理论容纳 ~150 篇，实际用户压力远低于此；IDB 换底带来 async API 级联、fake-indexeddb 开发依赖，收益不成正比。真有用户反馈触发 80% 告警再做底层切换（见 Stage 6 #33）

验收：vue-tsc 静默通过；vitest 774/774（+43：15 shareLink + 12 outlinkDegrade + 11 drafts tag/search + 5 quota）；verify-sample-full 51/51。

待手动 UI 验证：
- Toolbar 菜单"复制分享链接" → 地址栏 hash 正确；换 tab 贴链接能重新落为新草稿
- Toolbar overflow「外链处理」切到「尾注」→ 复制后文末追加参考列表 + 正文出现 `[N]` 上角标
- 草稿抽屉：含 tag 的草稿显示 chip；顶部标签条点击过滤；搜索框输入 `#vue` 正确生效；模拟填满 LS 到 80% 时出现黄色告警条

## 后续阶段
- Stage 5（机会主义）: #21 elements 差异化 / #22 可视化主题编辑 / #23 storage kv 抽取 / #24 variants _all.ts / #25 scripts writeOutput
- Stage 6（延后）: #26-32，新增 #33 IndexedDB 后端换底（配合 `navigator.storage.persist()` 申请持久化存储）
