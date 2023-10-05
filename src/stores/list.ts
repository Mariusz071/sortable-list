import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getPosts } from '@/api/posts'
import { useAlert } from '@/stores/alert'
import { getSortedList } from '@/common/utils'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'

import type { Ref } from 'vue'
import type { Post } from '@/api/types'
import type { PostAction } from '@/modules/List/components/types'
import type { MovePostActionParams } from './types'

export const useList = defineStore('list', () => {
  const posts: Ref<Post[]> = ref([])
  const postActions: Ref<PostAction[]> = ref([])
  const sortedPosts: Ref<Post[]> = ref([])

  // const visiblePosts = computed(() => {
  //   return posts.value.length > VISIBLE_POSTS_NUMBER
  //     ? [...posts.value].slice(0, VISIBLE_POSTS_NUMBER)
  //     : posts.value
  // })

  const getPostsAction = async () => {
    const alertsStore = useAlert()

    try {
      const res = await getPosts()
      posts.value = res.data
      sortedPosts.value =
        posts.value.length > VISIBLE_POSTS_NUMBER
          ? [...posts.value].slice(0, VISIBLE_POSTS_NUMBER)
          : posts.value
    } catch (e: any) {
      alertsStore.show({
        type: 'error',
        text: `Failed to fetch posts list. Error: ${e.message}.`
      })
    }
  }

  const movePostAction = ({ type, from, postId }: MovePostActionParams) => {
    const to = type === 'up' ? from - 1 : from + 1
    const postAction = {
      from,
      to,
      snapshot: [...sortedPosts.value],
      postId
    }

    if (shouldAddPostAction(postAction)) {
      postActions.value.push(postAction)
    }
    sortedPosts.value = getSortedList({ to, from, items: sortedPosts.value })
  }

  const goToListSnapshotAction = (snapshot: Post[]) => {
    sortedPosts.value = [...snapshot]
  }

  // checks if this action already exists, to avoid duplicates
  const shouldAddPostAction = (postAction: PostAction) => {
    const { to, from, postId } = postAction
    const isActionExisting = !postActions.value.find((item) => {
      return item.to === to && postId === item.postId && item.from === from
    })

    return isActionExisting
  }

  return {
    posts,
    // visiblePosts,
    sortedPosts,
    postActions,
    getPostsAction,
    movePostAction,
    goToListSnapshotAction
  }
})
