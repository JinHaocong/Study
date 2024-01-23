// 创建一个路由器，并暴露出去

// step 第一步：引入createRouter
import { createRouter, createWebHistory } from 'vue-router'

// step 第二步：创建路由器

const options = {
  history: createWebHistory(), //路由器的工作模式（稍后讲解）
  routes: [
    //一个一个的路由规则
    {
      path: '/home',
      component: () => import('@components/Home.vue')
    },
    {
      path: '/news',
      component: () => import('@components/News.vue')
    },
    {
      path: '/about',
      component: () => import('@components/About.vue')
    }
  ]
}

const router = createRouter(options)

// 暴露出去router
export default router
