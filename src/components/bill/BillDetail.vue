<script setup lang="ts">
import { getBill } from '~/api/modules/bill'
import type { BillVOEntity } from '~/types/entity'

const route = useRoute()

const formRef = ref()
const billId = ref(Number(route.query.billId))
const form = ref<BillVOEntity | null>()

const router = useRouter()
const loading = ref(false)
function handleGetBillDetail() {
  if (loading.value)
    return

  loading.value = true
  getBill(billId.value).then(({ data }) => {
    form.value = data
  }).finally(() => {
    loading.value = false
  })
}
function handleHeaderBack() {
  router.back()
}

watch(() => route.query.billId, () => {
  handleGetBillDetail()
}, {
  immediate: true,
})
</script>

<template>
  <el-container>
    <el-header style="--el-header-height: 40px">
      <div h-full flex="~ row" items-center>
        <el-page-header content="账单详情" title="首页" w-full @back="handleHeaderBack" />
      </div>
    </el-header>
    <el-main>
      <el-skeleton :rows="5" :loading="loading" animated>
        <template #template />
        <el-form v-if="form" ref="formRef" :model="form" label-position="top">
          <el-form-item label="账单标题" prop="billTitle">
            <el-input v-model="form.billTitle" disabled />
          </el-form-item>
          <el-form-item label="账单金额" prop="billAmount">
            <el-input-number v-model="form.billAmount" disabled :min="0" :controls="true" />
          </el-form-item>
          <el-form-item label="账单日期" prop="billTime">
            <el-date-picker
              v-model="form.billTime" placeholder="选择日期时间" type="date" value-format="YYYY-MM-DD HH:mm:ss"
              disabled
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
        <el-empty v-else />
      </el-skeleton>
    </el-main>
  </el-container>
</template>
