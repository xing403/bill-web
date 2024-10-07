<script setup lang="ts">
import * as echarts from 'echarts';
const props = defineProps<{
  list: Array<any>,
}>()
const list = toRef(props, 'list')

const colors = ['#EE6666', '#91CC75', '#5470C6']
const handle = () => {
  nextTick(() => {
    var myChart = echarts.init(document.getElementById('statistic-year-line')!);
    myChart.setOption({
      color: colors,
      grid: { top: '80px', left: '20px', right: '20px', bottom: '20px', containLabel: true },
      dataset: { source: list.value },
      dataZoom: [{ type: 'inside' }, { type: 'slider' }],
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { data: ['收入', '支出'], left: 'center', top: 0 },
      toolbox: { show: true, feature: { magicType: { show: true, type: ['line', 'bar'] } } },
      xAxis: { type: 'category', axisTick: { alignWithLabel: true }, source: 'month' },
      yAxis: [
        {
          type: 'value',
          name: '收入(元)',
          position: 'left',
          axisLine: { show: true, lineStyle: { color: colors[0] } },
        },
        {
          type: 'value',
          name: '支出(元)',
          position: 'right',

          axisLine: { show: true, lineStyle: { color: colors[1] } },
        },
      ],
      series: [
        { name: '收入', type: 'line', smooth: true, yAxisIndex: 0, encode: { x: 'billTime', y: 'billIncome' } },
        { name: '支出', type: 'line', smooth: true, yAxisIndex: 1, encode: { x: 'billTime', y: 'billExpend' } },
      ],
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
    <div id="statistic-year-line" h-350px></div>
  </div>
</template>
