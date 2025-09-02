<script setup lang="ts">
import AppUserCard from '@/components/app/AppUserCard.vue';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserFromAdmin, getUserTasks } from '@/features/admin/api';
import TaskCard from '@/pages/user-tasks/tasks/components/TaskCard.vue';
import TaskCardEmpty from '@/pages/user-tasks/tasks/components/TaskCardEmpty.vue';
import TaskCardSkeleton from '@/pages/user-tasks/tasks/components/TaskCardSkeleton.vue';
import { useQuery } from '@tanstack/vue-query';

const props = defineProps<{
    userId: string
}>()

const { data: userTasks, isPending, refetch: refetchUserTasks } = useQuery({
    queryKey: ['tasks', props.userId],
    queryFn: () => getUserTasks(Number(props.userId))
})

const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ['user', props.userId],
    queryFn: () => getUserFromAdmin(Number(props.userId))
})


</script>
<template>
    <div class="container mx-auto p-4 space-y-2">
        <AppUserCard :user="user" v-if="user" />

        <TaskCardSkeleton v-if="isPending" />

        <TaskCardEmpty v-else-if="!userTasks || !userTasks.length" />
        <TaskCard v-else :tasks="userTasks" />
    </div>
</template>



<style scoped></style>