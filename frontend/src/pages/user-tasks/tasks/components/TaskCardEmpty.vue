<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


</script>
<template>
    <Card class="border-dashed">
        <CardHeader>
            <CardTitle>You dont have any tasks</CardTitle>
            <CardDescription>Start by adding new tasks.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button>Add new Task</Button>
        </CardContent>
    </Card>
</template>



<style scoped></style>