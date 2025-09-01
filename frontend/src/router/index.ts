import { createRouter, createWebHistory } from 'vue-router'
import { useTasksRoute } from './user-tasks'
import { authRoutes } from './auth'
import { useUserStore } from '@/features/user/store'
import { storeToRefs } from 'pinia'
import { userQueryOptions } from '@/features/user/queries'
import { QueryClient } from '@tanstack/vue-query'
import { queryClient } from '@/services/vue-query'
import { getUser } from '@/features/user/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    useTasksRoute,
    ...authRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'errorRoute',
      component: () => import('@/ErrorPage.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  try {
    const requiresAuth = to.meta.requiresAuth as boolean | undefined

    if (!requiresAuth) {
      // Public routes
      return true
    }

    const user = await queryClient.fetchQuery(userQueryOptions())
    if (!user) {
      return { name: 'login' }
    }

    return true
  } catch (err) {
    // Only redirect to login if not already there
    if (to.name !== 'login') {
      return { name: 'login' }
    }
    return true
  }
})
export default router
