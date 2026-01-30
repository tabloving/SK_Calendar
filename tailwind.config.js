/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'precept': {
          'major': '#DC2626',    // 大戒 - 红色
          'moderate': '#7C3AED', // 中戒 - 紫色
          'minor': '#3B82F6',    // 宜戒 - 蓝色
          'safe': '#16A34A'      // 安全 - 绿色
        }
      }
    },
  },
  plugins: [],
}