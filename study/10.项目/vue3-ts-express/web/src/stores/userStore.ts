import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/userInfo'
import { ref } from 'vue'

// sign Setup Store
export const useUserStore = defineStore(
  'userStore',
  () => {
    const imageUrl = ref<string | null>()
    const storeIdentity = ref<string>()
    const userInfo = async (id: number) => {
      const res = await getUserInfo(id)
      const {
        data: { image_url, identity }
      } = res
      imageUrl.value = image_url
      storeIdentity.value = identity
    }

    return {
      imageUrl,
      userInfo,
      storeIdentity
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
//     storeIdentity: ''
//   }),
//   actions: {
//     async userInfo(id: number) {
//       const res = await getUserInfo(id)
//       const {
//         data: { image_url, identity }
//       } = res
//
//       this.imageUrl = image_url || ''
//       this.storeIdentity = identity
//     }
//   },
//   persist: false
// })
