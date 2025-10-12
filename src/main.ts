import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/styles/main.css'

import App from './App.vue'
import router from './router'
import { useSettingsStore } from './stores/settings'

const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册自定义图标
import {
  CheckCircle,
  Warning,
  AlertTriangle,
  AlertCircle,
  Info
} from './components/icons'

app.component('CheckCircle', CheckCircle)
app.component('Warning', Warning)
app.component('AlertTriangle', AlertTriangle)
app.component('AlertCircle', AlertCircle)
app.component('Info', Info)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 初始化设置
const settingsStore = useSettingsStore()
settingsStore.loadSettings()

app.mount('#app')