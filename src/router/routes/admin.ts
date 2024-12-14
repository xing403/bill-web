import layout from '~/layouts/admin/index.vue'

const routes = [{
  path: '/admin',
  component: layout,
  children: [{
    path: '',
    name: 'home',
    component: () => import('~/views/admin/home.vue'),
  }, {
    path: 'bill',
    name: 'bill',
    component: () => import('~/views/admin/bill/index.vue'),
  }, {
    path: 'user',
    name: 'user',
    redirect: 'user/list',
    children: [{
      path: 'list',
      name: 'user-list',
      component: () => import('~/views/admin/user/list.vue'),
    }, {
      path: 'login',
      name: 'user-login',
      component: () => import('~/views/admin/user/login.vue'),
    }],
  }],
}]

export default routes
