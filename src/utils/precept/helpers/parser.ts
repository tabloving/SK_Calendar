import type { PreceptDetail } from '@/types'
import { PreceptCategory, PreceptLevel } from '@/types'
import { categorizeByReason, extractTags } from './categorizer'
import { getExplanation, getSuggestion } from './explanation'

/**
 * 根据惩罚内容判断戒期等级
 */
export function determinePreceptLevel(punishment: string): PreceptLevel {
  // 大戒：死、亡、夺纪、夺禄
  if (punishment.includes('死') || punishment.includes('亡') ||
      punishment.includes('夺纪') || punishment.includes('夺禄') ||
      punishment.includes('暴亡') || punishment.includes('血死') ||
      punishment.includes('贫夭') || punishment.includes('夭亡') ||
      punishment.includes('绝嗣') || punishment.includes('水厄') ||
      punishment.includes('奇祸') || punishment.includes('大凶') ||
      punishment.includes('男女俱亡')) {
    return PreceptLevel.MAJOR
  }

  // 中戒：重疾、大病、损寿、减寿、生病
  if (punishment.includes('重疾') || punishment.includes('大病') ||
      punishment.includes('损寿') || punishment.includes('减寿') ||
      punishment.includes('生病') || punishment.includes('得病') ||
      punishment.includes('遭回禄') || punishment.includes('产恶胎') ||
      punishment.includes('失瘏夭胎') || punishment.includes('得危疾') ||
      punishment.includes('恶疾') || punishment.includes('带疾') ||
      punishment.includes('子带疾')) {
    return PreceptLevel.MODERATE
  }

  // 宜戒：明确指出宜戒的或较轻的惩罚
  if (punishment.includes('宜戒') || punishment.includes('大忌') ||
      punishment.includes('忌') || punishment.includes('斋') ||
      punishment.includes('得祸') || punishment.includes('削禄') ||
      punishment === '宜戒' || punishment.includes('宜斋戒')) {
    return PreceptLevel.MINOR
  }

  // 默认为小戒
  return PreceptLevel.MINOR
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

  // 处理包含"犯者"的文本 - 最优先处理
  if (text.includes('犯者')) {
    const match = text.match(/(.+)，犯者(.+)/)
    if (match) {
      result.reason = match[1].trim()
      result.punishment = `犯者${match[2].trim()}`
      const newLevel = determinePreceptLevel(result.punishment)
      result.category = categorizeByReason(result.reason)
      result.tags = extractTags(result.reason)
      result.explanation = getExplanation(result.reason)
      result.suggestion = getSuggestion(result.reason, newLevel)
      return result
    }
  }

  // 处理包含"削禄夺纪"的文本（可能没有"犯者"前缀）
  if (text.includes('削禄夺纪')) {
    const match = text.match(/(.+)，削禄夺纪/)
    if (match) {
      result.reason = match[1].trim()
      result.punishment = '犯者削禄夺纪'
      const newLevel = determinePreceptLevel(result.punishment)
      result.category = categorizeByReason(result.reason)
      result.tags = extractTags(result.reason)
      result.explanation = getExplanation(result.reason)
      result.suggestion = getSuggestion(result.reason, newLevel)
      return result
    }
  }

  // 处理包含"减寿"的文本（可能没有"犯者"前缀）
  if (text.includes('减寿')) {
    const match = text.match(/(.+)，(.+减寿)/)
    if (match) {
      result.reason = match[1].trim()
      result.punishment = match[2].trim().startsWith('犯者') ? match[2].trim() : `犯者${match[2].trim()}`
      const newLevel = determinePreceptLevel(result.punishment)
      result.category = categorizeByReason(result.reason)
      result.tags = extractTags(result.reason)
      result.explanation = getExplanation(result.reason)
      result.suggestion = getSuggestion(result.reason, newLevel)
      return result
    }
  }

  // 处理包含"损寿"的文本（可能没有"犯者"前缀）
  if (text.includes('损寿')) {
    const match = text.match(/(.+)，(.+损寿)/)
    if (match) {
      result.reason = match[1].trim()
      result.punishment = match[2].trim().startsWith('犯者') ? match[2].trim() : `犯者${match[2].trim()}`
      const newLevel = determinePreceptLevel(result.punishment)
      result.category = categorizeByReason(result.reason)
      result.tags = extractTags(result.reason)
      result.explanation = getExplanation(result.reason)
      result.suggestion = getSuggestion(result.reason, newLevel)
      return result
    }
  }

  // 处理包含"宜戒"的文本
  if (text.includes('宜戒')) {
    const match = text.match(/(.+)，宜戒/)
    if (match) {
      result.reason = match[1].trim()
      result.punishment = '宜戒'
    } else if (text === '宜戒') {
      result.reason = '宜戒之日'
      result.punishment = '宜戒'
    } else if (text.includes('宜斋戒')) {
      result.punishment = '宜戒'
    }
    const newLevel = determinePreceptLevel(result.punishment)
    result.category = categorizeByReason(result.reason)
    result.tags = extractTags(result.reason)
    result.explanation = getExplanation(result.reason)
    result.suggestion = getSuggestion(result.reason, newLevel)
    return result
  }

  // 处理月晦日特殊说明
  if (text.includes('月晦')) {
    result.reason = '月晦日'
    result.punishment = text.includes('犯者') ? text : '犯者减寿'
    result.category = PreceptCategory.ASTRONOMICAL
    result.tags = ['月晦', '司命奏事']
    result.explanation = '月晦是农历每月的最后一日，天地交泰、阴阳转换的关键时刻。司命之神在此日向天庭奏报世人善恶。如遇到小月（只有29天），则廿九日即为月晦日。'
    result.suggestion = '月晦日应严格持戒，反省己过，可诵经忏悔，修身养性'
    result.specialNote = '如月小即戒廿九日'
    return result
  }

  // 处理释迦如来成道日（必须在处理"诞"之前，因为成道日也包含"诞"字）
  if (text.includes('释迦如来成道日')) {
    result.punishment = '宜严格持戒'
    result.category = PreceptCategory.ANNIVERSARY
    result.tags = ['释迦如来', '成道日', '佛教圣日', '腊八']
    result.explanation = getExplanation(text)
    result.suggestion = getSuggestion(text, originalLevel)
    return result
  }

  // 处理其他特殊事件
  if (text.includes('暴亡') || text.includes('贫夭') || text.includes('血死') ||
      text.includes('水厄') || text.includes('绝嗣') || text.includes('夭亡')) {
    const parts = text.split('，')
    if (parts.length > 1) {
      result.reason = parts[0].trim()
      result.punishment = parts[1].trim()
    } else {
      result.punishment = text.includes('，') ? text.split('，')[1] : '犯者减寿'
    }
    result.category = PreceptCategory.KARMA
    result.tags = extractTags(result.reason)
    result.explanation = getSpecialEventExplanation(result.reason)
    result.suggestion = '此日有大凶险，应严格持戒，避免一切不当行为'
    return result
  }

  // 处理包含逗号的文本
  const commaMatch = text.match(/(.+)，(.+)/)
  if (commaMatch) {
    const firstPart = commaMatch[1].trim()
    const secondPart = commaMatch[2].trim()

    if (secondPart.includes('犯者') || secondPart.includes('宜') || secondPart.includes('忌') ||
        secondPart.includes('减寿') || secondPart.includes('损寿') || secondPart.includes('夺纪')) {
      result.reason = firstPart
      result.punishment = secondPart.startsWith('犯者') ? secondPart : `犯者${secondPart}`
    } else {
      result.reason = firstPart
      result.punishment = '宜戒'
    }

    const newLevel = determinePreceptLevel(result.punishment)
    result.category = categorizeByReason(result.reason)
    result.tags = extractTags(result.reason)
    result.explanation = getExplanation(result.reason)
    result.suggestion = getSuggestion(result.reason, newLevel)
    return result
  }

  // 默认情况
  result.category = categorizeByReason(text)
  result.tags = extractTags(text)
  result.explanation = getExplanation(text)
  result.suggestion = getSuggestion(text, originalLevel)
  return result
}

/**
 * 获取特殊事件解释
 */
function getSpecialEventExplanation(reason: string): string {
  if (reason.includes('天地交泰')) return '天地阴阳交泰之日，犯戒可能导致严重后果'
  if (reason.includes('九毒')) return '九毒日天地之气不正，犯戒易遭奇祸不测'
  return '此日特殊，应严格持戒，避免一切不当行为'
}

/**
 * 生成戒期描述
 */
export function generateDescription(detail: PreceptDetail, level: PreceptLevel): string {
  let description = ``

  if (detail.explanation) {
    description += `\n说明：${detail.explanation}`
  }

  if (detail.suggestion) {
    description += `\n建议：${detail.suggestion}`
  }

  if (detail.category) {
    description += `\n分类：${detail.category}`
  }

  return description
}
