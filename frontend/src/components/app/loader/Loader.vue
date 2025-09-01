<script setup lang="ts">
import { type LoaderProps } from '.';
import { LoaderCircle } from 'lucide-vue-next';

const props = defineProps<LoaderProps>()

</script>

<template>
    <div class="rounded-md border border-dashed grid place-content-center text-center">
        <component class="animate-spin mx-auto" :is="icon ? icon : LoaderCircle" />
        <slot></slot>
    </div>
</template>


<style scoped></style>