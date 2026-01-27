import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AppSettings, PersonalPrecept, PreceptType } from '@/types'
import { PreceptType as PreceptTypeEnum } from '@/types'

export const useSettingsStore = defineStore('settings', () => {
  // 默认设置
  const defaultSettings: AppSettings = {
    theme: 'light',
    showPreceptIndicators: true,
    showLunarDates: true,
    limitedYearRange: true,
    enabledPreceptTypes: [
      PreceptTypeEnum.REGULAR,
      PreceptTypeEnum.SPECIAL,
      PreceptTypeEnum.PRECEPT_DAY
    ],
    personalPrecepts: []
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
  const setShowPreceptIndicators = (show: boolean) => {
    settings.value.showPreceptIndicators = show
    saveSettings()
  }

  const setShowLunarDates = (show: boolean) => {
    settings.value.showLunarDates = show
    saveSettings()
  }

  const setLimitedYearRange = (limited: boolean) => {
    settings.value.limitedYearRange = limited
    saveSettings()
  }

  // 戒期类型设置
  const setEnabledPreceptTypes = (types: PreceptType[]) => {
    settings.value.enabledPreceptTypes = types
    saveSettings()
  }

  const togglePreceptType = (type: PreceptType) => {
    const index = settings.value.enabledPreceptTypes.indexOf(type)
    if (index > -1) {
      settings.value.enabledPreceptTypes.splice(index, 1)
    } else {
      settings.value.enabledPreceptTypes.push(type)
    }
    saveSettings()
  }

  // 个人戒期管理
  const addPersonalPrecept = (precept: Omit<PersonalPrecept, 'id'>) => {
    const newPrecept: PersonalPrecept = {
      ...precept,
      id: Date.now().toString()
    }
    settings.value.personalPrecepts.push(newPrecept)
    saveSettings()
    return newPrecept
  }

  const updatePersonalPrecept = (id: string, updates: Partial<PersonalPrecept>) => {
    const index = settings.value.personalPrecepts.findIndex(f => f.id === id)
    if (index > -1) {
      settings.value.personalPrecepts[index] = {
        ...settings.value.personalPrecepts[index],
        ...updates
      }
      saveSettings()
    }
  }

  const deletePersonalPrecept = (id: string) => {
    const index = settings.value.personalPrecepts.findIndex(f => f.id === id)
    if (index > -1) {
      settings.value.personalPrecepts.splice(index, 1)
      saveSettings()
    }
  }

  const togglePersonalPrecept = (id: string) => {
    const precept = settings.value.personalPrecepts.find(f => f.id === id)
    if (precept) {
      precept.enabled = !precept.enabled
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
    setShowPreceptIndicators,
    setShowLunarDates,
    setLimitedYearRange,
    setEnabledPreceptTypes,
    togglePreceptType,
    addPersonalPrecept,
    updatePersonalPrecept,
    deletePersonalPrecept,
    togglePersonalPrecept,
    resetSettings,
    exportSettings,
    importSettings
  }
})