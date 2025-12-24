<script setup lang="ts">
import { ref } from 'vue';
import { HeaderWidget } from '@widgets/header';

// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school'
//   },
// ];

const leftDrawerOpen = ref(false);

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderWidget/>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
