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
  <forget ref="forgetRef" class="forget"></forget>
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
    loginFormData.account = registerFormData.account
    loginFormData.password = registerFormData.password
    formEl.resetFields()
  } catch (e: any) {
    console.log(e, 'Register')
    e.message && ElMessage.error(e.message)
  } finally {
    buttonLoading.value = false
  }
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
