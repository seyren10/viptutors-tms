import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from './type'

export const useUserStore = defineStore('users', () => {
  const user = ref<User>()

  return {
    user,
  }
})
