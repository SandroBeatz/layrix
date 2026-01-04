import { ref, computed } from 'vue';
import type { SidebarMenuGroup } from './types';
import {
  tabHome,
  tabComponents,
  tabLayout,
} from 'quasar-extras-svg-icons/tabler-icons-v2';

/**
 * Composable для управления sidebar меню
 */
export function useSidebar() {
  const menuGroups = ref<SidebarMenuGroup[]>([
    {
      title: 'Dashboard',
      items: [
        {
          label: 'Dashboard',
          to: '/',
          icon: tabHome,
        },
      ],
    },
    {
      title: 'UX/UI',
      items: [
        {
          label: 'UI Elements',
          icon: tabComponents,
          submenu: [
            {
              label: 'Buttons',
              to: '/buttons',
            },
            {
              label: 'Cards',
              to: '/cards', // TODO: создать позже
            },
          ],
        },
        {
          label: 'Appearance',
          to: '/theme',
          icon: tabLayout,
        },
      ],
    },
  ]);

  return {
    menuGroups: computed(() => menuGroups.value),
  };
}
