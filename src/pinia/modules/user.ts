import { defineStore } from 'pinia'
import userApi from '~/api/modules/user'

export default defineStore('user', () => {

  const token = ref(useLocalStorage('token', null, { deep: true }))
  const userIsLogin = computed(() => !!token.value)
  const handleUserLogin = ({ username, password }: { username: string, password: string }) => {
    return userApi.login({ username, password }).then(({ data }) => {
      token.value = data
    })
  }

  return {
    token,
    userIsLogin,
    handleUserLogin
  }
})
