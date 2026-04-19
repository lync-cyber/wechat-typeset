# 贡献指南

感谢你愿意为 wx-md 出力。项目目标是**给写微信公众号文章的作者一个纯前端、零外传的排版工具**——任何改动都应服务这一条。

## 本地开发

```bash
npm ci             # 严格按 package-lock.json 装，避免版本漂移
npm run dev        # 开发服务器，热更新，http://127.0.0.1:5173
npm run build      # 生产构建 → dist/
npm test           # 全量 vitest
npm run typecheck  # 单独跑 vue-tsc
```

## 提 PR 前的自检清单

- [ ] `npm run build` 无报错（含 `vue-tsc --noEmit`）
- [ ] `npm test` 全绿
- [ ] 如改动渲染/主题/变体：`npx tsx scripts/verify-sample-full.ts` 34/34 通过
- [ ] 提交信息用 Conventional Commits（`feat: ...` / `fix: ...` / `refactor: ...` / `docs: ...`）
- [ ] 不引入任何新网络请求（analytics / 远程字体 / 远程模板一律禁止）
- [ ] 不引入新依赖，除非能用等量代码替换掉更重的现有依赖

## 不可破坏的硬约束

- **微信粘贴兼容性**：`src/pipeline/rules.ts` 列出了所有平台约束（禁用 CSS / 标签 / 属性 / iframe 白名单）。主题作者触碰其中任一条会在构建期 `throw ThemeAuthoringError`。
- **预览=剪贴板**：左侧预览与复制出去的 HTML 必须是同一份——不要引入"预览看起来好、粘贴后塌"的分支逻辑。
- **本地 only**：不加登录 / 不加后端 / 不加配额。草稿必须 100% 在 `localStorage` 里。
- **启动路径**：`127.0.0.1` 和 `localhost` 必须走通（secure context 约束）；`file://` 协议可以放弃。

## 文档索引

- [容器扩展语法](docs/container-syntax.md)
- [第三方主题开发指南](docs/theme-authoring.md)
- [手动验收清单](docs/TESTING.md)

## 许可

提交的改动自动按 [MIT](LICENSE) 授权。
