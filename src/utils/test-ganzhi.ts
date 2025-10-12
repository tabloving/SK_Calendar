import { LunarCalendarUtil } from './lunar'

// 测试干支功能
export function testGanZhi() {
  console.log('=== 测试干支功能 ===')

  const testDate = new Date()
  console.log('测试日期:', testDate.toLocaleDateString())

  try {
    const ganZhi = LunarCalendarUtil.getGanZhiInfo(testDate)
    console.log('干支信息:', ganZhi)

    if (ganZhi) {
      console.log('年干支:', ganZhi.yearGanZhi)
      console.log('月干支:', ganZhi.monthGanZhi)
      console.log('日干支:', ganZhi.dayGanZhi)
      console.log('✅ 干支功能正常')
    } else {
      console.log('❌ 干支信息为空')
    }
  } catch (error) {
    console.error('❌ 干支功能测试失败:', error)
  }

  // 测试完整的月度数据
  console.log('\n=== 测试月度数据 ===')
  try {
    const year = testDate.getFullYear()
    const month = testDate.getMonth() + 1
    const monthDays = LunarCalendarUtil.getMonthDays(year, month)

    console.log(`测试 ${year}年${month}月 数据`)
    console.log('第一天数据:', monthDays[0])
    console.log('第一天干支:', monthDays[0].ganZhi)

    const hasGanZhi = monthDays.some(day => day.ganZhi)
    console.log('月度数据包含干支:', hasGanZhi)

    if (hasGanZhi) {
      console.log('✅ 月度数据包含干支信息')
    } else {
      console.log('❌ 月度数据不包含干支信息')
    }
  } catch (error) {
    console.error('❌ 月度数据测试失败:', error)
  }
}

// 在浏览器控制台中运行此函数
// testGanZhi()