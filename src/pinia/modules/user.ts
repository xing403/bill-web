import { RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import userApi from '~/api/modules/user'
import useSocketStore from './socket'

import bus from '~/utils/event-bus'
import useSocketEvent from '~/utils/socket-event'

export default defineStore('user', () => {
  const router = useRouter()

  const token = ref<RemovableRef<string>>(useLocalStorage('token', '', { deep: true }))
  const information = ref<any>(null)

  const userIsLogin = computed(() => !!token.value)
  const socketStore = useSocketStore()
  const socketEvent = useSocketEvent()

  const handleUserLogin = ({ username, password }: { username: string, password: string }) => {
    const form = new FormData()
    form.append('username', username)
    form.append('password', password)
    return userApi.login(form).then(({ data }) => {
      token.value = data
    })
  }

  const getUserInformation = () => {
    bus.on('user.event.offline', socketEvent.useUserOffline)
    return userApi.getUserInfo().then(({ data }) => {
      information.value = data
      if (import.meta.env.VITE_APP_WS_PATH) {
        socketStore.connect(import.meta.env.VITE_APP_WS_PATH, token.value, (frames) => {
          socketStore.subscribe('/topic')
          socketStore.subscribe('/topic/message')
          socketStore.subscribe('/user/topic/private')
        });
      }
    })
  }

  const reLogin = () => {
    token.value = null
    information.value = null
    router.replace({
      name: 'login',
      query: {
        redirect: router.currentRoute.value.fullPath
      }
    })
  }

  const handleUserLogout = () => {
    return userApi.logout().then(() => {
      bus.off('user.event.offline')
      reLogin()
    }).catch((err) => { })
  }

  return {
    token,
    userIsLogin,
    information,
    reLogin,
    handleUserLogin,
    handleUserLogout,
    getUserInformation
  }
})
