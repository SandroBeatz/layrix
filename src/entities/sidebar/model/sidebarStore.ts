import { acceptHMRUpdate, defineStore } from 'pinia';
import type { SidebarState, SidebarStorageData } from './types';

const SIDEBAR_STORAGE_KEY = 'layrix-sidebar';

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarState => ({
    isMini: false, // Expanded by default
    isOpen: false, // Closed by default on mobile
  }),

  getters: {
    /**
     * Check if sidebar is in mini mode
     */
    isMiniMode: (state) => state.isMini,

    /**
     * Check if sidebar drawer is open
     */
    isDrawerOpen: (state) => state.isOpen,
  },

  actions: {
    /**
     * Toggle mini mode (collapsed/expanded)
     */
    toggleMini() {
      this.isMini = !this.isMini;
      this._persistState();
    },

    /**
     * Set mini mode explicitly
     */
    setMini(value: boolean) {
      this.isMini = value;
      this._persistState();
    },

    /**
     * Toggle drawer open/closed (mobile)
     */
    toggleOpen() {
      this.isOpen = !this.isOpen;
      // Note: NOT persisted
    },

    /**
     * Set drawer open state explicitly
     */
    setOpen(value: boolean) {
      this.isOpen = value;
      // Note: NOT persisted
    },

    /**
     * Load state from localStorage
     */
    _loadState(): void {
      try {
        const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
        if (stored) {
          const data: SidebarStorageData = JSON.parse(stored);
          this.isMini = data.isMini ?? false;
        }
      } catch (error) {
        console.warn('Failed to load sidebar state from localStorage:', error);
      }
    },

    /**
     * Persist state to localStorage (mini mode only)
     */
    _persistState(): void {
      try {
        const data: SidebarStorageData = {
          isMini: this.isMini,
        };
        localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to save sidebar state to localStorage:', error);
      }
    },

    /**
     * Initialize store (load from localStorage)
     */
    initialize(): void {
      this._loadState();
    },
  },
});

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot));
}
