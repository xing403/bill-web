<script setup lang="ts">
import BillList from './pages/BillList.vue'
import UserPage from './pages/UserPage.vue'
import DeskFooter from '~/layouts/desk/DeskFooter.vue'

const route = useRoute()
const viewId = ref('')
const isFill = computed(() => ['desk-home-my'].includes(viewId.value))
watch(() => route.name, (val: any) => {
  viewId.value = val?.toString() ?? 'desk-home'
}, {
  immediate: true,
})
</script>

<template>
  <BillList v-if="viewId === 'desk-home'" />
  <UserPage v-if="viewId === 'desk-home-my'" />
  <DeskFooter v-model:fill="isFill" />
</template>
