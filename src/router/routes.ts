import layout from '~/Layout/index.vue'


const routes = [{
  path: '/',
  component: layout,
  redirect: 'home',
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('~/pages/home.vue'),
  }, {
    path: 'bill',
    name: 'bill',
    component: () => import('~/pages/bill/index.vue'),
  }, {
    path: 'user',
    name: 'user',
    redirect: 'user/list',
    children: [{
      path: 'list',
      name: 'user-list',
      component: () => import('~/pages/user/list.vue'),
    }, {
      path: 'login',
      name: 'user-login',
      component: () => import('~/pages/user/login.vue'),
    }],
  }],
}, {
  path: '/login',
  name: 'login',
  component: () => import('~/pages/login.vue'),
}, {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('~/pages/[...all].vue')
}]


export default routes
