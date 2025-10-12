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
}

.week-header {
  border-bottom: 1px solid #E5E7EB;
}

.week-day {
  border-right: 1px solid #E5E7EB;
}

.week-day:last-child {
  border-right: none;
}

.calendar-body {
  min-height: 420px;
}

@media (max-width: 640px) {
  .calendar-grid {
    font-size: 12px;
  }

  .week-day {
    padding: 8px 4px;
    font-size: 12px;
  }

  .calendar-body {
    min-height: 300px;
  }
}
</style>