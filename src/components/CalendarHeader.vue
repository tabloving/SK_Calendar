<template>
  <div class="calendar-header bg-white rounded-lg shadow-sm px-4 py-2 mb-3">
    <div class="flex items-center justify-between">
      <!-- 左侧：导航和标题 -->
      <div class="flex items-center gap-3">
        <!-- 导航按钮组 -->
        <div class="flex items-center gap-1">
          <el-button
            :icon="ArrowLeft"
            @click="goToPreviousYear"
            title="上一年"
            class="nav-btn"
          />
          <el-button
            :icon="CaretLeft"
            @click="goToPreviousMonth"
            title="上个月"
            class="nav-btn"
          />
        </div>

        <!-- 标题区域 -->
        <div class="text-center min-w-[140px]">
          <h2 class="text-lg font-bold text-gray-800 leading-tight">
            {{ selectedYear }}年{{ selectedMonth }}月
          </h2>
          <div class="text-xs text-gray-500 leading-tight">
            {{ lunarMonthName }}
          </div>
        </div>

        <!-- 右侧导航按钮组 -->
        <div class="flex items-center gap-1">
          <el-button
            :icon="CaretRight"
            @click="goToNextMonth"
            title="下个月"
            class="nav-btn"
          />
          <el-button
            :icon="ArrowRight"
            @click="goToNextYear"
            title="下一年"
            class="nav-btn"
          />
        </div>
      </div>

      <!-- 右侧：操作按钮 -->
      <div class="flex items-center gap-2">
        <el-button
          size="small"
          :icon="Calendar"
          @click="goToToday"
          class="today-btn"
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
          size="small"
          style="width: 140px"
          class="month-picker"
        />
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
  border: 1px solid #f0f0f0;
}

/* 导航按钮样式 */
.nav-btn {
  @apply !p-2 !h-8 !w-8 rounded-md bg-gray-50 hover:bg-gray-100 border-0;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 今天按钮特殊样式 */
.today-btn {
  @apply !bg-gradient-to-r !from-blue-500 !to-blue-600 !text-white !border-0;
  transition: all 0.2s ease;
}

.today-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* 月份选择器样式 */
.month-picker :deep(.el-input__wrapper) {
  @apply !bg-gray-50 !border-gray-200 !rounded-md;
  box-shadow: none;
  transition: all 0.2s ease;
}

.month-picker :deep(.el-input__wrapper:hover) {
  @apply !border-blue-400;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.1);
}


/* 响应式设计 */
@media (max-width: 1024px) {
  .calendar-header {
    @apply px-3 py-2 mb-2;
  }

  .calendar-header > div {
    @apply gap-2;
  }

  .text-center.min-w-\[140px\] {
    @apply min-w-[120px];
  }

  h2 {
    @apply text-base;
  }

  .text-xs {
    @apply text-[10px];
  }

  }

@media (max-width: 768px) {
  .calendar-header > div {
    @apply flex-col gap-2;
  }

  .calendar-header > div > div:nth-child(2) {
    @apply order-2;
  }
}
</style>