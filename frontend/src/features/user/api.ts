import { httpClient } from '@/services/axios'
import type { LoginPayload, RegisterPayload, User } from './type'

export const login = async (payload: LoginPayload) => {
  await httpClient.get('/sanctum/csrf-cookie')
  await httpClient.post('/login', payload)
}

export const register = async (payload: RegisterPayload) => {
  await httpClient.get('/sanctum/csrf-cookie')
  const res = await httpClient.post<{ data: User }>('/register', payload)
  return res.data.data
}
export const logout = async () => {
  await httpClient.get('/sanctum/csrf-cookie')
  await httpClient.post('/logout')
}

export const getUser = async () => {
  const res = await httpClient.get<{ data: User }>('/api/user')
  return res.data.data
}
