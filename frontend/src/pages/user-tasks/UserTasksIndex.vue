<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css'
import { RouterView } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getTasksQueryOption } from '@/features/tasks/queries';
import TasksIndex from './tasks/TasksIndex.vue';

const { data } = useQuery(getTasksQueryOption())
</script>
<template>
    <div class="p-4 md:p-10">
        <TasksIndex />
        <Toaster />
    </div>
</template>



<style scoped></style>