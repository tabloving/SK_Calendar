<template>
  <div v-if="selectedDayInfo" class="date-card">
    <div class="info-grid grid grid-cols-1 gap-3">
      <div class="info-card bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
        <div class="flex items-start justify-between">
          <!-- 左侧：阳历信息（主要信息） -->
          <div class="flex-1">
            <div class="text-xs text-purple-600 font-medium mb-2">阳历</div>
            <div class="flex items-center mb-1">
              <div class="solar-number-large">
                {{ selectedDayInfo.day }}
              </div>
              <div v-if="selectedDayInfo.isToday" class="today-badge-circle ml-2">
                今
              </div>
            </div>
            <div class="text-sm text-gray-700 mb-2">
              {{ weekDayText }}
            </div>
            <div class="text-xs text-gray-600">
              {{ getMonthYear(selectedDayInfo.date) }}
            </div>

            <!-- 节气信息 -->
            <div v-if="solarTermInfo" class="mt-2">
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
          <div class="text-right ml-4 pl-4 border-l border-purple-200">
            <div class="text-xs text-purple-600 font-medium mb-2">农历</div>
            <div class="space-y-2">
              <!-- 农历日期 -->
              <div class="text-sm text-gray-700 mb-2 font-medium text-right">
                {{ lunarInfo.full }}
              </div>

              <!-- 干支信息 -->
              <div class="flex flex-col items-end space-y-1">
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

/* 综合时间信息卡片（第一个info-card）- 紫色主题 */
.info-grid:first-child .info-card::before {
  background: linear-gradient(to bottom, #a855f7, #9333ea);
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

/* 响应式设计 */
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
    font-size: 10px;
    padding: 1px 4px;
  }

  /* 移动端节气样式调整 */
  .solar-term-content {
    padding: 1px 4px;
    font-size: 8px;
    gap: 1px;
  }

  .solar-term-icon {
    font-size: 9px;
  }

  .next-solar-term {
    padding: 1px 4px;
  }
}

.date-card {
  margin-bottom: 1.5rem; /* 与下一个组件的间距 */
}
</style>