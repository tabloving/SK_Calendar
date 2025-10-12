<template>
  <div
    class="calendar-day cursor-pointer"
    :class="[
      dayClasses,
      { 'selected': isSelected, 'today': dayInfo.isToday }
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
    <div v-if="settingsStore.settings.showFastingIndicators && hasFasting" class="fasting-indicators mb-1">
      <div class="flex items-center flex-wrap gap-1">
        <div
          v-for="(level, index) in uniqueFastingLevels"
          :key="index"
          class="fasting-indicator"
          :class="level"
          :title="getFastingLevelText(level)"
        ></div>
      </div>
    </div>

    <!-- 节气信息 -->
    <div v-if="dayInfo.solarTerm" class="solar-term text-xs font-semibold text-purple-600 mb-1">
      {{ dayInfo.solarTerm }}
    </div>

    <!-- 戒期详情 -->
    <div v-if="displayFastingInfos.length > 0" class="fasting-details">
      <div class="text-xs space-y-1">
        <div
          v-for="(fasting, index) in displayFastingInfos.slice(0, maxDisplayItems)"
          :key="index"
          class="fasting-item"
          :class="`text-${getFastingLevelColor(fasting.level)}-700`"
        >
          <span class="truncate">{{ fasting.reason }}</span>
        </div>
        <div
          v-if="displayFastingInfos.length > maxDisplayItems"
          class="text-gray-500 text-xs"
        >
          +{{ displayFastingInfos.length - maxDisplayItems }}项
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
import * as lunar from 'lunar-javascript'
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

// 计算属性
const dayClasses = computed(() => {
  const highestLevel = CalendarUtil.getHighestFastingLevel(props.dayInfo.fastingInfos)
  return CalendarUtil.getFastingLevelClass(highestLevel)
})

const hasFasting = computed(() => {
  return filteredFastingInfos.value.length > 0
})

const filteredFastingInfos = computed(() => {
  return props.dayInfo.fastingInfos.filter(fasting =>
    settingsStore.settings.enabledFastingTypes.includes(fasting.type)
  )
})

const displayFastingInfos = computed(() => {
  return filteredFastingInfos.value
})

const uniqueFastingLevels = computed(() => {
  const levels = displayFastingInfos.value.map(info => info.level)
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

const getFastingLevelText = (level: 'major' | 'moderate' | 'minor' | 'safe') => {
  return CalendarUtil.getFastingLevelText(level)
}

const getFastingLevelColor = (level: string) => {
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
  transition: all 0.2s ease;
  overflow: hidden;
}

.calendar-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.calendar-day.selected {
  ring: 2px;
  ring-color: #3B82F6;
  background-color: #EFF6FF;
}

.calendar-day.today {
  border: 2px solid #3B82F6;
}

.calendar-day:not(.is-current-month) {
  opacity: 0.5;
}

.fasting-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.fasting-indicator.major {
  background-color: #DC2626;
}

.fasting-indicator.moderate {
  background-color: #EA580C;
}

.fasting-indicator.minor {
  background-color: #CA8A04;
}

.fasting-indicator.safe {
  background-color: #16A34A;
}

.weekend-indicator {
  top: 2px;
  right: 2px;
}

.fasting-item {
  line-height: 1.2;
  word-break: break-all;
}

@media (max-width: 640px) {
  .calendar-day {
    min-height: 60px;
    padding: 4px;
  }

  .day-header {
    margin-bottom: 2px;
  }

  .fasting-details {
    font-size: 10px;
  }
}
</style>