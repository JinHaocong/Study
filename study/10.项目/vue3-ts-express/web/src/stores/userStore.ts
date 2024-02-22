import { defineStore } from 'pinia'
import { getUserInfo, type UserInfo } from '@/api/userInfo'
import { reactive, toRefs } from 'vue'

// sign Setup Store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const initialState: UserInfo = {
      name: '',
      account: '',
      sex: '',
      identity: '',
      department: '',
      email: '',
      image_url: ''
    }

    const state = reactive<UserInfo>({ ...initialState })
    const apiUserInfo = async (id: number) => {
      const res = await getUserInfo(id)
      updateState(res.data)
    }

    // 通过action更改state中的数据
    const updateState = (updatedInfo: Partial<UserInfo>): void => {
      Object.assign(state, updatedInfo)
    }

    // 清除数据到初始值
    const clearState = () => {
      Object.assign(state, initialState)
    }

    return {
      ...toRefs(state),
      apiUserInfo,
      updateState,
      clearState
    }
  },
  {
    persist: true
  }
)

// sign Option Store
// export const useUserStore = defineStore({
//   id: 'userStore',
//   state: () => ({
//     name: '',
//     account: '',
//     sex: '',
//     identity: '',
//     department: '',
//     email: '',
//     image_url: ''
//   }),
//   actions: {
//     async userInfo(id: number) {
//       const res = await getUserInfo(id)
//       Object.assign(this, res.data)
//     }
//   },
//   persist: true
// })
