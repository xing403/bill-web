import useUserStore from '~/pinia/modules/user'
import { ElNotification } from 'element-plus'

/**
 * 强制用户下线
 * @returns
 */

const useUserOffline = () => {
  const userStore = useUserStore()
  ElNotification.warning({
    title: "你已被强制下线",
    message: "请重新登录"
  })
  return userStore.handleUserLogout()
}

export default useUserOffline
