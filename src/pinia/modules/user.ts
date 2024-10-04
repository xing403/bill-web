import { defineStore } from 'pinia'
import userApi from '~/api/modules/user'

export default defineStore('user', () => {
  const router = useRouter()

  const token = ref(useLocalStorage('token', null, { deep: true }))
  const userIsLogin = computed(() => !!token.value)
  const handleUserLogin = ({ username, password }: { username: string, password: string }) => {
    return userApi.login({ username, password }).then(({ data }) => {
      token.value = data
    })
  }
  const reLogin = () => {
    token.value = null
    router.replace({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }
  const handleUserLogout = () => {
    return userApi.logout().then(() => {
      reLogin()
    }).catch((err) => {
      if (err.code === 400) {

      }
    })
  }

  return {
    token,
    userIsLogin,
    reLogin,
    handleUserLogin,
    handleUserLogout
  }
})
