/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fasting': {
          'major': '#DC2626',  // 大罪 - 红色
          'moderate': '#EA580C',  // 中罪 - 橙色
          'minor': '#CA8A04',  // 小罪 - 黄色
          'safe': '#16A34A'  // 安全 - 绿色
        }
      }
    },
  },
  plugins: [],
}