import { LunarCalendarUtil } from './lunar'
import { PreceptDataManager } from './precept-data'
import * as lunarLib from 'lunar-javascript'
import type { CalendarDayInfo, PreceptInfo } from '@/types'
import { PreceptLevel, PreceptType } from '@/types'

/**
 * 日历工具类
 */
export class CalendarUtil {
  private static preceptManager = PreceptDataManager.getInstance()

  /**
   * 检查指定日期是否为节气
   */
  static isSolarTerm(date: Date): string | null {
    return LunarCalendarUtil.isSolarTerm(date)
  }

  /**
   * 获取完整的月份日历信息（包含戒期）
   */
  static getMonthCalendar(year: number, month: number): CalendarDayInfo[] {
    const days = LunarCalendarUtil.getMonthDays(year, month)

    // 为每一天添加戒期信息
    return days.map(day => {
      const preceptInfos = this.getDayPreceptInfos(day)
      return {
        ...day,
        preceptInfos
      }
    })
  }

  /**
   * 获取指定日期的戒期信息
   */
  static getDayPreceptInfos(dayInfo: CalendarDayInfo): PreceptInfo[] {
    const allPreceptInfos: PreceptInfo[] = []

    // 获取农历日期
    let lunarMonth = 1
    let lunarDay = 1
    try {
      const solar = lunarLib.Solar.fromDate(dayInfo.date)
      const lunarDate = solar.getLunar()
      lunarMonth = lunarDate.getMonth()
      lunarDay = lunarDate.getDay()
    } catch (error) {
      console.warn('获取农历日期失败，使用默认值', error)
    }

    // 1. 获取每月固定戒期
    const monthlyFastings = this.preceptManager.getPreceptByLunarDate(lunarMonth, lunarDay)
    allPreceptInfos.push(...monthlyFastings)

    // 2. 获取特殊戒期（佛菩萨圣诞等）
    const specialFastings = this.preceptManager.getSpecialPreceptByLunarDate(lunarMonth, lunarDay)
    allPreceptInfos.push(...specialFastings)

  
    // 3. 检查十斋日
    if (this.preceptManager.isTenPreceptDay(lunarDay)) {
      const tenPreceptDetail = {
        reason: '十斋日',
        punishment: '犯者减寿',
        explanation: '十斋日是佛教传统的重要斋戒日，持戒清净可得大功德',
        suggestion: '十斋日应严格持戒，可诵经礼佛，修身养性，广修善业',
        category: '佛教斋日',
        tags: ['斋日', '佛教', '持戒'],
        source: '《寿康宝鉴》'
      }

      allPreceptInfos.push({
        date: `${lunarMonth.toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`,
        level: PreceptLevel.MODERATE,
        type: PreceptType.PRECEPT_DAY,
        detail: tenPreceptDetail,
        reason: tenPreceptDetail.reason,        // 向后兼容
        punishment: tenPreceptDetail.punishment, // 向后兼容
        description: '十斋日 - 犯者减寿 - 中戒\n说明：十斋日是佛教传统的重要斋戒日，持戒清净可得大功德\n建议：十斋日应严格持戒，可诵经礼佛，修身养性，广修善业\n分类：佛教斋日'
      })
    }

    return allPreceptInfos
  }

  /**
   * 获取月份的完整日历网格（包括前后月份的日期）
   */
  static getMonthGrid(year: number, month: number): CalendarDayInfo[] {
    const currentMonthDays = this.getMonthCalendar(year, month)
    const firstDayWeekday = LunarCalendarUtil.getFirstDayWeekday(year, month)

    const grid: CalendarDayInfo[] = []

    // 添加上个月的日期
    if (firstDayWeekday > 0) {
      const prevMonth = month === 1 ? 12 : month - 1
      const prevYear = month === 1 ? year - 1 : year
      const prevMonthDays = LunarCalendarUtil.getMonthDays(prevYear, prevMonth)
      const prevMonthLastDays = prevMonthDays.slice(-firstDayWeekday)

      for (const day of prevMonthLastDays) {
        // 重新获取完整的日期信息，确保包含节气数据
        const fullDayInfo = LunarCalendarUtil.getLunarInfo(day.date)
        fullDayInfo.isCurrentMonth = false
        fullDayInfo.preceptInfos = this.getDayPreceptInfos(fullDayInfo)
        grid.push(fullDayInfo)
      }
    }

    // 添加当前月的日期
    grid.push(...currentMonthDays)

    // 添加下个月的日期以填满网格
    const totalCells = 42 // 6周 × 7天
    const remainingCells = totalCells - grid.length
    if (remainingCells > 0) {
      const nextMonth = month === 12 ? 1 : month + 1
      const nextYear = month === 12 ? year + 1 : year
      const nextMonthDays = LunarCalendarUtil.getMonthDays(nextYear, nextMonth)

      for (let i = 0; i < remainingCells && i < nextMonthDays.length; i++) {
        // 重新获取完整的日期信息，确保包含节气数据
        const fullDayInfo = LunarCalendarUtil.getLunarInfo(nextMonthDays[i].date)
        fullDayInfo.isCurrentMonth = false
        fullDayInfo.preceptInfos = this.getDayPreceptInfos(fullDayInfo)
        grid.push(fullDayInfo)
      }
    }

    return grid
  }

