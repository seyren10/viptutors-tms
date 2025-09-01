import { httpClient } from '@/services/axios'
import type { LoginCredentials } from './type'

export const login = async (payload: LoginCredentials) => {
  await httpClient.post('/login', payload)
}
