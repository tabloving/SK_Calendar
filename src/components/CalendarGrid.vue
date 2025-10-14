<template>
  <div class="calendar-grid bg-white rounded-lg shadow-sm">
    <!-- 星期标题 -->
    <div class="week-header grid grid-cols-7 bg-white border-b border-gray-100">
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
    <div class="calendar-body">
      <div class="grid grid-cols-7">
        <CalendarDay
          v-for="dayInfo in currentMonthDays"
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
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import CalendarDay from './CalendarDay.vue'
import type { CalendarDayInfo } from '@/types'

const calendarStore = useCalendarStore()

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 计算属性
const currentMonthDays = computed(() => {
  return calendarStore.currentMonthInfo.days
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.week-header {
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
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
  min-height: 450px;
  background: #ffffff;
  padding: 6px 10px;
  overflow: visible;
}

.calendar-body .grid {
  gap: 3px;
  margin-right: 2px;
}

/* 格子之间的分隔 */
.calendar-body .grid > * {
  border-right: 1px solid #f8fafc;
  border-bottom: 1px solid #f8fafc;
}

/* 移除每行最后一个格子的右边框 */
.calendar-body .grid > *:nth-child(7n) {
  border-right: none;
}

/* 移除最后一行格子的底边框 */
.calendar-body .grid > *:nth-last-child {
  border-bottom: none;
}

/* 整体容器内边距优化 */
.calendar-grid .grid-cols-7 > * {
  padding: 5px 8px;
  box-sizing: border-box;
}

/* 确保最后一列格子的右边框完整显示 */
.calendar-grid .grid-cols-7 > *:nth-child(7n) {
  padding-right: 9px;
}

@media (max-width: 640px) {
  .calendar-grid {
    font-size: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  }

  .week-day {
    padding: 12px 6px;
    font-size: 12px;
    font-weight: 500;
  }

  .week-day {
    padding: 6px;
    font-size: 12px;
  }

  .calendar-body {
    min-height: 350px;
    padding: 4px 8px;
  }

  .calendar-body .grid {
    gap: 2px;
  }

  .calendar-body .grid > * {
    border-right: 1px solid #f8fafc;
    border-bottom: 1px solid #f8fafc;
  }

  .calendar-body .grid > *:nth-child(7n) {
    border-right: none;
    padding-right: 6px;
  }

  .calendar-body .grid > *:nth-last-child {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .calendar-grid {
    border-radius: 6px;
  }

  .week-day {
    padding: 10px 4px;
    font-size: 11px;
  }

  .week-day {
    padding: 5px;
    font-size: 11px;
  }

  .calendar-body {
    min-height: 300px;
    padding: 3px 7px;
  }

  .calendar-body .grid {
    gap: 2px;
  }

  .calendar-body .grid > * {
    border-right: 1px solid #f8fafc;
    border-bottom: 1px solid #f8fafc;
  }

  .calendar-body .grid > *:nth-child(7n) {
    border-right: none;
    padding-right: 5px;
  }

  .calendar-body .grid > *:nth-last-child {
    border-bottom: none;
  }
}
</style>