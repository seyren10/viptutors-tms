<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { TaskPriority } from '@/features/tasks/type';
import { cn } from '@/lib/utils';
import { Dot, Flame } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
    priority: TaskPriority
}>()
const getPriorityClass = computed(() => {
    switch (props.priority) {
        case 'low': return 'text-emerald-500'
        case 'medium': return 'text-amber-500'
        case 'high': return 'text-rose-500'
    }
})
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Flame :class="cn(getPriorityClass), 'size-4'"></Flame>
        </TooltipTrigger>
        <TooltipContent>
            <p>Priority: {{ props.priority }}</p>
        </TooltipContent>
    </Tooltip>
</template>


<style scoped></style>