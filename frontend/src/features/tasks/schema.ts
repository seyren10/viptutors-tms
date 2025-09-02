import z from 'zod'
import type { TaskStatus } from './type'
export const taskStatus = ['pending', 'completed'] as const
export const taskPriority = ['low', 'medium', 'high'] as const

export const taskSchema = z.object({
  title: z.string().nonempty('Required'),
  description: z.string().optional(),
  status: z.enum(taskStatus).optional(),
  priority: z.enum(taskPriority).optional(),
})
