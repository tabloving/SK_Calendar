declare module 'lunar-javascript' {
  /**
   * 三伏日类
   */
  export class Fu {
    getName(): string
    getIndex(): number
    toString(): string
    toFullString(): string
  }

  export class Lunar {
    constructor(date: Date)
    getYear(): number
    getMonth(): number
    getDay(): number
    getMonthInChinese(): string
    getDayInChinese(): string
    getYearInChinese(): string
    getDateInChinese(): string
    getFestivals(): string[]
    getJieQi(): any
    getJieQiList(): any[]
    getEightChar(): any
    getYearInGanZhi(): string
    getMonthInGanZhi(): string
    getDayInGanZhi(): string
    getYearGan(): string
    getYearZhi(): string
    getMonthGan(): string
    getMonthZhi(): string
    getDayGan(): string
    getDayZhi(): string
    isLeap(): boolean
    getLeapMonth(): number
    toString(): string
    toFullString(): string
    getFu(): Fu | null
  }

  export class LunarMonth {
    static fromYm(year: number, month: number): LunarMonth
    getDayCount(): number
    getYear(): number
    getMonth(): number
    isLeap(): boolean
    toString(): string
  }

  export class Solar {
    static fromDate(date: Date): Solar
    static fromYmd(year: number, month: number, day: number): Solar
    getLunar(): Lunar
    getYear(): number
    getMonth(): number
    getDay(): number
    getWeek(): number
    toYmd(): { year: number; month: number; day: number }
  }

  export function fromDate(date: Date): Lunar
  export function fromLunar(year: number, month: number, day: number, isLeap?: boolean): Lunar
}