import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AppSettings, PersonalFasting, FastingType } from '@/types'
import { FastingType as FastingTypeEnum } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  // 默认设置
  const defaultSettings: AppSettings = {
    theme: 'light',
    showFastingIndicators: true,
    showLunarDates: true,
    enabledFastingTypes: [
      FastingTypeEnum.REGULAR,
      FastingTypeEnum.SPECIAL,
      FastingTypeEnum.SOLAR_TERM,
      FastingTypeEnum.FASTING_DAY
    ],
    personalFastings: []
  }

  // 状态
  const settings = ref<AppSettings>({ ...defaultSettings })

  // 计算属性
  const isDarkTheme = computed(() => settings.value.theme === 'dark')

  // 本地存储相关方法
  const saveSettings = () => {
    localStorage.setItem('sk-calendar-settings', JSON.stringify(settings.value))
  }

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('sk-calendar-settings')
      if (saved) {
        settings.value = { ...defaultSettings, ...JSON.parse(saved) }
      }
    } catch (error) {
      console.error('加载设置失败:', error)
      settings.value = { ...defaultSettings }
    }
  }

  // 主题设置
  const setTheme = (theme: 'light' | 'dark') => {
    settings.value.theme = theme
    saveSettings()
  }

  const toggleTheme = () => {
    setTheme(settings.value.theme === 'light' ? 'dark' : 'light')
  }

  // 显示设置
  const setShowFastingIndicators = (show: boolean) => {
    settings.value.showFastingIndicators = show
    saveSettings()
  }

  const setShowLunarDates = (show: boolean) => {
    settings.value.showLunarDates = show
    saveSettings()
  }

  // 戒期类型设置
  const setEnabledFastingTypes = (types: FastingType[]) => {
    settings.value.enabledFastingTypes = types
    saveSettings()
  }

  const toggleFastingType = (type: FastingType) => {
    const index = settings.value.enabledFastingTypes.indexOf(type)
    if (index > -1) {
      settings.value.enabledFastingTypes.splice(index, 1)
    } else {
      settings.value.enabledFastingTypes.push(type)
    }
    saveSettings()
  }

  // 个人戒期管理
  const addPersonalFasting = (fasting: Omit<PersonalFasting, 'id'>) => {
    const newFasting: PersonalFasting = {
      ...fasting,
      id: Date.now().toString()
    }
    settings.value.personalFastings.push(newFasting)
    saveSettings()
    return newFasting
  }

  const updatePersonalFasting = (id: string, updates: Partial<PersonalFasting>) => {
    const index = settings.value.personalFastings.findIndex(f => f.id === id)
    if (index > -1) {
      settings.value.personalFastings[index] = {
        ...settings.value.personalFastings[index],
        ...updates
      }
      saveSettings()
    }
  }

  const deletePersonalFasting = (id: string) => {
    const index = settings.value.personalFastings.findIndex(f => f.id === id)
    if (index > -1) {
      settings.value.personalFastings.splice(index, 1)
      saveSettings()
    }
  }

  const togglePersonalFasting = (id: string) => {
    const fasting = settings.value.personalFastings.find(f => f.id === id)
    if (fasting) {
      fasting.enabled = !fasting.enabled
      saveSettings()
    }
  }

  // 重置设置
  const resetSettings = () => {
    settings.value = { ...defaultSettings }
    saveSettings()
  }

  // 导出设置
  const exportSettings = () => {
    return JSON.stringify(settings.value, null, 2)
  }

  // 导入设置
  const importSettings = (settingsJson: string) => {
    try {
      const imported = JSON.parse(settingsJson)
      settings.value = { ...defaultSettings, ...imported }
      saveSettings()
      return true
    } catch (error) {
      console.error('导入设置失败:', error)
      return false
    }
  }

  return {
    // 状态
    settings,

    // 计算属性
    isDarkTheme,

    // 方法
    saveSettings,
    loadSettings,
    setTheme,
    toggleTheme,
    setShowFastingIndicators,
    setShowLunarDates,
    setEnabledFastingTypes,
    toggleFastingType,
    addPersonalFasting,
    updatePersonalFasting,
    deletePersonalFasting,
    togglePersonalFasting,
    resetSettings,
    exportSettings,
    importSettings
  }
})