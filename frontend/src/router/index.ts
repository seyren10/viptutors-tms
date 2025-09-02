import { createRouter, createWebHistory } from 'vue-router'
import { useTasksRoute } from './user-tasks'
import { authRoutes } from './auth'
import { useUserStore } from '@/features/user/store'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/features/tasks/store'
import { adminRoute } from './admin'
import { logout } from '@/features/user/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    useTasksRoute,
    adminRoute,
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
    const { requiresAuth, adminAuth } = to.meta as {
      requiresAuth?: boolean
      adminAuth?: boolean
    }

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    // 1. Public routes
    if (!requiresAuth && !adminAuth) {
      return true
    }

    // 2. Ensure we have a user
    await userStore.getUser()
    if (!user.value) {
      return { name: 'login' }
    }

    // 3. Admin routes
    if (adminAuth) {
      if (!user.value.isAdmin) {
        await logout()
        user.value = null
        return { name: 'login' }
      }
    } else if (user.value.isAdmin) {
      // ✅ Always redirect admins to dashboard
      return { name: 'adminDashboard' }
    }

    // 4. Normal authenticated routes
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
