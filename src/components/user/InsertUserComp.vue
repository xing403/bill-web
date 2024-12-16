<script setup lang="ts">
import { ElMessage } from 'element-plus'
import bus from '~/utils/event-bus'

const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits(['update:open'])
const model = toRef(props, 'open')
const formRef = ref()
const form = ref<UserEntity>({
  username: '',
  password: '',
  avatar: '',
  nickname: '',
  isAdmin: '0',
  locked: '0',
})
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入账号密码', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  isAdmin: [{ required: true, message: '请选择用户身份', trigger: 'blur' }],
}
function handleAddUser() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      insertUser(form.value).then(() => {
        ElMessage.success('添加成功')
        handleClose()
      })
    }
  })
}
function handleClose() {
  formRef.value?.resetFields()
  bus.emit('reflash-user-list-admin')
  emit('update:open', false)
}
</script>

<template>
  <el-dialog
    v-model="model" title="新增用户" :before-close="handleClose" :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="账号密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="用户身份" prop="isAdmin">
        <el-radio-group v-model="form.isAdmin">
          <el-radio label="普通用户" value="0" />
          <el-radio label="管理员" value="1" />
        </el-radio-group>
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
