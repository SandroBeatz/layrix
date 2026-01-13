import type { RouteRecordRaw } from 'vue-router';
import AdminLayout from '@app/layouts/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    redirect: '/analytics',
    children: [
      {
        path: 'analytics',
        name: 'analytics',
        component: () => import('pages/dashboard/AnalyticsPage.vue'),
      },
      {
        path: 'e-commerce',
        name: 'eCommerce',
        component: () => import('pages/dashboard/ECommercePage.vue'),
      },
      {
        path: 'crm',
        name: 'crm',
        component: () => import('pages/dashboard/CRMPage.vue'),
      },
      { path: 'theme', name: 'theme', component: () => import('@pages/ui-ux/ThemePage.vue') },
      { path: 'buttons', name: 'buttons', component: () => import('@pages/ui-ux/ButtonsPage.vue') },
      { path: 'badges', name: 'badges', component: () => import('@pages/ui-ux/BadgesPage.vue') },
      { path: 'inputs', name: 'inputs', component: () => import('@pages/ui-ux/InputsPage.vue') },
      { path: 'icons', name: 'icons', component: () => import('@pages/icons/IconsPage.vue') },
      {
        path: 'device-test',
        name: 'device-test',
        component: () => import('@pages/device-test/DeviceTestPage.vue'),
      },
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
