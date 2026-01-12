import { ref, computed } from 'vue';
import type { SidebarMenuGroup } from './types';
import {
  tabHome,
  tabFileText,
  tabComponents,
  tabForms,
  tabIcons,
} from 'quasar-extras-svg-icons/tabler-icons-v2';


export function useSidebar() {
  const menuGroups = ref<SidebarMenuGroup[]>([
    {
      title: 'Main',
      items: [
        {
          label: 'Dashboard',
          icon: tabHome,
          submenu: [
            {
              label: 'Analytics',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'E-commerce',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'CRM',
              disable: true, // Placeholder - no route yet
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
          submenu: [
            {
              label: 'Buttons',
              to: '/buttons',
            },
          ],
        },
        {
          label: 'Forms',
          icon: tabForms,
          submenu: [
            {
              label: 'Forms Layouts',
              disable: true, // Placeholder - no route yet
            },
            {
              label: 'Form Elements',
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
          to: '/icons'
        },
      ],
    },
  ]);

  return {
    menuGroups: computed(() => menuGroups.value),
  };
}
