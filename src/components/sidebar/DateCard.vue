<template>
  <div v-if="selectedDayInfo" class="date-card">
    <div class="info-grid grid grid-cols-1 gap-3">
      <div class="info-card rounded-lg p-4" :style="cardStyle" :class="`precept-level-${highestPreceptLevel}`">
        <!-- 阳历日期水印（流式布局显示） -->
        <div class="solar-watermark">{{ selectedDayInfo.day }}</div>
        <div class="flex items-start justify-between">
          <!-- 左侧：阳历信息（主要信息） -->
          <div class="flex-1">
            <div class="solar-label text-xs text-purple-600 font-medium mb-2">阳历</div>
            <div class="solar-date-row flex items-center mb-1">
              <div class="solar-number-large">
                {{ selectedDayInfo.day }}
              </div>
              <div v-if="selectedDayInfo.isToday" class="today-badge-circle ml-2">
                今
              </div>
            </div>
            <div class="solar-weekday text-sm text-gray-700 mb-2">
              {{ weekDayText }}
            </div>
            <div class="solar-month-year text-xs text-gray-600">
              {{ getMonthYear(selectedDayInfo.date) }}
            </div>

            <!-- 节气信息 -->
            <div v-if="solarTermInfo" class="solar-term-section mt-2">
              <div v-if="solarTermInfo.isToday" class="solar-term-content">
                <span class="solar-term-icon">{{ solarTermInfo.icon }}</span>
                <span class="solar-term-text">{{ solarTermInfo.name }}</span>
              </div>
              <div v-else class="next-solar-term">
                <span class="text-xs text-purple-600 flex items-center">
                  <span class="solar-term-icon">{{ solarTermInfo.icon }}</span>
                  <span>下一节气：{{ solarTermInfo.name }}（{{ solarTermInfo.daysFromNow }}天后）</span>
                </span>
              </div>
            </div>
          </div>

          <!-- 右侧：农历和干支信息（次要信息） -->
          <div class="lunar-section text-right ml-4 pl-4 border-l border-purple-200">
            <div class="lunar-header flex items-center justify-end mb-2">
              <!-- 农历月份天数Badge（桌面端在标题左边） -->
              <span v-if="lunarMonthInfo" class="lunar-month-days-badge lunar-badge-desktop mr-2">
                {{ lunarMonthInfo.isLeap ? '闰' : '' }}{{ lunarMonthInfo.isBigMonth ? '大' : '小' }}
              </span>
              <!-- 农历标题 -->
              <div class="lunar-label text-xs text-purple-600 font-medium">农历</div>
              <!-- 农历日期（流式布局显示在标题右侧） -->
              <div class="lunar-date-inline font-medium ml-2" :style="{ color: preceptLevelColor }">
                {{ lunarInfo.full }}
              </div>
              <!-- 农历月份天数Badge（流式布局在日期右边） -->
              <span v-if="lunarMonthInfo" class="lunar-month-days-badge lunar-badge-mobile ml-2">
                {{ lunarMonthInfo.isLeap ? '闰' : '' }}{{ lunarMonthInfo.isBigMonth ? '大' : '小' }}
              </span>
            </div>
            <!-- 干支信息（流式布局横向排列） -->
            <div class="ganzhi-row-mobile flex items-center gap-2 mt-2">
              <span class="ganzhi-year-badge">{{ ganZhiInfo.year }}年</span>
              <span class="ganzhi-month-badge">{{ ganZhiInfo.month }}月</span>
              <span class="ganzhi-day-badge">{{ ganZhiInfo.day }}日</span>
              <span class="weekday-badge">{{ weekDayText }}</span>
              <span v-if="selectedDayInfo.isToday" class="today-badge-mobile">今天</span>
            </div>
            <div class="lunar-content space-y-2">
              <!-- 农历日期（桌面端显示） -->
              <div class="lunar-date-desktop mb-2 text-right">
                <div class="lunar-date-text text-sm text-gray-700 font-medium">
                  {{ lunarInfo.full }}
                </div>
              </div>

              <!-- 干支信息 -->
              <div class="ganzhi-section flex flex-col items-end space-y-1">
                <div class="flex items-center space-x-1">
                  <span class="ganzhi-year-badge">
                    {{ ganZhiInfo.year }}年
                  </span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="ganzhi-month-badge">
                    {{ ganZhiInfo.month }}月
                  </span>
                </div>
                <div class="flex items-center space-x-1">
                  <span class="ganzhi-day-badge">
                    {{ ganZhiInfo.day }}日
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { CalendarUtil } from '@/utils/calendar'
import { LunarCalendarUtil } from '@/utils/lunar'
import * as lunar from 'lunar-javascript'

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

