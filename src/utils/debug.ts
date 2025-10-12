import * as lunar from 'lunar-javascript'

// 调试工具
export const debug = {
  log: (message: string, data?: any) => {
    console.log(`[SK Calendar Debug] ${message}`, data)
  },

  error: (message: string, error?: any) => {
    console.error(`[SK Calendar Error] ${message}`, error)
  },

  testLunarImport: () => {
    try {
      debug.log('lunar-javascript 导入成功', lunar)
      const solar = lunar.Solar.fromDate(new Date())
      const lunarDate = solar.getLunar()
      debug.log('农历日期测试', {
        solar: solar.toYmd(),
        lunar: `${lunarDate.getMonthInChinese()}${lunarDate.getDayInChinese()}`
      })
      return true
    } catch (error) {
      debug.error('lunar-javascript 导入失败', error)
      return false
    }
  }
}