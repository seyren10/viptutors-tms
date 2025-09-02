<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Task } from '@/features/tasks/type';
import TaskCardItem from './TaskCardItem.vue';

const props = defineProps<{
    tasks: Task[]
}>()
</script>
<template>
    <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TaskCardItem v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
</template>



<style scoped></style>