<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import type { TaskStatus } from '@/features/tasks/type';
import { cn } from '@/lib/utils';
import { Check, Clock } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
    status: TaskStatus
}>()

const getStatusClass = computed(() => {
    switch (props.status) {
        case 'completed':
            return 'bg-emerald-500/30 border-emerald-500 text-emerald-700'
        case 'pending':
            return 'bg-amber-500/30 border-amber-500 text-amber-700'
    }
})

const getStatusIcon = computed(() => {
    switch (props.status) {
        case 'completed':
            return Check
        case 'pending':
            return Clock
    }
})
</script>
<template>
    <Badge :class="cn(getStatusClass, $attrs['class'])">
        <component :is="getStatusIcon" />
        <p class="capitalize">{{ status }}</p>
    </Badge>
</template>



<style scoped></style>