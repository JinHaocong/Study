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

## 配置全局环境变量

.env

```env
VITE_APP_WEB_TITLE="JHC·Admin"
```

.env.development

```env
# development
VITE_APP_BASE_URL= 'http://127.0.0.1:3007'
```

.env.production

```env
# production
VITE_APP_BASE_URL= 'http://127.0.0.1:3007'
```

## 安装并配置axios

```powershell
yarn add axios
```

src/http/index.ts

```ts
import axios from 'axios'
import { type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'
import { getItem } from '@/utils/storage'

const instance: AxiosInstance = axios.create({
  // 后端url地址
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 6000, // 设置超时
  headers: {
    Authorization: getItem('token')
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    if (!response.data.success) {
      return Promise.reject(response.data)
    }
    return response
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export default instance

```

## 封装axios

src/api/index.ts

```ts
import instance from '@/http/index'

export interface ApiResult<T> {
  status: number
  success: boolean
  message: string
  data: T
  error?: Error
  token?: string
}

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await instance.get<ApiResult<T>>(url, { params })
  return response.data
}

export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await instance.post<ApiResult<T>>(url, data)
  return response.data
}

export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await instance.put<ApiResult<T>>(url, data)
  return response.data
}

export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await instance.delete<ApiResult<T>>(url, { params })
  return response.data
}

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

## 配置pinia数据持久化

安装插件

```powershell
yarn add pinia-plugin-persistedstate
```

将插件添加到 pinia 实例上

stores/index.ts

```ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

```

app挂载

main.ts

```ts
import pinia from './stores/index'
app.use(pinia)
```

# 创建路由

## 登陆页面

### 引入粒子效果

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

### 封装localStorage和sessionStorage

web/src/utils/storage.ts

```ts
interface Items {
  [key: string]: any
}

export const setItem = (key: string, value: any) => {
  const serializedValue = JSON.stringify(value)
  localStorage.setItem(key, serializedValue)
}

export const setItems = (obj: Items) => {
  for (const [key, value] of Object.entries(obj)) {
    setItem(key, value)
  }
}

export const getItem = (key: string) => {
  const storedValue = localStorage.getItem(key)

  if (storedValue !== null) return JSON.parse(storedValue)
  return null
}

export const getItems = (keys: string[]): Items => {
  const result: Items = {}

  keys.forEach((key) => {
    const storedValue = getItem(key)

    result[key] = storedValue ? JSON.parse(storedValue) : null
  })

  return result
}

export const setSessionItem = (key: string, value: any) => {
  const serializedValue = JSON.stringify(value)
  sessionStorage.setItem(key, serializedValue)
}

export const setSessionItems = (obj: Items) => {
  for (const [key, value] of Object.entries(obj)) {
    setSessionItem(key, value)
  }
}

export const getSessionItem = (key: string) => {
  const storedValue = sessionStorage.getItem(key)

  if (storedValue !== null) return JSON.parse(storedValue)
  return null
}

export const getSessionItems = (keys: string[]): Items => {
  const result: Items = {}

  keys.forEach((key) => {
    const storedValue = getSessionItem(key)

    result[key] = storedValue ? JSON.parse(storedValue) : null
  })

  return result
}

```

### 全局button样式

assets/main.css

```scss
html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  --el-color-primary: #3b8d99;
}

.common-layout {
  height: 100%;
  width: 100%;
}

.el-button {
  --el-border-color: #aa4b6b;
  --el-text-color-regular: #aa4b6b;
}

.el-button:hover {
  --el-button-hover-text-color: white;
  --el-button-hover-border-color: rgba(170, 75, 107, 0.8);
  --el-button-hover-bg-color: rgba(170, 75, 107, 0.8);
}

.el-button:focus {
  --el-button-hover-text-color: white;
  --el-button-hover-border-color: rgba(170, 75, 107, 0.8);
  --el-button-hover-bg-color: rgba(170, 75, 107, 0.8);
}

.el-button:active {
  --el-button-active-text-color: white;
  --el-button-active-border-color: rgba(170, 75, 107, 0.8);
  --el-button-active-bg-color: rgba(170, 75, 107, 0.8);
}

.el-button--primary {
  --el-border-color: #3b8d99;
  --el-text-color-regular: #3b8d99;
}

.el-button--primary:hover {
  --el-button-hover-text-color: white;
  --el-button-hover-border-color: rgba(59, 141, 153, 0.7);
  --el-button-hover-bg-color: rgba(59, 141, 153, 0.7);
}

.el-button--primary:focus {
  --el-button-hover-text-color: white;
  --el-button-hover-border-color: rgba(59, 141, 153, 0.7);
  --el-button-hover-bg-color: rgba(59, 141, 153, 0.7);
}

.el-button--primary:active {
  --el-button-active-text-color: white;
  --el-button-active-border-color: rgba(59, 141, 153, 0.7);
  --el-button-active-bg-color: rgba(59, 141, 153, 0.7);
}


```

### 登录页面完成

```vue
<template>
  <vue-particles
    id="tsparticles"
    :options="options"
    :particlesInit="particlesInit"
    class="login__particles"
  />
  <div class="common-layout">
    <el-container style="height: 100%; width: 100%">
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
            <el-tabs v-model="activeName" :stretch="true" class="demo-tabs">
              <el-tab-pane label="登录" name="first">
                <el-form
                  ref="loginFromRef"
                  :model="loginFormData"
                  :rules="loginRules"
                  class="login-form"
                  label-width="80"
                >
                  <el-form-item label="账号" prop="account">
                    <el-input v-model="loginFormData.account" clearable placeholder="请输入账号" />
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="loginFormData.password"
                      clearable
                      placeholder="请输入密码"
                      show-password
                      type="password"
                    />
                  </el-form-item>
                </el-form>
                <!-- 底部外壳 -->
                <div class="footer-wrapped">
                  <div class="forget-password">
                    <span class="forget-password-button" @click="openForget">忘记密码</span>
                  </div>
                  <div class="footer-button">
                    <el-button :loading="buttonLoading" type="primary" @click="Login(loginFromRef)"
                      >登录
                    </el-button>
                  </div>
                  <div class="footer-go-register">
                    还没有账号？<span class="go-register">马上注册</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form
                  ref="registerFromRef"
                  :model="registerFormData"
                  :rules="registerRules"
                  class="login-form"
                  label-width="80"
                >
                  <el-form-item label="账号" prop="account">
                    <el-input
                      v-model="registerFormData.account"
                      clearable
                      placeholder="请输入账号"
                    />
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input
                      v-model="registerFormData.password"
                      clearable
                      placeholder="请输入密码"
                      show-password
                      type="password"
                    />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="nextPassword">
                    <el-input
                      v-model="registerFormData.nextPassword"
                      clearable
                      placeholder="请再次输入密码"
                      show-password
                      type="password"
                    />
                  </el-form-item>
                </el-form>
                <div class="footer-button">
                  <el-button
                    :loading="buttonLoading"
                    type="primary"
                    @click="Register(registerFromRef)"
                    >注册
                  </el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div>© 2024 Jhc. All rights reserved.</div>
      </el-footer>
    </el-container>
  </div>
  <forget ref="forgetRef" class="forget" @setLoginInfo="setInfo"></forget>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import forget from './components/forgetPassword.vue'
