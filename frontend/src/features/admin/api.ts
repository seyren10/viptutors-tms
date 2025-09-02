import { httpClient } from '@/services/axios'
import type { ApiResource } from '@/types/common'
import type { User } from '../user/type'
import type { Task } from '../tasks/type'

export const getUsers = async () => {
  const res = await httpClient.get<ApiResource<User>>('/api/users')
  return res.data
}

export const getUserTasks = async (userId: number) => {
  const res = await httpClient.get<{ data: Task[] }>(`/api/users/${userId}/tasks`)
  return res.data.data
}

export const getUserFromAdmin = async (userId: number) => {
  const res = await httpClient.get<{ data: User }>(`/api/users/${userId}}`)
  return res.data.data
}
