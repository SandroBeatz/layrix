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
      { path: 'inputs', name: 'inputs', component: () => import('@pages/ui-ux/InputsPage.vue') },
      { path: 'icons', name: 'icons', component: () => import('@pages/icons/IconsPage.vue') },
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
