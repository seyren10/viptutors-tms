import type { RouteRecordRaw } from 'vue-router'

export const useTasksRoute: RouteRecordRaw = {
  path: '/',
  name: 'userTasks',
  component: () => import('@/pages/user-tasks/UserTasksIndex.vue'),
  meta: {
    requiresAuth: true,
  },
}
