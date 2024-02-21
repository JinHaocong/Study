import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      name: 'menu',
      path: '/menu',
      meta: {
        title: '菜单'
      },
      component: () => import('@/views/menu/index.vue'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          name: 'set',
          path: '/set',
          component: () => import('@/views/set/index.vue'),
          meta: {
            title: '系统设置'
          }
        }
      ]
    }
  ]
})

export default router
