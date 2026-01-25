<template>
  <div v-if="upcomingPrecepts.length > 0" class="upcoming-precepts">
    <h4 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">
      <el-icon class="mr-2"><Clock /></el-icon>
      近期戒期
    </h4>
    <div class="space-y-2">
      <div
        v-for="(precept, index) in upcomingPrecepts"
        :key="index"
        class="precept-reminder-card"
        :class="getPreceptCardClass(precept.level)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center mb-1">
              <div
                class="precept-level-indicator mr-2"
                :class="getPreceptIndicatorClass(precept.level)"
              ></div>
              <span class="font-medium text-sm">{{ precept.reason }}</span>
              <el-tag v-if="precept.preceptCount > 1" size="small" type="info" class="ml-2">
                {{ precept.preceptCount }}项
              </el-tag>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <span class="mr-1">{{ precept.lunarDate }}</span>
              <svg class="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 10.414l2.293 2.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
              </svg>
              <span>{{ getDaysText(precept.daysFromBase) }}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="date-text font-semibold text-sm">{{ precept.date }}</div>
            <div class="weekday-text text-xs text-gray-400">
              {{ getWeekdayText(precept.fullDate) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import { LunarCalendarUtil } from '@/utils/lunar'
import { Clock } from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()

// 判断选中的日期是否为今天
const isSelectedToday = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selected = calendarStore.selectedDate
  if (!selected) return true
  const selectedNormalized = new Date(selected)
  selectedNormalized.setHours(0, 0, 0, 0)
  return selectedNormalized.getTime() === today.getTime()
})

const upcomingPrecepts = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 获取选中的日期
  const selected = calendarStore.selectedDate
  let baseDate = today // 基准日期，用于计算近期戒期

  if (selected) {
    const selectedDateNormalized = new Date(selected)
    selectedDateNormalized.setHours(0, 0, 0, 0)

    // 如果选中的是过去的日期，不显示近期戒期
    if (selectedDateNormalized < today) {
      return []
    }

    // 如果选中的是未来日期，以选中日期为基准
    baseDate = selectedDateNormalized
  }

  // 优化算法：逐天搜索，找到3个有戒期的日期就停止
  const MAX_SEARCH_DAYS = 15 // 最多搜索15天
  const TARGET_COUNT = 3 // 目标找到3个戒期日
  const results: Array<{
    date: Date;
    dateString: string;
    lunarDate: string;
    precepts: Array<{
      reason: string;
      level: 'major' | 'moderate' | 'minor';
      type: string;
    }>;
    daysFromBase: number;
  }> = []

  for (let i = 1; i <= MAX_SEARCH_DAYS && results.length < TARGET_COUNT; i++) {
    const checkDate = new Date(baseDate)
    checkDate.setDate(baseDate.getDate() + i)

    // 获取该日期的信息
    const dayInfo = LunarCalendarUtil.getLunarInfo(checkDate)
    const preceptInfos = CalendarUtil.getDayPreceptInfos(dayInfo)

    // 过滤启用的戒期类型
    const enabledPrecepts = preceptInfos.filter(precept =>
      settingsStore.settings.enabledPreceptTypes.includes(precept.type)
    )

    if (enabledPrecepts.length > 0) {
      const lunarInfo = CalendarUtil.getFullLunarMonthDay(checkDate)
      results.push({
        date: checkDate,
        dateString: `${checkDate.getMonth() + 1}月${checkDate.getDate()}日`,
        lunarDate: lunarInfo.full,
        precepts: enabledPrecepts.map(p => ({
          reason: p.reason,
          level: p.level as 'major' | 'moderate' | 'minor',
          type: p.type
        })),
        daysFromBase: i
      })
    }
  }

  // 合并同一天的戒期为一个卡片
  return results.map(dayData => {
    // 获取当天最高戒期等级
    const highestLevel = dayData.precepts.reduce((highest, precept) => {
      const levelOrder = { major: 3, moderate: 2, minor: 1 }
      const currentOrder = levelOrder[precept.level] || 0
      const highestOrder = levelOrder[highest.level] || 0
      return currentOrder > highestOrder ? precept : highest
    }, dayData.precepts[0]).level

    // 合并戒期原因，如果是同一天多个戒期
    let combinedReason = ''
    if (dayData.precepts.length === 1) {
      combinedReason = dayData.precepts[0].reason
    } else {
      // 多个戒期时，用顿号分隔
      combinedReason = dayData.precepts.map(p => p.reason).join('、')
    }

    return {
      reason: combinedReason,
      date: dayData.dateString,
      fullDate: dayData.date,
      lunarDate: dayData.lunarDate,
      level: highestLevel,
      daysFromBase: dayData.daysFromBase,
      preceptCount: dayData.precepts.length,
      allPrecepts: dayData.precepts
    }
  })
})

// 近期戒期提醒相关方法
const getPreceptCardClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-precept-card',
    moderate: 'moderate-precept-card',
    minor: 'minor-precept-card'
  }
  return classMap[level] || 'minor-precept-card'
}

const getPreceptIndicatorClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-indicator',
    moderate: 'moderate-indicator',
    minor: 'minor-indicator'
  }
  return classMap[level] || 'minor-indicator'
}

const getDaysText = (daysFromBase: number) => {
  // 如果选中的是今天，使用"今天"、"明天"等文案
  if (isSelectedToday.value) {
    if (daysFromBase === 0) return '今天'
    if (daysFromBase === 1) return '明天'
    if (daysFromBase === 2) return '后天'
    return `${daysFromBase}天后`
  }
  // 如果选中的是未来日期，使用"当天"、"1天后"等文案
  if (daysFromBase === 0) return '当天'
  return `${daysFromBase}天后`
}

const getWeekdayText = (date: Date) => {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[date.getDay()]
}
</script>

<style>
/* 全局CSS变量 - 用于戒期等级颜色系统 */
:root {
  --color-major: 220, 38, 38;       /* #DC2626 */
  --color-moderate: 124, 58, 237;   /* #7C3AED */
  --color-minor: 59, 130, 246;     /* #3B82F6 */
  --color-safe: 22, 163, 74;       /* #16A34A */
}
</style>

<style scoped>
/* 近期戒期提醒卡片样式 */
.precept-reminder-card {
  padding: 10px;
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.precept-reminder-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 大罪戒期卡片 */
.major-precept-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-left-color: rgb(var(--color-major));
  border: 1px solid #fecaca;
}

/* 中罪戒期卡片 */
.moderate-precept-card {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border-left-color: rgb(var(--color-moderate));
  border: 1px solid #e9d5ff;
}

/* 小罪戒期卡片 */
.minor-precept-card {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-left-color: rgb(var(--color-minor));
  border: 1px solid #bfdbfe;
}

/* 戒期等级指示器 */
.precept-level-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.major-indicator {
  background-color: rgb(var(--color-major));
}

.moderate-indicator {
  background-color: rgb(var(--color-moderate));
}

.minor-indicator {
  background-color: rgb(var(--color-minor));
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
  .precept-reminder-card {
    padding: 8px;
  }

  .date-text {
    font-size: 12px;
  }

  .weekday-text {
    font-size: 10px;
  }

}
</style>