import { login, type LoginRegister, register } from '@/api/login'
import { useUserStore } from '@/stores/userStore'
import type { Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'
import { setItems } from '@/utils/storage'

// 自定义验证函数
const validatePassword = (_: any, value: any, callback: any) => {
  if (value !== registerFormData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 存入storage中
const setStorage = (
  id: number,
  token: string | undefined,
  name: string | null,
  department: string | null,
  email: string | null,
  account: string
) => {
  const obj = {
    id,
    token,
    name,
    department,
    email,
    account
  }

  setItems(obj)
}

// tab
const activeName = ref('first')

// button loading
const buttonLoading = ref(false)

// sign 粒子效果
// 粒子效果数据
const options = {
  fpsLimit: 144,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: {
        // 开启鼠标点击的效果
        enable: true,
        mode: 'push'
      },
      onHover: {
        // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: {
      // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: {
        // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: '#BA55D3' // 粒子点的颜色
    },
    links: {
      color: '#FFBBFF', // 线条颜色
      distance: 150, //线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2 // 线条宽度
    },
    collisions: {
      enable: true
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, // 移动速度
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 100 //粒子数
    },
    opacity: {
      //粒子透明度
      value: 0.7
    },
    shape: {
      //粒子样式
      type: 'star'
    },
    size: {
      //粒子大小
      random: true,
      value: 3
    }
  },
  detectRetina: true
}

// 初始化粒子效果
const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine)
}

// sign 登录
const loginFromRef = ref<FormInstance>()
const router = useRouter()
const store = useUserStore()

// 登录表单数据
const loginFormData: LoginRegister = reactive<LoginRegister>({
  account: '',
  password: ''
})

// 登录校验规则
const loginRules = reactive<FormRules<LoginRegister>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录
const Login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const res = await login(loginFormData)
    const {
      data: { id, name, account, email, department },
      token,
      message
    } = res
    ElMessage.success(message)
    setStorage(id, token, name, department, email, account)
    // await loginLog(Number(account), name || '', email || '')
    await store.apiUserInfo(id)
    // 跳转
    await router.push('/home')
  } catch (e: any) {
    console.log(e, 'Login')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}

// sign 注册
const registerFromRef = ref<FormInstance>()

// 注册表单数据
const registerFormData: LoginRegister = reactive({
  account: '',
  password: '',
  nextPassword: ''
})

// 注册校验规则
const registerRules = reactive<FormRules<LoginRegister>>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  nextPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: validatePassword,
      trigger: 'blur'
    }
  ]
})

// 注册
const Register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const res = await register(registerFormData)
    ElMessage.success(res.message)
    activeName.value = 'first'
    setInfo(registerFormData.account, registerFormData.password)
    formEl.resetFields()
  } catch (e: any) {
    console.log(e, 'Register')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}

// 设置账号密码
const setInfo = (account: string, password: string) => {
  loginFormData.account = account
  loginFormData.password = password
}

// sign 忘记密码
// 打开忘记密码弹窗
const forgetRef = ref()
const openForget = () => {
  forgetRef.value.open()
}
</script>

<style lang="scss" scoped>
...
</style>

```

### 忘记密码组件完成

```vue
<template>
  <!-- 忘记密码 -->
  <el-dialog
    v-model="dialogVisible"
    :align-center="true"
    class="myDialog"
    style="min-height: 385px; width: 375px; border-radius: 30px"
    title="忘记密码"
  >
    <el-form
      ref="forgetForm"
      :label-position="labelPosition"
      :model="forgetData"
      :rules="rules"
      class="login-form"
    >
      <el-form-item label="输入您的注册账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的注册账号" />
      </el-form-item>
      <el-form-item label="输入您的个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
      </el-form-item>
      <el-form-item v-if="showPassword" label="输入您的新密码" prop="password">
        <el-input v-model="forgetData.password" placeholder="输入您的新密码" show-password />
      </el-form-item>
      <el-form-item v-if="showPassword" label="再次确认您的新密码" prop="nextPassword">
        <el-input
          v-model="forgetData.nextPassword"
          placeholder="再次确认您的新密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel(forgetForm)">取消</el-button>
        <el-button
          v-if="!showPassword"
          :loading="buttonLoading"
          type="primary"
          @click="verifyAccount(forgetForm)"
        >
          下一步
        </el-button>
        <el-button
          v-if="showPassword"
          :loading="buttonLoading"
          type="primary"
          @click="resetPassword(forgetForm)"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import { reset, verify, type VerifyData } from '@/api/login.js'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getItem, setItem } from '@/utils/storage'

// 自定义事件
const emit = defineEmits(['setLoginInfo'])

// 表单对齐方式
const labelPosition = ref('top')
const buttonLoading = ref(false)

// 自定义验证函数
const validatePassword = (_: any, value: any, callback: any) => {
  if (value !== forgetData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// ref
const forgetForm = ref()
const dialogVisible = ref(false)
const showPassword = ref(false)

// 表单对象
const forgetData: VerifyData = reactive({
  account: null,
  email: '',
  password: '',
  nextPassword: ''
})

// 表单规则
const rules = reactive<FormRules<VerifyData>>({
  account: [{ required: true, message: '请输入您的注册账号', trigger: 'blur' }],
  email: [{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入您想修改的密码', trigger: 'blur' }],
  nextPassword: [
    { required: true, message: '请再次确认您的新密码', trigger: 'blur' },
    {
      validator: validatePassword,
      trigger: 'blur'
    }
  ]
})

// 打开验证邮箱和账号的弹窗
const verifyAccount = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const {
      message,
      data: { id }
    } = await verify(forgetData)
    ElMessage.success(message)
    setItem('id', id)
    showPassword.value = true
  } catch (e: any) {
    console.log(e, 'verifyAccount')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}
// 重置密码
const resetPassword = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    buttonLoading.value = true
    const { message } = await reset(getItem('id'), forgetData.nextPassword)
    ElMessage.success(message)
    emit('setLoginInfo', forgetData.account, forgetData.password)
    cancel(forgetForm.value)
  } catch (e: any) {
    console.log(e, 'resetPassword')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
}

// 点击取消弹窗
const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogVisible.value = false
  showPassword.value = false
}

// 打开弹窗
const open = () => {
  dialogVisible.value = true
}

// 对外暴露
defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>

```

### 全局tab样式

mian.css

```scss
.el-tabs {
  .el-tabs__active-bar {
    background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
    opacity: 0.6;
  }
}
```

## 菜单栏

### 页面完成

menu/index.vue

```js
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="$route.name" class="el-menu-vertical-demo" router>
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="home">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="overview">
            <el-icon>
              <Document />
            </el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="product_manage">产品管理员</el-menu-item>
              <el-menu-item index="users_manage">用户管理员</el-menu-item>
              <el-menu-item index="message_manage">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="user_list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <TakeawayBox />
              </el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="product_manage_list">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="out_product_manage_list">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <ChatSquare />
              </el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="message_list">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycle">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="file">
            <el-icon>
              <Menu />
            </el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="operation_log">
            <el-icon>
              <Menu />
            </el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="login_log">
            <el-icon>
              <Menu />
            </el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="set">
            <el-icon>
              <Tools />
            </el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content"
            >尊敬的
            <span class="name">{{ name }}</span>
            欢迎您登录本系统</span
          >
          <div class="header-right-content">
            <el-badge :is-dot="true" class="badge">
              <el-icon :size="20" class="message">
                <Message />
              </el-icon>
            </el-badge>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar
                  :size="36"
                  :src="userStore.imageUrl || 'src/assets/default.jpg'"
                  class="avatar"
              /></span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--  原为departmentmsg修改为department_msg-->
  <!--  <departmentMsg ref="department_msg"></departmentMsg>-->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  ChatSquare,
  Document,
  House,
  Menu,
  Message,
  TakeawayBox,
  Tools,
  User
} from '@element-plus/icons-vue'

