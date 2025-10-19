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
          class="text-gray-500 text-xs"
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
import { PreceptDataManager } from '@/utils/precept-data'
import * as lunar from 'lunar-javascript'
import { Calendar, Bell } from '@element-plus/icons-vue'
import type { CalendarDayInfo } from '@/types'

// 二十四节气icon映射
const SOLAR_TERM_ICONS: Record<string, string> = {
  // 春季节气
  '立春': '🌱',  // 春天开始，新芽
  '雨水': '💧',  // 雨水增多
  '惊蛰': '🐛',  // 昆虫苏醒
  '春分': '🌸',  // 春分时节花开
  '清明': '🍃',  // 清明时节，绿芽
  '谷雨': '🌾',  // 谷雨时节，谷物

  // 夏季节气
  '立夏': '☀️',  // 夏天开始，阳光
  '小满': '🌻',  // 小满时节，向日葵
  '芒种': '🌾',  // 芒种时节，麦穗
  '夏至': '🌞',  // 夏至日长，太阳
  '小暑': '🔥',  // 小暑炎热
  '大暑': '🥵',  // 大暑极热

  // 秋季节气
  '立秋': '🍂',  // 秋天开始，落叶
  '处暑': '🌤️',  // 处暑结束炎热
  '白露': '💧',  // 白露时节，露水
  '秋分': '🌰',  // 秋分时节，果实
  '寒露': '❄️',  // 寒露时节，寒意
  '霜降': '🌨️',  // 霜降时节，霜雪

  // 冬季节气
  '立冬': '❄️',  // 冬天开始，雪花
  '小雪': '🌨️',  // 小雪时节，小雪
  '大雪': '⛄',  // 大雪时节，大雪
  '冬至': '🌨️',  // 冬至日短，寒雪
  '小寒': '🧊',  // 小寒寒冷，冰块
  '大寒': '🥶',  // 大寒极寒，冰雪
}

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

const getPreceptLevelText = (level: 'major' | 'moderate' | 'minor' | 'safe') => {
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
    '天地仓开日': '仓开日',
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  height: 100%;
  min-height: 120px;
  padding: 12px 16px;
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
  background-color: rgba(139, 92, 246, 0.08);
}

.calendar-day.precept-minor {
  background-color: rgba(59, 130, 246, 0.08);
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
              inset 0 0 0 1px rgba(139, 92, 246, 0.25);
}

.calendar-day.precept-minor:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              inset 0 0 0 1px rgba(59, 130, 246, 0.25);
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
  background-color: rgba(139, 92, 246, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #8B5CF6;
}

.calendar-day.selected.precept-minor {
  background-color: rgba(59, 130, 246, 0.12);
  border: none;
  box-shadow: inset 0 0 0 1px #3B82F6;
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

.solar-day-text {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  font-family: 'Gravitas One', cursive;
  color: #6b7280;
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
    margin-bottom: 4px;
  }

  .solar-day-text {
    font-size: 16px;
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
    height: 75px !important;
    min-height: 75px !important;
    max-height: 75px !important;
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