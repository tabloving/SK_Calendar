import { PreceptCategory } from '@/types'

/**
 * 根据原因内容分类
 */
export function categorizeByReason(reason: string): PreceptCategory {
  if (reason.includes('四天王')) return PreceptCategory.DEITY_INSPECTION
  if (reason.includes('斗降') || reason.includes('北斗')) return PreceptCategory.DEITY_INSPECTION
  if (reason.includes('雷斋')) return PreceptCategory.FESTIVAL
  if (reason.includes('月望') || reason.includes('月朔') || reason.includes('月晦')) return PreceptCategory.ASTRONOMICAL
  if (reason.includes('三元') || reason.includes('三官')) return PreceptCategory.FESTIVAL
  if (reason.includes('腊')) return PreceptCategory.FESTIVAL
  if (reason.includes('仓开')) return PreceptCategory.DEITY_INSPECTION
  if (reason.includes('杨公忌')) return PreceptCategory.KARMA
  if (reason.includes('人神')) return PreceptCategory.DEITY_INSPECTION
  if (reason.includes('司命')) return PreceptCategory.DEITY_INSPECTION
  if (reason.includes('九毒')) return PreceptCategory.KARMA
  if (reason.includes('五虚')) return PreceptCategory.KARMA
  if (reason.includes('六耗')) return PreceptCategory.KARMA
  if (reason.includes('天地交泰')) return PreceptCategory.ASTRONOMICAL
  if (reason.includes('阴毒')) return PreceptCategory.KARMA
  return PreceptCategory.CUSTOM
}

/**
 * 提取标签
 */
export function extractTags(text: string): string[] {
  const tags: string[] = []

  // 神明相关标签
  if (text.includes('四天王')) tags.push('斋日', '四天王')
  if (text.includes('玉帝') || text.includes('玉皇')) tags.push('玉帝')
  if (text.includes('斗') || text.includes('北斗')) tags.push('斗星')
  if (text.includes('雷')) tags.push('雷祖')

  // 事件类型标签
  if (text.includes('巡行')) tags.push('巡行')
  if (text.includes('诞')) tags.push('诞辰')
  if (text.includes('降')) tags.push('降世')
  if (text.includes('奏事')) tags.push('奏事')

  // 时间标签
  if (text.includes('月望')) tags.push('月望')
  if (text.includes('月朔')) tags.push('月朔')
  if (text.includes('月晦')) tags.push('月晦')

  // 特殊标签
  if (text.includes('杨公忌')) tags.push('杨公忌')
  if (text.includes('九毒')) tags.push('九毒日')
  if (text.includes('仓开日')) tags.push('天地仓开日')
  if (text.includes('雷斋')) tags.push('雷斋日')
  if (text.includes('三辛') || (text.includes('辛') && text.includes('日'))) tags.push('三辛日')

  return tags
}

/**
 * 获取节气标签
 */
export function getSolarTermTags(solarTerm: string): string[] {
  if (solarTerm === '春分' || solarTerm === '秋分') {
    return [solarTerm, '二分日']
  }
  if (solarTerm === '夏至' || solarTerm === '冬至') {
    return [solarTerm, '二至日']
  }
  if (solarTerm === '立春' || solarTerm === '立夏' || solarTerm === '立秋' || solarTerm === '立冬') {
    return [solarTerm, '四立日']
  }
  return [solarTerm]
}
