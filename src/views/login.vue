<script setup lang="ts">
import { ElMessage } from 'element-plus'
import QRCode from '~/components/QRCode/index.vue'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const redirect = ref(route.query.redirect?.toString() ?? '/')
const formType = ref<'login' | 'register'>('login')

const loginForm = ref({
  username: '',
  password: '',
})
const loginFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const loginFormRef = ref()
function handleLoginUser() {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      userStore.handleUserLogin(loginForm.value).then(() => {
        ElMessage.success('登录成功')
        router.replace({ path: redirect.value })
      }).catch((error) => {
        ElMessage.error(error)
        userStore.token = ''
      })
    }
  })
}

const registerForm = ref({
  username: '',
  password: '',
})

const registerFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const registerFormRef = ref()

function handleRegisterUser() {
  registerFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      userApi.register(registerForm.value).then(() => {
        ElMessage.success('注册成功')
        formType.value = 'login'
      }).catch((error) => {
        ElMessage.error(error)
        userStore.token = ''
      })
    }
  })
}

const qrcode = ref({
  dialog: false,
  str: '',
  status: 'WAITING',
})
let qrcodeTimer: any = null
function handleCloseQRCode(done: () => void) {
  qrcode.value.str = ''
  clearInterval(qrcodeTimer)
  done()
}
function handleGetLoginQRCode() {
  userApi.getLoginQRCode().then((res) => {
    qrcode.value.dialog = true
    qrcode.value.str = res.data
    qrcode.value.status = 'WAITING'
  }).catch((error) => {
    ElMessage.error(error)
  }).finally(() => {
    qrcodeTimer = setInterval(() => {
      handleGetQRCodeStatus()
    }, 3000)
  })
}

function handleGetQRCodeStatus() {
  userApi.checkQRCodeStatus(qrcode.value.str).then((res) => {
    qrcode.value.status = res.data
  }).catch(() => {
    qrcode.value.status = 'FAILED'
    clearInterval(qrcodeTimer)
  })
}

watchEffect(() => {
  if (qrcode.value.status === 'SUCCESS') {
    clearInterval(qrcodeTimer)
    userApi.getQRCodInformation(qrcode.value.str).then(({ data }: any) => {
      userStore.token = data
      router.replace({ path: redirect.value })
    })
  }
})
</script>

<template>
  <div flex="~ row" justify="center" h-full min-h-300px>
    <div flex-1 />
    <div
      v-if="formType === 'login'" class="login-content" flex="~ col"
      b-l="1px light:hex-DCDFE4 dark:hex-4C4D4E" w-340px items-center justify-center p-1
    >
      <div m-b-5 text-center text-xl>
        欢迎使用账单管理系统
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-position="top" w-240px :inline="false">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password" type="password" placeholder="请输入密码" show-password
            @keydown.enter="handleLoginUser"
          />
        </el-form-item>
        <el-form-item>
          <span>还未有账号? </span>
          <el-button type="primary" link @click="formType = 'register'">
            注册账号
          </el-button>
          <el-button type="primary" link @click="handleGetLoginQRCode">
            扫码登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" w-full @click="handleLoginUser">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div
      v-if="formType === 'register'" class="login-content" flex="~ col"
      b-l="1px light:hex-DCDFE4 dark:hex-4C4D4E" w-340px items-center justify-center p-1
    >
      <div m-b-5 text-center text-xl>
        欢迎注册账单管理系统
      </div>
      <el-form
        ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-position="top" w-240px
        :inline="false"
      >
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <span>已有账号</span>
          <el-button type="primary" link @click="formType = 'login'">
            去登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" w-full @click="handleRegisterUser">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog v-model="qrcode.dialog" title="扫码登录" :width="300" :before-close="handleCloseQRCode">
      <QRCode v-model:qrcode="qrcode.str" v-model:status="qrcode.status" @reload="handleGetLoginQRCode" />
    </el-dialog>
  </div>
</template>
