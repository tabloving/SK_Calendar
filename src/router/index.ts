import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '@/views/CalendarView.vue'
import SettingsView from '@/views/SettingsView.vue'
import TestView from '@/views/TestView.vue'
import SolarTermTestView from '@/views/SolarTermTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: CalendarView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/solar-term-test',
      name: 'solar-term-test',
      component: SolarTermTestView
    }
  ]
})

export default router