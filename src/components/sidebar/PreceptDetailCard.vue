<template>
  <div v-if="selectedDayInfo">
    <PreceptInfo />
    <UpcomingPrecepts />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import PreceptInfo from './PreceptInfo.vue'
import UpcomingPrecepts from './UpcomingPrecepts.vue'

const calendarStore = useCalendarStore()
const selectedDayInfo = computed(() => calendarStore.selectedDayInfo)
</script>