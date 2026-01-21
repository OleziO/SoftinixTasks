<template>
  <ElConfigProvider>
    <PageLayout>
      <router-view />
    </PageLayout>
    <Modals :modals="useAppModals()" />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import PageLayout from '@/layouts/PageLayout.vue'
import { useAppModals } from '@/composables';
</script>
