import { createRouter, createWebHistory } from 'vue-router'
import { useTasksRoute } from './user-tasks'
import { authRoutes } from './auth'
import { useUserStore } from '@/features/user/store'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/features/tasks/store'

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
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    if (!requiresAuth) {
      // Public routes
      return true
    }

    await userStore.getUser()

    if (!user) {
      return { name: 'login' }
    }

    const taskStore = useTaskStore()
    await taskStore.getUserTask()

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
