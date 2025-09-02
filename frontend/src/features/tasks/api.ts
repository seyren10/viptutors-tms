import { httpClient } from '@/services/axios'
import type { CreateTaskPayload, GetTasksQueryParams, Task, UpdateTaskPayload } from './type'

export const getTasks = async (params?: GetTasksQueryParams) => {
  const res = await httpClient.get<{ data: Task[] }>('/api/tasks', { params })

  return res.data.data
}

export const updateTask = async (taskId: number, payload: UpdateTaskPayload) => {
  const res = await httpClient.put<{ data: Task }>(`/api/tasks/${taskId}`, payload)
  return res.data.data
}
export const createTask = async (payload: CreateTaskPayload) => {
  const res = await httpClient.post<{ data: Task }>('/api/tasks', payload)
  return res.data.data
}
