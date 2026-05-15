#!/usr/bin/env tsx
// wechat-typeset CLI 入口。subcommand 派发器在 ../src/dispatcher.ts。
import { dispatch } from '../src/dispatcher.ts'

const code = await dispatch(process.argv.slice(2))
process.exit(code)
