// 创建一个路由器，并暴露出去

// 第一步：引入createRouter
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
// 引入一个一个可能要呈现组件
// import Home from './Home'
// import News from './News'
// import About from './About'

function importRoutes(): RouteRecordRaw[] {
  const routes: Array<RouteRecordRaw> = []

  const files = import.meta.glob('./*.ts', { eager: true })

  for (const path in files) {
    if (path !== './index.ts' && !path.endsWith('/index.ts')) {
      const routeModule = files[path] as { default: RouteRecordRaw }
      routes.push(routeModule.default)
    }
  }

  return routes
}

// 第二步：创建路由器
const router: Router = createRouter({
  history: createWebHistory(), //路由器的工作模式（稍后讲解）
  routes: importRoutes()
})

// 暴露出去router
export default router
