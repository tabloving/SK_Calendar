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
        <h4 class="text-lg font-semibold text-gray-800 mb-4">戒期信息</h4>

        <div v-if="filteredFastingInfos.length === 0" class="text-gray-500 text-center py-4">
          今日无戒期，保持平常心，慎勿放逸！
        </div>

        <div v-else class="space-y-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 斋日信息 -->
      <div v-if="hasFastingDays" class="fasting-days-info">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">斋日信息</h4>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span class="font-semibold text-blue-700">十斋日</span>
          </div>
          <div class="text-sm text-blue-600 mt-1">
            诸天斋日，功德倍增
          </div>
        </div>
      </div>

      <!-- 修行建议 -->
      <div class="practice-advice">
        <!-- 有戒期时的建议 -->
        <div v-if="filteredFastingInfos.length > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
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

        <!-- 无戒期时的精进鼓励 -->
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
import { Calendar } from '@element-plus/icons-vue'
import type { FastingInfo } from '@/types'

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

@media (max-width: 640px) {
  .fasting-detail {
    padding: 16px;
  }

  .grid.grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>