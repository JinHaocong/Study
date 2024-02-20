import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/userInfo'
import { ref } from 'vue'

export const useUserInfo = defineStore(
  'userinfo',
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
