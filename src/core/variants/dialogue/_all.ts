/**
 * dialogue 目录聚合器。新增 dialogue variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef
 *   2. 在此文件 import 并追加到数组
 * 排序由 registry.ts 的 DIALOGUE_ORDER 决定，此处只做收集。
 */

import qaRows from './qa-rows'
import chatBubbles from './chat-bubbles'
import namePrefix from './name-prefix'
import interviewColumn from './interview-column'
import screenplay from './screenplay'
import hostGuestSeal from './host-guest-seal'

export default [qaRows, chatBubbles, namePrefix, interviewColumn, screenplay, hostGuestSeal]
