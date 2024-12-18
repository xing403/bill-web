<script setup lang="ts">
defineProps<{
  item: ListItemType
}>()
</script>

<template>
  <div class="group-item">
    <div class="group-item-container">
      <div v-if="item.left" class="item-icon">
        <component :is="item.left" />
      </div>
      <div class="item-info" flex-1 px-2>
        <div class="item-title">
          {{ item.title }}
        </div>
        <div v-if="item.desc" class="item-desc">
          {{ item.desc }}
        </div>
      </div>
      <div v-if="item.extend" class="item-extend">
        <component :is="item.extend" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.group-item {
  @apply box-border b-rd-2 px-1;
  @apply dark:hover:bg-stone-9 hover:bg-gray-1;
  @apply transition-all transition-300;
  @apply select-none;
}

.group-item-container {
  @apply flex flex-row items-center justify-between m-1;
  @apply b-b-1px b-b-bluegray-2 h-50px cursor-pointer;

  .item-title {
    @apply text-md font-700;
  }

  .item-desc {
    @apply text-sm text-coolGray;
  }

  .item-extend,
  .item-icon {
    @apply w-10 flex flex-row items-center justify-center;
  }

  &+& {
    @apply b-b-0px;
  }
}
</style>
