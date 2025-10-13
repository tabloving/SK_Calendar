<template>
  <div class="solar-term-test p-6">
    <h1 class="text-2xl font-bold mb-6">二十四节气显示测试</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 当前月份测试 -->
      <el-card>
        <template #header>
          <span>当前月份日历测试 - {{ currentYear }}年{{ currentMonth }}月</span>
        </template>
        <div class="space-y-4">
          <div class="text-sm text-gray-600">
            下面显示当前月份的日历，节气应该用紫色背景显示：
          </div>

          <!-- 迷你日历 -->
          <div class="mini-calendar">
            <div class="grid grid-cols-7 gap-1 text-center text-xs">
              <!-- 星期标题 -->
              <div v-for="day in ['日','一','二','三','四','五','六']" :key="day"
                   class="font-bold p-1 bg-gray-100">
                {{ day }}
              </div>
              <!-- 日期格子 -->
              <div v-for="dayInfo in currentMonthDays" :key="dayInfo.date.getTime()"
                   class="mini-day p-1 border rounded"
                   :class="{
                     'current-month': dayInfo.isCurrentMonth,
                     'has-solar-term': dayInfo.solarTerm,
                     'today': dayInfo.isToday
                   }">
                <div class="font-semibold">{{ dayInfo.day }}</div>
                <div v-if="dayInfo.solarTerm" class="text-purple-600 font-bold">
                  🌿{{ dayInfo.solarTerm }}
                </div>
                <div v-else class="text-gray-400 text-xs">
                  {{ getLunarDay(dayInfo.date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 节气详情 -->
      <el-card>
        <template #header>
          <span>{{ currentYear }}年{{ currentMonth }}月节气详情</span>
        </template>
        <div class="space-y-2">
          <div v-if="currentMonthSolarTerms.length === 0" class="text-gray-500">
            本月无节气
          </div>
          <div v-else>
            <div v-for="term in currentMonthSolarTerms" :key="term.date"
                 class="p-3 border rounded-lg bg-purple-50 border-purple-200">
              <div class="flex items-center justify-between">
                <span class="font-bold text-purple-700">{{ term.icon }} {{ term.name }}</span>
                <span class="text-sm text-gray-600">{{ term.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 测试控制 -->
      <el-card class="lg:col-span-2">
        <template #header>
          <span>测试控制</span>
        </template>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <el-button @click="goToPreviousMonth" :icon="ArrowLeft">上个月</el-button>
            <span class="font-semibold">{{ currentYear }}年{{ currentMonth }}月</span>
            <el-button @click="goToNextMonth" :icon="ArrowRight">下个月</el-button>
            <el-button type="primary" @click="goToToday">今天</el-button>
          </div>

          <div class="text-sm text-gray-600">
            <p>• 节气应该在日历格子里用紫色背景和叶子图标显示</p>
            <p>• 如果节气没有显示，请检查浏览器控制台的调试信息</p>
            <p>• 节气会自动在日历中显示，可以手动浏览查看</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CalendarUtil } from '@/utils/calendar'
import { LunarCalendarUtil } from '@/utils/lunar'
import * as lunar from 'lunar-javascript'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

// 二十四节气icon映射
const SOLAR_TERM_ICONS: Record<string, string> = {
  // 春季节气
  '立春': '🌱',  '雨水': '💧',  '惊蛰': '🐛',  '春分': '🌸',  '清明': '🍃',  '谷雨': '🌾',
  // 夏季节气
  '立夏': '☀️',  '小满': '🌻',  '芒种': '🌾',  '夏至': '🌞',  '小暑': '🔥',  '大暑': '🥵',
  // 秋季节气
  '立秋': '🍂',  '处暑': '🌤️',  '白露': '💧',  '秋分': '🌰',  '寒露': '❄️',  '霜降': '🌨️',
  // 冬季节气
  '立冬': '❄️',  '小雪': '🌨️',  '大雪': '⛄',  '冬至': '🌨️',  '小寒': '🧊',  '大寒': '🥶',
}

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

const currentMonthDays = computed(() => {
  return CalendarUtil.getMonthGrid(currentYear.value, currentMonth.value)
})

const currentMonthSolarTerms = computed(() => {
  return currentMonthDays.value
    .filter(day => day.isCurrentMonth && day.solarTerm)
    .map(day => ({
      name: day.solarTerm!,
      icon: SOLAR_TERM_ICONS[day.solarTerm!] || '🌿',
      date: `${day.date.getFullYear()}-${(day.date.getMonth() + 1).toString().padStart(2, '0')}-${day.date.getDate().toString().padStart(2, '0')}`
    }))
})

const getLunarDay = (date: Date) => {
  try {
    const solar = lunar.Solar.fromDate(date)
    const lunarDate = solar.getLunar()
    return lunarDate.getDayInChinese()
  } catch {
    return date.getDate().toString()
  }
}

const goToPreviousMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const goToNextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const goToToday = () => {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
}

onMounted(() => {
  console.log('=== 节气测试页面已加载 ===')
  console.log('当前月份:', currentYear.value, currentMonth.value)

  // 输出本月的节气信息
  const terms = currentMonthSolarTerms.value
  console.log('本月节气:', terms)

  // 测试几个已知节气日期
  const testDates = [
    new Date('2025-01-05'), // 小寒
    new Date('2025-03-20'), // 春分
    new Date('2025-06-21'), // 夏至
    new Date('2025-10-23'), // 霜降
    new Date('2025-12-21'), // 冬至
  ]

  testDates.forEach(date => {
    const dayInfo = LunarCalendarUtil.getLunarInfo(date)
    console.log(`${date.toISOString().split('T')[0]}: ${dayInfo.solarTerm || '无节气'}`)
  })
})
</script>

<style scoped>
.solar-term-test {
  max-width: 1200px;
  margin: 0 auto;
}

.mini-calendar {
  background: #f9fafb;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.mini-day {
  min-height: 40px;
  background: white;
  transition: all 0.2s ease;
}

.mini-day.current-month {
  background: white;
  opacity: 1;
}

.mini-day:not(.current-month) {
  opacity: 0.4;
  background: #f9fafb;
}

.mini-day.has-solar-term {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border: 1px solid rgba(147, 51, 234, 0.3);
}

.mini-day.today {
  background: #eff6ff;
  border: 1px solid #3b82f6;
}

.mini-day:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>