<template>
  <div
    class="calendar-day cursor-pointer"
    :class="[
      dayClasses,
      { 'selected': isSelected, 'today': dayInfo.isToday, 'is-current-month': dayInfo.isCurrentMonth }
    ]"
    @click="handleClick"
  >
    <!-- 日期头部 -->
    <div class="day-header flex items-center justify-between mb-1">
      <div class="solar-date">
        <span class="font-semibold" :class="{ 'text-blue-600': dayInfo.isToday }">
          {{ dayInfo.day }}
        </span>
      </div>
      <div class="lunar-date text-xs text-gray-600 font-medium">
        <span v-if="lunarInfo.isLeap" class="text-red-500 mr-1">闰</span>
        {{ lunarInfo.full }}
      </div>
    </div>

    <!-- 干支信息 -->
    <div v-if="ganZhiInfo && ganZhiInfo.dayGanZhi" class="ganzhi-info text-xs text-purple-600 mb-1">
      {{ ganZhiInfo.dayGanZhi }}
    </div>


    <!-- 戒期指示器 -->
    <div v-if="settingsStore.settings.showPreceptIndicators && hasPrecept" class="precept-indicators mb-1">
      <div class="flex items-center flex-wrap gap-1">
        <div
          v-for="(level, index) in uniquePreceptLevels"
          :key="index"
          class="precept-indicator"
          :class="level"
          :title="getPreceptLevelText(level)"
        ></div>
      </div>
    </div>

    <!-- 节气信息 -->
    <div v-if="dayInfo.solarTerm" class="solar-term text-xs font-semibold text-purple-600 mb-1">
      {{ dayInfo.solarTerm }}
    </div>

    <!-- 戒期详情 -->
    <div v-if="displayPreceptInfos.length > 0" class="precept-details">
      <div class="text-xs space-y-1">
        <div
          v-for="(precept, index) in displayPreceptInfos.slice(0, maxDisplayItems)"
          :key="index"
          class="precept-item"
          :class="`text-${getPreceptLevelColor(precept.level)}-700`"
        >
          <span class="truncate">{{ precept.reason }}</span>
        </div>
        <div
          v-if="displayPreceptInfos.length > maxDisplayItems"
          class="text-gray-500 text-xs"
        >
          +{{ displayPreceptInfos.length - maxDisplayItems }}项
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import { PreceptDataManager } from '@/utils/precept-data'
import * as lunar from 'lunar-javascript'
import { Calendar, Bell } from '@element-plus/icons-vue'
import type { CalendarDayInfo } from '@/types'

interface Props {
  dayInfo: CalendarDayInfo
  isSelected?: boolean
  maxDisplayItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  maxDisplayItems: 2
})

const emit = defineEmits<{
  click: [dayInfo: CalendarDayInfo]
}>()

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()
const preceptManager = PreceptDataManager.getInstance()

// 计算属性
const dayClasses = computed(() => {
  const highestLevel = CalendarUtil.getHighestPreceptLevel(props.dayInfo.preceptInfos)
  return CalendarUtil.getPreceptLevelClass(highestLevel)
})

const hasPrecept = computed(() => {
  return filteredPreceptInfos.value.length > 0
})

const filteredPreceptInfos = computed(() => {
  return props.dayInfo.preceptInfos.filter(precept =>
    settingsStore.settings.enabledPreceptTypes.includes(precept.type)
  )
})

const displayPreceptInfos = computed(() => {
  return filteredPreceptInfos.value
})

const uniquePreceptLevels = computed(() => {
  const levels = displayPreceptInfos.value.map(info => info.level)
  return [...new Set(levels)]
})

const lunarInfo = computed(() => {
  const { month, day, full } = CalendarUtil.getLunarMonthDay(props.dayInfo.date)
  let isLeap = false

  // 获取闰月信息
  try {
    const solar = lunar.Solar.fromDate(props.dayInfo.date)
    const lunarDate = solar.getLunar()
    isLeap = lunarDate.isLeap()
  } catch (error) {
    console.warn('获取闰月信息失败', error)
  }

  return {
    month,
    day,
    full,
    isLeap
  }
})

const ganZhiInfo = computed(() => {
  if (!props.dayInfo.ganZhi) return null

  return {
    dayGanZhi: props.dayInfo.ganZhi.dayGanZhi || '',
    monthGanZhi: props.dayInfo.ganZhi.monthGanZhi || '',
    yearGanZhi: props.dayInfo.ganZhi.yearGanZhi || ''
  }
})


// 方法
const handleClick = () => {
  emit('click', props.dayInfo)
}

const getPreceptLevelText = (level: 'major' | 'moderate' | 'minor' | 'safe') => {
  return CalendarUtil.getPreceptLevelText(level)
}

