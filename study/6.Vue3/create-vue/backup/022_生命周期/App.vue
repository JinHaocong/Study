<template>
  <Person v-if="isShow" />
</template>

<script lang="ts" name="App" setup>
import Person from './components/Person.vue'
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

let isShow = ref(true)
// 创建
console.log('父-创建')

// 挂载前
onBeforeMount(() => {
  console.log('父-挂载前')
})
// 挂载完毕
onMounted(() => {
  console.log('父-挂载完毕')
})
// 更新前
onBeforeUpdate(() => {
  console.log('父-更新前')
})
// 更新完毕
onUpdated(() => {
  console.log('父-更新完毕')
})
// 卸载前
onBeforeUnmount(() => {
  console.log('父-卸载前')
})
// 卸载完毕
onUnmounted(() => {
  console.log('父-卸载完毕')
})
</script>
