export type LoginPayload = {
  email: string
  password: string
}
export type RegisterPayload = {
  name: string
  email: string
  password: string
  confirm_password: string
}

export type User = {
  name: string
  email: string
  createdAt: string
  updatedAt: string
  isAdmin?: boolean
  taskStats?: UserTaskStats
}

export type UserTaskStats = {
  total: null
  completed: null
  pending: null
}
