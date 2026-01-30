<template>
  <div
    class="calendar-day"
    :class="[
      dayClasses,
      {
        'selected': isSelected || dayInfo.isToday,
        'today': dayInfo.isToday,
        'is-current-month': dayInfo.isCurrentMonth,
        'is-disabled': isDisabled,
        'cursor-pointer': !isDisabled,
        'cursor-not-allowed': isDisabled
      }
    ]"
    @click="handleClick"
  >
    <!-- 日期头部 -->
    <div class="day-header flex items-center justify-between mb-1">
      <div class="solar-date">
        <span class="solar-day-text" :class="{ 'text-blue-600': dayInfo.isToday }">
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


    <!-- 戒期详情 -->
    <div v-if="displayPreceptInfos.length > 0" class="precept-details">
      <div class="text-xs space-y-1">
        <div
          v-for="(precept, index) in displayPreceptInfos.slice(0, maxDisplayItems)"
          :key="index"
          class="precept-item"
          :class="`text-${getPreceptLevelColor(precept.level)}-700`"
        >
          <span class="truncate">{{ getDisplayReason(precept.reason) }}</span>
        </div>
        <div
          v-if="displayPreceptInfos.length > maxDisplayItems"
          class="extra-count text-xs"
        >
          +{{ displayPreceptInfos.length - maxDisplayItems }}项
        </div>
      </div>
    </div>

    <!-- 节气信息 - 右下角 -->
    <div v-if="dayInfo.solarTerm" class="solar-term-corner">
      <div class="solar-term-content">
        <span class="solar-term-icon">{{ solarTermIcon }}</span>
        <span class="solar-term-text">{{ dayInfo.solarTerm }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import { PreceptDataManager } from '@/utils/precept'
import * as lunar from 'lunar-javascript'
import { Calendar, Bell } from '@element-plus/icons-vue'
import type { CalendarDayInfo } from '@/types'
import { PreceptLevel } from '@/types'
import { SOLAR_TERM_ICONS } from '@/constants'

interface Props {
  dayInfo: CalendarDayInfo
  isSelected?: boolean
  isDisabled?: boolean
  maxDisplayItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  isDisabled: false,
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
  return indicatorPreceptInfos.value.length > 0
})

const filteredPreceptInfos = computed(() => {
  return props.dayInfo.preceptInfos.filter(precept =>
    settingsStore.settings.enabledPreceptTypes.includes(precept.type)
  )
})

// 用于显示戒期指示器的戒期信息
const indicatorPreceptInfos = computed(() => {
  return filteredPreceptInfos.value
})

const displayPreceptInfos = computed(() => {
  return filteredPreceptInfos.value
})

