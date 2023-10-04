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
      return '60%'
    case 'lg':
      return '60%'
    case 'xl':
      return '60%'
    case 'xxl':
      return '60%'
    default:
      return '60%'
  }
})
</script>
<template lang="pug">
v-container(
  :style="{ maxWidth: containerWidth }"
)
  slot
</template>

<style scoped>
.v-container {
  border: 2px solid red;
  height: 100%;
}
</style>
