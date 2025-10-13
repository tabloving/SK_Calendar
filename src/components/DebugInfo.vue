<template>
  <div class="debug-info bg-gray-100 p-4 rounded text-xs">
    <h4 class="font-bold mb-2">调试信息</h4>
    <div>日期: {{ dayInfo.date.toLocaleDateString() }}</div>
    <div>农历: {{ dayInfo.lunarDate }}</div>
    <div>干支存在: {{ !!dayInfo.ganZhi }}</div>
    <div v-if="dayInfo.ganZhi">
      <div>年干支: {{ dayInfo.ganZhi.yearGanZhi }}</div>
      <div>月干支: {{ dayInfo.ganZhi.monthGanZhi }}</div>
      <div>日干支: {{ dayInfo.ganZhi.dayGanZhi }}</div>
    </div>
    <div>戒期数量: {{ dayInfo.preceptInfos.length }}</div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarDayInfo } from '@/types'

interface Props {
  dayInfo: CalendarDayInfo
}

defineProps<Props>()
</script>