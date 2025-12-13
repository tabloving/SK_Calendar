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
          />
          <el-button
            :icon="CaretLeft"
            @click="goToPreviousDay"
            title="上一天"
            size="small"
            class="nav-btn"
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
          />
          <el-button
            :icon="ArrowRight"
            @click="goToNextMonth"
            title="下个月"
            size="small"
            class="nav-btn"
          />
          <el-button
            size="small"
            :icon="CalendarIcon"
            @click="goToToday"
            class="today-btn"
          >
            今天
          </el-button>
        </div>
      </div>
    </div>

    <!-- 月度统计信息 -->
    <div class="month-stats-card bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100">
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
import * as lunar from 'lunar-javascript'
import { Calendar as CalendarIcon, DataAnalysis, ArrowLeft, ArrowRight, CaretLeft, CaretRight } from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()

// 计算属性
const selectedMonth = computed(() => calendarStore.selectedMonth)

// 用于日期标题的别名，避免与统计信息中的变量名冲突
const currentYear = computed(() => calendarStore.selectedYear)
const currentMonth = computed(() => calendarStore.selectedMonth)

const lunarMonthName = computed(() => {
  try {
    // 使用lunar.js获取该月第一天的农历月份名称
    const solar = lunar.Solar.fromYmd(currentYear.value, currentMonth.value, 1)
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

// 导航方法
const goToPreviousMonth = () => {
  calendarStore.goToPreviousMonth()
}

const goToNextMonth = () => {
  calendarStore.goToNextMonth()
}

const goToPreviousDay = () => {
  calendarStore.goToPreviousDay()
}

const goToNextDay = () => {
  calendarStore.goToNextDay()
}

const goToToday = () => {
  calendarStore.goToToday()
}
</script>

<style scoped>
/* 导航按钮样式 */
.navigation-buttons {
  border-bottom: 1px solid #f0f0f0;
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
  border-radius: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  color: #64748b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-btn:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
  color: #475569;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.today-btn {
  padding: 6px 12px;
  height: 32px;
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
  color: white;
  border: 1px solid #8b5cf6;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(167, 139, 250, 0.15);
}

.today-btn:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
  border-color: #7c3aed;
}

/* 月度统计卡片样式 */
.month-stats-card {
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.month-stats-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
    padding: 6px 4px;
    height: 28px;
    width: 28px;
  }

  .date-title-centered {
    min-width: 90px;
  }

  .today-btn {
    padding: 6px 8px;
    height: 28px;
    font-size: 11px;
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
    padding: 4px 2px;
    height: 24px;
    width: 24px;
    font-size: 10px;
  }

  .date-title-centered {
    min-width: 70px;
  }

  .date-title-centered h2 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .date-title-centered .text-xs {
    font-size: 0.625rem;
  }

  .today-btn {
    padding: 4px 6px;
    height: 24px;
    font-size: 10px;
  }

  .navigation-buttons .flex {
    gap: 0.5rem;
  }
}

@media (max-width: 640px) {
  /* 导航按钮样式 */
  .nav-btn {
    padding: 3px 1px;
    height: 20px;
    width: 20px;
  }

  .date-title-centered {
    min-width: 50px;
    font-size: 0.75rem;
  }

  .date-title-centered h2 {
    font-size: 0.75rem;
  }

  .today-btn {
    padding: 3px 4px;
    height: 20px;
    font-size: 9px;
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
  }

  .month-stats-card .text-xs {
    font-size: 0.625rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>