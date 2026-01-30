import type { PreceptInfo, CalendarDayInfo } from '@/types'
import { PreceptCategory, PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'
import { YANG_CUO_CONFIG, YIN_CUO_CONFIG, CHINESE_MONTHS } from '@/data/precept/precept-config'

/**
 * 干支戒期计算器
 */
export class GanZhiCalculator {
  /**
   * 获取甲子日戒期
   */
  getJiaZiRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()

      if (ganZhi === '甲子') {
        const detail = {
          reason: '甲子日',
          punishment: '犯之减寿一年',
          explanation: '甲子日是六十甲子的首日，天干地支循环之始，具有特殊的神圣意义。此日天地元气更新，犯戒会严重损害寿命',
          suggestion: '甲子日应严格持戒，可诵经礼佛，修身养性，顺应天地元气更新之机',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['甲子日', '六十甲子', '神圣日'],
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
          description: `甲子日 - 犯之减寿一年 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
        }
      }
    } catch (error) {
      console.error('获取甲子日信息失败', error)
    }

    return null
  }

  /**
   * 获取庚申日戒期
   */
  getGengShenRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()

      if (ganZhi === '庚申') {
        const detail = {
          reason: '庚申日',
          punishment: '犯之减寿一年',
          explanation: '庚申日是六十甲子中的重要日子，传说此日三尸神会上天庭奏报人间善恶。庚属金，申属猴，此日阴阳交替，犯戒会严重损害寿命',
          suggestion: '庚申日应严格持戒，可诵经礼佛，反省己过，避免三尸神奏报恶行',
          category: PreceptCategory.DEITY_INSPECTION,
          tags: ['庚申日', '三尸神', '神圣日'],
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
          description: `庚申日 - 犯之减寿一年 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：神明监察戒期`
        }
      }
    } catch (error) {
      console.error('获取庚申日信息失败', error)
    }

    return null
  }

  /**
   * 获取丙丁日戒期
   */
  getBingDingRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()
      const gan = ganZhi.charAt(0)

      if (gan === '丙' || gan === '丁') {
        const detail = {
          reason: '丙丁日',
          punishment: '犯之得病',
          explanation: `丙丁日是天干为丙或丁的日子，属火之日。火性炎上，易动心火，此日犯戒容易导致疾病缠身`,
          suggestion: '丙丁日应节制欲念，保持心平气和，可多食清淡食物，避免过度劳累，以防火邪侵扰',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['丙丁日', '火日', '天干日'],
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
          description: `丙丁日 - 犯之得病 - 小戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天干戒期`
        }
      }
    } catch (error) {
      console.error('获取丙丁日信息失败', error)
    }

    return null
  }

  /**
   * 获取三辛日戒期
   */
  getSanXinRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()
      const gan = ganZhi.charAt(0)

      if (gan === '辛') {
        const lunarMonthChinese = lunarDate.getMonthInChinese()
        const lunarDayChinese = lunarDate.getDayInChinese()
        const detail = {
          reason: '三辛日',
          punishment: '犯者减寿一年',
          explanation: `三辛日是每月天干为辛的日子（农历${lunarMonthChinese}月${lunarDayChinese}，${ganZhi}）。传统认为辛日为雷祖（九天应元雷声普化天尊）监观万天、亲察人间之日，宜斋戒祈福，犯戒会损害寿命`,
          suggestion: '三辛日应斋戒祈福，保持身心清净，可诵雷祖宝诰或行善积德，以求消灾延寿',
          category: PreceptCategory.DEITY_INSPECTION,
          tags: ['三辛日', '雷祖'],
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
          description: `三辛日 - 犯之减寿一年 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：神明监察戒期`
        }
      }
    } catch (error) {
      console.error('获取三辛日信息失败', error)
    }

    return null
  }

  /**
   * 获取阳错日戒期
   */
  getYangCuoRiPrecept(lunarMonth: number, date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()

      const expectedGanZhi = YANG_CUO_CONFIG[lunarMonth]

      if (ganZhi === expectedGanZhi) {
        const chineseMonth = CHINESE_MONTHS[lunarMonth] || lunarMonth.toString()

        const detail = {
          reason: '阳错日',
          punishment: '此阳不足之日，俱宜戒',
          explanation: `阳错日是农历${chineseMonth}月的特定干支日（${ganZhi}）。此日为阳气不足、阴阳失调之时，犯戒易损伤阳气，导致运势不顺`,
          suggestion: '阳错日应保持内心平静，避免冲动行事，可静心养神，积蓄阳气，以调和阴阳',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['阳错日', '阴阳不足', '天干地支'],
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
          description: `阳错日 - ${detail.punishment} - 小戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：阴阳戒期`
        }
      }
    } catch (error) {
      console.error('获取阳错日信息失败', error)
    }

    return null
  }

  /**
   * 获取阴错日戒期
   */
  getYinCuoRiPrecept(lunarMonth: number, date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()

      const expectedGanZhi = YIN_CUO_CONFIG[lunarMonth]

      if (ganZhi === expectedGanZhi) {
        const chineseMonth = CHINESE_MONTHS[lunarMonth] || lunarMonth.toString()

        const detail = {
          reason: '阴错日',
          punishment: '此阴不足之日，俱宜戒',
          explanation: `阴错日是农历${chineseMonth}月的特定干支日（${ganZhi}）。此日为阴气不足、阴阳失调之时，犯戒易损伤阴气，导致精神疲惫`,
          suggestion: '阴错日应保持内心安宁，避免过度消耗，可静心休养，滋阴养血，以调和阴阳',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['阴错日', '阴阳不足', '天干地支'],
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
          description: `阴错日 - ${detail.punishment} - 小戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：阴阳戒期`
        }
      }
    } catch (error) {
      console.error('获取阴错日信息失败', error)
    }

    return null
  }
}
