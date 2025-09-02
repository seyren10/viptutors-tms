import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GetTasksQueryParams, Task } from './type'
import { queryClient } from '@/services/vue-query'
import { getTasksQueryOption } from './queries'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[] | null>(null)

  const getUserTask = async (params?: GetTasksQueryParams) => {
    const res = await queryClient.ensureQueryData(getTasksQueryOption(params))
    tasks.value = res
  }

  return {
    tasks,
    getUserTask,
  }
})
