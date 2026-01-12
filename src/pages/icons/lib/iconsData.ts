import * as TablerIcons from 'quasar-extras-svg-icons/tabler-icons-v2';

export interface IconData {
  name: string;
  svg: string;
  keywords: string[];
}

// Generate icon data with keywords
export const getIconsData = (): IconData[] => {
  const icons: IconData[] = [];

  // Get all icon names from the imported module
  const iconEntries = Object.entries(TablerIcons);

  for (const [key, svg] of iconEntries) {
    // Skip non-icon exports (like default)
    if (!key.startsWith('tab')) continue;

    // Remove 'tab' prefix and convert camelCase to kebab-case
    const name = key

    // Generate keywords from the icon name
    const keywords = generateKeywords(name);

    icons.push({
      name: `${name}`,
      svg: String(svg),
      keywords,
    });
  }

  return icons.sort((a, b) => a.name.localeCompare(b.name));
};

// Generate keywords from icon name for better searchability
const generateKeywords = (iconName: string): string[] => {
  const keywords: string[] = [];

  // Split name by hyphens and add individual words
  const words = iconName.split('-');
  keywords.push(...words);

  // Add semantic keywords based on common icon patterns
  const keywordMap: Record<string, string[]> = {
    'home': ['house', 'main', 'start'],
    'user': ['person', 'profile', 'account'],
    'settings': ['config', 'preferences', 'options'],
    'search': ['find', 'magnify', 'look'],
    'mail': ['email', 'message', 'inbox'],
    'phone': ['call', 'telephone', 'mobile'],
    'calendar': ['date', 'schedule', 'event'],
    'clock': ['time', 'hour', 'watch'],
    'heart': ['like', 'favorite', 'love'],
    'star': ['favorite', 'rating', 'bookmark'],
    'file': ['document', 'paper', 'page'],
    'folder': ['directory', 'files', 'storage'],
    'download': ['save', 'arrow-down', 'import'],
    'upload': ['send', 'arrow-up', 'export'],
    'trash': ['delete', 'remove', 'bin'],
    'edit': ['pencil', 'write', 'modify'],
    'camera': ['photo', 'picture', 'image'],
    'video': ['film', 'movie', 'play'],
    'music': ['audio', 'sound', 'song'],
    'share': ['send', 'forward', 'social'],
    'lock': ['secure', 'private', 'password'],
    'unlock': ['open', 'access', 'public'],
    'check': ['tick', 'success', 'done'],
    'x': ['close', 'cancel', 'delete'],
    'plus': ['add', 'new', 'create'],
    'minus': ['remove', 'subtract', 'less'],
    'arrow': ['direction', 'pointer', 'navigate'],
    'chevron': ['angle', 'arrow', 'direction'],
    'menu': ['hamburger', 'navigation', 'list'],
    'bell': ['notification', 'alert', 'reminder'],
    'cart': ['shopping', 'basket', 'store'],
    'bookmark': ['save', 'favorite', 'mark'],
    'flag': ['marker', 'report', 'banner'],
    'tag': ['label', 'category', 'price'],
    'cloud': ['storage', 'sync', 'backup'],
    'database': ['storage', 'server', 'data'],
    'wifi': ['network', 'wireless', 'internet'],
    'battery': ['power', 'charge', 'energy'],
    'sun': ['light', 'bright', 'day'],
    'moon': ['dark', 'night', 'theme'],
    'eye': ['view', 'see', 'visible'],
    'printer': ['print', 'paper', 'output'],
    'chart': ['graph', 'statistics', 'analytics'],
    'map': ['location', 'navigation', 'geography'],
    'pin': ['marker', 'location', 'point'],
    'gift': ['present', 'reward', 'bonus'],
    'shield': ['security', 'protection', 'guard'],
    'key': ['password', 'access', 'unlock'],
  };

  // Add semantic keywords if the icon name contains certain words
  for (const [key, semanticKeywords] of Object.entries(keywordMap)) {
    if (iconName.includes(key)) {
      keywords.push(...semanticKeywords);
    }
  }

  // Add state keywords
  if (iconName.includes('off')) keywords.push('disabled', 'inactive');
  if (iconName.includes('filled')) keywords.push('solid', 'full');
  if (iconName.includes('outline')) keywords.push('line', 'stroke');

  // Remove duplicates and return unique keywords
  return [...new Set(keywords)];
};
