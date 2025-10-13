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
          <div v-if="currentDateInfo.solarTerm">节气：{{ currentDateInfo.solarTerm }}</div>
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
const lunarStatus = ref('未测试')
const lunarTestResult = ref('')

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

const refreshData = () => {
  currentDate.value = new Date()
  lunarStatus.value = '未测试'
  lunarTestResult.value = ''
}

onMounted(() => {
  testLunarLibrary()
})
</script>

<style scoped>
.test-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>