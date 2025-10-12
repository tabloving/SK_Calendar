import { LunarCalendarUtil } from './lunar'
import { FastingDataManager } from './fasting-data'
import * as lunarLib from 'lunar-javascript'
import type { CalendarDayInfo, FastingInfo } from '@/types'
import { FastingLevel, FastingType } from '@/types'

/**
 * 日历工具类
 */
export class CalendarUtil {
  private static fastingManager = FastingDataManager.getInstance()

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
      const fastingInfos = this.getDayFastingInfos(day)
      return {
        ...day,
        fastingInfos
      }
    })
  }

  /**
   * 获取指定日期的戒期信息
   */
  static getDayFastingInfos(dayInfo: CalendarDayInfo): FastingInfo[] {
    const allFastingInfos: FastingInfo[] = []

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
    const monthlyFastings = this.fastingManager.getFastingByLunarDate(lunarMonth, lunarDay)
    allFastingInfos.push(...monthlyFastings)

    // 2. 获取特殊戒期（佛菩萨圣诞等）
    const specialFastings = this.fastingManager.getSpecialFastingByLunarDate(lunarMonth, lunarDay)
    allFastingInfos.push(...specialFastings)

    // 3. 获取节气戒期
    if (dayInfo.solarTerm) {
      const solarTermFastings = this.fastingManager.getFastingBySolarTerm(dayInfo.solarTerm)
      allFastingInfos.push(...solarTermFastings)
    }

    // 4. 检查十斋日
    if (this.fastingManager.isTenFastingDay(lunarDay)) {
      allFastingInfos.push({
        date: `${lunarMonth.toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`,
        reason: '十斋日',
        level: FastingLevel.MODERATE,
        type: FastingType.FASTING_DAY,
        description: '十斋日 - 中罪'
      })
    }

    return allFastingInfos
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
        grid.push({
          ...day,
          isCurrentMonth: false,
          fastingInfos: this.getDayFastingInfos(day)
        })
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
        grid.push({
          ...nextMonthDays[i],
          isCurrentMonth: false,
          fastingInfos: this.getDayFastingInfos(nextMonthDays[i])
        })
      }
    }

    return grid
  }

  /**
   * 获取最高戒期等级
   */
  static getHighestFastingLevel(fastingInfos: FastingInfo[]): 'major' | 'moderate' | 'minor' | 'safe' {
    if (fastingInfos.length === 0) return 'safe'

    const levels = fastingInfos.map(info => info.level)
    if (levels.includes(FastingLevel.MAJOR)) return FastingLevel.MAJOR
    if (levels.includes(FastingLevel.MODERATE)) return FastingLevel.MODERATE
    if (levels.includes(FastingLevel.MINOR)) return FastingLevel.MINOR
    return FastingLevel.SAFE
  }

  /**
   * 获取戒期等级的CSS类名
   */
  static getFastingLevelClass(level: 'major' | 'moderate' | 'minor' | 'safe'): string {
    const classMap = {
      major: 'fasting-major',
      moderate: 'fasting-moderate',
      minor: 'fasting-minor',
      safe: 'fasting-safe'
    }
    return classMap[level] || 'fasting-safe'
  }

  /**
   * 获取戒期等级的显示文本
   */
  static getFastingLevelText(level: 'major' | 'moderate' | 'minor' | 'safe'): string {
    const textMap = {
      major: '大罪',
      moderate: '中罪',
      minor: '小罪',
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
}