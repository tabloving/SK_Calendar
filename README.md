# 寿康宝鉴戒期日历

> 🎯 **v1.0.0 "镜"** - 以戒为镜，照见本心 🪞

基于《寿康宝鉴》戒期理论的现代化日历应用，帮助修行者遵循传统戒律，保持身心清净。

[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2+-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 功能特色

### 📅 **完整的戒期体系**
- 每月固定戒期（30天完整覆盖）
- 特殊戒期（佛菩萨圣诞、成道、涅槃纪念日）
- 节气戒期（二十四节气）
- 斋日提醒（六斋日、十斋日）

### 🎯 **分级管理**
- 大戒（🔴 红色标识）：重要戒期，需严格持戒
- 中戒（🟣 紫色标识）：中等戒期，应当谨慎
- 宜戒（🔵 蓝色标识）：建议戒期，最好持戒
- 安全（🟢 绿色标识）：无特殊戒期，正常日子

### 🌙 **农历支持**
- 精确的农历日期转换
- 闰月处理
- 节气计算
- 传统节日标注
- 干支纪年显示

### ⚙️ **个性化设置**
- 个人戒期自定义
- 显示偏好设置
- 戒期类型筛选
- 个人重要日期管理

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

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
npm run dev
```
> 开发服务器默认运行在 http://localhost:3000

### 代码检查
```bash
npm run lint          # ESLint 代码检查并自动修复
npm run type-check    # TypeScript 类型检查
```

### 构建生产版本
```bash
npm run build         # 构建生产版本
npm run preview       # 预览构建结果
```

## 📁 项目结构

```
SK_Calendar/
├── src/
│   ├── components/          # Vue组件
│   │   ├── CalendarDay.vue      # 日历格子组件
│   │   ├── CalendarGrid.vue     # 日历网格组件
│   │   ├── CalendarHeader.vue   # 日历头部组件
│   │   ├── PreceptDetail.vue    # 戒期详情组件
│   │   ├── DebugInfo.vue        # 调试信息组件
│   │   └── icons/               # 图标组件目录
│   ├── views/               # 页面视图
│   │   ├── CalendarView.vue     # 日历主页面
│   │   ├── SettingsView.vue     # 设置页面
│   │   └── TestView.vue         # 测试页面
│   ├── stores/              # Pinia状态管理
│   │   ├── calendar.ts          # 日历状态
│   │   └── settings.ts          # 设置状态
│   ├── utils/               # 工具函数
│   │   ├── calendar.ts          # 日历工具类
│   │   ├── lunar.ts             # 农历工具类
│   │   ├── precept-data.ts      # 戒期数据管理
│   │   └── debug.ts             # 调试工具
│   ├── types/               # TypeScript类型定义
│   │   ├── index.ts             # 主要类型定义
│   │   └── lunar-javascript.d.ts # lunar.js类型声明
│   ├── reference_doc/       # 参考文档
│   │   ├── Regular.md           # 常规戒期文档
│   │   └── Special.md           # 特殊戒期文档
│   ├── router/              # Vue Router路由配置
│   │   └── index.ts
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── public/                  # 静态资源
├── dist/                    # 构建输出目录
├── package.json             # 项目配置和依赖
├── vite.config.ts           # Vite构建配置
├── tailwind.config.js       # TailwindCSS配置
├── tsconfig.json            # TypeScript配置
├── CLAUDE.md               # AI开发文档
└── README.md               # 项目说明文档
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

## 🛠️ 开发说明

### 核心概念

#### 戒期等级 (PreceptLevel)
- **major**: 大戒 - 🔴 红色显示 (#DC2626)，重要戒期需严格持戒
- **moderate**: 中戒 - 🟣 紫色显示 (#7C3AED)，中等戒期应当谨慎
- **minor**: 宜戒 - 🔵 蓝色显示 (#3B82F6)，建议戒期最好持戒
- **safe**: 安全 - 🟢 绿色显示 (#16A34A)，正常日子无特殊戒期

#### 戒期类型 (PreceptType)
- **regular**: 常规戒期 (每月固定日期)
- **special**: 特殊戒期 (佛菩萨圣诞、成道、涅槃纪念日)
- **solar_term**: 节气戒期 (二十四节气)
- **precept_day**: 斋日 (六斋日、十斋日)
- **personal**: 个人戒期 (用户自定义)

### 添加新的戒期
在 `src/utils/precept-data.ts` 中的相应方法中添加戒期数据：

```typescript
// 添加月固定戒期
private initMonthlyPrecepts(): void {
  const monthlyData = {
    '01': [
      { reason: '月望日', level: PreceptLevel.MAJOR },
      { reason: '诸佛菩萨加持日', level: PreceptLevel.MAJOR }
    ],
    // ... 更多日期
  }
}
```

### 自定义样式
在组件的scoped CSS中添加自定义样式：

```css
/* 自定义戒期颜色 */
.calendar-day.precept-major {
  background-color: rgba(220, 38, 38, 0.08);
}
```

### 添加新的功能模块
1. 在 `src/types/index.ts` 中定义相关类型
2. 在 `src/stores/` 中添加状态管理
3. 在 `src/components/` 中创建组件
4. 在 `src/views/` 中创建页面

### 调试功能
- TestView.vue：测试页面，验证农历转换和戒期计算
- DebugInfo.vue：显示选中日期的详细信息
- 浏览器控制台：输出调试信息

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 开发流程
1. **Fork** 本项目到你的GitHub账号
2. **克隆** 你的fork仓库到本地
   ```bash
   git clone https://github.com/YOUR_USERNAME/SK_Calendar.git
   cd SK_Calendar
   ```
3. **创建** 特性分支
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **提交** 你的更改
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **推送** 到分支
   ```bash
   git push origin feature/amazing-feature
   ```
6. **创建** Pull Request

### 提交规范
请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构代码
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 代码质量
- 运行 `npm run lint` 确保代码风格一致
- 运行 `npm run type-check` 确保TypeScript类型正确
- 添加必要的测试和文档

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## ⚠️ 免责声明

本应用仅供修行参考，不构成任何宗教或法律建议。使用者应当根据自身情况和传统导师指导，合理使用本应用提供的戒期信息。

## 📞 联系我们

- **项目地址**: [GitHub Repository](https://github.com/tlaboving/SK_Calendar)
- **问题反馈**: [Issues](https://github.com/tlaboving/SK_Calendar/issues)
- **版本发布**: [Releases](https://github.com/tlaboving/SK_Calendar/releases)

---

🙏 **回向偈**

愿以此功德，庄严佛净土。
上报四重恩，下济三途苦。
若有见闻者，悉发菩提心。
尽此一报身，同生极乐国。

🪞 **以戒为镜，照见本心** - v1.0.0 "镜"