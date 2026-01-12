<script setup lang="ts">
import { ref, computed } from 'vue';
import { QIntersection } from 'quasar';
import { PageContainer, Input } from '@shared/ui';
import IconCard from './ui/IconCard.vue';
import { getIconsData } from './lib/iconsData';

// Load all icons
const allIcons = getIconsData();
const searchQuery = ref('');

// Filter icons based on search query (search by name and keywords)
const filteredIcons = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) {
    return allIcons;
  }

  return allIcons.filter((icon) => {
    // Search in icon name
    if (icon.name.toLowerCase().includes(query)) {
      return true;
    }

    // Search in keywords
    return icon.keywords.some((keyword) => keyword.toLowerCase().includes(query));
  });
});

// Count for display
const totalCount = computed(() => allIcons.length);
const filteredCount = computed(() => filteredIcons.value.length);
</script>

<template>
  <PageContainer
    title="Icons"
    :subtitle="`Browse ${totalCount} Tabler icons. Click any icon to copy its name.`"
  >
    <div class="icons-page column q-gutter-y-md">
      <!-- Search Section -->
      <div class="icons-page__search">
        <Input
          v-model="searchQuery"
          type="search"
          placeholder="Search icons by name or keyword..."
          icon="search"
          clearable
        />
        <div v-if="searchQuery" class="text-caption text-muted-foreground q-mt-sm">
          Found {{ filteredCount }} icon{{ filteredCount !== 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Icons Grid -->
      <div class="icons-page__grid">
        <QIntersection
          v-for="icon in filteredIcons"
          :key="icon.name"
          once
          transition="scale"
          class="icons-page__grid-item"
        >
          <IconCard :icon-name="icon.name" :icon-svg="icon.svg" />
        </QIntersection>
      </div>

      <!-- No results message -->
      <div v-if="filteredCount === 0 && searchQuery" class="text-center q-py-xl">
        <p class="text-h6 text-muted-foreground">No icons found</p>
        <p class="text-body2 text-muted-foreground">
          Try searching with different keywords
        </p>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped lang="scss">
.icons-page {
  width: 100%;
}

.icons-page__search {
  max-width: 600px;
  width: 100%;
}

.icons-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  width: 100%;
}

.icons-page__grid-item {
  min-height: 100px;
}

// Responsive adjustments
@media (max-width: 600px) {
  .icons-page__grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
}

@media (min-width: 1400px) {
  .icons-page__grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>
