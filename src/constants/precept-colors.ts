import { PreceptLevel } from '@/types'

/**
 * 戒期等级颜色配置
 * 统一管理所有戒期等级相关的颜色值
 */

/**
 * 颜色 RGB 值（用于 CSS 变量）
 */
export const PRECEPT_COLORS_RGB: Record<PreceptLevel, string> = {
  [PreceptLevel.MAJOR]: '220, 38, 38',      // 红色
  [PreceptLevel.MODERATE]: '124, 58, 237',  // 紫色
  [PreceptLevel.MINOR]: '59, 130, 246',     // 蓝色
  [PreceptLevel.SAFE]: '22, 163, 74'        // 绿色
}

/**
 * 颜色 HEX 值（用于 JS 和内联样式）
 */
export const PRECEPT_COLORS_HEX: Record<PreceptLevel, string> = {
  [PreceptLevel.MAJOR]: '#DC2626',    // 红色
  [PreceptLevel.MODERATE]: '#7C3AED', // 紫色
  [PreceptLevel.MINOR]: '#3B82F6',    // 蓝色
  [PreceptLevel.SAFE]: '#16A34A'      // 绿色
}

/**
 * Tailwind 颜色名称映射（用于动态类名）
 */
export const PRECEPT_COLORS_TAILWIND: Record<PreceptLevel, string> = {
  [PreceptLevel.MAJOR]: 'red',
  [PreceptLevel.MODERATE]: 'purple',
  [PreceptLevel.MINOR]: 'blue',
  [PreceptLevel.SAFE]: 'green'
}

/**
 * 戒期卡片背景样式配置
 */
export const PRECEPT_CARD_STYLES: Record<PreceptLevel, {
  background: string
  border: string
  borderLeft: string
}> = {
  [PreceptLevel.MAJOR]: {
    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    border: '#fecaca',
    borderLeft: `rgb(${PRECEPT_COLORS_RGB[PreceptLevel.MAJOR]})`
  },
  [PreceptLevel.MODERATE]: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    border: '#e9d5ff',
    borderLeft: `rgb(${PRECEPT_COLORS_RGB[PreceptLevel.MODERATE]})`
  },
  [PreceptLevel.MINOR]: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#bfdbfe',
    borderLeft: `rgb(${PRECEPT_COLORS_RGB[PreceptLevel.MINOR]})`
  },
  [PreceptLevel.SAFE]: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#bbf7d0',
    borderLeft: `rgb(${PRECEPT_COLORS_RGB[PreceptLevel.SAFE]})`
  }
}

/**
 * 戒期项目背景类名映射
 */
export const PRECEPT_ITEM_CLASSES: Record<PreceptLevel, string> = {
  [PreceptLevel.MAJOR]: 'bg-red-50 border-red-200',
  [PreceptLevel.MODERATE]: 'bg-purple-50 border-purple-200',
  [PreceptLevel.MINOR]: 'bg-blue-50 border-blue-200',
  [PreceptLevel.SAFE]: 'bg-green-50 border-green-200'
}

/**
 * 获取戒期等级的 Tailwind 颜色名
 */
export function getPreceptLevelColor(level: PreceptLevel): string {
  return PRECEPT_COLORS_TAILWIND[level]
}

/**
 * 获取戒期等级的 HEX 颜色值
 */
export function getPreceptLevelHexColor(level: PreceptLevel): string {
  return PRECEPT_COLORS_HEX[level]
}

/**
 * 获取戒期等级的 RGB 颜色值
 */
export function getPreceptLevelRgbColor(level: PreceptLevel): string {
  return PRECEPT_COLORS_RGB[level]
}

/**
 * 获取戒期等级标签样式（用于 el-tag 等组件）
 */
export function getPreceptLevelStyle(level: PreceptLevel): {
  backgroundColor: string
  borderColor: string
  color: string
} {
  const rgb = PRECEPT_COLORS_RGB[level]
  return {
    backgroundColor: `rgba(${rgb}, 0.85)`,
    borderColor: `rgb(${rgb})`,
    color: '#ffffff'
  }
}

/**
 * 获取戒期项目的背景类名
 */
export function getPreceptItemClass(level: PreceptLevel): string {
  return PRECEPT_ITEM_CLASSES[level]
}
