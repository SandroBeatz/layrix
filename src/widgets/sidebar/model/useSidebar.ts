import { ref, computed } from 'vue';
import type { SidebarMenuGroup } from './types';
import {
  tabHome,
  tabFileText,
  tabComponents,
  tabForms,
  tabIcons,
} from 'quasar-extras-svg-icons/tabler-icons-v2';
import { useRoute } from 'vue-router';


export function useSidebar() {
  const route = useRoute()

  const menuGroups = ref<SidebarMenuGroup[]>([
    {
      title: 'Main',
      items: [
        {
          label: 'Dashboard',
          icon: tabHome,
          expandOn: ['/analytics', '/e-commerce', '/crm'],
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
          label: 'Pages',
          icon: tabFileText,
          submenu: [
            {
              label: 'Profile',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'Profile Settings',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'Team',
              disable: true, // Placeholder - no route yet
            },
          ],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          label: 'UI Elements',
          icon: tabComponents,
          expandOn: ['/buttons', '/badges', '/typography', '/theme', '/alerts'],
          submenu: [
            {
              label: 'Alerts',
              to: '/alerts',
            },
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
          icon: tabForms,
          expandOn: ['/inputs'],
          submenu: [
            {
              label: 'Forms Layouts',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'Form Elements',
              expandOn: ['/inputs'],
              submenu: [
                {
                  label: 'Inputs',
                  to: '/inputs',
                },
              ],
            },
            {
              label: 'Validation',
              disable: true, // Placeholder - no route yet
            },
          ],
        },
        {
          label: 'Icons',
          icon: tabIcons,
          to: '/icons',
        },
      ],
    },
  ]);

  const isExpandedItem = (expandOn?: string[]) => {
    if (!expandOn) return false;
    return expandOn.some((path) => route.path.startsWith(path));
  };

  return {
    menuGroups: computed(() => menuGroups.value),
    isExpandedItem,
  };
}
