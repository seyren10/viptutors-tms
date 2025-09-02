export type WithTimeStamp = {
  createdAt: string
  updatedAt: string
}

export type ApiResource<T> = {
  data: T[]
  links: ApiResourceLinks
  meta: ApiResourceMeta
}

export type ApiResourceLinks = {
  first: string
  last: null | string
  prev: null | string
  next: null | string
}

export type ApiResourceMeta = {
  current_page: number
  current_page_url: string
  from: number
  path: string
  per_page: number
  to: number
}
