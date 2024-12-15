<script setup lang="ts">
import { Loading, Plus } from '@element-plus/icons-vue'

import type { BillVOEntity } from '~/types/entity'
import bus from '~/utils/event-bus'

const { width } = useWindowSize()
const page = ref(1)
const size = ref(20)
const router = useRouter()
const route = useRoute()
const list = ref<BillVOEntity[]>([])
const total = ref(0)
const loading = ref(false)
const billDetailRef = ref()
function handleGetBillList(init = false) {
  if (loading.value)
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
function reflashBillList() {
  handleGetBillList(true)
}

function handleClickBillItem(billId: number) {
  if (billDetailRef.value)
    router.replace({ query: { ...route.query, billId } })
  else
    router.push({ name: 'desk-bill-detail', query: { billId } })
}
onMounted(() => {
  handleGetBillList(true)
  bus.on('reflash-bill-list', reflashBillList)
})
onUnmounted(() => {
  bus.off('reflash-bill-list', reflashBillList)
})

const addBillDialog = ref(false)
function handleAddBill(event: MouseEvent) {
  event.stopPropagation()
  addBillDialog.value = true
}
</script>

<template>
  <div flex="~ row" h-full>
    <div
      h-full w-full overflow-auto :class="{
        'max-w-350px': width >= 768,
      }"
    >
      <el-scrollbar p-b-65px>
        <div
          v-infinite-scroll="() => handleGetBillList(false)" :infinite-scroll-disabled="total <= list.length"
          :infinite-scroll-distance="150" class="bill-list" px-10px
        >
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
          <el-divider>
            <div flex="~ row" items-center>
              <el-icon v-if="loading" class="loading">
                <Loading />
              </el-icon>
              <span> {{ loading ? '加载中...' : (total > list.length ? '点击加载更多' : '已经到底了') }}</span>
            </div>
          </el-divider>
        </div>
      </el-scrollbar>
    </div>
    <div v-if="width >= 768" flex-1>
      <BillDetail ref="billDetailRef" :back="false" flex-1 />
    </div>
  </div>
  <div>
    <add-bill v-model="addBillDialog" />
    <el-backtop :right="20" :bottom="100" :visibility-height="0" @click="handleAddBill">
      <el-icon>
        <Plus />
      </el-icon>
    </el-backtop>
  </div>
</template>

<style lang="css" scoped>
.bill-list-item {
  @apply flex flex-row items-center justify-between b-rd-4px;
  @apply h-60px cursor-pointer p-2;
  @apply bg-gray-2 dark:bg-dark hover:bg-gray-4 dark:hover:bg-dark-9;
  @apply transition-all transition-300;

  &.is-active {
    @apply bg-gray-3 dark:bg-dark-3;
  }

}
</style>
