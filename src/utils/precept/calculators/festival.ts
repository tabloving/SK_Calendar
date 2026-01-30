import type { PreceptInfo } from '@/types'
import { PreceptCategory, PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'
import { SolarTermCalculator } from './solar-term'

/**
 * 节日/特殊日戒期计算器
 */
export class FestivalCalculator {
  private solarTermCalculator: SolarTermCalculator

  constructor(solarTermCalculator: SolarTermCalculator) {
    this.solarTermCalculator = solarTermCalculator
  }

  /**
   * 获取三元日戒期
   */
  getSanYuanRiPrecept(lunarMonth: number, lunarDay: number, date: Date): PreceptInfo | null {
    if ((lunarMonth === 1 || lunarMonth === 7 || lunarMonth === 10) && lunarDay === 15) {
      const yuanNames: Record<number, string> = {
        1: '上元',
        7: '中元',
        10: '下元'
      }

      const yuanName = yuanNames[lunarMonth]
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const lunarMonthChinese = lunarDate.getMonthInChinese()
      const detail = {
        reason: '三元日',
        punishment: '犯之减寿五年',
        explanation: `${yuanName}（农历${lunarMonthChinese}月十五），三元日之一。三元日是天官、地官、水官巡行世间，校定善恶的重要日子，犯戒会严重损害寿命`,
        suggestion: '三元日应严格持戒，可礼拜三官大帝，诵经礼忏，广修善业，以求消灾祈福',
        category: PreceptCategory.FESTIVAL,
        tags: ['三元日', yuanName, '三官大帝', '巡行'],
        source: '《寿康宝鉴》'
      }

      const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

      return {
        date: dateStr,
        level: PreceptLevel.MAJOR,
        type: PreceptType.SPECIAL,
        detail: detail,
        reason: detail.reason,
        punishment: detail.punishment,
        description: `三元日${yuanName} - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节日戒期`
      }
    }

    return null
  }

  /**
   * 获取二社日戒期
   */
  getSheRiPrecept(date: Date): PreceptInfo | null {
    try {
      const year = date.getFullYear()
      const currentSolarTerms = this.solarTermCalculator.getSolarTerms(year)

      const liChun = currentSolarTerms.find(term => term.name === '立春')
      const liQiu = currentSolarTerms.find(term => term.name === '立秋')

      if (liChun) {
        const chunSheRi = this.calculateNthWuDay(liChun.date, 5)
        if (chunSheRi && this.isSameDay(date, chunSheRi)) {
          return this.createSheRiPreceptInfo(date, '春社日', liChun.date)
        }
      }

      if (liQiu) {
        const qiuSheRi = this.calculateNthWuDay(liQiu.date, 5)
        if (qiuSheRi && this.isSameDay(date, qiuSheRi)) {
          return this.createSheRiPreceptInfo(date, '秋社日', liQiu.date)
        }
      }
    } catch (error) {
      console.error('获取社日信息失败', error)
    }

    return null
  }

  /**
   * 获取三伏日戒期
   */
  getSanFuRiPrecept(date: Date): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()

      const fu = lunarDate.getFu()

      if (!fu) {
        return null
      }

      const fuName = fu.toString()
      const fuFullName = fu.toFullString()

      const detail = {
        reason: fuFullName,
        punishment: '犯之减寿一年',
        explanation: `${fuFullName}。三伏日是夏季最炎热的时段，分为初伏、中伏、末伏三个阶段。此时天地阳气最盛，人体气血外浮，精气易泄，犯戒会损害寿命`,
        suggestion: '三伏日应清心寡欲，避免过度劳累，可静心养神，饮食清淡，以养护精气',
        category: PreceptCategory.ASTRONOMICAL,
        tags: ['三伏日', fuName],
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
        description: `三伏日${fuName} - 犯之减寿一年 - 中戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
      }
    } catch (error) {
      console.error('获取三伏日信息失败', error)
    }

    return null
  }

  /**
   * 计算从指定日期开始的第N个戊日
   */
  private calculateNthWuDay(startDate: Date, n: number): Date | null {
    try {
      let count = 0
      let currentDate = new Date(startDate)

      while (count < n) {
        const solar = lunarLib.Solar.fromDate(currentDate)
        const lunarDate = solar.getLunar()
        const ganZhi = lunarDate.getDayInGanZhi()
        const gan = ganZhi.charAt(0)

        if (gan === '戊') {
          count++
          if (count === n) {
            return currentDate
          }
        }

        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      }
    } catch (error) {
      console.error('计算戊日失败', error)
    }

    return null
  }

  /**
   * 判断两个日期是否为同一天
   */
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  /**
   * 创建社日戒期信息
   */
  private createSheRiPreceptInfo(date: Date, sheType: string, liDate: Date): PreceptInfo {
    const liName = sheType === '春社日' ? '立春' : '立秋'
    const solar = lunarLib.Solar.fromDate(date)
    const lunarDate = solar.getLunar()

    const sheExplanation = sheType === '春社日'
      ? '是祭祀土地神、祈求一年风调雨顺、五谷丰登的重要日子'
      : '是答谢土地神滋养万物、庆贺丰收的吉祥日子'

    const detail = {
      reason: '二社日',
      punishment: '犯之减寿五年',
      explanation: `${sheType}是${liName}后的第五个戊日，${sheExplanation}，当清净身心，修善祈福，犯戒会严重损害寿命`,
      suggestion: '社日应严格持戒，可祭祀土地神，诵经礼佛，修身养性，避免一切不当行为',
      category: PreceptCategory.FESTIVAL,
      tags: ['二社日', sheType, '土地神'],
      source: '《寿康宝鉴》'
    }

    const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    return {
      date: dateStr,
      level: PreceptLevel.MAJOR,
      type: PreceptType.SPECIAL,
      detail: detail,
      reason: detail.reason,
      punishment: detail.punishment,
      description: `${sheType} - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节日戒期`
    }
  }
}
