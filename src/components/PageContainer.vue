<script lang="ts" setup>
// imports
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const containerWidth = computed(() => {
  switch (name.value) {
    case 'xs':
      return '100%'
    case 'sm':
      return '80%'
    case 'md':
      return '70%'
    case 'lg':
      return '70%'
    case 'xl':
      return '70%'
    case 'xxl':
      return '70%'
    default:
      return '70%'
  }
})
</script>
<template lang="pug">
v-container.h-100(
  :style="{ maxWidth: containerWidth }"
)
  slot
</template>
