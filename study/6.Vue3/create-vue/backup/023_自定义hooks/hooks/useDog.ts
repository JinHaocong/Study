import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function () {
  // 数据
  const dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'])

  // 方法
  async function getDog() {
    try {
      const result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      dogList.push(result.data.message)
    } catch (error) {
      alert(error)
    }
  }

  // 钩子
  onMounted(async () => {
    console.log('dog-mounted')
    await getDog()
  })
  // 向外部提供东西
  return { dogList, getDog }
}
