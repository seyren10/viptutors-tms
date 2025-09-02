import type { User } from '@/features/user/type'
import type { ColumnDef } from '@tanstack/vue-table'
import { Badge } from '@/components/ui/badge'
import { h } from 'vue'

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isAdmin',
    header: 'Role',
    cell: (info) => (info.getValue() ? 'Admin' : 'User'),
  },
  {
    id: 'tasksTotal',
    header: 'Tasks (Total)',
    cell: (info) =>
      h(
        Badge,
        { class: 'bg-primary-500/30 text-primary-700 border-primary-700' },
        () => info.row.original.tasksStats?.completed,
      ),
  },
  {
    id: 'tasksCompleted',
    header: 'Completed',
    cell: (info) => {
      return h(
        Badge,
        { class: 'bg-emerald-500/30 text-emerald-700 border-emerald-700' },
        () => info.row.original.tasksStats?.completed,
      )
    },
  },
  {
    id: 'tasksPending',
    header: 'Pending',
    cell: (info) =>
      h(
        Badge,
        { class: 'bg-amber-500/30 text-amber-700 border-amber-700' },
        () => info.row.original.tasksStats?.pending,
      ),
  },
]
