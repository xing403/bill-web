<script setup lang="ts">
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: number
  open: boolean
  onClose: () => void
}>()
const emit = defineEmits(['update:open'])
const model = toRef(props, 'open')
const formRef = ref()
const form = ref({
  nickname: '',
  username: '',
})

const rules = {
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
}

function handleUpdateUser() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      updateUser(form.value).then(() => {
        ElMessage.success('更新成功')
        handleClose()
      })
    }
  })
}
function handleClose() {
  formRef.value?.resetFields()
  props.onClose()
  emit('update:open', false)
}
watchEffect(() => {
  if (props.open) {
    getUserInfoByUserId(props.modelValue).then(({ data }) => {
      form.value = data
    })
  }
})
</script>

<template>
  <el-dialog
    v-model="model" title="编辑用户" :before-close="handleClose" :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleUpdateUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
