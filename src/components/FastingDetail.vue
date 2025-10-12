<template>
  <div class="fasting-detail bg-white rounded-lg shadow-sm p-6">
    <div v-if="selectedDayInfo" class="space-y-6">
      <!-- 日期信息 -->
      <div class="date-info border-b pb-4">
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          {{ formatDate(selectedDayInfo.date) }}
          <span v-if="selectedDayInfo.isToday" class="ml-2 text-sm text-blue-600">(今天)</span>
        </h3>
        <div class="text-gray-600">
          <div>农历：{{ lunarInfo.full }}</div>
          <div>星期：{{ weekDayText }}</div>
          <div v-if="selectedDayInfo.solarTerm" class="text-purple-600 font-semibold">
            节气：{{ selectedDayInfo.solarTerm }}
          </div>
        </div>
      </div>

      <!-- 戒期信息 -->
      <div class="fasting-info">
        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2" :size="20">
            <Document />
          </el-icon>
          戒期信息
        </h4>

        <!-- 有斋日或戒期时显示 -->
        <div v-if="hasFastingDays || filteredFastingInfos.length > 0" class="space-y-3">
          <!-- 普通戒期信息 -->
          <div
            v-for="(fasting, index) in filteredFastingInfos"
            :key="index"
            class="fasting-item border rounded-lg p-4"
            :class="getFastingItemClass(fasting.level)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <div
                    class="fasting-indicator mr-2"
                    :class="fasting.level"
                  ></div>
                  <span class="font-semibold">{{ fasting.reason }}</span>
                  <el-tag
                    :type="getTagType(fasting.level)"
                    size="small"
                    class="ml-2"
                  >
                    {{ getFastingLevelText(fasting.level) }}
                  </el-tag>
                </div>
                <div class="text-sm text-gray-600">
                  <div>类型：{{ getFastingTypeText(fasting.type) }}</div>
                  <div v-if="fasting.description">说明：{{ fasting.description }}</div>
                  <!-- 如果是斋日，添加斋日说明 -->
                  <div v-if="hasFastingDays">诸天斋日，功德倍增</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 如果没有戒期但有斋日，单独显示斋日提示 -->
          <div v-if="hasFastingDays && filteredFastingInfos.length === 0" class="text-blue-600 text-center py-4">
            诸天斋日，功德倍增
          </div>
        </div>

        <!-- 既无戒期也无斋日时的提示 -->
        <div v-else class="text-gray-500 text-center py-4">
          今日无戒期，保持平常心，慎勿放逸！
        </div>
      </div>

      <!-- 近期戒期提醒 -->
      <div v-if="upcomingFastings.length > 0" class="upcoming-fastings">
        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2"><Bell /></el-icon>
          近期戒期提醒
        </h4>
        <div class="space-y-2">
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
                  <span class="mr-1">{{ fasting.lunarDate }}</span>
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
        </div>
      </div>

      <!-- 修行建议 -->
      <div class="practice-advice">
        <!-- 有戒期或斋日时的建议 -->
        <div v-if="filteredFastingInfos.length > 0 || hasFastingDays" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="font-semibold text-blue-800">修行建议</span>
          </div>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• 请在此日保持身心清净，精进修行</li>
            <li>• 可多读诵经典，念佛持咒</li>
            <li>• 若有不慎，应诚心忏悔</li>
            <li>• 功德回向给法界众生</li>
          </ul>
        </div>

        <!-- 既无戒期也无斋日时的精进鼓励 -->
        <div v-else class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="font-semibold text-green-800">修行精进</span>
          </div>
          <p class="text-sm text-green-700">
            无戒期之日正是精进修行的好时机，可以加倍功课，积累功德
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-8">
      <el-icon size="48" class="mb-4"><Calendar /></el-icon>
      <p>请选择日期查看戒期详情</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import { FastingDataManager } from '@/utils/fasting-data'
import * as lunar from 'lunar-javascript'
import { Calendar, Bell, Document } from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()
const fastingManager = FastingDataManager.getInstance()

// 计算属性
const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)

const filteredFastingInfos = computed(() => {
  if (!selectedDayInfo.value) return []

  return selectedDayInfo.value.fastingInfos.filter(fasting =>
    settingsStore.settings.enabledFastingTypes.includes(fasting.type)
  )
})

const lunarInfo = computed(() => {
  if (!selectedDayInfo.value) return { month: '', day: '', full: '' }

  return CalendarUtil.getFullLunarMonthDay(selectedDayInfo.value.date)
})

const weekDayText = computed(() => {
  if (!selectedDayInfo.value) return ''

  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekDays[selectedDayInfo.value.weekday]
})

const hasFastingDays = computed(() => {
  return isTenFastingDay.value
})

const isTenFastingDay = computed(() => {
  if (!selectedDayInfo.value) return false

  try {
    const solar = lunar.Solar.fromDate(selectedDayInfo.value.date)
    const lunarDate = solar.getLunar()
    return fastingManager.isTenFastingDay(lunarDate.getDay())
  } catch (error) {
    console.warn('检查十斋日失败', error)
    return false
  }
})

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

// 方法
const formatDate = (date: Date) => {
  return CalendarUtil.formatDate(date, 'YYYY-MM-DD')
}

const getFastingLevelText = (level: string) => {
  return CalendarUtil.getFastingLevelText(level as any)
}

const getFastingTypeText = (type: string) => {
  const typeMap = {
    regular: '常规戒期',
    special: '特殊戒期',
    personal: '个人戒期',
    solar_term: '节气戒期',
    fasting_day: '斋日'
  }
  return typeMap[type as keyof typeof typeMap] || '未知类型'
}

const getTagType = (level: string) => {
  const typeMap = {
    major: 'danger',
    moderate: 'warning',
    minor: 'info',
    safe: 'success'
  }
  return typeMap[level as keyof typeof typeMap] || 'info'
}

const getFastingItemClass = (level: string) => {
  const classMap = {
    major: 'bg-red-50 border-red-200',
    moderate: 'bg-orange-50 border-orange-200',
    minor: 'bg-yellow-50 border-yellow-200',
    safe: 'bg-green-50 border-green-200'
  }
  return classMap[level as keyof typeof classMap] || 'bg-gray-50 border-gray-200'
}

// 近期戒期提醒相关方法
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
</script>

<style scoped>
.fasting-detail {
  min-height: 400px;
}

.fasting-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.fasting-indicator.major {
  background-color: #DC2626;
}

.fasting-indicator.moderate {
  background-color: #EA580C;
}

.fasting-indicator.minor {
  background-color: #CA8A04;
}

.fasting-indicator.safe {
  background-color: #16A34A;
}

/* 近期戒期提醒卡片样式 */
.fasting-reminder-card {
  padding: 10px;
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

.major-indicator {
  background-color: #dc2626;
}

.moderate-indicator {
  background-color: #ea580c;
}

.minor-indicator {
  background-color: #ca8a04;
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

@media (max-width: 640px) {
  .fasting-detail {
    padding: 16px;
  }

  .grid.grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .fasting-reminder-card {
    padding: 8px;
  }

  .date-text {
    font-size: 12px;
  }

  .weekday-text {
    font-size: 10px;
  }

  .upcoming-fastings {
    margin-top: 4;
  }
}
</style>