// import departmentMsg from '@/components/department_message.vue'
// import { getReadListAndStatus } from '@/api/dep_msg.js'
import { useRouter } from 'vue-router'
import { getItem } from '@/utils/storage'
import { useUserStore } from '@/stores/userStore'
// import { useMsg } from '@/store/message.js'

// const msgStore = useMsg()
const userStore = useUserStore()
const router = useRouter()
const name = getItem('name')

const goLogin = () => {
  router.push('/login')
  userStore.clearState()
}

// const noread = ref(false)
// const getUserReadList = async () => {
// 	const res = await getReadListAndStatus(localStorage.getItem('id'))
// 	if(JSON.parse(res[0].read_list) > 0){
// 		noread.value = true
// 	}else{
// 		noread.value = false
// 	}
// }
// getUserReadList()
// 部门消息弹框
// const props = defineProps(['foo'])
const department_msg = ref()
const openDepartmentMessage = () => {
  department_msg.value.open()
}
</script>

<style lang="scss" scoped>
...
</style>

```

### 增加全局dropdown样式

assets/main.scss

```scss
.el-dropdown-menu__item:focus {
  --el-dropdown-menuItem-hover-fill: rgba(145, 212, 222, 0.3);
}
```

## svgIcon组件

### 安装依赖

```powershell
pnpm install vite-plugin-svg-icons -D

