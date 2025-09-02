<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUpdateTask } from '@/features/tasks/queries';
import type { Task, TaskPriority, TaskSchema, TaskStatus, UpdateTaskPayload } from '@/features/tasks/type';
import { Check, Clock, Edit2, LoaderCircle, MoreVertical } from 'lucide-vue-next';
import TaskForm from './TaskForm.vue';
import { ref } from 'vue';

const props = defineProps<{
    task: Task
}>()

const { mutateAsync: updateTaskMutate, isPending, isSuccess } = useUpdateTask()

const handleChangeStatus = (status: TaskStatus) => {
    updateTaskMutate({
        taskId: props.task.id, payload: {
            status
        }
    })
}

const handleChangePriority = (priority: TaskPriority) => {
    updateTaskMutate({
        taskId: props.task.id,
        payload: {
            priority
        }
    })
}

const showUpdateDialog = ref(false)
const handleUpdateTask = async (data: TaskSchema) => {
    const payload: UpdateTaskPayload = data;
    await updateTaskMutate({
        taskId: props.task.id,
        payload
    })

    if (isSuccess) {
        showUpdateDialog.value = false
    }
}
</script>
<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon">
                <LoaderCircle class="animate-spin" v-if="isPending" />
                <MoreVertical v-else />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem @select="() => showUpdateDialog = true">
                    <Edit2 /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem v-if="props.task.status === 'pending'"
                    @select="() => handleChangeStatus('completed')">
                    <Check /> Mark as completed
                </DropdownMenuItem>
                <DropdownMenuItem v-if="props.task.status === 'completed'"
                    @select="() => handleChangeStatus('pending')">
                    <Clock /> Mark as pending
                </DropdownMenuItem>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        priority
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem @select="() => handleChangePriority('low')">Low</DropdownMenuItem>
                        <DropdownMenuItem @select="() => handleChangePriority('medium')">Medium</DropdownMenuItem>
                        <DropdownMenuItem @select="() => handleChangePriority('high')">High</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    <TaskForm v-model:dialog="showUpdateDialog" :initial-values="{
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        priority: task.priority
    }" :loading="isPending" @submit="handleUpdateTask" />
</template>



<style scoped></style>