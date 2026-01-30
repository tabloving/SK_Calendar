<template>
  <div class="settings-view">
    <!-- 页面标题区域 -->
    <div class="page-header">
      <div class="header-decoration-left"></div>
      <div class="header-content">
        <div class="header-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <h1 class="header-title">应用设置</h1>
      </div>
      <div class="header-decoration-right"></div>
    </div>

    <!-- 设置内容区域 -->
    <div class="settings-content">
      <!-- 显示设置卡片 -->
      <div class="settings-card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="card-title">显示设置</span>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">主题模式</span>
              <span class="setting-desc">选择应用的显示主题</span>
            </div>
            <div class="setting-control">
              <el-radio-group v-model="settings.theme" @change="handleThemeChange" class="theme-radio-group">
                <el-radio value="light">浅色</el-radio>
                <el-radio value="dark">深色</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">显示戒期标识</span>
              <span class="setting-desc">在日历格子中显示戒期等级指示器</span>
            </div>
            <div class="setting-control">
              <el-switch
                v-model="settings.showPreceptIndicators"
                @change="handleShowPreceptIndicatorsChange"
                active-color="#b8372e"
              />
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">显示农历日期</span>
              <span class="setting-desc">在日历中显示农历日期信息</span>
            </div>
            <div class="setting-control">
              <el-switch
                v-model="settings.showLunarDates"
                @change="handleShowLunarDatesChange"
                active-color="#b8372e"
              />
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-label">限制查询范围</span>
              <span class="setting-desc">仅允许查询以当前月份为基准的前后半年</span>
            </div>
            <div class="setting-control">
              <el-switch
                v-model="settings.limitedYearRange"
                @change="handleLimitedYearRangeChange"
                active-color="#b8372e"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 戒期类型设置卡片 -->
      <div class="settings-card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="card-title">戒期类型</span>
        </div>
        <div class="card-body">
          <div class="precept-type-grid">
            <div
              v-for="preceptType in preceptTypeOptions"
              :key="preceptType.value"
              class="precept-type-item"
              :class="{ 'precept-type-active': settings.enabledPreceptTypes.includes(preceptType.value) }"
              @click="togglePreceptType(preceptType.value)"
            >
              <div class="precept-type-checkbox">
                <svg v-if="settings.enabledPreceptTypes.includes(preceptType.value)" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="precept-type-info">
                <span class="precept-type-name">{{ preceptType.label }}</span>
                <span class="precept-type-desc">{{ preceptType.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 戒期等级说明卡片 -->
      <div class="settings-card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="card-title">戒期等级说明</span>
        </div>
        <div class="card-body">
          <div class="level-grid">
            <div class="level-item level-major">
              <div class="level-indicator"></div>
              <div class="level-info">
                <span class="level-name">大戒</span>
                <span class="level-desc">严重犯戒，应严格避免</span>
              </div>
            </div>
            <div class="level-item level-moderate">
              <div class="level-indicator"></div>
              <div class="level-info">
                <span class="level-name">中戒</span>
                <span class="level-desc">中等犯戒，应当谨慎</span>
              </div>
            </div>
            <div class="level-item level-minor">
              <div class="level-indicator"></div>
              <div class="level-info">
                <span class="level-name">宜戒</span>
                <span class="level-desc">轻微犯戒，建议注意</span>
              </div>
            </div>
            <div class="level-item level-safe">
              <div class="level-indicator"></div>
              <div class="level-info">
                <span class="level-name">安泰</span>
                <span class="level-desc">无特殊戒期</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 个人戒期管理卡片 -->
      <div class="settings-card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="card-title">个人戒期</span>
          <button class="add-btn" @click="showAddPersonalPreceptDialog">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>添加</span>
          </button>
        </div>
        <div class="card-body">
          <div v-if="personalPrecepts.length === 0" class="empty-state">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" stroke-width="1.5"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="empty-text">暂无个人戒期</p>
            <p class="empty-hint">点击上方按钮添加您的个人戒期</p>
          </div>

          <div v-else class="personal-precept-list">
            <div
              v-for="precept in personalPrecepts"
              :key="precept.id"
              class="personal-precept-card"
              :class="{ 'precept-disabled': !precept.enabled }"
            >
              <div class="precept-header">
                <span class="precept-name">{{ precept.name }}</span>
                <span class="precept-level-tag" :class="`tag-${precept.level}`">
                  {{ getPreceptLevelText(precept.level) }}
                </span>
                <span v-if="!precept.enabled" class="precept-status-tag">已禁用</span>
              </div>
              <div class="precept-details">
                <div class="precept-detail-item">
                  <span class="detail-label">日期</span>
                  <span class="detail-value">农历 {{ precept.date }}</span>
                </div>
                <div class="precept-detail-item">
                  <span class="detail-label">原因</span>
                  <span class="detail-value">{{ precept.reason }}</span>
                </div>
              </div>
              <div class="precept-actions">
                <button class="action-btn" @click="togglePersonalPrecept(precept.id)">
                  {{ precept.enabled ? '禁用' : '启用' }}
                </button>
                <button class="action-btn" @click="editPersonalPrecept(precept)">编辑</button>
                <button class="action-btn action-btn-danger" @click="deletePersonalPrecept(precept.id)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据管理卡片 -->
      <div class="settings-card">
        <div class="card-header">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="card-title">数据管理</span>
        </div>
        <div class="card-body">
          <div class="data-actions">
            <div class="data-action-group">
              <h4 class="action-group-title">导出数据</h4>
              <button class="data-btn" @click="exportSettings">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>导出设置</span>
              </button>
            </div>

            <div class="data-action-group">
              <h4 class="action-group-title">导入数据</h4>
              <el-upload
                :auto-upload="false"
                :show-file-list="false"
                accept=".json"
                :on-change="handleImportSettings"
              >
                <button class="data-btn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>导入设置</span>
                </button>
              </el-upload>
            </div>
          </div>

          <div class="reset-section">
            <button class="reset-btn" @click="resetSettings">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>重置所有设置</span>
            </button>
            <p class="reset-warning">重置将清除所有个人设置和戒期，请谨慎操作</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加/编辑个人戒期对话框 -->
    <el-dialog
      v-model="personalPreceptDialog.visible"
      :title="personalPreceptDialog.isEdit ? '编辑个人戒期' : '添加个人戒期'"
      width="500px"
    >
      <el-form
        ref="personalPreceptFormRef"
        :model="personalPreceptDialog.form"
        :rules="personalPreceptRules"
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="personalPreceptDialog.form.name"
            placeholder="请输入戒期名称"
          />
        </el-form-item>

        <el-form-item label="农历日期" prop="date">
          <el-input
            v-model="personalPreceptDialog.form.date"
            placeholder="格式：MM-DD，如：01-15"
          />
          <div class="text-sm text-gray-500 mt-1">
            请输入农历日期，格式为月-日，如：01-15表示正月十五
          </div>
        </el-form-item>

        <el-form-item label="原因" prop="reason">
          <el-input
            v-model="personalPreceptDialog.form.reason"
            type="textarea"
            :rows="3"
            placeholder="请输入戒期原因"
          />
        </el-form-item>

        <el-form-item label="等级" prop="level">
          <el-radio-group v-model="personalPreceptDialog.form.level">
            <el-radio value="major">大戒</el-radio>
            <el-radio value="moderate">中戒</el-radio>
            <el-radio value="minor">宜戒</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelPersonalPreceptDialog">取消</el-button>
          <el-button type="primary" @click="savePersonalPrecept">
            {{ personalPreceptDialog.isEdit ? '保存' : '添加' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import type { PersonalPrecept } from '@/types'
import { PreceptType } from '@/types'
import { getPreceptLevelText } from '@/data/precept/precept-config'

const settingsStore = useSettingsStore()

// 响应式数据
const settings = computed(() => settingsStore.settings)
const personalPrecepts = computed(() => settingsStore.settings.personalPrecepts)

// 戒期类型选项
const preceptTypeOptions = [
  { value: PreceptType.REGULAR, label: '常规戒期', desc: '每月固定日期的戒期' },
  { value: PreceptType.SPECIAL, label: '特殊戒期', desc: '佛菩萨圣诞等重要日期' },
  { value: PreceptType.PRECEPT_DAY, label: '斋日', desc: '六斋日、十斋日等' },
  { value: PreceptType.PERSONAL, label: '个人戒期', desc: '您自定义的戒期' }
]

// 切换戒期类型
const togglePreceptType = (type: PreceptType) => {
  const types = [...settings.value.enabledPreceptTypes]
  const index = types.indexOf(type)
  if (index > -1) {
    types.splice(index, 1)
  } else {
    types.push(type)
  }
  settingsStore.setEnabledPreceptTypes(types)
}

// 个人戒期对话框
const personalPreceptDialog = reactive({
  visible: false,
  isEdit: false,
  form: {
    id: '',
    name: '',
    date: '',
    reason: '',
    level: 'moderate' as 'major' | 'moderate' | 'minor',
    enabled: true
  }
})

const personalPreceptFormRef = ref<FormInstance>()

// 表单验证规则
const personalPreceptRules: FormRules = {
  name: [
    { required: true, message: '请输入戒期名称', trigger: 'blur' }
  ],
  date: [
    { required: true, message: '请输入农历日期', trigger: 'blur' },
    { pattern: /^\d{2}-\d{2}$/, message: '日期格式为 MM-DD', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '请输入戒期原因', trigger: 'blur' }
  ],
  level: [
    { required: true, message: '请选择戒期等级', trigger: 'change' }
  ]
}

// 方法
const handleThemeChange = (theme: 'light' | 'dark') => {
  settingsStore.setTheme(theme)
}

const handleShowPreceptIndicatorsChange = (value: boolean) => {
  settingsStore.setShowPreceptIndicators(value)
}

const handleShowLunarDatesChange = (value: boolean) => {
  settingsStore.setShowLunarDates(value)
}

const handleLimitedYearRangeChange = (value: boolean) => {
  settingsStore.setLimitedYearRange(value)
}

const showAddPersonalPreceptDialog = () => {
  personalPreceptDialog.visible = true
  personalPreceptDialog.isEdit = false
  resetPersonalPreceptForm()
}

const editPersonalPrecept = (precept: PersonalPrecept) => {
  personalPreceptDialog.visible = true
  personalPreceptDialog.isEdit = true
  Object.assign(personalPreceptDialog.form, precept)
}

const resetPersonalPreceptForm = () => {
  Object.assign(personalPreceptDialog.form, {
    id: '',
    name: '',
    date: '',
    reason: '',
    level: 'moderate' as const,
    enabled: true
  })
}

const cancelPersonalPreceptDialog = () => {
  personalPreceptDialog.visible = false
  resetPersonalPreceptForm()
}

const savePersonalPrecept = async () => {
  if (!personalPreceptFormRef.value) return

  try {
    await personalPreceptFormRef.value.validate()

    if (personalPreceptDialog.isEdit) {
      settingsStore.updatePersonalPrecept(personalPreceptDialog.form.id, {
        name: personalPreceptDialog.form.name,
        date: personalPreceptDialog.form.date,
        reason: personalPreceptDialog.form.reason,
        level: personalPreceptDialog.form.level as any
      })
      ElMessage.success('个人戒期更新成功')
    } else {
      settingsStore.addPersonalPrecept({
        name: personalPreceptDialog.form.name,
        date: personalPreceptDialog.form.date,
        reason: personalPreceptDialog.form.reason,
        level: personalPreceptDialog.form.level as any,
        type: 'personal' as any,
        enabled: true
      })
      ElMessage.success('个人戒期添加成功')
    }

    personalPreceptDialog.visible = false
    resetPersonalPreceptForm()
  } catch (error) {
    console.error('保存个人戒期失败:', error)
  }
}

const togglePersonalPrecept = (id: string) => {
  settingsStore.togglePersonalPrecept(id)
}

const deletePersonalPrecept = async (id: string) => {
  try {
    await ElMessageBox.confirm('确定要删除这个个人戒期吗？', '确认删除', {
      type: 'warning'
    })
    settingsStore.deletePersonalPrecept(id)
    ElMessage.success('个人戒期删除成功')
  } catch (error) {
    // 用户取消删除
  }
}

const exportSettings = () => {
  const settingsJson = settingsStore.exportSettings()
  const dataBlob = new Blob([settingsJson], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = '寿康宝鉴日历设置.json'
  link.click()
  URL.revokeObjectURL(url)
  ElMessage.success('设置导出成功')
}

const handleImportSettings = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const settingsJson = e.target?.result as string
      const success = settingsStore.importSettings(settingsJson)
      if (success) {
        ElMessage.success('设置导入成功')
      } else {
        ElMessage.error('设置导入失败，请检查文件格式')
      }
    } catch (error) {
      ElMessage.error('文件解析失败')
    }
  }
  reader.readAsText(file.raw)
}

const resetSettings = async () => {
  try {
    await ElMessageBox.confirm(
      '重置将清除所有个人设置和戒期，此操作不可恢复，确定继续吗？',
      '确认重置',
      {
        type: 'warning',
        confirmButtonText: '确定重置',
        cancelButtonText: '取消'
      }
    )
    settingsStore.resetSettings()
    ElMessage.success('设置重置成功')
  } catch (error) {
    // 用户取消重置
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 16px 32px;
}

/* 页面标题区域 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px 0 32px;
  position: relative;
}

.header-decoration-left,
.header-decoration-right {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c9a86c, transparent);
  position: relative;
}

.header-decoration-left::before,
.header-decoration-right::before {
  content: '';
  position: absolute;
  top: -3px;
  width: 8px;
  height: 8px;
  background: #c9a86c;
  transform: rotate(45deg);
}

.header-decoration-left::before {
  right: 0;
}

.header-decoration-right::before {
  left: 0;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 32px;
  height: 32px;
  color: #b8372e;
}

.header-icon svg {
  width: 100%;
  height: 100%;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: #5c4033;
  letter-spacing: 4px;
  font-family: 'SimSun', 'STSong', 'PingFang SC', serif;
  margin: 0;
}

/* 设置内容区域 */
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 设置卡片 */
.settings-card {
  background: linear-gradient(180deg, #fffdf9 0%, #faf8f5 100%);
  border: 1px solid #e8e2d9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(139, 90, 43, 0.06);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%);
  border-bottom: 1px solid #e8e2d9;
  position: relative;
}

.card-header::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: linear-gradient(180deg, #b8372e, #c94a3f);
  border-radius: 0 2px 2px 0;
}

.card-icon {
  width: 20px;
  height: 20px;
  color: #b8372e;
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #5c4033;
  letter-spacing: 1px;
}

.card-body {
  padding: 20px;
}

/* 设置项 */
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px dashed #e8e2d9;
}

.setting-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-item:first-child {
  padding-top: 0;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-size: 15px;
  font-weight: 500;
  color: #5c4033;
}

.setting-desc {
  font-size: 13px;
  color: #8b7355;
}

.setting-control {
  flex-shrink: 0;
}

/* 主题单选组 */
.theme-radio-group :deep(.el-radio) {
  margin-right: 16px;
}

.theme-radio-group :deep(.el-radio__input.is-checked .el-radio__inner) {
  background: #b8372e;
  border-color: #b8372e;
}

.theme-radio-group :deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #b8372e;
}

/* 戒期类型网格 */
.precept-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.precept-type-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: #faf8f5;
  border: 1px solid #e8e2d9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.precept-type-item:hover {
  border-color: #c9a86c;
  background: #fffdf9;
}

.precept-type-active {
  border-color: #b8372e;
  background: linear-gradient(135deg, #fef7f6 0%, #fdf2f1 100%);
}

.precept-type-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #d4cfc6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
}

.precept-type-active .precept-type-checkbox {
  background: #b8372e;
  border-color: #b8372e;
}

.precept-type-checkbox svg {
  width: 14px;
  height: 14px;
  color: white;
}

.precept-type-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.precept-type-name {
  font-size: 14px;
  font-weight: 500;
  color: #5c4033;
}

.precept-type-desc {
  font-size: 12px;
  color: #8b7355;
}

/* 戒期等级网格 */
.level-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.level-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #faf8f5;
  border-radius: 8px;
  border: 1px solid #e8e2d9;
}

