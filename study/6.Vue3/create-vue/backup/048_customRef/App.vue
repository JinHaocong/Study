<template>
  <div class="app">
    <h2>{{ msg }}</h2>
    <input v-model="msg" type="text" />
  </div>
</template>

<script lang="ts" name="App" setup>
// import { ref } from 'vue'
import useMsgRef from './useMsgRef'

// 使用Vue提供的默认ref定义响应式数据，数据一变，页面就更新
// let msg = ref('你好')

// 使用useMsgRef来定义一个响应式数据且有延迟效果
let { msg } = useMsgRef('你好', 2000)
</script>

<style scoped>
.app {
  background-color: #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
}

button {
  margin: 0 5px;
}
</style>
