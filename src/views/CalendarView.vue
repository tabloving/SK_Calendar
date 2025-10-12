<template>
  <div class="calendar-view">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 左侧日历区域 -->
      <div class="lg:col-span-3 space-y-4">
        <CalendarHeader />
        <CalendarGrid />
      </div>

      <!-- 右侧边栏区域 -->
      <div class="lg:col-span-1">
        <FastingDetail />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import CalendarHeader from '@/components/CalendarHeader.vue'
import CalendarGrid from '@/components/CalendarGrid.vue'
import FastingDetail from '@/components/FastingDetail.vue'
import {
  DataAnalysis,
  Operation,
  Calendar,
  Setting,
  Download
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()

const currentMonthDays = computed(() => {
  return calendarStore.currentMonthInfo.days
})

// 方法
const goToToday = () => {
  calendarStore.goToToday()
  ElMessage.success('已返回今天')
}

const goToSettings = () => {
  router.push('/settings')
}

const exportCalendar = () => {
  // 导出日历功能
  const exportData = {
    year: calendarStore.selectedYear,
    month: calendarStore.selectedMonth,
    fastingStats: calendarStore.getMonthFastingStats,
    days: currentMonthDays.value.filter(day => day.isCurrentMonth).map(day => ({
      date: CalendarUtil.formatDate(day.date),
      lunarDate: day.lunarDate,
      fastingInfos: day.fastingInfos.filter(fasting =>
        settingsStore.settings.enabledFastingTypes.includes(fasting.type)
      ),
      solarTerm: day.solarTerm
    }))
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `寿康宝鉴戒期日历_${calendarStore.selectedYear}年${calendarStore.selectedMonth}月.json`
  link.click()
  URL.revokeObjectURL(url)

  ElMessage.success('日历导出成功')
}

// 生命周期
onMounted(() => {
  // 加载设置
  settingsStore.loadSettings()

  // 如果没有选中日期，默认选中今天
  if (!calendarStore.selectedDate) {
    calendarStore.goToToday()
  }
})
</script>

<style scoped>
.calendar-view {
  padding: 0;
}

.stats-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  /* 平板布局：右侧边栏移动到下方 */
  .calendar-view .grid {
    @apply grid-cols-1;
  }

  .calendar-view .space-y-4 {
    @apply space-y-0;
  }

  .lg\:col-span-1 {
    @apply mt-6;
  }
}
</style>