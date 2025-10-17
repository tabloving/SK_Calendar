<template>
  <div class="calendar-view">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- 左侧日历区域 -->
      <div
        class="lg:col-span-3 space-y-3 flex flex-col"
        ref="calendarContainerRef"
        :style="{ height: isDesktopLayout ? 'calc(100vh - 60px)' : 'auto' }">
        <div
          ref="calendarGridRef"
          class="calendar-grid-container"
          :style="{ height: calendarGridHeight + 'px' }">
          <CalendarGrid />
        </div>
      </div>

      <!-- 右侧边栏区域 -->
      <div
        ref="sidebarContainerRef"
        class="lg:col-span-1 bg-white pt-4 pb-4 sidebar-outer-container"
        :style="{ height: isDesktopLayout ? calendarGridHeight + 'px' : 'auto' }">
        <div
          ref="sidebarRef"
          class="sidebar-container">
          <SidebarPanelIndex />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import CalendarGrid from '@/components/CalendarGrid.vue'
import SidebarPanelIndex from '@/components/SidebarPanelIndex.vue'
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

// 快捷搜索关联词汇
// DOM 引用
const calendarGridRef = ref<HTMLElement>()
const calendarContainerRef = ref<HTMLElement>()
const sidebarRef = ref<HTMLElement>()

// 高度状态
const calendarGridHeight = ref(600)

// 检测是否为桌面端并列布局
const isDesktopLayout = ref(window.innerWidth >= 1024)

// 响应式处理窗口大小变化
const handleResize = () => {
  const wasDesktop = isDesktopLayout.value
  isDesktopLayout.value = window.innerWidth >= 1024

  // 更新日历网格高度
  updateCalendarGridHeight()
}

// 响应式数据
const currentMonthDays = computed(() => {
  return calendarStore.currentMonthInfo.days
})

// 更新日历网格高度，充满可视区域
const updateCalendarGridHeight = async () => {
  await nextTick()

  if (isDesktopLayout.value) {
    // 桌面端：让日历充满可用的可视空间
    const viewportHeight = window.innerHeight

    // 计算日历可用高度：视口高度减去顶部导航栏和侧边栏边距
    // 减去约80px的页面顶部空间和底部边距
    const calendarHeight = viewportHeight - 80

    // 设置合理的高度范围
    const newHeight = Math.max(600, Math.min(calendarHeight, viewportHeight - 100))

    calendarGridHeight.value = newHeight
  } else {
    // 移动端使用合理的固定高度
    calendarGridHeight.value = 400
  }
}

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
    preceptStats: calendarStore.getMonthPreceptStats,
    days: currentMonthDays.value
      .filter(day => day.isCurrentMonth)
      .map(day => ({
        date: CalendarUtil.formatDate(day.date),
        lunarDate: day.lunarDate,
        preceptInfos: day.preceptInfos.filter(precept =>
          settingsStore.settings.enabledPreceptTypes.includes(precept.type)
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
onMounted(async () => {
  // 加载设置
  settingsStore.loadSettings()

  // 如果没有选中日期，默认选中今天
  if (!calendarStore.selectedDate) {
    calendarStore.goToToday()
  }

  // 初始化高度计算
  await nextTick()
  updateCalendarGridHeight()

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)

  // 监听月份变化（当用户切换月份时更新高度）
  const unwatchMonth = calendarStore.$subscribe((mutation, state) => {
    // 监听 store 中任何可能导致日历高度变化的状态
    if (mutation.type === 'direct') {
      nextTick(() => {
        updateCalendarGridHeight()
      })
    }
  })

  // 组件卸载时清理监听器
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    unwatchMonth()
  })
})
</script>

<style scoped>
.calendar-view {
  padding: 0;
  height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
  overflow: hidden;
}

.calendar-grid-container {
  transition: height 0.3s ease;
  overflow: hidden;
}

.sidebar-outer-container {
  transition: height 0.3s ease;
  overflow-y: auto;
}

.sidebar-container {
  transition: height 0.3s ease;
  min-height: auto;
}

/* 桌面端（并列显示）时的样式 */
@media (min-width: 1024px) {
  .sidebar-container {
    min-height: 100%;
  }
}

.stats-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  /* 平板布局：右侧边栏移动到下方 */
  .calendar-view .grid {
    @apply grid-cols-1 gap-3;
  }

  .calendar-view .space-y-3 {
    @apply space-y-2;
  }

  .lg\:col-span-1 {
    @apply mt-3;
  }
}

@media (max-width: 768px) {
  .calendar-view {
    @apply px-2;
  }

  .calendar-view .grid {
    @apply gap-2;
  }

  .calendar-view .space-y-3 {
    @apply space-y-1;
  }

  .lg\:col-span-1 {
    @apply mt-2;
  }
}
</style>
