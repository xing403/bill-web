<script setup lang="ts">
import { getBill } from '~/api/modules/bill'
import type { BillVOEntity } from '~/types/entity'

const route = useRoute()

const formRef = ref()
const billId = ref(Number(route.params.billId))
const form = ref<BillVOEntity | null>()
watch(() => route.params.billId, () => {
  getBill(billId.value).then(({ data }) => {
    form.value = data
  })
}, {
  immediate: true,
})
</script>

<template>
  <el-form v-if="form" ref="formRef" :model="form" label-position="top">
    <el-form-item label="账单标题" prop="billTitle">
      <el-input v-model="form.billTitle" />
    </el-form-item>
    <el-form-item label="账单金额" prop="billAmount">
      <el-input-number v-model="form.billAmount" :min="0" :controls="true" />
    </el-form-item>
    <el-form-item label="账单日期" prop="billTime">
      <el-date-picker v-model="form.billTime" placeholder="选择日期时间" type="date" value-format="YYYY-MM-DD HH:mm:ss" />
    </el-form-item>
    <el-form-item label="账单类型" prop="billType">
      <el-radio-group v-model="form.billType">
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
</template>
