import DeskLayout from '~/layouts/desk/index.vue'

const routes = [{
  path: '/',
  component: DeskLayout,
  children: [{
    path: '',
    name: 'desk-home',
    component: () => import('~/views/index.vue'),
  }, {
    path: 'detail/:billId',
    name: 'desk-bill-detail',
    component: () => import('~/views/bill/detail.vue'),
  }],
}, {
  path: '/login',
  name: 'login',
  component: () => import('~/views/login.vue'),
}, {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('~/views/[...all].vue'),
}]

export default routes