const uniquePreceptLevels = computed(() => {
  const levels = indicatorPreceptInfos.value.map(info => info.level)
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

// 获取节气对应的icon
const solarTermIcon = computed(() => {
  if (!props.dayInfo.solarTerm) return '🌿'
  return SOLAR_TERM_ICONS[props.dayInfo.solarTerm] || '🌿'
})


// 方法
const handleClick = () => {
  emit('click', props.dayInfo)
}

const getPreceptLevelText = (level: PreceptLevel) => {
  return CalendarUtil.getPreceptLevelText(level)
}

const getPreceptLevelColor = (level: string) => {
  const colorMap = {
    major: 'red',
    moderate: 'purple',
    minor: 'blue',
    safe: 'green'
  }
  return colorMap[level as keyof typeof colorMap] || 'gray'
}

const getDisplayReason = (reason: string): string => {
  // 如果文本很短，直接返回
  if (reason.length <= 8) return reason

  // 长文本简化规则
  const simplifications: Record<string, string> = {
    '玉帝校世人神气禄命': '玉帝校命',
    '万神都会': '万神会',
    '五殿阎罗天子诞': '五殿阎王诞',
    '东方持国天王、南方增长天王、西方广目天王、北方多闻天王': '四天王',
    '三元降': '三元降',
    '上元神会': '上元会',
    '长春真人诞': '长春真人',
    '三尸神奏事': '三尸奏事',
    '天地仓开日': '天地仓开日',
    '天仓开日': '天仓开日',
    '一殿秦广王诞': '秦广王诞',
    '文昌帝君诞': '文昌诞',
    '东华帝君诞': '东华帝诞',
    '释迦牟尼佛出家': '佛出家',
    '三殿宋帝王诞': '宋帝王诞',
    '太上老君诞': '老君诞',
    '二殿楚江王诞': '楚江王诞',
    '六殿卞城王诞': '卞城王诞',
    '昊天上帝诞': '玉帝诞',
    '准提菩萨诞': '准提诞',
    '八殿都市王诞': '都市王诞',
    '九殿平等王诞': '平等王诞',
    '十殿转轮王诞': '转轮王诞',
    '南方五道诞': '南方五道',
    '金粟如来诞': '金粟如来',
    '井泉龙王诞': '井泉龙王',
    '中会日': '中会日',
    '五帝校生人善恶': '五帝校善恶',
    '道德腊': '道德腊',
    '中央五道诞': '中央五道',
    '东岳大帝诞': '东岳诞',
    '至圣先师孔子讳辰': '孔子诞',
    '观世音菩萨出家日': '观音出家',
    '天下都城隍诞': '都城隍诞',
    '北方五道诞': '北方五道',
    '西方五道诞': '西方五道',
    '西王母诞': '王母诞',
    '太岁诞': '太岁诞',
    '增福财神诞': '财神诞',
    '华严菩萨诞': '华严诞',
    '地藏菩萨诞': '地藏诞',
    '大势至菩萨诞': '大势至诞',
    '文殊菩萨诞': '文殊诞',
    '普贤菩萨诞': '普贤诞',
    '释迦牟尼佛诞': '佛诞',
    '释迦如来成道日': '佛成道',
    '药师琉璃光佛诞': '药师佛诞',
    '阿弥陀佛诞': '弥陀诞',
    '苍颉至圣先师诞': '苍颉诞',
    '北极紫薇大帝降': '紫薇降',
    '南斗、北斗、西斗同降': '三星同降',
    '四天会事': '四天会',
    '诸神下降，察访善恶': '诸神察访',
    '司命朝天奏人善恶': '司命奏善恶',
    '三清玉帝同降，考察善恶': '三清降',
    '五岳神降': '五岳降',
    '天地仓开日，犯者损寿，子带疾': '仓开日',
    '太阴朝元，宜焚香守夜': '太阴朝元',
    '天曹掠刷真君降': '天曹降',
    '天人兴福之辰，宜斋戒，存想吉事': '天人兴福',
    '汉桓侯张显王诞': '张王诞',
    '灶君夫人诞': '灶君夫人',
    '金栗如来诞': '金粟如来',
    '眼观圣母诞': '眼光圣母',
    '长真谭真人诞': '谭真人诞',
    '金龙四大王诞': '金龙王诞',
    '孟婆尊神诞': '孟婆诞',
    '炳灵公诞': '炳灵公诞',
    '孝娥神诞': '孝娥诞',
    '雷祖诞': '雷祖诞',
    '南赡部洲转大法轮': '转法轮',
    '天猷上帝诞': '天猷帝诞',
    '太素三元君朝真': '三元君朝真',
    '天乙救苦天尊诞': '天尊诞',
    '雷声大帝诞': '雷帝诞',
    '许真君诞': '许真君诞',
    '张大帝诞': '张帝诞',
    '张天师诞': '天师诞',
    '钟离祖师诞': '钟离诞',
    '纯阳祖师诞': '纯阳诞',
    '玄坛诞': '玄坛诞',
    '东方杜将军诞': '杜将军诞',
    '张仙诞': '张仙诞',
    '南方火神诞': '火神诞',
    '关帝诞': '关帝诞',
    '关圣降神': '关圣降',
    '子孙娘娘诞': '子孙娘娘',
    '后土娘娘诞': '后土娘娘',
    '中岳大帝诞': '中岳大帝',
    '西岳大帝诞': '西岳大帝',
    '南岳大帝诞': '南岳大帝',
    '北岳大帝诞': '北岳大帝',
    '南极长生大帝诞': '长生帝诞',
    '紫微大帝诞': '紫微大帝',
    '北斗大帝诞': '北斗大帝',
    '南斗诞': '南斗诞',
    '斗母诞': '斗母诞',
    '酆都大帝诞': '酆都大帝',
    '天地元气造化万物之辰': '天地造化',
    '天地交道促寿': '天地交道',
    '民岁腊': '民岁腊',
    '王侯腊': '王侯腊',
    '地腊': '地腊',
    '天腊': '天腊'
  }

  // 检查是否有直接匹配的简化
  if (simplifications[reason]) {
    return simplifications[reason]
  }

  // 检查部分匹配
  for (const [long, short] of Object.entries(simplifications)) {
    if (reason.includes(long)) {
      return short
    }
  }

  // 如果没有找到匹配，尝试智能截断
  if (reason.includes('，')) {
    const parts = reason.split('，')
    return parts[0].trim()
  }

  // 如果超过10个字符，截断并添加省略号
  if (reason.length > 10) {
    return reason.substring(0, 8) + '...'
  }

  return reason
}

</script>

<style scoped>
.calendar-day {
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease, background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid var(--paper-border);
  background: var(--paper-light);
  height: 100%;
  min-height: 120px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px var(--paper-shadow);
  box-sizing: border-box;
}

.calendar-day:not(.selected):hover {
  box-shadow: 0 2px 8px var(--paper-shadow),
              inset 0 0 0 1px rgba(59, 130, 246, 0.2);
}

.calendar-day.selected {
  border: none;
  background-color: #EFF6FF;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15),
              inset 0 0 0 1px #3B82F6; /* 统一使用内阴影作为边框 */
}

.calendar-day.selected:not(.today) {
  transform: scale(1.01);
}

.calendar-day:not(.is-current-month) {
  opacity: 0.3;
}

/* 禁用状态样式 */
.calendar-day.is-disabled {
  opacity: 0.25;
  filter: grayscale(0.5);
  cursor: default;
}

.calendar-day.is-disabled:hover {
  box-shadow: none;
  transform: none;
}

/* 确保选中状态在非当前月份时也可见 */
.calendar-day.selected:not(.is-current-month) {
  opacity: 0.5;
  border: none;
  background-color: #EFF6FF;
  box-shadow: inset 0 0 0 1px #3B82F6;
}

/* 戒期等级填充色 - 降低透明度使整体更柔和 */
.calendar-day.precept-major {
  background-color: rgba(220, 38, 38, 0.035);
}

.calendar-day.precept-moderate {
  background-color: rgba(139, 92, 246, 0.035);
}

.calendar-day.precept-minor {
  background-color: rgba(59, 130, 246, 0.03);
}

.calendar-day.precept-safe {
  background-color: rgba(22, 163, 74, 0.025);
}

/* 戒期状态的悬停效果 */
.calendar-day.precept-major:not(.selected):hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(220, 38, 38, 0.25);
}

.calendar-day.precept-moderate:not(.selected):hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(139, 92, 246, 0.25);
}

