<script setup lang="ts">
import { Loading, Plus } from '@element-plus/icons-vue'
import { getBillList } from '~/api/modules/bill'
import type { BillVOEntity } from '~/types/entity'

const { width } = useWindowSize()
const page = ref(1)
const size = ref(20)
const router = useRouter()
const list = ref<BillVOEntity[]>([])
const total = ref(0)
const loading = ref(false)
const billDetailRef = ref()
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

function handleClickBillItem(billId: number) {
  if (billDetailRef.value)
    router.replace({ query: { billId } })
  else
    router.push({ name: 'desk-bill-detail', query: { billId } })
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
  <el-row>
    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6">
      <el-scrollbar class="bill-list">
        <el-space direction="vertical" fill w-full>
          <div
            v-for="item in list" :key="item.billId" class="bill-list-item"
            :class="{ 'is-active': Number($route.query.billId) === item.billId! }"
            @click="handleClickBillItem(item.billId!)"
          >
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
    </el-col>
    <el-col v-if="width >= 768" :span="16" :xl="18">
      <BillDetail ref="billDetailRef" />
    </el-col>
  </el-row>
</template>

<style lang="css" scoped>
.bill-list-item {
  @apply flex flex-row items-center justify-between b-rd-4px;
  @apply h-60px cursor-pointer p-2;
  @apply bg-gray-2 hover:bg-gray-4;
  @apply transition-all transition-300;

  &.is-active {
    @apply bg-gray-3;
  }

}
</style>
