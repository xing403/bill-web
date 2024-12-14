<script setup lang="ts">
import { getBillList } from '~/api/modules/bill'
import type { BillVOEntity } from '~/types/entity'

const page = ref(1)
const size = ref(20)

const list = ref<BillVOEntity[]>([])

const loading = ref(false)
function handleGetBillList(init = false) {
  if (loading.value)
    return
  loading.value = true
  getBillList({
    pageNum: page.value,
    pageSize: size.value,
  }).then(({ data }) => {
    list.value.push(...data.data)
  })
}

onMounted(() => {
  handleGetBillList(true)
})
</script>

<template>
  <el-scrollbar class="bill-list">
    <el-space direction="vertical" fill w-full>
      <div
        v-for="item in list" :key="item.billId" class="bill-list-item"
        @click="$router.push({ name: 'desk-bill-detail', params: { billId: item.billId } })"
      >
        <div>
          <div class="item-icon" h-50px w-50px />
          <div class="item-content" flex="~ col" flex-1 justify-center gap-1>
            <el-text class="item-content-title" w-full>
              {{ item.billTitle }}
            </el-text>
            <el-text class="item-content-amount" w-full>
              {{ item.billAmount }}
            </el-text>
          </div>
        </div>
      </div>
    </el-space>
  </el-scrollbar>
</template>

<style lang="css" scoped>
.bill-list-item>div {
  --at-apply: flex flex-row items-center justify-between b-rd-4px;
  --at-apply: h-60px cursor-pointer p-2;
  --at-apply: bg-gray-2 'hover:bg-gray-4';
  --at-apply: transition-all transition-300;
}
</style>
