import type { PreceptDetail } from '@/types'
import { PreceptCategory, PreceptLevel } from '@/types'
import { categorizeByReason, extractTags } from './categorizer'
import { getExplanation, getSuggestion } from './explanation'

// ============================================================================
// 戒期等级判断
// ============================================================================

/**
 * 等级判断规则配置
 * 按优先级排序：大戒 > 中戒 > 宜戒
 */
const LEVEL_RULES: Array<{ keywords: string[]; level: PreceptLevel }> = [
  // 大戒：死亡、夺纪等严重后果
  {
    keywords: [
      '死', '亡', '夺纪', '夺禄', '暴亡', '血死',
      '贫夭', '夭亡', '绝嗣', '水厄', '奇祸', '大凶', '男女俱亡'
    ],
    level: PreceptLevel.MAJOR
  },
  // 中戒：疾病、损寿等中等后果
  {
    keywords: [
      '重疾', '大病', '损寿', '减寿', '生病', '得病',
      '遭回禄', '产恶胎', '失瘏夭胎', '得危疾', '恶疾', '带疾', '子带疾'
    ],
    level: PreceptLevel.MODERATE
  },
  // 宜戒：较轻的警示
  {
    keywords: ['宜戒', '大忌', '忌', '斋', '得祸', '削禄', '宜斋戒'],
    level: PreceptLevel.MINOR
  }
]

/**
 * 根据惩罚内容判断戒期等级
 */
export function determinePreceptLevel(punishment: string): PreceptLevel {
  for (const rule of LEVEL_RULES) {
    if (rule.keywords.some(keyword => punishment.includes(keyword))) {
      return rule.level
    }
  }
  return PreceptLevel.MINOR
}

// ============================================================================
// 文本解析
// ============================================================================

/** 解析结果接口 */
interface ParseResult {
  reason: string
  punishment: string
}

/** 解析器类型 */
type TextParser = (text: string) => ParseResult | null

/**
 * 创建正则解析器
 */
const createRegexParser = (
  keyword: string,
  pattern: RegExp,
  formatPunishment: (match: RegExpMatchArray) => string
): TextParser => {
  return (text: string) => {
    if (!text.includes(keyword)) return null
    const match = text.match(pattern)
    if (!match) return null
    return {
      reason: match[1].trim(),
      punishment: formatPunishment(match)
    }
  }
}

/**
 * 确保惩罚以"犯者"开头
 */
const ensureFanzhePrefix = (text: string): string =>
  text.startsWith('犯者') ? text : `犯者${text}`

/**
 * 文本解析器列表（按优先级排序）
 */
const TEXT_PARSERS: TextParser[] = [
  // 1. 处理"犯者"格式
  createRegexParser('犯者', /(.+)，犯者(.+)/, m => `犯者${m[2].trim()}`),

  // 2. 处理"削禄夺纪"格式
  createRegexParser('削禄夺纪', /(.+)，削禄夺纪/, () => '犯者削禄夺纪'),

  // 3. 处理"减寿"格式
  createRegexParser('减寿', /(.+)，(.+减寿)/, m => ensureFanzhePrefix(m[2].trim())),

  // 4. 处理"损寿"格式
  createRegexParser('损寿', /(.+)，(.+损寿)/, m => ensureFanzhePrefix(m[2].trim()))
]

/**
 * 处理"宜戒"文本
 */
const parseYiJie = (text: string): ParseResult | null => {
  if (!text.includes('宜戒')) return null

  const match = text.match(/(.+)，宜戒/)
  if (match) {
    return { reason: match[1].trim(), punishment: '宜戒' }
  }
  if (text === '宜戒') {
    return { reason: '宜戒之日', punishment: '宜戒' }
  }
  if (text.includes('宜斋戒')) {
    return { reason: text, punishment: '宜戒' }
  }
  return null
}

/**
 * 处理通用逗号分隔文本
 */
const parseCommaSeparated = (text: string): ParseResult | null => {
  const match = text.match(/(.+)，(.+)/)
  if (!match) return null

  const [, firstPart, secondPart] = match
  const reason = firstPart.trim()
  const punishmentPart = secondPart.trim()

  const isPunishment = ['犯者', '宜', '忌', '减寿', '损寿', '夺纪']
    .some(keyword => punishmentPart.includes(keyword))

  return {
    reason,
    punishment: isPunishment ? ensureFanzhePrefix(punishmentPart) : '宜戒'
  }
}

// ============================================================================
// 特殊日期处理
// ============================================================================

/** 特殊日期配置 */
interface SpecialDateConfig {
  keyword: string
  handler: (text: string, result: PreceptDetail, originalLevel: PreceptLevel) => void
}

