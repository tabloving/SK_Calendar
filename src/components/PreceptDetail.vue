<template>
  <div class="precept-detail bg-white rounded-lg shadow-sm p-6">
    <div v-if="selectedDayInfo" class="space-y-6">
      <!-- 日期信息 -->
      <div class="date-info">
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

      <!-- 戒期信息 -->
      <div class="precept-info">
        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2" :size="20">
            <Document />
          </el-icon>
          戒期信息
        </h4>

        <!-- 有斋日或戒期时显示 -->
        <div v-if="hasPreceptDays || filteredPreceptInfos.length > 0" class="space-y-3">
          <!-- 普通戒期信息 -->
          <div
            v-for="(precept, index) in filteredPreceptInfos"
            :key="index"
            class="precept-item border rounded-lg p-4"
            :class="getPreceptItemClass(precept.level)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <div
                    class="precept-indicator mr-2"
                    :class="precept.level"
                  ></div>
                  <span class="font-semibold">{{ precept.reason }}</span>
                  <el-tag
                    size="small"
                    class="ml-2"
                    :style="getPreceptLevelStyle(precept.level)"
                  >
                    {{ getPreceptLevelText(precept.level) }}
                  </el-tag>
                  <el-tag
                    type="warning"
                    size="small"
                    class="ml-1"
                    effect="plain"
                  >
                    {{ precept.punishment }}
                  </el-tag>
                </div>
                <div class="text-sm text-gray-600 space-y-2">
                  <!-- 标签组：类型标签 + 其他标签 -->
                  <div class="flex flex-wrap gap-1">
                    <!-- 类型标签（第一位） -->
                    <el-tag type="primary" size="small">
                      {{ getPreceptTypeText(precept.type) }}
                    </el-tag>

                    <!-- 其他标签 -->
                    <el-tag
                      v-for="tag in precept.detail?.tags"
                      :key="tag"
                      size="small"
                      type="info"
                      effect="plain"
                      class="text-xs"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>

                  <!-- 说明 -->
                  <div v-if="precept.detail?.explanation" class="whitespace-pre-wrap text-gray-600">
                    {{ precept.detail.explanation }}
                  </div>

  
                  <!-- 如果是斋日类型的戒期，添加斋日说明 -->
                  <div v-if="precept.type === PreceptType.PRECEPT_DAY" class="bg-amber-50 rounded p-2 text-amber-700 text-sm">
                    <div class="flex items-center">
                      <Star class="w-4 h-4 mr-1" />
                      <span>诸天斋日，功德倍增</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 如果没有戒期但有斋日，单独显示斋日提示 -->
          <div v-if="hasPreceptDays && filteredPreceptInfos.length === 0" class="text-blue-600 text-center py-4">
            诸天斋日，功德倍增
          </div>
        </div>

        <!-- 既无戒期也无斋日时的提示 -->
        <div v-if="!(hasPreceptDays || filteredPreceptInfos.length > 0)" class="text-gray-500 text-center py-4">
          今日无戒期，保持平常心，慎勿放逸！
        </div>
      </div>

      <!-- 近期戒期提醒 -->
      <div v-if="upcomingPrecepts.length > 0" class="upcoming-fastings">
        <h4 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <el-icon class="mr-2"><Bell /></el-icon>
          近期戒期提醒
        </h4>
        <div class="space-y-2">
          <div
            v-for="(fasting, index) in upcomingPrecepts"
            :key="index"
            class="precept-reminder-card"
            :class="getPreceptCardClass(fasting.level)"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-1">
                  <div
                    class="precept-level-indicator mr-2"
                    :class="getPreceptIndicatorClass(fasting.level)"
                  ></div>
                  <span class="font-medium text-sm">{{ fasting.reason }}</span>
                  <el-tag v-if="fasting.preceptCount > 1" size="small" type="info" class="ml-2">
                    {{ fasting.preceptCount }}项
                  </el-tag>
                </div>
                <div class="flex items-center text-xs text-gray-500">
                  <span class="mr-1">{{ fasting.lunarDate }}</span>
                  <svg class="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L10 10.414l2.293 2.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ getDaysText(fasting.daysFromNow) }}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="date-text font-semibold text-sm">{{ fasting.date }}</div>
                <div class="weekday-text text-xs text-gray-400">
                  {{ getWeekdayText(fasting.fullDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 修行建议 -->
      <div class="practice-advice">
        <!-- 有戒期或斋日时的建议 -->
        <div v-if="filteredPreceptInfos.length > 0 || hasPreceptDays" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="font-semibold text-blue-800">修行建议</span>
          </div>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• 请在此日保持身心清净，精进修行</li>
            <li>• 可多读诵经典，念佛持咒</li>
            <li>• 若有不慎，应诚心忏悔</li>
            <li>• 功德回向给法界众生</li>
          </ul>
        </div>

        <!-- 既无戒期也无斋日时的精进鼓励 -->
        <div v-else class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="font-semibold text-green-800">修行精进</span>
          </div>
          <p class="text-sm text-green-700">
            无戒期之日正是精进修行的好时机，可以加倍功课，积累功德
          </p>
        </div>
      </div>

      </div>

    <div v-else class="text-center text-gray-500 py-8">
      <el-icon size="48" class="mb-4"><Calendar /></el-icon>
      <p>请选择日期查看戒期详情</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { CalendarUtil } from '@/utils/calendar'
import { PreceptDataManager } from '@/utils/precept-data'
import { PreceptType } from '@/types'
import * as lunar from 'lunar-javascript'
import { Calendar as CalendarIcon, Bell, Document, Star } from '@element-plus/icons-vue'

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
const settingsStore = useSettingsStore()
const preceptManager = PreceptDataManager.getInstance()

// 计算属性
const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)

const filteredPreceptInfos = computed(() => {
  if (!selectedDayInfo.value) return []

  return selectedDayInfo.value.preceptInfos.filter(precept =>
    settingsStore.settings.enabledPreceptTypes.includes(precept.type)
  )
})

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

const hasPreceptDays = computed(() => {
  return isTenPreceptDay.value
})

const isTenPreceptDay = computed(() => {
  if (!selectedDayInfo.value) return false

  try {
    const solar = lunar.Solar.fromDate(selectedDayInfo.value.date)
    const lunarDate = solar.getLunar()
    return preceptManager.isTenPreceptDay(lunarDate.getDay())
  } catch (error) {
    console.warn('检查十斋日失败', error)
    return false
  }
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


const upcomingPrecepts = computed(() => {
  const today = new Date()
  const todayStr = today.toDateString()
  const threeMonthsLater = new Date(today)
  threeMonthsLater.setMonth(today.getMonth() + 3)

  // 按日期分组的戒期信息
  const preceptsByDate = new Map<string, {
    date: Date;
    dateString: string;
    lunarDate: string;
    precepts: Array<{
      reason: string;
      level: 'major' | 'moderate' | 'minor';
      type: string;
    }>;
    daysFromNow: number;
  }>()

  // 获取足够多的日历数据（当前月及未来几个月）
  const currentMonth = calendarStore.currentMonthInfo.days
  const allDays = [...currentMonth]

  allDays.forEach(day => {
    if (day.date > today && day.date <= threeMonthsLater) {
      const enabledPrecepts = day.preceptInfos.filter(precept =>
        settingsStore.settings.enabledPreceptTypes.includes(precept.type)
      )

      if (enabledPrecepts.length > 0) {
        const dateKey = day.date.toDateString()
        const daysFromNow = Math.ceil((day.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        const lunarInfo = CalendarUtil.getFullLunarMonthDay(day.date)

        if (!preceptsByDate.has(dateKey)) {
          preceptsByDate.set(dateKey, {
            date: day.date,
            dateString: `${day.month}月${day.day}日`,
            lunarDate: lunarInfo.full,
            precepts: [],
            daysFromNow: daysFromNow
          })
        }

        const dayData = preceptsByDate.get(dateKey)!
        enabledPrecepts.forEach(precept => {
          dayData.precepts.push({
            reason: precept.reason,
            level: precept.level as 'major' | 'moderate' | 'minor',
            type: precept.type
          })
        })
      }
    }
  })

  // 转换为数组并排序，取前3个戒期日
  const sortedPreceptDays = Array.from(preceptsByDate.values())
    .sort((a, b) => a.daysFromNow - b.daysFromNow)
    .slice(0, 3)

  // 合并同一天的戒期为一个卡片
  return sortedPreceptDays.map(dayData => {
    // 获取当天最高戒期等级
    const highestLevel = dayData.precepts.reduce((highest, precept) => {
      const levelOrder = { major: 3, moderate: 2, minor: 1 }
      const currentOrder = levelOrder[precept.level] || 0
      const highestOrder = levelOrder[highest.level] || 0
      return currentOrder > highestOrder ? precept : highest
    }, dayData.precepts[0]).level

    // 合并戒期原因，如果是同一天多个戒期
    let combinedReason = ''
    if (dayData.precepts.length === 1) {
      combinedReason = dayData.precepts[0].reason
    } else {
      // 多个戒期时，用顿号分隔
      combinedReason = dayData.precepts.map(p => p.reason).join('、')
    }

    return {
      reason: combinedReason,
      date: dayData.dateString,
      fullDate: dayData.date,
      lunarDate: dayData.lunarDate,
      level: highestLevel,
      daysFromNow: dayData.daysFromNow,
      preceptCount: dayData.precepts.length,
      allPrecepts: dayData.precepts
    }
  })
})

// 方法
const formatDate = (date: Date) => {
  return CalendarUtil.formatDate(date, 'YYYY-MM-DD')
}

const getMonthYear = (date: Date) => {
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月`
}

const getDaySuffix = (day: number) => {
  return '日'
}

const getPreceptLevelText = (level: string) => {
  return CalendarUtil.getPreceptLevelText(level as any)
}

const getPreceptTypeText = (type: string) => {
  const typeMap = {
    regular: '常规戒期',
    special: '特殊戒期',
    personal: '个人戒期',
  fasting_day: '斋日',
    precept_day: '斋日'
  }
  return typeMap[type as keyof typeof typeMap] || '未知类型'
}


const getTagType = (level: string) => {
  const typeMap = {
    major: 'danger',
    moderate: 'warning',
    minor: 'info',
    safe: 'success'
  }
  return typeMap[level as keyof typeof typeMap] || 'info'
}

const getPreceptItemClass = (level: string) => {
  const classMap = {
    major: 'bg-red-50 border-red-200',
    moderate: 'bg-purple-50 border-purple-200',
    minor: 'bg-blue-50 border-blue-200',
    safe: 'bg-green-50 border-green-200'
  }
  return classMap[level as keyof typeof classMap] || 'bg-gray-50 border-gray-200'
}

// 近期戒期提醒相关方法
const getPreceptCardClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-precept-card',
    moderate: 'moderate-precept-card',
    minor: 'minor-precept-card'
  }
  return classMap[level] || 'minor-precept-card'
}

const getPreceptIndicatorClass = (level: 'major' | 'moderate' | 'minor') => {
  const classMap = {
    major: 'major-indicator',
    moderate: 'moderate-indicator',
    minor: 'minor-indicator'
  }
  return classMap[level] || 'minor-indicator'
}

const getDaysText = (daysFromNow: number) => {
  if (daysFromNow === 0) return '今天'
  if (daysFromNow === 1) return '明天'
  if (daysFromNow === 2) return '后天'
  if (daysFromNow <= 7) return `${daysFromNow}天后`
  return `${daysFromNow}天后`
}

const getWeekdayText = (date: Date) => {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[date.getDay()]
}

const getPreceptLevelStyle = (level: string) => {
  const colorMap = {
    major: '220, 38, 38',
    moderate: '124, 58, 237',
    minor: '59, 130, 246',
    safe: '22, 163, 74'
  }

  const rgb = colorMap[level as keyof typeof colorMap] || colorMap.minor

  return {
    backgroundColor: `rgba(${rgb}, 0.85)`,
    borderColor: `rgb(${rgb})`,
    color: '#ffffff'
  }
}
</script>

<style>
/* 全局CSS变量 - 用于戒期等级颜色系统 */
:root {
  --color-major: 220, 38, 38;       /* #DC2626 */
  --color-moderate: 124, 58, 237;   /* #7C3AED */
  --color-minor: 59, 130, 246;     /* #3B82F6 */
  --color-safe: 22, 163, 74;       /* #16A34A */
}
</style>

<style scoped>
.precept-detail {
  min-height: 400px;
}

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

  }

.precept-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.precept-indicator.major {
  background-color: rgb(var(--color-major));
}

.precept-indicator.moderate {
  background-color: rgb(var(--color-moderate));
}

.precept-indicator.minor {
  background-color: rgb(var(--color-minor));
}

.precept-indicator.safe {
  background-color: rgb(var(--color-safe));
}

/* 戒等级标签样式 - 与指示器颜色匹配 */
.precept-level-tag.major {
  background: rgba(var(--color-major), 0.85) !important;
  border-color: rgb(var(--color-major)) !important;
  color: #ffffff !important;
}

.precept-level-tag.moderate {
  background: rgba(var(--color-moderate), 0.85) !important;
  border-color: rgb(var(--color-moderate)) !important;
  color: #ffffff !important;
}

.precept-level-tag.minor {
  background: rgba(var(--color-minor), 0.85) !important;
  border-color: rgb(var(--color-minor)) !important;
  color: #ffffff !important;
}

.precept-level-tag.safe {
  background: rgba(var(--color-safe), 0.85) !important;
  border-color: rgb(var(--color-safe)) !important;
  color: #ffffff !important;
}

/* 深度样式覆盖 */
:deep(.el-tag.precept-level-tag.major) {
  background: rgba(var(--color-major), 0.85) !important;
  border-color: rgb(var(--color-major)) !important;
  color: #ffffff !important;
}

:deep(.el-tag.precept-level-tag.moderate) {
  background: rgba(var(--color-moderate), 0.85) !important;
  border-color: rgb(var(--color-moderate)) !important;
  color: #ffffff !important;
}

:deep(.el-tag.precept-level-tag.minor) {
  background: rgba(var(--color-minor), 0.85) !important;
  border-color: rgb(var(--color-minor)) !important;
  color: #ffffff !important;
}

:deep(.el-tag.precept-level-tag.safe) {
  background: rgba(var(--color-safe), 0.85) !important;
  border-color: rgb(var(--color-safe)) !important;
  color: #ffffff !important;
}

/* 近期戒期提醒卡片样式 */
.precept-reminder-card {
  padding: 10px;
  border-radius: 8px;
  border-left: 4px solid;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.precept-reminder-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


/* 大罪戒期卡片 */
.major-precept-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-left-color: rgb(var(--color-major));
  border: 1px solid #fecaca;
}

/* 中罪戒期卡片 */
.moderate-precept-card {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border-left-color: rgb(var(--color-moderate));
  border: 1px solid #e9d5ff;
}

/* 小罪戒期卡片 */
.minor-precept-card {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-left-color: rgb(var(--color-minor));
  border: 1px solid #bfdbfe;
}

/* 戒期等级指示器 */
.precept-level-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.major-indicator {
  background-color: rgb(var(--color-major));
}

.moderate-indicator {
  background-color: rgb(var(--color-moderate));
}

.minor-indicator {
  background-color: rgb(var(--color-minor));
}

/* 日期样式 */
.date-text {
  color: #374151;
  line-height: 1.2;
}

.weekday-text {
  color: #9ca3af;
  margin-top: 2px;
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

@media (max-width: 640px) {
  .precept-detail {
    padding: 16px;
  }

  .grid.grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .precept-reminder-card {
    padding: 8px;
  }

  .date-text {
    font-size: 12px;
  }

  .weekday-text {
    font-size: 10px;
  }

  .upcoming-fastings {
    margin-top: 4;
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
</style>