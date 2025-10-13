<template>
  <div class="test-view p-6">
    <h1 class="text-2xl font-bold mb-4">寿康宝鉴戒期日历 - 测试页面</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 当前日期信息 -->
      <el-card>
        <template #header>
          <span>当前日期信息</span>
        </template>
        <div class="space-y-2">
          <div>公历：{{ currentDateInfo.solar }}</div>
          <div>农历：{{ currentDateInfo.lunar }}</div>
          <div v-if="currentDateInfo.ganZhi" class="text-purple-600 font-medium">
            干支：{{ currentDateInfo.ganZhi.yearGanZhi }}年 {{ currentDateInfo.ganZhi.monthGanZhi }}月 {{ currentDateInfo.ganZhi.dayGanZhi }}日
          </div>
          <div>星期：{{ currentDateInfo.weekday }}</div>
          <div v-if="currentDateInfo.solarTerm" class="text-purple-600 font-bold">节气：{{ currentDateInfo.solarTerm }}</div>
          <div v-else class="text-gray-500">无节气</div>
        </div>
      </el-card>

      <!-- 节气测试 -->
      <el-card>
        <template #header>
          <span>节气日期测试</span>
        </template>
        <div class="space-y-2">
          <div class="text-sm text-gray-600">测试一些已知的节气日期：</div>
          <div v-for="testDate in solarTermTestDates" :key="testDate.date" class="border rounded p-2">
            <div class="font-semibold">{{ testDate.date }}</div>
            <div v-if="testDate.solarTerm" class="text-purple-600">{{ testDate.solarTerm }}</div>
            <div v-else class="text-gray-500">无节气</div>
          </div>
        </div>
      </el-card>

      <!-- 戒期信息 -->
      <el-card>
        <template #header>
          <span>今日戒期</span>
        </template>
        <div v-if="todayFasting.length === 0" class="text-gray-500">
          今日无戒期
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="(fasting, index) in todayFasting"
            :key="index"
            class="p-2 border rounded"
            :class="getFastingClass(fasting.level)"
          >
            <div class="font-semibold">{{ fasting.reason }}</div>
            <div class="text-sm">{{ fasting.description }}</div>
            <div class="text-xs mt-1">等级：{{ getPreceptLevelText(fasting.level) }}</div>
          </div>
        </div>
      </el-card>

      <!-- 农历库测试 -->
      <el-card>
        <template #header>
          <span>农历库测试</span>
        </template>
        <div class="space-y-2">
          <div>lunar-javascript 状态：{{ lunarStatus }}</div>
          <el-button @click="testLunarLibrary">测试农历库</el-button>
          <div v-if="lunarTestResult" class="text-sm">
            <pre>{{ lunarTestResult }}</pre>
          </div>
        </div>
      </el-card>

      <!-- 二十四节气测试 -->
      <el-card class="md:col-span-2">
        <template #header>
          <span>二十四节气测试 - {{ currentTestYear }}年</span>
        </template>
        <div class="space-y-4">
          <el-button @click="testSolarTerms" type="primary">
            测试{{ currentTestYear }}年二十四节气
          </el-button>
          <el-button @click="currentTestYear++">测试下一年</el-button>
          <el-button @click="currentTestYear--" :disabled="currentTestYear <= 2024">测试上一年</el-button>

          <div v-if="solarTerms.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div
              v-for="(term, index) in solarTerms"
              :key="index"
              class="p-3 border rounded-lg text-center"
              :class="isTodayTerm(term.date) ? 'border-purple-500 bg-purple-50' : 'border-gray-200'"
            >
              <div class="font-semibold text-purple-700">{{ term.name }}</div>
              <div class="text-sm text-gray-600">{{ formatDate(term.date) }}</div>
              <div v-if="isTodayTerm(term.date)" class="text-xs text-purple-600 font-medium">今天</div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 快速操作 -->
      <el-card>
        <template #header>
          <span>快速操作</span>
        </template>
        <div class="space-y-3">
          <el-button type="primary" @click="$router.push('/')">
            返回主页
          </el-button>
          <el-button @click="$router.push('/settings')">
            前往设置
          </el-button>
          <el-button @click="refreshData">
            刷新数据
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CalendarUtil } from '@/utils/calendar'
import { LunarCalendarUtil } from '@/utils/lunar'
import { PreceptDataManager } from '@/utils/precept-data'
import * as lunar from 'lunar-javascript'

const currentDate = ref(new Date())
const currentTestYear = ref(new Date().getFullYear())
const solarTerms = ref<Array<{ name: string; date: Date }>>([])
const lunarStatus = ref('未测试')
const lunarTestResult = ref('')

// 测试用的节气日期
const solarTermTestDates = computed(() => {
  const testDates = [
    '2025-01-05', // 小寒
    '2025-01-20', // 大寒
    '2025-02-03', // 立春
    '2025-02-18', // 雨水
    '2025-03-05', // 惊蛰
    '2025-03-20', // 春分
    '2025-04-04', // 清明
    '2025-04-20', // 谷雨
    '2025-05-05', // 立夏
    '2025-05-21', // 小满
    '2025-06-05', // 芒种
    '2025-06-21', // 夏至
    '2025-07-07', // 小暑
    '2025-07-22', // 大暑
    '2025-08-07', // 立秋
    '2025-08-23', // 处暑
    '2025-09-07', // 白露
    '2025-09-23', // 秋分
    '2025-10-08', // 寒露
    '2025-10-23', // 霜降
    '2025-11-07', // 立冬
    '2025-11-22', // 小雪
    '2025-12-07', // 大雪
    '2025-12-21', // 冬至
  ]

  return testDates.map(dateStr => {
    const date = new Date(dateStr)
    const solar = lunar.Solar.fromDate(date)
    const lunarDate = solar.getLunar()
    const jieQi = lunarDate.getJieQi()

    return {
      date: dateStr,
      solarTerm: jieQi || null
    }
  })
})

