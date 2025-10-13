<template>
  <div class="calendar-header bg-white rounded-lg shadow-sm p-4 mb-4">
    <div class="flex items-center justify-between">
      <!-- 年月导航 -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <el-button
            type="text"
            :icon="ArrowLeft"
            @click="goToPreviousYear"
            title="上一年"
          />
          <el-button
            type="text"
            :icon="CaretLeft"
            @click="goToPreviousMonth"
            title="上个月"
          />
        </div>

        <div class="text-center min-w-[200px]">
          <h2 class="text-xl font-bold text-gray-800">
            {{ selectedYear }}年{{ selectedMonth }}月
          </h2>
          <div class="text-sm text-gray-500">
            农历{{ lunarMonthName }}
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <el-button
            type="text"
            :icon="CaretRight"
            @click="goToNextMonth"
            title="下个月"
          />
          <el-button
            type="text"
            :icon="ArrowRight"
            @click="goToNextYear"
            title="下一年"
          />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex items-center space-x-2">
        <el-button
          type="primary"
          :icon="Calendar"
          @click="goToToday"
        >
          今天
        </el-button>

        <el-date-picker
          v-model="monthPicker"
          type="month"
          placeholder="选择月份"
          format="YYYY年MM月"
          value-format="YYYY-MM"
          @change="onMonthChange"
          style="width: 160px"
        />

      </div>
    </div>

    <!-- 戒期统计 -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex items-center space-x-4 text-sm">
        <div class="flex items-center">
          <span class="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
          <span>大罪 {{ monthStats.major }}天</span>
        </div>
        <div class="flex items-center">
          <span class="w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
          <span>中罪 {{ monthStats.moderate }}天</span>
        </div>
        <div class="flex items-center">
          <span class="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
          <span>小罪 {{ monthStats.minor }}天</span>
        </div>
        <div class="flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
          <span>安全 {{ monthStats.safe }}天</span>
        </div>
      </div>

      <div class="text-sm text-gray-500">
        共{{ monthStats.total }}天，戒期占比 {{ fastingPercentage }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { CalendarUtil } from '@/utils/calendar'
import { LunarCalendarUtil } from '@/utils/lunar'
import * as lunar from 'lunar-javascript'
import {
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
  Calendar
} from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()

// 响应式数据
const monthPicker = ref('')

// 计算属性
const selectedYear = computed(() => calendarStore.selectedYear)
const selectedMonth = computed(() => calendarStore.selectedMonth)
const monthStats = computed(() => calendarStore.getMonthPreceptStats)

const fastingPercentage = computed(() => {
  if (monthStats.value.total === 0) return 0
  const fastingDays = monthStats.value.major + monthStats.value.moderate + monthStats.value.minor
  return Math.round((fastingDays / monthStats.value.total) * 100)
})

const lunarMonthName = computed(() => {
  try {
    // 使用lunar.js获取该月第一天的农历月份名称
    const solar = lunar.Solar.fromYmd(selectedYear.value, selectedMonth.value, 1)
    const lunarDate = solar.getLunar()
    return `${lunarDate.getYearInChinese()}年${lunarDate.getMonthInChinese()}月`
  } catch (error) {
    // 如果出错，降级显示公历年份
    return `${selectedYear.value}年`
  }
})

// 监听选择的年月变化
watch([selectedYear, selectedMonth], () => {
  monthPicker.value = `${selectedYear.value}-${selectedMonth.value.toString().padStart(2, '0')}`
}, { immediate: true })

// 方法
const goToPreviousMonth = () => {
  calendarStore.goToPreviousMonth()
}

const goToNextMonth = () => {
  calendarStore.goToNextMonth()
}

const goToPreviousYear = () => {
  calendarStore.goToPreviousYear()
}

const goToNextYear = () => {
  calendarStore.goToNextYear()
}

const goToToday = () => {
  calendarStore.goToToday()
}


const onMonthChange = (value: string) => {
  if (value) {
    const [year, month] = value.split('-').map(Number)
    calendarStore.goToMonth(year, month)
  }
}

</script>

<style scoped>
.calendar-header {
  user-select: none;
}

.el-button {
  transition: all 0.2s ease;
}

.el-button:hover {
  transform: translateY(-1px);
}
</style>