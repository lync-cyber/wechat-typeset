# 移动端跟进四项（临时）

> 四项移动端相关跟进，完成后清理。

## 推进顺序

1. **M1 · footer-cta tap target 保底** —— 低风险纯 CSS，无依赖
2. **M2 · release-checklist.md 移动端验收清单** —— 低风险纯文档；M4 会引用其中项
3. **M4 · CodeMirror 移动端键盘遮挡** —— 中风险，动 Editor.vue；在 M3 之前做，让 M3 的 e2e 可覆盖本修复
4. **M3 · Playwright viewport E2E + CI 接入** —— 最大风险/最大变更，引入新工具链与 CI；最后做

## 子任务

### M1 · footer-cta tap target
- [ ] footer.ts 的按钮胶囊 inline style 改为 `inline-flex` + `min-height:44px`
- [ ] 同步 containers 测试（若断言了旧 display 值）
- [ ] 回归 themeCSS snapshot / verify-sample-full

### M2 · 移动端手动验收清单
- [ ] docs/release-checklist.md 新增「移动端手动验收（375×667）」章节
- [ ] 条目涵盖：两行工具栏 / 底部 tab / 全屏 drawer / footer-cta tap / OnboardingCard 占位 / 长图 / Clipboard / iOS focus 防缩放 / 键盘遮挡 / 分享链接 hash / ThemeStrip 横向滚动

### M4 · CodeMirror 键盘遮挡
- [ ] Editor.vue 加 focus 滚动：光标 viewport 定位后滚动到可视区中部，避开虚拟键盘区
- [ ] 使用 visualViewport API 检测键盘高度（iOS/Android Chrome 均支持）
- [ ] 仅在 mobile breakpoint 启用，避免桌面端干扰
- [ ] 若 visualViewport 不可用则降级为 no-op
- [ ] 测试加个 jsdom 下 mock visualViewport 的覆盖（检查 resize 监听正确 attach/detach）

### M3 · Playwright E2E + CI
- [ ] 装 `@playwright/test` 为 devDependency
- [ ] 建 `playwright.config.ts`（projects: chromium mobile + webkit mobile；viewport 375×667；webServer=vite dev）
- [ ] 建 `e2e/` 目录（与 tests/ 区分，避免 vitest 抓它）
- [ ] `e2e/smoke.spec.ts`：加载页面、检查 mobile toolbar / 底部 tab 可见
- [ ] `e2e/footer-cta.spec.ts`：粘贴带 href 的 footer-cta md，预览 iframe 中 `<a data-wx-footer-cta>` 存在 + href 正确
- [ ] `e2e/keyboard-obscure.spec.ts`：Editor focus 后光标不被虚拟键盘遮挡（M4 修复验证）
- [ ] `package.json` 加 `test:e2e:pw` script
- [ ] vitest.config 与 playwright 不互相扫描
- [ ] GitHub Actions workflow `.github/workflows/e2e.yml`
- [ ] CONTRIBUTING.md 补一行"e2e 跑法"

## 最终清理

- [ ] typecheck + vitest + verify-sample-full + 若本地跑 e2e 则至少 chromium 绿
- [ ] 单次 commit + push
- [ ] 删除本文档
