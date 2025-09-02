import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from './type'
import { queryClient } from '@/services/vue-query'
import { userQueryOptions } from './queries'

export const useUserStore = defineStore('users', () => {
  const user = ref<User | null>(null)

  const userInitials = computed(() =>
    user.value?.name
      .split(' ')
      .map((i) => i[0])
      .join(' '),
  )
  const getUser = async () => {
    const resUser = await queryClient.fetchQuery(userQueryOptions())
    user.value = resUser
  }

  return {
    user,
    getUser,
    userInitials,
  }
})
