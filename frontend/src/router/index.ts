import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import { useTasksRoute } from './user-tasks'
import { authRoutes } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      children: [useTasksRoute],
    },
    ...authRoutes,
  ],
})

export default router