const calendarStore = useCalendarStore()

const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)

const lunarInfo = computed(() => {
  if (!selectedDayInfo.value) return { month: '', day: '', full: '' }

  return CalendarUtil.getFullLunarMonthDay(selectedDayInfo.value.date)
})

// 农历月份信息（包含天数和大小月）
const lunarMonthInfo = computed(() => {
  if (!selectedDayInfo.value) return null

  return LunarCalendarUtil.getLunarMonthDays(selectedDayInfo.value.date)
})

// 干支信息计算
const ganZhiInfo = computed(() => {
  if (!selectedDayInfo.value) return { year: '', month: '', day: '' }

  try {
    const solar = lunar.Solar.fromDate(selectedDayInfo.value.date)
    const lunarDate = solar.getLunar()

    // 获取年干支
    const yearGanZhi = lunarDate.getYearInGanZhi()

    // 获取月干支
    const monthGanZhi = lunarDate.getMonthInGanZhi()

    // 获取日干支
    const dayGanZhi = lunarDate.getDayInGanZhi()

    return {
      year: yearGanZhi,
      month: monthGanZhi,
      day: dayGanZhi
    }
  } catch (error) {
    console.warn('获取干支信息失败', error)
    return { year: '', month: '', day: '' }
  }
})

const weekDayText = computed(() => {
  if (!selectedDayInfo.value) return ''

  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekDays[selectedDayInfo.value.weekday]
})

// 节气信息计算
const solarTermInfo = computed(() => {
  if (!selectedDayInfo.value) return null

  // 如果当天有节气，返回当天节气信息
  if (selectedDayInfo.value.solarTerm) {
    return {
      isToday: true,
      name: selectedDayInfo.value.solarTerm,
      icon: SOLAR_TERM_ICONS[selectedDayInfo.value.solarTerm] || '🌿',
      daysFromNow: 0
    }
  }

  // 如果当天没有节气，获取下一个节气
  const nextSolarTerm = CalendarUtil.getNextSolarTerm(selectedDayInfo.value.date)
  if (nextSolarTerm) {
    return {
      isToday: false,
      name: nextSolarTerm.name,
      icon: SOLAR_TERM_ICONS[nextSolarTerm.name] || '🌿',
      daysFromNow: nextSolarTerm.daysFromNow
    }
  }

  return null
})

