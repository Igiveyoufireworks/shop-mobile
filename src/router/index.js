import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

// 路由规则配置
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/index.vue')
  },
  {
    path: '/category-detail/:categoryId',
    name: 'category-detail',
    component: () => import('@/views/category-detail/index.vue'),
    props: true
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/address/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/order-confirm/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/order-detail/index.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/pay/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/product/index.vue'),
    props: true
  },
  {
    path: '/comment/:productId',
    name: 'comment',
    component: () => import('@/views/comment/index.vue'),
    props: true
  },
  {
    path: '/comment-new',
    name: 'comment-new',
    component: () => import('@/views/commentNew/index.vue')
    // props: true
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/search/:kw',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
    props: true
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('@/views/collect/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/index.vue')
  }
]
// 创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
router.beforeEach(to => {
  // 对无需登录的页面进行放行
  if (!to.meta.requireAuth) {
    return true
  }
  // 校验登录状态
  if (!store.state.user.token || !window.localStorage.getItem('USER_TOKEN')) {
    // 跳转登录页面
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
