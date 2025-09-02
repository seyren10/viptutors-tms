<script setup lang="ts">
import { getTasksQueryOption, useCreateTask, } from '@/features/tasks/queries';
import TaskCard from './components/TaskCard.vue';
import TaskCardSkeleton from './components/TaskCardSkeleton.vue';
import TaskCardEmpty from './components/TaskCardEmpty.vue';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import type { TaskSchema } from '@/features/tasks/type';
import { useQuery } from '@tanstack/vue-query';
import { useUserStore } from '@/features/user/store';
import { storeToRefs } from 'pinia';
import AppUserCard from '@/components/app/AppUserCard.vue';


const { data: tasks, isPending, } = useQuery(getTasksQueryOption())
const { mutateAsync: createTaskMutate, isPending: isCreating, isSuccess } = useCreateTask()

const showFormDialog = ref(false)

const handleCreateTask = async (data: TaskSchema) => {
    await createTaskMutate(data)
    if (isSuccess) {
        showFormDialog.value = false
    }
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
    <div class="space-y-4">

        <AppUserCard :user="user" v-if="user" />

        <div class="flex gap-4 items-center justify-between flex-wrap">
            <h1 class="text-lg font-bold">List of tasks</h1>
            <Button @click="showFormDialog = true" class="w-full md:w-auto">
                <Plus />
                Create new Task
            </Button>
        </div>
        <TaskCardSkeleton v-if="isPending" />

        <TaskCardEmpty v-else-if="!tasks || !tasks.length" />
        <TaskCard v-else :tasks="tasks" />

        <!-- CREATE TASK DIALOG -->
        <TaskForm v-model:dialog="showFormDialog" :loading="isCreating" @submit="handleCreateTask" :initial-values="{
            priority: 'low'
        }" />
    </div>
</template>


<style scoped></style>