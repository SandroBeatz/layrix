import type { RouteRecordRaw } from 'vue-router';
import AdminLayout from '@app/layouts/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      { path: '', name: 'dashboard', component: () => import('@pages/dashboard/DashboardPage.vue') },
      { path: '/theme', name: 'theme', component: () => import('@pages/ui-ux/ThemePage.vue') },
      { path: '/buttons', name: 'buttons', component: () => import('@pages/ui-ux/ButtonsPage.vue') },
      { path: '/inputs', name: 'inputs', component: () => import('@pages/ui-ux/InputsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@pages/ErrorNotFound.vue'),
  },
];

export default routes;