const currentDateInfo = computed(() => {
  const date = currentDate.value
  const lunar = CalendarUtil.getLunarMonthDay(date)
  const ganZhi = LunarCalendarUtil.getGanZhiInfo(date)
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  return {
    solar: CalendarUtil.formatDate(date),
    lunar: lunar.full,
    weekday: weekdays[date.getDay()],
    solarTerm: CalendarUtil.isSolarTerm(date),
    ganZhi: ganZhi ? {
      yearGanZhi: ganZhi.yearGanZhi,
      monthGanZhi: ganZhi.monthGanZhi,
      dayGanZhi: ganZhi.dayGanZhi
    } : null
  }
})

const todayFasting = computed(() => {
  const dayInfo = {
    date: currentDate.value,
    lunarDate: '',
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
    day: currentDate.value.getDate(),
    weekday: currentDate.value.getDay(),
    isToday: true,
    isCurrentMonth: true,
    preceptInfos: []
  }

  return CalendarUtil.getDayPreceptInfos(dayInfo)
})

const getFastingClass = (level: string) => {
  const classMap = {
    major: 'bg-red-50 border-red-200',
    moderate: 'bg-orange-50 border-orange-200',
    minor: 'bg-yellow-50 border-yellow-200',
    safe: 'bg-green-50 border-green-200'
  }
  return classMap[level as keyof typeof classMap] || 'bg-gray-50 border-gray-200'
}

const getPreceptLevelText = (level: string) => {
  const levelMap = {
    major: '大罪',
    moderate: '中罪',
    minor: '小罪',
    safe: '安全'
  }
  return levelMap[level as keyof typeof levelMap] || '未知'
}

const testLunarLibrary = () => {
  try {
    const solar = lunar.Solar.fromDate(new Date())
    const lunarDate = solar.getLunar()
    const eightChar = lunarDate.getEightChar()

    lunarStatus.value = '正常'
    lunarTestResult.value = JSON.stringify({
      solar: solar.toYmd(),
      lunar: `${lunarDate.getMonthInChinese()}${lunarDate.getDayInChinese()}`,
      year: lunarDate.getYearInChinese(),
      month: lunarDate.getMonthInChinese(),
      day: lunarDate.getDayInChinese(),
      solarTerm: lunarDate.getJieQi()?.getName(),
      ganZhi: {
        yearGanZhi: lunarDate.getYearInGanZhi(),
        monthGanZhi: lunarDate.getMonthInGanZhi(),
        dayGanZhi: lunarDate.getDayInGanZhi(),
        timeGanZhi: eightChar.getTimeGanZhi()
      }
    }, null, 2)
  } catch (error) {
    lunarStatus.value = '错误'
    lunarTestResult.value = `错误信息：${error}`
  }
}

const testSolarTerms = () => {
  try {
    solarTerms.value = LunarCalendarUtil.getSolarTerms(currentTestYear.value)
    console.log(`${currentTestYear.value}年二十四节气：`, solarTerms.value)
  } catch (error) {
    console.error('获取节气信息失败：', error)
  }
}

const formatDate = (date: Date) => {
  return CalendarUtil.formatDate(date)
}

const isTodayTerm = (termDate: Date) => {
  return CalendarUtil.isToday(termDate)
}

const refreshData = () => {
  currentDate.value = new Date()
  lunarStatus.value = '未测试'
  lunarTestResult.value = ''
}

onMounted(() => {
  testLunarLibrary()
  testSolarTerms()

  // 测试特定日期的节气
  testSpecificDateSolarTerm()
})

const testSpecificDateSolarTerm = () => {
  // 测试霜降 2025-10-23
  const testDate = new Date('2025-10-23')
  const solar = lunar.Solar.fromDate(testDate)
  const lunarDate = solar.getLunar()
  const jieQi = lunarDate.getJieQi()

  console.log('=== 测试霜降 2025-10-23 ===')
  console.log('日期:', testDate.toISOString().split('T')[0])
  console.log('节气:', jieQi)
  console.log('农历:', `${lunarDate.getMonthInChinese()}月${lunarDate.getDayInChinese()}`)

  // 也测试使用我们的工具类
  const dayInfo = LunarCalendarUtil.getLunarInfo(testDate)
  console.log('使用LunarCalendarUtil:', dayInfo.solarTerm)

  // 测试日历工具
  const calendarDays = CalendarUtil.getMonthCalendar(2025, 10)
  const oct23 = calendarDays.find(day =>
    day.date.getDate() === 23 && day.date.getMonth() === 9 // 9 = 10月
  )
  console.log('日历中的2025-10-23:', oct23?.solarTerm)
}
</script>

<style scoped>
.test-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>