  /**
   * 获取最高戒期等级
   */
  static getHighestPreceptLevel(preceptInfos: PreceptInfo[]): 'major' | 'moderate' | 'minor' | 'safe' {
    if (preceptInfos.length === 0) return 'safe'

    const levels = preceptInfos.map(info => info.level)
    if (levels.includes(PreceptLevel.MAJOR)) return PreceptLevel.MAJOR
    if (levels.includes(PreceptLevel.MODERATE)) return PreceptLevel.MODERATE
    if (levels.includes(PreceptLevel.MINOR)) return PreceptLevel.MINOR
    return PreceptLevel.SAFE
  }

  /**
   * 获取戒期等级的CSS类名
   */
  static getPreceptLevelClass(level: 'major' | 'moderate' | 'minor' | 'safe'): string {
    const classMap = {
      major: 'precept-major',
      moderate: 'precept-moderate',
      minor: 'precept-minor',
      safe: 'precept-safe'
    }
    return classMap[level] || 'fasting-safe'
  }

  /**
   * 获取戒期等级的显示文本
   */
  static getPreceptLevelText(level: 'major' | 'moderate' | 'minor' | 'safe'): string {
    const textMap = {
      major: '大戒',
      moderate: '中戒',
      minor: '宜戒',
      safe: '安全'
    }
    return textMap[level] || '安全'
  }

  /**
   * 检查日期是否为今天
   */
  static isToday(date: Date): boolean {
    const today = new Date()
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate()
  }

  /**
   * 格式化日期显示
   */
  static formatDate(date: Date, format: 'YYYY-MM-DD' | 'MM-DD' = 'YYYY-MM-DD'): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    if (format === 'MM-DD') {
      return `${month}-${day}`
    }

    return `${year}-${month}-${day}`
  }

  /**
   * 获取农历月份和日期
   */
  static getLunarMonthDay(date: Date): { month: string; day: string; full: string } {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()

      const month = lunarDate.getMonthInChinese()
      const day = lunarDate.getDayInChinese()

      // 智能显示逻辑：初一显示完整格式，其他只显示日期
      const displayFull = day === '初一' ? `${month}月${day}` : day

      return {
        month,
        day,
        full: displayFull
      }
    } catch (error) {
      console.warn('获取农历月份日期失败，使用公历日期', error)
      const month = `${date.getMonth() + 1}月`
      const day = `${date.getDate()}日`

      return {
        month,
        day,
        full: `${month}${day}`
      }
    }
  }

  /**
   * 获取完整的农历月份和日期（总是显示完整格式）
   */
  static getFullLunarMonthDay(date: Date): { month: string; day: string; full: string } {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()

      const month = lunarDate.getMonthInChinese()
      const day = lunarDate.getDayInChinese()

      return {
        month,
        day,
        full: `${month}月${day}`
      }
    } catch (error) {
      console.warn('获取农历月份日期失败，使用公历日期', error)
      const month = `${date.getMonth() + 1}月`
      const day = `${date.getDate()}日`

      return {
        month,
        day,
        full: `${month}${day}`
      }
    }
  }

  /**
   * 获取下一个节气
   */
  static getNextSolarTerm(date: Date): { name: string; date: Date; daysFromNow: number } | null {
    return LunarCalendarUtil.getNextSolarTerm(date)
  }
}