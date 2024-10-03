import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import pkj from '../../package.json'
import useUserStore from '~/pinia/modules/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  useTitle(pkj.name ?? '未命名')
  if (userStore.userIsLogin) {
    if (to.name !== 'login') {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
