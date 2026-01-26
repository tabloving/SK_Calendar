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
          'weekday': index > 0 && index < 6
        }"
      >
        {{ day }}
      </div>
    </div>

    <!-- 日历格子 -->
    <div class="calendar-body flex-1">
      <div class="calendar-grid-days" :class="{ 'week-view': isMobile }">
        <CalendarDay
          v-for="dayInfo in displayDays"
          :key="`${dayInfo.year}-${dayInfo.month}-${dayInfo.day}`"
          :day-info="dayInfo"
          :is-selected="isSelected(dayInfo)"
          @click="handleDayClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import CalendarDay from './CalendarDay.vue'
import type { CalendarDayInfo } from '@/types'

const calendarStore = useCalendarStore()

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

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

// 方法
const isSelected = (dayInfo: CalendarDayInfo) => {
  if (!calendarStore.selectedDate) return false

  return dayInfo.date.getFullYear() === calendarStore.selectedDate.getFullYear() &&
         dayInfo.date.getMonth() === calendarStore.selectedDate.getMonth() &&
         dayInfo.date.getDate() === calendarStore.selectedDate.getDate()
}

const handleDayClick = (dayInfo: CalendarDayInfo) => {
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