.level-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.level-major .level-indicator {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
}

.level-moderate .level-indicator {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
}

.level-minor .level-indicator {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
}

.level-safe .level-indicator {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 2px 6px rgba(34, 197, 94, 0.4);
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.level-name {
  font-size: 14px;
  font-weight: 600;
  color: #5c4033;
}

.level-desc {
  font-size: 12px;
  color: #8b7355;
}

/* 添加按钮 */
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  padding: 8px 16px;
  background: linear-gradient(135deg, #b8372e 0%, #c94a3f 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: linear-gradient(135deg, #a32f27 0%, #b8372e 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(184, 55, 46, 0.3);
}

.add-btn svg {
  width: 16px;
  height: 16px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: #8b7355;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #c9a86c;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.empty-text {
  font-size: 16px;
  font-weight: 500;
  color: #5c4033;
  margin: 0 0 8px;
}

.empty-hint {
  font-size: 14px;
  color: #8b7355;
  margin: 0;
}

/* 个人戒期列表 */
.personal-precept-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.personal-precept-card {
  padding: 16px;
  background: #faf8f5;
  border: 1px solid #e8e2d9;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.personal-precept-card:hover {
  border-color: #c9a86c;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.08);
}

.precept-disabled {
  opacity: 0.6;
}

.precept-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.precept-name {
  font-size: 15px;
  font-weight: 600;
  color: #5c4033;
}

.precept-level-tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.tag-major {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.tag-moderate {
  background: #f5f3ff;
  color: #7c3aed;
  border: 1px solid #ddd6fe;
}

.tag-minor {
  background: #eff6ff;
  color: #3b82f6;
  border: 1px solid #bfdbfe;
}

.precept-status-tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.precept-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.precept-detail-item {
  display: flex;
  gap: 8px;
  font-size: 13px;
}

.detail-label {
  color: #8b7355;
  flex-shrink: 0;
}

.detail-value {
  color: #5c4033;
}

.precept-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px dashed #e8e2d9;
}

.action-btn {
  padding: 6px 14px;
  background: transparent;
  border: 1px solid #d4cfc6;
  border-radius: 4px;
  font-size: 13px;
  color: #5c4033;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  border-color: #c9a86c;
  background: #faf8f5;
}

.action-btn-danger {
  color: #dc2626;
  border-color: #fecaca;
}

.action-btn-danger:hover {
  background: #fef2f2;
  border-color: #dc2626;
}

/* 数据管理 */
.data-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.data-action-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-group-title {
  font-size: 14px;
  font-weight: 500;
  color: #5c4033;
  margin: 0;
}

.data-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background: #faf8f5;
  border: 1px solid #d4cfc6;
  border-radius: 8px;
  font-size: 14px;
  color: #5c4033;
  cursor: pointer;
  transition: all 0.2s ease;
}

