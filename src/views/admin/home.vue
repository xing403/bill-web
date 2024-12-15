<script setup lang="ts" generic="T extends any, O extends any">
const billYearList = ref<any[]>([])
function handleGetBillStatistics() {
  billApi.getBillStatistic().then(({ data }) => {
    billYearList.value = data
  })
}

onMounted(() => {
  handleGetBillStatistics()
})
</script>

<template>
  <div>
    <LineYear v-model:list="billYearList" />
    <YearCalendar v-model:list="billYearList" />
  </div>
</template>
