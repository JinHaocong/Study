# 项目搭建

使用 [create-vue](https://github.com/vuejs/create-vue)脚手架创建项目

```powershell
yarn create vue
```

```postgresql
Vue.js - The Progressive JavaScript Framework

√ 请输入项目名称： ... web
√ 是否使用 TypeScript 语法？ ... 否 / 是
√ 是否启用 JSX 支持？ ... 否 / 是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
√ 是否引入 Pinia 用于状态管理？ ... 否 / 是
√ 是否引入 Vitest 用于单元测试？ ... 否 / 是
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
√ 是否引入 Prettier 用于代码格式化？ ... 否 / 是

正在构建项目 E:\Study\study\10.项目\vue3-ts-express\web...

项目构建完成，可执行以下命令：

  cd web
  yarn
  yarn format
  yarn dev
```

切换到项目目录打开终端安装依赖

```powershell
yarn install
```

## 全局安装element-plus

```powershell
yarn add element-plus
```

## 安装图标组件

```powershell
yarn add @element-plus/icons-vue
```

main.ts导入

```ts
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// ElementPlus 图标 国际化
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')

```

## 安装sass

```powershell
yarn add sass --dev
```

## 安装并配置mitt

```powershell
yarn add mitt
```

src/util/mitt.ts

```ts
import mitt from 'mitt'

const bus = mitt()

export default bus

```

## 安装并配置axios

```powershell
yarn add axios
```

src/http/index.ts

```ts
import axios from 'axios'

const instance = axios.create({
  // 后端url地址
  baseURL: 'http://127.0.0.1:3007',
  timeout: 6000, //设置超时
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

```

## 安装ECharts

```powershell
yarn add echarts
```

## 配置vite.config.js

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 启动端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    //允许跨域
    cors: true
  }
})

```

## 配置Element Plus按需导入

安装插件

```powershell
 yarn add unplugin-vue-components unplugin-auto-import --dev
```

配置 vite.config.js

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 启动端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    //允许跨域
    cors: true,
    host: '0.0.0.0'
  }
})

```

在App.vue中重新配置国际化

```vue
<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <el-button type="primary">你好</el-button>
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<style></style>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = zhCn
</script>

```

# 创建路由

## 登陆页面

引入粒子效果

```powershell
yarn add vue3-particles@latest tsparticles-slim@latest
```

main.ts引入

```ts
import Particles from 'vue3-particles'

app.use(Particles)
```

views/login/index.vue中使用

```vue
<template>
  <vue-particles
    id="tsparticles"
    :options="options"
    :particlesInit="particlesInit"
    class="login__particles"
  />
</template>
<script lang="ts" setup>
import type { Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'
 
// 初始化粒子效果
const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine)
}
</script>
<style lang="scss" scoped>
.login__particles {
  height: calc(100% - 30px);
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/loginbg.jpeg');
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}    
</style>
```

