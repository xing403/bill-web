<script setup lang="ts">
import DeskFooter from '~/layouts/desk/DeskFooter.vue'

const route = useRoute()
const viewId = ref('')
const isFill = computed(() => ['my'].includes(viewId.value))
watch(() => route.query.tab, (val: any) => {
  viewId.value = val?.toString() ?? 'bill'
}, {
  immediate: true,
})
</script>

<template>
  <bill-list v-if="viewId === 'bill'" />
  <el-empty v-if="viewId === 'my'" description="开发中..." />

  <DeskFooter v-model:fill="isFill" />
</template>
