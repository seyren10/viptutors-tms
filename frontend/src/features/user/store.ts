import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from './type'
import { queryClient } from '@/services/vue-query'
import { logoutMutationOptions, userQueryOptions } from './queries'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('users', () => {
  const user = ref<User | null>(null)
  const router = useRouter()

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

  const signOut = async () => {
    const { mutateAsync, isSuccess } = useMutation(logoutMutationOptions)
    await mutateAsync()

    if (isSuccess) {
      router.replace({ name: 'login' })
      user.value = null
    }
  }

  return {
    user,
    getUser,
    userInitials,
    signOut,
  }
})
