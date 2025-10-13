# CLAUDE.md

本应用是基于《寿康宝鉴》中的戒期而来，作为参考

## 技术栈

- 前端：Vue3.x + Element Plus + TypeScript + TailwindCSS
- 日历查询：lunar.js (https://github.com/6tail/lunar-javascript)
- 构建工具：Vite
- 路由：Vue Router
- 状态管理：Pinia

## 项目结构

```
src/
├── components/           # 组件
│   ├── CalendarDay.vue      # 日历格子组件
│   ├── CalendarGrid.vue     # 日历网格组件
│   ├── CalendarHeader.vue   # 日历头部组件
│   ├── PreceptDetail.vue    # 戒期详情组件
│   ├── DebugInfo.vue        # 调试信息组件
│   └── icons/               # 图标组件
├── stores/              # 状态管理
│   ├── calendar.ts          # 日历状态
│   └── settings.ts          # 设置状态
├── utils/               # 工具函数
│   ├── calendar.ts          # 日历工具类
│   ├── lunar.ts             # 农历工具类
│   ├── precept-data.ts      # 戒期数据管理
│   └── debug.ts             # 调试工具
├── types/               # 类型定义
│   ├── index.ts             # 主要类型定义
│   └── lunar-javascript.d.ts # lunar.js类型声明
├── views/               # 页面组件
│   ├── CalendarView.vue     # 日历页面
│   ├── SettingsView.vue     # 设置页面
│   └── TestView.vue         # 测试页面
├── reference_doc/       # 参考文档
│   ├── Regular.md           # 常规戒期文档
│   └── Special.md           # 特殊戒期文档
└── router/              # 路由配置
    └── index.ts
```

## 核心概念

### 戒期等级 (PreceptLevel)
- **major**: 大罪 - 红色显示
- **moderate**: 中罪 - 橙色显示
- **minor**: 小罪 - 黄色显示
- **safe**: 安全 - 绿色显示

### 戒期类型 (PreceptType)
- **regular**: 常规戒期 (每月固定日期)
- **special**: 特殊戒期 (佛菩萨圣诞等)
- **solar_term**: 节气戒期 (二十四节气)
- **precept_day**: 斋日 (十斋日等)
- **personal**: 个人戒期 (用户自定义)

## 开发规范

### 命名约定
- 组件：PascalCase (如 CalendarDay.vue)
- 文件：kebab-case (如 precept-data.ts)
- 变量/函数：camelCase (如 getPreceptLevel)
- 常量：UPPER_SNAKE_CASE (如 PRECEPT_LEVEL)
- CSS类：kebab-case (如 precept-major)

### 代码规范
1. **类型安全**：严格使用TypeScript类型
2. **组件设计**：单一职责，props明确
3. **状态管理**：使用Pinia管理全局状态
4. **样式规范**：使用TailwindCSS + scoped CSS
5. **农历处理**：必须使用lunar.js进行农历转换

### 关键功能实现

#### 日历渲染
- `CalendarUtil.getMonthCalendar()` 获取月份日历数据
- `CalendarDay.vue` 渲染单个日期格子
- 支持戒期等级背景色和指示器显示

#### 戒期计算
- `PreceptDataManager` 管理戒期数据
- `CalendarUtil.getDayPreceptInfos()` 计算指定日期戒期
- 支持农历、节气、自定义戒期

#### 设置管理
- 戒期类型开关控制
- 显示选项配置
- 个人戒期管理

## 测试与调试

### 开发命令
```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
```

### 调试功能
- TestView.vue：测试页面，验证农历转换和戒期计算
- DebugInfo.vue：显示选中日期的详细信息
- 浏览器控制台：输出调试信息

## 注意事项

1. **农历精度**：使用lunar.js确保农历转换准确性
2. **闰月处理**：正确处理农历闰月情况
3. **节气计算**：二十四节气需精确计算
4. **性能优化**：戒期数据可预计算缓存
5. **响应式设计**：支持移动端显示
6. **用户体验**：戒期等级用不同颜色区分，提供清晰的视觉反馈

