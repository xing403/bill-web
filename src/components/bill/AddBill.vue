<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { insertBill } from '~/api/modules/bill'
import type { BillEntity } from '~/types/entity'

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()
const emit = defineEmits(['update:open'])
const model = toRef(props, 'open')
const formRef = ref()
const form = ref<BillEntity>({
  billTitle: '',
  billAmount: undefined,
  billType: '',
  billTime: '',
})
const rules = {
  billTitle: [{ required: true, message: '请输入账单标题', trigger: 'blur' }],
  billAmount: [
    { required: true, message: '请输入账单金额', trigger: 'blur' },
    { min: 0, message: '请输入大于0的数字' },
  ],
  billType: [{ required: true, message: '请选择账单类型', trigger: 'blur' }],
  billTime: [{ required: true, message: '请选择账单日期', trigger: 'blur' }],
}
function handleAddBill() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      insertBill(form.value).then(() => {
        ElMessage.success('添加成功')
        handleClose()
      })
    }
  })
}
function handleClose() {
  formRef.value?.resetFields()
  props?.onClose()
  emit('update:open', false)
}
</script>

<template>
  <el-dialog
    v-model="model" title="新增账单" :before-close="handleClose" :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
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

    <template #footer>
      <span>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleAddBill">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