.calendar-day.precept-minor:not(.selected):hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(59, 130, 246, 0.25);
}

.calendar-day.precept-safe:not(.selected):hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(22, 163, 74, 0.25);
}

/* 选中状态与戒期状态的组合处理 */
.calendar-day.selected.precept-major {
  background-color: rgba(220, 38, 38, 0.08);
  border: none;
  box-shadow: inset 0 0 0 1px #DC2626;
}

.calendar-day.selected.precept-moderate {
  background-color: rgba(139, 92, 246, 0.08);
  border: none;
  box-shadow: inset 0 0 0 1px #8B5CF6;
}

.calendar-day.selected.precept-minor {
  background-color: rgba(59, 130, 246, 0.08);
  border: none;
  box-shadow: inset 0 0 0 1px #3B82F6;
}

.calendar-day.selected.precept-safe {
  background-color: rgba(22, 163, 74, 0.08);
  border: none;
  box-shadow: inset 0 0 0 1px #16A34A;
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
  background-color: #8B5CF6;
  box-shadow: 0 1px 3px rgba(139, 92, 246, 0.2);
}

.precept-indicator.minor {
  background-color: #3B82F6;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.2);
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
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
}

/* 今日戒期文本保持原色 */
.calendar-day.today .precept-item {
  color: #374151;
}

/* 选中日期戒期文本 */
.calendar-day.selected .precept-item {
  color: #6b7280;
}

/* 额外项数文本 */
.extra-count {
  color: #9ca3af;
}

.calendar-day.today .extra-count {
  color: #6b7280;
}

.calendar-day.selected .extra-count {
  color: #6b7280;
}

/* 增强日期头部样式 */
.day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--paper-warm);
}

.solar-date span {
  display: block;
  margin-bottom: 2px;
}

.solar-day-text {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  font-family: 'Gravitas One', cursive;
  color: #9ca3af;
}

/* 选中日期阳历文字 */
.calendar-day.selected .solar-day-text {
  color: #6b7280;
}

