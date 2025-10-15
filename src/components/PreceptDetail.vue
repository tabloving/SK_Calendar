<template>
  <div class="precept-detail bg-white rounded-lg shadow-sm p-4">
    <DateNavigation />

    <DateCard v-if="selectedDayInfo" />

    <PreceptDetailCard v-if="selectedDayInfo" />

    <PracticeAdvice v-if="selectedDayInfo" />

    <div v-if="!selectedDayInfo" class="text-center text-gray-500 py-8">
      <el-icon size="48" class="mb-4"><Calendar /></el-icon>
      <p>请选择日期查看戒期详情</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { Calendar } from '@element-plus/icons-vue'
import DateNavigation from './sidebar/DateNavigation.vue'
import DateCard from './sidebar/DateCard.vue'
import PreceptDetailCard from './sidebar/PreceptDetailCard.vue'
import PracticeAdvice from './sidebar/PracticeAdvice.vue'

const calendarStore = useCalendarStore()
const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)
</script>

<style scoped>
.precept-detail {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 0; /* 由子组件自己控制间距，避免双重间距 */
}
</style>