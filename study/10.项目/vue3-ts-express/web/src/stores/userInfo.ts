import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/userInfo'
import { ref } from 'vue'

export const useUserInfo = defineStore(
  'userinfo',
  () => {
    const imageUrl = ref<string | null>()
    const soreIdentity = ref<string>()
    const userInfo = async (id: number) => {
      const res = await getUserInfo(id)
      const {
        data: { image_url, identity }
      } = res
      imageUrl.value = image_url
      soreIdentity.value = identity
    }

    return {
      imageUrl,
      userInfo,
      soreIdentity
    }
  },
  {
    persist: true
  }
)
