<script setup lang="ts">
// imports
import { onBeforeMount } from 'vue'
import { useSortableList } from '@/stores/sortableList'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'
////

// list store
const listStore = useSortableList()
////

// fetching posts
onBeforeMount(async () => {
  await listStore.getPostsAction()
})
////
</script>
<template lang="pug">
div.px-1
  h1.mb-4.text-h5.text-white.font-weight-bold Sortable Post List
  transition-group(
    name="posts"
    tag="div"
  )
    v-card.mb-6.elevation-4.post(
      v-for="(item, index) in listStore.sortedPosts"
      height="100"
      :key="item.id"
      transition="fade-transition"
    )
      v-card-text.py-0.d-flex.justify-space-between.align-center.h-100
        div.text-body-1.text-gray.d-flex
          span {{ `Post ${item.id}` }}
        div.post__actions.d-flex.flex-column.justify-space-between
          v-btn(
            v-if='index !== 0'
            icon
            color="secondary"
            variant="plain"
            @click="listStore.movePostAction({from: index, type: 'up', postId: item.id})"
          )
            v-icon(size='x-large') mdi-chevron-up
          v-btn(
            v-if="index !== VISIBLE_POSTS_NUMBER - 1"
            icon
            color="secondary"
            variant="plain"
            @click="listStore.movePostAction({from: index, type: 'down', postId: item.id})"
          )
            v-icon(size='x-large') mdi-chevron-down


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
