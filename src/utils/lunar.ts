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
        ganZhi: ganZhi,
        lunarMonth: lunarDate.getMonth(),
        lunarDay: lunarDate.getDay()
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
        ganZhi: undefined,
        lunarMonth: undefined,
        lunarDay: undefined
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

  /**
   * 获取下一个节气
   */
  static getNextSolarTerm(date: Date): { name: string; date: Date; daysFromNow: number } | null {
    try {
      const year = date.getFullYear()
      const solarTerms = this.getSolarTerms(year)

      // 如果当前年份的节气已经过完，需要查看下一年的节气
      if (solarTerms.length === 0) return null

      // 找到当前日期之后的第一个节气
      for (const term of solarTerms) {
        if (term.date > date) {
          const daysFromNow = Math.ceil((term.date.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
          return {
            name: term.name,
            date: term.date,
            daysFromNow
          }
        }
      }

      // 如果当前年份没有找到，需要查找下一年的第一个节气
      const nextYearTerms = this.getSolarTerms(year + 1)
      if (nextYearTerms.length > 0) {
        const firstTerm = nextYearTerms[0]
        const daysFromNow = Math.ceil((firstTerm.date.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
        return {
          name: firstTerm.name,
          date: firstTerm.date,
          daysFromNow
        }
      }

      return null
    } catch (error) {
      debug.error('获取下一个节气失败', error)
      return null
    }
  }

  /**
   * 获取农历月份的天数
   * @param date 指定日期，获取该日期所在农历月份的天数
   * @returns 农历月份信息，包含天数和大小月信息
   */
  static getLunarMonthDays(date: Date): { days: number; isBigMonth: boolean; monthName: string; isLeap: boolean } | null {
    try {
      const solar = lunar.Solar.fromDate(date)
      const lunarDate = solar.getLunar()

      const lunarYear = lunarDate.getYear()
      const lunarMonth = lunarDate.getMonth()

      // 使用官方API LunarMonth.fromYm创建农历月份对象
      const lunarMonthObj = lunar.LunarMonth.fromYm(lunarYear, lunarMonth)
      const days = lunarMonthObj.getDayCount()
      const isLeap = lunarMonthObj.isLeap()

      if (days === 0) return null

      const isBigMonth = days === 30
      const monthName = lunarDate.getMonthInChinese()

      return {
        days,
        isBigMonth,
        monthName,
        isLeap
      }
    } catch (error) {
      debug.error('获取农历月份天数失败', error)
      // 回退到手动计算
      return this.getLunarMonthDaysFallback(date)
    }
  }

  /**
   * 手动计算农历月份天数（回退方案）
   */
  private static getLunarMonthDaysFallback(date: Date): { days: number; isBigMonth: boolean; monthName: string; isLeap: boolean } | null {
    try {
      const solar = lunar.Solar.fromDate(date)
      const lunarDate = solar.getLunar()

      const lunarYear = lunarDate.getYear()
      const lunarMonth = lunarDate.getMonth()
      const isLeap = lunarDate.isLeap()

      let dayCount = 0
      for (let day = 1; day <= 31; day++) {
        try {
          const testLunar = lunar.fromLunar(lunarYear, lunarMonth, day, isLeap)
          // 直接验证lunar对象是否创建成功
          dayCount++
        } catch (e) {
          // 转换失败说明该农历月没有这一天
          break
        }
      }

      if (dayCount === 0) return null

      const isBigMonth = dayCount === 30
      const monthName = lunarDate.getMonthInChinese()

      return {
        days: dayCount,
        isBigMonth,
        monthName,
        isLeap
      }
    } catch (error) {
      debug.error('手动计算农历月份天数失败', error)
      return null
    }
  }

  /**
   * 获取指定农历月份的天数
   * @param year 农历年
   * @param month 农历月（1-12）
   * @param isLeap 是否闰月
   * @returns 农历月份信息
   */
  static getLunarMonthDaysByParams(year: number, month: number, isLeap: boolean = false): { days: number; isBigMonth: boolean; monthName: string; isLeap: boolean } | null {
    try {
      // 使用官方API LunarMonth.fromYm创建农历月份对象
      const lunarMonthObj = lunar.LunarMonth.fromYm(year, month)
      const days = lunarMonthObj.getDayCount()
      const actualIsLeap = lunarMonthObj.isLeap()

      if (days === 0) return null

      const isBigMonth = days === 30

      // 获取月份名称
      const testLunar = lunar.fromLunar(year, month, 1, isLeap)
      const monthName = testLunar.getMonthInChinese()

      return {
        days,
        isBigMonth,
        monthName,
        isLeap: actualIsLeap
      }
    } catch (error) {
      debug.error('获取指定农历月份天数失败', error)
      return null
    }
  }
}