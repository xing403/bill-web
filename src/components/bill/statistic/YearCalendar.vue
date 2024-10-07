<script setup lang="ts">
import * as echarts from 'echarts';
const props = defineProps<{
  list: Array<any>,
}>()
const list = toRef(props, 'list')

const handle = () => {
  nextTick(() => {
    var myChart = echarts.init(document.getElementById('statistic-year-calender')!);
    myChart.setOption({
      tooltip: {
        position: 'top'
      },
      visualMap: {
        min: 1,
        right: 50,
        top: 'center',
        pieces: [
          { min: 0, max: 10, color: '#85ce61' },
          { min: 10, max: 20, color: '#ebb563' },
          { min: 20, max: 30, color: '#f78989' },
          { min: 30, color: '#b25252' }
        ]
      },
      calendar: {
        range: '2024'
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: list.value
          .map(item => [item.billTime, item.billIncomeCount + item.billExpendCount])
          .filter(item => item[1] !== 0)
      }
    })
  })
}

watchEffect(() => {
  if (list.value.length > 0) {
    handle()
  }
})

</script>

<template>
  <div>
    <div id="statistic-year-calender" h-240px></div>
  </div>
</template>
