<script setup lang="ts">
import { VISIBLE_POSTS_NUMBER } from '@/common/consts'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
</script>

<template lang="pug">
div(test-id="list-items-loader")
  v-card.elevation-4.mb-6(
    v-for="n in VISIBLE_POSTS_NUMBER"
    height="100"
  )
    v-card-text.h-100
      v-skeleton-loader.mt-3(type="text")
</template>
