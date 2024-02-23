<template>
  <div class="common-wrapped">
    <div v-loading="swiperState.loading" class="swiper-wrapped">
      <el-carousel :interval="4000" height="100%" indicator-position="outside" type="card">
        <el-carousel-item v-for="(item, index) in swiperState.swiperData" :key="index">
          <img v-if="item.set_value" :src="item.set_value" alt="" class="swiper" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-loading="companyState.loading" class="layout-wrapped">
      <el-row :gutter="20" style="height: 100%">
        <el-col v-for="(item, index) in companyState.companyInfo" :key="index" :span="6">
          <div class="company-message-area">
            <span>{{ item.set_value }}</span>
            <div class="company-introduce" v-html="item.set_text"></div>
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

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { getAllSwiper, getCompanyIntroduce, type Setting } from '@/api/setting'

onMounted(() => {
  apiAllSwiper()
  apiCompanyIntroduce()
})

// sign 轮播图
interface SwiperState {
  loading: boolean
  swiperData: Setting[]
}

const swiperState: SwiperState = reactive({
  loading: false,
  swiperData: []
})

// 获取轮播图
const apiAllSwiper = async () => {
  try {
    swiperState.loading = true
    const { data } = await getAllSwiper()
    swiperState.swiperData = data
  } catch (e) {
    console.log(e, 'apiAllSwiper')
  } finally {
    swiperState.loading = false
  }
}

// sign 公司信息
interface CompanyState {
  companyInfo: Setting[]
  loading: boolean
}

const companyState = reactive<CompanyState>({
  companyInfo: [],
  loading: false
})

// 获取公司介绍
const apiCompanyIntroduce = async () => {
  try {
    companyState.loading = true
    const { data } = await getCompanyIntroduce()
    companyState.companyInfo = data.filter((item) => item.set_name !== 'companyName')
  } catch (e) {
    console.log(e, 'apiCompanyIntroduce')
  } finally {
    companyState.loading = false
  }
}
</script>

<style lang="scss" scoped>
@mixin table-class {
  height: calc(100% - 20px);
  padding: 10px;
  width: calc(50% - 4px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
}

@mixin cardShadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.common-wrapped {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 0;
  background-color: #f3f4fa;

  // 轮播图外壳
  .swiper-wrapped {
    padding: 0 20px;
    background: #fff;
    margin-bottom: 8px;
    height: 35%;
    border-radius: 8px;
    @include cardShadow;

    .el-carousel {
      height: 100%;
    }

    .swiper {
      width: 100%;
      height: 100%;
    }
  }

  // 栅格布局外壳
  .layout-wrapped {
    padding: 8px;
    margin-bottom: 8px;
    background: #fff;
    border-radius: 8px;
    height: 25%;
    @include cardShadow;

    // 公司信息区域
    .company-message-area {
      background: #f5f5f5;
      height: calc(100% - 16px);
      padding: 8px;
      cursor: pointer;

      span {
        border-bottom: 1px solid #409eff;
        font-size: 14px;
        font-weight: bold;
      }

      .company-introduce {
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 10;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }

    .company-message-area:hover {
      cursor: pointer;
      background-color: rgba(59, 141, 153, 0.1);
    }
  }

  // 表格外壳
  .two-table-wrapped {
    height: 40%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //background: #fff;

    // 公司公告
    .company-notice {
      @include table-class;
      @include cardShadow;
      margin-right: 4px;
    }

    // 系统消息
    .system-message {
      @include table-class;
      @include cardShadow;
      margin-left: 4px;
    }

    .title {
      height: 30px;
      padding: 5px 0;
      font-size: 14px;
      margin-bottom: 5px;
      border-bottom: 1px solid #ea0709;
    }
  }
}
</style>
