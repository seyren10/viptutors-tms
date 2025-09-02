<script setup lang="ts">
import { getUsers } from '@/features/admin/api';
import { useQuery } from '@tanstack/vue-query';
import AdminDataTable from './component/AdminDataTable.vue';


const { data, isPending } = useQuery({
    queryKey: ['users', 'list'],
    queryFn: getUsers
})
</script>
<template>
    <div class="container mx-auto p-4">
        <div class="p-4 border rounded-md">
            <AdminDataTable v-if="data" :response="data" />
        </div>

    </div>
</template>


<style scoped></style>