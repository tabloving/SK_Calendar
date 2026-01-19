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

  // 智能选中辅助函数：月份切换后更新选中日期
  const updateSelectedDateAfterMonthChange = () => {
    const today = new Date()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth() + 1

    // 如果切换后的年份和月份包含今天，则选中今天
    if (selectedYear.value === todayYear && selectedMonth.value === todayMonth) {
      selectedDate.value = today
    } else {
      // 如果不是当前月份，尝试保持之前选中的日期逻辑
      // 如果之前有选中日期，尝试在新月份中选择对应日期
      if (selectedDate.value) {
        const selectedDay = selectedDate.value.getDate()
        const newDate = new Date(selectedYear.value, selectedMonth.value - 1, selectedDay)

        // 检查日期是否有效（防止出现2月30日等无效日期）
        if (newDate.getFullYear() === selectedYear.value &&
            newDate.getMonth() === selectedMonth.value - 1 &&
            newDate.getDate() === selectedDay) {
          selectedDate.value = newDate
        } else {
          // 如果日期无效，选中该月第一天
          selectedDate.value = new Date(selectedYear.value, selectedMonth.value - 1, 1)
        }
      } else {
        // 如果之前没有选中日期，选中该月第一天
        selectedDate.value = new Date(selectedYear.value, selectedMonth.value - 1, 1)
      }
    }
  }

  // 智能选中辅助函数：年份切换后更新选中日期
  const updateSelectedDateAfterYearChange = () => {
    const today = new Date()
    const todayMonth = today.getMonth() + 1
    const todayDay = today.getDate()
    const todayYear = today.getFullYear()

    // 如果切换到当前年份，选中今天
    if (selectedYear.value === todayYear) {
      selectedDate.value = today
    } else {
      // 如果不是当前年份，尝试选中对应的月份和日期
      // 保持当前选中的月份，选择对应日期
      const newDate = new Date(selectedYear.value, selectedMonth.value - 1, todayDay)

      // 检查日期是否有效（防止出现2月30日等无效日期）
      if (newDate.getFullYear() === selectedYear.value &&
          newDate.getMonth() === selectedMonth.value - 1 &&
          newDate.getDate() === todayDay) {
        selectedDate.value = newDate
      } else {
        // 如果日期无效，选中该月第一天
        selectedDate.value = new Date(selectedYear.value, selectedMonth.value - 1, 1)
      }
    }
  }

  const goToPreviousMonth = () => {
    if (selectedMonth.value === 1) {
      selectedMonth.value = 12
      selectedYear.value -= 1
    } else {
      selectedMonth.value -= 1
    }
    // 智能选中：如果切换后的月份包含今天，则选中今天
    updateSelectedDateAfterMonthChange()
  }

  const goToNextMonth = () => {
    if (selectedMonth.value === 12) {
      selectedMonth.value = 1
      selectedYear.value += 1
    } else {
      selectedMonth.value += 1
    }
    // 智能选中：如果切换后的月份包含今天，则选中今天
    updateSelectedDateAfterMonthChange()
  }

  const goToPreviousYear = () => {
    selectedYear.value -= 1
    // 智能选中：选中当年的本月今天
    updateSelectedDateAfterYearChange()
  }

  const goToNextYear = () => {
    selectedYear.value += 1
    // 智能选中：选中当年的本月今天
    updateSelectedDateAfterYearChange()
  }

  const goToPreviousDay = () => {
    if (!selectedDate.value) {
      selectedDate.value = new Date()
    }
    const newDate = new Date(selectedDate.value)
    newDate.setDate(newDate.getDate() - 1)
    selectedDate.value = newDate
    selectedYear.value = newDate.getFullYear()
    selectedMonth.value = newDate.getMonth() + 1
  }

  const goToNextDay = () => {
    if (!selectedDate.value) {
      selectedDate.value = new Date()
    }
    const newDate = new Date(selectedDate.value)
    newDate.setDate(newDate.getDate() + 1)
    selectedDate.value = newDate
    selectedYear.value = newDate.getFullYear()
    selectedMonth.value = newDate.getMonth() + 1
  }

  const selectDate = (date: Date) => {
    selectedDate.value = date
    selectedYear.value = date.getFullYear()
    selectedMonth.value = date.getMonth() + 1
  }

  const goToMonth = (year: number, month: number) => {
    selectedYear.value = year
    selectedMonth.value = month
    // 智能选中：应用月份切换后的选中逻辑
    updateSelectedDateAfterMonthChange()
  }

  // 获取指定日期的戒期信息
  const getDayPreceptInfo = (date: Date) => {
    return CalendarUtil.getDayPreceptInfos({
      date,
      lunarDate: '',
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: date.getDay(),
      isToday: CalendarUtil.isToday(date),
      isCurrentMonth: true,
      preceptInfos: []
    })
  }

  // 获取当前月份的戒期统计
  const getMonthPreceptStats = computed(() => {
    const stats = {
      major: 0,
      moderate: 0,
      minor: 0,
      safe: 0,
      total: 0
    }

    currentMonthInfo.value.days.forEach(day => {
      if (day.isCurrentMonth) {
        const highestLevel = CalendarUtil.getHighestPreceptLevel(day.preceptInfos)
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
    getMonthPreceptStats,

    // 方法
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    goToPreviousDay,
    goToNextDay,
    selectDate,
    goToMonth,
    getDayPreceptInfo
  }
})