.data-btn:hover {
  border-color: #c9a86c;
  background: #fffdf9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.08);
}

.data-btn svg {
  width: 18px;
  height: 18px;
  color: #8b7355;
}

/* 重置区域 */
.reset-section {
  padding-top: 20px;
  border-top: 1px solid #e8e2d9;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #fecaca;
  border-radius: 6px;
  font-size: 14px;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #fef2f2;
  border-color: #dc2626;
}

.reset-btn svg {
  width: 18px;
  height: 18px;
}

.reset-warning {
  font-size: 13px;
  color: #8b7355;
  margin: 10px 0 0;
}

/* 对话框样式 */
.dialog-form {
  padding: 10px 0;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #5c4033;
  margin-bottom: 8px;
}

.form-hint {
  font-size: 12px;
  color: #8b7355;
  margin-top: 6px;
}

/* 响应式 */
@media (max-width: 768px) {
  .settings-view {
    padding: 0 12px 24px;
    height: auto;
  }

  .page-header {
    padding: 16px 0 24px;
  }

  .header-decoration-left,
  .header-decoration-right {
    width: 40px;
  }

  .header-title {
    font-size: 20px;
    letter-spacing: 2px;
  }

  .header-icon {
    width: 24px;
    height: 24px;
  }

  .precept-type-grid,
  .level-grid,
  .data-actions {
    grid-template-columns: 1fr;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-header {
    flex-wrap: wrap;
  }

  .add-btn {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    justify-content: center;
  }
}
</style>