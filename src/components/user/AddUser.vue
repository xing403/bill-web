<script setup lang="ts">
import { ElMessage } from 'element-plus'
import userApi from '~/api/modules/user'
const props = defineProps<{
  open: boolean,
  onClose: () => void
}>()
const emit = defineEmits(['update:open'])
const model = toRef(props, 'open')
const formRef = ref()
const form = ref({
  username: '',
  password: '',
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入账号密码', trigger: 'blur' },
  ],
}
const handleAddUser = () => {
  formRef.value.validate(valid => {
    if (valid) {
      userApi.addUser(form.value).then(() => {
        ElMessage.success('添加成功')
        handleClose()
      })
    }
  })
}
const handleClose = () => {
  formRef.value?.resetFields()
  props.onClose()
  emit('update:open', false)
}
</script>

<template>
  <el-dialog title="新增账单" v-model="model" :before-close="handleClose" :close-on-press-escape="false"
    :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="账号密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleAddUser">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
