# 贡献指南

感谢你愿意为 wechat-typeset 出力。项目目标是**给写微信公众号文章的作者一个纯前端、零外传的排版工具**——任何改动都应服务这一条。

## 本地开发

```bash
npm ci             # 严格按 package-lock.json 装，避免版本漂移
npm run dev        # 开发服务器，热更新，http://127.0.0.1:5173
npm run build      # 生产构建 → dist/
npm test           # 全量 vitest + sample-full 端到端校验
npm run test:unit  # 只跑 vitest（开发中快速回归）
npm run test:e2e   # 只跑 sample-full 校验（改 variant/主题后必跑）
npm run typecheck  # 单独跑 vue-tsc
```

### Playwright 移动端 E2E（可选）

移动端布局与 footer-cta 链接相关变更建议跑一遍 Playwright：

```bash
npm run test:e2e:pw:install   # 首次装浏览器（~200MB）
npm run test:e2e:pw           # 跑 tests/e2e/ 下全部用例
npx playwright test --project=mobile-chromium --ui   # 调试模式
```

viewport 锁定在 375×667（docs/release-checklist.md 的移动端基线）。CI 只跑 chromium；本地可加 `--project=mobile-webkit` 验 iOS Safari。

## 提 PR 前的自检清单

- [ ] `npm run build` 无报错（含 `vue-tsc --noEmit`）
- [ ] `npm test` 全绿（vitest + sample-full 端到端）
- [ ] 提交信息用 Conventional Commits（`feat: ...` / `fix: ...` / `refactor: ...` / `docs: ...`）
- [ ] 不引入任何新网络请求（analytics / 远程字体 / 远程模板一律禁止）
- [ ] 不引入新依赖，除非能用等量代码替换掉更重的现有依赖

## Capabilities 演进（`dist/api/capabilities.json`）

外部集成方（InkFlow / LLM agents / MCP）通过 `capabilities.json` 自描述能力发现。改动前请遵守演进纪律：

- **schemaVersion 语义**：major 变更 = 破坏性（下游必须改代码）；minor = 新增字段；patch = 非契约修正
- **破坏前先登记**：把旧字段加进 `deprecations[]`（带 `sinceVersion` / `replacement` / `removalPlannedIn`），至少保留一个 minor 窗口期再删
- **CHANGELOG 双标**：契约变更条目同时标 `feat(api): ... [schema X.Y]`，让消费方一眼定位 schema 版本
- **CI 守门**：`scripts/check-capabilities-stable.ts` 比对主分支基线 → 未登记的破坏性变更即 fail
- **新增 inline 扩展 / 容器 / variant**：必须同时在源端（`src/core/pipeline/inlineExtensions.ts` / vocabulary / variants）登记 —— `capabilities.json` 是派生产物，不要手改

## 不可破坏的硬约束

- **写作契约**：[docs/contract/](docs/contract/) 声明的容器 fence + 5 行内扩展是作者 API 的全集，分基础契约 / 扩展包 / 自定义扩展三层。**新主题不得扩展 fence 词汇**——新视觉一律走 variant 注册，在 `src/variants/<kind>/` 下新建 id。扩展 `src/containers/vocabulary.ts` 属于破坏作者契约的变更，需走主版本升级（自定义扩展流程见 [contract/custom.md](docs/contract/custom.md)）。
- **微信粘贴兼容性**：`src/pipeline/rules.ts` 列出了所有平台约束（禁用 CSS / 标签 / 属性 / iframe 白名单）。主题作者触碰其中任一条会在构建期 `throw ThemeAuthoringError`。
- **预览=剪贴板**：左侧预览与复制出去的 HTML 必须是同一份——不要引入"预览看起来好、粘贴后塌"的分支逻辑。
- **本地 only**：不加登录 / 不加后端 / 不加配额。草稿必须 100% 在 `localStorage` 里。
- **启动路径**：`127.0.0.1` 和 `localhost` 必须走通（secure context 约束）；`file://` 协议可以放弃。

## 已知未完成模块（欢迎认领）

下列坑位是项目内部已识别但尚未投入的工作。外部贡献者可领其一开 PR——开始前请先建 issue 对齐方案，避免与维护者并行做同一件事。

- **`src/core/pipeline/highlight.ts` · 主题感知代码块配色**
  当前 fence 代码块的高亮 CSS 固定为 Atom One Dark。期望：让代码块配色跟随当前主题的 `codeBlock` variant（例如 `header-bar` 走文档蓝、`bare` 走主题中性色），与主题 palette 联动。约束：粘贴到公众号后仍需通过 `wxPatch` 校验（不引入 `font-family` / `position` 等被禁用属性）。

- **`src/core/pipeline/highlight.ts` · 按需动态 import 更多语言**
  当前在模块顶层注册了少量常用语言（详见文件 `hljs.registerLanguage` 列表）。期望：未声明 lang 的 fence 走 `escapeHtml`，但当 fence info 声明已知语言时按需 `import('highlight.js/lib/languages/xxx')`。约束：保持 SSR / Node 端 e2e（`tests/verify-sample-full.ts`）可跑——不要把 import 放在模块顶层。

- **`src/infra/exporters/exportFile.ts` · 长图导出体验**
  `exportImage` 当前的稳定项是单页 PNG。已知问题：超长正文在 iOS Safari 上 html2canvas 输出会因 canvas 高度上限被截断。期望：检测节点高度超 16384px 时切分多段导出，或在 UI 上提前提示作者。约束：保持懒加载（`await import('html2canvas')`）以免主 bundle 膨胀。

## 文档索引

- [写作契约（入口）](docs/contract/README.md) · [基础契约](docs/contract/base.md) · [data-brief 扩展包](docs/contract/packs/data-brief.md) · [自定义扩展](docs/contract/custom.md) · [平台现实与契约演进](docs/contract/platform.md)
- [第三方主题开发指南](docs/theme-authoring.md)
- [手动验收清单](docs/release-checklist.md)

## 许可

提交的改动自动按 [MIT](LICENSE) 授权。
