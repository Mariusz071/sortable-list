import type { Post } from '@/api/types'

export interface MoveListItemParams {
  to: number
  from: number
  items: Post[]
}
