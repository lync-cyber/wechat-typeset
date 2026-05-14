/**
 * data-brief 家族容器渲染器（R4 后过渡性 barrel）
 *
 * 实现已拆分到 ./databrief/{frame,metrics,editorial,cta,index}.ts —— 见 ./databrief/index.ts
 * 顶部注释了解拆分纪律。
 *
 * 为何保留本文件：
 *   pipeline/containers/index.ts 与外部脚本（含 capabilities / writer-docs 生成器，未来
 *   可能新增）按 `from './databrief'` 形式 import；Node/TS 模块解析在同名文件与同名
 *   目录并存时优先解析文件——本 barrel 让旧路径继续有效，不强制立刻迁移所有引用。
 *
 * 弃用计划：下个 minor release 把所有 import 显式改成 `from './databrief/index'` 或
 * 按主题指向 `./databrief/metrics` 等，然后删除本文件。
 *
 * 不要在本文件里加新容器实现——任何新 data-brief 容器请直接进对应主题子文件。
 */

export {
  mastheadContainer,
  sectionTagContainer,
  tocContainer,
  tocItemContainer,
  colophonContainer,
  kpiDashboardContainer,
  kpiItemContainer,
  barChartContainer,
  barContainer,
  qaBlockContainer,
  footnotesContainer,
  refsContainer,
  editorNoteContainer,
  methodologyContainer,
  ctaBarContainer,
  qrFollowContainer,
} from './databrief/index'
