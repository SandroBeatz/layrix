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
      {
        path: 'button-group',
        name: 'button-group',
        component: () => import('@pages/ui-ux/ButtonGroupPage.vue'),
      },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('@pages/ui-ux/TypographyPage.vue'),
      },
      { path: 'badges', name: 'badges', component: () => import('@pages/ui-ux/BadgesPage.vue') },
      { path: 'alerts', name: 'alerts', component: () => import('@pages/ui-ux/AlertsPage.vue') },
      { path: 'inputs', name: 'inputs', component: () => import('@pages/ui-ux/InputsPage.vue') },
      { path: 'icons', name: 'icons', component: () => import('@pages/icons/IconsPage.vue') },
      {
        path: 'device-test',
        name: 'device-test',
        component: () => import('@pages/device-test/DeviceTestPage.vue'),
      },
      {
        path: 'velocorner-widget',
        name: 'velocorner-widget',
        component: () => import('@pages/velocorner-widget/VelocornerWidgetPage.vue'),
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
