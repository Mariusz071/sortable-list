import type { Post } from '@/api/types'

export interface PostAction {
  from: number
  to: number
  snapshot: Post[]
  postId: number
  id: string
}
