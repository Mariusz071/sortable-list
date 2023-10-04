import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { getPosts } from '@/api/posts'
import { useAlert } from '@/stores/alert'
import { getSortedList } from '@/common/utils'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'

import type { Ref } from 'vue'
import type { Post } from '@/api/types'
import type { Action } from '@/modules/List/components/types'
import type { MovePostActionParams } from './types'

export const useList = defineStore('list', () => {
  const posts: Ref<Post[]> = ref([])
  const actions: Ref<Action[]> = ref([])
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

  const movePostAction = ({ type, from }: MovePostActionParams) => {
    const to = type === 'up' ? from - 1 : from + 1
    sortedPosts.value = getSortedList({ to, from, items: sortedPosts.value })
  }

  return {
    posts,
    // visiblePosts,
    sortedPosts,
    getPostsAction,
    movePostAction
  }
})