pnpm install fast-glob
```

### 新建目录src/assets/svg

### 配置 vite.config.ts

```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default () => {
  return {
    plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], // 与本地储存地址一致
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
    ],
  }
}
```

### 在 src/main.ts 中注入脚本

```ts
import 'virtual:svg-icons-register'
```

### 封装公共组件

web/src/components/SvgIcon.vue

```vue
<template>
  <svg :style="{ width: size + 'px', height: size + 'px' }" aria-hidden="true" class="svg-icon">
    <use :fill="color" :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#B75D7DA3'
  },
  size: {
    type: [Number, String],
    default: 14
  }
})
console.log(props)
const symbolId = computed(() => `#icon-${props.iconName}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
}
</style>

```

## 面包屑组件

### 封装组件

web/src/components/BreadCrumb.vue

```vue
<template>
  <div class="bread-crumb">
    <el-breadcrumb :separator="crumbProps.separator" :separator-icon="crumbProps.separatorIcon">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in crumbProps.crumbItemList"
          :key="item.name"
          :replace="item.replace"
          :to="item"
        >
          <SvgIcon
            :color="item.meta.iconColor"
            :icon-name="item.meta.iconName"
            :size="item.meta.iconSize"
            class="bread-crumb-icon"
          />
          <span style="cursor: pointer" @click.prevent="handleLink(item, index)">{{
            item.meta.title
          }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { CrumbItem } from '@/stores/useCrumbStore'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()

interface CrumbProps {
  separator?: string
  separatorIcon?: string
  crumbItemList: CrumbItem[]
}

const crumbProps = defineProps<CrumbProps>()

// 路由跳转
const handleLink = (item: CrumbItem, index: number) => {
  //处于本页就不再跳转
  if (index === crumbProps.crumbItemList.length - 1) return
  router.push({ path: `${item.to.path}` })
}
</script>

<style lang="scss" scoped>
.bread-crumb {
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.bread-crumb-icon {
  margin-right: 4px;
}

:deep(.el-breadcrumb__item) {
  height: 30px;
  font-size: 14px;
  line-height: 30px;
}

:deep(.el-breadcrumb__inner) {
  font-weight: 500;
}

.breadcrumb-enter-active {
  transition: all 0.4s;
}

.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>

```

### 路由添加参数meta.title

web/src/router/index.ts

```ts
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
            iconName: 'home'
          }
        },
        {
          name: 'set',
          path: '/set',
          component: () => import('@/views/set/index.vue'),
          meta: {
            title: '系统设置',
            iconName: 'set',
            iconSize: 14,
            iconColor: '#B75D7DA3'
          }
        }
      ]
    }
  ]
})

export default router

```

### 创建store useCrumbStore

web/src/stores/useCrumbStore.ts

```ts
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export interface CrumbItem {
  name: string
  path: string
  meta: {
    title: string
  }
  replace?: boolean

  [index: string]: any
}

export const useCrumbStore = defineStore(
  'crumbsStore',
  () => {
    // 使用 `reactive` 创建响应式对象
    const state = reactive({
      crumbItemList: [
        {
          name: 'home',
          path: '/',
          meta: {
            title: '首页'
          }
        }
      ] as CrumbItem[]
    })

    const pushCrumb = (crumbItem: CrumbItem) => {
      state.crumbItemList.push(crumbItem)
    }

    const sliceLastCrumb = () => {
      state.crumbItemList.splice(-1)
    }

    const replaceCrumb = (list: CrumbItem[]) => {
      // 使用 `toRefs` 将响应式对象的属性转换为 ref
      const { crumbItemList } = toRefs(state)
      crumbItemList.value = list
    }

    return {
      ...toRefs(state),
      pushCrumb,
      sliceLastCrumb,
      replaceCrumb
    }
  },
  {
    persist: true
  }
)

```

### 再menu中引入并使用面包屑

web/src/views/menu/index.vue

```vue
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
      	...
      </el-aside>
      <el-container>
        <el-header>
          ...
        </el-header>
        <BreadCrumb :crumb-item-list="crumbStore.crumbItemList" />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
```

### 添加路由守卫动态替换路由

web/src/views/menu/index.vue

```vue
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { type CrumbItem, useCrumbStore } from '@/stores/useCrumbStore'
// sign 面包屑
const crumbStore = useCrumbStore()
const router = useRouter()
router.beforeEach((to) => {
  const crumbItemList: CrumbItem[] = to.matched
    .filter((item) => item.name !== 'menu')
    .map((item) => ({
      ...item,
      name: item.name as string,
      path: item.path,
      meta: {
        ...item.meta,
        title: (item.meta?.title as string) || '',
        iconName: (item.meta?.iconName as string) || ''
      }
    }))

  crumbStore.replaceCrumb(crumbItemList)
})
</script>
```

## 首页

### 添加路由

web/src/router/index.ts

```ts
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
            iconName: 'home'
          }
        }
      ]
    }
  ]
})

export default router

```

### 结构搭建

web/src/views/home/index.vue

```vue
<template>
  <div class="common-wrapped">
    <div class="swiper-wrapped">
      <el-carousel :interval="4000" height="100%" indicator-position="outside" type="card">
        <el-carousel-item v-for="(item, index) in 6" :key="index">
          <img alt="轮播图" class="swiper" src="@/assets/loginbg.jpeg" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="layout-wrapped">
      <el-row :gutter="20" style="height: 100%">
        <el-col v-for="(item, index) in 4" :key="index" :span="6">
          <div class="company-message-area">
            <span>{{ item }}</span>
            <div class="company-introduce" v-html="123"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="two-table-wrapped">
      <!-- 公司公告 -->
      <div class="company-notice">
        <span class="title">公司公告</span>
        <el-table :show-header="false" style="width: 100%; height: 100%">
          <el-table-column label="公告主题" prop="message_title"></el-table-column>
          <el-table-column label="等级" prop="message_level"></el-table-column>
          <el-table-column label="发布部门" prop="message_publish_department" />
          <el-table-column label="发布时间" prop="message_publish_time" width="200">
          </el-table-column>
        </el-table>
      </div>
      <!-- 系统消息 -->
      <div class="system-message">
        <span class="title">系统消息</span>
        <el-table :show-header="false" style="width: 100%; height: 100%">
          <el-table-column label="公告主题" prop="message_title" />
          <el-table-column label="发布时间" prop="message_publish_time" width="200">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
...
</style>
```

## 系统设置页面

### 添加路由

web/src/router/index.ts

```ts
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
            iconName: 'home'
          }
        },
        {
          name: 'set',
          path: '/set',
          component: () => import('@/views/set/index.vue'),
          meta: {
            title: '系统设置',
            iconName: 'set',
            iconSize: 14,
            iconColor: '#B75D7DA3'
          }
        }
      ]
    }
  ]
})

export default router

```

### 账号详情

#### 接口添加

web/src/api/userInfo.ts

```ts
export interface UserInfo {
  name: null | string
  account: string
  sex: null | string
  identity: string
  department: null | string
  email: null | string
  image_url: string
}

export interface imageInfo {
  image_url: string
  onlyId: string
}

// 获取用户信息
export const getUserInfo = (id: number) => {
  return post<UserInfo>('/user/getUserInfo', { id })
}

// 修改姓名
export const changeName = (name: string | null, id: number) => {
  return post<[]>('/user/changeName', { name, id })
}

// 修改性别
export const changeSex = (sex: string | null, id: number) => {
  return post<[]>('/user/changeSex', { sex, id })
}

// 修改密码
export const changePassword = (id: number, oldPassword: string, newPassword: string) => {
  return post<[]>('/user/changePassword', { id, oldPassword, newPassword })
}

// 修改邮箱
export const changeEmail = (email: string | null, id: number) => {
  return post<[]>('/user/changeEmail', { email, id })
}

// 绑定图片地址跟账号
export const bind = (account: number, imageInfo: imageInfo) => {
  return post<[]>('/user/bindAccount', {
    account,
    onlyId: imageInfo.onlyId,
    url: imageInfo.image_url
  })
}
```

#### 修改密码弹窗组件

web/src/views/set/components/ChangePassword.vue

```vue
<template>
  <!-- 修改密码 -->
  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    width="400px"
    @close="close(formRef)"
  >
    <el-form
      ref="formRef"
      :label-position="labelPosition"
      :model="passwordData"
      :rules="rules"
      class="login-form"
    >
      <el-form-item label="请输入您的旧密码" prop="oldPassword">
        <el-input v-model="passwordData.oldPassword" placeholder="请输入您的旧密码" show-password />
      </el-form-item>
      <el-form-item label="请输入您的新密码" prop="newPassword">
        <el-input v-model="passwordData.newPassword" placeholder="请输入您的新密码" show-password />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close(formRef)">取消</el-button>
        <el-button :loading="state.confirmLoading" type="primary" @click="confirm(formRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { changePassword } from '@/api/userInfo.js'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { FormProps } from 'element-plus'
import { getItem } from '@/utils/storage'

const formRef = ref<FormInstance>()
const labelPosition = ref<FormProps['labelPosition']>('top')

interface PasswordData {
  oldPassword: string
  newPassword: string
}

// 表单对象
const passwordData = reactive<PasswordData>({
  oldPassword: '',
  newPassword: ''
})
// 表单规则
const rules = reactive<FormRules<PasswordData>>({
  oldPassword: [{ required: true, message: '请输入您的旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入您的新密码', trigger: 'blur' }]
})
// 控制弹窗 默认关闭
const state = reactive({
  changePasswordDialog: false,
  confirmLoading: false
})

// 打开修改密码的弹窗
const open = () => {
  state.changePasswordDialog = true
}
// 修改密码 id 跟 两个 password
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  try {
    await formEl.validate()
    state.confirmLoading = true
    const { message } = await changePassword(
      getItem('id'),
      passwordData.oldPassword,
      passwordData.newPassword
    )
    ElMessage.success(message)
    close(formRef.value)
  } catch (e: any) {
    console.log(e, 'confirm')
    e.message && ElMessage.error(e.message)
  } finally {
    state.confirmLoading = false
  }
}
// 关闭dialog
const close = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  state.changePasswordDialog = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>

```

#### 添加userStore头像联动

web/src/stores/userStore.ts

```ts
import { defineStore } from 'pinia'
import { getUserInfo, type UserInfo } from '@/api/userInfo'
import { reactive, toRefs } from 'vue'

// sign Setup Store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const initialState: UserInfo = {
      name: '',
      account: '',
      sex: '',
      identity: '',
      department: '',
      email: '',
      image_url: ''
    }

    const state = reactive<UserInfo>({ ...initialState })
    const apiUserInfo = async (id: number) => {
      const res = await getUserInfo(id)
      updateState(res.data)
    }

    // 通过action更改state中的数据
    const updateState = (updatedInfo: Partial<UserInfo>): void => {
      Object.assign(state, updatedInfo)
    }

    // 清除数据到初始值
    const clearState = () => {
      Object.assign(state, initialState)
    }

    return {
      ...toRefs(state),
      apiUserInfo,
      updateState,
      clearState
    }
  },
  {
    persist: true
  }
)

// sign Option Store
// export const useUserStore = defineStore({
//   id: 'userStore',
//   state: () => ({
//     name: '',
//     account: '',
//     sex: '',
//     identity: '',
//     department: '',
//     email: '',
//     image_url: ''
//   }),
//   actions: {
//     async userInfo(id: number) {
//       const res = await getUserInfo(id)
//       Object.assign(this, res.data)
//     }
//   },
//   persist: true
// })

```

#### 页面完成

web/src/views/set/index.vue

```vue
<template>
  <!-- 外壳 -->
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-loading="userInfoState.accountLoading"
          label="账号详情"
          name="accountDetails"
        >
          <div class="account-info-wrapped">
            <span>用户头像：</span>
            <div class="account-info-content">
              <!-- action 是上传头像的接口 -->
              <el-upload
                :action="instance.defaults.baseURL + '/user/uploadAvatar'"
                :before-upload="beforeAvatarUpload"
                :headers="{ Authorization: getItem('token') }"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                class="avatar-uploader"
                name="avatar"
              >
                <img
                  v-if="userStore.image_url"
                  :src="userStore.image_url"
                  alt="用户头像"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户账号：</span>
            <div class="account-info-content">
              <el-input v-model="userData.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户密码：</span>
            <div class="account-info-content">
              <el-button type="primary" @click="openChangePassword">修改密码</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户姓名：</span>
            <div class="account-info-content">
              <el-input v-model="userData.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveNameLoading" type="primary" @click="saveName"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户性别：</span>
            <div class="account-info-content">
              <el-select v-model="userData.sex" style="width: 80px">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveSexLoading" type="primary" @click="saveSex"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户身份：</span>
            <div class="account-info-content">
              <el-input v-model="userData.identity" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户部门：</span>
            <div class="account-info-content">
              <el-input v-model="userData.department" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="userData.email"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveEmailLoading" type="primary" @click="saveEmail"
                >保存
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="userStore.identity == '超级管理员'" label="公司信息" name="second">
        </el-tab-pane>
        <el-tab-pane v-if="userStore.identity == '超级管理员'" label="首页管理" name="third">
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <!-- 修改密码弹窗 -->
  <ChangePassword ref="changeP"></ChangePassword>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElInput, type TabsPaneContext, type UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  bind,
  changeName,
  changeSex,
  changeEmail,
  getUserInfo,
  type UserInfo,
  type imageInfo
} from '@/api/userInfo'
import { useUserStore } from '@/stores/userStore'
import { getItem } from '@/utils/storage'
import ChangePassword from '@/views/set/components/ChangePassword.vue'
import instance from '@/http/index'
import type { ApiResult } from '@/api'

// 默认打开的标签页
const activeName = ref('accountDetails')

onMounted(() => {
  requestUserInfo()
})

// tab点击事件 刷新数据
const handleClick = (tab: TabsPaneContext) => {
  switch (tab.paneName) {
    case 'accountDetails':
      requestUserInfo()
      break
    default:
      break
  }
}

// sign 账号详情
const userStore = useUserStore()

interface UserInfoState {
  accountLoading: boolean
  saveNameLoading: boolean
  saveSexLoading: boolean
  saveEmailLoading: boolean

  [key: string]: boolean // 添加索引签名
}

const userInfoState: UserInfoState = reactive({
  accountLoading: false,
  saveNameLoading: false,
  saveSexLoading: false,
  saveEmailLoading: false
})
const changeP = ref()
let userData: UserInfo = reactive({
  name: '',
  account: '',
  sex: '',
  identity: '',
  department: '',
  email: '',
  image_url: ''
})

// 请求获取用户信息
const requestUserInfo = async () => {
  try {
    userInfoState.accountLoading = true
    const res = await getUserInfo(getItem('id'))
    Object.assign(userData, res.data)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'requestUserInfo')
  } finally {
    userInfoState.accountLoading = false
  }
}
// 头像上传成功的函数 response回应
const handleAvatarSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    const { image_url, onlyId } = response.data
    const res = await bind(getItem('account'), { image_url, onlyId })
    userStore.updateState({ image_url })
    ElMessage.success(res.message)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'handleAvatarSuccess')
  }
}
// 头像上传之前的函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('头像必须是jpg、jpeg或png格式！')
    return false
  }

  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('头像必须小于10MB!')
    return false
  }

  return true
}
// 保存用户数据的通用函数
const saveUserData = async (
  saveFunction: 'saveName' | 'saveSex' | 'saveEmail',
  userDataKey: 'name' | 'sex' | 'email',
  apiFunction: (data: string | null, id: number) => Promise<ApiResult<[]>>
) => {
  try {
    userInfoState[saveFunction + 'Loading'] = true
    const { message } = await apiFunction(userData[userDataKey], getItem('id'))
    ElMessage.success(message)
    userStore.updateState({ [userDataKey]: userData[userDataKey] })
  } catch (e: any) {
    if (e.message) ElMessage.error(e.message)
    console.error(e, saveFunction)
  } finally {
    userInfoState[saveFunction + 'Loading'] = false
  }
}

// 保存姓名
const saveName = async () => {
  await saveUserData('saveName', 'name', changeName)
}

// 保存性别
const saveSex = async () => {
  await saveUserData('saveSex', 'sex', changeSex)
}

// 保存邮箱
const saveEmail = async () => {
  await saveUserData('saveEmail', 'email', changeEmail)
}
// 打开密码弹窗
const openChangePassword = () => {
  changeP.value.open()
}
</script>

<style lang="scss" scoped>
...
</style>

```

### 首页设置

#### 接口添加

web/src/api/setting.ts

```ts
export interface Setting {
  id: number
  set_name: string
  set_text?: string | null
  set_value?: string | null
}

// 获取所有轮播图
export const getAllSwiper = () => {
  return post<Setting[]>('/set/getAllSwiper')
}
```

#### 页面完成

```vue
<template>
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-loading="userInfoState.accountLoading"
          label="账号详情"
          name="accountDetails"
        >
          <div class="account-info-wrapped">
            <span>用户头像：</span>
            <div class="account-info-content">
              <!-- action 是上传头像的接口 -->
              <el-upload
                :action="instance.defaults.baseURL + '/user/uploadAvatar'"
                :before-upload="beforeUpload"
                :headers="{ Authorization: getItem('token') }"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                class="avatar-uploader"
                name="avatar"
              >
                <img
                  v-if="userStore.image_url"
                  :src="userStore.image_url"
                  alt="用户头像"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户账号：</span>
            <div class="account-info-content">
              <el-input v-model="userData.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户密码：</span>
            <div class="account-info-content">
              <el-button type="primary" @click="openChangePassword">修改密码</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户姓名：</span>
            <div class="account-info-content">
              <el-input v-model="userData.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveNameLoading" type="primary" @click="saveName"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户性别：</span>
            <div class="account-info-content">
              <el-select v-model="userData.sex" style="width: 80px">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveSexLoading" type="primary" @click="saveSex"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户身份：</span>
            <div class="account-info-content">
              <el-input v-model="userData.identity" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户部门：</span>
            <div class="account-info-content">
              <el-input v-model="userData.department" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="userData.email"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveEmailLoading" type="primary" @click="saveEmail"
                >保存
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="userStore.identity == '超级管理员'" label="公司信息" name="second">
        </el-tab-pane>
        <el-tab-pane
          v-if="userStore.identity == '超级管理员'"
          v-loading="swiperState.swiperLoading"
          label="首页管理"
          name="homeManagement"
        >
          <div class="home-wrapped">
            <!-- 提示 -->
            <div class="tips">
              <span> 提示: 点击图片框进行切换首页轮播图 </span>
            </div>
            <!-- 轮播图 -->
            <div v-for="(item, index) in swiperData" :key="index" class="swiper-wrapped">
              <div v-if="item" class="swiper-name">
                {{ `轮播图(${item.set_name})` }}:&nbsp;&nbsp;
              </div>
              <el-upload
                v-if="item"
                :action="instance.defaults.baseURL + '/set/uploadSwiper'"
                :before-upload="beforeUpload"
                :headers="{ Authorization: getItem('token') }"
                :name="item.set_name"
                :on-success="handleSwiperSuccess"
                :show-file-list="false"
                class="avatar-uploader"
              >
                <template #trigger>
                  <img v-if="item.set_value" :src="item.set_value" alt="" class="swiper" />
                  <img v-else alt="" src="@/assets/雪碧图.png" />
                </template>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改密码弹窗 -->
    <ChangePassword ref="changeP"></ChangePassword>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElInput, type TabsPaneContext, type UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  bind,
  changeName,
  changeSex,
  changeEmail,
  getUserInfo,
  type UserInfo,
  type imageInfo
} from '@/api/userInfo'
import { useUserStore } from '@/stores/userStore'
import { getItem } from '@/utils/storage'
import ChangePassword from '@/views/set/components/ChangePassword.vue'
import instance from '@/http/index'
import type { ApiResult } from '@/api'
import { getAllSwiper, type Setting } from '@/api/setting'

// 默认打开的标签页
const activeName = ref('accountDetails')

onMounted(() => {
  requestUserInfo()
  apiAllSwiper()
})

// tab点击事件 刷新数据
const handleClick = (tab: TabsPaneContext) => {
  switch (tab.paneName) {
    case 'accountDetails':
      requestUserInfo()
      break
    case 'homeManagement':
      apiAllSwiper()
      break
    default:
      break
  }
}

// 上传之前的函数
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('必须是jpg、jpeg或png格式！')
    return false
  }

  if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('必须小于20MB!')
    return false
  }

  return true
}

// sign 账号详情
const userStore = useUserStore()

interface UserInfoState {
  accountLoading: boolean
  saveNameLoading: boolean
  saveSexLoading: boolean
  saveEmailLoading: boolean

  [key: string]: boolean // 添加索引签名
}

const userInfoState: UserInfoState = reactive({
  accountLoading: false,
  saveNameLoading: false,
  saveSexLoading: false,
  saveEmailLoading: false
})
const changeP = ref()
let userData: UserInfo = reactive({
  name: '',
  account: '',
  sex: '',
  identity: '',
  department: '',
  email: '',
  image_url: ''
})

// 请求获取用户信息
const requestUserInfo = async () => {
  try {
    userInfoState.accountLoading = true
    const res = await getUserInfo(getItem('id'))
    Object.assign(userData, res.data)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'requestUserInfo')
  } finally {
    userInfoState.accountLoading = false
  }
}
// 头像上传成功的函数 response回应
const handleAvatarSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    if (!response.success) return ElMessage.error(response.message)
    const { image_url, onlyId } = response.data
    const res = await bind(getItem('account'), { image_url, onlyId })
    userStore.updateState({ image_url })
    ElMessage.success(res.message)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'handleAvatarSuccess')
  }
}

// 保存用户数据的通用函数
const saveUserData = async (
  saveFunction: 'saveName' | 'saveSex' | 'saveEmail',
  userDataKey: 'name' | 'sex' | 'email',
  apiFunction: (data: string | null, id: number) => Promise<ApiResult<[]>>
) => {
  try {
    userInfoState[saveFunction + 'Loading'] = true
    const { message } = await apiFunction(userData[userDataKey], getItem('id'))
    ElMessage.success(message)
    userStore.updateState({ [userDataKey]: userData[userDataKey] })
  } catch (e: any) {
    if (e.message) ElMessage.error(e.message)
    console.error(e, saveFunction)
  } finally {
    userInfoState[saveFunction + 'Loading'] = false
  }
}

// 保存姓名
const saveName = async () => {
  await saveUserData('saveName', 'name', changeName)
}

// 保存性别
const saveSex = async () => {
  await saveUserData('saveSex', 'sex', changeSex)
}

// 保存邮箱
const saveEmail = async () => {
  await saveUserData('saveEmail', 'email', changeEmail)
}

// sign 首页设置
interface SwiperState {
  swiperLoading: boolean
}

const swiperData = ref<Setting[]>([])
const swiperState: SwiperState = reactive({
  swiperLoading: false
})
// swiper上传成功的函数 response回应
const handleSwiperSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    if (!response.success) return ElMessage.error(response.message)
    ElMessage.success(response.message)
    await apiAllSwiper()
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'handleSwiperSuccess')
  }
}
// 获取所有轮播图
const apiAllSwiper = async () => {
  try {
    swiperState.swiperLoading = true
    const { data } = await getAllSwiper()
    swiperData.value = data
  } catch (e) {
    console.log(e, 'apiAllSwiper')
  } finally {
    swiperState.swiperLoading = false
  }
}

// 打开密码弹窗
const openChangePassword = () => {
  changeP.value.open()
}
</script>

<style lang="scss" scoped>
...
</style>

```

#### 首页轮播图联动

```vue
<template>
  <div class="common-wrapped">
    <div v-loading="swiperState.swiperLoading" class="swiper-wrapped">
      <el-carousel :interval="4000" height="100%" indicator-position="outside" type="card">
        <el-carousel-item v-for="(item, index) in swiperData" :key="index">
          <img v-if="item.set_value" :src="item.set_value" alt="" class="swiper" />
        </el-carousel-item>
      </el-carousel>
    </div>
    ...
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { getAllSwiper, type Setting } from '@/api/setting'

onMounted(() => {
  apiAllSwiper()
})

// sign 轮播图
interface SwiperState {
  swiperLoading: boolean
}

const swiperData = ref<Setting[]>([])
const swiperState: SwiperState = reactive({ swiperLoading: false })
const apiAllSwiper = async () => {
  try {
    swiperState.swiperLoading = true
    const { data } = await getAllSwiper()
    swiperData.value = data
  } catch (e) {
    console.log(e, 'apiAllSwiper')
  } finally {
    swiperState.swiperLoading = false
  }
}
</script>
<style lang="scss" scoped>
...
</style>
```

### 公司信息

#### 安装富文本编辑器

```powershell
yarn add @wangeditor/editor @wangeditor/editor-for-vue@next
```

#### 添加全局事件总线

web/src/utils/mitt.ts

```ts
import mitt, { type Emitter } from 'mitt'

type MyEvents = {
  editorTitle: string
}

const bus: Emitter<MyEvents> = mitt<MyEvents>()

export default bus

```

#### 接口添加

web/src/api/setting.ts

```ts
export interface Setting {
  id: number
  set_name: string
  set_text: string | null
  set_value: string | null
}

export interface CompanyInfo {
  companyIntroduction: string | null
  companyStructure: string | null
  companyStrategy: string | null
  companyLeader: string | null
}

// 获取公司名称
export const getCompanyName = () => {
  return post<Setting>('/set/getCompanyName')
}

// 修改公司名称
export const changeCompanyName = (companyName: string | null) => {
  return post<[]>('/set/changeCompanyName', { companyName })
}

// 编辑公司介绍的接口
export const changeCompanyIntroduce = (companyInfo: Partial<CompanyInfo>) => {
  return post<Setting[]>('/set/changeCompanyIntroduce', companyInfo)
}

// 获取公司介绍
export const getCompanyIntroduce = (setName?: string) => {
  return post<Setting[]>('/set/getCompanyIntroduce', { setName })
}
```

#### 创建富文本组件

web/src/views/set/components/Editor.vue

```vue
<template>
  <el-dialog
    v-model="state.dialogFormVisible"
    :title="title"
    destroy-on-close
    width="50%"
    @close="cancel"
  >
    <div style="border: 1px solid #ccc">
      <!-- wangEditor结构 -->
      <Toolbar
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="state.mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        v-model="state.valueHtml"
        :defaultConfig="editorConfig"
        :mode="state.mode"
        style="height: 500px; overflow-y: hidden"
        @onCreated="handleCreated"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button :loading="state.confirmLoading" type="primary" @click="confirm">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, reactive, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import bus from '@/utils/mitt.js'
import { ElMessage } from 'element-plus'
import { changeCompanyIntroduce, getCompanyIntroduce } from '@/api/setting'
import plugins from './plugins'

type CompanySetName =
  | ''
  | 'companyIntroduction'
  | 'companyStructure'
  | 'companyStrategy'
  | 'companyLeader'

interface State {
  dialogFormVisible: boolean
  valueHtml: string | null
  mode: 'default' | 'simple'
  title: string
  currentSetName: CompanySetName
  confirmLoading: boolean
}

// 组件创建时，监听事件
onMounted(() => {
  bus.on('editorTitle', editorTitle)
})

// 组件销毁时，也及时销毁编辑器，并清除事件监听
onBeforeUnmount(() => {
  bus.off('editorTitle')

  const editor = editorRef.value
  if (editor) editor.destroy()
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const title = ref()
const emit = defineEmits(['refresh'])
const state = reactive<State>({
  dialogFormVisible: false,
  valueHtml: '',
  mode: 'default',
  title: '',
  currentSetName: '',
  confirmLoading: false
})

const toolbarConfig = {
  excludeKeys: plugins
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      //上传图片配置
      server: `${import.meta.env.VITE_API_BASEURL}/set/uploadCompanyPicture`, //上传接口地址
      fieldName: 'file', //上传文件名
      methods: 'post',
      metaWithUrl: true, // 参数拼接到 url 上
      // 单个文件上传成功之后
      // onSuccess(file, res) {
      // },
      // 自定义插入图片
      customInsert(res: any, insertFn: any) {
        insertFn(res.url)
      }
    }
  }
}

// 记录 editor 实例，重要！
const handleCreated = (editor: any) => {
  editorRef.value = editor
}

// 获取信息给富文本赋值
const editorTitle = async (id: number) => {
  const titleMappings: Record<number, string> = {
    1: '编辑公司介绍',
    2: '编辑公司架构',
    3: '编辑公司战略',
    4: '编辑公司高层'
  }

  const endpointMappings: Record<number, CompanySetName> = {
    1: 'companyIntroduction',
    2: 'companyStructure',
    3: 'companyStrategy',
    4: 'companyLeader'
  }

  const titleKey = id as keyof typeof titleMappings
  const endpointKey = id as keyof typeof endpointMappings
  state.currentSetName = endpointMappings[endpointKey]

  if (titleMappings[titleKey] && endpointMappings[endpointKey]) {
    title.value = titleMappings[titleKey]
    const { data } = await getCompanyIntroduce(endpointMappings[endpointKey])
    state.valueHtml = data[0].set_text
  }
}

// 点击确认 修改文案
const confirm = async () => {
  try {
    state.confirmLoading = true
    const res = await changeCompanyIntroduce({ [state.currentSetName]: state.valueHtml })
    ElMessage.success(res.message)
    cancel()
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'confirm')
  } finally {
    state.confirmLoading = false
  }
}

// 取消删除
const cancel = () => {
  state.dialogFormVisible = false
  state.valueHtml = ''
  state.currentSetName = ''
  emit('refresh')
}

// 暴露 打开编辑器
const open = () => {
  state.dialogFormVisible = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>

```

#### 页面完成

```vue
<template>
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" style="height: 100%" @tab-click="handleClick">
        <el-tab-pane
          v-loading="userInfoState.accountLoading"
          label="账号详情"
          name="accountDetails"
        >
          <div class="account-info-wrapped">
            <span>用户头像：</span>
            <div class="account-info-content">
              <!-- action 是上传头像的接口 -->
              <el-upload
                :action="instance.defaults.baseURL + '/user/uploadAvatar'"
                :before-upload="beforeUpload"
                :headers="{ Authorization: getItem('token') }"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                class="avatar-uploader"
                name="avatar"
              >
                <img
                  v-if="userStore.image_url"
                  :src="userStore.image_url"
                  alt="用户头像"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户账号：</span>
            <div class="account-info-content">
              <el-input v-model="userData.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户密码：</span>
            <div class="account-info-content">
              <el-button type="primary" @click="openChangePassword">修改密码</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户姓名：</span>
            <div class="account-info-content">
              <el-input v-model="userData.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveNameLoading" type="primary" @click="saveName"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户性别：</span>
            <div class="account-info-content">
              <el-select v-model="userData.sex" style="width: 80px">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveSexLoading" type="primary" @click="saveSex"
                >保存
              </el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户身份：</span>
            <div class="account-info-content">
              <el-input v-model="userData.identity" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户部门：</span>
            <div class="account-info-content">
              <el-input v-model="userData.department" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="userData.email"></el-input>
            </div>
            <div class="account-save-button">
              <el-button :loading="userInfoState.saveEmailLoading" type="primary" @click="saveEmail"
                >保存
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="userStore.identity == '超级管理员'"
          v-loading="companyState.loading"
          label="公司信息"
          name="companyInfo"
        >
          <div class="account-info-wrapped company-name">
            <span>公司名称</span>
            <div class="account-info-content">
              <el-input v-model="companyState.companyName"></el-input>
            </div>
            <div class="account-save-button">
              <el-button
                :loading="companyState.nameLoading"
                type="primary"
                @click="resetCompanyName"
                >编辑公司名称
              </el-button>
            </div>
          </div>
          <div class="company-wrapped">
            <div
              v-for="(item, index) in companyState.companyInfo"
              :key="index"
              class="company-info-item"
            >
              <el-card class="box-card">
                <template #header>
                  <div class="card-header">
                    <span class="item-title">{{ item.set_value }}</span>
                  </div>
                </template>
                <div class="item-html" v-html="item.set_text"></div>
                <template #footer>
                  <el-button style="width: 100%" type="success" @click="openEditor(item.set_name)"
                    >{{ `编辑${item.set_value}` }}
                  </el-button>
                </template>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="userStore.identity == '超级管理员'"
          v-loading="swiperState.swiperLoading"
          label="首页管理"
          name="homeManagement"
        >
          <!-- 提示 -->
          <div class="tips">
            <span> 提示: 点击图片框进行切换首页轮播图 </span>
          </div>
          <div class="home-wrapped">
            <!-- 轮播图 -->
            <div v-for="(item, index) in swiperData" :key="index" class="swiper-wrapped">
              <el-upload
                v-if="item"
                :action="instance.defaults.baseURL + '/set/uploadSwiper'"
                :before-upload="beforeUpload"
                :headers="{ Authorization: getItem('token') }"
                :name="item.set_name"
                :on-success="handleSwiperSuccess"
                :show-file-list="false"
                class="avatar-uploader"
              >
                <template #trigger>
                  <img v-if="item.set_value" :src="item.set_value" alt="" class="swiper" />
                  <img v-else alt="" src="@/assets/雪碧图.png" />
                </template>
              </el-upload>
              <div v-if="item" class="swiper-name">
                {{ `轮播图(${item.set_name})` }}:&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改密码弹窗 -->
    <ChangePassword ref="changeP"></ChangePassword>

    <Editor ref="editorP" @refresh="apiCompanyIntroduce"></Editor>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElInput, type TabsPaneContext, type UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {
  bind,
  changeName,
  changeSex,
  changeEmail,
  getUserInfo,
  type UserInfo,
  type imageInfo
} from '@/api/userInfo'
import { useUserStore } from '@/stores/userStore'
import { getItem } from '@/utils/storage'
import ChangePassword from '@/views/set/components/ChangePassword.vue'
import instance from '@/http/index'
import type { ApiResult } from '@/api'
import {
  changeCompanyName,
  getAllSwiper,
  getCompanyIntroduce,
  getCompanyName,
  type Setting
} from '@/api/setting'
import bus from '@/utils/mitt'
import Editor from '@/views/set/components/Editor.vue'

// 默认打开的标签页
const activeName = ref('accountDetails')

onMounted(async () => {
  await requestUserInfo()
})

// tab点击事件 刷新数据
const handleClick = async (tab: TabsPaneContext) => {
  switch (tab.paneName) {
    case 'accountDetails':
      await requestUserInfo()
      break
    case 'homeManagement':
      await apiAllSwiper()
      break
    case 'companyInfo':
      try {
        companyState.loading = true
        await Promise.all([apiCompanyName(), apiCompanyIntroduce()])
      } finally {
        companyState.loading = false
      }
      break
    default:
      break
  }
}

// 上传之前的函数
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('必须是jpg、jpeg或png格式！')
    return false
  }

  if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('必须小于20MB!')
    return false
  }

  return true
}

// sign 账号详情
const userStore = useUserStore()

interface UserInfoState {
  accountLoading: boolean
  saveNameLoading: boolean
  saveSexLoading: boolean
  saveEmailLoading: boolean

  [key: string]: boolean // 添加索引签名
}

const userInfoState: UserInfoState = reactive({
  accountLoading: false,
  saveNameLoading: false,
  saveSexLoading: false,
  saveEmailLoading: false
})
const changeP = ref()
let userData: UserInfo = reactive({
  name: '',
  account: '',
  sex: '',
  identity: '',
  department: '',
  email: '',
  image_url: ''
})

// 请求获取用户信息
const requestUserInfo = async () => {
  try {
    userInfoState.accountLoading = true
    const res = await getUserInfo(getItem('id'))
    Object.assign(userData, res.data)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'requestUserInfo')
  } finally {
    userInfoState.accountLoading = false
  }
}
// 头像上传成功的函数 response回应
const handleAvatarSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    if (!response.success) return ElMessage.error(response.message)
    const { image_url, onlyId } = response.data
    const res = await bind(getItem('account'), { image_url, onlyId })
    userStore.updateState({ image_url })
    ElMessage.success(res.message)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'handleAvatarSuccess')
  }
}

// 保存用户数据的通用函数
const saveUserData = async (
  saveFunction: 'saveName' | 'saveSex' | 'saveEmail',
  userDataKey: 'name' | 'sex' | 'email',
  apiFunction: (data: string | null, id: number) => Promise<ApiResult<[]>>
) => {
  try {
    userInfoState[saveFunction + 'Loading'] = true
    const { message } = await apiFunction(userData[userDataKey], getItem('id'))
    ElMessage.success(message)
    userStore.updateState({ [userDataKey]: userData[userDataKey] })
  } catch (e: any) {
    if (e.message) ElMessage.error(e.message)
    console.error(e, saveFunction)
  } finally {
    userInfoState[saveFunction + 'Loading'] = false
  }
}

// 保存姓名
const saveName = async () => {
  await saveUserData('saveName', 'name', changeName)
}

// 保存性别
const saveSex = async () => {
  await saveUserData('saveSex', 'sex', changeSex)
}

// 保存邮箱
const saveEmail = async () => {
  await saveUserData('saveEmail', 'email', changeEmail)
}

// 打开密码弹窗
const openChangePassword = () => {
  changeP.value.open()
}

// sign 首页设置
interface SwiperState {
  swiperLoading: boolean
}

const swiperData = ref<Setting[]>([])
const swiperState: SwiperState = reactive({ swiperLoading: false })
// swiper上传成功的函数 response回应
const handleSwiperSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    if (!response.success) return ElMessage.error(response.message)
    ElMessage.success(response.message)
    await apiAllSwiper()
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'handleSwiperSuccess')
  }
}
// 获取所有轮播图
const apiAllSwiper = async () => {
  try {
    swiperState.swiperLoading = true
    const { data } = await getAllSwiper()
    swiperData.value = data
  } catch (e) {
    console.log(e, 'apiAllSwiper')
  } finally {
    swiperState.swiperLoading = false
  }
}

// sign 公司信息
interface CompanyState {
  companyName: string | null
  nameLoading: boolean
  companyInfo: Setting[]
  loading: boolean
}

const companyState = reactive<CompanyState>({
  companyName: null,
  nameLoading: false,
  companyInfo: [],
  loading: false
})
const editorP = ref()

// 获取公司名称
const apiCompanyName = async () => {
  try {
    const {
      data: { set_value }
    } = await getCompanyName()
    companyState.companyName = set_value
  } catch (e) {
    console.log(e, 'apiCompanyName')
  }
}
// 修改公司名称
const resetCompanyName = async () => {
  try {
    companyState.nameLoading = true
    const res = await changeCompanyName(companyState.companyName)
    ElMessage.success(res.message)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'resetCompanyName')
  } finally {
    companyState.nameLoading = false
  }
}
// 打开富文本
const openEditor = (id: string) => {
  bus.emit('editorTitle', id)
  editorP.value.open()
}
// 获取公司信息
const apiCompanyIntroduce = async () => {
  const { data } = await getCompanyIntroduce()
  companyState.companyInfo = data.filter((item) => item.set_name !== 'companyName')
}
</script>

<style lang="scss" scoped>
...
</style>

```

