import type { Post } from '@/api/types'

export interface Action {
  from: number
  to: number
  snapshot: Post[]
}
