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
                  :src="userStore.image_url || 'src/assets/default.jpg'"
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
        <BreadCrumb :crumb-item-list="crumbStore.crumbItemList" />
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
import BreadCrumb from '@/components/BreadCrumb.vue'
import { type CrumbItem, useCrumbStore } from '@/stores/useCrumbStore'
// import { useMsg } from '@/store/message.js'

// const msgStore = useMsg()
const userStore = useUserStore()
const name = getItem('name')

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

const goLogin = () => {
  router.push('/login')
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
.el-aside {
  opacity: 0.9;
  background: rgba(197, 70, 111, 0.6);
  height: 100vh;
  width: 220px;
  overflow: hidden;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.3);
  font-weight: bold;

  // 标题
  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #333333;
    background: #2b303b;
  }

  .el-menu {
    opacity: 0.8;
    background: #a4a4be;
    width: 100%;
    height: 100vh;
    border-right: 0;
  }

  :deep(.el-menu--inline) {
    opacity: 0.8;
    background: #a4a4be;
  }

  .title {
    opacity: 0.8;
    background: #a4a4be;
    font-weight: bold;
    font-size: 18px;
  }

  :deep(.el-menu-item) {
    color: #333333;

    &:hover {
      background: rgba(183, 93, 125, 0.64);
    }
  }

  .el-menu-item.is-active {
    color: #3b8d99;
  }

  :deep(.el-sub-menu__title) {
    color: #333333;

    &:hover {
      background: rgba(183, 93, 125, 0.64);
    }
  }

  :deep(.el-menu-item-group__title) {
    color: rgba(81, 81, 81, 0.61);
  }
}

.el-header {
  display: flex;
  height: 55px;
  //background: #a4a4be;
  opacity: 0.8;
  background-image: linear-gradient(to right, #c5466f99, #6b6b83, #aea4be);
  color: #333333;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);

  // 欢迎语
  .header-left-content {
    font-size: 14px;

    .name {
      font-weight: bold;
    }
  }

  .header-right-content {
    width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .badge {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.2);
        color: #3b8d99;
      }
    }

    .badge {
      i {
        font-size: 24px !important;
      }
    }
  }

  .el-dropdown-link {
    cursor: pointer;

    &:focus-visible {
      outline: none;
    }

    .avatar {
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
}

// 徽章
.item {
  cursor: pointer;
}

.el-main {
  --el-main-padding: 10px;
  background-color: #f3f4fa;
}

:deep(.el-menu--inline) {
  background: #aa4b6b;
}
</style>
