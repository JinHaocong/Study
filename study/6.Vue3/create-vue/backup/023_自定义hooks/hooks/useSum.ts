import { ref, onMounted, computed, watchEffect } from 'vue'

export default function () {
  // 数据
  const sum = ref(0)
  // const bigSum = ref(0)
  // watchEffect(() => {
  //   bigSum.value = sum.value * 10
  // })
  const bigSum = computed(() => {
    return sum.value * 10
  })

  // 方法
  function add() {
    sum.value += 1
  }

  // 钩子
  onMounted(() => {
    add()
  })

  // 给外部提供东西
  return { sum, add, bigSum }
}
