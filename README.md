# 寿康日历

> 🎯 **v2.0.0 "臻"** - 戒行臻善，福寿绵长 🪷

《寿康宝鉴》原名《不可录》，清代印光大师增订并更名，是一部劝人节欲保身的善书。**寿康日历**依据《寿康宝鉴》戒期理论开发，将传统戒期与现代日历相结合，以助诸位善知识。

[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-5.2+-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/) [![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 功能特色

### 完备的戒期体系
- 每月固定戒期（30天完整覆盖）
- 特殊戒期（佛菩萨圣诞、成道、涅槃纪念日）
- 节气戒期（二十四节气、二分二至日）
- 斋日提醒（六斋日、十斋日）
- 干支戒期（甲子日、庚申日、丙丁日、庚辛日、三辛日等）
- 天象戒期（弦日、阴错日、阳错日）
- 时令戒期（三伏日、二社日、冬至后戌日）

### 分级管理
- 大戒（红色标识）：重要戒期，需严格持戒
- 中戒（紫色标识）：中等戒期，应当谨慎
- 宜戒（蓝色标识）：建议戒期，最好持戒
- 安泰（绿色标识）：无特殊戒期，正常日子

### 农历支持
- 精确的农历日期转换
- 闰月戒期正确处理
- 节气精确计算（带缓存优化）
- 月晦日动态计算
- 干支纪年显示

### 个性化设置
- 个人戒期自定义
- 显示偏好设置
- 戒期类型筛选
- 设置导入/导出

### 响应式设计
- 桌面端：完整月视图 + 侧边栏详情
- 平板端：流式布局，完整月视图
- 移动端：周视图，简化显示，触摸友好

### 古朴界面（v2.0 新增）
- 宣纸暖黄护眼配色
- 书卷印章风格导航栏
- 传统纹样装饰元素

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

## 项目结构

```
SK_Calendar/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css             # 全局样式（宣纸配色、滚动条、戒期颜色）
│   ├── components/
│   │   ├── CalendarDay.vue          # 日历格子组件（支持桌面/移动端）
│   │   ├── CalendarGrid.vue         # 日历网格组件（月视图/周视图）
│   │   ├── SidebarPanelIndex.vue    # 侧边栏面板索引
│   │   ├── DebugInfo.vue            # 调试信息组件
│   │   ├── sidebar/                 # 侧边栏子组件
│   │   │   ├── DateNavigation.vue       # 日期导航（月份切换、统计卡片）
│   │   │   ├── DateCard.vue             # 日期卡片（阳历/农历/干支信息）
│   │   │   ├── PreceptDetail.vue        # 戒期详情列表
│   │   │   ├── UpcomingPrecepts.vue     # 即将到来的戒期
│   │   │   └── PracticeAdvice.vue       # 修行建议
│   │   └── icons/                   # 自定义SVG图标组件
│   ├── views/
│   │   ├── CalendarView.vue         # 日历主页面
│   │   ├── SettingsView.vue         # 设置页面（中国风）
│   │   └── TestView.vue             # 测试页面
│   ├── stores/
│   │   ├── calendar.ts              # 日历状态（日期选择、月份导航）
│   │   └── settings.ts              # 设置状态（主题、戒期类型、个人戒期）
│   ├── utils/
│   │   ├── calendar.ts              # 日历工具类 (CalendarUtil)
│   │   ├── lunar.ts                 # 农历工具类 (LunarCalendarUtil)
│   │   ├── precept-data.ts          # 戒期数据管理 (PreceptDataManager)
│   │   └── debug.ts                 # 调试工具
│   ├── types/
│   │   ├── index.ts                 # 核心类型定义
│   │   └── lunar-javascript.d.ts    # lunar.js类型声明
│   ├── reference_doc/               # 戒期参考文档
│   │   ├── Regular.md                   # 常规戒期（每月1-30日）
│   │   └── Special.md                   # 特殊戒期（佛菩萨圣诞等）
│   ├── router/
│   │   └── index.ts                 # 路由配置
│   ├── App.vue                      # 根组件（书卷印章风格导航栏）
│   └── main.ts                      # 应用入口
├── .github/
│   └── ISSUE_TEMPLATE/              # Issue 模板
│       ├── bug_report.yml               # Bug 报告模板
│       ├── feature_request.yml          # 功能请求模板
│       └── config.yml                   # 模板配置
├── public/                          # 静态资源
├── package.json                     # 项目配置和依赖
├── vite.config.ts                   # Vite构建配置
├── tailwind.config.js               # TailwindCSS配置
├── tsconfig.json                    # TypeScript配置
├── CLAUDE.md                        # AI开发文档
└── README.md                        # 项目说明文档
```

## 戒期数据来源

本应用严格依据《寿康宝鉴》中的戒期理论，包括：

### 每月固定戒期
涵盖初一至三十的完整戒期体系，包含诸佛菩萨加持日、天地和合日、雷斋日、斗降日、月望日、月晦日等重要日期。

### 特殊戒期
- 佛菩萨圣诞、成道、涅槃纪念日
- 二十四节气戒期
- 二分二至日（春分、秋分、夏至、冬至）特殊警告
- 三伏日、二社日
- 冬至后第三戌日、冬至后庚辛日

### 干支戒期
- 甲子日、庚申日
- 丙丁日（夏季）
- 庚辛日（秋季、冬至后）
- 三辛日

### 天象戒期
- 弦日（上弦、下弦）
- 阴错日、阳错日

### 斋日制度
- 六斋日：每月初八、十四、十五、廿三、廿九、三十
- 十斋日：每月初一、初八、十四、十五、十八、廿三、廿四、廿八、廿九、三十

## 开发说明

### 核心概念

#### 戒期等级 (PreceptLevel)
- **MAJOR**: 大戒 - 红色显示 (#DC2626)，重要戒期需严格持戒
- **MODERATE**: 中戒 - 紫色显示 (#8B5CF6)，中等戒期应当谨慎
- **MINOR**: 宜戒 - 蓝色显示 (#3B82F6)，建议戒期最好持戒
- **SAFE**: 安泰 - 绿色显示 (#16A34A)，正常日子无特殊戒期

#### 戒期类型 (PreceptType)
- **REGULAR**: 常规戒期（每月固定日期）
- **SPECIAL**: 特殊戒期（佛菩萨圣诞、成道、涅槃纪念日）
- **PRECEPT_DAY**: 斋日（六斋日、十斋日）
- **PERSONAL**: 个人戒期（用户自定义）

#### 戒期分类 (PreceptCategory)
- **deity_inspection**: 神明巡行
- **festival**: 节日斋日
- **solar_term**: 节气戒期
- **anniversary**: 诞辰纪念
- **astronomical**: 天象戒期
- **karma**: 因果戒期
- **custom**: 自定义戒期

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

## 贡献指南

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
- `perf:` 性能优化
- `chore:` 构建过程或辅助工具的变动

### 代码质量
- 运行 `npm run lint` 确保代码风格一致
- 运行 `npm run type-check` 确保TypeScript类型正确

### 问题反馈
- 提交 Bug 报告或功能请求前，请先搜索 [已有 Issues](https://github.com/tabloving/SK_Calendar/issues)
- 使用项目提供的 Issue 模板提交问题

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 免责声明

本应用仅供修行参考，不构成任何宗教或法律建议。使用者应当根据自身情况和传统导师指导，合理使用本应用提供的戒期信息。

## 联系我们

- **项目地址**: [GitHub Repository](https://github.com/tabloving/SK_Calendar)
- **问题反馈**: [Issues](https://github.com/tabloving/SK_Calendar/issues)
- **功能讨论**: [Discussions](https://github.com/tabloving/SK_Calendar/discussions)
- **版本发布**: [Releases](https://github.com/tabloving/SK_Calendar/releases)

---

**回向偈**

愿以此功德，庄严佛净土。
上报四重恩，下济三途苦。
若有见闻者，悉发菩提心。
尽此一报身，同生极乐国。

🎯 **戒行臻善，福寿绵长** - v2.0.0 "臻" 🪷