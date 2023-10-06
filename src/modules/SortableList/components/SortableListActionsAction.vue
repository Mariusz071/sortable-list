<script setup lang="ts">
// props
const props = defineProps({
  action: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
  activeSnapshotId: {
    type: String,
    required: true
  }
})
////

// emits
const emit = defineEmits(['time-travel'])
////
</script>

<template lang="pug">
tr
  td
    div.d-flex.justify-space-between.align-center
      span {{ `Moved post ${props.action.postId} from index ${props.action.from} to index ${props.action.to}` }}
      v-btn(
        color="primary"
        size="small"
        v-bind="{ disabled }"
        @click="emit('time-travel')"
      ) {{ props.activeSnapshotId === props.action.id ? 'Snapshot applied' : 'Time travel' }}
</template>
