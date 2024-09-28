import layout from '~/Layout/index.vue'


const routes = [{
  path: '/',
  component: layout,
  redirect: '/home',
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('~/pages/home.vue'),
  }, {
    path: 'bill',
    name: 'bill',
    component: () => import('~/pages/bill/index.vue'),
  }],
}, {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('~/pages/[...all].vue')
}]


export default routes
