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
                <el-form class="login-form" label-width="70">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" placeholder="请输入密码" show-password />
                  </el-form-item>
                </el-form>
                <!-- 底部外壳 -->
                <div class="footer-wrapped">
                  <div class="forget-password">
                    <span class="forget-password-button" @click="openForget">忘记密码</span>
                  </div>
                  <div class="footer-button">
                    <el-button type="primary" @click="Login">登录</el-button>
                  </div>
                  <div class="footer-go-register">
                    还没有账号？<span class="go-register">马上注册</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form class="login-form" label-width="70">
                  <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="账号长度6-12位" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="registerData.password"
                      placeholder="密码需长度6-12位含字母数字"
                    />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="registerData.nextPassword" placeholder="请再次输入密码" />
                  </el-form-item>
                </el-form>
                <div class="footer-button">
                  <el-button type="primary" @click="Register">注册</el-button>
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
  <forget ref="forgetP"></forget>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import forget from './components/forget_password.vue'
import { login, register } from '@/api/login'
import { loginLog } from '@/api/log'
import { useUserInfo } from '@/stores/userInfo'
import type { Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'

// sign 接口

// 表单接口
interface FormData {
  account: number | null
  password: string
  nextPassword?: string
}

// sign ref
const forgetP = ref()

// sign 数据
const activeName = ref('first')
const router = useRouter()
const store = useUserInfo()

// 粒子效果数据
const options = {
  fpsLimit: 60,
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
      value: 80 //粒子数
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
// 登录表单数据
const loginData: FormData = reactive({
  account: null,
  password: ''
})
// 注册表单数据
const registerData: FormData = reactive({
  account: null,
  password: '',
  nextPassword: ''
})

// sign 方法

// 初始化粒子效果
const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine)
}

// 登录
const Login = async () => {
  const res = await login(loginData)
  // console.log(res)
  const { id, name, account, email, department } = res.results
  const { token } = res
  if (res.message == '登录成功') {
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('name', name)
    localStorage.setItem('department', department)
    await loginLog(account, name, email)
    await store.userInfo(id)
    // 跳转
    await router.push('/home')
  } else {
    ElMessage.error('登录失败')
  }
}

// 注册
const Register = async () => {
  if (registerData.password == registerData.nextPassword) {
    const res = await register(registerData)
    if (res.message == '注册账号成功') {
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
      activeName.value = 'first'
    } else {
      ElMessage.error('注册失败，请检查数据是否正确')
    }
  } else {
    ElMessage.error('注册失败')
  }
}

// 打开忘记密码弹窗
const openForget = () => {
  forgetP.value.open()
}
</script>

<style lang="scss" scoped>
.login__particles {
  height: calc(100% - 30px);
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
  position: fixed;
  pointer-events: none;
}

// 主体部分
.el-main {
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

          .el-tabs__active-bar {
            background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
            opacity: 0.5;
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
        }
      }
    }
  }
}

// 底部部分
.el-footer {
  --el-footer-height: 30px;
  --el-footer-padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
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
</style>
