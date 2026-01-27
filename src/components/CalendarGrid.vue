<template>
  <div class="calendar-grid bg-paper-light rounded-lg shadow-sm pb-2 h-full flex flex-col">
    <!-- 星期标题 -->
    <div class="week-header grid grid-cols-7 border-b flex-shrink-0">
      <div
        v-for="(day, index) in weekDays"
        :key="index"
        class="week-day text-center font-medium text-sm"
        :class="{
          'weekend': index === 0 || index === 6,
          'weekday': index > 0 && index < 6,
          'today-weekday': index === todayWeekIndex
        }"
      >
        {{ day }}
      </div>
    </div>

    <!-- 日历格子 -->
    <div class="calendar-body flex-1">
      <div class="calendar-grid-days" :class="{ 'week-view': isMobile }">
        <el-tooltip
          v-for="dayInfo in displayDays"
          :key="`${dayInfo.year}-${dayInfo.month}-${dayInfo.day}`"
          :content="getDisabledTooltip(dayInfo.date)"
          :disabled="!getDisabledTooltip(dayInfo.date)"
          placement="top"
          effect="light"
          :show-after="0"
          :hide-after="0"
          popper-class="disabled-date-tooltip"
        >
          <CalendarDay
            :day-info="dayInfo"
            :is-selected="isSelected(dayInfo)"
            :is-disabled="!isDateInRange(dayInfo.date)"
            @click="handleDayClick"
          />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import CalendarDay from './CalendarDay.vue'
import type { CalendarDayInfo } from '@/types'

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 今日是星期几（0-6，0为周日）
const todayWeekIndex = computed(() => {
  return new Date().getDay()
})

// 响应式检测是否为移动端
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 480
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 计算属性
const currentMonthDays = computed(() => {
  return calendarStore.currentMonthInfo.days
})

// 获取当前选中日期所在周的日期
const currentWeekDays = computed(() => {
  const selectedDate = calendarStore.selectedDate || new Date()
  const allDays = currentMonthDays.value

  // 找到选中日期在数组中的索引
  const selectedIndex = allDays.findIndex(day =>
    day.date.getFullYear() === selectedDate.getFullYear() &&
    day.date.getMonth() === selectedDate.getMonth() &&
    day.date.getDate() === selectedDate.getDate()
  )

  if (selectedIndex === -1) {
    // 如果选中日期不在当前月份，返回第一周
    return allDays.slice(0, 7)
  }

  // 计算选中日期所在周的起始索引（每周7天）
  const weekStartIndex = Math.floor(selectedIndex / 7) * 7
  return allDays.slice(weekStartIndex, weekStartIndex + 7)
})

// 根据屏幕大小决定显示的日期
const displayDays = computed(() => {
  return isMobile.value ? currentWeekDays.value : currentMonthDays.value
})

// 计算日历行数，用于动态设置格子高度
const calendarRows = computed(() => {
  const dayCount = currentMonthDays.value.length
  return Math.ceil(dayCount / 7)
})

// 年份范围限制 - 以今日月份为基准的前后半年
const today = new Date()
const currentRealYear = today.getFullYear()
const currentRealMonth = today.getMonth() + 1 // 1-12

// 计算最小允许的年月（往前6个月）
const minDate = new Date(currentRealYear, currentRealMonth - 1 - 6, 1)
const minAllowedYear = minDate.getFullYear()
const minAllowedMonth = minDate.getMonth() + 1

// 计算最大允许的年月（往后6个月）
const maxDate = new Date(currentRealYear, currentRealMonth - 1 + 6, 1)
const maxAllowedYear = maxDate.getFullYear()
const maxAllowedMonth = maxDate.getMonth() + 1

// 判断日期是否在允许范围内
const isDateInRange = (date: Date): boolean => {
  if (!settingsStore.settings.limitedYearRange) return true

  const year = date.getFullYear()
  const month = date.getMonth() + 1

  // 检查是否在最小允许范围之前
  if (year < minAllowedYear) return false
  if (year === minAllowedYear && month < minAllowedMonth) return false

  // 检查是否在最大允许范围之后
  if (year > maxAllowedYear) return false
  if (year === maxAllowedYear && month > maxAllowedMonth) return false

  return true
}

// 方法
const isSelected = (dayInfo: CalendarDayInfo) => {
  if (!calendarStore.selectedDate) return false

  return dayInfo.date.getFullYear() === calendarStore.selectedDate.getFullYear() &&
         dayInfo.date.getMonth() === calendarStore.selectedDate.getMonth() &&
         dayInfo.date.getDate() === calendarStore.selectedDate.getDate()
}

