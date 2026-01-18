import { computed } from 'vue';
import type { NavigationMenuGroup, NavigationMenuItem } from './types';
import { useRoute } from 'vue-router';

export function useNavigation() {
  const route = useRoute();

  const menuGroups = computed<NavigationMenuGroup[]>(() => [
    {
      items: [
        {
          label: 'Dashboard',
          submenu: [
            {
              label: 'Analytics',
              to: '/analytics',
            },
            {
              label: 'E-commerce',
              to: '/e-commerce',
            },
            {
              label: 'CRM',
              to: '/crm',
            },
          ],
        },
        {
          label: 'UI Elements',
          submenu: [
            {
              label: 'Badges',
              to: '/badges',
            },
            {
              label: 'Buttons',
              to: '/buttons',
            },
            {
              label: 'Theme',
              to: '/theme',
            },
            {
              label: 'Typography',
              to: '/typography',
            },
          ],
        },
        {
          label: 'Forms',
          submenu: [
            {
              label: 'Inputs',
              to: '/inputs',
            },
          ],
        },
        {
          label: 'Icons',
          to: '/icons',
        },
      ],
    },
  ]);

  const isActiveRoute = (item: NavigationMenuItem): boolean => {
    if (item.to) {
      return route.path === item.to;
    }
    if (item.submenu) {
      return item.submenu.some((subitem) => isActiveRoute(subitem));
    }
    return false;
  };

  return {
    menuGroups,
    isActiveRoute,
  };
}
