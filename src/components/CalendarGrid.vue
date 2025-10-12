<template>
  <div class="calendar-grid bg-white rounded-lg shadow-sm overflow-hidden">
    <!-- 星期标题 -->
    <div class="week-header grid grid-cols-7 bg-gray-50 border-b">
      <div
        v-for="(day, index) in weekDays"
        :key="index"
        class="week-day py-3 text-center font-semibold text-sm"
        :class="{ 'text-red-600': index === 0 || index === 6 }"
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

    <!-- 日期详情弹出模态框 -->
    <DayDetailModal
      :visible="showDayDetail"
      :day-info="selectedDayForModal"
      @close="closeDayDetail"
      @add-to-calendar="handleAddToCalendar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { ElMessage } from 'element-plus'
import CalendarDay from './CalendarDay.vue'
import DayDetailModal from './DayDetailModal.vue'
import type { CalendarDayInfo } from '@/types'

const calendarStore = useCalendarStore()

// 星期标题
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 响应式数据
const showDayDetail = ref(false)
const selectedDayForModal = ref<CalendarDayInfo | null>(null)

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
  // 同时打开详情弹窗
  selectedDayForModal.value = dayInfo
  showDayDetail.value = true
}

const closeDayDetail = () => {
  showDayDetail.value = false
  selectedDayForModal.value = null
}

const handleAddToCalendar = (dayInfo: CalendarDayInfo) => {
  // 这里可以集成系统日历或提醒功能
  ElMessage.success('已添加到提醒事项')

  // 可以在这里实现实际的日历集成
  // 例如：调用系统日历API或导出.ics文件
  console.log('添加到日历:', dayInfo)
}
</script>

<style scoped>
.calendar-grid {
  user-select: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.week-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.week-day {
  border-right: 1px solid #e2e8f0;
  padding: 12px 8px;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s ease;
}

.week-day:hover {
  background: #f1f5f9;
  color: #475569;
}

.week-day:last-child {
  border-right: none;
}

.week-day:nth-child(1),
.week-day:nth-child(7) {
  color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, rgba(252, 165, 165, 0.03) 100%);
}

.calendar-body {
  min-height: 450px;
  background: #ffffff;
  padding: 6px;
}

.calendar-body .grid {
  gap: 6px;
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
  padding: 4px;
}

@media (max-width: 640px) {
  .calendar-grid {
    font-size: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  }

  .week-day {
    padding: 10px 6px;
    font-size: 12px;
    font-weight: 500;
  }

  .calendar-body {
    min-height: 350px;
    padding: 4px;
  }

  .calendar-body .grid {
    gap: 4px;
  }

  .calendar-body .grid > * {
    border-right: 1px solid #f8fafc;
    border-bottom: 1px solid #f8fafc;
  }

  .calendar-body .grid > *:nth-child(7n) {
    border-right: none;
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
    padding: 8px 4px;
    font-size: 11px;
  }

  .calendar-body {
    min-height: 300px;
    padding: 2px;
  }

  .calendar-body .grid {
    gap: 3px;
  }

  .calendar-body .grid > * {
    border-right: 1px solid #f8fafc;
    border-bottom: 1px solid #f8fafc;
  }

  .calendar-body .grid > *:nth-child(7n) {
    border-right: none;
  }

  .calendar-body .grid > *:nth-last-child {
    border-bottom: none;
  }
}
</style>