const getPreceptLevelColor = (level: string) => {
  const colorMap = {
    major: 'red',
    moderate: 'orange',
    minor: 'yellow',
    safe: 'green'
  }
  return colorMap[level as keyof typeof colorMap] || 'gray'
}
</script>

<style scoped>
.calendar-day {
  position: relative;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  min-height: 110px;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
}

.calendar-day:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(59, 130, 246, 0.2);
}

.calendar-day.selected {
  border: none;
  background-color: #EFF6FF;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15),
              inset 0 0 0 1px #3B82F6; /* 统一使用内阴影作为边框 */
  transform: scale(1.01);
}

.calendar-day.today {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
}



/* 今天日期文字低调强调 */
.calendar-day.today .solar-date span {
  color: #3B82F6;
  font-weight: 600;
}

.calendar-day:not(.is-current-month) {
  opacity: 0.5;
}

/* 确保选中状态在非当前月份时也可见 */
.calendar-day.selected:not(.is-current-month) {
  opacity: 0.7;
  border: none;
  background-color: #EFF6FF;
  box-shadow: inset 0 0 0 1px #3B82F6;
}

/* 恢复原有戒期等级填充色，去除左边框 */
.calendar-day.precept-major {
  background-color: rgba(220, 38, 38, 0.08);
}

.calendar-day.precept-moderate {
  background-color: rgba(234, 88, 12, 0.08);
}

.calendar-day.precept-minor {
  background-color: rgba(202, 138, 4, 0.08);
}

.calendar-day.precept-safe {
  background-color: rgba(22, 163, 74, 0.08);
}

/* 戒期状态的悬停效果 */
.calendar-day.precept-major:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(220, 38, 38, 0.25);
}

.calendar-day.precept-moderate:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(234, 88, 12, 0.25);
}

.calendar-day.precept-minor:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(202, 138, 4, 0.25);
}

.calendar-day.precept-safe:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(22, 163, 74, 0.25);
}

/* 选中状态与戒期状态的组合处理 */
.calendar-day.selected.precept-major {
  background-color: rgba(220, 38, 38, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #DC2626;
}

.calendar-day.selected.precept-moderate {
  background-color: rgba(234, 88, 12, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #EA580C;
}

.calendar-day.selected.precept-minor {
  background-color: rgba(202, 138, 4, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #CA8A04;
}

.calendar-day.selected.precept-safe {
  background-color: rgba(22, 163, 74, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #16A34A;
}

/* 选中状态下的悬停效果 */
.calendar-day.selected:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05),
              inset 0 0 0 1px #3B82F6;
}

.precept-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.precept-indicator:hover {
  transform: scale(1.2);
}

.precept-indicator.major {
  background-color: #DC2626;
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.2);
}

.precept-indicator.moderate {
  background-color: #EA580C;
  box-shadow: 0 1px 3px rgba(234, 88, 12, 0.2);
}

.precept-indicator.minor {
  background-color: #CA8A04;
  box-shadow: 0 1px 3px rgba(202, 138, 4, 0.2);
}

.precept-indicator.safe {
  background-color: #16A34A;
  box-shadow: 0 1px 3px rgba(22, 163, 74, 0.2);
}

.weekend-indicator {
  top: 4px;
  right: 4px;
}

.precept-item {
  line-height: 1.3;
  word-break: break-all;
  font-size: 11px;
  font-weight: 500;
  color: #374151;
}

/* 增强日期头部样式 */
.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #f0f0f0;
}

.solar-date span {
  display: block;
  margin-bottom: 2px;
}

.lunar-date {
  display: block;
}

.ganzhi-info {
  margin: 6px 0;
  font-size: 10px;
  text-align: center;
  padding: 3px 4px;
  background: rgba(147, 51, 234, 0.05);
  border-radius: 4px;
  border-left: 2px solid #9333ea;
}

.precept-indicators {
  margin: 5px 0;
}

.precept-details {
  margin-top: 6px;
}

.solar-term {
  margin: 6px 0;
  font-size: 10px;
  text-align: center;
  padding: 3px 6px;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
  border-radius: 4px;
  border-left: 2px solid #9333ea;
}

@media (max-width: 640px) {
  .calendar-day {
    min-height: 85px;
    padding: 7px 10px;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .day-header {
    margin-bottom: 4px;
  }

  .solar-date {
    font-size: 13px;
  }

  .lunar-date {
    font-size: 10px;
  }

  .precept-details {
    font-size: 10px;
    margin-top: 4px;
  }

  .precept-indicator {
    width: 6px;
    height: 6px;
    margin-right: 2px;
  }

  .ganzhi-info,
  .solar-term {
    font-size: 10px;
    margin: 3px 0;
  }
}

@media (max-width: 480px) {
  .calendar-day {
    min-height: 75px;
    padding: 5px 8px;
    box-sizing: border-box;
  }

  .day-header {
    margin-bottom: 3px;
  }

  .precept-details {
    margin-top: 3px;
  }
}
</style>