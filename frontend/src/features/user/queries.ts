import { queryOptions, useMutation, useQuery } from '@tanstack/vue-query'
import { getUser, login } from './api'
import { useUserStore } from './store'
import { storeToRefs } from 'pinia'

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  })

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ['currentUser'],
    queryFn: getUser,
  })
