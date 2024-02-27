<template>
  <div class="common-wrapped">
    <!-- 顶部内容外壳 -->
    <div class="top-content-wrapped">
      <!-- 个人信息 -->
      <div class="person-info">
        <!-- 用户头像外壳 -->
        <div class="person-avatar-wrapped">
          <el-avatar :size="100" :src="userStore.image_url" />
          <span class="department">所属部门：{{ userStore.department || '无' }}</span>
          <div class="company">所属公司：{{ topState.companyName }}</div>
        </div>
        <!-- 竖线 -->
        <div class="line-wrapped">
          <div class="line"></div>
        </div>
        <!-- 详细信息外壳 -->
        <div class="detail-info-wrapped">
          <p>姓名：{{ userStore.name }}</p>
          <p>性别：{{ userStore.sex }}</p>
          <p>身份：{{ userStore.identity }}</p>
          <p>分管领域：超级管理</p>
          <p>权限：最高权限</p>
        </div>
      </div>
      <div class="manage-user pie"></div>
    </div>
    <!-- 中间内容外壳 -->
    <div class="mid-content-wrapped">
      <div class="product-category-bar mid-content-left"></div>
      <div class="mid-content-right">
        <h1 class="title">
          常用管理
          <span style="color: #3b8d99">|</span>
        </h1>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="button-area" @click="routerTo('users_manage')">
              <SvgIcon color="#3b8d99" icon-name="user" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">用户管理</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('product_manage_list')">
              <SvgIcon
                color="#3b8d99"
                icon-name="product"
                style="width: 24px; height: 24px"
              ></SvgIcon>
              <span class="button-name">产品管理</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('message_list')">
              <SvgIcon
                color="#3b8d99"
                icon-name="notice"
                style="width: 24px; height: 24px"
              ></SvgIcon>
              <span class="button-name">系统消息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('set')">
              <SvgIcon color="#3b8d99" icon-name="me" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">个人信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <SvgIcon
                color="#3b8d99"
                icon-name="department"
                style="width: 24px; height: 24px"
              ></SvgIcon>
              <span class="button-name">部门信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area" @click="routerTo('set')">
              <SvgIcon color="#3b8d99" icon-name="set" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">系统设置</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 底部内容外壳 -->
    <div class="footer-content-wrapped">
      <div class="massage-level footer-content-left"></div>
      <div class="login-week footer-content-right"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, nextTick, shallowReactive } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getCompanyName } from '@/api/setting'
import echarts, { type ECOption } from '@/utils/echarts'

