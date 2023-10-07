import type { MoveListItemParams } from './types'

export const getSortedList = ({ to, from, items }: MoveListItemParams) => {
  const itemToMove = items.splice(from, 1)[0]
  items.splice(to, 0, itemToMove)
  return items
}
