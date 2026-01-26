<template>
  <div class="settings-view space-y-6">
    <el-card>
      <template #header>
        <div class="flex items-center">
          <el-icon class="mr-2"><Setting /></el-icon>
          <span class="text-lg font-semibold">应用设置</span>
        </div>
      </template>

      <el-form :model="settings" label-width="120px" class="settings-form">
        <!-- 主题设置 -->
        <el-form-item label="主题模式">
          <el-radio-group v-model="settings.theme" @change="handleThemeChange">
            <el-radio value="light">浅色模式</el-radio>
            <el-radio value="dark">深色模式</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 显示设置 -->
        <el-divider content-position="left">显示设置</el-divider>

        <el-form-item label="显示戒期标识">
          <el-switch
            v-model="settings.showPreceptIndicators"
            @change="handleShowPreceptIndicatorsChange"
          />
          <div class="text-sm text-gray-500 mt-1">
            在日历格子中显示戒期等级指示器
          </div>
        </el-form-item>

        <el-form-item label="显示农历日期">
          <el-switch
            v-model="settings.showLunarDates"
            @change="handleShowLunarDatesChange"
          />
          <div class="text-sm text-gray-500 mt-1">
            在日历中显示农历日期信息
          </div>
        </el-form-item>

        <!-- 戒期类型设置 -->
        <el-divider content-position="left">戒期类型</el-divider>

        <el-form-item label="启用的戒期">
          <el-checkbox-group
            v-model="settings.enabledPreceptTypes"
            @change="handleEnabledPreceptTypesChange"
          >
            <el-checkbox value="regular" class="mb-2">常规戒期</el-checkbox>
            <el-checkbox value="special" class="mb-2">特殊戒期（佛菩萨圣诞）</el-checkbox>
            <el-checkbox value="precept_day" class="mb-2">斋日（六斋日、十斋日）</el-checkbox>
            <el-checkbox value="personal" class="mb-2">个人戒期</el-checkbox>
          </el-checkbox-group>
          <div class="text-sm text-gray-500 mt-1">
            选择需要在日历中显示的戒期类型
          </div>
        </el-form-item>

        <!-- 戒期等级说明 -->
        <el-divider content-position="left">戒期等级说明</el-divider>

        <el-form-item label="等级说明">
          <div class="space-y-2">
            <div class="flex items-center">
              <div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span class="font-semibold">大罪</span>
              <span class="ml-2 text-gray-600">- 严重犯戒，应严格避免</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
              <span class="font-semibold">中罪</span>
              <span class="ml-2 text-gray-600">- 中等犯戒，应当谨慎</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span class="font-semibold">小罪</span>
              <span class="ml-2 text-gray-600">- 轻微犯戒，建议注意</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span class="font-semibold">安全</span>
              <span class="ml-2 text-gray-600">- 无特殊戒期</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 个人戒期管理 -->
    <el-card>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <el-icon class="mr-2"><User /></el-icon>
            <span class="text-lg font-semibold">个人戒期</span>
          </div>
          <el-button type="primary" @click="showAddPersonalPreceptDialog">
            <el-icon class="mr-1"><Plus /></el-icon>
            添加个人戒期
          </el-button>
        </div>
      </template>

      <div v-if="personalPrecepts.length === 0" class="text-center text-gray-500 py-8">
        <el-icon size="48" class="mb-4"><Document /></el-icon>
        <p>暂无个人戒期</p>
        <p class="text-sm mt-2">点击上方按钮添加您的个人戒期</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="precept in personalPrecepts"
          :key="precept.id"
          class="personal-precept-item border rounded-lg p-4"
          :class="{ 'opacity-50': !precept.enabled }"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="font-semibold">{{ precept.name }}</span>
                <el-tag
                  :type="getTagType(precept.level)"
                  size="small"
                  class="ml-2"
                >
                  {{ getPreceptLevelText(precept.level) }}
                </el-tag>
                <el-tag
                  v-if="!precept.enabled"
                  type="info"
                  size="small"
                  class="ml-2"
                >
                  已禁用
                </el-tag>
              </div>
              <div class="text-sm text-gray-600">
                <div>日期：农历{{ precept.date }}</div>
                <div>原因：{{ precept.reason }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <el-button
                type="text"
                size="small"
                @click="togglePersonalPrecept(precept.id)"
              >
                {{ precept.enabled ? '禁用' : '启用' }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="editPersonalPrecept(precept)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                class="text-red-600"
                @click="deletePersonalPrecept(precept.id)"
              >
                删除
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 数据管理 -->
    <el-card>
      <template #header>
        <div class="flex items-center">
          <el-icon class="mr-2"><FolderOpened /></el-icon>
          <span class="text-lg font-semibold">数据管理</span>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <h4 class="font-semibold">导出数据</h4>
          <el-button class="w-full" @click="exportSettings">
            <el-icon class="mr-2"><Download /></el-icon>
            导出设置
          </el-button>
        </div>

        <div class="space-y-3">
          <h4 class="font-semibold">导入数据</h4>
          <el-upload
            class="w-full"
            :auto-upload="false"
            :show-file-list="false"
            accept=".json"
            :on-change="handleImportSettings"
          >
            <el-button class="w-full">
              <el-icon class="mr-2"><Upload /></el-icon>
              导入设置
            </el-button>
          </el-upload>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t">
        <el-button type="danger" @click="resetSettings">
          <el-icon class="mr-2"><RefreshLeft /></el-icon>
          重置所有设置
        </el-button>
        <div class="text-sm text-gray-500 mt-2">
          重置将清除所有个人设置和戒期，请谨慎操作
        </div>
      </div>
    </el-card>

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
            <el-radio value="major">大罪</el-radio>
            <el-radio value="moderate">中罪</el-radio>
            <el-radio value="minor">小罪</el-radio>
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
import {
  Setting,
  User,
  Plus,
  Document,
  FolderOpened,
  Download,
  Upload,
  RefreshLeft
} from '@element-plus/icons-vue'
import type { PersonalPrecept } from '@/types'

const settingsStore = useSettingsStore()

// 响应式数据
const settings = computed(() => settingsStore.settings)
const personalPrecepts = computed(() => settingsStore.settings.personalPrecepts)

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

const handleEnabledPreceptTypesChange = (types: string[]) => {
  settingsStore.setEnabledPreceptTypes(types as any)
}

const getPreceptLevelText = (level: string) => {
  const levelMap = {
    major: '大罪',
    moderate: '中罪',
    minor: '小罪'
  }
  return levelMap[level as keyof typeof levelMap] || '未知'
}

const getTagType = (level: string) => {
  const typeMap = {
    major: 'danger',
    moderate: 'warning',
    minor: 'info'
  }
  return typeMap[level as keyof typeof typeMap] || 'info'
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
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 24px;
}

.settings-form .el-form-item {
  margin-bottom: 24px;
}

.personal-precept-item {
  transition: all 0.2s ease;
}

.personal-precept-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .settings-view {
    padding: 16px;
    height: auto;
  }

  .grid.grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>