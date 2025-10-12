# 寿康宝鉴戒期日历

基于《寿康宝鉴》戒期理论的现代化日历应用，帮助修行者遵循传统戒律，保持身心清净。

## 功能特色

### 📅 **完整的戒期体系**
- 每月固定戒期（30天完整覆盖）
- 特殊戒期（佛菩萨圣诞、成道、涅槃纪念日）
- 节气戒期（二十四节气）
- 斋日提醒（六斋日、十斋日）

### 🎯 **分级管理**
- 大罪（红色标识）：严重犯戒，应严格避免
- 中罪（橙色标识）：中等犯戒，应当谨慎
- 小罪（黄色标识）：轻微犯戒，建议注意
- 安全（绿色标识）：无特殊戒期

### 🌙 **农历支持**
- 精确的农历日期转换
- 闰月处理
- 节气计算
- 传统节日标注

### ⚙️ **个性化设置**
- 个人戒期自定义
- 显示偏好设置
- 主题切换
- 数据导入导出

### 📱 **响应式设计**
- 桌面端完整功能
- 移动端优化体验
- 触摸友好的交互

## 技术栈

- **前端框架**：Vue 3.x + TypeScript
- **UI组件库**：Element Plus
- **样式框架**：Tailwind CSS
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **构建工具**：Vite
- **农历计算**：lunar.js

## 快速开始

### 环境要求
- Node.js >= 16
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 项目结构

```
SK_Calendar/
├── src/
│   ├── components/          # 组件
│   │   ├── CalendarDay.vue  # 日历日期格子
│   │   ├── CalendarGrid.vue # 日历网格
│   │   ├── CalendarHeader.vue # 日历头部
│   │   └── FastingDetail.vue # 戒期详情
│   ├── views/               # 页面视图
│   │   ├── CalendarView.vue # 日历主页面
│   │   └── SettingsView.vue # 设置页面
│   ├── stores/              # 状态管理
│   │   ├── calendar.ts      # 日历状态
│   │   └── settings.ts      # 设置状态
│   ├── utils/               # 工具函数
│   │   ├── calendar.ts      # 日历工具
│   │   ├── lunar.ts         # 农历工具
│   │   └── fasting-data.ts  # 戒期数据
│   ├── types/               # 类型定义
│   │   └── index.ts         # 主要类型
│   ├── assets/              # 静态资源
│   │   └── styles/          # 样式文件
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── App.vue              # 根组件
│   └── main.ts              # 入口文件
├── public/                  # 公共资源
├── docs/                    # 文档
├── package.json             # 项目配置
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # Tailwind配置
└── README.md               # 项目说明
```

## 戒期数据来源

本应用严格依据《寿康宝鉴》中的戒期理论，包括：

### 每月固定戒期
涵盖初一至三十的完整戒期体系，包含诸佛菩萨加持日、天地和合日、雷斋日等重要日期。

### 特殊戒期
- 佛菩萨圣诞纪念日
- 传统节气戒期
- 重要修行日期

### 斋日制度
- 六斋日：每月初八、十四、十五、廿三、廿九、三十
- 十斋日：每月初一、初八、十四、十五、十八、廿三、廿四、廿八、廿九、三十

## 开发说明

### 添加新的戒期
在 `src/utils/fasting-data.ts` 中的相应方法中添加戒期数据：

```typescript
// 添加月固定戒期
private initMonthlyFastings(): void {
  const monthlyData = {
    '01': [
      { reason: '月望日', level: 'major' },
      { reason: '诸佛菩萨加持日', level: 'major' }
    ],
    // ... 更多日期
  }
}
```

### 自定义样式
在 `src/assets/styles/main.css` 中添加自定义样式：

```css
/* 自定义戒期颜色 */
.fasting-major {
  @apply bg-red-100 text-red-800 border-red-300;
}
```

### 添加新的功能模块
1. 在 `src/types/index.ts` 中定义相关类型
2. 在 `src/stores/` 中添加状态管理
3. 在 `src/components/` 中创建组件
4. 在 `src/views/` 中创建页面

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目基于 MIT 许可证开源。

## 免责声明

本应用仅供修行参考，不构成任何宗教或法律建议。使用者应当根据自身情况和传统导师指导，合理使用本应用提供的戒期信息。

---

🙏 愿以此功德，庄严佛净土。
上报四重恩，下济三途苦。
若有见闻者，悉发菩提心。
尽此一报身，同生极乐国。