const SPECIAL_DATE_HANDLERS: SpecialDateConfig[] = [
  {
    keyword: '月晦',
    handler: (text, result) => {
      result.reason = '月晦日'
      result.punishment = text.includes('犯者') ? text : '犯者减寿'
      result.category = PreceptCategory.ASTRONOMICAL
      result.tags = ['月晦', '司命奏事']
      result.explanation = '月晦是农历每月的最后一日，天地交泰、阴阳转换的关键时刻。司命之神在此日向天庭奏报世人善恶。如遇到小月（只有29天），则廿九日即为月晦日。'
      result.suggestion = '月晦日应严格持戒，反省己过，可诵经忏悔，修身养性'
      result.specialNote = '如月小即戒廿九日'
    }
  },
  {
    keyword: '释迦如来成道日',
    handler: (text, result, originalLevel) => {
      result.punishment = '宜严格持戒'
      result.category = PreceptCategory.ANNIVERSARY
      result.tags = ['释迦如来', '成道日', '佛教圣日', '腊八']
      result.explanation = getExplanation(text)
      result.suggestion = getSuggestion(text, originalLevel)
    }
  }
]

/** 特殊事件关键词 */
const SPECIAL_EVENT_KEYWORDS = ['暴亡', '贫夭', '血死', '水厄', '绝嗣', '夭亡']

/** 特殊事件解释映射 */
const SPECIAL_EVENT_EXPLANATIONS: Record<string, string> = {
  '天地交泰': '天地阴阳交泰之日，犯戒可能导致严重后果',
  '九毒': '九毒日天地之气不正，犯戒易遭奇祸不测'
}

/**
 * 获取特殊事件解释
 */
function getSpecialEventExplanation(reason: string): string {
  for (const [keyword, explanation] of Object.entries(SPECIAL_EVENT_EXPLANATIONS)) {
    if (reason.includes(keyword)) return explanation
  }
  return '此日特殊，应严格持戒，避免一切不当行为'
}

// ============================================================================
// 主解析函数
// ============================================================================

/**
 * 填充结果的通用字段
 */
function populateResult(result: PreceptDetail, reason: string, punishment: string): void {
  result.reason = reason
  result.punishment = punishment
  const level = determinePreceptLevel(punishment)
  result.category = categorizeByReason(reason)
  result.tags = extractTags(reason)
  result.explanation = getExplanation(reason)
  result.suggestion = getSuggestion(reason, level)
}

/**
 * 解析戒期原因和惩罚，返回详细的结构化数据
 */
export function parsePreceptDetail(text: string, originalLevel: PreceptLevel): PreceptDetail {
  const result: PreceptDetail = {
    reason: text,
    punishment: '宜戒',
    category: PreceptCategory.CUSTOM,
    source: '《寿康宝鉴》'
  }

  // 1. 检查特殊日期
  for (const { keyword, handler } of SPECIAL_DATE_HANDLERS) {
    if (text.includes(keyword)) {
      handler(text, result, originalLevel)
      return result
    }
  }

  // 2. 检查特殊事件（严重后果）
  if (SPECIAL_EVENT_KEYWORDS.some(keyword => text.includes(keyword))) {
    const parts = text.split('，')
    result.reason = parts[0]?.trim() || text
    result.punishment = parts[1]?.trim() || '犯者减寿'
    result.category = PreceptCategory.KARMA
    result.tags = extractTags(result.reason)
    result.explanation = getSpecialEventExplanation(result.reason)
    result.suggestion = '此日有大凶险，应严格持戒，避免一切不当行为'
    return result
  }

  // 3. 尝试标准解析器
  for (const parser of TEXT_PARSERS) {
    const parsed = parser(text)
    if (parsed) {
      populateResult(result, parsed.reason, parsed.punishment)
      return result
    }
  }

  // 4. 尝试"宜戒"解析
  const yijieResult = parseYiJie(text)
  if (yijieResult) {
    populateResult(result, yijieResult.reason, yijieResult.punishment)
    return result
  }

  // 5. 尝试通用逗号分隔解析
  const commaResult = parseCommaSeparated(text)
  if (commaResult) {
    populateResult(result, commaResult.reason, commaResult.punishment)
    return result
  }

  // 6. 默认处理
  result.category = categorizeByReason(text)
  result.tags = extractTags(text)
  result.explanation = getExplanation(text)
  result.suggestion = getSuggestion(text, originalLevel)
  return result
}

// ============================================================================
// 描述生成
// ============================================================================

/**
 * 生成戒期描述
 */
export function generateDescription(detail: PreceptDetail, level: PreceptLevel): string {
  const parts: string[] = []

  if (detail.explanation) parts.push(`说明：${detail.explanation}`)
  if (detail.suggestion) parts.push(`建议：${detail.suggestion}`)
  if (detail.category) parts.push(`分类：${detail.category}`)

  return parts.length > 0 ? '\n' + parts.join('\n') : ''
}
