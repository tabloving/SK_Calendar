import type { PreceptInfo, PreceptDetail, CalendarDayInfo } from '@/types'
import { PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'
import { getMonthlyPreceptData, type MonthlyPreceptReason } from '@/data/precept/monthly-precepts'
import { TEN_PRECEPT_DAYS } from '@/data/precept/precept-config'
import { parsePreceptDetail, generateDescription, determinePreceptLevel } from './helpers/parser'
import { SolarTermCalculator } from './calculators/solar-term'
import { GanZhiCalculator } from './calculators/gan-zhi'
import { LunarDateCalculator } from './calculators/lunar-date'
import { FestivalCalculator } from './calculators/festival'

/**
 * 戒期数据管理类
 */
export class PreceptDataManager {
  private static instance: PreceptDataManager
  private monthlyPrecepts: Map<string, PreceptInfo[]> = new Map()
  private specialPrecepts: Map<string, PreceptInfo[]> = new Map()

  // 计算器实例
  private solarTermCalculator: SolarTermCalculator
  private ganZhiCalculator: GanZhiCalculator
  private lunarDateCalculator: LunarDateCalculator
  private festivalCalculator: FestivalCalculator

  private constructor() {
    // 初始化计算器
    this.solarTermCalculator = new SolarTermCalculator()
    this.ganZhiCalculator = new GanZhiCalculator()
    this.lunarDateCalculator = new LunarDateCalculator()
    this.festivalCalculator = new FestivalCalculator(this.solarTermCalculator)

    this.initializePreceptData()
  }

  public static getInstance(): PreceptDataManager {
    if (!PreceptDataManager.instance) {
      PreceptDataManager.instance = new PreceptDataManager()
    }
    return PreceptDataManager.instance
  }

  /**
   * 初始化戒期数据
   */
  private initializePreceptData(): void {
    this.initMonthlyPrecepts()
  }

  /**
   * 初始化每月固定戒期
   */
  private initMonthlyPrecepts(): void {
    const monthlyData = getMonthlyPreceptData()

    for (const [month, days] of Object.entries(monthlyData)) {
      for (const [day, reasons] of Object.entries(days)) {
        this.addMonthPrecepts(
          parseInt(month),
          parseInt(day),
          reasons as MonthlyPreceptReason[]
        )
      }
    }
  }

  /**
   * 辅助方法：为指定月份和日期添加戒期
   */
  private addMonthPrecepts(month: number, day: number, reasons: MonthlyPreceptReason[]): void {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    const preceptInfos: PreceptInfo[] = reasons.map(precept => {
      const detail = parsePreceptDetail(precept.reason, precept.level)
      const finalLevel = precept.level || determinePreceptLevel(detail.punishment)
      return {
        date: dateKey,
        level: finalLevel,
        type: PreceptType.REGULAR,
        detail: detail,
        reason: detail.reason,
        punishment: detail.punishment,
        description: generateDescription(detail, finalLevel)
      }
    })
    this.monthlyPrecepts.set(dateKey, preceptInfos)
  }

  /**
   * 根据农历日期获取戒期信息
   */
  public getPreceptByLunarDate(month: number, day: number): PreceptInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.monthlyPrecepts.get(dateKey) || []
  }

  /**
   * 根据农历日期获取特殊戒期信息
   */
  public getSpecialPreceptByLunarDate(month: number, day: number): PreceptInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.specialPrecepts.get(dateKey) || []
  }

  /**
   * 获取指定日期的特殊戒期信息（包括节气等动态戒期）
   */
  public getSpecialPreceptsByDate(date: Date, dayInfo: CalendarDayInfo): PreceptInfo[] {
    const specialPrecepts: PreceptInfo[] = []

    // 1. 获取农历日期
    let lunarMonth = 1
    let lunarDay = 1
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      lunarMonth = lunarDate.getMonth()
      lunarDay = lunarDate.getDay()
    } catch (error) {
      console.warn('获取农历日期失败，使用默认值', error)
    }

    const preceptMonth = Math.abs(lunarMonth)

    // 2. 获取农历日期相关的固定特殊戒期
    const lunarSpecialPrecepts = this.getSpecialPreceptByLunarDate(preceptMonth, lunarDay)
    specialPrecepts.push(...lunarSpecialPrecepts)

    // 3. 获取节气特殊戒期（动态计算）
    const solarTermPrecepts = this.solarTermCalculator.getSolarTermPrecepts(date, dayInfo)
    specialPrecepts.push(...solarTermPrecepts)

    // 4. 获取三元日戒期
    const sanYuanRiPrecept = this.festivalCalculator.getSanYuanRiPrecept(preceptMonth, lunarDay, date)
    if (sanYuanRiPrecept) {
      specialPrecepts.push(sanYuanRiPrecept)
    }

    // 5. 获取甲子日戒期
    const jiaZiRiPrecept = this.ganZhiCalculator.getJiaZiRiPrecept(date)
    if (jiaZiRiPrecept) {
      specialPrecepts.push(jiaZiRiPrecept)
    }

    // 6. 获取庚申日戒期
    const gengShenRiPrecept = this.ganZhiCalculator.getGengShenRiPrecept(date)
    if (gengShenRiPrecept) {
      specialPrecepts.push(gengShenRiPrecept)
    }

    // 7. 获取丙丁日戒期
    const bingDingRiPrecept = this.ganZhiCalculator.getBingDingRiPrecept(date)
    if (bingDingRiPrecept) {
      specialPrecepts.push(bingDingRiPrecept)
    }

    // 8. 获取三辛日戒期
    const sanXinRiPrecept = this.ganZhiCalculator.getSanXinRiPrecept(date)
    if (sanXinRiPrecept) {
      specialPrecepts.push(sanXinRiPrecept)
    }

    // 9. 获取阳错日戒期
    const yangCuoRiPrecept = this.ganZhiCalculator.getYangCuoRiPrecept(preceptMonth, date)
    if (yangCuoRiPrecept) {
      specialPrecepts.push(yangCuoRiPrecept)
    }

    // 10. 获取阴错日戒期
    const yinCuoRiPrecept = this.ganZhiCalculator.getYinCuoRiPrecept(preceptMonth, date)
    if (yinCuoRiPrecept) {
      specialPrecepts.push(yinCuoRiPrecept)
    }

    // 11. 获取弦日戒期
    const xianRiPrecept = this.lunarDateCalculator.getXianRiPrecept(date)
    if (xianRiPrecept) {
      specialPrecepts.push(xianRiPrecept)
    }

    // 12. 获取三伏日戒期
    const sanFuRiPrecept = this.festivalCalculator.getSanFuRiPrecept(date)
    if (sanFuRiPrecept) {
      specialPrecepts.push(sanFuRiPrecept)
    }

    // 13. 获取冬至后第三戌日戒期
    const dongZhiSanXuRiPrecept = this.solarTermCalculator.getDongZhiSanXuRiPrecept(date)
    if (dongZhiSanXuRiPrecept) {
      specialPrecepts.push(dongZhiSanXuRiPrecept)
    }

    // 14. 获取冬至后庚辛日戒期
    const dongZhiGengXinRiPrecept = this.solarTermCalculator.getDongZhiGengXinRiPrecept(date)
    if (dongZhiGengXinRiPrecept) {
      specialPrecepts.push(dongZhiGengXinRiPrecept)
    }

    // 15. 获取毁败日戒期
    const huiBaiRiPrecept = this.lunarDateCalculator.getHuiBaiRiPrecept(date)
    if (huiBaiRiPrecept) {
      specialPrecepts.push(huiBaiRiPrecept)
    }

    // 16. 获取月晦日戒期
    const yueHuiRiPrecept = this.lunarDateCalculator.getYueHuiRiPrecept(date)
    if (yueHuiRiPrecept) {
      specialPrecepts.push(yueHuiRiPrecept)
    }

    // 17. 获取二社日戒期
    const sheRiPrecept = this.festivalCalculator.getSheRiPrecept(date)
    if (sheRiPrecept) {
      specialPrecepts.push(sheRiPrecept)
    }

    return specialPrecepts
  }

  /**
   * 获取十斋日
   */
  public getTenPreceptDays(): number[] {
    return TEN_PRECEPT_DAYS
  }

  /**
   * 检查是否为十斋日
   */
  public isTenPreceptDay(day: number): boolean {
    return TEN_PRECEPT_DAYS.includes(day)
  }

  /**
   * 测试戒期等级判断（用于开发调试）
   */
  public testPreceptLevel(punishment: string): PreceptLevel {
    return determinePreceptLevel(punishment)
  }
}
