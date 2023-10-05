import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v1 as uuidv1 } from 'uuid'

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
  const activeSnapshotId: Ref<string> = ref('')

  const getPostsAction = async () => {
    const alertsStore = useAlert()

    try {
      const res = await getPosts()
      posts.value = res.data

      // if there is more than 5 posts, renders first 5
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
      postId,
      id: uuidv1()
    }

    if (shouldAddPostAction(postAction)) {
      postActions.value.unshift(postAction)
    }
    sortedPosts.value = getSortedList({ to, from, items: sortedPosts.value })
    activeSnapshotId.value = ''
  }

  const goToListSnapshotAction = (action: PostAction) => {
    sortedPosts.value = [...action.snapshot]

    // activeSnapshotId is used to detect which action was last 'time travelled'
    // and disabling 'time travel' button accordingly, displaying UI feedback to the user
    activeSnapshotId.value = action.id
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
    sortedPosts,
    postActions,
    getPostsAction,
    movePostAction,
    goToListSnapshotAction,
    activeSnapshotId
  }
})
