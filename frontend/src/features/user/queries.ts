import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import { getUser, login } from './api'
import { queryClient } from '@/services/vue-query'

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  })

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ['currentUser'],
    queryFn: getUser,
  })
