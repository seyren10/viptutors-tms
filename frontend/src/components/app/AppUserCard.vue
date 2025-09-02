<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { User } from '@/features/user/type';
import { computed } from 'vue';


const props = defineProps<{
    user: User
}>()

const stats = computed(() => props.user.tasksStats)
</script>
<template>
    <Card v-if="user">
        <CardHeader>
            <CardTitle>{{ user.name }}</CardTitle>
            <CardDescription>{{ user.email }}</CardDescription>
        </CardHeader>

        <CardContent class="space-x-4">
            <Badge>{{ stats?.total }} Tasks</Badge>
            <Badge class="bg-amber-500/30 text-amber-700 border-amber-700">{{ stats?.pending }} Pending</Badge>
            <Badge class="bg-emerald-500/30 text-emerald-700 border-emerald-700">{{ stats?.completed }} Completed
            </Badge>
        </CardContent>
    </Card>
</template>


<style lang="scss" scoped></style>