import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import emitter from '@/utils/emitter'

// 创建应用
const app = createApp(App)
// 创建pinia
const pinia = createPinia()

app.config.globalProperties.$emitter = emitter

declare module 'vue' {
  export interface ComponentCustomProperties {
    $emitter: typeof emitter
  }
}

// 安装插件
app.use(pinia)
// 安装路由器
app.use(router)
// 挂载应用
app.mount('#app')
