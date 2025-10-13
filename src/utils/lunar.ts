import type { CalendarDayInfo, PreceptInfo } from '@/types'
import { debug } from './debug'
import * as lunar from 'lunar-javascript'

/**
 * 干支信息接口
 */
export interface GanZhiInfo {
  yearGanZhi: string    // 年干支
  monthGanZhi: string   // 月干支
  dayGanZhi: string     // 日干支
  timeGanZhi: string    // 时干支
  yearGan: string       // 年天干
  yearZhi: string       // 年地支
  monthGan: string      // 月天干
  monthZhi: string      // 月地支
  dayGan: string        // 日天干
  dayZhi: string        // 日地支
  timeGan: string       // 时天干
  timeZhi: string       // 时地支
}

/**
 * 农历日期工具类
 */
export class LunarCalendarUtil {
  /**
   * 将公历日期转换为农历信息
   */
  static getLunarInfo(solarDate: Date): CalendarDayInfo {
    try {
      const solar = lunar.Solar.fromDate(solarDate)
      const lunarDate = solar.getLunar()

      const today = new Date()
      const isToday = this.isSameDay(solarDate, today)

      const ganZhi = this.getGanZhiInfo(solarDate)

      return {
        date: solarDate,
        lunarDate: `${lunarDate.getMonthInChinese()}月${lunarDate.getDayInChinese()}`,
        year: solar.getYear(),
        month: solar.getMonth() + 1,
        day: solar.getDay(),
        weekday: solar.getWeek(),
        isToday,
        isCurrentMonth: true, // 这个值在使用时需要根据上下文确定
        preceptInfos: [],
        solarTerm: lunarDate.getJieQi() || undefined,
        ganZhi: ganZhi
      }
    } catch (error) {
      debug.error('获取农历信息失败', error)
      // 降级处理，返回基础信息
      const today = new Date()
      const isToday = this.isSameDay(solarDate, today)

      return {
        date: solarDate,
        lunarDate: `${solarDate.getMonth() + 1}月${solarDate.getDate()}日`,
        year: solarDate.getFullYear(),
        month: solarDate.getMonth() + 1,
        day: solarDate.getDate(),
        weekday: solarDate.getDay(),
        isToday,
        isCurrentMonth: true,
        preceptInfos: [],
        solarTerm: undefined,
        ganZhi: undefined
      }
    }
  }

  /**
   * 获取指定月份的所有日期信息
   */
  static getMonthDays(year: number, month: number): CalendarDayInfo[] {
    const days: CalendarDayInfo[] = []
    const daysInMonth = new Date(year, month, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      const dayInfo = this.getLunarInfo(date)
      dayInfo.isCurrentMonth = true
      days.push(dayInfo)
    }

    return days
  }

  /**
   * 获取月份第一天是星期几
   */
  static getFirstDayWeekday(year: number, month: number): number {
    return new Date(year, month - 1, 1).getDay()
  }

  /**
   * 检查两个日期是否是同一天
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  /**
   * 格式化农历日期为 MM-DD 格式
   */
  static formatLunarDate(lunar: any): string {
    try {
      const month = lunar.getMonth()
      const day = lunar.getDay()
      return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    } catch (error) {
      debug.error('格式化农历日期失败', error)
      return '01-01'
    }
  }

  /**
   * 获取节气信息
   */
  static getSolarTerms(year: number): Array<{ name: string; date: Date }> {
    try {
      const terms: Array<{ name: string; date: Date }> = []

      // 遍历全年每一天，检查是否有节气
      for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate()

        for (let day = 1; day <= daysInMonth; day++) {
          try {
            const solar = lunar.Solar.fromYmd(year, month, day)
            const lunarDate = solar.getLunar()
            const jieQi = lunarDate.getJieQi()

            if (jieQi) {
              terms.push({
                name: jieQi,
                date: new Date(year, month - 1, day)
              })
            }
          } catch (e) {
            // 忽略错误，继续处理下一天
          }
        }
      }

      return terms.sort((a, b) => a.date.getTime() - b.date.getTime())
    } catch (error) {
      debug.error('获取节气信息失败', error)
      return []
    }
  }

  /**
   * 检查指定日期是否为节气
   */
  static isSolarTerm(date: Date): string | null {
    try {
      const solar = lunar.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const jieQi = lunarDate.getJieQi()
      return jieQi ? jieQi.getName() : null
    } catch (error) {
      debug.error('检查节气失败', error)
      return null
    }
  }

  /**
   * 获取干支信息
   */
  static getGanZhiInfo(date: Date): GanZhiInfo | null {
    try {
      const solar = lunar.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const eightChar = lunarDate.getEightChar()

      return {
        yearGanZhi: lunarDate.getYearInGanZhi(),
        monthGanZhi: lunarDate.getMonthInGanZhi(),
        dayGanZhi: lunarDate.getDayInGanZhi(),
        timeGanZhi: eightChar.getTimeGanZhi(),
        yearGan: lunarDate.getYearGan(),
        yearZhi: lunarDate.getYearZhi(),
        monthGan: lunarDate.getMonthGan(),
        monthZhi: lunarDate.getMonthZhi(),
        dayGan: lunarDate.getDayGan(),
        dayZhi: lunarDate.getDayZhi(),
        timeGan: eightChar.getTimeGan(),
        timeZhi: eightChar.getTimeZhi()
      }
    } catch (error) {
      debug.error('获取干支信息失败', error)
      return null
    }
  }

  /**
   * 获取简化干支显示（仅显示日干支）
   */
  static getSimpleGanZhi(date: Date): string {
    const ganZhi = this.getGanZhiInfo(date)
    return ganZhi ? ganZhi.dayGanZhi : ''
  }

  /**
   * 获取完整干支显示格式
   */
  static getFullGanZhiDisplay(date: Date): string {
    const ganZhi = this.getGanZhiInfo(date)
    if (!ganZhi) return ''

    return `${ganZhi.yearGanZhi}年 ${ganZhi.monthGanZhi}月 ${ganZhi.dayGanZhi}日`
  }
}