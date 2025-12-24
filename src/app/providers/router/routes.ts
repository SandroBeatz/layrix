import type { RouteRecordRaw } from 'vue-router';
import AdminLayout from '@app/layouts/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    children: [{ path: '', component: () => import('@pages/dashboard/DashboardPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@pages/ErrorNotFound.vue'),
  },
];

export default routes;
