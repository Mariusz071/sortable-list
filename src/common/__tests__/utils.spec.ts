import { describe, it, expect } from 'vitest'
import { getSortedList } from '@/common/utils'

describe('utils', () => {
  it('getSortedList', () => {
    const expected = ['apple', 'pineapple', 'orange', 'dragonfruit', 'mandrake']
    const actual = getSortedList({
      to: 2,
      from: 1,
      items: ['apple', 'orange', 'pineapple', 'dragonfruit', 'mandrake']
    })

    expect(actual).toStrictEqual(expected)
  })
})
