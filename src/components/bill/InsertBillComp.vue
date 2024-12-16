<script setup lang="ts">
import { ElMessage } from 'element-plus'
import bus from '~/utils/event-bus'

const emit = defineEmits(['update:modelValue'])

const open = defineModel<boolean>()

const formRef = ref()
const form = ref<BillEntity>({
  billTitle: '',
  billAmount: undefined,
  billType: '',
  billTime: '',
})
const { width } = useWindowSize()
const rules = {
  billTitle: [{ required: true, message: '请输入账单标题', trigger: 'blur' }],
  billAmount: [
    { required: true, message: '请输入账单金额', trigger: 'blur' },
  ],
  billType: [{ required: true, message: '请选择账单类型', trigger: 'blur' }],
  billTime: [{ required: true, message: '请选择账单日期', trigger: 'blur' }],
}
function handleAddBill() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      insertBill(form.value).then(() => {
        ElMessage.success('添加成功')
        bus.emit('reflash-bill-list')
        bus.emit('reflash-bill-list-admin')
        handleClose(true)
      })
    }
  })
}
function handleClose(init = false) {
  formRef.value?.resetFields()
  emit('update:modelValue', false)
}
</script>

<template>
  <el-dialog
    v-model="open" title="新增账单" :before-close="() => handleClose(false)" :close-on-press-escape="false"
    :close-on-click-modal="false" :width="width < 756 ? '95%' : ''"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="账单标题" prop="billTitle">
        <el-input v-model="form.billTitle" />
      </el-form-item>
      <el-form-item label="账单金额" prop="billAmount">
        <el-input-number v-model="form.billAmount" :min="0" :controls="true" />
      </el-form-item>
      <el-form-item label="账单日期" prop="billTime">
        <el-date-picker
          v-model="form.billTime" placeholder="选择日期时间" :editable="false" type="date"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
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
        <el-button @click="() => handleClose(false)">取消</el-button>
        <el-button type="primary" @click="handleAddBill">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