/* 今日阳历文字 */
.calendar-day.today .solar-day-text {
  color: #3B82F6;
}

.lunar-date {
  display: block;
  color: #9ca3af;
  font-size: 13px;
}

/* 选中日期农历文字 */
.calendar-day.selected .lunar-date {
  color: #6b7280;
}

/* 今日农历保持原色 */
.calendar-day.today .lunar-date {
  color: #4b5563;
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
  margin: 4px 0;
}

.solar-term-content {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  padding: 2px 5px;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: 4px;
  border: 1px solid rgba(147, 51, 234, 0.2);
  box-shadow: 0 1px 2px rgba(147, 51, 234, 0.1);
  transition: all 0.2s ease;
  line-height: 1.2;
}

.solar-term-content:hover {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border-color: rgba(147, 51, 234, 0.3);
}

.solar-term-icon {
  font-size: 12px;
  line-height: 1;
}

.solar-term-text {
  font-weight: 600;
  color: #7c3aed;
  white-space: nowrap;
}

/* 右下角节气样式 */
.solar-term-corner {
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: 2;
}

.solar-term-corner .solar-term-content {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  padding: 2px 5px;
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: 4px;
  border: 1px solid rgba(147, 51, 234, 0.2);
  box-shadow: 0 1px 2px rgba(147, 51, 234, 0.1);
  transition: all 0.2s ease;
  line-height: 1.2;
}

.solar-term-corner .solar-term-content:hover {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border-color: rgba(147, 51, 234, 0.3);
}

.solar-term-corner .solar-term-icon {
  font-size: 11px;
  line-height: 1;
}

