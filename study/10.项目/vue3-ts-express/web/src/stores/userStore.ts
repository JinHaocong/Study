import { defineStore } from 'pinia'
import { getUserInfo, type UserInfo } from '@/api/userInfo'
import { reactive, toRefs } from 'vue'

// sign Setup Store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const state = reactive<UserInfo>({
      name: '',
      account: '',
      sex: '',
      identity: '',
      department: '',
      email: '',
      image_url: ''
    })
    const setUserInfo = async (id: number) => {
      const res = await getUserInfo(id)
      Object.assign(state, res.data)
    }

    return {
      ...toRefs(state),
      setUserInfo
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
