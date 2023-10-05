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
      v-card-text.text-center(v-if="!listStore.postActions.length")
        span.text-body-1.text-gray There's no commited actions yet.
      v-table(v-else)
        transition-group(
          name="actions"
          tag="tbody"
        )
          tr(
            v-for="(item) in listStore.postActions"
            :key="item.id"
          )
            td
              div.d-flex.justify-space-between.align-center
                span {{ `Moved post ${item.postId} from index ${item.from} to index ${item.to}` }}
                v-btn(
                  color="primary"
                  size="small"
                  :disabled="listStore.activeSnapshotId === item.id"
                  @click="listStore.goToListSnapshotAction(item)"
                ) {{ listStore.activeSnapshotId === item.id ? 'Snapshot applied' : 'Time travel' }}
</template>

<style lang="scss" scoped>
.actions-move,
.actions-enter-active,
.actions-leave-active {
  transition: all 0.3s ease;
}

/* 2. declare enter from and leave to state */
.actions-enter-from,
.actions-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.actions-leave-active {
  position: absolute;
}

.actions-enter-to {
  opacity: 0; /* Start with opacity 0 */
  transform: translateY(-30px); /* Slide down from the top */
}
</style>
