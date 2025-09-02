<script setup lang="ts">
import { Button, type ButtonVariants } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

const props = defineProps<{
    variant: ButtonVariants['variant']
}>()

</script>

<template>
    <div>
        <Button :variant="variant">
            <slot></slot>
        </Button>
        <DropdownMenu></DropdownMenu>
    </div>
</template>


<style scoped></style>