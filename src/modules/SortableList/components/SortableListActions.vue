<script setup lang="ts">
// imports
import { useSortableList } from '@/stores/sortableList'
import SortableListActionsAction from './SortableListActionsAction.vue'
////

// list store
const listStore = useSortableList()
////
</script>
<template lang="pug">
v-card.elevation-4
  v-card-title
    h2.mb-4.text-h5.text-grey.font-weight-bold List of actions commited
  v-card-text.actions-body
    v-card.elevation-3
      v-card-text.text-center(
        v-if="!listStore.postActions.length"
        test-id="no-actions-placeholder"
      )
        span.text-body-1.text-gray There's no commited actions.
      v-table(v-else)
        transition-group(
          name="actions"
          tag="tbody"
        )
          SortableListActionsAction(
            v-for="(action) in listStore.postActions"
            :key="action.id"
            v-bind="{ action }"
            :is-action-active="listStore.activeSnapshotId === action.id"
            @time-travel="listStore.goToListSnapshotAction"
          )
</template>

<style lang="scss" scoped>
.actions-move,
.actions-enter-active,
.actions-leave-active {
  transition: all 0.3s ease;
}

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

.actions-body {
  background: var(--v-theme-secondary);
}
</style>
