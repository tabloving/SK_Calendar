import type { PreceptInfo } from '@/types'
import { PreceptCategory, PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'

/**
 * 农历日期戒期计算器
 */
export class LunarDateCalculator {
  /**
   * 获取弦日戒期
   */
  getXianRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const lunarDay = lunarDate.getDay()

      const isShangXian = lunarDay === 7 || lunarDay === 8
      const isXiaXian = lunarDay === 22 || lunarDay === 23

      if (isShangXian || isXiaXian) {
        const xianType = isShangXian ? '上弦' : '下弦'
        const lunarMonthChinese = lunarDate.getMonthInChinese()
        const lunarDayChinese = lunarDate.getDayInChinese()
        const detail = {
          reason: '弦日',
          punishment: '犯之减寿一年',
          explanation: `此日为农历${lunarMonthChinese}月${lunarDayChinese}，是${xianType}日（上弦为初七、初八，下弦为廿二、廿三）。弦日是月亮盈亏变化的重要节点，阴阳不调、气机不平，宜静养少欲以养精气神，犯戒会损害寿命`,
          suggestion: '弦日应严格持戒，可诵经礼佛，静心养性，顺应天体运行变化',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['弦日', xianType],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MODERATE,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `弦日${xianType} - 犯之减寿一年 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
        }
      }
    } catch (error) {
      console.error('获取弦日信息失败', error)
    }

    return null
  }

  /**
   * 获取毁败日戒期（大月十八日，小月十七日）
   */
  getHuiBaiRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const lunarYear = lunarDate.getYear()
      const lunarMonth = lunarDate.getMonth()
      const lunarDay = lunarDate.getDay()

      const lunarMonthObj = lunarLib.LunarMonth.fromYm(lunarYear, lunarMonth)
      if (!lunarMonthObj) {
        console.error('获取农历月份对象失败', { lunarYear, lunarMonth })
        return null
      }
      const monthDays = lunarMonthObj.getDayCount()

      const isHuiBaiRi = (monthDays === 30 && lunarDay === 18) || (monthDays === 29 && lunarDay === 17)

      if (isHuiBaiRi) {
        const monthType = monthDays === 30 ? '大月' : '小月'
        const lunarMonthChinese = lunarDate.getMonthInChinese()
        const detail = {
          reason: '毁败日',
          punishment: '犯之得病',
          explanation: `此日为农历${lunarMonthChinese}月${monthType}的毁败日（${monthType === '大月' ? '十八日' : '十七日'}）。毁败日是天地气机不顺的日子，犯戒容易导致疾病`,
          suggestion: '毁败日应注意身体健康，持戒清净，可诵经祈福，避免不当行为',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['毁败日', monthType],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MINOR,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `毁败日 - 犯之得病 - 宜戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
        }
      }
    } catch (error) {
      console.error('获取毁败日信息失败', error)
    }

    return null
  }

  /**
   * 获取月晦日戒期（农历每月最后一天）
   */
  getYueHuiRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const lunarYear = lunarDate.getYear()
      const lunarMonth = lunarDate.getMonth()
      const lunarDay = lunarDate.getDay()

      const lunarMonthObj = lunarLib.LunarMonth.fromYm(lunarYear, lunarMonth)
      if (!lunarMonthObj) {
        console.error('获取农历月份对象失败', { lunarYear, lunarMonth })
        return null
      }
      const monthDays = lunarMonthObj.getDayCount()

      const isYueHuiRi = lunarDay === monthDays

      if (isYueHuiRi) {
        const monthType = monthDays === 30 ? '大月' : '小月'
        const lunarMonthChinese = lunarDate.getMonthInChinese()
        const lunarDayChinese = lunarDate.getDayInChinese()
        const detail = {
          reason: '月晦日',
          punishment: '犯者减寿',
          explanation: `此日为农历${lunarMonthChinese}月${lunarDayChinese}，是本月最后一天（${monthType}月晦）。月晦是天地阴阳转换的关键时刻，司命之神在此日向天庭奏报世人善恶`,
          suggestion: '月晦日应严格持戒，反省己过，可诵经忏悔，修身养性',
          category: PreceptCategory.ASTRONOMICAL,
          tags: [monthType, '司命奏事'],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MODERATE,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `月晦日 - 犯者减寿 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
        }
      }
    } catch (error) {
      console.error('获取月晦日信息失败', error)
    }

    return null
  }
}
