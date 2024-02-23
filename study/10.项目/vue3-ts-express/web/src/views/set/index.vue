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
        <el-tab-pane v-if="userStore.identity == '超级管理员'" label="公司信息" name="companyInfo">
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

onMounted(() => {
  requestUserInfo()
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
    case 'companyInfo':
      apiCompanyName()
      apiCompanyIntroduce()
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
}

const companyState = reactive<CompanyState>({
  companyName: null,
  nameLoading: false,
  companyInfo: []
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
// 外壳
.common-wrapped {
  // 内容
  .common-content {
    padding: 0 10px;

    .el-tabs__header {
      height: 40px;
    }

    :deep(.el-tabs__content) {
      height: calc(100% - 70px);
      overflow: auto;
      margin-bottom: 15px;
    }

    .el-tab-pane {
      height: 100%;
    }

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

    .company-wrapped {
      width: 100%;
      height: calc(100% - 56px);
      display: flex;
      flex-wrap: wrap;

      :deep(.el-card) {
        height: 100%;
        display: flex;
        flex-direction: column;

        .el-card__body {
          flex: 1;
          background-color: #f5f5f5;
        }
      }

      .company-info-item {
        display: flex;
        flex-direction: column;
        flex: 1 0 50%; /* 每个子项占据父容器的50%宽度 */
        max-width: 50%;
        box-sizing: border-box;
        padding: 10px;

        .item-title {
          font-weight: bold;
        }
      }
    }

    .company-name {
      padding: 0;
      justify-content: center;
      margin-bottom: 10px;
    }

    // 提示
    .tips {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: center;

      span {
        font-size: 14px;
        color: silver;
      }
    }

    // 首页管理外壳
    .home-wrapped {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      // 轮播图
      .swiper-wrapped {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        // 轮播图名字
        .swiper-name {
          text-align: center;
          font-size: 14px;
        }

        .swiper {
          width: 800px;
          height: 280px;
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
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