const getMonthYear = (date: Date) => {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`
}

// 获取当前选中日期的最高戒期等级
const highestPreceptLevel = computed(() => {
  if (!selectedDayInfo.value) return 'safe'
  return CalendarUtil.getHighestPreceptLevel(selectedDayInfo.value.preceptInfos)
})

// 根据戒期等级返回对应颜色
const preceptLevelColor = computed(() => {
  const colorMap: Record<string, string> = {
    major: '#DC2626',     // 红色
    moderate: '#8B5CF6',  // 紫色
    minor: '#3B82F6',     // 蓝色
    safe: '#16A34A'       // 绿色
  }
  return colorMap[highestPreceptLevel.value] || '#374151'
})

// 卡片样式（背景渐变、边框颜色）
const cardStyle = computed(() => {
  const level = highestPreceptLevel.value
  const styleMap: Record<string, { background: string; border: string }> = {
    major: {
      background: 'linear-gradient(to right, rgba(220, 38, 38, 0.08), rgba(220, 38, 38, 0.03))',
      border: '1px solid rgba(220, 38, 38, 0.2)'
    },
    moderate: {
      background: 'linear-gradient(to right, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.03))',
      border: '1px solid rgba(139, 92, 246, 0.2)'
    },
    minor: {
      background: 'linear-gradient(to right, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.03))',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    },
    safe: {
      background: 'linear-gradient(to right, rgba(22, 163, 74, 0.08), rgba(22, 163, 74, 0.03))',
      border: '1px solid rgba(22, 163, 74, 0.2)'
    }
  }
  const style = styleMap[level] || styleMap.safe
  return {
    background: style.background,
    border: style.border
  }
})

// 左侧边框颜色
const leftBorderColor = computed(() => {
  return preceptLevelColor.value
})
</script>

<style scoped>
/* 日期信息区域样式 */
.date-header {
  position: relative;
}

.today-badge-sm {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(139, 92, 246, 0.3);
  animation: pulse-purple 2s infinite;
}

.today-badge-circle {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
  animation: pulse-purple 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
}

@keyframes pulse-purple {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 阳历数字大字体样式 */
.solar-number-large {
  font-size: 32px;
  font-weight: bold;
  color: #4b5563;
  line-height: 1;
  font-family: 'Gravitas One', cursive;
}

/* 农历月份天数Badge样式 */
.lunar-month-days-badge {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid #fbbf24;
  box-shadow: 0 1px 2px rgba(251, 191, 36, 0.2);
  display: inline-block;
  white-space: nowrap;
  min-width: 20px;
  text-align: center;
  line-height: 1.2;
}

/* 干支 Badge 样式 */

.ganzhi-year-badge {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  color: #7c3aed;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #d8b4fe;
  box-shadow: 0 1px 2px rgba(139, 92, 246, 0.15);
  display: inline-block;
}

.ganzhi-month-badge {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #93c5fd;
  box-shadow: 0 1px 2px rgba(147, 197, 253, 0.2);
  display: inline-block;
}

.ganzhi-day-badge {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #15803d;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #86efac;
  box-shadow: 0 1px 2px rgba(134, 239, 172, 0.2);
  display: inline-block;
}

.info-card {
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  opacity: 0.8;
}

/* 根据戒期等级设置左侧边框颜色 */
.info-card.precept-level-major::before {
  background: linear-gradient(to bottom, #DC2626, #B91C1C);
}

.info-card.precept-level-moderate::before {
  background: linear-gradient(to bottom, #8B5CF6, #7C3AED);
}

.info-card.precept-level-minor::before {
  background: linear-gradient(to bottom, #3B82F6, #2563EB);
}

.info-card.precept-level-safe::before {
  background: linear-gradient(to bottom, #16A34A, #15803D);
}

.info-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 综合时间信息卡片图标样式 - 紫色主题 */
.info-grid:first-child .info-icon {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
}

/* 节气显示样式 */
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
  font-size: 10px;
  line-height: 1;
}

.solar-term-content .solar-term-icon {
  margin-right: 0;
  font-size: 12px;
}

.solar-term-text {
  font-weight: 600;
  color: #7c3aed;
  white-space: nowrap;
}

.next-solar-term {
  display: inline-block;
  padding: 2px 5px;
  background: rgba(147, 51, 234, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(147, 51, 234, 0.1);
  transition: all 0.2s ease;
}

.next-solar-term:hover {
  background: rgba(147, 51, 234, 0.08);
  border-color: rgba(147, 51, 234, 0.15);
}

.next-solar-term .solar-term-icon {
  margin-right: 2px;
  font-size: 10px;
  line-height: 1;
}

/* 桌面端：隐藏 inline 日期，显示 desktop 日期和 badge */
.lunar-date-inline {
  display: none;
}

.lunar-date-desktop {
  display: block;
}

.lunar-badge-desktop {
  display: inline-block;
}

.lunar-badge-mobile {
  display: none;
}

/* 桌面端隐藏流式布局的干支行 */
.ganzhi-row-mobile {
  display: none;
}

/* 阳历日期水印（桌面端隐藏） */
.solar-watermark {
  display: none;
}

/* 响应式设计 */

/* 流式布局设备：隐藏阳历展示，保留节气预告 */
@media (max-width: 1024px) {
  .solar-label,
  .solar-date-row,
  .solar-weekday,
  .solar-month-year {
    display: none;
  }

  .solar-term-section {
    margin-top: 0;
  }

  /* 节气样式增大 */
  .solar-term-content {
    padding: 8px 14px;
    font-size: 16px;
    gap: 6px;
  }

  .solar-term-content .solar-term-icon {
    font-size: 18px;
  }

  .solar-term-text {
    font-size: 16px;
  }

  .next-solar-term {
    padding: 8px 14px;
  }

  .next-solar-term .text-xs {
    font-size: 16px;
  }

  .next-solar-term .solar-term-icon {
    font-size: 16px;
  }

  /* 农历区域调整：移到左侧原阳历位置，不分左右两栏 */
  .info-card > .flex {
    flex-direction: column;
  }

  /* 卡片需要相对定位以容纳水印 */
  .info-card {
    position: relative;
    overflow: hidden;
  }

  /* 阳历日期水印 */
  .solar-watermark {
    display: block;
    position: absolute;
    right: 10px;
    top: -10px;
    font-size: 100px;
    font-weight: bold;
    color: rgba(139, 92, 246, 0.1);
    font-family: 'Gravitas One', cursive;
    line-height: 1;
    pointer-events: none;
    z-index: 0;
  }

  /* 确保内容在水印之上 */
  .info-card > .flex {
    position: relative;
    z-index: 1;
  }

  /* 节气信息的父容器（左侧区域）调整顺序 */
  .info-card > .flex > .flex-1 {
    order: 2;
  }

  .lunar-section {
    order: 1;
    text-align: left;
    margin-left: 0;
    padding-left: 0;
    border-left: none;
    width: 100%;
  }

  /* 节气预告显示在底部 */
  .solar-term-section {
    margin-top: 8px;
  }

  .lunar-header {
    flex-direction: row;
    justify-content: flex-start !important;
    margin-bottom: 0 !important;
  }

  .lunar-header .lunar-label {
    font-size: 14px;
    font-family: 'Songti SC', 'STSongti-SC', 'SimSun', 'STSong', 'PMingLiU', 'Noto Serif SC', serif;
    writing-mode: vertical-rl;
    text-orientation: upright;
    background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
    border: 1px solid #d8b4fe;
    border-radius: 12px;
    padding: 8px 6px;
    letter-spacing: 2px;
    box-shadow: 0 1px 3px rgba(139, 92, 246, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 流式布局：显示 inline 日期和 mobile badge，隐藏 desktop 版本 */
  .lunar-date-inline {
    display: block;
    font-size: 32px;
    font-family: 'STSong', 'Songti SC', STSongti-SC-Regular, 'SimSun', 'PMingLiU', 'Noto Serif CJK SC', serif;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
  }

  .lunar-date-desktop {
    display: none;
  }

  .lunar-badge-desktop {
    display: none;
  }

  .lunar-badge-mobile {
    display: inline-block;
  }

  .lunar-header .lunar-month-days-badge {
    font-size: 14px;
    padding: 3px 8px;
  }

  /* 隐藏农历日期和干支信息的原有位置 */
  .lunar-content {
    display: none;
  }

  /* 流式布局显示干支横向排列 */
  .ganzhi-row-mobile {
    display: flex;
  }

  .ganzhi-row-mobile .ganzhi-year-badge,
  .ganzhi-row-mobile .ganzhi-month-badge,
  .ganzhi-row-mobile .ganzhi-day-badge {
    font-size: 14px;
    padding: 4px 8px;
  }

  .ganzhi-row-mobile .weekday-badge {
    font-size: 14px;
    padding: 4px 10px;
    color: #6b7280;
    border: 1px solid #d1d5db;
    border-radius: 12px;
  }

  .ganzhi-row-mobile .today-badge-mobile {
    font-size: 14px;
    padding: 4px 10px;
    color: #8b5cf6;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    font-weight: 500;
  }
}

@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-card {
    padding: 12px;
  }

  .info-icon {
    width: 28px;
    height: 28px;
  }

  .info-card .text-lg {
    font-size: 1.125rem;
  }

  .info-card .text-sm {
    font-size: 0.875rem;
  }

  /* 移动端今天标志调整 */
  .today-badge-circle {
    width: 20px;
    height: 20px;
    font-size: 11px;
  }

  /* 移动端干支Badge调整 */
  .ganzhi-year-badge,
  .ganzhi-month-badge,
  .ganzhi-day-badge {
    font-size: 13px;
    padding: 2px 6px;
  }

  /* 移动端节气样式调整 */
  .solar-term-content {
    padding: 6px 12px;
    font-size: 14px;
    gap: 4px;
  }

  .solar-term-content .solar-term-icon {
    font-size: 16px;
  }

  .solar-term-icon {
    font-size: 14px;
  }

  .next-solar-term {
    padding: 6px 12px;
  }

  .next-solar-term .text-xs {
    font-size: 14px;
  }

  /* 移动端农历日期增大 */
  .lunar-date-inline {
    font-size: 36px;
  }

  /* 移动端农历标题调整 */
  .lunar-header .lunar-label {
    font-size: 14px;
    padding: 8px 6px;
  }

  /* 移动端农历月份天数Badge调整 */
  .lunar-month-days-badge {
    font-size: 14px;
    padding: 4px 8px;
    min-width: 24px;
  }
}
</style>