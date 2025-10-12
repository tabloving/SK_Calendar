<template>
  <div class="calendar-view">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧日历区域 -->
      <div class="lg:col-span-2 space-y-4">
        <CalendarHeader />
        <CalendarGrid />
      </div>

      <!-- 右侧详情区域 -->
      <div class="lg:col-span-1">
        <FastingDetail />
      </div>
    </div>

    <!-- 底部统计信息 -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-1 gap-4">
      <el-card class="stats-card">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="font-semibold">近期戒期提醒</span>
            <el-icon><Bell /></el-icon>
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="(fasting, index) in upcomingFastings"
            :key="index"
            class="fasting-reminder-card"
            :class="getFastingCardClass(fasting.level)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-1">
                  <div
                    class="fasting-level-indicator mr-2"
                    :class="getFastingIndicatorClass(fasting.level)"
                  ></div>
                  <span class="font-medium text-sm">{{ fasting.reason }}</span>
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <span class="lunar-date-text-alt mr-1">{{ fasting.lunarDate }}</span>
                  <svg class="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 10.414l2.293 2.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ getDaysText(fasting.daysFromNow) }}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="date-text font-semibold text-sm">{{ fasting.date }}</div>
                <div class="weekday-text text-xs text-gray-400">
                  {{ getWeekdayText(fasting.fullDate) }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="upcomingFastings.length === 0" class="no-fasting-notice">
            <div class="text-center">
              <div class="mb-2 text-green-500">
                <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-sm text-gray-600">未来一周无戒期</div>
              <div class="text-xs text-gray-400 mt-1">可安心修行，精进功课</div>
            </div>
          </div>
        </div>
      </el-card>

          </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import CalendarHeader from '@/components/CalendarHeader.vue'
import CalendarGrid from '@/components/CalendarGrid.vue'
import FastingDetail from '@/components/FastingDetail.vue'
import {
  DataAnalysis,
  Bell,
  Operation,
  Calendar,
  Setting,
  Download
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()


const upcomingFastings = computed(() => {
  const today = new Date()
  const weekLater = new Date(today)
  weekLater.setDate(today.getDate() + 7)
  const upcomingFastings: Array<{
    reason: string;
    date: string;
    fullDate: Date;
    lunarDate: string;
    level: 'major' | 'moderate' | 'minor';
    daysFromNow: number;
  }> = []

  // 获取当前月份和下个月的日历数据
  const currentMonth = calendarStore.currentMonthInfo.days
  const allDays = [...currentMonth]

  allDays.forEach(day => {
    if (day.date >= today && day.date <= weekLater) {
      const enabledFastings = day.fastingInfos.filter(fasting =>
        settingsStore.settings.enabledFastingTypes.includes(fasting.type)
      )

      if (enabledFastings.length > 0) {
        const highestLevel = CalendarUtil.getHighestFastingLevel(enabledFastings)
        const daysFromNow = Math.ceil((day.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

        enabledFastings.forEach(fasting => {
          const lunarInfo = CalendarUtil.getFullLunarMonthDay(day.date)
          upcomingFastings.push({
            reason: fasting.reason,
            date: `${day.month}月${day.day}日`,
            fullDate: day.date,
            lunarDate: lunarInfo.full,
            level: highestLevel as 'major' | 'moderate' | 'minor',
            daysFromNow: daysFromNow
          })
        })
      }
    }
  })

  return upcomingFastings
    .sort((a, b) => a.daysFromNow - b.daysFromNow)
})

const currentMonthDays = computed(() => {
  return calendarStore.currentMonthInfo.days
})

// 方法
const goToToday = () => {
  calendarStore.goToToday()
  ElMessage.success('已返回今天')
}

const getFastingCardClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-fasting-card',
    moderate: 'moderate-fasting-card',
    minor: 'minor-fasting-card'
  }
  return classMap[level] || 'minor-fasting-card'
}

const getFastingIndicatorClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-indicator',
    moderate: 'moderate-indicator',
    minor: 'minor-indicator'
  }
  return classMap[level] || 'minor-indicator'
}

const getDaysText = (daysFromNow: number) => {
  if (daysFromNow === 0) return '今天'
  if (daysFromNow === 1) return '明天'
  if (daysFromNow === 2) return '后天'
  if (daysFromNow <= 7) return `${daysFromNow}天后`
  return `${daysFromNow}天后`
}

const getWeekdayText = (date: Date) => {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[date.getDay()]
}

const goToSettings = () => {
  router.push('/settings')
}

const exportCalendar = () => {
  // 导出日历功能
  const exportData = {
    year: calendarStore.selectedYear,
    month: calendarStore.selectedMonth,
    fastingStats: calendarStore.getMonthFastingStats,
    days: currentMonthDays.value.filter(day => day.isCurrentMonth).map(day => ({
      date: CalendarUtil.formatDate(day.date),
      lunarDate: day.lunarDate,
      fastingInfos: day.fastingInfos.filter(fasting =>
        settingsStore.settings.enabledFastingTypes.includes(fasting.type)
      ),
      solarTerm: day.solarTerm
    }))
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `寿康宝鉴戒期日历_${calendarStore.selectedYear}年${calendarStore.selectedMonth}月.json`
  link.click()
  URL.revokeObjectURL(url)

  ElMessage.success('日历导出成功')
}

// 生命周期
onMounted(() => {
  // 加载设置
  settingsStore.loadSettings()

  // 如果没有选中日期，默认选中今天
  if (!calendarStore.selectedDate) {
    calendarStore.goToToday()
  }
})
</script>

<style scoped>
.calendar-view {
  padding: 0;
}

.stats-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}


/* 近期戒期提醒卡片样式 */
.fasting-reminder-card {
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.fasting-reminder-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 大罪戒期卡片 */
.major-fasting-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-left-color: #dc2626;
  border: 1px solid #fecaca;
}

/* 中罪戒期卡片 */
.moderate-fasting-card {
  background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
  border-left-color: #ea580c;
  border: 1px solid #fbd38d;
}

/* 小罪戒期卡片 */
.minor-fasting-card {
  background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
  border-left-color: #ca8a04;
  border: 1px solid #fde68a;
}

/* 戒期等级指示器 */
.fasting-level-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* 日期样式 */
.date-text {
  color: #374151;
  line-height: 1.2;
}

.weekday-text {
  color: #9ca3af;
  margin-top: 2px;
}

/* 农历日期样式 */
.lunar-date-text,
.lunar-date-text-alt {
  color: #6b7280;
  font-weight: 400;
}

.lunar-date-text-alt {
  font-size: 11px;
}

/* 天数样式 */
.facing-days-text {
  color: #6b7280;
  font-size: 11px;
}

/* 无戒期提示样式 */
.no-fasting-notice {
  padding: 20px 16px;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .fasting-reminder-card {
    padding: 10px;
  }

  .date-text {
    font-size: 12px;
  }

  .weekday-text {
    font-size: 10px;
  }
}
</style>