<template>
  <div class="date-navigation">
    <!-- 导航按钮区域 -->
    <div class="navigation-buttons mb-2">
      <div class="flex items-center justify-between gap-1 flex-wrap">
        <!-- 左侧导航 -->
        <div class="flex items-center gap-1">
          <el-button
            :icon="ArrowLeft"
            @click="goToPreviousMonth"
            title="上个月"
            size="small"
            class="nav-btn"
            :disabled="!canGoPrevious"
          />
          <el-button
            :icon="CaretLeft"
            @click="goToPreviousDay"
            title="上一天"
            size="small"
            class="nav-btn"
            :disabled="!canGoPreviousDay"
          />
        </div>

        <!-- 中间：日期标题信息 -->
        <div class="flex items-center justify-center flex-1 min-w-[100px]">
          <div class="date-title-centered">
            <h2 class="text-2xl font-semibold text-purple-500 leading-none mb-1 flex items-center justify-center gap-1">
              <span>{{ currentYear }}</span>
              <span class="text-lg">·</span>
              <span>{{ currentMonth }}</span>
            </h2>
            <div class="text-xs text-gray-500 leading-tight">
              {{ lunarMonthName }}
            </div>
          </div>
        </div>

        <!-- 右侧导航 -->
        <div class="flex items-center gap-1">
          <el-button
            :icon="CaretRight"
            @click="goToNextDay"
            title="下一天"
            size="small"
            class="nav-btn"
            :disabled="!canGoNextDay"
          />
          <el-button
            :icon="ArrowRight"
            @click="goToNextMonth"
            title="下个月"
            size="small"
            class="nav-btn"
            :disabled="!canGoNext"
          />
        </div>
      </div>
    </div>

    <!-- 月度统计信息 -->
    <div class="month-stats-card">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <!-- 左侧标题 -->
        <div class="month-title flex items-center gap-1 min-w-fit">
          <el-icon class="text-xs text-blue-600"><DataAnalysis /></el-icon>
          <span class="text-xs font-medium text-gray-700">{{ selectedMonth }}月</span>
        </div>

        <!-- 中间统计项 -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <div class="flex items-center gap-1" title="大戒：重罪戒期，需严格持戒">
            <span class="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
            <span class="text-xs text-gray-600">大戒 {{ monthStats.major }}</span>
          </div>
          <div class="flex items-center gap-1" title="中戒：中罪戒期，应当谨慎">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
            <span class="text-xs text-gray-600">中戒 {{ monthStats.moderate }}</span>
          </div>
          <div class="flex items-center gap-1" title="宜戒：小罪戒期，建议避免">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
            <span class="text-xs text-gray-600">宜戒 {{ monthStats.minor }}</span>
          </div>
          <div class="flex items-center gap-1" title="安全：无明显戒期，可安心行事">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
            <span class="text-xs text-gray-600">安全 {{ monthStats.safe }}</span>
          </div>
        </div>

        <!-- 右侧进度条 -->
        <div class="progress-section flex items-center gap-1 min-w-fit">
          <div class="w-8 bg-gray-200 rounded-full h-1">
            <div
              class="bg-gradient-to-r from-orange-400 to-red-500 h-1 rounded-full transition-all duration-300"
              :style="{ width: `${preceptPercentage}%` }"
            ></div>
          </div>
          <span class="text-xs font-medium text-gray-700">{{ preceptPercentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import * as lunar from 'lunar-javascript'
import { DataAnalysis, ArrowLeft, ArrowRight, CaretLeft, CaretRight } from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()

// 计算属性
const selectedMonth = computed(() => calendarStore.selectedMonth)

// 用于日期标题的别名，避免与统计信息中的变量名冲突
const currentYear = computed(() => calendarStore.selectedYear)
const currentMonth = computed(() => calendarStore.selectedMonth)

const lunarMonthName = computed(() => {
  try {
    // 如果有选中日期，使用选中日期的农历月份；否则使用该月第一天
    let targetDate: Date
    if (calendarStore.selectedDate) {
      targetDate = calendarStore.selectedDate
    } else {
      targetDate = new Date(currentYear.value, currentMonth.value - 1, 1)
    }

    const solar = lunar.Solar.fromDate(targetDate)
    const lunarDate = solar.getLunar()
    return `${lunarDate.getYearInChinese()}年${lunarDate.getMonthInChinese()}月`
  } catch (error) {
    // 如果出错，降级显示公历年份
    return `${currentYear.value}年`
  }
})

const monthStats = computed(() => calendarStore.getMonthPreceptStats)

const preceptPercentage = computed(() => {
  if (monthStats.value.total === 0) return 0
  const preceptDays = monthStats.value.major + monthStats.value.moderate + monthStats.value.minor
  return Math.round((preceptDays / monthStats.value.total) * 100)
})

// 年份范围限制 - 以今日月份为基准的前后半年
const today = new Date()
const currentRealYear = today.getFullYear()
const currentRealMonth = today.getMonth() + 1 // 1-12

// 计算最小允许的年月（往前6个月）
const minDate = new Date(currentRealYear, currentRealMonth - 1 - 6, 1)
const minAllowedYear = computed(() => minDate.getFullYear())
const minAllowedMonth = computed(() => minDate.getMonth() + 1)

// 计算最大允许的年月（往后6个月）
const maxDate = new Date(currentRealYear, currentRealMonth - 1 + 6, 1)
const maxAllowedYear = computed(() => maxDate.getFullYear())
const maxAllowedMonth = computed(() => maxDate.getMonth() + 1)

// 判断是否可以向前导航（上个月）
const canGoPrevious = computed(() => {
  if (!settingsStore.settings.limitedYearRange) return true
  // 如果当前已经是最小允许的年月，则不能再向前
  if (calendarStore.selectedYear < minAllowedYear.value) return false
  if (calendarStore.selectedYear === minAllowedYear.value &&
      calendarStore.selectedMonth <= minAllowedMonth.value) return false
  return true
})

// 判断是否可以向后导航（下个月）
const canGoNext = computed(() => {
  if (!settingsStore.settings.limitedYearRange) return true
  // 如果当前已经是最大允许的年月，则不能再向后
  if (calendarStore.selectedYear > maxAllowedYear.value) return false
  if (calendarStore.selectedYear === maxAllowedYear.value &&
      calendarStore.selectedMonth >= maxAllowedMonth.value) return false
  return true
})

// 判断上一天是否可用
const canGoPreviousDay = computed(() => {
  if (!settingsStore.settings.limitedYearRange) return true
  if (!calendarStore.selectedDate) return canGoPrevious.value
  const selectedDate = calendarStore.selectedDate
  // 如果当前日期是最小允许月份的第一天，则不能再向前
  const minFirstDay = new Date(minAllowedYear.value, minAllowedMonth.value - 1, 1)
  return selectedDate > minFirstDay
})

// 判断下一天是否可用
const canGoNextDay = computed(() => {
  if (!settingsStore.settings.limitedYearRange) return true
  if (!calendarStore.selectedDate) return canGoNext.value
  const selectedDate = calendarStore.selectedDate
  // 如果当前日期是最大允许月份的最后一天，则不能再向后
  const maxLastDay = new Date(maxAllowedYear.value, maxAllowedMonth.value, 0) // 月份的最后一天
  return selectedDate < maxLastDay
})

// 导航方法
const goToPreviousMonth = () => {
  if (!canGoPrevious.value) return
  calendarStore.goToPreviousMonth()
}

const goToNextMonth = () => {
  if (!canGoNext.value) return
  calendarStore.goToNextMonth()
}

const goToPreviousDay = () => {
  if (!canGoPreviousDay.value) return
  calendarStore.goToPreviousDay()
}

const goToNextDay = () => {
  if (!canGoNextDay.value) return
  calendarStore.goToNextDay()
}
</script>

<style scoped>
/* 导航按钮样式 */
.navigation-buttons {
  border-bottom: 1px solid var(--paper-warm, #f2ead8);
  padding-bottom: 12px;
}

/* 居中日期标题样式 */
.date-title-centered {
  text-align: center;
  min-width: 120px;
  padding: 0 4px;
  flex-shrink: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-title-centered h2 {
  font-family: 'Gravitas One', cursive;
  font-weight: 600;
  color: #8b5cf6;
  margin: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.date-title-centered .text-xs {
  font-family: 'system-ui', -apple-system, sans-serif;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: 0.08em;
}

.nav-btn {
  padding: 6px 8px;
  height: 32px;
  width: 32px;
  border-radius: 6px;
  background: linear-gradient(180deg, #faf6f0 0%, #f0e8da 100%);
  border: 1px solid #d4c4a8;
  color: #8b7355;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(139, 90, 43, 0.08);
}

.nav-btn:hover {
  background: linear-gradient(180deg, #f5efe5 0%, #e8dcc8 100%);
  border-color: #c9a86c;
  color: #5c4033;
  box-shadow: 0 2px 6px rgba(139, 90, 43, 0.15);
}

/* 禁用状态样式 */
.nav-btn:disabled,
.nav-btn.is-disabled {
  background: #f5f5f5 !important;
  border-color: #e0e0e0 !important;
  color: #c0c0c0 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
  opacity: 0.6;
}

.nav-btn:disabled:hover,
.nav-btn.is-disabled:hover {
  background: #f5f5f5 !important;
  border-color: #e0e0e0 !important;
  color: #c0c0c0 !important;
  box-shadow: none !important;
  transform: none !important;
}

/* 月度统计卡片样式 */
.month-stats-card {
  transition: all 0.2s ease;
  background: linear-gradient(180deg, #faf6f0 0%, #f5efe5 100%);
  border: 1px solid #e8dcc8;
  border-radius: 8px;
  padding: 8px 12px;
}

.month-stats-card:hover {
  box-shadow: 0 2px 6px rgba(139, 90, 43, 0.1);
}

/* 统计项样式 */
.month-stats-card .flex.items-center.gap-1\.5 > div {
  transition: all 0.2s ease;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
}

.month-stats-card .flex.items-center.gap-1\.5 > div:hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 进度条动画 */
.month-stats-card .bg-gradient-to-r {
  transition: width 0.5s ease;
}

/* 指示器动画 */
.month-stats-card .w-1\.5 {
  transition: transform 0.2s ease;
}

.month-stats-card .flex.items-center.gap-1:hover .w-1\.5 {
  transform: scale(1.3);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .month-stats-card {
    padding: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .month-stats-card .flex.items-center.gap-1\.5 {
    gap: 0.5rem;
  }

  .month-stats-card .flex.items-center.gap-1\.5 > div {
    padding: 1px 3px;
  }

  .month-stats-card .w-8 {
    width: 1.5rem;
  }

  .nav-btn {
    padding: 10px 8px;
    height: 40px;
    width: 40px;
  }

  .date-title-centered {
    min-width: 90px;
  }

  /* 流式布局下增大阳历文本 */
  .date-title-centered h2 {
    font-size: 2rem;
  }

  /* 流式布局下增大农历文本 */
  .date-title-centered .text-xs {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .month-stats-card {
    padding: 0.125rem;
    margin-bottom: 0.125rem;
  }

  .month-stats-card .flex.items-center.gap-1\.5 {
    gap: 0.25rem;
  }

  .month-stats-card .flex.items-center.gap-1\.5 > div {
    padding: 1px 2px;
  }

  .month-stats-card .flex.items-center.gap-1 {
    gap: 0.25rem;
  }

  .month-stats-card .w-8 {
    width: 1rem;
  }

  .month-stats-card .text-xs {
    font-size: 0.625rem;
  }

  .nav-btn {
    padding: 8px 6px;
    height: 38px;
    width: 38px;
    font-size: 12px;
  }

  .date-title-centered {
    min-width: 70px;
  }

  .date-title-centered h2 {
    font-size: 1.875rem;
    font-weight: 700;
  }

  .date-title-centered .text-xs {
    font-size: 1rem;
  }

  .navigation-buttons .flex {
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  /* 导航按钮区域不换行 */
  .navigation-buttons .flex {
    flex-wrap: nowrap;
    gap: 0.25rem;
  }

  /* 导航按钮样式 */
  .nav-btn {
    padding: 8px 6px;
    height: 36px;
    width: 36px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .date-title-centered {
    min-width: 80px;
    flex-shrink: 1;
  }

  /* 增大阳历文本 */
  .date-title-centered h2 {
    font-size: 1.75rem;
  }

  /* 增大农历文本 */
  .date-title-centered .text-xs {
    font-size: 1.125rem;
  }

  /* 统计卡片样式 - 隐藏月份和进度条，只保留核心统计 */
  .month-stats-card {
    padding: 1rem;
    text-align: center;
  }

  .month-stats-card .month-title {
    display: none; /* 隐藏月份标题 */
  }

  .month-stats-card .progress-section {
    display: none; /* 隐藏进度条 */
  }

  .month-stats-card .flex.items-center {
    justify-content: space-evenly; /* 均匀分布统计项 */
    width: 100%;
    max-width: 100%;
  }

  .month-stats-card .flex.items-center > div {
    flex: 1;
    justify-content: center;
    min-width: 0;
    padding: 0 2px;
  }

  .month-stats-card .w-1\.5 {
    display: inline-block; /* 保留指示器 */
    width: 8px;
    height: 8px;
  }

  .month-stats-card .text-xs {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>