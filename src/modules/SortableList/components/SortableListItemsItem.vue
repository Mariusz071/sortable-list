<script setup lang="ts">
// imports
import { computed } from 'vue'
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'
////

// props
const props = defineProps({
  post: {
    type: Array,
    required: true
  },
  position: {
    type: String,
    required: false,
    default: 'middle',
    validator: (value: string) => ['first', 'last', 'middle'].includes(value)
  },
  index: {
    type: Number,
    required: true
  }
})
////

// emits
const emit = defineEmits(['move-post'])
////

// UI related
const showUpBtn = computed(() => {
  return props.index !== 0
})

const showDownBtn = computed(() => {
  return props.index < VISIBLE_POSTS_NUMBER - 1
})
////
</script>
<template lang="pug">
v-card.mb-6.elevation-4.post(
  height="100"
  :key="props.post.id"
)
  v-card-text.py-0.d-flex.justify-space-between.align-center.h-100
    div.text-body-1.text-gray.d-flex
      span {{ `Post ${props.post.id}` }}
    div.post__actions.d-flex.flex-column.justify-space-between
      v-btn(
        v-if="showUpBtn"
        test-id="move-up-btn"
        icon
        color="secondary"
        variant="plain"
        @click="emit('move-post', {from: props.index, type: 'up', postId: props.post.id})"
      )
        v-icon(size='x-large') mdi-chevron-up
      v-btn(
        v-if="showDownBtn"
        test-id="move-down-btn'"
        icon
        color="secondary"
        variant="plain"
        @click="emit('move-post', {from: props.index, type: 'down', postId: props.post.id})"
      )
        v-icon(size='x-large') mdi-chevron-down
</template>
