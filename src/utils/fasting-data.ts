import type { FastingInfo, FastingLevel, FastingType } from '@/types'

/**
 * 戒期数据管理类
 */
export class FastingDataManager {
  private static instance: FastingDataManager
  private monthlyFastings: Map<string, FastingInfo[]> = new Map()
  private specialFastings: Map<string, FastingInfo[]> = new Map()
  private solarTermFastings: Map<string, FastingInfo[]> = new Map()

  private constructor() {
    this.initializeFastingData()
  }

  public static getInstance(): FastingDataManager {
    if (!FastingDataManager.instance) {
      FastingDataManager.instance = new FastingDataManager()
    }
    return FastingDataManager.instance
  }

  /**
   * 初始化戒期数据
   */
  private initializeFastingData(): void {
    this.initMonthlyFastings()
    this.initSpecialFastings()
    this.initSolarTermFastings()
  }

  /**
   * 初始化每月固定戒期
   */
  private initMonthlyFastings(): void {
    const monthlyData: { [key: string]: { reason: string; level: FastingLevel }[] } = {
      '01': [
        { reason: '月望日', level: 'major' as FastingLevel },
        { reason: '诸佛菩萨加持日', level: 'major' as FastingLevel }
      ],
      '02': [
        { reason: '天地和合日', level: 'moderate' as FastingLevel }
      ],
      '03': [
        { reason: '斗降日', level: 'moderate' as FastingLevel }
      ],
      '04': [
        { reason: '月德日', level: 'moderate' as FastingLevel }
      ],
      '05': [
        { reason: '会神日', level: 'moderate' as FastingLevel }
      ],
      '06': [
        { reason: '雷斋日', level: 'moderate' as FastingLevel }
      ],
      '07': [
        { reason: '人日', level: 'moderate' as FastingLevel }
      ],
      '08': [
        { reason: '药师佛圣诞日', level: 'moderate' as FastingLevel },
        { reason: '殿会日', level: 'moderate' as FastingLevel }
      ],
      '09': [
        { reason: '玉皇大帝圣诞日', level: 'major' as FastingLevel }
      ],
      '10': [
        { reason: '三元日', level: 'major' as FastingLevel }
      ],
      '11': [
        { reason: '天仓开日', level: 'moderate' as FastingLevel }
      ],
      '12': [
        { reason: '百福日', level: 'moderate' as FastingLevel }
      ],
      '13': [
        { reason: '杨公忌日', level: 'major' as FastingLevel }
      ],
      '14': [
        { reason: '四天王巡行日', level: 'moderate' as FastingLevel }
      ],
      '15': [
        { reason: '阿弥陀佛圣诞日', level: 'major' as FastingLevel },
        { reason: '月圆日', level: 'major' as FastingLevel },
        { reason: '三元日', level: 'major' as FastingLevel }
      ],
      '16': [
        { reason: '天地成日', level: 'moderate' as FastingLevel }
      ],
      '17': [
        { reason: '白鹤降日', level: 'moderate' as FastingLevel }
      ],
      '18': [
        { reason: '观世音菩萨圣诞日', level: 'moderate' as FastingLevel },
        { reason: '杨公忌日', level: 'major' as FastingLevel }
      ],
      '19': [
        { reason: '长斋日', level: 'moderate' as FastingLevel }
      ],
      '20': [
        { reason: '天地和合日', level: 'moderate' as FastingLevel }
      ],
      '21': [
        { reason: '天赦日', level: 'minor' as FastingLevel }
      ],
      '22': [
        { reason: '人斋日', level: 'moderate' as FastingLevel }
      ],
      '23': [
        { reason: '大势至菩萨圣诞日', level: 'moderate' as FastingLevel }
      ],
      '24': [
        { reason: '月黑日', level: 'moderate' as FastingLevel },
        { reason: '司命奏事日', level: 'moderate' as FastingLevel }
      ],
      '25': [
        { reason: '小龙王会日', level: 'moderate' as FastingLevel }
      ],
      '26': [
        { reason: '五方神降日', level: 'moderate' as FastingLevel }
      ],
      '27': [
        { reason: '北斗降日', level: 'moderate' as FastingLevel }
      ],
      '28': [
        { reason: '人神在阴日', level: 'moderate' as FastingLevel }
      ],
      '29': [
        { reason: '药师佛功德日', level: 'moderate' as FastingLevel },
        { reason: '四天王巡行日', level: 'moderate' as FastingLevel }
      ],
      '30': [
        { reason: '释迦牟尼佛成道日', level: 'major' as FastingLevel },
        { reason: '晦日', level: 'major' as FastingLevel },
        { reason: '月晦日', level: 'major' as FastingLevel }
      ]
    }

    // 转换为Map格式
    for (const [date, reasons] of Object.entries(monthlyData)) {
      const fastingInfos: FastingInfo[] = reasons.map(reason => ({
        date,
        reason: reason.reason,
        level: reason.level,
        type: 'regular' as FastingType,
        description: this.getFastingDescription(reason.reason, reason.level)
      }))
      this.monthlyFastings.set(date, fastingInfos)
    }
  }

