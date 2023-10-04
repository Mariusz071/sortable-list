<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import PageContainer from '@/components/PageContainer.vue'
import List from '@/modules/List'
</script>

<template lang="pug">
v-app
  v-layout
    v-main
      Alert
      PageContainer
        List
</template>

<style scoped>
.v-main {
  background: var(--v-theme-surface);
  background: linear-gradient(
    355deg,
    rgba(var(--v-theme-surface), 1) 89%,
    rgba(var(--v-theme-secondary), 1) 90%
  );
}
</style>
