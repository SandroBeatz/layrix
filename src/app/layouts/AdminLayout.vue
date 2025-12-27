<script setup lang="ts">
// import { ref } from 'vue';
import { HeaderWidget } from '@widgets/header';
import { SidebarWidget } from '@widgets/sidebar';

// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school'
//   },
// ];

// const leftDrawerOpen = ref(false);

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderWidget/>
    <SidebarWidget/>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
