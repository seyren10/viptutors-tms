<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TooltipProvider } from './components/ui/tooltip';
import AppHeader from './components/app/AppHeader.vue';

</script>

<template>
  <TooltipProvider>
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense timeout="0">
          <!-- main content -->
          <component :is="Component"></component>

          <!-- loading state -->
          <template #fallback>
            <p>lopainignqwe</p>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </TooltipProvider>

</template>

<style scoped></style>
