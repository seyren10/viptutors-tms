import type { WithTimeStamp } from '@/types/common'
import type { taskPriority, taskSchema, taskStatus } from './schema'
import type z from 'zod'

export type Task = WithTimeStamp & {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  order: number
  userId: number
}

export type TaskStatus = (typeof taskStatus)[number]
export type TaskPriority = (typeof taskPriority)[number]

export type GetTasksQueryParams = Partial<{
  status: TaskStatus
  priority: TaskPriority
  search: string
}>

export type TaskSchema = z.infer<typeof taskSchema>

export type CreateTaskPayload = TaskSchema
export type UpdateTaskPayload = Partial<TaskSchema>
