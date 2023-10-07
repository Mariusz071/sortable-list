import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import * as postsApi from '@/api/posts'
import { useSortableList } from '@/stores/sortableList'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'
import { mockPostsResponse } from './mocks'

describe('sortableList store', () => {
  let store
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSortableList()
  })

  vi.spyOn(postsApi, 'getPosts').mockImplementation(() => {
    return new Promise<void>((resolve, reject) => {
      //@ts-ignore
      resolve(mockPostsResponse)
    })
  })

  it('WHEN initialized, has correct values', () => {
    expect(store.posts).toStrictEqual([])
    expect(store.postActions).toStrictEqual([])
    expect(store.sortedPosts).toStrictEqual([])
    expect(store.activeSnapshotId).toBe('')
  })

  it('WHEN fetching posts, relevant values are correctly set', async () => {
    await store.getPostsAction()
    expect(store.posts).toStrictEqual(mockPostsResponse.data)

    const expectedInitialSortedPosts = mockPostsResponse.data.slice(0, VISIBLE_POSTS_NUMBER)
    expect(store.sortedPosts).toStrictEqual(expectedInitialSortedPosts)
  })

  describe('WHEN moving post', () => {
    let store

    beforeEach(() => {
      setActivePinia(createPinia())
      store = useSortableList()
    })

    it('AND there is no active snapshot, correct logic is fired', async () => {
      await store.getPostsAction()

      const actionPayload = {
        type: 'down',
        from: 0,
        postId: 111
      }

      const expectedSnapshot = [...store.sortedPosts]

      store.movePostAction(actionPayload)
      const expectedPostActions = [
        {
          from: actionPayload.from,
          to: actionPayload.from + 1,
          snapshot: expectedSnapshot,
          postId: actionPayload.postId,
          id: expect.any(String)
        }
      ]
      expect(store.postActions).toStrictEqual(expectedPostActions)
    })

    it('AND existing active snapshot is cleared', async () => {
      await store.getPostsAction()
      store.activeSnapshotId = '111-222-333'

      const actionPayload = {
        type: 'down',
        from: 0,
        postId: 111
      }

      store.movePostAction(actionPayload)
      expect(store.activeSnapshotId).toBe('')
    })

    it('AND action already exists', async () => {
      await store.getPostsAction()

      const actionPayload = {
        type: 'down',
        from: 0,
        postId: 111
      }

      const expectedSnapshot = [...store.sortedPosts]

      const initialPostActions = [
        {
          from: actionPayload.from,
          to: actionPayload.from + 1,
          snapshot: expectedSnapshot,
          postId: actionPayload.postId,
          id: expect.any(String)
        }
      ]

      // actions is added to the store
      store.postActions = initialPostActions

      // calling move post action with already existing action
      store.movePostAction(initialPostActions)

      expect(store.postActions).toStrictEqual(initialPostActions)
    })

    it('AND new action is added to the top of the list', async () => {
      await store.getPostsAction()

      // adding first action
      const initialAction = {
        from: 0,
        to: 1,
        snapshot: store.sortedPosts,
        postId: 2,
        id: '111-abc'
      }
      store.postActions = [initialAction]
      ////

      const secondActionPayload = {
        type: 'up',
        from: 2,
        postId: 333
      }

      const secondActionExpectedPayload = [...store.sortedPosts]
      store.movePostAction(secondActionPayload)

      const expectedFirstAction = {
        from: secondActionPayload.from,
        to: secondActionPayload.from - 1,
        snapshot: secondActionExpectedPayload,
        postId: secondActionPayload.postId,
        id: expect.any(String)
      }

      expect(store.postActions[0]).toStrictEqual(expectedFirstAction)
      expect(store.postActions[1]).toStrictEqual(initialAction)
    })
  })

  it('goToListSnapshotAction fires correct logic', async () => {
    await store.getPostsAction()

    store.postActions = [
      {
        id: 1,
        snapshot: ['a', 'b', 'c']
      },
      {
        id: 2,
        snapshot: ['a', 'b', 'c']
      },
      {
        id: 3,
        snapshot: ['a', 'b', 'c']
      },
      {
        id: 4,
        snapshot: ['a', 'b', 'c']
      }
    ]

    const mockAction = {
      id: 3,
      snapshot: ['a', 'b', 'c']
    }

    store.goToListSnapshotAction(mockAction)
    expect(store.sortedPosts).toStrictEqual(mockAction.snapshot)

    expect(store.postActions).toStrictEqual([
      {
        id: 4,
        snapshot: ['a', 'b', 'c']
      }
    ])
  })
})
