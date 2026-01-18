<script setup lang="ts">
import { ref } from 'vue';
import { useNavigation } from '../model/useNavigation';
import NavigationItem from './NavigationItem.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const { menuGroups, isActiveRoute } = useNavigation();

// Mobile menu state
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const isMobile = () => $q.screen.lt.md;
</script>

<template>
  <nav class="navigation-widget">
    <!-- Mobile Menu Toggle Button -->
    <q-btn
      v-if="isMobile()"
      flat
      dense
      round
      icon="menu"
      class="navigation-mobile-toggle"
      @click="toggleMobileMenu"
    />

    <!-- Desktop Navigation -->
    <div v-if="!isMobile()" class="navigation-desktop">
      <template v-for="(group, groupIndex) in menuGroups" :key="groupIndex">
        <div class="navigation-group">
          <NavigationItem
            v-for="(item, itemIndex) in group.items"
            :key="itemIndex"
            :item="item"
            :is-active="isActiveRoute(item)"
          />
        </div>
      </template>
    </div>

    <!-- Mobile Navigation Drawer -->
    <q-drawer
      v-model="mobileMenuOpen"
      side="left"
      overlay
      behavior="mobile"
      :width="280"
      class="navigation-mobile-drawer"
    >
      <q-scroll-area class="fit">
        <q-list class="navigation-mobile-list">
          <template v-for="(group, groupIndex) in menuGroups" :key="groupIndex">
            <q-item-label v-if="group.title" header class="navigation-mobile-header">
              {{ group.title }}
            </q-item-label>

            <NavigationItem
              v-for="(item, itemIndex) in group.items"
              :key="itemIndex"
              :item="item"
              :is-active="isActiveRoute(item)"
              :mobile="true"
            />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </nav>
</template>

<style scoped lang="scss">
.navigation-widget {
  display: flex;
  align-items: center;
}

.navigation-mobile-toggle {
  color: var(--color-foreground);
  margin-right: 8px;
}

.navigation-desktop {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navigation-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

:global(.navigation-mobile-drawer) {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
}

.navigation-mobile-list {
  padding: 8px;
}

.navigation-mobile-header {
  color: var(--color-muted-foreground);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 16px 16px 8px;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .navigation-desktop {
    display: none;
  }
}

@media (min-width: 1024px) {
  .navigation-mobile-toggle {
    display: none;
  }
}
</style>
