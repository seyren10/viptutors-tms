import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import type { GetTasksQueryParams, UpdateTaskPayload } from './type'
import { createTask, deleteTask, getTasks, updateTask } from './api'
import { queryClient } from '@/services/vue-query'
import { toast } from 'vue-sonner'

export const getTasksQueryOption = (params?: GetTasksQueryParams) =>
  queryOptions({
    queryKey: ['tasks', 'list', params || ''],
    queryFn: () => getTasks(params),
  })

export const useCreateTask = () =>
  useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.info('A new task has been created.')
    },
  })
export const useUpdateTask = () =>
  useMutation({
    mutationFn: ({ payload, taskId }: { taskId: number; payload: UpdateTaskPayload }) =>
      updateTask(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.info('Task has been updated.')
    },
  })

export const useDeleteTask = () =>
  useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
      toast.info('Task has been Deleted.')
    },
  })
