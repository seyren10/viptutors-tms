<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Task } from '@/features/tasks/type';
import TaskCardItemStatus from './TaskCardItemStatus.vue';
import TaskCardItemPriority from './TaskCardItemPriority.vue';
import TaskCardItemActions from './TaskCardItemActions.vue';

const props = defineProps<{
    task: Task
}>()
</script>
<template>
    <Card>
        <CardHeader class="flex items-start gap-4">
            <div>
                <TaskCardItemPriority :priority="task.priority" />
            </div>
            <div>
                <CardTitle class="capitalize">{{ task.title }}</CardTitle>
                <CardDescription>{{ task.description ?? '-' }}</CardDescription>
            </div>
            <div class="ml-auto">
                <TaskCardItemActions :task="props.task" />
            </div>
        </CardHeader>
        <CardContent>
            <TaskCardItemStatus :status="task.status" />
        </CardContent>
    </Card>
</template>



<style scoped></style>