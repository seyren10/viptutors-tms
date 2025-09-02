import type { RouteRecordRaw } from 'vue-router'

export const adminRoute: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  meta: {
    requiresAuth: true,
    adminAuth: true,
  },
  redirect: { name: 'dashboard' },
  children: [
    {
      path: 'dashboard',
      name: 'adminDashboard',
      component: () => import('@/pages/admin/AdminDashboard.vue'),
    },
    {
      path: ':userId/tasks',
      name: 'adminUserTasks',
      component: () => import('@/pages/admin/show/AdminShow.vue'),
      props: true,
    },
  ],
}
