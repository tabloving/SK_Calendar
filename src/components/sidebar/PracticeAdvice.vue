<template>
  <div v-if="selectedDayInfo" class="practice-advice">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCalendarStore } from '@/stores/calendar'
import { useSettingsStore } from '@/stores/settings'
import { PreceptDataManager } from '@/utils/precept'
import * as lunar from 'lunar-javascript'

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
</script>