<script setup lang="ts" generic="T extends any, O extends any">
import billApi from '~/api/modules/bill';

const billYearList = ref<any[]>([])
const handleGetBillStatistics = () => {
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
