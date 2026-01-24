<template>
  <div v-if="selectedDayInfo" class="precept-info">
    <h4 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">
      <el-icon class="mr-2" :size="20">
        <View />
      </el-icon>
      戒期详情
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
              <span class="font-semibold">{{ getPreceptTitle(precept) }}</span>
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

              <!-- 如果是社日，添加特殊警告 -->
              <div v-if="precept.detail?.tags?.includes('二社日')" class="bg-red-100 border border-red-300 rounded p-2 text-red-700 text-sm">
                <div class="flex items-center">
                  <WarningFilled class="w-4 h-4 mr-1" />
                  <span>社日受胎者，毛发皆白</span>
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
    <div v-if="!(hasPreceptDays || filteredPreceptInfos.length > 0)" class="precept-item border rounded-lg p-4" :class="getPreceptItemClass('safe')">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center mb-2">
            <div class="precept-indicator safe mr-2"></div>
            <span class="font-semibold">今日清净日</span>
            <el-tag
              size="small"
              class="ml-2"
              :style="getPreceptLevelStyle('safe')"
            >
              安泰
            </el-tag>
          </div>
          <div class="text-sm text-gray-600 space-y-1">
            <div class="flex items-center">
              <span class="font-medium text-gray-700 mr-2">状态：</span>
              <span class="text-green-600 font-medium">心清意净，自在安然</span>
            </div>
            <div>建议：宜精进修行，清净身心，进德修业，慎勿放逸！</div>
          </div>
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
import { PreceptType } from '@/types'
import * as lunar from 'lunar-javascript'
import { View, Star, WarningFilled } from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()
const settingsStore = useSettingsStore()
const preceptManager = PreceptDataManager.getInstance()

const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)

const filteredPreceptInfos = computed(() => {
  if (!selectedDayInfo.value) return []

  return selectedDayInfo.value.preceptInfos.filter(precept =>
    settingsStore.settings.enabledPreceptTypes.includes(precept.type)
  )
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

const getPreceptLevelText = (level: string) => {
  return CalendarUtil.getPreceptLevelText(level as any)
}

const getPreceptTypeText = (type: string) => {
  const typeMap = {
    regular: '常规戒期',
    special: '特殊戒期',
    personal: '个人戒期',
    precept_day: '斋日'
  }
  return typeMap[type as keyof typeof typeMap] || '未知类型'
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

/**
 * 获取戒期标题
 * 对于三伏日，统一显示为"三伏日"
 */
const getPreceptTitle = (precept: any) => {
  // 检查是否为三伏日（通过标签判断）
  if (precept.detail?.tags?.includes('三伏日')) {
    return '三伏日'
  }
  return precept.reason
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
</style>