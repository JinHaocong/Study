<template>
  <!-- 外壳 -->
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-loading="state.accountLoading" label="账号详情" name="accountDetails">
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
              <el-button :loading="state.saveNameLoading" type="primary" @click="saveName"
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
              <el-button :loading="state.saveSexLoading" type="primary" @click="saveSex"
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
              <el-button :loading="state.saveEmailLoading" type="primary" @click="saveEmail"
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

interface State {
  accountLoading: boolean
  saveNameLoading: boolean
  saveSexLoading: boolean
  saveEmailLoading: boolean

  [key: string]: boolean // 添加索引签名
}

const state: State = reactive({
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
    state.accountLoading = true
    const res = await getUserInfo(getItem('id'))
    Object.assign(userData, res.data)
  } catch (e: any) {
    e.message && ElMessage.error(e.message)
    console.log(e, 'requestUserInfo')
  } finally {
    state.accountLoading = false
  }
}
// 头像上传成功的函数 response回应
const handleAvatarSuccess = async (response: ApiResult<imageInfo>) => {
  try {
    const { image_url, onlyId } = response.data
    const res = await bind(getItem('account'), { image_url, onlyId })
    userStore.$patch({ image_url })
    await userStore.setUserInfo(getItem('id'))
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
    state[saveFunction + 'Loading'] = true
    const { message } = await apiFunction(userData[userDataKey], getItem('id'))
    await userStore.setUserInfo(getItem('id'))
    ElMessage.success(message)
  } catch (e: any) {
    if (e.message) {
      ElMessage.error(e.message)
      console.error(e, saveFunction)
    }
  } finally {
    state[saveFunction + 'Loading'] = false
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
// 外壳
.common-wrapped {
  // 内容
  .common-content {
    padding: 0 10px;

    // 账号信息外壳
    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      font-size: 14px;

      // 账号信息内容
      .account-info-content {
        margin-left: 24px;
        margin-right: 16px;
      }

      // 按钮
      .account-save-button {
        margin-left: 16px;
      }
    }

    // 首页管理外壳
    .home-wrapped {
      padding-left: 50px;
      display: flex;
      flex-direction: column;

      // 提示
      .tips {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        span {
          font-size: 14px;
          color: silver;
        }
      }

      // 轮播图
      .swiper-wrapped {
        display: flex;
        margin-bottom: 16px;

        // 轮播图名字
        .swiper-name {
          font-size: 14px;
          margin-bottom: 24px;
        }

        .swiper {
          width: 336px;
          height: 96px;
        }
      }
    }
  }
}

// 其他设置
.other-set {
  padding-left: 50px;
  font-size: 14px;

  .department-set {
    margin-bottom: 24px;

    span {
      margin-right: 24px;
    }
  }

  .product-set {
    span {
      margin-right: 24px;
    }
  }
}

// 标签页
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

// 上传头像
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

// 输入框的长度
:deep(.el-input) {
  width: 240px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
