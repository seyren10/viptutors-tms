<script setup lang="ts">
import { computed } from "vue"
import {
    type ColumnDef,
    getCoreRowModel,
    useVueTable,
    FlexRender, // ✅ Vue component for rendering cells/headers
} from "@tanstack/vue-table"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import type { ApiResource } from "@/types/common";
import type { User } from "@/features/user/type";
import { userColumns } from "./columns";
import { useRouter } from "vue-router";

const props = defineProps<{
    response: ApiResource<User>
}>()



const table = useVueTable<User>({
    data: props.response.data,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
})

const links = computed(() => props.response.links)

const router = useRouter()
function goToUserTasks(userId: number) {
    router.push({ path: `${userId}/tasks` })
}
</script>

<template>
    <div class="space-y-4">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow v-for="row in table.getRowModel().rows" :key="row.id" @click="goToUserTasks(row.original.id)">
                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- Pagination -->
        <div class="flex justify-between items-center pt-4">
            <Button variant="outline" size="sm" :disabled="!links.prev" @click="$emit('paginate', links.prev)">
                Previous
            </Button>
            <Button variant="outline" size="sm" :disabled="!links.next" @click="$emit('paginate', links.next)">
                Next
            </Button>
        </div>
    </div>
</template>
