// 戒期等级枚举
export enum PreceptLevel {
  MAJOR = 'major',     // 大罪
  MODERATE = 'moderate', // 中罪
  MINOR = 'minor',     // 小罪
  SAFE = 'safe'        // 安全
}

// 戒期类型枚举
export enum PreceptType {
  REGULAR = 'regular',   // 常规戒期
  SPECIAL = 'special',   // 特殊戒期
  PERSONAL = 'personal', // 个人戒期
  PRECEPT_DAY = 'precept_day'  // 斋日
}

// 戒期详细信息接口
export interface PreceptDetail {
  // 核心内容
  reason: string;         // 戒期原因（如：四天王巡行、天地仓开日）
  punishment: string;     // 犯戒惩罚（如：犯者减寿、犯者夺纪）
  explanation?: string;   // 详细解释说明
  suggestion?: string;    // 修行建议

  // 扩展信息
  category?: string;      // 分类（如：神明巡行、诞辰纪念、节气变化）
  tags?: string[];        // 标签（如：["四天王", "巡行", "月望"]）
  historicalContext?: string; // 历史背景
  source?: string;        // 来源（如：《寿康宝鉴》、道教传统）

  // 特殊说明
  specialNote?: string;   // 特殊注意事项
  alternativeDate?: string; // 替代日期（如小月的廿九日）
  relatedEvents?: string[]; // 相关事件
}

// 戒期信息接口
export interface PreceptInfo {
  date: string;           // 农历日期 (格式: MM-DD)
  level: PreceptLevel;    // 罪果等级
  type: PreceptType;      // 戒期类型
  detail: PreceptDetail;  // 详细信息

  // 兼容性字段（向后兼容）
  reason: string;         // 戒期原因（从detail.reason映射）
  punishment: string;     // 犯戒惩罚（从detail.punishment映射）
  description?: string;   // 详细描述（自动生成）
}

// 日历日期信息接口
export interface CalendarDayInfo {
  date: Date;             // 公历日期
  lunarDate: string;      // 农历日期
  year: number;           // 年
  month: number;          // 月
  day: number;            // 日
  weekday: number;        // 星期几 (0-6, 0为周日)
  isToday: boolean;       // 是否为今天
  isCurrentMonth: boolean; // 是否为当前月份
  preceptInfos: PreceptInfo[]; // 当日戒期信息列表
  solarTerm?: string;     // 节气
  ganZhi?: any;           // 干支信息
}

// 月份信息接口
export interface MonthInfo {
  year: number;
  month: number;
  days: CalendarDayInfo[];
  firstDayWeekday: number;
  daysInMonth: number;
}

// 个人戒期配置接口
export interface PersonalPrecept {
  id: string;
  name: string;
  date: string;           // 农历日期
  reason: string;
  level: PreceptLevel;
  type: PreceptType.PERSONAL;
  enabled: boolean;
}

// 应用设置接口
export interface AppSettings {
  theme: 'light' | 'dark';
  showPreceptIndicators: boolean;
  showLunarDates: boolean;
  enabledPreceptTypes: PreceptType[];
  personalPrecepts: PersonalPrecept[];
}