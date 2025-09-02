<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';


</script>
<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton v-for="value in 6" class="h-[10rem]">

        </Skeleton>
    </div>
</template>



<style scoped></style>