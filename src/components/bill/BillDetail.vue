<script setup lang="ts">
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import bus from '~/utils/event-bus'

const props = withDefaults(defineProps<{
  back?: boolean
}>(), {
  back: true,
})

const route = useRoute()

const formRef = ref()
const billId = ref(Number(route.query.billId))
const form = ref<BillVOEntity | null>()

const router = useRouter()
const loading = ref(false)
const openEdit = ref(false)

function handleGetBillDetail() {
  if (loading.value)
    return

  loading.value = true
  getBill(billId.value).then(({ data }) => {
    form.value = data
  }).catch(() => {
    form.value = null
  }).finally(() => {
    loading.value = false
  })
}
function handleHeaderBack() {
  router.back()
}
function handleEditBill() {
  openEdit.value = true
}
function handleDeleteBill() {
  ElMessageBox.confirm('是否继续删除这个账单?', '警告', {
    type: 'warning',
  }).then(() => {
    deleteBill(billId.value).then(() => {
      ElMessage({ message: '删除成功', type: 'success', plain: true })
      bus.emit('reflash-bill-list')
      if (props.back)
        handleHeaderBack()
      else
        router.replace({ query: {} })
    })
  }).catch(() => { })
}
watch(() => route.query.billId, () => {
  billId.value = Number(route.query.billId)
  handleGetBillDetail()
}, {
  immediate: true,
})
</script>

<template>
  <el-container>
    <el-header style="--el-header-height: 40px" flex="~ row" items-center px-1>
      <el-page-header content="账单详情" title="首页" flex-1 @back="handleHeaderBack">
        <template #extra>
          <div class="flex items-center">
            <el-button type="warning" link :icon="Edit" @click="handleEditBill" />

            <el-button type="danger" link :icon="Delete" @click="handleDeleteBill" />
          </div>
        </template>
      </el-page-header>
    </el-header>
    <el-main>
      <el-skeleton :rows="5" :loading="loading" animated>
        <template #template />
        <template v-if="form">
          <el-form ref="formRef" :model="form" label-position="top">
            <el-form-item label="账单标题" prop="billTitle">
              <el-input v-model="form.billTitle" disabled />
            </el-form-item>
            <el-form-item label="账单金额" prop="billAmount">
              <el-input-number v-model="form.billAmount" disabled :min="0" :controls="true" />
            </el-form-item>
            <el-form-item label="账单日期" prop="billTime">
              <el-date-picker
                v-model="form.billTime" placeholder="选择日期时间" type="date"
                value-format="YYYY-MM-DD HH:mm:ss" disabled
              />
            </el-form-item>
            <el-form-item label="账单类型" prop="billType">
              <el-radio-group v-model="form.billType" disabled>
                <el-radio value="income">
                  收入
                </el-radio>
                <el-radio value="spend">
                  支出
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <update-bill-comp v-model:open="openEdit" v-model="billId" />
        </template>
        <el-empty v-else />
      </el-skeleton>
    </el-main>
  </el-container>
</template>
