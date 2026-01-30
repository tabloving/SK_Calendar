import type { PreceptInfo, CalendarDayInfo } from '@/types'
import { PreceptCategory, PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'
import { SOLAR_TERM_CONFIG } from '@/data/precept/precept-config'
import { getSolarTermTags } from '../helpers/categorizer'
import { getSolarTermExplanation, getSolarTermSuggestion } from '../helpers/explanation'

/**
 * 节气戒期计算器
 */
export class SolarTermCalculator {
  // 节气缓存：key为年份，value为该年所有节气
  private solarTermsCache: Map<number, Array<{ name: string; date: Date }>> = new Map()

  /**
   * 获取指定年份的所有节气（带缓存）
   */
  getSolarTerms(year: number): Array<{ name: string; date: Date }> {
    if (this.solarTermsCache.has(year)) {
      return this.solarTermsCache.get(year)!
    }

    try {
      const terms: Array<{ name: string; date: Date }> = []

      for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate()

        for (let day = 1; day <= daysInMonth; day++) {
          try {
            const solar = lunarLib.Solar.fromYmd(year, month, day)
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

      const sortedTerms = terms.sort((a, b) => a.date.getTime() - b.date.getTime())
      this.solarTermsCache.set(year, sortedTerms)
      return sortedTerms
    } catch (error) {
      console.error('获取节气信息失败', error)
      return []
    }
  }

  /**
   * 获取指定日期的节气特殊戒期
   */
  getSolarTermPrecepts(date: Date, dayInfo: CalendarDayInfo): PreceptInfo[] {
    const solarTermPrecepts: PreceptInfo[] = []

    // 检查当日是否为节气日
    const currentSolarTerm = dayInfo.solarTerm
    if (currentSolarTerm) {
      const preceptInfo = this.createSolarTermPrecept(currentSolarTerm, date)
      if (preceptInfo) {
        solarTermPrecepts.push(preceptInfo)
      }
    }

    // 检查是否为节气日前后的戒期（前三后三共七日）
    const nearbySolarTerm = this.getNearbySolarTermPrecept(date)
    if (nearbySolarTerm) {
      solarTermPrecepts.push(nearbySolarTerm)
    }

    // 检查是否为四绝日（四立日的前一日）
    const siJueRi = this.getSiJueRiPrecept(date)
    if (siJueRi) {
      solarTermPrecepts.push(siJueRi)
    }

    // 检查是否为四离日（二分二至的前一日）
    const siLiRi = this.getSiLiRiPrecept(date)
    if (siLiRi) {
      solarTermPrecepts.push(siLiRi)
    }

    return solarTermPrecepts
  }

  /**
   * 创建节气日本身的戒期
   */
  private createSolarTermPrecept(solarTerm: string, date: Date): PreceptInfo | null {
    const config = SOLAR_TERM_CONFIG[solarTerm]
    if (!config) return null

    const detail = {
      reason: config.reason,
      punishment: config.punishment,
      explanation: getSolarTermExplanation(solarTerm),
      suggestion: getSolarTermSuggestion(solarTerm),
      category: PreceptCategory.SOLAR_TERM,
      tags: getSolarTermTags(solarTerm),
      source: '《寿康宝鉴》'
    }

    const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    return {
      date: dateStr,
      level: config.level,
      type: PreceptType.SPECIAL,
      detail: detail,
      reason: detail.reason,
      punishment: detail.punishment,
      description: `${config.reason} - ${config.punishment} - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
    }
  }

  /**
   * 获取节气日前后的戒期（前三后三共七日）
   */
  private getNearbySolarTermPrecept(date: Date): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    const erFenErZhiTerms = currentSolarTerms.filter(term =>
      ['春分', '秋分', '夏至', '冬至'].includes(term.name)
    )

    for (const term of erFenErZhiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff >= -3 && daysDiff <= 3 && daysDiff !== 0) {
        const direction = daysDiff < 0 ? '前' : '后'
        const daysAbs = Math.abs(daysDiff)

        let reason: string
        let punishment: string

        if (['春分', '秋分'].includes(term.name)) {
          reason = `${term.name}${direction}${daysAbs}日`
          punishment = '犯者必得危疾，尤宜切戒'
        } else {
          reason = `${term.name}${direction}${daysAbs}日`
          punishment = '犯者必得急疾，尤宜切戒'
        }

        const detail = {
          reason: reason,
          punishment: punishment,
          explanation: `此节气之前三后三共七日，${term.name}时节阴阳二气相交变化剧烈，犯戒易得疾病`,
          suggestion: '应在节气前后严格持戒，可诵经祈福，修身养性，避免阴阳失调',
          category: PreceptCategory.SOLAR_TERM,
          tags: [term.name, (term.name === "春分" || term.name === "秋分") ? "二分日" : "二至日", "前后戒期"],
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
          description: `${reason} - ${punishment} - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取四绝日戒期（四立日的前一日）
   */
  private getSiJueRiPrecept(date: Date): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    const siLiTerms = currentSolarTerms.filter(term =>
      ['立春', '立夏', '立秋', '立冬'].includes(term.name)
    )

    for (const term of siLiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff === -1) {
        const detail = {
          reason: '四绝日',
          punishment: '犯之减寿五年',
          explanation: `此日为${term.name}的前一日，属四绝日之一。四绝日是季节交替的关键时刻，天地阴阳二气交替，万物更新，犯戒会严重影响寿命`,
          suggestion: '四绝日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为',
          category: PreceptCategory.SOLAR_TERM,
          tags: [`四绝日`, `${term.name}`],
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
          description: `四绝日 - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取四离日戒期（二分二至的前一日）
   */
  private getSiLiRiPrecept(date: Date): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    const erFenErZhiTerms = currentSolarTerms.filter(term =>
      ['春分', '秋分', '夏至', '冬至'].includes(term.name)
    )

    for (const term of erFenErZhiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff === -1) {
        const detail = {
          reason: '四离日',
          punishment: '犯之减寿五年',
          explanation: `此日为${term.name}的前一日，属四离日之一。四离日是季节交替的关键时刻，天地阴阳二气分离，万物转换，犯戒会严重影响寿命`,
          suggestion: '四离日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为',
          category: PreceptCategory.SOLAR_TERM,
          tags: [`四离日`, `${term.name}`],
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
          description: `四离日 - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取冬至后第三戌日戒期
   */
  getDongZhiSanXuRiPrecept(date: Date): PreceptInfo | null {
    try {
      const year = date.getFullYear()

      const currentYearTerms = this.getSolarTerms(year)
      const prevYearTerms = this.getSolarTerms(year - 1)

      const currentDongZhi = currentYearTerms.find(term => term.name === '冬至')
      const prevDongZhi = prevYearTerms.find(term => term.name === '冬至')

      if (currentDongZhi) {
        const sanXuRi = this.calculateNthXuDay(currentDongZhi.date, 3)
        if (sanXuRi && this.isSameDay(date, sanXuRi)) {
          return this.createDongZhiSanXuRiPreceptInfo(date, currentDongZhi.date)
        }
      }

      if (prevDongZhi) {
        const sanXuRi = this.calculateNthXuDay(prevDongZhi.date, 3)
        if (sanXuRi && this.isSameDay(date, sanXuRi)) {
          return this.createDongZhiSanXuRiPreceptInfo(date, prevDongZhi.date)
        }
      }
    } catch (error) {
      console.error('获取冬至后第三戌日信息失败', error)
    }

    return null
  }

  /**
   * 获取冬至后庚辛日戒期
   */
  getDongZhiGengXinRiPrecept(date: Date): PreceptInfo | null {
    try {
      const year = date.getFullYear()

      const currentYearTerms = this.getSolarTerms(year)
      const prevYearTerms = this.getSolarTerms(year - 1)

      const currentDongZhi = currentYearTerms.find(term => term.name === '冬至')
      const currentLiChun = currentYearTerms.find(term => term.name === '立春')
      const prevDongZhi = prevYearTerms.find(term => term.name === '冬至')

      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const ganZhi = lunarDate.getDayInGanZhi()
      const gan = ganZhi.charAt(0)

      if (gan !== '庚' && gan !== '辛') {
        return null
      }

      if (prevDongZhi && currentLiChun) {
        if (date > prevDongZhi.date && date < currentLiChun.date) {
          return this.createDongZhiGengXinRiPreceptInfo(date, ganZhi)
        }
      }

      if (currentDongZhi && date > currentDongZhi.date) {
        const nextYearTerms = this.getSolarTerms(year + 1)
        const nextLiChun = nextYearTerms.find(term => term.name === '立春')
        if (nextLiChun && date < nextLiChun.date) {
          return this.createDongZhiGengXinRiPreceptInfo(date, ganZhi)
        }
      }
    } catch (error) {
      console.error('获取冬至后庚辛日信息失败', error)
    }

    return null
  }

  /**
   * 计算从指定日期开始的第N个戌日
   */
  private calculateNthXuDay(startDate: Date, n: number): Date | null {
    try {
      let count = 0
      let currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + 1)

      while (count < n) {
        const solar = lunarLib.Solar.fromDate(currentDate)
        const lunarDate = solar.getLunar()
        const ganZhi = lunarDate.getDayInGanZhi()
        const zhi = ganZhi.charAt(1)

        if (zhi === '戌') {
          count++
          if (count === n) {
            return currentDate
          }
        }

        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
      }
    } catch (error) {
      console.error('计算戌日失败', error)
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
   * 创建冬至后第三戌日戒期信息
   */
  private createDongZhiSanXuRiPreceptInfo(date: Date, dongZhiDate: Date): PreceptInfo {
    const solar = lunarLib.Solar.fromDate(date)
    const lunarDate = solar.getLunar()
    const ganZhi = lunarDate.getDayInGanZhi()

    const detail = {
      reason: '冬至后第三戌日',
      punishment: '犯者一年内亡',
      explanation: `此日为冬至后的第三个戌日（${ganZhi}）。《寿康宝鉴》记载：冬至后第三戌日犯之，主在一年内亡。此日为冬至后阴阳交替的关键时刻，犯戒后果极为严重`,
      suggestion: '此日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为，以保平安',
      category: PreceptCategory.SOLAR_TERM,
      tags: ['冬至', '戌日', '大凶日'],
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
      description: `冬至后第三戌日 - 犯者一年内亡 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
    }
  }

  /**
   * 创建冬至后庚辛日戒期信息
   */
  private createDongZhiGengXinRiPreceptInfo(date: Date, ganZhi: string): PreceptInfo {
    const gan = ganZhi.charAt(0)

    const detail = {
      reason: '冬至后庚辛日',
      punishment: '犯者一年内亡',
      explanation: `此日为冬至到立春之间的${gan}日（${ganZhi}）。《寿康宝鉴》记载：冬至后庚辛日犯之，主在一年内亡。冬至后阳气初生，庚辛属金，金气肃杀，此时犯戒后果极为严重`,
      suggestion: '此日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为，以保平安',
      category: PreceptCategory.SOLAR_TERM,
      tags: ['冬至', '庚辛日', '大凶日'],
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
      description: `冬至后庚辛日 - 犯者一年内亡 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
    }
  }
}
