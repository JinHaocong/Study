import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/userInfo'
import { ref } from 'vue'

// sign Setup Store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const imageUrl = ref<string | null>()
    const identity = ref<string>()
    const userInfo = async (id: number) => {
      const res = await getUserInfo(id)
      imageUrl.value = res.data.image_url
      identity.value = res.data.identity
    }

    return {
      imageUrl,
      userInfo,
      identity
    }
  },
  {
    persist: true
  }
)

// sign Option Store
// export const useUserStore = defineStore('userStore', {
//   state: () => ({
//     imageUrl: '',
//     identity: ''
//   }),
//   actions: {
//     async userInfo(id: number) {
//       const res = await getUserInfo(id)
//
//       this.imageUrl = res.data.image_url || ''
//       this.identity = res.data.identity
//     }
//   },
//   persist: false
// })
