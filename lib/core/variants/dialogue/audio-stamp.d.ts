/**
 * dialogue · audio-stamp（音频时间戳 博物笔记）
 *
 * 人格：田野录音 / 博物笔记——顶行 mono 时间码，次行 name + role italic 英文标签，正文段。
 * timestamp 缺省时跳过时间码行；role 缺省时降级为 'speaker'。
 */
import type { VariantDef } from '../_core';
declare const audioStamp: VariantDef;
export default audioStamp;
