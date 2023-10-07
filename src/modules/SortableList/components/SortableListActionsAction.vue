<script setup lang="ts">
// imports
import { computed } from 'vue'
////

// props
const props = defineProps({
  action: {
    type: Object,
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
      span(test-id="action-text") {{ `Moved post ${props.action.postId} from index ${props.action.from} to index ${props.action.to}` }}
      v-btn(
        test-id="time-travel-btn"
        color="primary"
        size="small"
        :disabled="props.isActionActive"
        @click="emit('time-travel', props.action)"
      ) Time travel
</template>
