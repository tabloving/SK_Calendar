import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CalendarUtil } from '@/utils/calendar'
import type { CalendarDayInfo, MonthInfo } from '@/types'

export const useCalendarStore = defineStore('calendar', () => {
  // 状态
  const currentDate = ref(new Date())
  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const selectedDate = ref<Date | null>(null)

  // 计算属性
  const currentMonthInfo = computed<MonthInfo>(() => {
    const days = CalendarUtil.getMonthGrid(selectedYear.value, selectedMonth.value)
    const firstDayWeekday = days.findIndex(day => day.isCurrentMonth) % 7
    const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate()

    return {
      year: selectedYear.value,
      month: selectedMonth.value,
      days,
      firstDayWeekday,
      daysInMonth
    }
  })

  const selectedDayInfo = computed<CalendarDayInfo | null>(() => {
    if (!selectedDate.value) return null

    const allDays = currentMonthInfo.value.days
    return allDays.find(day =>
      day.date.getFullYear() === selectedDate.value!.getFullYear() &&
      day.date.getMonth() === selectedDate.value!.getMonth() &&
      day.date.getDate() === selectedDate.value!.getDate()
    ) || null
  })

  const todayInfo = computed<CalendarDayInfo | null>(() => {
    const allDays = currentMonthInfo.value.days
    return allDays.find(day => day.isToday) || null
  })

  // 方法
  const goToToday = () => {
    const today = new Date()
    selectedYear.value = today.getFullYear()
    selectedMonth.value = today.getMonth() + 1
    selectedDate.value = today
    currentDate.value = today
  }

  const goToPreviousMonth = () => {
    if (selectedMonth.value === 1) {
      selectedMonth.value = 12
      selectedYear.value -= 1
    } else {
      selectedMonth.value -= 1
    }
    selectedDate.value = null
  }

  const goToNextMonth = () => {
    if (selectedMonth.value === 12) {
      selectedMonth.value = 1
      selectedYear.value += 1
    } else {
      selectedMonth.value += 1
    }
    selectedDate.value = null
  }

  const goToPreviousYear = () => {
    selectedYear.value -= 1
    selectedDate.value = null
  }

  const goToNextYear = () => {
    selectedYear.value += 1
    selectedDate.value = null
  }

  const selectDate = (date: Date) => {
    selectedDate.value = date
  }

  const goToMonth = (year: number, month: number) => {
    selectedYear.value = year
    selectedMonth.value = month
    selectedDate.value = null
  }

  // 获取指定日期的戒期信息
  const getDayFastingInfo = (date: Date) => {
    return CalendarUtil.getDayFastingInfos({
      date,
      lunarDate: '',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: date.getDay(),
      isToday: CalendarUtil.isToday(date),
      isCurrentMonth: true,
      fastingInfos: []
    })
  }

  // 获取当前月份的戒期统计
  const getMonthFastingStats = computed(() => {
    const stats = {
      major: 0,
      moderate: 0,
      minor: 0,
      safe: 0,
      total: 0
    }

    currentMonthInfo.value.days.forEach(day => {
      if (day.isCurrentMonth) {
        const highestLevel = CalendarUtil.getHighestFastingLevel(day.fastingInfos)
        stats[highestLevel]++
        stats.total++
      }
    })

    return stats
  })

  return {
    // 状态
    currentDate,
    selectedYear,
    selectedMonth,
    selectedDate,

    // 计算属性
    currentMonthInfo,
    selectedDayInfo,
    todayInfo,
    getMonthFastingStats,

    // 方法
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    selectDate,
    goToMonth,
    getDayFastingInfo
  }
})