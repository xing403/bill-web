<script setup lang="ts">
defineProps<{
  list: Array<ListItemType>
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <div class="menu-group" box-border p-2>
    <div class="menu-container">
      <ListItem v-for="item in list" :key="item.key" :item="item" @click="$emit('click', item.key)" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.menu-container {
  @apply m-2 p-2 bg-gray-2 border-rd-2 dark:bg-dark-3;
}
</style>