// 判断日期是否在允许范围之前（过去）
const isDateBeforeRange = (date: Date): boolean => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  if (year < minAllowedYear) return true
  if (year === minAllowedYear && month < minAllowedMonth) return true
  return false
}

// 判断日期是否在允许范围之后（未来）
const isDateAfterRange = (date: Date): boolean => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  if (year > maxAllowedYear) return true
  if (year === maxAllowedYear && month > maxAllowedMonth) return true
  return false
}

// 获取禁用日期的提示文本
const getDisabledTooltip = (date: Date): string => {
  if (!settingsStore.settings.limitedYearRange) return ''
  if (isDateBeforeRange(date)) return '不要执着于过去，向前看！'
  if (isDateAfterRange(date)) return '未来还很远，过好当下！'
  return ''
}

const handleDayClick = (dayInfo: CalendarDayInfo) => {
  // 检查日期是否在允许范围内
  if (!isDateInRange(dayInfo.date)) {
    return
  }

  // 选中日期并在右侧边栏显示
  calendarStore.selectDate(dayInfo.date)
}
</script>

<style scoped>
.calendar-grid {
  user-select: none;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--paper-shadow);
  border: 1px solid var(--paper-border);
  overflow: hidden;
  background: var(--paper-light);
}

.week-header {
  background: var(--paper-cream);
  border-bottom: 1px solid var(--paper-border);
  padding: 12px 0;
}

.week-day {
  padding: 8px;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.2s ease;
  border-right: 1px solid #f8fafc;
}

.week-day:hover {
  color: #374151;
}

.week-day:last-child {
  border-right: none;
}

.weekday {
  color: #6b7280;
}

.weekend {
  color: #dc2626;
  font-weight: 600;
}

/* 今日星期特殊样式 */
.today-weekday {
  color: #8B4513 !important;
  font-weight: 700;
  background: linear-gradient(135deg, #f5e6d3 0%, #ede0cc 100%);
  border-radius: 16px;
  margin: 0 4px;
  border: 1.5px solid #c9a86c;
  box-shadow: 0 1px 4px rgba(139, 115, 85, 0.2);
}

.calendar-body {
  background: var(--paper-light);
  padding: 6px 10px; /* 增加底部padding为transform提供空间 */
  overflow: visible; /* 改为visible，允许子元素溢出 */
  flex: 1;
}

.calendar-grid-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  height: 100%;
  margin-right: 2px;
}

/* 格子之间的分隔 */
.calendar-grid-days > * {
  border-right: 1px solid var(--paper-warm);
  border-bottom: 1px solid var(--paper-warm);
  padding: 5px 8px;
  box-sizing: border-box;
}

/* 移除每行最后一个格子的右边框 */
.calendar-grid-days > *:nth-child(7n) {
  border-right: none;
}

/* 确保最后一列格子的右边框完整显示 */
.calendar-grid-days > *:nth-child(7n) {
  padding-right: 9px;
}

/* 移除最后一行格子的底边框 */
.calendar-grid-days > *:nth-last-child(-n+7) {
  border-bottom: none;
}

@media (max-width: 640px) {
  .calendar-grid {
    font-size: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 4px var(--paper-shadow);
  }

  .week-day {
    padding: 8px 6px;
    font-size: 14px;
    font-weight: 600;
  }

  .calendar-body {
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    height: auto; /* 移动端让内容决定高度 */
  }

  .calendar-grid-days {
    gap: 2px;
    grid-auto-rows: 85px; /* 移动端固定行高 */
    margin-bottom: 0; /* 移动端不需要额外的margin */
  }

  .calendar-grid-days > * {
    border-right: 1px solid var(--paper-warm);
    border-bottom: 1px solid var(--paper-warm);
    height: 85px; /* 移动端固定格子高度 */
  }

  .calendar-grid-days > *:nth-child(7n) {
    border-right: none;
    padding-right: 6px;
  }

  .calendar-grid-days > *:nth-last-child(-n+7) {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    border-radius: 6px;
  }

  .week-day {
    padding: 8px 4px;
    font-size: 14px;
    font-weight: 600;
  }

  .calendar-body {
    padding: 3px 7px;
    display: flex;
    flex-direction: column;
    height: auto; /* 移动端让内容决定高度 */
  }

  .calendar-grid-days {
    gap: 2px;
    grid-auto-rows: 60px; /* 周视图固定行高 */
  }

  .calendar-grid-days > * {
    border-right: 1px solid var(--paper-warm);
    border-bottom: none; /* 周视图只有一行，不需要底边框 */
    height: 60px; /* 周视图固定格子高度 */
  }

  .calendar-grid-days > *:nth-child(7n) {
    border-right: none;
    padding-right: 5px;
  }

  .calendar-grid-days > *:nth-last-child(-n+7) {
    border-bottom: none;
  }
}
</style>