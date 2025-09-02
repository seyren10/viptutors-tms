<script setup lang="ts">
import type { TaskSchema } from '@/features/tasks/type';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { taskPriority, taskSchema } from '@/features/tasks/schema';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const props = withDefaults(defineProps<{
    initialValues?: Partial<TaskSchema>
    loading?: boolean
    title?: string,
    description?: string
}>(), {
    title: 'Create new task',
    description: 'Fill out the form to create a new task'
})

const dialogModel = defineModel('dialog', { default: false })

const emits = defineEmits<{
    (e: 'submit', data: TaskSchema): void
}>()

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(taskSchema),
    initialValues: props.initialValues
})


const submit = handleSubmit((data: TaskSchema) => {
    emits('submit', data)
})

</script>
<template>
    <Dialog v-model:open="dialogModel">
        <DialogContent>
            <form class="space-y-4" @submit="submit">
                <DialogHeader>
                    <DialogTitle>{{ props.title }}</DialogTitle>
                    <DialogDescription>{{ props.description }}</DialogDescription>
                </DialogHeader>


                <FormField #="{ componentField }" name="title">
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" />
                        </FormControl>
                        <FormDescription>Title of your new task</FormDescription>
                        <FormMessage />
                    </FormItem>

                </FormField>
                <FormField #="{ componentField }" name="description">
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea v-bind="componentField" />
                        </FormControl>
                        <FormDescription>Optional description</FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField #="{ componentField }" name="priority">
                    <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select v-bind="componentField">
                            <FormControl>
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select a priority" />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                                <SelectItem v-for="priority in taskPriority" :value="priority" :key="priority"
                                    class="capitalize">{{
                                        priority }}</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Defines the importance of this task</FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogFooter class="w-full *:grow">
                    <Button :disabled="loading" type="submit">Submit</Button>
                </DialogFooter>
            </form>
        </DialogContent>


    </Dialog>
</template>



<style scoped></style>