import { PreceptCategory } from '@/types'

/**
 * 分类规则配置
 * 按优先级排序，匹配到第一个即返回
 */
const CATEGORY_RULES: Array<{ keywords: string[]; category: PreceptCategory }> = [
  // 神明监察类
  { keywords: ['四天王'], category: PreceptCategory.DEITY_INSPECTION },
  { keywords: ['斗降', '北斗'], category: PreceptCategory.DEITY_INSPECTION },
  { keywords: ['仓开'], category: PreceptCategory.DEITY_INSPECTION },
  { keywords: ['人神'], category: PreceptCategory.DEITY_INSPECTION },
  { keywords: ['司命'], category: PreceptCategory.DEITY_INSPECTION },

  // 节日类
  { keywords: ['雷斋'], category: PreceptCategory.FESTIVAL },
  { keywords: ['三元', '三官'], category: PreceptCategory.FESTIVAL },
  { keywords: ['腊'], category: PreceptCategory.FESTIVAL },

  // 天文类
  { keywords: ['月望', '月朔', '月晦'], category: PreceptCategory.ASTRONOMICAL },
  { keywords: ['天地交泰'], category: PreceptCategory.ASTRONOMICAL },

  // 因果类
  { keywords: ['杨公忌'], category: PreceptCategory.KARMA },
  { keywords: ['九毒'], category: PreceptCategory.KARMA },
  { keywords: ['五虚'], category: PreceptCategory.KARMA },
  { keywords: ['六耗'], category: PreceptCategory.KARMA },
  { keywords: ['阴毒'], category: PreceptCategory.KARMA }
]

/**
 * 标签提取规则配置
 */
const TAG_RULES: Array<{ keywords: string[]; tags: string[] }> = [
  // 神明相关
  { keywords: ['四天王'], tags: ['斋日', '四天王'] },
  { keywords: ['玉帝', '玉皇'], tags: ['玉帝'] },
  { keywords: ['斗', '北斗'], tags: ['斗星'] },
  { keywords: ['雷'], tags: ['雷祖'] },

  // 事件类型
  { keywords: ['巡行'], tags: ['巡行'] },
  { keywords: ['诞'], tags: ['诞辰'] },
  { keywords: ['降'], tags: ['降世'] },
  { keywords: ['奏事'], tags: ['奏事'] },

  // 时间相关
  { keywords: ['月望'], tags: ['月望'] },
  { keywords: ['月朔'], tags: ['月朔'] },
  { keywords: ['月晦'], tags: ['月晦'] },

  // 特殊日期
  { keywords: ['杨公忌'], tags: ['杨公忌'] },
  { keywords: ['九毒'], tags: ['九毒日'] },
  { keywords: ['仓开日'], tags: ['天地仓开日'] },
  { keywords: ['雷斋'], tags: ['雷斋日'] }
]

/**
 * 节气分组配置
 */
const SOLAR_TERM_GROUPS: Record<string, { terms: string[]; suffix: string }> = {
  二分日: { terms: ['春分', '秋分'], suffix: '二分日' },
  二至日: { terms: ['夏至', '冬至'], suffix: '二至日' },
  四立日: { terms: ['立春', '立夏', '立秋', '立冬'], suffix: '四立日' }
}

/**
 * 检查文本是否包含任一关键词
 */
const matchesAny = (text: string, keywords: string[]): boolean =>
  keywords.some(keyword => text.includes(keyword))

/**
 * 根据原因内容分类
 */
export function categorizeByReason(reason: string): PreceptCategory {
  const matched = CATEGORY_RULES.find(rule => matchesAny(reason, rule.keywords))
  return matched?.category ?? PreceptCategory.CUSTOM
}

/**
 * 提取标签
 */
export function extractTags(text: string): string[] {
  const tags: string[] = []

  // 遍历规则，收集匹配的标签
  TAG_RULES.forEach(rule => {
    if (matchesAny(text, rule.keywords)) {
      tags.push(...rule.tags)
    }
  })

  // 特殊处理：三辛日（需要组合条件）
  if (text.includes('三辛') || (text.includes('辛') && text.includes('日'))) {
    tags.push('三辛日')
  }

  return tags
}

/**
 * 获取节气标签
 */
export function getSolarTermTags(solarTerm: string): string[] {
  for (const group of Object.values(SOLAR_TERM_GROUPS)) {
    if (group.terms.includes(solarTerm)) {
      return [solarTerm, group.suffix]
    }
  }
  return [solarTerm]
}