  /**
   * 初始化特殊戒期（佛菩萨圣诞等）
   */
  private initSpecialFastings(): void {
    const specialData: { [key: string]: { reason: string; level: FastingLevel } } = {
      '01-01': { reason: '弥勒菩萨圣诞', level: 'major' as FastingLevel },
      '02-15': { reason: '释迦牟尼佛涅槃日', level: 'major' as FastingLevel },
      '02-19': { reason: '观世音菩萨圣诞', level: 'major' as FastingLevel },
      '02-21': { reason: '普贤菩萨圣诞', level: 'moderate' as FastingLevel },
      '04-04': { reason: '文殊菩萨圣诞', level: 'moderate' as FastingLevel },
      '04-08': { reason: '释迦牟尼佛圣诞', level: 'major' as FastingLevel },
      '06-03': { reason: '韦陀菩萨圣诞', level: 'moderate' as FastingLevel },
      '06-19': { reason: '观世音菩萨成道日', level: 'major' as FastingLevel },
      '07-13': { reason: '大势至菩萨圣诞', level: 'moderate' as FastingLevel },
      '07-30': { reason: '地藏王菩萨圣诞', level: 'major' as FastingLevel },
      '08-22': { reason: '燃灯古佛圣诞', level: 'moderate' as FastingLevel },
      '09-19': { reason: '观世音菩萨出家日', level: 'major' as FastingLevel },
      '09-30': { reason: '药师琉璃光如来圣诞', level: 'major' as FastingLevel },
      '11-04': { reason: '佛陀归来日', level: 'moderate' as FastingLevel },
      '11-17': { reason: '阿弥陀佛圣诞', level: 'major' as FastingLevel },
      '12-08': { reason: '释迦牟尼佛成道日', level: 'major' as FastingLevel },
      '12-29': { reason: '华严菩萨圣诞', level: 'moderate' as FastingLevel }
    }

    for (const [date, info] of Object.entries(specialData)) {
      const fastingInfo: FastingInfo = {
        date,
        reason: info.reason,
        level: info.level,
        type: 'special' as FastingType,
        description: this.getFastingDescription(info.reason, info.level)
      }
      this.specialFastings.set(date, [fastingInfo])
    }
  }

  /**
   * 初始化节气戒期
   */
  private initSolarTermFastings(): void {
    const solarTermData: { [key: string]: { reason: string; level: FastingLevel } } = {
      '立春': { reason: '岁首', level: 'major' as FastingLevel },
      '雨水': { reason: '天一生水', level: 'moderate' as FastingLevel },
      '惊蛰': { reason: '万物复苏', level: 'major' as FastingLevel },
      '春分': { reason: '阴阳平分', level: 'major' as FastingLevel },
      '清明': { reason: '扫墓祭祖', level: 'major' as FastingLevel },
      '谷雨': { reason: '雨生百谷', level: 'moderate' as FastingLevel },
      '立夏': { reason: '万物生长', level: 'moderate' as FastingLevel },
      '小满': { reason: '物致于此小得盈满', level: 'moderate' as FastingLevel },
      '芒种': { reason: '有芒之种谷可稼种', level: 'moderate' as FastingLevel },
      '夏至': { reason: '阳气最盛', level: 'major' as FastingLevel },
      '小暑': { reason: '暑气渐热', level: 'moderate' as FastingLevel },
      '大暑': { reason: '暑气最盛', level: 'moderate' as FastingLevel },
      '立秋': { reason: '秋始', level: 'moderate' as FastingLevel },
      '处暑': { reason: '暑气止', level: 'moderate' as FastingLevel },
      '白露': { reason: '露凝而白', level: 'moderate' as FastingLevel },
      '秋分': { reason: '昼夜平分', level: 'major' as FastingLevel },
      '寒露': { reason: '露气寒冷', level: 'moderate' as FastingLevel },
      '霜降': { reason: '霜始降', level: 'major' as FastingLevel },
      '立冬': { reason: '冬始', level: 'major' as FastingLevel },
      '小雪': { reason: '雪始小', level: 'moderate' as FastingLevel },
      '大雪': { reason: '雪始大', level: 'moderate' as FastingLevel },
      '冬至': { reason: '阴气最盛', level: 'major' as FastingLevel },
      '小寒': { reason: '寒气渐小', level: 'moderate' as FastingLevel },
      '大寒': { reason: '寒气最盛', level: 'moderate' as FastingLevel }
    }

    for (const [solarTerm, info] of Object.entries(solarTermData)) {
      const fastingInfo: FastingInfo = {
        date: solarTerm, // 节气名称作为日期标识
        reason: info.reason,
        level: info.level,
        type: 'solar_term' as FastingType,
        description: this.getFastingDescription(solarTerm, info.level)
      }
      this.solarTermFastings.set(solarTerm, [fastingInfo])
    }
  }

  /**
   * 获取戒期描述
   */
  private getFastingDescription(reason: string, level: FastingLevel): string {
    const levelText = {
      major: '大罪',
      moderate: '中罪',
      minor: '小罪',
      safe: '安全'
    }

    return `${reason} - ${levelText[level]}`
  }

  /**
   * 根据农历日期获取戒期信息
   */
  public getFastingByLunarDate(month: number, day: number): FastingInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.monthlyFastings.get(dateKey) || []
  }

  /**
   * 根据农历日期获取特殊戒期信息
   */
  public getSpecialFastingByLunarDate(month: number, day: number): FastingInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.specialFastings.get(dateKey) || []
  }

  /**
   * 根据节气名称获取戒期信息
   */
  public getFastingBySolarTerm(solarTerm: string): FastingInfo[] {
    return this.solarTermFastings.get(solarTerm) || []
  }

  /**
   * 获取十斋日
   */
  public getTenFastingDays(): number[] {
    return [1, 8, 14, 15, 18, 23, 24, 28, 29, 30]
  }

  /**
   * 检查是否为十斋日
   */
  public isTenFastingDay(day: number): boolean {
    return this.getTenFastingDays().includes(day)
  }
}