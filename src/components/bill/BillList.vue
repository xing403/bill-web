<script setup lang="ts">
import { Loading, Plus } from '@element-plus/icons-vue'
import { getBillList } from '~/api/modules/bill'
import type { BillVOEntity } from '~/types/entity'

const page = ref(1)
const size = ref(20)

const list = ref<BillVOEntity[]>([])
const total = ref(0)
const loading = ref(false)
function handleGetBillList(init = false) {
  if (loading.value || (total.value === list.value.length && !init))
    return
  if (init) {
    list.value = []
    page.value = 0
  }

  page.value += 1
  loading.value = true
  getBillList({
    pageNum: page.value,
    pageSize: size.value,
  }).then(({ data }) => {
    list.value.push(...data.data)
    total.value = data.total
  }).finally(() => {
    loading.value = false
  })
}
function reflashBillList(status: boolean) {
  if (status)
    handleGetBillList(status)
}
onMounted(() => {
  handleGetBillList(true)
})
const addBillDialog = ref(false)
function handleAddBill(event: MouseEvent) {
  event.stopPropagation()
  addBillDialog.value = true
}
</script>

<template>
  <el-scrollbar class="bill-list">
    <el-space direction="vertical" fill w-full>
      <div
        v-for="item in list" :key="item.billId" class="bill-list-item"
        @click="$router.push({ name: 'desk-bill-detail', params: { billId: item.billId } })"
      >
        <div class="bill-item-content">
          <div class="item-icon" h-50px w-50px />
          <div class="item-info" flex="~ col" flex-1 justify-center gap-1>
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

    <el-divider cursor-pointer @click="() => handleGetBillList(false)">
      <div flex="~ row" items-center>
        <el-icon v-if="loading" class="loading">
          <Loading />
        </el-icon>
        <span> {{ loading ? '加载中...' : (total > list.length ? '点击加载更多' : '已经到底了') }}</span>
      </div>
    </el-divider>
  </el-scrollbar>
  <div>
    <add-bill v-model="addBillDialog" @close="reflashBillList" />
    <el-backtop :right="20" :bottom="100" :visibility-height="0" @click="handleAddBill">
      <el-icon>
        <Plus />
      </el-icon>
    </el-backtop>
  </div>
</template>

<style lang="css" scoped>
.bill-list-item>div {
  --at-apply: flex flex-row items-center justify-between b-rd-4px;
  --at-apply: h-60px cursor-pointer p-2;
  --at-apply: bg-gray-2 'hover:bg-gray-4';
  --at-apply: transition-all transition-300;
}
</style>
