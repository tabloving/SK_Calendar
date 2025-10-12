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

        <el-dropdown @command="handleQuickJump">
          <el-button type="text">
            快速跳转<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="currentMonth">本月</el-dropdown-item>
              <el-dropdown-item command="nextMonth">下月</el-dropdown-item>
              <el-dropdown-item command="springFestival">春节</el-dropdown-item>
              <el-dropdown-item command="qingming">清明</el-dropdown-item>
              <el-dropdown-item command="dragonBoat">端午</el-dropdown-item>
              <el-dropdown-item command="midAutumn">中秋</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import {
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
  Calendar,
  ArrowDown
} from '@element-plus/icons-vue'

const calendarStore = useCalendarStore()

// 响应式数据
const monthPicker = ref('')

// 计算属性
const selectedYear = computed(() => calendarStore.selectedYear)
const selectedMonth = computed(() => calendarStore.selectedMonth)
const monthStats = computed(() => calendarStore.getMonthFastingStats)

const fastingPercentage = computed(() => {
  if (monthStats.value.total === 0) return 0
  const fastingDays = monthStats.value.major + monthStats.value.moderate + monthStats.value.minor
  return Math.round((fastingDays / monthStats.value.total) * 100)
})

const lunarMonthName = computed(() => {
  // 这里可以通过lunar.js获取农历月份名称
  const monthNames = [
    '正月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '冬月', '腊月'
  ]
  return monthNames[selectedMonth.value - 1] || '未知'
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

const handleQuickJump = (command: string) => {
  const year = selectedYear.value
  let targetMonth = selectedMonth.value

  switch (command) {
    case 'currentMonth':
      goToToday()
      break
    case 'nextMonth':
      calendarStore.goToNextMonth()
      break
    case 'springFestival':
      // 春节通常在1-2月，这里简化处理为2月
      targetMonth = 2
      calendarStore.goToMonth(year, targetMonth)
      break
    case 'qingming':
      // 清明通常在4月
      targetMonth = 4
      calendarStore.goToMonth(year, targetMonth)
      break
    case 'dragonBoat':
      // 端午通常在5-6月，这里简化处理为6月
      targetMonth = 6
      calendarStore.goToMonth(year, targetMonth)
      break
    case 'midAutumn':
      // 中秋通常在9-10月，这里简化处理为9月
      targetMonth = 9
      calendarStore.goToMonth(year, targetMonth)
      break
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