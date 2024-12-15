import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useUserStore from '~/pinia/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.userIsLogin) {
    if (!userStore.information)
      await userStore.getUserInformation()

    if (to.name !== 'login')
      next()
    else
      next({ path: '/' })
  }
  else {
    to.path === '/login' ? next() : next({ name: 'login' })
  }
})

export default router
