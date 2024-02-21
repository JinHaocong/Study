import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export interface CrumbItem {
  name: string
  path: string
  meta: {
    title: string
    iconName: string
    iconColor?: string
    iconSize?: string | number
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