.solar-term-corner .solar-term-text {
  font-weight: 600;
  color: #7c3aed;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .calendar-day {
    height: 85px !important;
    min-height: 85px !important;
    max-height: 85px !important;
    padding: 7px 10px;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .day-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 4px;
    padding-bottom: 0;
    border-bottom: none;
  }

  .solar-day-text {
    font-size: 22px;
    opacity: 0.4;
  }

  /* 非本月日期整体更淡 */
  .calendar-day:not(.is-current-month) {
    opacity: 0.3;
  }

  /* 今日阳历不减淡 */
  .calendar-day.today .solar-day-text {
    opacity: 1;
  }

  /* 选中日期阳历不减淡 */
  .calendar-day.selected .solar-day-text {
    opacity: 1;
    color: #3B82F6;
  }

  .lunar-date {
    font-size: 11px;
    margin-top: 2px;
  }

  /* 隐藏戒期详情文本 */
  .precept-details {
    display: none !important;
  }

  .precept-indicator {
    width: 6px;
    height: 6px;
    margin-right: 2px;
  }

  .ganzhi-info {
    font-size: 10px;
    margin: 3px 0;
  }

  .solar-term {
    margin: 2px 0;
  }

  .solar-term-content {
    padding: 1px 4px;
    font-size: 8px;
    gap: 1px;
  }

  .solar-term-icon {
    font-size: 9px;
  }

  .solar-term-corner {
    bottom: 4px;
    right: 4px;
  }

  .solar-term-corner .solar-term-content {
    font-size: 9px;
    padding: 1px 3px;
  }

  .solar-term-corner .solar-term-icon {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .calendar-day {
    height: 70px !important;
    min-height: 70px !important;
    max-height: 70px !important;
    padding: 8px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 垂直居中 */
    /* 统一所有状态的边框，避免位置跳动 */
    border: 1px solid transparent !important;
    background: transparent !important;
    box-shadow: none !important;
    transition: none !important;
    transform: none !important;
  }

  .day-header {
    position: static;
    transform: none;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
    width: 100%;
    gap: 2px;
  }

  .solar-date {
    text-align: center;
    position: static;
    transform: none;
    z-index: 1;
    width: 100%;
  }

  .solar-date span {
    margin-bottom: 0;
  }

  /* 阳历日期样式 */
  .solar-day-text {
    font-size: 20px;
    font-weight: 700;
    opacity: 0.5;
    color: #374151;
    line-height: 1.2;
  }

  /* 非今日选中状态下阳历日期 - 字号不变，颜色稍淡 */
  .calendar-day.selected:not(.today) .solar-day-text {
    font-size: 20px;
    opacity: 0.7;
    color: #6b7280;
    line-height: 1.2;
  }

  /* 今日选中状态下阳历日期 - 字号放大，颜色鲜明 */
  .calendar-day.today.selected .solar-day-text {
    font-size: 24px;
    opacity: 1;
    color: #3B82F6;
  }

  /* 今日阳历日期蓝色 */
  .calendar-day.today .solar-day-text {
    color: #3B82F6;
    opacity: 1;
  }

  .lunar-date {
    text-align: center;
    position: static;
    z-index: 1;
    font-size: 11px;
    margin-top: 0;
    color: #9ca3af;
    line-height: 1.3;
  }

  /* 非今日选中状态下农历文字 - 颜色稍淡 */
  .calendar-day.selected:not(.today) .lunar-date {
    color: #9ca3af;
    font-weight: 500;
    font-size: 11px;
    line-height: 1.3;
  }

  /* 今日选中状态下农历文字 */
  .calendar-day.today.selected .lunar-date {
    color: #6b7280;
    font-weight: 600;
    font-size: 12px;
  }

  /* 今日农历文字 */
  .calendar-day.today .lunar-date {
    color: #6b7280;
    font-weight: 500;
  }

  /* 非今日选中+戒期的农历颜色（稍淡） */
  .calendar-day.selected:not(.today).precept-major .lunar-date {
    color: rgba(220, 38, 38, 0.6);
  }

  .calendar-day.selected:not(.today).precept-moderate .lunar-date {
    color: rgba(139, 92, 246, 0.6);
  }

  .calendar-day.selected:not(.today).precept-minor .lunar-date {
    color: rgba(59, 130, 246, 0.6);
  }

  .calendar-day.selected:not(.today).precept-safe .lunar-date {
    color: rgba(22, 163, 74, 0.6);
  }

  /* 今日选中+戒期的农历颜色 */
  .calendar-day.today.selected.precept-major .lunar-date {
    color: #DC2626;
  }

  .calendar-day.today.selected.precept-moderate .lunar-date {
    color: #8B5CF6;
  }

  .calendar-day.today.selected.precept-minor .lunar-date {
    color: #3B82F6;
  }

  .calendar-day.today.selected.precept-safe .lunar-date {
    color: #16A34A;
  }

  /* 非今日选中+戒期的阳历颜色（稍淡） */
  .calendar-day.selected:not(.today).precept-major .solar-day-text {
    color: rgba(220, 38, 38, 0.6);
  }

  .calendar-day.selected:not(.today).precept-moderate .solar-day-text {
    color: rgba(139, 92, 246, 0.6);
  }

  .calendar-day.selected:not(.today).precept-minor .solar-day-text {
    color: rgba(59, 130, 246, 0.6);
  }

  .calendar-day.selected:not(.today).precept-safe .solar-day-text {
    color: rgba(22, 163, 74, 0.6);
  }

  /* 今日选中+戒期的阳历颜色 */
  .calendar-day.today.selected.precept-major .solar-day-text {
    color: #DC2626;
  }

  .calendar-day.today.selected.precept-moderate .solar-day-text {
    color: #8B5CF6;
  }

  .calendar-day.today.selected.precept-minor .solar-day-text {
    color: #3B82F6;
  }

  .calendar-day.today.selected.precept-safe .solar-day-text {
    color: #16A34A;
  }

  /* 手机屏幕隐藏戒期详情、干支信息 */
  .ganzhi-info,
  .precept-details {
    display: none !important;
  }

  /* 节气保持右下角，缩小尺寸 */
  .solar-term-corner .solar-term-content {
    font-size: 8px;
    padding: 1px 3px;
  }

  .solar-term-corner .solar-term-icon {
    font-size: 8px;
  }

  .solar-term-corner .solar-term-text {
    font-size: 8px;
  }

  /* 戒期指示器固定在左上角，纵向排布 */
  .precept-indicators {
    position: absolute;
    top: 4px;
    left: 4px;
    margin: 0;
  }

  .precept-indicators .flex {
    flex-direction: column;
    gap: 2px;
  }

  .precept-indicator {
    width: 5px;
    height: 5px;
    margin-right: 0;
  }

  /* 非今日日期的指示圆点降低透明度 */
  .calendar-day:not(.today) .precept-indicator {
    opacity: 0.35;
  }

  /* 非今日选中时指示圆点透明度稍微恢复 */
  .calendar-day.selected:not(.today) .precept-indicator {
    opacity: 0.85;
  }
}
</style>