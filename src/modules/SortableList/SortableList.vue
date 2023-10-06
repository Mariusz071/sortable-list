<script setup lang="ts">
// imports
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import ListItems from './components/SortableListItems.vue'
import ListActions from './components/SortableListActions.vue'
////

// list layout
const { mdAndDown, lgAndUp } = useDisplay()
const containerClasses = computed(() => {
  return {
    'flex-column': mdAndDown.value
  }
})
////
</script>

<template lang="pug">
div.d-flex(:class="{ 'flex-column': mdAndDown }")
  div.col(:class="{ 'mr-12': lgAndUp, 'mb-6': mdAndDown }")
    ListItems
  div.col(:class="{ 'ml-12': lgAndUp }")
    ListActions
</template>

<style lang="scss" scoped>
.col {
  flex: 1;
}
</style>
