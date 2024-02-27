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
            title: '首页',
            iconName: 'home',
            iconSize: 14
          }
        },
        {
          name: 'overview',
          path: '/overview',
          component: () => import('@/views/overview/index.vue'),
          meta: {
            title: '系统概览',
            iconName: 'overview',
            iconSize: 20,
            iconColor: '#B75D7DA3'
          }
        },
        {
          name: 'set',
          path: '/set',
          component: () => import('@/views/set/index.vue'),
          meta: {
            title: '系统设置',
            iconName: 'set',
            iconSize: 16,
            iconColor: '#B75D7DA3'
          }
        }
      ]
    }
  ]
})

export default router
