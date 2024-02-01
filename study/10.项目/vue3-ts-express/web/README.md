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
import { type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios'

const instance: AxiosInstance = axios.create({
  // 后端url地址
  baseURL: 'http://127.0.0.1:3007',
  timeout: 6000, // 设置超时
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
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

### 封装localStorage

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
import { useUserInfo } from '@/stores/userInfo'
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
  department: string | null
) => {
  const obj = {
    id,
    token,
    name,
    department
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
const store = useUserInfo()

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
    setStorage(id, token, name, department)
    // await loginLog(Number(account), name || '', email || '')
    // await store.userInfo(id)
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
.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
  position: fixed;
  pointer-events: none;
}

// 主体部分
.el-main {
  height: 100%;
  background-size: cover;
  background-position: center;
  --el-main-padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  --el-color-primary: #aa4b6b;

  // 登录外壳
  .login-wrapped {
    // 卡片样式
    :deep(.box-card) {
      border: none;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
      border-radius: 30px;
      width: 370px;
      height: 385px;
      float: right;
      position: relative;
      top: 14%;

      .el-card__body {
        height: calc(100% - 40px);
        width: calc(100% - 40px);
        padding: 20px;

        .el-tabs {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;

          .el-tabs__header {
            height: 40px;
            margin-bottom: 40px;
          }

          .el-tabs__content {
            height: calc(100% - 80px);

            .el-tab-pane {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }
        }
      }

      :deep(.login-form) {
        .el-input__wrapper {
          --el-input-focus-border: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
        }
      }

      // 登录底部外壳
      .footer-wrapped {
        display: flex;
        flex-direction: column;

        .forget-password {
          display: flex;
          justify-content: flex-end;
          margin: 10px 0;

          .forget-password-button {
            font-size: 12px;
            color: #3b8d99;
            cursor: pointer;
          }
        }

        .footer-go-register {
          font-size: 12px;
          margin: 12px 0;
          display: flex;
          justify-content: center;

          .go-register {
            font-size: 12px;
            color: #3b8d99;
            cursor: 3b8d99;
          }
        }
      }

      // 底部登录按钮
      .footer-button {
        width: 100%;
        display: flex;
        justify-content: center;

        .el-button {
          background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
          opacity: 0.7;
          border: none;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

// 底部部分
.el-footer {
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  --el-footer-height: 30px;
  --el-footer-padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #999;
}

// tabs标签
:deep(.el-tabs__item) {
  color: #333;
  font-size: 18px;
}

// 输入框高度
:deep(.el-input__inner) {
  height: 40px;
}

// 输入框标签字体高度
:deep(.el-form-item__label) {
  height: 40px;
  line-height: 40px;
}

// 登录按钮
:deep(.el-button) {
  width: 300px;
  height: 45px;
  font-size: 16px;
}

.forget {
  height: 100%;
  width: 100%;
}
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

