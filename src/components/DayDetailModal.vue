<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="handleBackdropClick"
      >
        <transition
          enter-active-class="transition duration-300 ease-out transform"
          enter-from-class="scale-95 opacity-0 translate-y-4"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in transform"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-4"
        >
          <div
            v-if="visible"
            class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden"
            :class="modalClass"
            @click.stop
          >
            <!-- 模态框头部 -->
            <div class="relative p-6 pb-0">
              <!-- 关闭按钮 -->
              <button
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                @click="close"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- 日期信息 -->
              <div class="text-center">
                <div class="flex items-center justify-center mb-2">
                  <div
                    class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    :class="headerIconClass"
                  >
                    <component :is="headerIcon" class="w-6 h-6" />
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-1">
                  {{ formatDate(dayInfo?.date) }}
                </h3>
                <div class="text-gray-600 mb-2">
                  农历{{ lunarInfo.full }}
                  <span v-if="dayInfo?.isToday" class="ml-2 text-blue-600 font-semibold">(今天)</span>
                </div>
                <div v-if="ganZhiInfo" class="flex items-center justify-center space-x-4 text-sm text-purple-600 font-medium mb-2">
                  <span>{{ ganZhiInfo.yearGanZhi }}年</span>
                  <span>{{ ganZhiInfo.monthGanZhi }}月</span>
                  <span>{{ ganZhiInfo.dayGanZhi }}日</span>
                </div>
                <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <span>{{ weekDayText }}</span>
                  <span v-if="dayInfo?.solarTerm" class="text-purple-600 font-semibold">
                    {{ dayInfo.solarTerm }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 模态框内容 -->
            <div class="p-6 pt-4">
              <!-- 戒期信息 -->
              <div v-if="hasFasting" class="space-y-4">
                <div class="text-center">
                  <h4 class="text-lg font-semibold text-gray-800 mb-4">戒期提醒</h4>
                  <div
                    class="inline-flex items-center px-4 py-2 rounded-full text-white font-medium"
                    :class="fastingLevelClass"
                  >
                    <component :is="fastingLevelIcon" class="w-5 h-5 mr-2" />
                    {{ fastingLevelText }}
                  </div>
                </div>

                <!-- 戒期详情列表 -->
                <div class="space-y-3 mt-6">
                  <div
                    v-for="(fasting, index) in filteredFastingInfos"
                    :key="index"
                    class="bg-gray-50 rounded-lg p-4 border-l-4"
                    :class="getFastingItemClass(fasting.level)"
                  >
                    <div class="flex items-start">
                      <div
                        class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0"
                        :class="getFastingIconClass(fasting.level)"
                      >
                        {{ index + 1 }}
                      </div>
                      <div class="flex-1">
                        <h5 class="font-semibold text-gray-800 mb-1">{{ fasting.reason }}</h5>
                        <p v-if="fasting.description" class="text-sm text-gray-600 mb-2">
                          {{ fasting.description }}
                        </p>
                        <div class="flex items-center justify-between">
                          <span class="text-xs text-gray-500">
                            类型：{{ getFastingTypeText(fasting.type) }}
                          </span>
                          <div
                            class="px-2 py-1 rounded text-xs font-medium"
                            :class="getFastingBadgeClass(fasting.level)"
                          >
                            {{ getFastingLevelText(fasting.level) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 戒期建议 -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
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
              </div>

              <!-- 无戒期提示 -->
              <div v-else class="text-center space-y-4">
                <div class="mb-4">
                  <div
                    class="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-green-600"
                  >
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h4 class="text-xl font-semibold text-gray-800 mb-2">今日无戒期</h4>
                <p class="text-gray-600 mb-6">
                  今天可以安心修行，保持平常心即可
                </p>

                <!-- 鼓励卡片 -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
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

            <!-- 底部操作按钮 -->
            <div class="p-6 pt-0 border-t">
              <div class="flex space-x-3">
                <button
                  class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  @click="close"
                >
                  知道了
                </button>
                <button
                  v-if="hasFasting"
                  class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  @click="addToCalendar"
                >
                  添加提醒
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalendarUtil } from '@/utils/calendar'
import { useSettingsStore } from '@/stores/settings'
import CheckCircle from './icons/CheckCircle.vue'
import Warning from './icons/Warning.vue'
import AlertTriangle from './icons/AlertTriangle.vue'
import AlertCircle from './icons/AlertCircle.vue'
import Info from './icons/Info.vue'
import type { CalendarDayInfo, FastingInfo } from '@/types'

interface Props {
  visible: boolean
  dayInfo: CalendarDayInfo | null
}

interface Emits {
  (e: 'close'): void
  (e: 'add-to-calendar', dayInfo: CalendarDayInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const settingsStore = useSettingsStore()

// 计算属性
const hasFasting = computed(() => {
  return filteredFastingInfos.value.length > 0
})

const filteredFastingInfos = computed(() => {
  if (!props.dayInfo) return []
  return props.dayInfo.fastingInfos.filter(fasting =>
    settingsStore.settings.enabledFastingTypes.includes(fasting.type)
  )
})

const highestFastingLevel = computed(() => {
  if (!hasFasting.value) return 'safe'
  return CalendarUtil.getHighestFastingLevel(filteredFastingInfos.value)
})

const modalClass = computed(() => {
  const classMap = {
    major: 'border-t-4 border-red-500',
    moderate: 'border-t-4 border-orange-500',
    minor: 'border-t-4 border-yellow-500',
    safe: 'border-t-4 border-green-500'
  }
  return classMap[highestFastingLevel.value] || 'border-t-4 border-gray-500'
})

const headerIconClass = computed(() => {
  const classMap = {
    major: 'bg-red-500',
    moderate: 'bg-orange-500',
    minor: 'bg-yellow-500',
    safe: 'bg-green-500'
  }
  return classMap[highestFastingLevel.value] || 'bg-gray-500'
})

const headerIcon = computed(() => {
  if (!hasFasting.value) return CheckCircle
  return Warning
})

const fastingLevelClass = computed(() => {
  const classMap = {
    major: 'bg-red-500',
    moderate: 'bg-orange-500',
    minor: 'bg-yellow-500',
    safe: 'bg-green-500'
  }
  return classMap[highestFastingLevel.value] || 'bg-gray-500'
})

const fastingLevelIcon = computed(() => {
  const iconMap = {
    major: AlertTriangle,
    moderate: AlertCircle,
    minor: Info,
    safe: CheckCircle
  }
  return iconMap[highestFastingLevel.value] || Info
})

const fastingLevelText = computed(() => {
  if (!hasFasting.value) return '安全日'
  return CalendarUtil.getFastingLevelText(highestFastingLevel.value as any)
})

const lunarInfo = computed(() => {
  if (!props.dayInfo) return { month: '', day: '', full: '' }
  return CalendarUtil.getFullLunarMonthDay(props.dayInfo.date)
})

const ganZhiInfo = computed(() => {
  if (!props.dayInfo || !props.dayInfo.ganZhi) return null
  return {
    yearGanZhi: props.dayInfo.ganZhi.yearGanZhi || '',
    monthGanZhi: props.dayInfo.ganZhi.monthGanZhi || '',
    dayGanZhi: props.dayInfo.ganZhi.dayGanZhi || '',
    yearGan: props.dayInfo.ganZhi.yearGan || '',
    yearZhi: props.dayInfo.ganZhi.yearZhi || '',
    monthGan: props.dayInfo.ganZhi.monthGan || '',
    monthZhi: props.dayInfo.ganZhi.monthZhi || '',
    dayGan: props.dayInfo.ganZhi.dayGan || '',
    dayZhi: props.dayInfo.ganZhi.dayZhi || ''
  }
})

const weekDayText = computed(() => {
  if (!props.dayInfo) return ''
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekDays[props.dayInfo.weekday]
})

// 方法
const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  close()
}

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return CalendarUtil.formatDate(date, 'YYYY-MM-DD')
}

const getFastingTypeText = (type: string) => {
  const typeMap = {
    regular: '常规戒期',
    special: '特殊戒期',
    personal: '个人戒期',
    solar_term: '节气戒期',
    fasting_day: '斋日'
  }
  return typeMap[type as keyof typeof typeMap] || '未知类型'
}

const getFastingLevelText = (level: string) => {
  return CalendarUtil.getFastingLevelText(level as any)
}

const getFastingItemClass = (level: string) => {
  const classMap = {
    major: 'border-red-500 bg-red-50',
    moderate: 'border-orange-500 bg-orange-50',
    minor: 'border-yellow-500 bg-yellow-50',
    safe: 'border-green-500 bg-green-50'
  }
  return classMap[level as keyof typeof classMap] || 'border-gray-500 bg-gray-50'
}

const getFastingIconClass = (level: string) => {
  const classMap = {
    major: 'bg-red-500',
    moderate: 'bg-orange-500',
    minor: 'bg-yellow-500',
    safe: 'bg-green-500'
  }
  return classMap[level as keyof typeof classMap] || 'bg-gray-500'
}

const getFastingBadgeClass = (level: string) => {
  const classMap = {
    major: 'bg-red-100 text-red-700',
    moderate: 'bg-orange-100 text-orange-700',
    minor: 'bg-yellow-100 text-yellow-700',
    safe: 'bg-green-100 text-green-700'
  }
  return classMap[level as keyof typeof classMap] || 'bg-gray-100 text-gray-700'
}

const addToCalendar = () => {
  if (props.dayInfo) {
    emit('add-to-calendar', props.dayInfo)
    close()
  }
}
</script>

<style scoped>
/* 自定义动画 */
.scale-95 {
  transform: scale(0.95);
}

.scale-100 {
  transform: scale(1);
}

.translate-y-4 {
  transform: translateY(1rem);
}

.translate-y-0 {
  transform: translateY(0);
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>