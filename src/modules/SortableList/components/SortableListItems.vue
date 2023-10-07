<script setup lang="ts">
// imports
import { onBeforeMount, ref } from 'vue'

import SortableListItemsLoader from './SortableListItemsLoader.vue'
import SortableListItemsItem from './SortableListItemsItem.vue'
import { useSortableList } from '@/stores/sortableList'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'
////

// list store
const listStore = useSortableList()
////

// fetching posts
const isLoading: Ref<boolean> = ref(true)
onBeforeMount(async () => {
  await listStore.getPostsAction()
  isLoading.value = false
})
////
</script>
<template lang="pug">
div.px-1
  h1.mb-4.text-h5.text-white.font-weight-bold(test-id="sortable-list-header") Sortable Post List
  SortableListItemsLoader(v-if="isLoading")
  transition-group(
    v-else
    name="posts"
    tag="div"
  )
    SortableListItemsItem(
      v-for="(post, index) in listStore.sortedPosts"
      v-bind="{ post, index }"
      :key="post.id"
      @move-post="listStore.movePostAction"
    )
</template>

<style lang="scss" scoped>
.posts-move, /* apply transition to moving elements */
.posts-enter-active,
.posts-leave-active {
  transition: all 0.3s ease;
}

.posts-enter-from,
.posts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.posts-leave-active {
  position: absolute;
}
</style>
