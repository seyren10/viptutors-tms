<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Loader } from '@/components/app/loader';

</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense timeout="0">
        <!-- main content -->
        <component :is="Component"></component>

        <!-- loading state -->
        <template #fallback>
          <Loader class="h-screen" />
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style scoped></style>
