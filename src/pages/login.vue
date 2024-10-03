<script setup lang="ts">
import { ElMessage } from 'element-plus';
import useUserStore from '~/pinia/modules/user'

const form = ref({
  username: '',
  password: ''
})
const route = useRoute()
const router = useRouter()

const redirect = ref(route.params.redirect?.toString() ?? '/')
const userStore = useUserStore()
const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const formRef = ref()
const handleLoginUser = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      userStore.handleUserLogin(form.value).then(() => {
        ElMessage.success('登录成功')
        router.replace({ path: redirect.value })
      }).catch((error) => {
        ElMessage.error(error)
        userStore.token = null
      })
    }
  })
}

</script>

<template>
  <div flex="~ row" justify="center" h-full min-h-300px>
    <div flex-1></div>
    <div class="login-content" w-340px p-1 flex="~ col" b-l="1px light:hex-DCDFE4 dark:hex-4C4D4E" justify-center items-center>
      <div m-b-5 text-xl text-center>欢迎使用账单管理系统</div>
      <el-form :model="form" ref="formRef" :rules="formRules" label-position="top" w-240px :inline="false">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="handleLoginUser" w-full>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
