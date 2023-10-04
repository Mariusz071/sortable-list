<script setup lang="ts">
import { computed } from 'vue'
import { useAlert } from '@/stores/alert'

// store
const alertsStore = useAlert()
///

// -1 value means alert will be visible until closed manually
const timeout = computed(() => (alertsStore.alertType === 'error' ? '-1' : '5000'))
</script>

<template lang="pug">
v-snackbar(
  :model-value="alertsStore.isVisible"
  location="top"
  v-bind="{ timeout }"
  variant="elevated"
  :color="alertsStore.alertType"
)
  | {{ alertsStore.alertText }}
  template(#actions)
    v-btn.border-radius-4(
      icon="mdi-close-circle-outline"
      @click="alertsStore.close"
    )
</template>
