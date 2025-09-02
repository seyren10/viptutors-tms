import { queryOptions, useMutation, useQuery, type MutationOptions } from '@tanstack/vue-query'
import { getUser, login, logout } from './api'
import { queryClient } from '@/services/vue-query'

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  })

export const logoutMutationOptions: MutationOptions = {
  mutationFn: logout,
  onSuccess: () => {
    queryClient.removeQueries()
  },
}

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ['currentUser'],
    queryFn: getUser,
  })
