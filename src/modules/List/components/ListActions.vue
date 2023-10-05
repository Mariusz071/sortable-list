<script setup lang="ts">
// imports
import { useList } from '@/stores/list'
////

// list store
const listStore = useList()
////
</script>
<template lang="pug">
v-card.elevation-4
  v-card-title
    h2.mb-4.text-h5.text-grey.font-weight-bold List of actions commited
  v-card-text
    v-card.elevation-3
      v-table
        transition-group(
          name="actions"
          tag="tbody"
        )
          tr(
            v-for="item in listStore.postActions"
            :key="item.postId"
          )
            td
              div.d-flex.justify-space-between.align-center
                span {{ `Moved post ${item.postId} from index ${item.from} to index ${item.to}` }}
                v-btn(
                  color="primary"
                  size="small"
                  @click="listStore.goToListSnapshotAction(item.snapshot)"
                ) Time travel
</template>

<style lang="scss" scoped>
.actions-enter-active,
.actions-leave-active {
  transition: all 0.5s ease;
}
.actions-enter-from,
.actions-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
