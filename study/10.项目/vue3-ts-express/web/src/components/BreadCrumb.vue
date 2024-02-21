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