const userStore = useUserStore()
const router = useRouter()
onMounted(async () => {
  await Promise.all([
    apiCompanyName(),
    initTopChart(),
    initMiddleChart(),
    initBottomLeftChart(),
    initBottomRightChart()
  ])
  await nextTick()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

// 自适应
const handleResize = () => {
  topState.chart?.resize()
  middleState.chart?.resize()
  bottomState.leftChart?.resize()
  bottomState.rightChart?.resize()
}

// sign 上
interface TopState {
  companyName: string | null
  chart: null | echarts.ECharts
}

const topState = shallowReactive<TopState>({
  companyName: null,
  chart: null
})

// 获取公司名称
const apiCompanyName = async () => {
  try {
    const {
      data: { set_value }
    } = await getCompanyName()
    topState.companyName = set_value
  } catch (e) {
    console.log(e, 'apiCompanyName')
  }
}

// 初始化pie图
const initTopChart = async () => {
  const el: HTMLElement | null = document.querySelector('.manage-user')
  if (!el) return
  el.setAttribute('_echarts_instance_', '')
  topState.chart = echarts.init(el)
  // topState.chart.showLoading()
  // topState.chart.hideLoading()
  const option: ECOption = {
    title: {
      text: '管理与用户对比图',
      left: 'center',
      top: '10'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: [20, 20, 20, 20]
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  topState.chart.setOption(option)
}

// sign 中
interface MiddleState {
  chart: null | echarts.ECharts
}

const middleState = shallowReactive<MiddleState>({
  chart: null
})

// 产品类别图
const initMiddleChart = async () => {
  const el: HTMLElement | null = document.querySelector('.product-category-bar')
  if (!el) return
  el.setAttribute('_echarts_instance_', '')
  middleState.chart = echarts.init(el)
  // middleState.chart.showLoading()
  // middleState.chart.hideLoading()
  const option: ECOption = {
    title: {
      text: '产品类别库存总价图',
      top: '10',
      left: 'center',
      textStyle: {
        // fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      // 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 40,
        colorBy: 'data'
      }
    ]
  }
  middleState.chart.setOption(option)
}

// 常用管理路由跳转
const routerTo = (x: string) => {
  router.push(`/${x}`)
}

// sign 下

interface BottomState {
  leftChart: null | echarts.ECharts
  rightChart: null | echarts.ECharts
}

const bottomState = shallowReactive<BottomState>({
  leftChart: null,
  rightChart: null
})

// 公告等级分布图
const initBottomLeftChart = async () => {
  const el: HTMLElement | null = document.querySelector('.massage-level')
  if (!el) return
  el.setAttribute('_echarts_instance_', '')
  bottomState.leftChart = echarts.init(el)
  // bottomState.leftChart.showLoading()
  // bottomState.leftChart.hideLoading()
  const option = {
    title: {
      text: '公告等级分布图',
      top: '10',
      left: 'center',
      textStyle: {
        // fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['35%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      }
    ]
  }
  bottomState.leftChart.setOption(option)
}

// 消息每日总量图
const initBottomRightChart = async () => {
  const el: HTMLElement | null = document.querySelector('.login-week')
  if (!el) return
  el.setAttribute('_echarts_instance_', '')
  bottomState.rightChart = echarts.init(el)
  // bottomState.leftChart.showLoading()
  // bottomState.leftChart.hideLoading()
  const option = {
    title: {
      text: '每日登录人数图',
      top: '10',
      left: 'center',
      textStyle: {
        // fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: [1, 2, 3, 4, 5]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [5, 4, 3, 2, 1],
        type: 'line'
      }
    ]
  }
  bottomState.rightChart.setOption(option)
}
</script>

<style lang="scss" scoped>
@mixin cardShadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

// 总览内容
.common-wrapped {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 0;
  background-color: #f3f4fa;

  > * {
    flex: 1;
  }

  // 上部分内容 个人资料 + 饼状图
  .top-content-wrapped {
    display: flex;

    // 个人信息
    .person-info {
      height: 100%;
      margin-right: 4px;
      width: calc(50% - 4px);
      display: flex;
      background: #fff;
      border-radius: 8px;
      @include cardShadow;

      // 头像区域
      .person-avatar-wrapped {
        display: flex;
        width: calc(50% - 0.5px);
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // 公司
        .company {
          margin: 10px 0;
          font-size: 12px;
        }

        // 职务
        .department {
          margin-top: 8px;
          font-size: 12px;
        }
      }

      // 分割线
      .line-wrapped {
        height: 100%;
        display: flex;
        align-items: center;

        .line {
          height: 170px;
          border: 1px solid #d3d3d3;
        }
      }

      // 详细信息区域
      .detail-info-wrapped {
        height: 100%;
        width: calc(50% - 0.5px);
        margin-left: 50px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }

    // 饼状图
    .pie {
      margin-left: 4px;
      width: calc(50% - 4px);
      height: 100%;
      background: #fff;
      border-radius: 8px;
      @include cardShadow;
    }
  }

  // 中间部分内容 消息阅读量图 产品类别图
  .mid-content-wrapped {
    margin-top: 8px;
    display: flex;
    border-radius: 8px;

    // 中间左部分
    .mid-content-left {
      margin-right: 4px;
      width: calc(60% - 4px);
      background: #fff;
      border-radius: 8px;
      @include cardShadow;
    }

    // 中间右部分
    .mid-content-right {
      margin-left: 4px;
      width: calc(40% - 4px);
      background: #fff;
      padding: 8px;
      border-radius: 8px;
      @include cardShadow;

      .el-row {
        height: calc(100% - 45px);
        width: 100%;
        margin: 0 !important;
        align-items: center;
      }

      // 标题
      .title {
        height: 25px;
        line-height: 25px;
        margin-top: 0;
        margin-bottom: 20px;
      }

      // 按钮区域
      .button-area {
        margin-bottom: 8px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #f5f5f5;

        // 按钮名字
        .button-name {
          margin-top: 10px;
        }
      }

      // 按钮变色
      .button-area:hover {
        cursor: pointer;
        background-color: rgba(183, 93, 125, 0.1);
      }
    }
  }

  // 底部内容
  .footer-content-wrapped {
    margin-top: 8px;
    display: flex;
    border-radius: 8px;

    // 底部左部分
    .footer-content-left {
      margin-right: 4px;
      height: 100%;
      width: calc(30% - 4px);
      background: #fff;
      border-radius: 8px;
      @include cardShadow;
    }

    // 底部右部分
    .footer-content-right {
      margin-left: 4px;
      height: 100%;
      width: calc(70% - 4px);
      background: #fff;
      border-radius: 8px;
      @include cardShadow;
    }
  }
}
</style>
