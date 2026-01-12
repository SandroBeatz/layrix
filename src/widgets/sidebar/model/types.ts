/**
 * Sidebar Menu Types
 */

export interface SidebarMenuItem {
  /** Текст пункта меню */
  label: string;

  /** Маршрут для внутренней навигации */
  to?: string;

  /** Флаг внешней ссылки */
  external?: boolean;

  /** URL внешней ссылки */
  externalLink?: string;

  /** Иконка пункта меню */
  icon?: string;

  /** Отключить пункт меню */
  disable?: boolean;

  /** Подпись/описание пункта */
  caption?: string;

  /** Функция-обработчик клика */
  action?: () => void;

  /** Вложенное меню (submenu) */
  submenu?: SidebarMenuItem[];

  expandOn?: string[];
}

export interface SidebarMenuGroup {
  /** Заголовок группы (например "Dashboard", "UX/UI") */
  title?: string;

  /** Пункты меню в группе */
  items: SidebarMenuItem[];
}
